// One adapter per template. locate() finds the files LDS touches; setup() records the edits on a Plan.
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { firstExisting, importPath, readText } from './util.js';
import { nextRouter } from './detect.js';
import {
  addCssImport,
  isViteStarterCss,
  CSS_IMPORT,
  addJsImport,
  importLine,
  patchHtmlTag,
  insertAfterOpenTag,
  insertBeforeClose,
  mountBesideApp,
  mountBesideComponent,
  matchParen,
  CSS_SPEC,
  JS_SPEC,
} from './edit.js';
import { providerSource, themeScript, THEME_MARKER, astroScript, laravelJs, nextDocument, flutterSnippet } from './templates.js';

const ext = (ts) => (ts ? 'tsx' : 'jsx');
const scriptExts = (base) => ['tsx', 'jsx', 'ts', 'js'].map((e) => `${base}.${e}`);
const CSS_JS_IMPORT = "import 'lampung-design-system/css';";
const providerTag = (theme) => `<LdsProvider theme="${theme}" />`;

/** Shared React steps: stylesheet, provider file, provider import and mount, html class. */
function reactSetup(ctx, { css, layout, layoutHtml = layout, providerFile, mount, useClient = false, hydration = true }) {
  const { plan, t, theme, ts } = ctx;
  // Stylesheet: first line of the global CSS, else a side-effect import in the entry/layout
  if (css && isViteStarterCss(plan.read(css) ?? '')) plan.write(css, `${CSS_IMPORT}\n`, t('noteCssStarter'));
  else if (css) plan.edit(css, addCssImport, t('noteCssImport'));
  else if (layout) plan.edit(layout, (s) => addJsImport(s, importLine(s, '', CSS_SPEC), { marker: CSS_SPEC, beforeCss: true }), t('noteCssImport'));
  else plan.note(t('manualCss'));
  // <html class="lds" data-theme>
  if (layoutHtml) {
    const before = plan.read(layoutHtml);
    const after = before === null ? null : patchHtmlTag(before, { jsx: /\.[jt]sx?$/.test(layoutHtml), theme, hydration, tag: /_document\.[jt]sx?$/.test(layoutHtml) ? 'Html' : 'html' });
    if (after === null) plan.note(t('manualHtml', { theme }));
    else plan.write(layoutHtml, after, t('noteHtmlClass'));
  } else plan.note(t('manualHtml', { theme }));
  // Provider
  plan.write(providerFile, providerSource({ ts, useClient }), t('noteProvider'));
  if (!mount) return plan.note(t('manualProvider', { file: providerFile }));
  const spec = importPath(mount.file, providerFile);
  const ok = plan.edit(
    mount.file,
    (s) => {
      const withImport = addJsImport(s, importLine(s, '{ LdsProvider }', spec), { marker: 'LdsProvider' });
      if (withImport === s && s.includes('<LdsProvider')) return s;
      const mounted = mount.fn(withImport);
      return mounted === null ? undefined : mounted;
    },
    t('noteMountProvider'),
  );
  const now = plan.read(mount.file) || '';
  if (!ok && !now.includes('<LdsProvider')) plan.note(t('manualProvider', { file: providerFile }));
}

const afterBody = (theme) => (s) => insertAfterOpenTag(s, 'body', providerTag(theme), { marker: '<LdsProvider', jsx: true });

