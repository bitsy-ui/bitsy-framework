import { spawn } from 'child_process';

const doBuildUiAsync = (mode, config) => {
  // Attempt to build the files
  // If we are using ui async we will be watching for changes
  // This should be used when building within a pipeline
  const build = spawn('npx', ['webpack', '--mode', mode, '--watch', '--config', config], { stdio: 'pipe' });
  // Notify the results of the ui assets build
  build.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  // Notify the results of the ui assets build
  build.stderr.on('error', (data) => {
    console.log(`stderr: ${data}`);
  });
};

export default doBuildUiAsync;
