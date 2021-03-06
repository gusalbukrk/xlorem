// previously,
// for some unknown reason, `string_decoder` import
// appears twice and one of them has a trailing forward slash
// would result in an error, because relative ESM imports must use full paths
// module.exports = {
//   files: 'dist/bundle.js',
//   from: /^import (.*) from 'string_decoder\/';$/gm,
//   to: "import $1 from 'string_decoder';",
// };

// every bundle file must start with a shebang
module.exports = {
  files: 'dist/bundle.@(cjs|js)',
  from: /^/,
  to: '#!/usr/bin/env node\n\n',
};
