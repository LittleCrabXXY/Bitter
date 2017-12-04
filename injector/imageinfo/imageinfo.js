const fs = require('fs');
const path = require('path');

let script = fs.readFileSync(path.join(__dirname, './image.js'));
let expression = String.fromCharCode.apply(null, script);

let handler = (result) => {
    console.log(`result is ${result.result.value}`);
    return result.result.value.split('#');
}

module.exports = {
    name: 'image',
    expression: expression,
    handler: handler
}