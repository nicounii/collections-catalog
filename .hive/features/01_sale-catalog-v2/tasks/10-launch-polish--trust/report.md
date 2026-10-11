# Task Report: 10-launch-polish--trust

**Feature:** sale-catalog-v2
**Completed:** 2026-10-11T05:40:46.947Z
**Status:** success
**Commit:** 8a5af0bb96541a5869185666136bd50980b87999

---

## Summary

Retired "ASHBY & VANE" everywhere → "Acervo do Marvete" (Nav wordmark+monogram AM, Footer wordmark/email/aria/copyright/copy, Heritage story, Hero lede, Announcement message, index.html title+description, package.json + package-lock name/description, products.js + index.css comments). Added real single-owner brand copy. Created docs/condition-guide.md (Novo/Seminovo/Usado), docs/shipping-returns.md (nationwide + local pickup; used items sold as described), docs/faq.md. Mobile QA: raised CartDrawer quantity steppers h-9→h-11 (36→44px) and remove button to 44px tap target, added padding to MP link. Verified: grep ASHBY/Ashby/ashby in src+index.html+package.json → no matches; 3 docs exist; npm run build passes (284.83 kB); SSR full-App render confirms brand strings present and no ASHBY. Left Hero STATS "33+" untouched (unverifiable true count; flagged for operator).

---

## Changes

- **Files changed:** 14
- **Insertions:** +157
- **Deletions:** -27

### Files Modified

- `docs/condition-guide.md`
- `docs/faq.md`
- `docs/shipping-returns.md`
- `index.html`
- `package-lock.json`
- `package.json`
- `src/components/Announcement.jsx`
- `src/components/CartDrawer.jsx`
- `src/components/Footer.jsx`
- `src/components/Heritage.jsx`
- `src/components/Hero.jsx`
- `src/components/Nav.jsx`
- `src/data/products.js`
- `src/index.css`
