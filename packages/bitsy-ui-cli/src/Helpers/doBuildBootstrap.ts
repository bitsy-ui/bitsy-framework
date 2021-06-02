import chalk from 'chalk';
import { spawnSync } from 'child_process';

const doBuildBootstrap = (config, options) => {
  // Determine the current build mode
  // We will default to development unless production is supplied
  const mode = options.development || !options.production ? 'development' : 'production';
  // BOOTSTRAP ASSETS BUILD
  // Determine the webpack config to use
  const bootWebpack = config.settings.bootstrap.webpackConfig;
  // Alert the world as to what we are doing
  console.log(chalk.blue('Building Bitsy Boostrap Assets'));
  // Attempt to build the micro UI
  // If we are not building within watch mode then build in async mode
  // Attempt to build the files
  const bootBuild = spawnSync('npx', ['webpack', '--mode', mode, '--config', bootWebpack], {
    shell: true,
    stdio: 'inherit',
    encoding: 'utf-8',
    env: process.env,
  });
  // Notify the results of the bootstrap assets build
  console.log(bootBuild.stdout);
  console.log(bootBuild.stderr);
};

export default doBuildBootstrap;
