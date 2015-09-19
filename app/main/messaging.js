'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var config = require('./config');

ipc.on('load-schedule', function(event) {
    console.log('Recieved load-schedule request');

    config.loadSchedule()
    .then(function(schedule) {
        event.sender.send('schedule', schedule);
    })
    .catch(function(err) {
        event.sender.send('schedule', null);
    });
});

ipc.on('save-schedule', function(event, schedule) {
    console.log('Recieved save-schedule request');

    config.saveSchedule(schedule);
});

ipc.on('reload', function (event) {
    console.log('Recieved reload request');

    BrowserWindow.getFocusedWindow().reloadIgnoringCache();
});
