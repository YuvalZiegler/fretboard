/*global Backbone _ NoteDictionary */
var Fretboard = (function (App){

    // State settings
    App.DISPLAY_AS_INTERVALS=false;

    App.Router = Backbone.Router.extend({

        routes:{
            '':  'setInstrument',
            'instrument/:name' : 'setInstrument',
            'tuning/:strings' : 'setTuning',
            'tuning/:strings/:query' : 'setTuning',
            'instrument/:name/:query' : 'setInstrument'
        },

        initialize:function(options){
            // Setup the event dispatcher and an octave of NoteModels

            App.dispatcher = _.clone(Backbone.Events);
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
            App.chordDefinitionView = App.chordDefinitionView || new App.ChordDefinitionView({model: new App.ChordDefinitionModel()});
            App.stringsCollection = App.stringsCollection || new App.StringCollection([]);
            App.relatedView = App.relatedView || new App.RelatedView();
            App.stringsCollection.reset();
            App.stringsCollection.initialize(strings);
            App.fretboard =  App.fretboard || new App.FretboardView();
        }
    });

    return App;

})(Fretboard || {});

