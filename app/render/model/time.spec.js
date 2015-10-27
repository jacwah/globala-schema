'use strict';

var moment = require('moment');
var time = require('./render/model/time');

describe('Time calculations', function() {
    beforeEach(function() {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it('uses the current week on weekdays', function() {
        var date = moment('2015-10-19');
        jasmine.clock().mockDate(date.toDate());
        expect(time.currentWeek()).toEqual(date.week());
    });

    it('uses the next week as "current" on weekends', function() {
        var date = moment('2015-10-17');
        jasmine.clock().mockDate(date.toDate());
        expect(time.currentWeek()).toEqual(date.week() + 1);
    });
});
