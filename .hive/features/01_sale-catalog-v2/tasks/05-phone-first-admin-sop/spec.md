# Task: 05-phone-first-admin-sop

## Feature: sale-catalog-v2

## Dependencies

- **2. airtable-schema--seed-export** (02-airtable-schema--seed-export)
- **4. image-pipeline-cloudinary** (04-image-pipeline-cloudinary)

## Plan Section

### 5. Phone-first admin SOP

**Depends on**: 2, 4

**Files:**
- Create: `docs/listing-sop.md`

**What to do:**
- Write a ≤60s/item checklist (photograph → Cloudinary upload → Airtable row → 5 fields → publish) that mirrors `README.md` but with screenshots-in-words, field-by-field guidance, and common mistakes.
- Include a "weekly inventory sweep" routine (re-price slow movers, mark sold, refresh photos).
- Note the optional restricted-upload form is **deferred** (not built now).

**Must NOT do:**
- Do not build an in-app admin form (Airtable app is the admin).

**References:**
- `docs/PLAN-SUMMARY.md:81` — Task 5 scope.
- `docs/business-plan.md:166-169` — recurring processes.

**Verify:**
- [ ] `docs/listing-sop.md` exists; a reader can list an item end-to-end without touching code.
- [ ] Checklist enumerates the 5 required Airtable fields per item.

---

## Task Type

greenfield

## Completed Tasks

- 01-initialize-repo--hygiene: Completed in-session: git init -b main, .gitignore (node_modules, dist, .env*, generated catalog, hive runtime state), .env.example (AIRTABLE_*, CLOUDINARY_*, MP_*), README.md SOP. Committed bc44a79; plan committed ca1981c; pushed to origin/main (nicounii/collections-catalog).
- 02-airtable-schema--seed-export: Created scripts/export-seed.mjs (code schema → Airtable field names, status=available, mp_link/order_ref empty), generated seed-sample.json (29 rows, verified equal to products.length via ESM dynamic import), and docs/airtable-schema.md (14-field table + category single-select values + bootstrap steps). OPERATOR step deferred: create the Airtable base and CSV-import seed-sample.json (user chose build-code-first).
- 03-data-sync-layer: Created scripts/sync-catalog.mjs (Airtable → src/data/products.generated.json; paginates via offset, filterByFormula excludes status='sold', field map image_url→image/image_alt→imageAlt/mp_link→mpLink/order_ref→orderRef/created→added, sorts by id; no creds → copies sample as dev fallback exit 0; creds+error → exit 1; production+0 items → exit 1), scripts/ensure-catalog.mjs (predev: copy sample only if missing), src/data/products.sample.json (6-item committed dev fallback), rewrote src/data/products.js to static-import products.generated.json while preserving CATEGORIES/byCategory/journalPosts/NAV_LINKS/SUB_NAV, added package.json scripts sync/prebuild/predev. Import sites (CartContext.jsx:2, Catalog.jsx:2, App.jsx:13) already point at ../data/products.js — no re-pointing needed. Updated scripts/export-seed.mjs to re-emit committed seed-sample.json (29 rows) since products.js is now generated; verified idempotent. Verified: sync no-creds exit 0, ensure-catalog exit 0, sync bad-creds exit 1, export-seed 29 rows, npm run build passes (prebuild hook works), products.generated.json gitignored.
- 04-image-pipeline-cloudinary: Created src/lib/cloudinary.js (cldUrl(url,{w,h,crop,quality,format}) injects transformation params only for res.cloudinary.com /image/upload/ URLs; local paths/empty/undefined pass through unchanged; isCldUrl exported), enhanced src/components/ProductMedia.jsx to emit srcSet (400/800/1200) + sizes for Cloudinary-backed images while keeping loading=lazy/decoding=async and the <Plate> glyph fallback untouched, and created docs/image-pipeline.md (signed/restricted preset settings, naming, never-open-unsigned rule, no API secret in client). ProductCard.jsx needed no change — it already passes ratio and ProductMedia computes srcSet internally. Verified: cldUrl('https://res.cloudinary.com/demo/image/upload/sample.jpg',{w:400}) → w_400,c_fill,q_auto,f_auto; pass-through for /photos/..., undefined, ''; srcSet shape correct; npm run build passes. Not run: interactive npm run dev browser check (headless env). OPERATOR deferred: create Cloudinary account + signed preset, upload public/photos/*, set image_url in Airtable for launch subset.
