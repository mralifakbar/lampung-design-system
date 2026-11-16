/* ==========================================================================
   Lampung Design System: behaviors
   Framework-agnostic ES module. Markup + CSS work on their own; this file adds
   the parts CSS cannot do: open/close with focus handling, sliding indicators,
   sheet dragging with momentum, toasts, menus, steppers, OTP, confirms.

   import { init } from './lds.js';
   init();               // wires every [data-lds-*] element under document
   init(someElement);    // or only a subtree (call again after rendering new markup)

   Everything is driven by data attributes, so React/Vue/Svelte can keep owning
   the DOM: render the markup, then call init(ref) in an effect.
   ========================================================================== */

import { renderAksara } from './aksara.js';
export { toAksara, aksaraSvg, renderAksara } from './aksara.js';

const reduceMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = (root, sel) => Array.from(root.querySelectorAll(sel));
const bound = new WeakSet();
const once = (el) => (bound.has(el) ? false : (bound.add(el), true));
const emit = (el, name, detail) => el.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* ---------- Theme ---------- */
/* Swap the theme in one frame, with transitions held off so nothing fades in patches. */
export function swapTheme(apply) {
  const html = document.documentElement;
  html.classList.add('lds-theme-swap');
  apply();
  setTimeout(() => html.classList.remove('lds-theme-swap'), 120);
}
export function setTheme(mode, root = document.documentElement) {
  swapTheme(() => root.setAttribute('data-theme', mode));
  try { localStorage.setItem('lds-theme', mode); } catch (e) { /* storage may be blocked */ }
  emit(root, 'lds:theme', { mode });
}
export function restoreTheme(root = document.documentElement, fallback = 'light') {
  let mode = fallback;
  try { mode = localStorage.getItem('lds-theme') || fallback; } catch (e) { /* keep fallback */ }
  root.setAttribute('data-theme', mode);
  return mode;
}

/* ---------- Sliding indicator groups: segmented controls, tabs, toggle groups ----------
   <div class="seg" data-lds-segmented> <span class="seg__thumb"></span> <button class="seg__btn">…</button> … </div>
   <div class="tabs" role="tablist" data-lds-tabs> <span class="tabs__ink"></span> <button role="tab" aria-controls="panel-id">…</button> … </div> */
function bindIndicator(group, { itemSel, thumbSel, attr, onPick }) {
  const items = $$(group, itemSel);
  const thumb = group.querySelector(thumbSel);
  const measured = group.matches('.tabs');
  if (thumb && !measured) thumb.style.width = `calc((100% - ${group.matches('.seg') ? 4 : 0}px) / ${items.length})`;
  // Tabs size the ink to the selected label (inset 12 px), so start-aligned tabs of any width work
  const ink = (i) => { const b = items[i]; if (!b) return; thumb.style.width = `${Math.max(0, b.offsetWidth - 24)}px`; thumb.style.transform = `translateX(${b.offsetLeft + 12}px)`; };
  const select = (i, focus) => {
    items.forEach((b, j) => {
      b.setAttribute(attr, String(i === j));
      if (attr === 'aria-selected') b.tabIndex = i === j ? 0 : -1;
    });
    if (thumb) { if (measured) ink(i); else thumb.style.transform = `translateX(${i * 100}%)`; }
    if (focus) items[i].focus();
    onPick && onPick(i, items[i]);
    emit(group, 'lds:change', { index: i, item: items[i] });
  };
  items.forEach((b, i) => b.addEventListener('click', () => select(i)));
  group.addEventListener('keydown', (e) => {
    const cur = items.findIndex((b) => b.getAttribute(attr) === 'true');
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); select((cur + 1) % items.length, true); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); select((cur - 1 + items.length) % items.length, true); }
  });
  const start = Math.max(0, items.findIndex((b) => b.getAttribute(attr) === 'true'));
  select(start);
  if (measured && thumb && typeof ResizeObserver === 'function') new ResizeObserver(() => ink(Math.max(0, items.findIndex((b) => b.getAttribute(attr) === 'true')))).observe(group);
}

/* ---------- Layers: dialog, alert dialog, drawer, command palette ----------
   <button data-lds-open="rename">…</button>
   <div class="scrim" data-lds-scrim="rename"></div>
   <div class="dialog" id="rename" role="dialog" aria-modal="true" data-lds-layer>… <button data-lds-close>…</button></div> */
const openStack = [];
export function openLayer(id, from) {
  const layer = document.getElementById(id);
  if (!layer || layer.classList.contains('is-open')) return;
  layer._from = from || document.activeElement;
  layer.classList.add('is-open');
  layer.removeAttribute('aria-hidden');
  layer.inert = false;
  $$(document, `[data-lds-scrim="${id}"]`).forEach((s) => s.classList.add('is-open'));
  $$(document, `[data-lds-push~="${id}"]`).forEach((s) => s.classList.add('is-pushed'));
  openStack.push(layer);
  setTimeout(() => {
    const target = layer.querySelector('[autofocus], [data-lds-autofocus]') || layer.querySelector(FOCUSABLE);
    target && target.focus({ preventScroll: true });
  }, 40);
  emit(layer, 'lds:open');
}
export function closeLayer(id) {
  const layer = typeof id === 'string' ? document.getElementById(id) : id;
  if (!layer || !layer.classList.contains('is-open')) return;
  layer.classList.remove('is-open');
  layer.setAttribute('aria-hidden', 'true');
  layer.inert = true;
  $$(document, `[data-lds-scrim="${layer.id}"]`).forEach((s) => s.classList.remove('is-open'));
  $$(document, `[data-lds-push~="${layer.id}"]`).forEach((s) => s.classList.remove('is-pushed'));
  const i = openStack.indexOf(layer);
  if (i >= 0) openStack.splice(i, 1);
  const from = layer._from;
  if (from && from.focus) setTimeout(() => from.focus(), 20);
  emit(layer, 'lds:close');
}
function trapFocus(e) {
  const layer = openStack[openStack.length - 1];
  if (!layer || e.key !== 'Tab' || layer.getAttribute('aria-modal') !== 'true') return;
  const f = $$(layer, FOCUSABLE).filter((el) => el.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ---------- Sheet dragging ----------
   Follows the pointer 1:1, rubber-bands upward, and on release projects where
   the momentum would carry it (exponential decay, rate 0.99) to decide. */
const rubber = (over, dim = 120, c = 0.55) => (over * dim * c) / (dim + c * Math.abs(over));
const project = (v, rate = 0.99) => (v / 1000) * rate / (1 - rate);
function bindSheet(sheet) {
  const handles = $$(sheet, '.sheet__grabber, [data-lds-drag]');
  let start = 0, dy = 0, hist = [], dragging = false, k = 1;
  const down = (e) => {
    if (!sheet.classList.contains('is-open') || e.button > 0 || e.target.closest('button:not(.sheet__grabber)')) return;
    /* A zoomed or scaled frame (a device preview) moves fewer screen pixels per CSS pixel */
    k = sheet.getBoundingClientRect().height / sheet.offsetHeight || 1;
    dragging = true; start = e.clientY; dy = 0; hist = [[e.clientY, performance.now()]];
    e.currentTarget.setPointerCapture(e.pointerId);
    sheet.classList.add('is-dragging');
  };
  const move = (e) => {
    if (!dragging) return;
    dy = (e.clientY - start) / k;
    if (dy < 0) dy = rubber(dy);
    hist.push([e.clientY, performance.now()]); if (hist.length > 5) hist.shift();
    sheet.style.transform = `translateY(${dy}px)`;
    const scrim = document.querySelector(`[data-lds-scrim="${sheet.id}"]`);
    if (scrim) scrim.style.opacity = String(Math.max(0, 1 - Math.max(dy, 0) / sheet.offsetHeight));
  };
  const up = () => {
    if (!dragging) return;
    dragging = false;
    const a = hist[0], b = hist[hist.length - 1];
    const v = b[1] > a[1] ? (b[0] - a[0]) / k / ((b[1] - a[1]) / 1000) : 0;
    sheet.classList.remove('is-dragging');
    sheet.style.transform = '';
    const scrim = document.querySelector(`[data-lds-scrim="${sheet.id}"]`);
    if (scrim) scrim.style.opacity = '';
    if (dy + project(v) > sheet.offsetHeight * 0.5) closeLayer(sheet);
    else if (!reduceMotion()) {
      sheet.classList.add('is-thrown');
      setTimeout(() => sheet.classList.remove('is-thrown'), 600);
    }
  };
  handles.forEach((h) => {
    h.addEventListener('pointerdown', down);
    h.addEventListener('pointermove', move);
    h.addEventListener('pointerup', up);
    h.addEventListener('pointercancel', up);
  });
}

/* ---------- Menus and popovers ----------
   <button data-lds-menu="sort" aria-haspopup="menu" aria-expanded="false">…</button>
   <div class="menu" id="sort" role="menu">… <button class="menu__item" role="menuitem">…</button></div> */
let openMenu = null;
export function closeMenus() {
  if (!openMenu) return;
  openMenu.menu.classList.remove('is-open');
  if (openMenu.trigger) {
    openMenu.trigger.setAttribute('aria-expanded', 'false');
    const split = openMenu.trigger.closest('.split');
    split && split.classList.remove('is-open');
  }
  openMenu = null;
}
/* ---------- Keep floating layers on screen ----------
   fitLayer(el): after a menu, popover, listbox, tooltip or hover card is placed, check it against the screen
   and against the nearest ancestor that clips (overflow hidden, auto or clip). If it runs out on one side it
   swaps to the other anchor (start <-> end, below <-> above); whatever still overflows is shifted inside. */
function clipBounds(el) {
  let b = { left: 8, top: 8, right: innerWidth - 8, bottom: innerHeight - 8 };
  for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
    const cs = getComputedStyle(p);
    if (/(hidden|auto|scroll|clip)/.test(cs.overflowX + cs.overflowY)) {
      const r = p.getBoundingClientRect();
      b = { left: Math.max(b.left, r.left + 4), top: Math.max(b.top, r.top + 4), right: Math.min(b.right, r.right - 4), bottom: Math.min(b.bottom, r.bottom - 4) };
    }
  }
  return b;
}
export function fitLayer(el) {
  if (!el || typeof getComputedStyle !== 'function') return;
  if (el._fitStyle === undefined) el._fitStyle = el.getAttribute('style') || '';
  el.setAttribute('style', el._fitStyle);
  el.classList.remove('is-flipped-x', 'is-flipped-y');
  const b = clipBounds(el);
  const w = el.offsetWidth, h = el.offsetHeight;
  const box = () => { const r = el.getBoundingClientRect(); const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2; return { left: cx - w / 2, right: cx + w / 2, top: cy - h / 2, bottom: cy + h / 2 }; };
  const cs = getComputedStyle(el);
  let r = box();
  // Computed left/right are resolved to pixels for positioned boxes, so read the anchor from the geometry:
  // a layer flush with its parent's end edge is end-anchored. Centred layers (tooltips) only get shifted.
  const pr = el.offsetParent ? el.offsetParent.getBoundingClientRect() : null;
  const centred = cs.translate !== 'none' && cs.translate !== '0px';
  const endAnchored = !!pr && !centred && Math.abs(r.right - pr.right) < Math.abs(r.left - pr.left);
  const startAnchored = !!pr && !centred && !endAnchored;
  if (r.right > b.right && startAnchored) { el.style.left = 'auto'; el.style.right = '0'; el.classList.add('is-flipped-x'); }
  else if (r.left < b.left && endAnchored) { el.style.right = 'auto'; el.style.left = '0'; el.classList.add('is-flipped-x'); }
  r = box();
  if (r.bottom > b.bottom && cs.top !== 'auto' && cs.position === 'absolute') {
    const spaceAbove = (el.offsetParent?.getBoundingClientRect().top ?? 0) - b.top;
    if (spaceAbove > h) { el.style.top = 'auto'; el.style.bottom = 'calc(100% + 6px)'; el.classList.add('is-flipped-y'); }
  }
  r = box();
  let dx = 0;
  if (r.right > b.right) dx = b.right - r.right;
  if (r.left + dx < b.left) dx = b.left - r.left;
  if (dx) el.style.marginLeft = `${(parseFloat(cs.marginLeft) || 0) + dx}px`;
}

function openMenuEl(menu, trigger, at) {
  closeMenus();
  if (at) { menu._fitStyle = undefined; menu.style.left = `${at.x}px`; menu.style.top = `${at.y}px`; menu.style.marginLeft = ''; }
  menu.classList.add('is-open');
  fitLayer(menu);
  if (trigger) {
    trigger.setAttribute('aria-expanded', 'true');
    const split = trigger.closest('.split');
    split && split.classList.add('is-open');
  }
  openMenu = { menu, trigger };
  const first = menu.querySelector('[role^="menuitem"], [role="option"], button');
  first && setTimeout(() => first.focus({ preventScroll: true }), 30);
}
function bindMenu(trigger) {
  const menu = document.getElementById(trigger.getAttribute('data-lds-menu'));
  if (!menu) return;
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (openMenu && openMenu.menu === menu) closeMenus(); else openMenuEl(menu, trigger);
  });
  trigger.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); openMenuEl(menu, trigger); } });
  bindMenuKeys(menu);
}
function bindMenuKeys(menu) {
  if (!once(menu)) return;
  menu.addEventListener('click', (e) => { const it = e.target.closest('[role^="menuitem"], [role="option"]'); if (it && !it.hasAttribute('data-lds-keep-open')) { closeMenus(); } e.stopPropagation(); });
  menu.addEventListener('keydown', (e) => {
    const items = $$(menu, '[role^="menuitem"], [role="option"]');
    const i = items.indexOf(document.activeElement);
    if (!items.length && e.key !== 'Escape') return;
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    if (e.key === 'Escape') { e.stopPropagation(); const t = openMenu && openMenu.trigger; closeMenus(); t && t.focus(); } // the menu only: a sheet or drawer around it stays open
  });
}
function bindContextMenu(area) {
  const menu = document.getElementById(area.getAttribute('data-lds-contextmenu'));
  if (!menu) return;
  bindMenuKeys(menu);
  area.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const r = area.getBoundingClientRect();
    const x = Math.max(4, Math.min(e.clientX - r.left, r.width - menu.offsetWidth - 4));
    const y = Math.max(4, Math.min(e.clientY - r.top, r.height - 40));
    openMenuEl(menu, null, { x, y });
  });
  /* Touch: a 500 ms press opens it (10 px of slop); keyboard: Shift+F10 or the menu key. */
  let lp = null, p0 = null;
  const cancel = () => { clearTimeout(lp); lp = null; };
  area.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;
    p0 = [e.clientX, e.clientY];
    lp = setTimeout(() => { lp = null; haptic('medium'); area.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: p0[0], clientY: p0[1] })); }, 500);
  });
  area.addEventListener('pointermove', (e) => { if (lp && Math.hypot(e.clientX - p0[0], e.clientY - p0[1]) > 10) cancel(); });
  ['pointerup', 'pointercancel'].forEach((ev) => area.addEventListener(ev, cancel));
  area.addEventListener('keydown', (e) => {
    if ((e.shiftKey && e.key === 'F10') || e.key === 'ContextMenu') {
      e.preventDefault();
      const r = area.getBoundingClientRect();
      area.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: r.left + 16, clientY: r.top + 16 }));
      const first = menu.querySelector('[role="menuitem"]'); first && first.focus();
    }
  });
}

/* ---------- Toasts ----------
   toast({ title, body, icon: 'check_circle', action: 'Undo', onAction, duration: 4000 })
   Newest in front, older ones tuck behind; hovering the stack fans it out and pauses. */
let toaster = null;
const TOAST_MAX = 3;
function layoutToasts() {
  if (!toaster) return;
  const list = $$(toaster, '.toast:not(.is-leaving)');
  const fan = toaster.matches(':hover');
  list.forEach((t, i) => {
    const depth = list.length - 1 - i;
    t.style.transform = fan ? `translateY(${-depth * 66}px)` : `translateY(${-depth * 10}px) scale(${1 - depth * 0.05})`;
    t.style.opacity = depth >= TOAST_MAX ? '0' : '1';
    t.style.zIndex = String(10 + i);
  });
}
export function toast({ title, body = '', icon = '', action = '', onAction, duration = 4000, container } = {}) {
  const local = container && container.querySelector('.toaster');
  if (local) toaster = local;
  else if (!toaster || !toaster.isConnected) {
    toaster = (container || document.body).querySelector('.toaster');
    if (!toaster) {
      toaster = document.createElement('div');
      toaster.className = 'toaster';
      toaster.setAttribute('role', 'status');
      toaster.setAttribute('aria-live', 'polite');
      toaster.style.position = 'fixed';
      (container || document.body).appendChild(toaster);
    }
  }
  if (!toaster.__bound) { toaster.__bound = true; toaster.addEventListener('mouseenter', layoutToasts); toaster.addEventListener('mouseleave', layoutToasts); }
  const el = document.createElement('div');
  el.className = 'toast';
  let ic = null;
  if (icon) { ic = document.createElement('span'); ic.className = 'ic ic--fill'; ic.setAttribute('aria-hidden', 'true'); ic.textContent = icon; el.appendChild(ic); }
  const text = document.createElement('div');
  const t1 = document.createElement('span'); t1.className = 'morph'; t1.textContent = title; text.appendChild(t1);
  if (body) { const t2 = document.createElement('div'); t2.className = 'toast__sub'; t2.textContent = body; text.appendChild(t2); }
  el.appendChild(text);
  let timer = null;
  const dismiss = () => {
    if (el.classList.contains('is-leaving')) return;
    clearInterval(timer);
    el.classList.add('is-leaving');
    setTimeout(() => { el.remove(); layoutToasts(); }, 200);
    layoutToasts();
  };
  if (action) {
    const b = document.createElement('button'); b.className = 'toast__action'; b.textContent = action;
    const bar = document.createElement('span'); bar.className = 'toast__timer'; bar.setAttribute('aria-hidden', 'true');
    b.addEventListener('click', () => {
      const next = onAction && onAction();
      /* onAction may return { title, icon }: the toast then says the result in place and leaves shortly after. */
      if (next && next.title) { dismiss.update(next); b.remove(); bar.remove(); left = 1600; } else dismiss();
    });
    el.appendChild(b);
    /* Undo has a deadline, so show it: the bar drains in real time and pauses with the clock. */
    bar.style.setProperty('--life', `${duration}ms`); el.appendChild(bar);
  }
  toaster.appendChild(el);
  primeMorph(t1);
  layoutToasts();
  /* The clock only runs while nobody is reading or reaching for the stack. */
  let left = duration;
  timer = setInterval(() => {
    if (toaster.matches(':hover, :focus-within')) return;
    left -= 100; if (left <= 0) dismiss();
  }, 100);
  /* Change the toast in place (Undo -> Restored) instead of stacking another one. */
  dismiss.update = ({ title: nt, icon: ni } = {}) => { if (nt) morphText(t1, nt); if (ni && ic) ic.textContent = ni; };
  return dismiss;
}

/* ---------- Small controls ---------- */
export function setLoading(button, on) {
  button.classList.toggle('is-loading', !!on);
  button.setAttribute('aria-busy', String(!!on));
}
function bindSlider(input) {
  const sync = () => {
    const min = Number(input.min || 0), max = Number(input.max || 100);
    input.style.setProperty('--pct', `${((Number(input.value) - min) / (max - min)) * 100}%`);
    const out = (input.id && document.querySelector(`[data-lds-value-for="${input.id}"]`)) || input.closest('.slider-row')?.querySelector('.slider-value');
    if (out) out.textContent = (input.getAttribute('data-prefix') || '') + input.value + (input.getAttribute('data-suffix') || '');
  };
  input.addEventListener('input', sync); sync();
}
function bindRange(box) {
  const [lo, hi] = $$(box, 'input[type="range"]');
  const fill = box.querySelector('.range__fill');
  const sync = (e) => {
    if (Number(lo.value) >= Number(hi.value)) { if (e && e.target === lo) lo.value = Number(hi.value) - Number(lo.step || 1); else hi.value = Number(lo.value) + Number(hi.step || 1); }
    const min = Number(lo.min), max = Number(lo.max);
    fill.style.left = `${((lo.value - min) / (max - min)) * 100}%`;
    fill.style.right = `${100 - ((hi.value - min) / (max - min)) * 100}%`;
    emit(box, 'lds:change', { min: Number(lo.value), max: Number(hi.value) });
  };
  lo.addEventListener('input', sync); hi.addEventListener('input', sync); sync();
}
/* Rolling digits: <span class="roll" data-lds-roll="128"></span>; setRoll(el, 129) */
export function setRoll(el, value) {
  const str = String(value);
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', el.getAttribute('data-lds-roll-label')?.replace('{n}', str) || str);
  // Digits roll in their own column; separators (".", ",", "-", "%") are fixed characters.
  const cols = Array.from(el.children);
  const want = [...str];
  const same = cols.length === want.length && want.every((ch, i) => /\d/.test(ch) === cols[i].classList.contains('roll__col'));
  if (!same) {
    el.textContent = '';
    for (const ch of want) {
      const col = document.createElement('span'); col.setAttribute('aria-hidden', 'true');
      if (/\d/.test(ch)) { col.className = 'roll__col'; for (let d = 0; d < 10; d++) { const x = document.createElement('span'); x.textContent = d; col.appendChild(x); } }
      else { col.className = 'roll__fix'; col.textContent = ch; }
      el.appendChild(col);
    }
  }
  Array.from(el.children).forEach((col, i) => { if (col.classList.contains('roll__col')) col.style.transform = `translateY(${-Number(want[i]) * 1.2}em)`; });
}
function bindStepper(box) {
  const out = box.querySelector('.roll');
  const btns = $$(box, 'button');
  const dec = box.querySelector('[data-lds-step="-1"]') || btns[0], inc = box.querySelector('[data-lds-step="1"]') || btns[btns.length - 1];
  const min = Number(box.dataset.min ?? 0), max = Number(box.dataset.max ?? 99);
  let v = Number(box.dataset.value ?? min);
  [dec, inc].forEach((b) => b.setAttribute('type', 'button'));
  // The value is a spinbutton: arrows, Page keys, Home and End work on it; a name makes it a form value
  const val = box.querySelector('.stepper-field__value');
  if (val) { val.setAttribute('role', 'spinbutton'); val.tabIndex = 0; val.setAttribute('aria-valuemin', min); val.setAttribute('aria-valuemax', max); if (box.getAttribute('aria-label')) val.setAttribute('aria-label', box.getAttribute('aria-label')); }
  let hidden = null;
  if (box.dataset.name) { hidden = document.createElement('input'); hidden.type = 'hidden'; hidden.name = box.dataset.name; box.appendChild(hidden); }
  const render = () => { setRoll(out, v); dec.disabled = v <= min; inc.disabled = v >= max; if (val) val.setAttribute('aria-valuenow', v); if (hidden) hidden.value = v; emit(box, 'lds:change', { value: v }); };
  dec.addEventListener('click', () => { v = Math.max(min, v - 1); render(); });
  inc.addEventListener('click', () => { v = Math.min(max, v + 1); render(); });
  val && val.addEventListener('keydown', (e) => {
    const n = { ArrowUp: v + 1, ArrowRight: v + 1, ArrowDown: v - 1, ArrowLeft: v - 1, PageUp: v + 10, PageDown: v - 10, Home: min, End: max }[e.key];
    if (n === undefined) return;
    e.preventDefault(); v = Math.min(max, Math.max(min, n)); render();
  });
  render();
}
/* OTP: one real input over N cells, so paste and autofill work. */
function bindOtp(wrap) {
  const input = wrap.querySelector('input');
  const cells = $$(wrap, '.otp__cell');
  const render = () => {
    const v = input.value.replace(/\D/g, '').slice(0, cells.length);
    input.value = v;
    cells.forEach((c, i) => {
      const prev = c.textContent;
      c.textContent = v[i] || '';
      c.classList.toggle('is-filled', !!v[i]);
      c.classList.toggle('is-active', i === Math.min(v.length, cells.length - 1) && v.length < cells.length);
      if (v[i] && prev !== v[i]) { c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; }
    });
    wrap.querySelector('.otp').classList.remove('is-error', 'is-shake');
    if (v.length === cells.length) emit(wrap, 'lds:complete', { value: v });
  };
  input.addEventListener('input', render); render();
}
export function otpError(wrap) {
  const otp = wrap.querySelector('.otp');
  otp.classList.remove('is-shake'); void otp.offsetWidth; otp.classList.add('is-error', 'is-shake');
}
/* Hold to confirm: fills over 1.2 s, drains on release. Emits lds:confirm. */
function bindHold(btn) {
  let timer;
  const start = () => { if (btn.disabled) return; btn.classList.add('is-holding'); timer = setTimeout(() => { btn.classList.remove('is-holding'); emit(btn, 'lds:confirm'); }, 1200); };
  const stop = () => { clearTimeout(timer); btn.classList.remove('is-holding'); };
  btn.addEventListener('pointerdown', start);
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => btn.addEventListener(ev, stop));
  btn.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start(); } });
  btn.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stop(); });
}
/* Slide to confirm: knob follows 1:1, rubber-bands at both ends, commits past 85%
   of travel (projected with release velocity), otherwise springs home. */
function bindSlide(track) {
  const knob = track.querySelector('.slide__knob');
  const fill = track.querySelector('.slide__fill');
  const label = track.querySelector('.slide__label');
  const travel = () => track.clientWidth - knob.offsetWidth - 8;
  let x0 = 0, x = 0, hist = [], dragging = false, k = 1;
  const paint = (px, t) => {
    knob.style.transition = t; knob.style.transform = `translateX(${px}px)`;
    if (fill) { fill.style.transition = t.replace('transform', 'width'); fill.style.width = `${Math.max(px, 0) + knob.offsetWidth + 4}px`; }
    if (label) label.style.opacity = String(Math.max(0, 1 - Math.max(px, 0) / (travel() * 0.6)));
  };
  const done = () => {
    track.classList.add('is-done'); paint(travel(), 'transform var(--d-smooth) var(--spring-smooth)');
    if (label) label.style.opacity = '';
    const ic = knob.querySelector('.ic'); if (ic) ic.textContent = 'check';
    emit(track, 'lds:confirm');
  };
  knob.addEventListener('pointerdown', (e) => { if (track.classList.contains('is-done')) return; dragging = true; track.classList.add('is-dragging'); k = track.getBoundingClientRect().width / track.offsetWidth || 1; x0 = e.clientX - x * k; hist = [[e.clientX, performance.now()]]; knob.setPointerCapture(e.pointerId); });
  knob.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const T = travel(); x = (e.clientX - x0) / k;
    if (x < 0) x = rubber(x, 52); if (x > T) x = T + rubber(x - T, 52);
    hist.push([e.clientX, performance.now()]); if (hist.length > 5) hist.shift();
    paint(x, 'none');
  });
  const up = () => {
    if (!dragging) return; dragging = false; track.classList.remove('is-dragging');
    const a = hist[0], b = hist[hist.length - 1];
    const v = b[1] > a[1] ? (b[0] - a[0]) / k / ((b[1] - a[1]) / 1000) : 0;
    if (x + project(v) > travel() * 0.85) done();
    else { x = 0; paint(0, 'transform var(--d-momentum) var(--spring-momentum)'); }
  };
  knob.addEventListener('pointerup', up); knob.addEventListener('pointercancel', up);
  knob.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && !track.classList.contains('is-done')) { e.preventDefault(); done(); } });
  track._reset = () => { track.classList.remove('is-done'); x = 0; paint(0, 'transform var(--d-smooth) var(--spring-smooth)'); const ic = knob.querySelector('.ic'); if (ic) ic.textContent = 'arrow_forward'; };
}
/* Puts a slide-to-confirm back to its start, for example after the action failed. */
export function slideReset(track) { track && track._reset && track._reset(); }
/* Copy: <button data-lds-copy="text to copy"> with a .swap inside. */
function bindCopy(btn) {
  btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(btn.getAttribute('data-lds-copy')); } catch (e) { emit(btn, 'lds:copy-failed'); return; }
    announce(btn.getAttribute('data-lds-copy-announce') || 'Copied');
    emit(btn, 'lds:copy');
    const swap = btn.querySelector('.swap');
    swap && swap.classList.add('is-swapped');
    const label = btn.querySelector('[data-lds-copy-label]');
    const old = label && label.textContent;
    if (label) label.textContent = label.getAttribute('data-lds-copy-label') || 'Copied';
    setTimeout(() => { swap && swap.classList.remove('is-swapped'); if (label) label.textContent = old; }, 1600);
  });
}
/* Accordion and tree: a button with aria-expanded controls the next .acc__panel / .tree__kids. */
function bindDisclosure(btn) {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    const group = btn.closest('[data-lds-accordion="single"]');
    if (group && open) $$(group, '[aria-expanded="true"]').forEach((b) => { if (b !== btn) { b.setAttribute('aria-expanded', 'false'); const p = document.getElementById(b.getAttribute('aria-controls')); if (p) p.inert = true; p && p.classList.remove('is-open'); } });
    btn.setAttribute('aria-expanded', String(open));
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (panel) { panel.classList.toggle('is-open', open); panel.inert = !open; }
  });
  // Closed panels leave the tab order and the accessibility tree
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  if (panel) panel.inert = btn.getAttribute('aria-expanded') !== 'true';
}
/* Search with Cancel, the phone pattern. */
function bindSearch(wrap) {
  const input = wrap.querySelector('input');
  const cancel = wrap.querySelector('.search__cancel');
  input.addEventListener('focus', () => wrap.classList.add('is-active'));
  cancel && cancel.addEventListener('click', () => { input.value = ''; input.dispatchEvent(new Event('input', { bubbles: true })); wrap.classList.remove('is-active'); input.blur(); });
  wrap.addEventListener('focusout', (e) => { if (!wrap.contains(e.relatedTarget) && !input.value) wrap.classList.remove('is-active'); });
}
/* Dismiss: collapses the closest .collapse (alerts, banners). */
function bindDismiss(btn) {
  btn.addEventListener('click', () => { const c = btn.closest('.collapse'); if (c) { c.classList.add('is-closed'); c.inert = true; } emit(btn, 'lds:dismiss'); });
}
/* Command palette filter: input[data-lds-filter="listId"] filters [role=option] children. */
function bindFilter(input) {
  const list = document.getElementById(input.getAttribute('data-lds-filter'));
  if (!list) return;
  const empty = list.querySelector('[data-lds-empty]');
  let active = 0;
  const visible = () => $$(list, '[role="option"]').filter((o) => !o.hidden);
  const mark = () => {
    $$(list, '[role="option"]').filter((o) => o.hidden).forEach((o) => { o.classList.remove('is-active'); o.setAttribute('aria-selected', 'false'); });
    visible().forEach((o, i) => { o.classList.toggle('is-active', i === active); o.setAttribute('aria-selected', String(i === active)); if (i === active) input.setAttribute('aria-activedescendant', o.id || ''); });
  };
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    $$(list, '[role="option"]').forEach((o) => { o.hidden = !!q && !o.textContent.toLowerCase().includes(q); });
    active = 0; mark();
    if (empty) empty.hidden = visible().length > 0;
    // A group caption hides with the last of its options
    $$(list, '.cmdk__group').forEach((g) => { let n = g.nextElementSibling, any = false; while (n && !n.matches('.cmdk__group')) { if (n.matches('[role="option"]') && !n.hidden) any = true; n = n.nextElementSibling; } g.hidden = !any; });
  });
  input.addEventListener('keydown', (e) => {
    const v = visible();
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, v.length - 1); mark(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); mark(); }
    if (e.key === 'Enter' && v[active]) { e.preventDefault(); v[active].click(); }
  });
  $$(list, '[role="option"]').forEach((o) => o.addEventListener('mousemove', () => { const i = visible().indexOf(o); if (i !== active) { active = i; mark(); } }));
  mark();
}
/* Phone nav bar: shows material + inline title once content scrolls under it. */
function bindNavbar(scroller) {
  const bar = document.getElementById(scroller.getAttribute('data-lds-navbar'));
  if (!bar) return;
  const sync = () => {
    bar.classList.toggle('is-scrolled', scroller.scrollTop > 44);
    scroller.style.setProperty('--collapse', String(Math.min(1, Math.max(0, (scroller.scrollTop - 6) / 34))));
  };
  scroller.addEventListener('scroll', sync, { passive: true }); sync();
}

/* ---------- Microinteractions ----------
   Feedback answers within 100 ms and scales with the event: a state change for
   a tap, words for a save, a confirmation with Undo for anything destructive. */

