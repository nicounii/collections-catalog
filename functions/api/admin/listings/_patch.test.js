import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPatch } from './[recordId].js';

test('buildPatch validates status', () => {
  // Allows valid statuses
  for (const status of ['available', 'reserved', 'sold']) {
    const res = buildPatch({ status });
    assert.equal(res.ok, true);
    assert.deepEqual(res.fields, { status });
  }

  // Rejects invalid status
  const resInvalid = buildPatch({ status: 'done' });
  assert.equal(resInvalid.ok, false);
});

test('buildPatch coerces featured boolean', () => {
  assert.deepEqual(buildPatch({ featured: 1 }), { ok: true, fields: { featured: true } });
  assert.deepEqual(buildPatch({ featured: 0 }), { ok: true, fields: { featured: false } });
  assert.deepEqual(buildPatch({ featured: true }), { ok: true, fields: { featured: true } });
  assert.deepEqual(buildPatch({ featured: false }), { ok: true, fields: { featured: false } });
});

test('buildPatch validates rank', () => {
  assert.deepEqual(buildPatch({ rank: 10 }), { ok: true, fields: { rank: 10 } });
  assert.deepEqual(buildPatch({ rank: '15' }), { ok: false }); // non-number string
  assert.deepEqual(buildPatch({ rank: NaN }), { ok: false });
  assert.deepEqual(buildPatch({ rank: Infinity }), { ok: false });
});

test('buildPatch rejects unknown keys and empty bodies', () => {
  assert.deepEqual(buildPatch({ foo: 'bar' }), { ok: false });
  assert.deepEqual(buildPatch({}), { ok: false });
  assert.deepEqual(buildPatch(null), { ok: false });
  assert.deepEqual(buildPatch(undefined), { ok: false });

  // Mixed valid and unknown keys - ignores unknown keys or rejects?
  // Let's check spec or instructions:
  // "whitelist: status ∈ {'available','reserved','sold'}; featured coerced with Boolean(); rank = Number and Number.isFinite. Return { ok, fields } (empty fields → not ok)."
  // If unknown keys are present along with valid keys, let's see if whitelist should filter out unknown keys or if buildPatch should ignore unknown keys.
  // Wait, "Do not allow arbitrary field edits — only status, featured, rank."
  // If we whitelist, we only pick status, featured, rank from the input object!
  const resMixed = buildPatch({ status: 'available', unknownKey: 'hack' });
  assert.equal(resMixed.ok, true);
  assert.deepEqual(resMixed.fields, { status: 'available' });

  // If ONLY unknown keys present, fields is empty -> not ok
  const resOnlyUnknown = buildPatch({ unknownKey: 'hack' });
  assert.equal(resOnlyUnknown.ok, false);
});
