// ═══════════════════════════════════════════════════════════════════════
//  CATÁLOGO — ASHBY & VANE
// ═══════════════════════════════════════════════════════════════════════
//
//  COMO ADICIONAR UM NOVO PRODUTO:
//  ───────────────────────────────
//  1. Coloque a foto em  public/photos/  (ex: meu-produto.jpeg)
//  2. Copie um bloco de produto abaixo e preencha:
//
//     {
//       id: 'id-unico',              // qualquer texto único
//       title: 'Nome do produto',
//       maker: 'Editora / Fabricante',
//       category: 'Quadrinhos',       // use uma das CATEGORIES abaixo
//       price: 49.90,                 // preço em R$
//       condition: 'Novo',            // Novo / Seminovo / Usado
//       image: '/photos/meu-produto.jpeg',  // caminho da foto
//       imageAlt: 'Descrição da imagem',
//       note: 'Detalhes do produto...',
//       featured: false,              // true = destaque na vitrine
//     },
//
//  3. Salve o arquivo. O site atualiza automaticamente (modo dev).
//
//  CATEGORIAS DISPONÍVEIS:
//  'Todos', 'Quadrinhos', 'Marvel Comics', 'DC Comics',
//  'Novidades', 'Action Figures', 'Retro Gaming', 'Livros de Coleção'
//
//  GLIFOS DISPONÍVEIS (para produtos sem foto, campo 'art'):
//  comic, figure, mask, shield, cape, web, raygun, badge, bust, frame
//
// ═══════════════════════════════════════════════════════════════════════

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

