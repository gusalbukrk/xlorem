module.exports = {
  root: true,

  ignorePatterns: ['dist/'],

  plugins: ['prettier', 'jest', 'promise'],

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    babelOptions: { configFile: './.babelrc.cjs' },
  },

  extends: [
    'airbnb-base',
    'prettier',
    'plugin:jest/all',
    'plugin:json/recommended',
    'plugin:promise/recommended',
    'plugin:node/recommended',
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
  },

  settings: {
    // fix 'import/no-unresolved' error
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },

    // plugin-wide config for eslint-plugin-node
    node: {
      tryExtensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
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
        // disable some base rules and enable their typescript-eslint equivalents (Extension Rules) to prevent incorrect errors
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-am-using-a-rule-from-eslint-core-and-it-doesnt-work-correctly-with-typescript-code
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],

        // fix 'import/extensions' error
        'import/extensions': ['error', 'never', { json: 'always' }],

        // fix 'no-extraneous-dependencies' error in test files
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: [
              '**/__tests__/**',
              '**/*{.,_}{test,spec}.{ts,tsx}',
            ],
          },
        ],
      },
    },
    {
      files: ['./*.{js,cjs}'], // root config files
      rules: {
        'node/no-unpublished-import': ['off'],
      },
    },
  ],
};
