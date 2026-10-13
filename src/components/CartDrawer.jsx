import { useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Icon, stroke } from './icons.jsx';
import { brl } from '../lib/format.js';
import { waLink, WHATSAPP_PHONE } from '../lib/whatsapp.js';
import { products } from '../data/products.js';
import { ProductMedia } from './ProductMedia.jsx';

const byId = (id) => products.find((p) => p.id === id);

export default function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, subtotal, count, clear } = useCart();

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, setOpen]);

  return (
    <>
      {/* scrim */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-ink/60 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-[27rem] flex-col bg-parchment text-ink shadow-lift transition-transform duration-[400ms] ease-fluid overscroll-contain ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho"
      >
        <header className="flex items-center justify-between border-b border-hair-light px-6 py-5">
          <div>
            <span className="eyebrow text-mute-light">Seu carrinho</span>
            <p className="mt-1 font-display text-xl font-[380]">
              {count} {count === 1 ? 'item' : 'itens'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5"
            aria-label="Fechar carrinho"
          >
            <Icon.Close className="h-5 w-5" {...stroke} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span
              className="grid h-16 w-16 place-items-center rounded-full"
              style={{ background: 'rgba(10,10,12,0.06)' }}
            >
              <Icon.Bag className="h-7 w-7 text-mute-light" {...stroke} />
            </span>
            <p className="font-display text-xl text-ink">Carrinho vazio.</p>
            <p className="max-w-xs text-[0.92rem] text-body-light">
              Adicione produtos ao carrinho para continuar.
            </p>
            <button type="button" onClick={() => setOpen(false)} className="btn btn-outline-light mt-2">
              Explorar catálogo
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="space-y-5">
                {lines.map((line) => {
                  const p = byId(line.id);
                  if (!p) return null;
                  return (
                    <li key={line.id} className="flex gap-4">
                      <div className="w-20 shrink-0 overflow-hidden rounded-[6px] ring-1 ring-hair-light">
                        <ProductMedia product={p} ratio="aspect-[4/5]" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <span className="font-mono text-[0.6rem] tracking-[0.16em] text-mute-light">
                              {p.category?.toUpperCase()}
                            </span>
                            <h3 className="truncate font-display text-[1.05rem] font-[380] leading-tight">
                              {p.title}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(line.id)}
                            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-mute-light transition-colors hover:text-warning"
                            aria-label={`Remover ${p.title}`}
                          >
                            <Icon.Close className="h-4 w-4" {...stroke} />
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="inline-flex items-center rounded-full border border-hair-light bg-white">
                            <button
                              type="button"
                              onClick={() => setQty(line.id, line.qty - 1)}
                              className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-ink/5"
                              aria-label="Diminuir quantidade"
                            >
                              <Icon.Minus className="h-4 w-4" {...stroke} />
                            </button>
                            <span className="w-7 text-center font-mono text-[0.9rem] tabular-nums">{line.qty}</span>
                            <button
                              type="button"
                              onClick={() => setQty(line.id, line.qty + 1)}
                              className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-ink/5"
                              aria-label="Aumentar quantidade"
                            >
                              <Icon.Plus className="h-4 w-4" {...stroke} />
                            </button>
                          </div>
                          <span className="font-mono text-[0.95rem] font-semibold tabular-nums">
                            {brl(p.price * line.qty)}
                          </span>
                        </div>

                        {p.mpLink && (
                          <a
                            href={p.mpLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 py-2 text-[0.8rem] font-semibold text-accent hover:underline"
                            aria-label={`Comprar ${p.title} no Mercado Pago`}
                          >
                            <Icon.Bag className="h-3.5 w-3.5" {...stroke} strokeWidth={2.2} />
                            Comprar no Mercado Pago
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={clear}
                className="mt-6 text-[0.82rem] font-medium text-mute-light underline decoration-hair-light underline-offset-4 hover:text-ink"
              >
                Limpar carrinho
              </button>
            </div>

            <footer className="border-t border-hair-light bg-parchment-soft px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-mute-light">Total</span>
                <span className="font-display text-2xl font-[400] tabular-nums">{brl(subtotal)}</span>
              </div>
              <p className="mt-2 text-[0.8rem] text-mute-light">
                Cada item é único — finalize a compra pelo link do item ou negocie pelo WhatsApp.
              </p>
              <a
                href={waLink({
                  phone: WHATSAPP_PHONE,
                  text: `Tenho interesse em: ${lines
                    .map((l) => l.product.title)
                    .join(', ')} (total ${brl(subtotal)}) — ${window.location.href}`,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-commerce mt-5 w-full justify-center"
              >
                <Icon.Bag className="h-[1.1rem] w-[1.1rem]" {...stroke} />
                Negociar pelo WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 text-center text-[0.85rem] font-medium text-mute-light underline decoration-hair-light underline-offset-4 hover:text-ink"
              >
                Continuar comprando
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
