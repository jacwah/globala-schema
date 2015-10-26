'use strict';

angular.module('scheduleApp', [])
    .controller('SelectionController', ['currentSchedule', 'Schedule', function(currentSchedule, Schedule) {
        var selection = this;

        selection.ids = Schedule.ids;
        selection.current = selection.ids[0];

        selection.currentSchedule = currentSchedule;

        selection.set = function(id) {
            selection.current = id;
            currentSchedule.set(id);
        }
    }])
    .constant('Schedule', require('./model/schedule'))
    .service('currentSchedule', ['Schedule', function(Schedule) {
        this.url = Schedule.url(Schedule.defaults());

        this.set = function(id) {
            var schedule = Schedule.defaults();
            schedule.id = id;
            this.url = Schedule.url(schedule);
        };
    }])
;
