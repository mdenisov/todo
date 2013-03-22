/**
 * Project: todo
 * Author: Maxim Denisov denisovmax1988@yandex.ru
 * Date: 19.03.13
 * Time: 20:44
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'models/Todo'
], function($, _, Backbone, TodoModel){

    // Todo Collection
    // ---------------

    // The collection of todos is backed by *localStorage* instead of a remote
    // server.
    var TodoList = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: TodoModel,

        // Save all of the todo items under the `"todos"` namespace.
        localStorage: new Backbone.LocalStorage('todos-backbone'),

        // Filter down the list of all todo items that are finished.
        completed: function () {
            return this.filter(function (todo) {
                return todo.get('completed');
            });
        },

        // Filter down the list to only todo items that are still not finished.
        remaining: function () {
            return this.without.apply(this, this.completed());
        },

        remainingIn: function (id) {
            return this.without.apply(this, this.filterList(id));
        },

        // We keep the Todos in sequential order, despite being saved by unordered
        // GUID in the database. This generates the next order number for new items.
        nextOrder: function () {
            if (!this.length) {
                return 1;
            }
            return this.last().get('order') + 1;
        },

        // Todos are sorted by their original insertion order.
        comparator: function (todo) {
            return todo.get('order');
        },

        filterList: function (id) {
            var id = id || App.activeList;

            return this.filter(function (todo) {
                return todo.get('list') == id;
            });
        }
    });

    return TodoList;
});