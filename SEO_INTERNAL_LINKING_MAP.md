# Pandit Ji Express — Internal Linking Architecture & Mesh (Phase 1)

**Domain:** `https://panditjiexpress.in`  
**Governing Standard:** Intentional PageRank Distribution & Bidirectional Semantic Mesh. Zero Naked Anchors.

---

## 1. Global Navigation & Footer Foundation

* **Primary Desktop/Mobile Header Menu:**
  * Home (`/`)
  * Services Directory (`/services`)
  * Samagri Resource Center (`/samagri`)
  * Areas Served (`/areas-we-serve`)
  * Vedic Knowledge Base (`/blog`)
  * Founder Profile (`/pandit-shyam-sundar`)
  * Book a Pandit CTA (`/booking`)
* **Sitewide Footer Quick Links:**
  * Core Services: Griha Pravesh, Wedding Vivah, Satyanarayan, Havan & Yagna, Rudrabhishek.
  * Locality Hubs: Whitefield, HSR Layout, Marathahalli, Electronic City, Sarjapur Road.
  * Cultural Hubs: Hindi Speaking, Bihari Pandit, Maithil Pandit.
  * Commercial Guides: Transparent Dakshina, How to Book, Puja Samagri List.
  * Trust & Legal: About, Contact, Gallery, Privacy Policy.

---

## 2. Topic-Level Bidirectional Link Graphs

### Mesh A: Griha Pravesh & Housewarming
```
               [ / ] (Homepage)
                 │
                 ▼
 [ /griha-pravesh-pooja-bangalore ] (Commercial Pillar)
      ▲                     ▲                   ▲
      │ (Pillar Link)       │ (Checklist Link)  │ (Local Service Link)
      │                     │                   │
[ /griha-pravesh-puja-  [ /griha-pravesh-    [ /north-indian-pandit-
  bangalore-guide ]        samagri-checklist ]   whitefield / hsr / etc. ]
      │                     │                   │
      └─────────────────────┴───────────────────┘
                            │
                            ▼
                    [ /booking ] (Conversion)
```

### Mesh B: Vedic Vivah (North Indian Wedding)
```
               [ / ] (Homepage)
                 │
                 ▼
    [ /wedding-pandit-bangalore ] (Commercial Pillar)
      ▲                     ▲
      │ (Pillar Link)       │ (Checklist Link)
      │                     │
[ /north-indian-wedding- [ /wedding-vivah-
  rituals-bangalore ]       checklist ]
      │                     │
      └──────────┬──────────┘
                 ▼
    [ /pandit-cost-bangalore ] (Pricing Transparency)
                 ▼
         [ /booking ] (Conversion)
```

### Mesh C: Locality Hubs & Metropolitan Directory
```
            [ /areas-we-serve ] (Bangalore Directory Hub)
              │         │         │         │         │
              ▼         ▼         ▼         ▼         ▼
          Whitefield   HSR   Marathahalli E-City   Sarjapur
              │         │         │         │         │
              └─────────┴────┬────┴─────────┴─────────┘
                             │
                             ▼
     Core Services: Griha Pravesh, Vivah, Satyanarayan, Havan
                             │
                             ▼
               [ /booking ] & Click-to-Call
```

---

## 3. Contextual Anchor Text Standards

Always use descriptive, semantically relevant anchor text:
* **For Griha Pravesh:** "authentic Griha Pravesh Puja in Bangalore", "step-by-step Griha Pravesh guide", "printable Griha Pravesh samagri checklist".
* **For Weddings:** "North Indian wedding pandit in Bangalore", "7 pheras and Vedic vivah rituals", "wedding mandap samagri list".
* **For Localities:** "North Indian pandit in Whitefield", "Vedic purohit in HSR Layout", "puja services in Electronic City".
* **For Costs:** "transparent pandit dakshina charges", "cost of booking a pandit in Bangalore".
* **For Booking:** "book a verified Vedic pandit online", "schedule your ceremony muhurat".

**Strictly Prohibited:** "click here", "read more", "this link", "check this out", naked URLs.
