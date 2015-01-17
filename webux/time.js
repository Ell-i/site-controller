var period = 250;
var multiplier = 500; //for real, non accelerated time, 1

var interval = undefined;

/* XXX what if we overlfow? */
var time_seconds; //time since beginning of week

function system_tick() {
    time_seconds += (period/1000)*multiplier;
}

function init(){
    if(interval == undefined) {
        console.log("setting system_tick first time");
        time_seconds = 0;
        interval = setInterval(system_tick, period);
    } else {
        console.log("system_tick already set");
    }
}

function get_time() {
    if (time_seconds) {
        return time_seconds;
    } else {
        console.log("time not initialised");
        return 0;
    }
}

function get_time_string() {
    if (time_seconds) {
        return time_seconds.toString();
    } else {
        console.log("time not initialised");
        return "time not initialised";
    }
}


module.exports.init             = init;
module.exports.get_time         = get_time;
module.exports.get_time_string  = get_time_string;