/* Haptics: supplementary only, never the sole signal. Off with data-lds-haptics="off" on <html>. */
const HAPTIC = { light: 8, medium: 14, success: [10, 40, 18], error: [12, 30, 12, 30, 12] };
export function haptic(kind = 'light') {
  if (document.documentElement.getAttribute('data-lds-haptics') === 'off') return;
  if (typeof navigator === 'undefined' || !navigator.vibrate || (navigator.userActivation && !navigator.userActivation.hasBeenActive)) return;
  try { navigator.vibrate && navigator.vibrate(HAPTIC[kind] || HAPTIC.light); } catch (e) { /* not supported */ }
}
/* Shake: refused input. Restarts if called again mid-shake. */
export function shake(el) {
  el.classList.remove('is-shake'); void el.offsetWidth; el.classList.add('is-shake');
  el.addEventListener('animationend', () => el.classList.remove('is-shake'), { once: true });
  haptic('error');
}

/* Text morph: <span class="morph" data-lds-morph>Saved</span>; morphText(el, 'Saving'). Letters
   that stay slide to their new place, new ones rise in 32 ms apart, leaving ones blur out. */
export function morphText(el, next) {
  next = String(next);
  let sr = el.querySelector('.morph__sr');
  if (!sr) { sr = document.createElement('span'); sr.className = 'sr-only morph__sr'; el.textContent = ''; el.appendChild(sr); }
  const old = $$(el, '.morph__l:not(.is-leaving)');
  sr.textContent = next;
  const keyed = (chars) => { const seen = {}; return chars.map((c) => { seen[c] = (seen[c] || 0) + 1; return c + '#' + seen[c]; }); };
  if (reduceMotion() || !el.isConnected) {
    old.forEach((n) => n.remove()); $$(el, '.morph__l').forEach((n) => n.remove());
    [...next].forEach((c) => { const n = document.createElement('span'); n.className = 'morph__l'; n.setAttribute('aria-hidden', 'true'); n.textContent = c; el.appendChild(n); });
    return;
  }
  const box = el.getBoundingClientRect();
  const oldKeys = keyed(old.map((n) => n.textContent));
  const fromX = new Map(old.map((n) => [n, n.getBoundingClientRect().left - box.left]));
  const pool = new Map(old.map((n, i) => [oldKeys[i], n]));
  const newKeys = keyed([...next]);
  const w0 = el.offsetWidth;
  el.style.width = '';
  $$(el, '.morph__l.is-leaving').forEach((n) => n.remove());
  let added = 0;
  const nodes = newKeys.map((k, i) => {
    const hit = pool.get(k);
    if (hit) { pool.delete(k); hit.classList.remove('is-in'); hit.style.animationDelay = ''; return hit; }
    const n = document.createElement('span'); n.className = 'morph__l is-in'; n.setAttribute('aria-hidden', 'true');
    n.textContent = next[i]; n.style.animationDelay = `${Math.min(added++, 8) * 32}ms`; return n;
  });
  pool.forEach((n) => { n.classList.add('is-leaving'); n.style.left = `${fromX.get(n)}px`; setTimeout(() => n.remove(), 220); });
  nodes.forEach((n) => el.appendChild(n));
  const w1 = el.offsetWidth;
  const box1 = el.getBoundingClientRect();
  nodes.forEach((n) => {
    if (!fromX.has(n)) return;
    const d = fromX.get(n) - (n.getBoundingClientRect().left - box1.left);
    if (Math.abs(d) < 0.5) return;
    n.style.transition = 'none'; n.style.transform = `translateX(${d}px)`;
  });
  el.style.width = `${w0}px`; void el.offsetWidth;
  el.style.width = `${w1}px`;
  pool.forEach((n) => n.classList.add('is-out'));
  nodes.forEach((n) => { if (n.style.transform) { n.style.transition = 'transform var(--d-smooth) var(--spring-smooth)'; n.style.transform = ''; } });
  clearTimeout(el._morphT); el._morphT = setTimeout(() => { el.style.width = ''; }, 600);
}
function primeMorph(el) { const text = el.textContent; el.textContent = ''; morphText(el, text); }

/* Confirm in place: rest -> ask -> working -> done (with Undo). Replaces small confirm dialogs.
   <div class="confirm" data-lds-confirm> faces: .confirm__face--rest/--ask/--busy/--done
   Listen for lds:confirm and call e.detail.wait(promise) to hold the working face until it settles. */
function bindConfirm(box) {
  const faces = {};
  ['rest', 'ask', 'busy', 'done'].forEach((f) => { faces[f] = box.querySelector(`.confirm__face--${f}`); });
  let face = 'rest', armedAt = 0, resetT;
  const go = (to, focusSel) => {
    if (to === face) return;
    const from = faces[face], next = faces[to];
    const w0 = box.offsetWidth;
    next.hidden = false; next.classList.remove('is-leaving'); next.classList.add('is-entering');
    from.classList.add('is-leaving');
    box.style.width = 'auto';
    const w1 = next.offsetWidth;
    /* Growing: let the pill open most of the way before the new words appear, so they are never cut off. */
    next.style.setProperty('--face-delay', w1 > w0 + 8 ? '150ms' : '60ms');
    box.style.width = `${w0}px`; void box.offsetWidth; box.style.width = `${w1}px`;
    box.setAttribute('data-face', to); face = to;
    setTimeout(() => { if (face !== to) return; from.hidden = true; from.classList.remove('is-leaving'); }, 140);
    setTimeout(() => { if (face === to) next.classList.remove('is-entering'); }, 380);
    const f = focusSel && next.querySelector(focusSel); if (f) f.focus();
  };
  Object.entries(faces).forEach(([k, el]) => { if (el) el.hidden = k !== 'rest'; });
  box.setAttribute('data-face', 'rest');
  box.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]'); if (!act) return;
    const a = act.getAttribute('data-act');
    if (a === 'arm') { armedAt = performance.now(); go('ask', '[data-act="cancel"]'); haptic('light'); }
    if (a === 'cancel') go('rest', '[data-act="arm"]');
    if (a === 'confirm') {
      if (performance.now() - armedAt < 280) return;
      go('busy');
      let pending = null;
      emit(box, 'lds:confirm', { wait: (p) => { pending = p; } });
      const started = performance.now();
      const settle = (ok) => setTimeout(() => {
        if (ok) { go('done', '[data-act="undo"]'); haptic('success'); clearTimeout(resetT); resetT = setTimeout(() => go('rest'), Number(box.dataset.reset || 5000)); }
        else { go('rest', '[data-act="arm"]'); shake(box); }
      }, Math.max(0, 600 - (performance.now() - started)));
      Promise.resolve(pending || new Promise((r) => setTimeout(r, 700))).then(() => settle(true), () => settle(false));
    }
    if (a === 'undo') { clearTimeout(resetT); emit(box, 'lds:undo'); go('rest', '[data-act="arm"]'); }
  });
  box.addEventListener('keydown', (e) => { if (e.key === 'Escape' && face === 'ask') { e.stopPropagation(); go('rest', '[data-act="arm"]'); } });
}

/* Like: optimistic. Fills and bursts at once; call likeRevert(btn) if the server refuses. */
function bindLike(btn) {
  const heart = btn.querySelector('.like__heart');
  if (heart && !heart.querySelector('.like__spark')) for (let i = 0; i < 7; i++) { const s = document.createElement('i'); s.className = 'like__spark'; s.style.setProperty('--a', `${i * (360 / 7)}deg`); heart.appendChild(s); }
  const count = btn.querySelector('.roll');
  btn.addEventListener('click', () => {
    const on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(on));
    btn.classList.remove('is-burst');
    if (on) { void btn.offsetWidth; btn.classList.add('is-burst'); haptic('light'); }
    if (count) { const v = Number(count.getAttribute('aria-label') || 0) + (on ? 1 : -1); setRoll(count, v); }
    emit(btn, 'lds:change', { pressed: on });
  });
}
export function likeRevert(btn) { btn.classList.remove('is-burst'); btn.click(); btn.classList.remove('is-burst'); shake(btn); }

/* Switch: stretch once as the thumb lands, whatever changed it. */
function bindSwitch(input) {
  const sw = input.closest('.switch'); if (!sw) return;
  input.addEventListener('change', () => {
    sw.classList.remove('is-flip'); void sw.offsetWidth; sw.classList.add('is-flip');
    const bell = sw.querySelector('.bell'); if (bell && input.checked) { bell.classList.remove('is-ringing'); void bell.offsetWidth; bell.classList.add('is-ringing'); }
  });
}

/* Expanding toolbar: <div class="xbar" data-lds-toolbar> <span class="xbar__hl"></span> <button class="xbar__btn">… */
function bindToolbar(bar) {
  const hl = bar.querySelector('.xbar__hl');
  const btns = $$(bar, '.xbar__btn');
  const rest = btns.find((b) => b.classList.contains('is-open')) || btns[0];
  /* Where each button will end up once labels finish opening and closing, so the highlight
     travels once, straight to its destination. */
  const finalBox = (target) => {
    let x = parseFloat(getComputedStyle(bar).paddingLeft) || 0, out = null;
    const gap = parseFloat(getComputedStyle(bar).columnGap) || 0;
    Array.from(bar.children).forEach((el) => {
      if (el === hl) return;
      let w;
      if (el.classList.contains('xbar__btn')) {
        const wrap = el.querySelector('.xbar__label'), inner = wrap && wrap.firstElementChild;
        const pad = inner ? parseFloat(getComputedStyle(inner).paddingLeft) || 0 : 0;
        const text = inner ? inner.scrollWidth - pad : 0;
        w = el.offsetWidth - (wrap ? wrap.offsetWidth : 0) + (el === target && inner ? text + 7 : 0);
        if (el === target) out = { x, w };
      } else {
        const cs = getComputedStyle(el);
        w = el.offsetWidth + (parseFloat(cs.marginLeft) || 0) + (parseFloat(cs.marginRight) || 0);
      }
      x += w + gap;
    });
    return out;
  };
  const open = (b) => {
    const box = finalBox(b);
    btns.forEach((x) => x.classList.toggle('is-open', x === b));
    if (hl && box) { hl.style.width = `${box.w}px`; hl.style.transform = `translateX(${box.x}px)`; }
  };
  const track = (b) => { bar.classList.add('is-hover'); open(b); };
  btns.forEach((b) => {
    b.addEventListener('pointerenter', () => track(b));
    b.addEventListener('focus', () => track(b));
  });
  bar.addEventListener('pointerleave', () => { if (!bar.contains(document.activeElement)) { bar.classList.remove('is-hover'); open(rest); } });
  bar.addEventListener('focusout', (e) => { if (!bar.contains(e.relatedTarget)) { bar.classList.remove('is-hover'); open(rest); } });
  open(rest);
}

/* Swipe actions: <div class="swipe" data-lds-swipe> <div class="swipe__actions">buttons</div> <div class="swipe__row" tabindex="0">…</div> </div>
   8 px of slop decides swipe vs scroll; release projects with velocity; a long or fast swipe runs the last action.
   Keyboard: ArrowLeft opens, ArrowRight or Escape closes; the actions are then in the tab order. */
let openSwipe = null;
function bindSwipe(box) {
  const row = box.querySelector('.swipe__row');
  const acts = box.querySelector('.swipe__actions');
  const buttons = $$(acts, 'button');
  const total = () => buttons.length * 76;
  let x = 0, x0 = 0, y0 = 0, start = 0, hist = [], mode = null, id = null, k = 1;
  const setActs = (on) => { acts.inert = !on; };
  const paint = (px, t) => { row.style.transition = t; row.style.transform = px ? `translateX(${px}px)` : ''; acts.style.width = `${Math.max(-px, 0)}px`; box.classList.toggle('is-full', -px > total() + 40); };
  const close = (t = 'transform var(--d-smooth) var(--spring-smooth)') => { x = 0; paint(0, t); acts.style.transition = 'width var(--d-smooth) var(--spring-smooth)'; setActs(false); if (openSwipe === box) openSwipe = null; };
  const openTo = () => { if (openSwipe && openSwipe !== box) openSwipe._close(); x = -total(); acts.style.transition = 'width var(--d-smooth) var(--spring-smooth)'; paint(x, 'transform var(--d-smooth) var(--spring-smooth)'); setActs(true); openSwipe = box; };
  const commit = (btn) => {
    const w = box.clientWidth; acts.style.transition = 'width var(--d-standard) var(--ease-inout)';
    box.classList.add('is-full'); paint(-w, 'transform var(--d-standard) var(--ease-inout)');
    haptic('medium');
    setTimeout(() => { box.classList.add('is-gone'); emit(box, 'lds:swipe', { action: btn.getAttribute('data-swipe') || btn.textContent.trim(), restore }); }, 240);
    if (openSwipe === box) openSwipe = null;
  };
  const restore = () => { box.classList.remove('is-gone', 'is-full'); close('none'); acts.style.transition = 'none'; };
  box._close = () => close();
  setActs(false);
  row.addEventListener('pointerdown', (e) => { if (e.button) return; k = box.getBoundingClientRect().width / box.offsetWidth || 1; x0 = e.clientX; y0 = e.clientY; start = x; mode = null; id = e.pointerId; hist = [[e.clientX, performance.now()]]; });
  row.addEventListener('pointermove', (e) => {
    if (id !== e.pointerId) return;
    const dx = (e.clientX - x0) / k, dy = (e.clientY - y0) / k;
    if (!mode) { if (Math.hypot(dx, dy) < 8) return; mode = Math.abs(dx) > Math.abs(dy) ? 'swipe' : 'scroll'; if (mode === 'swipe') { try { row.setPointerCapture(e.pointerId); } catch (err) { /* pointer already gone */ } if (openSwipe && openSwipe !== box) openSwipe._close(); } }
    if (mode !== 'swipe') return;
    let nx = start + dx;
    if (nx > 0) nx = rubber(nx, 40);
    acts.style.transition = 'none';
    x = nx; paint(x, 'none');
    hist.push([e.clientX, performance.now()]); if (hist.length > 5) hist.shift();
  });
  const up = (e) => {
    if (id !== e.pointerId) return; id = null;
    if (mode !== 'swipe') { if (x > 0) close(); return; }
    const a = hist[0], b = hist[hist.length - 1];
    const v = b[1] > a[1] ? (b[0] - a[0]) / k / ((b[1] - a[1]) / 1000) : 0;
    const end = x + v * 0.1;
    if (-x > box.clientWidth * 0.6 || (v < -900 && -x > total())) commit(buttons[buttons.length - 1]);
    else if (-end > total() / 2) openTo(); else close();
  };
  row.addEventListener('pointerup', up); row.addEventListener('pointercancel', up); row.addEventListener('lostpointercapture', up);
  row.addEventListener('click', (e) => { if (mode === 'swipe') { e.preventDefault(); e.stopPropagation(); } else if (x) close(); }, true);
  row.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); openTo(); }
    if ((e.key === 'ArrowRight' || e.key === 'Escape') && x) { e.preventDefault(); e.stopPropagation(); close(); }
  });
  buttons.forEach((b) => b.addEventListener('click', () => {
    if (b === buttons[buttons.length - 1] && b.hasAttribute('data-swipe-commit')) commit(b);
    else { emit(box, 'lds:swipe', { action: b.getAttribute('data-swipe') || b.textContent.trim(), restore }); close(); row.focus(); }
  }));
}

/* Inline edit: <span class="inline-edit" data-lds-inline><button class="inline-edit__text">Name</button></span>
   Enter saves, Escape restores. Listen for lds:save and call e.detail.wait(promise); a rejection rolls back. */
function bindInline(wrap) {
  const btn = wrap.querySelector('.inline-edit__text');
  const label = btn.querySelector('.inline-edit__value') || btn;
  let state = wrap.querySelector('.inline-edit__state');
  if (!state) { state = document.createElement('span'); state.className = 'inline-edit__state'; state.setAttribute('aria-hidden', 'true'); state.innerHTML = '<svg viewBox="0 0 16 16"><path d="M3 8.5l3.2 3L13 4.5"/></svg>'; wrap.appendChild(state); }
  const live = document.createElement('span'); live.className = 'sr-only'; live.setAttribute('role', 'status'); wrap.appendChild(live);
  btn.addEventListener('click', () => {
    const before = label.textContent.trim();
    const input = document.createElement('input');
    input.className = 'inline-edit__input'; input.value = before; input.setAttribute('aria-label', btn.getAttribute('aria-label') || 'Edit');
    input.style.width = `${Math.max(btn.offsetWidth, 80)}px`;
    btn.hidden = true; wrap.insertBefore(input, btn); input.focus(); input.select();
    wrap.classList.remove('is-saved');
    let done = false;
    const finish = (save) => {
      if (done) return; done = true;
      const v = input.value.trim();
      input.remove(); btn.hidden = false;
      if (!save || !v || v === before) { btn.focus(); return; }
      label.textContent = v; btn.focus();
      let pending = null;
      emit(wrap, 'lds:save', { value: v, previous: before, wait: (p) => { pending = p; } });
      Promise.resolve(pending).then(() => { wrap.classList.remove('is-saved'); void wrap.offsetWidth; wrap.classList.add('is-saved'); live.textContent = 'Saved'; setTimeout(() => wrap.classList.remove('is-saved'), 1800); },
        () => { label.textContent = before; shake(wrap); live.textContent = 'Could not save. Restored the previous name.'; });
    };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); finish(true); } if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); finish(false); } });
    input.addEventListener('blur', () => finish(true));
  });
}

/* Scroll edges: <div class="fade-edges" data-lds-fade> fades an edge only while content waits past it. */
function bindFade(el) {
  const horizontal = el.classList.contains('fade-edges--x');
  const sync = () => {
    const pos = horizontal ? el.scrollLeft : el.scrollTop;
    const max = horizontal ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight;
    el.style.setProperty('--fade-a', `${Math.min(pos, 24)}px`);
    el.style.setProperty('--fade-b', `${Math.min(Math.max(max - pos, 0), 24)}px`);
  };
  el.addEventListener('scroll', sync, { passive: true }); sync();
  if (typeof ResizeObserver === 'function') new ResizeObserver(sync).observe(el);
}

/* Thinking: shimmer label, dot-grid wave, elapsed time. thinkingDone(el, 'Found 3 free slots') settles it.
   <div class="thinking" data-lds-thinking><span class="dotgrid"></span><span class="shimmer">Checking</span><span class="thinking__time"></span></div> */
function bindThinking(el) {
  const grid = el.querySelector('.dotgrid'), time = el.querySelector('.thinking__time');
  if (grid && !grid.children.length) for (let i = 0; i < 9; i++) grid.appendChild(document.createElement('i'));
  // The dot wave is pure CSS; only the elapsed time needs a clock.
  if (!time) return;
  const t0 = performance.now();
  const tick = () => {
    if (!el.isConnected || el.classList.contains('is-done')) return;
    const sec = Math.floor((performance.now() - t0) / 1000);
    time.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
    setTimeout(tick, 250);
  };
  tick();
}
export function thinkingDone(el, label) {
  el.classList.add('is-done');
  const sh = el.querySelector('.shimmer');
  if (sh) { sh.classList.add('is-settled'); if (label) { if (!sh.classList.contains('morph')) { sh.classList.add('morph'); primeMorph(sh); } morphText(sh, label); } }
  haptic('success');
}

/* Upload progress drawn around the drop zone's edge, with a percent pill. uploadProgress(drop, 0..100) */
export function uploadProgress(drop, pct) {
  let ring = drop.querySelector('.drop__ring');
  if (!ring) {
    ring = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); ring.setAttribute('class', 'drop__ring'); ring.setAttribute('aria-hidden', 'true');
    ring.innerHTML = '<rect x="1" y="1" pathLength="100"/>';
    drop.appendChild(ring);
    const pill = document.createElement('span'); pill.className = 'drop__pct'; pill.setAttribute('role', 'progressbar'); pill.setAttribute('aria-valuemin', '0'); pill.setAttribute('aria-valuemax', '100'); pill.setAttribute('aria-label', 'Upload progress');
    drop.appendChild(pill);
  }
  const r = drop.getBoundingClientRect(), rect = ring.firstChild;
  rect.setAttribute('width', r.width - 2); rect.setAttribute('height', r.height - 2);
  const rad = parseFloat(getComputedStyle(drop).borderTopLeftRadius) || 0;
  rect.setAttribute('rx', Math.max(rad - 1, 0));
  const p = Math.max(0, Math.min(100, Math.round(pct)));
  rect.style.strokeDasharray = `${p} 200`;
  const pill = drop.querySelector('.drop__pct'); pill.textContent = `${p}%`; pill.setAttribute('aria-valuenow', String(p));
  drop.classList.add('is-uploading'); drop.classList.toggle('is-complete', p >= 100);
  if (p >= 100) haptic('success');
}
export function uploadReset(drop) { drop.classList.remove('is-uploading', 'is-complete'); }

/* Hints that retire: <div class="hint" data-lds-hint="swipe-rows" data-max="3">. Shown on the first N
   visits, gone once dismissed. resetHints() brings them back (from a help menu, say). */
const hintKey = (k) => `lds-hint:${k}`;
function bindHint(el) {
  const k = el.getAttribute('data-lds-hint'), max = Number(el.dataset.max || 3);
  let n = 0; try { n = Number(localStorage.getItem(hintKey(k)) || 0); } catch (e) { /* storage blocked: always show */ }
  if (n >= max) { el.hidden = true; return; }
  try { localStorage.setItem(hintKey(k), String(n + 1)); } catch (e) { /* ignore */ }
  el.setAttribute('data-seen', String(n + 1));
  const x = el.querySelector('[data-lds-hint-close]');
  x && x.addEventListener('click', () => { try { localStorage.setItem(hintKey(k), String(max)); } catch (e) { /* ignore */ } const c = el.closest('.collapse'); if (c) c.classList.add('is-closed'); else el.hidden = true; });
}
export function resetHints(keys) {
  try { Object.keys(localStorage).filter((k) => k.startsWith('lds-hint:') && (!keys || keys.includes(k.slice(9)))).forEach((k) => localStorage.removeItem(k)); } catch (e) { /* ignore */ }
}

/* ---------- init ---------- */
let globalBound = false;
/* ---------- App shell ----------
   <div class="shell" data-lds-shell> <aside class="shell__side"><nav class="shell__nav"><span class="shell__hl"></span>
   <a class="shell__link" aria-current="page">…</a>…</nav></aside> <div class="shell__scrim"></div>
   <div class="shell__main"><header class="shell__top"><button data-lds-shell-toggle aria-expanded="false">…</button>…</header>…</div></div>
   The drawer closes on the scrim, on Escape, and when a link inside it is followed. */
export function placeShellHighlight(shell) {
  const nav = shell.querySelector('.shell__nav'), hl = shell.querySelector('.shell__hl');
  if (!nav || !hl) return;
  const cur = nav.querySelector('[aria-current="page"]');
  const folded = cur && cur.closest('.shell__panel:not(.is-open)');
  if (!cur || folded) { hl.style.opacity = '0'; return; }
  hl.style.opacity = '1';
  hl.style.height = `${cur.offsetHeight}px`;
  hl.style.transform = `translateY(${cur.offsetTop}px)`;
}
function bindShell(shell) {
  const toggles = $$(shell, '[data-lds-shell-toggle]');
  const side = shell.querySelector('.shell__side');
  const set = (open) => {
    shell.classList.toggle('is-menu', open);
    toggles.forEach((t) => t.setAttribute('aria-expanded', String(open)));
    if (open) side?.querySelector(FOCUSABLE)?.focus({ preventScroll: true });
    else if (shell.contains(document.activeElement) && side?.contains(document.activeElement)) toggles[0]?.focus();
  };
  toggles.forEach((t) => t.addEventListener('click', () => set(!shell.classList.contains('is-menu'))));
  shell.querySelector('.shell__scrim')?.addEventListener('click', () => set(false));
  side?.addEventListener('click', (e) => { if (e.target.closest('a[href]')) set(false); });
  shell.addEventListener('keydown', (e) => { if (e.key === 'Escape' && shell.classList.contains('is-menu')) { e.stopPropagation(); set(false); } });
  const nav = shell.querySelector('.shell__nav');
  if (nav) {
    const hl = shell.querySelector('.shell__hl');
    if (nav.classList.contains('has-hl')) {
      // the paint-time snippet placed it (and may be gliding it in); just hand transitions back
      if (hl) requestAnimationFrame(() => requestAnimationFrame(() => { hl.style.transition = ''; }));
    } else {
      if (hl) hl.style.transition = 'none';
      placeShellHighlight(shell);
      if (hl) requestAnimationFrame(() => { hl.style.transition = ''; });
    }
    new MutationObserver(() => placeShellHighlight(shell)).observe(nav, { subtree: true, attributes: true, attributeFilter: ['aria-current'] });
    if (typeof ResizeObserver === 'function') new ResizeObserver(() => placeShellHighlight(shell)).observe(nav);
    nav.classList.add('has-hl');
  }
  // Multi-page apps: keep the sidebar where it was, so the link just clicked stays under the pointer.
  if (side) {
    let quiet;
    side.addEventListener('scroll', () => { side.classList.add('is-scrolling'); clearTimeout(quiet); quiet = setTimeout(() => side.classList.remove('is-scrolling'), 900); }, { passive: true });
    const KEY = 'lds-shell-scroll';
    const save = () => { try { sessionStorage.setItem(KEY, String(side.scrollTop)); } catch {} };
    // On leaving, remember the scroll and the current link, so the next page's highlight glides from it
    const leave = () => {
      save();
      const from = side.querySelector('[aria-current="page"]');
      try { if (from) sessionStorage.setItem('lds-shell-from', from.getAttribute('href')); } catch {}
    };
    side.addEventListener('click', (e) => { if (e.target.closest('a[href]')) save(); });
    addEventListener('pagehide', leave);
    if (!side.hasAttribute('data-restored')) {
      try { const v = sessionStorage.getItem(KEY); if (v != null) side.scrollTop = +v; } catch {}
      side.setAttribute('data-restored', '');
    }
    const cur = side.querySelector('[aria-current="page"]');
    if (cur) {
      const r = cur.getBoundingClientRect(), sr = side.getBoundingClientRect();
      if (sr.height && (r.top < sr.top + 56 || r.bottom > sr.bottom - 16)) side.scrollTop += r.top - sr.top - sr.height / 2 + r.height / 2;
    }
  }
}


/* ---------- Page modals ----------
   <dialog class="modal" id="report">…<button data-lds-modal-close>…</button></dialog>
   <button data-lds-modal="report">Report a mistake</button>
   Opens with showModal(); closes with an exit animation on the close button, Escape and a
   click on the backdrop. closeModal(el) works for .modal and for an in-place .overlay. */
export function closeModal(el, done) {
  if (!el || el.classList.contains('is-closing')) return;
  const finish = () => { el.classList.remove('is-closing'); if (typeof el.close === 'function' && el.open) el.close(); done?.(); };
  if (reduceMotion()) return finish();
  el.classList.add('is-closing');
  const ms = parseFloat(getComputedStyle(el).getPropertyValue('--d-exit')) || 180;
  setTimeout(finish, el.matches('.modal') && matchMedia('(max-width: 600px)').matches ? 260 : ms);
}
export function openModal(el) {
  if (!el || el.open) return;
  el.classList.remove('is-closing');
  el.showModal();
}
function bindModal(d) {
  d.addEventListener('cancel', (e) => { e.preventDefault(); closeModal(d); });
  d.addEventListener('click', (e) => { if (e.target === d) closeModal(d); });
  $$(d, '[data-lds-modal-close]').forEach((b) => b.addEventListener('click', () => closeModal(d)));
}

/* ---------- Reveal on scroll ----------
   observeReveal(root) watches [data-lds-reveal] under root, now and as new markup arrives, and
   returns a stop function. What is already on screen shows at once, without a flicker. */
export function observeReveal(root = document) {
  if (typeof IntersectionObserver !== 'function' || reduceMotion()) return () => {};
  const html = document.documentElement;
  if (!html.classList.contains('lds-reveal')) {
    const edge = innerHeight * 0.95;
    $$(root, '[data-lds-reveal]').forEach((el) => el.getBoundingClientRect().top < edge && el.setAttribute('data-shown', ''));
    html.classList.add('lds-reveal');
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.setAttribute('data-shown', ''); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.01 });
  const watch = () => $$(root, '[data-lds-reveal]:not([data-shown])').forEach((el) => io.observe(el));
  watch();
  const mo = new MutationObserver(watch);
  mo.observe(root === document ? document.body : root, { childList: true, subtree: true });
  return () => { io.disconnect(); mo.disconnect(); };
}

/* ---------- Select and combobox in the page flow ----------
   Select: <div class="select" data-lds-select><button class="control select-trigger" aria-haspopup="listbox"
   aria-expanded="false"><span class="select__value">Choose</span><span class="ic">expand_more</span></button>
   <ul class="menu select__menu" role="listbox"><li role="option" class="menu__item" data-value="a">…</li></ul></div>
   Combobox: the same wrapper with class="select combobox" and data-lds-combobox, and a
   <div class="control combobox__control"><input role="combobox"></div> in place of the button; typing filters.
   Both: arrows, Home/End, Enter picks, Escape closes; a pick fires "lds:change" with { value, label }. */
function listbox(wrap, { input, trigger }) {
  const menu = wrap.querySelector('[role="listbox"]');
  const ctrl = input ? input.closest('.control') : trigger;
  const owner = input || trigger;
  if (!menu.id) menu.id = `lds-lb-${Math.random().toString(36).slice(2, 8)}`;
  owner.setAttribute('aria-controls', menu.id);
  const opts = () => $$(menu, '[role="option"]:not([hidden])');
  let active = -1, typed = '', typedAt = 0;
  const empty = menu.querySelector('.select__empty');
  const mark = (i) => {
    const list = opts();
    active = Math.max(0, Math.min(list.length - 1, i));
    list.forEach((o, j) => { o.classList.toggle('is-hover', j === active); if (!o.id) o.id = `${menu.id}-${j}`; });
    const cur = list[active];
    if (cur) { owner.setAttribute('aria-activedescendant', cur.id); cur.scrollIntoView({ block: 'nearest' }); }
  };
  const open = () => {
    menu.classList.add('is-open'); owner.setAttribute('aria-expanded', 'true'); ctrl.classList.add('is-open'); fitLayer(menu);
    const list = opts(); mark(Math.max(0, list.findIndex((o) => o.getAttribute('aria-selected') === 'true')));
  };
  const close = () => { menu.classList.remove('is-open'); owner.setAttribute('aria-expanded', 'false'); ctrl.classList.remove('is-open'); owner.removeAttribute('aria-activedescendant'); };
  let hiddenIn = null;
  if (wrap.dataset.name) { hiddenIn = document.createElement('input'); hiddenIn.type = 'hidden'; hiddenIn.name = wrap.dataset.name; wrap.appendChild(hiddenIn); const sel = menu.querySelector('[aria-selected="true"]'); if (sel) hiddenIn.value = sel.getAttribute('data-value') ?? sel.textContent.trim(); }
  let chosenLabel = input ? input.value : '';
  const pick = (o) => {
    if (!o) return;
    $$(menu, '[role="option"]').forEach((x) => { const on = x === o; x.setAttribute('aria-selected', String(on)); x.classList.toggle('is-selected', on); });
    const label = (o.querySelector('.select__text')?.firstChild?.textContent || o.textContent).trim();
    if (hiddenIn) hiddenIn.value = o.getAttribute('data-value') ?? label;
    if (input) { input.value = label; chosenLabel = label; }
    else { const v = wrap.querySelector('.select__value'); if (v) v.textContent = label; trigger.classList.remove('is-placeholder'); }
    close(); owner.focus();
    emit(wrap, 'lds:change', { value: o.getAttribute('data-value') ?? label, label });
  };
  const filter = () => {
    const q = input.value.trim().toLowerCase();
    let n = 0;
    $$(menu, '[role="option"]').forEach((o) => { const hit = !q || o.textContent.toLowerCase().includes(q); o.hidden = !hit; n += hit; });
    if (empty) empty.hidden = n > 0;
    mark(0);
  };
  menu.addEventListener('pointerdown', (e) => { const o = e.target.closest('[role="option"]'); if (o) { e.preventDefault(); pick(o); } });
  menu.addEventListener('pointermove', (e) => { const o = e.target.closest('[role="option"]'); if (o) mark(opts().indexOf(o)); });
  document.addEventListener('pointerdown', (e) => { if (!wrap.contains(e.target)) close(); });
  owner.addEventListener('keydown', (e) => {
    const isOpen = menu.classList.contains('is-open');
    if (!isOpen && ['ArrowDown', 'ArrowUp'].concat(input ? [] : ['Enter', ' ']).includes(e.key)) { e.preventDefault(); return open(); }
    if (!isOpen) return;
    if (e.key === 'ArrowDown') mark(active + 1);
    else if (e.key === 'ArrowUp') mark(active - 1);
    else if (e.key === 'Home' && !input) mark(0);
    else if (e.key === 'End' && !input) mark(opts().length - 1);
    else if (e.key === 'Enter' || (e.key === ' ' && !input)) pick(opts()[active]);
    else if (e.key === 'Escape') { e.stopPropagation(); close(); if (input) { input.value = chosenLabel; filter(); close(); } }
    else if (e.key === 'Tab') return close();
    else if (!input && e.key.length === 1) {
      typed = performance.now() - typedAt < 700 ? typed + e.key.toLowerCase() : e.key.toLowerCase(); typedAt = performance.now();
      const j = opts().findIndex((o) => o.textContent.trim().toLowerCase().startsWith(typed));
      if (j >= 0) mark(j);
      return;
    } else return;
    e.preventDefault();
  });
  if (input) {
    input.setAttribute('aria-expanded', 'false'); input.setAttribute('aria-autocomplete', 'list'); input.autocomplete = 'off';
    input.addEventListener('input', () => { open(); filter(); });
    input.addEventListener('focus', () => { input.select(); open(); });
  } else trigger.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.contains('is-open') ? close() : open(); });
}
function bindSelect(wrap) { const trigger = wrap.querySelector('.select-trigger'); if (trigger) listbox(wrap, { trigger }); }
function bindCombobox(wrap) { const input = wrap.querySelector('input[role="combobox"]'); if (input) listbox(wrap, { input }); }

