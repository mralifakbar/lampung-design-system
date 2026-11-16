import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve, relative, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const CORE = 'lampung-design-system';
export const SITE = 'https://lampung.kartadinata.app';
export const REMOTE_REGISTRY = `${SITE}/r`;
export const CDN = 'https://cdn.jsdelivr.net/npm';

const here = dirname(fileURLToPath(import.meta.url));
export const CLI_PKG = JSON.parse(readFileSync(join(here, '..', 'package.json'), 'utf8'));
export const VERSION = CLI_PKG.version;

export function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

export function readText(file) {
  try {
    return readFileSync(file, 'utf8');
  } catch {
    return null;
  }
}

export const isFile = (p) => {
  try {
    return statSync(p).isFile();
  } catch {
    return false;
  }
};

export const isDir = (p) => {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
};

/** First of the relative paths that exists under cwd, or null. */
export function firstExisting(cwd, list) {
  for (const p of list) if (existsSync(join(cwd, p))) return p;
  return null;
}

/** POSIX-style relative path, for printing and for import specifiers. */
export const rel = (from, to) => relative(from, to).split(sep).join('/');

/** Relative module specifier from a file to another file, without the extension. */
export function importPath(fromFile, toFile) {
  let p = rel(dirname(fromFile), toFile).replace(/\.(tsx|jsx|ts|js)$/, '');
  if (!p.startsWith('.')) p = `./${p}`;
  return p;
}

/** The installed core package directory, looked up from cwd upwards (LDS_PACKAGE_DIR overrides). */
export function findPackageDir(cwd, env = process.env) {
  if (env.LDS_PACKAGE_DIR && isFile(join(env.LDS_PACKAGE_DIR, 'package.json'))) return resolve(env.LDS_PACKAGE_DIR);
  let dir = resolve(cwd);
  for (;;) {
    const c = join(dir, 'node_modules', CORE);
    if (isFile(join(c, 'package.json'))) return c;
    const up = dirname(dir);
    if (up === dir) return null;
    dir = up;
  }
}

export function allDeps(pkg) {
  return { ...(pkg?.dependencies || {}), ...(pkg?.devDependencies || {}), ...(pkg?.peerDependencies || {}) };
}

const useColor = () => process.stdout.isTTY && !process.env.NO_COLOR && process.env.TERM !== 'dumb';
const paint = (code) => (s) => (useColor() ? `\x1b[${code}m${s}\x1b[0m` : String(s));
export const c = { bold: paint(1), dim: paint(2), green: paint(32), yellow: paint(33), red: paint(31), cyan: paint(36) };

/** Runs a command with inherited stdio. Returns the exit status. */
export function run(cmd, args, { cwd, stdio = 'inherit' } = {}) {
  const r = spawnSync(cmd, args, { cwd, stdio, shell: process.platform === 'win32' });
  if (r.error) return { status: 127, error: r.error };
  return { status: r.status ?? 1 };
}

export const commandString = (cmd, args) => [cmd, ...args].map((a) => (/[\s"'$]/.test(a) ? JSON.stringify(a) : a)).join(' ');

export const pascal = (s) =>
  String(s)
    .normalize('NFKD')
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('');

export const kebab = (s) =>
  String(s)
    .normalize('NFKD')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
