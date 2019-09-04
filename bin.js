#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const minimist = require('minimist');
const resolveBin = require('resolve-bin');
const { spawnSync } = require('child_process');

const argv = minimist(process.argv.slice(2));
const currentPath = process.cwd();

class Npmscript{
    constructor(argv){
        this.env = argv.env;
        this.currentPath = argv.currentPath;
        this.npmscriptPath = null;
        this.packageName = '@js-spider/npm-script-process';
        this.binName = 'npmscript';
    }
    run(){
        if(!this.env){
            console.log(chalk.red(`npmscript need params`));
            return process.exit(1);
        }
        if(Array.isArray(this.env) && this.env[0] === 'destory'){
            spawnSync('npm',['uninstall',this.packageName],{cwd:this.currentPath})
        }else{
            const binPath = resolveBin.sync(this.packageName,{executable:this.binName})
            this.npmscriptPath = path.dirName(binPath);
            console.log('this.npmscriptPath >> ', this.npmscriptPath);
            this.npmscriptPath && spawnSync('npm',[...this.env],{cwd:this.npmscriptPath})
        }
    }
}
new Npmscript({currentPath,env:argv._}).run();
