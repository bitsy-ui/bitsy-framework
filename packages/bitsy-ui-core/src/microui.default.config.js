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
        START_UP: 'Micro UI API starting',
        STARTED_UP: 'Micro UI API started and listening on port',
        CRASHED: 'Micro UI API crashed with message',
      },
    },
  },
};
