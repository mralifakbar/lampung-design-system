// Builds the per-component documentation from docs/spec/*.mjs, one page per component:
//   docs/components/<slug>.html                          the page people read (live demos, chained prev/next)
//   docs/components/index.html                           every component, grouped
//   skills/lampung-design-system/references/components/<slug>.md   the same content for agents
//   skills/lampung-design-system/references/components.md            the index agents read first
// Both outputs come from the same spec, so the site and the skill cannot drift.
// It also checks every example: icon names must exist, classes must exist in css/components.css,
// related links must point at real specs. Any problem fails the build.
//   node scripts/build-docs.mjs                 build everything
//   node scripts/build-docs.mjs --check a b     only check the named specs (or all), write nothing;
//                                               links to specs that do not exist yet are warnings
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const specDir = join(root, 'docs/spec');
const outDir = join(root, 'docs/components');
const skillDir = join(root, 'skills/lampung-design-system/references/components');

// Navigation order. Every spec's `group` must be one of these.
export const GROUPS = [
  ['Foundations', 'Rules every component follows: layout, motion, states'],
  ['Actions', 'Things people press to make something happen'],
  ['Inputs', 'Fields people type or choose into'],
  ['Selection', 'Choosing between options and toggling settings'],
  ['Navigation', 'Moving between pages, sections and steps'],
  ['Overlays', 'Layers that float above the page'],
  ['Feedback', 'Status, progress, messages and empty states'],
  ['Data display', 'Lists, tables, figures and records'],
  ['Content', 'Long text, quotes, code and media'],
  ['Chat', 'Conversations with people or an assistant'],
  ['Page patterns', 'How components combine into a page'],
  ['Marketing', 'Product, pricing and landing pages in front of an app'],
  ['Motion', 'Recipes for things that move'],
  ['Microinteractions', 'Small responses that make controls feel alive'],
  ['Charts', 'Showing numbers as pictures'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Inline markup in spec text: `code`, **bold**, [label](slug-or-url)
const inline = (s, link) => esc(s)
  .replace(/`([^`]+)`/g, '<code class="code">$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `<a class="link" href="${link(h)}">${t}</a>`);
const endDot = (t) => (/[.!?)]$/.test(String(t).trim()) ? String(t).trim() : `${String(t).trim()}.`);
const mdInline = (s, link) => String(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `[${t}](${link(h)})`);

// ---------- load and check ----------
const CHECK = process.argv.includes('--check');
const PREVIEW = process.argv.includes('--preview'); // build even with links to specs that do not exist yet
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const files = readdirSync(specDir).filter((f) => f.endsWith('.mjs') && !f.startsWith('_')).sort();
const specs = [];
for (const f of files) {
  const m = await import(pathToFileURL(join(specDir, f)).href + `?t=${Date.now()}`);
  const s = m.default;
  s.slug ??= f.replace(/\.mjs$/, '');
  specs.push(s);
}
const bySlug = new Map(specs.map((s) => [s.slug, s]));
const css = readFileSync(join(root, 'css/components.css'), 'utf8');
const icons = new Set(Object.keys(JSON.parse(readFileSync(join(root, 'icons/icons.json'), 'utf8')).icons));
const cssClasses = new Set([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]));
// Hooks js/lds.js looks up by class (block__part, block--variant) count as part of the system too
const jsSrc = readFileSync(join(root, 'js/lds.js'), 'utf8');
for (const m of jsSrc.matchAll(/[.'"`\s]([a-z][a-z0-9-]*?(?:__[a-z0-9-]+|--[a-z0-9-]+)+)/g)) cssClasses.add(m[1]);
const problems = [];
const ALLOWED_EXTRA = new Set(['lds', 'docs-demo', 'docs-row', 'docs-col', 'docs-phone', 'docs-scroll', 'docs-box', 'docs-note']);
const warnings = [];
for (const s of specs) {
  if (only.length && !only.includes(s.slug)) continue;
  const where = `docs/spec/${s.slug}.mjs`;
  for (const k of ['title', 'group', 'summary', 'when', 'examples']) if (!s[k] || (Array.isArray(s[k]) && !s[k].length)) problems.push(`${where}: missing ${k}`);
  if (!GROUPS.some(([g]) => g === s.group)) problems.push(`${where}: unknown group "${s.group}"`);
  for (const r of [...(s.related || []), ...(s.whenNot || []).map((w) => w[1]).filter(Boolean)]) if (!bySlug.has(r)) (CHECK || PREVIEW ? warnings : problems).push(`${where}: links to missing spec "${r}"`);
  for (const t of [s.summary, ...(s.when || []), ...(s.motion || []), ...(s.a11y || []), ...(s.do || []), ...(s.dont || []), s.where || '', s.js || '', ...(s.anatomy || []).map((a) => a[1]), ...(s.states || []).map((a) => a[1]), ...(s.variants || []).map((a) => a[1])])
    for (const m of String(t).matchAll(/\]\(([a-z0-9-]+)\)/g)) if (!bySlug.has(m[1])) (CHECK || PREVIEW ? warnings : problems).push(`${where}: text links to missing spec "${m[1]}"`);
    if (/\u2014/.test(JSON.stringify(s))) problems.push(`${where}: contains an em dash`);
  for (const ex of s.examples || []) {
    const html = ex.html || '';
    for (const m of html.matchAll(/<span class="ic[^"]*"[^>]*>([a-z0-9_]+)<\/span>/g)) if (!icons.has(m[1])) problems.push(`${where}: icon "${m[1]}" is not in icons/icons.json`);
    for (const m of html.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(/\s+/)) if (c && !cssClasses.has(c) && !ALLOWED_EXTRA.has(c) && !c.startsWith('is-')) problems.push(`${where}: class "${c}" is not in css/components.css`);
  }
}
if (warnings.length) console.warn(`build-docs: ${warnings.length} warning(s)\n  ` + [...new Set(warnings)].join('\n  '));
if (problems.length) {
  console.error(`build-docs: ${problems.length} problem(s)\n  ` + [...new Set(problems)].join('\n  '));
  process.exit(1);
}

