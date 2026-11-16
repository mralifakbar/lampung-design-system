/* ==========================================================================
   Board runtime for the docs site.
   Renders the same .dc.html boards that live on the Claude Design canvas, so
   the docs and the canvas never drift. Supports the subset the boards use:
   {{holes}}, <sc-for>, <sc-if>, on* handlers returned from renderVals(), data-dc-own,
   the Component/DCLogic class with setState, and key="" to force a remount.

   Updates patch the existing DOM in place (no re-mount), so every CSS
   transition and spring in the design system plays exactly as on the canvas.
   ========================================================================== */

const EVENTS = {
  onclick: 'click', onchange: 'input', oninput: 'input', onkeydown: 'keydown', onkeyup: 'keyup',
  onpointerdown: 'pointerdown', onpointermove: 'pointermove', onpointerup: 'pointerup', onpointercancel: 'pointercancel', onpointerleave: 'pointerleave',
  onmouseenter: 'mouseenter', onmouseleave: 'mouseleave', onmousemove: 'mousemove', onmousedown: 'mousedown',
  onscroll: 'scroll', onfocus: 'focus', onblur: 'blur', oncontextmenu: 'contextmenu',
  ondragover: 'dragover', ondragleave: 'dragleave', ondrop: 'drop'
};
const PROPS = { checked: 'checked', disabled: 'disabled', value: 'value', defaultchecked: 'checked' };
const SVG_NS = 'http://www.w3.org/2000/svg';

const lookup = (path, scope) => {
  path = path.trim();
  if (path === 'true') return true;
  if (path === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(path)) return Number(path);
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), scope);
};
const interp = (str, scope) => str.replace(/\{\{([^}]+)\}\}/g, (_, p) => { const v = lookup(p, scope); return v == null ? '' : String(v); });

/* Build a lightweight virtual tree from the template for the current values. */
function build(node, scope, out) {
  if (node.nodeType === 3) { out.push({ text: interp(node.nodeValue, scope) }); return; }
  if (node.nodeType !== 1) return;
  const tag = node.localName;
  if (tag === 'helmet') return;
  if (tag === 'sc-for') {
    const list = lookup(node.getAttribute('list').replace(/[{}]/g, ''), scope) || [];
    const as = node.getAttribute('as');
    list.forEach((item, i) => { const s = Object.create(scope); s[as] = item; s.$index = i; node.childNodes.forEach((c) => build(c, s, out)); });
    return;
  }
  if (tag === 'sc-if') {
    if (lookup(node.getAttribute('value').replace(/[{}]/g, ''), scope)) node.childNodes.forEach((c) => build(c, scope, out));
    return;
  }
  const v = { tag, ns: node.namespaceURI, attrs: {}, props: {}, on: {}, key: null, kids: [] };
  for (const a of node.attributes) {
    const name = a.name;
    const raw = a.value.match(/^\{\{([^}]+)\}\}$/);
    const lower = name.toLowerCase();
    if (EVENTS[lower]) { const fn = raw ? lookup(raw[1], scope) : null; if (typeof fn === 'function') v.on[EVENTS[lower]] = fn; continue; }
    const val = raw ? lookup(raw[1], scope) : interp(a.value, scope);
    if (lower === 'key') { v.key = String(val); continue; }
    if (PROPS[lower]) {
      const p = PROPS[lower];
      if (lower === 'defaultchecked') { v.defaultChecked = !!val; continue; }
      v.props[p] = p === 'value' ? (val == null ? '' : val) : !!val;
      if (p !== 'value' && val) v.attrs[lower] = '';
      continue;
    }
    if (val === false || val == null) continue;
    v.attrs[name] = val === true ? '' : String(val);
  }
  node.childNodes.forEach((c) => build(c, scope, v.kids));
  out.push(v);
}

/* Every element gets one dispatcher per event type that calls the latest handler,
   so patched nodes never hold stale closures. */
