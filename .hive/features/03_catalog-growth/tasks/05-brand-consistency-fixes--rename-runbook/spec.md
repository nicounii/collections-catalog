# Task: 05-brand-consistency-fixes--rename-runbook

## Feature: catalog-growth

## Dependencies

- **1. slug--site-config-plumbing-with-collision-guard** (01-slug--site-config-plumbing-with-collision-guard)

## Plan Section

### 5. Brand-consistency fixes + rename runbook

**Depends on**: 1

**Files:**
- Modify: `src/components/Footer.jsx`
- Create: `docs/brand-and-social-setup.md`

**What to do**:
- Step 1: Replace the placeholder contact block in `src/components/Footer.jsx:7` with values sourced from `src/lib/site.js` (`SITE.city`, `SITE.whatsapp`, `SITE.email`) — real RS data already public on the FB page. Keep the same label/order so layout is unchanged.
- Step 2: Create `docs/brand-and-social-setup.md` with:
  - The decision: single brand = **Acervo do Marvete**.
  - Operator steps to rename IG + FB display names to "Acervo do Marvete" and set the profile-name field to `Acervo do Marvete | HQ, Mangá & Colecionáveis` (per `market-research-social-growth.md` §2.3).
  - Bio text to paste (store link = `https://acervodomarvete.com.br`).
  - A note that the "V de Vingança" story moves into the bio/content, not the display name.
- Step 3: Run `npm run build` to confirm no breakage.
- Step 4: Commit
  ```bash
  git add src/components/Footer.jsx docs/brand-and-social-setup.md
  git commit -m "fix(brand): real contact info + social rename runbook"
  ```

**Must NOT do**:
- Do not post the phone/email anywhere it isn't already public.
- Do not attempt IG/FB API changes.

**References**:
- `src/components/Footer.jsx:7` — placeholder contact.
- `docs/market-research-social-growth.md:62-64` — recommended profile name + bio.

**Verify**:
- [ ] `grep -n "São Paulo" src/components/Footer.jsx` → no matches
- [ ] `npm run build` exits 0
- [ ] `docs/brand-and-social-setup.md` exists

---

## Task Type

modification

## Completed Tasks

- 01-slug--site-config-plumbing-with-collision-guard: Product slug + site config plumbing with collision guard. Files: src/lib/slug.js (slugify/productSlug/assignSlugs), src/lib/site.js (SITE const), src/lib/slug.test.js, scripts/sync-catalog.mjs (assignSlugs on live+sample paths), .env.example (VITE_SITE_URL), products.generated.json slugs. Merged 05a1160. Post-merge hardening: assignSlugs now uses a used-Set + while loop so disambiguated slugs cannot collide with later base slugs (commit 35cde18); slug.test.js now 5 tests. Verified: node --test 39/39 pass, npm run build exit 0.
- 04-baseline-ogtwittercanonical-on-the-shell: Baseline OG/Twitter/canonical meta tags on the app shell. index.html head extended with canonical + og:* + twitter:* using absolute URLs, existing head preserved. Merged 43b3fe4. Verified: npm run build exit 0.
- 06-30-day-content-calendar: 30-day social content calendar. docs/content-calendar-30d.md with 30 data rows (D1-D30) + header, grounded in docs/market-research-social-growth.md. Merged 8c0b186. Verified: file present, npm run build exit 0.
