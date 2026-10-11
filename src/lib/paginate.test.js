import { test } from 'node:test';
import assert from 'node:assert/strict';
import { paginate } from './paginate.js';

const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

test('page bounds: first and last full pages', () => {
  const items = range(48);
  const first = paginate(items, 1, 24);
  assert.equal(first.page, 1);
  assert.equal(first.totalPages, 2);
  assert.deepEqual(first.items, range(24));

  const second = paginate(items, 2, 24);
  assert.equal(second.page, 2);
  assert.deepEqual(second.items, range(24).map((n) => n + 24));
});

test('last partial page returns the remainder', () => {
  const items = range(25);
  const last = paginate(items, 2, 24);
  assert.equal(last.totalPages, 2);
  assert.equal(last.page, 2);
  assert.deepEqual(last.items, [25]);
});

test('invalid page clamps to 1', () => {
  const items = range(50);
  for (const bad of [0, -1, -99, NaN, undefined, null]) {
    const { page } = paginate(items, bad, 24);
    assert.equal(page, 1, `page ${String(bad)} should clamp to 1`);
  }
});

test('page beyond the end clamps to the last page', () => {
  const items = range(25);
  const { page, items: slice } = paginate(items, 999, 24);
  assert.equal(page, 2);
  assert.deepEqual(slice, [25]);
});

test('empty list yields one empty page', () => {
  const { items, totalPages, page } = paginate([], 1, 24);
  assert.deepEqual(items, []);
  assert.equal(totalPages, 1);
  assert.equal(page, 1);
});

test('does not mutate the input array', () => {
  const items = range(10);
  const copy = [...items];
  paginate(items, 1, 4);
  assert.deepEqual(items, copy);
});
