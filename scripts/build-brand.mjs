// Draws the LDS mark: a siger (the Lampung crown) as built in the Menara Siger, seven fin-like
// lekuk with round valleys, the tallest in the middle, standing on a curved gold band. Writes brand/*.svg and the favicon used by the site and docs.
//   brand/siger.svg          the crown alone, filled with currentColor (for UI and print)
//   brand/mark.svg           green tile, white crown, gold band (logo, favicon, app icon)
//   brand/mark-mono.svg      one-color tile for single-ink use
//   apps/landing/favicon.svg same as mark.svg
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const r = (n) => Math.round(n * 100) / 100;

/** Crown outline on a 64 x 64 grid, measured from the siger as built in the Menara Siger:
    very wide and low, seven lekuk with sharp, fin-like points. Each point leans away from the
    centre: its outer side is steep, its inner side sweeps down gently into a round valley. The
    middle point is tallest and slender, the outermost points flare sideways, and the body below
    the valleys is short. Coordinates are in the 64 unit box, crown between y 4 and 31. */
export function sigerPath() {
  // [x, y] of the points from left to right, and the low point of each valley between them.
  const tips = [[0.6, 16.6], [12.8, 14.2], [22.2, 11.2], [32, 3.2], [41.8, 11.2], [51.2, 14.2], [63.4, 16.6]];
  const valleys = [[8.6, 24.4], [18.4, 23.2], [26.8, 20.6], [37.2, 20.6], [45.6, 23.2], [55.4, 24.4]];
  let d = `M${r(6)} ${r(32)} C${r(5.4)} ${r(27)} ${r(3)} ${r(21.5)} ${r(tips[0][0])} ${r(tips[0][1])}`;
  for (let i = 0; i < valleys.length; i++) {
    const [ax, ay] = tips[i];
    const [bx, by] = tips[i + 1];
    const vy = valleys[i][1];
    const gap = bx - ax;
    // A round cup between two points. Controls sit almost under the points, so the sides leave
    // each point nearly upright (sharp, fin-like) and the bottom is a wide curve. The cup leans a
    // little toward the centre, which tilts the points outward.
    const k = (vy - (ay + by) / 2) / 0.75;
    const tilt = (ax + bx) / 2 < 32 ? 1 : -1;
    d += ` C${r(ax + gap * (0.16 + 0.09 * tilt))} ${r(ay + k)} ${r(bx - gap * (0.16 - 0.09 * tilt))} ${r(by + k)} ${r(bx)} ${r(by)}`;
  }
  d += ` C${r(61)} ${r(21.5)} ${r(58.6)} ${r(27)} ${r(58)} ${r(32)}`;
  d += ` Q32 ${r(35)} ${r(6)} ${r(32)}Z`;
  return { d };
}

/** The gold band under the crown, following the same curve. */
export function bandPath() {
  return `M${r(9)} ${r(35)} Q32 ${r(38)} ${r(55)} ${r(35)} L${r(55)} ${r(39)} Q32 ${r(42)} ${r(9)} ${r(39)}Z`;
}

const crown = sigerPath();
const band = bandPath();
const body = crown.d;
const files = {
  'brand/siger.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 2 64 41" fill="currentColor"><title>Siger</title><path d="${body}"/><path d="${band}"/></svg>\n`,
  'brand/mark.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>Lampung Design System</title><rect width="64" height="64" rx="15" fill="#0B6E4F"/><g transform="translate(32 32) scale(0.86) translate(-32 -21.5)"><path d="${body}" fill="#FFFFFF"/><path d="${band}" fill="#C9952B"/></g></svg>\n`,
  'brand/mark-mono.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor"><title>Lampung Design System</title><path d="M15 0h34a15 15 0 0 1 15 15v34a15 15 0 0 1-15 15H15A15 15 0 0 1 0 49V15A15 15 0 0 1 15 0Z"/><g transform="translate(32 32) scale(0.86) translate(-32 -21.5)" fill="#FFFFFF"><path d="${body}"/><path d="${band}"/></g></svg>\n`,
};
files['apps/landing/favicon.svg'] = files['brand/mark.svg'];
for (const [p, s] of Object.entries(files)) {
  mkdirSync(dirname(join(root, p)), { recursive: true });
  writeFileSync(join(root, p), s);
  console.log(`wrote ${p}`);
}
// The inline form used by the docs shell and pages: the crown and band in currentColor, sized by CSS.
writeFileSync(join(root, 'brand/siger.inline.txt'), `<svg class="siger" viewBox="0 2 64 41" aria-hidden="true" focusable="false"><path d="${body}"/><path class="siger__band" d="${band}"/></svg>\n`);
console.log('wrote brand/siger.inline.txt');
