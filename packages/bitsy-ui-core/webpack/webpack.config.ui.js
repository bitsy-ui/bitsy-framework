const process = require('process');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// Determine the project directory
const projectDir = path.resolve(fs.realpathSync(process.cwd()), '.');
// Determine the current dirname
const currentDir = path.resolve(fs.realpathSync(__dirname), '.');
// Determine the location of the bitsyui config
const configPathname = path.resolve(projectDir, 'bitsyui.config.js');
// Load the bitsyUiConfig
const bitsyUiConfig = require(configPathname);

// Determine the assets public path
const publicPath = bitsyUiConfig.settings.ui.publicPath;
// Determine the assets folder
const entryFile = bitsyUiConfig.settings.ui.fileEntry;
// Determine the assets folder
const publishDir = bitsyUiConfig.settings.ui.publishDir;
// Determine the assets folder
const outputFile = bitsyUiConfig.settings.ui.filePattern;
// Determine the extensions
const extensions = bitsyUiConfig.settings.ui.fileExtensions;
// Retrieve any path aliases
// These help make development a much more pleasurable experience
const pathAliases = bitsyUiConfig.settings.ui.aliasDirs || {};
// Determine the babel config to use
const babelConfig = bitsyUiConfig.settings.ui.babelConfig;

if (!fs.existsSync(publishDir)) fs.mkdirSync(publishDir);

module.exports = {
  entry: [path.resolve(currentDir, `./webpack.path.js`), entryFile],
  devtool: false,
  node: {
    fs: 'empty',
    net: 'empty',
  },
  output: {
    filename: outputFile,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    umdNamedDefine: true,
    library: bitsyUiConfig.name,
    libraryTarget: 'umd',
    publicPath: publicPath,
    path: publishDir,
    pathinfo: true,
  },
  resolve: {
    extensions: extensions,
    symlinks: false,
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      '@src': path.resolve('./src'),
      ...pathAliases,
    },
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
        cache: false,
        sourceMap: false,
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
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.svg$/,
            loader: require.resolve('svg-inline-loader'),
          },
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
          { test: /\.css$/, loader: 'style-loader!css-loader' },
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
    // Provide the library name
    // This will allow the window var within webpack.path to reference the correct bitsyui
    // This permits multiple bitsyui apps to operate side by side
    new webpack.DefinePlugin({
      __BITSYUI__: {
        library: JSON.stringify(bitsyUiConfig.name),
      },
    }),
    // Initiate the loadable plugin
    // This will support code split bitsy ui components
    // Without this ALL components would be loaded
    // This would be bad and result in horrible performance for large bitsy ui apps
    new LoadablePlugin({}),
    // Generate the bitsyui asset manifest
    // This is needed by bootstrap to load the correct assets
    new ManifestPlugin({
      fileName: 'manifest.json',
      publicPath: publicPath,
    }),
  ],
};
