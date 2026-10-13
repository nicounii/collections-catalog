import test from 'node:test';
import assert from 'node:assert';
import { sortCatalog } from './catalog-sort.js';

test('sorts items by rank descending then id numerically', () => {
  const items = [
    { id: '10', rank: 0 },
    { id: '2', rank: 5 },
    { id: '1', rank: 5 },
    { id: '5', rank: 2 }
  ];
  const sorted = sortCatalog(items);
  assert.deepStrictEqual(sorted.map(i => i.id), ['1', '2', '5', '10']);
});

test('orders items with no rank field by numeric id (backwards-compatible)', () => {
  const items = [
    { id: '10' },
    { id: '2' },
    { id: '1' }
  ];
  const sorted = sortCatalog(items);
  assert.deepStrictEqual(sorted.map(i => i.id), ['1', '2', '10']);
});

test('input array is not mutated', () => {
  const items = [
    { id: '2', rank: 0 },
    { id: '1', rank: 5 }
  ];
  const copy = [...items];
  sortCatalog(items);
  assert.deepStrictEqual(items, copy);
});
