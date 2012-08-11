/**
 * Author: YZ
 * Date: 4/6/12
 * Time: 11:44 AM
 */
var App = (function (App){

    App.NoteView = Backbone.View.extend({

        className:'fret',

        initialize:function(options){
            _.bindAll(this,'render')
            this.note = options.note;
            this.stringPosition = options.stringPosition;
            this.model = App.notesCollection.getModel(this.note)
            this.model.bind('change', this.render);
            this.render();
        },

        render:function(){
            if(this.model.attributes.active){
                $(this.el)
                .html('<div class="note active">' + this.model.attributes.note + '</div>')
                .addClass(this.model.attributes.interval)
            } else {
                $(this.el)
                .html('<div class="note inactive">' + this.model.attributes.note + '</div>')
                .removeClass()
                .addClass('fret ' + "pos-"+this.stringPosition)
            }


        }
    })
    return App;
})(App||{});