'use strict';

var fs = require('fs');
var Mustache = require('mustache');
import * as schedule from './schedule/schedule.js';

function readForm() {
    return {
        school: schedule.schools['Globala gymnasiet'],
        id: document.getElementById('select-id').value,
        week: 38,
        width: 600,
        height: 400
    }
}

function setSchedule(url) {
    document.getElementById('schedule-img').src = url;
}

function idView(ids) {
    return ids.map(function(id) {
        return { id: id };
    });
}

function injectContent() {
    return new Promise(function(resolve, reject) {
        fs.readFile(__dirname + '/app.mst.html', 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            }
            let view = { ids: idView(schedule.ids) };
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
