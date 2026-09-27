# JavaScript & DOM Rendering Forensics — Pandit Ji Express

**Audit Date:** September 27, 2026  
**Testing Environment:** Raw HTML vs Headless Chrome Rendered DOM  

---

## 1. Raw HTML vs Rendered DOM Comparison

Googlebot uses a two-wave indexing process:
1. **Wave 1:** Raw HTML parsing (Immediate, low compute).
2. **Wave 2:** Web Rendering Service (WRS) JavaScript execution (Delayed by hours or days).

Websites that rely on client-side JavaScript rendering (Single Page Apps, React, Vue) suffer massive indexing delays.

### Pandit Ji Express Rendering Test:

| Content Element | Present in Raw HTML? | Requires JavaScript to Render? | Wave 1 Indexed? |
|---|---|---|---|
| **Page Title** | YES | NO | Immediate |
| **Meta Description** | YES | NO | Immediate |
| **Canonical Tag** | YES | NO | Immediate |
| **H1 & H2 Headings** | YES | NO | Immediate |
| **Body Paragraphs** | YES | NO | Immediate |
| **Samagri Tables** | YES | NO | Immediate |
| **Internal Navigation Links** | YES | NO | Immediate |
| **Footer & Locality Links** | YES | NO | Immediate |
| **JSON-LD Schema Scripts** | YES | NO | Immediate |
| **Ceremony Modal Dialogs** | YES (in DOM, hidden via CSS) | NO | Immediate |

### Conclusion:
- Pandit Ji Express is **100% Server-Rendered Static HTML**.
- Googlebot discovers 100% of the site's content during **Wave 1** without requiring JavaScript execution.
- JavaScript (`assets/js/script.js`) is strictly used for progressive enhancement (opening modals, mobile drawer toggle, tab switching, and click telemetry).
