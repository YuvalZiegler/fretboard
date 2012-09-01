/*global Backbone _ NoteDictionary */
var App = (function (App) {
    App.RelatedView = Backbone.View.extend({
        el: '#related',


        initialize: function (){
            _.bindAll(this, 'render');
            App.dispatcher.on("chordChange", this.render);
            App.dispatcher.on("scaleChange", this.render);

        },

        render:function(e){
           if (e.isScale) {
               console.log("chords of scale:", NoteDictionary.getChordsOfScale(e.query));
           } else {
               console.log("chord in scales:", NoteDictionary.getScalesOfChord(e.query));
           }
        }

    });
    return App;
})(App || {});