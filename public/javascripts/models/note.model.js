/*global Backbone */
var Fretboard = (function (App) {

    App.NoteModel = Backbone.Model.extend({
        defaults: {
            note: undefined,
            active:false,
            interval: undefined
        },
        initialize:function(){

        },
        reset:function(){
            this.set({ active:false, interval:'' },true);
        }
    });

    return App;
})(Fretboard || {});