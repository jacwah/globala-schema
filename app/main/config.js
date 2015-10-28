'use strict';

var app = require('app');
var fs = require('fs');

function getConfigPath(config) {
    return app.getPath('userData') + '/' + config;
}

function saveSchedule(schedule) {
    return new Promise(function(resolve, reject) {
        let json = JSON.stringify(schedule, ['id', 'school']);
        fs.writeFile(getConfigPath('lastSchedule.json'), json, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function loadSchedule() {
    return new Promise(function(resolve, reject) {
        fs.readFile(getConfigPath('lastSchedule.json'), 'utf8', function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

exports.getConfigPath = getConfigPath;
exports.saveSchedule = saveSchedule;
exports.loadSchedule = loadSchedule;
