'use strict';

angular.module('scheduleApp', [])
    .controller('SelectionController', function() {
        console.log('selection');
        var selection = this;

        selection.ids = [1, 2, 3, 4, 5];
        selection.current = selection.ids[0];

        selection.set = function(id) {
            selection.current = id;
        }
    })
;
