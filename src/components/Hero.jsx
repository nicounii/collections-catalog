import { Plate } from './Plate.jsx';
import { Reveal } from './Reveal.jsx';
import { Icon, stroke } from './icons.jsx';

const STATS = [
  { n: '33+', l: 'Produtos no catálogo' },
  { n: '7', l: 'Categorias' },
  { n: '2024', l: 'Desde' },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink grain">
      {/* soft chapter gradient into the page */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, #101014 0%, #0a0a0c 60%)' }} />
      <div className="pointer-events-none absolute inset-0 vignette opacity-70" />

      <div className="relative mx-auto max-w-[1280px] px-6 pb-20 pt-16 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* copy column */}
          <div className="lg:col-span-6">
            <Reveal delay={0}>
              <span className="eyebrow text-accent-light">Quadrinhos · Action Figures · Retro Gaming</span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="display-xl mt-6 max-w-[15ch] text-on-dark">
                Onde os heróis mais raros trocam de mãos.
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="lede mt-7 max-w-[46ch] text-body-dark">
                HQs clássicas, action figures colecionáveis, cartuchos retro e livros de arte — tudo
                curado, verificado e pronto para a sua coleção.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <a href="#catalogo" className="btn btn-primary">
                  <Icon.Bag className="h-[1.1rem] w-[1.1rem]" {...stroke} />
                  Ver catálogo
                </a>
                <a href="#sobre" className="btn btn-outline-dark">
                  Sobre nós
                </a>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <dl className="mt-10 flex gap-9 border-t border-hair-dark pt-7">
                {STATS.map((s) => (
                  <div key={s.l}>
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-on-dark-mute">
                      {s.l}
                    </dt>
                    <dd className="mt-1 font-display text-3xl font-[400] text-on-dark">{s.n}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* plate column */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none">
            <Reveal delay={200}>
              <Plate art="mask" variant="dark" lot="Destaque" ratio="aspect-[4/5]" className="rounded-card shadow-plate" />
              {/* floating lot caption */}
              <div className="absolute -bottom-5 -left-5 w-[15rem] rounded-[8px] border border-hair-dark bg-ink-elev p-4 shadow-lift">
                <span className="font-mono text-[0.62rem] tracking-[0.2em] text-accent/80">EM DESTAQUE</span>
                <p className="mt-1.5 font-display text-lg font-[380] leading-tight text-on-dark">
                  Colecionáveis Premium
                </p>
                <p className="mt-1 text-[0.8rem] text-on-dark-mute">Curadoria exclusiva</p>
              </div>

              {/* rotated seal */}
              <div
                className="absolute -right-4 bottom-16 hidden rotate-[8deg] rounded-full border px-4 py-3 text-center sm:block"
                style={{ borderColor: 'rgba(230,36,41,0.6)', background: 'rgba(10,10,12,0.72)' }}
              >
                <span className="block font-mono text-[0.56rem] tracking-[0.2em] text-accent-light">
                  AUTENTICADO &amp;
                </span>
                <span className="block font-mono text-[0.56rem] tracking-[0.2em] text-accent-light">
                  VERIFICADO
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
