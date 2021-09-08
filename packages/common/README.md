# @xlorem/common

## Known Issues

### package.json exports field not working with typescript

- currently
  - must use this `import myscript from "mylibrary/dist/myscript";`
  - instead of `import myscript from "mylibrary/myscript";`
- **fix**:
  - it's being worked on, [here](https://github.com/microsoft/TypeScript/issues/33079#issuecomment-911893337)
  - to be released in `typescript 4.5` in November 16th, [here](https://github.com/microsoft/TypeScript/issues/45418)
