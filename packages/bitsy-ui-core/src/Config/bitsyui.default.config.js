const path = require('path');

module.exports = {
  name: 'exampleMicroUI',
  settings: {
    bootstrap: {
      // Build config files
      webpackConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui', 'bootstrap', 'webpack', 'webpack.config.js'),
      babelConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui', 'bootstrap', 'babel', 'babel.config.json'),
      // Build files and configuration
      filePattern: 'bootstrap.js',
      fileEntry: path.resolve(process.cwd(), 'node_modules', '@bitsy-ui', 'bootstrap', 'lib', 'bootstrap.js'),
      fileExtensions: ['.js'],
      // Publish configuration
      publishDir: path.join(process.cwd(), '.bootstrap'),
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
      babelConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui', 'core', 'babel', 'babel.config.ui.json'),
      webpackConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui', 'core', 'webpack', 'webpack.config.ui.js'),
      script: 'main.js',
      publicPath: '/',
      manifest: path.join(process.cwd(), '.ui', 'manifest.json'),
      publishDir: path.join(process.cwd(), '.ui'),
      fileEntry: path.join(process.cwd(), 'src', 'ui.ts'),
      filePattern: 'bitsy-ui.[hash].js',
      fileExtensions: ['.ts', '.tsx', '.js', '.jsx'],
      aliasDirs: {},
      env: {},
      options: {},
    },
    api: {
      // Build config files
      babelConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui', 'core', 'babel', 'babel.config.api.json'),
      // Build files and configuration
      fileExtensions: ['.ts', '.tsx', '.js', '.jsx'],
      fileEntry: path.join(process.cwd(), '.api', 'service.js'),
      // Publish configuration
      publishDir: path.join(process.cwd(), '.api'),

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
