const idevicekit = require('idevicekit');
const fs = require('fs');

let screenshot = (serial, resultFilePath) => {
    return idevicekit.screencap(serial).then((screenshotStream) => {
        screenshotStream.pipe(fs.createWriteStream(resultFilePath));
    });
}

module.exports = {
    screenshot: screenshot
}