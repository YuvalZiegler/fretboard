/*global Backbone */
var App = (function (App) {

    App.NoteModel = Backbone.Model.extend({
        defaults: {
            note: undefined,
            active:false,
            interval: ''

        },
        initialize:function(){

        },
        reset:function(){
            this.set({ active:false, interval:'' });
        }
    });

    return App;
})(App || {});