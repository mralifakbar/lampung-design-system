import { join, resolve } from 'node:path';
import { Plan } from './plan.js';
import { REACT, detectFramework } from './detect.js';
import { loadIndex, loadItem, suggest } from './registry.js';
import { htmlToJsx, htmlToAstro, htmlToBlade, cleanHtml, exampleMarkup } from './html.js';
import { configDefaults, UserError } from './init.js';
import { readJson, isDir, pascal, kebab, c } from './util.js';

const safeComment = (s) => String(s || '').replace(/\*\//g, '*\\/');
const safeHtmlComment = (s) => String(s || '').replace(/--+/g, '-');
const indent = (s, n) =>
  s
    .split('\n')
    .map((l) => (l.trim() ? ' '.repeat(n) + l : ''))
    .join('\n');

function examplesFor(item, lang) {
  return (item.examples && (item.examples[lang] || item.examples.en)) || [];
}

/** React: one file per component, one exported function per example. */
export function renderReact(item, { ts, lang }) {
  const used = new Set();
  let cssProperties = false;
  const parts = [];
  for (const ex of examplesFor(item, lang)) {
    let name = pascal(item.title) + pascal(ex.title);
    if (!/^[A-Z]/.test(name)) name = `Lds${name}`;
    let n = 2;
    while (used.has(name)) name = `${pascal(item.title)}${pascal(ex.title)}${n++}`;
    used.add(name);
    const { markup, usage } = exampleMarkup(ex);
    const out = htmlToJsx(markup, { ts });
    cssProperties ||= out.cssProperties;
    const doc = [`/**`, ` * ${safeComment(ex.title)}${ex.desc ? `: ${safeComment(ex.desc)}` : ''}`];
    if (usage) doc.push(' *', ' * Wiring:', ' * ```', ...safeComment(usage).split('\n').map((l) => ` * ${l}`.trimEnd()), ' * ```');
    doc.push(' */');
    const body = out.single ? indent(out.jsx, 4) : `    <>\n${indent(out.jsx, 6)}\n    </>`;
    parts.push(`${doc.join('\n')}\nexport function ${name}() {\n  return (\n${body}\n  );\n}\n`);
  }
  const head = [
    `// ${item.title}: markup from Lampung Design System (lampung-ds add ${item.slug}).`,
    `// Styles come from lampung-design-system/css; data-lds-* behaviors are wired by LdsProvider.`,
  ];
  if (item.react) {
    head.push(`// ${item.title} has a React binding in lampung-design-system/react (react/index.tsx).`);
    head.push(`// Use the binding when React owns the state:`);
    for (const l of String(item.reactUsage || '').split('\n')) head.push(`//   ${l}`.trimEnd());
  }
  const imports = ts && cssProperties ? `\nimport type { CSSProperties } from 'react';\n` : '';
  return `${head.join('\n')}\n${imports}\n${parts.join('\n')}`;
}

function astroFile(item, ex) {
  const { markup } = exampleMarkup(ex);
  return `---\n// ${item.title}: ${ex.title}. From Lampung Design System (lampung-ds add ${item.slug}).\n---\n${htmlToAstro(markup)}\n`;
}

function bladeFile(item, ex) {
  const { markup } = exampleMarkup(ex);
  return `{{-- ${item.title}: ${ex.title}. From Lampung Design System (lampung-ds add ${item.slug}). --}}\n${htmlToBlade(markup)}\n`;
}

function htmlSnippet(item, lang) {
  const blocks = examplesFor(item, lang).map((ex) => {
    const { markup } = exampleMarkup(ex);
    return `<!-- ${safeHtmlComment(ex.title)}${ex.desc ? `: ${safeHtmlComment(ex.desc)}` : ''} -->\n${cleanHtml(markup)}\n`;
  });
  return `<!-- ${item.title}: markup from Lampung Design System (lampung-ds add ${item.slug}). -->\n\n${blocks.join('\n')}`;
}

function uniqueNames(examples, fn) {
  const used = new Set();
  return examples.map((ex, i) => {
    let base = fn(ex.title) || `example-${i + 1}`;
    let name = base;
    let n = 2;
    while (used.has(name)) name = `${base}${fn === pascal ? n : `-${n}`}`, n++;
    used.add(name);
    return name;
  });
}

/** Files to write for one registry item: [{ path, content }]. */
export function renderItem(item, config) {
  const lang = config.lang === 'id' ? 'id' : 'en';
  const fw = config.framework;
  const examples = examplesFor(item, lang);
  if (REACT.has(fw)) {
    const ts = config.typescript !== false;
    return [{ path: `${config.componentsDir}/${item.slug}.${ts ? 'tsx' : 'jsx'}`, content: renderReact(item, { ts, lang }) }];
  }
  if (fw === 'astro') {
    const names = uniqueNames(examples, pascal);
    return examples.map((ex, i) => ({ path: `${config.componentsDir}/${item.slug}/${pascal(item.title)}${names[i]}.astro`, content: astroFile(item, ex) }));
  }
  if (fw === 'laravel') {
    const names = uniqueNames(examples, kebab);
    return examples.map((ex, i) => ({ path: `${config.componentsDir || 'resources/views/components/lds'}/${item.slug}/${names[i]}.blade.php`, content: bladeFile(item, ex) }));
  }
  return [{ path: `${config.snippetsDir || 'lds/snippets'}/${item.slug}.html`, content: htmlSnippet(item, lang) }];
}

export async function add(slugs, opts, io) {
  const { t } = io;
  const cwd = resolve(opts.cwd || '.');
  if (!isDir(cwd)) throw new UserError(t('noCwd', { dir: cwd }));
  let config = readJson(join(cwd, 'lds.json'));
  if (!config) {
    const fw = detectFramework(cwd) || (readJson(join(cwd, 'package.json')) ? null : 'html');
    if (!fw) throw new UserError(t('cannotDetect'));
    config = configDefaults(fw, cwd, io.lang);
    io.warn(t('addNoConfig', { name: fw }));
  }
  if (!config.lang) config.lang = io.lang;
  if (config.framework === 'flutter') {
    io.log(t('addFlutter'));
    return { written: 0 };
  }
  if (!opts.all && !slugs.length) throw new UserError(t('addUsage'));
  let index;
  try {
    index = await loadIndex(cwd, io.env);
  } catch (e) {
    throw new UserError(t('registryFail', { reason: e.message }));
  }
  const known = new Set(index.items.map((i) => i.slug));
  const wanted = opts.all ? index.items.map((i) => i.slug) : [...new Set(slugs.map((s) => s.toLowerCase()))];
  const unknown = wanted.filter((s) => !known.has(s));
  if (unknown.length) {
    const msgs = unknown.map((s) => {
      const near = suggest(s, index.items);
      return `${t('addUnknown', { name: s })}${near.length ? ` ${t('addDidYouMean', { list: near.join(', ') })}` : ''}`;
    });
    throw new UserError(msgs.join('\n'));
  }
  const plan = new Plan(cwd, { dryRun: opts.dryRun });
  const skipped = [];
  const bindings = [];
  for (const slug of wanted) {
    let item;
    try {
      item = await loadItem(cwd, slug, io.env);
    } catch (e) {
      throw new UserError(t('registryFail', { reason: e.message }));
    }
    for (const f of renderItem(item, config)) {
      if (plan.exists(f.path) && !opts.overwrite) {
        if (plan.read(f.path) !== f.content) skipped.push(f.path);
        continue;
      }
      plan.write(f.path, f.content, item.title);
    }
    if (item.react && REACT.has(config.framework)) bindings.push(item.title);
  }
  for (const s of skipped) io.log(c.yellow(t('addExists', { file: s })));
  if (opts.dryRun) {
    io.log(t('dryRun'));
    for (const l of plan.describe(t)) io.log(l);
    return { plan, written: 0 };
  }
  if (!plan.files.size) {
    io.log(t('addNothing'));
    return { plan, written: 0 };
  }
  const lines = plan.describe(t);
  plan.applyFiles();
  io.log(t('applying'));
  for (const l of lines) io.log(l);
  for (const b of bindings) io.log(`${c.dim('-')} ${t('addBinding', { title: b })}`);
  io.log(c.green(t('done', { count: plan.files.size })));
  return { plan, written: plan.files.size };
}