function setHandlers(el, on) {
  el.__h = el.__h || {};
  for (const type of Object.keys(el.__h)) if (!on[type]) el.__h[type] = null;
  for (const [type, fn] of Object.entries(on)) {
    if (!(type in el.__h)) el.addEventListener(type, (e) => el.__h[type] && el.__h[type](e), type === 'scroll' ? { passive: true } : undefined);
    el.__h[type] = fn;
  }
}
function create(v) {
  if (v.text != null) return document.createTextNode(v.text);
  const el = v.ns === SVG_NS ? document.createElementNS(SVG_NS, v.tag) : document.createElement(v.tag);
  for (const [k, val] of Object.entries(v.attrs)) el.setAttribute(k, val);
  if (v.key != null) el.__key = v.key;
  if (v.defaultChecked) el.checked = true;
  for (const [p, val] of Object.entries(v.props)) el[p] = val;
  setHandlers(el, v.on);
  v.kids.forEach((k) => el.appendChild(create(k)));
  return el;
}
function patch(el, v) {
  if (v.text != null) {
    if (el.nodeType === 3) { if (el.nodeValue !== v.text) el.nodeValue = v.text; return el; }
    const t = create(v); el.replaceWith(t); return t;
  }
  if (el.nodeType !== 1 || el.localName !== v.tag || (v.key != null && el.__key !== v.key)) {
    const n = create(v); el.replaceWith(n); return n;
  }
  /* data-dc-own: a widget whose insides belong to js/lds.js; leave its state alone. */
  if (el.hasAttribute('data-dc-own')) { setHandlers(el, v.on); return el; }
  for (const a of Array.from(el.attributes)) if (!(a.name in v.attrs)) el.removeAttribute(a.name);
  for (const [k, val] of Object.entries(v.attrs)) if (el.getAttribute(k) !== val) el.setAttribute(k, val);
  for (const [p, val] of Object.entries(v.props)) {
    if (p === 'value' && document.activeElement === el && String(el.value) === String(val)) continue;
    if (el[p] !== val) el[p] = val;
  }
  setHandlers(el, v.on);
  patchChildren(el, v.kids);
  return el;
}
function patchChildren(parent, kids) {
  const nodes = Array.from(parent.childNodes);
  kids.forEach((k, i) => { if (nodes[i]) patch(nodes[i], k); else parent.appendChild(create(k)); });
  for (let i = nodes.length - 1; i >= kids.length; i--) nodes[i].remove();
}

/* Mount a board file into a container. Returns { unmount, component }. */
export async function mount(container, url, props = {}) {
  const src = await fetch(url).then((r) => { if (!r.ok) throw new Error(`Could not load ${url}`); return r.text(); });
  const doc = new DOMParser().parseFromString(src, 'text/html');
  const tmpl = doc.querySelector('x-dc');
  const script = doc.querySelector('script[data-dc-script]');
  const meta = JSON.parse(script.getAttribute('data-props') || '{}');

  const styles = [];
  const helmet = doc.querySelector('helmet');
  if (helmet) helmet.querySelectorAll('style, link[rel="stylesheet"]').forEach((n) => {
    const c = document.importNode(n, true);
    c.setAttribute('data-board-style', '');
    document.head.appendChild(c);
    styles.push(c);
  });

  let pending = false, comp;
  const render = () => {
    pending = false;
    const out = [];
    const vals = comp.renderVals();
    tmpl.childNodes.forEach((c) => build(c, vals, out));
    patchChildren(container, out);
  };
  const schedule = () => { if (!pending) { pending = true; requestAnimationFrame(render); } };

  class DCLogic {
    constructor(p) { this.props = p; this.state = null; }
    setState(p) { this.state = { ...(this.state || {}), ...(typeof p === 'function' ? p(this.state) : p) }; schedule(); }
    forceUpdate() { schedule(); }
  }
  const Component = new Function('DCLogic', `${script.textContent}\nreturn Component;`)(DCLogic);
  const initial = {};
  for (const [k, m] of Object.entries(meta)) if (m && 'default' in m) initial[k] = m.default;
  comp = new Component({ ...initial, ...props });
  render();
  comp.componentDidMount && comp.componentDidMount();

  return {
    component: comp,
    setProps(next) { comp.props = { ...comp.props, ...next }; schedule(); },
    unmount() {
      comp.componentWillUnmount && comp.componentWillUnmount();
      styles.forEach((s) => s.remove());
      container.replaceChildren();
    }
  };
}
