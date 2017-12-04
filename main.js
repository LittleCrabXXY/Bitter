#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');
const CDP = require('chrome-remote-interface');

const injector = require('./injector/injector.js');
const requestAnalysers = require('./requesthandler/requesthandler.js');
const responseAnalysers = require('./responsehandler/responsehandler.js');

const options = {
    chooseTab: process.argv[3],
    local: true
}

// 从injector中获取需要启用的injector
const injectors = injector.injectors;

let injectorResult = {}

// 初始化eventEmitter用于处理request和response
let event = new EventEmitter();
let requestResult = [];
let responseResult = [];
event.on('request_new', function(result) {
    requestResult.push(result);
    fs.writeFileSync(path.join(process.argv[4], 'request.json'), JSON.stringify(requestResult));
});
event.on('response_new', function(result) {
    responseResult.push(result);
    fs.writeFileSync(path.join(process.argv[4], 'response.json'), JSON.stringify(responseResult));
})

let requestHandler = params => {
    let result = requestAnalysers.handle(params);
    console.log(result);
    event.emit('request_new', result);
};

let responseHandler = params => {
    let result = responseAnalysers.handle(params);
    console.log(result);
    event.emit('response_new', result);
};

CDP(options, (client) => {
    const {Runtime, Network, Page} = client;
    let events = [];

    // wrap injector to a promise
    let wrapper = function(injector) {
        return new Promise((resolve, reject) => {
            Runtime.evaluate({
                expression: injector.expression
            }).then(result => {
                injectorResult[injector.name] = injector.handler(result);
                resolve(result);
            }).catch(error => {
                console.error(`injector ${injector.name} error, the message is ${error}`);
                reject(error);
            });
        });
    };

    injectors.forEach(injector => {
        events += wrapper(injector);
    });

    Network.requestWillBeSent(params => {
        // request拦截请求
        requestHandler(params);
    });

    Network.responseReceived(params => {
        // resposne 拦截请求
        responseHandler(params);
    });

    Page.loadEventFired((timestamp) => {
        console.log(`dom load ready, time is ${timestamp.timestamp}`);
    });

    Page.domContentEventFired((timestamp) => {
        console.log(`dom content event ready, time is ${timestamp.timestamp}`);
    });

    Promise.all([
        Network.enable(),
        Page.enable()
    ]).then(() => {
        // 访问指定url
        Page.navigate({
            url: process.argv[2]
        })
    }).then(() => {
        Promise.all(events).then(() => {
            console.log('inject js success');
            fs.writeFileSync(path.join(process.argv[4], 'injector.json'), JSON.stringify(injectorResult));
        }).catch(error => {
            console.error(`injector execute fail, error is ${error}`);
        });
    }
    ).then(() => {
        // client.close();
    }).catch((err) => {
        console.error(err);
        client.close();
    });
});





