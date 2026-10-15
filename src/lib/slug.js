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
// Decode a URL path segment safely. Malformed input (e.g. a lone "%") would
// otherwise throw URIError and blank the whole app; fall back to '' so the
// caller renders its not-found state instead.
export function decodeSlug(raw) {
  try {
    return decodeURIComponent(raw);
  } catch {
    return '';
  }
}
// Assign unique slugs; on collision append -2, -3, …
// The final slug (including any suffix) is registered, so a later item whose
// base slug equals an earlier disambiguated slug cannot collide.
export function assignSlugs(items) {
  const used = new Set();
  return items.map((p) => {
    const base = productSlug(p) || 'item';
    let slug = base;
    let n = 2;
    while (used.has(slug)) slug = `${base}-${n++}`;
    used.add(slug);
    return { ...p, slug };
  });
}
