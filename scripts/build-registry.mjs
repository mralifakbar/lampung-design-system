// Builds the component registry the `lampung-ds add` command reads.
//   docs/spec/*.mjs (+ docs/spec/id/*.mjs) -> dist/registry/index.json and dist/registry/<slug>.json
// Usage: node scripts/build-registry.mjs [--spec <dir>] [--out <dir>]
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const strip = (s) => String(s ?? '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

async function load(file) {
  return (await import(pathToFileURL(file).href + `?t=${Date.now()}`)).default;
}

// Demo markup is written for docs/components/<slug>.html; relative asset paths (../examples/…)
// break once the markup is copied into a project, so they point at the published docs instead.
const DOCS_COMPONENTS = 'https://lampung.kartadinata.app/docs/components/';
const absoluteAssets = (html) =>
  html.replace(/\b(src|href|poster)="(\.\.?\/[^"]+\.(?:jpe?g|png|gif|webp|avif|svg))"/gi, (_, a, p) => `${a}="${new URL(p, DOCS_COMPONENTS).href}"`);

function example(e) {
  return { title: e.title || '', desc: strip(e.desc), html: absoluteAssets(e.html || ''), ...(e.code ? { code: e.code } : {}) };
}

export async function buildRegistry({ specDir = join(root, 'docs/spec'), outDir = join(root, 'dist/registry') } = {}) {
  const idDir = join(specDir, 'id');
  const pkgPath = join(root, 'package.json');
  const version = existsSync(pkgPath) ? JSON.parse(readFileSync(pkgPath, 'utf8')).version : '0.0.0';
  const files = readdirSync(specDir).filter((f) => f.endsWith('.mjs') && !f.startsWith('_')).sort();
  const items = [];
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  for (const f of files) {
    const slug = f.replace(/\.mjs$/, '');
    const en = await load(join(specDir, f));
    const id = existsSync(join(idDir, f)) ? await load(join(idDir, f)) : {};
    const exEn = (en.examples || []).map(example);
    const exId = exEn.map((e, i) => example({ ...(en.examples[i] || {}), ...((id.examples || [])[i] || {}) }));
    const entry = {
      slug,
      title: en.title,
      group: en.group,
      order: en.order ?? 0,
      ...(en.status ? { status: en.status } : {}),
      summary: { en: strip(en.summary), id: strip(id.summary ?? en.summary) },
      titleId: id.title || en.title,
      react: Boolean(en.react),
      examples: exEn.length,
    };
    items.push(entry);
    const item = {
      version,
      ...entry,
      examples: { en: exEn, id: exId },
      ...(en.react ? { reactUsage: en.react } : {}),
      related: en.related || [],
    };
    writeFileSync(join(outDir, `${slug}.json`), JSON.stringify(item, null, 2) + '\n');
  }
  const index = { version, count: items.length, items };
  writeFileSync(join(outDir, 'index.json'), JSON.stringify(index, null, 2) + '\n');
  return index;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({ options: { spec: { type: 'string' }, out: { type: 'string' } } });
  const index = await buildRegistry({
    ...(values.spec ? { specDir: resolve(values.spec) } : {}),
    ...(values.out ? { outDir: resolve(values.out) } : {}),
  });
  console.log(`build-registry: ${index.count} components -> ${values.out || 'dist/registry'}`);
}
