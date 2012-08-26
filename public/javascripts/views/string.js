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
            $(this.el).append("<div class='stringUI locked'>" +
                "<a href='javascript:void(0)' rel='lockUnlockToggle' ><span class='icon-lock'></span></a>" +
                "<a href='javascript:void(0)' rel='stringTuneDown' ><span class='icon-arrow-left'></span></a>" +
                "<a href='javascript:void(0)' rel='stringTuneUp'><span class='icon-arrow-right'></span></a>" +
                "</div>");

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