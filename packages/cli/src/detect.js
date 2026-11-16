import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { readJson, readText, allDeps, firstExisting } from './util.js';

export const TEMPLATES = ['next', 'vite', 'start', 'react-router', 'astro', 'laravel', 'html', 'flutter'];
export const LABELS = {
  next: 'Next.js',
  vite: 'Vite (React)',
  start: 'TanStack Start',
  'react-router': 'React Router',
  astro: 'Astro',
  laravel: 'Laravel',
  html: 'HTML',
  flutter: 'Flutter',
};
export const REACT = new Set(['next', 'vite', 'start', 'react-router']);

const configFile = (cwd, base) => firstExisting(cwd, ['ts', 'mts', 'js', 'mjs', 'cjs'].map((e) => `${base}.${e}`));

/** Detects the framework from project files. Returns a template id or null. */
export function detectFramework(cwd) {
  if (existsSync(join(cwd, 'pubspec.yaml'))) return 'flutter';
  const composer = readJson(join(cwd, 'composer.json'));
  if (composer && allDeps({ dependencies: composer.require, devDependencies: composer['require-dev'] })['laravel/framework']) return 'laravel';
  if (existsSync(join(cwd, 'artisan')) && composer) return 'laravel';
  const pkg = readJson(join(cwd, 'package.json'));
  const deps = allDeps(pkg);
  if (deps.next || configFile(cwd, 'next.config')) return 'next';
  if (deps['@tanstack/react-start'] || deps['@tanstack/start']) return 'start';
  if (deps['@react-router/dev'] || configFile(cwd, 'react-router.config')) return 'react-router';
  if (deps.astro || configFile(cwd, 'astro.config')) return 'astro';
  if (deps.vite || configFile(cwd, 'vite.config')) return 'vite';
  if (!pkg) {
    try {
      if (readdirSync(cwd).some((f) => f.endsWith('.html'))) return 'html';
    } catch {
      /* unreadable directory */
    }
  }
  return null;
}

export function detectTypescript(cwd, framework) {
  if (framework === 'flutter' || framework === 'html') return false;
  if (framework === 'laravel') return existsSync(join(cwd, 'resources/js/app.ts'));
  return existsSync(join(cwd, 'tsconfig.json')) || Boolean(allDeps(readJson(join(cwd, 'package.json'))).typescript);
}

const LOCKS = [
  ['pnpm-lock.yaml', 'pnpm'],
  ['bun.lockb', 'bun'],
  ['bun.lock', 'bun'],
  ['yarn.lock', 'yarn'],
  ['package-lock.json', 'npm'],
];

/** Package manager from the nearest lockfile, then the packageManager field, then the user agent. */
export function detectPm(cwd, env = process.env) {
  let dir = resolve(cwd);
  for (;;) {
    for (const [f, pm] of LOCKS) if (existsSync(join(dir, f))) return pm;
    const pkg = readJson(join(dir, 'package.json'));
    if (pkg?.packageManager) {
      const name = String(pkg.packageManager).split('@')[0];
      if (['npm', 'pnpm', 'yarn', 'bun'].includes(name)) return name;
    }
    const up = dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  const ua = env.npm_config_user_agent || '';
  for (const pm of ['pnpm', 'yarn', 'bun']) if (ua.startsWith(pm)) return pm;
  return 'npm';
}

export function installArgs(pm, pkgs) {
  if (pm === 'npm') return ['npm', ['install', ...pkgs]];
  return [pm, ['add', ...pkgs]];
}

/** True when the Next.js project uses the app router. */
export function nextRouter(cwd) {
  if (firstExisting(cwd, ['app', 'src/app'])) return 'app';
  if (firstExisting(cwd, ['pages', 'src/pages'])) return 'pages';
  return 'app';
}

export const hasText = (cwd, p, needle) => (readText(join(cwd, p)) || '').includes(needle);
