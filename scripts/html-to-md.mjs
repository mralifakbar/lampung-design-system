// Turns the small HTML subset the docs use (headings, paragraphs, lists, tables, code blocks, links,
// inline code and emphasis) into Markdown, so every docs page also ships as a .md file for agents.
// Not a general converter: unknown tags are dropped and their text kept.

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", times: '×', rarr: '→', larr: '←', middot: '·', hellip: '…' };
export const decode = (s) => s.replace(/&(#x?[0-9a-f]+|[a-z0-9]+);/gi, (m, e) => {
  if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
  return ENTITIES[e.toLowerCase()] ?? m;
});

// Relative links to other docs pages point at their Markdown twin; everything else is kept.
const mdHref = (h) => (/^(https?:|mailto:|#|\/\/)/.test(h) ? h : h.replace(/\.html(?=#|$)/, '.md').replace(/(^|\/)(#|$)/, '$1index.md$2'));

const inline = (html) => decode(html
  .replace(/<br\s*\/?>/gi, '  \n')
  .replace(/<(code|kbd)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, t, c) => '`' + c.replace(/<[^>]+>/g, '') + '`')
  .replace(/<span class="(?:code|kbd)[^"]*"[^>]*>([\s\S]*?)<\/span>/gi, (_, c) => '`' + c.replace(/<[^>]+>/g, '') + '`')
  .replace(/<span class="ic[^"]*"[^>]*>[\s\S]*?<\/span>/gi, '')
  .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, h, t) => `[${t.replace(/<[^>]+>/g, '').trim()}](${mdHref(h)})`)
  .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
  .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, '_$2_')
  .replace(/<[^>]+>/g, ''))
  .replace(/[ \t]*\n[ \t]*/g, (m) => (m.includes('  \n') ? m : ' '))
  .replace(/[ \t]{2,}/g, ' ')
  .trim();

const table = (html) => {
  const rows = [...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) => [...r[1].matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((c) => inline(c[1]).replace(/\|/g, '\\|').replace(/\n/g, ' ')));
  if (!rows.length) return '';
  const w = Math.max(...rows.map((r) => r.length));
  const line = (r) => `| ${Array.from({ length: w }, (_, i) => r[i] ?? '').join(' | ')} |`;
  return [line(rows[0]), `|${' --- |'.repeat(w)}`, ...rows.slice(1).map(line)].join('\n');
};

const list = (html, ordered, depth = 0) => {
  const out = [];
  let n = 0;
  // Walk top-level <li> elements, keeping nested lists inside their item.
  let i = 0, level = 0, start = -1;
  const re = /<(\/?)(li|ul|ol)\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const close = m[1] === '/', tag = m[2].toLowerCase();
    if (tag === 'li' && !close && level === 0) start = re.lastIndex;
    if (tag !== 'li') level += close ? -1 : 1;
    if (tag === 'li' && close && level === 0 && start >= 0) {
      const item = html.slice(start, m.index);
      const nested = item.match(/<(ul|ol)\b[^>]*>([\s\S]*)<\/\1>/i);
      const text = inline(nested ? item.slice(0, nested.index) : item);
      out.push(`${'  '.repeat(depth)}${ordered ? `${++n}.` : '-'} ${text}`);
      if (nested) out.push(list(nested[2], nested[1].toLowerCase() === 'ol', depth + 1));
      start = -1;
    }
    i++;
  }
  return out.join('\n');
};

// Replaces each outermost element matched by `re` (open and close tags of the same family, which may
// nest) with fn(tagName, innerHtml).
function outermost(s, re, fn) {
  let out = '', depth = 0, from = 0, start = 0, open = '', m;
  re.lastIndex = 0;
  while ((m = re.exec(s))) {
    if (!m[1]) { if (depth++ === 0) { out += s.slice(from, m.index); start = re.lastIndex; open = m[2].toLowerCase(); } }
    else if (depth > 0 && --depth === 0) { out += fn(open, s.slice(start, m.index)); from = re.lastIndex; }
  }
  return out + s.slice(from);
}

export function htmlToMd(html) {
  const blocks = [];
  const keep = (md) => `\n\n@@B${blocks.push(md) - 1}@@\n\n`;
  let s = String(html)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|template|svg|button)\b[\s\S]*?<\/\1>/gi, '')
    // Code blocks first so nothing inside them is touched.
    .replace(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi, (_, c) => keep('```\n' + decode(c.replace(/<[^>]+>/g, '')).replace(/\n+$/, '') + '\n```'))
    .replace(/<table\b[^>]*>([\s\S]*?)<\/table>/gi, (_, t) => keep(table(t)));
  s = outermost(s, /<(\/?)(ul|ol)\b[^>]*>/gi, (tag, body) => keep(list(body, tag === 'ol')));
  s = s
    .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => keep(`${'#'.repeat(+n)} ${inline(t)}`))
    .replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, t) => keep(inline(t.replace(/<\/p>\s*<p[^>]*>/gi, '\n')).split('\n').map((l) => `> ${l}`).join('\n')))
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, t) => keep(inline(t)))
    // Link cards and alerts: title and body on their own lines.
    .replace(/<a\b[^>]*class="link-card[^"]*"[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>|<a\b[^>]*href="([^"]*)"[^>]*class="link-card[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, (_, h1, b1, h2, b2) => {
      const body = b1 ?? b2, href = h1 ?? h2;
      const title = inline((body.match(/link-card__title[^>]*>([\s\S]*?)<\/span>/) || [, ''])[1]);
      const text = inline((body.match(/link-card__body[^>]*>([\s\S]*?)<\/span>/) || [, ''])[1]);
      return keep(`- [${title}](${mdHref(href)})${text ? `: ${text}` : ''}`);
    });
  s = inline(s.replace(/<\/(div|section|figure|header|footer|nav|main|aside)>/gi, '\n\n'));
  // inline() collapses newlines; split on block markers instead.
  return s.split(/\s*@@B(\d+)@@\s*/).map((part, i) => (i % 2 ? blocks[+part] : part.trim())).filter(Boolean).join('\n\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}
