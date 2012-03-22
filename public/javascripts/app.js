_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };

////////////////////////////////////////////////////////////////////////
// BACKBONE STARTS HERE
////////////////////////////////////////////////////////////////////////	
var App = (function (dict, $){

	var App = {};

    var octave = dict.getScale("A","chromatic").notes;

    var Router = Backbone.Router.extend({
        routes:{
          '':  'setInstrument',
          'instrument/:name' : 'setInstrument'

        },
        initialize:function(options){

            // an Octave of NoteModels
            App.notesCollection     = new NotesCollection()
            // Initialize and empty string colletion -> will be populated by the routes
            App.stringsCollection   = new StringCollection([]);
			// TextField input view
			App.searchView = new SearchView();
        },

        setInstrument : function(name){

            var cases = {
                "bass":     ["E", "A", "D", "G"],
                "guitar":   ["E", "A", "D", "G", "B", "E"],
                "ukulele":  ["G", "C", "E", "A"]
            }
            var strings = (cases[name]) ? cases[name] : cases["guitar"];

            this.createStringCollection(strings);
        },

        createStringCollection: function(strings){

            App.stringsCollection.reset();
            App.stringsCollection.initialize(strings)

        }
    });
	
    var NotesCollection = Backbone.Collection.extend({
        model:App.NoteModel,
        dictionary:  dict,

        initialize: function(){
            for (var i = 0, l=octave.length;  i< l ; i++){
                this.add(new NoteModel({note:octave[i]}));
            }
        },

        getModel:function(note){
            return _.find( this.models, function(t){ return t.attributes.note===note})
        },

        activate: function(notes){
			_.each(this.models, function(model){
				model.reset();
			})
            for (var i=0, l = notes.notes.length; i<l; i++){
                var note= notes.notes[i];
                var target = this.getModel(note);
                var interval = notes.intervals[i];
                // THIS TRIGGERS A CHANGE EVENT IN THE MODEL 
                target.set({active:true, interval:interval});
               
            }
        },

        setActiveNotes:function(key, intervals, scale){

            var n = scale ? this.dictionary.getScale(key, intervals) : this.dictionary.getChord(key, intervals)
            this.activate(n);
        }


	});

	var NoteModel = Backbone.Model.extend({
	  defaults: {
		note: undefined,
	    active:false,
		interval: ''
	  },
	  reset:function(){
		this.set({ active:false, interval:'' });
	  }
	});

    var StringModel = Backbone.Model.extend({
        defaults: {
            key:undefined,
            octave:[]
        },
        initialize:function(){
            this.set({key: this.attributes.key}, {silent:true})
            this.set({octave:dict.getScale(this.attributes.key,"chromatic").notes}, {silent:true})
        }
    });

    var StringCollection = Backbone.Collection.extend({
        initialize: function(strings){
            // reversing the array to create the strings from top to bottom
            strings.reverse();
            for (var i=0, l=strings.length; i<l; i++){
                this.add(new StringModel({key:strings[i]}))
            }
        }
    })

    /// VIEWS
    var NoteView = Backbone.View.extend({
        tagName:'li',
        className:'inactive',

        initialize:function(options){
            _.bindAll(this,'render')
            this.model = App.notesCollection.getModel(options.note)
            this.model.bind('change', this.render);
            this.render();
        },
        render:function(){
           if(this.model.attributes.active){
            $(this.el).html(this.model.attributes.note).removeClass('inactive').addClass(this.model.attributes.interval)
           } else {
               $(this.el).html(this.model.attributes.note).removeClass().addClass('inactive')
           }
        }
    })

    var StringView = Backbone.View.extend({
        tagName:'ul',
        className:'string',
        initialize:function(){
            _.bindAll(this,'render')
            this.render();
        },
        render: function(){
            var l = this.model.attributes.octave.length;
            for (var i=0; i<l; i++){
                // creating views for each note
                var n = new NoteView({note:this.model.attributes.octave[i]});
                $(this.el).append(n.el)
            }


        }
    })

    var NeckView = Backbone.View.extend({
        el:'ul#neck',

        initialize:function(options){
            for (var i=0, l = App.stringsCollection.models.length; i<l ; i++ ){
                var string = new StringView({model:App.stringsCollection.models[i]});
                $(this.el).append(string.el);

            }

        }
    })

	var SearchView = Backbone.View.extend({	
		el: '#search',
        regEx:{
          key:/^[A-G][b,#]/
        },
		events : {
			'keyup' : 'handleEnter'
		},

		initialize: function (){
			this.router = this.options.router;
			$(this.el).focus();
		},

		handleEnter : function (e) {
			
			var element =  $(this.el).val()
			
			if (element.length>0){
				
				var key = (element.charAt(1) === "b" || element.charAt(1) === "#") ? element.substr(0,2) : element.charAt(0);
                var modifier = element.substr(key.length);

                App.notesCollection.setActiveNotes(key, modifier);
			}
		}
	})
	
	
    // INITIALIZING APP
    App.router =  new Router();
    Backbone.history.start({pushState: true})
    
	new NeckView();

    return App;
})(NoteDictionary, jQuery)

// TODO: fix sharp -> flat transition


// Initialize notes and string collections

// TEMPORARY TESTS AND SAMPLES:
// set chord Add true if setting a scale
//App.notesCollection.setActiveNotes("C", "major", true);

