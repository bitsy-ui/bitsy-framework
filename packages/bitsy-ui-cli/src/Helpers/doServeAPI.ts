import { spawn } from 'child_process';

const doServeAPI = (config, options) => {
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
  thread.stderr.on('error', (error) => {
    console.log(`${error}`);
  });
};

export default doServeAPI;
