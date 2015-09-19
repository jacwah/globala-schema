var moment = require('moment');

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

    weeks.push({name: 'Denna vecka', number: moment().week()});
    weeks.push({name: 'Nästa vecka', number: moment().add(7, 'days').week()})

    return weeks;
}
