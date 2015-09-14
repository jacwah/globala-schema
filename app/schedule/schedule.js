'use strict';

const baseUrl = 'http://www.novasoftware.se/ImgGen/schedulegenerator.aspx';

export const schools = {
    'Globala gymnasiet': 29120
};

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
