import { spawnSync } from 'child_process';

const doBuildBootstrapSync = (mode, config) => {
  // Attempt to build the files
  const bootBuild = spawnSync('npx', ['webpack', '--mode', mode, '--config', config], { encoding: 'utf8' });
  // Notify the results of the bootstrap assets build
  console.log(bootBuild.stdout);
};

export default doBuildBootstrapSync;
