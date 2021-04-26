import { spawn } from "child_process";

const doBuildBootstrapAsync = (mode, config) => {
  // Attempt to build the files
  const bootBuild = spawn('npx', ['webpack', '--mode', mode, '--config', config]);
  // Notify the results of the bootstrap assets build
  bootBuild.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  // Notify the results of the bootstrap assets build
  bootBuild.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
};

export default doBuildBootstrapAsync;
