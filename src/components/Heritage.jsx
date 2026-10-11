import { Reveal } from './Reveal.jsx';
import { Icon, stroke } from './icons.jsx';
import { Backdrop } from './Plate.jsx';

const FEATURES = [
  {
    icon: Icon.Shield,
    title: 'Produtos verificados',
    body: 'Cada item é inspecionado: autenticidade, estado de conservação e procedência.',
  },
  {
    icon: Icon.Scale,
    title: 'Descrição honesta',
    body: 'Detalhamos o estado real do produto sem rodeios. Você sabe exatamente o que está comprando.',
  },
  {
    icon: Icon.Truck,
    title: 'Entrega segura',
    body: 'Embalagem reforçada e envio com seguro para todo o Brasil.',
  },
];

export default function Heritage() {
  return (
    <section id="sobre" className="relative bg-parchment text-ink grain">
      <div className="pointer-events-none absolute inset-0 text-ink opacity-[0.05]">
        <Backdrop art="shield" />
      </div>
      <div className="relative mx-auto max-w-[1280px] px-6 py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal className="lg:col-span-5">
            <span className="eyebrow text-mute-light">Sobre nós</span>
            <h2 className="display-lg mt-4 max-w-[16ch] text-ink">
              Curadoria de verdade para colecionadores de verdade.
            </h2>
            <p className="lede mt-6 max-w-[44ch] text-body-light">
              A ASHBY &amp; VANE nasceu da paixão por quadrinhos, games e colecionáveis. Selecionamos
              cada produto a dedo — de HQs raras a action figures lacradas — para que sua coleção
              tenha só o melhor.
            </p>
            <p className="mt-5 max-w-[44ch] text-body-light">
              Desde edições de luxo até cartuchos retro, tratamos cada item com o mesmo cuidado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a href="#catalogo" className="btn btn-outline-light">
                Ver catálogo
                <Icon.Arrow className="h-[1.1rem] w-[1.1rem]" {...stroke} />
              </a>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-3">
              {FEATURES.map((f, i) => {
                const I = f.icon;
                return (
                  <Reveal key={f.title} delay={i * 110} className="h-full">
                    <div className="flex h-full flex-col rounded-card bg-white p-7 ring-1 ring-hair-light">
                      <span
                        className="grid h-12 w-12 place-items-center rounded-full"
                        style={{ background: 'rgba(230,36,41,0.10)', color: 'var(--color-primary)' }}
                      >
                        <I className="h-6 w-6" {...stroke} />
                      </span>
                      <h3 className="mt-5 font-display text-[1.28rem] font-[380] text-ink">{f.title}</h3>
                      <p className="mt-2.5 text-[0.92rem] leading-relaxed text-body-light">{f.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
