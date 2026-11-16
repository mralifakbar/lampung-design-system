import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { root } from './helpers.mjs';

// Tracked text files only; vendored companion skills are excluded (they are copies of upstream skills).
const files = execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8' }).split('\n')
  .filter((f) => f && /\.(m?js|ts|tsx|json|jsonc|css|html|md|dart|yaml|yml|py|sh)$/.test(f) && !/^skills\/(antislop|apple-design|microinteractions)/.test(f) && !f.startsWith('tests/'));

test('the system has its own name everywhere', () => {
  const bad = [];
  for (const f of files) {
    const s = readFileSync(join(root, f), 'utf8');
    if (/\bdoels?\b|doel['’]s/i.test(s)) bad.push(f);
  }
  assert.deepEqual(bad, []);
});

test('no em dashes in docs, specs and copy', () => {
  const bad = files.filter((f) => /^(docs\/(spec|guides)|apps\/landing|README)/.test(f) && readFileSync(join(root, f), 'utf8').includes('—'));
  assert.deepEqual(bad, []);
});

test('the siger mark is the favicon and the docs mark', () => {
  const mark = readFileSync(join(root, 'brand/mark.svg'), 'utf8');
  assert.match(mark, /<svg[^>]+viewBox="0 0 64 64"/);
  assert.equal(readFileSync(join(root, 'apps/landing/favicon.svg'), 'utf8'), mark);
  assert.ok(readFileSync(join(root, 'docs/index.html'), 'utf8').includes('class="siger"'));
});
