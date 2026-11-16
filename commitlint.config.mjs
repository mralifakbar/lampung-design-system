// Conventional Commits rules for this repository. Read by scripts/lint-commits.mjs (no dependencies),
// and compatible in spirit with @commitlint/config-conventional for teams that prefer commitlint.
export default {
  types: ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
  scopes: ['tokens', 'css', 'js', 'react', 'icons', 'type', 'aksara', 'docs', 'i18n', 'guide', 'spec', 'examples', 'landing', 'cli', 'flutter', 'skills', 'scripts', 'deploy', 'deps', 'release', 'ci', 'test', 'dist'],
  subjectMaxLength: 72,
  bodyMaxLineLength: 100,
};
