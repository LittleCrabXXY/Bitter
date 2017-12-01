const fs = require('fs');
const path = require('path');

let script = fs.readFileSync(path.join(__dirname, './performance.js'));
let expression = String.fromCharCode.apply(null, script);


let handler = (result) => {
    // console.log(`memory is ${result.memory}`);
    // console.log(`timing is ${result.timing}`);
    console.log(`performance is ${result.result.value}`);
}

module.exports = {
    expression: expression,
    handler: handler
}