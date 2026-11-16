// Aksara Lampung (had Lampung) for Lampung Design System.
// Turns Latin text into a row of syllable cells and draws them as one inline SVG, stroked with
// currentColor. The glyphs are original monoline drawings (aksara/glyphs.json); this module is a
// display helper for names, headings and ornament, not a full orthography engine.
import { GLYPHS } from './aksara-glyphs.js';

const ADVANCE = 78; // horizontal step between letters; glyphs lean, so cells overlap a little
const AFTER = 24; // width of a trailing sign cell (ai, ah, nengen)
const TOP = -16;
const HEIGHT = 128;

// Onsets, longest first. Letters outside the script map to the nearest one.
const CONSONANTS = [['ny', 'nya'], ['ng', 'nga'], ['gh', 'gha'], ['kh', 'ka'], ['sy', 'sa'], ['k', 'ka'], ['g', 'ga'], ['p', 'pa'], ['b', 'ba'], ['m', 'ma'], ['t', 'ta'], ['d', 'da'], ['n', 'na'], ['c', 'ca'], ['j', 'ja'], ['y', 'ya'], ['l', 'la'], ['r', 'ra'], ['s', 'sa'], ['w', 'wa'], ['h', 'ha'], ['f', 'pa'], ['v', 'pa'], ['z', 'ja'], ['q', 'ka'], ['x', 'sa']];
const VOWELS = { a: null, i: 'i', u: 'u', e: 'e', 'é': 'é', 'è': 'é', o: 'o' };
const CODA_SIGN = { n: 'an', ng: 'ang', r: 'ar', h: 'ah' };

const isVowel = (ch) => ch in VOWELS;
const onsetAt = (w, i) => CONSONANTS.find(([latin]) => w.startsWith(latin, i));

/**
 * Splits Latin text into aksara cells.
 * Each cell: { letter, above: [], below: [], after: [] } or { space: true }.
 * @param {string} text
 * @returns {Array<{letter?: string, above?: string[], below?: string[], after?: string[], space?: boolean}>}
 */
export function toAksara(text) {
  const out = [];
  const words = String(text).toLowerCase().normalize('NFC').split(/[^a-zéè]+/).filter(Boolean);
  words.forEach((w, wi) => {
    if (wi) out.push({ space: true });
    let i = 0;
    while (i < w.length) {
      const cell = { letter: 'a', above: [], below: [], after: [] };
      const on = onsetAt(w, i);
      if (on) { cell.letter = on[1]; i += on[0].length; }
      // A consonant with no vowel after it is a dead consonant: letter plus nengen.
      if (on && !isVowel(w[i] ?? '')) { cell.after.push('nengen'); out.push(cell); continue; }
      const v = w[i] ?? 'a';
      if (isVowel(v)) i += 1;
      const sign = VOWELS[v];
      // Diphthongs at the end of a syllable: ai, au.
      const next = w[i];
      const afterNext = w[i + 1];
      if (v === 'a' && (next === 'i' || next === 'u') && (afterNext === undefined || !isVowel(afterNext))) {
        if (next === 'i') cell.after.push('ai'); else cell.below.push('au');
        i += 1;
        out.push(cell);
        continue;
      }
      if (sign === 'u' || sign === 'o') cell.below.push(sign);
      else if (sign) cell.above.push(sign);
      // Coda: n, ng, r, h close the syllable with a sign when no vowel follows them.
      for (const coda of ['ng', 'n', 'r', 'h']) {
        if (w.startsWith(coda, i) && !isVowel(w[i + coda.length] ?? '') && !(coda === 'n' && w[i + 1] === 'y')) {
          const s = CODA_SIGN[coda];
          if (s === 'ah') cell.after.push(s); else cell.above.push(s);
          i += coda.length;
          break;
        }
      }
      out.push(cell);
    }
  });
  return out;
}

const paths = (list, dx = 0) => list.map((d) => `<path d="${d}"${dx ? ` transform="translate(${dx} 0)"` : ''}/>`).join('');

/**
 * Draws Latin text as aksara Lampung in one SVG string.
 * @param {string} text
 * @param {{ title?: string, stroke?: number, pad?: number }} [opts]  pad adds empty space after the text
 * @returns {string}
 */
export function aksaraSvg(text, opts = {}) {
  const cells = toAksara(text);
  let x = 0;
  const parts = [];
  for (const c of cells) {
    if (c.space) { x += ADVANCE * 0.5; continue; }
    const g = [paths(GLYPHS.letters[c.letter] || [])];
    for (const m of c.above) g.push(paths(GLYPHS.marks.above[m] || []));
    for (const m of c.below) g.push(paths(GLYPHS.marks.below[m] || []));
    let w = ADVANCE;
    for (const m of c.after) { g.push(paths(GLYPHS.marks.after[m] || [], w + 4)); w += AFTER; }
    parts.push(`<g transform="translate(${x} 0)">${g.join('')}</g>`);
    x += w;
  }
  const width = Math.max(x + 22 + (opts.pad ?? 0), 1);
  const label = opts.title ?? text;
  return `<svg class="aksara__svg" viewBox="0 ${TOP} ${width} ${HEIGHT}" fill="none" stroke="currentColor" stroke-width="${opts.stroke ?? GLYPHS.stroke}" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${String(label).replace(/"/g, '&quot;')}" focusable="false">${parts.join('')}</svg>`;
}

/** The motto on the provincial emblem, used by the decorative band by default. */
export const BAND_TEXT = 'sai bumi ruwa jurai';

/**
 * Fills every `[data-lds-aksara]` (text from the attribute, or the element's text) and every
 * `.aksara-band` (decorative, repeated through a CSS mask) inside root. Safe to call again.
 * @param {ParentNode} [root]
 */
export function renderAksara(root = document) {
  root.querySelectorAll('[data-lds-aksara]').forEach((el) => {
    const text = el.getAttribute('data-lds-aksara') || el.textContent.trim();
    if (el.dataset.ldsAksaraDone === text) return;
    const label = el.getAttribute('aria-label') || text;
    el.innerHTML = aksaraSvg(text, { title: label });
    if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-hidden')) el.setAttribute('aria-label', label);
    el.setAttribute('role', el.getAttribute('role') || 'img');
    el.querySelector('svg')?.setAttribute('aria-hidden', 'true');
    el.dataset.ldsAksaraDone = text;
  });
  root.querySelectorAll('.aksara-band').forEach((el) => {
    if (el.style.getPropertyValue('--aksara-band')) return;
    const svg = aksaraSvg(el.getAttribute('data-lds-aksara-band') || BAND_TEXT, { title: '', pad: 64 })
      .replace(/stroke="currentColor"/, 'stroke="black"');
    el.style.setProperty('--aksara-band', `url("data:image/svg+xml;utf8,${encodeURIComponent(svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '))}")`);
    el.setAttribute('aria-hidden', 'true');
  });
}
