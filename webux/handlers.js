var fs = require('fs');

function file(filename) {
    return function (method, query, response, postData) {
        console.log("Request handler 'file' was called.");
        response.writeHead(200, {"Content-Type": "text/html"}); 
        fs.createReadStream(filename).pipe(response);
    }
}

var h5coap = require('h5.coap');
var linkformat = require('h5.linkformat');

var client = new h5coap.Client();
    
function coap(urlbase) {
    return function (method, query, response, postData) {
        console.log("Request handler 'coap' was called: method=" + method + ", query=" + query);

        var request = client[method].apply(client, [urlbase + query, postData, {}]);

        request.on('response', function(resp) {
            if (resp.isSuccess()) {
                console.log("OK:" + linkformat.parse(resp.getPayload().toString()));
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write("Nice coap");
                response.end();
            } else {
                console.log("FAIL:" + resp.toPrettyString());
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write("Nasty coap");
                response.end();
            }
        });
    }
}

exports.file = file; 
exports.coap = coap;
