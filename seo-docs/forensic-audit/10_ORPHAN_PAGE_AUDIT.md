# Orphan Page Detection & Link Starvation Report — Pandit Ji Express

**Audit Date:** September 27, 2026  

---

## 1. Zero-Inlink Files (True Orphans)

The following files receive **0 internal links** across the entire website:

| File | Clean Path | Type | Indexable? | In Sitemap? | Reason for 0 Inlinks | Action Required |
|---|---|---|---|---|---|---|
| `404.html` | `/404` | Error Document | NO (`noindex`) | NO | Standalone error response | Keep as-is (Do not link) |
| `admin.html` | `/admin` | Admin Dashboard | NO (`noindex`) | NO | Private lead telemetry | Keep as-is (Do not link) |
| `SEO-BLOG-TEMPLATE.html` | `/SEO-BLOG-TEMPLATE` | Local Template | NO (`noindex`) | NO | Internal development scaffold | Keep as-is (Do not link) |
| `pandit-rahul-shastri.html` | `/pandit-rahul-shastri` | Legacy Stub | NO (`noindex`) | NO | 301 Redirect to Shyam Sundar | Keep as-is (Do not link) |
| `pandits.html` | `/pandits` | Legacy Stub | NO (`noindex`) | NO | 301 Redirect to Shyam Sundar | Keep as-is (Do not link) |
| `resources.html` | `/resources` | Legacy Stub | NO (`noindex`) | NO | 301 Redirect to Samagri | Keep as-is (Do not link) |
| `vastu-shanti-puja-bangalore.html` | `/vastu-shanti-puja-bangalore` | Legacy Stub | NO (`noindex`) | NO | 301 Redirect to Services | Keep as-is (Do not link) |

**Conclusion:** There are **zero orphan pages among canonical SEO URLs**. All 41 canonical URLs are accessible via crawl paths.

---

## 2. Link-Starved Canonical Pages (Immediate Action List)

These 5 canonical URLs are NOT orphans, but they suffer from **link starvation** (only 2 to 3 referring internal pages), which slows Googlebot indexation:

| Canonical URL | Referring Inlinks | Referring Source Pages | Click Depth | Recommended Cross-Link Sources |
|---|---|---|---|---|
| `/north-indian-pandit-electronic-city` | 2 | `/areas-we-serve`, `/north-indian-pandit-sarjapur-road` | 2 | Link from `/griha-pravesh-pooja-bangalore` (South Bangalore section), `/services` footer, `/blog` |
| `/north-indian-pandit-sarjapur-road` | 2 | `/areas-we-serve`, `/north-indian-pandit-electronic-city` | 2 | Link from `/wedding-pandit-bangalore` (Sarjapur venues), `/services` footer, `/blog` |
| `/chhath-puja-bangalore` | 3 | `/blog`, `/diwali-lakshmi-puja-bangalore`, `/services` | 2 | Link from `/bihari-pandit-bangalore`, `/maithil-pandit-bangalore`, `/puja-samagri-list-bangalore` |
| `/diwali-lakshmi-puja-bangalore` | 3 | `/blog`, `/chhath-puja-bangalore`, `/services` | 2 | Link from `/satyanarayan-puja-bangalore`, `/ganesh-puja-bangalore`, `/samagri` |
| `/wedding-vivah-checklist` | 3 | `/puja-samagri-list-bangalore`, `/samagri`, `/wedding-pandit-bangalore` | 2 | Link from `/north-indian-wedding-rituals-bangalore`, `/services`, `/how-to-book-pandit-bangalore` |
