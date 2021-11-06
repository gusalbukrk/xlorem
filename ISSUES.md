# Known Issues

## package.json exports field not working with typescript

- **currently**:
  - must use this `import moduleName from "myLibrary/dist/moduleName";`
  - instead of `import moduleName from "myLibrary/moduleName";`
- **fix**:
  - it's being worked on, [here](https://github.com/microsoft/TypeScript/issues/33079#issuecomment-911893337)
  - to be released in `typescript 4.5` in November 16th, [here](https://github.com/microsoft/TypeScript/issues/45418)
- when **fixed**:
  - make a key in `exports` for each file inside `common/src/`
  - delete `stopwords-utils/src/index.ts` and make an exports key for each directory inside its `src/`
  - in every other package, a key to `exports` called source
    - this way ts source files can be imported without append `/src/`
    - e.g. `import pkg from 'pkg/src/';` => `import pkg from 'pkg;'`
  - it's likely that after this is done, `@rollup-plugin-includepaths` can be removed
