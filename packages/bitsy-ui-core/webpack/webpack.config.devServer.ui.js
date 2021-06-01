const path = require('path');
const fs = require('fs');
const zlib = require('zlib');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const getBitsyConfig = require('@bitsy-ui/config/lib/getBitsyConfig').default;

// MICRO FRONTEND CONFIG
const bitsyUiConfig = getBitsyConfig();

// Determine the assets public path
const publicPath = bitsyUiConfig.settings.ui.publicPath;
// Determine the assets folder
const entryFile = bitsyUiConfig.settings.ui.buildEntry;
// Determine the assets folder
const publishDir = bitsyUiConfig.settings.ui.publishDir;
// Determine the assets folder
const outputFile = bitsyUiConfig.settings.ui.filePattern;
// Determine the extensions
const extensions = bitsyUiConfig.settings.ui.fileExtensions;
// Determine the extensions
const port = bitsyUiConfig.settings.ui.webpackPort;
// Retrieve any path aliases
// These help make development a much more pleasurable experience
const pathAliases = bitsyUiConfig.settings.ui.aliasDirs || {};
// Determine the babel config to use
const babelConfig = bitsyUiConfig.settings.ui.babelConfig;
// Determine the current dirname
const currentDir = path.resolve(fs.realpathSync(__dirname), '.');

if (!fs.existsSync(publishDir)) fs.mkdirSync(publishDir);

module.exports = {
  entry: [path.resolve(currentDir, `./webpack.path.js`), entryFile],
  devtool: false,
  output: {
    filename: outputFile,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    publicPath: publicPath,
    path: publishDir,
    pathinfo: true,
    clean: true,
  },
  resolve: {
    extensions: extensions,
    symlinks: false,
    alias: {
      react: path.dirname(require.resolve('react')),
      'react-dom': path.dirname(require.resolve('react-dom')),
      '@src': path.resolve('./src'),
      ...pathAliases,
    },
  },
  devServer: {
    contentBase: publishDir,
    compress: true,
    writeToDisk: true,
    port: port,
    hot: true,
    inline: true,
    injectClient: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: /\.ts(x?)$/,
            use: 'ts-loader',
            exclude: [/node_modules/],
          },
          {
            test: /\.(ts|tsx|js|jsx)$/,
            exclude: [/node_modules/],
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: false,
              configFile: babelConfig,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // If we do not do this webpack goes nuts and creates over 300 chunks
    // This crashes webpack with a heap memory error
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 10,
    }),
    // Support asset compression
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
    // Provide the library name
    // This will allow the window var within webpack.path to reference the correct bitsyui
    // This permits multiple bitsyui apps to operate side by side
    new webpack.DefinePlugin({
      __BITSYUI__: {
        library: JSON.stringify(bitsyUiConfig.name),
      },
    }),
    // Generate the bitsyui asset manifest
    // This is needed by bootstrap to load the correct assets
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      publicPath: publicPath,
    }),
  ],
};
