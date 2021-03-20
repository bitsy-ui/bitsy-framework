const { series, rimraf, mkdirp, concurrent } = require('nps-utils');

module.exports = {
  scripts: {
    default: 'nps build',
    build: {
      description: 'Builds components for deployment',
      default: "lerna run 'build:ts'",
    }
  }
};
