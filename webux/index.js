
var server   = require("./server");
var router   = require("./router");
var handlers = require("./handlers");

var ip = "192.168.2.100"

var handle = {}

handle["/"]               = handlers.file("demo.html");
handle["/index.html"]     = handlers.file("demo.html");
handle["/lock.html"]      = handlers.file("lock.html");
handle["/demo.png"]       = handlers.file("demo.png");
handle["/lock_open.png"]  = handlers.file("lock_open.png");
handle["/lock_closed.png"]= handlers.file("lock_closed.png");
handle["/actuators/leds"] = handlers.coap("coap://" + ip + "/actuators/leds");
handle["/actuators/lock"] = handlers.coap("coap://" + ip + "/actuators/lock");

server.start(router.route, handle);
