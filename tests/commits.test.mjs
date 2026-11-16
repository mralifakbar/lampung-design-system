import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lint } from '../scripts/lint-commits.mjs';

test('accepts conventional commits', () => {
  for (const m of ['feat(css): add masthead', 'fix: repair focus ring in dark', 'docs(i18n): translate toast spec\n\nBody text.', 'feat(tokens)!: rename accent-text\n\nBREAKING CHANGE: use --accent-ink']) assert.deepEqual(lint(m), [], m);
});

test('rejects malformed headers', () => {
  assert.ok(lint('Add masthead').length);
  assert.ok(lint('feature(css): add masthead').length);
  assert.ok(lint('feat(nope): add masthead').length);
  assert.ok(lint('feat(css): Add masthead').length);
  assert.ok(lint('feat(css): add masthead.').length);
  assert.ok(lint(`feat(css): ${'a'.repeat(80)}`).length);
  assert.ok(lint('feat(css): add masthead\nno blank line').length);
});
