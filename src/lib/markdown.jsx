// Tiny markdown -> React renderer, scoped to what our docs actually use:
// headings, paragraphs, -/1. lists, **bold**, [links](url) and > blockquotes.
// No dependency, no dangerouslySetInnerHTML.

// Relative doc links are rewritten to in-app hash routes.
const LINK_MAP = {
  './faq.md': '#/faq',
  './condition-guide.md': '#/condicao',
  './shipping-returns.md': '#/envio',
};

function resolveHref(href) {
  return LINK_MAP[href] || href;
}

const INLINE_RE = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;

function renderInline(text, keyPrefix) {
  const nodes = [];
  let last = 0;
  let m;
  let i = 0;
  INLINE_RE.lastIndex = 0;
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b${i}`}>{m[2]}</strong>);
    } else {
      const href = resolveHref(m[5]);
      const external = /^https?:/i.test(href);
      nodes.push(
        <a
          key={`${keyPrefix}-a-${i}`}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {m[4]}
        </a>
      );
    }
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function parseBlocks(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      blocks.push({ type: 'h', level: heading[1].length, text: heading[2].trim() });
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'quote', text: buf.join(' ').trim() });
      continue;
    }

    if (/^-\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^-\s+/.test(lines[i])) {
        let text = lines[i].replace(/^-\s+/, '');
        i++;
        // indented continuation lines belong to this item
        while (i < lines.length && lines[i].trim() !== '' && !isStart(lines[i])) {
          text += ' ' + lines[i].trim();
          i++;
        }
        items.push(text.trim());
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        let text = lines[i].replace(/^\d+\.\s+/, '');
        i++;
        while (i < lines.length && lines[i].trim() !== '' && !isStart(lines[i])) {
          text += ' ' + lines[i].trim();
          i++;
        }
        items.push(text.trim());
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // paragraph: consume until a blank line or the next block starter
    const buf = [line.trim()];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !isStart(lines[i])) {
      buf.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: 'p', text: buf.join(' ') });
  }

  return blocks;
}

// A line "starts" a new block when it is a heading, quote, or list item.
function isStart(line) {
  return /^(#{1,6}\s|>\s?|-\s+|\d+\.\s)/.test(line);
}

export function renderMarkdown(md) {
  return parseBlocks(md).map((block, idx) => {
    const key = `b${idx}`;
    switch (block.type) {
      case 'h': {
        const Tag = `h${Math.min(block.level, 6)}`;
        return <Tag key={key}>{renderInline(block.text, key)}</Tag>;
      }
      case 'quote':
        return <blockquote key={key}>{renderInline(block.text, key)}</blockquote>;
      case 'ul':
        return (
          <ul key={key}>
            {block.items.map((item, j) => (
              <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={key}>
            {block.items.map((item, j) => (
              <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
            ))}
          </ol>
        );
      default:
        return <p key={key}>{renderInline(block.text, key)}</p>;
    }
  });
}
