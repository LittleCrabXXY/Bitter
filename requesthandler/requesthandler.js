const extend = require('extend');

const requesthandlers = [];


let handle = (request) => {
    let result = {}
    requesthandlers.forEach(handler => {
        extend(result, handler.handle(request));
    });
    return result;
}

module.exports = {
    handle: handle
};