if (CHECK) { console.log(`build-docs --check: ${only.length || specs.length} spec(s) ok`); process.exit(0); }

// ---------- order ----------
const ordered = GROUPS.flatMap(([g]) => specs.filter((s) => s.group === g).sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title)));
const groupsWith = GROUPS.filter(([g]) => ordered.some((s) => s.group === g));

// ---------- HTML ----------
const linkHtml = (h) => (/^(https?:|#|\.|\/)/.test(h) ? h : `${h}.html`);
const nav = (current) => {
  const sections = groupsWith.map(([g], gi) => {
    const items = ordered.filter((s) => s.group === g);
    const open = current && current.group === g;
    const id = `nav-g${gi}`;
    return `<div class="shell__section">
        <button class="shell__section-btn" aria-expanded="${open}" aria-controls="${id}"><span class="shell__section-label">${esc(g)}</span><span class="shell__section-count">${items.length}</span><span class="ic" aria-hidden="true">expand_more</span></button>
        <div class="shell__panel${open ? ' is-open' : ''}" id="${id}"><div><div class="shell__children">
${items.map((s, i) => `          <a class="shell__link shell__link--child" href="${s.slug}.html"${current === s ? ' aria-current="page"' : ''}><span class="shell__num">${i + 1}</span><span class="shell__label">${esc(s.title)}</span>${s.status === 'new' ? '<span class="badge badge--accent shell__badge">New</span>' : ''}</a>`).join('\n')}
        </div></div></div>
      </div>`;
  }).join('\n      ');
  return `<aside class="shell__side" id="side" aria-label="Documentation">
    <a class="shell__brand" href="../index.html"><span class="page-head__mark">D</span>Lampung Design System</a>
    <nav class="shell__nav" aria-label="Components">
      <span class="shell__hl" aria-hidden="true"></span>
      <a class="shell__link" href="../index.html"><span class="ic" aria-hidden="true">home</span><span class="shell__label">Getting started</span></a>
      <a class="shell__link" href="index.html"${current ? '' : ' aria-current="page"'}><span class="ic" aria-hidden="true">grid_view</span><span class="shell__label">All components</span></a>
      <a class="shell__link" href="../examples/index.html"><span class="ic" aria-hidden="true">dashboard</span><span class="shell__label">Examples</span></a>
      <p class="shell__group">Components</p>
      ${sections}
    </nav>
    <div class="shell__foot">
      <div class="seg" role="group" aria-label="Appearance" data-lds-segmented>
        <span class="seg__thumb"></span>
        <button class="seg__btn" aria-pressed="true" data-lds-theme="light">Light</button>
        <button class="seg__btn" aria-pressed="false" data-lds-theme="dark">Dark</button>
      </div>
    </div>
  </aside>
  <script>(function(){try{var s=document.currentScript.previousElementSibling,ss=sessionStorage,v=ss.getItem('lds-shell-scroll');if(v!=null)s.scrollTop=+v;s.setAttribute('data-restored','');var n=s.querySelector('.shell__nav'),h=s.querySelector('.shell__hl'),c=n&&n.querySelector('[aria-current="page"]'),f=ss.getItem('lds-shell-from');ss.removeItem('lds-shell-from');if(!h||!c||c.closest('.shell__panel:not(.is-open)'))return;var put=function(e){h.style.height=e.offsetHeight+'px';h.style.transform='translateY('+e.offsetTop+'px)';},o=null;if(f){[].forEach.call(n.querySelectorAll('a[href]'),function(a){if(a.getAttribute('href')===f)o=a;});}h.style.transition='none';if(o&&!o.closest('.shell__panel:not(.is-open)')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){put(o);h.offsetWidth;h.style.transition='';requestAnimationFrame(function(){put(c);});}else put(c);n.classList.add('has-hl');}catch(e){}})();</script>`;
};
const frame = (title, current, body, outline = '') => `<!doctype html>
<html lang="en" class="lds" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)} · Lampung Design System</title>
<script>try { document.documentElement.setAttribute('data-theme', localStorage.getItem('lds-theme') || 'light'); } catch (e) {}</script>
<link rel="stylesheet" href="../../css/lds.css">
<link rel="stylesheet" href="../docs.css">
</head>
<body class="lds">
<a class="skip" href="#main">Skip to content</a>
<div class="shell" data-lds-shell>
  ${nav(current)}
  <div class="shell__scrim"></div>
  <div class="shell__main">
    <header class="shell__top">
      <button class="icon-btn" data-lds-shell-toggle aria-controls="side" aria-expanded="false" aria-label="Menu"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
      <span class="shell__toptitle">${esc(title)}</span>
      <span style="width: 44px;"></span>
    </header>
    <div class="cdoc">
      <main class="cdoc__main" id="main" tabindex="-1">
${body}
      </main>
      ${outline}
    </div>
  </div>
</div>
<script type="module">
  import { init, restoreTheme } from '../../js/lds.js';
  const mode = restoreTheme(document.documentElement, 'light');
  document.querySelectorAll('[data-lds-theme]').forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-lds-theme') === mode)));
  init();
  document.querySelectorAll('[data-code-toggle]').forEach((b) => b.addEventListener('click', () => {
    const box = document.getElementById(b.getAttribute('aria-controls'));
    const open = b.getAttribute('aria-expanded') !== 'true';
    b.setAttribute('aria-expanded', String(open)); box.classList.toggle('is-closed', !open); box.inert = !open;
  }));
  document.querySelectorAll('[data-replay]').forEach((b) => b.addEventListener('click', () => {
    const stage = document.getElementById(b.getAttribute('data-replay'));
    const tpl = document.getElementById(stage.id + '-tpl');
    stage.innerHTML = tpl.innerHTML; init(stage);
  }));
</script>
</body>
</html>
`;

const list = (items, link) => `<ul class="cdoc__list">${items.map((t) => `<li>${inline(t, link)}</li>`).join('')}</ul>`;
const table = (head, rows, link) => `<div class="table-box"><table class="table table--wrap"><thead><tr>${head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<code class="code">${esc(c)}</code>` : inline(c, link)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const dedent = (s) => { const t = String(s).replace(/^\n+|\s+$/g, ''); const m = Math.min(...t.split('\n').filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length)); return t.split('\n').map((l) => l.slice(m)).join('\n'); };

function page(s, i) {
  const link = linkHtml;
  const prev = ordered[i - 1], next = ordered[i + 1];
  const secs = [];
  const sec = (id, title, html) => secs.push({ id, title, html: `<section class="cdoc__sec" id="${id}"><h2>${esc(title)}</h2>${html}</section>` });

  const usage = [`<p class="cdoc__p"><strong>Use it when</strong></p>`, list(s.when, link)];
  if (s.whenNot?.length) usage.push(`<p class="cdoc__p"><strong>Use something else when</strong></p>`, list(s.whenNot.map(([why, slug, extra]) => `${why}: use [${bySlug.get(slug)?.title || slug}](${slug})${extra ? `. ${endDot(extra)}` : '.'}`), link));
  if (s.where) usage.push(`<p class="cdoc__p"><strong>Where it goes.</strong> ${inline(s.where, link)}</p>`);
  sec('usage', 'Usage', usage.join(''));

  sec('examples', 'Examples', s.examples.map((ex, k) => {
    const id = `ex-${k + 1}`;
    const code = esc(dedent(ex.code || ex.html));
    return `<figure class="cdoc__ex" id="${id}">
          <figcaption><span class="cdoc__ex-t">${esc(ex.title)}</span>${ex.desc ? `<span class="cdoc__ex-d">${inline(ex.desc, link)}</span>` : ''}</figcaption>
          <div class="cdoc__stage${ex.stage ? ` cdoc__stage--${ex.stage}` : ''}" id="${id}-stage"${ex.height ? ` style="min-height: ${ex.height}px;"` : ''}>${ex.html}</div>
          ${ex.replay ? `<template id="${id}-stage-tpl">${ex.html}</template>` : ''}
          <div class="cdoc__bar">
            <button class="btn btn--plain btn--sm" data-code-toggle aria-expanded="false" aria-controls="${id}-code"><span class="ic ic--sm" aria-hidden="true">code</span>Code</button>
            ${ex.replay ? `<button class="btn btn--plain btn--sm" data-replay="${id}-stage"><span class="ic ic--sm" aria-hidden="true">refresh</span>Replay</button>` : ''}
            <button class="btn btn--plain btn--sm" data-lds-copy="${code}"><span class="ic ic--sm" aria-hidden="true">content_copy</span><span data-lds-copy-label="Copied">Copy</span></button>
          </div>
          <div class="collapse is-closed" id="${id}-code" inert><div><div class="codeblock"><pre>${code}</pre></div></div></div>
        </figure>`;
  }).join('\n'));

  if (s.anatomy?.length) sec('anatomy', 'Anatomy', table(['Part', 'What it is'], s.anatomy, link));
  if (s.variants?.length) sec('variants', 'Variants and sizes', table(['Class or attribute', 'When'], s.variants, link));
  if (s.states?.length) sec('states', 'States', table(['State', 'How'], s.states, link));
  if (s.motion?.length) sec('motion', 'Motion and microinteractions', list(s.motion, link));
  if (s.a11y?.length) sec('a11y', 'Accessibility', list(s.a11y, link));
  if (s.do?.length || s.dont?.length) sec('practices', 'Do and don\'t', `<div class="cdoc__dd"><div class="cdoc__do"><p class="cdoc__dd-h"><span class="ic ic--fill" aria-hidden="true">check_circle</span>Do</p>${list(s.do || [], link)}</div><div class="cdoc__dont"><p class="cdoc__dd-h"><span class="ic ic--fill" aria-hidden="true">cancel</span>Don't</p>${list(s.dont || [], link)}</div></div>`);
  if (s.js || s.react) {
    let h = '';
    if (s.js) h += `<p class="cdoc__p"><strong>Plain HTML.</strong> ${inline(s.js, link)}</p>`;
    if (s.react) h += `<p class="cdoc__p"><strong>React.</strong> From <code class="code">lampung-design-system/react</code>.</p><div class="codeblock"><pre>${esc(dedent(s.react))}</pre></div>`;
    sec('code', 'Behavior and code', h);
  }
  if (s.related?.length) sec('related', 'Related', `<div class="link-grid">${s.related.filter((r) => bySlug.has(r)).map((r) => { const o = bySlug.get(r); return `<a class="link-card" href="${r}.html"><span class="link-card__eyebrow">${esc(o.group)}</span><span class="link-card__title">${esc(o.title)}</span><span class="link-card__body">${esc(o.summary)}</span></a>`; }).join('')}</div>`);

  const body = `        <header class="cdoc__head">
          <nav aria-label="Breadcrumb"><ol class="crumbs"><li><a href="index.html">Components</a></li><li><span class="ic" aria-hidden="true">chevron_right</span></li><li><a href="index.html#${encodeURIComponent(s.group)}">${esc(s.group)}</a></li></ol></nav>
          <h1>${esc(s.title)}${s.status === 'new' ? ' <span class="badge badge--accent">New</span>' : ''}</h1>
          <p class="cdoc__lede">${inline(s.summary, link)}</p>
        </header>
        ${secs.map((x) => x.html).join('\n        ')}
        <nav class="cdoc__pager" aria-label="Previous and next component">
          ${prev ? `<a class="link-card cdoc__prev" href="${prev.slug}.html"><span class="link-card__eyebrow"><span class="ic ic--sm" aria-hidden="true">arrow_back_ios_new</span>Previous</span><span class="link-card__title">${esc(prev.title)}</span></a>` : '<span></span>'}
          ${next ? `<a class="link-card cdoc__next" href="${next.slug}.html"><span class="link-card__eyebrow">Next<span class="ic ic--sm" aria-hidden="true">arrow_forward</span></span><span class="link-card__title">${esc(next.title)}</span></a>` : '<span></span>'}
        </nav>`;
  const outline = `<nav class="toc cdoc__toc" data-lds-toc aria-label="On this page"><span class="toc__ink" aria-hidden="true"></span>${secs.map((x) => `<a href="#${x.id}">${esc(x.title)}</a>`).join('')}</nav>`;
  return frame(s.title, s, body, outline);
}

function indexPage() {
  const body = `        <header class="cdoc__head">
          <h1>Components</h1>
          <p class="cdoc__lede">${ordered.length} components and recipes. Each page says when to use it, when to use something else, the markup, its motion and its accessibility. Start here before building anything new: if a need is covered, use that component; if it is not, add a component to the system instead of styling one page. To see them working together, open the <a class="link" href="../examples/index.html">examples</a>: a landing page, an admin dashboard and phone apps.</p>
        </header>
        ${groupsWith.map(([g, d]) => `<section class="cdoc__sec" id="${encodeURIComponent(g)}"><h2>${esc(g)}</h2><p class="cdoc__p">${esc(d)}</p><div class="link-grid">${ordered.filter((s) => s.group === g).map((s) => `<a class="link-card" href="${s.slug}.html"><span class="link-card__title">${esc(s.title)}${s.status === 'new' ? ' <span class="badge badge--accent">New</span>' : ''}</span><span class="link-card__body">${esc(s.summary)}</span></a>`).join('')}</div></section>`).join('\n        ')}`;
  return frame('Components', null, body);
}

// ---------- Markdown for the skill ----------
function md(s) {
  const link = (h) => (/^(https?:|#|\.|\/)/.test(h) ? h : `${h}.md`);
  const L = [];
  L.push(`# ${s.title}`, '', `Group: ${s.group}${s.status === 'new' ? ' (new)' : ''}. Docs page: \`docs/components/${s.slug}.html\`.`, '', mdInline(s.summary, link), '');
  L.push('## Use it when', ...s.when.map((w) => `- ${mdInline(w, link)}`), '');
  if (s.whenNot?.length) L.push('## Use something else when', ...s.whenNot.map(([why, slug, extra]) => `- ${mdInline(why, link)}: use [${bySlug.get(slug)?.title || slug}](${slug}.md)${extra ? `. ${mdInline(endDot(extra), link)}` : '.'}`), '');
  if (s.where) L.push('## Where it goes', mdInline(s.where, link), '');
  if (s.anatomy?.length) L.push('## Anatomy', '| Part | What it is |', '|---|---|', ...s.anatomy.map(([a, b]) => `| \`${a}\` | ${mdInline(b, link)} |`), '');
  L.push('## Markup');
  for (const ex of s.examples) L.push('', `**${ex.title}.**${ex.desc ? ` ${mdInline(ex.desc, link)}` : ''}`, '```html', dedent(ex.code || ex.html), '```');
  L.push('');
  if (s.variants?.length) L.push('## Variants and sizes', '| Class or attribute | When |', '|---|---|', ...s.variants.map(([a, b]) => `| \`${a}\` | ${mdInline(b, link)} |`), '');
  if (s.states?.length) L.push('## States', '| State | How |', '|---|---|', ...s.states.map(([a, b]) => `| \`${a}\` | ${mdInline(b, link)} |`), '');
  if (s.motion?.length) L.push('## Motion and microinteractions', ...s.motion.map((w) => `- ${mdInline(w, link)}`), '');
  if (s.a11y?.length) L.push('## Accessibility', ...s.a11y.map((w) => `- ${mdInline(w, link)}`), '');
  if (s.do?.length) L.push('## Do', ...s.do.map((w) => `- ${mdInline(w, link)}`), '');
  if (s.dont?.length) L.push('## Don\'t', ...s.dont.map((w) => `- ${mdInline(w, link)}`), '');
  if (s.js) L.push('## Behavior (plain HTML)', mdInline(s.js, link), '');
  if (s.react) L.push('## React', '```tsx', dedent(s.react), '```', '');
  if (s.related?.length) L.push('## Related', s.related.map((r) => `[${bySlug.get(r)?.title || r}](${r}.md)`).join(' · '), '');
  return L.join('\n');
}

function indexMd() {
  const pre = readFileSync(join(specDir, '_index-preamble.md'), 'utf8').trim();
  const L = [pre, '', '## Catalog', '', 'Read the file for a component before using it. Each one says when to use it, when to use something else, the markup, variants, states, motion and accessibility.', ''];
  for (const [g, d] of groupsWith) {
    L.push(`### ${g}`, d + '.', '', '| Component | Use it when | File |', '|---|---|---|');
    for (const s of ordered.filter((x) => x.group === g)) L.push(`| ${s.title}${s.status === 'new' ? ' (new)' : ''} | ${s.when[0].replace(/\|/g, '\\|').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')} | [components/${s.slug}.md](components/${s.slug}.md) |`);
    L.push('');
  }
  return L.join('\n');
}

// ---------- write ----------
for (const d of [outDir, skillDir]) { if (existsSync(d)) rmSync(d, { recursive: true }); mkdirSync(d, { recursive: true }); }
ordered.forEach((s, i) => {
  writeFileSync(join(outDir, `${s.slug}.html`), page(s, i));
  writeFileSync(join(skillDir, `${s.slug}.md`), md(s));
});
writeFileSync(join(outDir, 'index.html'), indexPage());
writeFileSync(join(root, 'skills/lampung-design-system/references/components.md'), indexMd());
console.log(`build-docs: ${ordered.length} components in ${groupsWith.length} groups`);
