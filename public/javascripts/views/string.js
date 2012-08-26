/*global Backbone _ NoteDictionary */
var App = (function (App) {

    App.StringView = Backbone.View.extend({

        tagName:'div',
        className:'string',
        UI: $('#stringUITemplate'),
        events: {
            "click .remove": "destroy",
            "click .tuneUp": "tuneUp",
            "click .tuneDown": "tuneDown"
        },

        initialize:function(){
            _.bindAll(this,'render','update');
            this.model.bind('change', this.update);

            this.render();

        },

        render: function(){
            console.log(this.model);
            console.log("render")
            // creating string UI
            $(this.el).append(this.UI.html());
            // creating views for each note
            for (var i= 0; i<12; i++){
                var n = new App.NoteView({note:this.model.attributes.octave[i], stringPosition:i});
                $(this.el).append(n.el);
            }


        },
        update: function(){
            $(this.el).empty();
            this.render();
        },

        destroy:function(){
          this.remove();
        },

        tuneUp:function(){
            var octave = this.model.get('octave');
            this.model.tuneString(octave[1]);
        },

        tuneDown:function(){
            var octave = this.model.get('octave');
            this.model.tuneString(octave[octave.length-1]);
        }
    });
    return App;
})(App || {});