(function(window){	
	var NoteDictionary = function (){
		////////////////
		// Private	
		////////////////
        var noteList= ['A','A#','Bb','B','C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab']
        var	notes = ['A','A#/Bb', 'B', 'C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab'];
		var notesSharp = ['A'	,'A#', 'B'	, 'C'	, 'C#'	, 'D'	, 'D#'	, 'E'	, 'F'	, 'F#' 	, 'G'	, 'G#'	];
		var	notesFlat = ['A'	,'Bb', 'B'	, 'C'	, 'Db'	, 'D'	, 'Eb'	, 'E'	, 'F'	, 'Gb' 	, 'G'	, 'Ab'	];

		var intervals	= ['P1'	, 'm2'	, 'M2'	, 'm3'	, 'M3'		, 'P4'	, 'd5'		, 'P5'	, 'm6'	, 'M6'		, 'm7'	, 'M7' 		];
		var scales = {
                   'chromatic'      :   intervals,
                   'pentatonic'     :   ['P1','m3','P4', 'd5', 'P5', 'm7'],
                   'augmented'      :   ['P1'	, 'M2' , 'M3', 'd5'	, 'm6', 'm7' ],
                   'diminished'     :   ['P1', 'm2', 'm3', 'M3', 'd5', 'P5', 'M6', 'm7'],
	 			   'major'			:	['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
	 			   'dorian'			:   ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'],
	 			   'phrygian'		:   ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
	 			   'lydian'			:	['P1', 'M2', 'M3', 'd5', 'P5', 'M6', 'M7'],
	 			   'mixolydian'		:	['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
	 			   'Aeolian'		:	['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
	 			   'Locrian'		:	['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'],
	 			   'harmonic major' 	: 	['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'M7'],
	 			   'melodic major'	:	['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'm7']
		}
	
		var chords = {
			'major'		: ['P1','M3','P5'],
			'm'			: ['P1','m3','P5'],
			'dim'   	: ['P1','m3','d5'],
			'aug'		: ['P1','M3','m6'],
            '6'     	: ['P1','M3','P5', 'M6'],
            'm6'    	: ['P1','m3','P5', 'M6'],
            '6/9'		: ['P1','M2','M3','P5', 'M6'],
            'maj7'		: ['P1','M3','P5', 'M7'],
            '7'			: ['P1','M3','P5', 'm7'],
            '7b5'		: ['P1','M3','b5', 'm7'],
            '7#5'		: ['P1','M3','m6', 'm7'],
            'm7'		: ['P1','m3','P5', 'm7'],
            'm7(maj7)'	: ['P1','m3','P5', 'M7'],
            'm7b5'		: ['P1','m3','b5', 'm7'],
            'dim7'		: ['P1','m3','d5', 'm7'],
            '9'			: ['P1','M2','M3','P5','m7'],
            '9b5'		: ['P1','M2','M3','b5','m7'],
            '9#5'		: ['P1','M2','M3','m6','m7'],
            'maj9'		: ['P1','M2','M3','P5','M7'],
            'm9'		: ['P1','M2','m3','P5','m7'],
            'm11'		: ['P1','m3','P4','P5','m7'],
            '13'		: ['P1','M3','P5','M6','m7'],
            'sus4'		: ['P1','P4','P5'],
            'sus2'		: ['P1','M2','P5'],
            '7sus4'		: ['P1','P4','P5','m7'],
            '7sus2'		: ['P1','M2','P5','m7'],
            '9sus4'		: ['P1','M2','P4','P5','m7'],
            '9sus2'		: ['P1','M2', 'P5','m7'],
			'5'	    	: ['P1','P5']

			
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
			// Are we working with a flat or a sharp scale/chord
			var targetNotes = (key.charAt(1)==='b') ? notesFlat : notesSharp;
			var keyIndex, newNotesArray, indexes;
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
				 
                return {notes:getNotes(key, scales[scale] ), intervals: scales[scale]}
			},
			getChord:function(key, chord){
				chord = (!chord) ? 'major' : chord;
				return {notes:getNotes(key, chords[chord] ), intervals: chords[chord]}
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
               var l=modifiers.length-1
               for (var i=0; i<17; i++){
                   for (var j=0;j<l; j++)
                       definitions.push(noteList[i]+modifiers[j])

               }
                return definitions
            }
		}
	}
	
	window.NoteDictionary = NoteDictionary();
	
})(window)

// Sample Usage:
// console.log("D minor chord:" + NoteDictionary.getChord("D", "minor"))
// console.log("C major scale:" + NoteDictionary.getScale("C", "major"))

/* CHORD MODIFIERS

6,
m6,
6/9,
maj7,
7,
7b5,
7#5,
m7,
m7(maj7),
m7b5,
dim7,
9,
9b5,
9#5,
maj9,
m9,
m11,
13,
sus4,
sus2,
7sus4,
7sus2,
9sus4,
9sus2,
aug,
dim,
5
*/