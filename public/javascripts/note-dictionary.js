var NoteDictionary = (function (){

    ////////////////////////////////////////////////
    // Private
    ////////////////////////////////////////////////
    var noteList =      ['A','A#','Bb','B','C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab']
    var	notes =         ['A','A#/Bb', 'B', 'C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab'];
    var notesSharp =    ['A'	,'A#', 'B'	, 'C'	, 'C#'	, 'D'	, 'D#'	, 'E'	, 'F'	, 'F#' 	, 'G'	, 'G#'	];
    var	notesFlat =     ['A'	,'Bb', 'B'	, 'C'	, 'Db'	, 'D'	, 'Eb'	, 'E'	, 'F'	, 'Gb' 	, 'G'	, 'Ab'	];
    var intervals	=   ['P1'	, 'm2'	, 'M2'	, 'm3'	, 'M3'		, 'P4'	, 'd5'	, 'P5'	, 'm6'	, 'M6'	, 'm7'	, 'M7' ];

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

    function IntervalsToIndexes(intervalArray){
        var indexesArray = [];
        for (var i=0, length=intervalArray.length; i<intervalArray.length; i++) {
            indexesArray.push(_.indexOf(intervals, intervalArray[i]));
        }
        return indexesArray;
    }
    function IndexesToNotes(indexesArray, noteArray){
        var n = [];
        for (var i=0, length=indexesArray.length; i<indexesArray.length; i++) { n.push(noteArray[indexesArray[i]]); }
        return n;
    }
    function shiftNotes (keyIndex){
        var n = notes.slice(keyIndex);
        for (var i=0; i<keyIndex; i++) { n.push(notes[i]); }
        return n;
    }
    function getNotes(key, intervals){
        var keyIndex, newNotesArray, indexes;
        // Are we working with a flat or a sharp scale/chord
        var targetNotes = (key.charAt(1)==='b') ? notesFlat : notesSharp;
        // GET THE INDEX OF THE KEY FROM THE NOTES ARRAY
        keyIndex = _.indexOf(targetNotes, key);
        // CREATE A NEW NOTE ARRAY USING THE KEY AS A STARTING POINT
        newNotesArray = shiftNotes( _.indexOf(targetNotes, key));
        // Convert the intervals to Indexes and retrieve the notes from the newNotesArray
        indexes = IntervalsToIndexes(intervals);
        return IndexesToNotes(indexes,newNotesArray);
    }

    ////////////////////////////////////////////////
    // Public
    ////////////////////////////////////////////////
    return {
        getScale:function(key, scale){
            if (scales[scale]){

                return {notes:getNotes(key, scales[scale].intervals ), intervals: scales[scale].intervals}

            }  else {
                return {notes:[],intervals:[]}
            }
        },
        getChord:function(key, chord){

            chord = (!chord) ? 'major' : chord;
            if(chords[chord] && key){

                return {notes:getNotes(key, chords[chord].intervals ), intervals: chords[chord].intervals}

            }  else {
                return {notes:[],intervals:[]}
            }
        },
        getAlldefinitions:function(){
            var definitions = [],  modifiers = []

            // convert the chords keys to an array of strings
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

