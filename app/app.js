'use strict';

var fs = require('fs');
var ipc = require('ipc');
var moment = require('moment');
var Mustache = require('mustache');
var util = require('util');

import { mainView } from './view/main.js';
import * as Schedule from './model/schedule.js';
import { setSchedule, readForm, setForm } from './controller/html.js';

function injectContent() {
    return new Promise(function(resolve, reject) {
        fs.readFile(__dirname + '/app.mst.html', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            let view = mainView(Schedule.ids);
            let rendered = Mustache.render(data, view);
            document.getElementById('container').innerHTML = rendered;
            resolve();
        });
    });
}

injectContent()
.then(function() {
    ipc.on('schedule', function(schedule) {
        console.log('Recieved schedule from main process', schedule);

        if (schedule === null) {
            schedule = readForm();
        } else {
            // Config doesn't save all attributes
            let d = readForm();
            for (let a in schedule) { d[a] = schedule[a]; }
            schedule = d;
        }
        setSchedule(Schedule.url(schedule));
        setForm(schedule);
    });

    ipc.send('load-schedule');
})
.then(function() {
    window.addEventListener('unload', function() {
        ipc.send('save-schedule', readForm());
    });

    window.addEventListener('resize', function() {
        // Adjust schedule size
        setSchedule(Schedule.url(readForm()));
    });

    document.getElementById('form').addEventListener('change', function() {
        setSchedule(Schedule.url(readForm()));
    });

    document.getElementById('refresh-button').addEventListener('click', function() {
        ipc.send('reload');
    });

    window.addEventListener('online', function() {
        util.log('Online event fired');
        ipc.send('reload');
    });

    // If the app is kept open for a long period of time the schedule should
    // still be up to date.
    let timeoutReload = function() {
        setTimeout(function() {
            if (navigator.onLine) {
                ipc.send('reload');
            } else {
                timeoutReload();
            }
        }, moment.duration(30, 'minutes').asMilliseconds());
    }
    timeoutReload();
})
.catch(function(err) {
    console.log(err);
});
