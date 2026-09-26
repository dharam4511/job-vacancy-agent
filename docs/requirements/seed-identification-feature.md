# Seed Identification Feature — Requirements

**Document Date:** 2026-09-25  
**Feature Owner:** (You)  
**Status:** Requirements Approved

---

## 📋 Problem Statement

Indian farmers often struggle to identify the exact wheat variety they're planting. With 100+ wheat varieties in the Indian market, each with different:
- Yield potential
- Water requirements
- Disease resistance
- Fertilizer needs
- Growth timeline

Farmers can't easily tell which variety they have, leading to:
- Suboptimal crop management
- Wrong fertilizer/pesticide recommendations
- Missed yield potential
- Crop failures if variety doesn't match growing conditions

**Solution:** Add an AI-powered seed identification feature to KisanLog where farmers photograph seeds and the app identifies the exact wheat variety with recommendations.

---

## 👥 Actors

1. **Primary User:** Smallholder farmer with smartphone (feature user)
2. **Secondary User:** KisanLog agronomist/support team (trains model, validates results)
3. **Data Source:** Seed vendors, farmers with known seed varieties (provide training photos)
4. **System:** ML model running on KisanLog backend

---

## ✅ Functional Requirements

### Scope: MVP (Wheat Only)

#### FR1: Camera Capture
- **Requirement:** Farmer can open camera from KisanLog app and photograph their seeds
- **Technical:** Mobile app (iOS/Android) integrates device camera
- **Data:** Captured image sent to backend for processing
- **UX:** Simple "Take Photo" button → preview → "Identify" button

#### FR2: Seed Identification
- **Requirement:** System identifies the wheat variety from the photo with ≥95% confidence
- **Technical:** Custom-trained ML model (ResNet-50) runs on backend
- **Output:** Single identified variety (high confidence only) OR list of top 3 matches if <95% confident
- **Scope (MVP):** Support 10-15 popular Indian wheat varieties (see Appendix A)
- **Scope (v1.1):** Expand to 50+ varieties based on user feedback and crowdsourced data
- **Performance:** Response time <5 seconds

#### FR3: Show Seed Variety Details
- **Requirement:** After identification, show farmer detailed info about that wheat variety:
  - Variety name (Hindi + English)
  - Plant height, grain color, yield potential
  - Water requirements
  - Disease resistance profile
  - Fertilizer recommendations
  - Typical growth timeline
  - Seed source (where to buy)
- **Data:** Seed variety database (to be created)
- **UI:** Card layout with tabs (Overview, Nutrition, Diseases, Timeline)

#### FR4: Auto-Fill Crop Logs
- **Requirement:** Pre-populate KisanLog's crop entry form with identified variety
- **Flow:**
  1. Farmer identifies seed → Variety = "PBW 373"
  2. System auto-fills crop log: `crop_type = "Wheat"`, `variety = "PBW 373"`
  3. Farmer completes rest of form (sowing date, field size, etc.)
- **Data:** Link to crop_logs table in KisanLog DB

#### FR5: Show Personalized Recommendations
- **Requirement:** Based on identified variety, show farming recommendations
  - Suggested fertilizer amounts for this variety
  - Common diseases for this variety (when to watch)
  - Optimal watering schedule
  - Harvest tips
- **Data:** Rules engine based on variety + region (if available)
- **Example:** "PBW 373 needs 40kg Nitrogen per acre. Watch for leaf rust in August."

#### FR6: Search/History
- **Requirement:** Farmer can view past seed identifications
  - View gallery of photos taken
  - See identification date and confidence score
  - Delete old identifications
- **Data:** Store in `seed_identifications` table with metadata

---

## 🎯 Non-Functional Requirements

### NF1: Accuracy
- **Target (MVP):** ≥95% accuracy on 10-15 wheat varieties
- **Target (v1.1):** ≥92% accuracy on 50+ varieties (more varieties = slightly lower accuracy acceptable)
- **Definition:** Model predicts correct variety as #1 match
- **Validation:** Test on held-out dataset of unseen seed photos
- **Fallback:** If <95% confident, show top 3 matches for farmer to pick

