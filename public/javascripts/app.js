////////////
// FRETBOARD
// (c) 2012 Yuval Ziegler.
// Fretboard is freely distributable under the MIT license.
///////////////////////////////////////////////////////////
/*global Backbone _ */

var NoteDictionary = (function (){

    ////////////////////////////////////////////////
    // Private
    ////////////////////////////////////////////////

    var noteList = ['A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab'];
    var notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];
    var notesSharp = ['A'    , 'A#', 'B'    , 'C'    , 'C#'    , 'D'    , 'D#'  , 'E'    , 'F'    , 'F#'     , 'G'    , 'G#'    ];
    var notesFlat = ['A'    , 'Bb', 'B'    , 'C'    , 'Db'    , 'D'    , 'Eb'  , 'E'    , 'F'    , 'Gb'     , 'G'    , 'Ab'    ];
    var intervals = ['P1'    , 'm2'    , 'M2'    , 'm3'    , 'M3'    , 'P4'    , 'd5'    , 'P5'    , 'm6'    , 'M6'    , 'm7'    , 'M7' ];
    var intervalsAlt = ['ROOT' , 'b2'    , '2'    , 'b3'    , '3'    , '4'    , 'b5'    , '5'    , 'b6'    , '6'    , 'b7'    , '7' ];

    var scales = {
               'chromatic'      :   {intervals:intervals},
               'pentatonic'     :   {intervals:['P1','m3','P4', 'd5', 'P5', 'm7']},
               'augmented'      :   {intervals:['P1', 'M2' , 'M3', 'd5'	, 'm6', 'm7' ]},
               'diminished'     :   {intervals:['P1', 'm2', 'm3', 'M3', 'd5', 'P5', 'M6', 'm7']},
               'major'			:	{intervals:['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7']},
               'dorian'			:   {intervals:['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7']},
               'phrygian'		:   {intervals:['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7']},
               'lydian'			:	{intervals:['P1', 'M2', 'M3', 'd5', 'P5', 'M6', 'M7']},
               'mixolydian'		:	{intervals:['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7']},
               'Aeolian'		:	{intervals:['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7']},
               'Locrian'		:	{intervals:['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7']},
               'harmonic major' :	{intervals:['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'M7']},
               'melodic major'	:	{intervals:['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'm7']},
               'harmonic minor' :   {intervals:['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M7']},
               'melodic minor'  :   {intervals:['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'M7']},
               'minor'          :   {intervals:['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7']}
    };

    var chords = {
        'major':{intervals:['P1', 'M3', 'P5']},
        'm':{intervals:['P1', 'm3', 'P5']},
        'dim':{intervals:['P1', 'm3', 'd5']},
        'aug':{intervals:['P1', 'M3', 'm6']},
        '6':{intervals:['P1', 'M3', 'P5', 'M6']},
        'm6':{intervals:['P1', 'm3', 'P5', 'M6']},
        '6/9':{intervals:['P1', 'M2', 'M3', 'P5', 'M6']},
        'maj7':{intervals:['P1', 'M3', 'P5', 'M7']},
        '7':{intervals:['P1', 'M3', 'P5', 'm7']},
        '7b5':{intervals:['P1', 'M3', 'd5', 'm7']},
        '7#5':{intervals:['P1', 'M3', 'm6', 'm7']},
        'm7':{intervals:['P1', 'm3', 'P5', 'm7']},
        'm(maj7)':{intervals:['P1', 'm3', 'P5', 'M7']},
        'm7b5':{intervals:['P1', 'm3', 'd5', 'm7']},
        'dim7':{intervals:['P1', 'm3', 'd5', 'm7']},
        '9':{intervals:['P1', 'M2', 'M3', 'P5', 'm7']},
        '9b5':{intervals:['P1', 'M2', 'M3', 'd5', 'm7']},
        '9#5':{intervals:['P1', 'M2', 'M3', 'm6', 'm7']},
        'maj9':{intervals:['P1', 'M2', 'M3', 'P5', 'M7']},
        'm9':{intervals:['P1', 'M2', 'm3', 'P5', 'm7']},
        'm11':{intervals:['P1', 'm3', 'P4', 'P5', 'm7']},
        '13':{intervals:['P1', 'M3', 'P5', 'M6', 'm7']},
        'maj13':{intervals:['P1', 'M3', 'P5', 'M6', 'M7']},
        'maj7b6':{intervals:['P1', 'M3', 'P5', 'm6', 'M7']},
        'm7b6':{intervals:['P1', 'm3', 'P5', 'm6', 'M7']},
        'sus4':{intervals:['P1', 'P4', 'P5']},
        'sus2':{intervals:['P1', 'M2', 'P5']},
        '7sus4':{intervals:['P1', 'P4', 'P5', 'm7']},
        '7sus2':{intervals:['P1', 'M2', 'P5', 'm7']},
        '9sus4':{intervals:['P1', 'M2', 'P4', 'P5', 'm7']},
        '9sus2':{intervals:['P1', 'M2', 'P5', 'm7']},
        '5':{intervals:['P1', 'P5']}
    };

    function notesToChord(noteArray){
        var intr =  IndexesToValues(notesToIndexes(noteArray), intervals);
        var result = _.keys(chords) ;
        return _.filter(result, function(i){
            if (_.isEqual(intr,chords[i].intervals)) {
                return i;
            }
        });
    }
    function notesToIndexes(noteArray){
        var n = shiftNotes(_.indexOf(notes, noteArray[0]));
        return _.map(noteArray , function (note) { return(_.indexOf(n, note)); });
    }
    function IntervalsToIndexes(intervalArray){
        return _.map(intervalArray, function(int){return _.indexOf(intervals, int);});
    }
    function IndexesToValues(indexesArray, valuesArray){
        return _.map(indexesArray, function (i){ return valuesArray[i];});
    }
    function shiftNotes (keyIndex){
       return notes.slice(keyIndex).concat(notes.slice(0,keyIndex));
    }
    function getNotes(key, intervals){
        var newNotesArray, indexes;
        // Are we working with a flat or a sharp scale/chord
        var targetNotes = (key.charAt(1)==='b') ? notesFlat : notesSharp;
        // CREATE A NEW NOTE ARRAY USING THE KEY AS A STARTING POINT
        newNotesArray = shiftNotes( _.indexOf(targetNotes, key));
        // Convert the intervals to Indexes and retrieve the notes from the newNotesArray
        indexes = IntervalsToIndexes(intervals);
        return IndexesToValues(indexes,newNotesArray);
    }
    function validateKey(key){

        // test if between A-G (or a-g)
        if (key && key.length>0 && key.charAt(0).match(/^[a-gA-G]/)){
            // Test if sharp or flat
            return (key.charAt(1) === "b" || key.charAt(1) === "#") ?
                key.charAt(0).toUpperCase() + key.charAt(1)
                :
                key.charAt(0).toUpperCase();
        } else {
            throw( "Oy! Not a note, hint (A - G)" );
        }

    }
    function getScale(key, scale){
        if (scales[scale]){
            return {key:key, scale:scale, notes:getNotes(key, scales[scale].intervals ), intervals: scales[scale].intervals, isScale:true};
        }  else {
            return {key:key, scale:scale, notes:[],intervals:[], isScale:true};
        }
    }
    function getChord(key, chord){
        chord = (!chord) ? 'major' : chord;
        if(chords[chord] && key){
            return {key:key, chord:chord, notes:getNotes(key, chords[chord].intervals ), intervals: chords[chord].intervals, isScale:false};
        }  else {
            return {key:key, chord:chord, notes:[],intervals:[],isScale:false};
        }
    }
    ////////////////////////////////////////////////
    // Public
    ////////////////////////////////////////////////
    return {
        // will return a chord or a scale from string query: parseQuery("C major")
        parseQuery: function (query){
            if (query.length>0){
                var key = validateKey(query);
                // trim left space from modifier if exist
                if(key){
                    var modifier = query.substr(key.length).replace(/^\s+/,"");
                    return query.charCodeAt(key.length) === 32 ? getScale(key,modifier) : getChord(key,modifier);
                }
            } else {
                return false;
            }

        },

        getChordsOfScale:function(query, returnAsObject){
            var scale = this.parseQuery(query),
                scaleNotes = scale.notes,
                triads = [],
                chordArray = [],
                key;

            for (var i=0, l=scale.notes.length; i<l ; i++) {
                triads[i] = notesToChord([scaleNotes[0], scaleNotes[2], scaleNotes[4]]);

                key = (scaleNotes[0].length > 2) ? scaleNotes[0].substr(0, 2) : scaleNotes[0];

                if (returnAsObject) {
                    chordArray.push(this.getChord(key, triads[i]));
                } else {
                    chordArray.push(key + "" + (triads[i] === "major" ? "" : triads[i]));
                }
                scaleNotes.push(scaleNotes.shift());
            }
            return chordArray;
        },
        isChordInScale:function(chord,scale){
           return (_.intersection(chord.notes,scale.notes).length === chord.notes.length);
        },
        getScalesOfChord:function(query, returnAsObject){
            var chord= this.parseQuery(query), scalesArray = [], noteArray;
            if(chord.key.charAt(1)==="b") {noteArray=notesFlat;} else {noteArray=notesSharp;}
            // loop through all notes
            for (var i=0, l = noteArray.length; i<l; i++){
               // loop through all scales
               for (var mod in scales){
                if (mod!=="chromatic"){
                    var scale = this.parseQuery(noteArray[i]+" "+ mod);
                    if (this.isChordInScale(chord, scale)) {
                        if (returnAsObject) {
                            scalesArray.push(scale);
                        } else {
                            scalesArray.push(noteArray[i] + " " + scale.scale);
                        }
                    }
                }
               }
            }
            return scalesArray;
        },
        getAllDefinitions:function(){
            var definitions = [],  modifiers = [];

            for(var mod in chords) {
                if(chords.hasOwnProperty(mod)) {
                    modifiers.push(mod === 'major' ? '' : mod);
                }
            }
            // convert the scale keys to an array of strings
            for(var key in scales) {
                if(scales.hasOwnProperty(key) && key!=="chromatic") {
                    modifiers.push(" "+key);
                }
            }

           // add sharp and flat notes to definitions
           var l=modifiers.length;
           for (var i=0; i<17; i++){
               for (var j=0;j<l; j++){
                   definitions.push(noteList[i]+modifiers[j]);
               }
           }
          return definitions;
        }
    };

})();

// Export for mocha tests or Node module
if (typeof exports !== 'undefined') { exports = module.exports = NoteDictionary; }

/*global Backbone _ NoteDictionary */
var Fretboard = (function (App){


    App.Router = Backbone.Router.extend({

        routes:{
            '':  'setInstrument',
            'instrument/:name' : 'setInstrument',
            'tuning/:strings' : 'setTuning',
            'tuning/:strings/:query' : 'setTuning',
            'instrument/:name/:query' : 'setInstrument'
        },

        initialize:function(options){
            // Setup an octave of NoteModels
            App.notesCollection  = new App.NotesCollection();
        },


        setInstrument : function(name, query){
            var instrument = {
                "bass":     ["E", "A", "D", "G"],
                "guitar":   ["E", "A", "D", "G", "B", "E"],
                "ukulele":  ["G", "C", "E", "A"]
            };
            name = name ? name.toLowerCase() : "guitar";
            var strings = instrument[name];
            this.createFretboardView(strings);
            if (query) {
                App.notesCollection.setActiveNotes(query);
            }
        },

        setTuning : function(tuning, query){
            var strings = tuning.split(",");
            this.createFretboardView(strings);
            if (query) {
                App.notesCollection.setActiveNotes(query);
            }
        },



        createFretboardView: function(strings){
            App.searchView = App.searchView  || new App.SearchView();
            App.chordDefinitionView = App.chordDefinitionView || new App.ChordDefinitionView({model: new App.ChordDefinitionModel()});
            App.stringsCollection = App.stringsCollection || new App.StringCollection([]);
            App.relatedView = App.relatedView || new App.RelatedView();
            App.stringsCollection.reset();
            App.stringsCollection.initialize(strings);
            App.fretboard =  App.fretboard || new App.FretboardView();
        }
    });

    return App;

})(Fretboard || {});

/*global Backbone _ NoteDictionary */
var Fretboard = (function (App) {

    App.NotesCollection = Backbone.Collection.extend({

        dictionary:  NoteDictionary,
        flatNeutralSharp: 0,


        initialize: function(){
            var octave = NoteDictionary.parseQuery("A chromatic").notes;

            for (var i = 0;  i< 12 ; i++){
                this.add(new App.NoteModel({note:octave[i]}));
            }
            _.bindAll(this,'activate');
            App.dispatcher.on("chordChange", this.activate);
            App.dispatcher.on("scaleChange", this.activate);
        },

        getModel:function(note){
            return _.find( this.models, function(t){ return t.attributes.note===note;});
        },

        activate: function(e){
            _.each(this.models, function(model){
                model.reset();
            });

            for (var i=0, l = e.notes.length; i<l; i++){
                var note= e.notes[i];
                var target = this.getModel(note);
                var interval = e.intervals[i];
                // THIS TRIGGERS A CHANGE EVENT IN THE MODEL
                target.set({active:true, interval:interval});
            }

        },

        setActiveNotes:function(query){

            var result = this.dictionary.parseQuery(query);
            if(result && result.notes.length!==0) {
                if (result.notes[0].length>1){
                    var c = result.notes[0].charAt(1);
                    if (c ==="#"){
                        this.flatNeutralSharp = 1;
                    } else {
                        this.flatNeutralSharp = -1;
                    }

                } else {
                    this.flatNeutralSharp = 0;
                }
                result.query = query;
                var e = result.isScale ? "scaleChange" : "chordChange";
                App.dispatcher.trigger(e,result);
            }

        }


    });

    return App;
})(Fretboard || {});
/*global Backbone */
var Fretboard = (function (App) {

    App.NoteModel = Backbone.Model.extend({
        defaults: {
            note: undefined,
            active:false,
            interval: undefined
        },
        initialize:function(){

        },
        reset:function(){
            this.set({ active:false, interval:'' },true);
        }
    });

    return App;
})(Fretboard || {});/*global Backbone NoteDictionary */

var Fretboard = (function (App) {
    App.StringModel = Backbone.Model.extend({
        defaults: {
            key:undefined,
            octave:[]
        },
        initialize:function(options){
            this.tuneString(options.key, true);
        },
        tuneString:function(key, silent){
            if (key.charAt(2)) { key = key.substr(0,2); }
            this.set({key:key, octave:NoteDictionary.parseQuery(key+" chromatic").notes}, {silent:silent});
        }


    });
    return App;
})(Fretboard || {});/*global Backbone */
var Fretboard = (function (App) {
    App.StringCollection = Backbone.Collection.extend({
        initialize: function(strings){
            // reversing the array to create the strings from top to bottom

            strings.reverse();
            for (var i=0, l=strings.length; i<l; i++){

                this.add(new App.StringModel({key:strings[i]}));
            }
        }
    });

    return App;
})(Fretboard || {});/*global Backbone NoteDictionary _ */

var Fretboard = (function (App) {

    App.ChordDefinitionModel  = Backbone.Model.extend({
        defaults:{
            name:undefined,
            notes:undefined,
            intervals:[]
        },
        initialize:function(){
            _.bindAll(this,'update');
            App.dispatcher.on("chordChange", this.update);
            App.dispatcher.on("scaleChange", this.update);
        },
        update:function (e){

            var name;
            if (e.isScale) {
                name = e.key+" " + e.scale ;
            }  else    {
                name = e.key+""+ (e.chord==="major" ? "" : e.chord );
            }

            var intr =  e.intervals;

            // check for flat sharp variations
            var notes =  _.map(e.notes, function(note){
                if (note.length > 1){
                    if (App.notesCollection.flatNeutralSharp>=0 ){
                        note = note.substr(0,2);
                    } else {
                        note =  note.substr(3,2);
                    }
                }
                return note;
            });

            this.set({key:e.key, name:name, intervals:intr, notes:notes});
        }
    });

    return App;
})(Fretboard || {});/*global Backbone _ NoteDictionary */
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
})(Fretboard || {});/*global Backbone _ NoteDictionary */

var Fretboard = (function (App){

    App.NoteView = Backbone.View.extend({

        className:'fret',

        initialize:function(options){
            _.bindAll(this,'render','update');
            this.note = options.note;
            this.stringPosition = options.stringPosition;
            this.model = App.notesCollection.getModel(this.note);
            this.model.bind('change', this.update);
            App.dispatcher.bind('change', this.update);
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
})(Fretboard||{});/*global Backbone _ NoteDictionary */
var Fretboard = (function (App) {

    App.StringView = Backbone.View.extend({

        tagName:'div',
        className:'string',
        UI: $('#stringUITemplate'),
        events: {
            "click .remove": "destroy",
            "click .shiftRight": "tuneDown",
            "click .shiftLeft": "tuneUp",
            "click .add": "addString"
        },

        initialize:function(){
            _.bindAll(this,'render','update');
            this.UI.remove();
            this.model.bind('change', this.update);
            this.render();

        },

        render: function(){

            // creating string UI
            $(this.el).append(this.UI.html());
            // creating views for each note
            for (var i= 0; i<12; i++){
                var n = new App.NoteView({note:this.model.attributes.octave[i], stringPosition:i});
                $(this.el).append(n.el);
            }
           

        },
        update: function(){
            $(this.el).empty();
            this.render();
        },

        destroy:function(){
            if (this.model.collection.models.length>1) {
              this.model.collection.remove(this.model);
            }
        },

        tuneUp:function(){
            var octave = this.model.get('octave');
            this.model.tuneString(octave[1]);
        },

        tuneDown:function(){
            var octave = this.model.get('octave');
            this.model.tuneString(octave[octave.length-1]);
        },

        addString:function(){
            var index = _.indexOf(this.model.collection.models,this.model);
            this.model.collection.add(new App.StringModel({key:"C"}), {at:index+1});
        }
    });
    return App;
})(Fretboard || {});/*global Backbone _ NoteDictionary */

var Fretboard = (function (App) {

    App.FretboardView = Backbone.View.extend({
        el:'#fretboard',

        initialize:function(options){
            _.bindAll(this, 'render', 'update');
            App.stringsCollection.on('remove', this.update);
            App.stringsCollection.on('add', this.update);
            this.render();
        },

        render:function(){
            for (var i=0, l = App.stringsCollection.models.length; i<l ; i++ ){
                var string = new App.StringView({model:App.stringsCollection.models[i]});
                $(this.el).append(string.el);
            }
        },
        update: function(e){

            $(this.el).empty();
            this.render();

        }


    });
    return App;
})(Fretboard || {});
/*global Backbone _ NoteDictionary */
var Fretboard = (function (App) {

    App.ChordDefinitionView = Backbone.View.extend({

        el: '#chord-definition',
        template: $('#definitionTemplate').html(),

        initialize: function(){
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
            App.dispatcher.bind('change', this.render);
        },

        render: function(){
            var json = this.model.toJSON();
            $(this.el).html(_.template(this.template, json));
            return this;
        }
    });
    return App;
})(Fretboard || {});/*global Backbone _ NoteDictionary */

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

           var html,result,
               regEx= /\Bmajor/;
               var trim = function (o){
                     return o.charAt(2)==="/" ?  o.substr(0,2) : o;
               };


           if (e.isScale) {
               result = this.dict.getChordsOfScale(e.query);
               html="<h1>"+e.query+" scale includes the these chords:</h1>";
           } else {
               result = this.dict.getScalesOfChord(e.query);
               html="<h1>the "+e.query+" chord appears in these scales:</h1>";
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
        update:function(){

        },
        submitQuery:function(e){
           App.notesCollection.setActiveNotes(e.srcElement.innerText);
        }

    });
    return App;
})(Fretboard || {});/*global Backbone _ */

var Fretboard = (function (App){
    // MAIN EVENT DISPATCHER
    App.dispatcher = _.clone(Backbone.Events);

    // State settings
    App.DISPLAY_AS_INTERVALS=false;

    App.displayTypeToggle = function(){
        App.DISPLAY_AS_INTERVALS=!App.DISPLAY_AS_INTERVALS;
        App.dispatcher.trigger("change");
    };

    App.start = function(){
        App.router =  new App.Router();
        Backbone.history.start({pushState: true});
    };

    return App;

})(Fretboard||{});


$().ready(Fretboard.start());