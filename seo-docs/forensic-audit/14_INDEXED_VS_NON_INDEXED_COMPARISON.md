# Indexed vs Non-Indexed Side-by-Side Comparison — Pandit Ji Express

**Audit Date:** September 27, 2026  
**Objective:** Compare 5 consistently indexed/ranking pages against 5 non-indexed or delayed pages to identify systemic causative patterns.

---

## 1. Side-by-Side Feature Matrix

| Feature | Group A: Established & Indexed Pages | Group B: Delayed / Non-Indexed Pages | Pattern / Causative Difference |
|---|---|---|---|
| **Representative URLs** | 1. `/`<br>2. `/wedding-pandit-bangalore`<br>3. `/areas-we-serve`<br>4. `/north-indian-pandit-hsr-layout`<br>5. `/best-north-indian-pandit-bangalore` | 1. `/north-indian-pandit-electronic-city`<br>2. `/north-indian-pandit-sarjapur-road`<br>3. `/chhath-puja-bangalore`<br>4. `/diwali-lakshmi-puja-bangalore`<br>5. `/wedding-vivah-checklist` | Group A has established crawl history; Group B was added in recent sprints. |
| **Internal Inlinks** | **35 to 44 inlinks** | **2 to 3 inlinks** | **MASSIVE DIFFERENCE (15x inlink equity gap).** Group B is link-starved. |
| **Click Depth** | **Depth 1** (Direct from header/footer) | **Depth 2** (Reachable only via intermediate hub) | Group A receives top-level PageRank flow. |
| **Global Nav Link?** | YES (Present in main nav or footer) | NO (Absent from main nav, only 1 locality hub link) | Strong signal to Googlebot of relative page importance. |
| **Age on Live Domain** | 30+ days | < 5 days | Google indexing pipeline latency (takes 7–14 days for new pages on emerging domains). |
| **Canonical Status** | Clean, self-referential | Clean, self-referential | Identical (Not the cause). |
| **Robots Directives** | `index, follow` | `index, follow` | Identical (Not the cause). |
| **Sitemap Inclusion** | Declared in `sitemap.xml` | Declared in `sitemap.xml` | Identical (Not the cause). |
| **Word Count** | ~1,500 – 3,100 words | ~1,400 – 2,000 words | Both groups have solid word depth. |
| **Schema Types** | Organization, Service, FAQPage | Organization, Service, FAQPage | Both have valid schema. |
| **Phrase Uniqueness** | High uniqueness | 25–28% boilerplate overlap with Whitefield | Group B has higher template similarity. |

---

## 2. Key Synthesis
The reason Group B pages lag behind Group A is **NOT technical penalties or missing meta tags**.  
The divergence is driven by two measurable factors:
1. **Internal Link Equity Starvation:** Group B URLs have only 2–3 incoming links, signaling lower structural priority to Googlebot.
2. **Crawl & Indexing Lag:** Group B pages were published recently; Googlebot has not yet completed initial indexing cycles.
