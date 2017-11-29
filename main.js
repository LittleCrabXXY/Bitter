const CDP = require('chrome-remote-interface');
const injector = require('./injector/injector.js');


const options = {
    chooseTab: 'ws://localhost:9222/devtools/page/1',
    local: true
}

// 从injector中获取需要启用的injector
const injectors = [];


let requestHandler = params => {
    console.log(params);
};

let responseHandler = params => {
    console.log(params);
}

// wrap promise

CDP(options, (client) => {
    const {Runtime, Network, Page} = client;
    const events = [];

    Network.requestWillBeSent(params => {
        requestHandler(params);
    });

    Network.responseReceived(params => {
        responseHandler(params);
    });

    Page.loadEventFired(() => {

    });

    Promise.all([
        Network.enable(),
        Page.enable()
    ]).then(() => {
        Page.navigate({
            url: url
        })
    }).all([
        // 处理js注入请求
    ]).then(() => {
        client.close();
    }).catch((err) => {
        console.error(err);
        client.close();
    });

    var wrapper = function(expression, handler) {
        return new Promise((resolve, reject) => {
            Runtime.evaluate({
                expression: expression
            }).then(result => {
                handler(result);
                resolve(result);
            }).catch(error => {
                reject(error);
            });
        });
    };

})

// 将js注入请求封装成Promise





