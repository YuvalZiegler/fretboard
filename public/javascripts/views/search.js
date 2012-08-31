/*global Backbone _ NoteDictionary */
var App = (function (App) {
    App.SearchView = Backbone.View.extend({
        el: '#search',

        events : {
            'keyup' : 'handleEnter'
        },

        initialize: function (){
            _.bindAll(this, 'render','handleEnter');
            this.router = this.options.router;
            $(this.el).autocomplete({lookup:NoteDictionary.getAllDefinitions(), onSelect: this.handleEnter });
            $(this.el).on('keydown', this.handleEnter);
            App.dispatcher.on("chordChange", this.render);
            App.dispatcher.on("scaleChange", this.render);
            $(this.el).focus();
        },

        handleEnter : function (event) {

            if ($(this.el).val()){
                  try {
                        App.notesCollection.setActiveNotes($(this.el).val());
                  } catch (e) {
                       console.log('App.dispatcher.trigger("onError",e)', e);
                  }
            }
        },
        render:function(e){
            if (e.query!== $(this.el).val()) {
                $(this.el).val(e.query);
            }
        }

    });
    return App;
})(App || {});