/* ---------- Nested navigation, top nav, outline ---------- */
function bindShellSections(root) {
  $$(root, '.shell__section-btn[aria-controls]').forEach((btn) => {
    if (!once(btn)) return;
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    if (panel.querySelector('[aria-current="page"]')) btn.setAttribute('aria-expanded', 'true');
    const sync = () => panel.classList.toggle('is-open', btn.getAttribute('aria-expanded') === 'true');
    sync();
    btn.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true'));
      sync();
      const shell = btn.closest('.shell');
      if (shell) setTimeout(() => placeShellHighlight(shell), 420);
    });
  });
}
function bindTopnav(nav) {
  const t = nav.querySelector('[data-lds-topnav-toggle]');
  if (!t) return;
  const set = (open) => { nav.classList.toggle('is-open', open); t.setAttribute('aria-expanded', String(open)); };
  t.addEventListener('click', (e) => { e.stopPropagation(); set(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', (e) => { if (e.target.closest('.topnav__link')) set(false); });
  document.addEventListener('pointerdown', (e) => { if (!nav.contains(e.target)) set(false); });
  nav.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { set(false); t.focus(); } });
}
/* Outline: <nav class="toc" data-lds-toc><span class="toc__ink"></span><a href="#intro">…</a>…</nav> */
function bindToc(toc) {
  const links = $$(toc, 'a[href^="#"]');
  const ink = toc.querySelector('.toc__ink');
  const targets = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
  if (!targets.length || typeof IntersectionObserver !== 'function') return;
  const mark = (id) => links.forEach((a) => {
    const on = a.hash.slice(1) === id;
    if (on) { a.setAttribute('aria-current', 'true'); if (ink) { ink.style.transform = `translateY(${a.offsetTop}px)`; ink.style.height = `${a.offsetHeight}px`; } }
    else a.removeAttribute('aria-current');
  });
  const seen = new Map();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target.id, e.isIntersecting ? e.boundingClientRect.top : Infinity));
    const best = [...seen.entries()].filter(([, top]) => top !== Infinity).sort((a, b) => a[1] - b[1])[0];
    if (best) mark(best[0]);
  }, { rootMargin: '0px 0px -60% 0px' });
  targets.forEach((t) => io.observe(t));
  mark(targets[0].id);
}

/* ---------- Time ---------- */
/* <time class="timestamp" data-lds-time="2026-11-16T09:30:00+07:00"></time> shows "5 minutes ago" in the
   page language and keeps it current; the full date goes into title. */
function bindTime(el) {
  const d = new Date(el.getAttribute('data-lds-time'));
  if (isNaN(d)) return;
  const lang = el.closest('[lang]')?.getAttribute('lang') || undefined;
  el.setAttribute('datetime', d.toISOString());
  el.title = d.toLocaleString(lang, { dateStyle: 'long', timeStyle: 'short' });
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  const steps = [[60, 'second'], [60, 'minute'], [24, 'hour'], [7, 'day'], [4.345, 'week'], [12, 'month'], [Infinity, 'year']];
  const tick = () => {
    if (!el.isConnected) return;
    let v = (d - Date.now()) / 1000, unit = 'second';
    for (const [n, u] of steps) { unit = u; if (Math.abs(v) < n) break; v /= n; }
    el.textContent = Math.abs(v) < 45 && unit === 'second' ? rtf.format(0, 'second') : rtf.format(Math.round(v), unit);
    setTimeout(tick, unit === 'second' ? 15000 : 60000);
  };
  tick();
}
/* <span class="timer" data-lds-timer="5400" data-low="300"><span class="ic">schedule</span><span class="timer__t"></span></span>
   counts down, turns .is-low under data-low seconds, .is-up at zero, and fires lds:timeup. */
function bindTimer(el) {
  let left = Number(el.getAttribute('data-lds-timer')) || 0;
  const low = Number(el.getAttribute('data-low')) || 60;
  const out = el.querySelector('.timer__t') || el;
  el.setAttribute('role', 'timer');
  const fmt = (s) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return (h ? `${h}:${String(m).padStart(2, '0')}` : `${m}`) + `:${String(x).padStart(2, '0')}`; };
  const end = Date.now() + left * 1000;
  const tick = () => {
    if (!el.isConnected) return;
    left = Math.max(0, Math.round((end - Date.now()) / 1000));
    out.textContent = fmt(left);
    el.classList.toggle('is-low', left > 0 && left <= low);
    el.classList.toggle('is-up', left === 0);
    if (left === 0) return emit(el, 'lds:timeup');
    setTimeout(tick, 250);
  };
  tick();
}
/* Count up: <span class="timer" data-lds-elapsed="192" data-target="840"><span class="ic">schedule</span><span class="timer__t"></span></span>
   shows the time since something started (seconds already elapsed at render), turns .is-low from
   data-low seconds (default 80 % of data-target) and .is-up past data-target, firing lds:overdue once. */
function bindElapsed(el) {
  const target = Number(el.getAttribute('data-target')) || 0;
  const low = Number(el.getAttribute('data-low')) || Math.round(target * 0.8);
  const out = el.querySelector('.timer__t') || el;
  const start = Date.now() - (Number(el.getAttribute('data-lds-elapsed')) || 0) * 1000;
  el.setAttribute('role', 'timer');
  const fmt = (s) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return (h ? `${h}:${String(m).padStart(2, '0')}` : `${m}`) + `:${String(x).padStart(2, '0')}`; };
  let over = false, away = 0;
  const tick = () => {
    // taken out of the page (a bumped ticket that may come back with Undo): look again for 5 minutes
    if (!el.isConnected) { if ((away += 2000) <= 300000) setTimeout(tick, 2000); return; }
    away = 0;
    const s = Math.max(0, Math.floor((Date.now() - start) / 1000));
    out.textContent = fmt(s);
    if (target) {
      el.classList.toggle('is-low', s >= low && s <= target);
      el.classList.toggle('is-up', s > target);
      if (s > target && !over) { over = true; emit(el, 'lds:overdue'); }
    }
    setTimeout(tick, 250);
  };
  tick();
}

/* ---------- Show more ----------
   <div class="more" data-lds-more data-more="Show 4 more" data-less="Show less"><ul class="list">…first items…</ul>
   <div class="more__rest"><div><ul class="list">…the rest…</ul></div></div><button class="btn btn--plain btn--sm more__btn"></button></div> */
function bindMore(box) {
  const btn = box.querySelector('.more__btn'), rest = box.querySelector('.more__rest');
  if (!btn || !rest) return;
  const label = () => { const open = box.classList.contains('is-open'); btn.textContent = open ? box.getAttribute('data-less') || 'Show less' : box.getAttribute('data-more') || 'Show more'; btn.setAttribute('aria-expanded', String(open)); rest.inert = !open; };
  label();
  btn.addEventListener('click', () => { box.classList.toggle('is-open'); label(); });
}

/* ---------- Resizable split ---------- */
function bindResize(box) {
  const h = box.querySelector('.resize__handle');
  if (!h) return;
  const vertical = box.classList.contains('resize--y');
  const min = Number(box.getAttribute('data-min')) || 20, max = Number(box.getAttribute('data-max')) || 80;
  let pct = parseFloat(getComputedStyle(box).getPropertyValue('--size')) || 50;
  const set = (v) => { pct = Math.min(max, Math.max(min, v)); box.style.setProperty('--size', `${pct}%`); h.setAttribute('aria-valuenow', String(Math.round(pct))); };
  h.setAttribute('role', 'separator'); h.setAttribute('tabindex', '0');
  if (!h.hasAttribute('aria-label') && !h.hasAttribute('aria-labelledby')) h.setAttribute('aria-label', box.getAttribute('data-label') || 'Resize panels');
  h.setAttribute('aria-orientation', vertical ? 'horizontal' : 'vertical'); h.setAttribute('aria-valuemin', String(min)); h.setAttribute('aria-valuemax', String(max));
  set(pct);
  h.addEventListener('pointerdown', (e) => {
    h.setPointerCapture(e.pointerId); h.classList.add('is-dragging');
    const r = box.getBoundingClientRect();
    const move = (ev) => set(vertical ? ((ev.clientY - r.top) / r.height) * 100 : ((ev.clientX - r.left) / r.width) * 100);
    const up = () => { h.classList.remove('is-dragging'); h.removeEventListener('pointermove', move); emit(box, 'lds:resize', { size: pct }); };
    h.addEventListener('pointermove', move); h.addEventListener('pointerup', up, { once: true }); h.addEventListener('pointercancel', up, { once: true });
  });
  h.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 10 : 2;
    const k = { ArrowLeft: -step, ArrowUp: -step, ArrowRight: step, ArrowDown: step }[e.key];
    if (k !== undefined) { e.preventDefault(); set(pct + k); } else if (e.key === 'Home') set(min); else if (e.key === 'End') set(max); else return;
    emit(box, 'lds:resize', { size: pct });
  });
}

/* ---------- Shared element (FLIP) ----------
   flip(from, to): "to" is already in its final place; it is drawn where "from" was and travels to its own
   box on the smooth spring (enter) or, with { back: true }, from its box into "from" on the exit curve.
   The source hides during the flight so one object moves, not two. Resolves when done. */
const tok = (name, fb) => (typeof getComputedStyle === 'function' && getComputedStyle(document.documentElement).getPropertyValue(name).trim()) || fb;
export function flip(from, to, { back = false } = {}) {
  if (!from || !to || reduceMotion() || typeof to.animate !== 'function') return Promise.resolve();
  const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
  if (!b.width || !b.height) return Promise.resolve();
  const t = `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`;
  const prevO = to.style.transformOrigin; to.style.transformOrigin = '0 0';
  const prevV = from.style.visibility; from.style.visibility = 'hidden';
  const frames = back ? [{ transform: 'none' }, { transform: t }] : [{ transform: t }, { transform: 'none' }];
  const anim = to.animate(frames, back
    ? { duration: parseFloat(tok('--d-exit', '180')) || 180, easing: tok('--ease-exit', 'cubic-bezier(0.7, 0, 0.84, 0)'), fill: 'forwards' }
    : { duration: parseFloat(tok('--d-smooth', '420')) || 420, easing: tok('--ease-enter', 'cubic-bezier(0.16, 1, 0.3, 1)') });
  return anim.finished.catch(() => {}).then(() => { to.style.transformOrigin = prevO; from.style.visibility = prevV; });
}

/* ---------- Lightbox ----------
   <a class="thumb" href="large.jpg" data-lds-lightbox data-caption="Campus library"><img src="small.jpg" alt="Campus library"></a>
   The picture grows out of the thumbnail (FLIP) and returns into it on close. */
function bindLightbox(a) {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const thumb = a.querySelector('img');
    const box = document.createElement('div');
    box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', a.getAttribute('data-caption') || thumb?.alt || 'Image');
    const img = document.createElement('img'); img.src = a.href; img.alt = thumb?.alt || '';
    const close = document.createElement('button'); close.className = 'icon-btn lightbox__close'; close.setAttribute('aria-label', a.getAttribute('data-close') || 'Close'); close.innerHTML = '<span class="ic" aria-hidden="true">close</span>';
    box.append(img, close);
    if (a.getAttribute('data-caption')) { const c = document.createElement('p'); c.className = 'lightbox__caption'; c.textContent = a.getAttribute('data-caption'); box.append(c); }
    document.body.append(box);
    const open = () => { box.classList.add('is-open'); close.focus({ preventScroll: true }); flip(thumb, img); };
    if (img.complete) requestAnimationFrame(open); else img.addEventListener('load', open, { once: true });
    const shut = () => { box.classList.remove('is-open'); document.removeEventListener('keydown', key); flip(thumb, img, { back: true }).then(() => { box.remove(); a.focus(); }); };
    const key = (ev) => { if (ev.key === 'Escape') shut(); if (ev.key === 'Tab') { ev.preventDefault(); close.focus(); } };
    document.addEventListener('keydown', key);
    box.addEventListener('click', (ev) => { if (ev.target !== img) shut(); });
  });
}

/* ---------- Chat ----------
   Composer: <form class="composer" data-lds-composer><textarea rows="1"></textarea><button class="composer__send">…</button></form>
   Enter sends (fires lds:send with { text }), Shift+Enter adds a line, the box grows with the text.
   streamText(el, text) writes a reply word by word with each word fading in. */
