// A small HTML parser for registry examples, and converters to JSX, Astro and Blade.

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea', 'title']);

/** Parses HTML into { type: 'root', children }. Nodes: el { name, attrs: [[name, value|null]], children }, text, comment. */
export function parse(html) {
  const root = { type: 'root', children: [] };
  const stack = [root];
  const top = () => stack[stack.length - 1];
  let i = 0;
  const n = html.length;
  const pushText = (s) => s && top().children.push({ type: 'text', value: s });
  while (i < n) {
    const lt = html.indexOf('<', i);
    if (lt < 0) {
      pushText(html.slice(i));
      break;
    }
    pushText(html.slice(i, lt));
    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt + 4);
      const stop = end < 0 ? n : end;
      top().children.push({ type: 'comment', value: html.slice(lt + 4, stop) });
      i = end < 0 ? n : end + 3;
      continue;
    }
    if (html.startsWith('<!', lt)) {
      const end = html.indexOf('>', lt);
      i = end < 0 ? n : end + 1;
      continue;
    }
    if (html[lt + 1] === '/') {
      const end = html.indexOf('>', lt);
      const name = html.slice(lt + 2, end).trim().toLowerCase();
      for (let k = stack.length - 1; k > 0; k--) {
        if (stack[k].name === name) {
          stack.length = k;
          break;
        }
      }
      i = end < 0 ? n : end + 1;
      continue;
    }
    const nameMatch = html.slice(lt + 1).match(/^[A-Za-z][\w:-]*/);
    if (!nameMatch) {
      pushText('<');
      i = lt + 1;
      continue;
    }
    const rawName = nameMatch[0];
    const name = rawName.toLowerCase();
    // find the end of the tag, respecting quotes
    let j = lt + 1 + rawName.length;
    let quote = null;
    for (; j < n; j++) {
      const ch = html[j];
      if (quote) {
        if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'") quote = ch;
      else if (ch === '>') break;
    }
    let attrText = html.slice(lt + 1 + rawName.length, j);
    const selfClosing = /\/\s*$/.test(attrText);
    if (selfClosing) attrText = attrText.replace(/\/\s*$/, '');
    const attrs = [];
    for (const m of attrText.matchAll(/([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
      attrs.push([m[1], m[2] ?? m[3] ?? m[4] ?? null]);
    }
    const el = { type: 'el', name, rawName, attrs, children: [] };
    top().children.push(el);
    i = j + 1;
    if (RAW.has(name) && !selfClosing) {
      const close = html.toLowerCase().indexOf(`</${name}`, i);
      const stop = close < 0 ? n : close;
      if (stop > i) el.children.push({ type: 'text', value: html.slice(i, stop), raw: true });
      const end = close < 0 ? n : html.indexOf('>', close) + 1;
      i = end;
      continue;
    }
    if (!VOID.has(name) && !selfClosing) stack.push(el);
    else el.selfClosing = selfClosing;
  }
  return root;
}

const getAttr = (el, name) => el.attrs.find(([k]) => k.toLowerCase() === name);
const setAttr = (el, name, value) => {
  const a = getAttr(el, name);
  if (a) a[1] = value;
  else el.attrs.push([name, value]);
};
const removeAttr = (el, name) => {
  el.attrs = el.attrs.filter(([k]) => k.toLowerCase() !== name);
};

// Layout helpers that only exist on the docs site, turned into inline styles.
const DOCS_STYLES = {
  'docs-row': 'display: flex; flex-wrap: wrap; align-items: center; gap: 12px',
  'docs-col': 'display: flex; flex-direction: column; gap: 12px; width: 100%',
  'docs-box': 'position: relative; width: 100%; min-height: 360px',
  'docs-scroll': 'height: 280px; overflow: auto; width: 100%',
  'docs-phone': 'width: 360px; max-width: 100%; height: 640px; overflow: hidden; position: relative',
  'docs-note': 'font: var(--type-footnote); color: var(--text-muted)',
  'docs-demo': '',
};

function walk(node, fn) {
  if (node.type === 'el' || node.type === 'root') {
    if (node.type === 'el') fn(node);
    for (const ch of node.children) walk(ch, fn);
  }
}

/** Joins two declaration lists; a property in `b` replaces the same property in `a`. */
function mergeStyles(a, b) {
  const map = new Map();
  for (const d of `${a};${b}`.split(';')) {
    const k = d.indexOf(':');
    if (k < 0) continue;
    const prop = d.slice(0, k).trim().toLowerCase();
    map.delete(prop);
    map.set(prop, `${prop}: ${d.slice(k + 1).trim()}`);
  }
  return [...map.values()].join('; ');
}

/** Replaces docs-only classes with equivalent inline styles. */
export function cleanDocsClasses(tree) {
  walk(tree, (el) => {
    const cls = getAttr(el, 'class');
    if (!cls || !cls[1]) return;
    const names = cls[1].split(/\s+/).filter(Boolean);
    const docs = names.filter((x) => x in DOCS_STYLES);
    if (!docs.length) return;
    const keep = names.filter((x) => !(x in DOCS_STYLES));
    if (keep.length) cls[1] = keep.join(' ');
    else removeAttr(el, 'class');
    const add = docs.map((d) => DOCS_STYLES[d]).filter(Boolean).join('; ');
    if (!add) return;
    const style = getAttr(el, 'style');
    setAttr(el, 'style', mergeStyles(add, style && style[1] ? style[1] : ''));
  });
  return tree;
}

/** Serializes a tree back to HTML. */
export function toHtml(node) {
  if (node.type === 'root') return node.children.map(toHtml).join('');
  if (node.type === 'text') return node.value;
  if (node.type === 'comment') return `<!--${node.value}-->`;
  const attrs = node.attrs.map(([k, v]) => (v === null ? ` ${k}` : v.includes('"') ? ` ${k}='${v}'` : ` ${k}="${v}"`)).join('');
  if (VOID.has(node.name)) return `<${node.rawName}${attrs}>`;
  if (node.selfClosing) return `<${node.rawName}${attrs} />`;
  return `<${node.rawName}${attrs}>${node.children.map(toHtml).join('')}</${node.rawName}>`;
}

/** Markup to copy for an example: the clean `code` when it is markup, else the live `html`. */
export function exampleMarkup(ex) {
  const code = ex.code && ex.code.trim();
  if (code && code.startsWith('<') && !/\bclassName=|\{\s*\w+\s*&&|<[A-Z]\w*[\s/>]|=\{/.test(code)) return { markup: ex.code, usage: null };
  return { markup: ex.html, usage: code || null };
}

// ---------- JSX ----------

const ATTR_MAP = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  readonly: 'readOnly',
  maxlength: 'maxLength',
  minlength: 'minLength',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  autocapitalize: 'autoCapitalize',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  enctype: 'encType',
  formaction: 'formAction',
  formnovalidate: 'formNoValidate',
  frameborder: 'frameBorder',
  inputmode: 'inputMode',
  enterkeyhint: 'enterKeyHint',
  novalidate: 'noValidate',
  spellcheck: 'spellCheck',
  srcset: 'srcSet',
  srcdoc: 'srcDoc',
  usemap: 'useMap',
  accesskey: 'accessKey',
  allowfullscreen: 'allowFullScreen',
  playsinline: 'playsInline',
  referrerpolicy: 'referrerPolicy',
  popovertarget: 'popoverTarget',
  popovertargetaction: 'popoverTargetAction',
  charset: 'charSet',
  fetchpriority: 'fetchPriority',
  itemprop: 'itemProp',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  viewbox: 'viewBox',
  preserveaspectratio: 'preserveAspectRatio',
  pathlength: 'pathLength',
  gradientunits: 'gradientUnits',
  gradienttransform: 'gradientTransform',
  'xlink:href': 'xlinkHref',
  'xml:lang': 'xmlLang',
  'xml:space': 'xmlSpace',
  'xmlns:xlink': 'xmlnsXlink',
  'accept-charset': 'acceptCharset',
  'http-equiv': 'httpEquiv',
};

// Props React's DOM types know; anything else is passed through a spread so TypeScript accepts it.
const KNOWN = new Set(
  `accept acceptCharset accessKey action allow allowFullScreen alt as async autoCapitalize autoComplete autoFocus autoPlay capture
  cellPadding cellSpacing charSet checked cite className cols colSpan content contentEditable controls coords crossOrigin data dateTime
  decoding default defaultChecked defaultValue defer dir disabled download draggable encType enterKeyHint fetchPriority form formAction
  formNoValidate frameBorder headers height hidden high href hrefLang htmlFor httpEquiv id inert inputMode integrity is itemProp itemScope
  itemType kind label lang list loading loop low max maxLength media method min minLength multiple muted name noValidate nonce open optimum
  pattern placeholder playsInline popover popoverTarget popoverTargetAction poster preload readOnly referrerPolicy rel required reversed role
  rows rowSpan sandbox scope selected shape size sizes slot span spellCheck src srcDoc srcLang srcSet start step style summary tabIndex
  target title translate type useMap value width wrap
  viewBox preserveAspectRatio xmlns xmlnsXlink xlinkHref xmlLang xmlSpace d fill fillOpacity fillRule clipRule clipPath stroke strokeWidth
  strokeLinecap strokeLinejoin strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity cx cy r rx ry x y x1 x2 y1 y2 points
  transform opacity pathLength offset stopColor stopOpacity gradientUnits gradientTransform href textAnchor dominantBaseline fontSize
  fontWeight fontFamily letterSpacing mask markerEnd markerStart markerMid filter vectorEffect focusable`.split(/\s+/),
);

const BOOLEAN = new Set(
  'allowfullscreen async autofocus autoplay checked controls default defer disabled formnovalidate hidden inert itemscope loop multiple muted novalidate open playsinline readonly required reversed selected'.split(' '),
);

const NUMERIC = new Set(['tabIndex', 'maxLength', 'minLength', 'rows', 'cols', 'colSpan', 'rowSpan', 'size', 'span', 'start', 'high', 'low', 'optimum']);
const NUMERIC_ARIA = new Set(
  'aria-level aria-colcount aria-colindex aria-colspan aria-posinset aria-rowcount aria-rowindex aria-rowspan aria-setsize aria-valuemax aria-valuemin aria-valuenow'.split(' '),
);

const camel = (s) => s.replace(/[-:]([a-z])/g, (_, ch) => ch.toUpperCase());

function cssProp(p) {
  const prop = p.trim();
  if (prop.startsWith('--')) return { key: `'${prop}'`, custom: true };
  const name = prop.toLowerCase().replace(/^-ms-/, 'ms-').replace(/^-(webkit|moz|o)-/, (_, v) => `${v[0].toUpperCase()}${v.slice(1)}-`);
  const key = name.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
  return { key: /^[A-Za-z_$][\w$]*$/.test(key) ? key : `'${key}'`, custom: false };
}

/** "max-width: 360px; --p: 40%" -> { text: "{ maxWidth: '360px', '--p': '40%' }", custom: true } */
export function styleObject(style) {
  const decls = [];
  let depth = 0;
  let quote = null;
  let cur = '';
  for (const ch of style) {
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ';' && depth === 0) {
      decls.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  decls.push(cur);
  let custom = false;
  const props = new Map();
  for (const d of decls) {
    const k = d.indexOf(':');
    if (k < 0) continue;
    const { key, custom: isCustom } = cssProp(d.slice(0, k));
    custom ||= isCustom;
    const value = d.slice(k + 1).trim().replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    props.delete(key);
    props.set(key, `${key}: ${JSON.stringify(value)}`);
  }
  return { text: `{ ${[...props.values()].join(', ')} }`, custom };
}

const jsxString = (v) => (v.includes('"') ? `{${JSON.stringify(v.replace(/&quot;/g, '"'))}}` : `"${v}"`);

function jsxAttrs(el, ctx) {
  const out = [];
  const spread = [];
  const tag = el.name;
  for (const [rawName, rawValue] of el.attrs) {
    const lower = rawName.toLowerCase();
    if (/^on[a-z]+$/.test(lower)) continue;
    let value = rawValue;
    if (lower.startsWith('aria-') || lower.startsWith('data-')) {
      if (value === null) value = '';
      if (NUMERIC_ARIA.has(lower) && /^-?\d+(\.\d+)?$/.test(value)) out.push(`${lower}={${value}}`);
      else out.push(`${lower}=${jsxString(value)}`);
      continue;
    }
    let name = ATTR_MAP[lower] || (rawName.includes('-') || rawName.includes(':') ? camel(lower) : rawName);
    if (lower === 'style') {
      if (!value || !value.trim()) continue;
      const s = styleObject(value);
      if (s.custom && ctx.ts) {
        ctx.state.cssProperties = true;
        out.push(`style={${s.text} as CSSProperties}`);
      } else out.push(`style={${s.text}}`);
      continue;
    }
    // uncontrolled form state
    if (lower === 'checked' && (tag === 'input')) name = 'defaultChecked';
    if (lower === 'value' && (tag === 'input' || tag === 'select') && !/^(button|submit|reset|checkbox|radio|hidden)$/i.test(getAttr(el, 'type')?.[1] || '')) name = 'defaultValue';
    if (lower === 'selected' && tag === 'option') continue;
    if (BOOLEAN.has(lower) && (value === null || value === '' || value.toLowerCase() === lower)) {
      if (KNOWN.has(name) || name === 'defaultChecked') out.push(name);
      else spread.push(`'${rawName}': true`);
      continue;
    }
    if (value === null) value = '';
    if (!KNOWN.has(name) && name !== 'defaultChecked') {
      spread.push(`${/^[A-Za-z_$][\w$]*$/.test(rawName) ? rawName : `'${rawName}'`}: ${JSON.stringify(value)}`);
      continue;
    }
    if (NUMERIC.has(name) && /^-?\d+$/.test(value)) out.push(`${name}={${value}}`);
    else out.push(`${name}=${jsxString(value)}`);
  }
  if (tag === 'select') {
    const opt = findSelected(el);
    if (opt !== null && !out.some((a) => a.startsWith('defaultValue='))) out.push(`defaultValue=${jsxString(opt)}`);
  }
  if (tag === 'textarea' && el.children.length) {
    const text = el.children.map((c) => c.value || '').join('');
    if (text) out.push(`defaultValue={${JSON.stringify(decodeEntities(text))}}`);
  }
  if (spread.length) out.push(`{...{ ${spread.join(', ')} }}`);
  return out.length ? ` ${out.join(' ')}` : '';
}

function findSelected(select) {
  let found = null;
  walk(select, (el) => {
    if (found === null && el.name === 'option' && getAttr(el, 'selected')) {
      const v = getAttr(el, 'value');
      found = v ? v[1] ?? '' : el.children.map((c) => c.value || '').join('').trim();
    }
  });
  return found;
}

const decodeEntities = (s) =>
  s.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' })[e]);

const escapeJsxText = (s) => s.replace(/[{}>]/g, (ch) => ({ '{': '&#123;', '}': '&#125;', '>': '&gt;' })[ch]);

function jsxText(node, parent, index, ctx) {
  const v = node.value;
  if (ctx.pre) return v ? `{${JSON.stringify(decodeEntities(v))}}` : '';
  if (!/\S/.test(v)) {
    // whitespace between elements: keep it visible when it would render (no newline)
    return v.includes('\n') ? v : ' ';
  }
  const lead = v.match(/^\s*/)[0];
  const trail = v.match(/\s*$/)[0];
  const core = escapeJsxText(v.slice(lead.length, v.length - trail.length).replace(/\s+/g, ' '));
  const first = index === 0;
  const last = index === parent.children.length - 1;
  const side = (ws, edge) => {
    if (!ws) return '';
    if (!ws.includes('\n')) return ' ';
    return edge ? ws : `{' '}${ws}`;
  };
  const before = lead.includes('\n') ? (first ? lead : `${lead}{' '}`) : side(lead, first);
  return `${before}${core}${side(trail, last)}`;
}

function jsxNode(node, parent, index, ctx) {
  if (node.type === 'text') return jsxText(node, parent, index, ctx);
  if (node.type === 'comment') return '';
  if (node.name === 'script') return '';
  const attrs = jsxAttrs(node, ctx);
  const tag = node.rawName;
  if (node.name === 'style') {
    const css = node.children.map((c) => c.value).join('');
    return `<style>{${JSON.stringify(css)}}</style>`;
  }
  if (VOID.has(node.name) || node.name === 'textarea' || !node.children.length) return `<${tag}${attrs} />`;
  const inner = { ...ctx, pre: ctx.pre || node.name === 'pre' };
  const children = node.children.map((c, i) => jsxNode(c, node, i, inner)).join('');
  return `<${tag}${attrs}>${children}</${tag}>`;
}

/**
 * Converts HTML markup to a JSX expression. Returns { jsx, cssProperties } where cssProperties
 * says the TSX output needs `import type { CSSProperties } from 'react'`.
 */
export function htmlToJsx(html, { ts = true } = {}) {
  const tree = cleanDocsClasses(parse(html.trim()));
  const ctx = { ts, state: { cssProperties: false }, pre: false };
  const kept = tree.children.filter((n) => n.type === 'el' ? n.name !== 'script' : n.type === 'text' && /\S/.test(n.value));
  const single = kept.length === 1 && kept[0].type === 'el';
  const body = tree.children.map((c, i) => jsxNode(c, tree, i, ctx)).join('');
  const jsx = body.replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
  return { jsx, single, cssProperties: ctx.state.cssProperties };
}

// ---------- Astro and Blade ----------

/** Astro reads {} as expressions in text: escape them. Inline on* handlers are kept as HTML. */
export function htmlToAstro(html) {
  const tree = cleanDocsClasses(parse(html.trim()));
  const esc = (node) => {
    if (node.type === 'text' && !node.raw) node.value = node.value.replace(/[{}]/g, (ch) => (ch === '{' ? '&#123;' : '&#125;'));
    if (node.children) node.children.forEach(esc);
  };
  esc(tree);
  return toHtml(tree);
}

/** Blade compiles {{ }} and @directives: wrap the markup in @verbatim when it has either. */
export function htmlToBlade(html) {
  const out = toHtml(cleanDocsClasses(parse(html.trim())));
  return /\{\{|\{!!|(^|[^\w@])@\w/.test(out) ? `@verbatim\n${out}\n@endverbatim` : out;
}

export function cleanHtml(html) {
  return toHtml(cleanDocsClasses(parse(html.trim())));
}
