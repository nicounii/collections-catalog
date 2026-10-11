# Task: 06-checkout--mercado-pago

## Feature: sale-catalog-v2

## Dependencies

- **3. data-sync-layer** (03-data-sync-layer)

## Plan Section

### 6. Checkout — Mercado Pago

**Depends on**: 3

**Files:**
- Consume: `product.mpLink` (the `mp_link`→`mpLink` mapping is already produced by Task 3's sync — **no sync change here**)
- Modify: `src/components/ProductCard.jsx` (add "Comprar" button → `mp_link` when present)
- Create: `src/lib/whatsapp.js` (`waLink({ phone, text })`)
- Modify: `src/components/CartDrawer.jsx` (checkout/negotiate actions)
- **6B:** Create: `functions/api/mp-webhook.js` (Cloudflare Pages Function)
- Create (docs): `docs/checkout.md`

**6A (do now):**
- **OPERATOR:** create per-item Mercado Pago payment links for a 20–30 item launch subset; paste each into Airtable field `mp_link`.
- Mapping is already wired in Task 3: Airtable `mp_link` → app `mpLink`. `ProductCard` reads `product.mpLink` (**camelCase**). This task only *consumes* it.
- `ProductCard.jsx`: when `product.mpLink` is a non-empty string, render a primary **Comprar** `<a>` to it (`target="_blank" rel="noopener noreferrer"`); otherwise keep **Adicionar** (cart). Always render a **Negociar** WhatsApp button.
- `whatsapp.js`: `waLink({ phone, text })` → `https://wa.me/<phone>?text=<encodeURIComponent(text)>`; text = `"Tenho interesse em: <title> (<share URL>)"`.

**6B (after demand proven — build only when operator says go):**
- `functions/api/mp-webhook.js` (Cloudflare Pages Function — runs on the Workers runtime, so use **WebCrypto `crypto.subtle`**, NOT the Node `mercadopago` SDK helper or `node:crypto`):
  - **Signature check (reject `401` on any failure):** read `x-signature` (`ts=…;v1=…`), `x-request-id`, and `data.id` from the query string (`?data.id=`) or body. Build the manifest **exactly**: `id:<data.id>;request-id:<x-request-id>;ts:<ts>;` with `data.id` **lower-cased**. Compute `HMAC-SHA256(MP_WEBHOOK_SECRET, manifest)` → hex and compare in **constant time** to `v1`. Also reject if `|now − ts|` exceeds the tolerance (~300s).
  - **Ack fast:** return `200` immediately, then do the work out of band, so MP retries don't duplicate fulfillment.
  - **Never trust the body:** re-fetch `GET /v1/payments/{id}` with `Authorization: Bearer <MP_ACCESS_TOKEN>` and act on the fetched `status` / `external_reference`.
  - **Dedupe:** record processed event ids (resource id + `action`) and skip repeats — MP delivery is at-least-once.
  - **Fulfill:** first `approved` payment → PATCH the Airtable row `status=sold` + `order_ref`.
  - **Oversell:** a **second** `approved` payment for an already-`sold` item → `POST /v1/payments/{id}/refunds` (full refund).
  - **Money units:** MP amounts are **decimal currency** (e.g. `149.90`), not cents — do not divide by 100.
  - **Reconciliation backstop:** a scheduled `GET /v1/payments/search?external_reference=<order>` for orders stuck `pending` reconciles local state **to** MP (never the reverse).

**Must NOT do:**
- Do not trust the notification body — always re-fetch.
- Do not expose `MP_ACCESS_TOKEN` to the client.
- Do not build 6B until 6A is validated (decided).
- Do not delete Airtable rows on refund — mark state only.

**References:**
- `docs/PLAN-SUMMARY.md:82` — 6A then 6B.
- `docs/PLAN-SUMMARY.md:90-94` — oversell & refund policy.
- `docs/PLAN-SUMMARY.md:96-99` — webhook HMAC verification.
- `src/components/ProductCard.jsx:68-74` — current button area.
- `src/components/CartDrawer.jsx` — drawer from which checkout is offered.

**Verify:**
- [ ] 6A: an item with `mpLink` shows a working Comprar link; item without it falls back to Adicionar/Negociar.
- [ ] 6A: Negociar opens `wa.me` with the item title prefilled.
- [ ] 6B (when built): a replayed webhook with a tampered signature → HTTP 401.
- [ ] 6B: a duplicate paid sale on a sold item triggers a full refund (asserted against MP sandbox).

---

## Task Type

modification

## Completed Tasks

- 01-initialize-repo--hygiene: Completed in-session: git init -b main, .gitignore (node_modules, dist, .env*, generated catalog, hive runtime state), .env.example (AIRTABLE_*, CLOUDINARY_*, MP_*), README.md SOP. Committed bc44a79; plan committed ca1981c; pushed to origin/main (nicounii/collections-catalog).
- 02-airtable-schema--seed-export: Created scripts/export-seed.mjs (code schema → Airtable field names, status=available, mp_link/order_ref empty), generated seed-sample.json (29 rows, verified equal to products.length via ESM dynamic import), and docs/airtable-schema.md (14-field table + category single-select values + bootstrap steps). OPERATOR step deferred: create the Airtable base and CSV-import seed-sample.json (user chose build-code-first).
- 03-data-sync-layer: Created scripts/sync-catalog.mjs (Airtable → src/data/products.generated.json; paginates via offset, filterByFormula excludes status='sold', field map image_url→image/image_alt→imageAlt/mp_link→mpLink/order_ref→orderRef/created→added, sorts by id; no creds → copies sample as dev fallback exit 0; creds+error → exit 1; production+0 items → exit 1), scripts/ensure-catalog.mjs (predev: copy sample only if missing), src/data/products.sample.json (6-item committed dev fallback), rewrote src/data/products.js to static-import products.generated.json while preserving CATEGORIES/byCategory/journalPosts/NAV_LINKS/SUB_NAV, added package.json scripts sync/prebuild/predev. Import sites (CartContext.jsx:2, Catalog.jsx:2, App.jsx:13) already point at ../data/products.js — no re-pointing needed. Updated scripts/export-seed.mjs to re-emit committed seed-sample.json (29 rows) since products.js is now generated; verified idempotent. Verified: sync no-creds exit 0, ensure-catalog exit 0, sync bad-creds exit 1, export-seed 29 rows, npm run build passes (prebuild hook works), products.generated.json gitignored.
- 04-image-pipeline-cloudinary: Created src/lib/cloudinary.js (cldUrl(url,{w,h,crop,quality,format}) injects transformation params only for res.cloudinary.com /image/upload/ URLs; local paths/empty/undefined pass through unchanged; isCldUrl exported), enhanced src/components/ProductMedia.jsx to emit srcSet (400/800/1200) + sizes for Cloudinary-backed images while keeping loading=lazy/decoding=async and the <Plate> glyph fallback untouched, and created docs/image-pipeline.md (signed/restricted preset settings, naming, never-open-unsigned rule, no API secret in client). ProductCard.jsx needed no change — it already passes ratio and ProductMedia computes srcSet internally. Verified: cldUrl('https://res.cloudinary.com/demo/image/upload/sample.jpg',{w:400}) → w_400,c_fill,q_auto,f_auto; pass-through for /photos/..., undefined, ''; srcSet shape correct; npm run build passes. Not run: interactive npm run dev browser check (headless env). OPERATOR deferred: create Cloudinary account + signed preset, upload public/photos/*, set image_url in Airtable for launch subset.
- 05-phone-first-admin-sop: Created docs/listing-sop.md — a phone-first admin SOP for the Airtable-as-admin workflow. Contains the ≤60s checklist (photograph → Cloudinary upload → Airtable row → 5 required fields → publish), field-by-field guidance for the 5 required fields (id, title, category, price, status) plus recommended/leave-alone fields, screenshots-in-words for the Airtable mobile grid and Cloudinary upload, common mistakes (single-select typos, duplicate ids, comma prices, deleting rows), a weekly inventory sweep routine (re-price slow movers, mark sold, refresh photos, clear expired reserved), and a note that the optional restricted-upload form is deferred (not built now). No code changes; no in-app admin form built (Airtable app is the admin). Verified: file exists, all 5 required fields enumerated, weekly sweep section present, deferred note present.
