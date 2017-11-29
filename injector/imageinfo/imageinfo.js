const fs = require('fs');

let script = fs.readFileSync('image.js');
let expression = String.fromCharCode.apply(null, script);

let handler = (result) => {
    console.log(`result is ${result.result.value}`);
}

module.exports = {
    expression: expression,
    handler: handler 
}