function bindComposer(form) {
  const ta = form.querySelector('textarea'), send = form.querySelector('.composer__send');
  if (!ta) return;
  const fit = () => { if (CSS.supports && CSS.supports('field-sizing', 'content')) return; ta.style.height = 'auto'; ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`; };
  const sync = () => { if (send) send.disabled = !ta.value.trim(); fit(); };
  ta.addEventListener('input', sync); sync();
  ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); } });
  form.addEventListener('submit', (e) => { e.preventDefault(); const text = ta.value.trim(); if (!text) return; emit(form, 'lds:send', { text }); ta.value = ''; sync(); ta.focus(); });
}
export function streamText(el, text, { wordMs = 40 } = {}) {
  el.classList.add('stream', 'is-streaming');
  el.textContent = '';
  const words = text.split(/(\s+)/);
  let i = 0;
  return new Promise((resolve) => {
    const step = () => {
      if (i >= words.length) { el.classList.remove('is-streaming'); return resolve(); }
      const w = words[i++];
      if (/^\s+$/.test(w)) el.append(w);
      else { const s = document.createElement('span'); s.className = 'stream__w'; s.textContent = w; el.append(s); }
      setTimeout(step, reduceMotion() ? 0 : wordMs);
    };
    step();
  });
}
/* Jump to latest: <button class="btn btn--secondary btn--sm chat__jump" data-lds-jump="scrollerId">Latest</button>
   shows while the scroller is away from the bottom. */
function bindJump(btn) {
  const id = btn.getAttribute('data-lds-jump');
  const sc = id === 'page' ? document.scrollingElement : document.getElementById(id);
  if (!sc) return;
  const target = id === 'page' ? window : sc;
  const sync = () => { const away = sc.scrollHeight - sc.scrollTop - sc.clientHeight > 160; btn.classList.toggle('is-visible', away); };
  target.addEventListener('scroll', sync, { passive: true }); sync();
  btn.addEventListener('click', () => sc.scrollTo({ top: sc.scrollHeight, behavior: reduceMotion() ? 'auto' : 'smooth' }));
}

/* ---------- Announcements ----------
   One polite live region for things that happen without a visible message (copied, saved, sorted). */
let liveRegion;
export function announce(text) {
  if (typeof document === 'undefined') return;
  if (!liveRegion || !liveRegion.isConnected) {
    liveRegion = document.createElement('div');
    liveRegion.className = 'sr-only'; liveRegion.setAttribute('aria-live', 'polite'); liveRegion.setAttribute('role', 'status');
    document.body.appendChild(liveRegion);
  }
  liveRegion.textContent = '';
  setTimeout(() => { liveRegion.textContent = text; }, 40);
}

/* ---------- Toggles ----------
   One toggle: <button class="toggle" aria-pressed="false" data-lds-toggle>. A group with one choice:
   <div class="toggle-group" role="radiogroup" data-lds-toggle="single"> with role="radio" + aria-checked toggles
   (arrow keys move and pick, one tab stop). A group of independent toggles: data-lds-toggle="multi". Fires lds:change. */
function bindToggle(el) {
  if (el.classList.contains('toggle')) {
    el.addEventListener('click', () => { const on = el.getAttribute('aria-pressed') !== 'true'; el.setAttribute('aria-pressed', String(on)); emit(el, 'lds:change', { pressed: on }); });
    return;
  }
  const items = () => $$(el, '.toggle');
  if (el.getAttribute('data-lds-toggle') === 'multi') {
    items().forEach((t) => t.addEventListener('click', () => { const on = t.getAttribute('aria-pressed') !== 'true'; t.setAttribute('aria-pressed', String(on)); emit(el, 'lds:change', { value: t.value || t.textContent.trim(), pressed: on }); }));
    return;
  }
  const pick = (t, focus) => {
    items().forEach((x) => { const on = x === t; x.setAttribute('aria-checked', String(on)); x.tabIndex = on ? 0 : -1; });
    if (focus) t.focus();
    emit(el, 'lds:change', { value: t.value || t.getAttribute('data-value') || t.textContent.trim() });
  };
  const list = items();
  const cur = list.find((t) => t.getAttribute('aria-checked') === 'true') || list[0];
  list.forEach((t) => { t.setAttribute('role', 'radio'); t.tabIndex = t === cur ? 0 : -1; if (!t.hasAttribute('aria-checked')) t.setAttribute('aria-checked', String(t === cur)); t.addEventListener('click', () => pick(t)); });
  el.addEventListener('keydown', (e) => {
    const l = items(), i = l.indexOf(document.activeElement);
    if (i < 0) return;
    const n = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: l.length - 1 }[e.key];
    if (n === undefined) return;
    e.preventDefault(); pick(l[(n + l.length) % l.length], true);
  });
}

/* ---------- Carousel ----------
   <div class="carousel" id="c1">…</div> <div class="dots" data-lds-carousel="c1"><button aria-label="Page 1"><i></i></button>…</div>
   Dots follow the scroll and jump to their page. */
function bindCarousel(dots) {
  const track = document.getElementById(dots.getAttribute('data-lds-carousel'));
  if (!track) return;
  const btns = $$(dots, 'button');
  const page = () => Math.round(track.scrollLeft / Math.max(1, track.scrollWidth - track.clientWidth) * (btns.length - 1));
  const sync = () => { const p = page(); btns.forEach((b, i) => (i === p ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current'))); };
  btns.forEach((b, i) => b.addEventListener('click', () => track.scrollTo({ left: (track.scrollWidth - track.clientWidth) * (i / Math.max(1, btns.length - 1)), behavior: reduceMotion() ? 'auto' : 'smooth' })));
  track.addEventListener('scroll', sync, { passive: true }); sync();
}

/* ---------- Table sorting ----------
   <table class="table" data-lds-sort> with <th aria-sort="none"><button>Name <span class="ic">arrow_downward</span></button></th>.
   Sorts tbody rows by that column (numbers as numbers), keeps aria-sort and the arrow in step, announces the order. */
function bindSort(table) {
  const ths = $$(table, 'thead th');
  ths.forEach((th, col) => {
    const b = th.querySelector('button'); if (!b) return;
    b.addEventListener('click', () => {
      const asc = th.getAttribute('aria-sort') !== 'ascending';
      ths.forEach((x) => { x.setAttribute('aria-sort', 'none'); const bb = x.querySelector('button'); bb && bb.classList.remove('is-sorted', 'is-desc'); });
      th.setAttribute('aria-sort', asc ? 'ascending' : 'descending'); b.classList.add('is-sorted'); b.classList.toggle('is-desc', !asc);
      const body = table.tBodies[0]; if (!body) return;
      const val = (r) => { const t = (r.cells[col]?.getAttribute('data-sort') ?? r.cells[col]?.textContent ?? '').trim(); const n = Number(t.replace(/[^\d.,-]/g, '').replace(/\.(?=\d{3}\b)/g, '').replace(',', '.')); return t !== '' && !isNaN(n) && /\d/.test(t) ? n : t.toLowerCase(); };
      const rows = Array.from(body.rows).sort((r1, r2) => { const a = val(r1), c = val(r2); return (a > c ? 1 : a < c ? -1 : 0) * (asc ? 1 : -1); });
      rows.forEach((r) => body.appendChild(r));
      announce(`${b.textContent.trim()}, ${asc ? 'ascending' : 'descending'}`);
    });
  });
}

/* ---------- Tree keyboard ----------
   <div class="tree" role="tree"> with .tree__row[role=treeitem][aria-expanded]: Up/Down move, Right opens or enters,
   Left closes or goes to the parent, Home/End; one tab stop. */
function bindTree(tree) {
  const rows = () => $$(tree, '.tree__row').filter((r) => !r.closest('[inert]') && r.offsetParent !== null);
  const all = $$(tree, '.tree__row');
  all.forEach((r, i) => { r.tabIndex = i === 0 ? 0 : -1; });
  const go = (r) => { if (!r) return; all.forEach((x) => { x.tabIndex = -1; }); r.tabIndex = 0; r.focus(); };
  tree.addEventListener('keydown', (e) => {
    const l = rows(), i = l.indexOf(document.activeElement); if (i < 0) return;
    const r = l[i], open = r.getAttribute('aria-expanded');
    if (e.key === 'ArrowDown') go(l[i + 1]);
    else if (e.key === 'ArrowUp') go(l[i - 1]);
    else if (e.key === 'Home') go(l[0]);
    else if (e.key === 'End') go(l[l.length - 1]);
    else if (e.key === 'ArrowRight') { if (open === 'false') r.click(); else if (open === 'true') setTimeout(() => go(rows()[i + 1]), 0); }
    else if (e.key === 'ArrowLeft') {
      if (open === 'true') r.click();
      else { const kids = r.closest('.tree__kids'); const parent = kids && $$(tree, '.tree__row').find((x) => x.getAttribute('aria-controls') === kids.id); go(parent); }
    } else return;
    e.preventDefault();
  });
}

/* ---------- Calendar ----------
   <div class="cal" data-lds-calendar> with .cal__day buttons carrying data-date="2026-11-16": click or Enter picks
   (aria-pressed + .is-selected), arrow keys move by day and week, one tab stop. Fires lds:change with { date }. */
function bindCalendar(cal) {
  const days = () => $$(cal, '.cal__day[data-date]:not(.is-muted)');
  const l0 = days(); if (!l0.length) return;
  const cur0 = l0.find((d) => d.classList.contains('is-selected')) || l0.find((d) => d.classList.contains('is-today')) || l0[0];
  l0.forEach((d) => { d.tabIndex = d === cur0 ? 0 : -1; d.setAttribute('aria-pressed', String(d.classList.contains('is-selected'))); });
  const pick = (d) => { days().forEach((x) => { const on = x === d; x.classList.toggle('is-selected', on); x.setAttribute('aria-pressed', String(on)); }); emit(cal, 'lds:change', { date: d.getAttribute('data-date') }); };
  const go = (d) => { if (!d) return; days().forEach((x) => { x.tabIndex = -1; }); d.tabIndex = 0; d.focus(); };
  cal.addEventListener('click', (e) => { const d = e.target.closest('.cal__day[data-date]:not(.is-muted)'); if (d) { pick(d); go(d); } });
  cal.addEventListener('keydown', (e) => {
    const l = days(), i = l.indexOf(document.activeElement); if (i < 0) return;
    const n = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[e.key];
    if (n !== undefined) { e.preventDefault(); go(l[Math.min(l.length - 1, Math.max(0, i + n))]); }
    else if (e.key === 'Home') { e.preventDefault(); go(l[0]); } else if (e.key === 'End') { e.preventDefault(); go(l[l.length - 1]); }
  });
}

/* ---------- Coachmark ----------
   <div class="coach" data-lds-coach="targetId" role="dialog" aria-label="Tip">…<button data-lds-coach-close>…</button></div>
   Sits under its target (or above with .coach--above), points at it, lights it, closes on Escape and returns focus. */
function bindCoach(coach) {
  const target = document.getElementById(coach.getAttribute('data-lds-coach'));
  const host = coach.offsetParent || coach.parentElement;
  const place = () => {
    if (!target || !host || coach.hidden) return;
    const h = host.getBoundingClientRect(), t = target.getBoundingClientRect();
    const above = coach.classList.contains('coach--above');
    const left = Math.max(8, Math.min(t.left - h.left, h.width - coach.offsetWidth - 8));
    coach.style.left = `${left}px`;
    coach.style.top = above ? `${t.top - h.top - coach.offsetHeight - 12}px` : `${t.bottom - h.top + 12}px`;
    coach.style.setProperty('--arrow', `${Math.max(14, Math.min(coach.offsetWidth - 26, t.left - h.left - left + t.width / 2 - 6))}px`);
  };
  const close = () => { coach.hidden = true; target && target.classList.remove('is-lit'); target && target.focus && target.focus(); emit(coach, 'lds:close'); };
  target && target.classList.add('is-lit');
  place();
  if (typeof ResizeObserver === 'function' && host) new ResizeObserver(place).observe(host);
  coach.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } });
  $$(coach, '[data-lds-coach-close]').forEach((b) => b.addEventListener('click', close));
}

/* ---------- Line chart crosshair ----------
   <div class="plot" data-lds-crosshair> <svg>…<line class="cross"/>…<circle data-x="40" data-y="80" data-label="Week 3: 72%"/>…</svg>
   <div class="ctip"></div></div>: pointer or arrow keys move the crosshair to the nearest point and fill the tooltip. */
function bindCrosshair(plot) {
  const svg = plot.querySelector('svg'), cross = plot.querySelector('.cross'), tip = plot.querySelector('.ctip');
  const pts = $$(plot, '[data-x]'); if (!svg || !pts.length) return;
  const xs = [...new Set(pts.map((p) => Number(p.getAttribute('data-x'))))].sort((a, b) => a - b);
  let idx = -1;
  const show = (i) => {
    idx = i; const x = xs[i]; const vb = svg.viewBox.baseVal; const k = svg.getBoundingClientRect().width / (vb && vb.width ? vb.width : svg.getBoundingClientRect().width);
    if (cross) { cross.setAttribute('x1', x); cross.setAttribute('x2', x); cross.style.opacity = '1'; }
    const here = pts.filter((p) => Number(p.getAttribute('data-x')) === x);
    if (tip) { tip.innerHTML = here.map((p) => `<div><i style="background:${p.getAttribute('data-color') || 'var(--series-1)'}"></i>${p.getAttribute('data-label') || ''}</div>`).join(''); tip.style.opacity = '1'; tip.style.left = `${Math.min(plot.clientWidth - tip.offsetWidth, Math.max(0, x * k - tip.offsetWidth / 2))}px`; }
  };
  const hide = () => { if (cross) cross.style.opacity = '0'; if (tip) tip.style.opacity = '0'; };
  hide();
  plot.addEventListener('pointermove', (e) => {
    const r = svg.getBoundingClientRect(); const vb = svg.viewBox.baseVal; const x = (e.clientX - r.left) * ((vb && vb.width) || r.width) / r.width;
    let best = 0; xs.forEach((v, i) => { if (Math.abs(v - x) < Math.abs(xs[best] - x)) best = i; }); show(best);
  });
  plot.addEventListener('pointerleave', hide);
  if (!plot.hasAttribute('tabindex')) plot.tabIndex = 0;
  plot.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(Math.min(xs.length - 1, idx + 1)); else if (e.key === 'ArrowLeft') show(Math.max(0, idx < 0 ? 0 : idx - 1)); else if (e.key === 'Escape') hide(); else return;
    e.preventDefault();
  });
  plot.addEventListener('blur', hide);
}

/* ---------- Form helpers ----------
   Tags:     <div class="control tags" data-lds-tags data-name="topics">…<input aria-label="Add a topic"></div>
             Enter or comma adds, Backspace on an empty field removes the last, each tag's button removes it.
   Chips:    <div class="chip-row" data-lds-chips="multi|single">: toggles aria-pressed (single keeps one on).
   Radios:   <div role="radiogroup" data-lds-radios> with [role=radio] children (.rcard, .star…): click and arrows
             pick, one tab stop, aria-checked kept. Rating: data-lds-rating on .stars also previews on hover.
   Reveal:   <button class="control__btn" data-lds-password aria-label="Show password"> in a .control with a password input.
   Count:    <textarea maxlength="280" data-lds-count="counterId"> updates "n / max" and marks .is-over near the end.
   Clear:    <button class="control__btn" data-lds-clear aria-label="Clear"> empties its field and refocuses it. */
function bindTags(box) {
  const input = box.querySelector('input'); if (!input) return;
  let hidden = null;
  if (box.dataset.name) { hidden = document.createElement('input'); hidden.type = 'hidden'; hidden.name = box.dataset.name; box.appendChild(hidden); }
  const sync = () => { const v = $$(box, '.tag').map((t) => t.firstChild.textContent.trim()); if (hidden) hidden.value = v.join(','); emit(box, 'lds:change', { tags: v }); };
  const wire = (tag) => { const b = tag.querySelector('button'); if (b) { b.type = 'button'; b.addEventListener('click', () => { tag.remove(); announce(`${tag.firstChild.textContent.trim()} removed`); sync(); input.focus(); }); } };
  const add = (text) => {
    const t = text.trim().replace(/,$/, ''); if (!t) return;
    if ($$(box, '.tag').some((x) => x.firstChild.textContent.trim().toLowerCase() === t.toLowerCase())) { shake(box); return; }
    const tag = document.createElement('span'); tag.className = 'tag';
    tag.append(document.createTextNode(t));
    const b = document.createElement('button'); b.setAttribute('aria-label', `${box.getAttribute('data-remove') || 'Remove'} ${t}`); b.innerHTML = '<span class="ic" aria-hidden="true">close</span>';
    tag.append(b); box.insertBefore(tag, input); wire(tag); sync();
  };
  $$(box, '.tag').forEach(wire);
  input.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.value.trim()) { e.preventDefault(); add(input.value); input.value = ''; }
    else if (e.key === 'Backspace' && !input.value) { const last = $$(box, '.tag').pop(); if (last) { last.remove(); sync(); } }
  });
  input.addEventListener('blur', () => { if (input.value.trim()) { add(input.value); input.value = ''; } });
  box.addEventListener('click', (e) => { if (e.target === box) input.focus(); });
}
function bindChips(row) {
  const single = row.getAttribute('data-lds-chips') === 'single';
  $$(row, '.chip').forEach((c) => {
    c.type = 'button';
    if (!c.hasAttribute('aria-pressed')) c.setAttribute('aria-pressed', 'false');
    c.addEventListener('click', () => {
      const on = c.getAttribute('aria-pressed') !== 'true';
      if (single) { if (!on) return; $$(row, '.chip').forEach((x) => x.setAttribute('aria-pressed', String(x === c))); }
      else c.setAttribute('aria-pressed', String(on));
      emit(row, 'lds:change', { value: c.value || c.textContent.trim(), pressed: on, selected: $$(row, '.chip[aria-pressed="true"]').map((x) => x.value || x.textContent.trim()) });
    });
  });
}
function bindRadios(group) {
  const items = () => $$(group, '[role="radio"]');
  const rating = group.hasAttribute('data-lds-rating');
  const paint = (upto, cls) => { if (rating) items().forEach((x, j) => x.classList.toggle(cls, j <= upto)); };
  const pick = (r, focus) => {
    const l = items(), i = l.indexOf(r);
    l.forEach((x) => { const on = x === r; x.setAttribute('aria-checked', String(on)); x.tabIndex = on ? 0 : -1; });
    paint(i, 'on');
    if (focus) r.focus();
    emit(group, 'lds:change', { value: r.getAttribute('data-value') || (rating ? i + 1 : r.textContent.trim()), index: i });
  };
  const l = items(); const cur = l.find((x) => x.getAttribute('aria-checked') === 'true');
  l.forEach((x, i) => { x.tabIndex = (cur ? x === cur : i === 0) ? 0 : -1; if (!x.hasAttribute('aria-checked')) x.setAttribute('aria-checked', 'false'); x.addEventListener('click', () => pick(x)); });
  if (cur) paint(l.indexOf(cur), 'on');
  if (rating) {
    l.forEach((x, i) => x.addEventListener('pointerenter', () => paint(i, 'preview')));
    group.addEventListener('pointerleave', () => paint(-1, 'preview'));
  }
  group.addEventListener('keydown', (e) => {
    const all = items(), i = all.indexOf(document.activeElement); if (i < 0) return;
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); return pick(all[i], true); }
    const n = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: all.length - 1 }[e.key];
    if (n === undefined) return;
    e.preventDefault(); pick(all[rating ? Math.min(all.length - 1, Math.max(0, n)) : (n + all.length) % all.length], true);
  });
}
function bindPassword(btn) {
  const input = btn.closest('.control')?.querySelector('input'); if (!input) return;
  btn.type = 'button';
  const show = btn.getAttribute('aria-label') || 'Show password', hide = btn.getAttribute('data-hide-label') || 'Hide password';
  btn.setAttribute('aria-pressed', 'false');
  btn.addEventListener('click', () => {
    const on = input.type === 'password';
    input.type = on ? 'text' : 'password';
    btn.setAttribute('aria-pressed', String(on)); btn.setAttribute('aria-label', on ? hide : show);
    const ic = btn.querySelector('.ic'); if (ic) ic.textContent = on ? 'visibility_off' : 'visibility';
    input.focus();
  });
}
function bindCount(field) {
  const out = document.getElementById(field.getAttribute('data-lds-count')) || field.closest('.field')?.querySelector('.counter');
  const max = Number(field.getAttribute('maxlength')) || Number(field.getAttribute('data-max')) || 0;
  if (!out) return;
  const sync = () => { const n = field.value.length; out.textContent = max ? `${n} / ${max}` : String(n); out.classList.toggle('is-over', !!max && n >= max * 0.9); };
  field.addEventListener('input', sync); sync();
}
function bindClear(btn) {
  const input = btn.closest('.control')?.querySelector('input, textarea'); if (!input) return;
  btn.type = 'button';
  const sync = () => { btn.hidden = !input.value; };
  input.addEventListener('input', sync); sync();
  btn.addEventListener('click', () => { input.value = ''; input.dispatchEvent(new Event('input', { bubbles: true })); input.focus(); });
}

/* ---------- File input ----------
   <div class="drop" data-lds-file="fileListId"><span class="ic">cloud_upload</span><p class="drop__title">…</p>
   <button class="btn btn--secondary btn--md" data-lds-file-pick>Choose files</button><input type="file" hidden multiple></div>
   <div class="file-list" id="fileListId"></div>
   Drag over lights the zone, dropping or choosing adds a .file-row per file (name, size, remove) and fires lds:files
   with { files }; the app uploads and calls uploadProgress(drop, pct). */
function bindFile(drop) {
  const input = drop.querySelector('input[type="file"]');
  const list = document.getElementById(drop.getAttribute('data-lds-file'));
  const size = (n) => (n < 1024 ? `${n} B` : n < 1048576 ? `${Math.round(n / 1024)} KB` : `${(n / 1048576).toFixed(1)} MB`);
  const add = (files) => {
    const arr = Array.from(files || []); if (!arr.length) return;
    if (list) arr.forEach((f) => {
      const row = document.createElement('div'); row.className = 'file-row';
      row.innerHTML = '<span class="file-row__icon"><span class="ic" aria-hidden="true">insert_drive_file</span></span><span class="file-row__body"><span class="file-row__name"></span><span class="file-row__meta"></span></span><button type="button" class="icon-btn"><span class="ic" aria-hidden="true">close</span></button>';
      row.querySelector('.file-row__name').textContent = f.name;
      row.querySelector('.file-row__meta').textContent = size(f.size);
      const rm = row.querySelector('button'); rm.setAttribute('aria-label', `${drop.getAttribute('data-remove') || 'Remove'} ${f.name}`);
      rm.addEventListener('click', () => { row.remove(); emit(drop, 'lds:file-removed', { name: f.name }); });
      list.appendChild(row);
    });
    announce(`${arr.length} ${arr.length === 1 ? (drop.getAttribute('data-one') || 'file added') : (drop.getAttribute('data-many') || 'files added')}`);
    emit(drop, 'lds:files', { files: arr });
  };
  drop.querySelector('[data-lds-file-pick]')?.addEventListener('click', () => input && input.click());
  input && input.addEventListener('change', () => { add(input.files); input.value = ''; });
  let depth = 0;
  drop.addEventListener('dragenter', (e) => { e.preventDefault(); depth++; drop.classList.add('is-over'); });
  drop.addEventListener('dragover', (e) => e.preventDefault());
  drop.addEventListener('dragleave', () => { if (--depth <= 0) { depth = 0; drop.classList.remove('is-over'); } });
  drop.addEventListener('drop', (e) => { e.preventDefault(); depth = 0; drop.classList.remove('is-over'); add(e.dataTransfer && e.dataTransfer.files); });
}

/* ---------- Sidebar, menubar, overlay, command palette shortcut, navigation progress ---------- */
/* <nav class="sidebar" data-lds-sidebar>: the highlight sits under the item with aria-current and glides when it changes. */
function bindSidebar(bar) {
  const hl = bar.querySelector('.sidebar__hl');
  const place = () => { const cur = bar.querySelector('[aria-current="page"]'); if (!hl) return; if (!cur) { hl.style.opacity = '0'; return; } hl.style.opacity = '1'; hl.style.transform = `translateY(${cur.offsetTop}px)`; hl.style.height = `${cur.offsetHeight}px`; };
  place();
  $$(bar, '.sidebar__item').forEach((it) => it.addEventListener('click', () => { if (it.tagName === 'BUTTON') { $$(bar, '.sidebar__item').forEach((x) => x.removeAttribute('aria-current')); it.setAttribute('aria-current', 'page'); place(); } }));
  new MutationObserver(place).observe(bar, { subtree: true, attributes: true, attributeFilter: ['aria-current'] });
}
/* <div class="menubar" role="menubar" data-lds-menubar>: Left and Right move between the top buttons; with a menu open they switch menus. */
function bindMenubar(bar) {
  const btns = $$(bar, '.menubar__btn');
  btns.forEach((b, i) => { b.tabIndex = i === 0 ? 0 : -1; });
  bar.addEventListener('keydown', (e) => {
    const i = btns.indexOf(document.activeElement); if (i < 0) return;
    const n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: btns.length - 1 }[e.key]; if (n === undefined) return;
    e.preventDefault();
    const wasOpen = btns[i].getAttribute('aria-expanded') === 'true';
    const next = btns[(n + btns.length) % btns.length];
    btns.forEach((b) => { b.tabIndex = b === next ? 0 : -1; });
    if (wasOpen) { closeMenus(); next.click(); } else next.focus();
  });
}
/* <div class="overlay" data-lds-overlay>: focus moves inside, Tab stays inside, Escape and a click on the scrim fire
   lds:dismiss (the app then calls closeModal(el, unmount)); focus returns to where it was when the overlay leaves. */
function bindOverlay(ov) {
  const from = document.activeElement;
  const panel = ov.querySelector('.overlay__panel') || ov;
  setTimeout(() => (panel.querySelector('[autofocus], [data-lds-autofocus]') || panel.querySelector(FOCUSABLE))?.focus({ preventScroll: true }), 30);
  ov.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); emit(ov, 'lds:dismiss'); return; }
    if (e.key !== 'Tab') return;
    const f = $$(panel, FOCUSABLE).filter((x) => x.offsetParent !== null); if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });
  ov.addEventListener('click', (e) => { if (e.target === ov) emit(ov, 'lds:dismiss'); });
  const mo = new MutationObserver(() => { if (!ov.isConnected) { mo.disconnect(); from && from.focus && from.focus(); } });
  mo.observe(document.body, { childList: true, subtree: true });
}
/* <div class="cmdk" id="cmdk" data-lds-layer data-lds-cmdk-key="k">: Cmd+K (Mac) or Ctrl+K opens it from anywhere. */
function bindCmdkKey(layer) {
  const key = (layer.getAttribute('data-lds-cmdk-key') || 'k').toLowerCase();
  document.addEventListener('keydown', (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === key) { e.preventDefault(); openLayer(layer.id); } });
}
/* navProgress(el, true) when a navigation starts, navProgress(el, false) when the page is in: the bar runs to the end, then fades. */
export function navProgress(el, running) {
  if (!el) return;
  if (running) { el.classList.remove('is-done'); el.classList.add('is-running'); return; }
  if (!el.classList.contains('is-running')) return;
  el.classList.remove('is-running'); el.classList.add('is-done');
  setTimeout(() => el.classList.remove('is-done'), 480);
}

/* ---------- Plans: billing period and seats ----------
   <section data-lds-billing> holds a .seg of [data-billing="month|year"] buttons, prices as
   <span class="roll" data-price-month="24" data-price-year="19"> (add data-per-seat to multiply by
   the [data-lds-stepper] in the same .plan), and words as [data-billing-month][data-billing-year]
   (.morph elements morph). Emits lds:billing { period }. */
function bindBilling(box) {
  const pressed = box.querySelector('[data-billing][aria-pressed="true"]') || box.querySelector('[data-billing]');
  let period = pressed ? pressed.getAttribute('data-billing') : 'month';
  const seats = (el) => { const s = el.closest('.plan')?.querySelector('[data-lds-stepper]'); return s ? Number(s.dataset.value || 1) : 1; };
  const render = (animate) => {
    $$(box, '[data-price-month]').forEach((el) => {
      const n = Number(el.getAttribute(`data-price-${period}`)) * (el.hasAttribute('data-per-seat') ? seats(el) : 1);
      setRoll(el, n.toLocaleString('en-US'));
    });
    $$(box, '[data-billing-month]').forEach((el) => {
      const s = seats(el);
      const text = el.getAttribute(`data-billing-${period}`).replace('{seats}', s).replace('{total}', (Number(el.getAttribute('data-total-' + period) || 0) * s).toLocaleString('en-US'));
      if (el.dataset.shown === text) return;
      el.dataset.shown = text;
      if (animate && el.classList.contains('morph')) morphText(el, text); else el.textContent = text;
    });
    box.setAttribute('data-period', period);
    if (animate) emit(box, 'lds:billing', { period });
  };
  box.addEventListener('lds:change', (e) => {
    if (e.target.matches('[data-lds-stepper]')) { e.target.dataset.value = e.detail.value; render(true); return; }
    const p = e.detail && e.detail.item && e.detail.item.getAttribute('data-billing');
    if (p && p !== period) { period = p; render(true); }
  });
  render(false);
}

/* ---------- Data charts (area, line, bars, combo, donut, gauge) ----------
   drawChart(el, config) draws a chart from data into el (a .chart) and returns a handle. Calling it again on
   the same element, or handle.update(config), animates from what is on screen to the new data.
   Declarative: <div class="chart" data-lds-chart='{"x":[…],"series":[…],"label":"…"}'></div>, or data-lds-chart
   with a <script type="application/json"> child. A .seg or <select> with data-lds-chart-for="chartId" switches
   to config.sets[key] (button data-set="key", option value="key").
   Elements with data-lds-grow (ranked bars, funnel, target bar, donut, gauge, bars) grow from their baseline
   the first time they scroll into view. */
const SVGNS = 'http://www.w3.org/2000/svg';
const seriesColor = (s, i) => (s.color === 'neutral' ? 'var(--neutral)' : s.color === 'muted' ? 'var(--accent-tint-strong)' : `var(--series-${s.color || (i % 4) + 1})`);
const escHtml = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export function formatValue(v, f = {}) {
  const a = Math.abs(v); const d = f.decimals ?? 0; let s;
  if (f.compact && a >= 1000) s = a >= 1e6 ? `${+(a / 1e6).toFixed(a >= 1e7 ? 0 : 1)}M` : `${+(a / 1e3).toFixed(a >= 1e4 ? 0 : 1)}k`;
  else s = a.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  return `${v < 0 ? '−' : ''}${f.prefix || ''}${s}${f.suffix || ''}`;
}
const niceStep = (span, n = 4) => { const raw = span / n || 1; const p = 10 ** Math.floor(Math.log10(raw)); const m = raw / p; return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p; };
// Cubic-bezier easing, solved by Newton steps (same curves as the motion tokens)
const bezier = (x1, y1, x2, y2) => (t) => {
  let u = t; for (let k = 0; k < 6; k++) { const x = 3 * (1 - u) * (1 - u) * u * x1 + 3 * (1 - u) * u * u * x2 + u * u * u - t; const dx = 3 * (1 - u) * (1 - u) * x1 + 6 * (1 - u) * u * (x2 - x1) + 3 * u * u * (1 - x2); if (Math.abs(dx) < 1e-6) break; u = Math.min(1, Math.max(0, u - x / dx)); }
  return 3 * (1 - u) * (1 - u) * u * y1 + 3 * (1 - u) * u * u * y2 + u * u * u;
};
const EASE_INOUT = bezier(0.65, 0, 0.35, 1), EASE_ENTER = bezier(0.16, 1, 0.3, 1);
const barPath = (x, y0, y1, w, r) => {
  const h = Math.abs(y0 - y1); if (h < 0.5 || w < 0.5) return '';
  const t = Math.min(y0, y1), b = Math.max(y0, y1); r = Math.max(0, Math.min(r, w / 2, h));
  const f = (n) => +n.toFixed(2);
  if (y1 <= y0) return `M${f(x)} ${f(b)}V${f(t + r)}Q${f(x)} ${f(t)} ${f(x + r)} ${f(t)}H${f(x + w - r)}Q${f(x + w)} ${f(t)} ${f(x + w)} ${f(t + r)}V${f(b)}Z`;
  return `M${f(x)} ${f(t)}H${f(x + w)}V${f(b - r)}Q${f(x + w)} ${f(b)} ${f(x + w - r)} ${f(b)}H${f(x + r)}Q${f(x)} ${f(b)} ${f(x)} ${f(b - r)}Z`;
};

function readChartConfig(el) {
  const raw = el.getAttribute('data-lds-chart');
  try {
    if (raw && raw.trim()) return JSON.parse(raw);
    const s = el.querySelector('script[type="application/json"]'); return s ? JSON.parse(s.textContent) : null;
  } catch (e) { return null; }
}

/* XY chart: area, line and bar series on one x axis */
function xyChart(el, cfg) {
  const st = { cfg, hidden: new Set(), cur: null, idx: -1, w: 0, raf: 0, shown: false };
  el.classList.add('chart');
  const kinds = () => st.cfg.series.map((s) => s.kind || st.cfg.kind || 'area');
  const hasBars = () => kinds().includes('bar');
  const stacked = () => !!st.cfg.stacked;
  // Target values for every series, given what is hidden
  const target = () => {
    const k = kinds();
    return {
      v: st.cfg.series.map((s, i) => s.values.map((v) => (st.hidden.has(i) && (stacked() || k[i] === 'bar') ? 0 : v))),
      w: st.cfg.series.map((s, i) => (st.hidden.has(i) ? 0 : 1)),
    };
  };
  const extent = (v) => {
    const k = kinds(); let hi = 0, lo = 0; const n = st.cfg.x.length;
    for (let i = 0; i < n; i++) {
      let pos = 0, neg = 0;
      v.forEach((vals, s) => {
        if (st.hidden.has(s)) return;
        const x = vals[i] || 0;
        if (stacked() && k[s] !== 'line') { if (x >= 0) pos += x; else neg += x; } else { hi = Math.max(hi, x); lo = Math.min(lo, x); }
      });
      hi = Math.max(hi, pos); lo = Math.min(lo, neg);
    }
    (st.cfg.refs || []).forEach((r) => { hi = Math.max(hi, r.value); lo = Math.min(lo, r.value); });
    const y = st.cfg.y || {};
    const step = niceStep((y.max ?? hi) - (y.min ?? lo), y.ticks || 4);
    return { max: y.max ?? (Math.ceil(hi / step) * step || step), min: y.min ?? (lo < 0 ? Math.floor(lo / step) * step : 0) };
  };

  let svg, plot, tip, legend, table, parts;
  const build = () => {
    const c = st.cfg, n = c.x.length, k = kinds();
    const W = Math.max(240, Math.round(el.clientWidth || 600)), H = c.height || 220;
    st.w = W;
    const ext = st.cur ? { max: st.cur.max, min: st.cur.min } : extent(target().v);
    el.classList.toggle('is-stacked', stacked());
    const f = c.format || {};
    const tickStep = niceStep(ext.max - ext.min, (c.y && c.y.ticks) || 4);
    const ticks = []; for (let t = ext.min; t <= ext.max + tickStep / 1e3; t += tickStep) ticks.push(+t.toFixed(6));
    const showY = !(c.y && c.y.hide);
    const left = showY ? Math.ceil(Math.max(...ticks.map((t) => formatValue(t, { ...f, compact: f.compact !== false && Math.abs(ext.max) >= 10000 }).length)) * 6.6) + 12 : 0;
    const right = c.refs && c.refs.length ? 4 : 4, top = 10, bottom = 26;
    const pw = W - left - right, ph = H - top - bottom;
    const band = pw / n;
    const xAt = (i) => (hasBars() || n === 1 ? left + band * (i + 0.5) : left + (i * pw) / (n - 1));
    st.geo = { W, H, left, right, top, bottom, pw, ph, band, xAt, tickStep };
    // x labels thinned to fit
    const lw = Math.max(...c.x.map((t) => String(t).length)) * 6.4 + 14;
    const every = Math.max(1, Math.ceil(lw / (pw / n)));
    const xl = c.x.map((t, i) => ((n - 1 - i) % every === 0 ? `<text class="axis-text" x="${xAt(i).toFixed(1)}" y="${H - 8}" text-anchor="middle">${escHtml(t)}</text>` : '')).join('');
    const series = c.series.map((s, i) => {
      const col = seriesColor(s, i);
      if (k[i] === 'bar') return `<g class="chart__bars" data-s="${i}" style="--c: ${col};">${c.x.map(() => '<path class="chart__bar"></path>').join('')}</g>`;
      const area = k[i] === 'area' ? `<path class="chart__area" style="fill: ${col};"></path>` : '';
      return `<g class="chart__series${s.dashed ? ' is-dashed' : ''}" data-s="${i}">${area}<path class="chart__line" style="stroke: ${col};"></path></g>`;
    });
    // Lines and areas draw above bars; stacked areas draw bottom series last so the top edge stays visible
    const order = c.series.map((_, i) => i).sort((a, b) => (k[a] === 'bar' ? -1 : 0) - (k[b] === 'bar' ? -1 : 0) || (k[a] === 'line') - (k[b] === 'line'));
    const dots = c.series.map((s, i) => (k[i] === 'bar' ? '' : `<circle class="chart__dot" data-s="${i}" r="4" style="fill: ${seriesColor(s, i)};"></circle>`)).join('');
    const refs = (c.refs || []).map((r) => `<g class="chart__ref"><line x1="${left}" x2="${W - right}"></line><text text-anchor="end" x="${W - right}">${escHtml(r.label || formatValue(r.value, f))}</text></g>`).join('');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    svg.innerHTML = `<g class="chart__grid"></g><rect class="chart__band" y="${top}" height="${ph}" width="${band}" x="0"></rect>${xl}${order.map((i) => series[i]).join('')}${refs}<line class="cross" y1="${top}" y2="${top + ph}"></line>${dots}<rect class="chart__hit" x="${left}" y="0" width="${pw}" height="${H}"></rect>`;
    parts = {
      grid: svg.querySelector('.chart__grid'), band: svg.querySelector('.chart__band'), cross: svg.querySelector('.cross'),
      series: c.series.map((_, i) => svg.querySelector(`[data-s="${i}"]:not(circle)`)),
      dots: c.series.map((_, i) => svg.querySelector(`circle[data-s="${i}"]`)),
      refs: Array.from(svg.querySelectorAll('.chart__ref')),
    };
    if (!st.cur) { const t = target(); st.cur = { v: t.v.map((a) => a.slice()), w: t.w.slice(), ...ext }; }
    paint();
  };

  const paint = () => {
    const c = st.cfg, k = kinds(), { left, top, pw, ph, band, xAt, W, right } = st.geo, n = c.x.length, cur = st.cur;
    const y = (v) => top + ph - ((v - cur.min) / (cur.max - cur.min || 1)) * ph;
    // gridlines follow the animated scale
    const step = niceStep(cur.max - cur.min, (c.y && c.y.ticks) || 4); const f = c.format || {};
    let g = '';
    for (let t = Math.ceil(cur.min / step) * step; t <= cur.max + step / 1e3; t += step) {
      const yy = y(t).toFixed(1);
      g += `<line class="axis-line${Math.abs(t) < 1e-9 && cur.min < 0 ? ' axis-line--zero' : ''}" x1="${left}" x2="${W - right}" y1="${yy}" y2="${yy}"></line>`;
      if (!(c.y && c.y.hide)) g += `<text class="axis-text" x="0" y="${(+yy + 4).toFixed(1)}">${formatValue(+t.toFixed(6), { ...f, compact: f.compact !== false && Math.abs(cur.max) >= 10000 })}</text>`;
    }
    parts.grid.innerHTML = g;
    parts.refs.forEach((r, i) => { const yy = y(c.refs[i].value); r.querySelector('line').setAttribute('y1', yy); r.querySelector('line').setAttribute('y2', yy); r.querySelector('text').setAttribute('y', yy - 6); });
    // stacks
    const posBase = new Array(n).fill(0), negBase = new Array(n).fill(0);
    st.tops = c.series.map(() => new Array(n).fill(0));
    const barIdx = c.series.map((_, i) => i).filter((i) => k[i] === 'bar');
    const wsum = barIdx.reduce((a, i) => a + cur.w[i], 0) || 1;
    const groupW = stacked() ? Math.min(band * 0.62, 44) : Math.min(band * 0.76, Math.max(1, barIdx.length) * 26);
    // grouped bars: a hidden series gives its width (and its gap) back to the others as it fades
    const gapOf = (q) => (barIdx.length > 1 ? 3 * Math.min(1, cur.w[q] * 4) : 0);
    const gaps = barIdx.slice(1).reduce((a, q) => a + gapOf(q), 0);
    const off = {}, bwOf = {}; let acc = 0;
    barIdx.forEach((q, n2) => { if (n2) acc += gapOf(q); off[q] = acc; bwOf[q] = ((groupW - gaps) * cur.w[q]) / wsum; acc += bwOf[q]; });
    c.series.forEach((s, i) => {
      const el2 = parts.series[i]; const vals = cur.v[i];
      const ys = vals.map((v, j) => {
        if (stacked() && k[i] !== 'line') { const b = v >= 0 ? posBase[j] : negBase[j]; const t = b + v; if (v >= 0) posBase[j] = t; else negBase[j] = t; return [b, t]; }
        return [0, v];
      });
      st.tops[i] = ys.map((p) => p[1]);
      if (k[i] === 'bar') {
        const bw = stacked() ? groupW : bwOf[i];
        const paths = el2.children;
        ys.forEach(([b, t], j) => {
          const x0 = xAt(j) - groupW / 2 + (stacked() ? 0 : off[i]);
          // only the outermost segment of a stack is rounded; inner joins keep a 1 px gap
          const isTop = !stacked() || !c.series.some((s2, q) => q > i && k[q] === 'bar' && Math.abs(cur.v[q][j]) > (cur.max - cur.min) * 0.004 && Math.sign(cur.v[q][j]) === Math.sign(t - b));
          const yb = y(b), yt = y(t); const shrink = stacked() && b !== 0 ? (t >= b ? 1 : -1) : 0;
          paths[j].setAttribute('d', barPath(x0, yb - shrink, yt, bw, isTop ? Math.min(5, bw / 3) : 0));
          paths[j].classList.toggle('is-muted', c.highlight != null && barIdx.length === 1 && j !== c.highlight);
        });
        return;
      }
      const pts = ys.map(([, t], j) => [xAt(j), y(t)]);
      const stepPath = (p) => p.map(([x, yy], j) => (j ? (c.step ? `H${x.toFixed(1)}V${yy.toFixed(1)}` : `L${x.toFixed(1)} ${yy.toFixed(1)}`) : `M${x.toFixed(1)} ${yy.toFixed(1)}`)).join('');
      const line = stepPath(pts);
      el2.querySelector('.chart__line').setAttribute('d', line);
      const area = el2.querySelector('.chart__area');
      if (area) {
        const base = ys.map(([b], j) => [xAt(j), y(b)]).reverse();
        const back = base.map(([x, yy], j) => (c.step && j ? `V${yy.toFixed(1)}H${x.toFixed(1)}` : `L${x.toFixed(1)} ${yy.toFixed(1)}`)).join('');
        area.setAttribute('d', `${line}${back}Z`);
      }
      el2.style.opacity = cur.w[i];
    });
    if (st.idx >= 0) place(st.idx, false);
  };

  // Crosshair and tooltip
  const place = (i, fill = true) => {
    const c = st.cfg, k = kinds(), { xAt, band, top, ph } = st.geo, cur = st.cur;
    st.idx = i; const x = xAt(i);
    const y = (v) => top + ph - ((v - cur.min) / (cur.max - cur.min || 1)) * ph;
    if (hasBars()) { parts.band.setAttribute('x', x - band / 2); parts.band.setAttribute('width', band); parts.band.classList.add('is-on'); }
    else { parts.cross.setAttribute('x1', x); parts.cross.setAttribute('x2', x); parts.cross.classList.add('is-on'); }
    parts.dots.forEach((d, s) => { if (!d) return; d.setAttribute('cx', x); d.setAttribute('cy', y(st.tops[s][i])); d.classList.toggle('is-on', !st.hidden.has(s)); });
    if (!fill) return positionTip(x);
    const f = { ...(c.format || {}), compact: false };
    const rows = c.series.map((s, si) => ({ s, si })).filter(({ si }) => !st.hidden.has(si));
    if (stacked()) rows.reverse();
    let html = `<div class="ctip__h">${escHtml((c.xFull || c.x)[i])}</div>` + rows.map(({ s, si }) => `<div class="ctip__row"><i style="background: ${seriesColor(s, si)};"></i><span>${escHtml(s.name || '')}</span><b>${formatValue(s.values[i], f)}</b></div>`).join('');
    if (c.total && rows.length > 1) html += `<div class="ctip__row ctip__row--total"><span>Total</span><b>${formatValue(rows.reduce((a, { s }) => a + s.values[i], 0), f)}</b></div>`;
    st.say = `${(c.xFull || c.x)[i]}: ${rows.map(({ s, si }) => `${s.name || ''} ${formatValue(s.values[i], f)}`).join(', ')}`;
    tip.innerHTML = html; tip.classList.add('is-on');
    positionTip(x);
  };
  const positionTip = (x) => {
    const k2 = plot.clientWidth / st.geo.W; const px = x * k2; const w = tip.offsetWidth;
    tip.style.left = `${px + 14 + w > plot.clientWidth ? Math.max(0, px - 14 - w) : px + 14}px`;
  };
  const hideTip = () => { st.idx = -1; tip.classList.remove('is-on'); parts.cross.classList.remove('is-on'); parts.band.classList.remove('is-on'); parts.dots.forEach((d) => d && d.classList.remove('is-on')); };
  const nearest = (clientX) => {
    const r = svg.getBoundingClientRect(); const x = ((clientX - r.left) / r.width) * st.geo.W; const n = st.cfg.x.length;
    let best = 0; for (let i = 1; i < n; i++) if (Math.abs(st.geo.xAt(i) - x) < Math.abs(st.geo.xAt(best) - x)) best = i; return best;
  };

  // Animate st.cur toward the target, starting from wherever it is now
  const animate = (dur, ease) => {
    cancelAnimationFrame(st.raf);
    const t = target(), ext = extent(t.v);
    const from = { v: st.cur.v.map((a) => a.slice()), w: st.cur.w.slice(), max: st.cur.max, min: st.cur.min };
    if (reduceMotion() || !dur) { st.cur = { v: t.v, w: t.w, ...ext }; paint(); return; }
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur), e = ease(p), L = (a, b) => a + (b - a) * e;
      st.cur = { v: t.v.map((a, i) => a.map((v, j) => L(from.v[i]?.[j] ?? 0, v))), w: t.w.map((v, i) => L(from.w[i] ?? 0, v)), max: L(from.max, ext.max), min: L(from.min, ext.min) };
      paint(); if (p < 1) st.raf = requestAnimationFrame(tick);
    };
    st.raf = requestAnimationFrame(tick);
  };

  const renderLegend = () => {
    const c = st.cfg;
    if (c.legend === false || c.series.length < 2) { legend.hidden = true; return; }
    legend.hidden = false;
    legend.innerHTML = c.series.map((s, i) => `<button type="button" class="legend__btn" aria-pressed="${!st.hidden.has(i)}" data-s="${i}"><i style="background: ${seriesColor(s, i)};"></i>${escHtml(s.name || `Series ${i + 1}`)}</button>`).join('');
  };
  const renderTable = () => {
    const c = st.cfg, f = { ...(c.format || {}), compact: false };
    table.innerHTML = `<caption>${escHtml(c.label || '')}</caption><thead><tr><th scope="col">${escHtml(c.xName || '')}</th>${c.series.map((s) => `<th scope="col">${escHtml(s.name || '')}</th>`).join('')}</tr></thead><tbody>${c.x.map((x, i) => `<tr><th scope="row">${escHtml((c.xFull || c.x)[i])}</th>${c.series.map((s) => `<td>${formatValue(s.values[i], f)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  };

  // DOM skeleton: legend, plot (svg + tip), visually hidden table
  el.innerHTML = '<div class="legend legend--toggle chart__legend"></div><div class="chart__plot" tabindex="0"><svg class="chart__svg" aria-hidden="true"></svg><div class="ctip" aria-hidden="true"></div></div><div class="sr-only"><table></table></div>';
  legend = el.querySelector('.chart__legend'); plot = el.querySelector('.chart__plot'); svg = el.querySelector('svg'); tip = el.querySelector('.ctip'); table = el.querySelector('table');
  const label = () => { plot.setAttribute('role', 'img'); plot.setAttribute('aria-label', `${st.cfg.label || 'Chart'}. Arrow keys read each value.`); };
  label(); renderLegend(); renderTable();
  // First paint: area and bar series start on the baseline and grow in when the chart is first seen
  const enter = !reduceMotion() && typeof IntersectionObserver === 'function' && st.cfg.animate !== false;
  build();
  if (enter) {
    const k = kinds();
    st.cur.v = st.cur.v.map((a, i) => (k[i] === 'line' ? a : a.map(() => 0)));
    paint();
    svg.querySelectorAll('.chart__series').forEach((g) => { if (k[+g.dataset.s] === 'line' && !g.classList.contains('is-dashed')) { const p = g.querySelector('.chart__line'); p.setAttribute('pathLength', '1'); p.classList.add('chart__draw'); p.addEventListener('animationend', () => { p.classList.remove('chart__draw'); p.removeAttribute('pathLength'); }, { once: true }); } });
    svg.classList.add('is-pre');
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); svg.classList.remove('is-pre'); animate(560, EASE_ENTER); } }, { threshold: 0.2 });
    io.observe(el);
  }

  plot.addEventListener('pointermove', (e) => { if (e.target.closest('.ctip')) return; place(nearest(e.clientX)); });
  plot.addEventListener('pointerleave', hideTip);
  plot.addEventListener('blur', hideTip);
  plot.addEventListener('keydown', (e) => {
    const n = st.cfg.x.length; let i = st.idx;
    if (e.key === 'ArrowRight') i = i < 0 ? 0 : Math.min(n - 1, i + 1); else if (e.key === 'ArrowLeft') i = i < 0 ? n - 1 : Math.max(0, i - 1);
    else if (e.key === 'Home') i = 0; else if (e.key === 'End') i = n - 1; else if (e.key === 'Escape') { hideTip(); return; } else return;
    e.preventDefault(); place(i);
    announce(st.say);
  });
  legend.addEventListener('click', (e) => {
    const b = e.target.closest('.legend__btn'); if (!b) return;
    const i = +b.dataset.s; const on = !st.hidden.has(i);
    if (on && st.cfg.series.length - st.hidden.size <= 1) { shake(b); return; }
    if (on) st.hidden.add(i); else st.hidden.delete(i);
    b.setAttribute('aria-pressed', String(!on));
    animate(480, EASE_INOUT);
  });
  if (typeof ResizeObserver === 'function') {
    const ro = new ResizeObserver(() => { if (Math.abs((el.clientWidth || 0) - st.w) > 1 && el.clientWidth) { const i = st.idx; build(); if (i >= 0) hideTip(); } });
    ro.observe(el);
  }

  return {
    el,
    update(next) {
      const prev = st.cfg; st.cfg = { ...prev, ...next };
      const same = st.cfg.series.length === prev.series.length && st.cfg.series.every((s, i) => (s.kind || st.cfg.kind) === (prev.series[i].kind || prev.kind));
      if (st.cfg.series.length !== prev.series.length) st.hidden.clear();
      label(); renderLegend(); renderTable();
      if (!same) { st.cur = null; build(); return; }
      // a new number of points: stretch the current shape over the new points, then move to the data
      const n = st.cfg.x.length;
      if (st.cur && st.cur.v[0] && st.cur.v[0].length !== n) st.cur.v = st.cur.v.map((a) => Array.from({ length: n }, (_, j) => { const p = n > 1 ? (j * (a.length - 1)) / (n - 1) : 0; const lo = Math.floor(p), hi = Math.min(a.length - 1, lo + 1); return a[lo] + (a[hi] - a[lo]) * (p - lo); }));
      build(); animate(480, EASE_INOUT);
      if (st.idx >= 0) place(st.idx);
    },
    toggle(i, show) { const b = legend.querySelector(`[data-s="${i}"]`); if (b && (show === undefined || show === st.hidden.has(i))) b.click(); },
  };
}

