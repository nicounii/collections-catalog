# Task Report: 08-catalog-scale-ux-400-items

**Feature:** sale-catalog-v2
**Completed:** 2026-10-11T05:34:08.941Z
**Status:** success
**Commit:** 24fe43ef1379305764adfcee87eb1762a526239c

---

## Summary

Added src/lib/paginate.js (pure paginate(items,page,pageSize) → {items,totalPages,page}; clamps invalid page to 1, page>totalPages to last, empty list → 1 page) + src/lib/paginate.test.js (6 node:test cases: page bounds, last partial page, invalid→1, beyond-end→last, empty, no-mutation). Modified src/components/Catalog.jsx: PAGE_SIZE=24, page state, useEffect resets page to 1 on query/category/sort change, results meta shows "X–Y de N" when paginated else "N produtos", prev/next + "Página X de Y" nav (disabled at bounds), scroll-to-results on page change. Fixed dead 'oldest' sort (compared p.era which no product has) → sorts by sync-provided 'added' timestamp; removed unused eraYear helper. Verified: node --test → 6/6 pass (red-green confirmed via mutation); SSR render with 400 generated items → exactly 24 cards, "Página 1 de 17", "1–24 de 400", prev disabled/next enabled, nav aria-label present; oldest comparator shuffled→ascending PASS; bundle contains Página/Anterior/Próxima/Paginação, eraYear absent, .added present; bun run build passes (284.67 kB).

---

## Changes

- **Files changed:** 3
- **Insertions:** +145
- **Deletions:** -6

### Files Modified

- `src/components/Catalog.jsx`
- `src/lib/paginate.js`
- `src/lib/paginate.test.js`
