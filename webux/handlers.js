var fs = require('fs');
var dali = require('dali-lib');


function file(filename) {
    return function (method, query, response, postData) {
        console.log("Request handler 'file' was called.");
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.createReadStream(filename).pipe(response);
    }
}

var tim = require('./time');
function time() {
    return function (method, query, response, postData) {
        console.log("Request handler 'time' was called.");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(tim.get_time_string());
        response.end();
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
            send_coap_rgb(paths[i], 0, 0, 0);
          }
        }
        if (comm === 'shelveson') {
          console.log("all white leds to shadow elimination value");
          clearInterval(intervalObj);
          for (var i=0; i < Object.keys(whiteLeds).length; i++) {
            var idle_intensity = 100;
            var path = whiteLeds[Object.keys(whiteLeds)[i]];
            send_coap_rgb(path, idle_intensity, idle_intensity, idle_intensity);
          }
        }
        if (comm === 'all') {
          console.log("all RGB and CWC leds to specified value");
          /* Stop any ongoing activity */
          clearInterval(intervalObj);

          var querystring = require('querystring');
          var parsed;
          if (method === 'post') {
            parsed = querystring.parse(postData);
          }
          else if (method === 'get') {
            parsed = querystring.parse(query.substr(1));
          }
          else {
            parsed = querystring.parse("r=0&g=0&b=0&w=0");
            console.log("Method unsupported, using zero values");
          }

          for (var i=0; i < Object.keys(rgbLeds).length; i++) {
            var path = rgbLeds[Object.keys(rgbLeds)[i]];
            send_coap_rgb(path, parsed.r, parsed.g, parsed.b);
          }

          for (var i=0; i < Object.keys(whiteLeds).length; i++) {
            var path = whiteLeds[Object.keys(whiteLeds)[i]];
            send_coap_rgb(path, parsed.w, parsed.w, parsed.w);
          }

        }
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Command '" + comm +"' processed succesfully");
        response.end();

    }
}

var intervalObjs = {
  "shelves/Ahto-S"        : new Object(),
  "shelves/Ahto-M"        : new Object(),
  "shelves/Ahto-L"        : new Object(),
  "shelves/Vallila-S"     : new Object(),
  "shelves/Vallila-M"     : new Object(),
  "shelves/Vallila-L"     : new Object(),
  "mannequins/Ahto"       : new Object(),
  "mannequins/Vallila"    : new Object(),
  "mannequins/Rokka"      : new Object(),
};

var shelves_list = {
  "shelves/Ahto-S"    : new Object(),
  "shelves/Ahto-M"    : new Object(),
  "shelves/Ahto-L"    : new Object(),
  "shelves/Vallila-S" : new Object(),
  "shelves/Vallila-M" : new Object(),
  "shelves/Vallila-L" : new Object(),
};

function light(element_string, target_state) {
  return function (method, query, response, postData) {
    var s = require("./static");
    var state;
    s.getState(element_string, function (nn) {state = nn});

    if (state.current == target_state) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(target_state + "light element '" + element_string +"' already in desired state");
      response.end();
      return;
    }
    if (state.target == target_state) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(target_state + "light element '" + element_string +"' already toward desired state");
      response.end();
      return;
    }
    /* Temporal implementation, without fading.
     */

    if (target_state == "high" &&
      shelves_list[element_string] != 'undefined') {
      // search for any shelf with current or target state
      var all_states;
      s.getAll(function (nn) {all_states = nn});
      for (var i= 0; i< Object.keys(shelves_list).length; i++) {
        var temp_state = all_states[Object.keys(shelves_list)[i]];
        if (temp_state.current == "high" || temp_state.target == "high") {
          // switch to low state in temprary implementation
          set_state(temp_state, "steady");
          temp_state.current = "low";
          temp_state.target = "low";
        }
      }
    }


    state.current = target_state;
    state.target = target_state;

    var level;
    if (target_state == "low") {
      level = "steady";
    }
    else {
      level = "active";
    }
    set_state(state, level);
    /* Temporal Implementation End */
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(target_state + "light element '" + element_string +"' successful");
    response.end();

  }
}

function init() {
  return function (method, query, response, postData) {
    var s = require("./static");
    var all_states;
    s.getAll(function (nn) {all_states = nn});
    for (var i= 0; i< Object.keys(all_states).length; i++) {
      var temp_state = all_states[Object.keys(all_states)[i]];
        set_state(temp_state, "steady");
        temp_state.current = "low";
        temp_state.target = "low";
    }
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("System initalised to steady state successfully");
    response.end();

  }
}

function set_state(state, level) {
  var led_r = state[level].r;
  var led_g = state[level].g;
  var led_b = state[level].b;
  send_coap_rgb(state.address_rgb, led_r, led_g, led_b);
  if (state.white_available == "yes") {
    var led_c1 = state[level].c1;
    var led_w  = state[level].w;
    var led_c2 = state[level].c2;
    send_coap_rgb(state.address_w, led_c1, led_w, led_c2);
  }

}

function send_coap_rgb(address, r, g, b) {
  var coapMsg = {method: "put", hostname:address, pathname:"leds", confirmable:"false"}
  var request = coapOjb.request(coapMsg);
  var buf = new Buffer(3);
  buf.writeUInt8(r, 0);
  buf.writeUInt8(g, 1);
  buf.writeUInt8(b, 2);
  request.write(buf);
  request.end();
}

function interval_callback() {
  var s = require("./static");
  var a;
  s.increase(function (nn) {a = nn});
  for (var i=0; i < paths.length; i++) {
    send_coap_rgb(paths[i], a, a, a);
  }
  console.log("count:" + a);
}

exports.file = file;
exports.time = time;
exports.coap = coap;
exports.commands = commands;
exports.light = light;
exports.init = init;
