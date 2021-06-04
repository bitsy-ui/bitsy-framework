import chalk from 'chalk';
import webpack from 'webpack';

const doBuildUI = (config, options) => {
  // Determine the current build mode
  // We will default to development unless production is supplied
  const mode = options.development || !options.production ? 'development' : 'production';
  // UI ASSETS BUILD
  // Retrieve the webpack config override
  const webpackMutator = config.settings.ui.webpack;
  // Retrieve the current webpack config
  const webpackUiConfig = webpackMutator(require(config.settings.ui.webpackConfig));
  // Retrieve the dev overrides
  // Attempt to build the micro UI
  // When changes have been detected we have to restart the server
  // Alert the world as to what we are doing
  console.log(chalk.blue('Building Bitsy UI Assets'));
  // Attempt to build the files
  // If we are using ui async we will be watching for changes
  // This should be used when building within a pipeline
  webpack({ mode, ...webpackUiConfig }, (error, stats) => {
    // If we encountered an error we need to report it
    if (error) {
      // Alert the world as to what we are doing
      console.log(chalk.red('Bitsy UI Build Failed!'));
      // Return the error to the console
      console.error(error);
      // Return out
      return;
    }
    // retrieve the string version of the stats
    const report = stats.toString({
      chunks: false,
      colors: true,
    });
    // Console log out the build result
    console.log(report);
    // Alert the world as to what we are doing
    console.log(chalk.blue('Bitsy UI Build Completed!'));
  });
};

export default doBuildUI;
