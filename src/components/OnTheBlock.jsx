import { Reveal } from './Reveal.jsx';
import { Icon, stroke } from './icons.jsx';
import { Backdrop } from './Plate.jsx';
import { useCountdown, pad } from '../hooks/useCountdown.js';

const CLOSE = new Date('2026-10-18T18:00:00Z').getTime();

export default function OnTheBlock() {
  const { days, hours, minutes, seconds } = useCountdown(CLOSE);
  const cells = [
    { v: days, l: 'Dias' },
    { v: hours, l: 'Horas' },
    { v: minutes, l: 'Minutos' },
    { v: seconds, l: 'Segundos' },
  ];

  return (
    <section className="relative overflow-hidden grain" style={{ background: 'linear-gradient(180deg, #16161b 0%, #0a0a0c 100%)' }}>
      <div className="pointer-events-none absolute inset-0 vignette opacity-60" />
      <div className="pointer-events-none absolute inset-0 text-on-dark opacity-[0.13]">
        <Backdrop art="badge" />
      </div>
      <div className="relative mx-auto max-w-[1280px] px-6 py-20 text-center lg:py-28">
        <Reveal>
          <span className="eyebrow text-accent-light">Oferta especial</span>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="display-lg mx-auto mt-5 max-w-[18ch] text-on-dark">
            Promoção termina domingo às 18h.
          </h2>
        </Reveal>
        <Reveal delay={170}>
          <p className="mx-auto mt-5 max-w-[48ch] text-body-dark">
            Cadastre-se para receber alertas de novidades e promoções exclusivas. Não perca as
            melhores ofertas da semana.
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="mx-auto mt-10 flex max-w-2xl items-stretch justify-center gap-3">
            {cells.map((c) => (
              <div
                key={c.l}
                className="flex-1 rounded-card border border-hair-dark bg-ink/50 px-2 py-4 sm:px-5"
              >
                <span className="block font-display text-3xl font-[400] tabular-nums text-accent-light sm:text-5xl">
                  {pad(c.v)}
                </span>
                <span className="mt-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-on-dark-mute">
                  {c.l}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={330}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <a href="#top" className="btn btn-primary">
              <Icon.Heart className="h-[1.1rem] w-[1.1rem]" {...stroke} />
              Cadastrar-se
            </a>
            <a href="#sobre" className="btn btn-outline-dark">
              Saiba mais
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
