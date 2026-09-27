# Forensic Noindex Directive Audit — Pandit Ji Express

**Audit Date:** September 27, 2026  
**Scope:** Every HTML file, HTTP Response Header, and Server Middleware.

---

## 1. Codebase Scan for Robots Directives

We searched all 48 HTML files for:
- `<meta name="robots" ...>`
- `<meta name="googlebot" ...>`
- Response headers (`X-Robots-Tag`)

### Detailed Findings Table

| URL / File | Robots Directive | Googlebot Directive | X-Robots-Tag Header | Indexable? | Classification | File & Line |
|---|---|---|---|---|---|---|
| `404.html` | `noindex, follow` | `None` | None | **NO** | INTENTIONAL | Line 10 |
| `SEO-BLOG-TEMPLATE.html` | `noindex, nofollow` | `None` | None | **NO** | INTENTIONAL | Line 19 |
| `about.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `admin.html` | `noindex, nofollow` | `None` | None | **NO** | INTENTIONAL | Line 8 |
| `annaprashan-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `areas-we-serve.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 8 |
| `best-north-indian-pandit-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 11 |
| `bihari-pandit-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 10 |
| `blog.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `booking.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `chhath-puja-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `contact.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `diwali-lakshmi-puja-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `durga-puja-navratri-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `gallery.html` | `index, follow` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 8 |
| `ganesh-puja-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `griha-pravesh-pooja-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `griha-pravesh-puja-bangalore-guide.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 10 |
| `griha-pravesh-samagri-checklist.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 11 |
| `havan-yagna-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `hindi-speaking-pandit-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 10 |
| `how-to-book-pandit-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 10 |
| `index.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `maithil-pandit-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 10 |
| `mundan-ceremony-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `naamkaran-ceremony-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `north-indian-pandit-electronic-city.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `north-indian-pandit-hsr-layout.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `north-indian-pandit-marathahalli.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `north-indian-pandit-sarjapur-road.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `north-indian-pandit-whitefield.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `north-indian-wedding-rituals-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 14 |
| `online-pandit-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 10 |
| `pandit-cost-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 10 |
| `pandit-rahul-shastri.html` | `noindex, follow` | `None` | None | **NO** | INTENTIONAL | Line 10 |
| `pandit-shyam-sundar.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `pandits.html` | `noindex, follow` | `None` | None | **NO** | INTENTIONAL | Line 10 |
| `privacy.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `puja-samagri-list-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 10 |
| `resources.html` | `noindex, follow` | `None` | None | **NO** | INTENTIONAL | Line 10 |
| `rudrabhishek-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `samagri.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `satyanarayan-puja-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `services.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 8 |
| `upanayanam-janeu-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `vastu-shanti-puja-bangalore.html` | `noindex, follow` | `None` | None | **NO** | INTENTIONAL | Line 10 |
| `wedding-pandit-bangalore.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 9 |
| `wedding-vivah-checklist.html` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` | `None` | None | **YES** | CANONICAL PUBLIC PAGE | Line 11 |

---

## 2. Noindex Audit Conclusion

- **Accidental Noindex Count:** **0**
- **Intentional Noindex Count:** **7** (`404.html`, `admin.html`, `SEO-BLOG-TEMPLATE.html`, `pandit-rahul-shastri.html`, `pandits.html`, `resources.html`, `vastu-shanti-puja-bangalore.html`).
- **Conclusion:** There is **zero accidental noindex suppression** on Pandit Ji Express. Any indexation delays on canonical pages are caused by crawl scheduling, link equity distribution, or content differentiation—NOT by robots meta directives.
