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

    // Todo Model
    // ----------

    // Our basic **Todo** model has `title`, `order`, and `completed` attributes.
    var Todo = Backbone.Model.extend({
        // Default attributes for the todo
        // and ensure that each todo created has `title` and `completed` keys.
        defaults: {
            title: '',
            completed: false,
            list: null
        },

        // Toggle the `completed` state of this todo item.
        toggle: function () {
            this.save({
                completed: !this.get('completed')
            });
        }
    });

    return Todo;
});



