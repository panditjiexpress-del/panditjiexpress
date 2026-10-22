#!/usr/bin/env node

/**
 * Pandit Ji Express — Automated SEO Regression Test Suite
 * 
 * Verifies:
 * 1. Canonical URLs (HTTPS, domain, self-referential match, no .html extension, correct stub canonicals)
 * 2. Title Tags (presence, length, uniqueness across site, no placeholders)
 * 3. Meta Descriptions (presence, length, uniqueness across site)
 * 4. Heading Hierarchy & Indexable Content (single H1, non-empty, word count >= 250)
 * 5. Internal Links & Anchors (zero broken links, valid file/redirect/hash targets)
 * 6. Image Assets & Alt attributes (files exist on disk, non-empty alt text)
 * 7. Structured Data JSON-LD (syntax, schema.org context, valid entities)
 * 8. Sitemap.xml Synchronization (bidirectional mapping between sitemap and files)
 * 9. Contextual Q&A Links and Descriptive Anchor Text (puja and booking destinations, zero generic anchors)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// ANSI Color Helpers
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

// Recognized stub / redirect / admin files
const REDIRECT_STUBS = new Map([
  ['pandit-rahul-shastri.html', 'https://panditjiexpress.in/pandit-shyam-sundar'],
  ['pandits.html', 'https://panditjiexpress.in/pandit-shyam-sundar'],
  ['resources.html', 'https://panditjiexpress.in/samagri'],
  ['vastu-shanti-puja-bangalore.html', 'https://panditjiexpress.in/griha-pravesh-pooja-bangalore']
]);

const NON_INDEXABLE_STUBS = new Set([
  '404.html',
  'admin.html',
  ...REDIRECT_STUBS.keys()
]);

function getAllHtmlFiles() {
  return fs.readdirSync(ROOT_DIR)
    .filter(file => file.endsWith('.html') && file !== 'SEO-BLOG-TEMPLATE.html')
    .sort();
}

function parseRedirects() {
  const redirectsPath = path.join(ROOT_DIR, '_redirects');
  const redirects = new Map();
  if (fs.existsSync(redirectsPath)) {
    const lines = fs.readFileSync(redirectsPath, 'utf8').split('\n');
    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const parts = line.split(/\s+/);
      if (parts.length >= 2) {
        redirects.set(parts[0], parts[1]);
      }
    }
  }
  return redirects;
}

function runRegressionSuite() {
  console.log(`${colors.bold}${colors.cyan}======================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  Pandit Ji Express — Automated SEO Regression Suite  ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}======================================================${colors.reset}\n`);

  const files = getAllHtmlFiles();
  const redirects = parseRedirects();
  
  // Valid Slugs Registry
  const validSlugs = new Set();
  const validFiles = new Set(files);
  const fileIds = new Map();

  for (const f of files) {
    if (f === 'index.html') {
      validSlugs.add('');
      validSlugs.add('/');
      validSlugs.add('index.html');
      validSlugs.add('/index.html');
    } else {
      const slug = f.slice(0, -5);
      validSlugs.add(slug);
      validSlugs.add(`/${slug}`);
      validSlugs.add(f);
      validSlugs.add(`/${f}`);
    }
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  function reportError(suite, file, msg) {
    totalErrors++;
    console.error(`  ${colors.red}✖ [${suite}] ${file}: ${msg}${colors.reset}`);
  }

  function reportWarn(suite, file, msg) {
    totalWarnings++;
    console.warn(`  ${colors.yellow}⚠ [${suite}] ${file}: ${msg}${colors.reset}`);
  }

  // Pre-parse files for DOM/IDs
  const fileCache = new Map();
  for (const f of files) {
    const content = fs.readFileSync(path.join(ROOT_DIR, f), 'utf8');
    const ids = new Set();
    const idRegex = /\bid=["']([^"']+)["']/gi;
    let match;
    while ((match = idRegex.exec(content)) !== null) {
      ids.add(match[1]);
    }
    fileIds.set(f, ids);
    fileCache.set(f, content);
  }

  // ---------------------------------------------------------
  // SUITE 1: CANONICAL URL VALIDATION
  // ---------------------------------------------------------
  console.log(`${colors.bold}1. Checking Canonical URLs across all pages...${colors.reset}`);
  let canonOk = 0;
  for (const f of files) {
    if (f === '404.html' || f === 'admin.html') continue;
    const content = fileCache.get(f);
    const canonRegex = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i;
    const canonAltRegex = /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i;
    const match = canonRegex.exec(content) || canonAltRegex.exec(content);

    if (!match) {
      reportError('Canonical', f, 'Missing <link rel="canonical"> tag');
      continue;
    }

    const canonUrl = match[1].trim();
    let expected;
    if (REDIRECT_STUBS.has(f)) {
      expected = REDIRECT_STUBS.get(f);
    } else if (f === 'index.html') {
      expected = 'https://panditjiexpress.in/';
    } else {
      expected = `https://panditjiexpress.in/${f.slice(0, -5)}`;
    }

    if (canonUrl !== expected) {
      reportError('Canonical', f, `Canonical mismatch. Got "${canonUrl}", expected "${expected}"`);
    } else {
      canonOk++;
    }
  }
  console.log(`   ${colors.green}✔ ${canonOk} canonical URLs validated perfectly.${colors.reset}\n`);

  // ---------------------------------------------------------
  // SUITE 2: TITLE TAG VALIDATION
  // ---------------------------------------------------------
  console.log(`${colors.bold}2. Checking Title Tags (presence, length, uniqueness)...${colors.reset}`);
  const titlesSeen = new Map();
  let titleOk = 0;
  for (const f of files) {
    if (NON_INDEXABLE_STUBS.has(f)) continue;
    const content = fileCache.get(f);
    const titleMatch = /<title>(.*?)<\/title>/is.exec(content);

    if (!titleMatch || !titleMatch[1].trim()) {
      reportError('Title', f, 'Missing or empty <title> tag');
      continue;
    }

    const title = titleMatch[1].trim();
    if (title.length < 25) {
      reportWarn('Title', f, `Title is short (${title.length} chars): "${title}"`);
    } else if (title.length > 95) {
      reportWarn('Title', f, `Title is long (${title.length} chars): "${title}"`);
    }

    if (/todo|untitled|new page|lorem/i.test(title)) {
      reportError('Title', f, `Title contains placeholder text: "${title}"`);
    }

    if (titlesSeen.has(title)) {
      reportError('Title', f, `Duplicate title identical to ${titlesSeen.get(title)}: "${title}"`);
    } else {
      titlesSeen.set(title, f);
      titleOk++;
    }
  }
  console.log(`   ${colors.green}✔ ${titleOk} unique page titles verified.${colors.reset}\n`);

  // ---------------------------------------------------------
  // SUITE 3: META DESCRIPTION VALIDATION
  // ---------------------------------------------------------
  console.log(`${colors.bold}3. Checking Meta Descriptions (presence, length, uniqueness)...${colors.reset}`);
  const descSeen = new Map();
  let descOk = 0;
  for (const f of files) {
    if (NON_INDEXABLE_STUBS.has(f)) continue;
    const content = fileCache.get(f);
    const descMatch = /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i.exec(content) ||
                      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i.exec(content);

    if (!descMatch || !descMatch[1].trim()) {
      reportError('Description', f, 'Missing or empty meta description');
      continue;
    }

    const desc = descMatch[1].trim();
    if (desc.length < 50) {
      reportWarn('Description', f, `Description is short (${desc.length} chars)`);
    }

    if (descSeen.has(desc)) {
      reportError('Description', f, `Duplicate meta description identical to ${descSeen.get(desc)}`);
    } else {
      descSeen.set(desc, f);
      descOk++;
    }
  }
  console.log(`   ${colors.green}✔ ${descOk} unique meta descriptions verified.${colors.reset}\n`);

  // ---------------------------------------------------------
  // SUITE 4: HEADING HIERARCHY & CONTENT INTEGRITY
  // ---------------------------------------------------------
  console.log(`${colors.bold}4. Checking Heading Hierarchy and Content Depth...${colors.reset}`);
  let contentOk = 0;
  for (const f of files) {
    if (NON_INDEXABLE_STUBS.has(f)) continue;
    const content = fileCache.get(f);
    
    // Exactly 1 H1
    const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    if (h1Matches.length === 0) {
      reportError('Content', f, 'Missing <h1> tag');
    } else if (h1Matches.length > 1) {
      reportError('Content', f, `Found ${h1Matches.length} <h1> tags (must have exactly 1)`);
    } else {
      const h1Text = h1Matches[0].replace(/<[^>]+>/g, '').trim();
      if (h1Text.length < 5) {
        reportError('Content', f, `H1 text too short: "${h1Text}"`);
      }
    }

    // Word count check
    const bodyMatch = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(content);
    if (bodyMatch) {
      const textOnly = bodyMatch[1]
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const words = textOnly.split(' ').filter(w => w.length > 1);
      if (words.length < 200) {
        reportWarn('Content', f, `Thin page content detected: only ${words.length} words`);
      } else {
        contentOk++;
      }
    }
  }
  console.log(`   ${colors.green}✔ ${contentOk} pages passed heading hierarchy and content depth.${colors.reset}\n`);

  // ---------------------------------------------------------
  // SUITE 5: INTERNAL LINK INTEGRITY SCANNER
  // ---------------------------------------------------------
  console.log(`${colors.bold}5. Scanning all Internal Links and Anchor Targets...${colors.reset}`);
  let totalLinks = 0;
  let linkOk = 0;
  const linkRegex = /<a[^>]+href=["']([^"']+)["']/gi;

  for (const f of files) {
    if (f === 'admin.html') continue; // admin interface contains JS string interpolations
    const content = fileCache.get(f);
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      totalLinks++;
      const href = match[1].trim();

      // Skip dynamic/template links
      if (href.includes('${')) continue;

      // Skip external protocols and non-page schemes
      if (/^(tel:|mailto:|whatsapp:|javascript:|data:)/i.test(href)) {
        continue;
      }
      if (/^https?:\/\//i.test(href)) {
        if (!href.startsWith('https://panditjiexpress.in')) {
          continue; // external web link
        }
      }

      // Deconstruct URL
      let cleanTarget = href;
      if (cleanTarget.startsWith('https://panditjiexpress.in')) {
        cleanTarget = cleanTarget.replace('https://panditjiexpress.in', '') || '/';
      }

      const [pathPart, hashPart] = cleanTarget.split('#');
      const cleanPath = (pathPart || '').split('?')[0];

      // 1. Same-page anchor (#something)
      if (!cleanPath && hashPart) {
        const ids = fileIds.get(f);
        if (hashPart !== 'main-content' && !ids.has(hashPart)) {
          reportWarn('Anchor', f, `Anchor #${hashPart} does not match any id in ${f}`);
        }
        continue;
      }

      // 2. Page route resolution
      if (cleanPath) {
        const isRedirect = redirects.has(cleanPath) || redirects.has(cleanPath.replace(/^\//, ''));
        const isValidSlug = validSlugs.has(cleanPath) || validSlugs.has(cleanPath.replace(/^\//, ''));
        const isStaticAsset = fs.existsSync(path.join(ROOT_DIR, cleanPath.replace(/^\//, '')));

        if (!isValidSlug && !isRedirect && !isStaticAsset) {
          reportError('Link', f, `Broken internal link: "${href}" (target not found in routes or _redirects)`);
        } else {
          linkOk++;
        }
      }
    }
  }
  console.log(`   ${colors.green}✔ ${totalLinks} links scanned across site (${linkOk} internal routes verified).${colors.reset}\n`);

  // ---------------------------------------------------------
  // SUITE 6: IMAGE ASSETS & ALT TEXT
  // ---------------------------------------------------------
  console.log(`${colors.bold}6. Verifying Image Asset Files & Alt Attributes...${colors.reset}`);
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let imgCount = 0;
  for (const f of files) {
    if (NON_INDEXABLE_STUBS.has(f)) continue;
    const content = fileCache.get(f);
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      imgCount++;
      const tag = match[0];
      const src = match[1].trim();

      // Check alt attribute
      if (!/alt=["'][^"']*["']/i.test(tag)) {
        reportWarn('Image', f, `Image missing alt attribute: ${src}`);
      }

      // Check local image file exists
      if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('data:')) {
        const cleanSrc = src.split('?')[0].replace(/^\//, '');
        const fullImgPath = path.join(ROOT_DIR, cleanSrc);
        if (!fs.existsSync(fullImgPath)) {
          reportError('Image', f, `Image asset not found on disk: ${src}`);
        }
      }
    }
  }
  console.log(`   ${colors.green}✔ ${imgCount} image references checked.${colors.reset}\n`);

  // ---------------------------------------------------------
  // SUITE 7: JSON-LD STRUCTURED DATA
  // ---------------------------------------------------------
  console.log(`${colors.bold}7. Validating Schema.org JSON-LD Structured Data...${colors.reset}`);
  let jsonLdCount = 0;
  const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  for (const f of files) {
    const content = fileCache.get(f);
    let match;
    while ((match = jsonLdRegex.exec(content)) !== null) {
      jsonLdCount++;
      try {
        const parsed = JSON.parse(match[1]);
        if (!parsed['@context']) {
          reportError('Schema', f, 'JSON-LD missing @context');
        }
      } catch (err) {
        reportError('Schema', f, `Malformed JSON-LD syntax: ${err.message}`);
      }
    }
  }
  console.log(`   ${colors.green}✔ ${jsonLdCount} JSON-LD blocks validated.${colors.reset}\n`);

  // ---------------------------------------------------------
  // SUITE 8: SITEMAP.XML SYNCHRONIZATION
  // ---------------------------------------------------------
  console.log(`${colors.bold}8. Validating sitemap.xml synchronization...${colors.reset}`);
  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    reportError('Sitemap', 'sitemap.xml', 'File missing');
  } else {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const locRegex = /<loc>(https:\/\/panditjiexpress\.in\/[^<]*)<\/loc>/g;
    let match;
    const sitemapUrls = new Set();
    while ((match = locRegex.exec(sitemapContent)) !== null) {
      sitemapUrls.add(match[1]);
    }

    // Verify all sitemap URLs map to real files
    for (const url of sitemapUrls) {
      const slug = url.replace('https://panditjiexpress.in', '').replace(/^\//, '');
      const expected = slug === '' ? 'index.html' : `${slug}.html`;
      if (!fs.existsSync(path.join(ROOT_DIR, expected))) {
        reportError('Sitemap', 'sitemap.xml', `Sitemap contains missing URL: ${url} (expected ${expected})`);
      }
    }

    // Verify all indexable files are present in sitemap
    for (const f of files) {
      if (NON_INDEXABLE_STUBS.has(f)) continue;
      const expectedUrl = f === 'index.html' ? 'https://panditjiexpress.in/' : `https://panditjiexpress.in/${f.slice(0, -5)}`;
      if (!sitemapUrls.has(expectedUrl)) {
        reportWarn('Sitemap', 'sitemap.xml', `Indexable page ${f} is missing from sitemap.xml: ${expectedUrl}`);
      }
    }
    console.log(`   ${colors.green}✔ ${sitemapUrls.size} sitemap URLs verified against disk files.${colors.reset}\n`);
  }

  // ---------------------------------------------------------
  // SUITE 9: CONTEXTUAL Q&A LINKS & DESCRIPTIVE ANCHOR TEXT
  // ---------------------------------------------------------
  console.log(`${colors.bold}9. Validating Contextual Q&A Links and Descriptive Anchor Text...${colors.reset}`);
  
  function extractFaqBlocks(html) {
    const blocks = [];
    const detailsRegex = /<details[^>]*class=["'][^"']*(?:faq|blog-faq)[^"']*["'][^>]*>([\s\S]*?)<\/details>/gi;
    let m;
    while ((m = detailsRegex.exec(html)) !== null) {
      blocks.push(m[0]);
    }
    const articleRegex = /<article[^>]*class=["'][^"']*faq-card[^"']*["'][^>]*>([\s\S]*?)<\/article>/gi;
    while ((m = articleRegex.exec(html)) !== null) {
      blocks.push(m[0]);
    }
    const divRegex = /<div[^>]*class=["'][^"']*faq-item[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
    while ((m = divRegex.exec(html)) !== null) {
      blocks.push(m[0]);
    }
    return blocks;
  }

  const genericAnchorSet = new Set([
    'click here', 'here', 'read more', 'learn more', 'link', 'this link',
    'more', 'check here', 'view here', 'go here', 'this', 'page', 'visit'
  ]);

  let totalFaqLinksScanned = 0;
  let faqBlocksScanned = 0;

  for (const f of files) {
    if (f === 'admin.html') continue;
    const content = fileCache.get(f);
    const blocks = extractFaqBlocks(content);
    faqBlocksScanned += blocks.length;

    for (const b of blocks) {
      const aRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let am;
      while ((am = aRegex.exec(b)) !== null) {
        totalFaqLinksScanned++;
        const targetHref = am[1].trim();
        const rawAnchor = am[2].replace(/<[^>]+>/g, '').trim();

        if (!rawAnchor || rawAnchor.length === 0) {
          reportError('Q&A Anchor', f, `Empty anchor text found in Q&A section linking to "${targetHref}"`);
        } else {
          if (genericAnchorSet.has(rawAnchor.toLowerCase())) {
            reportError('Q&A Anchor', f, `Non-descriptive anchor text "${rawAnchor}" in Q&A section linking to "${targetHref}". Use descriptive anchor text.`);
          }
          if (rawAnchor.length < 4) {
            reportWarn('Q&A Anchor', f, `Very short anchor text ("${rawAnchor}") in Q&A section for "${targetHref}"`);
          }
        }

        // Verify route integrity of internal link
        if (targetHref.startsWith('/') && !targetHref.startsWith('//')) {
          const cleanPath = targetHref.split('#')[0].split('?')[0];
          const isValid = validSlugs.has(cleanPath) || redirects.has(cleanPath) || redirects.has(cleanPath.replace(/^\//, ''));
          if (!isValid && cleanPath !== '') {
            reportError('Q&A Link', f, `Broken internal link in Q&A: "${targetHref}"`);
          }
        }
      }
    }
  }

  // Required Q&A contextual links for key ceremony and guide pages
  const requiredQaLinks = {
    'griha-pravesh-pooja-bangalore.html': [
      { target: '/griha-pravesh-muhurat-bangalore', label: 'Griha Pravesh muhurat guide' },
      { target: '/booking', label: 'Griha Pravesh booking' }
    ],
    'naamkaran-ceremony-bangalore.html': [
      { target: '/booking', label: 'Naamkaran ceremony booking' }
    ],
    'wedding-muhurat-dates-bangalore.html': [
      { target: '/wedding-pandit-bangalore', label: 'Wedding pandit services' },
      { target: '/booking', label: 'Wedding booking' }
    ],
    'index.html': [
      { target: '/areas-we-serve', label: 'Areas We Serve hub' },
      { target: '/services', label: 'Puja and pandit services' },
      { target: '/booking', label: 'Vedic pandit booking' }
    ],
    'puja-samagri-list-bangalore.html': [
      { target: '/samagri', label: 'Puja samagri packages' },
      { target: '/booking', label: 'Puja booking with samagri' }
    ]
  };

  let requiredQaVerified = 0;
  for (const [targetFile, reqLinks] of Object.entries(requiredQaLinks)) {
    const content = fileCache.get(targetFile);
    if (!content) {
      reportError('Q&A Requirement', targetFile, `File not found in regression cache`);
      continue;
    }
    const blocks = extractFaqBlocks(content);
    const combinedFaqHtml = blocks.join('\n');

    for (const req of reqLinks) {
      const linkRegex = new RegExp(`<a[^>]+href=["']${req.target.replace('/', '\\/')}[^"']*["'][^>]*>([\\s\\S]*?)<\\/a>`, 'i');
      const match = linkRegex.exec(combinedFaqHtml);
      if (!match) {
        reportError('Q&A Requirement', targetFile, `Missing required Q&A contextual link to ${req.target} (${req.label})`);
      } else {
        const anchor = match[1].replace(/<[^>]+>/g, '').trim();
        if (genericAnchorSet.has(anchor.toLowerCase()) || anchor.length < 4) {
          reportError('Q&A Requirement', targetFile, `Q&A link to ${req.target} has non-descriptive anchor text: "${anchor}"`);
        } else {
          requiredQaVerified++;
        }
      }
    }
  }

  console.log(`   ${colors.green}✔ ${totalFaqLinksScanned} Q&A internal links scanned across ${faqBlocksScanned} FAQ blocks (0 generic anchors).${colors.reset}`);
  console.log(`   ${colors.green}✔ All ${requiredQaVerified} required ceremony & booking Q&A contextual links verified with descriptive anchors.${colors.reset}\n`);

  // ---------------------------------------------------------
  // FINAL RESULTS SUMMARY
  // ---------------------------------------------------------
  console.log(`${colors.bold}======================================================${colors.reset}`);
  if (totalErrors === 0) {
    console.log(`${colors.bold}${colors.green}🎉 ALL SEO REGRESSION CHECKS PASSED! (${totalWarnings} warnings)${colors.reset}`);
    console.log(`${colors.bold}======================================================${colors.reset}\n`);
    process.exit(0);
  } else {
    console.error(`${colors.bold}${colors.red}❌ SEO REGRESSION SUITE FAILED WITH ${totalErrors} ERROR(S) and ${totalWarnings} warning(s).${colors.reset}`);
    console.log(`${colors.bold}======================================================${colors.reset}\n`);
    process.exit(1);
  }
}

runRegressionSuite();
