
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const meta = require('./meta');

const type = argv.env;
console.log(chalk.green(`npm-script >>  ${type} `),' -- ',chalk.gray(meta[type]));


