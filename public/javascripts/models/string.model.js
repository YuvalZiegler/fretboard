var App = (function (App) {
    App.StringModel = Backbone.Model.extend({
        defaults: {
            key:undefined,
            octave:[]
        },
        initialize:function(){
            this.set({key: this.attributes.key}, {silent:true});
            this.set({octave:NoteDictionary.getScale(this.attributes.key,"chromatic").notes}, {silent:true})
        }
    });
    return App;
})(App || {});