export const products = [
  // ──────────────────────────────────────────────────────────────────
  //  FOTOS REAIS (whatsapp-01…05) — preencha os detalhes reais abaixo
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'foto-01',
    title: 'Edição Especial — Foto 01',
    maker: 'A confirmar',
    category: 'Novidades',
    price: 89.90,
    condition: 'Novo',
    art: 'comic',
    image: '/photos/whatsapp-01.jpeg',
    imageAlt: 'Produto em destaque — foto 01',
    note: 'Produto com foto real. Edite este campo com os detalhes reais.',
    featured: true,
  },
  {
    id: 'foto-02',
    title: 'Edição Especial — Foto 02',
    maker: 'A confirmar',
    category: 'Novidades',
    price: 59.90,
    condition: 'Novo',
    art: 'figure',
    image: '/photos/whatsapp-02.jpeg',
    imageAlt: 'Produto em destaque — foto 02',
    note: 'Produto com foto real. Edite este campo com os detalhes reais.',
  },
  {
    id: 'foto-03',
    title: 'Edição Especial — Foto 03',
    maker: 'A confirmar',
    category: 'Novidades',
    price: 79.90,
    condition: 'Novo',
    art: 'frame',
    image: '/photos/whatsapp-03.jpeg',
    imageAlt: 'Produto em destaque — foto 03',
    note: 'Produto com foto real. Edite este campo com os detalhes reais.',
  },
  {
    id: 'foto-04',
    title: 'Edição Especial — Foto 04',
    maker: 'A confirmar',
    category: 'Novidades',
    price: 149.90,
    condition: 'Novo',
    art: 'mask',
    image: '/photos/whatsapp-04.jpeg',
    imageAlt: 'Produto em destaque — foto 04',
    note: 'Produto com foto real. Edite este campo com os detalhes reais.',
  },
  {
    id: 'foto-05',
    title: 'Edição Especial — Foto 05',
    maker: 'A confirmar',
    category: 'Novidades',
    price: 39.90,
    condition: 'Novo',
    art: 'frame',
    image: '/photos/whatsapp-05.jpeg',
    imageAlt: 'Produto em destaque — foto 05',
    note: 'Produto com foto real. Edite este campo com os detalhes reais.',
  },

  // ──────────────────────────────────────────────────────────────────
  //  QUADRINHOS (HQs)
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'hq-001',
    title: 'Sandman — Edição Definitiva Vol. 1',
    maker: 'Panini',
    category: 'Quadrinhos',
    price: 129.90,
    condition: 'Novo',
    art: 'comic',
    note: 'Capa dura, 504 páginas. A saga completa de Morfeu em formato de luxo.',
  },
  {
    id: 'hq-002',
    title: 'Watchmen — Edição Absoluta',
    maker: 'Panini',
    category: 'Quadrinhos',
    price: 249.90,
    condition: 'Novo',
    art: 'comic',
    image: '/photos/hq-002.jpg',
    imageAlt: 'Selo sorriso do Watchmen (DC Comics)',
    note: 'Formato oversize, capa dura com luva. A obra-prima de Alan Moore e Dave Gibbons.',
  },
  {
    id: 'hq-003',
    title: 'Turma da Mônica Jovem — Vol. 1 ao 10',
    maker: 'Panini',
    category: 'Quadrinhos',
    price: 189.90,
    condition: 'Seminovo',
    art: 'comic',
    note: 'Coleção completa dos 10 primeiros volumes. Estado impecável, sem marcas.',
  },
  {
    id: 'hq-004',
    title: 'Berserk — Edição de Luxo Vol. 1',
    maker: 'Panini',
    category: 'Quadrinhos',
    price: 79.90,
    condition: 'Novo',
    art: 'comic',
    note: 'Mangá em formato deluxe. Três volumes em um, capa dura.',
  },

  // ──────────────────────────────────────────────────────────────────
  //  MARVEL COMICS
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'mv-001',
    title: 'O Espetacular Homem-Aranha — Vol. 1',
    maker: 'Panini',
    category: 'Marvel Comics',
    price: 34.90,
    condition: 'Novo',
    art: 'web',
    note: 'Coleção clássica reeditada. Inclui as primeiras aventuras do cabeça-de-teia.',
  },
  {
    id: 'mv-002',
    title: 'X-Men — Massacre de Mutantes',
    maker: 'Panini',
    category: 'Marvel Comics',
    price: 89.90,
    condition: 'Novo',
    art: 'comic',
    note: 'Encadernado com a saga completa de Massacre. Capa dura, 320 páginas.',
  },
  {
    id: 'mv-003',
    title: 'Vingadores — Guerra Infinita',
    maker: 'Panini',
    category: 'Marvel Comics',
    price: 59.90,
    condition: 'Seminovo',
    art: 'shield',
    note: 'A saga cósmica de Jim Starlin. Thanos enfrenta o universo Marvel.',
  },
  {
    id: 'mv-004',
    title: 'Demolidor — O Homem sem Medo',
    maker: 'Panini',
    category: 'Marvel Comics',
    price: 44.90,
    condition: 'Novo',
    art: 'mask',
    note: 'A fase clássica de Frank Miller que redefiniu o personagem.',
  },

  // ──────────────────────────────────────────────────────────────────
  //  DC COMICS
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'dc-001',
    title: 'Batman — O Cavaleiro das Trevas',
    maker: 'Panini',
    category: 'DC Comics',
    price: 69.90,
    condition: 'Novo',
    art: 'mask',
    image: '/photos/dc-001.jpg',
    imageAlt: 'Capa da HQ Batman Vol. 1 #150 (1962)',
    note: 'A obra-prima de Frank Miller. Edição capa dura com extras.',
  },
  {
    id: 'dc-002',
    title: 'Superman — Entre a Foice e o Martelo',
    maker: 'Panini',
    category: 'DC Comics',
    price: 54.90,
    condition: 'Novo',
    art: 'cape',
    image: '/photos/dc-002.jpg',
    imageAlt: 'Capa da HQ Action Comics Vol. 1 #321 (1965)',
    note: 'E se Superman tivesse caído na União Soviética? Elseworlds clássico.',
  },
  {
    id: 'dc-003',
    title: 'Mulher-Maravilha — Sangue',
    maker: 'Panini',
    category: 'DC Comics',
    price: 49.90,
    condition: 'Novo',
    art: 'shield',
    note: 'A fase dos Novos 52 por Brian Azzarello e Cliff Chiang.',
  },
  {
    id: 'dc-004',
    title: 'Liga da Justiça — Origem',
    maker: 'Panini',
    category: 'DC Comics',
    price: 39.90,
    condition: 'Seminovo',
    art: 'badge',
    note: 'A formação da Liga por Geoff Johns e Jim Lee. Novos 52.',
  },

  // ──────────────────────────────────────────────────────────────────
  //  ACTION FIGURES
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'af-001',
    title: 'Spider-Man — Marvel Legends',
    maker: 'Hasbro',
    category: 'Action Figures',
    price: 299.90,
    condition: 'Novo',
    art: 'figure',
    image: '/photos/af-001.jpg',
    imageAlt: 'Action figure do Homem-Aranha',
    note: 'Figura articulada 1:12, pintura premium. Na caixa lacrada.',
  },
  {
    id: 'af-002',
    title: 'Batman — McFarlane Multiverse',
    maker: 'McFarlane Toys',
    category: 'Action Figures',
    price: 249.90,
    condition: 'Novo',
    art: 'figure',
    note: 'Escala 7", com base e acessórios. Edição do filme.',
  },
  {
    id: 'af-003',
    title: 'Goku Super Saiyajin — S.H.Figuarts',
    maker: 'Bandai',
    category: 'Action Figures',
    price: 399.90,
    condition: 'Novo',
    art: 'figure',
    image: '/photos/af-003.jpg',
    imageAlt: 'Action figure do Son Goku (Dragon Ball)',
    note: 'Articulação premium, mãos e rostos intercambiáveis. Importado.',
  },
  {
    id: 'af-004',
    title: 'Iron Man Mark LXXXV — Hot Toys',
    maker: 'Hot Toys',
    category: 'Action Figures',
    price: 2499.90,
    condition: 'Novo',
    art: 'figure',
    image: '/photos/af-004.jpg',
    imageAlt: 'Action figure do Homem de Ferro',
    note: 'Escala 1:6 com LED. Edição limitada numerada, com certificado.',
    featured: true,
  },

  // ──────────────────────────────────────────────────────────────────
  //  RETRO GAMING
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'rg-001',
    title: 'Super Mario World — SNES (Cartucho)',
    maker: 'Nintendo',
    category: 'Retro Gaming',
    price: 199.90,
    condition: 'Usado',
    art: 'raygun',
    note: 'Cartucho original testado e funcionando. Etiqueta em bom estado.',
  },
  {
    id: 'rg-002',
    title: 'Mega Drive III — Console Completo',
    maker: 'Tectoy',
    category: 'Retro Gaming',
    price: 349.90,
    condition: 'Usado',
    art: 'raygun',
    image: '/photos/rg-002.jpg',
    imageAlt: 'Console Sega Mega Drive',
    note: 'Console com 2 controles, fonte e cabo AV. Testado e funcionando.',
  },
  {
    id: 'rg-003',
    title: 'Chrono Trigger — SNES (Cartucho)',
    maker: 'Square',
    category: 'Retro Gaming',
    price: 599.90,
    condition: 'Usado',
    art: 'raygun',
    note: 'RPG clássico. Cartucho original americano, bateria de save OK.',
    featured: true,
  },
  {
    id: 'rg-004',
    title: 'Game Boy Color — Edição Pokémon',
    maker: 'Nintendo',
    category: 'Retro Gaming',
    price: 449.90,
    condition: 'Seminovo',
    art: 'raygun',
    image: '/photos/rg-004.jpg',
    imageAlt: 'Game Boy Color edição Pikachu',
    note: 'Edição especial amarela Pikachu. Funcionando perfeitamente, sem caixa.',
  },

  // ──────────────────────────────────────────────────────────────────
  //  LIVROS DE COLEÇÃO
  // ──────────────────────────────────────────────────────────────────
  {
    id: 'lv-001',
    title: 'The Art of Marvel Studios',
    maker: 'Marvel / Abrams',
    category: 'Livros de Coleção',
    price: 289.90,
    condition: 'Novo',
    art: 'frame',
    note: 'Art book oficial do MCU. Capa dura, 320 páginas de concept art.',
  },
  {
    id: 'lv-002',
    title: 'Enciclopédia DC Comics',
    maker: 'DK Publishing',
    category: 'Livros de Coleção',
    price: 199.90,
    condition: 'Novo',
    art: 'frame',
    note: 'Guia definitivo do universo DC. Mais de 400 personagens catalogados.',
  },
  {
    id: 'lv-003',
    title: 'The Legend of Zelda — Hyrule Historia',
    maker: 'Dark Horse',
    category: 'Livros de Coleção',
    price: 159.90,
    condition: 'Seminovo',
    art: 'frame',
    image: '/photos/lv-003.jpg',
    imageAlt: 'Livro The Legend of Zelda: Hyrule Historia',
    note: 'Enciclopédia oficial da franquia Zelda. Arte conceitual e timeline.',
  },
  {
    id: 'lv-004',
    title: 'Super Mario Bros. — Enciclopédia',
    maker: 'Dark Horse',
    category: 'Livros de Coleção',
    price: 139.90,
    condition: 'Novo',
    art: 'frame',
    note: 'Guia completo de 30 anos de Mario. Todos os jogos detalhados.',
  },
];

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
