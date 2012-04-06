var App = (function (App) {
    App.SearchView = Backbone.View.extend({
        el: '#search',

        events : {
            'keyup' : 'handleEnter'
        },

        initialize: function (){
            _.bindAll(this)
            this.router = this.options.router;
            $(this.el).autocomplete({lookup:NoteDictionary.getAlldefinitions(), onSelect: this.handleEnter })
            $(this.el).focus();
        },

        handleEnter : function (e) {

            var element =  $(this.el).val()

            if (element.length>0){
                // test if between A-G (or a-g)
                if (element.charAt(0).match(/^[a-gA-G]/)){
                    // Test if sharp or flat
                    var key = (element.charAt(1) === "b" || element.charAt(1) === "#") ?
                        element.charAt(0).toUpperCase() + element.charAt(1)
                        :
                        element.charAt(0).toUpperCase();
                    // trim left space from modifier if exist
                    var modifier = element.substr(key.length).replace(/^\s+/,"");
                    var n = (element.charCodeAt(key.length) == 32) ? true : false;
                    App.notesCollection.setActiveNotes(key, modifier,n);

                }
            } else {
                App.notesCollection.setActiveNotes()
            }
        }
    })
    return App;
})(App || {});