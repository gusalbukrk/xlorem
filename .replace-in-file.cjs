// this 'replace-in-file' script is used to format dts files
// triggered by `postbuild` script
// insert blank lines between different blocks of code in every `packages/*/dist/index.d.ts`
// needed because typescript doesn't preserve empty lines between types declaration

module.exports = {
  files: 'dist/index.d.ts',
  from: /(?<!\n|\*\/)\n(declare|interface|type|export|\/\*\*)/gm,
  to: '\n\n$1',
};
