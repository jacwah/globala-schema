'use strict';

var _ = require('underscore');
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
        selection.current.id = selection.ids[0];
    }])
    .controller('ScheduleController', ['currentSchedule', function(currentSchedule) {
        var schedule = this;

        schedule.current = currentSchedule;
    }])
    .constant('Schedule', require('./model/schedule'))
    .service('currentSchedule', ['Schedule', function(Schedule) {
        _.extend(this, Schedule.defaults());

        this.getUrl = function() {
            return Schedule.url(this);
        };

        this.nextWeek = function() {
            this.week = this.week + 1;
        }

        this.previousWeek = function() {
            this.week = this.week - 1;
        }
    }])
;
