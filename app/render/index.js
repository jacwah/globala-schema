'use strict';

var ipc = require('ipc');

angular.module('scheduleApp', [])
    .run(['$window', 'currentSchedule', function ($window, currentSchedule) {
        $window.addEventListener('unload', function() {
            ipc.send('save-schedule', currentSchedule.obj);
        });
    }])
    .controller('SelectionController', ['currentSchedule', 'Schedule', function(currentSchedule, Schedule) {
        var selection = this;

        selection.ids = Schedule.ids;
        selection.current = currentSchedule;
        selection.current.setId(selection.ids[0]);
    }])
    .controller('ScheduleController', ['currentSchedule', function(currentSchedule) {
        var schedule = this;

        schedule.current = currentSchedule;
    }])
    .constant('Schedule', require('./model/schedule'))
    .service('currentSchedule', ['Schedule', function(Schedule) {
        this.obj = Schedule.defaults();

        this.setId = function(id) {
            this.obj.id = id;
        };

        this.getUrl = function() {
            return Schedule.url(this.obj);
        };
    }])
;
