#!/usr/bin/env node
// ensure-catalog.mjs — copy products.sample.json → products.generated.json
// only if the generated file is missing. Used by `predev` so a fresh clone
// boots without Airtable credentials. Never overwrites an existing file.

import { copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'src/data/products.generated.json');
const sampleFile = join(root, 'src/data/products.sample.json');

if (!existsSync(outFile)) {
  if (!existsSync(sampleFile)) {
    console.error('[ensure-catalog] products.sample.json missing; cannot bootstrap.');
    process.exit(1);
  }
  copyFileSync(sampleFile, outFile);
  console.warn('[ensure-catalog] copied products.sample.json → products.generated.json (dev fallback)');
} else {
  console.log('[ensure-catalog] products.generated.json already exists — leaving untouched.');
}