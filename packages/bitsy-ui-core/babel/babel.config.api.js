const path = require('path');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@src': './src',
          node_modules: './node_modules',
          react: path.dirname(require.resolve('react')),
          'react-dom': path.dirname(require.resolve('react-dom')),
        },
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
};
