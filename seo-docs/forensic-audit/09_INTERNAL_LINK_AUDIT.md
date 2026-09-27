# Internal Link Graph & Equity Flow Forensics — Pandit Ji Express

**Audit Date:** September 27, 2026  
**Total Canonical Nodes:** 41  
**Graph Analysis Engine:** BFS Crawl & Inlink Frequency Mapping  

---

## 1. Internal Link Hierarchy & Tier Distribution

Pages are tiered by internal PageRank equity (measured by total incoming unique referring internal pages):

### Tier 1: Platform Hubs (30+ Internal Inlinks)
These pages receive sitewide link equity from navigation, footer, and contextual cross-links:
- `/pandit-shyam-sundar` (45 inlinks)
- `/samagri` (44 inlinks)
- `/services` (44 inlinks)
- `/satyanarayan-puja-bangalore` (40 inlinks)
- `/wedding-pandit-bangalore` (39 inlinks)
- `/` (38 inlinks)
- `/griha-pravesh-pooja-bangalore` (37 inlinks)
- `/havan-yagna-bangalore` (36 inlinks)
- `/areas-we-serve` (35 inlinks)

### Tier 2: Core Ceremonies & Sanskars (10–29 Internal Inlinks)
- `/privacy` (25 inlinks)
- `/puja-samagri-list-bangalore` (23 inlinks)
- `/booking` (21 inlinks)
- `/ganesh-puja-bangalore` (15 inlinks)
- `/pandit-cost-bangalore` (14 inlinks)
- `/mundan-ceremony-bangalore` (13 inlinks)
- `/naamkaran-ceremony-bangalore` (13 inlinks)
- `/annaprashan-bangalore` (12 inlinks)
- `/durga-puja-navratri-bangalore` (12 inlinks)
- `/upanayanam-janeu-bangalore` (11 inlinks)
- `/north-indian-pandit-hsr-layout` (10 inlinks)

### Tier 3: Supporting Guides & Locality Pages (4–9 Internal Inlinks)
- `/rudrabhishek-bangalore` (9 inlinks)
- `/north-indian-pandit-whitefield` (8 inlinks)
- `/north-indian-pandit-marathahalli` (8 inlinks)
- `/north-indian-wedding-rituals-bangalore` (8 inlinks)
- `/how-to-book-pandit-bangalore` (8 inlinks)
- `/best-north-indian-pandit-bangalore` (7 inlinks)
- `/online-pandit-bangalore` (7 inlinks)
- `/griha-pravesh-puja-bangalore-guide` (6 inlinks)
- `/bihari-pandit-bangalore` (5 inlinks)
- `/maithil-pandit-bangalore` (5 inlinks)
- `/hindi-speaking-pandit-bangalore` (5 inlinks)
- `/griha-pravesh-samagri-checklist` (4 inlinks)

### Tier 4: Starved / Weakly Linked Pages (2–3 Internal Inlinks)
⚠️ **CRITICAL FINDING:** These pages have insufficient internal link equity, explaining why Googlebot delays crawling and indexing them:
- `/chhath-puja-bangalore` (**3 inlinks**: `/blog`, `/diwali-lakshmi-puja-bangalore`, `/services`)
- `/diwali-lakshmi-puja-bangalore` (**3 inlinks**: `/blog`, `/chhath-puja-bangalore`, `/services`)
- `/wedding-vivah-checklist` (**3 inlinks**: `/puja-samagri-list-bangalore`, `/samagri`, `/wedding-pandit-bangalore`)
- `/north-indian-pandit-electronic-city` (**2 inlinks**: `/areas-we-serve`, `/north-indian-pandit-sarjapur-road`)
- `/north-indian-pandit-sarjapur-road` (**2 inlinks**: `/areas-we-serve`, `/north-indian-pandit-electronic-city`)

---

## 2. Click Depth Distribution
- **Depth 0:** `/` (1 page)
- **Depth 1:** 18 pages (Directly reachable from Homepage Header/Footer/Body)
- **Depth 2:** 22 pages (Reachable via Hub pages like `/services` or `/areas-we-serve`)
- **Depth 3+:** 0 canonical pages (Architecture is strictly &le; 2 clicks).
