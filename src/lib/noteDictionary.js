// Music theory constants
const noteList = ['A', 'A#', 'Bb', 'B', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab'];
const notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];
const notesSharp = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const notesFlat = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
const intervals = ['P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'd5', 'P5', 'm6', 'M6', 'm7', 'M7'];

const scales = {
  'chromatic': { intervals },
  'pentatonic': { intervals: ['P1', 'm3', 'P4', 'd5', 'P5', 'm7'] },
  'augmented': { intervals: ['P1', 'M2', 'M3', 'd5', 'm6', 'm7'] },
  'diminished': { intervals: ['P1', 'm2', 'm3', 'M3', 'd5', 'P5', 'M6', 'm7'] },
  'major': { intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'] },
  'dorian': { intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'] },
  'phrygian': { intervals: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'] },
  'lydian': { intervals: ['P1', 'M2', 'M3', 'd5', 'P5', 'M6', 'M7'] },
  'mixolydian': { intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'] },
  'aeolian': { intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'] },
  'locrian': { intervals: ['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'] },
  'harmonic major': { intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'M7'] },
  'melodic major': { intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'm6', 'm7'] },
  'harmonic minor': { intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'M7'] },
  'melodic minor': { intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'M7'] },
  'minor': { intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'] }
};

const chords = {
  'major': { intervals: ['P1', 'M3', 'P5'] },
  'm': { intervals: ['P1', 'm3', 'P5'] },
  'dim': { intervals: ['P1', 'm3', 'd5'] },
  'aug': { intervals: ['P1', 'M3', 'm6'] },
  '6': { intervals: ['P1', 'M3', 'P5', 'M6'] },
  'm6': { intervals: ['P1', 'm3', 'P5', 'M6'] },
  '6/9': { intervals: ['P1', 'M2', 'M3', 'P5', 'M6'] },
  'maj7': { intervals: ['P1', 'M3', 'P5', 'M7'] },
  '7': { intervals: ['P1', 'M3', 'P5', 'm7'] },
  '7b5': { intervals: ['P1', 'M3', 'd5', 'm7'] },
  '7#5': { intervals: ['P1', 'M3', 'm6', 'm7'] },
  'm7': { intervals: ['P1', 'm3', 'P5', 'm7'] },
  'm(maj7)': { intervals: ['P1', 'm3', 'P5', 'M7'] },
  'm7b5': { intervals: ['P1', 'm3', 'd5', 'm7'] },
  'dim7': { intervals: ['P1', 'm3', 'd5', 'm7'] },
  '9': { intervals: ['P1', 'M2', 'M3', 'P5', 'm7'] },
  '9b5': { intervals: ['P1', 'M2', 'M3', 'd5', 'm7'] },
  '9#5': { intervals: ['P1', 'M2', 'M3', 'm6', 'm7'] },
  'maj9': { intervals: ['P1', 'M2', 'M3', 'P5', 'M7'] },
  'm9': { intervals: ['P1', 'M2', 'm3', 'P5', 'm7'] },
  'm11': { intervals: ['P1', 'm3', 'P4', 'P5', 'm7'] },
  '13': { intervals: ['P1', 'M3', 'P5', 'M6', 'm7'] },
  'maj13': { intervals: ['P1', 'M3', 'P5', 'M6', 'M7'] },
  'maj7b6': { intervals: ['P1', 'M3', 'P5', 'm6', 'M7'] },
  'm7b6': { intervals: ['P1', 'm3', 'P5', 'm6', 'M7'] },
  'sus4': { intervals: ['P1', 'P4', 'P5'] },
  'sus2': { intervals: ['P1', 'M2', 'P5'] },
  '7sus4': { intervals: ['P1', 'P4', 'P5', 'm7'] },
  '7sus2': { intervals: ['P1', 'M2', 'P5', 'm7'] },
  '9sus4': { intervals: ['P1', 'M2', 'P4', 'P5', 'm7'] },
  '9sus2': { intervals: ['P1', 'M2', 'P5', 'm7'] },
  '5': { intervals: ['P1', 'P5'] }
};

// Helper functions
function shiftNotes(keyIndex) {
  return [...notes.slice(keyIndex), ...notes.slice(0, keyIndex)];
}

function intervalsToIndexes(intervalArray) {
  return intervalArray.map(int => intervals.indexOf(int));
}

function indexesToValues(indexesArray, valuesArray) {
  return indexesArray.map(i => valuesArray[i]);
}

function getNotes(key, intervalList) {
  const targetNotes = key.charAt(1) === 'b' ? notesFlat : notesSharp;
  const newNotesArray = shiftNotes(targetNotes.indexOf(key));
  const indexes = intervalsToIndexes(intervalList);
  return indexesToValues(indexes, newNotesArray);
}

function validateKey(key) {
  if (key && key.length > 0 && key.charAt(0).match(/^[a-gA-G]/)) {
    return (key.charAt(1) === 'b' || key.charAt(1) === '#')
      ? key.charAt(0).toUpperCase() + key.charAt(1)
      : key.charAt(0).toUpperCase();
  }
  throw new Error('Invalid note (use A-G)');
}

function getScale(key, scale) {
  if (scales[scale]) {
    return {
      key,
      scale,
      notes: getNotes(key, scales[scale].intervals),
      intervals: scales[scale].intervals,
      isScale: true
    };
  }
  return { key, scale, notes: [], intervals: [], isScale: true };
}

function getChord(key, chord) {
  chord = chord || 'major';
  if (chords[chord] && key) {
    return {
      key,
      chord,
      notes: getNotes(key, chords[chord].intervals),
      intervals: chords[chord].intervals,
      isScale: false
    };
  }
  return { key, chord, notes: [], intervals: [], isScale: false };
}

function notesToIndexes(noteArray) {
  const n = shiftNotes(notes.indexOf(noteArray[0]));
  return noteArray.map(note => n.indexOf(note));
}

function notesToChord(noteArray) {
  const intr = indexesToValues(notesToIndexes(noteArray), intervals);
  return Object.keys(chords).filter(i => {
    const chordIntervals = chords[i].intervals;
    return intr.length === chordIntervals.length &&
           intr.every((v, idx) => v === chordIntervals[idx]);
  });
}

// Public API
export function parseQuery(query) {
  if (!query || query.length === 0) return null;

  try {
    const key = validateKey(query);
    if (key) {
      const modifier = query.substr(key.length).replace(/^\s+/, '');
      return query.charCodeAt(key.length) === 32
        ? getScale(key, modifier)
        : getChord(key, modifier);
    }
  } catch (e) {
    return null;
  }
  return null;
}

export function getChordsOfScale(query) {
  const scale = parseQuery(query);
  if (!scale || !scale.notes.length) return [];

  const scaleNotes = [...scale.notes];
  const chordArray = [];

  for (let i = 0; i < scale.notes.length; i++) {
    const triads = notesToChord([scaleNotes[0], scaleNotes[2], scaleNotes[4]]);
    const key = scaleNotes[0].length > 2 ? scaleNotes[0].substr(0, 2) : scaleNotes[0];
    chordArray.push(key + (triads[0] === 'major' ? '' : triads[0] || ''));
    scaleNotes.push(scaleNotes.shift());
  }
  return chordArray;
}

export function isChordInScale(chord, scale) {
  return chord.notes.filter(n => scale.notes.includes(n)).length === chord.notes.length;
}

export function getScalesOfChord(query) {
  const chord = parseQuery(query);
  if (!chord) return [];

  const scalesArray = [];
  const noteArray = chord.key.charAt(1) === 'b' ? notesFlat : notesSharp;

  for (const note of noteArray) {
    for (const mod in scales) {
      if (mod !== 'chromatic') {
        const scale = parseQuery(note + ' ' + mod);
        if (scale && isChordInScale(chord, scale)) {
          scalesArray.push(note + ' ' + scale.scale);
        }
      }
    }
  }
  return scalesArray;
}

export function getAllDefinitions() {
  const definitions = [];
  const modifiers = [];

  for (const mod in chords) {
    modifiers.push(mod === 'major' ? '' : mod);
  }
  for (const key in scales) {
    if (key !== 'chromatic') {
      modifiers.push(' ' + key);
    }
  }

  for (let i = 0; i < 17; i++) {
    for (const mod of modifiers) {
      definitions.push(noteList[i] + mod);
    }
  }
  return definitions;
}

export function getOctave(key) {
  const result = parseQuery(key + ' chromatic');
  return result ? result.notes : [];
}

export { notes, notesSharp, notesFlat, intervals };
