import { useCallback, useEffect, useRef, useState } from 'react';
import { ProductMedia } from './ProductMedia.jsx';
import { Reveal } from './Reveal.jsx';
import { Icon, stroke } from './icons.jsx';
import { useCart } from '../context/CartContext.jsx';
import { brl } from '../lib/format.js';

/**
 * CategoryRail — trilho horizontal reutilizável por categoria.
 * Inspirado no layout do comix.com.br: seção com título + "Ver todos" + rail de cards.
 *
 * Props:
 *   items     — array de produtos
 *   eyebrow   — texto pequeno acima do título
 *   title     — título da seção
 *   variant   — 'dark' | 'light' (fundo escuro ou claro)
 */
export default function CategoryRail({ items, eyebrow, title, variant = 'dark' }) {
  const { add } = useCart();
  const railRef = useRef(null);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0);
  const dark = variant === 'dark';

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const p = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    setPages(p);
    setActive(Math.round((el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)) * (p - 1)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const nudge = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.86), behavior: 'smooth' });
  };

  if (!items || items.length === 0) return null;

  return (
    <section className={`relative overflow-hidden grain ${dark ? 'bg-ink' : 'bg-parchment'}`}>
      <div className="relative mx-auto max-w-[1280px] px-6 py-16 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <span className={`eyebrow ${dark ? 'text-accent/80' : 'text-mute-light'}`}>{eyebrow}</span>
            <h2 className={`display-lg mt-4 max-w-[20ch] ${dark ? 'text-on-dark' : 'text-ink'}`}>
              {title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => nudge(-1)}
                className={`grid h-12 w-12 place-items-center rounded-full transition-colors ${
                  dark ? 'text-on-dark hover:bg-white/10' : 'text-ink hover:bg-ink/5'
                }`}
                style={{ background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,12,0.06)' }}
                aria-label="Anterior"
              >
                <Icon.Chevron className="h-5 w-5 rotate-180" {...stroke} />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                className={`grid h-12 w-12 place-items-center rounded-full transition-colors ${
                  dark ? 'text-on-dark hover:bg-white/10' : 'text-ink hover:bg-ink/5'
                }`}
                style={{ background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,12,0.06)' }}
                aria-label="Próximo"
              >
                <Icon.Chevron className="h-5 w-5" {...stroke} />
              </button>
            </div>
          </Reveal>
        </div>

        <div
          ref={railRef}
          onScroll={measure}
          className="no-bar mt-9 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {items.map((p) => (
            <article
              key={p.id}
              className={`tile group/tile relative w-[78%] shrink-0 snap-start overflow-hidden rounded-card ring-1 transition-shadow hover:shadow-plate sm:w-[46%] lg:w-[calc((100%-3.75rem)/4)] ${
                dark ? 'ring-hair-dark' : 'ring-hair-light'
              }`}
            >
              <div className="tile-media transition-transform duration-500 ease-fluid group-hover/tile:scale-[1.04]">
                <ProductMedia product={p} variant={dark ? 'dark' : 'light'} ratio="aspect-[4/5]" />
              </div>

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: dark
                    ? 'linear-gradient(180deg, rgba(10,10,12,0) 38%, rgba(10,10,12,0.88) 100%)'
                    : 'linear-gradient(180deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.92) 100%)',
                }}
              />

              <button
                type="button"
                aria-label={`Adicionar ${p.title} ao carrinho`}
                onClick={() => add(p.id)}
                className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full transition-colors ${
                  dark ? 'text-on-dark hover:bg-white/20' : 'text-ink hover:bg-ink/10'
                }`}
                style={{ background: dark ? 'rgba(10,10,12,0.55)' : 'rgba(255,255,255,0.75)' }}
              >
                <Icon.Plus className="h-4 w-4" {...stroke} strokeWidth={2.4} />
              </button>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className={`font-mono text-[0.62rem] tracking-[0.18em] ${dark ? 'text-accent-light' : 'text-accent'}`}>
                  {p.condition?.toUpperCase()}
                </span>
                <h3 className={`mt-1 font-display text-[1.28rem] font-[380] leading-tight ${dark ? 'text-on-dark' : 'text-ink'}`}>
                  {p.title}
                </h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className={`text-[0.82rem] ${dark ? 'text-on-dark-mute' : 'text-body-light'}`}>{p.maker}</span>
                  <span className={`font-mono text-[0.86rem] font-semibold tabular-nums ${dark ? 'text-on-dark' : 'text-ink'}`}>
                    {brl(p.price)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* paginação */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => {
                const el = railRef.current;
                if (!el) return;
                el.scrollTo({ left: (i / Math.max(1, pages - 1)) * (el.scrollWidth - el.clientWidth), behavior: 'smooth' });
              }}
              aria-label={`Página ${i + 1}`}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === active ? 26 : 8,
                background: i === active ? 'var(--color-accent)' : dark ? 'rgba(245,245,247,0.25)' : 'rgba(10,10,12,0.18)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
