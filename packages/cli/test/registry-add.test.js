import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildRegistry } from '../../../scripts/build-registry.mjs';
import { exampleMarkup } from '../src/html.js';
import { fixture, cli, read, readTree, cleanup, tempDir, writeTree, REPO, REGISTRY } from './helpers.js';

const SPEC = {
  'chip-demo.mjs': `export default {
  title: 'Chip demo', group: 'Selection', order: 2,
  summary: 'A small [toggle](chips) for filters.',
  examples: [
    { title: 'Filters', desc: 'Pick one.', html: '<div class="docs-row"><button class="chip" aria-pressed="true" onclick="this.x()">Open</button></div>', code: '<button class="chip" aria-pressed="true">Open</button>' },
    { title: 'Count', desc: 'With a number.', html: '<span class="count" style="--n: 3">3</span>' },
  ],
  react: "import { Segmented } from 'lampung-design-system/react';",
  related: ['chips'],
};
`,
  'id/chip-demo.mjs': `export default {
  summary: 'Tombol kecil untuk filter.',
  examples: [{ title: 'Filter', desc: 'Pilih satu.', code: '<button class="chip" aria-pressed="true">Dibuka</button>' }],
};
`,
  '_private.mjs': 'export default {};\n',
};

test('build-registry writes index.json and one file per spec, merging Indonesian overrides', async () => {
  const spec = writeTree(tempDir('lds-spec-'), SPEC);
  const out = join(tempDir('lds-reg-'), 'registry');
  const index = await buildRegistry({ specDir: spec, outDir: out });
  assert.deepEqual(readdirSync(out).sort(), ['chip-demo.json', 'index.json']);
  assert.equal(index.count, 1);
  assert.deepEqual(index.items[0], {
    slug: 'chip-demo',
    title: 'Chip demo',
    group: 'Selection',
    order: 2,
    summary: { en: 'A small toggle for filters.', id: 'Tombol kecil untuk filter.' },
    titleId: 'Chip demo',
    react: true,
    examples: 2,
  });
  const item = JSON.parse(readFileSync(join(out, 'chip-demo.json'), 'utf8'));
  assert.equal(item.examples.en[0].code, '<button class="chip" aria-pressed="true">Open</button>');
  assert.equal(item.examples.id[0].title, 'Filter');
  assert.equal(item.examples.id[0].code, '<button class="chip" aria-pressed="true">Dibuka</button>');
  assert.equal(item.examples.id[0].html, item.examples.en[0].html, 'html falls back to English');
  assert.equal(item.examples.id[1].title, 'Count', 'missing overrides fall back to English');
  assert.equal(item.reactUsage, "import { Segmented } from 'lampung-design-system/react';");
  cleanup(spec);
  cleanup(join(out, '..'));
});

test('build-registry over the real specs covers every spec', async () => {
  const out = join(tempDir('lds-reg-'), 'registry');
  const index = await buildRegistry({ outDir: out });
  const specs = readdirSync(join(REPO, 'docs/spec')).filter((f) => f.endsWith('.mjs') && !f.startsWith('_'));
  assert.equal(index.count, specs.length);
  for (const it of index.items) {
    assert.ok(it.slug && it.title && it.group && it.summary.en, it.slug);
    assert.ok(existsSync(join(out, `${it.slug}.json`)));
  }
  const button = JSON.parse(readFileSync(join(out, 'button.json'), 'utf8'));
  assert.ok(button.examples.en.length >= 2);
  assert.notEqual(button.summary.id, button.summary.en);
  cleanup(join(out, '..'));
});

// ---------- add ----------

async function initAndAdd(name, slugs, extraArgs = []) {
  const dir = fixture(name);
  const init = await cli(['init', '--cwd', dir, '--no-install', '-y', ...(name === 'html' ? ['-t', 'html'] : [])]);
  assert.equal(init.code, 0, init.err);
  const r = await cli(['add', '--cwd', dir, ...slugs, ...extraArgs]);
  assert.equal(r.code, 0, r.err);
  return { dir, r };
}

