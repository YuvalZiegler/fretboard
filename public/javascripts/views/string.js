/*global Backbone _ NoteDictionary */
var App = (function (App) {

    App.StringView = Backbone.View.extend({

        tagName:'div',
        className:'string',
        noteModels:[],


        initialize:function(){
            _.bindAll(this,'render','update');

            this.model.bind('change', this.update);

            this.render();

        },

        render: function(){
            for (var i= 0; i<12; i++){
                // creating views for each note
                var n = new App.NoteView({note:this.model.attributes.octave[i], stringPosition:i});
                $(this.el).append(n.el);
            }


        },
        update: function(){
            $(this.el).empty();
            this.render();

        }
    });
    return App;
})(App || {});