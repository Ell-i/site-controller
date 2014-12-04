var a = 0;
var b = 0;
var inc = 2;




var stateObjs = {
  "shelves/Ahto-S"        : {"address_rgb":"10.1.1.38", "address_w":"10.1.1.39", "white_available":"yes", "steady":{"r":0,"g":0,"b":0,"c1":100,"w":100,"c2":100}, "active":{"r":40,"g":40,"b":255,"c1":200,"w":200,"c2":200}, "step":0, "target":"low", "current":"low", "state":"inactive"},
  "shelves/Ahto-M"        : {"address_rgb":"10.1.1.33", "address_w":"10.1.1.32", "white_available":"yes", "steady":{"r":0,"g":0,"b":0,"c1":100,"w":100,"c2":100}, "active":{"r":40,"g":40,"b":255,"c1":200,"w":200,"c2":200}, "step":0, "target":"low", "current":"low", "state":"inactive"},
  "shelves/Ahto-L"        : {"address_rgb":"10.1.1.34", "address_w":"10.1.1.35", "white_available":"yes", "steady":{"r":0,"g":0,"b":0,"c1":100,"w":100,"c2":100}, "active":{"r":40,"g":40,"b":255,"c1":200,"w":200,"c2":200}, "step":0, "target":"low", "current":"low", "state":"inactive"},
  "shelves/Vallila-S"     : {"address_rgb":"10.1.1.42", "address_w":"10.1.1.43", "white_available":"yes", "steady":{"r":0,"g":0,"b":0,"c1":100,"w":100,"c2":100}, "active":{"r":40,"g":40,"b":255,"c1":200,"w":200,"c2":200}, "step":0, "target":"low", "current":"low", "state":"inactive"},
  "shelves/Vallila-M"     : {"address_rgb":"10.1.1.40", "address_w":"10.1.1.41", "white_available":"yes", "steady":{"r":0,"g":0,"b":0,"c1":100,"w":100,"c2":100}, "active":{"r":40,"g":40,"b":255,"c1":200,"w":200,"c2":200}, "step":0, "target":"low", "current":"low", "state":"inactive"},
  "shelves/Vallila-L"     : {"address_rgb":"10.1.1.36", "address_w":"10.1.1.37", "white_available":"yes", "steady":{"r":0,"g":0,"b":0,"c1":100,"w":100,"c2":100}, "active":{"r":40,"g":40,"b":255,"c1":200,"w":200,"c2":200}, "step":0, "target":"low", "current":"low", "state":"inactive"},
  "mannequins/Ahto"       : {"address_rgb":"10.1.1.16",                          "white_available":"no",  "steady":{"r":0,"g":0,"b":0                          }, "active":{"r":40,"g":40,"b":255                          }, "step":0, "target":"low", "current":"low", "state":"inactive"},
  "mannequins/Vallila"    : {"address_rgb":"10.1.1.17",                          "white_available":"no",  "steady":{"r":0,"g":0,"b":0                          }, "active":{"r":40,"g":40,"b":255                          }, "step":0, "target":"low", "current":"low", "state":"inactive"},
  "mannequins/Rokka"      : {"address_rgb":"10.1.1.18",                          "white_available":"no",  "steady":{"r":0,"g":0,"b":0                          }, "active":{"r":40,"g":40,"b":255                          }, "step":0, "target":"low", "current":"low", "state":"inactive"},
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