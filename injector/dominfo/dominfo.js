
const fs = require('fs');
const path = require('path');

let script = fs.readFileSync(path.join(__dirname, './dom.js'));
let expression = String.fromCharCode.apply(null, script);

let handler = (result) => {
    console.log(`the dom info is ${result.result.value}`);
    return JSON.parse(result.result.value);
}

module.exports = {
    name: 'dom',
    expression: expression,
    handler: handler
}