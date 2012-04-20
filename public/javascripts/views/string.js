var App = (function (App) {

    App.StringView = Backbone.View.extend({

        tagName:'ul',
        className:'string',

        initialize:function(){
            _.bindAll(this,'render')
            this.render();
        },

        render: function(){
            var l = this.model.attributes.octave.length;



            for (var i=0; i<l; i++){
                // creating views for each note
                var n = new App.NoteView({note:this.model.attributes.octave[i], stringPosition:i});
                $(this.el).append(n.el)
            }

        }
    })
    return App;
})(App || {});