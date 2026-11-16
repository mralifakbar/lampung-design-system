// Shared behavior of the Sakai Dasbor example pages: wires the system (init), the appearance menu, the
// palette actions, notifications, the "Pratinjau keadaan" menu, navigation progress and the Indonesian
// wording of text that js/lds.js generates in English. Pages import the helpers:
//   import { notify, delay, showState } from './dashboard.js';
import { init, setTheme, setRail, toast, closeLayer, navProgress, announce, morphText } from '../../../js/lds.js';

const html = document.documentElement;
const host = document.querySelector('.layer-host') || document.body;

/** A toast in the page's layer host (bottom center of the window). Same options as toast(). */
export const notify = (o) => toast({ container: host, ...o });
/** Resolves after ms; stands in for a request in the examples. */
export const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- Appearance ----------
const ICON = { light: 'light_mode', dark: 'dark_mode', system: 'desktop_windows' };
const MODE = { light: 'terang', dark: 'gelap', system: 'ikuti sistem' };
const syncTheme = () => {
  const mode = html.getAttribute('data-theme') || 'light';
  document.querySelectorAll('[data-lds-theme][role="menuitemradio"]').forEach((b) => {
    const on = b.getAttribute('data-lds-theme') === mode;
    b.setAttribute('aria-checked', String(on)); b.classList.toggle('is-selected', on);
  });
  const btn = document.querySelector('[data-theme-btn]');
  if (btn) {
    const ic = btn.querySelector('.ic');
    if (ic) ic.textContent = ICON[mode];
    btn.setAttribute('aria-label', `Tampilan: ${MODE[mode]}`);
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  const dark = mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  if (meta) meta.setAttribute('content', dark ? '#0B0B0D' : '#FFFFFF');
};
html.addEventListener('lds:theme', syncTheme);
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncTheme);

// ---------- Preview state ----------
const STATE = { loaded: 'termuat', loading: 'memuat', empty: 'kosong', error: 'galat' };
/** Shows one state in every [data-states] widget: children carry data-state-view="loaded|loading|empty|error". */
export function showState(state, scope = document) {
  scope.querySelectorAll('[data-states]').forEach((w) => {
    const views = [...w.querySelectorAll(':scope > [data-state-view]')];
    const has = views.some((v) => v.getAttribute('data-state-view') === state);
    const pick = has || !views.length ? state : 'loaded';
    views.forEach((v) => { v.hidden = v.getAttribute('data-state-view') !== pick; });
    w.setAttribute('data-state', pick);
    w.toggleAttribute('aria-busy', pick === 'loading');
    w.dispatchEvent(new CustomEvent('dash:state', { bubbles: true, detail: { state: pick } }));
  });
  document.querySelectorAll('[data-state-set]').forEach((b) => b.setAttribute('aria-checked', String(b.getAttribute('data-state-set') === state)));
}
document.addEventListener('click', (e) => {
  const s = e.target.closest('[data-state-set]');
  if (s) { showState(s.getAttribute('data-state-set')); announce(`Menampilkan keadaan ${STATE[s.getAttribute('data-state-set')]}`); }
  const retry = e.target.closest('[data-state-retry]');
  if (retry) {
    const w = retry.closest('[data-states]');
    if (!w) return;
    showState('loading', w.parentElement || document);
    delay(900).then(() => { showState('loaded', w.parentElement || document); document.querySelectorAll('[data-state-set]').forEach((b) => b.setAttribute('aria-checked', String(b.getAttribute('data-state-set') === 'loaded'))); });
  }
}, true); // capture: menus stop click propagation, and the Preview state menu is a menu

// ---------- Palette actions ----------
document.addEventListener('click', (e) => {
  const c = e.target.closest('[data-cmd]');
  if (!c) return;
  const cmd = c.getAttribute('data-cmd');
  closeLayer('palette');
  if (cmd.startsWith('theme:')) { setTheme(cmd.slice(6)); notify({ title: `Tampilan: ${MODE[cmd.slice(6)]}`, icon: ICON[cmd.slice(6)] }); }
  if (cmd === 'rail') { const sh = document.querySelector('.shell'); if (sh) { if (innerWidth <= 960) notify({ title: 'Menu samping hanya bisa diciutkan di layar lebar', icon: 'info' }); else setRail(sh, !sh.classList.contains('is-rail')); } }
});
// "/" opens the palette too, unless someone is typing
document.addEventListener('keydown', (e) => {
  if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
  const t = e.target;
  if (t.closest && t.closest('input, textarea, select, [contenteditable="true"]')) return;
  const p = document.querySelector('[data-lds-open="palette"]');
  if (p) { e.preventDefault(); p.click(); }
});

