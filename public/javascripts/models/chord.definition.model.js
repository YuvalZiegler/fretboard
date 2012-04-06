var App = (function (App) {

    App.ChordDefinitionModel  = Backbone.Model.extend({
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
            var query = NoteDictionary.getChord(chord.key,  chord.modifier)
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

            this.set({name:name, intervals:int, notes:notes});

        }
    });

    return App;
})(App || {});