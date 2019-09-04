const writeJsonFile = require('write-json-file');
// const fs = require('fs-extra')
const meta = require('./src/meta');
const pkg = require('./package.json');
const scripts = pkg.scripts;

const getNodeScript = function(type){
    return `node ./src/npmscripts.js --env=${type}`
}

let sptsObj = {},item,nodeScript;

scripts && meta && Object.keys(meta).forEach(key=> {
    item = scripts[key];
    nodeScript = getNodeScript(key);
    if(!item || item.indexOf(nodeScript)<0){
        sptsObj[key] = item ? `${nodeScript} && ${item}` : nodeScript;
    }else{
        sptsObj[key] = item
    }
})

pkg.scripts = sptsObj;
// let j = JSON.stringify(pkg,undefined,4);
// fs.outputFile('./package.json',j)

writeJsonFile('./package.json', pkg);
