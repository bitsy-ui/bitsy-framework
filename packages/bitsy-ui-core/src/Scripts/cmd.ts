#!/usr/bin/env node

import chalk from 'chalk';
import process from 'process';
import program from 'commander';
import _ from 'lodash';
import open from 'open';
import { spawn, spawnSync } from 'child_process';
import { watch } from 'chokidar';
import doBuildUiAsync from './Helpers/doBuildUiAsync';
import doBuildBootstrapSync from './Helpers/doBuildBootstrapSync';
import doBuildUiSync from './Helpers/doBuildUiSync';
import getBitsyConfig from '@bitsy-ui/config/lib/getBitsyConfig';


// MICRO FRONTEND CONFIG
// Determine the location of the bitsyui config
const config = getBitsyConfig();

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
    // If we are building within watch mode then execute the async build helper
    if (options.watch) doBuildBootstrapSync(mode, bootWebpack);
    // If we are not building within watch mode then build in async mode
    else doBuildBootstrapSync(mode, bootWebpack);
    // UI ASSETS BUILD
    // @TODO delete any current folder
    // @TODO create the destination folder
    const uiWebpack = config.settings.ui.webpackConfig;
    // Alert the world as to what we are doing
    console.log(chalk.blue('Building Bitsy UI Assets'));
    // Attempt to build the micro UI
    // If we are building within watch mode then execute the async build helper
    if (options.watch) doBuildUiAsync(mode, uiWebpack);
    // If we are not building within watch mode then build in async mode
    else doBuildUiSync(mode, uiWebpack);
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
    const apiPublishDir = config.settings.api.publishDir;
    const uiWebpack = config.settings.ui.publishDir;
    // Build the assets with watching enabled
    // @TODO add some kind of hot loading capacity
    // @TODO create some kind of macro ui sandbox environment
    // @TODO I think SSR should be good enough here
    const watcher = watch([
      uiWebpack,
      apiPublishDir
    ], { ignored: /^\./, persistent: true, awaitWriteFinish: true });
    // BOOT LOCAL SERVER
    const apiEntry = config.settings.api.fileEntry;
    // Place to store the current thread
    let thread;

    watcher.on('ready', _.debounce(() => {
      // Attempt to start the application locally
      thread = spawn('node', [apiEntry]);
      // Notify the results of the bootstrap assets build
      thread.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      // Notify the results of the bootstrap assets build
      thread.stdout.on('error', (error) => {
        console.log(`stdout: ${error}`);
      });
    }));

    watcher.on('change', _.debounce(() => {
      // Attempt to start the application locally
      thread = spawn('node', [apiEntry]);
      // Notify the results of the bootstrap assets build
      thread.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      // Notify the results of the bootstrap assets build
      thread.stdout.on('error', (error) => {
        console.log(`stdout: ${error}`);
      });
    }));
    // OPEN WITHIN BROWSER
    // open('http://localhost:9010');
  });

program.parse(process.argv);
