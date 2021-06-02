import chalk from 'chalk';
import { spawnSync } from 'child_process';

const doBuildAPI = (config, options) => {
  // Determine the current build mode
  // We will default to development unless production is supplied
  const mode = options.development || !options.production ? 'development' : 'production';
  // API ASSETS BUILD
  const apiBabel = config.settings.api.babelConfig;
  const apiPublishDir = config.settings.api.publishDir;
  const apiExtensions = config.settings.api.fileExtensions;
  // Attempt to build the micro UI api
  // Alert the world as to what we are doing
  console.log(chalk.blue('Building Bitsy API Assets'));
  // Attempt to build the files
  // If we are using ui async we will be watching for changes
  // This should be used when building within a pipeline
  const apiBuild = spawnSync(
    'npx',
    ['babel', 'src', '--extensions', apiExtensions.join(','), '--config-file', apiBabel, '--out-dir', apiPublishDir],
    { shell: true, stdio: 'inherit', encoding: 'utf-8', env: process.env },
  );
  // Alert the world as to what we are doing
  console.log(chalk.blue('Building Bitsy API Assets Completed!'));
  // Notify the results of the ui assets build
  console.log(`${apiBuild.stdout}`);
  // Notify the results of the ui assets build
  console.log(`${apiBuild.stderr}`);
};

export default doBuildAPI;
