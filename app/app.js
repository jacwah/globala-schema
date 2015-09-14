import * as schedule from './schedule/schedule.js';

// window.env contains data from config/env_XXX.json file.
// var envName = window.env.name;

const url = schedule.url({
    school: schedule.schools['Globala gymnasiet'],
    id: 'es13a',
    week: 38,
    width: 600,
    height: 400
});

document.getElementById('schedule-img').src = url;
