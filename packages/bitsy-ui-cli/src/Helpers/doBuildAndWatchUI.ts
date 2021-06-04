import chalk from 'chalk';
import webpack from 'webpack';
import WebpackServer from 'webpack-dev-server';

const doBuildAndWatchUI = (config, options) => {
  // Determine the current build mode
  // We will default to development unless production is supplied
  const mode = options.development || !options.production ? 'development' : 'production';
  // UI ASSETS BUILD
  // Retrieve the webpack config override
  const webpackMutator = config.settings.ui.webpack;
  // Retrieve the webpack dev server override
  const webpackServerMutator = config.settings.ui.webpackServer;
  // Retrieve the current webpack config
  const webpackUiConfig = webpackMutator(require(config.settings.ui.webpackConfig));
  // Allow any overrides within the webpack config
  console.log('webpackUiConfig.output', webpackUiConfig.output);
  // We also want to ensure some values are set
  const webpackServerConfig = webpackServerMutator({
    publicPath: '/',
    contentBase: webpackUiConfig.output.publicPath,
    compress: true,
    writeToDisk: true,
    port: config.settings.ui.webpackPort,
    hot: true,
    injectClient: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    stats: { colors: true },
    ...(webpackUiConfig.webpackUiConfig || {}),
  });

  console.log('webpackUiConfig', webpackUiConfig);
  // Retrieve the dev overrides
  // Attempt to build the micro UI
  // When changes have been detected we have to restart the server
  // Alert the world as to what we are doing
  console.log(chalk.blue('Building Bitsy UI Assets'));
  // Create the webpack dev server
  const server = new WebpackServer(webpack({ mode, ...webpackUiConfig }), webpackServerConfig);

  server.listen(webpackServerConfig.port, 'localhost', (err) => {
    if (err) console.log(err);
    console.log('WebpackDevServer listening at localhost:', webpackServerConfig.port);
  });
};

export default doBuildAndWatchUI;
