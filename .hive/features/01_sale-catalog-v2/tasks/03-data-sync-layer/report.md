# Task Report: 03-data-sync-layer

**Feature:** sale-catalog-v2
**Completed:** 2026-10-11T05:13:57.255Z
**Status:** success
**Commit:** 6c1cd96e790392dde6b6654addb9d0aed04e3379

---

## Summary

Created scripts/sync-catalog.mjs (Airtable → src/data/products.generated.json; paginates via offset, filterByFormula excludes status='sold', field map image_url→image/image_alt→imageAlt/mp_link→mpLink/order_ref→orderRef/created→added, sorts by id; no creds → copies sample as dev fallback exit 0; creds+error → exit 1; production+0 items → exit 1), scripts/ensure-catalog.mjs (predev: copy sample only if missing), src/data/products.sample.json (6-item committed dev fallback), rewrote src/data/products.js to static-import products.generated.json while preserving CATEGORIES/byCategory/journalPosts/NAV_LINKS/SUB_NAV, added package.json scripts sync/prebuild/predev. Import sites (CartContext.jsx:2, Catalog.jsx:2, App.jsx:13) already point at ../data/products.js — no re-pointing needed. Updated scripts/export-seed.mjs to re-emit committed seed-sample.json (29 rows) since products.js is now generated; verified idempotent. Verified: sync no-creds exit 0, ensure-catalog exit 0, sync bad-creds exit 1, export-seed 29 rows, npm run build passes (prebuild hook works), products.generated.json gitignored.

---

## Changes

- **Files changed:** 6
- **Insertions:** +253
- **Deletions:** -392

### Files Modified

- `package.json`
- `scripts/ensure-catalog.mjs`
- `scripts/export-seed.mjs`
- `scripts/sync-catalog.mjs`
- `src/data/products.js`
- `src/data/products.sample.json`
