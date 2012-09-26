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
            _.bindAll(this, 'render', 'submitQuery', 'update');
            App.dispatcher.on("chordChange", this.render);
            App.dispatcher.on("scaleChange", this.render);
            App.dispatcher.bind("change", this.update);
        },

        render:function(e){

           var html,result;

           if (e.isScale) {
               result = this.dict.getChordsOfScale(e.query);
               html="<h1>"+e.query+" scale includes the these chords:</h1>";
           } else {
               result = this.dict.getScalesOfChord(e.query);
               html="<h1>the "+e.query+" chord appears in these scales:</h1>";
           }

           for (var i=0,l=result.length; i<l; i++){
               html+=(_.template(this.template, this.getChildEl(result[i])));
           }

           $(this.el).html(html);
        },
        getChildEl:function(data) {
            console.log(data);
            var regEx= /\Bmajor/;
            var trim = function (o){
                return o.charAt(2)==="/" ?  o.substr(0,2) : o;
            };
            var props = this.dict.parseQuery(data);
            props.notes= _.map(props.notes, trim);
            props.name= data.replace(regEx,"");
            return props;
        },
        update:function(){

        },
        submitQuery:function(e){
           App.notesCollection.setActiveNotes(e.srcElement.innerText);
        }

    });

    return App;
})(Fretboard || {});