const idevicekit = require('idevicekit');
const fs = require('fs');
const sharp = require('sharp');

let screenshot = (serial, resultFilePath) => {
    return idevicekit.screencap(serial).then((screenshotStream) => {
        screenshotStream.pipe(fs.createWriteStream(resultFilePath));
    });
}

module.exports = {
    screenshot: screenshot
}