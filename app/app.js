'use strict';

var fs = require('fs');
var ipc = require('ipc');
var Mustache = require('mustache');

import { mainView } from './view/main.js';
import * as Schedule from './model/schedule.js';
import { setSchedule, readForm } from './controller/html.js';

function injectContent() {
    return new Promise(function(resolve, reject) {
        fs.readFile(__dirname + '/app.mst.html', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            let view = mainView(Schedule.ids);
            let rendered = Mustache.render(data, view);
            document.getElementById('container').innerHTML = rendered;

            ipc.on('schedule', function(schedule) {
                console.log('Recieved schedule from main process', schedule);
                if (schedule === null) {
                    schedule = Schedule.defaults();
                }
                setSchedule(Schedule.url(schedule));
                resolve();
            });

            ipc.send('load-schedule');
        });
    });
}

function afterLoad() {
    ipc.on('get-schedule', function() {
        console.log('Recieved get-schedule request');
        ipc.send('save-schedule', readForm());
    });

    document.getElementById('form-button').addEventListener('click', function() {
        setSchedule(Schedule.url(readForm()));
    });
}

injectContent()
.then(afterLoad);
