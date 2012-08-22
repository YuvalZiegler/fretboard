/*global Backbone NoteDictionary */

var App = (function (App) {
    App.StringModel = Backbone.Model.extend({
        defaults: {
            key:undefined,
            octave:[]
        },
        initialize:function(){
            console.log(NoteDictionary.parseQuery(this.attributes.key+" chromatic"));
            this.set({key: this.attributes.key}, {silent:true});
            this.set({octave:NoteDictionary.parseQuery(this.attributes.key+" chromatic").notes}, {silent:true});
        }
    });
    return App;
})(App || {});