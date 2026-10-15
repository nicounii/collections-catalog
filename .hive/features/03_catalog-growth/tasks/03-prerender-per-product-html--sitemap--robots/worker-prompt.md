# Hive Worker Assignment

You are a worker agent executing a task in an isolated git worktree.

## Assignment Details

| Field | Value |
|-------|-------|
| Feature | catalog-growth |
| Task | 03-prerender-per-product-html--sitemap--robots |
| Task # | 3 |
| Branch | hive/catalog-growth/03-prerender-per-product-html--sitemap--robots |
| Worktree | /home/mathew/BCP/60-69_Projects_&_Goals/67-Current/67.18-Sale-Catalog-Site/.hive/.worktrees/catalog-growth/03-prerender-per-product-html--sitemap--robots |

**CRITICAL**: All file operations MUST be within this worktree path:
`/home/mathew/BCP/60-69_Projects_&_Goals/67-Current/67.18-Sale-Catalog-Site/.hive/.worktrees/catalog-growth/03-prerender-per-product-html--sitemap--robots`

Do NOT modify files outside this directory.

---

## Your Mission

# Task: 03-prerender-per-product-html--sitemap--robots

## Feature: catalog-growth

## Dependencies

- **1. slug--site-config-plumbing-with-collision-guard** (01-slug--site-config-plumbing-with-collision-guard)
- **2. product-detail-route--view** (02-product-detail-route--view)

## Plan Section

### 3. Prerender per-product HTML + sitemap + robots

**Depends on**: 1, 2

**Files:**
- Create: `src/lib/meta.js`
- Test: `src/lib/meta.test.js`
- Create: `scripts/prerender.mjs`
- Modify: `package.json`
- Create: `public/robots.txt`

**What to do**:
- Step 1: Write failing tests for the pure meta builders
  ```js
  // src/lib/meta.test.js
  import { test } from 'node:test';
  import assert from 'node:assert/strict';
  import { esc, absoluteUrl, buildProductMeta, renderHeadTags, buildSitemap } from './meta.js';

  const site = 'https://acervodomarvete.com.br';
  const product = { slug: 'foto-01', title: 'Sandman "Edição" & Vol. 1', maker: 'Panini', category: 'Quadrinhos', price: 120, condition: 'Novo', image: '/photos/whatsapp-01.webp', note: 'Lacrado', status: 'available' };

  test('esc escapes html', () => { assert.equal(esc('a"b&<c>'), 'a&quot;b&amp;&lt;c&gt;'); });
  test('absoluteUrl prefixes relative paths', () => {
    assert.equal(absoluteUrl(site, '/x.jpg'), site + '/x.jpg');
    assert.equal(absoluteUrl(site, 'https://cdn/x.jpg'), 'https://cdn/x.jpg');
  });
  test('buildProductMeta builds canonical + og image + jsonld', () => {
    const m = buildProductMeta(product, site);
    assert.equal(m.canonical, site + '/produto/foto-01/');
    assert.equal(m.ogImage, site + '/photos/whatsapp-01.webp');
    assert.equal(m.jsonLd['@type'], 'Product');
    assert.equal(m.jsonLd.offers.priceCurrency, 'BRL');
  });
  test('buildProductMeta falls back on empty/whitespace image', () => {
    for (const image of ['', '   ', null, undefined]) {
      const m = buildProductMeta({ ...product, image }, site);
      assert.equal(m.ogImage, site + '/photos/whatsapp-01.webp');
    }
  });
  test('renderHeadTags emits og:title and canonical', () => {
    const html = renderHeadTags(buildProductMeta(product, site));
    assert.match(html, /og:title/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /"@type":"Product"/);
  });
  test('buildSitemap includes homepage and each product', () => {
    const xml = buildSitemap([product], site);
    assert.match(xml, new RegExp(site + '/produto/foto-01/'));
    assert.match(xml, /<urlset/);
  });
  ```
