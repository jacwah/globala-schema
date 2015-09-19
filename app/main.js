'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var env = require('./vendor/electron_boilerplate/env_config');
var devHelper = require('./vendor/electron_boilerplate/dev_helper');
var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');

require('./main/messaging');

var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 1000,
    height: 600
});

app.on('ready', function () {

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height
    });

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    mainWindow.loadUrl('file://' + __dirname + '/app.html');

    if (env.name === 'development') {
        devHelper.setDevMenu();
    }

    mainWindow.on('close', function () {
        mainWindowState.saveState(mainWindow);
    });
});

app.on('window-all-closed', function () {
    app.quit();
});

var quitting = false;
app.on('before-quit', function(event) {
    if (!quitting) {
        quitting = true;

        app.on('saved-schedule', function() {
            console.log('Schedule saved.');
            app.quit();
        });

        mainWindow.webContents.send('get-schedule');

        // Wait for save-schedule message before exiting
        event.preventDefault();
        setTimeout(function() {
            console.log('Schedule save timed out, exitting...');
            app.quit();
        }, 1000);
    }
});
