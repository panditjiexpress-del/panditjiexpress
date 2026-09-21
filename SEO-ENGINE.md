# Pandit Ji Express — SEO Engine & Content Registry

> Single source of truth for all SEO decisions, page titles, blog wiring, and schema.
> Update this file whenever you add a new page or blog post.

---

## 1. Global SEO Constants

| Signal | Value |
|---|---|
| Brand Name | Pandit Ji Express |
| Canonical Domain | https://panditjiexpress.in/ |
| Primary Geo | Bangalore / Bengaluru |
| Primary Phone | +91 90657 88789 |
| Business Schema @id | https://panditjiexpress.in/#organization |
| robots | index, follow on all indexable pages |

---

## 2. Page Title Registry

Pattern: [Primary Keyword] | [Secondary Keyword / Brand Signal]
Max: 60 characters

| File | Clean URL | Title |
|---|---|---|
| index.html | / | Pandit Ji Express | North Indian Pandit in Bangalore | Hindi Pandit Ji |
| services.html | /services | Our Poojas | North Indian Vedic Ceremonies in Bangalore | Pandit Ji Express |
| pandit-shyam-sundar.html | /pandit-shyam-sundar | Pandit Shyam Sundar | Founder & Head Vedic Priest | Pandit Ji Express Bangalore |
| booking.html | /booking | Book Pandit Shyam Sundar | Vedic Pooja Booking | Pandit Ji Express Bangalore |
| samagri.html | /samagri | Pooja Samagri & Doorstep Kits in Bangalore | Pandit Ji Express |
| gallery.html | /gallery | Vedic Puja & Ceremony Photo Gallery | Pandit Ji Express Bangalore |
| blog.html | /blog | Our Blog | Vedic Guidance, Puja Guides & Rituals | Pandit Ji Express Bangalore |
| about.html | /about | About Us | North Indian Pandit Services in Bangalore | Pandit Ji Express |
| contact.html | /contact | Contact Us | Pandit Ji Express Bangalore | Phone, Office & Booking |
| privacy.html | /privacy | Privacy Policy | Pandit Ji Express Bangalore |
| wedding-pandit-bangalore.html | /wedding-pandit-bangalore | Wedding Pandit in Bangalore | North Indian Vedic Wedding Pandit |
| griha-pravesh-pooja-bangalore.html | /griha-pravesh-pooja-bangalore | Griha Pravesh Pandit in Bangalore | Hindi Pooja & Vastu Rituals |
| satyanarayan-puja-bangalore.html | /satyanarayan-puja-bangalore | Satyanarayan Puja Pandit in Bangalore | Hindi Pandit Ji |
| havan-yagna-bangalore.html | /havan-yagna-bangalore | Havan & Yagna Pandit in Bangalore | North Indian Vedic Pandit |
| ganesh-puja-bangalore.html | /ganesh-puja-bangalore | Ganesh Puja Pandit in Bangalore | Hindi Pandit Ji |
| durga-puja-navratri-bangalore.html | /durga-puja-navratri-bangalore | Durga Puja & Navratri Pandit in Bangalore | Hindi Pandit Ji |
| rudrabhishek-bangalore.html | /rudrabhishek-bangalore | Rudrabhishek Pandit in Bangalore | Shiva Puja by Vedic Pandit |
| mundan-ceremony-bangalore.html | /mundan-ceremony-bangalore | Mundan Ceremony Pandit in Bangalore | North Indian Pandit Ji |
| naamkaran-ceremony-bangalore.html | /naamkaran-ceremony-bangalore | Naamkaran Ceremony Pandit in Bangalore | Hindi Pandit Ji |
| upanayanam-janeu-bangalore.html | /upanayanam-janeu-bangalore | Upanayanam & Janeu Ceremony Pandit in Bangalore |
| annaprashan-bangalore.html | /annaprashan-bangalore | Annaprashan Pandit in Bangalore | North Indian Hindu Rituals |
| north-indian-pandit-whitefield.html | /north-indian-pandit-whitefield | North Indian Pandit in Whitefield Bangalore | Hindi Pandit Ji |
| north-indian-pandit-hsr-layout.html | /north-indian-pandit-hsr-layout | North Indian Pandit in HSR Layout Bangalore | Hindi Pandit Ji |
| north-indian-pandit-marathahalli.html | /north-indian-pandit-marathahalli | North Indian Pandit in Marathahalli Bangalore | Hindi Pandit Ji |
| best-north-indian-pandit-bangalore.html | /best-north-indian-pandit-bangalore | Best North Indian Pandit in Bangalore | Hindi Pandit Ji |
| pandit-cost-bangalore.html | /pandit-cost-bangalore | How Much Does a Pandit Cost in Bangalore? | Puja &amp; Ceremony Guide |
| griha-pravesh-puja-bangalore-guide.html | /griha-pravesh-puja-bangalore-guide | Griha Pravesh Puja in Bangalore | Cost, Samagri, Muhurat &amp; Process |
| puja-samagri-list-bangalore.html | /puja-samagri-list-bangalore | Puja Samagri List for Bangalore | Complete Hindu Ceremony Checklist |
| how-to-book-pandit-bangalore.html | /how-to-book-pandit-bangalore | How to Book a North Indian Pandit in Bangalore | Complete Guide |
| hindi-speaking-pandit-bangalore.html | /hindi-speaking-pandit-bangalore | Hindi-Speaking North Indian Pandit in Bangalore | Puja &amp; Vedic Ceremonies |

