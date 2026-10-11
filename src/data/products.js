// ═══════════════════════════════════════════════════════════════════════
//  CATÁLOGO — ACERVO DO MARVETE
// ═══════════════════════════════════════════════════════════════════════
//
//  FONTE DE DADOS: Airtable (base Catalog)
//  ───────────────────────────────────────────────────────────────────────
//  Este arquivo NÃO contém produtos inline. O catálogo é gerado por
//  scripts/sync-catalog.mjs a partir do Airtable:
//
//    npm run sync      # Airtable → src/data/products.generated.json
//    npm run build     # roda sync automaticamente (prebuild)
//    npm run dev       # garante o fallback dev (predev)
//
//  Sem credenciais (AIRTABLE_TOKEN/AIRTABLE_BASE_ID), o sync copia
//  src/data/products.sample.json como fallback de desenvolvimento.
//
//  CATEGORIAS DISPONÍVEIS:
//  'Todos', 'Quadrinhos', 'Marvel Comics', 'DC Comics',
//  'Novidades', 'Action Figures', 'Retro Gaming', 'Livros de Coleção'
//
//  GLIFOS DISPONÍVEIS (para produtos sem foto, campo 'art'):
//  comic, figure, mask, shield, cape, web, raygun, badge, bust, frame
//
// ═══════════════════════════════════════════════════════════════════════

import generated from './products.generated.json';

export const CATEGORIES = [
  'Todos',
  'Quadrinhos',
  'Marvel Comics',
  'DC Comics',
  'Novidades',
  'Action Figures',
  'Retro Gaming',
  'Livros de Coleção',
];

export const products = generated;

// Filtra produtos por categoria para os trilhos de seção
export const byCategory = (cat) => products.filter((p) => p.category === cat);

export const journalPosts = [
  {
    id: 'j-1',
    kicker: 'Guia',
    art: 'comic',
    title: 'Como identificar uma primeira edição',
    date: '2 Outubro',
    reading: '6 min',
    excerpt:
      'Da capa à lombada, os detalhes que separam uma primeira impressão de uma reimpressão. Um guia prático para colecionadores.',
  },
  {
    id: 'j-2',
    kicker: 'Dicas',
    art: 'mask',
    title: 'Seis sinais de uma action figure falsificada',
    date: '27 Setembro',
    reading: '4 min',
    excerpt:
      'Pintura, articulações, selo e embalagem. Um guia de campo para não cair em réplicas.',
  },
  {
    id: 'j-3',
    kicker: 'Mercado',
    art: 'figure',
    title: 'Cinco categorias que o mercado ainda subestima',
    date: '19 Setembro',
    reading: '8 min',
    excerpt:
      'Cartuchos retro, art books, edições limitadas e colecionáveis de nicho — onde olhos atentos ainda encontram valor.',
  },
];

export const NAV_LINKS = ['Catálogo', 'Categorias', 'Vitrine', 'Blog', 'Sobre'];

export const SUB_NAV = [
  'Novidades',
  'Quadrinhos',
  'Marvel Comics',
  'DC Comics',
  'Action Figures',
  'Retro Gaming',
  'Livros de Coleção',
];