export const next = {
  locate(cwd) {
    const router = nextRouter(cwd);
    const src = existsSync(join(cwd, 'src/app')) || existsSync(join(cwd, 'src/pages')) ? 'src/' : '';
    if (router === 'pages') {
      const dir = `${src}pages`;
      return {
        router,
        css: firstExisting(cwd, [`${src}styles/globals.css`, 'styles/globals.css']),
        layout: firstExisting(cwd, scriptExts(`${dir}/_app`)),
        html: firstExisting(cwd, scriptExts(`${dir}/_document`)),
        dir,
        componentsDir: `${src}components/lds`,
      };
    }
    const dir = `${src}app`;
    const layout = firstExisting(cwd, scriptExts(`${dir}/layout`));
    return { router, css: firstExisting(cwd, [`${dir}/globals.css`]), layout, html: layout, dir, componentsDir: `${src}components/lds` };
  },
  setup(ctx) {
    const { cwd, plan, t, theme, ts } = ctx;
    const loc = this.locate(cwd);
    const base = loc.dir.startsWith('src/') ? 'src/' : '';
    const providerFile = `${base}components/lds-provider.${ext(ts)}`;
    if (loc.router === 'pages') {
      plan.note(t('pagesRouter'));
      let html = loc.html;
      if (!html) {
        html = `${loc.dir}/_document.${ext(ts)}`;
        plan.write(html, nextDocument({ theme }), t('noteHtmlClass'));
      }
      reactSetup(ctx, {
        css: loc.css,
        layout: loc.layout,
        layoutHtml: html,
        providerFile,
        mount: loc.layout && { file: loc.layout, fn: (s) => mountBesideComponent(s, providerTag(theme)) },
      });
    } else {
      reactSetup(ctx, {
        css: loc.css,
        layout: loc.layout,
        providerFile,
        useClient: true,
        mount: loc.layout && { file: loc.layout, fn: afterBody(theme) },
      });
    }
    return { css: loc.css || loc.layout, componentsDir: loc.componentsDir };
  },
};

export const vite = {
  locate(cwd) {
    return {
      css: firstExisting(cwd, ['src/index.css', 'src/styles.css', 'src/style.css', 'src/main.css', 'src/app.css', 'src/App.css']),
      layout: firstExisting(cwd, scriptExts('src/main')),
      html: firstExisting(cwd, ['index.html']),
      componentsDir: 'src/components/lds',
    };
  },
  setup(ctx) {
    const { cwd, plan, t, theme, ts } = ctx;
    const loc = this.locate(cwd);
    reactSetup(ctx, {
      css: loc.css,
      layout: loc.layout,
      layoutHtml: loc.html,
      hydration: false,
      providerFile: `src/components/lds-provider.${ext(ts)}`,
      mount: loc.layout && { file: loc.layout, fn: (s) => mountBesideApp(s, providerTag(theme)) },
    });
    if (loc.html) plan.edit(loc.html, (s) => insertBeforeClose(s, 'head', themeScript(theme), { marker: THEME_MARKER }) ?? s, t('noteThemeScript'));
    return { css: loc.css || loc.layout, componentsDir: loc.componentsDir };
  },
};

export const reactRouter = {
  locate(cwd) {
    const root = firstExisting(cwd, scriptExts('app/root'));
    return { css: firstExisting(cwd, ['app/app.css', 'app/root.css', 'app/styles.css']), layout: root, html: root, componentsDir: 'app/components/lds' };
  },
  setup(ctx) {
    const { cwd, theme, ts } = ctx;
    const loc = this.locate(cwd);
    reactSetup(ctx, {
      css: loc.css,
      layout: loc.layout,
      providerFile: `app/components/lds-provider.${ext(ts)}`,
      mount: loc.layout && { file: loc.layout, fn: afterBody(theme) },
    });
    return { css: loc.css || loc.layout, componentsDir: loc.componentsDir };
  },
};

export const start = {
  locate(cwd) {
    const root = firstExisting(cwd, [...scriptExts('src/routes/__root'), ...scriptExts('app/routes/__root')]);
    const base = root && root.startsWith('app/') ? 'app' : 'src';
    return {
      base,
      css: firstExisting(cwd, [`${base}/styles.css`, `${base}/styles/app.css`, `${base}/styles/globals.css`, `${base}/styles/global.css`, `${base}/app.css`]),
      layout: root,
      html: root,
      componentsDir: `${base}/components/lds`,
    };
  },
  setup(ctx) {
    const { cwd, theme, ts } = ctx;
    const loc = this.locate(cwd);
    reactSetup(ctx, {
      css: loc.css,
      layout: loc.layout,
      providerFile: `${loc.base}/components/lds-provider.${ext(ts)}`,
      mount: loc.layout && { file: loc.layout, fn: afterBody(theme) },
    });
    return { css: loc.css || loc.layout, componentsDir: loc.componentsDir };
  },
};

