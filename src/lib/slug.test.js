import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify, productSlug, assignSlugs, decodeSlug } from './slug.js';

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
test('assignSlugs never collides with an existing disambiguated slug', () => {
  const out = assignSlugs([{ title: 'Mesmo' }, { title: 'Mesmo' }, { title: 'Mesmo 2' }]);
  const slugs = out.map((p) => p.slug);
  assert.deepEqual(slugs, ['mesmo', 'mesmo-2', 'mesmo-2-2']);
  assert.equal(new Set(slugs).size, slugs.length);
});
test('assignSlugs falls back to "item" when id and title are missing', () => {
  const out = assignSlugs([{}, {}]);
  assert.deepEqual(out.map((p) => p.slug), ['item', 'item-2']);
});
test('decodeSlug decodes valid percent-encoding', () => {
  assert.equal(decodeSlug('sandman-edicao'), 'sandman-edicao');
  assert.equal(decodeSlug('a%20b'), 'a b');
});
test('decodeSlug returns "" for malformed input instead of throwing', () => {
  assert.equal(decodeSlug('%'), '');
  assert.equal(decodeSlug('%E0%A4%A'), '');
});
