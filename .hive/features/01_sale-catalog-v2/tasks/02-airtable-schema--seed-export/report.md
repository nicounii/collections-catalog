# Task Report: 02-airtable-schema--seed-export

**Feature:** sale-catalog-v2
**Completed:** 2026-10-11T05:05:43.513Z
**Status:** success
**Commit:** b2bd8ee5325ebf93f2c6999c97c899f637aa18b1

---

## Summary

Created scripts/export-seed.mjs (code schema → Airtable field names, status=available, mp_link/order_ref empty), generated seed-sample.json (29 rows, verified equal to products.length via ESM dynamic import), and docs/airtable-schema.md (14-field table + category single-select values + bootstrap steps). OPERATOR step deferred: create the Airtable base and CSV-import seed-sample.json (user chose build-code-first).

---

## Changes

- **Files changed:** 3
- **Insertions:** +559
- **Deletions:** -0

### Files Modified

- `docs/airtable-schema.md`
- `scripts/export-seed.mjs`
- `seed-sample.json`
