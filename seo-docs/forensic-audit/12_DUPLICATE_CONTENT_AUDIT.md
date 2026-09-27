# Duplicate & Near-Duplicate Content Audit — Pandit Ji Express

**Audit Date:** September 27, 2026  
**Methodology:** Full-text Jaccard vocabulary similarity & 3-gram phrase sequence analysis across 41 canonical pages.

---

## 1. Locality Page Similarity Matrix

We compared all 5 Bangalore locality pages:

| Locality Comparison | Shared Vocabulary (Jaccard) | 3-Gram Phrase Overlap | Risk Level |
|---|---|---|---|
| `whitefield` vs `hsr-layout` | 40.3% | 9.9% | LOW |
| `whitefield` vs `marathahalli` | 46.1% | 14.2% | LOW |
| `whitefield` vs `electronic-city` | **57.4%** | **28.4%** | **MODERATE** |
| `whitefield` vs `sarjapur-road` | 51.9% | 20.2% | LOW–MODERATE |
| `hsr-layout` vs `marathahalli` | 42.6% | 10.6% | LOW |
| `hsr-layout` vs `electronic-city` | 38.1% | 8.9% | LOW |
| `hsr-layout` vs `sarjapur-road` | 37.5% | 8.3% | LOW |
| `marathahalli` vs `electronic-city` | 40.8% | 11.4% | LOW |
| `marathahalli` vs `sarjapur-road` | 39.6% | 10.9% | LOW |
| `electronic-city` vs `sarjapur-road` | **57.0%** | **25.8%** | **MODERATE** |

### Forensic Finding on Locality Pages:
- When `/north-indian-pandit-electronic-city` and `/north-indian-pandit-sarjapur-road` were generated in Phase 17, they adapted structural frameworks from `whitefield`.
- As a result, approximately **25%–28% of 3-word phrase sequences** (such as introductory boilerplate explaining Vedic rituals in Bangalore apartments) are shared between these two pages.
- **Search Engine Consequence:** Google may view these two pages as template-heavy variations of each other, delaying indexation of the newer one until unique local signals are increased.

---

## 2. Cultural Page Similarity Matrix

| Cultural Comparison | Shared Vocabulary (Jaccard) | 3-Gram Phrase Overlap | Risk Level |
|---|---|---|---|
| `bihari-pandit` vs `maithil-pandit` | 42.6% | 12.2% | LOW |
| `bihari-pandit` vs `hindi-speaking-pandit` | 28.2% | 2.9% | ZERO |
| `maithil-pandit` vs `hindi-speaking-pandit` | 26.8% | 2.7% | ZERO |
| `bihari-pandit` vs `best-north-indian-pandit` | 26.9% | 1.5% | ZERO |

### Forensic Finding on Cultural Pages:
- Cultural community pages have **extremely low phrase overlap (1.5% to 12.2%)**.
- They are genuinely differentiated by community rituals (Mithila Panji vivah customs vs Bhojpuri Satyanarayan vidhi).
- Their previous delay in GSC was caused purely by **link equity starvation**, NOT duplicate content.
