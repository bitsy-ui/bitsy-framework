import _ from 'lodash';
import chalk from 'chalk';
import { watch } from 'chokidar';
import { spawn } from 'child_process';

const ServeAndWatchBitsyUICommand = (config, options) => {
  // Alert the world as to what we are doing
  console.log(chalk.blue('Preparing Bitsy UI Locally'));
  // Retrieve the publish directory for the API
  // If any files change here we want to restart the local server
  // We only need to watch the API folder as it contains both UI and API assets
  // @TODO check if webpack can be super slow here
  const apiPublishDir = config.settings.api.publishDir;
  // Build the assets with watching enabled
  // @TODO add some kind of hot loading capacity
  // @TODO create some kind of macro ui sandbox environment
  // @TODO I think SSR should be good enough here
  const watcher = watch(apiPublishDir, { ignored: /^\./, persistent: true, awaitWriteFinish: true });
  // BOOT LOCAL SERVER
  const apiEntry = config.settings.api.fileEntry;
  // Place to store the current thread
  let thread;
  // Boots Bitsy UI initially
  watcher.on(
    'ready',
    _.debounce(() => {
      // Attempt to start the application locally
      thread = spawn('node', [apiEntry]);
      // Notify the results of the bootstrap assets build
      thread.stdout.on('data', (data) => {
        console.log(`${data}`);
      });
      // Notify the results of the bootstrap assets build
      thread.stdout.on('error', (error) => {
        console.log(`${error}`);
      });
    }),
  );
  // When changes have been detected we have to restart the server
  watcher.on(
    'change',
    _.debounce(() => {
      // Alert the world as to what we are doing
      console.log(chalk.blue('Changes Detected! Rebuilding Bitsy UI'));
      // Attempt to start the application locally
      thread = spawn('node', [apiEntry]);
      // Notify the results of the bootstrap assets build
      thread.stdout.on('data', (data) => {
        console.log(`${data}`);
      });
      // Notify the results of the bootstrap assets build
      thread.stdout.on('error', (error) => {
        console.log(`${error}`);
      });
    }),
  );
  // OPEN WITHIN BROWSER
  // open('http://localhost:9010');
};

export default ServeAndWatchBitsyUICommand;
