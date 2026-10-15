# Task: 01-slug--site-config-plumbing-with-collision-guard

## Feature: catalog-growth

## Dependencies

_None_

## Plan Section

### 1. Slug + site-config plumbing (with collision guard)

**Depends on**: none

**Files:**
- Create: `src/lib/slug.js`
- Test: `src/lib/slug.test.js`
- Create: `src/lib/site.js`
- Modify: `scripts/sync-catalog.mjs`
- Modify: `.env.example`

**What to do**:
- Step 1: Write the failing test
  ```js
  // src/lib/slug.test.js
  import { test } from 'node:test';
  import assert from 'node:assert/strict';
  import { slugify, productSlug, assignSlugs } from './slug.js';

  test('slugify strips accents, lowercases, hyphenates', () => {
    assert.equal(slugify('Sandman — Edição Definitiva Vol. 1'), 'sandman-edicao-definitiva-vol-1');
    assert.equal(slugify('  Ação & Aventura!  '), 'acao-aventura');
  });
  test('productSlug prefers explicit slug, then id, then title', () => {
    assert.equal(productSlug({ slug: 'x-custom', id: 'foto-01', title: 'Z' }), 'x-custom');
    assert.equal(productSlug({ id: 'hq-002', title: 'Z' }), 'hq-002');
    assert.equal(productSlug({ title: 'Edição Especial' }), 'edicao-especial');
  });
  test('assignSlugs dedupes collisions with a numeric suffix', () => {
    const out = assignSlugs([{ title: 'Mesmo' }, { title: 'Mesmo' }]);
    assert.deepEqual(out.map((p) => p.slug), ['mesmo', 'mesmo-2']);
  });
  ```
- Step 2: Run test to verify it fails
  - Run: `node --test src/lib/slug.test.js`
  - Expected: FAIL — cannot find module `./slug.js`
- Step 3: Implement `src/lib/slug.js`
  ```js
  export function slugify(input) {
    return String(input ?? '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80);
  }
  export function productSlug(product) {
    return product?.slug || slugify(product?.id || product?.title);
  }
  // Assign unique slugs; on collision append -2, -3, …
  export function assignSlugs(items) {
    const seen = new Map();
    return items.map((p) => {
      const base = productSlug(p) || 'item';
      const n = seen.get(base) || 0;
      seen.set(base, n + 1);
      return { ...p, slug: n === 0 ? base : `${base}-${n + 1}` };
    });
  }
  ```
- Step 4: Create `src/lib/site.js`
  ```js
  export const SITE = {
    name: 'Acervo do Marvete',
    url: (import.meta.env?.VITE_SITE_URL || 'https://acervodomarvete.com.br').replace(/\/+$/, ''),
    whatsapp: '+555185000282',
    email: 'andressactrh@gmail.com',
    city: 'Rio Grande do Sul, BR',
    social: {
      instagram: 'https://instagram.com/acervodomarvete',
      facebook: 'https://facebook.com/acervodomarvete',
    },
  };
  ```
- Step 5: In `scripts/sync-catalog.mjs`, import `assignSlugs` from `../src/lib/slug.js`; replace the `sortCatalog(all)` write with `const withSlugs = assignSlugs(all);` then `sortCatalog(withSlugs)`.
- Step 6: Add to `.env.example` under the "Deploy Hook & Environment" block: `VITE_SITE_URL=https://acervodomarvete.com.br  # public site origin (used for canonical/OG)`.
- Step 7: Run `node --test src/lib/slug.test.js` → PASS; run `npm run sync` → items each have a unique `slug`.
- Step 8: Commit
  ```bash
  git add src/lib/slug.js src/lib/slug.test.js src/lib/site.js scripts/sync-catalog.mjs .env.example src/data/products.generated.json
  git commit -m "feat(seo): add product slug + site config"
  ```

**Must NOT do**:
- Do not change existing product field names or drop any field.
- Do not add a client router dependency.

**References**:
- `src/lib/slug.js` (new) — slug utilities.
- `scripts/sync-catalog.mjs:42-52` — `mapRow` (field mapping); `:102-103` — the `sortCatalog` write to patch.

**Verify**:
- [ ] `node --test src/lib/slug.test.js` → all pass
- [ ] `npm run sync` then `grep -c '"slug"' src/data/products.generated.json` → == item count
- [ ] `grep -c '"slug": ""' src/data/products.generated.json` → 0 (no empty slugs)
- [ ] `node -e "const d=require('./src/data/products.generated.json');const s=d.map(p=>p.slug);if(new Set(s).size!==s.length)process.exit(1);console.log('unique ok')"` → `unique ok`

---

## Task Type

modification
