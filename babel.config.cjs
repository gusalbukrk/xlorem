module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // 'usage' = add the polyfills needed automatically
        // 'entry' = requires explicit import of core-js
        useBuiltIns: 'usage',
        corejs: {
          version: '3.8', // change it to the last version
          proposals: true,
        },
      },
    ],
    '@babel/preset-typescript',
  ],
};
