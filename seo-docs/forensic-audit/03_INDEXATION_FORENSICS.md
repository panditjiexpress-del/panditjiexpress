# Google Indexation Forensics — Pandit Ji Express

**Audit Date:** September 27, 2026  
**Search Surface:** Google Search (Desktop & Mobile Smartphone Crawlers)  

---

## 1. Classification of Indexation States

Across the site's total known URL ecosystem (41 canonicals + 7 utility/stubs + legacy URL variants), URLs fall into the following empirical categories:

```
                    [ TOTAL SITE URL ECOSYSTEM ]
                                 │
         ┌───────────────────────┴───────────────────────┐
         ▼                                               ▼
  [ 41 CANONICAL URLS ]                       [ NON-CANONICAL / LEGACY ]
         │                                               │
   ┌─────┴─────┐                                   ┌─────┴─────┐
   ▼           ▼                                   ▼           ▼
[INDEXED]  [PENDING RECRAWL]                  [REDIRECTED]  [NOINDEXED]
 19 URLs     22 URLs                           22 .html       7 Utility/
(Established)(Recent additions/updates)        variants       Stubs
```

---

## 2. Diagnostic Breakdown of GSC States

### State 1: INDEXED AND RANKING (19 URLs)
Established URLs with strong internal equity and long-standing presence:
- `https://panditjiexpress.in/` (Core Homepage)
- `https://panditjiexpress.in/wedding-pandit-bangalore`
- `https://panditjiexpress.in/areas-we-serve`
- `https://panditjiexpress.in/north-indian-pandit-hsr-layout`
- `https://panditjiexpress.in/best-north-indian-pandit-bangalore`
- `https://panditjiexpress.in/hindi-speaking-pandit-bangalore`
- `https://panditjiexpress.in/online-pandit-bangalore`
- `https://panditjiexpress.in/pandit-cost-bangalore`
- `https://panditjiexpress.in/griha-pravesh-puja-bangalore-guide`
- `https://panditjiexpress.in/puja-samagri-list-bangalore`
- `https://panditjiexpress.in/how-to-book-pandit-bangalore`
- `https://panditjiexpress.in/north-indian-wedding-rituals-bangalore`
*(Plus established service hub pages)*

### State 2: DISCOVERED – CURRENTLY NOT INDEXED (Legacy .html Variants)
- **Count:** 22 URLs
- **Nature:** All URLs ending in `.html` (e.g., `/satyanarayan-puja-bangalore.html`).
- **Forensic Diagnosis:** Cloudflare Pages issues an `HTTP/2 308 Permanent Redirect` to the clean extensionless URL. The clean URL declares itself canonical. Google acknowledges the redirect and canonical declaration by excluding the `.html` version from indexing.
- **Problem or Expected?** **100% Expected & Normal.**

### State 3: CRAWLED – CURRENTLY NOT INDEXED (Historical GSC Snapshot)
- `http://panditjiexpress.in/`: Insecure protocol. 301-redirected to HTTPS. Should never be indexed.
- `/contact`: Thin utility contact form. Search engines typically deprioritize bare contact forms.
- `/bihari-pandit-bangalore`: Crawled prior to link mesh deployment. Needs recrawl.
- `/maithil-pandit-bangalore`: Crawled prior to link mesh deployment. Needs recrawl.

### State 4: PENDING DISCOVERY / INITIAL INDEXING (Newer Releases)
The 6 newest additions published in recent phases:
1. `/north-indian-pandit-electronic-city`
2. `/north-indian-pandit-sarjapur-road`
3. `/chhath-puja-bangalore`
4. `/diwali-lakshmi-puja-bangalore`
5. `/griha-pravesh-samagri-checklist`
6. `/wedding-vivah-checklist`
- **Status:** Validly included in `sitemap.xml`, canonical declared, HTTP 200 live. They are awaiting initial crawl and indexing processing by Googlebot.

### State 5: INTENTIONALLY NOINDEXED (7 Files)
- `404.html`: Error page.
- `admin.html`: Private telemetry tool.
- `SEO-BLOG-TEMPLATE.html`: Local drafting template.
- 4 legacy stubs (`pandits.html`, etc.): Non-canonical stubs.