---

## 3. Blog Post Wiring — Content & Technical Structure

### Step 1: Name the file

Use a keyword-rich, hyphenated, location-specific slug:
  griha-pravesh-puja-checklist-bangalore.html
  best-muhurat-for-griha-pravesh-2026.html
  satyanarayan-katha-benefits-hindi-pandit.html

Rules:
- Lowercase, hyphens only
- Include primary keyword first
- Include "bangalore" where geographically relevant
- No .html in internal links (Cloudflare strips it automatically)

### Step 2: Copy SEO-BLOG-TEMPLATE.html

The template (see SEO-BLOG-TEMPLATE.html in this repo) pre-wires:
- <title>, all meta tags, canonical URL
- og:type=article, og:title, og:description, og:image
- Article JSON-LD: datePublished, dateModified, author, publisher
- BreadcrumbList JSON-LD
- Visible FAQ section (optional — include for readers when genuinely useful, but do not automatically add FAQPage JSON-LD as Google has deprecated FAQ rich results for standard sites)
- Mobile header + bottom nav (canonical 5-tab)

### Step 3: Add to /blog listing

In blog.html, add a card:

  <article class="blog-card">
    <a href="/your-post-slug">
      <img src="assets/images/blog-your-post.jpg" alt="Alt text" width="800" height="450" loading="lazy">
      <div class="blog-card-content">
        <span class="blog-category">Puja Guides</span>
        <h2 class="blog-card-title">Your Blog Post Title</h2>
        <p class="blog-card-excerpt">First 150 chars that directly answer the search query...</p>
        <time datetime="2026-09-21">21 September 2026</time>
      </div>
    </a>
  </article>

Recommendation: Keep the card title consistent with the post's <h1> for clear user expectations.

### Step 4: Add to sitemap.xml

  <url>
    <loc>https://panditjiexpress.in/your-post-slug</loc>
    <lastmod>2026-09-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

### Step 5: Add internal links from relevant service pages

For a Griha Pravesh blog post, add to griha-pravesh-pooja-bangalore.html:

  <a href="/griha-pravesh-puja-checklist-bangalore">
    Read: Complete Griha Pravesh Puja Checklist for Bangalore Homes
  </a>

This supports logical topic clustering — helping users and search engines navigate related services and informational guides.

---

## 4. SEO Metadata Checklist (for every new page)

PAGE SLUG:          /your-page-slug
FILE NAME:          your-page-slug.html
TITLE:              Primary Keyword in Bangalore | Secondary Signal
META DESCRIPTION:   Direct answer first 120 chars. Max 155 chars.
H1:                 Same intent as title (can be slightly different wording)
CANONICAL:          https://panditjiexpress.in/your-page-slug
OG:URL:             https://panditjiexpress.in/your-page-slug
OG:TYPE:            article (blog posts) / website (service pages)
OG:IMAGE:           https://panditjiexpress.in/assets/images/your-image.jpg
SCHEMA TYPE:        Article (blog) / Service (service pages)
INTERNAL LINKS:     Add relevant internal links from /blog and related service pages where useful
SITEMAP ENTRY:      YES — add to sitemap.xml
ROBOTS:             index, follow

---

## 5. Meta Description Formula

Service pages:
  [Ceremony] in Bangalore by verified North Indian Hindi Pandit.
  [Key benefit]. Book Pandit Shyam Sundar: +91 90657 88789.
  Max 155 characters.

Blog posts:
  [Direct answer to the search query — first sentence].
  [Second sentence with location signal]. Read the complete guide.
  Max 155 characters.

