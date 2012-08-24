/*global Backbone _ NoteDictionary */

var App = (function (App){

    App.NoteView = Backbone.View.extend({

        className:'fret',

        initialize:function(options){
            _.bindAll(this,'render');
            this.note = options.note;
            this.stringPosition = options.stringPosition;
            this.model = App.notesCollection.getModel(this.note);
            this.model.bind('change', this.render);
            // set fret classes
            $(this.el)
                .html('<div class="note inactive">' + this.model.attributes.note + '</div>')
                .removeClass()
                .addClass('fret ' + "pos-"+this.stringPosition);
            this.render();
        },

        render:function(){
            if(this.model.attributes.active){
                $(this.el)
                .html('<div class="note '+this.model.attributes.interval+' active">' + this.model.attributes.note + '</div>');
              
            } else {
                $(this.el)
                .html('<div class="note inactive">' + this.model.attributes.note + '</div>');
               
            }


        }

    });
    return App;
})(App||{});