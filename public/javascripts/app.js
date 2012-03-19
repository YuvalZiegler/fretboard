
////////////////////////////////////////////////////////////////////////
// BACKBONE STARTS HERE
////////////////////////////////////////////////////////////////////////	
var App = (function (){
	var App = {};
	
	App.NotesCollection  = Backbone.Collection.extend({
	  model: App.NoteModel
	});
	
	App.NoteModel = Backbone.Model.extend({
	  defaults: {
		note: undefined,
	    active:false,
		interval: undefined
	  }
	});
	
	App.NoteView = Backbone.View.extend({
		
		tagName: 'li',		
		
	  	initialize: function(){
	    	_.bindAll(this, 'render');
	    	this.render(); // not all views are self-rendering. This one is.
	  	},  
	  	
		render: function(){
			
	    	$(this.el).html(this.model).appendTo('body');
	  	}
	});
	return App;
})()