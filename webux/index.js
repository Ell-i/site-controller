
var server   = require("./server");
var router   = require("./router");
var handlers = require("./handlers");

var ip = "192.168.2.100"

var handle = {}

handle["/"]               = handlers.file("demo.html");
handle["/index.html"]     = handlers.file("demo.html");
handle["/demo.png"]       = handlers.file("demo.png");
handle["/actuators/leds"] = handlers.coap("coap://" + ip + "/actuators/leds");

server.start(router.route, handle);
