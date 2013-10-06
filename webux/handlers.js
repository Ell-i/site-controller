var fs = require('fs');

function file(filename) {
    return function (method, response, postData) {
        console.log("Request handler 'file' was called.");
        response.writeHead(200, {"Content-Type": "text/html"}); 
        fs.createReadStream(filename).pipe(response);
    }
}
    
function coap(method, response, postData){
    console.log("Request handler 'coap' was called."); 
    response.writeHead(200, {"Content-Type": "text/plain"}); 
    response.write("Hello coap");
    response.end();
}

exports.file = file; 
exports.coap = coap;
