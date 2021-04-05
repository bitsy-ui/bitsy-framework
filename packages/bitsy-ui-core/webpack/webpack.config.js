const process = require("process");
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// Determine the project directory
const projectDir = process.cwd();
// Determine the location of the bitsyui config
const configPathname = path.resolve(projectDir, 'bitsyui.config.js');
// Load the bitsyUiConfig
const bitsyUiConfig = require(configPathname);
// Determine the assets folder
const assetsFolder = bitsyUiConfig.settings?.ui?.dist || '.ui';

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const appPath = path.resolve(fs.realpathSync(process.cwd()), '.');
const appNodeModules = path.resolve(fs.realpathSync(process.cwd()), 'node_modules');
const publicPath = '/';

if (!fs.existsSync(assetsFolder)) fs.mkdirSync(assetsFolder);

module.exports = {
  entry: [`./webpack.path.js`, './src/assets.js'],
  devtool: false,
  node: {
    fs: 'empty',
    net: 'empty',
  },
  output: {
    filename: 'bitsy-ui.[hash].js',
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    umdNamedDefine: true,
    library: bitsyUiConfig.name,
    libraryTarget: bitsyUiConfig.settings.ui.target,
    publicPath: publicPath,
    path: path.resolve(__dirname, assetsFolder),
    pathinfo: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    symlinks: false,
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      '@src': path.resolve('./src'),
      '@context': path.resolve('./src/Context'),
      '@services': path.resolve('./src/Services'),
      '@components': path.resolve('./src/Components'),
      '@endpoints': path.resolve('./src/Endpoints'),
      '@hooks': path.resolve('./src/Hooks'),
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
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
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
            },
          },
          { test: /\.css$/, loader: 'style-loader!css-loader' },
        ],
      },
    ],
  },
  plugins: [
    new WebpackCleanupPlugin(),
    // If we do not do this webpack goes nuts and creates over 300 chunks
    // This crashes webpack with a heap memory error
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 10,
    }),
    new ModuleNotFoundPlugin(appPath),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin({}),
    new LoadablePlugin({}),
    new webpack.DefinePlugin({
      __MICROUI__: {
        library: JSON.stringify(bitsyUiConfig.name),
      },
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      publicPath: publicPath,
    }),
  ],
};
