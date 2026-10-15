import { Icon, stroke } from './icons.jsx';
import { SITE } from '../lib/site.js';

const COLUMNS = [
  { h: 'Catálogo', links: ['Novidades', 'Quadrinhos', 'Marvel Comics', 'DC Comics', 'Action Figures'] },
  { h: 'Mais', links: ['Retro Gaming', 'Livros de Coleção', 'Promoções', 'Pré-vendas'] },
  { h: 'A loja', links: ['Nossa história', 'Avaliações', 'Consigne conosco', 'Blog'] },
  { h: 'Contato', links: [SITE.city, SITE.whatsapp, SITE.email, 'Seg–Sex, 9h–18h'] },
];

const HELP = [
  { label: 'Perguntas frequentes', href: '#/faq' },
  { label: 'Guia de condição', href: '#/condicao' },
  { label: 'Envio e devoluções', href: '#/envio' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-on-primary grain">
      <div className="relative mx-auto max-w-[1280px] px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="font-display text-3xl font-[400] tracking-wide">
              ACERVO DO <span className="text-white">MARVETE</span>
            </span>
            <p className="mt-3 font-mono text-[0.62rem] tracking-[0.3em] text-on-primary/70">
              QUADRINHOS & COLECIONÁVEIS
            </p>
            <p className="mt-6 max-w-[34ch] text-[0.95rem] leading-relaxed text-on-primary/85">
              O acervo pessoal de um único colecionador: quadrinhos, mangás, action figures, retro
              gaming e livros de coleção. Peças únicas, verificadas e descritas com honestidade.
            </p>

            <div className="mt-7 flex gap-3">
              {['IG', 'X', 'WA'].map((s) => (
                <a
                  key={s}
                  href="#top"
                  aria-label={`Acervo do Marvete no ${s}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-on-primary/30 font-mono text-[0.7rem] tracking-widest text-on-primary transition-colors hover:border-white hover:text-white"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {COLUMNS.map((col) => (
              <div key={col.h}>
                <h4 className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-white/90">
                  {col.h}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="text-[0.92rem] text-on-primary/85 transition-colors hover:text-on-primary"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-white/90">
                Ajuda
              </h4>
              <ul className="mt-4 space-y-2.5">
                {HELP.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-[0.92rem] text-on-primary/85 transition-colors hover:text-on-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-on-primary/20 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.66rem] tracking-[0.12em] text-on-primary/70">
            © 2024–2026 ACERVO DO MARVETE. TODOS OS DIREITOS RESERVADOS.
          </p>
          <div className="flex gap-6">
            <a href="#top" className="font-mono text-[0.66rem] tracking-[0.12em] text-on-primary/70 hover:text-on-primary">
              TERMOS
            </a>
            <a href="#top" className="font-mono text-[0.66rem] tracking-[0.12em] text-on-primary/70 hover:text-on-primary">
              PRIVACIDADE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
