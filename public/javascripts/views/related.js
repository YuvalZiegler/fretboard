/*global Backbone _ NoteDictionary */
var App = (function (App) {
    App.RelatedView = Backbone.View.extend({
        el: '#related',
        events:{
            "click .tag":          "submitQuery"
        },

        initialize: function (){
            _.bindAll(this, 'render', 'submitQuery');
            App.dispatcher.on("chordChange", this.render);
            App.dispatcher.on("scaleChange", this.render);

        },

        render:function(e){
           var result,html;
           if (e.isScale) {
               result = NoteDictionary.getChordsOfScale(e.query);
               html="<h1>"+e.query+" scale includes the following chords:</h1><ul>";
           } else {
               result = NoteDictionary.getScalesOfChord(e.query);
               html="<h1>the "+e.query+" chord appears in the following scales:</h1><ul>";
           }
           for (var i=0,l=result.length; i<l; i++){

                html+="<a href='#'><li class='tag'>"+result[i]+"</li></a>";
           }
           html+="</ul>";
           $(this.el).html(html);
        },
        submitQuery:function(e){
           App.notesCollection.setActiveNotes(e.srcElement.innerText);
        }

    });
    return App;
})(App || {});