// ---------- Notifications ----------
const readAll = document.querySelector('[data-notes-read]');
readAll && readAll.addEventListener('click', () => {
  const count = document.querySelector('[data-notes-count]');
  const n = document.querySelectorAll('[data-unread]').length;
  document.querySelectorAll('[data-unread-dot]').forEach((d) => d.remove());
  document.querySelectorAll('[data-unread]').forEach((d) => d.removeAttribute('data-unread'));
  if (count) count.remove();
  document.querySelector('[data-notes-btn]')?.setAttribute('aria-label', 'Notifikasi, semua sudah dibaca');
  if (n) { morphText(readAll, 'Semua dibaca'); readAll.disabled = true; announce(`${n} notifikasi ditandai dibaca`); }
});

// ---------- Navigation progress ----------
const bar = document.querySelector('.navprogress');
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a || !bar || a.target || e.metaKey || e.ctrlKey || e.shiftKey || a.getAttribute('href').startsWith('#')) return;
  navProgress(bar, true);
});
addEventListener('pageshow', () => bar && navProgress(bar, false));

// ---------- Indonesian wording for text js/lds.js writes ----------
// js/lds.js generates a few labels in English (table info, date range presets, calendar buttons). Until the
// system takes a locale for them, the example swaps whole strings it knows, and only those.
const WORDS = {
  'Today': 'Hari ini', 'Last 7 days': '7 hari terakhir', 'Last 30 days': '30 hari terakhir', 'This month': 'Bulan ini',
  'Last month': 'Bulan lalu', 'Last 90 days': '90 hari terakhir', 'This year': 'Tahun ini', 'Cancel': 'Batal', 'Apply': 'Terapkan',
  'Pick the last day': 'Pilih hari terakhir', 'Month': 'Bulan', 'Week': 'Minggu', 'Agenda': 'Agenda', 'All day': 'Sepanjang hari',
  'Show more': 'Tampilkan lagi', 'Show less': 'Tampilkan lebih sedikit', 'Copied': 'Tersalin', 'Previous': 'Sebelumnya', 'Next': 'Berikutnya',
};
const PATTERNS = [
  [/^Showing (\d+) to (\d+) of (\d+) (.+)$/, (m) => `Menampilkan ${m[1]} sampai ${m[2]} dari ${m[3]} ${m[4]}`],
  [/^No (.+) match$/, (m) => `Tidak ada ${m[1]} yang cocok`],
  [/^(\d+) days? · (.+)$/, (m) => `${m[1]} hari · ${m[2].replace(' to ', ' sampai ')}`],
  [/^(\d+ \S+(?: \d{4})?) to (\d+ \S+ \d{4})$/, (m) => `${m[1]} sampai ${m[2]}`],
];
const word = (t) => {
  const k = t.trim();
  if (!k) return null;
  if (WORDS[k]) return t.replace(k, WORDS[k]);
  for (const [re, f] of PATTERNS) { const m = k.match(re); if (m) return t.replace(k, f(m)); }
  return null;
};
const SCOPE = '[data-lds-table-info], .daterange, .evcal, .pager, [data-lds-more]';
const localize = (root) => {
  const els = root.matches?.(SCOPE) ? [root] : [];
  root.querySelectorAll?.(SCOPE).forEach((e) => els.push(e));
  for (const el of els) {
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) { if (n.parentElement?.closest('.ic')) continue; const w = word(n.nodeValue); if (w !== null && w !== n.nodeValue) n.nodeValue = w; }
  }
};
new MutationObserver((list) => { for (const r of list) { const t = r.target.nodeType === 3 ? r.target.parentElement : r.target; if (t?.closest?.(SCOPE)) localize(t.closest(SCOPE)); else r.addedNodes.forEach((a) => a.nodeType === 1 && localize(a)); } })
  .observe(document.body, { childList: true, subtree: true, characterData: true });

init();
syncTheme();
localize(document.body);
