
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
/* Mannequins */
handle["/actuators/leds16"] = handlers.coap("coap://10.1.1.16/leds");
handle["/actuators/leds17"] = handlers.coap("coap://10.1.1.17/leds");
handle["/actuators/leds18"] = handlers.coap("coap://10.1.1.18/leds");
/* Shelves (RGB, CWC) */
handle["/actuators/leds32"] = handlers.coap("coap://10.1.1.32/leds");
handle["/actuators/leds33"] = handlers.coap("coap://10.1.1.33/leds");
handle["/actuators/leds34"] = handlers.coap("coap://10.1.1.34/leds");
handle["/actuators/leds35"] = handlers.coap("coap://10.1.1.35/leds");
handle["/actuators/leds36"] = handlers.coap("coap://10.1.1.36/leds");
handle["/actuators/leds37"] = handlers.coap("coap://10.1.1.37/leds");
handle["/actuators/leds38"] = handlers.coap("coap://10.1.1.38/leds");
handle["/actuators/leds39"] = handlers.coap("coap://10.1.1.39/leds");
handle["/actuators/leds40"] = handlers.coap("coap://10.1.1.40/leds");
handle["/actuators/leds41"] = handlers.coap("coap://10.1.1.41/leds");
handle["/actuators/leds42"] = handlers.coap("coap://10.1.1.42/leds");
handle["/actuators/leds43"] = handlers.coap("coap://10.1.1.43/leds");

/* Commands */
handle["/commands/start"] = handlers.commands("start");
handle["/commands/stop"] = handlers.commands("stop");
handle["/commands/off"] = handlers.commands("off");

server.start(router.route, handle);
