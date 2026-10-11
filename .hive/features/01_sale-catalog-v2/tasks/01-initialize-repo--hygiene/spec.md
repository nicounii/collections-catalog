# Task: 01-initialize-repo--hygiene

## Feature: sale-catalog-v2

## Dependencies

_None_

## Plan Section

### 1. Initialize repo & hygiene

**Depends on**: none

**Status**: DONE (this session) — committed as `bc44a79`.

**Files:**
- Create: `.gitignore`, `.env.example`, `README.md`
- Modify: `package.json` (scripts documented in README; `sync` script added in Task 3)

**What to do:**
- `git init -b main` in this directory (was not a repo — the §10 blocker).
- `.gitignore`: `node_modules/`, `dist/`, `.env*` (except `.env.example`), `src/data/products.generated.json`, editor/OS cruft.
- `.env.example`: `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_UPLOAD_PRESET`, `MP_ACCESS_TOKEN`, `MP_WEBHOOK_SECRET`. No `VITE_` prefix on secrets.
- `README.md`: quick start, scripts, architecture diagram, ≤60s listing SOP, security rules, oversell/refund policy, fail-loud sync policy.
- Initial commit bringing the existing storefront under version control.

**Must NOT do:**
- Do not commit `node_modules/`, `dist/`, or a real `.env`.
- Do not rename the brand yet (see Task 10).
- Do not add a `sync` npm script that points at a not-yet-existing file here (added in Task 3).

**References:**
- `docs/PLAN-SUMMARY.md:117-121` — why git init first.
- `package.json:5-9` — existing scripts.

**Verify:**
- [x] `git rev-parse --is-inside-work-tree` → `true`
- [x] `git log --oneline -1` → `bc44a79 chore: initialize repo with Vite+React catalog`
- [x] `git status --short | grep -E "node_modules|dist/"` → no output (ignored)

---

## Task Type

modification
