var s = require("./static");
var dali = require('dali-lib');

var element;

//XXX TODO This is hardcoded, not production quality

var night1;
var sad1;
var sad2;
var ceiling1;
var ceiling2;



function update_elements() {
    s.getState("night1", function (nn) {element = nn});
    night1 = element;

    s.getState("sad1", function (nn) {element = nn});
    sad1 = element;

    s.getState("sad2", function (nn) {element = nn});
    sad2 = element;

    s.getState("ceiling1", function (nn) {element = nn});
    ceiling1 = element;

    s.getState("ceiling2", function (nn) {element = nn});
    ceiling2 = element;

}

function process(element) {
    update_elements();
    switch (element.set) {
        case "all":
            dali.direct_level_device(night1.address,    element.state, element.delay)
            dali.direct_level_device(sad1.address,      element.state, element.delay)
            dali.direct_level_device(sad2.address,      element.state, element.delay)
            dali.direct_level_device(ceiling1.address,  element.state, element.delay)
            dali.direct_level_device(ceiling2.address,  element.state, element.delay)
            break;

        case "ceiling":
            dali.direct_level_device(ceiling1,  element.state, element.delay)
            dali.direct_level_device(ceiling2,  element.state, element.delay)
            break;

        case "bedroom":
            dali.direct_level_device(night1,    element.state, element.delay)
            dali.direct_level_device(sad1,      element.state, element.delay)
            dali.direct_level_device(ceiling1,  element.state, element.delay)
            break;

        case "night1":
            dali.direct_level_device(night1,    element.state, element.delay)
            break;

        case "sad1":
            dali.direct_level_device(sad1,      element.state, element.delay)
            break;

        case "sad2":
            dali.direct_level_device(sad2,      element.state, element.delay)
            break;

        case "ceiling1":
            dali.direct_level_device(ceiling1,  element.state, element.delay)
            break;

        case "ceiling2":
            dali.direct_level_device(ceiling2,  element.state, element.delay)
            break;
    }
}

module.exports.process = process;