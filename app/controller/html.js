'use strict';

var Schedule = require('../model/schedule');

module.exports.readForm = function readForm() {
    var schedule = Schedule.defaults();

    schedule.id = document.getElementById('id-select').value;
    schedule.week = document.getElementById('week-select').value;
    schedule.width = document.getElementById('schedule-container').clientWidth;
    schedule.height = document.getElementById('schedule-container').clientHeight;

    return schedule;
}

module.exports.setForm = function setForm(schedule) {
    if (schedule.id !== undefined) {
        document.getElementById('id-select').value = schedule.id;
    }
    if (schedule.week !== undefined) {
        document.getElementById('week-select').value = schedule.week;
    }
}

module.exports.setSchedule = function setSchedule(url) {
    console.log('Setting URL', url)
    document.getElementById('schedule-img').src = url;
}
