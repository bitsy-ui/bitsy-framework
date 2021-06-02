import chalk from 'chalk';
import { spawnSync } from 'child_process';

const doBuildUI = (config, options) => {
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
  const build = spawnSync('npx', ['webpack', '--mode', mode, '--config', uiWebpack], {
    shell: true,
    stdio: 'inherit',
    encoding: 'utf-8',
    env: process.env,
  });
  // Notify the results of the bootstrap assets build
  console.log(build.stdout);
  console.log(build.stderr);
};

export default doBuildUI;
