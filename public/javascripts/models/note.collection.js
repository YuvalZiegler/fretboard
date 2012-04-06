var App = (function (App) {


    App.NotesCollection = Backbone.Collection.extend({

        dictionary:  NoteDictionary,
        flatNeutralSharp: 0,


        initialize: function(){
            var octave = NoteDictionary.getScale("A","chromatic").notes;

            for (var i = 0;  i< 12 ; i++){
                this.add(new App.NoteModel({note:octave[i]}));
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

    return App;
})(App || {});