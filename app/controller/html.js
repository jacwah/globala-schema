'use strict';

import * as Schedule from '../model/schedule.js';

export function readForm() {
    let schedule = Schedule.defaults();

    schedule.id = document.getElementById('id-select').value;
    schedule.week = document.getElementById('week-select').value;

    return schedule;
}

export function setSchedule(url) {
    console.log('Setting URL', url)
    document.getElementById('schedule-img').src = url;
}
