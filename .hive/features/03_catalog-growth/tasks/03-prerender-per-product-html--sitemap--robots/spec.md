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
