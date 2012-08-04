var App = (function (App) {
    App.SearchView = Backbone.View.extend({
        el: '#search',

        events : {
            'keyup' : 'handleEnter'
        },

        initialize: function (){
            _.bindAll(this);
            this.router = this.options.router;
            $(this.el).autocomplete({lookup:NoteDictionary.getAllDefinitions(), onSelect: this.handleEnter })
            $(this.el).focus();
        },

        handleEnter : function (keyEvent) {

            if ($(this.el).val()){
                  try {
                        App.notesCollection.setActiveNotes($(this.el).val());
                  } catch (e) {
                       //console.log('App.dispatcher.trigger("onError",e)', e)
                  }
            }
        }
    })
    return App;
})(App || {});