var coapOjb = require('coap');

function sendCoapLeds(address, f, s, t, e) {
  var coapMsg = {method: "put", hostname:address, pathname:"leds", confirmable:"false"}
  var request = coapOjb.request(coapMsg);
  var buf = new Buffer(4);
  buf.writeUInt8(f, 0);
  buf.writeUInt8(s, 1);
  buf.writeUInt8(t, 2);
  buf.writeUInt8(e, 3);  
  request.write(buf);
  request.end();


}

exports.sendCoapLeds = sendCoapLeds;


