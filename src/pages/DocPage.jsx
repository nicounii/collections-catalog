import { Icon, stroke } from '../components/icons.jsx';
import { renderMarkdown } from '../lib/markdown.jsx';

export default function DocPage({ markdown }) {
  return (
    <main className="relative min-h-screen bg-ink-deep text-on-dark">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <a
          href="#top"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-on-dark-mute transition-colors hover:text-accent-light"
        >
          <Icon.Arrow className="h-4 w-4 rotate-180" {...stroke} />
          Voltar ao acervo
        </a>
        <div className="doc-prose mt-10">{renderMarkdown(markdown)}</div>
      </div>
    </main>
  );
}