test('add (react): one TSX file per component, one export per example', async () => {
  const { dir, r } = await initAndAdd('vite', ['button', 'text-field']);
  const button = read(dir, 'src/components/lds/button.tsx');
  assert.match(button, /^\/\/ Button: markup from Lampung Design System \(lampung-ds add button\)\./);
  assert.match(button, /\/\/ Button has a React binding in lampung-design-system\/react \(react\/index\.tsx\)\./);
  assert.match(button, /export function ButtonVariants\(\) \{\n {2}return \(\n {4}<div style=\{\{ display: "flex"/);
  assert.match(button, /<button className="btn btn--primary">Save changes<\/button>/);
  assert.match(button, /<i \/><i \/>/);
  assert.match(button, /<button className="btn btn--primary" disabled>Send report<\/button>/);
  assert.doesNotMatch(button.slice(button.indexOf('export function')), /onclick|onClick|class="/);
  const field = read(dir, 'src/components/lds/text-field.tsx');
  assert.match(field, /htmlFor="tf-name"/);
  assert.match(field, /autoComplete="name"/);
  assert.match(r.out, /Button has a React binding/);
  // second add: nothing to do, files untouched
  const snap = readTree(dir);
  const again = await cli(['add', '--cwd', dir, 'button']);
  assert.match(again.out, /Nothing to add/);
  assert.deepEqual(readTree(dir), snap);
  cleanup(dir);
});

test('add respects --overwrite, skips edited files without it, uses lds.json lang', async () => {
  const { dir } = await initAndAdd('next', ['button']);
  const file = join(dir, 'components/lds/button.tsx');
  writeTree(dir, { 'components/lds/button.tsx': '// mine\n' });
  const skip = await cli(['add', '--cwd', dir, 'button']);
  assert.match(skip.out, /skipped components\/lds\/button\.tsx: already exists \(use --overwrite\)/);
  assert.equal(readFileSync(file, 'utf8'), '// mine\n');
  const cfg = JSON.parse(read(dir, 'lds.json'));
  writeTree(dir, { 'lds.json': { ...cfg, lang: 'id' } });
  const over = await cli(['add', '--cwd', dir, 'button', '--overwrite']);
  assert.equal(over.code, 0, over.err);
  assert.match(readFileSync(file, 'utf8'), /Simpan perubahan/);
  cleanup(dir);
});

test('add (astro): one .astro file per example', async () => {
  const { dir } = await initAndAdd('astro', ['button']);
  const files = readdirSync(join(dir, 'src/components/lds/button')).sort();
  assert.ok(files.includes('ButtonVariants.astro'), files.join());
  const v = read(dir, 'src/components/lds/button/ButtonVariants.astro');
  assert.match(v, /^---\n\/\/ Button: Variants\. From Lampung Design System \(lampung-ds add button\)\.\n---\n<div style="display: flex;/);
  assert.match(v, /<button class="btn btn--primary">Save changes<\/button>/);
  cleanup(dir);
});

test('add (laravel): Blade components under resources/views/components/lds', async () => {
  const { dir } = await initAndAdd('laravel', ['button', 'text-field']);
  const v = read(dir, 'resources/views/components/lds/button/variants.blade.php');
  assert.match(v, /^\{\{-- Button: Variants\. From Lampung Design System \(lampung-ds add button\)\. --\}\}\n<div style=/);
  assert.ok(existsSync(join(dir, 'resources/views/components/lds/text-field/in-a-form.blade.php')));
  cleanup(dir);
});

test('add (html): one snippet file in snippetsDir', async () => {
  const { dir } = await initAndAdd('html', ['button']);
  const s = read(dir, 'lds/snippets/button.html');
  assert.match(s, /^<!-- Button: markup from Lampung Design System \(lampung-ds add button\)\. -->/);
  assert.match(s, /<!-- Variants: Primary once per view/);
  assert.match(s, /<button class="btn btn--primary is-loading" aria-busy="true">/);
  cleanup(dir);
});

test('add: unknown component suggests close names and writes nothing', async () => {
  const dir = fixture('vite');
  await cli(['init', '--cwd', dir, '--no-install', '-y']);
  const snap = readTree(dir);
  const r = await cli(['add', '--cwd', dir, 'buton', 'button']);
  assert.equal(r.code, 1);
  assert.match(r.err, /Unknown component "buton"\. Did you mean: button/);
  assert.deepEqual(readTree(dir), snap);
  cleanup(dir);
});

test('add --dry-run and --all', async () => {
  const dir = fixture('vite');
  await cli(['init', '--cwd', dir, '--no-install', '-y']);
  const snap = readTree(dir);
  const r = await cli(['add', '--cwd', dir, '--all', '--dry-run']);
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /Dry run/);
  assert.match(r.out, /\+ src\/components\/lds\/accordion\.tsx/);
  assert.deepEqual(readTree(dir), snap);
  cleanup(dir);
});

test('add works without lds.json and without a registry source fails clearly', async () => {
  const dir = fixture('vite');
  const r = await cli(['add', '--cwd', dir, 'badge']);
  assert.equal(r.code, 0, r.err);
  assert.match(r.err, /No lds\.json here/);
  assert.ok(existsSync(join(dir, 'src/components/lds/badge.tsx')));
  const none = await cli(['add', '--cwd', dir, 'badge'], { env: { LDS_REGISTRY: join(dir, 'missing'), LDS_PACKAGE_DIR: join(dir, 'missing') } });
  assert.equal(none.code, 1);
  assert.match(none.err, /Could not load the component registry/);
  cleanup(dir);
});

test('add for flutter explains there is nothing to copy', async () => {
  const dir = fixture('flutter');
  const r = await cli(['add', '--cwd', dir, 'button']);
  assert.match(r.out, /Flutter uses the LdsTheme widgets/);
  cleanup(dir);
});

test('list prints groups in Indonesian', async () => {
  const r = await cli(['list', '--lang', 'id']);
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /komponen \(lampung-ds add <slug>\):/);
  assert.match(r.out, /\n {2}button +Kontrol yang ditekan/);
});

test('doctor passes after init and fails before', async () => {
  const dir = fixture('vite');
  const before = await cli(['doctor', '--cwd', dir], { env: { LDS_PACKAGE_DIR: join(dir, 'missing') } });
  assert.equal(before.code, 1);
  assert.match(before.out, /fail +lampung-design-system is not in package\.json/);
  assert.match(before.out, /fail +The LDS stylesheet is not imported/);
  writeTree(dir, { 'package.json': { dependencies: { react: '19', 'lampung-design-system': '^0.1.0' }, devDependencies: { vite: '7' } } });
  await cli(['init', '--cwd', dir, '--no-install', '-y']);
  const after = await cli(['doctor', '--cwd', dir]);
  assert.equal(after.code, 0, after.out);
  assert.match(after.out, /ok +Stylesheet imported in src\/index\.css/);
  assert.match(after.out, /ok +class="lds" on <html> in index\.html/);
  assert.match(after.out, /ok +Behaviors wired in src\/main\.tsx/);
  assert.match(after.out, /Everything looks good\./);
  cleanup(dir);
});

test('no example in the registry renders <html>, <head> or <body> as markup', async () => {
  const { readdirSync, readFileSync } = await import('node:fs');
  const bad = [];
  for (const f of readdirSync(REGISTRY).filter((n) => n.endsWith('.json') && n !== 'index.json')) {
    const item = JSON.parse(readFileSync(join(REGISTRY, f), 'utf8'));
    for (const [lang, list] of Object.entries(item.examples || {}))
      for (const ex of list) if (/<!doctype\b|<(?:html|head|body)[\s>]/i.test(exampleMarkup(ex).markup)) bad.push(`${f} ${lang} ${ex.title}`);
  }
  assert.deepEqual(bad, []);
});

test('no example in the registry points at a relative image file', () => {
  const bad = [];
  for (const f of readdirSync(REGISTRY).filter((n) => n.endsWith('.json') && n !== 'index.json')) {
    const item = JSON.parse(readFileSync(join(REGISTRY, f), 'utf8'));
    for (const [lang, list] of Object.entries(item.examples || {}))
      for (const ex of list) {
        const m = exampleMarkup(ex).markup.match(/\b(?:src|href|poster)="(?![a-z][\w+.-]*:|\/\/|#)[^"]*\.(?:jpe?g|png|gif|webp|avif|svg)"/i);
        if (m) bad.push(`${f} ${lang} ${ex.title}: ${m[0]}`);
      }
  }
  assert.deepEqual(bad, []);
});
