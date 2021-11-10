module.exports = {
  words: ['xlorem', 'gusalbukrk', 'stopword', 'stopwords', 'freqmap'],

  ignoreWords: ['postbuild', 'postpublish', 'monospace'],

  ignorePaths: [
    'cspell.config.cjs', // otherwise, would've to be included in every `overrides.filename`
    '.gitignore',
    '.git/',
    '.husky/_/',
  ],

  overrides: [
    {
      filename: [
        '.babelrc.cjs',
        '.eslintrc.cjs',
        'package.json',
        'rollup.config.js',
        'ISSUES.md',
      ], // config files
      words: [
        'npmignore',
        'corejs',
        'includepaths',
        'stylelint',
        'abspath',
        'relpath',
        'loglevel',
      ],
    },
    {
      filename: 'packages/get-wikipedia-article/',
      words: [
        'exintro',
        'explaintext',
        'cllimit',
        'clshow',
        'plcontinue',
        'pllimit',
        'plnamespace',
        'pageterms',
        'wbptlanguage',
        'wbptterms',
        'opensearch',
        'pageprops',
        'ppprop',
      ],
    },
    {
      filename: 'packages/get-wikipedia-article/src/index.spec.ts',
      words: ['xxyyzz'], // this string is used to trigger `articleNotFound` error
    },
  ],
};
