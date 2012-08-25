/*global Backbone _ NoteDictionary */

var App = (function (App) {
    App.FretboardView = Backbone.View.extend({
        el:'#fretboard',

        initialize:function(options){
            _.bindAll(this, 'render');
            this.render();
        },

        render:function(){
            for (var i=0, l = App.stringsCollection.models.length; i<l ; i++ ){
                var string = new App.StringView({model:App.stringsCollection.models[i]});
                $(this.el).append(string.el);

            }
        }


    });
    return App;
})(App || {});