### NF2: Performance
- **Image upload:** <2 seconds
- **Model inference:** <3 seconds
- **Response to user:** <5 seconds total
- **UI responsiveness:** No freezing during processing

### NF3: Connectivity
- **Requirement:** Online only (MVP)
- **Note:** Farmer must have internet to use feature (can be offline app later)
- **Implication:** Works in areas with mobile/WiFi; graceful error if offline

### NF4: Data Privacy
- **Requirement:** Farmer seed photos are private
- **Policy:** Do not store photos beyond 30 days (unless farmer opts to keep history)
- **Compliance:** GDPR-compatible (no biometric data)
- **Farmer consent:** Show privacy notice before first use

### NF5: Localization
- **Language:** Hindi + English for variety names and recommendations
- **Units:** kg/acre (common in India)
- **Date format:** DD/MM/YYYY

### NF6: Mobile Optimization
- **Target devices:** Android 9+, iOS 13+ (typical KisanLog users)
- **Photo size:** Optimize for low-bandwidth areas (compress images before upload)
- **Screen sizes:** Work on small screens (4.5" to 6.5")

---

## 📊 Technical Approach (High Level)

### Data Collection Phase (Pre-MVP) — REVISED FOR REALISM

**MVP Approach: Hybrid (Existing Data + Limited Collection)**

#### Phase 1: Secure Existing Datasets (Week 1-2)
1. **Request datasets from:**
   - ICRISAT (International Crops Research Institute for Semi-Arid Tropics) — wheat datasets available
   - ICAR (Indian Council of Agricultural Research) — government wheat variety photos
   - Kaggle datasets — plant/seed identification datasets (may need filtering for wheat)
   - Seed companies (ITC, Monsanto, Syngenta) — may have classification data
2. **Expected outcome:** 500-1,000 labeled wheat seed photos (10-15 varieties)
3. **Timeline:** 1-2 weeks (just need approvals + downloads)
4. **Cost:** Free or minimal partnership fees

#### Phase 2: Quick Ground Collection (Week 2-3)
1. **Targeted collection:** 2-3 person team visits major seed vendors
   - Focus on top 10-15 wheat varieties only (NOT 50+)
   - Collect 20-50 photos per variety (minimal, high-quality)
   - Total: ~300-500 additional photos
2. **Sources:**
   - Local seed shops (Delhi, Punjab, MP regions)
   - Cooperative seed distribution centers
   - Agricultural input dealers
3. **Timeline:** 2-3 weeks
4. **Cost:** Travel + small incentives (~₹5,000-10,000)

#### Phase 3: Post-Launch Crowdsourcing (Ongoing)
1. **Gradually expand:** Users submit seed photos through app
2. **Retrain quarterly:** Add new varieties as data accumulates
3. **Timeline:** Continuous (6+ months to reach 50+ varieties)

**Total for MVP Launch:** ~800-1,500 labeled photos (10-15 varieties)  
**Timeline:** 3-4 weeks (vs. 2-3 months originally)  
**Cost:** Low (~₹10,000-20,000)

#### Phase 4: Scale to 50+ Varieties (v1.1, Q4/Q1)
After MVP launch and user feedback, expand using:
- Crowdsourced photos from app users
- Additional vendor partnerships
- Agricultural research institutions

### Model Development
- **Architecture:** Transfer learning (ResNet-50 or EfficientNet pre-trained on ImageNet)
- **Framework:** TensorFlow/PyTorch
- **Training:** 80% train / 10% validation / 10% test split
- **Success metric:** ≥95% top-1 accuracy on test set
- **Output:** Inference model (TensorFlow Lite or ONNX) for deployment

### Deployment
- **Backend:** REST API endpoint (`/api/identify-seed`)
- **Model hosting:** 
  - Option A: GPU server (AWS EC2 g4dn, Azure GPU, GCP TPU) ~$0.50-2/hour
  - Option B: Serverless inference (AWS SageMaker, Google Cloud AI Platform)
- **Database:** Add `seed_identifications` table, `wheat_varieties` lookup table

---

## 🚫 Out of Scope (MVP)

