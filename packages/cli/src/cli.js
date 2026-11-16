import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { detectLang, createT } from './i18n.js';
import { init, UserError } from './init.js';
import { add } from './add.js';
import { create } from './create.js';
import { doctor } from './doctor.js';
import { loadIndex } from './registry.js';
import { VERSION, c } from './util.js';

const OPTIONS = {
  template: { type: 'string', short: 't' },
  cwd: { type: 'string' },
  yes: { type: 'boolean', short: 'y' },
  theme: { type: 'string' },
  pm: { type: 'string' },
  install: { type: 'boolean' },
  'no-install': { type: 'boolean' },
  shadcn: { type: 'boolean' },
  'dry-run': { type: 'boolean' },
  all: { type: 'boolean' },
  overwrite: { type: 'boolean' },
  lang: { type: 'string' },
  registry: { type: 'boolean' },
  help: { type: 'boolean', short: 'h' },
  version: { type: 'boolean', short: 'v' },
};

/** Builds the io object commands print through. Tests pass their own streams and env. */
export function makeIo({ lang, env = process.env, stdout = process.stdout, stderr = process.stderr, stdin = process.stdin } = {}) {
  const l = detectLang(lang, env);
  return {
    lang: l,
    t: createT(l),
    env,
    stdin,
    stdout,
    log: (s = '') => stdout.write(`${s}\n`),
    warn: (s) => stderr.write(`${c.yellow(s)}\n`),
    error: (s) => stderr.write(`${c.red(s)}\n`),
  };
}

const GROUPS = ['Foundations', 'Actions', 'Inputs', 'Selection', 'Navigation', 'Overlays', 'Feedback', 'Data display', 'Content', 'Chat', 'Page patterns', 'Marketing', 'Motion', 'Microinteractions', 'Charts'];

async function list(opts, io) {
  const cwd = resolve(opts.cwd || '.');
  let index;
  try {
    index = await loadIndex(cwd, io.env);
  } catch (e) {
    throw new UserError(io.t('registryFail', { reason: e.message }));
  }
  const lang = io.lang;
  io.log(c.bold(io.t('listHead', { count: index.items.length })));
  const groups = new Map(GROUPS.map((g) => [g, []]));
  for (const it of index.items) {
    if (!groups.has(it.group)) groups.set(it.group, []);
    groups.get(it.group).push(it);
  }
  const width = Math.max(...index.items.map((i) => i.slug.length));
  for (const [group, items] of groups) {
    if (!items.length) continue;
    io.log('');
    io.log(c.bold(group));
    for (const it of items.sort((a, b) => a.order - b.order)) {
      const summary = (it.summary?.[lang] || it.summary?.en || '').split(/(?<=\.)\s/)[0];
      io.log(`  ${it.slug.padEnd(width)}  ${c.dim(summary)}`);
    }
  }
  return index;
}

export async function main(argv = process.argv.slice(2), ioOptions = {}) {
  let parsed;
  const pre = argv.indexOf('--lang');
  const langFlag = pre >= 0 ? argv[pre + 1] : argv.find((a) => a.startsWith('--lang='))?.slice(7);
  const io = makeIo({ lang: langFlag, ...ioOptions });
  try {
    parsed = parseArgs({ args: argv, options: OPTIONS, allowPositionals: true, strict: true });
  } catch (e) {
    io.error(e.message);
    io.log(io.t('help', { version: VERSION }).split('\n').slice(0, 3).join('\n'));
    return 1;
  }
  const { values, positionals } = parsed;
  const [command, ...rest] = positionals;
  if (values.version) {
    io.log(VERSION);
    return 0;
  }
  if (values.help || !command || command === 'help') {
    io.log(io.t('help', { version: VERSION }));
    return 0;
  }
  const opts = {
    cwd: values.cwd,
    template: values.template,
    yes: Boolean(values.yes),
    theme: values.theme,
    pm: values.pm,
    install: values['no-install'] ? false : values.install !== false,
    shadcn: Boolean(values.shadcn),
    dryRun: Boolean(values['dry-run']),
    all: Boolean(values.all),
    overwrite: Boolean(values.overwrite),
    registry: Boolean(values.registry),
  };
  try {
    switch (command) {
      case 'init':
        await init(opts, io);
        return 0;
      case 'create':
        await create(rest[0], opts, io);
        return 0;
      case 'add':
        await add(rest, opts, io);
        return 0;
      case 'list':
      case 'ls':
        await list(opts, io);
        return 0;
      case 'doctor': {
        const r = await doctor(opts, io);
        return r.problems ? 1 : 0;
      }
      default:
        io.error(io.t('unknownCommand', { name: command }));
        return 1;
    }
  } catch (e) {
    if (e instanceof UserError) {
      io.error(e.message);
      return 1;
    }
    throw e;
  }
}
