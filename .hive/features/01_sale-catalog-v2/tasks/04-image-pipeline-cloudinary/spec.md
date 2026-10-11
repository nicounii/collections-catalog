# Task: 04-image-pipeline-cloudinary

## Feature: sale-catalog-v2

## Dependencies

- **2. airtable-schema--seed-export** (02-airtable-schema--seed-export)

## Plan Section

### 4. Image pipeline (Cloudinary)

**Depends on**: 2

**Files:**
- Create: `src/lib/cloudinary.js`
- Modify: `src/components/ProductMedia.jsx` (use the helper; add `srcset`/width hints; WebP/format auto)
- Modify: `src/components/ProductCard.jsx` (pass a sized URL/ratio if needed)
- Create (docs): `docs/image-pipeline.md`

**What to do:**
- **OPERATOR:** create a Cloudinary account; create a **restricted/signed** upload preset; upload existing `public/photos/*` and put delivery URLs into Airtable `image_url`.
- `src/lib/cloudinary.js`: `cldUrl(url, { w, h, crop='fill', quality='auto', format='auto' })` — inject transformation params **only when** `typeof url === 'string' && url.includes('res.cloudinary.com') && url.includes('/image/upload/')`; otherwise return `url` unchanged (local `/photos/...`, empty, or `undefined`). Insertion point: immediately after `/image/upload/` → `…/image/upload/<params>/<publicId>`.
- `ProductMedia.jsx`: when `product.image` is a Cloudinary URL, render `src` + `srcSet` (e.g. 400/800/1200) with `sizes`; keep `loading="lazy"`, `decoding="async"`. Keep the `<Plate>` glyph fallback untouched.
- `docs/image-pipeline.md`: preset settings, naming, and the rule **never an open unsigned preset**.

**Must NOT do:**
- Do not use an open unsigned upload preset.
- Do not put the Cloudinary API secret in client code (only the public cloud name).
- Do not remove the glyph fallback path.

**References:**
- `docs/PLAN-SUMMARY.md:50,98` — external images + restricted preset.
- `src/components/ProductMedia.jsx:21-38` — image render path.
- `src/components/ProductCard.jsx:26` — `ratio="aspect-[4/5]"` usage site.

**Verify:**
- [ ] `node -e "import('./src/lib/cloudinary.js').then(m=>console.log(m.cldUrl('https://res.cloudinary.com/demo/image/upload/sample.jpg',{w:400})))"` → URL contains `w_400` and `f_auto`.
- [ ] `npm run dev`, open catalog with a Cloudinary-backed item → image loads; non-Cloudinary item still renders.
- [ ] `docs/image-pipeline.md` documents the restricted preset.
- [ ] OPERATOR: at least the launch-subset items have real Cloudinary `image_url` in Airtable.

---

## Task Type

modification

## Completed Tasks

- 01-initialize-repo--hygiene: Completed in-session: git init -b main, .gitignore (node_modules, dist, .env*, generated catalog, hive runtime state), .env.example (AIRTABLE_*, CLOUDINARY_*, MP_*), README.md SOP. Committed bc44a79; plan committed ca1981c; pushed to origin/main (nicounii/collections-catalog).
- 02-airtable-schema--seed-export: Created scripts/export-seed.mjs (code schema → Airtable field names, status=available, mp_link/order_ref empty), generated seed-sample.json (29 rows, verified equal to products.length via ESM dynamic import), and docs/airtable-schema.md (14-field table + category single-select values + bootstrap steps). OPERATOR step deferred: create the Airtable base and CSV-import seed-sample.json (user chose build-code-first).
- 03-data-sync-layer: Created scripts/sync-catalog.mjs (Airtable → src/data/products.generated.json; paginates via offset, filterByFormula excludes status='sold', field map image_url→image/image_alt→imageAlt/mp_link→mpLink/order_ref→orderRef/created→added, sorts by id; no creds → copies sample as dev fallback exit 0; creds+error → exit 1; production+0 items → exit 1), scripts/ensure-catalog.mjs (predev: copy sample only if missing), src/data/products.sample.json (6-item committed dev fallback), rewrote src/data/products.js to static-import products.generated.json while preserving CATEGORIES/byCategory/journalPosts/NAV_LINKS/SUB_NAV, added package.json scripts sync/prebuild/predev. Import sites (CartContext.jsx:2, Catalog.jsx:2, App.jsx:13) already point at ../data/products.js — no re-pointing needed. Updated scripts/export-seed.mjs to re-emit committed seed-sample.json (29 rows) since products.js is now generated; verified idempotent. Verified: sync no-creds exit 0, ensure-catalog exit 0, sync bad-creds exit 1, export-seed 29 rows, npm run build passes (prebuild hook works), products.generated.json gitignored.
