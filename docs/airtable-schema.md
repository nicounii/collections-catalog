# Airtable Schema — `Catalog` table

Single source of truth for the storefront. Every row is a **unique item** (qty=1).
The build-time sync (`scripts/sync-catalog.mjs`, Task 3) reads this table and
produces `src/data/products.generated.json` for the React app.

## Fields (15)

| # | Field | Type | Required | Notes |
|---|-------|------|----------|-------|
| 1 | `id` | Single line text | ✅ | Stable slug/id. Used for deterministic ordering and dedupe. |
| 2 | `title` | Single line text | ✅ | Item name shown in the catalog. |
| 3 | `maker` | Single line text | – | Brand / maker. |
| 4 | `category` | Single select | ✅ | One of the category values below. |
| 5 | `price` | Number (BRL) | ✅ | Final price, decimal currency (e.g. `149.90`). |
| 6 | `condition` | Single line text | – | Condition description (see `docs/condition-guide.md`, Task 10). |
| 7 | `image_url` | URL | – | Cloudinary delivery URL (Task 4). Empty → glyph fallback. |
| 8 | `image_alt` | Single line text | – | Alt text for the image. |
| 9 | `art` | Single select | – | Glyph fallback when no image: `comic, figure, mask, shield, cape, web, raygun, badge, bust, frame`. |
| 10 | `note` | Long text | – | Description / details. |
| 11 | `featured` | Checkbox | – | `true` = destaque na vitrine. |
| 12 | `status` | Single select | ✅ | `available` \| `reserved` \| `sold`. `sold` rows are filtered out at build time. |
| 13 | `mp_link` | URL | – | Mercado Pago payment link (Task 6A). Empty → no "Comprar" button. |
| 14 | `order_ref` | Single line text | – | Mercado Pago payment id recorded on sale (Task 6B). |
| 15 | `rank` | Number | – | Optional numeric rank for custom sorting. Defaults to `0`. Higher numbers sort first. |

**Automatic field (not editable, not one of the 14):** Airtable's **`Created time`**
is always present; the sync reads it as `added` to back the `oldest` sort (Task 8).

## Rules

- **No attachment field** — images live in Cloudinary (Airtable free tier caps
  attachments at 1 GB/base).
- **Every row qty = 1** — each item is unique; never create quantity > 1.
- **Never delete rows** — mark `status=sold` instead (oversell/refund policy).

## Category single-select values

Matching `src/data/products.js` `CATEGORIES` (excluding `Todos`, which is a UI
filter, not a row value):

```
Quadrinhos
Marvel Comics
DC Comics
Novidades
Action Figures
Retro Gaming
Livros de Coleção
```

## Bootstrap

1. Create the base and the `Catalog` table with the 15 fields above.
2. Run `node scripts/export-seed.mjs` to produce `seed-sample.json`.
3. Import `seed-sample.json` into Airtable (CSV import) — every row lands with
   `status=available`.