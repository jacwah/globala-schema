'use strict';

import { currentWeek } from '../model/time.js';

export function mainView(ids) {
    return {
        ids: idView(ids),
        weeks: weekView()
    };
}

function idView(ids) {
    return ids.map(function(id) {
        return { id: id };
    });
}

function weekView() {
    let weeks = [];
    const week = currentWeek();

    weeks.push({name: 'Denna vecka', number: week});
    weeks.push({name: 'Nästa vecka', number: week + 1});

    return weeks;
}
