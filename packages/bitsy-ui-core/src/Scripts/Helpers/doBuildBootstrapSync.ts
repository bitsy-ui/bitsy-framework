import { spawnSync } from 'child_process';

const doBuildBootstrapSync = (mode, config) => {
  // Attempt to build the files
  const build = spawnSync('npx', ['webpack', '--mode', mode, '--config', config], {
    encoding: 'utf8',
    stdio: 'pipe',
  });
  // Notify the results of the bootstrap assets build
  console.log(build.stdout);
  console.log(build.stderr);
};

export default doBuildBootstrapSync;