/* Donut: segments of one whole, total in the hole, a legend list with values and shares */
function donutChart(el, cfg) {
  const segs = cfg.segments || [], total = segs.reduce((a, s) => a + s.value, 0) || 1, f = cfg.format || {};
  const size = cfg.size || 168, r = 64, C = 2 * Math.PI * r, gap = segs.length > 1 ? 2 : 0;
  const pct = (v) => `${Math.round((v / total) * 100)}%`;
  let at = 0;
  const circles = segs.map((s, i) => {
    const len = (s.value / total) * C; const d = Math.max(len - gap, 0);
    const c = `<circle class="donut__seg" data-i="${i}" cx="84" cy="84" r="${r}" style="stroke: ${seriesColor(s, i)}; stroke-dasharray: ${d.toFixed(2)} ${(C - d).toFixed(2)}; stroke-dashoffset: ${(-at).toFixed(2)};"></circle>`;
    at += len; return c;
  }).join('');
  const existing = el.querySelectorAll('.donut__seg');
  if (existing.length === segs.length && segs.length) {
    // same parts: move the segments from where they are (their transition), then update the words
    let a2 = 0;
    segs.forEach((s, i) => { const len = (s.value / total) * C; const d = Math.max(len - gap, 0); existing[i].style.strokeDasharray = `${d.toFixed(2)} ${(C - d).toFixed(2)}`; existing[i].style.strokeDashoffset = (-a2).toFixed(2); a2 += len; });
    el.querySelectorAll('.donut-legend li').forEach((li, i) => { li.querySelector('b').textContent = formatValue(segs[i].value, f); li.querySelector('em').textContent = pct(segs[i].value); });
    const b = el.querySelector('.donut__label b'); if (b) b.textContent = cfg.center ?? formatValue(total, { ...f, compact: true });
    if (cfg.label) el.querySelector('svg').setAttribute('aria-label', cfg.label);
    return { el, update: (next) => donutChart(el, { ...cfg, ...next }) };
  }
  el.classList.add('donut-chart');
  if (cfg.thin) el.classList.add('donut-chart--thin');
  el.innerHTML = `<div class="donut" style="--size: ${size}px;"><svg viewBox="0 0 168 168" role="img" aria-label="${escHtml(cfg.label || segs.map((s) => `${s.name} ${formatValue(s.value, f)}`).join(', '))}">${circles}</svg><div class="donut__label"><b>${escHtml(cfg.center ?? formatValue(total, { ...f, compact: true }))}</b><span>${escHtml(cfg.unit || '')}</span></div></div>`
    + `<ul class="donut-legend">${segs.map((s, i) => `<li data-i="${i}"><i style="background: ${seriesColor(s, i)};"></i><span>${escHtml(s.name)}</span><b>${formatValue(s.value, f)}</b><em>${pct(s.value)}</em></li>`).join('')}</ul>`;
  el.setAttribute('data-lds-grow', '');
  bindDonut(el);
  return { el, update: (next) => donutChart(el, { ...cfg, ...next }) };
}
function bindDonut(el) {
  if (el._ldsDonut) return; el._ldsDonut = true;
  const hl = (i) => { el.classList.toggle('is-focus', i != null); el.querySelectorAll('[data-i]').forEach((n) => n.classList.toggle('is-active', n.getAttribute('data-i') === i)); };
  el.addEventListener('pointerover', (e) => { const n = e.target.closest('[data-i]'); hl(n ? n.getAttribute('data-i') : null); });
  el.addEventListener('pointerleave', () => hl(null));
}

/* Gauge: a half ring, either one value against a max or a row of ticks shared by a few parts */
function gaugeChart(el, cfg) {
  const f = cfg.format || {}; const R = 80, cx = 100, cy = 100;
  el.classList.add('gauge');
  const val = el.querySelector('.gauge__val');
  if (val && !cfg.segments) {
    const p = Math.max(0, Math.min(1, (cfg.value || 0) / (cfg.max || 100)));
    val.style.setProperty('--v', (p * 100).toFixed(2));
    el.querySelector('.gauge__label b').textContent = cfg.center ?? formatValue(cfg.value || 0, f);
    ['success', 'warning', 'danger'].forEach((t) => el.classList.toggle(`gauge--${t}`, cfg.tone === t));
    if (cfg.label) el.querySelector('svg').setAttribute('aria-label', cfg.label);
    return { el, update: (next) => gaugeChart(el, { ...cfg, ...next }) };
  }
  let marks;
  if (cfg.segments) {
    const N = cfg.ticks || 32, total = cfg.segments.reduce((a, s) => a + s.value, 0) || 1;
    let acc = 0; const owner = []; cfg.segments.forEach((s, i) => { acc += s.value; while (owner.length < Math.round((acc / total) * N)) owner.push(i); });
    marks = owner.map((si, t) => {
      const a = Math.PI - (Math.PI * (t + 0.5)) / N; const x1 = cx + Math.cos(a) * (R - 12), y1 = cy - Math.sin(a) * (R - 12), x2 = cx + Math.cos(a) * (R + 6), y2 = cy - Math.sin(a) * (R + 6);
      return `<line class="gauge__tick" style="--c: ${seriesColor(cfg.segments[si], si)}; --i: ${t};" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"></line>`;
    }).join('');
  } else {
    const p = Math.max(0, Math.min(1, (cfg.value || 0) / (cfg.max || 100)));
    const tone = cfg.tone ? ` gauge--${cfg.tone}` : '';
    if (tone) el.classList.add(tone.trim());
    marks = `<path class="gauge__track" d="M${cx - R} ${cy}A${R} ${R} 0 0 1 ${cx + R} ${cy}"></path><path class="gauge__val" pathLength="100" style="--v: ${(p * 100).toFixed(2)};" d="M${cx - R} ${cy}A${R} ${R} 0 0 1 ${cx + R} ${cy}"></path>`;
  }
  const value = cfg.center ?? (cfg.segments ? '' : formatValue(cfg.value || 0, f));
  el.innerHTML = `<svg viewBox="0 0 200 112" role="img" aria-label="${escHtml(cfg.label || '')}">${marks}</svg><div class="gauge__label"><b>${escHtml(value)}</b><span>${escHtml(cfg.unit || '')}</span></div>`
    + (cfg.min != null || cfg.maxLabel ? `<div class="gauge__ends" aria-hidden="true"><span>${escHtml(cfg.minLabel ?? formatValue(0, f))}</span><span>${escHtml(cfg.maxLabel ?? formatValue(cfg.max || 100, f))}</span></div>` : '');
  el.setAttribute('data-lds-grow', '');
  return { el, update: (next) => gaugeChart(el, { ...cfg, ...next }) };
}

export function drawChart(el, config) {
  if (!el || !config) return null;
  const type = config.type || 'xy';
  if (el._ldsChart && el._ldsChart.type === type && type === 'xy') { el._ldsChart.update(config); return el._ldsChart; }
  const prev = el._ldsChart;
  const h = type === 'donut' ? donutChart(el, prev && prev.type === type ? { ...prev.config, ...config } : config) : type === 'gauge' ? gaugeChart(el, prev && prev.type === type ? { ...prev.config, ...config } : config) : xyChart(el, config);
  h.type = type; h.config = prev && prev.type === type ? prev.config : config; el._ldsChart = h;
  if (type !== 'xy') h.update = (next) => drawChart(el, { ...next, type });
  if (type !== 'xy') growIn(el);
  return h;
}

/* Grow from the baseline the first time it is seen: .is-pre holds marks at zero (no transition), removing
   it lets each mark's own transition carry it to its value. Later data changes use the same transitions. */
let growIO = null;
function growIn(el) {
  if (reduceMotion() || typeof IntersectionObserver !== 'function' || el.hasAttribute('data-grown')) return;
  el.classList.add('is-pre');
  // stagger index per mark, in reading order
  ['.bars__col', '.hbar', '.funnel__row', '.kpi__bars > i'].forEach((sel) => $$(el, sel).forEach((n, i) => { if (!n.style.getPropertyValue('--i')) n.style.setProperty('--i', String(i)); }));
  if (!growIO) growIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; const t = e.target; growIO.unobserve(t); t.setAttribute('data-grown', '');
    void t.offsetWidth; t.classList.add('is-growing'); t.classList.remove('is-pre');
    setTimeout(() => t.classList.remove('is-growing'), 1400);
  }), { threshold: 0.25 });
  growIO.observe(el);
}

/* ---------- [pages-2] Route schematic ----------
   <div class="route" data-lds-route='{"label":"…","mode":"flight","position":0.65,"stops":[{"name":"Jakarta","sub":"Left 06:10"},…]}'></div>
   position counts stops from 0: 1.4 is 40 % of the way from the second stop to the third. The travelled
   part draws in once on first view, then the vehicle settles on its spot. drawRoute(el, config) redraws. */
const ROUTE_ICON = { flight: 'flight', road: 'local_shipping', sea: 'directions_boat', rail: 'route' };
const routeEsc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function drawRoute(el, config) {
  if (!el || !config || !Array.isArray(config.stops) || config.stops.length < 2) return null;
  const prev = el._ldsRoute;
  const cfg = { mode: 'road', position: 0, ...config };
  const n = cfg.stops.length;
  const pos = Math.max(0, Math.min(n - 1, Number(cfg.position) || 0));
  const nextIdx = pos >= n - 1 ? -1 : Math.floor(pos) + 1;
  el.setAttribute('role', 'group');
  if (cfg.label) el.setAttribute('aria-label', cfg.label);
  const state = (i) => (i <= pos ? (i === n - 1 ? 'Arrived' : 'Passed') : i === nextIdx ? 'Next stop' : 'Ahead');
  el.innerHTML = `<svg class="route__svg" aria-hidden="true" focusable="false"></svg><ol class="route__stops">${cfg.stops.map((s, i) => `<li class="route__stop${i === nextIdx ? ' is-next' : ''}"><span class="route__name">${routeEsc(s.name)}</span>${s.sub ? `<span class="route__sub">${routeEsc(s.sub)}</span>` : ''}<span class="sr-only">. ${state(i)}</span></li>`).join('')}</ol>${pos < n - 1 ? `<span class="route__vehicle" aria-hidden="true"><span class="ic">${ROUTE_ICON[cfg.mode] || ROUTE_ICON.road}</span></span>` : ''}`;
  const svg = el.querySelector('.route__svg'), list = el.querySelector('.route__stops'), car = el.querySelector('.route__vehicle');
  const animate = !reduceMotion() && cfg.animate !== false;
  let drawn = false;
  const layout = () => {
    const w = list.clientWidth; if (!w) return;
    const vertical = w / n < 104;
    el.classList.toggle('is-vertical', vertical);
    const arc = cfg.mode === 'flight';
    const h = vertical ? 0 : arc ? 76 : 40;
    el.style.setProperty('--route-h', `${h + 12}px`);
    const items = Array.from(list.children);
    // points (the list is the offset parent): horizontal at each column's center on the base line,
    // vertical beside each stop's first line
    const pts = items.map((li) => vertical ? [24, li.offsetTop + 10] : [li.offsetLeft + li.offsetWidth / 2, h - 8]);
    const H = vertical ? list.clientHeight : h;
    svg.setAttribute('viewBox', `0 0 ${vertical ? 48 : w} ${H}`); svg.style.height = `${H}px`;
    const seg = (a, b) => {
      if (!arc) return `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`;
      if (vertical) { const my = (a[1] + b[1]) / 2; return `M${a[0]} ${a[1]} Q${a[0] + 26} ${my} ${b[0]} ${b[1]}`; }
      const mx = (a[0] + b[0]) / 2; return `M${a[0]} ${a[1]} Q${mx} ${Math.max(-10, h - 8 - Math.min(110, (b[0] - a[0]) * 0.55))} ${b[0]} ${b[1]}`;
    };
    const segs = pts.slice(1).map((b, i) => seg(pts[i], b));
    let t = 0;
    svg.innerHTML = segs.map((d) => `<path class="route__track" d="${d}"></path>`).join('')
      + segs.map((d, i) => { const f = Math.max(0, Math.min(1, pos - i)); return `<path class="route__done" d="${d}" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="${animate && !drawn ? 1 : 1 - f}" data-f="${f}"></path>`; }).join('')
      + pts.map((p, i) => `<circle class="route__dot${i <= pos ? ' is-done' : ''}${i === nextIdx ? ' is-next' : ''}" cx="${p[0]}" cy="${p[1]}" r="${i === 0 || i === n - 1 ? 6 : 5}"></circle>`).join('');
    // the vehicle sits on the leg it is on, turned along it when it flies
    if (car) {
      const i = Math.min(segs.length - 1, Math.floor(pos)), f = pos - i;
      const path = svg.querySelectorAll('.route__track')[i];
      const L = path.getTotalLength();
      const p = path.getPointAtLength(L * f), q = path.getPointAtLength(Math.min(L, L * f + 1)), b = path.getPointAtLength(Math.max(0, L * f - 1));
      const sr = svg.getBoundingClientRect(), er = el.getBoundingClientRect();
      const sx = vertical ? 1 : sr.width / w || 1;
      car.style.left = `${sr.left - er.left + p.x * sx}px`; car.style.top = `${sr.top - er.top + p.y}px`;
      const ang = Math.atan2(q.y - b.y, q.x - b.x) * 180 / Math.PI;
      car.style.setProperty('--route-angle', arc ? `${ang + 45}deg` : '0deg');
      if (!arc && !vertical && pts[n - 1][0] < pts[0][0]) car.style.setProperty('--route-angle', '0deg');
    }
    // first view: the travelled legs draw one after another, then the vehicle arrives
    if (animate && !drawn) {
      drawn = true;
      el.classList.add('is-pre');
      const legs = Array.from(svg.querySelectorAll('.route__done'));
      const sum = legs.reduce((s, p) => s + Number(p.dataset.f), 0) || 1;
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return; io.disconnect();
        void el.offsetWidth; el.classList.remove('is-pre');
        legs.forEach((p) => { const f = Number(p.dataset.f); const d = (f / sum) * 1100; p.style.setProperty('--route-d', `${d}ms`); p.style.setProperty('--route-delay', `${t}ms`); p.setAttribute('stroke-dashoffset', String(1 - f)); t += d; });
        if (car) car.style.setProperty('--route-arrive', `${Math.max(0, t - 200)}ms`);
      }), { threshold: 0.3 });
      io.observe(el);
    }
  };
  layout();
  if (prev && prev.ro) prev.ro.disconnect();
  const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(() => layout()) : null;
  if (ro) ro.observe(el);
  el._ldsRoute = { config: cfg, ro, update: (next) => drawRoute(el, { ...cfg, ...next }) };
  return el._ldsRoute;
}
function bindRoute(el) {
  let cfg = null;
  try { cfg = JSON.parse(el.getAttribute('data-lds-route')); } catch (e) { cfg = null; }
  if (cfg) drawRoute(el, cfg);
}

/* ---------- [map] Map ----------
   <div class="map" style="--map-h: 360px" data-lds-map='{"label":"…","routes":[{"path":[[-6.13,106.66],[1.36,103.99]],"progress":0.65,"arc":true,"vehicle":{"icon":"flight","label":"Flight 884"}}],"markers":[{"at":[-6.13,106.66],"kind":"origin","label":"Jakarta CGK"}]}'></div>
   A small slippy map over raster tiles (OpenStreetMap by default). Only the tiles in view load; drag or
   flick to pan, wheel, pinch, the buttons or the keyboard to zoom. Routes and markers are drawn on top
   from tokens. drawMap(el, config) draws it; calling it again flies the map to the new routes. */
const MAP_TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_ATTR = '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';
const MAP_KIND = { origin: 'Origin', destination: 'Destination', stop: 'Stop', vehicle: 'Now', point: '' };
let mapSeq = 0;
const mapClamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mapProject = (p) => { const s = Math.sin(mapClamp(p[0], -85.0511, 85.0511) * Math.PI / 180); return [(p[1] + 180) / 360, 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)]; };
const mapUnproject = (p) => [Math.atan(Math.sinh(Math.PI * (1 - 2 * p[1]))) * 180 / Math.PI, p[0] * 360 - 180];
// points on the great circle from a to b, as [lat, lng]
function mapGreatCircle(a, b, n = 48) {
  const r = Math.PI / 180, v = (p) => [Math.cos(p[0] * r) * Math.cos(p[1] * r), Math.cos(p[0] * r) * Math.sin(p[1] * r), Math.sin(p[0] * r)];
  const A = v(a), B = v(b), d = Math.acos(mapClamp(A[0] * B[0] + A[1] * B[1] + A[2] * B[2], -1, 1));
  if (d < 1e-9) return [a, b];
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, k1 = Math.sin((1 - t) * d) / Math.sin(d), k2 = Math.sin(t * d) / Math.sin(d);
    const x = k1 * A[0] + k2 * B[0], y = k1 * A[1] + k2 * B[1], z = k1 * A[2] + k2 * B[2];
    let lng = Math.atan2(y, x) / r;
    if (out.length) { const prev = out[out.length - 1][1]; while (lng - prev > 180) lng -= 360; while (lng - prev < -180) lng += 360; }
    out.push([Math.atan2(z, Math.hypot(x, y)) / r, lng]);
  }
  return out;
}
// a route in projected units: arcs follow the great circle, lifted into a gentle bow so short hops still read as flights
function mapLine(route) {
  const path = Array.isArray(route.path) ? route.path : [];
  const pts = [];
  path.forEach((q, i) => {
    if (!route.arc || i === 0) { pts.push(mapProject(q)); return; }
    const leg = mapGreatCircle(path[i - 1], q).map(mapProject);
    const A = leg[0], B = leg[leg.length - 1], L = Math.hypot(B[0] - A[0], B[1] - A[1]) || 1;
    let nx = (B[1] - A[1]) / L, ny = -(B[0] - A[0]) / L;
    if (ny > 0) { nx = -nx; ny = -ny; }
    leg.slice(1).forEach((p, j) => { const k = Math.sin(Math.PI * (j + 1) / (leg.length - 1)) * 0.12 * L; pts.push([p[0] + nx * k, p[1] + ny * k]); });
  });
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { route, pts, cum, total: cum[cum.length - 1] || 0, progress: mapClamp(Number(route.progress) || 0, 0, 1) };
}
// where a fraction of the way lies on a line, and which way it faces there (degrees clockwise from north)
function mapSplit(L, f) {
  const n = L.pts.length;
  if (n < 2) return { i: 1, p: L.pts[0] || [0.5, 0.5], heading: 0 };
  const target = mapClamp(f, 0, 1) * L.total;
  let i = 1; while (i < n - 1 && L.cum[i] < target) i++;
  const seg = (L.cum[i] - L.cum[i - 1]) || 1, t = mapClamp((target - L.cum[i - 1]) / seg, 0, 1);
  const a = L.pts[i - 1], b = L.pts[i];
  return { i, p: [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t], heading: Math.atan2(b[0] - a[0], -(b[1] - a[1])) * 180 / Math.PI };
}
const mapEsc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const mapEase = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mapEaseOut = (t) => 1 - Math.pow(1 - t, 3);

export function drawMap(el, config) {
  if (!el || !config) return null;
  if (el._ldsMap) { el._ldsMap.set(config); return el._ldsMap.handle; }
  const uid = `lds-map-${++mapSeq}`;
  el.classList.add('map');
  el.innerHTML = `<div class="map__view" tabindex="0" role="region" aria-roledescription="map" aria-describedby="${uid}-sum"><div class="map__tiles" aria-hidden="true"></div><svg class="map__lines" aria-hidden="true" focusable="false"></svg><div class="map__markers"></div></div>`
    + `<div class="map__controls" role="group" aria-label="Map controls"><button class="map__ctl" type="button" aria-label="Zoom in" data-map-zoom="1"><span class="ic" aria-hidden="true">add</span></button><button class="map__ctl" type="button" aria-label="Zoom out" data-map-zoom="-1"><span class="ic" aria-hidden="true">remove</span></button><button class="map__ctl" type="button" aria-label="Show everything" data-map-fit><span class="ic" aria-hidden="true">location_on</span></button></div>`
    + `<div class="map__status" role="status"></div><div class="map__hint" aria-hidden="true"></div><div class="map__attr"></div><p class="sr-only" id="${uid}-sum"></p>`;
  const view = el.querySelector('.map__view'), tilePane = el.querySelector('.map__tiles'), svg = el.querySelector('.map__lines');
  const markPane = el.querySelector('.map__markers'), status = el.querySelector('.map__status'), hint = el.querySelector('.map__hint');
  const attr = el.querySelector('.map__attr'), sum = el.querySelector(`#${uid}-sum`), zin = el.querySelector('[data-map-zoom="1"]'), zout = el.querySelector('[data-map-zoom="-1"]');
  const fitBtn = el.querySelector('[data-map-fit]');
  let cfg = null, w = 0, h = 0, cx = 0.5, cy = 0.5, z = 3, minZ = 2, maxZ = 18;
  let lines = [], marks = [], tiles = new Map(), tileUrl = MAP_TILES, everLoaded = false, failedShown = false;
  let raf = 0, anim = null, flying = false, lastLoad = 0, userMoved = false, needFit = true, drawT = 1, drawAnim = 0, queued = 0;

  const W = () => 256 * 2 ** z;
  const toScreen = (p) => [(p[0] - cx) * W() + w / 2, (p[1] - cy) * W() + h / 2];
  const clampView = () => {
    z = mapClamp(z, minZ, maxZ);
    const Wd = W(), half = h / 2 / Wd;
    cy = Wd > h ? mapClamp(cy, half, 1 - half) : 0.5;
    cx = mapClamp(cx, 0, 1);
  };
  const queue = () => { if (!queued) queued = requestAnimationFrame(() => { queued = 0; render(true); }); };

  // tiles: only the ones in view load; the previous zoom level stays underneath until the new one is in
  const tileKey = (tz, x, y) => `${tz}/${x}/${y}`;
  const makeTile = (tz, x, y) => {
    const n = 2 ** tz, img = new Image(), t = { z: tz, x, y, img, done: false, failed: false };
    img.className = 'map__tile'; img.alt = ''; img.decoding = 'async'; img.draggable = false;
    img.onload = () => { t.done = true; everLoaded = true; img.classList.add('is-loaded'); queue(); };
    img.onerror = () => { t.done = true; t.failed = true; img.classList.add('is-failed'); queue(); };
    img.src = tileUrl.replace('{z}', tz).replace('{x}', ((x % n) + n) % n).replace('{y}', y).replace('{s}', 'abc'[Math.abs(x + y) % 3]);
    tilePane.appendChild(img);
    return t;
  };
  const place = (t, l, tp, ts, front) => {
    const L = Math.round(l), T = Math.round(tp), R = Math.round(l + ts), B = Math.round(tp + ts);
    const s = t.img.style; s.transform = `translate(${L}px, ${T}px)`; s.width = `${R - L}px`; s.height = `${B - T}px`; s.zIndex = front ? '2' : '1';
  };
  const dropTile = (k, t) => { t.img.onload = t.img.onerror = null; t.img.remove(); tiles.delete(k); };
  const renderTiles = (loadNew) => {
    const tz = mapClamp(Math.round(z), 0, 19), n = 2 ** tz, ts = 256 * 2 ** (z - tz), Wd = W();
    const ox = w / 2 - cx * Wd, oy = h / 2 - cy * Wd;
    const x0 = Math.floor(-ox / ts), x1 = Math.floor((w - ox) / ts), y0 = Math.max(0, Math.floor(-oy / ts)), y1 = Math.min(n - 1, Math.floor((h - oy) / ts));
    const want = new Set(); let total = 0, pending = 0, failed = 0;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const k = tileKey(tz, x, y); let t = tiles.get(k);
      if (!t) { if (!loadNew) { pending++; continue; } t = makeTile(tz, x, y); tiles.set(k, t); }
      want.add(k); place(t, ox + x * ts, oy + y * ts, ts, true); total++;
      if (!t.done) pending++; if (t.failed) failed++;
    }
    tiles.forEach((t, k) => {
      if (want.has(k)) return;
      if (t.z === tz || !pending || Math.abs(t.z - tz) > 2 || !t.done || t.failed) { dropTile(k, t); return; }
      const s = 256 * 2 ** (z - t.z), l = ox + t.x * s, tp = oy + t.y * s;
      if (l > w || tp > h || l + s < 0 || tp + s < 0) dropTile(k, t); else place(t, l, tp, s, false);
    });
    if (loadNew) lastLoad = performance.now();
    const allFailed = total > 0 && failed === total;
    el.classList.toggle('is-loading', !everLoaded && !allFailed && pending > 0);
    el.classList.toggle('is-failed', allFailed);
    if (allFailed && !failedShown) {
      failedShown = true;
      status.innerHTML = '<span class="ic" aria-hidden="true">cloud_off</span><span>Map tiles did not load. Places and routes are still shown.</span><button class="btn btn--plain btn--sm" type="button" data-map-retry>Try again</button>';
    } else if (!allFailed && (failedShown || !status.firstChild)) {
      failedShown = false;
      status.innerHTML = '<span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span>Loading map</span>';
    }
  };
  const path = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
  const renderLines = () => {
    let out = '';
    lines.forEach((L) => {
      if (L.pts.length < 2) return;
      const s = mapSplit(L, L.progress * drawT), scr = L.pts.map(toScreen), sp = toScreen(s.p);
      const done = [...scr.slice(0, s.i), sp], rest = [sp, ...scr.slice(s.i)];
      const thin = L.route.thin ? ' map__line--thin' : '';
      out += `<path class="map__casing${thin}" d="${path(scr)}"></path>`;
      if (L.progress < 1 || drawT < 1) out += `<path class="map__track${thin}" d="${path(rest)}"></path>`;
      if (L.progress > 0) out += `<path class="map__done${thin}" d="${path(done)}"></path>`;
    });
    svg.innerHTML = out;
  };
  const renderMarks = () => {
    marks.forEach((m) => {
      let p = m.p;
      if (m.line) { const s = mapSplit(m.line, m.line.progress); p = s.p; m.el.style.setProperty('--map-heading', `${s.heading.toFixed(1)}deg`); }
      const [x, y] = toScreen(p);
      m.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      m.el.classList.toggle('is-below', y < 76);
      m.el.classList.toggle('is-start', x < 110);
      m.el.classList.toggle('is-end', x > w - 110);
    });
  };
  function render(loadNew = true) {
    if (!w || !h || !cfg) return;
    clampView();
    renderTiles(loadNew && (!flying || performance.now() - lastLoad > 180));
    renderLines(); renderMarks();
    zin.disabled = z >= maxZ - 0.01; zout.disabled = z <= minZ + 0.01;
  }

  // the view that shows every route and marker, clear of the controls
  const fitTarget = () => {
    const all = [];
    if (cfg.fitTo !== 'markers') lines.forEach((L) => all.push(...L.pts));
    marks.forEach((m) => { if (m.p) all.push(m.p); else if (m.line) all.push(mapSplit(m.line, m.line.progress).p); });
    if (!all.length) return { c: [0.5, 0.5], z: minZ };
    let x0 = 1, x1 = 0, y0 = 1, y1 = 0;
    all.forEach((p) => { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); });
    const pad = Math.min(cfg.padding == null ? 56 : cfg.padding, w / 5, h / 5), padR = pad + Math.min(44, w / 8), padT = pad + 12;
    const aw = Math.max(40, w - pad - padR), ah = Math.max(40, h - padT - pad);
    const zx = x1 - x0 > 1e-9 ? Math.log2(aw / ((x1 - x0) * 256)) : maxZ, zy = y1 - y0 > 1e-9 ? Math.log2(ah / ((y1 - y0) * 256)) : maxZ;
    const tz = mapClamp(Math.min(zx, zy, cfg.fitMaxZoom == null ? 14 : cfg.fitMaxZoom), minZ, maxZ), Wd = 256 * 2 ** tz;
    return { c: [(x0 + x1) / 2 + (padR - pad) / 2 / Wd, (y0 + y1) / 2 - (padT - pad) / 2 / Wd], z: tz };
  };
  const targetOf = () => (cfg.center ? { c: mapProject(cfg.center), z: cfg.zoom == null ? z : cfg.zoom } : fitTarget());

  // animation: one at a time, any gesture stops it where it is
  const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; anim = null; if (flying) { flying = false; render(true); } };
  const run = (dur, step, ease = mapEase) => {
    stop();
    if (reduceMotion() || dur <= 0) { step(1); render(true); return; }
    const t0 = performance.now();
    anim = (now) => {
      const t = Math.min(1, (now - t0) / dur); step(ease(t)); render(true);
      if (t < 1) raf = requestAnimationFrame(anim); else { raf = 0; anim = null; if (flying) { flying = false; render(true); } }
    };
    raf = requestAnimationFrame(anim);
  };
  const jump = (tg) => { stop(); cx = tg.c[0]; cy = tg.c[1]; z = tg.z; render(true); };
  // zoom out and back in on the way when the target is far (smooth zooming and panning, rho 1.4)
  const flyTo = (tg) => {
    const rho = 1.4, r2 = rho * rho, r4 = r2 * r2;
    const ux0 = cx, uy0 = cy, w0 = w / W(), ux1 = tg.c[0], uy1 = tg.c[1], w1 = w / (256 * 2 ** tg.z);
    const dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, d1 = Math.sqrt(d2);
    let S, at;
    if (d1 < 1e-9) { S = Math.log(w1 / w0) / rho; at = (s) => [ux0, uy0, w0 * Math.exp(rho * s * S)]; }
    else {
      const b0 = (w1 * w1 - w0 * w0 + r4 * d2) / (2 * w0 * r2 * d1), b1 = (w1 * w1 - w0 * w0 - r4 * d2) / (2 * w1 * r2 * d1);
      const q0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), q1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (q1 - q0) / rho;
      at = (s) => { const k = s * S, u = w0 / (r2 * d1) * (Math.cosh(q0) * Math.tanh(rho * k + q0) - Math.sinh(q0)); return [ux0 + u * dx, uy0 + u * dy, w0 * Math.cosh(q0) / Math.cosh(rho * k + q0)]; };
    }
    if (!Number.isFinite(S)) { jump(tg); return 0; }
    const dur = mapClamp(Math.abs(S) * 1000 * 0.6, 480, 1300);
    run(dur, (t) => { const v = at(t); cx = v[0]; cy = v[1]; z = Math.log2(w / v[2] / 256); if (t === 1) { cx = ux1; cy = uy1; z = tg.z; } });
    flying = !reduceMotion();
    return reduceMotion() ? 0 : dur;
  };
  const zoomAt = (px, py, nz) => {
    const wx = cx + (px - w / 2) / W(), wy = cy + (py - h / 2) / W();
    z = mapClamp(nz, minZ, maxZ);
    cx = wx - (px - w / 2) / W(); cy = wy - (py - h / 2) / W();
  };
  const zoomBy = (dz, px = w / 2, py = h / 2) => {
    const z0 = z, z1 = mapClamp(Math.round(z + dz), minZ, maxZ), wx = cx + (px - w / 2) / W(), wy = cy + (py - h / 2) / W();
    userMoved = true;
    run(320, (t) => { z = z0 + (z1 - z0) * t; cx = wx - (px - w / 2) / W(); cy = wy - (py - h / 2) / W(); }, mapEaseOut);
  };
  const panBy = (dx, dy) => {
    const x0 = cx, y0 = cy, Wd = W();
    userMoved = true;
    run(200, (t) => { cx = x0 + (dx / Wd) * t; cy = y0 + (dy / Wd) * t; }, mapEaseOut);
  };
  const fit = (animate = true) => { userMoved = false; const tg = targetOf(); if (animate) flyTo(tg); else jump(tg); };

  // the travelled part draws in, then the vehicle settles on its spot
  const drawIn = (dur) => {
    cancelAnimationFrame(drawAnim);
    const veh = marks.filter((m) => m.line);
    if (reduceMotion() || cfg.animate === false || !lines.some((L) => L.progress > 0)) { drawT = 1; veh.forEach((m) => m.el.classList.remove('is-pre')); return; }
    veh.forEach((m) => m.el.classList.add('is-pre'));
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / dur); drawT = mapEaseOut(t);
      if (!raf) render(false);
      if (t < 1) drawAnim = requestAnimationFrame(tick); else { drawAnim = 0; veh.forEach((m) => m.el.classList.remove('is-pre')); }
    };
    drawT = 0; drawAnim = requestAnimationFrame(tick);
  };

  function set(next) {
    const first = !cfg;
    cfg = { ...next };
    minZ = cfg.minZoom == null ? 2 : cfg.minZoom; maxZ = cfg.maxZoom == null ? 18 : cfg.maxZoom;
    view.setAttribute('aria-label', cfg.label || 'Map');
    const url = cfg.tiles || MAP_TILES;
    if (url !== tileUrl) { tiles.forEach((t, k) => dropTile(k, t)); tileUrl = url; everLoaded = false; }
    attr.innerHTML = cfg.attribution || MAP_ATTR;
    el.classList.toggle('map--modifier', cfg.scrollZoom === 'modifier');
    lines = (cfg.routes || []).map(mapLine);
    const list = (cfg.markers || []).map((m) => ({ data: m, kind: m.kind || 'point', p: Array.isArray(m.at) ? mapProject(m.at) : null }));
    lines.forEach((L) => {
      const v = L.route.vehicle;
      if (v && L.pts.length > 1 && (L.progress < 1 || v.arrived)) list.push({ data: v, kind: 'vehicle', line: L });
    });
    marks = list.filter((m) => m.p || m.line);
    const parts = marks.map((m) => {
      const d = m.data, k = m.kind, tone = d.tone ? ` map__marker--${d.tone}` : '', size = d.size === 'sm' ? ' map__marker--sm' : '';
      const icon = k === 'vehicle' ? `<span class="map__dir"></span><span class="ic" aria-hidden="true">${mapEsc(d.icon || 'local_shipping')}</span>` : d.icon ? `<span class="ic" aria-hidden="true">${mapEsc(d.icon)}</span>` : '';
      return {
        cls: `map__marker map__marker--${k}${tone}${size}${d.done ? ' is-done' : ''}${d.open ? ' is-open' : ''}${d.selected ? ' is-selected' : ''}`,
        name: [MAP_KIND[k], d.label, d.sub].filter(Boolean).join(', '),
        pressed: typeof d.selected === 'boolean' ? String(d.selected) : null,
        turn: k === 'vehicle' && d.icon === 'flight',
        inner: `<span class="map__pin">${icon}</span>${d.label ? `<span class="map__label" aria-hidden="true">${mapEsc(d.label)}${d.sub ? `<span class="map__label-sub">${mapEsc(d.sub)}</span>` : ''}</span>` : ''}`,
      };
    });
    // same markers as before: update them in place so focus and hover stay where they are
    if (markPane.children.length !== parts.length) markPane.innerHTML = parts.map(() => '<button type="button"></button>').join('');
    Array.from(markPane.children).forEach((b, i) => {
      const q = parts[i]; marks[i].el = b;
      const pre = b.classList.contains('is-pre') ? ' is-pre' : '';
      b.className = q.cls + pre; b.setAttribute('aria-label', q.name);
      if (q.pressed) b.setAttribute('aria-pressed', q.pressed); else b.removeAttribute('aria-pressed');
      b.toggleAttribute('data-map-turn', q.turn);
      if (b._ldsInner !== q.inner) { b.innerHTML = q.inner; b._ldsInner = q.inner; }
    });
    const say = (m) => { const kw = m.kind === 'point' ? '' : MAP_KIND[m.kind]; return `${kw ? `${kw}: ` : ''}${m.data.label || ''}${m.data.sub ? `, ${m.data.sub}` : ''}`; };
    sum.textContent = `${cfg.summary || marks.map(say).join('. ')}. Arrow keys move the map, plus and minus zoom.`;
    fitBtn.querySelector('.ic').textContent = lines.length ? 'route' : 'location_on';
    fitBtn.setAttribute('aria-label', lines.length ? 'Show the whole route' : 'Show every place');
    if (!w) { needFit = true; return; }
    if (first) { fit(false); drawIn(1000); return; }
    if (cfg.fit === false && !cfg.center) { render(true); return; }
    userMoved = false;
    const dur = cfg.animate === false ? (jump(targetOf()), 0) : flyTo(targetOf());
    drawIn(Math.max(900, dur));
  }

  // pointer: drag with momentum, two fingers pinch; a marker click only counts without a drag
  const pts = new Map(); let drag = null, pinch = null, hist = [], swallow = false;
  const rel = (x, y) => { const r = view.getBoundingClientRect(); return [x - r.left, y - r.top]; };
  const startPinch = () => {
    const [a, b] = Array.from(pts.values()), m = rel((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
    pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, z, wx: cx + (m[0] - w / 2) / W(), wy: cy + (m[1] - h / 2) / W() };
    drag = null; view.classList.add('is-dragging');
  };
  view.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    stop(); pts.set(e.pointerId, [e.clientX, e.clientY]);
    if (pts.size === 1) { drag = { id: e.pointerId, x: e.clientX, y: e.clientY, cx, cy, moved: false }; hist = [[e.timeStamp, e.clientX, e.clientY]]; }
    else if (pts.size === 2) { try { pts.forEach((_, id) => view.setPointerCapture(id)); } catch (err) { /* pointer already gone */ } startPinch(); userMoved = true; }
  });
  view.addEventListener('pointermove', (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, [e.clientX, e.clientY]);
    if (pinch && pts.size >= 2) {
      const [a, b] = Array.from(pts.values()), m = rel((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
      z = mapClamp(pinch.z + Math.log2(Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch.d), minZ, maxZ);
      cx = pinch.wx - (m[0] - w / 2) / W(); cy = pinch.wy - (m[1] - h / 2) / W();
      queue(); return;
    }
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved) {
      if (Math.hypot(dx, dy) < 4) return;
      drag.moved = true; userMoved = true; view.classList.add('is-dragging');
      try { view.setPointerCapture(e.pointerId); } catch (err) { /* pointer already gone */ }
    }
    cx = drag.cx - dx / W(); cy = drag.cy - dy / W();
    hist.push([e.timeStamp, e.clientX, e.clientY]); while (hist.length > 2 && e.timeStamp - hist[0][0] > 100) hist.shift();
    queue();
  });
  const up = (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.delete(e.pointerId);
    if (pinch) {
      if (pts.size < 2) {
        pinch = null;
        const left = Array.from(pts.entries())[0];
        if (left) drag = { id: left[0], x: left[1][0], y: left[1][1], cx, cy, moved: true }; else { drag = null; view.classList.remove('is-dragging'); swallow = true; setTimeout(() => { swallow = false; }, 0); }
        render(true);
      }
      return;
    }
    if (!drag || drag.id !== e.pointerId) return;
    const moved = drag.moved; drag = null; view.classList.remove('is-dragging');
    if (!moved) return;
    swallow = true; setTimeout(() => { swallow = false; }, 0);
    // a flick keeps going and slows down on its own (decay time 325 ms)
    const a = hist[0], b = hist[hist.length - 1], dt = b && a ? b[0] - a[0] : 0;
    let vx = dt > 0 ? (b[1] - a[1]) / dt : 0, vy = dt > 0 ? (b[2] - a[2]) / dt : 0; const raw = Math.hypot(vx, vy), speed = Math.min(raw, 2.5);
    if (raw > speed) { vx *= speed / raw; vy *= speed / raw; }
    if (e.type === 'pointercancel' || reduceMotion() || speed < 0.15 || e.timeStamp - b[0] > 60) { render(true); return; }
    const tau = 325, dur = tau * Math.log(speed / 0.02), x0 = cx, y0 = cy, Wd = W();
    run(dur, (t) => { const k = tau * (1 - Math.exp(-(t * dur) / tau)); cx = x0 - (vx * k) / Wd; cy = y0 - (vy * k) / Wd; }, (t) => t);
  };
  view.addEventListener('pointerup', up);
  view.addEventListener('pointercancel', up);
  view.addEventListener('click', (e) => { if (swallow) { e.stopPropagation(); e.preventDefault(); } }, true);
  view.addEventListener('dragstart', (e) => e.preventDefault());

  let hintTimer = 0;
  view.addEventListener('wheel', (e) => {
    if (cfg && cfg.scrollZoom === false) return;
    if (cfg && cfg.scrollZoom === 'modifier' && !e.ctrlKey && !e.metaKey) {
      hint.textContent = /Mac|iPhone|iPad/.test(navigator.platform || '') ? 'Hold ⌘ and scroll to zoom the map' : 'Hold Ctrl and scroll to zoom the map';
      el.classList.add('is-hinting'); clearTimeout(hintTimer); hintTimer = setTimeout(() => el.classList.remove('is-hinting'), 1100);
      return;
    }
    e.preventDefault(); stop(); userMoved = true; el.classList.remove('is-hinting');
    const [px, py] = rel(e.clientX, e.clientY);
    const dz = mapClamp(-e.deltaY * (e.deltaMode === 1 ? 0.12 : e.ctrlKey ? 0.012 : 0.004), -1, 1);
    zoomAt(px, py, z + dz); queue();
  }, { passive: false });

  view.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const step = e.shiftKey ? 240 : 80;
    const keys = { ArrowLeft: () => panBy(-step, 0), ArrowRight: () => panBy(step, 0), ArrowUp: () => panBy(0, -step), ArrowDown: () => panBy(0, step), '+': () => zoomBy(1), '=': () => zoomBy(1), '-': () => zoomBy(-1), _: () => zoomBy(-1), Home: () => fit(), 0: () => fit() };
    const fn = keys[e.key]; if (!fn) return;
    e.preventDefault(); fn();
  });

  el.addEventListener('click', (e) => {
    const zb = e.target.closest('[data-map-zoom]');
    if (zb) { zoomBy(Number(zb.getAttribute('data-map-zoom'))); return; }
    if (e.target.closest('[data-map-fit]')) { fit(); return; }
    if (e.target.closest('[data-map-retry]')) {
      tiles.forEach((t, k) => { if (t.failed) dropTile(k, t); });
      failedShown = false; status.innerHTML = ''; render(true); return;
    }
    const mk = e.target.closest('.map__marker');
    if (mk) { const m = marks.find((x) => x.el === mk); if (m) el.dispatchEvent(new CustomEvent('lds:mapselect', { bubbles: true, detail: { id: m.data.id, marker: m.data, kind: m.kind, element: mk } })); }
  });

  const measure = () => {
    const nw = view.clientWidth, nh = view.clientHeight;
    if (!nw || !nh || (nw === w && nh === h)) return;
    const firstSize = !w; w = nw; h = nh;
    if (needFit || !userMoved) { needFit = false; if (raf && flying) return; jump(targetOf()); if (firstSize) drawIn(1000); }
    else render(true);
  };
  const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
  if (ro) ro.observe(view);

  const handle = {
    el,
    get config() { return cfg; },
    get view() { return { center: mapUnproject([cx, cy]), zoom: z }; },
    update: (next) => { set({ ...cfg, ...next }); return handle; },
    fit: (opts) => fit(!(opts && opts.animate === false)),
    zoomIn: () => zoomBy(1),
    zoomOut: () => zoomBy(-1),
    flyTo: (center, zoom) => { userMoved = true; flyTo({ c: mapProject(center), z: zoom == null ? z : zoom }); },
    destroy: () => { stop(); cancelAnimationFrame(drawAnim); if (ro) ro.disconnect(); tiles.forEach((t, k) => dropTile(k, t)); el.innerHTML = ''; el._ldsMap = null; },
  };
  el._ldsMap = { set, handle };
  set(config);
  measure();
  return handle;
}
function bindMap(el) {
  let cfg = null;
  try { cfg = JSON.parse(el.getAttribute('data-lds-map')); } catch (e) { cfg = null; }
  if (cfg) drawMap(el, cfg);
}

