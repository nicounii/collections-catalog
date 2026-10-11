import { Reveal } from './Reveal.jsx';
import { Icon, stroke } from './icons.jsx';
import { Plate } from './Plate.jsx';
import { journalPosts } from '../data/products.js';

export default function Journal() {
  return (
    <section id="blog" className="relative bg-parchment text-ink grain">
      <div className="relative mx-auto max-w-[1280px] px-6 py-20 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-hair-light pb-8">
          <Reveal>
            <span className="eyebrow text-mute-light">Do nosso blog</span>
            <h2 className="display-lg mt-4 max-w-[18ch] text-ink">Dicas e curiosidades.</h2>
          </Reveal>
          <Reveal delay={110}>
            <a href="#blog" className="inline-flex items-center gap-2 text-[1rem] font-medium text-link-light">
              Ver todos
              <Icon.Arrow className="h-4 w-4" {...stroke} />
            </a>
          </Reveal>
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-3">
          {journalPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 110} className="h-full">
              <article className="group/journal flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-hair-light transition-colors hover:ring-accent">
                <Plate art={post.art} plain ratio="h-40" className="shrink-0">
                  <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-accent-light">
                    {post.kicker}
                  </span>
                </Plate>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[1.35rem] font-[380] leading-snug text-ink transition-colors group-hover/journal:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-body-light">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-hair-light pt-4 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-mute-light">
                    <span>{post.date}</span>
                    <span>{post.reading} de leitura</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
