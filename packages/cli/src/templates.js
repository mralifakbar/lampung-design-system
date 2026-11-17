// Files the CLI writes into projects.

export function providerSource({ ts, useClient }) {
  const props = ts ? `{ theme = 'light' }: { theme?: ThemeMode }` : `{ theme = 'light' }`;
  return `${useClient ? "'use client';\n\n" : ''}// Lampung Design System behaviors for React. Written by lampung-ds init.
// Restores the saved theme and wires every [data-lds-*] element, including markup rendered later.
import { useEffect } from 'react';
import { init, restoreTheme${ts ? ', type ThemeMode' : ''} } from 'lampung-design-system/js';

// init() adds attributes and nodes to [data-lds-*] markup. On a server-rendered page, touching that
// markup before React has hydrated it makes React throw a hydration mismatch, so every run waits
// until the browser is idle, which is after hydration work has finished. The timeout still runs it
// in a background tab, where idle callbacks are held back.
const whenIdle = (fn${ts ? ': () => void' : ''}) =>
  typeof requestIdleCallback === 'function' ? requestIdleCallback(fn, { timeout: 2000 }) : window.setTimeout(fn, 200);
const cancelIdle = (id${ts ? ': number' : ''}) =>
  typeof cancelIdleCallback === 'function' ? cancelIdleCallback(id) : window.clearTimeout(id);

export function LdsProvider(${props}) {
  useEffect(() => {
    restoreTheme(document.documentElement, theme);
    let pending = 0;
    const run = () => {
      pending = 0;
      init();
    };
    pending = whenIdle(run);
    // New elements get wired on the next idle run. A run already waiting covers them, and text-only
    // changes (timers, counters) never need one.
    const observer = new MutationObserver((records) => {
      if (pending) return;
      if (!records.some((r) => Array.from(r.addedNodes).some((n) => n.nodeType === 1))) return;
      pending = whenIdle(run);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (pending) cancelIdle(pending);
    };
  }, [theme]);
  return null;
}
`;
}

/** Inline script for <head>: applies the saved theme before first paint. */
export const themeScript = (theme, attrs = '') =>
  `<script${attrs}>try{document.documentElement.setAttribute('data-theme',localStorage.getItem('lds-theme')||'${theme}')}catch(e){}</script>`;

export const THEME_MARKER = "localStorage.getItem('lds-theme')";

export const behaviorScript = (theme, src = 'lampung-design-system/js', extra = '') => `<script type="module">
  import { init, restoreTheme } from '${src}';
  restoreTheme(document.documentElement, '${theme}');
  init();${extra}
</script>`;

export const astroScript = (theme) => `<script>
  import { init, restoreTheme } from 'lampung-design-system/js';
  restoreTheme(document.documentElement, '${theme}');
  init();
  document.addEventListener('astro:page-load', () => init());
</script>`;

export const laravelJs = (theme) => `
import { init, restoreTheme } from 'lampung-design-system/js';

restoreTheme(document.documentElement, '${theme}');
init();
`;

export function starterHtml({ theme, lang }) {
  const id = lang === 'id';
  const text = id
    ? {
        title: 'Layanan Kota Contoh',
        h1: 'Ajukan izin usaha secara daring',
        p: 'Halaman awal dari Lampung Design System. Isi formulir, lalu kirim. Data di halaman ini hanya contoh.',
        label: 'Nama usaha',
        help: 'Tulis sesuai akta atau NIB.',
        button: 'Kirim pengajuan',
        theme: 'Ganti tema',
      }
    : {
        title: 'Sample City Services',
        h1: 'Apply for a business permit online',
        p: 'A starter page from Lampung Design System. Fill in the form, then send it. The data on this page is an example.',
        label: 'Business name',
        help: 'Write it as it appears on your registration.',
        button: 'Send application',
        theme: 'Switch theme',
      };
  return `<!doctype html>
<html lang="${id ? 'id' : 'en'}" class="lds" data-theme="${theme}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${text.title}</title>
  ${themeScript(theme)}
  <link rel="stylesheet" href="lds/css/lds.css">
</head>
<body>
  <main style="max-width: 560px; margin: 0 auto; padding: 48px 16px; display: flex; flex-direction: column; gap: 24px;">
    <h1 style="font: var(--type-title-1); color: var(--text-strong);">${text.h1}</h1>
    <p style="color: var(--text-muted);">${text.p}</p>
    <form class="form" onsubmit="event.preventDefault()">
      <div class="field">
        <label class="field__label" for="business">${text.label}</label>
        <div class="control"><input id="business" name="business" autocomplete="organization"></div>
        <span class="field__help">${text.help}</span>
      </div>
      <div class="form__actions">
        <button class="btn btn--primary" type="submit">${text.button}</button>
      </div>
    </form>
  </main>
  ${behaviorScript(theme, './lds/js/lds.js').split('\n').join('\n  ')}
</body>
</html>
`;
}

export function nextDocument({ theme }) {
  return `import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="lds" data-theme="${theme}" suppressHydrationWarning>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
`;
}

export const flutterSnippet = (theme) => `import 'package:lampung_design_system/lampung_design_system.dart';

MaterialApp(
  theme: LdsTheme.light(),
  darkTheme: LdsTheme.dark(),
  themeMode: ThemeMode.${theme},
  // ...
);`;
