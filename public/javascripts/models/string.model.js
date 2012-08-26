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
            if (key.charAt(2)) { key = key.substr(0,2); }
            this.set({key:key, octave:NoteDictionary.parseQuery(key+" chromatic").notes}, {silent:silent});
        }


    });
    return App;
})(App || {});