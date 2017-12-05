// response sample
// { requestId: '0.1286',
// frameId: '0.2',
// loaderId: '0.45',
// timestamp: 0.9823356666602194,
// type: 'Image',
// response:
//  { url: 'https://assets-cdn.github.com/images/modules/site/logos/walmart-logo.png',
//    status: 200,
//    statusText: 'OK',
//    headers:
//     { 'Content-Type': 'image/png',
//       Age: '22818543',
//       Date: 'Thu, 23 Nov 2017 02:49:01 GMT',
//       'Last-Modified': 'Sat, 04 Mar 2017 00:08:18 GMT',
//       'Timing-Allow-Origin': 'https://github.com',
//       Server: 'GitHub.com',
//       'Content-Length': '19351',
//       Expires: 'Sun, 04 Mar 2018 00:19:58 GMT',
//       Connection: 'keep-alive',
//       'Accept-Ranges': 'bytes',
//       Vary: 'Accept-Encoding',
//       Via: '1.1 varnish',
//       'Cache-Control': 'max-age=31536000, public',
//       'X-Fastly-Request-ID': 'f9319f4a62c396f0b6e622fe52e4c9c2703ec1b2',
//       'X-Cache-Hits': '8636',
//       'X-GitHub-Request-Id': '895A:2ECF:56513:5799A:58BA082E',
//       'X-Timer': 'S1511405341.303636,VS0,VE0',
//       'X-Cache': 'HIT',
//       'X-Served-By': 'cache-hkg17928-HKG' },
//    mimeType: 'image/png',
//    source: 'memory-cache' } }

//    { requestId: '0.1292',
//    frameId: '0.2',
//    loaderId: '0.45',
//    timestamp: 3.9140115000191145,
//    type: 'XHR',
//    response:
//     { url: 'https://api.github.com/_private/browser/stats',
//       status: 200,
//       statusText: 'OK',
//       headers:
//        { Vary: 'Accept-Encoding',
//          'Content-Type': 'application/json; charset=utf-8',
//          Date: 'Thu, 30 Nov 2017 07:55:01 GMT',
//          'Cache-Control': 'no-cache',
//          'X-Frame-Options': 'deny',
//          Server: 'GitHub.com',
//          'Access-Control-Expose-Headers': 'ETag, Link, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
//          'X-Content-Type-Options': 'nosniff',
//          'X-XSS-Protection': '1; mode=block',
//          'Content-Length': '5',
//          'Content-Security-Policy': 'default-src \'none\'',
//          'Access-Control-Allow-Origin': '*',
//          Status: '200 OK',
//          'Strict-Transport-Security': 'max-age=31536000; includeSubdomains; preload',
//          'X-GitHub-Request-Id': 'D7CE:28F52:142A3D3:19E9978:5A1FB954',
//          'X-GitHub-Media-Type': 'github.v3; format=json',
//          'X-Runtime-rack': '0.025699' },
//       mimeType: 'application/json',
//       source: 'network',
//       timing:
//        { startTime: 2.503743833338376,
//          domainLookupStart: 360.5179786682129,
//          domainLookupEnd: 364.5179867744446,
//          connectStart: 365.5179738998413,
//          connectEnd: 759.5179677009583,
//          secureConnectionStart: 540.5179858207703,
//          requestStart: 760.3520154953003,
//          responseStart: 1370.8719611167908 } } }


let handle = (response) => {
    let result = {
        requestId: response.requestId,
        url: response.response.url,
        status: response.response.status,
        mimeType: response.response.mimeType,
        source: response.response.source,
        size: response.response.headers['Content-Length']
    }

    if (result.source === 'network') {
        result.timing = response.response.timing;
    }
    return result;
};

module.exports = {
    handle: handle
}