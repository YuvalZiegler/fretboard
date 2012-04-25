var App = (function (App) {
    App.SearchView = Backbone.View.extend({
        el: '#search',

        events : {
            'keyup' : 'handleEnter'
        },

        initialize: function (){
            _.bindAll(this)
            this.router = this.options.router;
            $(this.el).autocomplete({lookup:NoteDictionary.getAllDefinitions(), onSelect: this.handleEnter })
            $(this.el).focus();
        },

        handleEnter : function (e) {

            if ($(this.el).val()){
                   App.notesCollection.setActiveNotes($(this.el).val());
            }

        }
    })
    return App;
})(App || {});