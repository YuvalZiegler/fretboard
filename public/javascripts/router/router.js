var App = (function (App){

    App.Router = Backbone.Router.extend({

        routes:{
            '':  'setInstrument',
            'instrument/:name' : 'setInstrument',
            'tuning/:strings' : 'setTuning'
        },
        initialize:function(options){
            // Setup the event dispatcher and an octave of NoteModels
            App.dispatcher = _.clone(Backbone.Events);
            App.notesCollection  = new App.NotesCollection();
        },

        setInstrument : function(name){
            // TODO: Move the instrument object into a database or create a reusable object outside this function maybe in a seperate file
            var instrument = {
                "bass":     ["E", "A", "D", "G"],
                "guitar":   ["E", "A", "D", "G", "B", "E"],
                "ukulele":  ["G", "C", "E", "A"]
            }

            var strings = instrument[name] || instrument["guitar"];
            this.createFretboardView(strings);
        },

        setTuning : function(tuning){
            var strings = tuning.toUpperCase().split(",");
            this.createFretboardView(strings);
        },

        createFretboardView: function(strings){
            App.searchView = App.searchView  || new App.SearchView();
            App.chordDefinitionView = App.chordDefinitionView || new App.ChordDefinitionView({model: new App.ChordDefinitionModel()});
            App.stringsCollection = App.stringsCollection || new App.StringCollection([]);
            App.stringsCollection.reset();
            App.stringsCollection.initialize(strings)
            App.fretboard =  App.fretboard || new App.FretboardView();
        }
    });

    return App;

})(App || {});

