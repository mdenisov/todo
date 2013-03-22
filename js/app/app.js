/**
 * Project: todo
 * Author: Maxim Denisov denisovmax1988@yandex.ru
 * Date: 19.03.13
 * Time: 20:41
 */

define([
	'jquery',
	'underscore',
	'backbone',
    'localStorage',
	'appConfig',
	'router/router',
    'utils',
    'bootstrap',

	'models/app',

	'views/appView',
    'views/todo/Todo',
    'views/todo/List',

    'collections/Todo',
    'collections/List'
], function(
    $, 
    _, 
    Backbone,
    localStorage,
    Config, 
    Router, 
    Utils,
    bootstrap,

    AppState, 

    AppView, 
    TodoView,
    ListView,

    TodoCollection,
    ListCollection
){
	var initialize = function() {

		window.App;

		App = {
	        state                     : null,
	        config                    : null,
	        service                   : null,
	        view                      : null,
	        router                    : null,
	        onLoaded                  : null,

	        eventManager			  : {}
		}

        App.state   				= new AppState();
        App.config 					= Config;
        App.router 					= Router;

    	App.TodoView			    = TodoView;
    	App.ListView			    = ListView;

        App.TodoCollection          = new TodoCollection();
        App.ListCollection          = new ListCollection();

    	// Init Event Manager
		_.extend(App.eventManager, Backbone.Events);

		// Init App State
        App.state.on("change:url", function(model, error) {
            _gaq.push ['_trackPageview', siteSettings.baseUrl + '/#/' + model.get("url")]
	    });

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-26126642-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

        Logger.debug("Старт приложения");

        App.view    				= new AppView();
    }

    return {
        initialize: initialize
    };
});