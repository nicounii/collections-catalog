# catalog-growth — Overview

SEO, brand and growth groundwork for the **Acervo do Marvete** storefront
(Vite + React SPA on Cloudflare Pages, domain `acervodomarvete.com.br`).

## What shipped (all 6 tasks merged)

| # | Task | Outcome |
|---|------|---------|
| 01 | slug + site config plumbing | `slugify`/`productSlug`/`assignSlugs` (collision-safe `-2`/`-3` suffixes), `SITE` config, `decodeSlug` |
| 02 | product detail route + view | `/produto/<slug>` route + `ProductPage`; `getBySlug` |
| 03 | prerender + sitemap + robots | `scripts/prerender.mjs` emits `dist/produto/<slug>/index.html` with per-product head tags + JSON-LD; `dist/sitemap.xml`; `public/robots.txt` |
| 04 | baseline OG/Twitter/canonical on the shell | `index.html` carries site-level meta |
| 05 | brand consistency + rename runbook | Footer uses `SITE`; `docs/brand-and-social-setup.md` |
| 06 | 30-day content calendar | `docs/content-calendar-30d.md` |

## Verified end state
- `npm run build` → exit 0, "prerendered 6 product pages"
- `node --test` → **47/47 pass**
- Each `dist/produto/<slug>/index.html` has exactly one title, description,
  canonical, og:title/description/url/image/type, twitter:card, plus Product JSON-LD
- `dist/sitemap.xml` lists homepage + 6 product URLs; `dist/robots.txt` points to it
- `npm run preview` + `curl /produto/<slug>/` → 200

## Notable fixes made during the run
- **Malformed-slug crash** (`/produto/%/` threw `URIError` → blank page): `decodeSlug` guard.
- **Dead WhatsApp number** in the product CTA: now derived from real `SITE.whatsapp`.
- **Duplicate canonical/og tags** on prerendered pages (would have canonicalized
  product pages to the homepage): prerender now strips the shell baseline SEO tags
  and asserts exactly one canonical per page.
- **Client/prerender slug divergence** on collisions: client now runs `assignSlugs` too.

## Operator follow-ups (manual, outside the repo)
- Rename IG/FB display names to "Acervo do Marvete" (see `docs/brand-and-social-setup.md`).
- Publish the 30-day content calendar (`docs/content-calendar-30d.md`).

## Caveats
- Prerender is **head-only**: the body is the SPA shell; crawlers that execute JS
  see the full page, and the static head tags + JSON-LD carry the SEO signal.
- `products.generated.json` is gitignored and currently stale (no `slug` field);
  both client and prerender assign slugs at load/build time, so they agree.
