// Checks commit messages against the Conventional Commits rules in commitlint.config.mjs.
//   node scripts/lint-commits.mjs                 commits on this branch that are not on origin/main
//   node scripts/lint-commits.mjs <from>..<to>    a range
//   node scripts/lint-commits.mjs --all           every commit
//   node scripts/lint-commits.mjs --message "feat(css): add masthead"
import { execFileSync } from 'node:child_process';
import config from '../commitlint.config.mjs';

const HEADER = /^(?<type>[a-z]+)(?:\((?<scope>[a-z0-9-]+)\))?(?<bang>!)?: (?<subject>.+)$/;

/** @returns {string[]} problems, empty when the message is valid */
export function lint(message) {
  const lines = message.replace(/\r/g, '').split('\n');
  const header = lines[0];
  const problems = [];
  if (/^(Merge|Revert ")/.test(header)) return problems;
  const m = header.match(HEADER);
  if (!m) return [`header must look like "type(scope): subject", got "${header}"`];
  const { type, scope, subject } = m.groups;
  if (!config.types.includes(type)) problems.push(`unknown type "${type}" (use ${config.types.join(', ')})`);
  if (scope && !config.scopes.includes(scope)) problems.push(`unknown scope "${scope}" (use ${config.scopes.join(', ')})`);
  if (header.length > config.subjectMaxLength) problems.push(`header is ${header.length} characters, max ${config.subjectMaxLength}`);
  if (/[.]$/.test(subject)) problems.push('subject must not end with a period');
  if (/^[A-Z]/.test(subject)) problems.push('subject must start in lowercase');
  if (/—/.test(message)) problems.push('message must not contain an em dash');
  if (lines.length > 1 && lines[1].trim() !== '') problems.push('leave a blank line after the header');
  for (const l of lines.slice(2)) if (l.length > config.bodyMaxLineLength && !/^\S+:\/\//.test(l)) problems.push(`body line longer than ${config.bodyMaxLineLength}: "${l.slice(0, 40)}..."`);
  return problems;
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const args = process.argv.slice(2);
  let messages;
  if (args[0] === '--message') messages = [[ 'message', args[1] ]];
  else {
    let range = args[0];
    if (args[0] === '--all') range = 'HEAD';
    if (!range) {
      try { execFileSync('git', ['rev-parse', '--verify', 'origin/main'], { stdio: 'ignore' }); range = 'origin/main..HEAD'; } catch { range = 'HEAD'; }
    }
    const out = execFileSync('git', ['log', '--format=%H%x1f%B%x1e', range], { encoding: 'utf8' });
    messages = out.split('\x1e').map((s) => s.trim()).filter(Boolean).map((s) => s.split('\x1f'));
  }
  let bad = 0;
  for (const [sha, msg] of messages) {
    const problems = lint(msg.trim());
    if (problems.length) { bad++; console.error(`${sha.slice(0, 7)} ${msg.split('\n')[0]}\n  - ${problems.join('\n  - ')}`); }
  }
  if (bad) { console.error(`lint-commits: ${bad} of ${messages.length} commit(s) need fixing`); process.exit(1); }
  console.log(`lint-commits: ${messages.length} commit(s) ok`);
}
