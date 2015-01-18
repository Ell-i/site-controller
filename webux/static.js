var a = 0;
var b = 0;
var inc = 2;




var stateObjs = {
  night1 : {
    type: "night-lamp",
    located: "bedroom",
    state: 0,
    address:"1.1.1.1"
  },
  sad1 : {
    type: "sad-lamp",
    located: "bedroom",
    state: 0,
    address:"1.1.1.2"
  },
  sad2 : {
    type: "sad-lamp",
    locatedn: "kitchen",
    state: 0,
    address:"1.1.1.3"

  },
  ceiling1 : {
    type: "ceiling-lamp",
    located: "bedroom",
    state: 0,
    address:"1.1.1.4",

  },
  ceiling2 : {
    type: "ceiling-lamp",
    located: "kitchen",
    state: 0,
    address:"1.1.1.5"
  }
};

function getState(string, cb) {
    cb(stateObjs[string]);
}

function getAll(cb) {
    cb(stateObjs);
}

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
exports.getState = getState;
exports.getAll = getAll;