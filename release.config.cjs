/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['main', "next"],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'refactor', release: 'minor' },
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'dependencies', release: 'patch' },
          { type: 'build', release: false },
          { type: 'test', release: false },
          { scope: 'no-release', release: false },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
        writerOpts: {
          commitsSort: ['subject', 'scope'],
        },
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'dist/index.cjs', label: 'JS distribution -- Common' },
          { path: 'dist/index.mjs', label: 'JS distribution -- ESM' },
          {
            path: 'dist/index.d.ts',
            label: 'Types',
          },
        ],
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['dist/**/*.{cjs,mjs,d.ts}', 'CHANGELOG.md', 'package.json'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: './CHANGELOG.md',
      },
    ],
  ],
};
