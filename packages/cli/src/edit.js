// Small, idempotent source edits: each function returns the new text, or the same text when the
// change is already there, or null when it cannot find its anchor.

export const CSS_IMPORT = '@import "lampung-design-system/css";';
export const CSS_SPEC = 'lampung-design-system/css';
export const JS_SPEC = 'lampung-design-system/js';

/** Puts the LDS stylesheet import first in a CSS file (after @charset), so the font import stays on top. */
export function addCssImport(css) {
  if (css.includes(CSS_SPEC)) return css;
  const m = css.match(/^﻿?@charset[^;]*;[^\n]*\n?/);
  if (m) return `${m[0]}${CSS_IMPORT}\n${css.slice(m[0].length)}`;
  return `${CSS_IMPORT}\n${css.length && !css.startsWith('\n') && !css.startsWith('@import') ? '\n' : ''}${css}`;
}

/** True for the untouched global CSS of a create-vite starter. Its :root palette and #root
    layout (fixed width, centered text) fight LDS, so init replaces the file instead of adding
    an import on top of it. */
export function isViteStarterCss(css) {
  return /#root\s*\{/.test(css) && /--accent:\s*#aa3bff|color:\s*#646cff/i.test(css) && !css.includes(CSS_SPEC);
}

/** Formats an import line in the module's own style (quote character, semicolons). */
export function importLine(src, clause, spec) {
  const first = src.match(/^import\s[^\n]*?(['"])[^'"\n]+\1(;?)[ \t]*$/m);
  const q = first ? first[1] : "'";
  const semi = first ? first[2] : ';';
  return clause ? `import ${clause} from ${q}${spec}${q}${semi}` : `import ${q}${spec}${q}${semi}`;
}

/** Spans of the leading directives and import statements of a JS/TS module. */
function headerImports(src) {
  const imports = [];
  let pos = 0;
  let directivesEnd = 0;
  const skip = /^(?:\s+|\/\/[^\n]*|\/\*[\s\S]*?\*\/)/;
  const directive = /^(['"])use [\w ]+\1;?[^\n]*/;
  const imp = /^import(?:\s+type)?(?:\s*[\w*{}\s,$]+?\s*from\s*|\s*)(['"])([^'"\n]+)\1;?[^\n]*/;
  for (;;) {
    const rest = src.slice(pos);
    let m;
    if ((m = rest.match(skip)) && m[0].length) {
      pos += m[0].length;
      continue;
    }
    if ((m = rest.match(directive))) {
      pos += m[0].length;
      directivesEnd = pos;
      continue;
    }
    if ((m = rest.match(imp))) {
      imports.push({ start: pos, end: pos + m[0].length, source: m[2] });
      pos += m[0].length;
      continue;
    }
    break;
  }
  return { imports, directivesEnd };
}

/**
 * Adds an import line to a module unless `marker` is already in it. With beforeCss the line goes
 * before the first .css import (so the app's own CSS still wins), else after the last import.
 */
export function addJsImport(src, line, { marker = line, beforeCss = false } = {}) {
  if (src.includes(marker)) return src;
  const { imports, directivesEnd } = headerImports(src);
  if (beforeCss) {
    const css = imports.find((i) => /\.css(\?.*)?$/.test(i.source));
    if (css) return `${src.slice(0, css.start)}${line}\n${src.slice(css.start)}`;
  }
  if (imports.length) {
    const end = imports[imports.length - 1].end;
    return `${src.slice(0, end)}\n${line}${src.slice(end)}`;
  }
  if (directivesEnd) return `${src.slice(0, directivesEnd)}\n\n${line}${src.slice(directivesEnd)}`;
  return `${line}\n${src.startsWith('\n') ? '' : '\n'}${src}`;
}

/**
 * Finds the first opening tag `<name ...>` and returns { start, end, nameEnd, attrs }, where end is
 * the index just past `>`. Quotes are respected; with jsx, so are {} expressions.
 */
export function findTag(src, name, { jsx = false } = {}) {
  const re = new RegExp(`<${name}(?=[\\s>/])`, 'g');
  let m;
  while ((m = re.exec(src))) {
    const nameEnd = m.index + m[0].length;
    let i = nameEnd;
    let quote = null;
    let depth = 0;
    for (; i < src.length; i++) {
      const ch = src[i];
      if (quote) {
        if (ch === quote) quote = null;
        continue;
      }
      if (ch === '"' || ch === "'" || (ch === '`' && depth > 0)) quote = ch;
      else if (jsx && ch === '{') depth++;
      else if (jsx && ch === '}') depth--;
      else if (ch === '>' && depth <= 0) break;
    }
    if (i >= src.length) return null;
    return { start: m.index, nameEnd, end: i + 1, attrs: src.slice(nameEnd, i) };
  }
  return null;
}

const hasWord = (s, w) => new RegExp(`(^|[\\s\`'"])${w}($|[\\s\`'"])`).test(s);

/** Adds `lds` to a class attribute string (JSX or HTML). Returns the new attribute text. */
function addClass(attrs, jsx) {
  const name = jsx ? 'className' : 'class';
  const re = new RegExp(`(\\s${name}\\s*=\\s*)("([^"]*)"|'([^']*)'|\\{)`);
  const m = attrs.match(re);
  if (!m) {
    const trail = attrs.match(/\s*\/?$/)[0];
    return `${attrs.slice(0, attrs.length - trail.length)} ${name}="lds"${trail}`;
  }
  const at = m.index + m[1].length;
  if (m[2] !== '{') {
    const value = m[3] ?? m[4];
    if (hasWord(value, 'lds')) return attrs;
    const q = m[2][0];
    return `${attrs.slice(0, at)}${q}${value ? `${value} ` : ''}lds${q}${attrs.slice(at + m[2].length)}`;
  }
  // {expression}: find the matching brace
  let depth = 0;
  let quote = null;
  let j = at;
  for (; j < attrs.length; j++) {
    const ch = attrs[j];
    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '{') depth++;
    else if (ch === '}' && --depth === 0) break;
  }
  const expr = attrs.slice(at + 1, j).trim();
  if (/^`[\s\S]*`$/.test(expr)) {
    if (hasWord(expr, 'lds')) return attrs;
    return `${attrs.slice(0, at)}{\`lds ${expr.slice(1)}}${attrs.slice(j + 1)}`;
  }
  if (/^(['"]).*\1$/.test(expr)) {
    if (hasWord(expr, 'lds')) return attrs;
    return `${attrs.slice(0, at)}{${expr[0]}lds ${expr.slice(1)}}${attrs.slice(j + 1)}`;
  }
  if (/['"`]lds['"`\s]|\blds\b['"`]/.test(expr)) return attrs;
  return `${attrs.slice(0, at)}{\`lds \${${expr}}\`}${attrs.slice(j + 1)}`;
}

/**
 * Puts class="lds" (className in JSX), data-theme and, for server-rendered React,
 * suppressHydrationWarning on the first <tag>. Returns null when the tag is missing.
 */
export function patchHtmlTag(src, { jsx = false, theme = 'light', tag = 'html', hydration = false } = {}) {
  const m = findTag(src, tag, { jsx });
  if (!m) return null;
  let attrs = addClass(m.attrs, jsx);
  const trail = attrs.match(/\s*\/?$/)[0];
  let body = attrs.slice(0, attrs.length - trail.length);
  if (!/\sdata-theme\s*=/.test(body)) body += ` data-theme="${theme}"`;
  if (jsx && hydration && !/\ssuppressHydrationWarning\b/.test(body)) body += ' suppressHydrationWarning';
  attrs = body + trail;
  if (attrs === m.attrs) return src;
  return src.slice(0, m.nameEnd) + attrs + src.slice(m.end - 1);
}

const lineIndent = (src, index) => {
  const start = src.lastIndexOf('\n', index - 1) + 1;
  return src.slice(start).match(/^[ \t]*/)[0];
};

/** Inserts `snippet` on its own line right after the first opening <tag>, unless marker is present. */
export function insertAfterOpenTag(src, tag, snippet, { marker = snippet, jsx = false } = {}) {
  if (src.includes(marker)) return src;
  const m = findTag(src, tag, { jsx });
  if (!m) return null;
  const after = src.slice(m.end);
  const next = after.match(/^[ \t]*\n([ \t]*)\S/);
  const indent = next ? next[1] : `${lineIndent(src, m.start)}  `;
  return `${src.slice(0, m.end)}\n${indent}${snippet}${src.slice(m.end)}`;
}

/** Inserts `snippet` (may be several lines) before the first closing </tag>, unless marker is present. */
export function insertBeforeClose(src, tag, snippet, { marker = snippet } = {}) {
  if (src.includes(marker)) return src;
  const i = src.search(new RegExp(`</${tag}\\s*>`));
  if (i < 0) return null;
  const lineStart = src.lastIndexOf('\n', i - 1) + 1;
  const closeIndent = lineIndent(src, i);
  const prev = src.slice(0, Math.max(0, lineStart - 1)).split('\n').reverse().find((l) => l.trim());
  const prevIndent = prev ? prev.match(/^[ \t]*/)[0] : '';
  const indent = prevIndent.length > closeIndent.length ? prevIndent : `${closeIndent}${closeIndent.includes('\t') ? '\t' : '  '}`;
  const onOwnLine = /^[ \t]*$/.test(src.slice(lineStart, i));
  const block = snippet
    .split('\n')
    .map((l) => (l ? indent + l : l))
    .join('\n');
  if (onOwnLine) return `${src.slice(0, lineStart)}${block}\n${src.slice(lineStart)}`;
  return `${src.slice(0, i)}\n${block}\n${src.slice(i)}`;
}

/**
 * Mounts <LdsProvider /> next to <App /> in a Vite entry. Inside <StrictMode> it goes on its own
 * line before <App />; otherwise both are wrapped in a fragment.
 */
export function mountBesideApp(src, element, marker = '<LdsProvider') {
  if (src.includes(marker)) return src;
  const m = src.match(/<App\s*\/>/);
  if (!m) return null;
  const before = src.slice(0, m.index);
  const strict = /<(React\.)?StrictMode>\s*$/.test(before);
  if (strict) {
    const indent = lineIndent(src, m.index);
    return `${before}${element}\n${indent}${src.slice(m.index)}`;
  }
  return `${before}<>${element}${m[0]}</>${src.slice(m.index + m[0].length)}`;
}

/** Wraps `<Component {...pageProps} />` in a fragment with the provider (Next.js pages router). */
export function mountBesideComponent(src, element, marker = '<LdsProvider') {
  if (src.includes(marker)) return src;
  const m = src.match(/<Component\s+\{\s*\.\.\.pageProps\s*\}\s*\/>/);
  if (!m) return null;
  return `${src.slice(0, m.index)}<>${element}${m[0]}</>${src.slice(m.index + m[0].length)}`;
}

/** Replaces or appends the text between two comment markers. */
export function upsertBlock(src, start, end, body) {
  const block = `${start}\n${body.trim()}\n${end}`;
  const i = src.indexOf(start);
  const j = src.indexOf(end);
  if (i >= 0 && j > i) return src.slice(0, i) + block + src.slice(j + end.length);
  return `${src.replace(/\s*$/, '')}\n\n${block}\n`;
}

/** Finds the index of the parenthesis that closes the one at `open`. */
export function matchParen(src, open) {
  let depth = 0;
  let quote = null;
  for (let i = open; i < src.length; i++) {
    const ch = src[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '(') depth++;
    else if (ch === ')' && --depth === 0) return i;
  }
  return -1;
}
