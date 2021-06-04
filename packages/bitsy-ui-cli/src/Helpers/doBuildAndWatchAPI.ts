import _ from 'lodash';
import { watch } from 'chokidar';
import chalk from 'chalk';
import { spawn, spawnSync } from 'child_process';

const doBuildAndWatchAPI = (config, options) => {
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
  // Place to store the current thread
  let apiThread;
  // The builder worker callback
  const doApiBuilderWorker = () => {
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
    // Alert the world as to what we are doing
    console.log(chalk.blue('Starting Local Bitsy API'));
    // BOOTING BITSY UI API
    if (apiThread) apiThread.kill();
    // Attempt to start the application locally
    apiThread = spawn('node', [apiEntry]);
    // Notify the results of the bootstrap assets build
    apiThread.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    // Notify the results of the bootstrap assets build
    apiThread.stderr.on('data', (error) => {
      console.log(`ERROR -> ${error}`);
    });
    // Do something when app is closing
    process.on('exit', () => {
      // build.stdin.pause();
      apiThread.kill();
    });
  };
  // Trigger the first round build
  doApiBuilderWorker();
  // When changes have been detected we have to restart the server
  apiWatcher.on('change', _.debounce(doApiBuilderWorker));
};

export default doBuildAndWatchAPI;
