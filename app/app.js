'use strict';

var fs = require('fs');
var moment = require('moment');
var Mustache = require('mustache');
import * as schedule from './schedule/schedule.js';

function readForm() {
    return {
        school: schedule.schools['Globala gymnasiet'],
        id: document.getElementById('id-select').value,
        week: document.getElementById('week-select').value,
        width: 600,
        height: 400
    }
}

function setSchedule(url) {
    console.log('Setting URL:', url)
    document.getElementById('schedule-img').src = url;
}

function idView(ids) {
    return ids.map(function(id) {
        return { id: id };
    });
}

function weekView() {
    let weeks = [];

    weeks.push({name: 'Denna vecka', number: moment().week()});
    weeks.push({name: 'Nästa vecka', number: moment().add(7, 'days').week()})

    return weeks;
}

function injectContent() {
    return new Promise(function(resolve, reject) {
        fs.readFile(__dirname + '/app.mst.html', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            let view = {
                ids: idView(schedule.ids),
                weeks: weekView()
            };
            let rendered = Mustache.render(data, view);
            document.getElementById('container').innerHTML = rendered;
            resolve();
        });
    });
}

function afterLoad() {
    setSchedule(schedule.url(readForm()));
    document.getElementById('form-button').addEventListener('click', function() {
        setSchedule(schedule.url(readForm()));
    });
}

injectContent()
.then(afterLoad);