- Step 2: Run `node --test src/lib/meta.test.js` → FAIL (module missing).
- Step 3: Implement `src/lib/meta.js` (pure, node-safe, **no `import.meta`**):
  - `esc(s)`, `absoluteUrl(site, path)`.
  - `productImage(product, site)` → `const raw = typeof product.image === 'string' ? product.image.trim() : ''; return absoluteUrl(site, raw || '/photos/whatsapp-01.webp');` (handles `''`/null/whitespace).
  - `buildProductMeta(product, site)` → `{ title, description, canonical, ogImage, jsonLd }` where canonical = `${site}/produto/${slug}/`, ogImage = `productImage(...)`, description = `product.note || product.title`, and `jsonLd = { '@context':'https://schema.org','@type':'Product', name, image, description, brand:{'@type':'Brand',name:maker}, offers:{'@type':'Offer',price,priceCurrency:'BRL',availability: status==='available'?'https://schema.org/InStock':'https://schema.org/OutOfStock', url: canonical} }`.
  - `renderHeadTags(meta)` → `<title>…</title>` + canonical + `og:*` + `twitter:card` + `<script type="application/ld+json">…</script>`.
  - `buildSitemap(products, site)` → `<urlset>` with homepage + `/produto/<slug>/` entries.
- Step 4: Run `node --test src/lib/meta.test.js` → PASS.
- Step 5: Implement `scripts/prerender.mjs`:
  - Read `dist/index.html` and `src/data/products.generated.json`.
  - `const site = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://acervodomarvete.com.br').replace(/\/+$/,'')`.
  - Assign slugs via `assignSlugs` and **fail fast** if any duplicate slug remains after dedupe is impossible (defensive): `if (new Set(slugs).size !== slugs.length) { console.error('duplicate slugs'); process.exit(1); }`.
  - For each product: write `dist/produto/<slug>/index.html` = shell with `renderHeadTags(...)` injected before `</head>` (strip the shell's own `<title>`).
  - Write `dist/sitemap.xml` = `buildSitemap(products, site)`.
  - Log `prerendered N product pages`.
- Step 6: Update `package.json` build script: `"build": "vite build && node scripts/prerender.mjs"`.
- Step 7: Create `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://acervodomarvete.com.br/sitemap.xml
  ```
  (Leave `public/_redirects` unchanged — static product files are served directly; see Ghost Diffs.)
- Step 8: Run `npm run build`.
  - Expected: build succeeds; `dist/produto/<slug>/index.html`, `dist/sitemap.xml`, `dist/robots.txt` exist.
- Step 9: Commit
  ```bash
  git add src/lib/meta.js src/lib/meta.test.js scripts/prerender.mjs package.json public/robots.txt
  git commit -m "feat(seo): prerender per-product HTML, sitemap, robots"
  ```

**Must NOT do**:
- Do not import `import.meta.env` inside `src/lib/meta.js` (must run under plain node).
- Do not change the asset paths produced by Vite (root-absolute is required for nested copies).
- Do not add a blanket `/* /index.html 200` to `_redirects`.
- Do not block the build on a missing sitemap/robots file.

**References**:
- `index.html:1-19` — shell to clone.
- `scripts/sync-catalog.mjs:19-26` — node script conventions.
- `docs/deploy.md:15-20` — build command/output dir assumptions.

**Verify**:
- [ ] `node --test src/lib/meta.test.js` → all pass
- [ ] `npm run build` exits 0
- [ ] `ls dist/produto/*/index.html | wc -l` → equals product count
- [ ] `grep -l 'og:title' dist/produto/*/index.html | wc -l` → equals product count
- [ ] `grep -l '"@type":"Product"' dist/produto/*/index.html | wc -l` → equals product count
- [ ] `grep -rl 'og:image" content=""' dist/produto/` → no matches (no empty OG image)
- [ ] `grep -c '/produto/' dist/sitemap.xml` → equals product count
- [ ] `cat dist/robots.txt` contains `Sitemap:`
- [ ] `npm run preview &` then `curl -sI http://localhost:4173/produto/<slug>/` → `200`

---

## Task Type

modification

## Completed Tasks

- 01-slug--site-config-plumbing-with-collision-guard: Product slug + site config plumbing with collision guard. Files: src/lib/slug.js (slugify/productSlug/assignSlugs), src/lib/site.js (SITE const), src/lib/slug.test.js, scripts/sync-catalog.mjs (assignSlugs on live+sample paths), .env.example (VITE_SITE_URL), products.generated.json slugs. Merged 05a1160. Post-merge hardening: assignSlugs now uses a used-Set + while loop so disambiguated slugs cannot collide with later base slugs (commit 35cde18); slug.test.js now 5 tests. Verified: node --test 39/39 pass, npm run build exit 0.
- 02-product-detail-route--view: Implemented the product detail route and view at /produto/<slug>. Created src/pages/ProductPage.jsx, added getBySlug in src/data/products.js, and updated src/App.jsx to handle the route. Verified build succeeds with npm run build.
- 04-baseline-ogtwittercanonical-on-the-shell: Baseline OG/Twitter/canonical meta tags on the app shell. index.html head extended with canonical + og:* + twitter:* using absolute URLs, existing head preserved. Merged 43b3fe4. Verified: npm run build exit 0.
- 05-brand-consistency-fixes--rename-runbook: Updated Footer.jsx to source contact details from src/lib/site.js and created docs/brand-and-social-setup.md specifying brand name, social handle rename steps, bio text, and V de Vingança story placement. Verified build passes successfully with no 'São Paulo' occurrences in Footer.jsx.
- 06-30-day-content-calendar: 30-day social content calendar. docs/content-calendar-30d.md with 30 data rows (D1-D30) + header, grounded in docs/market-research-social-growth.md. Merged 8c0b186. Verified: file present, npm run build exit 0.


---

## Pre-implementation Checklist

Before writing code, confirm:
1. Dependencies are satisfied and required context is present.
2. The exact files/sections to touch (from references) are identified.
3. The verification path is clear: a failing test for new behavior, or the existing coverage to keep green for refactor-only work.
4. The minimal change needed to reach green is planned.

---

## TDD Protocol (Required)

1. **Red**: Write failing test first
2. **Green**: Minimal code to pass
3. **Refactor**: Clean up, keep tests green

When adding new behavior, write the test before the implementation.
When refactoring existing tested code, keep tests green throughout; no new failing test is required.

## Debugging Protocol (When stuck)

1. **Reproduce**: Get consistent failure
2. **Isolate**: Binary search to find cause
3. **Hypothesize**: Form theory, test it
4. **Fix**: Minimal change that resolves

After 3 failed attempts at same fix: STOP and report blocker.

---

## Blocker Protocol

If you hit a blocker requiring human decision, **DO NOT** use the question tool directly.
Instead, escalate via the blocker protocol:

1. **Save your progress** to the worktree (commit if appropriate)
2. **Call hive_worktree_commit** with blocker info:

```
hive_worktree_commit({
  task: "03-prerender-per-product-html--sitemap--robots",
  feature: "catalog-growth",
  status: "blocked",
  summary: "What you accomplished so far",
  blocker: {
    reason: "Why you're blocked - be specific",
    options: ["Option A", "Option B", "Option C"],
    recommendation: "Your suggested choice with reasoning",
    context: "Relevant background the user needs to decide"
  }
})
```

**After calling hive_worktree_commit with blocked status, STOP IMMEDIATELY.**

The Hive Master will:
1. Receive your blocker info
2. Ask the user via question()
3. Spawn a NEW worker to continue with the decision

This keeps the user focused on ONE conversation (Hive Master) instead of multiple worker panes.

---

## Verification Evidence

Before claiming completion, verify your work with command-first evidence proportional to the change type:

| Change type | Required verification |
|---|---|
| New behavior | Run tests covering the new code; record pass/fail counts |
| Bug fix | Reproduce the original failure, then confirm the fix |
| Refactor | Run existing tests; confirm no regressions |
| Prompt / text-only | Run relevant local tests if available; otherwise do file-specific sanity checks such as generation, syntax/parse, or conflict-marker scans |

**Rules:**
- Run the command, then record observed output. Do not substitute explanation for execution.
- If a check cannot be run (missing deps, no test runner in worktree), explicitly state "Not run: <reason>" instead of omitting it silently.
- command-first means: execute first, interpret second. Never claim a result you have not observed.

---

## Completion Protocol

When your task is **fully complete**:

```
hive_worktree_commit({
  task: "03-prerender-per-product-html--sitemap--robots",
  feature: "catalog-growth",
  status: "completed",
  summary: "Concise summary of what you accomplished",
  message: "Optional git commit subject

Optional body"
})
```

- Use summary for task/report context.
- Use optional message only to control git commit/merge text.
- Multi-line message is supported where a new commit is created.
- Omit message (or pass empty string) to use existing defaults.
- Do not provide message with hive_merge(..., strategy: 'rebase').

Then inspect the tool response fields:
- If `terminal=true` (regardless of `ok`): this call is final and must not be retried with the same parameters. Send one final concise handoff response to the orchestrator, then stop.
- If `terminal=false`: **DO NOT STOP**. Follow `nextAction`, remediate, and retry `hive_worktree_commit`

**CRITICAL: Any terminal commit result is final for this call.**
If commit returns non-terminal (for example verification_required), DO NOT STOP.
Follow result.nextAction, fix the issue, and call hive_worktree_commit again.

Only when commit result is terminal should you stop.
After a terminal result, send one final concise handoff response to the orchestrator, then stop.
The final response should include what changed, why (if relevant), and verification evidence (or "Not run" with reason).
Do NOT continue working after that final response. Your session is DONE.
The Hive Master will take over from here.

**Summary Guidance** (used verbatim for downstream task context):
1. Start with **what changed** (files/areas touched).
2. Mention **why** if it affects future tasks.
3. Note **verification evidence** (tests/build/lint) or explicitly say "Not run".
4. Keep it **2-4 sentences** max.

If you encounter an **unrecoverable error**:

```
hive_worktree_commit({
  task: "03-prerender-per-product-html--sitemap--robots",
  feature: "catalog-growth",
  status: "failed",
  summary: "What went wrong and what was attempted"
})
```

If you made **partial progress** but can't continue:

```
hive_worktree_commit({
  task: "03-prerender-per-product-html--sitemap--robots",
  feature: "catalog-growth",
  status: "partial",
  summary: "What was completed and what remains"
})
```

---

## Tool Access

**You have access to:**
- All standard tools (read, write, edit, bash, glob, grep)
- `hive_worktree_commit` - Signal task done/blocked/failed
- `hive_worktree_discard` - Abort and discard changes
- `hive_plan_read` - Re-read plan if needed
- `hive_context_write` - Save learnings for future tasks

**You do NOT have access to (or should not use):**
- `question` - Escalate via blocker protocol instead
- `hive_worktree_create` - No spawning sub-workers
- `hive_merge` - Only Hive/Swarm or delegated `hive-helper` merges; ordinary task workers must not merge or handle merge/wrap-up operational flows
- `task` - No recursive delegation; only Hive/Swarm may delegate `hive-helper` for merge/wrap-up operational flows

---

## Guidelines

1. **Work methodically** - Break down the mission into steps
2. **Stay in scope** - Only do what the spec asks
3. **Escalate blockers** - Don't guess on important decisions
4. **Save context** - Use hive_context_write for discoveries
5. **Complete cleanly** - Always call hive_worktree_commit when done

---

Begin your task now.