Guideline: Aim for the first 100-120 characters to directly address the search query intent.

---

## 6. JSON-LD Quick Reference

### Service pages — required schema fields

  "@type": "Service"
  "name": "Griha Pravesh Puja in Bangalore"
  "provider": { "@id": "https://panditjiexpress.in/#organization" }
  "areaServed": { "@type": "City", "name": "Bengaluru" }
  "url": "https://panditjiexpress.in/griha-pravesh-pooja-bangalore"

### Blog posts — required schema fields

  "@type": "Article"
  "headline": "Your Article Title (matches <h1> exactly)"
  "datePublished": "2026-09-21T10:00:00+05:30"
  "dateModified": "2026-09-21T10:00:00+05:30"
  "author": {
    "@type": "Person",
    "name": "Pandit Shyam Sundar",
    "url": "https://panditjiexpress.in/pandit-shyam-sundar"
  }
  "publisher": { "@id": "https://panditjiexpress.in/#organization" }
  "mainEntityOfPage": "https://panditjiexpress.in/your-post-slug"

### FAQ Content & Structured Data Guidance

- **Visible FAQ Content**: Include a visible FAQ section on blog posts or service pages when it genuinely answers common reader questions and improves content usefulness.
- **FAQPage Structured Data**: Google deprecated FAQ rich results for standard websites. Do not assume or promise that adding FAQPage JSON-LD will generate FAQ dropdowns/rich snippets in search results, and do not promise CTR improvements from it.
- **Structured Data Best Practice**: Do not automatically add FAQPage JSON-LD to every blog post. Only use structured data types that are actually appropriate and currently supported for the content (e.g. `Article`, `BreadcrumbList`, and `Service`).

---

## 7. Internal Linking Architecture (Topic Clusters)

/services (hub)
├── /griha-pravesh-pooja-bangalore → Blog: /griha-pravesh-puja-checklist-bangalore
├── /wedding-pandit-bangalore → Blog: /north-indian-wedding-rituals-guide
├── /satyanarayan-puja-bangalore → Blog: /satyanarayan-katha-benefits
├── /havan-yagna-bangalore → Blog: /havan-at-home-guide-bangalore
├── /rudrabhishek-bangalore
├── /ganesh-puja-bangalore
├── /durga-puja-navratri-bangalore
├── /mundan-ceremony-bangalore
├── /naamkaran-ceremony-bangalore
├── /annaprashan-bangalore
└── /upanayanam-janeu-bangalore

/blog (hub)
├── /best-north-indian-pandit-bangalore (Pillar Guide: How to choose a North Indian Pandit in Bangalore)
├── /pandit-cost-bangalore (Pillar Guide: Transparent cost, dakshina & pricing breakdown in Bangalore)
├── /griha-pravesh-puja-bangalore-guide (Cluster Guide: Apartment & villa housewarming rituals, Vastu, milk boiling & muhurat)
├── /puja-samagri-list-bangalore (Cluster Guide: Itemized checklists across 5 major pujas & local sourcing)
├── /how-to-book-pandit-bangalore (Cluster Guide: Booking steps, info required, calendar coordination & prep)
├── /hindi-speaking-pandit-bangalore (Cluster Guide: Language clarity, mantra explanation & regional North Indian traditions)
├── All blog posts link back to /blog and relevant service pages
└── Related service pages contextually link to guides

Location pages → Link to all service pages + /booking

Guideline: Each new page should receive relevant internal links from appropriate existing pages where useful for users and crawl discovery. There is no fixed Google-required number of internal links.

---

## 8. Sitemap Priority Scale

| Page Type         | priority | changefreq |
|-------------------|----------|------------|
| Homepage          | 1.0      | weekly     |
| Service pages     | 0.8      | monthly    |
| Location pages    | 0.8      | monthly    |
| Blog posts        | 0.6      | monthly    |
| About/Contact/Privacy | 0.5  | yearly     |
| Gallery / Booking | 0.6      | monthly    |

---

## 9. Safety Rules — What NEVER to Touch

| Asset | Reason |
|---|---|
| canonical URLs | Changing causes canonical loops and indexing drops |
| sitemap.xml URL format | Must remain https://panditjiexpress.in/<slug> (no .html) |
| robots.txt | Do not add Disallow to indexed pages |
| _redirects | Do not remove legacy redirects |
| Schema @id values | Stable identifiers for Google Knowledge Graph |
| og:url | Must always match canonical |
| Mobile nav URLs | All use clean extensionless format |
