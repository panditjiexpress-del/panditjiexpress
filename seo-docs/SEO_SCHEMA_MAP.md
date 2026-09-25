# Pandit Ji Express — Master Structured Data & Schema Architecture Map

**Last Updated:** September 25, 2026  
**Auditor / Architect:** Senior Structured Data & Knowledge Graph Engineer  
**Compliance Standard:** Schema.org Core Specification / Google Search Central Guidelines  
**Syntax:** JSON-LD within `<head>` `<script type="application/ld+json">`  
**Status:** FULLY ENRICHED, VALIDATED & SYNCHRONIZED  

---

## 1. Schema Philosophy & Core Principles

Pandit Ji Express implements structured data as an immutable translation layer between visual front-end content and machine-readable search intelligence (Google Knowledge Graph, Google AI Overviews, Perplexity, Bing Copilot, ChatGPT Search).

### Core Architectural Rules:
1. **Universal `@graph` Structure:** All entities on a page reside within a connected `@graph` array, resolving cyclic dependencies and enabling multi-type entity linking.
2. **Persistent `@id` Identity Architecture:** Every primary entity is identified by a stable, canonical URI anchor:
   - Organization: `https://panditjiexpress.in/#organization`
   - WebSite: `https://panditjiexpress.in/#website`
   - Founder: `https://panditjiexpress.in/pandit-shyam-sundar#person`
   - WebPage: `https://panditjiexpress.in/<slug>#webpage`
   - BreadcrumbList: `https://panditjiexpress.in/<slug>#breadcrumb`
   - Service: `https://panditjiexpress.in/<slug>#service`
   - FAQPage: `https://panditjiexpress.in/<slug>#faq`
3. **Wikidata & Wikipedia Entity Grounding (`sameAs` / `about`):** Every service and guide links explicitly to authoritative Wikipedia / Wikidata entities to eliminate topical ambiguity.
4. **Strict Review Safeguard Policy:** Absolutely ZERO fictitious `AggregateRating` or fake star reviews. Following Google guidelines, rating schema is omitted unless tied to verified, third-party consumer reviews.
5. **Dual-Layer Q&A Ingestion (`FAQPage`):** 100% of visible FAQs across 22 primary pages are synchronized into Schema.org `FAQPage` objects.

---

## 2. Page-by-Page Schema Deployment Matrix (All 35 URLs)

| URL Slug | Primary Schema Types in `@graph` | Entity Disambiguation (`about` / `sameAs`) | Breadcrumb |
| :--- | :--- | :--- | :---: |
| `/` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList` | Wikipedia: Bangalore (`Q1355`), Karnataka (`Q1185`) | **Yes** |
| `/services` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList` | Wikipedia: Bangalore (`Q1355`) | **Yes** |
| `/griha-pravesh-pooja-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Griha Pravesh (`Q3506306`), Vastu Shastra | **Yes** |
| `/wedding-pandit-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Hindu Wedding (`Q1530366`), Vivaha | **Yes** |
| `/satyanarayan-puja-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Satyanarayan Puja (`Q3634044`) | **Yes** |
| `/havan-yagna-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Yajna (`Q1392813`), Homa | **Yes** |
| `/ganesh-puja-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Ganesha (`Q1579`), Ganesh Chaturthi | **Yes** |
| `/rudrabhishek-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Shiva (`Q11380`), Abhisheka | **Yes** |
| `/durga-puja-navratri-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Durga Puja (`Q1032126`), Navaratri | **Yes** |
| `/naamkaran-ceremony-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Namakarana (`Q3505677`) | **Yes** |
| `/mundan-ceremony-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Chudakarana (`Q3634931`) | **Yes** |
| `/annaprashan-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Annaprashana (`Q564560`) | **Yes** |
| `/upanayanam-janeu-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Upanayana (`Q1341094`) | **Yes** |
| `/bihari-pandit-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Chhath Puja (`Q5094970`) | **Yes** |
| `/maithil-pandit-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Wikipedia: Maithil (`Q3348633`) | **Yes** |
| `/hindi-speaking-pandit-bangalore` | `BlogPosting`, `BreadcrumbList`, `FAQPage` | Author: Pandit Shyam Sundar | **Yes** |
| `/areas-we-serve` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList` | Wikipedia: Bangalore Neighborhoods | **Yes** |
| `/north-indian-pandit-whitefield` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service` | Wikipedia: Whitefield (`Q7996160`) | **Yes** |
| `/north-indian-pandit-hsr-layout` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service` | Wikipedia: HSR Layout (`Q5636034`) | **Yes** |
| `/north-indian-pandit-marathahalli` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service` | Wikipedia: Marathahalli (`Q6755030`) | **Yes** |
| `/pandit-cost-bangalore` | `BlogPosting`, `BreadcrumbList`, `FAQPage` | Pricing / Dakshina Framework | **Yes** |
| `/how-to-book-pandit-bangalore` | `BlogPosting`, `BreadcrumbList`, `FAQPage` | Booking Process / Protocol | **Yes** |
| `/online-pandit-bangalore` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Virtual Consultation Limits | **Yes** |
| `/samagri` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage` | Two-Tier Samagri Model | **Yes** |
| `/puja-samagri-list-bangalore` | `BlogPosting`, `BreadcrumbList`, `FAQPage` | Samagri Checklist / 16 Dravyas | **Yes** |
| `/best-north-indian-pandit-bangalore` | `BlogPosting`, `Organization`, `Person`, `BreadcrumbList`, `FAQPage` | Wikipedia: Purohita (`Q2348574`) | **Yes** |
| `/griha-pravesh-puja-bangalore-guide` | `BlogPosting`, `BreadcrumbList`, `FAQPage` | Wikipedia: Griha Pravesh (`Q3506306`) | **Yes** |
| `/north-indian-wedding-rituals-bangalore` | `BlogPosting`, `BreadcrumbList`, `FAQPage` | Wikipedia: Hindu Wedding (`Q1530366`) | **Yes** |
| `/pandit-shyam-sundar` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `Person` | Gurukul Pedigree / Head Priest | **Yes** |
| `/about` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList` | Founding Story / Vedic Ethos | **Yes** |
| `/booking` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList` | Interactive Booking System | **Yes** |
| `/gallery` | `ImageGallery`, `BreadcrumbList` | Authentic Ceremony Photos | **Yes** |
| `/blog` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `CollectionPage`, `BreadcrumbList`, `ItemList` | Master Blog Index | **Yes** |
| `/contact` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList` | Jakkur Office Address & Maps | **Yes** |
| `/privacy` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite`, `WebPage`, `BreadcrumbList` | Legal Privacy Policy | **Yes** |

---

## 3. Schema Quality & CI/CD Validation

Every page is validated using automated test scripts in `scripts/validate.js`:
- **JSON Syntax:** Verified via native `JSON.parse` across all HTML files.
- **Graph Completeness:** Verified that mandatory `@type` declarations exist and resolve cleanly.
- **Attribution & Pedigree:** Verified that all authors link to `https://panditjiexpress.in/pandit-shyam-sundar#person` and publishers link to `https://panditjiexpress.in/#organization`.