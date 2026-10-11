# Checkout — Mercado Pago + WhatsApp

## Model (6A): per-item payment links

Every item is unique (qty = 1). The operator creates a Mercado Pago **payment link**
per item for the launch subset (20–30 items) and pastes it into Airtable `mp_link`.
The site never sees MP credentials in 6A — it only links out to the payment page.

- Item **with** `mp_link` → primary button **Comprar** (opens the MP payment page in a new tab).
- Item **without** `mp_link` → primary button **Adicionar** (cart) + **Negociar** (WhatsApp).
- **Negociar** is always available: `https://wa.me/<phone>?text=<encoded>` with the item
  title (and current page URL) prefilled.

## OPERATOR — Setup (one-time)

1. Create a Mercado Pago account (seller). Use **test credentials** first
   (`TEST-…` Access Token) and test-mode payment links.
2. For each launch item, create a payment link (Dashboard → Produtos → Criar link de pagamento
   or via API `POST /v1/payments` with `external_reference = <item id>`).
   - Amount is **decimal** (e.g. `24.5` = R$ 24,50) — never cents.
   - Set `external_reference` to the Airtable `id` of the item (the join key for 6B).
3. Paste the link into Airtable `mp_link` for that item.
4. After sync (`npm run sync`), the item renders **Comprar**.

## Client code

- `src/lib/whatsapp.js` — `waLink({ phone, text })` → `https://wa.me/<phone>?text=<encodeURIComponent(text)>`.
  `WHATSAPP_PHONE` is a placeholder (`551199990000`) — set the real number before launch.
- `src/components/ProductCard.jsx` — Comprar / Adicionar / Negociar logic.
- `src/components/CartDrawer.jsx` — per-line **Comprar no Mercado Pago** link when `mp_link`
  exists; footer **Negociar pelo WhatsApp** summarizes the cart (titles + total).

## Not built yet: 6B — verified webhook (deferred)

Build only when the operator says go (after 6A is validated with real sales). Design:

- Cloudflare Pages Function `functions/api/mp-webhook.js`.
- Verify `x-signature`/`x-request-id` HMAC-SHA256 against `MP_WEBHOOK_SECRET`
  (WebCrypto `crypto.subtle`, **not** `node:crypto`); 401 on mismatch.
- Ack `200` fast; then **re-fetch** `GET /v1/payments/{id}` — trust the fetched status,
  never the notification body.
- Dedupe by payment id; first paid → `status = sold` + record `order_ref`;
  second paid on an already-sold item → **refund in full** (`POST /v1/payments/{id}/refunds`).
- Decimal currency everywhere; reconciliation backstop (daily sweep of paid payments
  vs `sold` items).

## Env vars

See `.env.example`:

- `MP_ACCESS_TOKEN` — server/build-time only (never in client bundle).
- `MP_WEBHOOK_SECRET` — server-side webhook verification secret.