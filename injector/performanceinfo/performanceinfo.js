const fs = require('fs');
const path = require('path');

let script = fs.readFileSync(path.join(__dirname, './performance.js'));
let expression = String.fromCharCode.apply(null, script);


let handler = (result) => {
    console.log(`performance is ${result.result.value}`);
    return JSON.parse(result.result.value);

}

module.exports = {
    name: 'performance',
    expression: expression,
    handler: handler
}