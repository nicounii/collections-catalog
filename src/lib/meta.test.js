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
