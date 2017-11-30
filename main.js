const path = require('path');
const fs = require('fs');

const CDP = require('chrome-remote-interface');

const injector = require('./injector/injector.js');
const requestAnalysers = require('./requesthandler/requesthandler.js');
const responseAnalysers = require('./responsehandler/responsehandler.js');


const options = {
    chooseTab: 'ws://localhost:9222/devtools/page/1',
    local: true
}

// 从injector中获取需要启用的injector
const injectors = injector.injectors;


let dumpJson = (filename, content) => {
    let filepath = path.join(__dirname, filename);
    let fileContent = []
    if (fs.existsSync(filepath)) {
        fileContent = JSON.parse(fs.readFileSync(filepath));
    }
    fileContent += content;
    fs.writeFileSync(filepath, fileContent);
};

let requestHandler = params => {
    // console.log(params);
    let result = requestAnalysers.handle(params);
    console.log(result);
    // dumpJson('./request.json', result);
};

let responseHandler = params => {
    // console.log(params);
    let result = responseAnalysers.handle(params);
    console.log(result);
    // dumpJson('./response.json', result);
};

// wrap promise

CDP(options, (client) => {
    const {Runtime, Network, Page} = client;
    let events = [];
    let wrapper = function(injector) {
        return new Promise((resolve, reject) => {
            Runtime.evaluate({
                expression: injector.expression
            }).then(result => {
                injector.handler(result);
                resolve(result);
            }).catch(error => {
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

    Page.loadEventFired(() => {
        
    });

    Page.domContentEventFired((timestamp) => {
        console.log(`dom ready, time is ${timestamp}`);
    });

    Promise.all([
        Network.enable(),
        Page.enable()
    ]).then(() => {
        // 访问指定url
        Page.navigate({
            url: process.argv[2]
            // url: 'https://github.com'
        })
    }).then(() => {
        Promise.all(events).then(() => {
            console.log('inject js success')
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





