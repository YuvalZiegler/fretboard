/*global Backbone _ NoteDictionary */

var Fretboard = (function (App) {


    App.RelatedView = Backbone.View.extend({
        el: '#related',
        dict:NoteDictionary,
        template: $('#definitionTemplate').html(),

        events:{
            "click .tag": "submitQuery"
        },

        initialize: function (){
            this.model = new App.DefinitionModel({});
            _.bindAll(this, 'render', 'submitQuery', 'updateNoteDisplay');
            App.dispatcher.on("chordChange", this.render);
            App.dispatcher.on("scaleChange", this.render);
            App.dispatcher.bind("displayToggle", this.updateNoteDisplay);
        },

        render:function(e){
           if (this.model !== e) {
               this.model.parseAndUpdate(e);
           }
           var html,result,warpperClass;
           var q=this.model.get('name');

           if (this.model.attributes.isScale) {
               warpperClass="chords";
               result = this.dict.getChordsOfScale(q);
               html="<h1>"+q+" scale includes the these chords:</h1>";
           } else {
               warpperClass="scales";
               result = this.dict.getScalesOfChord(q);
               html="<h1>the "+q+" chord appears in these scales:</h1>";
           }
           html+='<div id="relatedWrapper" class="'+warpperClass+'">';
           for (var i=0,l=result.length; i<l; i++){
              html += (this.createChildEl(result[i]));
           }
            html+='</div>';
           $(this.el).html(html);
        },
        createChildEl:function(q) {
           var data = this.dict.parseQuery(q);
           var view = new Backbone.View({model : new App.DefinitionModel(data)});
           var json = view.model.toJSON();
           return _.template(this.template,json);

        },
        updateNoteDisplay:function(e){
           this.render(this.model);
        },
        submitQuery:function(e){
           App.notesCollection.setActiveNotes(e.srcElement.innerText);
        }

    });

    return App;
})(Fretboard || {});