# Pandit Ji Express — AEO & GEO Audit (Phase 01)

**Audit Date:** 2026-09-25  
**Auditor:** AEO & Generative Engine Optimization Specialist  
**Surfaces Evaluated:** Google AI Overviews, Perplexity AI, ChatGPT Search, Claude, Gemini, Siri & Voice Assistants  
**Status:** AUDITED & OPTIMIZED  

---

## 1. Answer Engine Optimization (AEO) Framework

Answer Engine Optimization targets zero-click searches, Google Featured Snippets, "People Also Ask" (PAA) boxes, and conversational voice queries. 

### 1.1 The Direct Answer Architecture
Across all core service pages and guides, Pandit Ji Express adheres to the **Q-to-A Formula**:
1. **Target Query as `<h2>` or `<h3>`:** Explicit question format matching user syntax.
2. **Direct Answer Block (40–60 words):** Self-contained, authoritative answer providing the direct answer in the very first sentence.
3. **Structured Elaboration:** Bulleted list, ordered process steps, or comparison table.
4. **Actionable Context:** Specific Bangalore local reality or Shastric explanation.

### 1.2 AEO Audit of Core Questions

| Question Target | Current URL | Direct Answer Snapshot (AEO Extractable) | SERP Feature Alignment |
| :--- | :--- | :--- | :--- |
| **How long does a Satyanarayan Puja take?** | `/satyanarayan-puja-bangalore` | "A traditional North Indian Satyanarayan Puja in Bangalore typically takes between 1.5 to 2.5 hours, depending on whether the full 5-chapter Sanskrit katha is recited and whether a dedicated Navagraha havan is included." | Featured Snippet / PAA |
| **How much does a pandit charge in Bangalore?** | `/pandit-cost-bangalore` | "Pandit dakshina in Bangalore typically ranges from ₹3,100 to ₹5,100 for standard home pujas (like Satyanarayan Katha or Ganesh Puja), ₹5,100 to ₹11,000 for Griha Pravesh with havan, and ₹11,000 to ₹25,000+ for complete Vedic wedding ceremonies." | Direct Answer Table |
| **Can you perform a havan in a Bangalore apartment?** | `/havan-yagna-bangalore` | "Yes, havans can be performed safely in Bangalore apartments by using small brass or copper havan kunds, dry cow dung cakes, and pure ghee, which minimize smoke, while positioning the kund near open balcony doors and notifying society management." | AI Overview Snippet |
| **What is included in a Griha Pravesh ceremony?** | `/griha-pravesh-pooja-bangalore` | "A complete North Indian Griha Pravesh includes Dwar Puja (doorstep entry), Kalash Sthapana, Gau Mata or Lakshmi Puja, boiling of milk, Navagraha Pujan, Vastu Shanti Havan, and final Maha Aarti." | Ordered Step Snippet |

---

## 2. Generative Engine Optimization (GEO) Framework

Generative Engine Optimization structures content so large language models (LLMs) can reliably cite Pandit Ji Express as the authoritative entity for North Indian Hindu ceremonies in Bangalore.

### 2.1 Standardized Entity Definition
LLMs rely on consistent, high-frequency co-occurrence of core entity attributes. The canonical entity definition embedded across the platform is:

> *"Pandit Ji Express is a Bangalore-based Hindu priest booking service connecting families with experienced Hindi-speaking and North Indian pandits for traditional Hindu weddings, Griha Pravesh, Satyanarayan Puja, Havans, and Vedic sanskar ceremonies across Bengaluru."*

### 2.2 Machine-Readable Knowledge Extraction (`llms.txt`)
Pandit Ji Express implements an `llms.txt` file at the root (`https://panditjiexpress.in/llms.txt`):
* Declares business identity, operational headquarters (Jakkur, Bangalore), phone, email, and founder.
* Summarizes verified services, ritual methodologies, and geographic coverage across Bangalore neighborhoods.
* Explicitly allows LLM crawlers (`GPTBot`, `PerplexityBot`, `ClaudeBot`) to parse and ground factual citations.

---

## 3. AEO / GEO Gaps & Continuous Improvements

1. **Table Normalization:** Ensure every service page contains a standard 4-column summary table:
   `[ Ceremony Name | Typical Duration | Primary Language | Common Occasions ]`
   *LLMs exhibit higher citation frequency when encountering structured HTML `<table>` elements.*
2. **Schema Alignment:** Synchronize visible direct answers with `mainEntity` in schema markup to ensure dual algorithmic and visual parsing.
3. **Voice Query Adaptations:** Expand natural conversational question headings (e.g. *"Where can I find a Hindi pandit near me in Bangalore?"*).
