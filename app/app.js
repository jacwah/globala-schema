'use strict';

var fs = require('fs');
var ipc = require('ipc');
var moment = require('moment');
var Mustache = require('mustache');
var util = require('util');

var mainView = require('./view/main_view');
var Schedule = require('./model/schedule');
var controller = require('./controller/html');

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
            schedule = controller.readForm();
        } else {
            // Config doesn't save all attributes
            let d = controller.readForm();
            for (let a in schedule) { d[a] = schedule[a]; }
            schedule = d;
        }
        controller.setSchedule(Schedule.url(schedule));
        controller.setForm(schedule);
    });

    ipc.send('load-schedule');
})
.then(function() {
    window.addEventListener('unload', function() {
        ipc.send('save-schedule', readForm());
    });

    window.addEventListener('resize', function() {
        // Adjust schedule size
        controller.setSchedule(Schedule.url(controller.readForm()));
    });

    document.getElementById('form').addEventListener('change', function() {
        controller.setSchedule(Schedule.url(controller.readForm()));
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
