var App = (function (App) {
    App.StringCollection = Backbone.Collection.extend({
        initialize: function(strings){
            // reversing the array to create the strings from top to bottom
            strings.reverse();
            for (var i=0, l=strings.length; i<l; i++){
                this.add(new App.StringModel({key:strings[i]}))
            }
        }
    });

    return App;
})(App || {});