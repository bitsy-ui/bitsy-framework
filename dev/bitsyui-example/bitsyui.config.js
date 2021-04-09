const path = require('path');

module.exports = {
  name: 'exampleMicroUI',
  settings: {
    ui: {
      url: process.env.ASSET_URL || 'http://localhost:9000',
      entry: path.join(process.cwd(), 'src', 'ui.ts'),
      output: 'bitsy-ui.[hash].js',
      manifest: path.join(process.cwd(), '.ui', 'manifest.json'),
      destination: path.join(process.cwd(), '.ui'),
      babelConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui/core', 'babel', 'babel.ui.config.json'),
      webpackConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui/core', 'webpack', 'webpack.config.js'),
      public: '/',
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      aliases: {},
      env: {},
    },
    api: {
      url: 'http://localhost:9000',
      destination: '.api',
      babelConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui/core', 'babel', 'babel.api.config.json'),
      path: '/api',
      port: 9000,
      cors: { origin: '*' },
      env: {},
      bootstrap: {
        headers: {},
      },
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
