const path = require('path');

module.exports = {
  name: 'exampleMicroUI',
  settings: {
    bootstrap: {
      entry: path.resolve(process.cwd(), 'node_modules', '@bitsy-ui', 'bootstrap', 'lib', 'bootstrap.js'),
      destination: path.join(process.cwd(), '.bootstrap'),
      path: '/',
      asset: path.join(process.cwd(), '.bootstrap', 'bootstrap.js'),
      // WARNING! Try everything we can to make sure the assets are NOT cached
      // This is the worst file to have cached, ensure this file does not cache
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        Expires: '-1',
        Pragma: 'no-cache',
      },
    },
    ui: {
      script: 'main.js',
      entry: path.join(process.cwd(), 'src', 'ui.ts'),
      output: 'bitsy-ui.[hash].js',
      path: '/',
      manifest: path.join(process.cwd(), '.ui', 'manifest.json'),
      destination: path.join(process.cwd(), '.ui'),
      babelConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui/core', 'babel', 'babel.ui.config.json'),
      webpackConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui/core', 'webpack', 'webpack.config.js'),
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      aliases: {},
      env: {},
    },
    api: {
      destination: path.join(process.cwd(), '.api'),
      babelConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui/core', 'babel', 'babel.api.config.json'),
      path: '/',
      port: 9010,
      cors: { origin: '*' },
      env: {},
      ssr: {
        headers: {},
      },
      messages: {
        START_UP: 'Micro UI API starting',
        STARTED_UP: 'Micro UI API started and listening on port',
        CRASHED: 'Micro UI API crashed with message',
      },
    },
  },
};
