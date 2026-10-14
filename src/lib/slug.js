export function slugify(input) {
  return String(input ?? '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
export function productSlug(product) {
  return product?.slug || slugify(product?.id || product?.title);
}
// Assign unique slugs; on collision append -2, -3, …
export function assignSlugs(items) {
  const seen = new Map();
  return items.map((p) => {
    const base = productSlug(p) || 'item';
    const n = seen.get(base) || 0;
    seen.set(base, n + 1);
    return { ...p, slug: n === 0 ? base : `${base}-${n + 1}` };
  });
}
