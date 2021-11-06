module.exports = {
  words: ['xlorem', 'gusalbukrk', 'stopword', 'stopwords', 'freqmap'],

  ignoreWords: ['postbuild', 'postpublish', 'monospace'],

  ignorePaths: [
    'cspell.config.cjs', // otherwise, would've to be included in every `overrides.filename`
  ],

  overrides: [
    {
      filename: './ISSUES.md',
      words: ['includepaths'],
    },
    {
      filename: './package.json',
      words: ['loglevel', 'includepaths', 'stylelint'],
    },
    {
      filename: './rollup.config.js',
      words: ['includepaths', 'abspath', 'relpath'],
    },
    {
      filename: 'packages/get-wikipedia-article/**/*',
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
