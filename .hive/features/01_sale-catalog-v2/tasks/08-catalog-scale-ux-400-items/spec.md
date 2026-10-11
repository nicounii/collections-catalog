# Task: 08-catalog-scale-ux-400-items

## Feature: sale-catalog-v2

## Dependencies

- **3. data-sync-layer** (03-data-sync-layer)

## Plan Section

### 8. Catalog scale UX (400+ items)

**Depends on**: 3

**Files:**
- Modify: `src/components/Catalog.jsx` (pagination + result virtualization/limits)
- Create: `src/lib/paginate.js`
- Create (test): `src/lib/paginate.test.js`

**What to do:**
- Search, filter, and sort **already exist** (`Catalog.jsx:21-38`) — do not rebuild them.
- Add **pagination** (page size ~24) with prev/next + page indicator; reset to page 1 when query/category/sort changes.
- `src/lib/paginate.js`: pure `paginate(items, page, pageSize)` → `{ items, totalPages, page }`.
- Keep the result count line in sync; when paginated, show "X–Y of N".
- Write a small unit test for `paginate` (red→green).
- **Fix the dead `oldest` sort:** `Catalog.jsx:14,36` compares `p.era`, but no product carries an `era` field (`grep -c "era:" src/data/products.js` → `0`), so this option currently **no-ops**. Sort by the sync-provided `added` timestamp (Task 3) instead: `list = [...list].sort((a, b) => new Date(a.added) - new Date(b.added))`, and delete the now-unused `eraYear` helper (`Catalog.jsx:14`).

**Must NOT do:**
- Do not add a server search — client-side only over the generated JSON.
- Do not change the **set** of sort options (`curated/price-asc/price-desc/oldest`); `oldest` keeps its label but gains a real backing field.

**References:**
- `src/components/Catalog.jsx:21-38` — existing filter/sort.
- `src/components/Catalog.jsx:115-120` — results-meta line to update.
- `docs/PLAN-SUMMARY.md:84` — search, filter, sort, pagination for 400+.

**Verify:**
- [ ] `node --test src/lib/paginate.test.js` → passes (page bounds, last partial page, invalid page clamps to 1).
- [ ] With 400+ generated items, the catalog renders 24 per page and paging works without jank.
- [ ] Changing category or search resets to page 1.
- [ ] Selecting "Mais antigos primeiro" reorders by `added` (no longer a silent no-op).

---

## Task Type

modification

## Completed Tasks

