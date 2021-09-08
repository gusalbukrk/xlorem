import { DEFAULT_EXTENSIONS } from '@babel/core';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.ts',
    plugins: [
      del({
        targets: 'dist',
        runOnce: true,
      }),
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
      },
      {
        name: 'myLibrary',
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
