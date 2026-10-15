import { ProductMedia } from '../components/ProductMedia.jsx';
import { Icon, stroke } from '../components/icons.jsx';
import { brl } from '../lib/format.js';
import { waLink, WHATSAPP_PHONE } from '../lib/whatsapp.js';
import { useCart } from '../context/CartContext.jsx';
import { getBySlug } from '../data/products.js';

const CONDITION_STYLE = {
  Novo: { bg: 'rgba(16,185,129,0.14)', fg: '#0f9d6f', dot: '#10b981' },
  Seminovo: { bg: 'rgba(245,158,11,0.16)', fg: '#b45309', dot: '#f59e0b' },
  Usado: { bg: 'rgba(10,10,12,0.06)', fg: '#4a4a52', dot: '#8a8a92' },
  Restaurado: { bg: 'rgba(230,36,41,0.14)', fg: '#c1121f', dot: '#e62429' },
  Excellent: { bg: 'rgba(16,185,129,0.14)', fg: '#0f9d6f', dot: '#10b981' },
  Good: { bg: 'rgba(10,10,12,0.06)', fg: '#4a4a52', dot: '#8a8a92' },
  Fair: { bg: 'rgba(245,158,11,0.16)', fg: '#b45309', dot: '#f59e0b' },
  Restored: { bg: 'rgba(230,36,41,0.14)', fg: '#c1121f', dot: '#e62429' },
};

export default function ProductPage({ slug }) {
  const { add } = useCart();
  const product = getBySlug(slug);

  if (!product) {
    return (
      <main className="relative min-h-screen bg-ink-deep text-on-dark px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-on-dark-mute transition-colors hover:text-accent-light"
          >
            <Icon.Arrow className="h-4 w-4 rotate-180" {...stroke} />
            Voltar ao catálogo
          </a>
          <h1 className="mt-8 font-display text-3xl text-on-dark font-[380]">Produto não encontrado</h1>
          <p className="mt-4 text-on-dark-mute">O item que você procura não está disponível ou foi removido do acervo.</p>
          <div className="mt-8">
            <a href="/" className="btn btn-primary inline-flex items-center gap-2">
              Ir para o início
            </a>
          </div>
        </div>
      </main>
    );
  }

  const cs = CONDITION_STYLE[product.condition] || CONDITION_STYLE.Novo;

  return (
    <main className="relative min-h-screen bg-ink-deep text-on-dark">
      <div className="mx-auto max-w-5xl px-6 py-12 lg:py-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-on-dark-mute transition-colors hover:text-accent-light"
        >
          <Icon.Arrow className="h-4 w-4 rotate-180" {...stroke} />
          ← Voltar ao catálogo
        </a>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-card border border-hair bg-card relative">
            <ProductMedia product={product} ratio="aspect-[4/5]" />
            <span
              className="badge absolute left-4 top-4 backdrop-blur-sm"
              style={{ background: cs.bg, color: cs.fg, border: `1px solid ${cs.dot}40` }}
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{ background: cs.dot }} />
              {product.condition}
            </span>
            {product.featured && (
              <span className="badge absolute right-4 top-4" style={{ background: 'var(--color-accent)', color: 'var(--color-ink)' }}>
                Destaque
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between font-mono text-[0.7rem] tracking-[0.18em] text-on-dark-mute">
              <span>{product.category?.toUpperCase()}</span>
              <span>{product.maker?.toUpperCase()}</span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-[380] leading-tight text-on-dark sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-6">
              <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-on-dark-mute">
                Preço
              </span>
              <span className="font-display text-3xl font-[400] tabular-nums text-on-dark">
                {brl(product.price)}
              </span>
            </div>

            {product.note && (
              <div className="mt-8 border-t border-hair pt-6">
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-on-dark-mute">Detalhes / Nota</h2>
                <p className="mt-3 text-[1rem] leading-relaxed text-on-dark-mute">
                  {product.note}
                </p>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              {product.mpLink ? (
                <a
                  href={product.mpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-commerce flex-1 justify-center py-3 text-base"
                  aria-label={`Comprar ${product.title} no Mercado Pago`}
                >
                  <Icon.Bag className="h-5 w-5" {...stroke} strokeWidth={2.4} />
                  Comprar
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => add(product.id)}
                  className="btn btn-commerce flex-1 justify-center py-3 text-base"
                  aria-label={`Adicionar ${product.title} ao carrinho`}
                >
                  <Icon.Plus className="h-5 w-5" {...stroke} strokeWidth={2.4} />
                  Adicionar ao carrinho
                </button>
              )}
              <a
                href={waLink({
                  phone: WHATSAPP_PHONE,
                  text: `Tenho interesse em: ${product.title} (${window.location.href})`,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light flex-1 justify-center py-3 text-base"
                aria-label={`Negociar ${product.title} pelo WhatsApp`}
              >
                Negociar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
