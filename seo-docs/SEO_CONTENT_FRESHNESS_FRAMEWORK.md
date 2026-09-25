# Pandit Ji Express — Content Freshness & Decay Prevention Framework

**Document Version:** 1.0 (Phase 14 Comprehensive Specification)  
**Target Domain:** `https://panditjiexpress.in`  
**Governing Standard:** Continuous Topical Relevance, Zero Stale Information, Automated Freshness Signaling.

---

## 1. Executive Summary & Objective

In competitive search landscapes—particularly for localized and event-driven queries such as Hindu ceremonies, muhurat dates, and pricing—content that remains static inevitably experiences **organic search decay**. Google's helpful content systems and rank scoring reward freshness when queries exhibit temporal sensitivity.

This framework defines the formal operational processes, monitoring cadences, and standard operating procedures (SOPs) to ensure the 35 canonical URLs of Pandit Ji Express maintain unbroken topical freshness, accurate Shastric dates, and ongoing search dominance.

---

## 2. Content Decay Risk Classification

We classify our 35 canonical URLs into three distinct decay susceptibility tiers:

```
  [ HIGH DECAY RISK ]               [ MEDIUM DECAY RISK ]               [ LOW DECAY RISK ]
  (Quarterly / Seasonal Review)      (Bi-Annual Review)                  (Annual Review)
  
  • /griha-pravesh-puja-bangalore-   • /pandit-cost-bangalore            • /about
    guide (Muhurat tables)           • /how-to-book-pandit-bangalore     • /privacy
  • /north-indian-wedding-rituals-   • /puja-samagri-list-bangalore      • /gallery
    bangalore (Vivah muhurats)       • /online-pandit-bangalore          • /pandit-shyam-sundar
  • /durga-puja-navratri-bangalore   • Locality Pages (Whitefield,       • Core Sanskars (Naamkaran,
    (Festival calendar updates)        HSR, Marathahalli)                  Mundan, Annaprashan, Janeu)
  • /blog (Seasonal editorial)       • /samagri (Market pricing)
```

---

## 3. Scheduled Maintenance & Review Cadence

| Cadence | Focus Area | Responsible Role | Key Actions |
| :--- | :--- | :--- | :--- |
| **Quarterly (Every 90 Days)** | **Auspicious Muhurat & Calendar Review** | Senior Astrological / Content Specialist | Inspect Griha Pravesh and Wedding guides. Update upcoming Shubh Muhurat dates based on current Vikram Samvat panchang. Synchronize schema `dateModified`. |
| **Bi-Annually (Every 180 Days)** | **Pricing & Dakshina Market Calibration** | Commercial Content Architect | Review `/pandit-cost-bangalore` and commercial guides against local market trends. Ensure dakshina guidance remains transparent and realistic. |
| **Bi-Annually (Every 180 Days)** | **Bangalore Neighborhood & Transit Audit** | Local SEO Specialist | Review society lists, traffic patterns, and transit routes on `/north-indian-pandit-whitefield`, `/north-indian-pandit-hsr-layout`, and `/north-indian-pandit-marathahalli`. Add newly established apartment complexes. |
| **Annually (Every 365 Days)** | **Samagri & Botanical Sourcing Audit** | Ayurvedic & Samagri Lead | Verify local vendor contacts in Chickpet, Malleshwaram, and Gandhi Bazaar on `/samagri`. Update seasonal botanical guidelines and apartment safety norms. |
| **Continuous (Monthly)** | **GSC & Analytics Decay Trigger Scan** | Technical SEO Lead | Run decay detection script on Search Console data to flag pages losing impressions or rankings. |

---

## 4. Algorithmic Content Decay Triggers

A page is formally flagged as **"In Decay"** when any of the following statistical conditions are met in Google Search Console (28-day window vs. prior 28 days, adjusted for seasonality):

1. **Rank Decay:** Average position for primary target keywords drops by $> 2.5$ positions.
2. **CTR Decay:** Click-through rate falls by $> 15\%$ on stable impression volumes (indicating SERP snippet obsolescence).
3. **Impression Decay:** Non-seasonal impressions drop by $> 20\%$ for two consecutive rolling cycles.
4. **Information Gap Drift:** Competitor emergence in AI search overviews (GEO/AEO) citing newer data points or different muhurat lists.

---

## 5. Content Refresh Standard Operating Procedure (SOP)

When a page triggers a decay warning or reaches its scheduled review milestone, execute the following 6-step refresh protocol:

### Step 1: Serper & Competitive SERP Audit
- Search the primary target keyword in an incognito window set to Bangalore location.
- Analyze top 3 ranking competitors and AI Overviews for newly introduced topics, sub-questions, or formatting formats.

### Step 2: Temporal & Date Verification
- Update any past year/month references (e.g., updating upcoming auspicious dates for the current quarter).
- Ensure references to upcoming Hindu months (Chaitra, Vaishakha, Shravana, Kartika) align with the current calendar.

### Step 3: Information Gain & Evidence Expansion
- Review recent ceremony photos from Pandit Shyam Sundar's fieldwork and update image metadata.
- Inject 1–2 newly emerging user questions from real family inquiries into the page's FAQ section.

### Step 4: Schema & JSON-LD Synchronization
- Update `"dateModified"` to the ISO-8601 string of the exact date of revision (`YYYY-MM-DDTHH:MM:SS+05:30`).
- If new FAQs are added, synchronize them immediately into the `FAQPage` schema.

### Step 5: Quality & Business Truth Gate
- Run automated validation suite:
  ```bash
  npm run validate-business && npm run typecheck && npm run lint && npm run format:check && npm run build
  ```
- Guarantee 0 prohibited claims (no courier delivery promises, no smoke detector false claims, no fake PhDs).

### Step 6: Recrawl & Indexation Acceleration
- Submit revised clean URL to Google Search Console via URL Inspection Tool.
- Verify edge caching re-validation and HTTP 200 delivery.

---

## 6. Long-Term Content Architecture Protection

1. **URL Permanence:** Never alter canonical URLs during a refresh. Content evolves within the existing URL structure to retain historical backlinks and PageRank.
2. **Anti-Thin Content Policy:** No page may drop below 1,000 words for core pillars, or 600 words for brand/utility pages.
3. **Changelog Transparency:** All significant content overhauls must be logged in `seo-docs/SEO_CHANGE_LOG.md`.
