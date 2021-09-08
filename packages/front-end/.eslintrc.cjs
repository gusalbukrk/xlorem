const path = require('path');

const config = require('../../.eslintrc.cjs');

// use `./` instead of __dirname will error
// Parsing error: This experimental syntax requires enabling one of the following parser plugin(s): 'jsx, flow, typescript'
config.parserOptions.babelOptions.configFile = path.join(
  __dirname,
  '.babelrc.cjs'
);

module.exports = {
  ...config, // root, ignorePatterns, env, parserOptions, plugins

  parser: '@babel/eslint-parser',

  extends: [
    'airbnb-base',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jest/all',
    'plugin:json/recommended',
    'plugin:promise/recommended',
  ],

  rules: {
    'prettier/prettier': 'error',

    'json/*': ['error', 'allowComments'],

    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
      },
    ],

    'import/extensions': [
      'error',
      'always', // should be `always` when `"type": "module"`
    ],
  },

  settings: {
    react: {
      version: 'detect',
    },

    // fix 'import/no-unresolved' error
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },

  overrides: [
    {
      files: [
        'webpack.*.js',
        '**/__tests__/**',
        '**/*{.,_}{test,spec}.{js,jsx,ts,tsx}',
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',

          // packageDir = specify the path to the folder with the package.json containing the dependencies
          // current directory contains the dependencies, @monorepo/root contains the devDependencies
          { packageDir: [__dirname, path.join(__dirname, '..', '..')] },
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: './tsconfig.json' },
      plugins: ['@typescript-eslint'],
      rules: {
        // disable some base rules and enable their typescript-eslint equivalents (Extension Rules) to prevent incorrect errors
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-am-using-a-rule-from-eslint-core-and-it-doesnt-work-correctly-with-typescript-code
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],

        // fix 'missing file extension' error
        'import/extensions': ['error', 'never'],
      },
    },
  ],
};
