/* Polls ojousima.net for instructions on what to do next.. */
/* exports array of values to feed to devices on site. */
var http=require("http");

var options = {
    host: 'ojousima.net',
    port: 80,
    path: '/illuminati/example_data.json'
};

var lockState = 0;

function poll(cb){
    var state = "";
    var pollcmd = require("./pollcmd");
    pollcmd.clearChunks();
    http.get(options, function(res) {
        console.log("Got response: " + res.statusCode);
        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            var pollcmd = require("./pollcmd");
            pollcmd.appendChunk(chunk);
        });
        res.on('end', function() {
            //console.log("end recv");
            var pollcmd = require("./pollcmd");
            pollcmd.getChunks(function(nn){state = nn});
            cb(state);
            unlock();
        });
        }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

    return state;

}

function lock(){
    lockState = 1;
    console.log("Locked");
}

function unlock(){
    lockState = 0;
    console.log("Unlocked");
}

function isLocked(){
    return lockState;
}

exports.poll = poll;
exports.lock = lock;
exports.unlock = unlock;
exports.isLocked = isLocked;