function astroLayout(cwd) {
  const candidates = [];
  for (const dir of ['src/layouts', 'src/components', 'src/pages']) {
    try {
      for (const f of readdirSync(join(cwd, dir)).sort()) if (f.endsWith('.astro')) candidates.push(`${dir}/${f}`);
    } catch {
      /* missing directory */
    }
  }
  const ranked = candidates.sort((a, b) => (/\/Layout\.astro$/.test(b) ? 1 : 0) - (/\/Layout\.astro$/.test(a) ? 1 : 0));
  return ranked.find((f) => /<html[\s>]/.test(readText(join(cwd, f)) || '')) || null;
}

export const astro = {
  locate(cwd) {
    const layout = astroLayout(cwd);
    return { css: firstExisting(cwd, ['src/styles/global.css', 'src/styles/globals.css', 'src/styles/app.css']), layout, html: layout, componentsDir: 'src/components/lds' };
  },
  setup(ctx) {
    const { cwd, plan, t, theme } = ctx;
    const loc = this.locate(cwd);
    if (loc.css) plan.edit(loc.css, addCssImport, t('noteCssImport'));
    if (!loc.layout) {
      if (!loc.css) plan.note(t('manualCss'));
      plan.note(t('manualHtml', { theme }));
      return { css: loc.css, componentsDir: loc.componentsDir };
    }
    plan.edit(
      loc.layout,
      (s) => {
        let out = s;
        if (!loc.css && !out.includes(CSS_SPEC)) {
          const fm = out.match(/^---[ \t]*\r?\n/);
          out = fm ? `${fm[0]}${CSS_JS_IMPORT}\n${out.slice(fm[0].length)}` : `---\n${CSS_JS_IMPORT}\n---\n\n${out}`;
        }
        out = patchHtmlTag(out, { theme }) ?? out;
        out = insertBeforeClose(out, 'head', themeScript(theme, ' is:inline'), { marker: THEME_MARKER }) ?? out;
        out = insertBeforeClose(out, 'body', astroScript(theme), { marker: JS_SPEC }) ?? out;
        return out;
      },
      loc.css ? `${t('noteHtmlClass')}, ${t('noteBehaviors')}` : `${t('noteCssImport')}, ${t('noteHtmlClass')}, ${t('noteBehaviors')}`,
    );
    plan.note(t('astroLayout', { file: loc.layout }));
    return { css: loc.css || loc.layout, componentsDir: loc.componentsDir };
  },
};

