// request samples

// dom request 
// { requestId: '0.1046',
// frameId: '0.2',
// loaderId: '0.35',
// documentURL: 'https://github.com/',
// request:
//  { url: 'https://github.com/',
//    method: 'GET',
//    headers:
//     { Referer: 'https://github.com/',
//       Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
//       'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1' } },
// timestamp: 0.030867833353113383,
// initiator: { type: 'other' },
// type: 'Document' }

// css request
// { requestId: '0.1047',
// frameId: '0.2',
// loaderId: '0.35',
// documentURL: 'https://github.com/',
// request:
//  { url: 'https://assets-cdn.github.com/assets/frameworks-c9193575f18b28be82c0a963e144ff6fa7a809dd8ae003a1d1e5979bed3f7f00.css',
//    method: 'GET',
//    headers: {} },
// timestamp: 0.8720122916856781,
// initiator: { type: 'parser', url: 'https://github.com/', lineNumber: 21 },
// type: 'Stylesheet' }

// image request
// { requestId: '0.1050',
// frameId: '0.2',
// loaderId: '0.35',
// documentURL: 'https://github.com/',
// request:
//  { url: 'https://assets-cdn.github.com/images/modules/site/home-illo-team.svg',
//    method: 'GET',
//    headers: {} },
// timestamp: 0.9045066250255331,
// initiator: { type: 'parser', url: 'https://github.com/', lineNumber: 288 },
// type: 'Image' }

// script request
// { requestId: '0.1081',
// frameId: '0.2',
// loaderId: '0.35',
// documentURL: 'https://github.com/',
// request:
//  { url: 'https://assets-cdn.github.com/assets/frameworks-47b737794a7ae33931d1a50a8070fc47204c413c42458a9781430b1de038e39d.js',
//    method: 'GET',
//    headers: {} },
// timestamp: 1.0280342916958034,
// initiator: { type: 'parser', url: 'https://github.com/', lineNumber: 750 },
// type: 'Script' }

// xml request
// { requestId: '0.1084',
// frameId: '0.2',
// loaderId: '0.35',
// documentURL: 'https://github.com/',
// request:
//  { url: 'https://www.google-analytics.com/collect',
//    method: 'POST',
//    headers:
//     { Referer: 'https://github.com/',
//       'Content-Type': 'text/plain',
//       Origin: 'https://github.com',
//       'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
//       Accept: '*/*' },
//    postData: 'v=1&_v=j48&a=451799410&t=pageview&_s=1&dl=https%3A%2F%2Fgithub.com%2F&ul=zh-cn&de=UTF-8&dt=The%20world\'s%20leading%20software%20development%20platform%20%C2%B7%20GitHub&sd=32-bit&sr=375x667&vp=375x553&je=0&fl=6.0%20r21&_u=SCCAAEABM~&jid=&cid=1357934631.1511405342&tid=UA-3769691-2&cd1=Logged%20Out&cd3=desktop&z=1181156168' },
// timestamp: 1.5059017916792072,
// initiator: { type: 'script', stackTrace: [ [Object], [Object], [Object] ] },
// type: 'XHR' }

let handle = (request) => {
    result = {
        id: request.requestId,
        url: request.request.url,
        type: request.type,
        timestamp: request.timestamp
    }

    return result;
};

module.exports = {
    handle: handle
}