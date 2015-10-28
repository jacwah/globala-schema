'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var util = require('util');
var config = require('./config');

ipc.on('load-schedule', function(event) {
    util.log('Recieved load-schedule request');

    config.loadSchedule()
    .then(function(schedule) {
        event.sender.send('schedule', schedule);
    })
    .catch(function(err) {
        util.log(err);
        event.sender.send('schedule', null);
    });
});

ipc.on('save-schedule', function(event, schedule) {
    util.log('Recieved save-schedule request');

    config.saveSchedule(schedule);
});

ipc.on('reload', function (event) {
    util.log('Recieved reload request');

    event.sender.reloadIgnoringCache();
});
