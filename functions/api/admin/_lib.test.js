import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {
  json,
  pick,
  slugify,
  makeUniqueId,
  cloudinarySignature,
  airtableUrl,
  airtableFetch,
  triggerDeploy,
  requireAccess
} from './_lib.js';

test('pick returns only requested keys and omits missing ones', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const res = pick(obj, ['a', 'c', 'missing']);
  assert.deepEqual(res, { a: 1, c: 3 });
});

test('slugify strips diacritics/punctuation and maps ª, º, °', () => {
  assert.equal(slugify('X-Men #1 (1963) — 1ª edição'), 'x-men-1-1963-1a-edicao');
  assert.equal(slugify('2º Volume ° Test'), '2o-volume-test');
});

test('makeUniqueId format and uniqueness', () => {
  const id1 = makeUniqueId('Action Figure #1', new Set());
  assert.match(id1, /^[a-z0-9-]+-[a-z0-9]{4}$/);

  const existing = new Set([id1]);
  const id2 = makeUniqueId('Action Figure #1', existing);
  assert.match(id2, /^[a-z0-9-]+-[a-z0-9]{4}-2$/);
});

test('cloudinarySignature is 40-char lowercase hex and cross-checks with node:crypto', async () => {
  const params = { timestamp: 1234567890, folder: 'catalog' };
  const apiSecret = 'test_secret_123';

  const sig = await cloudinarySignature(params, apiSecret);
  assert.match(sig, /^[a-f0-9]{40}$/);

  // Cross-check against node:crypto createHash('sha1') over k=v&...secret
  const sortedKeys = Object.keys(params).sort();
  const queryString = sortedKeys.map((k) => `${k}=${params[k]}`).join('&') + apiSecret;
  const expected = crypto.createHash('sha1').update(queryString).digest('hex');

  assert.equal(sig, expected);

  // Check changes when param or secret changes
  const sig2 = await cloudinarySignature({ timestamp: 1234567891, folder: 'catalog' }, apiSecret);
  assert.notEqual(sig, sig2);

  const sig3 = await cloudinarySignature(params, 'different_secret');
  assert.notEqual(sig, sig3);
});

test('airtableUrl builds correct url without leading slash', () => {
  assert.equal(airtableUrl({ AIRTABLE_BASE_ID: 'app123', AIRTABLE_TABLE: 'Books' }), 'app123/Books');
  assert.equal(airtableUrl({ AIRTABLE_BASE_ID: 'app123' }), 'app123/Catalog');
});

test('requireAccess checks Cf-Access-Authenticated-User-Email or environment', () => {
  const reqWithHeader = {
    headers: {
      get: (h) => (h.toLowerCase() === 'cf-access-authenticated-user-email' ? 'user@example.com' : null)
    }
  };
  const reqWithoutHeader = {
    headers: {
      get: () => null
    }
  };

  assert.equal(requireAccess(reqWithHeader, { ENVIRONMENT: 'production' }), true);
  assert.equal(requireAccess(reqWithoutHeader, { ENVIRONMENT: 'development' }), true);
  assert.equal(requireAccess(reqWithoutHeader, { ENVIRONMENT: 'production' }), false);
});
