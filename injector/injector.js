const domInfo = require('./dominfo/dominfo.js');
const imageInfo = require('./imageinfo/imageInfo.js');



module.exports = {
    injectors: [
        domInfo,
        imageInfo
    ]
}