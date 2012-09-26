/*global Backbone _ NoteDictionary */
var Fretboard = (function (App){


    App.Router = Backbone.Router.extend({

        routes:{
            '':  'setInstrument',
            'instrument/:name' : 'setInstrument',
            'tuning/:strings' : 'setTuning',
            'tuning/:strings/:query' : 'setTuning',
            'instrument/:name/:query' : 'setInstrument'
        },

        initialize:function(options){
            // Setup an octave of NoteModels
            App.notesCollection  = new App.NotesCollection();
        },


        setInstrument : function(name, query){
            var instrument = {
                "bass":     ["E", "A", "D", "G"],
                "guitar":   ["E", "A", "D", "G", "B", "E"],
                "ukulele":  ["G", "C", "E", "A"]
            };
            name = name ? name.toLowerCase() : "guitar";
            var strings = instrument[name];
            this.createFretboardView(strings);
            if (query) {
                App.notesCollection.setActiveNotes(query);
            }
        },

        setTuning : function(tuning, query){
            var strings = tuning.split(",");
            this.createFretboardView(strings);
            if (query) {
                App.notesCollection.setActiveNotes(query);
            }
        },


        createFretboardView: function(strings){
            App.searchView = App.searchView  || new App.SearchView();
            App.definitionView = App.definitionView || new App.DefinitionView({model: new App.DefinitionModel({bindEvents:true})});
            App.stringsCollection = App.stringsCollection || new App.StringCollection([]);
            App.relatedView = App.relatedView || new App.RelatedView();
            App.stringsCollection.reset();
            App.stringsCollection.initialize(strings);
            App.fretboard =  App.fretboard || new App.FretboardView();
        }
    });

    return App;

})(Fretboard || {});

