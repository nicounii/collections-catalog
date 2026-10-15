# Execution Decisions — catalog-growth

## Batch 1 (parallel) — tasks 01, 04, 06
- Operator approved parallel execution of the 3 runnable tasks (disjoint files).
- All 3 completed; merged clean via hive-helper; HEAD 8c0b186.
- Verified: `npm run build` exit 0; `node --test` 37/37 pass.
- Post-merge review: hygienic-reviewer REJECT verified as hallucinated; adopted only the real `assignSlugs` edge case → inline fix commit 35cde18; re-verified 39/39 + build exit 0.

## Batch 2 (parallel) — tasks 02, 05
- Operator approved parallel execution (disjoint files: ProductPage/App/products.js vs Footer/docs).
- 05 completed + committed (d877f48); merged clean → 27e496a.
- **02 work-loss incident:** first 02 worker reported success but its worktree branch had NO commit (`git log` == main) and the worktree reflog showed `reset: moving to HEAD` — its changes were discarded. No stash, no dangling commit contained the work. Root cause: worker discarded its own changes (destructive git op) before/without committing.
- **02 recovery:** discarded the empty worktree (`hive_worktree_discard` → status pending), re-ran `hive_worktree_start`, re-dispatched the worker with explicit guardrails ("do NOT run git reset/checkout/restore/clean/stash; leave changes in place; confirm commit exists"). Second attempt committed 372cd49 (build-verified).
- **Merge complication:** main's working tree held a STALE uncommitted copy of the 02 changes (mtime 21:28, older than commit 372cd49 at 21:32:59) → merge aborted ("local changes would be overwritten"). Resolution: backed up stray files to /tmp/stray-02, discarded main's stale copy (`git checkout --` + `rm` untracked ProductPage.jsx), then merged 372cd49 clean → 7d5cf42.
- Batch 2 verified: `npm run build` exit 0 (65 modules, 4.73s); `node --test` 39/39 pass.

## Batch 2 post-merge review (hygienic-reviewer) — REQUEST_CHANGES
- Verified both major claims against actual files; both REAL:
  1. **Malformed-slug crash:** `App.jsx:54` regex `[^/]+` captured `%`; `decodeURIComponent('%')` threw `URIError` → blank page (no error boundary anywhere). Fixed: added `decodeSlug()` to `src/lib/slug.js` (try/catch → `''`), used in `App.jsx`; +2 tests.
  2. **WhatsApp placeholder:** `ProductPage` used `WHATSAPP_PHONE='551199990000'` while Footer used real `SITE.whatsapp`. Fixed: `WHATSAPP_PHONE` now derives from `SITE.whatsapp` (digits-only).
  3. Minor: `CONDITION_STYLE` duplicated in ProductCard + ProductPage → extracted to `src/lib/condition.js`.
- Skipped: Footer contact entries rendered as `href="#top"` (plan said keep layout unchanged).
- **Forward risk (reviewer), fixed inline:** `products.generated.json` has no `slug` field; client `productSlug` fallback vs prerender `assignSlugs` diverge on collision. Fixed: `products.js` now runs `assignSlugs(generated)` so client and prerender resolve identical slugs.
- Commits: `cfa4f8a` (slug guard + real WhatsApp + condition dedupe), `ffee2d2` (client-side assignSlugs).
- Verified: `npm run build` exit 0; `node --test` 41/41 pass.

## Batch 3 — task 03 (prerender per-product HTML + sitemap + robots)
- Started worktree + forager-worker; worker committed `984346e` (5 files: `src/lib/meta.js`, `src/lib/meta.test.js`, `scripts/prerender.mjs`, `package.json`, `public/robots.txt`).
- Merged clean → `ae8275f`.
- Verified on main: `npm run build` exit 0 ("prerendered 6 product pages"); `node --test` 47/47; 6 `dist/produto/*/index.html`; og:title + Product JSON-LD on all 6; no empty og:image; sitemap has 6 `/produto/` entries; robots.txt correct; `npm run preview` + `curl /produto/<slug>/` → 200.
- **Bug found during verification (fixed inline, `3f78b12`):** the prerender cloned `dist/index.html` (which carries the task-04 baseline title/description/canonical/og:*/twitter:card) and stripped only `<title>`, so every product page shipped DUPLICATE description, canonical, og:title, og:description, og:url, og:image, og:type and twitter:card tags. Duplicate canonicals risk Google canonicalizing product pages to the homepage — defeating the feature. Fix: strip the baseline SEO tags (keep `og:site_name`/`og:locale`) and assert exactly one canonical per generated page.
- Re-verified after fix: build exit 0; 47/47 tests; each product page exactly 1 of each tag; homepage intact (1 canonical + 1 og:title); preview 200 with correct per-product canonical.

## State recovery (2026-10-15)
- Root cause: a `git clean -fd` during the batch-1 merge step deleted untracked feature metadata. `.gitignore` only ignores `.hive/features/*/sessions.json`, so `feature.json` / `plan.md` / `tasks/` (untracked) were wiped; only gitignored `sessions.json` survived.
- Recovery: `plan.md` restored from the OpenCode DB (`hive_plan_write` part, 22,244 bytes, 6 tasks); `feature.json` + `APPROVED` reconstructed; `hive_tasks_sync` regenerated 6 tasks; 01/04/06 re-marked done.
- Prevention: do NOT run `git clean -fd` in this repo while feature metadata is untracked. Either commit `.hive/features/<feature>/{feature.json,plan.md,tasks/}` or add them to `.gitignore` deliberately.

## Remaining
- None — all 6 tasks done + merged. Feature ready to complete (AGENTS.md sync + hive_feature_complete).
