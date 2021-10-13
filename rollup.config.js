import path from 'path';
import { fileURLToPath } from 'url';

import { DEFAULT_EXTENSIONS } from '@babel/core';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import includePaths from 'gusalbukrk-rollup-plugin-includepaths';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const abspath = (relpath) => path.join(__dirname, relpath);

// otherwise error:
// `Plugin node-resolve: Could not resolve import … in … using exports defined in … package.json`
// possible fix is to delete any export key (main, exports) in the imported module `package.json`
// which shouldn't be done in most packages because it would make importing less practical
// @xlorem/common is not declare in here because its package.json doesn't contain any export key
const includePathOptions = {
  extensions: ['.ts'],
  include: {
    '@xlorem/input-validator/src/': abspath(
      'packages/input-validator/src/index.ts'
    ),
    'generate-random-text/src/': abspath(
      'packages/generate-random-text/src/index.ts'
    ),
    'generate-words-freqmap/src/': abspath(
      'packages/generate-words-freqmap/src/index.ts'
    ),
    'get-wikipedia-article/src/': abspath(
      'packages/get-wikipedia-article/src/index.ts'
    ),
    'tokenize-words/src/': abspath('packages/tokenize-words/src/index.ts'),
    'weighted-randomness/src/': abspath(
      'packages/weighted-randomness/src/index.ts'
    ),
    'stopwords-utils/src/': abspath('packages/stopwords-utils/src/index.ts'),
  },
};

export default [
  {
    input: 'src/index.ts',
    plugins: [
      del({
        targets: 'dist',
        runOnce: true,
      }),
      includePaths(includePathOptions),
      nodeResolve(),
      commonjs(),
      eslint({
        fix: true,
        throwOnError: true,
      }),
      json({
        compact: true,
      }),
      typescript({
        useTsconfigDeclarationDir: true,
        clean: true,
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      }),
    ],
    output: [
      {
        file: 'dist/bundle.esm.js',
        format: 'esm',
      },
      {
        file: 'dist/bundle.cjs.js',
        format: 'cjs',
        exports: 'auto',
      },
      {
        name: 'xlorem',
        file: 'dist/bundle.umd.js',
        format: 'umd',
        plugins: [terser()],
      },
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [
      dts(),
      del({
        targets: 'dist/types',
        hook: 'buildEnd',
        runOnce: true,
      }),
    ],
  },
];
