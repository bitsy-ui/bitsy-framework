#!/usr/bin/env node

import program from 'commander';
import create from 'create-bitsy-ui/lib/scripts/create';
import * as process from 'process';
import path from 'path';
const { spawn } = require('child_process');

const baseDir = __dirname;
const projectDir = process.cwd();

program
  .command('build')
  .description('builds a bitsy ui')
  .option('-w, --watch', 'watch for changes and automatically recompile')
  .option('-p, --production', 'builds bitsy ui in production mode')
  .option('-d, --development', 'builds bitsy ui in development mode')
  .action((options) => {
    // Determine the location of the bitsyui config
    const configPathname = path.resolve(projectDir, 'bitsyui.config.js');
    // @TODO if no config then throw error
    // Load the bitsyui config file
    // This will always be located at the project root
    const config = require(configPathname);
    // UI
    // Determine the api destination folder
    const uiDestination = config.settings?.ui?.dist || '.ui';
    // Determine the api babel config
    const uiBabel =
      config.settings?.ui?.babelConfig ||
      path.join(process.cwd(), 'node_modules', '@bitsy-ui/core', 'babel', 'babel.ui.config.json');
    // Determine the api babel config
    const uiWebpack =
      config.settings?.ui?.webpackConfig ||
      path.join(process.cwd(), 'node_modules', '@bitsy-ui/core', 'webpack', 'webpack.config.js');
    // API
    // Determine the api destination folder
    const apiDestination = config.settings?.api?.dist || '.api';
    // Determine the api babel config
    const apiBabel =
      config.settings?.api?.babelConfig ||
      path.join(process.cwd(), 'node_modules', '@bitsy-ui/core', 'babel', 'babel.api.config.json');
    // Determine the api extensions
    const apiExtensions = config.settings?.api?.extensions || '.ts,.tsx,.js';
    // Attempt to build the bitsyui
    const apiBuild = spawn('npx', [
      'babel',
      'src',
      '--extensions',
      apiExtensions,
      '--config-file',
      apiBabel,
      '--out-dir',
      apiDestination,
    ]);

    apiBuild.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    apiBuild.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    apiBuild.on('error', (error) => {
      console.log(`error: ${error.message}`);
    });

    apiBuild.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      // Attempt to build the bitsyui
      const uiBuild = spawn('npx', ['webpack', '--mode', 'development', '--config', uiWebpack]);

      uiBuild.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      uiBuild.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      uiBuild.on('error', (error) => {
        console.log(`error: ${error.message}`);
      });

      uiBuild.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    });

    // Determine location of the webpack config
    // Determine the location of the babel config
    // console.log('attempting to build');
    // console.log('baseDir', baseDir);
    // console.log('projectDir', projectDir);
    // console.log('options', options);
  });

program
  .command('local')
  .description('serve a bitsy ui locally')
  .action((options) => {
    console.log('attempting to serve locally');
    create(baseDir, options);
  });

program.parse(process.argv);
