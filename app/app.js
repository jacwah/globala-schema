import * as schedule from './schedule/schedule.js';

// window.env contains data from config/env_XXX.json file.
// var envName = window.env.name;

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

document.getElementById('form-button').addEventListener('click', function() {
    setSchedule(schedule.url(readForm()));
});
