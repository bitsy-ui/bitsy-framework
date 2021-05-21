import chalk from 'chalk';
import { spawn } from 'child_process';

const ServeBitsyUICommand = (config, options) => {
  // Alert the world as to what we are doing
  console.log(chalk.blue('Preparing Bitsy UI Locally'));
  // BOOT LOCAL SERVER
  const apiEntry = config.settings.api.fileEntry;
  // Place to store the current thread
  let thread;
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
  // OPEN WITHIN BROWSER
  // open('http://localhost:9010');
};

export default ServeBitsyUICommand;

// If UI updates then run UI and server
// If no UI updates then only run server
// Always run server
//