- 01-initialize-repo--hygiene: Completed in-session: git init -b main, .gitignore (node_modules, dist, .env*, generated catalog, hive runtime state), .env.example (AIRTABLE_*, CLOUDINARY_*, MP_*), README.md SOP. Committed bc44a79; plan committed ca1981c; pushed to origin/main (nicounii/collections-catalog).
- 02-airtable-schema--seed-export: Created scripts/export-seed.mjs (code schema → Airtable field names, status=available, mp_link/order_ref empty), generated seed-sample.json (29 rows, verified equal to products.length via ESM dynamic import), and docs/airtable-schema.md (14-field table + category single-select values + bootstrap steps). OPERATOR step deferred: create the Airtable base and CSV-import seed-sample.json (user chose build-code-first).
- 03-data-sync-layer: Created scripts/sync-catalog.mjs (Airtable → src/data/products.generated.json; paginates via offset, filterByFormula excludes status='sold', field map image_url→image/image_alt→imageAlt/mp_link→mpLink/order_ref→orderRef/created→added, sorts by id; no creds → copies sample as dev fallback exit 0; creds+error → exit 1; production+0 items → exit 1), scripts/ensure-catalog.mjs (predev: copy sample only if missing), src/data/products.sample.json (6-item committed dev fallback), rewrote src/data/products.js to static-import products.generated.json while preserving CATEGORIES/byCategory/journalPosts/NAV_LINKS/SUB_NAV, added package.json scripts sync/prebuild/predev. Import sites (CartContext.jsx:2, Catalog.jsx:2, App.jsx:13) already point at ../data/products.js — no re-pointing needed. Updated scripts/export-seed.mjs to re-emit committed seed-sample.json (29 rows) since products.js is now generated; verified idempotent. Verified: sync no-creds exit 0, ensure-catalog exit 0, sync bad-creds exit 1, export-seed 29 rows, npm run build passes (prebuild hook works), products.generated.json gitignored.
- 04-image-pipeline-cloudinary: Created src/lib/cloudinary.js (cldUrl(url,{w,h,crop,quality,format}) injects transformation params only for res.cloudinary.com /image/upload/ URLs; local paths/empty/undefined pass through unchanged; isCldUrl exported), enhanced src/components/ProductMedia.jsx to emit srcSet (400/800/1200) + sizes for Cloudinary-backed images while keeping loading=lazy/decoding=async and the <Plate> glyph fallback untouched, and created docs/image-pipeline.md (signed/restricted preset settings, naming, never-open-unsigned rule, no API secret in client). ProductCard.jsx needed no change — it already passes ratio and ProductMedia computes srcSet internally. Verified: cldUrl('https://res.cloudinary.com/demo/image/upload/sample.jpg',{w:400}) → w_400,c_fill,q_auto,f_auto; pass-through for /photos/..., undefined, ''; srcSet shape correct; npm run build passes. Not run: interactive npm run dev browser check (headless env). OPERATOR deferred: create Cloudinary account + signed preset, upload public/photos/*, set image_url in Airtable for launch subset.
- 05-phone-first-admin-sop: Created docs/listing-sop.md — a phone-first admin SOP for the Airtable-as-admin workflow. Contains the ≤60s checklist (photograph → Cloudinary upload → Airtable row → 5 required fields → publish), field-by-field guidance for the 5 required fields (id, title, category, price, status) plus recommended/leave-alone fields, screenshots-in-words for the Airtable mobile grid and Cloudinary upload, common mistakes (single-select typos, duplicate ids, comma prices, deleting rows), a weekly inventory sweep routine (re-price slow movers, mark sold, refresh photos, clear expired reserved), and a note that the optional restricted-upload form is deferred (not built now). No code changes; no in-app admin form built (Airtable app is the admin). Verified: file exists, all 5 required fields enumerated, weekly sweep section present, deferred note present.
- 06-checkout--mercado-pago: 6A complete: per-item Mercado Pago payment links consumed via product.mpLink. ProductCard renders Comprar <a> (target=_blank rel=noopener noreferrer) when mpLink present, else Adicionar (cart); always renders Negociar WhatsApp button. Added src/lib/whatsapp.js (waLink({phone,text}) + WHATSAPP_PHONE placeholder). CartDrawer: per-line "Comprar no Mercado Pago" link when mpLink exists; footer dead "Finalizar compra" replaced with "Negociar pelo WhatsApp" (cart summary: titles + total + URL). Added docs/checkout.md. Verified: waLink URL format exact; SSR render confirms Comprar/Adicionar/Negociar branches + title prefilled; bun run build passes (283.56 kB). 6B webhook NOT built — deferred per plan until operator says go.
- 07-hosting-domain--dns: Created wrangler.toml (secret-free: name="acervo-do-marvete", pages_build_output_dir="dist", compatibility_date) and docs/deploy.md. deploy.md documents: Cloudflare Pages Git-integration setup (build command `npm run build`, output `dist`, root `/`, NODE_VERSION=22), full env var list (build-time AIRTABLE_TOKEN/AIRTABLE_BASE_ID/AIRTABLE_TABLE + server-time MP_ACCESS_TOKEN/MP_WEBHOOK_SECRET for 6B), Registro.br .com.br domain + Cloudflare nameservers + automatic HTTPS, rollback (dashboard/CLI/code-revert), and verification checklist. Verified: deploy.md contains build command + output dir + every env var; wrangler.toml parses and has no secret values; bun run build passes. OPERATOR-only verify items (Pages preview URL 200, production domain HTTPS) deferred — no Cloudflare/Registro.br credentials available.
