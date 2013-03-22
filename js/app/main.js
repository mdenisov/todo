/**
 * Project: todo
 * Author: Maxim Denisov denisovmax1988@yandex.ru
 * Date: 19.03.13
 * Time: 20:41
 */


/**
 * Base 'App' initialization.
 */
require.config({
    paths: {
        jquery      : 'libs/jquery/jquery-1.9.1.min',
        forms       : 'libs/jquery/plugins/jquery.form',
        underscore  : 'libs/underscore/underscore',
        backbone    : 'libs/backbone/backbone',
        localStorage: 'libs/backbone/backbone.localStorage',
        bootstrap   : 'libs/bootstrap.min',
        text        : 'libs/require/text',
        templates   : 'templates'
    },

    shim: {

    },

    urlArgs: siteSettings.debug ? (new Date()).getTime() : '?v='+siteSettings.version
});

/**
 * Base 'App' initializaiton.
 */
require([
    'app'
],
function(App) {

    App.initialize();

});
