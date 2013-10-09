
var server   = require("./server");
var router   = require("./router");
var handlers = require("./handlers");

var handle = {}

handle["/"]               = handlers.file("demo.html");
handle["/index.html"]     = handlers.file("demo.html");
handle["/lock.html"]      = handlers.file("lock.html");
handle["/demo.png"]       = handlers.file("demo.png");
handle["/lock_open.png"]  = handlers.file("lock_open.png");
handle["/lock_closed.png"]= handlers.file("lock_closed.png");
handle["/actuators/leds"] = handlers.coap("coap://10.0.0.2/actuators/leds");
handle["/actuators/lock"] = handlers.coap("coap://10.0.0.3/actuators/lock");

server.start(router.route, handle);
