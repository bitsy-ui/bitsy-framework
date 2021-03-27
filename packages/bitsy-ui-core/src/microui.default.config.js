const path = require('path');

module.exports = {
  name: 'exampleMicroUI',
  settings: {
    ui: {
      target: 'umd',
      url: process.env.ASSET_URL || 'http://localhost:9000',
      manifest: path.join(process.cwd(), '.microui', 'manifest.json'),
      entry: 'main.js',
      env: {},
    },
    api: {
      url: 'http://localhost:9000',
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
        START_UP: 'API starting',
        STARTED_UP: 'API started and listening on port',
        CRASHED: 'API crashed with message',
      },
    },
  },
};
