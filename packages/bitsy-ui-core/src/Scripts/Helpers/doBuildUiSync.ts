import { spawnSync } from 'child_process';

const doBuildUiSync = (mode, config) => {
  // Attempt to build the files
  const build = spawnSync('npx', ['webpack', '--mode', mode, '--config', config], {
    encoding: 'utf8',
    stdio: 'pipe',
  });
  // Notify the results of the ui assets build
  console.log(build.stdout);
  console.log(build.stderr);
};

export default doBuildUiSync;
