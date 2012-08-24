/*global Backbone NoteDictionary */

var App = (function (App) {
    App.StringModel = Backbone.Model.extend({
        defaults: {
            key:undefined,
            octave:[]
        },
        initialize:function(options){

            this.tuneString(options.key, true);

        },
        tuneString:function(key, silent){
            this.set({key:key, octave:NoteDictionary.parseQuery(key+" chromatic").notes}, {silent:silent});
        }

    });
    return App;
})(App || {});