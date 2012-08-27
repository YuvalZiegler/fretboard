/*global Backbone _ NoteDictionary */

var App = (function (App) {
    App.FretboardView = Backbone.View.extend({
        el:'#fretboard',

        initialize:function(options){
            _.bindAll(this, 'render', 'update');
            App.stringsCollection.on('remove', this.update);
            App.stringsCollection.on('add', this.update);
            this.render();
        },

        render:function(){
            for (var i=0, l = App.stringsCollection.models.length; i<l ; i++ ){
                var string = new App.StringView({model:App.stringsCollection.models[i]});
                $(this.el).append(string.el);
            }
        },
        update: function(e){
            $(this.el).empty();
            this.render();
            console.log("update function triggered in FretBoard view",e);
        }


    });
    return App;
})(App || {});
