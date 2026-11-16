// A plan collects file changes and commands, so every command can print what it will do,
// skip what is already done, and apply nothing in --dry-run.
import { mkdirSync, writeFileSync, readFileSync, existsSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { readText, c, run, commandString } from './util.js';

export class Plan {
  constructor(cwd, { dryRun = false } = {}) {
    this.cwd = resolve(cwd);
    this.dryRun = dryRun;
    this.files = new Map(); // rel -> { content, kind: 'create' | 'update', note, binary }
    this.commands = []; // { cmd, args, note, cwd }
    this.notes = []; // free text lines shown after the summary
  }

  abs(p) {
    return join(this.cwd, p);
  }

  exists(p) {
    return this.files.has(p) || existsSync(this.abs(p));
  }

  /** Current content, including pending writes. */
  read(p) {
    const f = this.files.get(p);
    if (f) return f.binary ? null : f.content;
    return readText(this.abs(p));
  }

  /** Records a write when the content differs from what is there. Returns true when recorded. */
  write(p, content, note = '') {
    const pending = this.files.get(p);
    const onDisk = readText(this.abs(p));
    if (!pending && onDisk === content) return false;
    if (pending && pending.content === content) return false;
    const kind = pending ? pending.kind : onDisk === null ? 'create' : 'update';
    if (onDisk === content) {
      this.files.delete(p);
      return false;
    }
    this.files.set(p, { content, kind, note: pending?.note && note && pending.note !== note ? `${pending.note}; ${note}` : note || pending?.note || '' });
    return true;
  }

  /** Applies fn(current) to a text file; records the result when it changed. */
  edit(p, fn, note = '') {
    const before = this.read(p);
    if (before === null) return false;
    const after = fn(before);
    if (after == null || after === before) return false;
    return this.write(p, after, note);
  }

  /** Copies a binary or text file, skipping identical ones. */
  copy(srcAbs, p, note = '', group = null) {
    const data = readFileSync(srcAbs);
    return this.writeBuffer(p, data, note, group);
  }

  /** Records a binary write. Files with the same group print as one line (a vendored folder). */
  writeBuffer(p, data, note = '', group = null) {
    const dest = this.abs(p);
    if (existsSync(dest) && readFileSync(dest).equals(data)) return false;
    this.files.set(p, { content: data, kind: existsSync(dest) ? 'update' : 'create', note, binary: true, group });
    return true;
  }

  command(cmd, args, note = '', cwd = this.cwd) {
    this.commands.push({ cmd, args, note, cwd });
  }

  note(line) {
    if (!this.notes.includes(line)) this.notes.push(line);
  }

  get empty() {
    return this.files.size === 0 && this.commands.length === 0;
  }

  /** Lines describing the plan, grouped: commands, created, updated. */
  describe(t) {
    const lines = [];
    for (const k of this.commands) lines.push(`  ${c.cyan('$')} ${commandString(k.cmd, k.args)}${k.note ? c.dim(`  ${k.note}`) : ''}`);
    const entries = [];
    const groups = new Map();
    for (const [p, f] of this.files) {
      if (!f.group) {
        entries.push([p, f]);
        continue;
      }
      const g = groups.get(f.group);
      if (g) {
        g[1].count++;
        if (f.kind === 'update') g[1].kind = 'update';
      } else {
        const row = [f.group, { ...f, count: 1 }];
        groups.set(f.group, row);
        entries.push(row);
      }
    }
    for (const [, f] of groups.values()) f.note = `${t('files', { count: f.count })}, ${f.note}`;
    const width = Math.min(48, Math.max(0, ...entries.map(([p]) => p.length)));
    for (const [p, f] of entries) {
      const mark = f.kind === 'create' ? c.green('+') : c.yellow('~');
      const label = f.kind === 'create' ? t('created') : t('updated');
      lines.push(`  ${mark} ${p.padEnd(width)}  ${c.dim(f.note ? `${label}: ${f.note}` : label)}`);
    }
    return lines;
  }

  /** Writes every recorded file. Commands are run by the caller at the right moment. */
  applyFiles() {
    for (const [p, f] of this.files) {
      const dest = this.abs(p);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, f.content);
    }
  }

  /** Runs recorded commands in order. Returns the first failing command, or null. */
  runCommands() {
    for (const k of this.commands) {
      const r = run(k.cmd, k.args, { cwd: k.cwd });
      if (r.status !== 0) return k;
    }
    return null;
  }
}
