#!/usr/bin/env node
// sync-catalog.mjs — Airtable → src/data/products.generated.json
//
// Env:
//   AIRTABLE_TOKEN    Personal access token (required for real sync)
//   AIRTABLE_BASE_ID  Base id (required for real sync)
//   AIRTABLE_TABLE    Table name (default: 'Catalog')
//   NODE_ENV          'production' enables the zero-items guard
//
// Behavior:
//   - No creds        → copy products.sample.json → generated (dev fallback), exit 0
//   - Creds + error   → fail-loud, exit 1
//   - Production + 0 items → fail-loud, exit 1 (never ship an empty catalog)
//
// Field map (Airtable → app schema): image_url→image, image_alt→imageAlt,
// mp_link→mpLink, order_ref→orderRef, status→status, created/Created time→added.
// All other fields pass through unchanged.

import { writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { sortCatalog } from '../src/lib/catalog-sort.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'src/data/products.generated.json');
const sampleFile = join(root, 'src/data/products.sample.json');

const token = process.env.AIRTABLE_TOKEN;
const baseId = process.env.AIRTABLE_BASE_ID;
const table = process.env.AIRTABLE_TABLE || 'Catalog';
const isProd = process.env.NODE_ENV === 'production';

const FIELD_MAP = {
  image_url: 'image',
  image_alt: 'imageAlt',
  mp_link: 'mpLink',
  order_ref: 'orderRef',
  status: 'status',
  created: 'added',
};

function mapRow(fields) {
  const out = {};
  for (const [k, v] of Object.entries(fields)) {
    if (k === 'created' || k === 'Created time') continue; // handled below
    out[FIELD_MAP[k] ?? k] = v;
  }
  // Airtable's auto field is named "Created time"; accept `created` too.
  const created = fields.created ?? fields['Created time'];
  if (created) out.added = created;
  return out;
}

// ── Dev fallback: no credentials → sample file ──────────────────────────
if (!token || !baseId) {
  console.warn(
    '[sync-catalog] AIRTABLE_TOKEN/AIRTABLE_BASE_ID not set — using products.sample.json as dev fallback.'
  );
  if (!existsSync(outFile)) {
    if (!existsSync(sampleFile)) {
      console.error('[sync-catalog] products.sample.json missing; cannot bootstrap.');
      process.exit(1);
    }
    copyFileSync(sampleFile, outFile);
    console.warn('[sync-catalog] copied products.sample.json → products.generated.json');
  } else {
    console.warn('[sync-catalog] products.generated.json already exists — leaving untouched.');
  }
  process.exit(0);
}

// ── Real sync: paginate Airtable, exclude sold ──────────────────────────
const base = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`;
const headers = { Authorization: `Bearer ${token}` };
const all = [];
let offset;

try {
  do {
    const url = new URL(base);
    url.searchParams.set('filterByFormula', "NOT({status} = 'sold')");
    url.searchParams.set('pageSize', '100');
    if (offset) url.searchParams.set('offset', offset);

    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`Airtable HTTP ${res.status}: ${await res.text()}`);

    const data = await res.json();
    for (const rec of data.records ?? []) all.push(mapRow(rec.fields ?? {}));
    offset = data.offset;
  } while (offset);
} catch (err) {
  console.error(`[sync-catalog] Airtable sync failed: ${err.message}`);
  process.exit(1);
}

if (all.length === 0 && isProd) {
  console.error('[sync-catalog] 0 items returned in production — refusing to write empty catalog.');
  process.exit(1);
}

const sorted = sortCatalog(all);
writeFileSync(outFile, `${JSON.stringify(sorted, null, 2)}\n`, 'utf8');
console.log(`[sync-catalog] wrote ${all.length} items → src/data/products.generated.json`);