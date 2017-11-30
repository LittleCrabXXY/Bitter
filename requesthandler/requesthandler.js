const extend = require('extend');

const basehandler = require('./base.js');

const requesthandlers = [basehandler];

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