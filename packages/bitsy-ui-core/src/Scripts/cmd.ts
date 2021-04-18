#!/usr/bin/env node

import path from 'path';
import chalk from 'chalk';
import process from 'process';
import program from 'commander';
import open from 'open';
import { spawn, spawnSync } from 'child_process';

const baseDir = __dirname;
const projectDir = process.cwd();

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
    // Determine the location of the bitsyui config
    const configPathname = path.resolve(projectDir, 'bitsyui.config.js');
    // Determine the location of the bitsyui config
    // @TODO use this and combine with the provided config
    const configDefaultPathname = path.resolve(projectDir, 'bitsyui.default.config.js');
    // Load the bitsyui config file
    // This will always be located at the project root
    // @TODO do some combining or something
    const config = require(configPathname);
    // BOOTSTRAP ASSETS BUILD
    // Determine the webpack config to use
    const bootWebpack = config.settings.bootstrap.webpackConfig;
    // Alert the world as to what we are doing
    console.log(chalk.blue('Building Bitsy Boostrap Assets'));
    // Attempt to build the micro UI
    const bootBuild = spawnSync('npx', ['webpack', '--mode', mode, '--config', bootWebpack], {
      encoding: 'utf8',
    });
    // Notify the results of the bootstrap assets build
    console.log(bootBuild.stdout);
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
    // BOOT LOCAL SERVER
    // Attempt to start the application locally
    const serve = spawn('node', ['./.api/service.js']);
    // Notify the results of the bootstrap assets build
    serve.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    // OPEN WITHIN BROWSER
    open('http://localhost:9010');
  });
 
program
  .command('local')
  .description('serve a bitsy ui locally')
  .action((options) => {
    console.log('attempting to serve locally');
  });

program.parse(process.argv);