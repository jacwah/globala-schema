'use strict';

import { currentWeek } from '../model/time.js';

const baseUrl = 'http://www.novasoftware.se/ImgGen/schedulegenerator.aspx';

export const schools = {
    'Globala gymnasiet': 29120
};

export const ids = [
    'ES13A',
    'ES13B',
    'ES14A',
    'ES15A',
    'NA13A',
    'NA13B',
    'NA14A',
    'NA14B',
    'NA15A',
    'NA15B',
    'SA13A',
    'SA13B',
    'SA14A',
    'SA14B',
    'SA14C',
    'SA15A',
    'SA15B',
    'SA15C',
    'Spri15A',
    'Spri15B',
    'Spri15C'
];

export function url(schedule) {
    return baseUrl.concat(
        '?',
        'format=', 'png',
        '&schoolid=', schedule.school,
        '/sv-se',
        '&type=-1',
        '&id=', schedule.id,
        '&period=',
        '&week=', schedule.week,
        '&mode=0',
        '&printer=0',
        '&colors=32',
        '&head=0',
        '&clock=0',
        '&foot=0',
        '&day=0',
        '&width=', schedule.width,
        '&height=', schedule.height,
        '&maxwidth=', schedule.width,
        '&maxheight=', schedule.height
    );
}

export function defaults() {
    return {
        school: schools['Globala gymnasiet'],
        id: ids[0],
        week: currentWeek(),
        width: 800,
        height: 600
    }
}
