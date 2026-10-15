export function esc(s) {
  if (typeof s !== 'string') s = String(s ?? '');
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function absoluteUrl(site, path) {
  if (!path) return site;
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const cleanSite = site.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  return cleanSite + cleanPath;
}

export function productImage(product, site) {
  const raw = typeof product.image === 'string' ? product.image.trim() : '';
  return absoluteUrl(site, raw || '/photos/whatsapp-01.webp');
}

export function buildProductMeta(product, site) {
  const title = product.title ? `${product.title} — Acervo do Marvete` : 'Acervo do Marvete';
  const description = product.note || product.title || 'Quadrinhos e colecionáveis raros';
  const canonical = `${site.replace(/\/+$/, '')}/produto/${product.slug}/`;
  const ogImage = productImage(product, site);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: ogImage,
    description,
    brand: {
      '@type': 'Brand',
      name: product.maker || 'Panini'
    },
    offers: {
      '@type': 'Offer',
      price: product.price ?? 0,
      priceCurrency: 'BRL',
      availability: product.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: canonical
    }
  };

  return {
    title,
    description,
    canonical,
    ogImage,
    jsonLd
  };
}

export function renderHeadTags(meta) {
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    `<link rel="canonical" href="${esc(meta.canonical)}">`,
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:url" content="${esc(meta.canonical)}">`,
    `<meta property="og:image" content="${esc(meta.ogImage)}">`,
    `<meta property="og:type" content="product">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(meta.title)}">`,
    `<meta name="twitter:description" content="${esc(meta.description)}">`,
    `<meta name="twitter:image" content="${esc(meta.ogImage)}">`,
    `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>`
  ];
  return tags.join('\n');
}

export function buildSitemap(products, site) {
  const cleanSite = site.replace(/\/+$/, '');
  const urls = [
    `  <url>\n    <loc>${cleanSite}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`
  ];

  for (const p of products) {
    urls.push(
      `  <url>\n    <loc>${cleanSite}/produto/${p.slug}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join('\n') +
    `\n</urlset>\n`;
}
