# Task: 02-product-detail-route--view

## Feature: catalog-growth

## Dependencies

- **1. slug--site-config-plumbing-with-collision-guard** (01-slug--site-config-plumbing-with-collision-guard)

## Plan Section

### 2. Product detail route + view

**Depends on**: 1

**Files:**
- Create: `src/pages/ProductPage.jsx`
- Modify: `src/data/products.js`
- Modify: `src/App.jsx`

**What to do**:
- Step 1: In `src/data/products.js`, add a lookup:
  ```js
  import { productSlug } from '../lib/slug.js';
  export const getBySlug = (slug) => products.find((p) => productSlug(p) === slug);
  ```
- Step 2: Create `src/pages/ProductPage.jsx` — a self-contained view reusing existing pieces: `ProductMedia`, `brl`, `waLink`, `WHATSAPP_PHONE`, `useCart`, `SITE`. It must show: title, maker, category, condition badge, price, product image (with the same image fallback used by `meta.js`), the note, "Adicionar ao carrinho" / "Comprar" (if `mpLink`), "Negociar no WhatsApp", and a "← Voltar ao catálogo" link to `/`. If `getBySlug` returns nothing, render a "Produto não encontrado" block (accept 200 status — see Design note) with a link home.
- Step 3: In `src/App.jsx`, detect the path **before** the admin check:
  ```js
  const productMatch = window.location.pathname.match(/^\/produto\/([^/]+)\/?$/);
  ```
  When it matches, render `<ProductPage slug={decodeURIComponent(productMatch[1])} />` **inside `CartProvider`**, with `Nav` + `Footer` so navigation/cart work.
- Step 4: Run the dev server and open a product URL.
  - Run: `npm run dev &` then `curl -sI http://localhost:5173/produto/sandman-edicao-definitiva-vol-1/`
  - Expected: `200`
- Step 5: Commit
  ```bash
  git add src/pages/ProductPage.jsx src/data/products.js src/App.jsx
  git commit -m "feat(seo): render per-product page from /produto/<slug>"
  ```

**Must NOT do**:
- Do not alter the home page rendering or the existing `#/admin` behaviour.
- Do not change `ProductCard` behaviour (it stays as-is on the catalog).

**References**:
- `src/App.jsx:50-92` — top-level render branch to extend.
- `src/components/ProductCard.jsx:1-17,59-104` — patterns to reuse (condition styles, CTAs, WhatsApp link).

**Verify**:
- [ ] `npm run dev` then `curl -sI http://localhost:5173/produto/<real-slug>/` → `200`
- [ ] `curl -s http://localhost:5173/produto/<real-slug>/` contains `<div id="root"` (app shell present)
- [ ] `curl -sI http://localhost:5173/` → `200` (home still works)

---

## Task Type

modification

## Completed Tasks

- 01-slug--site-config-plumbing-with-collision-guard: Product slug + site config plumbing with collision guard. Files: src/lib/slug.js (slugify/productSlug/assignSlugs), src/lib/site.js (SITE const), src/lib/slug.test.js, scripts/sync-catalog.mjs (assignSlugs on live+sample paths), .env.example (VITE_SITE_URL), products.generated.json slugs. Merged 05a1160. Post-merge hardening: assignSlugs now uses a used-Set + while loop so disambiguated slugs cannot collide with later base slugs (commit 35cde18); slug.test.js now 5 tests. Verified: node --test 39/39 pass, npm run build exit 0.
- 04-baseline-ogtwittercanonical-on-the-shell: Baseline OG/Twitter/canonical meta tags on the app shell. index.html head extended with canonical + og:* + twitter:* using absolute URLs, existing head preserved. Merged 43b3fe4. Verified: npm run build exit 0.
- 05-brand-consistency-fixes--rename-runbook: Updated Footer.jsx to source contact details from src/lib/site.js and created docs/brand-and-social-setup.md specifying brand name, social handle rename steps, bio text, and V de Vingança story placement. Verified build passes successfully with no 'São Paulo' occurrences in Footer.jsx.
- 06-30-day-content-calendar: 30-day social content calendar. docs/content-calendar-30d.md with 30 data rows (D1-D30) + header, grounded in docs/market-research-social-growth.md. Merged 8c0b186. Verified: file present, npm run build exit 0.
