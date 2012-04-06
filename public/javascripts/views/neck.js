var App = (function (App) {
    App.NeckView = Backbone.View.extend({
        el:'ul#neck',

        initialize:function(options){
            for (var i=0, l = App.stringsCollection.models.length; i<l ; i++ ){
                var string = new App.StringView({model:App.stringsCollection.models[i]});
                $(this.el).append(string.el);

            }

        }
    })
    return App;
})(App || {});