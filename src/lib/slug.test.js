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
