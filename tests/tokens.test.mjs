import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contrast, over, read, tokens } from './helpers.mjs';

const t = tokens();

test('light and dark define the same color tokens', () => {
  assert.deepEqual(Object.keys(t.color.light).sort(), Object.keys(t.color.dark).sort());
  assert.deepEqual(Object.keys(t.shadow.light).sort(), Object.keys(t.shadow.dark).sort());
});

test('identity colors are Lampung green and siger gold', () => {
  assert.equal(t.color.light.accent, '#0B6E4F');
  assert.equal(t.color.light.gold, '#C9952B');
  assert.match(t.font.sans, /^"Geist"/);
  assert.match(t.font.mono, /^"Geist Mono"/);
});

// [foreground, background, minimum ratio]
const PAIRS = [
  ['text-strong', 'bg-canvas', 4.5], ['text-default', 'bg-canvas', 4.5], ['text-subtle', 'bg-canvas', 4.5], ['text-muted', 'bg-canvas', 4.5],
  ['text-strong', 'bg-fill', 4.5], ['text-subtle', 'bg-fill', 4.5], ['text-muted', 'bg-fill', 4.5],
  ['accent-text', 'bg-canvas', 4.5], ['accent-text', 'bg-fill', 4.5], ['accent-text', 'accent-tint', 4.5],
  ['text-on-accent', 'accent', 4.5], ['text-on-accent', 'accent-hover', 4.5], ['text-on-accent', 'accent-pressed', 4.5],
  ['gold-text', 'bg-canvas', 4.5], ['gold-text', 'gold-tint', 4.5], ['on-gold', 'gold', 4.5],
  ['success-text', 'success-tint', 4.5], ['warning-text', 'warning-tint', 4.5], ['danger-text', 'danger-tint', 4.5], ['neutral-text', 'neutral-tint', 4.5],
  ['text-inverse', 'bg-inverse', 4.5],
  ['line-control', 'bg-canvas', 3], ['focus', 'bg-canvas', 3],
];

for (const theme of ['light', 'dark']) {
  const c = t.color[theme];
  for (const [fg, bg, min] of PAIRS) {
    test(`${theme}: ${fg} on ${bg} is at least ${min}:1`, () => {
      const back = over(c[bg], c['bg-canvas']);
      const ratio = contrast(over(c[fg], back), back);
      assert.ok(ratio >= min, `${fg} ${c[fg]} on ${bg} ${c[bg]} is ${ratio.toFixed(2)}:1`);
    });
  }
}

test('generated CSS matches tokens.json', () => {
  const css = read('css/tokens.css');
  for (const [k, v] of Object.entries(t.color.light)) assert.ok(css.includes(`--${k}: ${v};`), `css/tokens.css is stale for --${k}; run npm run build:tokens`);
  for (const [k, v] of Object.entries(t.color.dark)) assert.ok(css.includes(`--${k}: ${v};`), `css/tokens.css is stale for dark --${k}`);
});

test('generated JS and Dart tokens carry the accent', () => {
  assert.ok(read('dist/tokens.mjs').includes('#0B6E4F'));
  assert.match(read('dist/flutter/lds_tokens.dart'), /0xFF0B6E4F/i);
});

test('accent presets cover the same roles in both themes', () => {
  for (const [name, a] of Object.entries(t.accents).filter(([k]) => !k.startsWith('$'))) {
    assert.deepEqual(Object.keys(a.light).sort(), Object.keys(a.dark).sort(), name);
    for (const k of Object.keys(a.light)) assert.ok(k in t.color.light, `${name}: ${k} is not a color token`);
    assert.ok(read('css/tokens.css').includes(`[data-accent="${name}"]`), `${name} missing from css/tokens.css`);
  }
});

const ACCENT_PAIRS = [['text-on-accent', 'accent'], ['text-on-accent', 'accent-hover'], ['text-on-accent', 'accent-pressed'], ['accent-text', 'bg-canvas'], ['accent-text', 'bg-fill'], ['accent-text', 'accent-tint']];
for (const [name, a] of Object.entries(t.accents).filter(([k]) => !k.startsWith('$'))) {
  for (const theme of ['light', 'dark']) {
    test(`${name} ${theme}: accent pairings hold AA`, () => {
      const c = { ...t.color[theme], ...a[theme] };
      for (const [fg, bg] of ACCENT_PAIRS) {
        const back = over(c[bg], c['bg-canvas']);
        const ratio = contrast(over(c[fg], back), back);
        assert.ok(ratio >= 4.5, `${fg} on ${bg}: ${ratio.toFixed(2)}:1`);
      }
      assert.ok(contrast(c.focus, c['bg-canvas']) >= 3, 'focus ring under 3:1');
    });
  }
}
