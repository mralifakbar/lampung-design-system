// Compiles the React bindings so every bundler can import them without extra config:
//   react/index.tsx  (source)  ->  react/index.js (ESM, keeps 'use client') + react/index.d.ts
// Next.js, Vite, React Router and Astro then use lampung-design-system/react as is; no
// transpilePackages entry is needed.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'react/index.tsx');
const header = '// Generated from react/index.tsx by scripts/build-react.mjs. Edit the source, then run npm run build:react.\n';

const { code } = transformSync(readFileSync(src, 'utf8'), { loader: 'tsx', jsx: 'automatic', format: 'esm', target: 'es2020', sourcefile: 'index.tsx' });
// Keep the directive first: React server bundlers only honor 'use client' at the very top.
const body = code.replace(/^(["'])use client\1;?\n/, '');
writeFileSync(join(root, 'react/index.js'), `'use client';\n${header}${body}`);
console.log('wrote react/index.js');

const tsc = join(root, 'node_modules/typescript/bin/tsc');
execFileSync(process.execPath, [tsc, src, '--declaration', '--emitDeclarationOnly', '--jsx', 'react-jsx', '--module', 'esnext', '--moduleResolution', 'bundler', '--target', 'es2020', '--skipLibCheck', '--strict', '--outDir', join(root, 'react')], { stdio: 'inherit' });
const dts = join(root, 'react/index.d.ts');
writeFileSync(dts, header + readFileSync(dts, 'utf8'));
console.log('wrote react/index.d.ts');
