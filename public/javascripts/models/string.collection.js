/*global Backbone */
var Fretboard = (function (App) {
    App.StringCollection = Backbone.Collection.extend({

        initialize: function(strings){
            if(strings.length){
               var l = strings.length;
                while (l--){
                    this.add(new App.StringModel({key:strings[l]}));
                }
            }
        }
    });

    return App;
})(Fretboard || {});