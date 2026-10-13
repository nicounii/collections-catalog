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

test('json returns Response with default status 200 and JSON content-type', () => {
  const res = json({ ok: true });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-type'), 'application/json');
});

test('json accepts custom status and serializes data', async () => {
  const res = json({ error: 'bad' }, 400);
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.deepEqual(body, { error: 'bad' });
});

test('pick returns only requested keys and omits missing ones', () => {
  const obj = { a: 1, b: 2, c: 3 };
  const res = pick(obj, ['a', 'c', 'missing']);
  assert.deepEqual(res, { a: 1, c: 3 });
});

test('pick handles null/undefined input gracefully', () => {
  assert.deepEqual(pick(null, ['a']), {});
  assert.deepEqual(pick(undefined, ['a']), {});
  assert.deepEqual(pick({}, null), {});
});

test('pick copies values as-is (including falsy)', () => {
  const obj = { zero: 0, false: false, empty: '', null: null };
  const res = pick(obj, ['zero', 'false', 'empty', 'null']);
  assert.deepEqual(res, { zero: 0, false: false, empty: '', null: null });
});

test('slugify strips diacritics/punctuation and maps ª, º, °', () => {
  assert.equal(slugify('X-Men #1 (1963) — 1ª edição'), 'x-men-1-1963-1a-edicao');
  assert.equal(slugify('2º Volume ° Test'), '2o-volume-test');
});

test('slugify handles empty/falsy and trims hyphens', () => {
  assert.equal(slugify(''), '');
  assert.equal(slugify(null), '');
  assert.equal(slugify(undefined), '');
  assert.equal(slugify('---'), '');
  assert.equal(slugify('  Hello World  '), 'hello-world');
});

test('slugify truncates to 48 chars', () => {
  const long = 'a'.repeat(60);
  const s = slugify(long);
  assert.equal(s.length, 48);
  assert.equal(s, 'a'.repeat(48));
});

test('makeUniqueId format and uniqueness', () => {
  const originalNow = Date.now;
  Date.now = () => 1234567890;
  try {
    const id1 = makeUniqueId('Action Figure #1', new Set());
    assert.match(id1, /^[a-z0-9-]+-[a-z0-9]{4}$/);

    const existing = new Set([id1]);
    const id2 = makeUniqueId('Action Figure #1', existing);
    assert.match(id2, /^[a-z0-9-]+-[a-z0-9]{4}-2$/);
  } finally {
    Date.now = originalNow;
  }
});

test('makeUniqueId handles many collisions and accepts array/set', () => {
  const originalNow = Date.now;
  Date.now = () => 1111111111;
  try {
    const base = 'test-item';
    const suffix = Date.now().toString(36).slice(-4);
    const first = `${base}-${suffix}`;
  const existingArr = [];
  let current = first;
  for (let i = 2; i <= 5; i++) {
    existingArr.push(current);
    current = `${first}-${i}`;
  }
  existingArr.push(current); // push first-5
  const id = makeUniqueId('Test Item', existingArr);
  assert.equal(id, `${first}-6`);
  const idFromSet = makeUniqueId('Test Item', new Set(existingArr));
  assert.equal(idFromSet, `${first}-6`);
  } finally {
    Date.now = originalNow;
  }
});

test('cloudinarySignature is 40-char lowercase hex and cross-checks with node:crypto', async () => {
  const params = { timestamp: 1234567890, folder: 'catalog' };
  const apiSecret = 'test_secret_123';
  const sig = await cloudinarySignature(params, apiSecret);
  assert.match(sig, /^[a-f0-9]{40}$/);
  const sortedKeys = Object.keys(params).sort();
  const queryString = sortedKeys.map((k) => `${k}=${params[k]}`).join('&') + apiSecret;
  const expected = crypto.createHash('sha1').update(queryString).digest('hex');
  assert.equal(sig, expected);
  const sig2 = await cloudinarySignature({ timestamp: 1234567891, folder: 'catalog' }, apiSecret);
  assert.notEqual(sig, sig2);
  const sig3 = await cloudinarySignature(params, 'different_secret');
  assert.notEqual(sig, sig3);
});

