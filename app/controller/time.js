var moment = require('moment');

export function currentWeek() {
    return moment().week();
}

export function nextWeek() {
    return moment().add(7, 'days').week();
}
