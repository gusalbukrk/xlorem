const config = require('../../.eslintrc.cjs');

config.overrides[0].parserOptions.project = './tsconfig.jest.json';

module.exports = config;
