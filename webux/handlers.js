var fs = require('fs');

function file(filename) {
    return function (method, query, response, postData) {
        console.log("Request handler 'file' was called.");
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.createReadStream(filename).pipe(response);
    }
}

var coapOjb = require('coap');

function coap(urlbase) {
    return function (method, query, response, postData) {
        console.log("Request handler 'coap' was called: method=" + method + ", query=" + query + ", postData=" + postData);

        var coapMsg = {method: "put", hostname: "10.0.0.2", pathname:"leds", confirmable:"false"}
        var request = coapOjb.request(coapMsg);
        var querystring = require('querystring');
        var parsed;
        if (method === 'post') {
          parsed = querystring.parse(postData);
        }
        else if (method === 'get') {
          parsed = querystring.parse(query.substr(1));
        }
        else {
          parsed = querystring.parse("r=0&g=0&b=0");
          console.log("Method unsupported, using zero values");
        }
        var color_r = parsed.r;
        var color_g = parsed.g;
        var color_b = parsed.b;
        console.log("red: "+color_r+", green: "+color_g+", blue: "+color_b);
        var buf = new Buffer(3);
        buf.writeUInt8(parseInt(color_r), 0);
        buf.writeUInt8(parseInt(color_g), 1);
        buf.writeUInt8(parseInt(color_b), 2);
        request.write(buf);

        console.log(coapMsg);
        request.on('response', function(res) {
        console.log("Response code: " + res.code);
          if (res.code === "2.04" || "2.05") {
              console.log("OK:" + res.code);
              response.writeHead(200, {"Content-Type": "text/plain"});
              response.write("Nice coap");
              response.end();

          } else {
              console.log("FAIL:" + res.code);
              response.writeHead(200, {"Content-Type": "text/plain"});
              response.write("Nasty coap");
              response.end();
          }
          res.pipe(process.stdout)
        })
        request.end();

    }
}

exports.file = file;
exports.coap = coap;
