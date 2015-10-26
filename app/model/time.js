'use strict';

var moment = require('moment');

moment().locale('sv');

function baseMoment() {
    var m = moment();

    // Use next week's schedule on the weekend
    if (m.day() > 5) {
        m.add(1, 'weeks');
    }

    return m;
}

module.exports.currentWeek = function currentWeek() {
    return baseMoment().week();
}