/* ---------- [pages-2] Paper: print in the light theme ----------
   While a .paper--print is on the page, printing switches to light and back, so the sheet prints dark on white. */
let paperPrintBound = false;
function bindPaperPrint() {
  if (paperPrintBound || typeof window === 'undefined') return;
  paperPrintBound = true;
  const html = document.documentElement;
  let was = null;
  window.addEventListener('beforeprint', () => { if (!document.querySelector('.paper--print')) return; was = html.getAttribute('data-theme'); html.setAttribute('data-theme', 'light'); });
  window.addEventListener('afterprint', () => { if (was === null) return; html.setAttribute('data-theme', was); was = null; });
}

/* Uptime bars: <div class="uptime" data-lds-uptime tabindex="0"><i class="is-ok" data-label="12 Nov: no incidents">…</div>
   plus a .uptime__now line: pointer or arrow keys pick a day and write its label there. */
function bindUptime(box) {
  const out = box.parentElement && box.parentElement.querySelector('.uptime__now'); const rest = out ? out.textContent : '';
  const bars = () => $$(box, 'i').filter((b) => b.offsetWidth > 0);
  let idx = -1;
  const show = (i) => { const list = bars(); if (!list.length) return; idx = Math.max(0, Math.min(list.length - 1, i)); $$(box, 'i.is-on').forEach((b) => b.classList.remove('is-on')); const b = list[idx]; b.classList.add('is-on'); if (out) out.textContent = b.getAttribute('data-label') || ''; };
  const hide = () => { idx = -1; $$(box, 'i.is-on').forEach((b) => b.classList.remove('is-on')); if (out) out.textContent = rest; };
  box.addEventListener('pointermove', (e) => { const list = bars(); let best = 0, bd = Infinity; list.forEach((b, i) => { const r = b.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - e.clientX); if (d < bd) { bd = d; best = i; } }); show(best); });
  box.addEventListener('pointerleave', hide); box.addEventListener('blur', hide);
  box.addEventListener('keydown', (e) => {
    const n = bars().length; let i = idx;
    if (e.key === 'ArrowRight') i = i < 0 ? n - 1 : i + 1; else if (e.key === 'ArrowLeft') i = i < 0 ? n - 1 : i - 1; else if (e.key === 'Home') i = 0; else if (e.key === 'End') i = n - 1; else if (e.key === 'Escape') { hide(); return; } else return;
    e.preventDefault(); show(i); if (out) announce(out.textContent);
  });
}

function bindChartFor(ctrl) {
  const go = (key) => {
    const el = document.getElementById(ctrl.getAttribute('data-lds-chart-for')); const h = el && el._ldsChart; const set = h && h.config.sets && h.config.sets[key];
    if (!set) return;
    h.update(set);
    // words that belong to the period: [data-chart-figure], [data-chart-note], and the text of [data-chart-delta]
    const card = el.closest('.chart-card') || el.parentElement;
    const put = (sel, text) => { const n = card && card.querySelector(sel); if (n == null || text == null) return; if (n.classList.contains('roll')) setRoll(n, text); else { const t = Array.from(n.childNodes).reverse().find((c) => c.nodeType === 3 && c.textContent.trim()); if (t) t.textContent = text; else n.append(text); } n.classList.remove('is-changed'); void n.offsetWidth; n.classList.add('is-changed'); };
    put('[data-chart-figure]', set.figure); put('[data-chart-note]', set.note); put('[data-chart-delta]', set.delta);
  };
  if (ctrl.tagName === 'SELECT') ctrl.addEventListener('change', () => go(ctrl.value));
  else ctrl.addEventListener('click', (e) => { const b = e.target.closest('[data-set]'); if (b) go(b.getAttribute('data-set')); });
}

/* ---------- [dash-foundation] App shell rail ----------
   <button class="icon-btn" data-lds-shell-rail aria-controls="side" aria-expanded="true" aria-label="Collapse sidebar">
   <span class="ic" aria-hidden="true">left_panel_close</span></button> inside a .shell[data-lds-shell].
   Folds the sidebar to its icons on wide screens and remembers it (localStorage "lds-shell-rail").
   Put restoreRail() in a classic script in <head> so the page paints folded without a jump.
   While folded, one tooltip names the link under the pointer or keyboard focus. */
const RAIL_KEY = 'lds-shell-rail';
export function restoreRail(root = document.documentElement) {
  try { if (localStorage.getItem(RAIL_KEY) === '1') root.setAttribute('data-shell-rail', ''); } catch (e) { /* storage may be blocked */ }
}
export function setRail(shell, on) {
  if (!shell) return;
  shell.classList.toggle('is-rail', on);
  document.documentElement.removeAttribute('data-shell-rail');
  try { localStorage.setItem(RAIL_KEY, on ? '1' : '0'); } catch (e) { /* ignore */ }
  $$(shell, '[data-lds-shell-rail]').forEach((b) => {
    b.setAttribute('aria-expanded', String(!on));
    b.setAttribute('aria-label', on ? 'Expand sidebar' : 'Collapse sidebar');
    const ic = b.querySelector('.ic'); if (ic) ic.textContent = on ? 'left_panel_open' : 'left_panel_close';
  });
  emit(shell, 'lds:rail', { rail: on });
}
function bindShellRail(shell) {
  const btns = $$(shell, '[data-lds-shell-rail]');
  if (!btns.length) return;
  let stored = false;
  try { stored = localStorage.getItem(RAIL_KEY) === '1'; } catch (e) { /* ignore */ }
  const start = shell.classList.contains('is-rail') || document.documentElement.hasAttribute('data-shell-rail') || stored;
  shell.classList.add('is-rail-instant');
  setRail(shell, start);
  requestAnimationFrame(() => requestAnimationFrame(() => shell.classList.remove('is-rail-instant')));
  btns.forEach((b) => b.addEventListener('click', () => { setRail(shell, !shell.classList.contains('is-rail')); hide(); }));
  const side = shell.querySelector('.shell__side');
  if (!side) return;
  const tip = document.createElement('div');
  tip.className = 'shell__tip'; tip.setAttribute('aria-hidden', 'true');
  document.body.appendChild(tip);
  let timer = 0, warmUntil = 0, cur = null;
  const railed = () => shell.classList.contains('is-rail') && innerWidth > 960;
  const show = (a) => {
    clearTimeout(timer);
    const label = a.querySelector('.shell__label');
    if (!railed() || !label) return;
    const badge = a.querySelector('.shell__badge');
    tip.textContent = label.textContent.trim() + (badge ? ` (${badge.textContent.trim()})` : '');
    const r = a.getBoundingClientRect();
    tip.classList.toggle('is-warm', tip.classList.contains('is-open'));
    tip.style.left = `${r.right + 10}px`;
    tip.style.top = `${r.top + r.height / 2 - tip.offsetHeight / 2}px`;
    tip.classList.add('is-open'); cur = a;
  };
  function hide() { clearTimeout(timer); if (tip.classList.contains('is-open')) warmUntil = Date.now() + 400; tip.classList.remove('is-open'); cur = null; }
  side.addEventListener('pointerover', (e) => {
    const a = e.target.closest('.shell__link, .shell__brand');
    if (!a || a === cur || e.pointerType === 'touch') return;
    clearTimeout(timer);
    if (tip.classList.contains('is-open') || Date.now() < warmUntil) show(a); else timer = setTimeout(() => show(a), 320);
  });
  side.addEventListener('pointerleave', hide);
  side.addEventListener('focusin', (e) => { const a = e.target.closest('.shell__link, .shell__brand'); if (a && a.matches(':focus-visible')) show(a); });
  side.addEventListener('focusout', hide);
  side.addEventListener('scroll', hide, { passive: true });
  side.addEventListener('click', hide);
}

/* ---------- [dash-foundation] Selection ----------
   <div data-lds-selection="selbar-id"> with <input type="checkbox" data-lds-select> per item and an optional
   <input type="checkbox" data-lds-select-all> for the visible items. The item (closest tr, .dt__row, .file-tile or
   [data-lds-item]) gets .is-selected; the .selbar opens with a rolling count. Shift-click ticks a run, Escape
   clears, [data-lds-select-clear] in the bar clears. Fires lds:select with { count, items }. */
function bindSelection(box) {
  const selbar = document.getElementById(box.getAttribute('data-lds-selection'));
  const items = () => $$(box, 'input[data-lds-select]');
  const shown = () => items().filter((i) => i.offsetParent !== null);
  const holder = (i) => i.closest('tr, .dt__row, .file-tile, [data-lds-item]');
  let last = null;
  if (selbar) { selbar.inert = !selbar.classList.contains('is-open'); }
  const sync = () => {
    const list = items(), vis = shown();
    const picked = list.filter((i) => i.checked);
    list.forEach((i) => holder(i)?.classList.toggle('is-selected', i.checked));
    $$(box, 'input[data-lds-select-all]').forEach((all) => {
      const vc = vis.filter((i) => i.checked).length;
      all.checked = vis.length > 0 && vc === vis.length;
      all.indeterminate = vc > 0 && vc < vis.length;
      all.closest('.check')?.classList.toggle('is-mixed', all.indeterminate);
    });
    box.classList.toggle('is-selecting', picked.length > 0);
    if (selbar) {
      const open = picked.length > 0;
      selbar.classList.toggle('is-open', open); selbar.inert = !open;
      const c = selbar.querySelector('.selbar__count');
      if (c && open) { const roll = c.querySelector('.roll'); if (roll) setRoll(roll, picked.length); else c.textContent = `${picked.length} selected`; }
    }
    emit(box, 'lds:select', { count: picked.length, items: picked.map(holder) });
  };
  box._selSync = sync;
  box.addEventListener('click', (e) => {
    const i = e.target.closest('input[data-lds-select]');
    if (!i) return;
    if (e.shiftKey && last && last !== i) {
      const vis = shown(), a = vis.indexOf(last), b = vis.indexOf(i);
      if (a >= 0 && b >= 0) vis.slice(Math.min(a, b), Math.max(a, b) + 1).forEach((x) => { x.checked = i.checked; });
    }
    last = i;
  });
  box.addEventListener('change', (e) => {
    const all = e.target.closest('input[data-lds-select-all]');
    if (all) shown().forEach((x) => { x.checked = all.checked; });
    if (all || e.target.closest('input[data-lds-select]')) sync();
  });
  const clear = () => { items().forEach((x) => { x.checked = false; }); sync(); (shown()[0] || box).focus?.(); announce('Selection cleared'); };
  box.addEventListener('keydown', (e) => { if (e.key === 'Escape' && items().some((x) => x.checked) && !openMenu) { e.stopPropagation(); clear(); } });
  if (selbar) $$(selbar, '[data-lds-select-clear]').forEach((b) => b.addEventListener('click', clear));
  sync();
}
/** Re-reads checkboxes after rows were added, removed, filtered or paged. */
export function selectionRefresh(box) { box && box._selSync && box._selSync(); }

/* ---------- [dash-foundation] Data table ----------
   <div class="dtable" data-lds-table="users" data-page-size="10" data-noun="users"> around a .table-box > table.table.
   Hooks inside: [data-lds-table-search] input; [data-lds-table-filter="status"] on a chip row (chip value = data-status
   of the row) or on menuitemcheckbox items with data-value; th[data-col] with a <button> to sort; [data-lds-table-col]
   menuitemcheckbox items to show or hide a column; [data-lds-table-density] buttons; [data-lds-table-size] items;
   [data-lds-table-info], [data-lds-table-pager], [data-lds-table-reset]. A tr.dtable__empty shows when nothing matches;
   tr.dtable__state[data-state="loading|error"] rows show through tableState(). Density, page size and hidden columns
   are remembered per table name. Fires lds:table with { total, page, pages, shown }. */
