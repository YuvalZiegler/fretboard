// Template setting for underscore to match handlebar style templating
_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };var NoteDictionary = (function (){

    ////////////////////////////////////////////////
    // Private
    ////////////////////////////////////////////////
    // TODO:  Add [A,B,C,D,E,F,G] Array to determine note order then sort through the notes Array using the interval indexes to determine if the note is sharp ot flat
    // var letters =       ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    var noteList =      ['A','A#','Bb','B','C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab'];
    var	notes =         ['A','A#/Bb', 'B', 'C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab'];
    var notesSharp =    ['A'	,'A#', 'B'	, 'C'	, 'C#'	, 'D'	, 'D#'	, 'E'	, 'F'	, 'F#' 	, 'G'	, 'G#'	];
    var	notesFlat =     ['A'	,'Bb', 'B'	, 'C'	, 'Db'	, 'D'	, 'Eb'	, 'E'	, 'F'	, 'Gb' 	, 'G'	, 'Ab'	];
    var intervals	=   ['P1'	, 'm2'	, 'M2'	, 'm3'	, 'M3'	, 'P4'	, 'd5'	, 'P5'	, 'm6'	, 'M6'	, 'm7'	, 'M7' ];

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
               'harmonic major' : 	{intervals:['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'M7']},
               'melodic major'	:	{intervals:['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'm7']},
               'minor'          :   {intervals:['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7']}
    }
    var chords = {
                'major'		: {intervals:['P1','M3','P5']},
                'm'			: {intervals:['P1','m3','P5']},
                'dim'   	: {intervals:['P1','m3','d5']},
                'aug'		: {intervals:['P1','M3','m6']},
                '6'     	: {intervals:['P1','M3','P5', 'M6']},
                'm6'    	: {intervals:['P1','m3','P5', 'M6']},
                '6/9'		: {intervals:['P1','M2','M3','P5', 'M6']},
                'maj7'		: {intervals:['P1','M3','P5', 'M7']},
                '7'			: {intervals:['P1','M3','P5', 'm7']},
                '7b5'		: {intervals:['P1','M3','d5', 'm7']},
                '7#5'		: {intervals:['P1','M3','m6', 'm7']},
                'm7'		: {intervals:['P1','m3','P5', 'm7']},
                'm7(maj7)'	: {intervals:['P1','m3','P5', 'M7']},
                'm7b5'		: {intervals:['P1','m3','d5', 'm7']},
                'dim7'		: {intervals:['P1','m3','d5', 'm7']},
                '9'			: {intervals:['P1','M2','M3','P5','m7']},
                '9b5'		: {intervals:['P1','M2','M3','d5','m7']},
                '9#5'		: {intervals:['P1','M2','M3','m6','m7']},
                'maj9'		: {intervals:['P1','M2','M3','P5','M7']},
                'm9'		: {intervals:['P1','M2','m3','P5','m7']},
                'm11'		: {intervals:['P1','m3','P4','P5','m7']},
                '13'		: {intervals:['P1','M3','P5','M6','m7']},
                'maj13'		: {intervals:['P1','M3','P5','M6','M7']},
                'sus4'		: {intervals:['P1','P4','P5']},
                'sus2'		: {intervals:['P1','M2','P5']},
                '7sus4'		: {intervals:['P1','P4','P5','m7']},
                '7sus2'		: {intervals:['P1','M2','P5','m7']},
                '9sus4'		: {intervals:['P1','M2','P4','P5','m7']},
                '9sus2'		: {intervals:['P1','M2', 'P5','m7']},
                '5'	    	: {intervals:['P1','P5']}
    }

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
        var n = shiftNotes(_.indexOf(notes, noteArray[0]))
        return _.map(noteArray , function (note) { return(_.indexOf(n, note)) });
    }
    function IntervalsToIndexes(intervalArray){
        return _.map(intervalArray, function(int){return _.indexOf(intervals, int)});
    }
    function IndexesToValues(indexesArray, valuesArray){
        return _.map(indexesArray, function (i){ return valuesArray[i] })
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
        // TODO: DECIDE ON ACTION WHEN KEY IS NOT IN A-G Range
        // test if between A-G (or a-g)
        if (key && key.length>0 && key.charAt(0).match(/^[a-gA-G]/)){
            // Test if sharp or flat
            return (key.charAt(1) === "b" || key.charAt(1) === "#") ?
                key.charAt(0).toUpperCase() + key.charAt(1)
                :
                key.charAt(0).toUpperCase();
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
                    return query.charCodeAt(key.length) === 32 ? this.getScale(key,modifier) : this.getChord(key,modifier);
                }
            } else {
                return false;
            }

        },
        getScale:function(key, scale){
            if (scales[scale]){
                return {key:key, scale:scale, notes:getNotes(key, scales[scale].intervals ), intervals: scales[scale].intervals, isScale:true}
            }  else {
                return {key:key, scale:scale, notes:[],intervals:[], isScale:true}
            }
        },
        getChord:function(key, chord){
            chord = (!chord) ? 'major' : chord;
            if(chords[chord] && key){
                return {key:key, chord:chord, notes:getNotes(key, chords[chord].intervals ), intervals: chords[chord].intervals, isScale:false}
            }  else {
                return {key:key, chord:chord, notes:[],intervals:[],isScale:false}
            }
        },
        getChordsOfScale:function(query, returnAsObject){
            var scale = this.parseQuery(query),
                scaleNotes = scale.notes,
                triads = [],
                chordArray = [],
                key;

            for (var i=0, l=scale.notes.length; i<l ; i++){
                triads[i] = notesToChord([scaleNotes[0],scaleNotes[2],scaleNotes[4]]);

                key = (scaleNotes[0].length>2) ? scaleNotes[0].substr(0,2) : scaleNotes[0]

                returnAsObject ? chordArray.push(this.getChord(key,triads[i])) :
                                 chordArray.push( key+""+(triads[i]==="major"? "":triads[i]));
                scaleNotes.push(scaleNotes.shift());
            }
            return chordArray;
        },
        isChordInScale:function(chord,scale){
           return (_.intersection(chord.notes,scale.notes).length === chord.notes.length);
        },
        getScalesOfChord:function(query, returnAsObject){
            var chord= this.parseQuery(query), scalesArray = [], noteArray;
            if(chord.key.charAt(1)=="b") {noteArray=notesFlat} else {noteArray=notesSharp}
            // loop through all notes
            for (var i=0, l = noteArray.length; i<l; i++){
               // loop through all scales
               for (var mod in scales){
                if (mod!="chromatic"){
                    var scale = this.parseQuery(noteArray[i]+" "+ mod);
                    if (this.isChordInScale(chord, scale)){
                        returnAsObject ? scalesArray.push(scale) :
                                         scalesArray.push(noteArray[i] + " " + scale.scale);
                    }
                }
               }
            }
            return scalesArray;
        },
        getAllDefinitions:function(){
            var definitions = [],  modifiers = []

            for(var key in chords) {
                if(chords.hasOwnProperty(key)) {
                    modifiers.push(key == 'major' ? '' : key);
                }
            }
            // convert the scale keys to an array of strings
            for(var key in scales) {
                if(scales.hasOwnProperty(key)) {
                    modifiers.push(" "+key);

                }
            }
           // add sharp and flat nots to definitions
           var l=modifiers.length
           for (var i=0; i<17; i++){
               for (var j=0;j<l; j++)
                   definitions.push(noteList[i]+modifiers[j])

           }
          return definitions
        }
    }

})();

