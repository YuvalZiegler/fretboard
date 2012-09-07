/*global Backbone _ NoteDictionary */

var App = (function (App) {


    App.RelatedView = Backbone.View.extend({
        el: '#related',
        dict:NoteDictionary,
        template: $('#definitionTemplate').html(),

        events:{
            "click .tag": "submitQuery"
        },

        initialize: function (){
            _.bindAll(this, 'render', 'submitQuery');
            App.dispatcher.on("chordChange", this.render);
            App.dispatcher.on("scaleChange", this.render);

        },

        render:function(e){
           var html,result,
               regEx= /\Bmajor/;
               var trim = function (o){
                   console.log(o.charAt(2));
                     return o.charAt(2)==="/" ?  o.substr(0,2) : o;
               };


           if (e.isScale) {
               result = this.dict.getChordsOfScale(e.query);
               html="<h1>"+e.query+" scale includes the following chords:</h1>";
           } else {
               result = this.dict.getScalesOfChord(e.query);
               html="<h1>the "+e.query+" chord appears in the following scales:</h1>";
           }

           for (var i=0,l=result.length; i<l; i++){

               var json = this.dict.parseQuery(result[i]);

               var notes = _.map(json.notes, trim);
               json.notes= notes;
               json.name= result[i].replace(regEx,"");


               html+=(_.template(this.template, json));


           }

           $(this.el).html(html);
        },

        submitQuery:function(e){
           App.notesCollection.setActiveNotes(e.srcElement.innerText);
        }

    });
    return App;
})(App || {});