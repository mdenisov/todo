/**
 * @fileoverview App view.
 * @author Maxim Denisov
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'state',
    'text!siteconfig.json',
],
function(
    $,
    _,
    Backbone,
    App,
    siteConfig
)
{

    /**
     * View class.
     * Global event listener. Not intended to render an actual view.
     */
    var AppView = Backbone.View.extend({

        // View element.
        el: 'body',

        // Event listeners.
        events: {
            'click': 'triggerRoute',
            'submit form.ui-ajax-form': 'triggerForm'
        },

        /**
         * Initialize view.
         * @param {Object} options View options passed in during init.
         */
        initialize: function(options) {

            // Event Proxy.
            window.App = App;
        }

    });

    /**
     * Return view class.
     */
    return AppView;
});
