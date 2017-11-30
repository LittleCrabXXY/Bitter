const extend = require('extend');

const responseHandlers = [];


let handle = (response) => {
    let result = {}
    responseHandlers.forEach(handler => {
        extend(result, handler.handle(response));
    });
    return result;
}

module.exports = {
    handle: handle
};