

let expression = 'document.documentElement.outerHTML';

let handler = (result) => {
    console.log(result.result.value);
}

module.exports = {
    expression: expression,
    handler: handler
}