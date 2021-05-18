#!/usr/bin/env node

import program from 'commander';
import create from './scripts/create';

const baseDir = __dirname;

program
  .command('create')
  .description('create a new bitsy ui')
  .option('-p, --path <path>', 'path to clone')
  .action((options) => {
    create(baseDir, options);
  });

program.parse(process.argv);
