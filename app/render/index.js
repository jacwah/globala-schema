'use strict';

var _ = require('underscore');
var ipc = require('ipc');
var Schedule = require('./model/schedule');

angular.module('scheduleApp', [])
    .run(['$window', 'currentSchedule', function ($window, currentSchedule) {
        $window.addEventListener('unload', function() {
            ipc.send('save-schedule', currentSchedule);
        });

        ipc.on('schedule', function(schedule) {
            _.extend(currentSchedule, schedule);
        });
        ipc.send('load-schedule');
    }])
    .controller('SelectionController', ['currentSchedule', function(currentSchedule) {
        var selection = this;

        selection.ids = Schedule.ids;
        selection.current = currentSchedule;
        selection.current.id = selection.ids[0];
    }])
    .controller('ScheduleController', ['currentSchedule', function(currentSchedule) {
        var schedule = this;

        schedule.current = currentSchedule;
    }])
    .service('currentSchedule', [function() {
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
