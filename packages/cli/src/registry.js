// Component registry: from LDS_REGISTRY (folder or URL), the installed package, or the docs site.
import { join, resolve } from 'node:path';
import { findPackageDir, readJson, isDir, REMOTE_REGISTRY } from './util.js';

function sources(cwd, env) {
  const list = [];
  if (env.LDS_REGISTRY) {
    if (/^https?:\/\//.test(env.LDS_REGISTRY)) list.push({ url: env.LDS_REGISTRY.replace(/\/$/, '') });
    else list.push({ dir: resolve(cwd, env.LDS_REGISTRY) });
  }
  const pkg = findPackageDir(cwd, env);
  if (pkg && isDir(join(pkg, 'dist/registry'))) list.push({ dir: join(pkg, 'dist/registry') });
  if (!env.LDS_OFFLINE) list.push({ url: REMOTE_REGISTRY });
  return list;
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function load(cwd, env, file) {
  const errors = [];
  for (const s of sources(cwd, env)) {
    if (s.dir) {
      const j = readJson(join(s.dir, file));
      if (j) return { data: j, from: s.dir };
      errors.push(`${file} not in ${s.dir}`);
    } else {
      try {
        return { data: await fetchJson(`${s.url}/${file}`), from: s.url };
      } catch (e) {
        errors.push(e.message);
      }
    }
  }
  const err = new Error(errors.join('; ') || 'no registry source');
  err.code = 'REGISTRY';
  throw err;
}

export const loadIndex = (cwd, env = process.env) => load(cwd, env, 'index.json').then((r) => r.data);
export const loadItem = (cwd, slug, env = process.env) => load(cwd, env, `${slug}.json`).then((r) => r.data);

/** Close matches for an unknown slug. */
export function suggest(slug, items) {
  const dist = (a, b) => {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  };
  return items
    .map((i) => i.slug)
    .map((s) => [s, s.includes(slug) || slug.includes(s) ? 0 : dist(slug, s)])
    .filter(([, d]) => d <= Math.max(2, Math.floor(slug.length / 3)))
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([s]) => s);
}
