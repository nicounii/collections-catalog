import { useCountdown, pad } from '../hooks/useCountdown.js';

const CLOSE = new Date('2026-10-18T18:00:00Z').getTime();

const MESSAGES = [
  'Acervo de um único dono · peças únicas',
  'Produtos autenticados e verificados',
  'Entrega para todo o Brasil',
  'Parcele em até 3× sem juros acima de R$150',
];

export default function Announcement() {
  const { days, hours, minutes, seconds } = useCountdown(CLOSE);

  return (
    <div className="relative z-40 border-b border-hair-dark bg-ink-deep">
      <div className="mx-auto flex max-w-[1280px] items-center gap-5 px-6 py-2.5">
        <span className="hidden shrink-0 items-center gap-2 sm:flex">
          <span className="badge" style={{ background: 'var(--color-accent)', color: 'var(--color-ink)' }}>
            Novidades
          </span>
        </span>

        {/* marquee de mensagens */}
        <div className="relative flex-1 overflow-hidden" aria-hidden="true">
          <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
            {[...MESSAGES, ...MESSAGES].map((m, i) => (
              <span key={i} className="font-mono text-[0.72rem] tracking-[0.14em] text-on-dark-mute">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <span className="hidden font-mono text-[0.68rem] tracking-[0.18em] text-on-dark-mute md:inline">
            Oferta
          </span>
          <span className="font-mono text-[0.82rem] font-semibold tabular-nums tracking-wide text-accent-light">
            {pad(days)}d : {pad(hours)}h : {pad(minutes)}m : {pad(seconds)}s
          </span>
        </div>
      </div>
    </div>
  );
}
