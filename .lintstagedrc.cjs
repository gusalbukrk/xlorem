// lint-staged will automatically add any fix to the commit
// that's why the linting of test files is done here
// husky will execute jest soon after, but without eslint (see '.husky/pre-commit', line 5)

module.exports = {
  // `'*': 'your-cmd'` = execute `your-cmd` with the list of all currently staged files passed as arguments
  // `your-cmd file1 file2 ...`
  //
  // that's why you shouldn't execute any npm scripts here
  // e.g.: a script with a body `eslint . --fix` would lint all files, not only the staged

  '*.(js|jsx|ts|tsx|cjs|json)': 'eslint --fix --ignore-pattern "!.*"',

  // json needs to be included here because eslint doesn't remove multiple blank lines in json files, prettier do
  '*.(md|json)': 'prettier --write',
};
