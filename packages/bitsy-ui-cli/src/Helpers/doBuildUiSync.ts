import { spawnSync } from 'child_process';

const doBuildUiSync = (mode, config) => {
  // Attempt to build the files
  const build = spawnSync('npx', ['webpack', '--mode', mode, '--config', config], {
    shell: true,
    stdio: 'inherit',
    encoding: 'utf-8',
    env: process.env,
  });
  // Notify the results of the ui assets build
  console.log(build.stdout);
  console.log(build.stderr);
};

export default doBuildUiSync;
