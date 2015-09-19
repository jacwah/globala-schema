'use strict';

import * as schedule from '../model/schedule.js';

export function readForm() {
    return {
        school: schedule.schools['Globala gymnasiet'],
        id: document.getElementById('id-select').value,
        week: document.getElementById('week-select').value,
        width: 600,
        height: 400
    }
}

export function setSchedule(url) {
    console.log('Setting URL:', url)
    document.getElementById('schedule-img').src = url;
}
