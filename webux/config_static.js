var fs = require('fs');

var config_path = "./config/"

current = {
    "light_changes":        {"path":"light_changes.json",           "data":undefined},
    "light_default_scenes": {"path":"light_default_scenes.json",    "data":undefined},
    "light_defaults":       {"path":"light_defaults.json",          "data":undefined},
}

function init() {
    var k = Object.keys(current);
    for (var i = 0; i < k.length; i++) {
        var element = current[k[i]]
        element.data = JSON.parse(fs.readFileSync(config_path + element.path, 'utf8'));
    }
}

module.exports.init = init;