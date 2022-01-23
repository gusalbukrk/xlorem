const path = require('path');

const config = require('../../.eslintrc.cjs');

// use `./` instead of __dirname will error
// Parsing error: This experimental syntax requires enabling
// one of the following parser plugin(s): 'jsx, flow, typescript'
config.parserOptions.babelOptions.configFile = path.join(
  __dirname,
  '.babelrc.cjs'
);

config.overrides[0].parserOptions.project = './tsconfig.jest.json';

module.exports = {
  ...config, // root, ignorePatterns, env, parserOptions, plugins

  parser: '@babel/eslint-parser',

  extends: [
    'airbnb-base',
    'prettier',
    'plugin:jest/all',
    'plugin:json/recommended',
    'plugin:promise/recommended',
    'plugin:jest-formatting/recommended',

    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],

  rules: {
    'prettier/prettier': 'error',

    'json/*': ['error', 'allowComments'],

    'max-len': [
      'warn',
      {
        code: 80, // must be the same as prettierrc's printWidth
        comments: 100,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],

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

    'jest/require-hook': 'off',
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
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: './tsconfig.json' },
      plugins: ['@typescript-eslint'],
      rules: {
        // disable some base rules and enable their typescript-eslint
        // equivalents (Extension Rules) to prevent incorrect errors
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-am-using-a-rule-from-eslint-core-and-it-doesnt-work-correctly-with-typescript-code
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],

        // fix 'missing file extension' error
        'import/extensions': ['error', 'never', { json: 'always' }],

        // otherwise, will get `import/no-extraneous-dependencies` error
        // if devDependency is imported in a test file
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: [
              '**/__tests__/**',
              '**/*{.,_}{test,spec}.{ts,tsx}',
            ],
          },
        ],

        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      },
    },
    {
      files: [
        'webpack.*.js',
        '**/__tests__/**',
        '**/*{.,_}{test,spec}.{js,jsx,ts,tsx}',
      ],
      rules: {
        // usually there's no need to use `overrides` to ensure that
        // jest-only rules are applied only to test files, however
        // `require-hook` rule is aggressive and can result in false positives in non-test files
        // https://github.com/jest-community/eslint-plugin-jest/issues/934#issuecomment-944026446
        'jest/require-hook': 'error',

        'import/no-extraneous-dependencies': [
          'error',

          // packageDir = specify the path to the folder with the
          // package.json containing the dependencies
          // current directory contains the dependencies, @monorepo/root contains Dependencies
          { packageDir: [__dirname, path.join(__dirname, '..', '..')] },
        ],
      },
    },
    {
      files: ['jest.config.js'],
      rules: {
        'import/no-relative-packages': 'off',
      },
    },
  ],
};
