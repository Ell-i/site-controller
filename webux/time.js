var period = 250;
var multiplier = 500; //for real, non accelerated time, 1

var interval = undefined;

var config=require("./config_static");
var p = require("./process");

/* XXX what if we overlfow? */
var time_seconds; //time since beginning of week

function check_and_trigger() {
    var data;
    //console.log("triggered: " + time_seconds);
    config.getData("script", function (nn) {data = nn});
    if(data == undefined) {
        console.log("data undefined");
        return;
    }
    //console.log(data.toString());
    
    var cont = true;
    while (cont) {
        var arr = Object.keys(data);
        var element = data[arr[0]];
        if (element.time < time_seconds) {
            p.process(element);
            console.log("ev: " + element.time.toString() + ", tim: " + time_seconds);
            delete data[arr[0]];
        } else {
            cont = false;
        }
        

        

    }
}

function system_tick() {
    time_seconds += (period/1000)*multiplier;
    check_and_trigger();
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