var fs = require('fs');

function file(filename) {
    return function (method, query, response, postData) {
        console.log("Request handler 'file' was called.");
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.createReadStream(filename).pipe(response);
    }
}

var coapOjb = require('coap');
var url = require('url');

function coap(urlbase) {
    return function (method, query, response, postData) {
        var parsed_url = url.parse(urlbase);
        console.log("Request handler 'coap' was called: hostname=" + parsed_url.hostname + ", method=" + method + ", query=" + query + ", postData=" + postData);

        var coapMsg = {method: "put", hostname:parsed_url.hostname, pathname:"leds", confirmable:"true"}
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

var intervalObj;
var paths = [ "10.1.1.16", /* Mannequins */
              "10.1.1.17",
              "10.1.1.18",
              "10.1.1.32", /* Shelves */
              "10.1.1.33",
              "10.1.1.34",
              "10.1.1.35",
              "10.1.1.36",
              "10.1.1.37",
              "10.1.1.38",
              "10.1.1.39",
              "10.1.1.40",
              "10.1.1.41",
              "10.1.1.42",
              "10.1.1.43"];

var rgbLeds = {
                "ahto-s-rgb"        : "10.1.1.38",
                "ahto-m-rgb"        : "10.1.1.33",
                "ahto-l-rgb"        : "10.1.1.34",
                "vallila-s-rgb"     : "10.1.1.42",
                "vallila-m-rgb"     : "10.1.1.40",
                "vallila-l-rgb"     : "10.1.1.36",
                "mannequin-ahto"    : "10.1.1.16",
                "mannequin-vallila" : "10.1.1.17",
                "mannequin-rokka"   : "10.1.1.18"
              };
var whiteLeds = {
                  "ahto-s-w"          : "10.1.1.39",
                  "ahto-m-w"          : "10.1.1.32",
                  "ahto-l-w"          : "10.1.1.35",
                  "vallila-s-w"       : "10.1.1.43",
                  "vallila-m-w"       : "10.1.1.41",
                  "vallila-l-w"       : "10.1.1.37"
                };

function commands(comm) {
    return function (method, query, response, postData) {
        console.log("Request handler 'commands' was called: command=" + comm);

        if (comm === 'start') {
          console.log("set interval");
          clearInterval(intervalObj);
          /* An interval of 100ms seems to work fine when sending
           * messages to all the nodes (15)
           */
          intervalObj = setInterval(interval_callback, 100);
        }
        if (comm === 'stop') {
          console.log("clear interval");
          clearInterval(intervalObj);
        }
        if (comm === 'off') {
          console.log("all leds off");
          clearInterval(intervalObj);
          for (var i=0; i < paths.length; i++) {
            var coapMsg = {method: "put", hostname:paths[i], pathname:"leds", confirmable:"true"}
            var request = coapOjb.request(coapMsg);
            var buf = new Buffer(3);
            buf.writeUInt8(0, 0);
            buf.writeUInt8(0, 1);
            buf.writeUInt8(0, 2);
            request.write(buf);
            request.on('response', function(res) {
              if (res.code === "2.04" || "2.05") {
                /* Success */
              } else {
                /* Failure */
              }
            })
            request.end();
          }
        }
        if (comm === 'shelveson') {
          console.log("all white leds to shadow elimination value");
          clearInterval(intervalObj);
          for (var i=0; i < Object.keys(whiteLeds).length; i++) {
            var idle_intensity = 100;
            var path = whiteLeds[Object.keys(whiteLeds)[i]];
            var coapMsg = {method: "put", hostname:path, pathname:"leds", confirmable:"true"}
            console.log(coapMsg);
            var request = coapOjb.request(coapMsg);
            var buf = new Buffer(3);
            buf.writeUInt8(idle_intensity, 0);
            buf.writeUInt8(idle_intensity, 1);
            buf.writeUInt8(idle_intensity, 2);
            request.write(buf);
            request.end();
          }
        }
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Command '" + comm +"' processed succesfully");
        response.end();

    }
}

function highlight(element_string) {
}

function lowlight(element_string) {
}

function interval_callback() {
  var s = require("./static");
  var a;
  s.increase(function (nn) {a = nn});
  for (var i=0; i < paths.length; i++) {
    var coapMsg = {method: "put", hostname:paths[i], pathname:"leds", confirmable:"false"}
    var request = coapOjb.request(coapMsg);
    var buf = new Buffer(3);
    buf.writeUInt8(a, 0);
    buf.writeUInt8(a, 1);
    buf.writeUInt8(a, 2);
    request.write(buf);
    request.end();

  }
  console.log("count:" + a);
}

exports.file = file;
exports.coap = coap;
exports.commands = commands;
exports.highlight = highlight;
exports.lowlight = lowlight;
