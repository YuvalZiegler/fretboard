var NoteDictionary = (function (){

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

        var result = _.keys(chords)

        for (var i=0, l=result.length; i<l; i++){
            if( _.isEqual(chords[result[i]].intervals, intr) ){
                return ( result[i]);
            };
        }

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

