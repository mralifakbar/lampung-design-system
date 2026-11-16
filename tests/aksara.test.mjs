import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toAksara, aksaraSvg } from '../js/aksara.js';
import { GLYPHS } from '../js/aksara-glyphs.js';
import { read } from './helpers.mjs';

const short = (text) => toAksara(text).map((c) => (c.space ? '_' : [c.letter, ...c.above.map((m) => `^${m}`), ...c.below.map((m) => `v${m}`), ...c.after.map((m) => `>${m}`)].join('')));

test('the twenty base letters exist', () => {
  const letters = ['a', 'ka', 'ga', 'nga', 'pa', 'ba', 'ma', 'ta', 'da', 'na', 'ca', 'ja', 'nya', 'ya', 'la', 'ra', 'sa', 'wa', 'ha', 'gha'];
  assert.deepEqual(Object.keys(GLYPHS.letters).sort(), letters.sort());
});

test('glyph module is generated from glyphs.json', () => {
  const src = JSON.parse(read('aksara/glyphs.json'));
  assert.deepEqual(GLYPHS.letters, src.letters);
});

test('transliterates names with signs above, below and after', () => {
  assert.deepEqual(short('Lampung'), ['la', 'ma>nengen', 'pa^angvu']);
  assert.deepEqual(short('sai bumi ruwa jurai'), ['sa>ai', '_', 'bavu', 'ma^i', '_', 'ravu', 'wa', '_', 'javu', 'ra>ai']);
  assert.deepEqual(short('Bandar'), ['ba^an', 'da^ar']);
  assert.deepEqual(short('siger'), ['sa^i', 'ga^e^ar']);
  assert.deepEqual(short('ina'), ['a^i', 'na']);
  assert.deepEqual(short('tanah'), ['ta', 'na>ah']);
  assert.deepEqual(short('kerbau'), ['ka^e^ar', 'bavau']);
  assert.deepEqual(short('nyanyi'), ['nya', 'nya^i']);
});

test('the svg carries a label and uses currentColor', () => {
  const svg = aksaraSvg('Lampung');
  assert.match(svg, /^<svg /);
  assert.match(svg, /aria-label="Lampung"/);
  assert.match(svg, /stroke="currentColor"/);
  assert.ok((svg.match(/<path /g) || []).length >= 5);
});

test('labels are escaped', () => {
  assert.match(aksaraSvg('a', { title: 'a "b"' }), /aria-label="a &quot;b&quot;"/);
});
