/**
 * Project: todo
 * Author: Maxim Denisov denisovmax1988@yandex.ru
 * Date: 19.03.13
 * Time: 20:51
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    // Todo Router
    // ----------
    var Workspace = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },

        setFilter: function (param) {
            // Set the current filter to be used
            app.TodoFilter = param.trim() || '';

            // Trigger a collection filter event, causing hiding/unhiding
            // of Todo view items
            app.Todos.trigger('filter');
        }
    });

    var initialize = function() {

        var TodoRouter = new Workspace();

        Backbone.history.start();
    };

    return { 

        initialize: initialize

    };

});
