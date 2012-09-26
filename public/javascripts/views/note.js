/*global Backbone _ NoteDictionary */

var Fretboard = (function (App){

    App.NoteView = Backbone.View.extend({

        className:'fret',

        initialize:function(options){
            _.bindAll(this,'render','update');
            this.note = options.note;
            this.stringPosition = options.stringPosition;
            this.model = App.notesCollection.getModel(this.note);
            this.model.bind('change', this.update);

            App.dispatcher.bind('displayToggle', this.update);

            // set fret classes
            $(this.el)
                .html('<div class="note inactive">' + this.model.attributes.note + '</div>')
                .removeClass()
                .addClass('fret ' + "pos-"+this.stringPosition);

            this.render();
        },

        render:function(){
            var displayText= App.DISPLAY_AS_INTERVALS ? this.model.attributes.interval :  this.model.attributes.note;
            if(this.model.attributes.active){
                $(this.el).html('<div class="note '+this.model.attributes.interval+' active">' + displayText + '</div>');
            } else {
                $(this.el).html('<div class="note inactive">' + this.model.attributes.note + '</div>');
            }
        },
        update:function(){
            var displayText = App.DISPLAY_AS_INTERVALS ? this.model.attributes.interval :  this.model.attributes.note;
            var cssClass =  this.model.attributes.active ? "note active " + this.model.attributes.interval : "note inactive";
            $(this.el.firstChild)
                .removeClass()
                .addClass(cssClass)
                .html(displayText || this.model.attributes.note);
        }


    });
    return App;
})(Fretboard||{});