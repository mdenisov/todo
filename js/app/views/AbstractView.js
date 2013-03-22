define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var AbstractView = Backbone.View.extend({
        
        id            : null,
        el            : null,
        $el           : null,
        status        : true,
        hasTransition : true,

        initialize: function(data) {

            App.eventManager.on('EVENT_LOADED', this.show, this);
            
            // if ( this.id )
            //     this.$el = $( '#' + this.id );
            // else
            //     this.$el = $( this.el );

            this.$el = $( this.el );

            if ( this.hasTransition )
                this.hide();

            this.init(data);
        },

        remove: function() {

            this.undelegateEvents();
            this.unbind();

            this.remove();

        },

        removeChildren: function() {

            this.$el.children().remove();

        },

        hide: function() {

            if ( !this.hasTransition )
                return;

            this.status = false;

            this.$el.stop();
            this.$el.css('display', 'none');

        },

        show: function( delay_, animate_ ) {
            
            if ( delay_ == null ) {
                delay_ = 0.0;
            }
            
            if ( animate_ == null ) {
                animate_ = true;
            }
            
            if ( !this.hasTransition )
                return;
            
            this.status = true;
            this.$el.css('display', 'block');

            if ( !animate_ ) {
                this.$el.css('opacity', 1.0);
            } else {
                this.$el.css({'opacity': 0.0, top: -50});
                this.$el.stop().delay( delay_ ).animate( { opacity: 1.0, top: 0 }, { duration: 300.0 }, {easing: 'easeOutExpo'} );
            }
            
        },

        init: function(data) {
            // abstract method to be overridden
        }

    });

    return AbstractView;

});
