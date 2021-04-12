const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

module.exports = {
  entry: path.resolve(process.cwd(), 'node_modules', '@bitsy-ui', 'bootstrap', 'lib', 'bootstrap.js'),
  devtool: 'source-map',
  mode: 'production',
  output: {
    filename: 'bootstrap.js',
    publicPath: publicPath,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    path: path.resolve(process.cwd(), './.bootstrap'),
    pathinfo: true,
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
      }),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: /\.(ts|tsx|js|jsx)$/,
            exclude: [/node_modules/],
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              // Don't waste time on Gzipping the cache
              cacheCompression: false,
              // If an error happens in a package, it's possible to be
              // because it was compiled. Thus, we don't want the browser
              // debugger to show the original code. Instead, the code
              // being evaluated would be much more helpful.
              sourceMaps: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};
