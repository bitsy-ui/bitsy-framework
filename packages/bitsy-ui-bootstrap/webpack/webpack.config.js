const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

// Determine the project directory
const projectDir = path.resolve(fs.realpathSync(process.cwd()), '.');
// Determine the location of the bitsyui config
// @TODO if no local config we should default to the base config
const configPathname = path.resolve(projectDir, 'bitsyui.config.js');
// Load the bitsyUiConfig
const bitsyUiConfig = require(configPathname);

// Determine the assets public path
const publicPath = bitsyUiConfig.settings.bootstrap.publicPath;
// Determine the assets folder
const entryFile = bitsyUiConfig.settings.bootstrap.fileEntry;
// Determine the assets folder
const publishDir = bitsyUiConfig.settings.bootstrap.publishDir;
// Determine the assets folder
const outputFile = bitsyUiConfig.settings.bootstrap.filePattern;
// Determine the babel config to use
const babelConfig = bitsyUiConfig.settings.bootstrap.babelConfig;
// Determine the extensions
const extensions = bitsyUiConfig.settings.bootstrap.fileExtensions;

module.exports = {
  entry: entryFile,
  devtool: 'source-map',
  mode: 'production',
  output: {
    filename: outputFile,
    publicPath: publicPath,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    path: publishDir,
    pathinfo: true,
  },
  resolve: {
    extensions: extensions,
    symlinks: false,
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
            test: /\.(js|jsx)$/,
            exclude: [/node_modules/],
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: true,
              configFile: babelConfig,
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};
