#!/usr/bin/env node

import process from 'process';
import program from 'commander';
import getBitsyConfig from '@bitsy-ui/config/lib/getBitsyConfig';
import doBuildBootstrap from './Helpers/doBuildBootstrap';
import doBuildAndWatchAPI from './Helpers/doBuildAndWatchAPI';
import doBuildAndWatchUI from './Helpers/doBuildAndWatchUI';
import doBuildAPI from './Helpers/doBuildAPI';
import doBuildUI from './Helpers/doBuildUI';
import doServeAPI from './Helpers/doServeAPI';

// MICRO FRONTEND CONFIG
// Determine the location of the bitsyui config
const config = getBitsyConfig();

program
  .command('build')
  .description('builds a bitsy ui')
  .option('-p, --production', 'builds bitsy ui in production mode')
  .option('-d, --development', 'builds bitsy ui in development mode')
  .action((options) => {
    // First build the assets as is
    doBuildBootstrap(config, options);
    // Attempt to build the API assets
    doBuildAPI(config, options);
    // Attempt to build the UI assets
    doBuildUI(config, options);
  });

program
  .command('local')
  .description('serve a bitsy ui locally')
  .option('-p, --production', 'builds bitsy ui in production mode')
  .option('-d, --development', 'builds bitsy ui in development mode')
  .action((options) => {
    // First build the assets as is
    doBuildBootstrap(config, options);
    // Next start the local service
    doBuildAndWatchAPI(config, options);
    // Next, if things change then execute UI updates
    doBuildAndWatchUI(config, options);
  });

program
  .command('serve')
  .description('serve a bitsy ui locally')
  .option('-p, --production', 'builds bitsy ui in production mode')
  .option('-d, --development', 'builds bitsy ui in development mode')
  .action((options) => {
    doServeAPI(config, options);
  });

program.parse(process.argv);
