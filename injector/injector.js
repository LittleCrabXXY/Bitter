const domInfo = require('./dominfo/dominfo.js');
const imageInfo = require('./imageinfo/imageInfo.js');
const perfInfo = require('./performanceinfo/performanceinfo.js');

module.exports = {
    injectors: [
        domInfo,
        imageInfo,
        perfInfo
    ]
}