- ❌ **Offline identification** (requires on-device model; deferred to v2)
- ❌ **Diseases/pest identification** (future feature)
- ❌ **Crop advisory based on weather** (separate feature)
- ❌ **Non-wheat crops** (wheat-only MVP; expand in v1.1)
- ❌ **Direct e-commerce** (show links only, don't process sales)
- ❌ **Fertilizer/pesticide ordering** (show recommendations only)

---

## ✨ Acceptance Criteria

| Criterion | Definition | How to Test |
|-----------|-----------|------------|
| AC1: Photo capture | Farmer can take photo from app | Manual: Open app → camera → capture wheat seed photo |
| AC2: Identification works | Model identifies variety with ≥95% confidence | Automated: Run inference on 500 test images, check accuracy |
| AC3: UI shows results | Seed variety name, details, recommendations displayed | Manual: Check identification result matches expected variety |
| AC4: Auto-fill works | Crop log pre-populated with variety | Manual: Identify seed → check crop form has variety pre-filled |
| AC5: History visible | Past identifications can be viewed | Manual: Take 3 photos, view all 3 in history tab |
| AC6: Performance <5s | Full request-response under 5 seconds | Automated: Measure end-to-end latency (p95 <5s) |
| AC7: Graceful failures | Errors handled (no crash if API down) | Manual: Test with network disabled, check error message |
| AC8: Privacy notice shown | Privacy disclosure appears on first use | Manual: First-time user sees popup before feature access |

---

## ⚠️ Open Questions / Decisions Needed

1. **Infrastructure cost model:** Who pays for GPU servers? (KisanLog budget vs. per-use fee)
2. **Training data ownership:** After collecting 5,000+ seed photos, who owns them?
3. **Model versioning:** How often will we retrain the model? Quarterly? On-demand?
4. **Regional varieties:** Should we support region-specific wheat varieties (for North India vs. South)?
5. **Seed growth stage:** Can model handle seeds at different stages (fresh, dried, sprouted)?

---

## 🎬 Handoff to Next Phase

**Ready for:** System Design  
**Next phase:** Architecture design for:
- ML model training pipeline
- API endpoint design
- Database schema for seed varieties
- Mobile UI mockups
- Infrastructure plan

**Not blocked on:** Training data collection can happen in parallel

---

## 📎 Appendix A: Target Wheat Varieties

### MVP (10-15 Most Popular Varieties)
1. **PBW 373** — Most popular in Punjab, high-yielding
2. **DBW 187** — Popular in North India, disease-resistant
3. **HD 3086** — Eastern India, widely cultivated
4. **WH 1105** — Central India, drought-tolerant
5. **GW 190** — Gujarat region, semi-dwarf
6. **WH 1025** — Western regions
7. **MP 3336** — Madhya Pradesh, heat-tolerant
8. **VL 907** — North India
9. **NW 5046** — Northwestern India
10. **RW 2025** — Rajasthan and Western regions
11. **HD 2967** — Eastern regions
12. **DWIMARC-70** — Advanced breeding line
13. **UAS 304** — South Indian variety
14. **BH 540** — Bread wheat
15. **UP 2425** — Uttar Pradesh

**Rationale:** These 15 varieties account for ~70-80% of wheat area in India

### v1.1 (Expand to 50+ varieties)
- Additional state-specific varieties
- Advanced breeding lines
- Specialty wheats (basmati, durum, etc.)
- Regional preferences per agro-climatic zone

**Source confirmation:** To be validated with ICAR / State Agriculture Departments

---

---

## 🎯 REVISED SUMMARY (Realistic Timeline)

| Aspect | Original | **REVISED** |
|--------|----------|-----------|
| Training photos needed | 2,500-5,000 | **800-1,500** |
| Collection time | 2-3 months | **3-4 weeks** |
| Wheat varieties (MVP) | 50+ | **10-15** |
| Accuracy target | 95%+ on 50 varieties | **95%+ on 10-15 varieties** |
| Timeline to MVP launch | 4-5 months | **4 weeks** |
| Collection cost | High | **Low (₹10-20K)** |
| Approach | Custom collection | **Existing datasets + quick vendor visits + crowdsource later** |

**Key Change:** Use existing ICRISAT/ICAR datasets (saves 2+ months) + small ground team for quality variations

**Approved by:** (Pending sign-off)  
**Next review:** Post-design phase