test('cloudinarySignature sorts keys consistently', async () => {
  const params1 = { z: '1', a: '2', m: '3' };
  const params2 = { a: '2', m: '3', z: '1' };
  const sig1 = await cloudinarySignature(params1, 's');
  const sig2 = await cloudinarySignature(params2, 's');
  assert.equal(sig1, sig2);
});

test('airtableUrl builds correct url without leading slash', () => {
  assert.equal(airtableUrl({ AIRTABLE_BASE_ID: 'app123', AIRTABLE_TABLE: 'Books' }), 'app123/Books');
  assert.equal(airtableUrl({ AIRTABLE_BASE_ID: 'app123' }), 'app123/Catalog');
});

test('airtableFetch throws on non-ok response with body text', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => new Response('Bad Request', { status: 400 });
  try {
    await assert.rejects(
      airtableFetch({ AIRTABLE_BASE_ID: 'b', AIRTABLE_TABLE: 't', AIRTABLE_TOKEN: 'tok' }, ''),
      /Airtable HTTP 400: Bad Request/
    );
  } finally {
    global.fetch = originalFetch;
  }
});

test('airtableFetch returns Response on ok', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => new Response(JSON.stringify({ records: [] }), { status: 200 });
  try {
    const res = await airtableFetch({ AIRTABLE_BASE_ID: 'b', AIRTABLE_TABLE: 't', AIRTABLE_TOKEN: 'tok' }, '');
    assert.equal(res.status, 200);
  } finally {
    global.fetch = originalFetch;
  }
});

test('triggerDeploy does nothing if DEPLOY_HOOK_URL missing', async () => {
  const calls = [];
  const originalFetch = global.fetch;
  global.fetch = async (...a) => { calls.push(a); return new Response('ok'); };
  try {
    await triggerDeploy({});
    assert.equal(calls.length, 0);
  } finally {
    global.fetch = originalFetch;
  }
});

test('triggerDeploy posts to hook when present (swallows errors)', async () => {
  const calls = [];
  const originalFetch = global.fetch;
  global.fetch = async (...a) => { calls.push(a); return new Response('ok'); };
  try {
    await triggerDeploy({ DEPLOY_HOOK_URL: 'https://example.com/hook' });
    assert.equal(calls.length, 1);
    assert.equal(calls[0][0], 'https://example.com/hook');
    assert.deepEqual(calls[0][1], { method: 'POST' });
  } finally {
    global.fetch = originalFetch;
  }
});

test('triggerDeploy swallows fetch errors (logs)', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => { throw new Error('network'); };
  try {
    await assert.doesNotReject(triggerDeploy({ DEPLOY_HOOK_URL: 'https://x/y' }));
  } finally {
    global.fetch = originalFetch;
  }
});

test('requireAccess checks Cf-Access-Authenticated-User-Email or environment', () => {
  const reqWithHeader = {
    headers: {
      get: (h) => (h.toLowerCase() === 'cf-access-authenticated-user-email' ? 'user@example.com' : null)
    }
  };
  const reqWithoutHeader = { headers: { get: () => null } };
  const reqEmpty = { headers: { get: () => '   ' } };

  assert.equal(requireAccess(reqWithHeader, { ENVIRONMENT: 'production' }), true);
  assert.equal(requireAccess(reqWithoutHeader, { ENVIRONMENT: 'development' }), true);
  assert.equal(requireAccess(reqWithoutHeader, { ENVIRONMENT: 'production' }), false);
  assert.equal(requireAccess(reqEmpty, { ENVIRONMENT: 'production' }), false);
  assert.equal(requireAccess(reqEmpty, { ENVIRONMENT: 'development' }), true);
});
