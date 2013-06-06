/*global Backbone, NoteDictionary, _ */

var Fretboard = (function (App) {

    App.DefinitionModel  = Backbone.Model.extend({
        defaults:{
            name:undefined,
            notes:undefined,
            intervals:[],
            isScale:false
        },

        initialize:function(attributes){
            if (attributes) { this.parseAndUpdate(attributes);}
            _.bindAll(this,'parseAndUpdate');
            if (attributes.bindEvents){
                App.dispatcher.on("chordChange", this.parseAndUpdate);
                App.dispatcher.on("scaleChange", this.parseAndUpdate);
            }
        },



        parseAndUpdate:function (e){

            if ( e.isScale) {
                this.attributes.name = e.key+" " + e.scale ;
            }  else    {
                this.attributes.name = e.key+""+ (e.chord==="major" ? "" : e.chord );
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
            this.set({key:e.key, name:this.attributes.name, intervals:intr, notes:notes, isScale: e.isScale});
        }
    });

    return App;
})(Fretboard || {});