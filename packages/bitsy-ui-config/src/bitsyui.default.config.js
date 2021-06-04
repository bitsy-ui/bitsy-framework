const path = require('path');

const bootstrapLibDir = path.dirname(require.resolve('@bitsy-ui/bootstrap/package.json'));
const coreLibDir = path.dirname(require.resolve('@bitsy-ui/core/package.json'));

module.exports = {
  name: 'exampleMicroUI',
  settings: {
    bootstrap: {
      // Build config files
      webpack: (webpackConfig, config, options) => webpackConfig,
      webpackConfig: path.resolve(bootstrapLibDir, 'webpack', 'webpack.config.js'),
      babelConfig: path.resolve(bootstrapLibDir, 'babel', 'babel.config.json'),
      // Build files and configuration
      filePattern: 'bootstrap.js',
      fileEntry: path.resolve(bootstrapLibDir, 'lib', 'bootstrap.js'),
      fileExtensions: ['.js'],
      // Publish configuration
      publishDir: path.join(process.cwd(), '.bootstrap'),
      // Use this to explicitly define the bootstrap URL
      hostname: undefined,
      publicPath: '/',
      // Path to built bootstrap.js
      // This will be consumed by the API and token replaced
      script: path.join(process.cwd(), '.bootstrap', 'bootstrap.js'),
      // WARNING! Try everything we can to make sure the assets are NOT cached
      // This is the worst file to have cached, ensure this file does not cache
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        Expires: '-1',
        Pragma: 'no-cache',
      },
      options: {},
    },
    ui: {
      // Build config files
      babelConfig: path.resolve(coreLibDir, 'babel', 'babel.config.ui.js'),
      webpack: (webpackConfig, config, options) => webpackConfig,
      webpackServer: (serverConfig, config, webpackConfig, options) => serverConfig,
      webpackConfig: path.resolve(coreLibDir, 'webpack', 'webpack.config.ui.js'),
      webpackPort: 9087,
      buildEntry: path.join(process.cwd(), 'src', 'ui.js'),
      script: 'main.js',
      // Use this to explicitly define the bootstrap URL
      hostname: undefined,
      publicPath: '/',
      manifest: path.join(process.cwd(), '.ui', 'manifest.json'),
      publishDir: path.join(process.cwd(), '.ui'),
      filePattern: 'bitsy-ui.[contenthash].js',
      fileExtensions: ['.ts', '.tsx', '.js', '.jsx'],
      aliasDirs: {},
      env: {},
      options: {},
    },
    api: {
      // Build config files
      babelConfig: path.resolve(coreLibDir, 'babel', 'babel.config.api.js'),
      // Publish configuration
      buildDir: path.join(process.cwd(), 'src'),
      // Build files and configuration
      fileExtensions: ['.ts', '.tsx', '.js', '.jsx'],
      fileEntry: path.join(process.cwd(), '.api', 'service.js'),
      // Publish configuration
      publishDir: path.join(process.cwd(), '.api'),
      // Use this to explicitly define the bootstrap URL
      hostname: undefined,
      publicPath: '/',
      port: 8000,
      cors: { origin: '*' },
      env: {},
      ssr: {
        headers: {},
      },
      messages: {
        START_UP: 'Bitsy UI API starting',
        STARTED_UP: 'Bitsy UI API started and listening on port',
        CRASHED: 'Bitsy UI API crashed with message',
      },
    },
  },
};
