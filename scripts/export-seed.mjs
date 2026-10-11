#!/usr/bin/env node
// export-seed.mjs
// Re-emits the committed seed-sample.json (29 rows, Airtable Catalog field
// names) so the operator always has a stable CSV-import artifact.
//
// Note: products.js is now generated from Airtable (Task 3), so the seed
// source is the committed seed-sample.json, not products.js.
//
// Usage: node scripts/export-seed.mjs
// Output: ./seed-sample.json (one object per row, 14 fields)

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const seedPath = join(root, 'seed-sample.json');
const rows = JSON.parse(readFileSync(seedPath, 'utf8'));

const out = join(root, 'seed-sample.json');
writeFileSync(out, `${JSON.stringify(rows, null, 2)}\n`, 'utf8');
console.log(`Wrote ${rows.length} rows to seed-sample.json`);