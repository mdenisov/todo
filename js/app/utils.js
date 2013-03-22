var Utils = {};

define([
	"jquery",
	"underscore"
], function($, a) {
	$.error = function(message) {
		GA.event("jQuery Error", message, navigator.userAgent);
	}
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		Utils.isMobile = true;
	} else {
		Utils.isMobile = false;
	}

	// _.templateSettings = {
	// 	evaluate: /<#([\s\S]+?)#>/g,
	// 	interpolate: /<#=([\s\S]+?)#>/g,
	// 	escape: /<#-([\s\S]+?)#>/g
	// }

	Utils.ImagePreload = function(arrayOfImages) {
		$(arrayOfImages).each(function() {
			(new Image()).src = this;
		});
	}
	
	Utils.Keyboard = {
		LEFT: 37,
		RIGHT: 39,
		ENTER: 13,
		ESC: 27,
		SPACE: 32,
		Handler: function(key, func, context) {
			$(document).bind("keyup", function(e) {
				switch(e.keyCode) { 
					case key:
						func.call(context, arguments);
						break;
				}
			});
		}
	}
	
	Utils.Keyboard.Ctrl = {
		Handler: function(key, func, context) {
			$(document).keydown(function(e) {
				if(!(e.keyCode == key && e.ctrlKey)) return true;
				func.call(context, arguments);
				return false;
			});
		}
	}
	
	Utils.TextareaMaxLength = function(textarea, limit) {
		this.textarea = textarea;
		this.limit = limit;
		
		this.textarea.bind("keyup", $.proxy(this.cut, this))
				.bind("keydown", $.proxy(this.cut, this))
				.bind("blur", $.proxy(this.cut, this));
	}
	Utils.TextareaMaxLength.prototype = {
		cut: function(e) {
			var target = e ? $(e.target) : this.textarea;
			var text = target.val();
			if(text.length > this.limit) {
				target.val(text.substr(0, this.limit));
			}
		}
	}
});

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/, '');
}

Function.prototype.context = function(scope) {
	var fn = this;
	return function() {
		return fn.apply(scope, arguments);
	}
}

var Logger = {
	debug: function(msg) {
		if(siteSettings.debug && typeof(console) != "undefined") {
			console.log(msg);
		}
	}
}

var GA = {
	event: function(category, action, label) {
		if(typeof _gaq != "undefined" && _gaq != null) {
			if(label == undefined) {
				_gaq.push(['_trackEvent', '\'' + category + '\'', '\'' + action + '\'']);
			}
			else {
				_gaq.push(['_trackEvent', '\'' + category + '\'', '\'' + action + '\'', '\'' + label + '\'']);
			}
		}
	}
}

var SortingEnum = {
	PriceUp: "priceUp",
	PriceDown: "priceDown",
	Relevance: "relevance",
	Title: "title",
	Shop: "shop"
}

var FilterEnum = {
	All: "all",
	Avail: "avail",
	AvailAndOrder: "availAndOrder"
}

Utils.Cookies = {
	set: function(name, value, expires, path, domain, secure) {
		if(typeof(expires) == "number") {
			var date = new Date();
			date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
			expires = date.toUTCString();
		}
	
		document.cookie = name + "=" + escape(value) +
			((expires) ? "; expires=" + expires : "") +
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			((secure) ? "; secure" : "");
	},
	get: function(name) {
		var cookie = " " + document.cookie;
		var search = " " + name + "=";
		var setStr = null;
		var offset = 0;
		var end = 0;
		if(cookie.length > 0) {
			offset = cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				end = cookie.indexOf(";", offset)
				if (end == -1) {
					end = cookie.length;
				}
				setStr = unescape(cookie.substring(offset, end));
			}
		}
		return(setStr);
	},
	remove: function(name) {
		this.set(name, "", -1);
	}
}