export const laravel = {
  locate(cwd) {
    const layout = firstExisting(cwd, [
      'resources/views/layouts/app.blade.php',
      'resources/views/components/layouts/app.blade.php',
      'resources/views/app.blade.php',
      'resources/views/layouts/guest.blade.php',
      'resources/views/welcome.blade.php',
    ]);
    return {
      css: firstExisting(cwd, ['resources/css/app.css']) || 'resources/css/app.css',
      js: firstExisting(cwd, ['resources/js/app.js', 'resources/js/app.ts', 'resources/js/app.tsx', 'resources/js/app.jsx']) || 'resources/js/app.js',
      layout,
      html: layout,
      componentsDir: 'resources/views/components/lds',
    };
  },
  setup(ctx) {
    const { cwd, plan, t, theme } = ctx;
    const loc = this.locate(cwd);
    plan.write(loc.css, addCssImport(plan.read(loc.css) ?? ''), t('noteCssImport'));
    const js = plan.read(loc.js) ?? '';
    if (!js.includes(JS_SPEC)) plan.write(loc.js, `${js.replace(/\s*$/, '')}${js.trim() ? '\n' : ''}${laravelJs(theme)}`.replace(/^\n/, ''), t('noteBehaviors'));
    if (loc.layout) {
      plan.edit(
        loc.layout,
        (s) => {
          let out = patchHtmlTag(s, { theme }) ?? s;
          out = insertBeforeClose(out, 'head', themeScript(theme), { marker: THEME_MARKER }) ?? out;
          if (!/@vite\s*\(/.test(out)) out = insertBeforeClose(out, 'head', `@vite(['${loc.css}', '${loc.js}'])`, { marker: '@vite' }) ?? out;
          return out;
        },
        t('noteHtmlClass'),
      );
    } else plan.note(t('manualHtml', { theme }));
    plan.note(t('laravelVite'));
    return { css: loc.css, componentsDir: loc.componentsDir };
  },
};

export const html = {
  locate(cwd) {
    return { css: 'lds/css/lds.css', layout: firstExisting(cwd, ['index.html']), html: firstExisting(cwd, ['index.html']), snippetsDir: 'lds/snippets' };
  },
  // Vendoring happens in init.js (it may need the network); this only wires the page.
  setup() {
    throw new Error('html setup runs from init.js');
  },
};

export const flutter = {
  locate(cwd) {
    return { css: null, layout: firstExisting(cwd, ['lib/main.dart']), html: null };
  },
  setup(ctx) {
    const { cwd, plan, t, theme, opts } = ctx;
    const pubspec = readText(join(cwd, 'pubspec.yaml')) || '';
    if (!/^\s+lampung_design_system\s*:/m.test(pubspec)) {
      if (opts.install) plan.command('flutter', ['pub', 'add', 'lampung_design_system'], t('noteFlutterPub'));
      else plan.note('flutter pub add lampung_design_system');
    }
    const main = 'lib/main.dart';
    const src = plan.read(main);
    if (src !== null && !src.includes('LdsTheme.')) {
      const patched = patchFlutterMain(src, theme);
      if (patched) plan.write(main, patched, t('noteFlutterTheme'));
      else plan.note(`${t('manualFlutter')}\n\n${flutterSnippet(theme)}`);
    } else if (src === null) plan.note(`${t('manualFlutter')}\n\n${flutterSnippet(theme)}`);
    plan.note(t('flutterFonts'));
    return { css: null, componentsDir: null };
  },
};

/**
 * Swaps the default template's ThemeData for LdsTheme. Returns null when main.dart is not the default.
 * Flutter 3.38+ writes `colorScheme: .fromSeed(...)` (dot shorthand); older templates `ColorScheme.fromSeed(...)`.
 */
export function patchFlutterMain(src, theme) {
  if (!/MaterialApp\(/.test(src) || !/colorScheme:\s*(?:ColorScheme)?\.fromSeed\(/.test(src)) return null;
  const at = src.search(/theme:\s*ThemeData\(/);
  if (at < 0) return null;
  const open = src.indexOf('(', at);
  const close = matchParen(src, open);
  if (close < 0) return null;
  let end = close + 1;
  if (src[end] === ',') end++;
  const indent = src.slice(src.lastIndexOf('\n', at) + 1, at);
  const repl = `theme: LdsTheme.light(),\n${indent}darkTheme: LdsTheme.dark(),\n${indent}themeMode: ThemeMode.${theme},`;
  let out = src.slice(0, at) + repl + src.slice(end);
  const imp = "import 'package:lampung_design_system/lampung_design_system.dart';";
  const m = out.match(/^import 'package:flutter\/material\.dart';[^\n]*\n/m);
  out = m ? out.slice(0, m.index + m[0].length) + imp + '\n' + out.slice(m.index + m[0].length) : `${imp}\n${out}`;
  return out;
}

export const ADAPTERS = { next, vite, start, 'react-router': reactRouter, astro, laravel, html, flutter };
