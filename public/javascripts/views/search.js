/*global Backbone _ NoteDictionary */
var Fretboard = (function (App) {
    App.SearchView = Backbone.View.extend({
        el: '#search',

        events : {
            'keyup' : 'handleKeyDown'
        },

        initialize: function (){
            _.bindAll(this, 'render','handleKeyDown');
            $(this.el).autocomplete({lookup:NoteDictionary.getAllDefinitions(), onSelect: this.handleKeyDown });
            $(this.el).on('keydown', this.handleKeyDown);
            App.dispatcher.on("chordChange", this.render);
            App.dispatcher.on("scaleChange", this.render);
            $(this.el).focus();
        },

        handleKeyDown : function (event) {

            if ($(this.el).val()){
                  try {
                        App.notesCollection.setActiveNotes($(this.el).val());

                  } catch (e) {
                       console.log('Fretboard.dispatcher.trigger("onError",e)', e);
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
})(Fretboard || {});