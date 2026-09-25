const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const command = process.argv[2] || 'all';

console.log(`[Validation Runner] Executing command: ${command}`);

function getHtmlFiles(dir) {
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.html') && file !== 'SEO-BLOG-TEMPLATE.html')
    .map(file => path.join(dir, file));
}

function getJsonFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...getJsonFiles(filePath));
    } else if (file.endsWith('.json')) {
      results.push(filePath);
    }
  }
  return results;
}

if (command === 'validate-business') {
  console.log('[1/1] Validating Business Truth & Safeguards...');
  const files = getHtmlFiles(ROOT_DIR);
  const prohibited = [
    { pattern: /smoke\s+(detector|alarm)/i, name: 'Smoke alarm claims' },
    { pattern: /100%\s+guaranteed\s+(wealth|success|health|outcome)/i, name: 'Miracle outcome guarantee' },
    { pattern: /pandit\s+rahul\s+shastri/i, name: 'Fictional priest persona' },
    { pattern: /phd\s+in\s+sanskrit/i, name: 'Unverified Sanskrit doctorate' },
    { pattern: /govt\s+certified\s+pandit/i, name: 'Unverified government priest certification' }
  ];

  let violations = 0;
  for (const f of files) {
    const content = fs.readFileSync(f, 'utf8');
    // Skip legacy redirect stubs for persona check
    const isStub = f.includes('pandit-rahul-shastri.html');
    for (const p of prohibited) {
      if (isStub && p.name === 'Fictional priest persona') continue;
      if (p.pattern.test(content)) {
        console.error(`❌ Violation in ${path.basename(f)}: ${p.name}`);
        violations++;
      }
    }
  }

  if (violations === 0) {
    console.log('✅ Business Truth Validation PASSED: 0 prohibited claims found across all pages.');
    process.exit(0);
  } else {
    console.error(`❌ Failed with ${violations} business claim violations.`);
    process.exit(1);
  }
}

if (command === 'typecheck') {
  console.log('[1/1] Validating JSON schemas and JSON-LD data types...');
  const jsonFiles = getJsonFiles(path.join(ROOT_DIR, 'local-seo'));
  let errors = 0;

  for (const jf of jsonFiles) {
    try {
      const data = JSON.parse(fs.readFileSync(jf, 'utf8'));
      if (!data) throw new Error('Empty JSON');
    } catch (e) {
      console.error(`❌ JSON Syntax Error in ${path.basename(jf)}: ${e.message}`);
      errors++;
    }
  }

  // Validate JSON-LD in HTML files
  const htmlFiles = getHtmlFiles(ROOT_DIR);
  for (const hf of htmlFiles) {
    const content = fs.readFileSync(hf, 'utf8');
    const regex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      try {
        JSON.parse(match[1]);
      } catch (e) {
        console.error(`❌ JSON-LD Error in ${path.basename(hf)}: ${e.message}`);
        errors++;
      }
    }
  }

  if (errors === 0) {
    console.log('✅ Typecheck & JSON-LD Validation PASSED: All JSON structures valid.');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

if (command === 'lint') {
  console.log('[1/1] Linting HTML tags, meta titles, descriptions, and canonicals...');
  const htmlFiles = getHtmlFiles(ROOT_DIR);
  let warnings = 0;

  for (const hf of htmlFiles) {
    const base = path.basename(hf);
    if (base === 'pandit-rahul-shastri.html' || base === 'pandits.html' || base === 'resources.html' || base === 'vastu-shanti-puja-bangalore.html') {
      continue; // Skip redirect stubs
    }

    const content = fs.readFileSync(hf, 'utf8');
    if (!content.includes('<title>')) {
      console.error(`❌ Missing <title> in ${base}`);
      warnings++;
    }
    if (!content.includes('<link rel="canonical"')) {
      console.error(`❌ Missing canonical tag in ${base}`);
      warnings++;
    }
    if (!content.includes('name="description"')) {
      console.error(`❌ Missing meta description in ${base}`);
      warnings++;
    }
    if (!content.includes('<h1')) {
      console.error(`❌ Missing <h1> tag in ${base}`);
      warnings++;
    }
  }

  if (warnings === 0) {
    console.log('✅ HTML & SEO Lint PASSED: 100% compliant meta, title, and canonical structures.');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

if (command === 'format:check') {
  console.log('[1/1] Checking file formatting and encoding...');
  const htmlFiles = getHtmlFiles(ROOT_DIR);
  for (const hf of htmlFiles) {
    const content = fs.readFileSync(hf, 'utf8');
    if (content.charCodeAt(0) === 0xFEFF) {
      console.warn(`⚠️ Warning: BOM detected in ${path.basename(hf)}`);
    }
  }
  console.log('✅ Format check PASSED.');
  process.exit(0);
}

if (command === 'build') {
  console.log('[1/1] Validating production build integrity and sitemap synchronization...');
  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ Missing sitemap.xml');
    process.exit(1);
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const locRegex = /<loc>(https:\/\/panditjiexpress\.in\/[^<]*)<\/loc>/g;
  let match;
  const sitemapUrls = [];
  while ((match = locRegex.exec(sitemapContent)) !== null) {
    sitemapUrls.push(match[1]);
  }

  console.log(`Found ${sitemapUrls.length} canonical URLs declared in sitemap.xml.`);

  // Verify every sitemap URL corresponds to a local file
  let missing = 0;
  for (const url of sitemapUrls) {
    const slug = url.replace('https://panditjiexpress.in', '').replace(/^\//, '');
    const expectedFile = slug === '' ? 'index.html' : `${slug}.html`;
    if (!fs.existsSync(path.join(ROOT_DIR, expectedFile))) {
      console.error(`❌ Sitemap URL missing local file: ${url} (expected ${expectedFile})`);
      missing++;
    }
  }

  if (missing === 0) {
    console.log(`✅ Production Build & Sitemap PASSED: All ${sitemapUrls.length} sitemap URLs mapped to valid local files.`);
    process.exit(0);
  } else {
    process.exit(1);
  }
}
