import { join, resolve, relative, sep } from 'node:path';
import { readdirSync } from 'node:fs';
import { Plan } from './plan.js';
import { TEMPLATES, LABELS, REACT, detectFramework, detectTypescript, detectPm, installArgs } from './detect.js';
import { ADAPTERS } from './frameworks.js';
import { addCssImport, patchHtmlTag, insertBeforeClose, upsertBlock } from './edit.js';
import { starterHtml, themeScript, THEME_MARKER, behaviorScript } from './templates.js';
import { select } from './prompt.js';
import { CORE, CDN, VERSION, findPackageDir, readJson, readText, isDir, allDeps, c, commandString } from './util.js';

export class UserError extends Error {}

export const THEMES = ['light', 'dark', 'system'];
export const PMS = ['npm', 'pnpm', 'yarn', 'bun'];

/** Defaults for lds.json per framework. */
export function configDefaults(framework, cwd, lang) {
  const loc = ADAPTERS[framework]?.locate(cwd) || {};
  return {
    framework,
    typescript: detectTypescript(cwd, framework),
    css: loc.css || null,
    componentsDir: framework === 'html' || framework === 'flutter' ? null : loc.componentsDir || 'src/components/lds',
    snippetsDir: 'lds/snippets',
    theme: 'light',
    lang,
  };
}

export async function resolveFramework(cwd, opts, io, existing = {}) {
  const { t } = io;
  let framework = opts.template || existing.framework || detectFramework(cwd);
  if (framework && !TEMPLATES.includes(framework)) throw new UserError(t('unknownTemplate', { name: framework, list: TEMPLATES.join(', ') }));
  if (!framework) {
    if (opts.yes || !io.stdin || typeof io.stdin.on !== 'function') throw new UserError(t('cannotDetect'));
    framework = await select(
      t('pickFramework'),
      TEMPLATES.map((v) => ({ value: v, label: LABELS[v] })),
      { hint: t('pickHint'), numberPrompt: t('pickNumber'), input: io.stdin, output: io.stdout },
    );
    if (!framework) throw new UserError(t('cannotDetect'));
  }
  return framework;
}

function listFiles(dir, base = dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...listFiles(p, base));
    else if (e.isFile()) out.push(relative(base, p).split(sep).join('/'));
  }
  return out.sort();
}

const VENDOR_DIRS = ['css', 'js', 'fonts', 'aksara'];

