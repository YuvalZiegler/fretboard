/*global Backbone _ NoteDictionary */

var Fretboard = (function (App) {


    App.RelatedView = Backbone.View.extend({
        el: '#related',
        dict:NoteDictionary,
        template: $('#definitionTemplate').html(),

        events:{
            "click .tag": "submitQuery"
        },

        initialize: function (){
            _.bindAll(this, 'render', 'submitQuery', 'update');
            App.dispatcher.on("chordChange", this.render);
            App.dispatcher.on("scaleChange", this.render);
            App.dispatcher.bind("displayToggle", this.update);
        },

        render:function(e){

           var html,result;

           if (e.isScale) {
               result = this.dict.getChordsOfScale(e.query);
               html="<h1>"+e.query+" scale includes the these chords:</h1>";
           } else {
               result = this.dict.getScalesOfChord(e.query);
               html="<h1>the "+e.query+" chord appears in these scales:</h1>";
           }

           for (var i=0,l=result.length; i<l; i++){
             //html +=
               this.createChildEl(result[i]);
           }

           $(this.el).html(html);

        },
        createChildEl:function(q) {
           var data = this.dict.parseQuery(q);
           var view =  new App.DefinitionView();
           var el = view.make("div", {"class": data.name}, "Bold! ");
           console.log(model);
        },
        update:function(){

        },
        submitQuery:function(e){
           App.notesCollection.setActiveNotes(e.srcElement.innerText);
        }

    });

    return App;
})(Fretboard || {});