
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
handle["/highlight/shelves/Ahto-S"]    = handlers.light("shelves/Ahto-S", "high");
handle["/highlight/shelves/Ahto-M"]    = handlers.light("shelves/Ahto-M", "high");
handle["/highlight/shelves/Ahto-L"]    = handlers.light("shelves/Ahto-L", "high");
handle["/highlight/shelves/Vallila-S"] = handlers.light("shelves/Vallila-S", "high");
handle["/highlight/shelves/Vallila-M"] = handlers.light("shelves/Vallila-M", "high");
handle["/highlight/shelves/Vallila-L"] = handlers.light("shelves/Vallila-L", "high");
handle["/highlight/mannequins/Ahto"]       = handlers.light("mannequins/Ahto", "high");
handle["/highlight/mannequins/Vallila"]    = handlers.light("mannequins/Vallila", "high");
handle["/highlight/mannequins/Rokka"]      = handlers.light("mannequins/Rokka", "high");

/* Lowlight */
handle["/lowlight/shelves/Ahto-S"]    = handlers.light("shelves/Ahto-S", "low");
handle["/lowlight/shelves/Ahto-M"]    = handlers.light("shelves/Ahto-M", "low");
handle["/lowlight/shelves/Ahto-L"]    = handlers.light("shelves/Ahto-L", "low");
handle["/lowlight/shelves/Vallila-S"] = handlers.light("shelves/Vallila-S", "low");
handle["/lowlight/shelves/Vallila-M"] = handlers.light("shelves/Vallila-M", "low");
handle["/lowlight/shelves/Vallila-L"] = handlers.light("shelves/Vallila-L", "low");
handle["/lowlight/mannequins/Ahto"]       = handlers.light("mannequins/Ahto", "low");
handle["/lowlight/mannequins/Vallila"]    = handlers.light("mannequins/Vallila", "low");
handle["/lowlight/mannequins/Rokka"]      = handlers.light("mannequins/Rokka", "low");


server.start(router.route, handle);
