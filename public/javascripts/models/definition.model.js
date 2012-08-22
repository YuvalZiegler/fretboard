/*global Backbone NoteDictionary _ */

var App = (function (App) {

    App.ChordDefinitionModel  = Backbone.Model.extend({
        defaults:{
            name:undefined,
            notes:undefined,
            intervals:[]
        },
        initialize:function(){
            _.bindAll(this,'update');
            App.dispatcher.on("chordChange", this.update);
            App.dispatcher.on("scaleChange", this.update);
        },
        update:function (e){

            var name;
            if (e.isScale) {
                name = e.key+" " + e.scale ;
            }  else    {
                name = e.key+""+ (e.chord==="major" ? "" : e.chord );
            }

            var intr =  e.intervals;

            // check for flat sharp variations
            var notes =  _.map(e.notes, function(note){
                if (note.length > 1){
                    if (App.notesCollection.flatNeutralSharp>=0 ){
                        note = note.substr(0,2);
                    } else {
                        note =  note.substr(3,2);
                    }
                }
                return note;
            });

            this.set({key:e.key, name:name, intervals:intr, notes:notes});
        }
    });

    return App;
})(App || {});