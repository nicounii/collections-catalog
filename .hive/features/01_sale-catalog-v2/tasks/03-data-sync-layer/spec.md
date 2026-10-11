# Task: 03-data-sync-layer

## Feature: sale-catalog-v2

## Dependencies

- **2. airtable-schema--seed-export** (02-airtable-schema--seed-export)

## Plan Section

### 3. Data sync layer

**Depends on**: 2

**Files:**
- Create: `scripts/sync-catalog.mjs`
- Create: `scripts/ensure-catalog.mjs`
- Create: `src/data/products.sample.json` (small committed fallback)
- Modify: `src/data/products.js` → re-point to generated data (keep `CATEGORIES`, helpers, `journalPosts`, `NAV_LINKS`, `SUB_NAV`)
- Modify: `src/context/CartContext.jsx:2` (import source)
- Modify: `src/components/Catalog.jsx:2` (import source)
- Modify: `src/App.jsx:13` (import source)
- Modify: `package.json` (add `"sync"`, `"prebuild"`, `"predev"` scripts)

**What to do:**
- `scripts/sync-catalog.mjs` — the **only** producer of `src/data/products.generated.json`:
  - Read `AIRTABLE_TOKEN`/`AIRTABLE_BASE_ID`/`AIRTABLE_TABLE`; paginate via `offset`; `filterByFormula` excludes `status='sold'`.
  - Field map (Airtable → app): `image_url`→`image`, `image_alt`→`imageAlt`, `mp_link`→`mpLink`, `order_ref`→`orderRef`, `status`→`status`, `created` (Airtable automatic `Created time`)→`added`. All other fields pass through unchanged.
  - Deterministic output: sort by `id` before writing so git diffs are stable.
  - **Fail-loud policy (no masking):**
    - Creds **absent** → if `products.generated.json` is missing, copy `products.sample.json` → it; log a warning; exit `0`.
    - Creds **present** but (a) HTTP/API error, or (b) `NODE_ENV=production` and 0 items → log error; exit `1` (**the build must fail**; never fall back to the sample).
- `scripts/ensure-catalog.mjs`: copies `products.sample.json` → `products.generated.json` **only if the target is missing**. Used by `predev` only (local dev without creds). It never overwrites a real synced file and never masks a sync failure.
- `src/data/products.sample.json`: committed, small (~6-item) valid array for creds-less local dev.
- `src/data/products.js`: a single static import — `import generated from './products.generated.json'` — exported as `products`; keep all existing named exports (`CATEGORIES`, `byCategory`, `journalPosts`, `NAV_LINKS`, `SUB_NAV`). The file is guaranteed to exist because `prebuild`/`predev` always run the sync/ensure step first; there is **no** runtime fallback and **no** dynamic-import branch (this removes the ambiguity).
- `package.json`:
  - `"sync": "node scripts/sync-catalog.mjs"`
  - `"prebuild": "node scripts/sync-catalog.mjs"`  ← **no `||` chaining**; a sync failure fails the build, exactly as the fail-loud policy requires.
  - `"predev": "node scripts/ensure-catalog.mjs"`

**Must NOT do:**
- Do not delete `CATEGORIES`, `byCategory`, `journalPosts`, `NAV_LINKS`, `SUB_NAV` from `products.js`.
- Do not silently fall back to the sample when creds are present (must exit 1).
- Do not include `sold` items in the generated output.

**References:**
- `docs/PLAN-SUMMARY.md:101-103` — fail-loud policy.
- `docs/PLAN-SUMMARY.md:36` — sold items filtered at build time.
- `src/App.jsx:13`, `src/components/Catalog.jsx:2`, `src/context/CartContext.jsx:2` — import sites to re-point.
- `src/data/products.js:397,399,432,434` — exports to preserve.

**Verify:**
- [ ] No creds: `node scripts/sync-catalog.mjs; echo $?` → `0` with a warning; `products.sample.json` used.
- [ ] Bad creds (set `AIRTABLE_TOKEN=x`): `node scripts/sync-catalog.mjs; echo $?` → `1`.
- [ ] Good creds: `npm run sync` writes `products.generated.json` with only `available`/`reserved` items.
- [ ] `npm run build` succeeds with the generated file present.
- [ ] `git status` shows `products.generated.json` ignored.

---

## Task Type

modification

## Completed Tasks

- 01-initialize-repo--hygiene: Completed in-session: git init -b main, .gitignore (node_modules, dist, .env*, generated catalog, hive runtime state), .env.example (AIRTABLE_*, CLOUDINARY_*, MP_*), README.md SOP. Committed bc44a79; plan committed ca1981c; pushed to origin/main (nicounii/collections-catalog).
- 02-airtable-schema--seed-export: Created scripts/export-seed.mjs (code schema → Airtable field names, status=available, mp_link/order_ref empty), generated seed-sample.json (29 rows, verified equal to products.length via ESM dynamic import), and docs/airtable-schema.md (14-field table + category single-select values + bootstrap steps). OPERATOR step deferred: create the Airtable base and CSV-import seed-sample.json (user chose build-code-first).
