import chalk from 'chalk';
import _ from 'lodash';
import { spawnSync } from 'child_process';
import { watch } from 'chokidar';

const BuildAndWatchBitsyUICommand = (config, options) => {
  // Determine the current build mode
  // We will default to development unless production is supplied
  const mode = options.development || !options.production ? 'development' : 'production';
  // API ASSETS BUILD
  const apiBabel = config.settings.api.babelConfig;
  const apiBuildDir = config.settings.api.buildDir;
  const apiPublishDir = config.settings.api.publishDir;
  const apiExtensions = config.settings.api.fileExtensions;
  // Attempt to build the micro UI api
  // If we are building within watch mode then execute the async build helper
  const apiWatcher = watch(apiBuildDir, { ignored: /^\./, persistent: true, awaitWriteFinish: true });
  // When changes have been detected we have to restart the server
  apiWatcher.on(
    'change',
    _.debounce(() => {
      // Alert the world as to what we are doing
      console.log(chalk.blue('Building Bitsy API Assets'));
      // Attempt to build the files
      // If we are using ui async we will be watching for changes
      // This should be used when building within a pipeline
      const apiBuild = spawnSync(
        'npx',
        [
          'babel',
          'src',
          '--extensions',
          apiExtensions.join(','),
          '--config-file',
          apiBabel,
          '--out-dir',
          apiPublishDir,
        ],
        { shell: true, stdio: 'inherit', encoding: 'utf-8', env: process.env },
      );
      // Alert the world as to what we are doing
      console.log(chalk.blue('Building Bitsy API Assets Completed!'));
      // Notify the results of the ui assets build
      console.log(`${apiBuild.stdout}`);
      // Notify the results of the ui assets build
      console.log(`${apiBuild.stderr}`);
    }),
  );
  // UI ASSETS BUILD
  // @TODO delete any current folder
  // @TODO create the destination folder
  const uiWebpack = config.settings.ui.webpackConfig;
  // Attempt to build the micro UI
  // If we are building within watch mode then execute the async build helper
  const uiWatcher = watch(apiPublishDir, { ignored: /^\./, persistent: true, awaitWriteFinish: true });
  // When changes have been detected we have to restart the server
  uiWatcher.on(
    'change',
    _.debounce(() => {
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
      // Alert the world as to what we are doing
      console.log(chalk.blue('Building Bitsy UI Assets Completed!'));
      // Notify the results of the ui assets build
      console.log(`${build.stdout}`);
      // Notify the results of the ui assets build
      console.log(`${build.stderr}`);
    }),
  );
};

export default BuildAndWatchBitsyUICommand;