# Structured Data (JSON-LD) Forensic Audit — Pandit Ji Express

**Audit Date:** September 27, 2026  
**Standard:** Schema.org JSON-LD Specification  

---

## 1. Schema Architecture Matrix

All canonical pages implement Schema.org structured data using an interconnected `@graph` array:

| Schema Node | `@type` | Included On | Verified Properties |
|---|---|---|---|
| **Organization** | `Organization` | Sitewide | `@id`, `name`, `url`, `logo`, `contactPoint`, `address` |
| **LocalBusiness** | `LocalBusiness` | Homepage, Locality Pages | `@id`, `name`, `image`, `telephone`, `priceRange`, `address`, `geo`, `areaServed` |
| **WebSite** | `WebSite` | Sitewide | `@id`, `name`, `url`, `publisher` |
| **WebPage** | `WebPage` | Sitewide | `@id`, `url`, `name`, `description`, `breadcrumb`, `isPartOf` |
| **BreadcrumbList** | `BreadcrumbList` | All Sub-pages | Clean hierarchical `itemListElement` with 2–3 position steps |
| **Service** | `Service` | 16 Ceremony Pages | `serviceType`, `provider`, `areaServed`, `description` |
| **FAQPage** | `FAQPage` | 18 Ceremony & Locality Pages | Authentic `mainEntity` Question & Answer pairs |
| **Person** | `Person` | `/pandit-shyam-sundar` | Verified bio, Sanskrit qualifications, Vedic lineage |

---

## 2. Integrity & Anti-Fabrication Safeguards
- **Zero Fabricated Reviews:** No fake `AggregateRating` or fabricated review counts.
- **Zero Fictional Personas:** Legacy `Pandit Rahul Shastri` schema was completely purged; all schema references point to verified priest **Pandit Shyam Sundar**.
- **NAP Consistency:** All schema nodes share exact phone (`+919065788789`) and physical address (Srirampura, Jakkur, Bengaluru 560064).
