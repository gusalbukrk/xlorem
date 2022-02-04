# trying to migrate from npm + lerna to yarn workspaces

## error

- `yarn build` error
  - `Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser. The file does not match your project config: ... . The file must be included in at least one of the projects provided`
  - error in following packages: `generate-random-text`, `stopwords-utils`, `tokenize-words`, `xlorem`
    - what these packages with error have in common, is that they import subpackages
      - exception: packages which only imported subpackage is `xlorem-common` doesn't error, e.g. `generate-words-freqmap`, `get-wikipedia-article`, `weighted-randomness`

## what is triggering error

- `@rollup/plugin-eslint` (at `rollup.config.js`) is what trigger errors
  - when it's commented out, errors go away
  - when options `throwOnError` is false (which is default), errors appear in terminal but don't interrupt script execution
- when `includePaths` imported path is commented out
  - errors go away (because imported files won't go through eslint)
  - also, warning appears: `Plugin node-resolve: Could not resolve import … in … using exports defined in imported package's package.json`

## in conclusion

- errors happen because eslint (`@rollup/plugin-eslint`) is trying to lint imported files
- but error because imported files isn't inside tsconfig `include`

## fixes

### method 1 - using typescript paths

- add paths to tsconfig:

```json
{
  "compilerOptions": {
    "baseUrl": "src", // if `paths`, must've `baseUrl`
    "paths": {
        "weighted-randomness/*": ["../../weighted-randomness/*"], // ts path must be identical to library name (don't append at sign)
    },
}
```

- change imports to: `import app from 'app/src/'`
- add subpackage `rollup.config.js` (also, update `build` script in `package.json`) :

```js
import config from '../../rollup.config'; // eslint-disable-line import/no-relative-packages

config[1].input = 'dist/types/<library-name>/src/index.d.ts',

export default config;
```

### method 2 - edit tsconfig.jest.json

- at `tsconfig.jest.json` in `include` add: `".."`
