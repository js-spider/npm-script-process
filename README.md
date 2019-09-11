# npm-script-process
#### show npm script lifecycle event 

### install
```
npm install @js-spider/npm-script-process

```

### use

```
 $ mkdir newProject && cd newProject && npm init -y
 
 $ npm install @js-spider/npm-script-process
 
 $ ns install xxx  or npmscript install xxx

```

### exampless

```
$ ns install

当前执行的操作：npm install ，触发相关操作如下 ：

    stdout:  npm-script >>  preinstall         Run BEFORE the package is installed

 ✔  stdout:  npm-script >>  install            Run AFTER the package is installed.

    stdout:  npm-script >>  postinstall        Run AFTER the package is installed.

    stdout:  npm-script >>  prepublish         Run BEFORE the package is packed and published, as well as on local npm install without any arguments.

    stdout:  npm-script >>  prepare            Run both BEFORE the package is packed and published, on local npm install without any arguments,and when installing git dependencies.This is run AFTER prepublish,but BEFORE prepublishOnly

    stdout:  npm-script >>  preshrinkwrap      Run by the npm shrinkwrap command.

    stdout:  npm-script >>  shrinkwrap         Run by the npm shrinkwrap command. // 锁定发布的版本 : https://docs.npmjs.com/cli/shrinkwrap.html

    stdout:  npm-script >>  postshrinkwrap     Run by the npm shrinkwrap command.

子进程退出，退出码 0

```
