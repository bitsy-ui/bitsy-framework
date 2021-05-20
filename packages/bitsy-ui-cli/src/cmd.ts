#!/usr/bin/env node

import process from 'process';
import program from 'commander';
import getBitsyConfig from '@bitsy-ui/config/lib/getBitsyConfig';
import ServeAndWatchBitsyUICommand from './Commands/ServeAndWatchBitsyUICommand';
import BuildBitsyUICommand from './Commands/BuildBitsyUICommand';
import BuildAndWatchBitsyUICommand from './Commands/BuildAndWatchBitsyUICommand';

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
    if (options.watch) BuildAndWatchBitsyUICommand(config, options);
    else BuildBitsyUICommand(config, options);
  });

program
  .command('local')
  .description('serve a bitsy ui locally')
  .option('-p, --production', 'builds bitsy ui in production mode')
  .option('-d, --development', 'builds bitsy ui in development mode')
  .action((options) => {
    BuildBitsyUICommand(config, options);
    ServeAndWatchBitsyUICommand(config, options);
    BuildAndWatchBitsyUICommand(config, options);
  });

program.parse(process.argv);
