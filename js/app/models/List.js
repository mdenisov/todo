/**
 * Author: Maxim Denisov denisovmax1988@yandex.ru
 * Date: 20.03.13
 * Time: 14:06
 */

define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    // List Model
    // ----------

    // Our basic **Todo** model has `title`, `order`, and `completed` attributes.
    var List = Backbone.Model.extend({
        // Default attributes for the todo
        // and ensure that each todo created has `title` and `completed` keys.
        defaults: {
            title: '',
            items: 0
        }

    });

    return List;
});