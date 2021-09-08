const config = require('../../.eslintrc.cjs');

config.overrides[0].parserOptions.project = './tsconfig.json';

module.exports = config;
