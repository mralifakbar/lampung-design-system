// Draws the LDS mark: a siger (the Lampung crown) with nine peaks, the tallest in the middle,
// standing on a curved band. Writes brand/*.svg and the favicon used by the site and docs.
//   brand/siger.svg          the crown alone, filled with currentColor (for UI and print)
//   brand/mark.svg           green tile, white crown, gold band (logo, favicon, app icon)
//   brand/mark-mono.svg      one-color tile for single-ink use
//   apps/landing/favicon.svg same as mark.svg
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const r = (n) => Math.round(n * 100) / 100;

/** Crown outline on a 64 x 64 grid: nine petal-shaped peaks (lekuk) along an arc, the tallest in
    the middle, shallow valleys between them, and a base that curves down toward the middle. */
export function sigerPath({ left = 8, right = 56, base = 46, sag = 5, center = 9, edge = 26, depth = 6 } = {}) {
  const n = 9;
  const mid = (n - 1) / 2;
  const step = (right - left) / (n - 1);
  const peakY = (i) => center + (edge - center) * (Math.abs(i - mid) / mid) ** 1.4;
  const valleyY = (i) => Math.max(peakY(i), peakY(i + 1)) + depth;
  const px = (i) => left + i * step;
  // A petal side from (x0, y0) up to the tip (x1, y1): rises steeply, then bends into the point.
  const side = (x0, y0, x1, y1) => ` C${r(x0 + (x1 - x0) * 0.08)} ${r(y0 - (y0 - y1) * 0.55)} ${r(x1 - (x1 - x0) * 0.35)} ${r(y1 + (y0 - y1) * 0.12)} ${r(x1)} ${r(y1)}`;
  const firstFoot = peakY(0) + depth;
  let d = `M${r(left - step / 2)} ${r(base)} L${r(left - step / 2)} ${r(firstFoot)}`;
  for (let i = 0; i < n; i++) {
    const fromX = i === 0 ? left - step / 2 : px(i) - step / 2;
    const fromY = i === 0 ? firstFoot : valleyY(i - 1);
    d += side(fromX, fromY, px(i), peakY(i));
    const toX = i === n - 1 ? right + step / 2 : px(i) + step / 2;
    const toY = i === n - 1 ? peakY(n - 1) + depth : valleyY(i);
    // descending side mirrors the rising one
    d += ` C${r(px(i) + (toX - px(i)) * 0.35)} ${r(peakY(i) + (toY - peakY(i)) * 0.12)} ${r(toX - (toX - px(i)) * 0.08)} ${r(toY - (toY - peakY(i)) * 0.55)} ${r(toX)} ${r(toY)}`;
  }
  d += ` L${r(right + step / 2)} ${r(base)} Q32 ${r(base + sag * 2)} ${r(left - step / 2)} ${r(base)}Z`;
  return { d };
}

/** The gold band under the crown, following the same curve. */
export function bandPath({ left = 8, right = 56, base = 46, sag = 5, gap = 3, thick = 4.4 } = {}) {
  const y0 = base + gap;
  const l = left - 3;
  const ri = right + 3;
  return `M${r(l)} ${r(y0)} Q32 ${r(y0 + sag * 2)} ${r(ri)} ${r(y0)} L${r(ri)} ${r(y0 + thick)} Q32 ${r(y0 + thick + sag * 2)} ${r(l)} ${r(y0 + thick)}Z`;
}

const crown = sigerPath();
const band = bandPath();
const files = {
  'brand/siger.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 4 56 58" fill="currentColor"><title>Siger</title><path d="${crown.d}"/><path d="${band}"/></svg>\n`,
  'brand/mark.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>Lampung Design System</title><rect width="64" height="64" rx="15" fill="#0B6E4F"/><g transform="translate(32 33) scale(0.8) translate(-32 -33)"><path d="${crown.d}" fill="#FFFFFF"/><path d="${band}" fill="#C9952B"/></g></svg>\n`,
  'brand/mark-mono.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor"><title>Lampung Design System</title><path fill-rule="evenodd" d="M15 0h34a15 15 0 0 1 15 15v34a15 15 0 0 1-15 15H15A15 15 0 0 1 0 49V15A15 15 0 0 1 15 0Z"/><g transform="translate(32 33) scale(0.8) translate(-32 -33)" fill="#FFFFFF"><path d="${crown.d}"/><path d="${band}"/></g></svg>\n`,
};
files['apps/landing/favicon.svg'] = files['brand/mark.svg'];
for (const [p, s] of Object.entries(files)) {
  mkdirSync(dirname(join(root, p)), { recursive: true });
  writeFileSync(join(root, p), s);
  console.log(`wrote ${p}`);
}
// The inline form used by the docs shell and pages: the crown and band in currentColor, sized by CSS.
writeFileSync(join(root, 'brand/siger.inline.txt'), `<svg class="siger" viewBox="4 4 56 58" aria-hidden="true" focusable="false"><path d="${crown.d}"/><path class="siger__band" d="${band}"/></svg>\n`);
console.log('wrote brand/siger.inline.txt');
