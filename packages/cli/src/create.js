import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { delimiter, join, resolve } from 'node:path';
import { TEMPLATES, detectPm } from './detect.js';
import { init, UserError, PMS } from './init.js';
import { run, commandString, c, isFile } from './util.js';

function which(bin, env = process.env) {
  const exts = process.platform === 'win32' ? ['.cmd', '.exe', '.bat', ''] : [''];
  for (const dir of String(env.PATH || '').split(delimiter)) for (const e of exts) if (dir && isFile(join(dir, bin + e))) return true;
  return false;
}

/** `<pm> create <pkg> <name> [args]`, with npm's `--` separator and yarn's unversioned names. */
function pmCreate(pm, pkg, name, args) {
  if (pm === 'npm') return ['npm', ['create', pkg, name, ...(args.length ? ['--', ...args] : [])]];
  if (pm === 'yarn') return ['yarn', ['create', pkg.replace(/@latest$/, ''), name, ...args]];
  return [pm, ['create', pkg, name, ...args]];
}

const snake = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').replace(/^(\d)/, 'app_$1') || 'app';

/** The official creator command for a template, or null for html. */
export function creatorCommand(template, name, pm, env = process.env) {
  switch (template) {
    case 'next':
      return pmCreate(pm, 'next-app@latest', name, ['--yes', `--use-${pm}`]);
    case 'vite':
      return pmCreate(pm, 'vite@latest', name, ['--template', 'react-ts']);
    case 'react-router':
      return pmCreate(pm, 'react-router@latest', name, ['--yes']);
    case 'start':
      return pmCreate(pm, '@tanstack/start@latest', name, []);
    case 'astro':
      return pmCreate(pm, 'astro@latest', name, ['--template', 'basics', '--yes']);
    case 'laravel':
      return which('laravel', env) ? ['laravel', ['new', name, '--no-interaction']] : ['composer', ['create-project', 'laravel/laravel', name]];
    case 'flutter':
      return ['flutter', ['create', '--project-name', snake(name.split(/[\\/]/).pop()), name]];
    default:
      return null;
  }
}

export async function create(name, opts, io) {
  const { t } = io;
  if (!name || !opts.template) throw new UserError(t('createUsage'));
  if (!TEMPLATES.includes(opts.template)) throw new UserError(t('unknownTemplate', { name: opts.template, list: TEMPLATES.join(', ') }));
  if (opts.pm && !PMS.includes(opts.pm)) throw new UserError(t('unknownPm', { name: opts.pm }));
  const parent = resolve(opts.cwd || '.');
  const dir = resolve(parent, name);
  if (existsSync(dir) && readdirSync(dir).length) throw new UserError(t('createExists', { dir }));
  const pm = opts.pm || detectPm(parent, io.env);
  const cmd = creatorCommand(opts.template, name, pm, io.env);
  const initLine = `lampung-ds init -t ${opts.template} --cwd ${name} -y${opts.theme ? ` --theme ${opts.theme}` : ''} --pm ${pm}${opts.install === false ? ' --no-install' : ''}${opts.shadcn ? ' --shadcn' : ''}`;
  if (opts.dryRun) {
    io.log(t('createDry'));
    if (cmd) io.log(`  ${c.cyan('$')} ${commandString(...cmd)}`);
    else io.log(`  ${c.cyan('$')} mkdir ${name}`);
    io.log(`  ${c.cyan('$')} ${initLine}`);
    return { commands: [cmd, initLine] };
  }
  if (cmd) {
    io.log(t('createRunning', { name, cmd: commandString(...cmd) }));
    const r = run(cmd[0], cmd[1], { cwd: parent });
    if (r.status !== 0 || !existsSync(dir)) throw new UserError(t('createFailed'));
  } else mkdirSync(dir, { recursive: true });
  await init({ ...opts, cwd: dir, yes: true, pm }, io);
  io.log(c.green(t('createDone', { name })));
  return { dir };
}