// Export for mocha tests
if (typeof exports !== 'undefined') exports = module.exports = NoteDictionary;

var App = (function (App){

    App.Router = Backbone.Router.extend({

        routes:{
            '':  'setInstrument',
            'instrument/:name' : 'setInstrument'
        },
        initialize:function(options){
            // Setup the event dispatcher and an octave of NoteModels
            App.dispatcher = _.clone(Backbone.Events);
            App.notesCollection  = new App.NotesCollection();
        },

        setInstrument : function(name){
            // TODO: Move the instrument object into a database or create a reusable object outside this function maybe in a seperate file
            var instrument = {
                "bass":     ["E", "A", "D", "G"],
                "guitar":   ["E", "A", "D", "G", "B", "E"],
                "ukulele":  ["G", "C", "E", "A"]
            }

            var strings = instrument[name] || instrument["guitar"];
            this.createFretboardView(strings);
        },

        createFretboardView: function(strings){

            App.searchView = App.searchView  || new App.SearchView();
            App.chordDefinitionView = App.chordDefinitionView || new App.ChordDefinitionView({model: new App.ChordDefinitionModel()});
            App.stringsCollection = App.stringsCollection || new App.StringCollection([]);
            App.stringsCollection.reset();
            App.stringsCollection.initialize(strings)
            App.fretboard =  App.fretboard || new App.FretboardView();
        }
    });

    return App;

})(App || {});

