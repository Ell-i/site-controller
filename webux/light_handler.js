// list of lights in the house: could be moved to a separate .json, for more elasticity
var lights = {
	night1 : {
		type: "night-lamp",
		located: "bedroom",
		state: 0
	},
	sad1 : {
		type: "sad-lamp",
		located: "bedroom",
		state: 0
	},
	sad2 : {
		type: "sad-lamp",
		locatedn: "kitchen",
		state: 0
	},
	ceiling1 : {
		type: "ceiling-lamp",
		located: "bedroom",
		state: 0
	},
	ceiling2 : {
		type: "ceiling-lamp",
		located: "kitchen",
		state: 0
	}
}

// list sensors in the house: could be moved to a separate .json file in the future
var sensors = {
	bed : {
		type: "pressure",
		located: "bedroom",
		state: 0
	},
	house1 : {
		type: "presence",
		located: "kitchen",
		state: 0
	},
	house2 : {
		type: "presence",
		located: "bedroom",
		state: 0
	},
	sadzone1 : {
		type: "presence",
		located: "bedroom",
		state: 0
	},
	sadzone2 : {
		type: "presence",
		located: "kitchen",
		state: 0
	}
}

// for when a button has been pressed, change the value here, then let the lights change?
var buttons = {
	off : 0,
	regular: 0,
	dim: 0,
	bright: 0
}

var state; //state flag

var wakestate = 10; // the value of sensor for waking up, artificial for now
var awakening = 0;

function wake_up(){ // STATE A!
	state = 'A';
	// read bed sensor, compare it - SCALING! or making a +/- X value
	if (sensors.bed.state == wakestate) {
		awakening = 1;
	}
	if (awakening == 1) { // scaling the light value from time to 100
		lights.night1.state = 100;
		// send the delay as well
		lights.ceiling1.state = 100;
		// send the delay as well
	}
	if (lights.night1.state == dose) {
		// lights are all the way up and can wake up completely, and ramp the lights down
		// TODO: ramp lights down when sensors notice the user up from bed
		awakening = 0;
	}
	state = 'C';
}

