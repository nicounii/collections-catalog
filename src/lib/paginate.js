// ═══════════════════════════════════════════════════════════════════════
//  paginate — pure pagination helper (client-side, over the generated JSON)
// ═══════════════════════════════════════════════════════════════════════
//
//  Given a full list, a 1-based page number, and a page size, returns the
//  slice for that page plus the total page count and the clamped page.
//
//  Clamping rules:
//    - non-finite / < 1  → page 1
//    - > totalPages      → last page
//    - empty list        → totalPages 1, page 1, items []
//
//  Pure: no side effects, no mutation of the input array.

/**
 * @param {Array} items
 * @param {number} page 1-based page number
 * @param {number} pageSize items per page (>= 1)
 * @returns {{ items: Array, totalPages: number, page: number }}
 */
export function paginate(items, page, pageSize) {
  const list = Array.isArray(items) ? items : [];
  const size = Math.max(1, Math.floor(pageSize) || 1);
  const totalPages = Math.max(1, Math.ceil(list.length / size));

  const requested = Math.floor(page);
  const safePage = Number.isFinite(requested)
    ? Math.min(Math.max(1, requested), totalPages)
    : 1;

  const start = (safePage - 1) * size;
  return {
    items: list.slice(start, start + size),
    totalPages,
    page: safePage,
  };
}
