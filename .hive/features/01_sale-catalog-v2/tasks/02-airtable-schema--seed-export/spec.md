# Task: 02-airtable-schema--seed-export

## Feature: sale-catalog-v2

## Dependencies

- **1. initialize-repo--hygiene** (01-initialize-repo--hygiene)

## Plan Section

### 2. Airtable schema + seed export

**Depends on**: 1

**Files:**
- Create: `scripts/export-seed.mjs`, `seed-sample.json`
- Create (docs): `docs/airtable-schema.md`

**What to do:**
- **OPERATOR:** create the Airtable base and the `Catalog` table with 14 fields (`id,title,maker,category,price,condition,image_url,image_alt,art,note,featured,status,mp_link,order_ref`); `status` single-select `available|reserved|sold`; every row qty=1. **No attachment field.**
- Write `scripts/export-seed.mjs`: read `src/data/products.js`, map code schema → Airtable field names (`image`→`image_url`, `imageAlt`→`image_alt`), default `status='available'`, emit `seed-sample.json`.
  - Mapping: `{id,title,maker,category,price,condition,art,note,featured}` pass-through; `image_url = image ?? ''`; `image_alt = imageAlt ?? ''`; `mp_link=''`; `order_ref=''`.
- **OPERATOR:** import `seed-sample.json` into Airtable (CSV import) to bootstrap the base.
- Note: Airtable's automatic **`Created time`** field is always present and is *not* one of the 14 editable fields. The sync (Task 3) reads it as `added`, which backs the `oldest` sort (Task 8). No manual action needed.
- `docs/airtable-schema.md`: field table (type, notes, which are required), plus the category single-select values matching `src/data/products.js:34-43`.

**Must NOT do:**
- Do not add an Airtable attachment field (1 GB cap).
- Do not create per-item qty > 1 (every item is unique).

**References:**
- `docs/PLAN-SUMMARY.md:52-71` — 14-field data model.
- `src/data/products.js:34-43` — canonical category list.
- `src/data/products.js:114-135` — example product shape.

**Verify:**
- [ ] `node scripts/export-seed.mjs` → writes `seed-sample.json`; item count matches `products.length`.
- [ ] `node --input-type=module -e "import fs from 'node:fs'; const p = await import('./src/data/products.js'); const s = JSON.parse(fs.readFileSync('./seed-sample.json','utf8')); console.log(s.length, p.products.length)"` → equal numbers. (Note: `products.js` is ESM — plain `require()` fails; use dynamic `import()`.)
- [ ] `docs/airtable-schema.md` lists all 14 fields.
- [ ] OPERATOR: Airtable base shows the seeded rows with `status=available`.

---

## Task Type

greenfield

## Completed Tasks

- 01-initialize-repo--hygiene: Completed in-session: git init -b main, .gitignore (node_modules, dist, .env*, generated catalog, hive runtime state), .env.example (AIRTABLE_*, CLOUDINARY_*, MP_*), README.md SOP. Committed bc44a79; plan committed ca1981c; pushed to origin/main (nicounii/collections-catalog).
