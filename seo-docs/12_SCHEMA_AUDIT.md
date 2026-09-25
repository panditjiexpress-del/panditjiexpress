# Pandit Ji Express — Structured Data & Schema Audit (Phase 01)

**Audit Date:** 2026-09-25  
**Auditor:** Structured Data & Schema Implementation Engineer  
**Standard:** Schema.org / Google Search Central Guidelines  
**Format:** JSON-LD (JavaScript Object Notation for Linked Data)  
**Status:** COMPLIANT & CLEAN  

---

## 1. Schema Strategy & Ethical Boundaries

Structured data functions strictly as a **machine-readable translation layer** for content that is visible to human users. Pandit Ji Express adheres to strict schema governance:
1. **Zero Fictitious Reviews:** No `AggregateRating` or `Review` markup is injected without verifiable third-party customer review integrations.
2. **Conservative FAQPage Markup:** Following Google's August 2023 search update restricting FAQ rich snippets primarily to authoritative government/health websites, FAQ sections are presented cleanly in semantic HTML rather than bloated schema that risks quality penalties.
3. **Persistent `@id` Identity:** Every entity uses a permanent URI to build a unified Knowledge Graph.

---

## 2. Page-by-Page Schema Deployment Matrix

| Page Category | URLs | Implemented Schemas | Core Attributes Mapped | Validation Status |
| :--- | :--- | :--- | :--- | :--- |
| **Homepage** | `/` | `LocalBusiness`, `ProfessionalService`, `Organization`, `WebSite` | `name`, `alternateName`, `founder`, `address`, `geo`, `telephone`, `openingHoursSpecification`, `areaServed`, `sameAs` | **Valid (Schema.org)** |
| **Founder Profile** | `/pandit-shyam-sundar` | `Person`, `ProfilePage`, `BreadcrumbList` | `name`, `jobTitle`, `worksFor`, `knowsLanguage`, `description`, `image`, `url` | **Valid (Schema.org)** |
| **Service Hub** | `/services` | `CollectionPage`, `BreadcrumbList` | `name`, `description`, `hasOfferCatalog` | **Valid (Schema.org)** |
| **Service Pillars** (Wedding, Griha Pravesh, Satyanarayan, Havan, Ganesh, Rudra) | `/wedding-pandit-bangalore`, `/griha-pravesh-pooja-bangalore`, etc. | `Service`, `ProfessionalService`, `BreadcrumbList` | `name`, `serviceType`, `provider`, `areaServed`, `description`, `termsOfService` | **Valid (Schema.org)** |
| **Locality Pages** (Whitefield, HSR, Marathahalli) | `/north-indian-pandit-whitefield`, etc. | `LocalBusiness`, `BreadcrumbList` | `name`, `serviceArea`, `containedInPlace`, `provider` | **Valid (Schema.org)** |
| **Cornerstone Guides** | `/best-north-indian-pandit-bangalore`, `/north-indian-wedding-rituals-bangalore`, etc. | `Article`, `BreadcrumbList` | `headline`, `author` (`Person`), `publisher` (`Organization`), `datePublished`, `dateModified`, `mainEntityOfPage` | **Valid (Schema.org)** |
| **Samagri Hub** | `/samagri`, `/puja-samagri-list-bangalore` | `ItemPage`, `BreadcrumbList` | `name`, `description`, `about` | **Valid (Schema.org)** |

---

## 3. Sample Compliant JSON-LD Architecture

### 3.1 Service Schema Example (`/satyanarayan-puja-bangalore`)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://panditjiexpress.in/satyanarayan-puja-bangalore#service",
      "name": "Satyanarayan Puja in Bangalore",
      "serviceType": "Hindu Religious Ceremony",
      "description": "Traditional North Indian Shri Satyanarayan Katha and Puja services in Bangalore with complete Shastric vidhi, Sanskrit chanting, and samagri guidance.",
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://panditjiexpress.in/#organization",
        "name": "Pandit Ji Express"
      },
      "areaServed": {
        "@type": "City",
        "name": "Bengaluru",
        "@id": "https://www.wikidata.org/wiki/Q1355"
      },
      "category": "Religious Services"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://panditjiexpress.in/satyanarayan-puja-bangalore#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://panditjiexpress.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://panditjiexpress.in/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Satyanarayan Puja",
          "item": "https://panditjiexpress.in/satyanarayan-puja-bangalore"
        }
      ]
    }
  ]
}
```

---

## 4. Schema Testing & Continuous QA
* Validated with Schema.org validator & Google Rich Results Test standards.
* All JSON-LD scripts are embedded in the `<head>` of HTML documents.
* Zero trailing comma syntax errors or unescaped characters.