const tableVal = (t) => { const n = Number(t.replace(/[^\d.,-]/g, '').replace(/,(?=\d{3}\b)/g, '')); return t !== '' && !isNaN(n) && /^[^a-z]*\d/i.test(t) ? n : t.toLowerCase(); };
function bindTable(root) {
  const table = root.querySelector('table');
  const tbody = table && table.tBodies[0];
  if (!tbody || !table.tHead) return;
  const name = root.getAttribute('data-lds-table');
  const key = name ? `lds-table:${name}` : null;
  const noun = root.getAttribute('data-noun') || 'rows';
  let prefs = {};
  try { if (key) prefs = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (e) { prefs = {}; }
  const save = () => { try { if (key) localStorage.setItem(key, JSON.stringify(prefs)); } catch (e) { /* ignore */ } };
  const ths = Array.from(table.tHead.rows[0].cells);
  const rows = () => Array.from(tbody.rows).filter((r) => !r.matches('.dtable__empty, .dtable__state'));
  rows().forEach((r, i) => { r._i = i; });
  const empty = tbody.querySelector('.dtable__empty');
  if (root.hasAttribute('data-lds-selection')) bindSelection(root);
  const st = { q: '', filters: {}, sort: null, page: 1, size: Number(prefs.size || root.getAttribute('data-page-size')) || 10, mode: 'ready' };
  const sorted = ths.find((th) => /ascending|descending/.test(th.getAttribute('aria-sort') || ''));
  if (sorted) st.sort = { i: ths.indexOf(sorted), asc: sorted.getAttribute('aria-sort') === 'ascending' };
  const cell = (r, i) => (r.cells[i]?.getAttribute('data-sort') ?? r.cells[i]?.textContent ?? '').trim();
  const matches = (r) => {
    if (st.q) { const hay = (r.getAttribute('data-search') || r.textContent).toLowerCase(); if (!st.q.split(/\s+/).every((w) => hay.includes(w))) return false; }
    for (const [k, set] of Object.entries(st.filters)) {
      if (!set.size) continue;
      const v = (r.getAttribute(`data-${k}`) || '').toLowerCase().split('|');
      if (!v.some((x) => set.has(x))) return false;
    }
    return true;
  };
  const pager = root.querySelector('[data-lds-table-pager]');
  const info = root.querySelector('[data-lds-table-info]');
  const pageList = (p, n) => {
    if (n <= 7) return Array.from({ length: n }, (_, i) => i + 1);
    const s = new Set([1, n, p - 1, p, p + 1].filter((x) => x >= 1 && x <= n));
    return [...s].sort((a, b) => a - b);
  };
  const drawPager = (pages) => {
    if (!pager) return;
    const fa = pager.contains(document.activeElement) ? document.activeElement : null;
    const had = fa ? (fa.hasAttribute('data-step') ? `[data-step="${fa.getAttribute('data-step')}"]` : '[aria-current="page"]') : null;
    let h = `<button type="button" class="pager__btn" data-step="-1" aria-label="Previous page"${st.page <= 1 ? ' disabled' : ''}><span class="ic" aria-hidden="true">chevron_left</span></button>`;
    let prev = 0;
    for (const p of pageList(st.page, pages)) {
      if (p - prev > 1) h += '<span class="pager__gap" aria-hidden="true">…</span>';
      h += `<button type="button" class="pager__btn" data-page="${p}" aria-label="Page ${p}"${p === st.page ? ' aria-current="page"' : ''}>${p}</button>`;
      prev = p;
    }
    h += `<button type="button" class="pager__btn" data-step="1" aria-label="Next page"${st.page >= pages ? ' disabled' : ''}><span class="ic" aria-hidden="true">chevron_right</span></button>`;
    pager.innerHTML = h;
    if (had) {
      const t = pager.querySelector(had);
      const target = t && !t.disabled ? t : pager.querySelector('[aria-current="page"]');
      target && target.focus({ preventScroll: true });
    }
  };
  const render = (animate) => {
    if (st.mode !== 'ready') return;
    let all = rows();
    if (st.sort) {
      const { i, asc } = st.sort;
      all.sort((a, b) => { const x = tableVal(cell(a, i)), y = tableVal(cell(b, i)); return ((x > y ? 1 : x < y ? -1 : 0) * (asc ? 1 : -1)) || a._i - b._i; });
    } else all.sort((a, b) => a._i - b._i);
    const tail = Array.from(tbody.rows).filter((r) => r.matches('.dtable__empty, .dtable__state'));
    all.concat(tail).forEach((r) => tbody.appendChild(r));
    const hit = all.filter(matches);
    const pages = Math.max(1, Math.ceil(hit.length / st.size));
    st.page = Math.min(Math.max(1, st.page), pages);
    const from = (st.page - 1) * st.size;
    const show = new Set(hit.slice(from, from + st.size));
    let k = 0;
    all.forEach((r) => {
      r.hidden = !show.has(r);
      r.classList.remove('is-in');
      if (animate && !r.hidden && !reduceMotion()) { r.style.setProperty('--i', String(k++)); }
    });
    if (animate) { void tbody.offsetWidth; all.forEach((r) => { if (!r.hidden) r.classList.add('is-in'); }); }
    $$(tbody, '.dtable__state').forEach((r) => { r.hidden = true; });
    if (empty) empty.hidden = hit.length > 0;
    if (info) info.textContent = hit.length ? `Showing ${from + 1} to ${from + show.size} of ${hit.length} ${noun}` : `No ${noun} match`;
    drawPager(pages);
    const active = !!st.q || Object.values(st.filters).some((s) => s.size);
    $$(root, '[data-lds-table-reset]').forEach((b) => { if (!b.closest('.dtable__empty')) b.hidden = !active; });
    $$(root, '[data-lds-table-filter-count]').forEach((c) => { const n = st.filters[c.getAttribute('data-lds-table-filter-count')]?.size || 0; c.textContent = String(n); c.hidden = !n; });
    selectionRefresh(root);
    emit(root, 'lds:table', { total: hit.length, page: st.page, pages, shown: show.size });
  };
  root._render = render;
  root._tableState = (mode) => {
    st.mode = mode;
    root.setAttribute('aria-busy', String(mode === 'loading'));
    if (mode === 'ready') { render(true); return; }
    rows().forEach((r) => { r.hidden = true; });
    const own = $$(tbody, '.dtable__state').filter((r) => r.getAttribute('data-state') === mode);
    $$(tbody, '.dtable__state').forEach((r) => { r.hidden = r.getAttribute('data-state') !== mode; });
    // "empty" without its own state row falls back to the table's empty block
    if (empty) empty.hidden = !(mode === 'empty' && !own.length);
    if (info) info.textContent = mode === 'loading' ? `Loading ${noun}` : mode === 'empty' ? `No ${noun} yet` : `${noun[0].toUpperCase()}${noun.slice(1)} did not load`;
    if (pager) pager.innerHTML = '';
  };
  // Sort
  ths.forEach((th, i) => {
    const b = th.querySelector('button'); if (!b) return;
    if (!th.hasAttribute('aria-sort')) th.setAttribute('aria-sort', 'none');
    b.addEventListener('click', () => {
      const cur = st.sort && st.sort.i === i ? st.sort : null;
      st.sort = !cur ? { i, asc: true } : cur.asc ? { i, asc: false } : null;
      ths.forEach((x) => { x.setAttribute('aria-sort', 'none'); x.querySelector('button')?.classList.remove('is-sorted', 'is-desc'); });
      if (st.sort) { th.setAttribute('aria-sort', st.sort.asc ? 'ascending' : 'descending'); b.classList.add('is-sorted'); b.classList.toggle('is-desc', !st.sort.asc); }
      render(false);
      announce(st.sort ? `Sorted by ${b.textContent.trim()}, ${st.sort.asc ? 'ascending' : 'descending'}` : 'Sort removed');
    });
  });
  if (st.sort) { const b = ths[st.sort.i].querySelector('button'); b && b.classList.add('is-sorted'); b && b.classList.toggle('is-desc', !st.sort.asc); }
  // Search
  const search = root.querySelector('[data-lds-table-search]');
  let qt = 0;
  search && search.addEventListener('input', () => { clearTimeout(qt); qt = setTimeout(() => { st.q = search.value.trim().toLowerCase(); st.page = 1; render(true); }, 120); });
  // Filters: chip rows and menu checkboxes
  $$(root, '[data-lds-table-filter]').forEach((f) => {
    const k = f.getAttribute('data-lds-table-filter');
    st.filters[k] = st.filters[k] || new Set();
    if (f.matches('[role="menuitemcheckbox"]')) {
      if (!f.hasAttribute('aria-checked')) f.setAttribute('aria-checked', 'false');
      f.addEventListener('click', () => {
        const on = f.getAttribute('aria-checked') !== 'true';
        f.setAttribute('aria-checked', String(on));
        const v = (f.getAttribute('data-value') || f.textContent).trim().toLowerCase();
        if (on) st.filters[k].add(v); else st.filters[k].delete(v);
        st.page = 1; render(true);
      });
    } else {
      f.addEventListener('lds:change', (e) => { st.filters[k] = new Set((e.detail.selected || []).map((x) => String(x).toLowerCase())); st.page = 1; render(true); });
    }
  });
  $$(root, '[data-lds-table-reset]').forEach((b) => b.addEventListener('click', () => {
    st.q = ''; if (search) search.value = '';
    Object.keys(st.filters).forEach((k) => { st.filters[k] = new Set(); });
    $$(root, '[data-lds-table-filter] .chip[aria-pressed="true"]').forEach((c) => c.setAttribute('aria-pressed', 'false'));
    $$(root, '[data-lds-table-filter][role="menuitemcheckbox"]').forEach((m) => m.setAttribute('aria-checked', 'false'));
    st.page = 1; render(true); search && search.focus();
  }));
  // Columns
  const hidden = new Set(prefs.cols || []);
  const applyCols = () => ths.forEach((th, i) => {
    const off = hidden.has(th.getAttribute('data-col'));
    th.hidden = off;
    Array.from(tbody.rows).forEach((r) => { if (r.cells.length === ths.length && r.cells[i]) r.cells[i].hidden = off; });
  });
  $$(root, '[data-lds-table-col]').forEach((m) => {
    const c = m.getAttribute('data-lds-table-col');
    m.setAttribute('aria-checked', String(!hidden.has(c)));
    m.addEventListener('click', () => {
      const on = m.getAttribute('aria-checked') !== 'true';
      if (!on && ths.filter((th) => !th.hidden && th.getAttribute('data-col')).length <= 1) { shake(m); return; }
      m.setAttribute('aria-checked', String(on));
      if (on) hidden.delete(c); else hidden.add(c);
      prefs.cols = [...hidden]; save(); applyCols();
    });
  });
  applyCols();
  // Density
  const dens = $$(root, '[data-lds-table-density]');
  const setDensity = (d) => { root.classList.toggle('dtable--compact', d === 'compact'); dens.forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-lds-table-density') === d))); };
  setDensity(prefs.density || (root.classList.contains('dtable--compact') ? 'compact' : 'regular'));
  dens.forEach((b) => b.addEventListener('click', () => { prefs.density = b.getAttribute('data-lds-table-density'); save(); setDensity(prefs.density); }));
  // Page size
  const sizes = $$(root, '[data-lds-table-size]');
  const sizeLabel = root.querySelector('[data-lds-table-size-label]');
  const setSize = (n) => {
    st.size = n;
    sizes.forEach((m) => { const on = Number(m.getAttribute('data-lds-table-size')) === n; m.setAttribute('aria-checked', String(on)); m.classList.toggle('is-selected', on); });
    if (sizeLabel) sizeLabel.textContent = String(n);
  };
  setSize(st.size);
  sizes.forEach((m) => m.addEventListener('click', () => { const first = (st.page - 1) * st.size; setSize(Number(m.getAttribute('data-lds-table-size'))); st.page = Math.floor(first / st.size) + 1; prefs.size = st.size; save(); render(true); }));
  // Pages
  pager && pager.addEventListener('click', (e) => {
    const b = e.target.closest('.pager__btn'); if (!b || b.disabled) return;
    const p = b.hasAttribute('data-page') ? Number(b.getAttribute('data-page')) : st.page + Number(b.getAttribute('data-step'));
    if (p === st.page) return;
    st.page = p; render(true);
    const top = root.getBoundingClientRect().top;
    if (top < 0) root.scrollIntoView({ block: 'start', behavior: reduceMotion() ? 'auto' : 'smooth' });
    announce(`Page ${st.page}`);
  });
  render(false);
}
/** Re-reads rows after they were added or removed, then filters, sorts and pages again. */
export function tableRefresh(root) {
  if (!root || !root._render) return;
  const tb = root.querySelector('tbody');
  if (tb) Array.from(tb.rows).forEach((r, i) => { if (r._i === undefined) r._i = 1e6 + i; });
  root._render(true);
}
/** Shows the loading or error rows of a data table (tr.dtable__state[data-state]), or the data again with "ready". */
export function tableState(root, mode) { root && root._tableState && root._tableState(mode); }

/* ---------- [dash-foundation] Trend delta ----------
   <span class="delta delta--up delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>12.5%<span class="sr-only"> up from last month</span></span>
   setDelta(el, change, { goodWhen: 'up' | 'down', unit: '%', note }) rewrites it: arrow turns on a spring, color follows meaning. */
export function setDelta(el, change, { goodWhen = el?.getAttribute('data-good') || 'up', unit = el?.getAttribute('data-unit') ?? '%', note = el?.getAttribute('data-note') || 'from last period', digits = 1 } = {}) {
  if (!el) return;
  const dir = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';
  const good = dir === 'flat' ? 'neutral' : dir === goodWhen ? 'good' : 'bad';
  el.classList.remove('delta--up', 'delta--down', 'delta--flat', 'delta--good', 'delta--bad', 'delta--neutral');
  el.classList.add(`delta--${dir}`, `delta--${good}`);
  const abs = Math.abs(change).toFixed(digits).replace(/\.0+$/, '');
  let ic = el.querySelector('.ic');
  if (!ic) { ic = document.createElement('span'); ic.className = 'ic'; ic.setAttribute('aria-hidden', 'true'); }
  ic.textContent = 'arrow_upward';
  const sr = document.createElement('span'); sr.className = 'sr-only';
  sr.textContent = ` ${dir === 'flat' ? 'no change' : dir} ${note}`;
  el.replaceChildren(ic, document.createTextNode(`${dir === 'flat' ? '' : dir === 'up' ? '+' : '−'}${abs}${unit}`), sr);
  el.classList.remove('is-changed'); void el.offsetWidth; el.classList.add('is-changed');
}

/* ---------- [dash-foundation] Kanban ----------
   <div class="kanban" data-lds-kanban> <section class="kanban__col" data-col="todo"> <header class="kanban__head">
   <h2 class="kanban__title">To do</h2><span class="kanban__count"><span class="roll" data-lds-roll="3"></span></span></header>
   <div class="kanban__list" role="list"> <article class="kanban__card" role="listitem" tabindex="0" data-id="t1">…</article>
   <div class="kanban__empty">…</div></div></section>…</div>
   Mouse drags after 5 px; touch and pen after a 260 ms hold (so the board still scrolls). The card lifts and follows the
   pointer, the others make room with FLIP on the smooth spring, the board scrolls near its edges, and on release the card
   settles into its slot. Keyboard: Space picks up, arrows move (left and right change column), Space or Enter drops,
   Escape puts it back. Counts roll; a column with data-limit warns past it. Fires lds:move { card, id, from, to, index }. */
function bindKanban(board) {
  const lists = () => $$(board, '.kanban__list');
  const cards = (list) => $$(list, ':scope > .kanban__card:not([hidden])');
  const colOf = (el) => el.closest('.kanban__col');
  const colName = (col) => col?.querySelector('.kanban__title')?.textContent.trim() || '';
  const cardName = (c) => c.querySelector('.kanban__card-title')?.textContent.trim() || 'Card';
  const where = (card) => { const l = card.parentElement; const cs = cards(l); return `${colName(colOf(l))}, position ${cs.indexOf(card) + 1} of ${cs.length}`; };
  const counts = () => $$(board, '.kanban__col').forEach((col) => {
    const n = cards(col.querySelector('.kanban__list')).length;
    const c = col.querySelector('.kanban__count');
    if (c) { const roll = c.querySelector('.roll'); if (roll) setRoll(roll, n); else c.textContent = String(n); }
    const lim = Number(col.getAttribute('data-limit'));
    col.classList.toggle('is-over-limit', !!lim && n > lim);
  });
  const flip = (fn) => {
    const els = $$(board, '.kanban__card:not(.is-dragging), .kanban__ghost');
    const r0 = new Map(els.map((e) => [e, e.getBoundingClientRect()]));
    fn();
    if (reduceMotion()) return;
    els.forEach((e) => { e.style.transition = 'none'; e.style.translate = '0px 0px'; });
    const r1 = new Map(els.map((e) => [e, e.getBoundingClientRect()]));
    els.forEach((e) => {
      const a = r0.get(e), b = r1.get(e);
      const dx = a.left - b.left, dy = a.top - b.top;
      e.style.translate = dx || dy ? `${dx}px ${dy}px` : '';
    });
    void board.offsetWidth;
    els.forEach((e) => { e.style.transition = ''; e.style.translate = ''; });
  };
  const emitMove = (card, fromCol) => {
    const toCol = colOf(card);
    counts();
    emit(board, 'lds:move', { card, id: card.getAttribute('data-id'), from: fromCol?.getAttribute('data-col'), to: toCol?.getAttribute('data-col'), index: cards(card.parentElement).indexOf(card) });
  };
  // ---- pointer drag
  let pend = null, drag = null, raf = 0;
  const noScroll = (e) => { if (drag) e.preventDefault(); };
  const begin = () => {
    const p = pend; if (!p) return;
    const card = p.card, r = card.getBoundingClientRect();
    card.classList.remove('is-pressing');
    const ghost = document.createElement('div');
    ghost.className = 'kanban__ghost'; ghost.style.height = `${r.height}px`;
    const from = { list: card.parentElement, next: card.nextElementSibling, col: colOf(card) };
    card.parentElement.insertBefore(ghost, card);
    card.style.width = `${r.width}px`; card.style.left = `${r.left}px`; card.style.top = `${r.top}px`;
    document.body.appendChild(card);
    card.classList.add('is-dragging');
    drag = { card, ghost, from, sx: p.x, sy: p.y, x: p.x, y: p.y, over: null };
    document.documentElement.classList.add('is-kanban-dragging');
    board.classList.add('is-dragging-active');
    if (p.type !== 'mouse') haptic('light');
    raf = requestAnimationFrame(tick);
  };
  const place = () => {
    const { x, y, ghost } = drag;
    const hit = document.elementFromPoint(Math.min(innerWidth - 1, Math.max(0, x)), Math.min(innerHeight - 1, Math.max(0, y)));
    const col = hit && hit.closest('.kanban__col');
    const list = col && board.contains(col) ? col.querySelector('.kanban__list') : null;
    if (drag.over !== col) { drag.over?.classList.remove('is-over'); if (list) col.classList.add('is-over'); drag.over = list ? col : null; }
    if (!list) return;
    const cs = cards(list);
    const before = cs.find((c) => { const r = c.getBoundingClientRect(); return y < r.top + r.height / 2; }) || null;
    const ref = before || list.querySelector(':scope > .kanban__empty');
    if (ghost.parentElement === list && (ghost.nextElementSibling === before || (!before && ghost.nextElementSibling === ref) || (!before && !ghost.nextElementSibling))) return;
    flip(() => { if (ref) list.insertBefore(ghost, ref); else list.appendChild(ghost); });
  };
  const tick = () => {
    if (!drag) return;
    const br = board.getBoundingClientRect(), edge = 56;
    let sx = 0;
    if (drag.x < br.left + edge) sx = -Math.ceil((br.left + edge - drag.x) / 4);
    else if (drag.x > br.right - edge) sx = Math.ceil((drag.x - (br.right - edge)) / 4);
    if (sx) board.scrollLeft += sx;
    let sy = 0;
    if (drag.y < 72) sy = -Math.ceil((72 - drag.y) / 5); else if (drag.y > innerHeight - 48) sy = Math.ceil((drag.y - innerHeight + 48) / 5);
    if (sy) scrollBy(0, sy);
    if (sx || sy) place();
    raf = requestAnimationFrame(tick);
  };
  const move = (e) => {
    if (!drag) return;
    drag.x = e.clientX; drag.y = e.clientY;
    drag.card.style.translate = `${drag.x - drag.sx}px ${drag.y - drag.sy}px`;
    place();
  };
  const finish = (cancel) => {
    if (!drag) return;
    cancelAnimationFrame(raf);
    const { card, ghost, from } = drag;
    drag.over?.classList.remove('is-over');
    if (cancel) flip(() => { if (from.next && from.next.parentElement === from.list) from.list.insertBefore(ghost, from.next); else from.list.insertBefore(ghost, from.list.querySelector(':scope > .kanban__empty')); });
    const a = card.getBoundingClientRect();
    card.style.transition = 'none';
    card.classList.remove('is-dragging');
    card.style.left = card.style.top = card.style.width = ''; card.style.translate = '';
    ghost.replaceWith(card);
    const b = card.getBoundingClientRect();
    if (!reduceMotion()) {
      card.style.translate = `${a.left + a.width / 2 - (b.left + b.width / 2)}px ${a.top + a.height / 2 - (b.top + b.height / 2)}px`;
      card.style.scale = '1.03'; card.style.rotate = '1.5deg';
      void card.offsetWidth;
      card.style.transition = '';
      card.classList.add('is-settling');
      card.style.translate = ''; card.style.scale = ''; card.style.rotate = '';
      setTimeout(() => card.classList.remove('is-settling'), 600);
    } else card.style.transition = '';
    document.documentElement.classList.remove('is-kanban-dragging');
    board.classList.remove('is-dragging-active');
    const moved = !cancel && (card.parentElement !== from.list || card.nextElementSibling !== from.next);
    drag = null;
    if (moved) { emitMove(card, from.col); announce(`Moved ${cardName(card)} to ${where(card)}`); }
    else counts();
  };
  const up = (e) => {
    if (pend) { clearTimeout(pend.timer); pend.card.classList.remove('is-pressing'); }
    if (drag) { e.preventDefault(); finish(e.type === 'pointercancel'); pend && (pend.dragged = true); }
    removeEventListener('pointermove', onMove); removeEventListener('pointerup', up); removeEventListener('pointercancel', up);
    removeEventListener('touchmove', noScroll);
    setTimeout(() => { pend = null; }, 0);
  };
  const onMove = (e) => {
    if (!pend || e.pointerId !== pend.id) return;
    if (drag) { move(e); return; }
    const d = Math.hypot(e.clientX - pend.x, e.clientY - pend.y);
    if (pend.type === 'mouse') { if (d > 5) { begin(); move(e); } }
    else if (d > 8) { clearTimeout(pend.timer); pend.card.classList.remove('is-pressing'); pend = null; }
  };
  board.addEventListener('pointerdown', (e) => {
    const card = e.target.closest('.kanban__card');
    if (!card || e.button !== 0 || drag || grab) return;
    if (e.target.closest('button, a, input, select, textarea, [data-lds-no-drag]')) return;
    pend = { card, id: e.pointerId, x: e.clientX, y: e.clientY, type: e.pointerType };
    if (e.pointerType !== 'mouse') {
      card.classList.add('is-pressing');
      pend.timer = setTimeout(() => { if (pend && pend.card === card) { begin(); move({ clientX: pend.x, clientY: pend.y }); } }, 260);
    } else e.preventDefault();
    addEventListener('pointermove', onMove); addEventListener('pointerup', up); addEventListener('pointercancel', up);
    addEventListener('touchmove', noScroll, { passive: false });
  });
  // A long press opens no context menu or text selection while picking up
  board.addEventListener('contextmenu', (e) => { if (e.target.closest('.kanban__card') && (pend || drag)) e.preventDefault(); });
  board.addEventListener('click', (e) => { if (pend && pend.dragged) { e.preventDefault(); e.stopPropagation(); } }, true);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drag) { e.preventDefault(); e.stopPropagation(); finish(true); } }, true);
  // ---- keyboard
  let grab = null;
  const drop = (cancel) => {
    const { card, list, next, col } = grab;
    if (cancel) flip(() => { if (next && next.parentElement === list) list.insertBefore(card, next); else list.insertBefore(card, list.querySelector(':scope > .kanban__empty')); });
    card.classList.remove('is-grabbed');
    card.removeAttribute('aria-grabbed');
    grab = null;
    card.focus({ preventScroll: true });
    if (cancel) { counts(); announce(`Move cancelled. ${cardName(card)} is back in ${where(card)}`); }
    else if (card.parentElement !== list || card.nextElementSibling !== next) { emitMove(card, col); announce(`Dropped ${cardName(card)} in ${where(card)}`); }
    else announce(`Dropped ${cardName(card)}`);
  };
  board.addEventListener('keydown', (e) => {
    const card = e.target.closest('.kanban__card');
    if (!card || e.target !== card) return;
    if (!grab) {
      if (e.key === ' ') {
        e.preventDefault();
        grab = { card, list: card.parentElement, next: card.nextElementSibling, col: colOf(card) };
        card.classList.add('is-grabbed'); card.setAttribute('aria-grabbed', 'true');
        announce(`Picked up ${cardName(card)}, ${where(card)}. Use the arrow keys to move, Space to drop, Escape to cancel.`);
      }
      return;
    }
    const list = card.parentElement, cs = cards(list), i = cs.indexOf(card);
    const ls = lists(), li = ls.indexOf(list);
    let moved = true;
    if (e.key === 'ArrowUp' && i > 0) flip(() => list.insertBefore(card, cs[i - 1]));
    else if (e.key === 'ArrowDown' && i < cs.length - 1) flip(() => list.insertBefore(card, cs[i + 1].nextElementSibling));
    else if ((e.key === 'ArrowLeft' && li > 0) || (e.key === 'ArrowRight' && li < ls.length - 1)) {
      const to = ls[li + (e.key === 'ArrowLeft' ? -1 : 1)], tc = cards(to);
      flip(() => to.insertBefore(card, tc[Math.min(i, tc.length)] || to.querySelector(':scope > .kanban__empty')));
    } else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); drop(false); return; }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); drop(true); return; }
    else if (e.key === 'Tab') { drop(false); return; }
    else moved = false;
    if (/^Arrow/.test(e.key)) e.preventDefault();
    if (moved) {
      card.focus({ preventScroll: true });
      card.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduceMotion() ? 'auto' : 'smooth' });
      counts();
      announce(where(card));
    }
  });
  // Moving a card in the DOM blurs it for a moment (and it gets focus back at once), so only drop when focus really left
  board.addEventListener('focusout', (e) => { if (grab && e.target === grab.card && !board.contains(e.relatedTarget)) setTimeout(() => { if (grab && document.activeElement !== grab.card) drop(false); }, 0); });
  counts();
}

/* ---------- [dash-foundation] Event calendar ----------
   <div class="evcal" data-lds-events data-date="2026-11-16" data-view="month"><script type="application/json">[{ "id": "e1",
   "title": "Design review", "start": "2026-11-03T11:00", "end": "2026-11-03T12:00", "tone": 2, "where": "Room 4" }]</script></div>
   Renders a head (title, previous, today, next, view switch) and the month, week or agenda view. Under 640 px of its own
   width the month shows dots and the chosen day's events, and the week view is not offered. Fires lds:event { event, el }
   on an event, lds:day { date } on a day, lds:range { start, end, view } after every render. eventCalendar(el) returns a
   handle: set(events), go(date), view(name), filter(fn), today(). */
