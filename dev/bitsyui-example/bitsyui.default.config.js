const path = require('path');

module.exports = {
  name: 'exampleMicroUI',
  settings: {
    ui: {
      target: 'umd',
      entry: 'main.js',
      babelConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui/core', 'babel', 'babel.ui.config.json'),
      webpackConfig: path.join(process.cwd(), 'node_modules', '@bitsy-ui/core', 'webpack', 'webpack.config.js'),
      url: process.env.ASSET_URL || 'http://localhost:9000',
      dist: '.ui',
      manifest: path.join(process.cwd(), '.ui', 'manifest.json'),
      env: {},
    },
    api: {
      url: 'http://localhost:9000',
      dist: '.api',
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
