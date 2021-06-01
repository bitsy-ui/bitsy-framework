import chalk from 'chalk';
import _ from 'lodash';
import { spawnSync, spawn } from 'child_process';
import { watch } from 'chokidar';

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
  // If we are not building within watch mode then build in async mode
  // Attempt to build the files
  const bootBuild = spawnSync('npx', ['webpack', '--mode', mode, '--config', bootWebpack], {
    shell: true,
    stdio: 'inherit',
    encoding: 'utf-8',
    env: process.env,
  });
  // Notify the results of the bootstrap assets build
  console.log(bootBuild.stdout);
  console.log(bootBuild.stderr);
  // API ASSETS BUILD
  const apiBabel = config.settings.api.babelConfig;
  const apiBuildDir = config.settings.api.buildDir;
  const apiPublishDir = config.settings.api.publishDir;
  const apiExtensions = config.settings.api.fileExtensions;
  // Attempt to build the micro UI api
  // If we are building within watch mode then execute the async build helper
  const apiWatcher = watch(apiBuildDir, { ignored: /^\./, persistent: true, awaitWriteFinish: true });
  // Place to store the current thread
  let apiThread;

  const apiBuilder = () => {
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
    // BOOT LOCAL SERVER
    const apiEntry = config.settings.api.fileEntry;

    if (apiThread) apiThread.kill();
    // Attempt to start the application locally
    apiThread = spawn('node', [apiEntry]);
    // Notify the results of the bootstrap assets build
    apiThread.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    // Notify the results of the bootstrap assets build
    apiThread.stdout.on('error', (error) => {
      console.log(`${error}`);
    });
    // Do something when app is closing
    process.on('exit', () => {
      // build.stdin.pause();
      apiThread.kill();
    });
  };
  apiBuilder();
  // When changes have been detected we have to restart the server
  apiWatcher.on('change', _.debounce(apiBuilder));
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
  build.stdout.on('error', (error) => {
    console.log(`${error}`);
  });
  // Do something when app is closing
  process.on('exit', () => {
    // build.stdin.pause();
    build.kill();
  });
};

export default BuildAndWatchBitsyUICommand;
