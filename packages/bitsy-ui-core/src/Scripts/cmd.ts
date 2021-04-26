#!/usr/bin/env node

import path from 'path';
import chalk from 'chalk';
import process from 'process';
import program from 'commander';
import open from 'open';
import { spawn, spawnSync } from 'child_process';
import getCombinedConfig from '../Helpers/Config/getCombinedConfig';
import doBuildBootstrapSync from './Helpers/doBuildBootstrapSync';
import doBuildBootstrapAsync from './Helpers/doBuildBootstrapAsync';

const baseDir = __dirname;
const projectDir = process.cwd();

// MICRO FRONTEND CONFIG
// Determine the location of the bitsyui config
const configDefaultPathname = path.resolve(projectDir, 'bitsyui.default.config.js');
// This will always be located at the project root
const defaultConfigFile = require(configDefaultPathname);
// Determine the location of the bitsyui config
const configPathname = path.resolve(projectDir, 'bitsyui.config.js');
// Load the bitsyui config file
// This will always be located at the project root
const projectConfigFile = require(configPathname);
// Retrieve the combined config
// This should use the default config as a base
const config = getCombinedConfig(defaultConfigFile, projectConfigFile);

program
  .command('build')
  .description('builds a bitsy ui')
  .option('-w, --watch', 'watch for changes and automatically recompile')
  .option('-p, --production', 'builds bitsy ui in production mode')
  .option('-d, --development', 'builds bitsy ui in development mode')
  .action((options) => {
    // Determine the current build mode
    // We will default to development unless production is supplied
    const mode = options.development || (!options.development && options.production) ? 'development' : 'production';
    // BOOTSTRAP ASSETS BUILD
    // Determine the webpack config to use
    const bootWebpack = config.settings.bootstrap.webpackConfig;
    // Alert the world as to what we are doing
    console.log(chalk.blue('Building Bitsy Boostrap Assets'));
    // Attempt to build the micro UI
    // doBuildBootstrapSync(mode, bootWebpack);
    doBuildBootstrapAsync(mode, bootWebpack);
    // UI ASSETS BUILD
    // @TODO delete any current folder
    // @TODO create the destination folder
    const uiWebpack = config.settings.ui.webpackConfig;
    // Alert the world as to what we are doing
    console.log(chalk.blue('Building Bitsy UI Assets'));
    // Attempt to build the micro UI
    const uiBuild = spawnSync('npx', ['webpack', '--mode', mode, '--config', uiWebpack], { encoding: 'utf8' });
    // Notify the results of the bootstrap assets build
    console.log(uiBuild.stdout);
    // API ASSETS BUILD
    const apiBabel = config.settings.api.babelConfig;
    const apiPublishDir = config.settings.api.publishDir;
    const apiExtensions = config.settings.api.fileExtensions;
    // Alert the world as to what we are doing
    console.log(chalk.blue('Building Bitsy API Assets'));
    // @TODO delete any current folder
    // @TODO create the destination folder
    const apiBuild = spawnSync(
      'npx',
      ['babel', 'src', '--extensions', apiExtensions.join(','), '--config-file', apiBabel, '--out-dir', apiPublishDir],
      { encoding: 'utf8' },
    );
    // Notify the results of the bootstrap assets build
    console.log(apiBuild.stdout);
    // Alert the world as to what we are doing
    console.log(chalk.blue('Congratulations! Bitsy UI Successfully Built!'));
  });

program
  .command('local')
  .description('serve a bitsy ui locally')
  .action((options) => {
    console.log('attempting to serve locally');
    // Build the assets with watching enabled
    // @TODO add some kind of hot loading capacity
    // @TODO create some kind of macro ui sandbox environment
    // BOOT LOCAL SERVER
    const apiEntry = config.settings.api.fileEntry;
    // Attempt to start the application locally
    const serve = spawn('node', [apiEntry]);
    // Notify the results of the bootstrap assets build
    serve.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    // OPEN WITHIN BROWSER
    // open('http://localhost:9010');
  });

program.parse(process.argv);
