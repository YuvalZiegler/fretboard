(function(w){	
	var NoteDictionary = {	
		Notes		: ['A'	,'A#/Bb', 'B'	, 'C'	, 'C#/Db'	, 'D'	, 'D#/Eb'	, 'E'	, 'F'	, 'F#/Gb' 	, 'G'	, 'G#/Ab'	],
		Intervals	: ['P1'	, 'm2'	, 'M2'	, 'm3'	, 'M3'		, 'P4'	, 'd5'		, 'P5'	, 'm6'	, 'M6'		, 'm7'	, 'M7' 		],
		Scales : {
	 			   'major'			:	['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
	 			   'dorian'			:   ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'],
	 			   'phrygian'		:   ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
	 			   'lydian'			:	['P1', 'M2', 'M3', 'd5', 'P5', 'M6', 'M7'],
	 			   'mixolydian'		:	['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
	 			   'Aeolian'		:	['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
	 			   'Locrian'		:	['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'],
	 			   'harmonicmajor' 	: 	['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'M7'],
	 			   'melodicmajor'	:	['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'm7']
		},
	
		Chords : {
			// TRIADS
			'major'		: ['P1','M3','P5'],
			'minor'		: ['P1','m3','P5'],
			'diminished': ['P1','m3','d5'],
			'augmented'	: ['P1','M3','m6'],
			'sus'		: ['P1','P5'],
			// MODIFIERS
			
		},
		
		IntervalsToIndexes : function (intervalArray){
			var indexesArray = [];
			for (var i=0, length=intervalArray.length; i<intervalArray.length; i++) {	
				indexesArray.push(_.indexOf(this.Intervals, intervalArray[i])); 	
			}
			return indexesArray;
		},
		
		IndexesToNotes: function (indexesArray, noteArray){
			var notes = [];
			for (var i=0, length=indexesArray.length; i<indexesArray.length; i++) { notes.push(noteArray[indexesArray[i]]); }
			return notes;
		},
		shiftNotes:function(keyIndex){
			var newNotesArray = this.Notes.slice(keyIndex);
			for (var i=0; i<keyIndex; i++) { newNotesArray.push(this.Notes[i]); }
			return newNotesArray;
		},
		getNotes:function(key, intervals){
			var keyIndex, newNotesArray, indexes;
			// GET THE INDEX OF THE KEY FROM THE NOTES ARRAY
			keyIndex = _.indexOf(this.Notes, key);
			// CREATE A NEW NOTE ARRAY USING THE KEY AS A STARTING POINT
			newNotesArray = this.shiftNotes( _.indexOf(this.Notes, key));
			// Convert the intervals to Indexes and retrieve the notes from the newNotesArray
			indexes = this.IntervalsToIndexes(intervals);
			return this.IndexesToNotes(indexes,newNotesArray);
		},
		getScale:function(key, scale){
			return this.getNotes(key,NoteDictionary.Scales[scale] )
		},
		getChord:function(key, chord){
			return this.getNotes(key,NoteDictionary.Chords[chord] )
		}
	}
	
	window.NoteDictionary = NoteDictionary
// TODO expose only getScale and getChord 
/// NoteDictionary Samples:
	console.log("D minor chord:" + NoteDictionary.getChord("D", "minor"))
	console.log("C major scale:" + NoteDictionary.getScale("C", "major"))	
	 
})(window)