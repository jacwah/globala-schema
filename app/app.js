'use strict';

var fs = require('fs');
var ipc = require('ipc');
var Mustache = require('mustache');

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
            schedule = Schedule.defaults();
        } else {
            // Config doesn't save all attributes
            let d = Schedule.defaults();
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

    document.getElementById('form-button').addEventListener('click', function() {
        setSchedule(Schedule.url(readForm()));
    });
})
.catch(function(err) {
    console.log(err);
});
