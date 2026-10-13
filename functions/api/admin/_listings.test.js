import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateListing, buildCreateFields } from './listings.js';

test('validateListing validates title, category, and price', () => {
  // Missing or empty title
  assert.deepEqual(validateListing({}), { ok: false, errors: ['title is required', 'category is required', 'price must be a valid number greater than 0'] });
  assert.deepEqual(validateListing({ title: '   ', category: 'Quadrinhos', price: 10 }), { ok: false, errors: ['title is required'] });

  // Missing or empty category
  assert.deepEqual(validateListing({ title: 'Item', category: '', price: 10 }), { ok: false, errors: ['category is required'] });

  // Invalid price
  assert.deepEqual(validateListing({ title: 'Item', category: 'Quadrinhos', price: 0 }), { ok: false, errors: ['price must be a valid number greater than 0'] });
  assert.deepEqual(validateListing({ title: 'Item', category: 'Quadrinhos', price: -5 }), { ok: false, errors: ['price must be a valid number greater than 0'] });
  assert.deepEqual(validateListing({ title: 'Item', category: 'Quadrinhos', price: 'not-a-number' }), { ok: false, errors: ['price must be a valid number greater than 0'] });

  // Valid listing
  assert.deepEqual(validateListing({ title: 'Item', category: 'Quadrinhos', price: 49.90 }), { ok: true, errors: [] });
  assert.deepEqual(validateListing({ title: 'Item', category: 'Quadrinhos', price: '49.90' }), { ok: true, errors: [] });
});

test('buildCreateFields whitelists fields, coerces price, forces status=available, handles featured boolean, drops unknown keys', () => {
  const body = {
    id: 'custom-id', // should be overwritten or kept if valid? Wait, let's check spec or instructions.
    // Spec: buildCreateFields(body, id) -> whitelist only known fields: { id, title, category, price: Number(price), status: 'available', condition, maker, note, image_url, image_alt, art, featured: Boolean(featured) } (omit empty optional strings).
    title: '  Test Item  ',
    category: 'Quadrinhos',
    price: '149.90',
    status: 'sold', // should be overridden to 'available'
    featured: 'true', // truthy -> true
    condition: 'Mint',
    maker: 'BrandX',
    note: 'Great item',
    image_url: 'https://example.com/img.jpg',
    image_alt: 'Alt text',
    art: 'comic',
    mp_link: 'https://mp.com/pay', // unknown key -> dropped
    order_ref: 'REF123', // unknown key -> dropped
    extra_field: 'drop me'
  };

  const fields = buildCreateFields(body, 'generated-id');

  assert.equal(fields.id, 'generated-id');
  assert.equal(fields.title, '  Test Item  '); // or trimmed? Wait, prompt says whitelist only known fields. Let's verify if title is trimmed or not. Prompt: "whitelist only known fields: { id, title, category, price: Number(price), status: 'available', condition, maker, note, image_url, image_alt, art, featured: Boolean(featured) } (omit empty optional strings)."
  assert.equal(fields.category, 'Quadrinhos');
  assert.equal(fields.price, 149.90);
  assert.equal(fields.status, 'available');
  assert.equal(fields.featured, true);
  assert.equal(fields.condition, 'Mint');
  assert.equal(fields.maker, 'BrandX');
  assert.equal(fields.note, 'Great item');
  assert.equal(fields.image_url, 'https://example.com/img.jpg');
  assert.equal(fields.image_alt, 'Alt text');
  assert.equal(fields.art, 'comic');
  assert.equal(fields.mp_link, undefined);
  assert.equal(fields.order_ref, undefined);
  assert.equal(fields.extra_field, undefined);

  // Test omitting empty optional strings
  const bodyWithEmpty = {
    title: 'Item',
    category: 'Quadrinhos',
    price: 10,
    condition: '   ',
    maker: '',
    note: null,
    image_url: undefined
  };
  const fieldsEmpty = buildCreateFields(bodyWithEmpty, 'gen-id');
  assert.equal(fieldsEmpty.condition, undefined);
  assert.equal(fieldsEmpty.maker, undefined);
  assert.equal(fieldsEmpty.note, undefined);
  assert.equal(fieldsEmpty.image_url, undefined);
});