var App = (function (App) {


    App.NotesCollection = Backbone.Collection.extend({

        dictionary:  NoteDictionary,
        flatNeutralSharp: 0,


        initialize: function(){
            var octave = NoteDictionary.getScale("A","chromatic").notes;

            for (var i = 0;  i< 12 ; i++){
                this.add(new App.NoteModel({note:octave[i]}));
            }
            _.bindAll(this,'activate');
            App.dispatcher.on("chordChange", this.activate)
            App.dispatcher.on("scaleChange", this.activate)
        },

        getModel:function(note){
            return _.find( this.models, function(t){ return t.attributes.note===note})
        },

        activate: function(e){
            _.each(this.models, function(model){
                model.reset();
            })
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
                    var c = result.notes[0].charAt(1)
                    if (c ==="#"){
                        this.flatNeutralSharp = 1
                    } else {
                        this.flatNeutralSharp = -1
                    }

                } else {
                    flatNeutralSharp = 0
                }
                var e = result.isScale ? "scaleChange" : "chordChange";
                App.dispatcher.trigger(e,result)
            }

        }


    });

    return App;
})(App || {});
var App = (function (App) {

    App.NoteModel = Backbone.Model.extend({
        defaults: {
            note: undefined,
            active:false,
            interval: ''

        },
        initialize:function(){

        },
        reset:function(){
            this.set({ active:false, interval:'' });
        }
    });

    return App;
})(App || {});var App = (function (App) {
    App.StringModel = Backbone.Model.extend({
        defaults: {
            key:undefined,
            octave:[]
        },
        initialize:function(){
            this.set({key: this.attributes.key}, {silent:true});
            this.set({octave:NoteDictionary.getScale(this.attributes.key,"chromatic").notes}, {silent:true})
        }
    });
    return App;
})(App || {});var App = (function (App) {
    App.StringCollection = Backbone.Collection.extend({
        initialize: function(strings){
            // reversing the array to create the strings from top to bottom
            strings.reverse();
            for (var i=0, l=strings.length; i<l; i++){
                this.add(new App.StringModel({key:strings[i]}))
            }
        }
    });

    return App;
})(App || {});var App = (function (App) {

    App.ChordDefinitionModel  = Backbone.Model.extend({
        defaults:{
            name:undefined,
            notes:undefined,
            intervals:[],
            definition:''
        },
        initialize:function(options){
            _.bindAll(this,'update');
            App.dispatcher.on("chordChange", this.update)
        },
        update:function (e) {
            var name = e.key+""+ (e.chord==="major" ? "" : e.chord );
            var int =  e.intervals;
            // check for flat sharp variations
            var notes =  _.map(e.notes, function(note){
                if (note.length > 1){
                    if (App.notesCollection.flatNeutralSharp>=0 ){
                        note = note.substr(0,2)
                    } else {
                        note =  note.substr(3,2)
                    }
                }
                return note
            })

            this.set({name:name, intervals:int, notes:notes});
        }
    });

    return App;
})(App || {});var App = (function (App) {
    App.SearchView = Backbone.View.extend({
        el: '#search',

        events : {
            'keyup' : 'handleEnter'
        },

        initialize: function (){
            _.bindAll(this);
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
})(App || {});/**
 * Author: YZ
 * Date: 4/6/12
 * Time: 11:44 AM
 */
var App = (function (App){

    App.NoteView = Backbone.View.extend({
        tagName:'li',
        className:'inactive',

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
                .html(this.model.attributes.note)
                .removeClass('inactive')
                .addClass(this.model.attributes.interval)
            } else {
                $(this.el)
                .html(this.model.attributes.note)
                .removeClass()
                .addClass('inactive ' + "pos-"+this.stringPosition)
            }


        }
    })
    return App;
})(App||{});var App = (function (App) {

    App.StringView = Backbone.View.extend({

        tagName:'ul',
        className:'string',

        initialize:function(){
            _.bindAll(this,'render');
            this.render();
        },

        render: function(){
            var l = this.model.attributes.octave.length;



            for (var i=0; i<l; i++){
                // creating views for each note
                var n = new App.NoteView({note:this.model.attributes.octave[i], stringPosition:i});
                $(this.el).append(n.el)
            }

        }
    })
    return App;
})(App || {});var App = (function (App) {
    App.FretboardView = Backbone.View.extend({
        el:'ul#neck',

        initialize:function(options){

            for (var i=0, l = App.stringsCollection.models.length; i<l ; i++ ){

                var string = new App.StringView({model:App.stringsCollection.models[i]});
                $(this.el).append(string.el);

            }

        }
    })
    return App;
})(App || {});var App = (function (App) {
    App.ChordDefinitionView = Backbone.View.extend({

        el: '#chord-definition',
        template: $('#definitionTemplate').html(),

        initialize: function(){
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
        },

        render: function(){

            var json = this.model.toJSON();
            $(this.el).html(_.template(this.template, json));
            return this;
        }
    });
    return App;
})(App || {});/**
 * Author: YZ
 * Date: 4/5/12
 * Time: 2:09 PM
 */

var App = (function (App){

    App.start = function(){
        App.router =  new App.Router();
        Backbone.history.start({pushState: true})
    }
    return App;

})(App||{});


App.start();

//var dat = new DAT.GUI({})