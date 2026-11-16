// Copies the shipped parts of the design system into a project's vendor folder, so a project
// that vendors it (rather than installing the package) stays on a known version.
//   node scripts/sync.mjs ../my-app/vendor/lds
// Layout in the target mirrors this repo: css/, js/, fonts/, icons/, react/, plus VERSION.
// Files that exist only in the target are left alone; nothing in the target is edited by hand.
import { cpSync, mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dest = process.argv[2];
if (!dest) {
  console.error('Usage: node scripts/sync.mjs <target folder>');
  process.exit(1);
}
const out = resolve(dest);
const files = [
  'css/tokens.css',
  'css/components.css',
  'js/lds.js',
  'js/lds.d.ts',
  'icons/icons.json',
  'react/index.tsx',
  ...readdirSync(join(root, 'fonts')).filter((f) => f.endsWith('.woff2')).map((f) => `fonts/${f}`),
];
for (const f of files) {
  mkdirSync(dirname(join(out, f)), { recursive: true });
  cpSync(join(root, f), join(out, f));
}
const { version } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
writeFileSync(join(out, 'VERSION'), `${version}\n`);
console.log(`Synced ${files.length} files (v${version}) to ${out}`);
if (existsSync(join(out, 'icons.json'))) console.log('Note: icons.json now lives at icons/icons.json; remove the old root copy and update references.');
