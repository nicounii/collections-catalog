#!/usr/bin/env node
// export-seed.mjs
// Reads src/data/products.js (code schema) and emits seed-sample.json in the
// Airtable Catalog field names, ready for CSV import into the Airtable base.
//
// Usage: node scripts/export-seed.mjs
// Output: ./seed-sample.json (one object per row, 14 fields)

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { products } = await import(join(root, 'src/data/products.js'));

// Code schema -> Airtable Catalog field names (see docs/airtable-schema.md).
const toAirtableRow = (p) => ({
  id: p.id,
  title: p.title,
  maker: p.maker ?? '',
  category: p.category,
  price: p.price,
  condition: p.condition ?? '',
  image_url: p.image ?? '',
  image_alt: p.imageAlt ?? '',
  art: p.art ?? '',
  note: p.note ?? '',
  featured: p.featured ?? false,
  status: 'available',
  mp_link: '',
  order_ref: '',
});

const rows = products.map(toAirtableRow);
const out = join(root, 'seed-sample.json');
writeFileSync(out, `${JSON.stringify(rows, null, 2)}\n`, 'utf8');
console.log(`Wrote ${rows.length} rows to seed-sample.json`);