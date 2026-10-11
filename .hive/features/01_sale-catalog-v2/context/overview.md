# Acervo do Marvete — Build Overview

## At a Glance

Turning an existing (and good) static catalog prototype into a **phone-first store**
that liquidates a **400+ item** inherited collectibles collection, sold via Instagram/Facebook.

- **Storefront:** Vite + React 19 + Tailwind 4 — already built and working.
- **Admin / source of truth:** Airtable (14-field `Catalog` table, qty=1 per item).
- **Images:** Cloudinary (Airtable free tier caps attachments at 1 GB/base).
- **Checkout:** Mercado Pago — 6A payment links first, then a verified webhook (6B).
- **Hosting:** Cloudflare Pages · **Domain:** Registro.br `.com.br` (R$40/yr).

**The two real bottlenecks every task serves:** (1) listing throughput (~60s/item from a
phone) and (2) trust + secure checkout. If a task serves neither, it's out of scope.

**State:** repo initialized (`git init`, commit `bc44a79`). Plan written. **Not yet built.**

## Workstreams

| # | Task | Agent-doable? | Depends on |
|---|------|---------------|-----------|
| 1 | Initialize repo & hygiene | ✅ DONE | — |
| 2 | Airtable schema + seed export | ⚠️ operator (base) + agent (export script) | 1 |
| 3 | Data sync layer (fail-loud) | ✅ agent (needs operator creds to test) | 2 |
| 4 | Image pipeline (Cloudinary) | ⚠️ operator (account/preset) + agent (code) | 2 |
| 5 | Phone-first admin SOP | ✅ agent (docs) | 2, 4 |
| 6A | Checkout — payment links | ⚠️ operator (links) + agent (button) | 3 |
| 6B | Checkout — webhook | ✅ agent (deferred until demand) | 6A |
| 7 | Hosting, domain & DNS | ⚠️ operator (accounts) | 3 |
| 8 | Catalog scale UX (pagination) | ✅ agent | 3 |
| 9 | Social sharing & SEO | ⏸ deferred | 6, 8 |
| 10 | Launch polish & trust (brand) | ✅ agent | 6, 7, 8 |

**Operator-blocked (needs human accounts):** Airtable base, Cloudinary account + restricted
preset, Mercado Pago links, Cloudflare Pages + domain. These gate the deployments but **not**
tasks 1, 3 (code), 5, 8, 10.

## Revision History

- **2026-10-11** — Feature `sale-catalog-v2` created in-repo. Task 1 executed (`git init`,
  `.gitignore`, `.env.example`, `README.md`; commit `bc44a79`). Plan authored from the
  reviewed `docs/PLAN-SUMMARY.md` + `docs/business-plan.md`, grounded against live source.