const ev2 = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getFullYear()}-${ev2(d.getMonth() + 1)}-${ev2(d.getDate())}`;
const dayOf = (s) => { const [y, m, d] = String(s).slice(0, 10).split('-').map(Number); return new Date(y, m - 1, d); };
const addD = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const minsOf = (s) => (String(s).length > 10 ? Number(s.slice(11, 13)) * 60 + Number(s.slice(14, 16)) : null);
const hhmm = (m) => `${ev2(Math.floor(m / 60))}:${ev2(m % 60)}`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export function eventCalendar(el, opts = {}) {
  if (!el) return null;
  if (el._evcal) return el._evcal;
  const json = el.querySelector('script[type="application/json"]');
  let events = opts.events || (json ? JSON.parse(json.textContent || '[]') : []);
  const locale = el.getAttribute('data-locale') || 'en-GB';
  const weekStart = Number(el.getAttribute('data-week-start') ?? 1);
  const [h0, h1] = (el.getAttribute('data-hours') || '7-20').split('-').map(Number);
  const todayD = el.getAttribute('data-today') ? dayOf(el.getAttribute('data-today')) : new Date();
  let cursor = el.getAttribute('data-date') ? dayOf(el.getAttribute('data-date')) : new Date(todayD);
  let view = el.getAttribute('data-view') || 'month';
  let selected = ymd(cursor);
  let keep = () => true;
  let narrow = false;
  const F = (o) => new Intl.DateTimeFormat(locale, o);
  const fMonth = F({ month: 'long', year: 'numeric' }), fDay = F({ weekday: 'long', day: 'numeric', month: 'long' }), fDow = F({ weekday: 'short' }), fShort = F({ day: 'numeric', month: 'short' });
  const evStart = (e) => dayOf(e.start), evEnd = (e) => dayOf(e.end || e.start);
  const onDay = (d) => { const k = ymd(d); return events.filter(keep).filter((e) => ymd(evStart(e)) <= k && ymd(evEnd(e)) >= k).sort((a, b) => (a.allDay || minsOf(a.start) === null ? -1 : 0) - (b.allDay || minsOf(b.start) === null ? -1 : 0) || String(a.start).localeCompare(String(b.start))); };
  const timeOf = (e) => (e.allDay || minsOf(e.start) === null ? 'All day' : hhmm(minsOf(e.start)));
  const weekFirst = (d) => addD(d, -((d.getDay() - weekStart + 7) % 7));
  const tone = (e) => (e.tone > 1 && e.tone < 5 ? e.tone : 1);
  el.classList.add('evcal');
  el.innerHTML = `<div class="evcal__head"><h2 class="evcal__title" aria-live="polite"></h2><div class="evcal__nav">
    <div class="btn-group"><button type="button" class="btn btn--md" data-ev="prev"><span class="ic" aria-hidden="true">chevron_left</span></button><button type="button" class="btn btn--md" data-ev="today">Today</button><button type="button" class="btn btn--md" data-ev="next"><span class="ic" aria-hidden="true">chevron_right</span></button></div>
    <div class="seg evcal__views" role="group" aria-label="View"><span class="seg__thumb"></span></div></div></div>
    <div class="evcal__body"></div>`;
  const title = el.querySelector('.evcal__title'), body = el.querySelector('.evcal__body'), seg = el.querySelector('.evcal__views');
  const views = () => (narrow ? ['month', 'agenda'] : ['month', 'week', 'agenda']);
  const drawSeg = () => {
    const vs = views(); if (!vs.includes(view)) view = 'agenda';
    const thumb = seg.querySelector('.seg__thumb');
    seg.replaceChildren(thumb, ...vs.map((v) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'seg__btn'; b.setAttribute('data-view', v); b.setAttribute('aria-pressed', String(v === view)); b.textContent = v[0].toUpperCase() + v.slice(1); return b; }));
    thumb.style.width = `calc((100% - 4px) / ${vs.length})`;
    thumb.style.transform = `translateX(${vs.indexOf(view) * 100}%)`;
  };
  const chip = (e, d, cls = 'evcal__evt') => {
    const cont = ymd(evStart(e)) < ymd(d) && d.getDay() !== weekStart;
    const t = e.allDay || minsOf(e.start) === null ? '' : `<time>${hhmm(minsOf(e.start))}</time>`;
    return `<button type="button" class="${cls} ${cls}--${tone(e)}${cont ? ' is-cont' : ''}" data-ev-id="${esc(e.id)}" aria-label="${esc(e.title)}, ${esc(timeOf(e))}${e.where ? `, ${esc(e.where)}` : ''}">${t}<span class="evcal__evt-label">${esc(e.title)}</span></button>`;
  };
  const row = (e) => `<button type="button" class="evcal__row evcal__row--${tone(e)}" data-ev-id="${esc(e.id)}"><time>${esc(timeOf(e))}${e.end && minsOf(e.end) !== null && !e.allDay ? `<br>${hhmm(minsOf(e.end))}` : ''}</time><span class="evcal__row-body"><span class="evcal__row-title">${esc(e.title)}</span>${e.where ? `<span class="evcal__row-meta">${esc(e.where)}</span>` : ''}</span></button>`;
  const dayLabel = (d) => { const diff = Math.round((d - todayD) / 864e5); return diff === 0 ? `Today, ${fShort.format(d)}` : diff === 1 ? `Tomorrow, ${fShort.format(d)}` : fDay.format(d); };
  const dayList = (d) => { const es = onDay(d); return es.length ? es.map(row).join('') : '<p class="evcal__none">Nothing planned for this day.</p>'; };
  let range = [cursor, cursor];
  const renderMonth = () => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const start = weekFirst(first);
    const last = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
    const weeks = Math.ceil((((last - start) / 864e5) + 1) / 7);
    range = [start, addD(start, weeks * 7 - 1)];
    title.textContent = fMonth.format(cursor);
    let h = `<div class="evcal__dows" aria-hidden="true">${Array.from({ length: 7 }, (_, i) => `<span class="evcal__dow">${fDow.format(addD(start, i))}</span>`).join('')}</div><div class="evcal__month" role="grid" aria-label="${esc(fMonth.format(cursor))}">`;
    for (let w = 0; w < weeks; w++) {
      h += '<div role="row" style="display: contents;">';
      for (let i = 0; i < 7; i++) {
        const d = addD(start, w * 7 + i), k = ymd(d), es = onDay(d);
        const out = d.getMonth() !== cursor.getMonth(), today = k === ymd(todayD);
        const max = 3, shownE = es.length > max ? es.slice(0, max - 1) : es;
        h += `<div class="evcal__cell${out ? ' is-outside' : ''}${today ? ' is-today' : ''}${narrow && k === selected ? ' is-selected' : ''}" role="gridcell" data-day="${k}">
          <button type="button" class="evcal__date" data-day-btn="${k}" tabindex="${k === selected ? 0 : -1}" aria-label="${esc(fDay.format(d))}${es.length ? `, ${es.length} event${es.length > 1 ? 's' : ''}` : ''}"${today ? ' aria-current="date"' : ''}>${d.getDate()}</button>
          ${shownE.map((e) => chip(e, d)).join('')}${es.length > shownE.length ? `<button type="button" class="evcal__more" data-more="${k}">${es.length - shownE.length} more</button>` : ''}
          ${es.length ? `<span class="evcal__dots" aria-hidden="true">${es.slice(0, 3).map((e) => `<i class="evcal__dot--${tone(e)}"></i>`).join('')}</span>` : ''}</div>`;
      }
      h += '</div>';
    }
    h += '</div>';
    if (narrow) h += `<div class="evcal__daylist"><h3 class="sep-label sep-label--start">${esc(dayLabel(dayOf(selected)))}</h3>${dayList(dayOf(selected))}</div>`;
    return h;
  };
  const renderWeek = () => {
    const start = weekFirst(cursor);
    range = [start, addD(start, 6)];
    const end = addD(start, 6);
    title.textContent = start.getMonth() === end.getMonth() ? `${start.getDate()} to ${fShort.format(end)} ${end.getFullYear()}` : `${fShort.format(start)} to ${fShort.format(end)} ${end.getFullYear()}`;
    const hours = h1 - h0;
    let h = `<div class="evcal__week" style="--hours: ${hours};"><span class="evcal__wh" aria-hidden="true"></span>`;
    for (let i = 0; i < 7; i++) { const d = addD(start, i); h += `<div class="evcal__wh${ymd(d) === ymd(todayD) ? ' is-today' : ''}">${esc(fDow.format(d))}<b>${d.getDate()}</b></div>`; }
    h += '<span class="evcal__gutter-label">All day</span>';
    for (let i = 0; i < 7; i++) { const d = addD(start, i); h += `<div class="evcal__allday">${onDay(d).filter((e) => e.allDay || minsOf(e.start) === null).map((e) => chip(e, d)).join('')}</div>`; }
    h += `<div class="evcal__hours">${Array.from({ length: hours }, (_, i) => `<div class="evcal__hour">${i ? hhmm((h0 + i) * 60) : ''}</div>`).join('')}</div>`;
    for (let i = 0; i < 7; i++) {
      const d = addD(start, i), k = ymd(d);
      const es = onDay(d).filter((e) => !(e.allDay || minsOf(e.start) === null)).map((e) => ({ e, s: minsOf(e.start), f: e.end && minsOf(e.end) !== null ? minsOf(e.end) : minsOf(e.start) + 30 }));
      const lanes = [];
      es.forEach((x) => { let l = lanes.findIndex((end) => end <= x.s); if (l < 0) { l = lanes.length; lanes.push(0); } lanes[l] = x.f; x.lane = l; });
      h += `<div class="evcal__day${k === ymd(todayD) ? ' is-today' : ''}" data-day="${k}">`;
      es.forEach(({ e, s, f, lane }) => {
        const top = ((s - h0 * 60) / 60), hgt = Math.max(0.5, (f - s) / 60);
        h += `<button type="button" class="evcal__block evcal__block--${tone(e)}" data-ev-id="${esc(e.id)}" style="--top: calc(var(--hour) * ${top.toFixed(3)}); --h: calc(var(--hour) * ${hgt.toFixed(3)} - 2px); --lane: ${lane}; --lanes: ${lanes.length};" aria-label="${esc(e.title)}, ${hhmm(s)} to ${hhmm(f)}"><span>${esc(e.title)}</span><time>${hhmm(s)} to ${hhmm(f)}</time></button>`;
      });
      if (k === ymd(new Date()) || (el.getAttribute('data-now') && k === ymd(todayD))) {
        const now = el.getAttribute('data-now') ? minsOf(`0000-00-00T${el.getAttribute('data-now')}`) : new Date().getHours() * 60 + new Date().getMinutes();
        if (now >= h0 * 60 && now <= h1 * 60) h += `<span class="evcal__now" style="top: calc(var(--hour) * ${((now - h0 * 60) / 60).toFixed(3)});" aria-hidden="true"></span>`;
      }
      h += '</div>';
    }
    return `${h}</div>`;
  };
  const renderAgenda = () => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1), last = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
    range = [first, last];
    title.textContent = fMonth.format(cursor);
    let h = '<div class="evcal__agenda">', any = false;
    for (let d = first; d <= last; d = addD(d, 1)) {
      const es = onDay(d); if (!es.length) continue;
      any = true;
      h += `<h3 class="sep-label sep-label--start sep-label--sticky">${esc(dayLabel(d))}</h3>${es.map(row).join('')}`;
    }
    if (!any) h += '<p class="evcal__none">No events this month. Move to another month or clear the filter.</p>';
    return `${h}</div>`;
  };
  let lastDir = 0;
  const render = (dir = 0) => {
    drawSeg();
    const html = view === 'week' ? renderWeek() : view === 'agenda' ? renderAgenda() : renderMonth();
    body.innerHTML = `<div class="${dir > 0 ? 'view-in--forward' : dir < 0 ? 'view-in--back' : 'view-in'}" data-view-body>${html}</div>`;
    const unit = view === 'week' ? 'week' : 'month';
    el.querySelector('[data-ev="prev"]').setAttribute('aria-label', `Previous ${unit}`);
    el.querySelector('[data-ev="next"]').setAttribute('aria-label', `Next ${unit}`);
    if (view === 'week') { const wk = body.querySelector('.evcal__week'); const first = body.querySelector('.evcal__block'); if (wk) wk.scrollLeft = 0; if (first && dir === 0) { /* keep */ } }
    lastDir = dir;
    emit(el, 'lds:range', { start: ymd(range[0]), end: ymd(range[1]), view });
  };
  const step = (n) => {
    cursor = view === 'week' ? addD(cursor, 7 * n) : new Date(cursor.getFullYear(), cursor.getMonth() + n, 1);
    if (view !== 'week') selected = ymd(cursor.getMonth() === todayD.getMonth() && cursor.getFullYear() === todayD.getFullYear() ? todayD : cursor);
    render(n);
  };
  el.addEventListener('click', (e) => {
    const nav = e.target.closest('[data-ev]');
    if (nav) { const a = nav.getAttribute('data-ev'); if (a === 'today') { const dir = Math.sign(ymd(todayD).localeCompare(ymd(cursor))); cursor = new Date(todayD); selected = ymd(todayD); render(dir); } else step(a === 'next' ? 1 : -1); return; }
    const v = e.target.closest('[data-view]');
    if (v && v.parentElement === seg) { if (v.getAttribute('data-view') !== view) { view = v.getAttribute('data-view'); cursor = dayOf(selected); render(0); seg.querySelector(`[data-view="${view}"]`)?.focus(); } return; }
    const evb = e.target.closest('[data-ev-id]');
    if (evb) { const ev = events.find((x) => String(x.id) === evb.getAttribute('data-ev-id')); emit(el, 'lds:event', { event: ev, el: evb }); return; }
    const more = e.target.closest('[data-more]');
    if (more) { emit(el, 'lds:day', { date: more.getAttribute('data-more'), events: onDay(dayOf(more.getAttribute('data-more'))), el: more }); return; }
    const cellEl = e.target.closest('.evcal__cell');
    if (cellEl) {
      const k = cellEl.getAttribute('data-day');
      selected = k;
      if (narrow) { const d = dayOf(k); if (d.getMonth() !== cursor.getMonth()) { const dir = Math.sign(k.localeCompare(ymd(cursor))); cursor = new Date(d.getFullYear(), d.getMonth(), 1); render(dir); } else render(0); body.querySelector(`[data-day-btn="${k}"]`)?.focus({ preventScroll: true }); }
      else { $$(body, '.evcal__date').forEach((b) => { b.tabIndex = b.getAttribute('data-day-btn') === k ? 0 : -1; }); }
      emit(el, 'lds:day', { date: k, events: onDay(dayOf(k)), el: cellEl });
    }
  });
  el.addEventListener('keydown', (e) => {
    const b = e.target.closest('.evcal__date'); if (!b) return;
    const n = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[e.key]; if (n === undefined) return;
    e.preventDefault();
    const k = ymd(addD(dayOf(b.getAttribute('data-day-btn')), n));
    let t = body.querySelector(`[data-day-btn="${k}"]`);
    selected = k;
    if (!t) { cursor = new Date(dayOf(k).getFullYear(), dayOf(k).getMonth(), 1); render(Math.sign(n)); t = body.querySelector(`[data-day-btn="${k}"]`); }
    else if (narrow) { render(0); t = body.querySelector(`[data-day-btn="${k}"]`); }
    $$(body, '.evcal__date').forEach((x) => { x.tabIndex = x === t ? 0 : -1; });
    t && t.focus();
  });
  if (typeof ResizeObserver === 'function') new ResizeObserver(() => { const nw = el.clientWidth < 640; if (nw !== narrow) { narrow = nw; render(0); } }).observe(el);
  narrow = el.clientWidth > 0 && el.clientWidth < 640;
  if (narrow && view === 'week') view = 'agenda';
  render(0);
  const handle = {
    set(list) { events = list; render(0); },
    go(date) { cursor = dayOf(date); selected = ymd(cursor); render(0); },
    view(v) { view = v; render(0); },
    filter(fn) { keep = fn || (() => true); render(0); },
    today() { cursor = new Date(todayD); selected = ymd(todayD); render(0); },
    get events() { return events; },
  };
  el._evcal = handle;
  return handle;
}

/* ---------- [dash-foundation] Date range picker ----------
   <div class="daterange" data-lds-daterange data-start="2026-10-18" data-end="2026-11-16" data-today="2026-11-16">
   <button class="btn btn--secondary btn--md daterange__trigger" aria-haspopup="dialog" aria-expanded="false" data-lds-menu="rng">
   <span class="ic" aria-hidden="true">calendar_month</span><span class="daterange__label">…</span><span class="ic" aria-hidden="true">expand_more</span></button>
   <div class="popover daterange__pop" id="rng" role="dialog" aria-label="Choose dates"></div></div>
   Fills the popover with presets, two months (one on phones) and Cancel / Apply. A preset applies at once; a picked start
   previews the span as the pointer or arrow keys move; Apply closes and fires lds:change { start, end }. */
export function dateRange(box) {
  if (!box || box._range) return box && box._range;
  const pop = box.querySelector('.daterange__pop'), trigger = box.querySelector('.daterange__trigger'), label = box.querySelector('.daterange__label');
  if (!pop) return null;
  const locale = box.getAttribute('data-locale') || 'en-GB';
  const today = box.getAttribute('data-today') ? dayOf(box.getAttribute('data-today')) : new Date();
  let start = dayOf(box.getAttribute('data-start') || ymd(addD(today, -29))), end = dayOf(box.getAttribute('data-end') || ymd(today));
  let a = start, b = end, picking = false, hover = null, focusK = ymd(end);
  let month = new Date(end.getFullYear(), end.getMonth() - 1, 1);
  const fS = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }), fY = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }), fM = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }), fL = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }), fN = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
  const text = (s, e) => (ymd(s) === ymd(e) ? fY.format(s) : s.getFullYear() === e.getFullYear() ? `${fS.format(s)} to ${fY.format(e)}` : `${fY.format(s)} to ${fY.format(e)}`);
  const days = (s, e) => Math.round((e - s) / 864e5) + 1;
  const presets = [
    ['Today', () => [today, today]], ['Last 7 days', () => [addD(today, -6), today]], ['Last 30 days', () => [addD(today, -29), today]],
    ['This month', () => [new Date(today.getFullYear(), today.getMonth(), 1), today]],
    ['Last month', () => [new Date(today.getFullYear(), today.getMonth() - 1, 1), new Date(today.getFullYear(), today.getMonth(), 0)]],
    ['Last 90 days', () => [addD(today, -89), today]], ['This year', () => [new Date(today.getFullYear(), 0, 1), today]],
  ];
  const cal = (m, idx) => {
    const first = new Date(m.getFullYear(), m.getMonth(), 1), lead = (first.getDay() + 6) % 7, n = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    const lo = picking ? (hover && hover < a ? hover : a) : a, hi = picking ? (hover && hover > a ? hover : a) : b;
    let h = `<div class="cal" role="group" aria-label="${esc(fM.format(m))}"><div class="cal__head"><button type="button" class="icon-btn${idx === 0 ? '' : ' is-hidden'}" data-rm="-1" aria-label="Previous month"${idx === 0 ? '' : ' tabindex="-1" aria-hidden="true"'}><span class="ic" aria-hidden="true">chevron_left</span></button><span class="cal__month">${esc(fM.format(m))}</span><button type="button" class="icon-btn${idx === 1 ? ' daterange__next' : ' daterange__next1'}" data-rm="1" aria-label="Next month"><span class="ic" aria-hidden="true">chevron_right</span></button></div><div class="cal__grid">`;
    for (let i = 0; i < 7; i++) h += `<span class="cal__dow" aria-hidden="true">${fN.format(addD(new Date(2026, 10, 16), i))}</span>`;
    for (let i = 0; i < lead; i++) h += '<span aria-hidden="true"></span>';
    for (let d = 1; d <= n; d++) {
      const day = new Date(m.getFullYear(), m.getMonth(), d), k = ymd(day);
      const end2 = k === ymd(lo) || (k === ymd(hi) && !(picking && !hover));
      const inR = day > lo && day < hi;
      const cls = end2 ? ' is-selected' : inR ? (picking ? ' is-preview' : ' is-range') : '';
      const future = day > today;
      h += `<button type="button" class="cal__day${cls}${k === ymd(today) ? ' is-today' : ''}${future ? ' is-muted' : ''}" data-k="${k}" tabindex="${k === focusK ? 0 : -1}" aria-label="${esc(fL.format(day))}" aria-pressed="${end2}"${future ? ' disabled' : ''}${k === ymd(today) ? ' aria-current="date"' : ''}>${d}</button>`;
    }
    return `${h}</div></div>`;
  };
  const draw = (focus) => {
    const m2 = new Date(month.getFullYear(), month.getMonth() + 1, 1);
    const pre = presets.map(([n, f]) => { const [s, e] = f(); const on = !picking && ymd(s) === ymd(a) && ymd(e) === ymd(b); return `<button type="button" class="daterange__preset" aria-pressed="${on}" data-preset="${esc(n)}">${esc(n)}</button>`; }).join('');
    pop.innerHTML = `<div class="daterange__presets" role="group" aria-label="Presets">${pre}</div><div class="daterange__main"><div class="daterange__months">${cal(month, 0)}${cal(m2, 1)}</div>
      <div class="daterange__foot"><span class="daterange__sum" aria-live="polite">${picking ? 'Pick the last day' : `${days(a, b)} day${days(a, b) > 1 ? 's' : ''} · ${esc(text(a, b))}`}</span><button type="button" class="btn btn--plain btn--sm" data-act="cancel">Cancel</button><button type="button" class="btn btn--primary btn--sm" data-act="apply"${picking ? ' disabled' : ''}>Apply</button></div></div>`;
    // On phones only the first month shows, so its own next button pages
    $$(pop, '.daterange__next1').forEach((x) => { x.classList.add('is-hidden'); x.tabIndex = -1; x.setAttribute('aria-hidden', 'true'); });
    if (matchMedia('(max-width: 720px)').matches) $$(pop, '.daterange__next1').forEach((x) => { x.classList.remove('is-hidden'); x.removeAttribute('tabindex'); x.removeAttribute('aria-hidden'); });
    if (focus) pop.querySelector(`[data-k="${focusK}"]`)?.focus({ preventScroll: true });
  };
  const commit = (s, e) => {
    start = s; end = e; a = s; b = e; picking = false;
    if (label) label.textContent = text(s, e);
    box.setAttribute('data-start', ymd(s)); box.setAttribute('data-end', ymd(e));
    emit(box, 'lds:change', { start: ymd(s), end: ymd(e) });
  };
  pop.addEventListener('click', (e) => {
    e.stopPropagation();
    const p = e.target.closest('[data-preset]');
    if (p) { const [s, en] = presets.find(([n]) => n === p.getAttribute('data-preset'))[1](); commit(s, en); month = new Date(en.getFullYear(), en.getMonth() - 1, 1); closeMenus(); trigger?.focus(); announce(`Showing ${text(s, en)}`); return; }
    const rm = e.target.closest('[data-rm]');
    if (rm) { month = new Date(month.getFullYear(), month.getMonth() + Number(rm.getAttribute('data-rm')), 1); draw(false); pop.querySelector('[data-rm]:not(.is-hidden)')?.focus(); return; }
    const d = e.target.closest('.cal__day[data-k]');
    if (d && !d.disabled) {
      const day = dayOf(d.getAttribute('data-k')); focusK = d.getAttribute('data-k');
      if (!picking) { a = day; b = day; picking = true; hover = null; }
      else { if (day < a) { b = a; a = day; } else b = day; picking = false; }
      draw(true); return;
    }
    const act = e.target.closest('[data-act]');
    if (act) { if (act.getAttribute('data-act') === 'apply' && !picking) { commit(a, b); announce(`Showing ${text(a, b)}`); } else { a = start; b = end; picking = false; } closeMenus(); trigger?.focus(); }
  });
  pop.addEventListener('pointerover', (e) => { if (!picking) return; const d = e.target.closest('.cal__day[data-k]'); if (!d || d.disabled) return; const k = d.getAttribute('data-k'); if (hover && ymd(hover) === k) return; hover = dayOf(k); paint(); });
  const paint = () => {
    const lo = hover && hover < a ? hover : a, hi = hover && hover > a ? hover : a;
    $$(pop, '.cal__day[data-k]').forEach((x) => { const day = dayOf(x.getAttribute('data-k')); x.classList.toggle('is-preview', day > lo && day < hi); x.classList.toggle('is-selected', ymd(day) === ymd(a) || (!!hover && ymd(day) === ymd(hover))); });
    const sum = pop.querySelector('.daterange__sum'); if (sum && hover) sum.textContent = `${days(lo, hi)} day${days(lo, hi) > 1 ? 's' : ''}`;
  };
  pop.addEventListener('keydown', (e) => {
    const d = e.target.closest('.cal__day[data-k]'); if (!d) return;
    const n = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 7, ArrowUp: -7 }[e.key]; if (n === undefined) return;
    e.preventDefault(); e.stopPropagation();
    let k = addD(dayOf(d.getAttribute('data-k')), n); if (k > today) k = today;
    focusK = ymd(k);
    const vis = new Date(month.getFullYear(), month.getMonth() + (matchMedia('(max-width: 720px)').matches ? 1 : 2), 1);
    if (k < month) month = new Date(k.getFullYear(), k.getMonth(), 1); else if (k >= vis) month = new Date(k.getFullYear(), k.getMonth() - (matchMedia('(max-width: 720px)').matches ? 0 : 1), 1);
    if (picking) hover = k;
    draw(true);
  });
  trigger && trigger.addEventListener('click', () => { a = start; b = end; picking = false; hover = null; focusK = ymd(end); month = new Date(end.getFullYear(), end.getMonth() - (matchMedia('(max-width: 720px)').matches ? 0 : 1), 1); draw(false); requestAnimationFrame(() => fitLayer(pop)); });
  if (label) label.textContent = text(start, end);
  draw(false);
  box._range = { get start() { return ymd(start); }, get end() { return ymd(end); }, set(s, e) { commit(dayOf(s), dayOf(e)); } };
  return box._range;
}

/* ---------- Init ---------- */
/* ---------- Device frame ----------
   <div class="device" data-lds-device> <div class="phone">…</div> </div>
   Scales the frame (CSS zoom) to fit its parent's width and the window height, never above 1. */
export function fitDevice(el) {
  if (!el || el.classList.contains('device--bleed')) { el && el.style.removeProperty('--device-scale'); return; }
  const cs = getComputedStyle(el);
  const w = parseFloat(cs.width) || 414, h = parseFloat(cs.height) || 868;
  const margin = Number(el.getAttribute('data-fit-margin') || 48);
  const box = el.parentElement ? el.parentElement.clientWidth : w;
  const s = Math.max(0.5, Math.min(1, box / w, (window.innerHeight - margin) / h));
  el.style.setProperty('--device-scale', String(Math.round(s * 1000) / 1000));
}
function bindDevice(el) {
  const fit = () => fitDevice(el);
  fit();
  window.addEventListener('resize', fit, { passive: true });
  if (typeof ResizeObserver === 'function' && el.parentElement) new ResizeObserver(fit).observe(el.parentElement);
}

/* ---------- Navigation stack ----------
   <div class="navstack" data-lds-navstack>
     <section class="navstack__view">root screen</section>
     <section class="navstack__view" id="course" hidden>…<button class="navbar__back" data-lds-back>…</button>…</section>
   </div>
   [data-lds-nav="course"] pushes; [data-lds-back] pops; a drag from the left edge pops with the finger. */
const stackOf = (v) => v && v.closest && v.closest('.navstack');
function viewsOf(stack) {
  if (!stack._views) stack._views = [stack.querySelector(':scope > .navstack__view:not([hidden])') || stack.querySelector(':scope > .navstack__view')];
  return stack._views;
}
function stackMoving(stack) {
  stack.classList.add('is-moving');
  clearTimeout(stack._mt); stack._mt = setTimeout(() => stack.classList.remove('is-moving'), 620);
}
function focusView(view) {
  const t = view.querySelector('[data-lds-autofocus]') || view.querySelector('h1, h2, .navbar__title');
  if (!t) return;
  if (!t.matches(FOCUSABLE)) t.setAttribute('tabindex', '-1');
  t.focus({ preventScroll: true });
}
export function pushView(id, from) {
  const view = typeof id === 'string' ? document.getElementById(id) : id;
  const stack = stackOf(view);
  if (!view || !stack) return;
  const views = viewsOf(stack);
  if (views.includes(view)) return;
  const prev = views[views.length - 1];
  view._from = from || document.activeElement;
  clearTimeout(view._t);
  view.hidden = false; view.inert = false; view.removeAttribute('aria-hidden');
  view.classList.remove('is-leaving', 'is-thrown', 'is-under');
  view.classList.add('is-off', 'is-instant');
  view.style.transform = '';
  $$(view, '.phone__scroll').forEach((s) => { s.scrollTop = 0; s.dispatchEvent(new Event('scroll')); });
  void view.offsetWidth;
  view.classList.remove('is-instant', 'is-off');
  prev.classList.add('is-under'); prev.inert = true;
  views.push(view);
  stackMoving(stack);
  setTimeout(() => focusView(view), 60);
  emit(view, 'lds:push', { view, from: prev });
}
function settlePop(stack, top, prev, thrown) {
  top.classList.remove('is-dragging'); prev.classList.remove('is-dragging');
  top.classList.add(thrown ? 'is-thrown' : 'is-leaving', 'is-off');
  top.style.transform = ''; prev.style.transform = ''; prev.style.removeProperty('--dim');
  top.inert = true;
  prev.classList.remove('is-under'); prev.inert = false;
  stackMoving(stack);
  clearTimeout(top._t);
  top._t = setTimeout(() => { if (top.classList.contains('is-off')) { top.hidden = true; top.classList.remove('is-leaving', 'is-thrown'); } }, 620);
  const from = top._from;
  setTimeout(() => { if (from && from.isConnected && prev.contains(from)) from.focus({ preventScroll: true }); else focusView(prev); }, 40);
  emit(top, 'lds:pop', { view: top, to: prev });
}
export function popView(target) {
  const stack = target && target.classList && target.classList.contains('navstack') ? target : stackOf(target);
  if (!stack) return;
  const views = viewsOf(stack);
  if (views.length < 2) return;
  const top = views.pop();
  settlePop(stack, top, views[views.length - 1], false);
}
/* Back to the first screen: screens in between leave at once, the top one slides away. */
export function popToRoot(target) {
  const stack = target && target.classList && target.classList.contains('navstack') ? target : stackOf(target);
  if (!stack) return;
  const views = viewsOf(stack);
  while (views.length > 2) {
    const mid = views.splice(1, 1)[0];
    mid.classList.remove('is-under'); mid.classList.add('is-off', 'is-instant'); mid.hidden = true; mid.inert = true;
    setTimeout(() => mid.classList.remove('is-instant'), 0);
  }
  if (views.length === 2) { views[0].classList.add('is-under'); popView(stack); }
}
function bindNavstack(stack) {
  const views = viewsOf(stack);
  $$(stack, ':scope > .navstack__view').forEach((v) => { if (!views.includes(v)) { v.hidden = true; v.inert = true; } });
  stack.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lds-back]');
    if (b && stackOf(b) === stack) popView(stack);
  });
  let st = null, eat = false;
  stack.addEventListener('pointerdown', (e) => {
    const vs = viewsOf(stack);
    if (vs.length < 2 || e.button > 0) return;
    const r = stack.getBoundingClientRect(), k = r.width / stack.offsetWidth || 1;
    if ((e.clientX - r.left) / k > 28) return;
    st = { x: e.clientX, y: e.clientY, k, on: false, dx: 0, hist: [[e.clientX, performance.now()]], top: vs[vs.length - 1], prev: vs[vs.length - 2] };
  });
  stack.addEventListener('pointermove', (e) => {
    if (!st) return;
    const dx = (e.clientX - st.x) / st.k, dy = (e.clientY - st.y) / st.k;
    if (!st.on) {
      if (Math.hypot(dx, dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx) || dx < 0) { st = null; return; }
      st.on = true; eat = true;
      try { stack.setPointerCapture(e.pointerId); } catch (err) { /* pointer already gone */ }
      st.top.classList.add('is-dragging'); st.prev.classList.add('is-dragging'); stack.classList.add('is-moving');
    }
    const w = stack.offsetWidth;
    st.dx = Math.max(0, dx);
    st.top.style.transform = `translateX(${st.dx}px)`;
    st.prev.style.transform = `translateX(${-0.3 * (w - st.dx)}px)`;
    st.prev.style.setProperty('--dim', String(0.5 * (1 - st.dx / w)));
    st.hist.push([e.clientX, performance.now()]); if (st.hist.length > 5) st.hist.shift();
  });
  const up = () => {
    if (!st) return;
    const s = st; st = null;
    if (!s.on) return;
    const a = s.hist[0], b = s.hist[s.hist.length - 1];
    const v = b[1] > a[1] ? (b[0] - a[0]) / s.k / ((b[1] - a[1]) / 1000) : 0;
    const w = stack.offsetWidth;
    if (s.dx + project(v) > w / 2) { viewsOf(stack).pop(); settlePop(stack, s.top, s.prev, !reduceMotion()); haptic('light'); }
    else {
      s.top.classList.remove('is-dragging'); s.prev.classList.remove('is-dragging');
      s.top.style.transform = ''; s.prev.style.transform = ''; s.prev.style.removeProperty('--dim');
      stackMoving(stack);
    }
    setTimeout(() => { eat = false; }, 0);
  };
  stack.addEventListener('pointerup', up);
  stack.addEventListener('pointercancel', up);
  stack.addEventListener('click', (e) => { if (eat) { e.stopPropagation(); e.preventDefault(); eat = false; } }, true);
}

/* ---------- Pull to refresh ----------
   <div class="phone__scroll" data-lds-refresh> <div class="refresh" aria-hidden="true"><span class="spinner">8 × <i></i></span></div> …
   Listen for lds:refresh and call e.detail.wait(promise); the spinner holds until it settles. */
const PULL_AT = 56;
function runRefresh(sc) {
  if (sc._busy) return;
  sc._busy = true;
  sc.classList.remove('is-pulling'); sc.classList.add('is-refreshing');
  sc.setAttribute('aria-busy', 'true');
  sc.style.setProperty('--pull', `${PULL_AT}px`); sc.style.setProperty('--pull-p', '1');
  haptic('light');
  let work = Promise.resolve();
  emit(sc, 'lds:refresh', { wait: (p) => { work = Promise.resolve(p); } });
  const min = new Promise((r) => setTimeout(r, 700));
  Promise.allSettled([work, min]).then(() => {
    sc._busy = false;
    sc.classList.remove('is-refreshing'); sc.removeAttribute('aria-busy');
    sc.style.setProperty('--pull', '0px'); sc.style.setProperty('--pull-p', '0');
  });
}
/* Starts a refresh without the gesture, for a Refresh button or a keyboard shortcut. */
export function startRefresh(sc) { if (sc) { sc.scrollTop = 0; runRefresh(sc); } }
function bindRefresh(sc) {
  let y0 = null, pull = 0, mouse = false, eat = false;
  const set = (px) => { pull = px; sc.style.setProperty('--pull', `${px}px`); sc.style.setProperty('--pull-p', String(Math.min(1, px / PULL_AT))); };
  const begin = (y) => { if (sc._busy || sc.scrollTop > 0) return; y0 = y; };
  const track = (y) => {
    if (y0 === null) return false;
    const dy = y - y0;
    if (dy <= 0 || sc.scrollTop > 0) { if (pull) { set(0); sc.classList.remove('is-pulling'); } return false; }
    sc.classList.add('is-pulling');
    set(rubber(dy, 200));
    return true;
  };
  const end = () => {
    if (y0 === null) return;
    y0 = null;
    if (pull >= PULL_AT) runRefresh(sc);
    else { sc.classList.remove('is-pulling'); set(0); }
  };
  sc.addEventListener('touchstart', (e) => begin(e.touches[0].clientY), { passive: true });
  sc.addEventListener('touchmove', (e) => { if (track(e.touches[0].clientY) && e.cancelable) e.preventDefault(); }, { passive: false });
  sc.addEventListener('touchend', end);
  sc.addEventListener('touchcancel', end);
  sc.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.button > 0) return; mouse = true; begin(e.clientY); });
  sc.addEventListener('pointermove', (e) => {
    if (!mouse || y0 === null) return;
    if (!sc.classList.contains('is-pulling') && e.clientY - y0 < 6) return;
    if (track(e.clientY)) { eat = true; try { sc.setPointerCapture(e.pointerId); } catch (err) { /* gone */ } }
  });
  const mup = () => { if (!mouse) return; mouse = false; end(); setTimeout(() => { eat = false; }, 0); };
  sc.addEventListener('pointerup', mup);
  sc.addEventListener('pointercancel', mup);
  sc.addEventListener('click', (e) => { if (eat) { e.stopPropagation(); e.preventDefault(); eat = false; } }, true);
}

/* ---------- Inbox list ----------
   <div class="inbox" data-lds-inbox> <button class="inbox__row">…</button> … </div>
   Up and Down (and j / k) move focus between the visible rows; Home and End go to the ends. */
function bindInbox(list) {
  list.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey || !e.target.closest('.inbox__row')) return;
    const keys = { ArrowDown: 1, ArrowUp: -1, j: 1, k: -1, Home: -Infinity, End: Infinity };
    if (!(e.key in keys)) return;
    const rows = $$(list, '.inbox__row').filter((r) => r.offsetParent !== null && !r.closest('.is-gone'));
    if (!rows.length) return;
    e.preventDefault();
    const i = rows.indexOf(e.target.closest('.inbox__row'));
    const d = keys[e.key];
    const next = d === -Infinity ? 0 : d === Infinity ? rows.length - 1 : Math.min(rows.length - 1, Math.max(0, i + d));
    rows[next].focus();
    rows[next].scrollIntoView({ block: 'nearest' });
  });
}

/* ---------- Check matrix ----------
   <table class="matrix" data-lds-matrix>: rows carry data-group; a tr.matrix__group row holds one
   input[data-lds-matrix-all] per column. A group box ticks or clears its column in that area, and shows
   mixed when only some are on. Fires lds:change with { input, changed } after a person changes a cell. */
function matrixSync(table) {
  $$(table, 'tr.matrix__group').forEach((g) => {
    const key = g.getAttribute('data-group');
    $$(g, 'td').forEach((td) => {
      const all = td.querySelector('[data-lds-matrix-all]'); if (!all) return;
      const col = td.cellIndex;
      const boxes = $$(table, `tbody tr[data-group="${key}"]:not(.matrix__group)`).map((r) => r.cells[col] && r.cells[col].querySelector('input[type="checkbox"]')).filter(Boolean);
      const on = boxes.filter((b) => b.checked).length;
      all.checked = on > 0 && on === boxes.length;
      all.indeterminate = on > 0 && on < boxes.length;
      all.disabled = boxes.every((b) => b.disabled);
      const lab = all.closest('.check'); if (lab) lab.classList.toggle('is-mixed', all.indeterminate);
    });
  });
}
export function matrixRefresh(table) { if (table) matrixSync(table); }
function bindMatrix(table) {
  matrixSync(table);
  table.addEventListener('change', (e) => {
    const input = e.target.closest('input[type="checkbox"]'); if (!input) return;
    let changed = [input];
    if (input.hasAttribute('data-lds-matrix-all')) {
      const td = input.closest('td'), key = td.parentElement.getAttribute('data-group'), col = td.cellIndex;
      changed = $$(table, `tbody tr[data-group="${key}"]:not(.matrix__group)`).map((r) => r.cells[col] && r.cells[col].querySelector('input[type="checkbox"]')).filter((b) => b && !b.disabled && b.checked !== input.checked);
      changed.forEach((b) => { b.checked = input.checked; });
    }
    matrixSync(table);
    emit(table, 'lds:change', { input, changed });
  });
}

export function init(root = document) {
  if (typeof document === 'undefined') return;
  renderAksara(root);
  /* Each binder runs once per element. An element can match several selectors (a sheet is a layer
     and a draggable sheet; a scroller has a nav bar and pull to refresh), so the guard is per selector. */
  const on = (sel, fn) => $$(root, sel).forEach((el) => {
    const done = el.__ldsBound || (el.__ldsBound = new Set());
    if (!done.has(sel)) { done.add(sel); fn(el); }
  });
  on('[data-lds-segmented]', (g) => bindIndicator(g, { itemSel: '.seg__btn', thumbSel: '.seg__thumb', attr: 'aria-pressed' }));
  on('[data-lds-tabs]', (g) => bindIndicator(g, { itemSel: '[role="tab"]', thumbSel: '.tabs__ink', attr: 'aria-selected', onPick: (i, tab) => {
    $$(g, '[role="tab"]').forEach((t) => { const p = document.getElementById(t.getAttribute('aria-controls')); if (p) p.hidden = t !== tab; });
  } }));
  on('[data-lds-open]', (b) => b.addEventListener('click', () => openLayer(b.getAttribute('data-lds-open'), b)));
  on('[data-lds-close]', (b) => b.addEventListener('click', () => closeLayer(b.closest('[data-lds-layer]'))));
  on('[data-lds-scrim]', (s) => s.addEventListener('click', () => closeLayer(s.getAttribute('data-lds-scrim'))));
  on('[data-lds-layer]', (l) => { if (!l.classList.contains('is-open')) { l.setAttribute('aria-hidden', 'true'); l.inert = true; } else openStack.push(l); });
  on('.sheet[data-lds-layer]', bindSheet);
  on('[data-lds-menu]', bindMenu);
  on('[data-lds-contextmenu]', bindContextMenu);
  on('.slider', bindSlider);
  on('[data-lds-range]', bindRange);
  on('[data-lds-stepper]', bindStepper);
  on('[data-lds-roll]', (el) => setRoll(el, el.getAttribute('data-lds-roll')));
  on('[data-lds-otp]', bindOtp);
  on('[data-lds-hold]', bindHold);
  on('[data-lds-slide]', bindSlide);
  on('[data-lds-copy]', bindCopy);
  on('.acc__btn[aria-controls], .tree__row[aria-controls]', bindDisclosure);
  on('[data-lds-search]', bindSearch);
  on('[data-lds-dismiss]', bindDismiss);
  on('[data-lds-filter]', bindFilter);
  on('[data-lds-navbar]', bindNavbar);
  on('[data-lds-navstack]', bindNavstack);
  on('[data-lds-nav]', (b) => b.addEventListener('click', () => pushView(b.getAttribute('data-lds-nav'), b)));
  on('[data-lds-refresh]', bindRefresh);
  on('[data-lds-refresh-for]', (b) => b.addEventListener('click', () => startRefresh(document.getElementById(b.getAttribute('data-lds-refresh-for')))));
  on('[data-lds-device]', bindDevice);
  on('[data-lds-morph]', primeMorph);
  on('[data-lds-confirm]', bindConfirm);
  on('[data-lds-like]', bindLike);
  on('.switch input', bindSwitch);
  on('[data-lds-toolbar]', bindToolbar);
  on('[data-lds-swipe]', bindSwipe);
  on('[data-lds-inline]', bindInline);
  on('[data-lds-fade]', bindFade);
  on('[data-lds-hint]', bindHint);
  on('[data-lds-thinking]', bindThinking);
  on('[data-lds-shell]', (sh) => { bindShell(sh); bindShellRail(sh); });
  bindShellSections(root);
  on('[data-lds-topnav]', bindTopnav);
  on('[data-lds-toc]', bindToc);
  on('[data-lds-time]', bindTime);
  on('[data-lds-timer]', bindTimer);
  on('[data-lds-elapsed]', bindElapsed);
  on('[data-lds-more]', bindMore);
  on('[data-lds-resize]', bindResize);
  on('[data-lds-inbox]', bindInbox);
  on('[data-lds-matrix]', bindMatrix);
  on('[data-lds-lightbox]', bindLightbox);
  on('[data-lds-composer]', bindComposer);
  on('[data-lds-jump]', bindJump);
  on('[data-lds-toggle]', bindToggle);
  on('[data-lds-carousel]', bindCarousel);
  on('[data-lds-sort]', bindSort);
  on('.tree[role="tree"]', bindTree);
  on('[data-lds-calendar]', bindCalendar);
  on('[data-lds-coach]', bindCoach);
  on('[data-lds-crosshair]', bindCrosshair);
  on('[data-lds-chart]', (el) => drawChart(el, readChartConfig(el)));
  // these share elements with other hooks (a .seg is also data-lds-segmented), so they keep their own flag
  const own = (sel, key, fn) => $$(root, sel).forEach((el) => { if (!el[key]) { el[key] = true; fn(el); } });
  own('[data-lds-chart-for]', '_ldsChartFor', bindChartFor);
  own('.donut-chart', '_ldsDonutBound', bindDonut);
  own('[data-lds-grow]', '_ldsGrow', growIn);
  own('[data-lds-uptime]', '_ldsUptime', bindUptime);
  own('[data-lds-route]', '_ldsRoute', bindRoute);
  own('[data-lds-map]', '_ldsMapBound', bindMap);
  if (document.querySelector('.paper--print')) bindPaperPrint();
  on('.stagger', (list) => Array.from(list.children).forEach((c, i) => { if (!c.style.getPropertyValue('--i')) c.style.setProperty('--i', String(i)); }));
  on('[data-lds-tags]', bindTags);
  on('[data-lds-chips]', bindChips);
  on('[data-lds-radios], [data-lds-rating]', bindRadios);
  on('[data-lds-password]', bindPassword);
  on('[data-lds-count]', bindCount);
  on('[data-lds-clear]', bindClear);
  on('[data-lds-file]', bindFile);
  on('[data-lds-sidebar]', bindSidebar);
  on('[data-lds-menubar]', bindMenubar);
  on('[data-lds-overlay]', bindOverlay);
  own('[data-lds-cmdk-key]', '_ldsCmdkKey', bindCmdkKey); // the palette is also a [data-lds-layer]
  on('[data-lds-billing]', bindBilling);
  on('dialog.modal', bindModal);
  on('[data-lds-modal]', (b) => b.addEventListener('click', () => openModal(document.getElementById(b.getAttribute('data-lds-modal')))));
  on('[data-lds-select]', bindSelect);
  on('[data-lds-combobox]', bindCombobox);
  on('[data-lds-table]', bindTable);
  on('[data-lds-selection]', bindSelection);
  on('[data-lds-kanban]', bindKanban);
  on('[data-lds-events]', (el) => eventCalendar(el));
  on('[data-lds-daterange]', dateRange);
  if (root === document && document.querySelector('[data-lds-reveal]')) observeReveal(document);
  on('[data-lds-theme]', (b) => b.addEventListener('click', () => setTheme(b.getAttribute('data-lds-theme'))));
  if (!globalBound) {
    globalBound = true;
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (openMenu) { closeMenus(); return; }
        const top = openStack[openStack.length - 1];
        if (top) { e.preventDefault(); closeLayer(top); }
      }
      trapFocus(e);
    });
    document.addEventListener('click', () => closeMenus());
    const fitTips = (e) => { const host = e.target.closest && e.target.closest('.tip-host'); if (host) host.querySelectorAll(':scope > .tip, :scope > .hovercard').forEach(fitLayer); };
    document.addEventListener('pointerover', fitTips);
    document.addEventListener('focusin', fitTips);
  }
}

export default { init, matrixRefresh, setTheme, swapTheme, restoreTheme, openLayer, closeLayer, closeMenus, toast, setLoading, setRoll, otpError, morphText, shake, haptic, likeRevert, resetHints, thinkingDone, uploadProgress, uploadReset, openModal, closeModal, observeReveal, placeShellHighlight, streamText, announce, slideReset, navProgress, flip, fitLayer, fitDevice, pushView, popView, popToRoot, startRefresh, drawChart, formatValue, restoreRail, setRail, selectionRefresh, tableRefresh, tableState, setDelta, eventCalendar, dateRange, drawRoute, drawMap };
