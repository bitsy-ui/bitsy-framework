import chalk from 'chalk';
import doBuildBootstrapSync from '../Helpers/doBuildBootstrapSync';
import doBuildUiAsync from '../Helpers/doBuildUiAsync';
import { spawnSync } from 'child_process';

const BuildAndWatchBitsyUICommand = (config, options) => {
  // Determine the current build mode
  // We will default to development unless production is supplied
  const mode = options.development || !options.production ? 'development' : 'production';
  // BOOTSTRAP ASSETS BUILD
  // Determine the webpack config to use
  const bootWebpack = config.settings.bootstrap.webpackConfig;
  // Alert the world as to what we are doing
  console.log(chalk.blue('Building Bitsy Boostrap Assets'));
  // Attempt to build the micro UI
  doBuildBootstrapSync(mode, bootWebpack);
  // UI ASSETS BUILD
  // @TODO delete any current folder
  // @TODO create the destination folder
  const uiWebpack = config.settings.ui.webpackConfig;
  // Alert the world as to what we are doing
  console.log(chalk.blue('Building Bitsy UI Assets'));
  // Attempt to build the micro UI
  // If we are building within watch mode then execute the async build helper
  doBuildUiAsync(mode, uiWebpack);
  // API ASSETS BUILD
  const apiBabel = config.settings.api.babelConfig;
  const apiPublishDir = config.settings.api.publishDir;
  const apiExtensions = config.settings.api.fileExtensions;
  // Alert the world as to what we are doing
  console.log(chalk.blue('Building Bitsy API Assets'));
  // @TODO delete any current folder
  // @TODO create the destination folder
  const apiBuild = spawnSync(
    'npx',
    ['babel', 'src', '--extensions', apiExtensions.join(','), '--config-file', apiBabel, '--out-dir', apiPublishDir],
    { encoding: 'utf8' },
  );
  // Notify the results of the bootstrap assets build
  console.log(apiBuild.stdout);
  // Alert the world as to what we are doing
  console.log(chalk.blue('Congratulations! Bitsy UI Successfully Built!'));
};

export default BuildAndWatchBitsyUICommand;
