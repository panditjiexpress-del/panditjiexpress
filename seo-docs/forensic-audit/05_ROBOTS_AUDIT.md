# Robots.txt Forensic Audit — Pandit Ji Express

**Live URL:** `https://panditjiexpress.in/robots.txt`  
**HTTP Status:** 200 OK  
**Content-Type:** text/plain; charset=utf-8  
**Cache-Control:** public, max-age=86400  

---

## 1. Live Content of robots.txt

```text
# Master Robots Policy - 100% Crawlable & Indexable (Pandit Ji Express)
User-agent: *
Allow: /

# Search Engine Crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI Search & Generative Engine Crawlers
User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot
Allow: /

# Internal system paths protection
Disallow: /scratch/
Disallow: /.system_generated/

# Master XML Sitemap
Sitemap: https://panditjiexpress.in/sitemap.xml
```

---

## 2. Directive Evaluation Matrix

| User-Agent | Directive | Path | Effect on Public SEO Pages | Assessment |
|---|---|---|---|---|
| `*` | `Allow` | `/` | Full crawl permission granted | Correct |
| `Googlebot` | `Allow` | `/` | Explicit full crawl permission | Correct |
| `Bingbot` | `Allow` | `/` | Explicit full crawl permission | Correct |
| `OAI-SearchBot` | `Allow` | `/` | Explicit OpenAI Search crawl permission | Correct |
| `PerplexityBot` | `Allow` | `/` | Explicit Perplexity AI crawl permission | Correct |
| `*` | `Disallow` | `/scratch/` | Blocks private scratch build scripts | Correct (Protects non-public files) |
| `*` | `Disallow` | `/.system_generated/` | Blocks system task logs | Correct (Protects non-public files) |
| `*` | `Sitemap` | `https://panditjiexpress.in/sitemap.xml` | Points to master canonical sitemap | Correct |

---

## 3. Robots.txt vs Noindex Distinction
- **Robots.txt** controls **CRAWL ACCESS**. When a page is blocked in robots.txt, Googlebot cannot fetch the content, parse HTML, or see canonical tags.
- **Noindex** controls **INDEX INCLUSION**. Googlebot MUST be allowed to crawl the page to read the `<meta name="robots" content="noindex">` tag.
- **Forensic Finding:** `robots.txt` does NOT block any HTML page, CSS file, JavaScript file, or image asset. Googlebot has 100% unobstructed access to the entire site.
