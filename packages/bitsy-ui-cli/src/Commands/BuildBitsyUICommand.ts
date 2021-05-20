import chalk from 'chalk';
import doBuildBootstrapSync from '../Helpers/doBuildBootstrapSync';
import doBuildUiSync from '../Helpers/doBuildUiSync';
import { spawnSync } from 'child_process';

const BuildBitsyUICommand = (config, options) => {
  // Determine the current build mode
  // We will default to development unless production is supplied
  const mode = options.development || !options.production ? 'development' : 'production';
  // BOOTSTRAP ASSETS BUILD
  console.log('production', options.production);
  // Determine the webpack config to use
  const bootWebpack = config.settings.bootstrap.webpackConfig;
  // Alert the world as to what we are doing
  console.log(chalk.blue('Building Bitsy Boostrap Assets'));
  // Attempt to build the micro UI
  // If we are not building within watch mode then build in async mode
  doBuildBootstrapSync(mode, bootWebpack);
  // UI ASSETS BUILD
  // @TODO delete any current folder
  // @TODO create the destination folder
  const uiWebpack = config.settings.ui.webpackConfig;
  // Alert the world as to what we are doing
  console.log(chalk.blue('Building Bitsy UI Assets'));
  // Attempt to build the micro UI
  // If we are not building within watch mode then build in async mode
  doBuildUiSync(mode, uiWebpack);
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

export default BuildBitsyUICommand;
