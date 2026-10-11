# Acervo do Marvete — Build Overview

## Acervo do Marvete — Build Overview

## Status: 9/10 tasks done; all merged to `main` and pushed. Task 09 deferred by plan.

## What this is

A phone-first catalog site for a **single-owner curated collection** (quadrinhos, mangás,
action figures, retro gaming, livros de coleção), replacing the old "ASHBY & VANE" placeholder
brand. Data lives in Airtable; images in Cloudinary; checkout via Mercado Pago links + WhatsApp;
hosted on Cloudflare Pages with a `.com.br` domain.

## Workstream status

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Initialize repo & hygiene | ✅ done | `git init`, `.gitignore`, `.env.example`, `README.md` |
| 2 | Airtable schema + seed export | ✅ done | operator base + agent export script |
| 3 | Data sync layer (fail-loud) | ✅ done | `scripts/sync-catalog.mjs` |
| 4 | Image pipeline (Cloudinary) | ✅ done | operator account + agent code |
| 5 | Phone-first admin SOP | ✅ done | `docs/listing-sop.md` |
| 6A | Checkout — payment links | ✅ done | `src/lib/whatsapp.js`, `docs/checkout.md`; ProductCard + CartDrawer |
| 6B | Checkout — webhook | ⏸ deferred | design captured; needs operator go + MP creds |
| 7 | Hosting, domain & DNS | ✅ done | `wrangler.toml`, `docs/deploy.md`; operator must connect Pages + register domain |
| 8 | Catalog scale UX (pagination) | ✅ done | `src/lib/paginate.js` + tests; Catalog 24/page, sort fix |
| 9 | Social sharing & SEO | ⏸ deferred | plan: do not start before traffic proves the funnel |
| 10 | Launch polish & trust (brand) | ✅ done | brand retired → Acervo do Marvete; condition/shipping/FAQ docs; mobile tap targets |

## Merge history on `main`

- `bc44af…` Task 01 init
- … Tasks 02–05
- `989485e` merge 06 (6A)
- `a462dd7` merge 07
- `dbd20f2` merge 08
- `f1f7738` merge 10

## Operator-blocked (needs human accounts)

Airtable base, Cloudinary account + restricted preset, Mercado Pago payment links,
Cloudflare Pages + Registro.br domain. These gate deployment but not the code (all code tasks done).

## Open follow-ups

- Task 09 (social sharing & SEO) — deferred until traffic proves the funnel.
- 6B webhook — deferred until demand.
- Hero STATS "33+ Produtos" is a hardcoded claim; set the real count (plan targets 400+).
- Operator must set the real WhatsApp phone (placeholder in `src/lib/whatsapp.js`).

## Revision History

- **2026-10-11** — Feature created; Tasks 01–08, 10 executed, merged, pushed. Task 09 deferred by plan.
