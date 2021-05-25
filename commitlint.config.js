const types = [
  'build',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'release',
  'revert',
  'style',
  'test',
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'],
    'type-enum': [2, 'always', types],
    'scope-min-length': [2, 'always', 3],
    'subject-min-length': [2, 'always', 5],
  },
};
