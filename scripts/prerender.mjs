import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildProductMeta, renderHeadTags, buildSitemap } from '../src/lib/meta.js';
import { assignSlugs } from '../src/lib/slug.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'dist/index.html');
const productsPath = join(root, 'src/data/products.generated.json');

const site = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://acervodomarvete.com.br').replace(/\/+$/, '');

let htmlTemplate = '';
try {
  htmlTemplate = readFileSync(indexPath, 'utf8');
} catch (e) {
  console.error('Error reading dist/index.html. Did you run vite build first?');
  process.exit(1);
}

let rawProducts = [];
try {
  rawProducts = JSON.parse(readFileSync(productsPath, 'utf8'));
} catch (e) {
  console.error('Error reading src/data/products.generated.json');
  process.exit(1);
}

const products = assignSlugs(rawProducts);
const slugs = products.map(p => p.slug);
if (new Set(slugs).size !== slugs.length) {
  console.error('duplicate slugs detected');
  process.exit(1);
}

// Strip existing <title>...</title> from htmlTemplate so we can inject renderHeadTags
const baseHtml = htmlTemplate.replace(/<title>[\s\S]*?<\/title>\s*/i, '');

let prerenderCount = 0;
for (const product of products) {
  const meta = buildProductMeta(product, site);
  const headTags = renderHeadTags(meta);

  // Inject headTags before </head>
  const productHtml = baseHtml.replace('</head>', `    ${headTags}\n  </head>`);

  const outDir = join(root, `dist/produto/${product.slug}`);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), productHtml, 'utf8');
  prerenderCount++;
}

// Write sitemap.xml
const sitemapXml = buildSitemap(products, site);
writeFileSync(join(root, 'dist/sitemap.xml'), sitemapXml, 'utf8');

console.log(`prerendered ${prerenderCount} product pages`);
