import { useEffect, useState } from 'react';
import { Icon, stroke } from './icons.jsx';
import { useCart } from '../context/CartContext.jsx';
import { NAV_LINKS, SUB_NAV } from '../data/products.js';

function Monogram({ className = 'h-full w-full' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <ellipse cx="24" cy="24" rx="22" ry="23" fill="none" stroke="var(--color-accent)" strokeWidth="1.4" />
      <ellipse cx="24" cy="24" rx="18" ry="19" fill="none" stroke="var(--color-accent)" strokeWidth="0.7" opacity="0.6" />
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontSize="15"
        fontWeight="500"
        fill="var(--color-accent-light)"
        letterSpacing="-0.5"
      >
        A&amp;V
      </text>
    </svg>
  );
}

const NAV_MAP = {
  'Catálogo': '#catalogo',
  'Categorias': '#categorias',
  'Vitrine': '#vitrine',
  'Blog': '#blog',
  'Sobre': '#sobre',
};

export default function Nav() {
  const { count, setOpen, pulse } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobile]);

  const focusSearch = () => {
    setMobile(false);
    document.getElementById('lot-search')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => document.getElementById('lot-search')?.focus(), 500);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-hair-dark bg-ink/95 backdrop-blur-md' : 'border-transparent bg-ink'
      }`}
    >
      <nav className="mx-auto flex h-[74px] max-w-[1280px] items-center justify-between gap-4 px-6">
        {/* left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobile(true)}
            className="grid h-11 w-11 place-items-center rounded-full text-on-dark hover:bg-white/5 lg:hidden"
            aria-label="Abrir menu"
          >
            <Icon.Menu className="h-6 w-6" {...stroke} />
          </button>
          <a href="#top" className="flex items-center gap-3">
            <span className="h-11 w-11 shrink-0">
              <Monogram />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[1.28rem] font-[400] tracking-[0.01em] text-on-dark">
                ASHBY <span className="text-accent">&amp;</span> VANE
              </span>
              <span className="mt-0.5 block font-mono text-[0.6rem] tracking-[0.3em] text-on-dark-mute">
                QUADRINHOS & COLECIONÁVEIS
              </span>
            </span>
          </a>
        </div>

        {/* center links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href={NAV_MAP[l] || '#top'}
                className="relative text-[0.98rem] font-medium text-on-dark/85 transition-colors hover:text-accent-light"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* right cluster */}
        <div className="flex items-center gap-1">
          <button
            onClick={focusSearch}
            className="grid h-11 w-11 place-items-center rounded-full text-on-dark hover:bg-white/5"
            aria-label="Buscar no catálogo"
          >
            <Icon.Search className="h-[1.35rem] w-[1.35rem]" {...stroke} />
          </button>
          <button
            className="hidden h-11 w-11 place-items-center rounded-full text-on-dark hover:bg-white/5 sm:grid"
            aria-label="Favoritos"
          >
            <Icon.Heart className="h-[1.35rem] w-[1.35rem]" {...stroke} />
          </button>
          <button
            onClick={() => setOpen(true)}
            className="relative flex h-11 items-center gap-2 rounded-full pl-3 pr-4 text-on-dark hover:bg-white/5"
            aria-label={`Carrinho, ${count} itens`}
          >
            <span key={pulse} className={pulse ? 'pop' : ''}>
              <Icon.Bag className="h-[1.4rem] w-[1.4rem]" {...stroke} />
            </span>
            <span className="min-w-[1.2rem] text-left font-mono text-[0.82rem] font-semibold tabular-nums">
              {count}
            </span>
          </button>
        </div>
      </nav>

      {/* sub-nav strip */}
      <div className="hidden border-t border-hair-dark/70 md:block">
        <div className="mx-auto flex max-w-[1280px] items-center gap-7 overflow-x-auto px-6 py-2.5 no-bar">
          <span className="shrink-0 font-mono text-[0.66rem] tracking-[0.22em] text-accent/80">SEÇÕES</span>
          {SUB_NAV.map((s) => (
            <a
              key={s}
              href="#catalogo"
              className="shrink-0 text-[0.82rem] text-on-dark-mute transition-colors hover:text-on-dark"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* mobile drawer */}
      {mobile && (
        <>
          <div className="fixed inset-0 top-[74px] z-40 bg-black/60 fade-in" onClick={() => setMobile(false)} />
          <div className="fixed left-0 top-[74px] z-50 h-[calc(100dvh-74px)] w-[88%] max-w-sm border-r border-hair-dark bg-ink-deep drawer-in">
            <div className="flex h-full flex-col p-6">
              <span className="eyebrow mb-5 text-accent/80">Ashby & Vane</span>
              <ul className="space-y-1">
                {NAV_LINKS.map((l) => (
                  <li key={l}>
                    <a
                      onClick={() => setMobile(false)}
                      href={NAV_MAP[l] || '#top'}
                      className="block border-b border-hair-dark py-4 font-display text-2xl font-[350] text-on-dark"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <span className="eyebrow text-on-dark-mute">Categorias</span>
                <div className="mt-4 flex flex-wrap gap-2">
                  {SUB_NAV.map((s) => (
                    <a
                      key={s}
                      onClick={() => setMobile(false)}
                      href="#catalogo"
                      className="rounded-full border border-hair-dark px-4 py-2 text-sm text-on-dark/85"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
              <a href="#vitrine" onClick={() => setMobile(false)} className="btn btn-primary mt-auto w-full">
                Ver vitrine
                <Icon.Arrow className="h-4 w-4" {...stroke} />
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
