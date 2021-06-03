import chalk from 'chalk';
import { spawn } from 'child_process';

const doBuildAndWatchUI = (config, options) => {
  // Determine the current build mode
  // We will default to development unless production is supplied
  const mode = options.development || !options.production ? 'development' : 'production';
  // UI ASSETS BUILD
  // @TODO delete any current folder
  // @TODO create the destination folder
  const uiWebpack = config.settings.ui.webpackConfig;
  // Retrieve the dev overrides
  // Attempt to build the micro UI
  // When changes have been detected we have to restart the server
  // Alert the world as to what we are doing
  console.log(chalk.blue('Building Bitsy UI Assets'));
  // Attempt to build the files
  // If we are using ui async we will be watching for changes
  // This should be used when building within a pipeline
  const build = spawn('npx', ['webpack', 'serve', '--mode', mode, '--config', uiWebpack], {
    env: process.env,
  });
  // Notify the results of the ui assets build
  build.stdout.on('data', (data) => {
    console.log(`${data}`);
  });
  // Notify the results of the ui assets build
  build.stderr.on('data', (error) => {
    console.log(`${error}`);
  });
  // Do something when app is closing
  process.on('exit', () => {
    // build.stdin.pause();
    build.kill();
  });
};

export default doBuildAndWatchUI;
