var App = (function (App){

    App.Router = Backbone.Router.extend({
        routes:{
            '':  'setInstrument',
            'instrument/:name' : 'setInstrument'
        },
        initialize:function(options){
            // setup the event dispatcher
            App.dispatcher = _.clone(Backbone.Events);
            // a full octave of NoteModels
            App.notesCollection     = new App.NotesCollection();
            // Initialize and empty (guitar) string colletion -> will be populated by the routes
            App.stringsCollection   = new App.StringCollection([]);
            // Scale or chord input field
            App.searchView = new App.SearchView();
            App.chordDefinitionView = new App.ChordDefinitionView({model: new App.ChordDefinitionModel()});

        },

        setInstrument : function(name){

            var instrument = {
                "bass":     ["E", "A", "D", "G"],
                "guitar":   ["E", "A", "D", "G", "B", "E"],
                "ukulele":  ["G", "C", "E", "A"]
            }

            var strings = (instrument[name]) ? instrument[name] : instrument["guitar"];

            this.createFretboardView(strings);
        },

        createFretboardView: function(strings){
            App.stringsCollection.reset();
            App.stringsCollection.initialize(strings)
            App.fretboard = new App.FretboardView();
        }
    });

    return App;

})(App || {});

