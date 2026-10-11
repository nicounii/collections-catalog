import { ProductMedia } from './ProductMedia.jsx';
import { Reveal } from './Reveal.jsx';
import { Icon, stroke } from './icons.jsx';
import { useCart } from '../context/CartContext.jsx';
import { brl } from '../lib/format.js';
import { products } from '../data/products.js';

export default function Vault() {
  const { add } = useCart();
  const lot = products.find((p) => p.featured) || products[0];

  return (
    <section id="vitrine" className="relative overflow-hidden bg-ink grain">
      <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg,#0a0a0c,#101014)' }} />
      <div className="relative mx-auto max-w-[1280px] px-6 py-20 lg:py-24">
        <Reveal>
          <div className="overflow-hidden rounded-card bg-ink-elev ring-1 ring-hair-dark">
            {/* the reserved accent gradient — used here only */}
            <div className="accent-rule h-[5px] w-full" />

            <div className="grid items-stretch gap-0 md:grid-cols-2">
              {/* copy */}
              <div className="order-2 flex flex-col justify-center p-8 md:order-1 md:p-12 lg:p-14">
                <span className="eyebrow accent-text">Vitrine · Produto em destaque</span>
                <h2 className="display-md mt-5 max-w-[16ch] text-on-dark">
                  {lot.title}
                </h2>
                <p className="mt-5 max-w-[44ch] text-body-dark">
                  {lot.note}
                </p>

                <div className="mt-7 flex flex-wrap gap-x-10 gap-y-4 border-y border-hair-dark py-5">
                  <div>
                    <span className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-on-dark-mute">
                      Preço
                    </span>
                    <span className="font-display text-2xl font-[400] tabular-nums text-accent-light">
                      {brl(lot.price)}
                    </span>
                  </div>
                  <div>
                    <span className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-on-dark-mute">
                      Estado
                    </span>
                    <span className="font-display text-2xl font-[400] text-on-dark">{lot.condition}</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-on-dark-mute">
                      Fabricante
                    </span>
                    <span className="font-display text-2xl font-[400] text-on-dark">{lot.maker}</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <a href="#catalogo" className="btn btn-primary">
                    Ver no catálogo
                    <Icon.Arrow className="h-[1.1rem] w-[1.1rem]" {...stroke} />
                  </a>
                  <button onClick={() => add(lot.id)} className="btn btn-commerce">
                    <Icon.Bag className="h-[1.1rem] w-[1.1rem]" {...stroke} />
                    Adicionar
                  </button>
                </div>
              </div>

              {/* art */}
              <div className="order-1 p-5 md:order-2 md:p-8">
                <ProductMedia
                  product={lot}
                  variant="dark"
                  ratio="aspect-[4/5] md:aspect-auto md:h-full"
                  className="rounded-card ring-1 ring-hair-dark"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
