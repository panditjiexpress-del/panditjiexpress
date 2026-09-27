# Root Cause Analysis — Pandit Ji Express

**Audit Date:** September 27, 2026  

---

### Root Cause 1: Internal Link Starvation on Newer Canonical Pages
- **What is wrong:** 5 canonical pages have only 2–3 incoming internal links.
- **Why it is wrong:** Googlebot allocates crawl budget and indexing priority based on internal link PageRank. Pages with <= 3 links are treated as low priority.
- **Affected URLs:**
  - `/north-indian-pandit-electronic-city` (2 links)
  - `/north-indian-pandit-sarjapur-road` (2 links)
  - `/chhath-puja-bangalore` (3 links)
  - `/diwali-lakshmi-puja-bangalore` (3 links)
  - `/wedding-vivah-checklist` (3 links)
- **Likely Root Cause:** Pages were created recently and cross-links were only added from 1 or 2 files.
- **Confidence:** **HIGH**
- **Severity:** **P1 (HIGH)**
- **Recommended Fix:** Add contextual in-content links from high-authority hub pages (`/griha-pravesh-pooja-bangalore`, `/services`, `/bihari-pandit-bangalore`, `/blog`).

---

### Root Cause 2: Legacy .html Ingestion in GSC Reports
- **What is wrong:** 22 URLs previously reported in GSC under "Discovered – currently not indexed".
- **Why it is wrong:** Googlebot originally discovered legacy `.html` extensions from early deployments.
- **Affected URLs:** `/services.html`, `/satyanarayan-puja-bangalore.html`, etc.
- **Likely Root Cause:** Google takes several weeks to fully purge redirected `.html` URLs and update reports to show clean URLs.
- **Confidence:** **HIGH**
- **Severity:** **P4 (INFORMATIONAL / NO ACTION NEEDED)**
- **Recommended Fix:** Do nothing. Server 308 redirects and canonicals are working perfectly. Google will automatically resolve this over upcoming crawl cycles.

---

### Root Cause 3: Template Overlap Between Newer Locality Pages
- **What is wrong:** 25.8% 3-gram phrase overlap between Electronic City and Sarjapur Road.
- **Why it is wrong:** Google's helpful content systems prefer pages with rich, differentiated first-hand local knowledge over templated location variations.
- **Affected URLs:** `/north-indian-pandit-electronic-city`, `/north-indian-pandit-sarjapur-road`
- **Confidence:** **MEDIUM**
- **Severity:** **P2 (MEDIUM)**
- **Recommended Fix:** Enhance localized content with specific apartment names, local landmarks, and community havan guidelines.
