var a = 0;
var b = 0;
var inc = 2;
function increase(cb) {
    if (b == 0) {
        a+=inc;
        if (a >= (256 - 2*inc)) {
            b = 1;
        }
    }
    else {
        a-=inc;
        if (a == 0) {
            b = 0;
        }
    }
    cb(a);
}
exports.increase = increase;