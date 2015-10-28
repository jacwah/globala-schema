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
        selection.current = selection.ids[0];

        selection.currentSchedule = currentSchedule;

        selection.set = function(id) {
            selection.current = id;
            currentSchedule.set(id);
        }
    }])
    .constant('Schedule', require('./model/schedule'))
    .service('currentSchedule', ['Schedule', function(Schedule) {
        this.obj = Schedule.defaults();
        this.url = Schedule.url(this.obj);

        this.set = function(id) {
            this.obj.id = id;
            this.url = Schedule.url(this.obj);
        };
    }])
;
