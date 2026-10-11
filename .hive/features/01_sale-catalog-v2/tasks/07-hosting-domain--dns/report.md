# Task Report: 07-hosting-domain--dns

**Feature:** sale-catalog-v2
**Completed:** 2026-10-11T05:27:59.006Z
**Status:** success
**Commit:** b1d686a07580fa7a2c02e117e79d00aa58eb7b7d

---

## Summary

Created wrangler.toml (secret-free: name="acervo-do-marvete", pages_build_output_dir="dist", compatibility_date) and docs/deploy.md. deploy.md documents: Cloudflare Pages Git-integration setup (build command `npm run build`, output `dist`, root `/`, NODE_VERSION=22), full env var list (build-time AIRTABLE_TOKEN/AIRTABLE_BASE_ID/AIRTABLE_TABLE + server-time MP_ACCESS_TOKEN/MP_WEBHOOK_SECRET for 6B), Registro.br .com.br domain + Cloudflare nameservers + automatic HTTPS, rollback (dashboard/CLI/code-revert), and verification checklist. Verified: deploy.md contains build command + output dir + every env var; wrangler.toml parses and has no secret values; bun run build passes. OPERATOR-only verify items (Pages preview URL 200, production domain HTTPS) deferred — no Cloudflare/Registro.br credentials available.

---

## Changes

- **Files changed:** 2
- **Insertions:** +122
- **Deletions:** -0

### Files Modified

- `docs/deploy.md`
- `wrangler.toml`
