#!/usr/bin/env node

import open from 'open';
import path from 'path';
import process from 'process';
import program from 'commander';
import { spawnSync } from 'child_process';

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
    // Determine the location of the bitsyui config
    const configDefaultPathname = path.resolve(projectDir, 'bitsyui.default.config.js');
    // Load the bitsyui config file
    // This will always be located at the project root
    const config = require(configPathname);
    // BOOTSTRAP ASSETS BUILD
    const bootWebpack = path.resolve(projectDir, 'webpack', 'webpack.config.bootstrap.js');
    // Attempt to build the micro UI
    const bootBuild = spawnSync('npx', ['webpack', '--mode', 'development', '--config', bootWebpack], {
      encoding: 'utf8',
    });
    // UI ASSETS BUILD
    // @TODO delete any current folder
    // @TODO create the destination folder
    const uiWebpack = path.resolve(projectDir, 'webpack', 'webpack.config.ui.js');
    // Attempt to build the micro UI
    const uiBuild = spawnSync('npx', ['webpack', '--mode', 'development', '--config', uiWebpack], { encoding: 'utf8' });
    // API ASSETS BUILD
    // @TODO delete any current folder
    // @TODO create the destination folder
    const apiBuild = spawnSync(
      'npx',
      [
        'babel',
        'src',
        '--extensions',
        ['.ts', '.tsx', '.js', '.jsx'].join(','),
        '--config-file',
        path.resolve(projectDir, 'babel', 'babel.api.config.json'),
        '--out-dir',
        path.resolve(projectDir, '.api'),
      ],
      { encoding: 'utf8' },
    );
    //
    // OPEN WITHIN BROWSER
    // open('http://www.google.com');

    console.log('bootBuild', bootBuild);
    console.log('uiBuild', uiBuild);
    console.log('apiBuild', apiBuild);
  });

program
  .command('local')
  .description('serve a bitsy ui locally')
  .action((options) => {
    console.log('attempting to serve locally');
  });

program.parse(process.argv);
