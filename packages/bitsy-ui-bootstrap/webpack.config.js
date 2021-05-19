const path = require('path');
const fs = require('fs');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const TerserPlugin = require('terser-webpack-plugin');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
const appPath = path.resolve(fs.realpathSync(process.cwd()), '.');
const appNodeModules = path.resolve(fs.realpathSync(process.cwd()), 'node_modules');

module.exports = {
  entry: `./src/bootstrap.ts`,
  devtool: 'source-map',
  mode: 'production',
  output: {
    filename: 'bootstrap.js',
    publicPath: publicPath,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    path: path.resolve(__dirname, './lib'),
    pathinfo: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
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
  plugins: [
    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(appPath),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebook/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(appNodeModules),
  ],
};
