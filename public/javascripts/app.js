

////////////////////////////////////////////////////////////////////////
// BACKBONE STARTS HERE
////////////////////////////////////////////////////////////////////////	
var App = (function (dict, $){

    // Add event dispatching capabilities to the dictionary


    var App = {};



    var octave = dict.getScale("A","chromatic").notes;

    var Router = Backbone.Router.extend({
        routes:{
          '':  'setInstrument',
          'instrument/:name' : 'setInstrument'

        },
        initialize:function(options){
            // setup the event dispatcher
            App.dispatcher = _.clone(Backbone.Events);
            // a full octave of NoteModels
            App.notesCollection     = new NotesCollection();
            // Initialize and empty (guitar) string colletion -> will be populated by the routes
            App.stringsCollection   = new StringCollection([]);

			// Scale or chord input field
			App.searchView = new SearchView();
            App.chordDefinitionView = new ChordDefinitionView({model: new ChordDefinitionModel()});

        },

        setInstrument : function(name){

            var instrument = {
                "bass":     ["E", "A", "D", "G"],
                "guitar":   ["E", "A", "D", "G", "B", "E"],
                "ukulele":  ["G", "C", "E", "A"]
            }

            var strings = (instrument[name]) ? instrument[name] : instrument["guitar"];

            this.createStringCollection(strings);
        },

        createStringCollection: function(strings){

            App.stringsCollection.reset();
            App.stringsCollection.initialize(strings)

        }
    });

    /// COLLECTIONS AND MODELS
    var NotesCollection = Backbone.Collection.extend({

        dictionary:  dict,
        // -1 for flat - for neutral 1 for sharp
        flatNeutralSharp: 0,


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

            if (key && key.length>1){
                var c = key.charAt(1)
                if (c ==="#"){
                    this.flatNeutralSharp = 1
                } else {
                    this.flatNeutralSharp = -1
                }

            } else {
                flatNeutralSharp = 0
            }
            var n = scale ? this.dictionary.getScale(key, intervals) : this.dictionary.getChord(key, intervals);

            if(n.notes.length!==0) {
                var e = scale ? "scaleChange" : "chordChange";
                this.activate(n);
                App.dispatcher.trigger(e,{key:key, modifier:intervals,isScale:n})

            }

        }


	});

	var NoteModel = Backbone.Model.extend({
	  defaults: {
		note: undefined,
	    active:false,
		interval: ''

	  },
      initialize:function(){

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

    var ChordDefinitionModel  = Backbone.Model.extend({
        defaults:{
            name:undefined,
            notes:undefined,
            intervals:[],
            definition:''
        },
        initialize:function(options){
            _.bindAll(this,'update');
            App.dispatcher.on("chordChange", this.update)
        },
        update:function (chord) {

            var name = chord.key+""+chord.modifier;
            var query =dict.getChord(chord.key,  chord.modifier)
            var int =  query.intervals;
            // check for flat sharp variations
            var notes =  _.map(query.notes, function(note){
                if (note.length > 1){
                    if (App.notesCollection.flatNeutralSharp>=0 ){
                        note = note.substr(0,2)
                    } else {
                        note =  note.substr(3,2)
                    }
                }
                return note
            })
            //


            this.set({name:name, intervals:int, notes:notes});

        }
})
    /// VIEWS
    var NoteView = Backbone.View.extend({
        tagName:'li',
        className:'inactive',

        initialize:function(options){
            _.bindAll(this,'render')
            this.note = options.note;
            this.stringPosition = options.stringPosition;
            this.model = App.notesCollection.getModel(this.note)
            this.model.bind('change', this.render);
            this.render();
        },
        render:function(){
           if(this.model.attributes.active){
            $(this.el).html(this.model.attributes.note).removeClass('inactive').addClass(this.model.attributes.interval)
           } else {
               $(this.el).html(this.model.attributes.note).removeClass().addClass('inactive ' + "pos-"+this.stringPosition)
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
                var n = new NoteView({note:this.model.attributes.octave[i], stringPosition:i});
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

		events : {
			'keyup' : 'handleEnter'
		},

		initialize: function (){
            _.bindAll(this)
			this.router = this.options.router;
            $(this.el).autocomplete({lookup:dict.getAlldefinitions(), onSelect: this.handleEnter })
			$(this.el).focus();
		},

		handleEnter : function (e) {

			var element =  $(this.el).val()

			if (element.length>0){
                // test if between A-G (or a-g)
				if (element.charAt(0).match(/^[a-gA-G]/)){
				    // Test if sharp or flat
                    var key = (element.charAt(1) === "b" || element.charAt(1) === "#") ?
                        element.charAt(0).toUpperCase() + element.charAt(1)
                         :
                        element.charAt(0).toUpperCase();
                    // trim left space from modifier if exist
                    var modifier = element.substr(key.length).replace(/^\s+/,"");
                    var n = (element.charCodeAt(key.length) == 32) ? true : false;
                    App.notesCollection.setActiveNotes(key, modifier,n);

                }
			} else {
                 App.notesCollection.setActiveNotes()
            }
		}
	})

    var ChordDefinitionView = Backbone.View.extend({

      el: '#chord-definition',
      template: $('#definitionTemplate').html(),

      initialize: function(){
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
      },

      render: function(){

          var json = this.model.toJSON();
          $(this.el).html(_.template(this.template, json));
          return this;
      }
    });

    // INITIALIZING APP
    App.router =  new Router();
    Backbone.history.start({pushState: true})

	new NeckView();

    return App;
})(NoteDictionary, jQuery)
