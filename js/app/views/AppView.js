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
], function(
    $, 
    _, 
    Backbone
){

    // The Application
    // ---------------

    // Our overall **AppView** is the top-level piece of UI.
    var AppView = Backbone.View.extend({

        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: '#main',

        // Our template for the line of statistics at the bottom of the app.
//        statsTemplate: _.template($('#stats-template').html()),

        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #clear-completed': 'clearCompleted',
            'click #toggle-all': 'toggleAllComplete',
            'click a#add-task': 'toggleAddTask',

            'click a#add-list': 'toggleAddList',
            'keypress #new-list-item': 'createListOnEnter'
        },

        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
//        initialize: function () {
//            this.$input = this.$('#new-todo');
//            this.$main = this.$('#main');
//
//            this.listenTo(App.TodoCollection, 'add', this.addOne);
//            this.listenTo(App.TodoCollection, 'reset', this.addAll);
//            this.listenTo(App.TodoCollection, 'change:completed', this.filterOne);
//            this.listenTo(App.TodoCollection, 'filter', this.filterAll);
//            this.listenTo(App.TodoCollection, 'all', this.render);
//
//            App.TodoCollection.fetch();
//        },

        initialize: function () {
//            this.allCheckbox = this.$('#toggle-all')[0];
            this.$listInput = this.$('#new-list-item');
            this.$taskInput = this.$('#new-todo');
            this.$main = this.$('#main');

            this.listenTo(App.ListCollection, 'add',    this.addListOne);
            this.listenTo(App.ListCollection, 'reset',  this.addListAll);
            this.listenTo(App.ListCollection, 'filter', this.filterListAll);
            this.listenTo(App.ListCollection, 'all',    this.render);

            this.listenTo(App.TodoCollection, 'add', this.addOne);
            this.listenTo(App.TodoCollection, 'reset', this.addAll);
            this.listenTo(App.TodoCollection, 'change:completed', this.filterOne);
            this.listenTo(App.TodoCollection, 'filter', this.filterAll);
            this.listenTo(App.TodoCollection, 'all', this.renderTaskList);

//            App.ListCollection.fetch();
            App.TodoCollection.fetch();
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        renderTaskList: function () {
            var completed = App.TodoCollection.completed().length;
            var remaining = App.TodoCollection.remaining().length;

            if (App.TodoCollection.length) {
                this.$main.show();

                this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (App.TodoFilter || '') + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
            }
        },


        render: function () {
//            var completed = App.TodoCollection.remainingIn().length;
//            var remaining = App.TodoCollection.remaining().length;

//            console.log(completed);

            if (App.ListCollection.length) {
                this.$main.show();
//                this.$footer.show();

//                this.$footer.html(this.statsTemplate({
//                    completed: completed,
//                    remaining: remaining
//                }));

                this.$('#filters li a')
                    .removeClass('selected')
                    .filter('[href="#/' + (App.TodoFilter || '') + '"]')
                    .addClass('selected');
            } else {
                this.$main.hide();
//                this.$footer.hide();
            }

//            this.allCheckbox.checked = !remaining;
        },

        // Add a single todo item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addOne: function (todo) {
            var view = new App.TodoView({ model: todo });
            $('#todo-list').append(view.render().el);
        },

        // Add all items in the **Todos** collection at once.
        addAll: function () {
            this.$('#todo-list').html('');
            App.TodoCollection.each(this.addOne, this);

            App.ListCollection.fetch();

            $('#inbox > li > .count').html(App.TodoCollection.length);

//            $('#lists > li:eq(0)').trigger('click');
        },

        filterOne: function (todo) {
            todo.trigger('visible');
        },

        filterAll: function () {
            App.TodoCollection.each(this.filterOne, this);
        },

        // Generate the attributes for a new Todo item.
        newAttributes: function () {
            return {
                title: this.$taskInput.val().trim(),
                order: App.TodoCollection.nextOrder(),
                completed: false,
                list: App.activeList
            };
        },

        // If you hit return in the main input field, create new **Todo** model,
        // persisting it to *localStorage*.
        createOnEnter: function (e) {
            if (e.which !== 13 || !this.$taskInput.val().trim()) {
                return;
            }

            App.TodoCollection.create(this.newAttributes());
            this.$taskInput.val('');

            this.updateCounter();

            $('a#add-task').show();
            $('#task-form').hide();
        },

        // Clear all completed todo items, destroying their models.
        clearCompleted: function () {
            _.invoke(App.TodoCollection.completed(), 'destroy');
            return false;
        },

        toggleAllComplete: function () {
            var completed = this.allCheckbox.checked;

            App.TodoCollection.each(function (todo) {
                todo.save({
                    'completed': completed
                });
            });
        },

        toggleAddTask: function () {
            $('a#add-task').hide();
            $('#task-form').show();
            return false;
        },


        // List logics

        // Add a single todo item to the list by creating a view for it, and
        // appending its element to the `<ul>`.
        addListOne: function (todo) {
            var items = 0;

            if (!(todo.isNew()))
                items = App.TodoCollection.filterList(todo.get('id')).length;

            todo.set('items',items )

            var view = new App.ListView({ model: todo });
            $('#lists').append(view.render().el);
        },

        // Add all items in the **Todos** collection at once.
        addListAll: function () {
            $('#lists').html('');

            App.ListCollection.each(this.addListOne, this);

            $('#lists > li:eq(0)').trigger('click');
        },

        filterListOne: function (todo) {
            todo.trigger('visible');
        },

        filterListAll: function () {
            App.ListCollection.each(this.filterListOne, this);
        },

        // Generate the attributes for a new List item.
        newListAttributes: function () {
            return {
                title: this.$listInput.val().trim(),
                order: App.ListCollection.nextOrder(),
                items: 0
            };
        },

        toggleAddList: function () {
            $('a#add-list').hide();
            $('#list-form').show();
            this.$listInput.focus();
            return false;
        },

        createListOnEnter: function (e) {
            if (e.which !== 13 || !this.$listInput.val().trim()) {
                return;
            }

            App.ListCollection.create(this.newListAttributes());

            this.$listInput.val('');

            $('a#add-list').show();
            $('#list-form').hide();
        },

        updateCounter: function() {
            var items = App.TodoCollection.filterList().length;

            $('#lists > li.active > .count').html(items);
        }
    });

    return AppView;

});
