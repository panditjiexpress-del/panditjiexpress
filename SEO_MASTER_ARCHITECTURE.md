# Pandit Ji Express — Master SEO Architecture & Control Framework (Phase 1)

**Domain:** `https://panditjiexpress.in`  
**Brand Entity:** Pandit Ji Express  
**Primary Industry:** Vedic Hindu Priesthood & Religious Services  
**Primary Geography:** Bengaluru (Bangalore Metropolitan Area), Karnataka, India  
**Target Community:** North Indian Diaspora (Hindi, Bihari, Maithil, Rajasthani, UP/MP, Marwari) & Cross-Cultural Bangalore Residents  
**Last Updated:** 2026-09-30  
**Version:** 1.0.0 (Phase 1 Baseline)

---

## 1. Business & Entity Definition

* **Canonical Brand:** Pandit Ji Express (`https://panditjiexpress.in/#organization`)
* **Founder & Head Priest:** Pandit Shyam Sundar (`https://panditjiexpress.in/pandit-shyam-sundar#person`)
  * Vedic Gurukul-educated scholar with 15+ years of active field experience in Bengaluru.
  * Lineage & training grounded in Shukla Yajurveda and classical Karmakanda.
* **Canonical NAP (Name, Address, Phone):**
  * **Name:** Pandit Ji Express
  * **Address:** Near Srirampura, Srirampura, Jakkur, Bengaluru, Karnataka 560064, India
  * **Phone / WhatsApp:** `+91 90657 88789`
  * **Email / Inquiries:** Through direct phone helpline and WhatsApp protocol.
* **Business Model:** Doorstep Vedic priest assignment with verified, Gurukul-trained North Indian purohits. Two-tier samagri logistics: family prepares fresh perishables or orders pre-packed authentic samagri kits hand-carried by the priest. Transparent dakshina with zero middleman bidding.

---

## 2. Core Service Areas & Topic Pillars

The website is architected into 6 core service areas, ensuring every query maps to a clear topical authority hierarchy:

```
PANDIT JI EXPRESS (BRAND ENTITY)
│
├── 1. VEDIC CEREMONY PILLARS
│   ├── Griha Pravesh (Housewarming) & Vastu Shanti
│   ├── Vedic Vivah Sanskar (North Indian Weddings)
│   ├── Satyanarayan Vrat Katha (5 Adhyayas + Panjiri)
│   ├── Hawan & Yagna (Maha Ganapati, Navagraha, Gayatri)
│   ├── Shiva Rudrabhishek (Panchamrit & Bilva Patra)
│   └── Ganesh Puja & Office Opening Consecration
│
├── 2. SACRED SANSCARS (16 HINDU VEDIC SANSCARS)
│   ├── Naamkaran Sanskar (Infant Naming by Janma Nakshatra)
│   ├── Mundan Ceremony (Chaul Sanskar / First Tonsure)
│   ├── Annaprashan (First Rice / Kheer Feeding)
│   └── Upanayanam / Janeu (Sacred Thread Investiture)
│
├── 3. FESTIVAL & REGIONAL DIASPORA PILLARS
│   ├── Chhath Mahaparv (Nahay Khay, Kharna, Sandhya & Usha Arghya)
│   ├── Diwali Lakshmi-Ganesh & Kuber Pujan (Pradosh Kaal)
│   └── Durga Puja & Navratri (Ghatasthapana & Chandi Path)
│
├── 4. LOCALITY AUTHORITY HUBS
│   ├── Whitefield & Kadugodi
│   ├── HSR Layout (Sectors 1–7)
│   ├── Marathahalli & Outer Ring Road
│   ├── Electronic City (Phase 1 & 2)
│   └── Sarjapur Road & Bellandur
│
├── 5. CULTURAL & LINGUISTIC ADAPTATION HUBS
│   ├── Hindi-Speaking Pandit Services
│   ├── Bihari & Purvanchali Ritual Customs
│   └── Maithil Vedic Traditions (Panji Prabandh, Madhushravani)
│
└── 6. CONSUMER EDUCATION, SAMAGRI & COMMERCIAL TRANSPARENCY
    ├── Transparent Dakshina & Cost Guide
    ├── How to Book a Pandit Framework
    ├── Online / Remote Vedic Consultations
    └── Full Samagri Inventories & Printable PDF Checklists
```

---

## 3. URL Architecture & Taxonomy Conventions

The site follows a strict flat-routing convention optimized for Cloudflare Pages clean URLs:
* **Root Clean URLs:** No trailing slashes, no file extensions in public links (e.g. `/griha-pravesh-pooja-bangalore`, not `.html`).
* **Service Pages:** `/{service}-bangalore` or `/{service}-pooja-bangalore`
* **Locality Pages:** `/north-indian-pandit-{locality}`
* **Informational Guides:** `/{topic}-bangalore-guide` or `/{topic}-bangalore`
* **Checklists:** `/{service}-samagri-checklist`
* **Preservation Rule:** Existing ranking URLs must NEVER be renamed for aesthetic reasons. Every URL in the 43-URL inventory is canonical and protected.

