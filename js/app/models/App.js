/**
 * Project: todo
 * Author: Maxim Denisov denisovmax1988@yandex.ru
 * Date: 19.03.13
 * Time: 20:41
 */


define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

    var AppState = Backbone.Model.extend({

        defaults: {
            title   : '',
            url     : ''
        }

    });

    return AppState;
});
