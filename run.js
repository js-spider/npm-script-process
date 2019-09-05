
const path = require('path');
const chalk = require('chalk');
const minimist = require('minimist');
const resolve = require('resolve');
const { spawn } = require('child_process');


function space(str, len) {
    return new Array(Math.max(1, len - str.length)).join(' ');
}

class Npmscript{
    constructor(argv){
        this.env = argv.env;
        this.currentPath = argv.currentPath;
        this.npmscriptPath = null;
        this.packageName = '@js-spider/npm-script-process';
        this.errorMess = [];
    }
    run(){
        let ls = null;
        if(this.env.length<1){
            console.log(chalk.red(`params is required!`));
            return process.exit(1);
        }
        console.log('');
        if(Array.isArray(this.env) && this.env[0] === 'destory'){
            console.log(chalk.yellow(`当前执行的操作：npm uninstall ${this.packageName} ，触发相关操作如下 ：`));
            ls = spawn('npm',['uninstall',this.packageName],{cwd:this.currentPath})
            this.env[0] = 'uninstall'
        }else{
            const binPath = resolve.sync(this.packageName,{basedir:this.currentPath})
            this.npmscriptPath = path.dirname(binPath);
            ls = spawn('npm',[...this.env],{cwd:this.npmscriptPath})
            console.log(chalk.yellow(`当前执行的操作：npm ${this.env.join(' ')} ，触发相关操作如下 ：`));
        }
        console.log('');
        if(ls){
            ls.stdout.on('data', (data) => {
                data = data.toString();
                if(data && data.startsWith('npm-script')){
                    const arr = data.split('--');
                    const type = arr[0].split('>>')[1].trim();
                    const stdOut = type === this.env[0] ? ' ✔  stdout: ' : '    stdout: ';
                    console.log(stdOut,`${chalk.green(arr[0])}${space(type,15)}${chalk.gray(arr[1])}`);
                }
            });
            ls.stderr.on('data', (data) => {
                data.toString().startsWith('ERR!')&& this.errorMess.push(data)
            });
            ls.on('close', (code) => {
                console.log(`子进程退出，退出码 ${code}`);
                this.errorMess.forEach(item=>{
                    console.log(item.toString());
                })
            });
        }

    }
}

module.exports = function(argv){
    const env = minimist(argv)._;
    const currentPath = process.cwd();
    return new Npmscript({currentPath,env}).run();
}
