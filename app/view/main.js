import { currentWeek, nextWeek } from '../model/time.js';

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

    weeks.push({name: 'Denna vecka', number: currentWeek()});
    weeks.push({name: 'Nästa vecka', number: nextWeek()})

    return weeks;
}
