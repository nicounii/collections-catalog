# Acervo do Marvete

> A phone-first store that liquidates an inherited collection of 400+ collectibles
> (HQs, mangás, action figures, retro games, collector books), sold via Instagram/Facebook.
>
> **Brand:** Acervo do Marvete (retires the old "ASHBY & VANE" placeholder).

Vite + React 19 + Tailwind 4 storefront. Airtable is the single source of truth for
inventory; Cloudinary hosts images; Mercado Pago handles checkout; Cloudflare Pages hosts.

---

## Quick start

```bash
npm install
cp .env.example .env      # then fill in values
npm run dev               # http://localhost:5173
npm run build             # production build → dist/
npm run preview           # serve the build locally
```

Node 22+ is expected.

---

## Scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run sync` | Pull the Airtable `Catalog` table → `src/data/products.generated.json` *(added in Task 3)* |
| `npm run sync:check` | Dry-run sync; fails loudly on missing creds/empty result *(added in Task 3)* |

---

## Architecture (one-way data flow)

```
Phone: Airtable app ──► Airtable base (400+ rows, qty=1)
Cloudinary (images) ──► image_url ──┘
                         │
            build-time   ▼
        scripts/sync-catalog.mjs ──► src/data/products.generated.json
                         │                    │
                         ▼                    ▼
                  sold items filtered    React catalog (existing components)
                                              │
                        ┌─────────────────────┴─────────────────────┐
                        ▼                                           ▼
                Comprar → Mercado Pago                   Negociar → WhatsApp
                        │
                        ▼
          Webhook: verify + re-fetch payment
          → sold / refund duplicate → write back Airtable
```

**Principle — never edit product data in code again.** Product rows live in Airtable.
The build syncs them into a generated JSON file; sold items are filtered out at build time.

---

## Listing SOP (≤60s per item, from a phone)

1. Photograph the item (good light, plain background, show flaws).
2. Upload to Cloudinary via the restricted preset → copy the delivery URL.
3. In the Airtable `Catalog` table, click **+** to add a row.
4. Fill: `title`, `category`, `price`, `condition`, `image_url` (+ `note` for flaws/edition).
5. Set `status = available`. Done — it appears on the next build.

Full checklist and field reference: `docs/` (Task 5).

---

## Security rules

- **No secrets in client code.** `AIRTABLE_TOKEN`, `MP_ACCESS_TOKEN`, and `MP_WEBHOOK_SECRET`
  are build/server-time only — never prefix them with `VITE_`.
- **Cloudinary uploads use a restricted/signed preset.** Never an open unsigned preset.
- **Payment webhook verifies `x-signature` / `x-request-id` HMAC** against `MP_WEBHOOK_SECRET`
  and re-fetches the payment before trusting it (Task 6B).

---

## Oversell & refund policy (every item is unique, qty = 1)

1. On any payment notification, **re-fetch** `GET /v1/payments/{id}` and trust the **fetched**
   status — never the notification body.
2. First paid item → set `status = sold` + record `order_ref`.
3. A **second** paid sale on an already-sold item → **refund in full**
   (`POST /v1/payments/{id}/refunds`).
4. Never delete rows.

---

## Fail-loud sync policy

Prevents accidentally shipping the sample catalog as the real one:

- Creds **absent** → exit `0` with a warning; fall back to `src/data/products.sample.json`.
- Creds **present but the API fails**, or a production sync returns **0 items** → exit `1`
  (fails the build).

---

## Docs

- `docs/business-plan.md` — market, model, financials, risks.
- `docs/PLAN-SUMMARY.md` — consolidated implementation brief.
- `codemap.md` — repository atlas (architecture + per-folder maps).
