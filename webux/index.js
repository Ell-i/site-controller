
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

/* Shelves with logical names */
handle["/shelves/ahto-s-rgb"]    = handlers.coap("coap://10.1.1.38/leds");
handle["/shelves/ahto-s-w"]      = handlers.coap("coap://10.1.1.39/leds");
handle["/shelves/ahto-m-rgb"]    = handlers.coap("coap://10.1.1.33/leds");
handle["/shelves/ahto-m-w"]      = handlers.coap("coap://10.1.1.32/leds");
handle["/shelves/ahto-l-rgb"]    = handlers.coap("coap://10.1.1.34/leds");
handle["/shelves/ahto-l-w"]      = handlers.coap("coap://10.1.1.35/leds");
handle["/shelves/vallila-s-rgb"] = handlers.coap("coap://10.1.1.42/leds");
handle["/shelves/vallila-s-w"]   = handlers.coap("coap://10.1.1.43/leds");
handle["/shelves/vallila-m-rgb"] = handlers.coap("coap://10.1.1.40/leds");
handle["/shelves/vallila-m-w"]   = handlers.coap("coap://10.1.1.41/leds");
handle["/shelves/vallila-l-rgb"] = handlers.coap("coap://10.1.1.36/leds");
handle["/shelves/vallila-l-w"]   = handlers.coap("coap://10.1.1.37/leds");

/* Mannequins with logical names */
handle["/mannequins/ahto"]       = handlers.coap("coap://10.1.1.16/leds");
handle["/mannequins/vallila"]    = handlers.coap("coap://10.1.1.17/leds");
handle["/mannequins/rokka"]      = handlers.coap("coap://10.1.1.18/leds");


/* Commands */
handle["/commands/start"] = handlers.commands("start");
handle["/commands/stop"] = handlers.commands("stop");
handle["/commands/off"] = handlers.commands("off");
handle["/commands/shelves/on"] = handlers.commands("shelveson");

/* Highlight */
handle["highlight/shelves/Ahto-S"]    = handlers.highlight("shelves/Ahto-S");
handle["highlight/shelves/Ahto-M"]    = handlers.highlight("shelves/Ahto-M");
handle["highlight/shelves/Ahto-L"]    = handlers.highlight("shelves/Ahto-L");
handle["highlight/shelves/Vallila-S"] = handlers.highlight("shelves/Vallila-S");
handle["highlight/shelves/Vallila-M"] = handlers.highlight("shelves/Vallila-M");
handle["highlight/shelves/Vallila-L"] = handlers.highlight("shelves/Vallila-L");
handle["highlight/mannequins/Ahto"]       = handlers.highlight("mannequins/Ahto");
handle["highlight/mannequins/Vallila"]    = handlers.highlight("mannequins/Vallila");
handle["highlight/mannequins/Rokka"]      = handlers.highlight("mannequins/Rokka");

/* Lowlight */
handle["lowlight/shelves/Ahto-S"]    = handlers.lowlight("shelves/Ahto-S");
handle["lowlight/shelves/Ahto-M"]    = handlers.lowlight("shelves/Ahto-M");
handle["lowlight/shelves/Ahto-L"]    = handlers.lowlight("shelves/Ahto-L");
handle["lowlight/shelves/Vallila-S"] = handlers.lowlight("shelves/Vallila-S");
handle["lowlight/shelves/Vallila-M"] = handlers.lowlight("shelves/Vallila-M");
handle["lowlight/shelves/Vallila-L"] = handlers.lowlight("shelves/Vallila-L");
handle["lowlight/mannequins/Ahto"]       = handlers.lowlight("mannequins/Ahto");
handle["lowlight/mannequins/Vallila"]    = handlers.lowlight("mannequins/Vallila");
handle["lowlight/mannequins/Rokka"]      = handlers.lowlight("mannequins/Rokka");


server.start(router.route, handle);
