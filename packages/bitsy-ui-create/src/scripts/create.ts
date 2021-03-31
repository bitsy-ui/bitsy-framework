import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import spawn from 'cross-spawn';
import inquirer from 'inquirer';
import * as process from 'process';

const create = (baseDir, options) =>
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'What is the bitsy ui name?',
        default: 'myBitsyUI',
      },
      {
        type: 'input',
        name: 'template',
        message: 'What type of bitsy ui would you like?',
        default: 'standard',
      },
    ])
    .then((answers) => {
      // Determine the bitsy ui template path
      // This will be relative to the create-bitsy-ui lib
      const templatePath = path.resolve(baseDir, '../templates', answers.template);
      // Determine the destination path of the new bitsy ui
      // This will be relative to where this script was called AND the provided path
      const destinationPath = path.resolve(process.cwd(), options.path);
      // Attempt to create the new folder
      // We will copy the template files into this
      // @TODO this is a node 10+ feature.. should we support earlier versions?
      fs.copySync(templatePath, destinationPath);

      const child = spawn('yarn', ['--cwd', destinationPath], { stdio: 'inherit' });

      // Recursively create the new app
      // console.log('relativePath', templatePath, destinationPath);
    });

export default create;
