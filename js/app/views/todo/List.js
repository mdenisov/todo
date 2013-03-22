/**
 * Project: todo
 * Author: Maxim Denisov denisovmax1988@yandex.ru
 * Date: 19.03.13
 * Time: 20:51
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/AbstractView',
    'text!templates/todo/List.html'
], function($, _, Backbone, AbstractView, ListTemplate){

    // Todo Item View
    // --------------

    // The DOM element for a todo item...
    var ListView = Backbone.View.extend({
        //... is a list tag.
        tagName:  'li',

        // Cache the template function for a single item.
        template: _.template(ListTemplate),

        // The DOM events specific to an item.
        events: {
            'click':            'showList',
            'dblclick a span':   'edit',
            'click .destroy':   'clear',
            'keypress .edit':   'updateOnEnter',
            'blur .edit':       'close'
        },

        // The TodoView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **Todo** and a **TodoView** in this
        // app, we set a direct reference on the model for convenience.
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        // Re-render the titles of the todo item.
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
//            this.$el.toggleClass('completed', this.model.get('completed'));
//            this.toggleVisible();
            this.$input = this.$('.edit');
            return this;
        },

        showList: function () {
            $('#lists > li').removeClass('active');
            this.$el.addClass('active');

            App.activeList = this.model.get('id');

            App.TodoCollection.each(function(todo) {
                todo.trigger('filtered');
            }, this);

            return false;
        },

        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function () {
            this.$el.addClass('editing');
            this.$input.focus();
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close: function () {
            var value = this.$input.val().trim();

            if (value) {
                this.model.save({ title: value });
            } else {
                this.clear();
            }

            this.$el.removeClass('editing');
        },

        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function (e) {
            if (e.which === 13) {
                this.close();
            }
        },

        // Remove the item, destroy the model from *localStorage* and delete its view.
        clear: function () {
            this.model.destroy();
        }
    });

    return ListView;

});
