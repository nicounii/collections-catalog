# Listing SOP — Phone-First (≤60s per item)

The Airtable app **is** the admin. There is no in-app admin form in the storefront;
every listing happens on your phone inside Airtable, and the next build publishes it.

**Flow:** photograph → Cloudinary upload → Airtable row → 5 required fields → publish.

---

## The ≤60s checklist

1. **Photograph** the item — good light, plain background, show flaws (see below).
2. **Upload** to Cloudinary via the restricted preset → copy the delivery URL.
3. **Airtable app** → open the `Catalog` table → tap **+** to add a row.
4. **Fill the 5 required fields** (see field-by-field below): `id`, `title`, `category`, `price`, `status`.
5. **Paste** `image_url` (recommended), add `condition` / `note` (recommended).
6. **Set `status = available`.** Done — it appears on the next build.

---

## Field-by-field guidance (Airtable `Catalog` table)

### Required (5)

| Field | What to type | Example |
|-------|--------------|---------|
| `id` | Stable slug, lowercase, hyphenated. Never reuse. | `hq-042` |
| `title` | Item name as shown in the catalog. | `X-Men #1 (1963) — 1ª edição` |
| `category` | Single select — pick one of the 7 values. | `Quadrinhos` |
| `price` | Number in BRL, decimal with `.` | `149.90` |
| `status` | Single select — `available` \| `reserved` \| `sold` | `available` |

Category values (single select):
```
Quadrinhos
Marvel Comics
DC Comics
Novidades
Action Figures
Retro Gaming
Livros de Coleção
```

### Recommended (fill when you have it)

| Field | What to type | Why |
|-------|--------------|-----|
| `image_url` | The Cloudinary delivery URL copied in step 2 | Without it the item shows the glyph fallback |
| `condition` | Condition description | Buyers decide on condition; be honest |
| `note` | Flaws, edition, provenance | Detail sells; hides nothing |
| `maker` | Brand / maker | Sortable, searchable |
| `image_alt` | Short alt text | Accessibility |
| `art` | Glyph fallback art (`comic`, `figure`, `mask`, …) | Only if no photo |
| `featured` | Checkbox | `true` = destaque na vitrine |

### Leave alone

| Field | Why |
|-------|-----|
| `order_ref` | Filled automatically on sale (Task 6B) |
| `mp_link` | Filled when the payment link is created (Task 6A) |

---

## Screenshots-in-words

**Airtable mobile app, `Catalog` table:**
- The table looks like a spreadsheet: one row per item, columns across.
- Tap **+** (bottom-right on the grid) → a new empty row appears.
- Tap each cell to edit. Single-select fields (`category`, `status`) open a picker —
  tap the value, don't type over it.
- `price` is a number cell: type `149.90` (dot, not comma).
- When you're done, the row is saved automatically. There is no "Save" button.

**Cloudinary upload (after the preset exists):**
- Open the Cloudinary upload page / app, choose the file, confirm the **signed**
  preset is selected, upload.
- Copy the delivery URL that starts with `https://res.cloudinary.com/<cloud>/image/upload/...`.

---

## Common mistakes

- **Typing over the single-select values.** Always pick from the list — a typo
  creates a new category that won't match the site filter.
- **Reusing an `id`.** Every item is unique (qty = 1). A duplicate id breaks
  ordering and dedupe.
- **Forgetting `status`.** A row with no status never publishes.
- **Setting `status = sold` by mistake.** Sold rows are filtered out at build
  time — the item disappears from the site.
- **Pasting a non-Cloudinary URL into `image_url`.** Local paths and arbitrary
  links render as-is; only Cloudinary URLs get responsive sizing.
- **Using a comma in `price`** (`149,90`) — Airtable number cells expect a dot.
- **Deleting a row instead of marking it sold.** Never delete rows; mark
  `status = sold` (oversell/refund policy).

---

## Weekly inventory sweep (15 min, once a week)

1. **Re-price slow movers** — open the `Catalog` table, sort by `Created time`
   (oldest first), lower prices on items listed > 3 weeks with no sale.
2. **Mark sold** — any item sold via Instagram/Facebook/WhatsApp that wasn't
   checked out on the site: set `status = sold`.
3. **Refresh photos** — for items with poor photos, retake and update `image_url`.
4. **Check `reserved`** — if a reservation expired, set back to `available`.
5. **Verify the site** — run `npm run sync` + `npm run build` and confirm the
   catalog matches Airtable.

---

## Deferred (not built now)

The optional **restricted-upload form** (a small web form that uploads photos to
Cloudinary and writes the Airtable row for you) is **deferred** — not built in
this phase. Until then, the Airtable app + Cloudinary upload page is the admin.