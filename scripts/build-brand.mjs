// Draws the LDS mark: a smooth, modern siger (the Lampung crown). Seven leaf-shaped lekuk fan
// out from a tapered body, the tallest in the middle, above a curved gold band. Writes brand/*.svg and the favicon used by the site and docs.
//   brand/siger.svg          the crown alone, filled with currentColor (for UI and print)
//   brand/mark.svg           green tile, white crown, gold band (logo, favicon, app icon)
//   brand/mark-mono.svg      one-color tile for single-ink use
//   apps/landing/favicon.svg same as mark.svg
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const r = (n) => Math.round(n * 100) / 100;

/** Crown outline on a 64 x 64 grid: a modern, smooth reading of the siger. Seven lekuk, each a
    broad leaf that tapers to a softly rounded point, fan out from a body that narrows toward the
    head; the middle lekuk is tallest and the outer ones lean outward. Neighbouring lekuk meet in
    small round notches, so no edge is sharp. */
export function sigerPath({ n = 7, from = 7, to = 57, top = 6, edge = 17, notch = 24.5, soft = 1, base = 40, sag = 4, bulge = 0.5, lean = 2.6, taper = 3.5 } = {}) {
  const mid = (n - 1) / 2;
  const step = (to - from) / (n - 1);
  const h = step / 2;
  const tip = (i) => { const t = (i - mid) / mid; return [from + i * step + lean * t * Math.abs(t), top + (edge - top) * Math.abs(t) ** 1.5]; };
  const notchAt = (i) => [from + (i + 0.5) * step, notch + (edge - top) * 0.3 * (Math.abs(i + 0.5 - mid) / mid)];
  const L = from - h;
  const R = to + h;
  const [x0, y0] = tip(0);
  let d = `M${r(L + taper)} ${r(base)} C${r(L - taper * 0.3)} ${r(base - (base - y0) * 0.55)} ${r(x0 - h * 0.35)} ${r(y0 + (base - y0) * 0.12)} ${r(x0 - soft)} ${r(y0 + soft * 1.4)}`;
  for (let i = 0; i < n; i++) {
    const [x, y] = tip(i);
    d += ` Q${r(x)} ${r(y - soft * 0.5)} ${r(x + soft)} ${r(y + soft * 1.4)}`; // rounded point
    if (i < n - 1) {
      const [vx, vy] = notchAt(i);
      const [x2, y2] = tip(i + 1);
      const nr = 1.3; // notch radius
      d += ` C${r(x + h * bulge)} ${r(y + (vy - y) * 0.12)} ${r(vx + 0.2)} ${r(vy - (vy - y) * 0.55)} ${r(vx - nr * 0.6)} ${r(vy - nr)}`;
      d += ` Q${r(vx)} ${r(vy + nr * 0.6)} ${r(vx + nr * 0.6)} ${r(vy - nr)}`;
      d += ` C${r(vx - 0.2)} ${r(vy - (vy - y2) * 0.55)} ${r(x2 - h * bulge)} ${r(y2 + (vy - y2) * 0.12)} ${r(x2 - soft)} ${r(y2 + soft * 1.4)}`;
    }
  }
  const [xn, yn] = tip(n - 1);
  d += ` C${r(xn + h * 0.35)} ${r(yn + (base - yn) * 0.12)} ${r(R + taper * 0.3)} ${r(base - (base - yn) * 0.55)} ${r(R - taper)} ${r(base)}`;
  d += ` Q32 ${r(base + sag * 2)} ${r(L + taper)} ${r(base)}Z`;
  return { d };
}

/** The gold band under the crown, following the same curve. */
export function bandPath({ y = 44, w = 20 } = {}) {
  return `M${r(32 - w)} ${r(y)} Q32 ${r(y + 7)} ${r(32 + w)} ${r(y)} L${r(32 + w)} ${r(y + 4.4)} Q32 ${r(y + 11.4)} ${r(32 - w)} ${r(y + 4.4)}Z`;
}

const crown = sigerPath();
const band = bandPath();
const body = crown.d;
const files = {
  'brand/siger.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 4 62 52" fill="currentColor"><title>Siger</title><path d="${body}"/><path d="${band}"/></svg>\n`,
  'brand/mark.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>Lampung Design System</title><rect width="64" height="64" rx="15" fill="#0B6E4F"/><g transform="translate(32 32) scale(0.82) translate(-32 -30.5)"><path d="${body}" fill="#FFFFFF"/><path d="${band}" fill="#C9952B"/></g></svg>\n`,
  'brand/mark-mono.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor"><title>Lampung Design System</title><path d="M15 0h34a15 15 0 0 1 15 15v34a15 15 0 0 1-15 15H15A15 15 0 0 1 0 49V15A15 15 0 0 1 15 0Z"/><g transform="translate(32 32) scale(0.82) translate(-32 -30.5)" fill="#FFFFFF"><path d="${body}"/><path d="${band}"/></g></svg>\n`,
};
files['apps/landing/favicon.svg'] = files['brand/mark.svg'];
for (const [p, s] of Object.entries(files)) {
  mkdirSync(dirname(join(root, p)), { recursive: true });
  writeFileSync(join(root, p), s);
  console.log(`wrote ${p}`);
}
// The inline form used by the docs shell and pages: the crown and band in currentColor, sized by CSS.
writeFileSync(join(root, 'brand/siger.inline.txt'), `<svg class="siger" viewBox="1 4 62 52" aria-hidden="true" focusable="false"><path d="${body}"/><path class="siger__band" d="${band}"/></svg>\n`);
console.log('wrote brand/siger.inline.txt');
