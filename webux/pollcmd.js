/* Stores state of polled commands. */

var incomingChunks = "";

function appendChunk(chunk) {
    incomingChunks += chunk;   
}

/** Hackety hax with callbacks */
function getChunks(cb){
    cb(incomingChunks);
}

function clearChunks(){
    incomingChunks = "";
}

exports.appendChunk = appendChunk;
exports.getChunks   = getChunks;
exports.clearChunks = clearChunks;