async function vendorHtml(ctx) {
  const { cwd, plan, t, theme, lang, io } = ctx;
  const pkgDir = findPackageDir(cwd, io.env);
  const version = (pkgDir && readJson(join(pkgDir, 'package.json'))?.version) || VERSION;
  if (pkgDir) {
    for (const d of VENDOR_DIRS) {
      if (!isDir(join(pkgDir, d))) continue;
      for (const f of listFiles(join(pkgDir, d))) plan.copy(join(pkgDir, d, f), `lds/${d}/${f}`, t('noteVendor', { from: `${CORE}/${d}` }), `lds/${d}/`);
    }
  } else {
    const base = `${CDN}/${CORE}@${VERSION}`;
    if (plan.dryRun) {
      for (const d of VENDOR_DIRS) plan.note(`${base}/${d}/ -> lds/${d}/`);
    } else {
      io.log(t('downloading', { version: VERSION }));
      try {
        const res = await fetch(`https://data.jsdelivr.com/v1/packages/npm/${CORE}@${VERSION}?structure=flat`);
        if (!res.ok) throw new Error(`${res.status}`);
        const { files = [] } = await res.json();
        const wanted = files.map((f) => f.name.replace(/^\//, '')).filter((n) => VENDOR_DIRS.some((d) => n.startsWith(`${d}/`)));
        for (const name of wanted) {
          const r = await fetch(`${base}/${name}`);
          if (!r.ok) throw new Error(`${r.status} ${name}`);
          plan.writeBuffer(`lds/${name}`, Buffer.from(await r.arrayBuffer()), t('noteVendor', { from: 'jsDelivr' }), `lds/${name.split('/')[0]}/`);
        }
        if (!wanted.length) throw new Error('empty package listing');
      } catch (e) {
        throw new UserError(t('vendorMissing', { reason: e.message }));
      }
    }
  }
  if (pkgDir || !plan.dryRun) plan.write('lds/VERSION', `${version}\n`, t('noteVendor', { from: CORE }));
  const page = 'index.html';
  if (!plan.exists(page)) plan.write(page, starterHtml({ theme, lang }), t('noteStarter'));
  else
    plan.edit(
      page,
      (s) => {
        let out = patchHtmlTag(s, { theme }) ?? s;
        out = insertBeforeClose(out, 'head', themeScript(theme), { marker: THEME_MARKER }) ?? out;
        out = insertBeforeClose(out, 'head', '<link rel="stylesheet" href="lds/css/lds.css">', { marker: 'lds/css/lds.css' }) ?? out;
        out = insertBeforeClose(out, 'body', behaviorScript(theme, './lds/js/lds.js'), { marker: 'lds/js/lds.js' }) ?? out;
        return out;
      },
      `${t('noteHtmlClass')}, ${t('noteCssImport')}, ${t('noteBehaviors')}`,
    );
  return { css: 'lds/css/lds.css', componentsDir: null };
}

const SHADCN_START = '/* lds-shadcn:start (lampung-ds init --shadcn) */';
const SHADCN_END = '/* lds-shadcn:end */';

/** Merges dist/shadcn/globals.css into the project's global CSS: imports on top, the rest in a marked block. */
export function mergeShadcn(css, theme) {
  const lines = theme.split('\n');
  const imports = lines.filter((l) => /^@import\b/.test(l.trim()));
  const variant = lines.find((l) => /^@custom-variant\s+dark\b/.test(l.trim()));
  let body = lines.filter((l) => !/^@import\b/.test(l.trim()) && l !== variant).join('\n');
  body = body.replace(/^\s*\/\*[\s\S]*?\*\/\s*/, '');
  let out = css;
  // imports: the font URL first, the rest after the existing imports
  const missing = imports.filter((l) => !out.includes(l.trim().replace(/;$/, '')));
  if (missing.length) {
    const urlImports = missing.filter((l) => /url\(/.test(l));
    const other = missing.filter((l) => !/url\(/.test(l));
    if (other.length) {
      const m = [...out.matchAll(/^@import[^\n]*\n/gm)].pop();
      const at = m ? m.index + m[0].length : 0;
      out = `${out.slice(0, at)}${other.join('\n')}\n${out.slice(at)}`;
    }
    if (urlImports.length) out = `${urlImports.join('\n')}\n${out}`;
  }
  if (variant) {
    if (/^@custom-variant\s+dark\b[^\n]*$/m.test(out)) out = out.replace(/^@custom-variant\s+dark\b[^\n]*$/m, variant.trim());
    else {
      const m = [...out.matchAll(/^@import[^\n]*\n/gm)].pop();
      const at = m ? m.index + m[0].length : 0;
      out = `${out.slice(0, at)}\n${variant.trim()}\n${out.slice(at)}`;
    }
  }
  return upsertBlock(out, SHADCN_START, SHADCN_END, body);
}

export async function init(opts, io) {
  const { t } = io;
  const cwd = resolve(opts.cwd || '.');
  if (!isDir(cwd)) throw new UserError(t('noCwd', { dir: cwd }));
  if (opts.theme && !THEMES.includes(opts.theme)) throw new UserError(t('unknownTheme', { name: opts.theme }));
  if (opts.pm && !PMS.includes(opts.pm)) throw new UserError(t('unknownPm', { name: opts.pm }));
  const existing = readJson(join(cwd, 'lds.json')) || {};
  const framework = await resolveFramework(cwd, opts, io, opts.template ? {} : existing);
  const theme = opts.theme || existing.theme || 'light';
  const lang = existing.lang || io.lang;
  const ts = detectTypescript(cwd, framework);
  const pm = opts.pm || detectPm(cwd, io.env);
  const plan = new Plan(cwd, { dryRun: opts.dryRun });
  const ctx = { cwd, plan, t, theme, ts, pm, lang, opts, io };

  io.log(c.bold(t('detected', { name: LABELS[framework], ts: ts ? t('typescript') : '' })));

  if (framework !== 'flutter' && framework !== 'html') {
    const pkg = readJson(join(cwd, 'package.json'));
    if (!pkg) throw new UserError(t('noPackageJson', { dir: cwd }));
    const installed = allDeps(pkg)[CORE] && findPackageDir(cwd, io.env);
    if (opts.install && !installed) plan.command(...installArgs(pm, [CORE]), t('installNote'));
  }
  if (framework === 'flutter') ADAPTERS.flutter.setup(ctx);

  // Commands first, so the steps below can read the installed package.
  if (!opts.dryRun && plan.commands.length) {
    for (const k of plan.commands) io.log(`${c.cyan('$')} ${commandString(k.cmd, k.args)}`);
    const failed = plan.runCommands();
    if (failed) throw new UserError(t('installFailed', { cmd: commandString(failed.cmd, failed.args) }));
    plan.commands = [];
  }

  let result;
  if (framework === 'html') result = await vendorHtml(ctx);
  else if (framework === 'flutter') result = { css: null, componentsDir: null };
  else result = ADAPTERS[framework].setup(ctx);

  if (opts.shadcn && framework !== 'flutter' && framework !== 'html') {
    const pkgDir = findPackageDir(cwd, io.env);
    const theme = pkgDir && readText(join(pkgDir, 'dist/shadcn/globals.css'));
    const target = result.css && result.css.endsWith('.css') ? result.css : null;
    if (!theme) plan.note(t('shadcnMissing'));
    else if (!target) plan.note(t('manualCss'));
    else plan.edit(target, (s) => mergeShadcn(addCssImport(s), theme), t('noteShadcn'));
  }

  const defaults = configDefaults(framework, cwd, lang);
  const config = {
    ...defaults,
    ...existing,
    framework,
    typescript: ts,
    theme,
    ...(result.css ? { css: existing.css || result.css } : {}),
    ...(result.componentsDir && !existing.componentsDir ? { componentsDir: result.componentsDir } : {}),
  };
  const ordered = Object.fromEntries(['framework', 'typescript', 'css', 'componentsDir', 'snippetsDir', 'theme', 'lang'].map((k) => [k, config[k] ?? null]));
  for (const k of Object.keys(config)) if (!(k in ordered)) ordered[k] = config[k];
  plan.write('lds.json', `${JSON.stringify(ordered, null, 2)}\n`, t('noteConfig'));

  if (opts.dryRun) {
    io.log(t('dryRun'));
    for (const l of plan.describe(t)) io.log(l);
    for (const n of plan.notes) io.log(`${c.dim('-')} ${n}`);
    return { plan, framework, changed: 0 };
  }
  if (!plan.files.size) {
    io.log(c.green(t('nothing')));
    return { plan, framework, changed: 0 };
  }
  const lines = plan.describe(t);
  plan.applyFiles();
  io.log(t('applying'));
  for (const l of lines) io.log(l);
  for (const n of plan.notes) io.log(`${c.dim('-')} ${n}`);
  io.log(c.green(t('done', { count: plan.files.size })));
  if (REACT.has(framework) || framework === 'astro' || framework === 'laravel' || framework === 'html') io.log(t('nextSteps'));
  return { plan, framework, changed: plan.files.size };
}

