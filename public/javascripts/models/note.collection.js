var App = (function (App) {

    App.NotesCollection = Backbone.Collection.extend({

        dictionary:  NoteDictionary,
        flatNeutralSharp: 0,


        initialize: function(){
            var octave = NoteDictionary.getScale("A","chromatic").notes;

            for (var i = 0;  i< 12 ; i++){
                this.add(new App.NoteModel({note:octave[i]}));
            }
            _.bindAll(this,'activate');
            App.dispatcher.on("chordChange", this.activate)
            App.dispatcher.on("scaleChange", this.activate)
        },

        getModel:function(note){
            return _.find( this.models, function(t){ return t.attributes.note===note})
        },

        activate: function(e){
            _.each(this.models, function(model){
                model.reset();
            })

            for (var i=0, l = e.notes.length; i<l; i++){
                var note= e.notes[i];
                var target = this.getModel(note);
                var interval = e.intervals[i];
                // THIS TRIGGERS A CHANGE EVENT IN THE MODEL
                target.set({active:true, interval:interval});

            }

        },

        setActiveNotes:function(query){

            var result = this.dictionary.parseQuery(query);
            if(result && result.notes.length!==0) {
                if (result.notes[0].length>1){
                    var c = result.notes[0].charAt(1)
                    if (c ==="#"){
                        this.flatNeutralSharp = 1
                    } else {
                        this.flatNeutralSharp = -1
                    }

                } else {
                    flatNeutralSharp = 0
                }
                var e = result.isScale ? "scaleChange" : "chordChange";
                App.dispatcher.trigger(e,result)
            }

        }


    });

    return App;
})(App || {});
