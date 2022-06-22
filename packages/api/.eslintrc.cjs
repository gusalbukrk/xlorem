const path = require('path');

const config = require('../../.eslintrc.cjs');

config.overrides[0].parserOptions.project = './tsconfig.json';

// needed because (sub)package's custom `rollup.config.js` imports a lib which is located at root
config.overrides.push({
  files: ['rollup.config.js'],
  rules: {
    'node/no-extraneous-import': [
      'error',
      {
        allowModules: [
          '@rollup/plugin-node-resolve',
          'rollup-plugin-typescript2',
        ],
      },
    ],

    'import/no-extraneous-dependencies': [
      'error',
      { packageDir: [__dirname, path.join(__dirname, '..', '..')] },
    ],
  },
});

module.exports = config;
