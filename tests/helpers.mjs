// Shared helpers for the test suites.
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const read = (p) => readFileSync(join(root, p), 'utf8');
export const tokens = () => JSON.parse(read('tokens/tokens.json'));

const channel = (c) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const rgb = (hex) => { const h = hex.replace('#', ''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
export const luminance = (hex) => { const [r, g, b] = rgb(hex).map(channel); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
/** WCAG 2.x contrast ratio between two opaque hex colors. */
export const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
/** Composite an rgba() color over an opaque hex background. */
export const over = (color, bg) => {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return color;
  const [r, g, b, a = 1] = m[1].split(',').map((s) => parseFloat(s));
  const [br, bgc, bb] = rgb(bg);
  const mix = (f, base) => Math.round(f * a + base * (1 - a));
  return `#${[mix(r, br), mix(g, bgc), mix(b, bb)].map((n) => n.toString(16).padStart(2, '0')).join('')}`;
};
