/*global Backbone _ NoteDictionary */
var App = (function (App) {

    App.StringView = Backbone.View.extend({

        tagName:'div',
        className:'string',
        UI: $('#stringUITemplate'),
        events: {
            "click .remove": "destroy",
            "click .shiftRight": "tuneDown",
            "click .shiftLeft": "tuneUp",
            "click .add": "addString"
        },

        initialize:function(){
            _.bindAll(this,'render','update');
            this.model.bind('change', this.update);

            this.render();

        },

        render: function(){
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
            this.model.collection.remove(this.model);

        },

        tuneUp:function(){
            var octave = this.model.get('octave');
            this.model.tuneString(octave[1]);
        },

        tuneDown:function(){
            var octave = this.model.get('octave');
            this.model.tuneString(octave[octave.length-1]);
        },

        addString:function(){
            var index = _.indexOf(this.model.collection.models,this.model);
            this.model.collection.add(new App.StringModel({key:"C"}), {at:index+1});
        }
    });
    return App;
})(App || {});