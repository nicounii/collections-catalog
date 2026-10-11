import { ProductMedia } from './ProductMedia.jsx';
import { Icon, stroke } from './icons.jsx';
import { brl } from '../lib/format.js';
import { waLink, WHATSAPP_PHONE } from '../lib/whatsapp.js';
import { useCart } from '../context/CartContext.jsx';

const CONDITION_STYLE = {
  Novo: { bg: 'rgba(16,185,129,0.14)', fg: '#0f9d6f', dot: '#10b981' },
  Seminovo: { bg: 'rgba(245,158,11,0.16)', fg: '#b45309', dot: '#f59e0b' },
  Usado: { bg: 'rgba(10,10,12,0.06)', fg: '#4a4a52', dot: '#8a8a92' },
  Restaurado: { bg: 'rgba(230,36,41,0.14)', fg: '#c1121f', dot: '#e62429' },
  // fallback for English terms during migration
  Excellent: { bg: 'rgba(16,185,129,0.14)', fg: '#0f9d6f', dot: '#10b981' },
  Good: { bg: 'rgba(10,10,12,0.06)', fg: '#4a4a52', dot: '#8a8a92' },
  Fair: { bg: 'rgba(245,158,11,0.16)', fg: '#b45309', dot: '#f59e0b' },
  Restored: { bg: 'rgba(230,36,41,0.14)', fg: '#c1121f', dot: '#e62429' },
};

export default function ProductCard({ product }) {
  const { add } = useCart();
  const cs = CONDITION_STYLE[product.condition] || CONDITION_STYLE.Novo;

  return (
    <article className="group/card tile flex flex-col overflow-hidden rounded-card border border-hair-light bg-card transition-colors duration-300 hover:border-accent">
      <div className="relative overflow-hidden">
        <div className="tile-media transition-transform duration-500 ease-fluid group-hover/card:scale-[1.035]">
          <ProductMedia product={product} ratio="aspect-[4/5]" />
        </div>

        <span
          className="badge absolute left-3 top-3 backdrop-blur-sm"
          style={{ background: cs.bg, color: cs.fg, border: `1px solid ${cs.dot}40` }}
        >
          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: cs.dot }} />
          {product.condition}
        </span>

        {product.featured && (
          <span className="badge absolute right-3 top-3" style={{ background: 'var(--color-accent)', color: 'var(--color-ink)' }}>
            Destaque
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between font-mono text-[0.66rem] tracking-[0.16em] text-mute-light">
          <span>{product.category?.toUpperCase()}</span>
          <span>{product.maker?.toUpperCase()}</span>
        </div>

        <h3 className="mt-2.5 font-display text-[1.32rem] font-[380] leading-tight text-ink">
          {product.title}
        </h3>

        <p className="mt-3 line-clamp-2 flex-1 text-[0.9rem] leading-relaxed text-body-light">
          {product.note}
        </p>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <span className="block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mute-light">
              Preço
            </span>
            <span className="font-display text-[1.5rem] font-[400] tabular-nums text-ink">
              {brl(product.price)}
            </span>
          </div>
          <div className="flex flex-col items-stretch gap-2">
            {product.mpLink ? (
              <a
                href={product.mpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-commerce btn-sm"
                aria-label={`Comprar ${product.title} no Mercado Pago`}
              >
                <Icon.Bag className="h-4 w-4" {...stroke} strokeWidth={2.4} />
                Comprar
              </a>
            ) : (
              <button
                onClick={() => add(product.id)}
                className="btn btn-commerce btn-sm"
                aria-label={`Adicionar ${product.title} ao carrinho`}
              >
                <Icon.Plus className="h-4 w-4" {...stroke} strokeWidth={2.4} />
                Adicionar
              </button>
            )}
            <a
              href={waLink({
                phone: WHATSAPP_PHONE,
                text: `Tenho interesse em: ${product.title} (${window.location.href})`,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
              aria-label={`Negociar ${product.title} pelo WhatsApp`}
            >
              Negociar
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
