// Draws the LDS mark: the siger (the Lampung crown). Seven flame-shaped lekuk rise from a broad,
// arched base, the tallest in the middle; each lekuk curls toward the center around a round
// hollow, and the base ends in two round lobes. Writes brand/*.svg and the favicon used by the
// site and docs.
//   brand/siger.svg          the crown alone, filled with currentColor (for UI and print)
//   brand/mark.svg           green tile, white crown (logo, favicon, app icon)
//   brand/mark-mono.svg      one-color tile for single-ink use
//   apps/landing/favicon.svg same as mark.svg
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const r = (n) => Math.round(n * 100) / 100;

// Right half of the outline on a drawing grid (center x = 588), from the top tip down to the
// middle of the base. Each row is one cubic segment: two control points, then the end point.
const CX = 588;
const CY = 454;
const START = [588, 268];
const HALF = [
  [602, 283, 620, 300, 618, 322], // center lekuk, shoulder
  [616, 338, 606, 348, 610, 362], // neck
  [614, 385, 640, 396, 660, 385], // hollow
  [678, 372, 682, 345, 676, 323], // tip of the second lekuk, curling in
  [700, 345, 720, 368, 716, 395],
  [712, 418, 668, 440, 665, 465],
  [662, 490, 700, 500, 725, 492],
  [752, 482, 768, 455, 762, 425], // third tip
  [780, 438, 792, 455, 790, 475],
  [788, 495, 778, 505, 782, 518],
  [786, 532, 806, 536, 818, 525],
  [832, 510, 836, 480, 832, 453], // fourth tip
  [850, 468, 866, 488, 864, 515],
  [862, 540, 852, 552, 858, 572],
  [865, 595, 900, 605, 920, 590],
  [940, 572, 948, 530, 942, 498], // outer tip
  [980, 512, 1008, 550, 1008, 598], // round end lobe
  [1008, 655, 960, 697, 905, 697],
  [850, 697, 780, 665, 720, 652], // arched base
  [680, 644, 630, 640, 588, 640],
];

/** Crown outline on a 64 x 64 grid, centered on (32, 32): the right half as drawn, then its
    mirror image traced back to the tip. */
export function sigerPath({ scale = 0.066 } = {}) {
  const X = (x) => r(32 + (x - CX) * scale);
  const Y = (y) => r(32 + (y - CY) * scale);
  const m = (x) => 2 * CX - x;
  let d = `M${X(START[0])} ${Y(START[1])}`;
  for (const s of HALF) d += `C${X(s[0])} ${Y(s[1])} ${X(s[2])} ${Y(s[3])} ${X(s[4])} ${Y(s[5])}`;
  const ends = [START, ...HALF.map((s) => [s[4], s[5]])];
  for (let i = HALF.length - 1; i >= 0; i--) {
    const s = HALF[i];
    d += `C${X(m(s[2]))} ${Y(s[3])} ${X(m(s[0]))} ${Y(s[1])} ${X(m(ends[i][0]))} ${Y(ends[i][1])}`;
  }
  return { d: `${d}Z` };
}

const body = sigerPath().d;
const view = '3 18.5 58 31';
const place = 'translate(32 32) scale(0.92) translate(-32 -33.85)';
const files = {
  'brand/siger.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view}" fill="currentColor"><title>Siger</title><path d="${body}"/></svg>\n`,
  'brand/mark.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>Lampung Design System</title><rect width="64" height="64" rx="15" fill="#0B6E4F"/><path transform="${place}" d="${body}" fill="#FFFFFF"/></svg>\n`,
  'brand/mark-mono.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor"><title>Lampung Design System</title><path d="M15 0h34a15 15 0 0 1 15 15v34a15 15 0 0 1-15 15H15A15 15 0 0 1 0 49V15A15 15 0 0 1 15 0Z"/><path transform="${place}" d="${body}" fill="#FFFFFF"/></svg>\n`,
};
files['apps/landing/favicon.svg'] = files['brand/mark.svg'];
for (const [p, s] of Object.entries(files)) {
  mkdirSync(dirname(join(root, p)), { recursive: true });
  writeFileSync(join(root, p), s);
  console.log(`wrote ${p}`);
}
// The inline form used by the docs shell and pages: the crown in currentColor, sized by CSS.
writeFileSync(join(root, 'brand/siger.inline.txt'), `<svg class="siger" viewBox="${view}" aria-hidden="true" focusable="false"><path d="${body}"/></svg>\n`);
console.log('wrote brand/siger.inline.txt');
