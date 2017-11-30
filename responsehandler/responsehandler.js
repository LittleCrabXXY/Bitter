const extend = require('extend');

const basehandler = require('./base.js');

const responseHandlers = [basehandler];


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