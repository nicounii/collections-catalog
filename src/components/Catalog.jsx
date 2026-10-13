import { useEffect, useMemo, useRef, useState } from 'react';
import { products, CATEGORIES } from '../data/products.js';
import ProductCard from './ProductCard.jsx';
import { Reveal } from './Reveal.jsx';
import { Icon, stroke } from './icons.jsx';
import { paginate } from '../lib/paginate.js';

const SORTS = [
  { id: 'curated', label: 'Curadoria' },
  { id: 'price-asc', label: 'Preço · menor para maior' },
  { id: 'price-desc', label: 'Preço · maior para menor' },
  { id: 'oldest', label: 'Mais antigos primeiro' },
];

const PAGE_SIZE = 24;

export default function Catalog() {
  const [category, setCategory] = useState('Todos');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('curated');
  const [page, setPage] = useState(1);
  const resultsRef = useRef(null);

  // Any change to the result set sends the user back to page 1.
  useEffect(() => {
    setPage(1);
  }, [category, query, sort]);

  const goToPage = (next) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const inCat = category === 'Todos' || p.category === category;
      const inQuery =
        !q ||
        [p.title, p.maker, p.category, p.note]
          .join(' ')
          .toLowerCase()
          .includes(q);
      return inCat && inQuery;
    });

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'oldest') list = [...list].sort((a, b) => (Date.parse(a.added) || 0) - (Date.parse(b.added) || 0));
    return list;
  }, [category, query, sort]);

  const { items: pageItems, totalPages, page: currentPage } = paginate(filtered, page, PAGE_SIZE);

  return (
    <section id="catalogo" className="relative bg-parchment text-ink grain">
      <div className="relative mx-auto max-w-[1280px] px-6 py-20 lg:py-24">
        {/* header */}
        <div id="categorias" className="flex flex-wrap items-end justify-between gap-6 border-b border-hair-light pb-8">
          <div>
            <Reveal>
              <span className="eyebrow text-mute-light">Catálogo completo</span>
              <h2 className="display-lg mt-4 max-w-[18ch] text-ink">
                Todos os produtos, curados com cuidado.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <p className="max-w-[44ch] text-[0.92rem] leading-relaxed text-body-light">
              Cada produto é verificado e descrito com detalhes. Preços são finais; frete calculado na finalização.
            </p>
          </Reveal>
        </div>

        {/* controls */}
        <div className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* search */}
            <label className="relative block w-full lg:max-w-md">
              <span className="sr-only">Buscar no catálogo</span>
              <Icon.Search
                className="pointer-events-none absolute left-4 top-1/2 h-[1.2rem] w-[1.2rem] -translate-y-1/2 text-mute-light"
                {...stroke}
              />
              <input
                id="lot-search"
                type="search"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por título, editora ou categoria…"
                className="h-[52px] w-full rounded-full border border-hair-light bg-white pl-11 pr-4 text-[1rem] text-ink placeholder:text-mute-light focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              />
            </label>

            {/* sort */}
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-mute-light">
                Ordenar
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-[42px] rounded-full border border-hair-light bg-white px-4 text-[0.88rem] text-ink focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* category chips */}
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                aria-label={`Filtrar por categoria ${c}`}
                onClick={() => setCategory(c)}
                className="chip"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* results meta */}
        <div ref={resultsRef} className="mt-7 flex items-center justify-between scroll-mt-24">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mute-light">
            {totalPages > 1
              ? `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(
                  currentPage * PAGE_SIZE,
                  filtered.length,
                )} de ${filtered.length}`
              : `${filtered.length} ${filtered.length === 1 ? 'produto' : 'produtos'}`}
            {category !== 'Todos' ? ` · ${category}` : ''}
          </p>
          {(query || category !== 'Todos' || sort !== 'curated') && (
            <button
              aria-label="Limpar filtros"
              onClick={() => {
                setQuery('');
                setCategory('Todos');
                setSort('curated');
              }}
              className="text-[0.85rem] font-medium text-link-light underline"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* product grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i * 60, 400)}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        {/* pagination */}
        {totalPages > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-4"
            aria-label="Paginação do catálogo"
          >
            <button
              type="button"
              aria-label="Página anterior"
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="btn btn-outline-light btn-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-mute-light">
              Página {currentPage} de {totalPages}
            </span>
            <button
              type="button"
              aria-label="Próxima página"
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="btn btn-outline-light btn-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Próxima
            </button>
          </nav>
        )}

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-display text-xl text-mute-light">Nenhum produto encontrado.</p>
            <p className="mt-2 text-[0.92rem] text-body-light">Tente uma busca diferente ou limpe os filtros.</p>
          </div>
        )}
      </div>
    </section>
  );
}