---

## 4. Search Intent Mapping & Anti-Cannibalization Rule

* **Governing Axiom:** **1 Query Intent = 1 Canonical Owner URL**.
* No two pages may target the exact same primary keyword and search intent.
* **Transactional Service Queries** (`griha pravesh pandit bangalore`, `wedding pandit bangalore`) belong exclusively to **Service Pillar Pages**.
* **Informational Queries** (`griha pravesh vidhi`, `wedding rituals 7 pheras`) belong exclusively to **Educational Guide Pages**.
* **Locality Queries** (`pandit in whitefield`, `pandit in hsr layout`) belong exclusively to **Locality Hub Pages**.
* **Broad Branded/Citywide Commercial Queries** (`north indian pandit in bangalore`) belong to the **Homepage** and are reinforced by the comprehensive guide `/pandit-ji-in-bangalore`.

---

## 5. Internal Linking Mesh Rules

* **Hierarchical Flow:** Homepage &rarr; Service Pillar &rarr; Informational Guides & Checklists &rarr; Locality Hubs &rarr; Booking / Contact.
* **Contextual Anchor Policy:** Always use descriptive, semantic anchor text (e.g., "Griha Pravesh Puja in Bangalore", "Vedic wedding rituals guide"). Never use generic anchors like "click here", "read more", or naked URLs.
* **Reciprocal Clustering:**
  * Every blog/guide must link back to its parent Service Pillar.
  * Every Service Pillar must link to its supporting Guides, Samagri Checklists, and relevant Locality Hubs.
  * Locality Hubs must link to core Services and back to `/areas-we-serve`.
* **Zero Orphan Policy:** Every indexable page must be discoverable within 2 clicks from the homepage or main navigation/footer menus.

---

## 6. AEO (Answer Engine Optimization) & AI Search Framework

Every high-value informational and service page must incorporate:
1. **AEO Direct Answer Box (`.blog-direct-answer` or `.lead-summary`):** A concise 40–60 word declarative statement providing an immediate, extractable answer for Google AI Overviews, ChatGPT Search, and Perplexity.
2. **Structured Tables & Step-by-Step Lists:** Process breakdowns, pricing benchmarks, and muhurat calendars formatted in semantic HTML (`<table>`, `<ol>`, `<ul>`).
3. **Dedicated FAQ Accordions (`details.blog-faq-item`):** Minimum 5–6 relevant, real-world questions marked up with matching `FAQPage` schema.
4. **AI Crawl Accessibility:** Unrestricted crawler access in `robots.txt` for Googlebot, Bingbot, GPTBot, ClaudeBot, and PerplexityBot.

---

## 7. Schema Architecture & Structured Data Standards

All canonical pages must implement JSON-LD using `@graph` notation:
* **Global Entity Nodes:** `Organization` (`#organization`), `WebSite` (`#website`), and `Person` (`#person`).
* **Page-Specific Primary Nodes:**
  * Homepage & Hubs: `LocalBusiness` / `ProfessionalService` + `WebPage`
  * Services: `Service` + `BreadcrumbList` + `FAQPage` (where FAQs exist)
  * Articles & Blogs: `BlogPosting` / `Article` + `BreadcrumbList` + `FAQPage`
* **Zero Fabrication Policy:** Schema must never include fake review counts, synthetic aggregate ratings, or unverified price claims.

---

## 8. Technical Crawlability & Build Validation

* The repository uses an automated validation runner (`scripts/validate.js`).
* **Mandatory CI Pre-requisite:** Before any deployment, `npm run build` executes `node scripts/validate.js build`, which enforces:
  1. Every `<loc>` entry in `sitemap.xml` maps to a physical `.html` file.
  2. Every local canonical page is declared in `sitemap.xml`.
  3. `validate-business`: Zero prohibited claims (no "guaranteed muhurat", no fake counts, no smoke detector bypass claims).
  4. `typecheck`: Valid JSON-LD schema parsing.
  5. `lint`: Valid meta titles, descriptions, canonical tags, and Open Graph tags.
  6. `format:check`: Valid file encoding.

---

## 9. Content Creation Gate & Governance Checklist

Before publishing ANY new page, the content must satisfy the 10-step gate:
1. *Is there an existing page targeting this query?* (If yes &rarr; Update existing page, do NOT create new URL).
2. *What is the exact search intent?* (Informational, Transactional, Local, Navigational).
3. *Which Pillar and Cluster does it belong to?*
4. *What unique information gain does it provide?* (Must contain original Vedic, local, or procedural insight).
5. *Does it link upward to its parent pillar and laterally to cluster siblings?*
6. *Is it registered in `sitemap.xml`, `llms.txt`, and `_redirects` (if applicable)?*
7. *Does it pass all `npm run build` checks?*
