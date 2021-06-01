const path = require('path');

const coreLibDir = path.dirname(require.resolve('@bitsy-ui/core/package.json'));

module.exports = {
  name: 'exampleMicroUI',
  settings: {
    ui: {
      webpackConfig: path.resolve(coreLibDir, 'webpack', 'webpack.config.devServer.ui.js'),
      webpackPort: 9087,
      // Use this to explicitly define the bootstrap URL
      hostname: 'http://localhost:9087',
      env: {
        catName: 'bruce',
      },
    },
  },
};
