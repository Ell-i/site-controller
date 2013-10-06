
var server   = require("./server");
var router   = require("./router");
var handlers = require("./handlers");

var handle = {}

handle["/"]               = handlers.file("demo.html");
handle["/index.html"]     = handlers.file("demo.html");
handle["/demo.png"]       = handlers.file("demo.png");
handle["/actuators/leds"] = handlers.coap;

server.start(router.route, handle);
