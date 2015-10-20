'use strict';

var moment = require('moment');
import * as time from './time.js';

describe('Time calculations', function() {
    const aSaturday = {
        moment: moment('2015-10-17'),
        week: 42
    }
    const aMonday = {
        moment: moment('2015-10-19'),
        week: 43
    }

    beforeEach(function() {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it('uses the current week on weekdays', function() {
        jasmine.clock().mockDate(aMonday.moment);
        expect(time.currentWeek()).toEqual(aMonday.week)
    });

    it('uses the next week as "current" on weekends', function() {
        jasmine.clock().mockDate(aSaturday.moment);
        expect(time.currentWeek()).toEqual(aSaturday.week + 1);
    });
});
