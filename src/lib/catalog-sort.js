export function sortCatalog(items) {
  return [...items].sort((a, b) => {
    const ra = Number(a.rank) || 0;
    const rb = Number(b.rank) || 0;
    if (rb !== ra) return rb - ra; // higher rank first
    return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
  });
}
