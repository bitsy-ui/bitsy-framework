import { spawn } from 'child_process';

const doBuildBootstrapAsync = (mode, config) => {
  // Attempt to build the files
  // If we are using bootstrap async we will be watching for changes
  // This should be used when building within a pipeline
  const build = spawn('npx', ['webpack', '--mode', mode, '--watch', '--config', config], { stdio: 'pipe' });
  // Notify the results of the bootstrap assets build
  build.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  // Notify the results of the bootstrap assets build
  build.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
};

export default doBuildBootstrapAsync;
