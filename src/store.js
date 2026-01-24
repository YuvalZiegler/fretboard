import { createSignal, createMemo } from 'solid-js';
import { createStore } from 'solid-js/store';
import { parseQuery, getOctave, getChordsOfScale, getScalesOfChord } from './lib/noteDictionary';

// Instrument presets
const instruments = {
  guitar: ['E', 'A', 'D', 'G', 'B', 'E'],
  bass: ['E', 'A', 'D', 'G'],
  ukulele: ['G', 'C', 'E', 'A']
};

// Current definition (chord or scale being displayed)
const [definition, setDefinition] = createSignal(null);

// Display mode
const [displayAsIntervals, setDisplayAsIntervals] = createSignal(false);

// Strings state
const [strings, setStrings] = createStore([]);

// Initialize strings from tuning array
function initializeStrings(tuning) {
  setStrings(tuning.map(key => ({
    key: key.length > 2 ? key.substr(0, 2) : key,
    octave: getOctave(key)
  })));
}

// Set active notes from a query string
function setActiveNotes(query) {
  const result = parseQuery(query);
  if (result && result.notes.length > 0) {
    setDefinition(result);
  }
}

// Tune a string up (shift left in chromatic scale)
function tuneUp(index) {
  const octave = strings[index].octave;
  const newKey = octave[1];
  setStrings(index, {
    key: newKey,
    octave: getOctave(newKey)
  });
}

// Tune a string down (shift right in chromatic scale)
function tuneDown(index) {
  const octave = strings[index].octave;
  const newKey = octave[octave.length - 1];
  setStrings(index, {
    key: newKey,
    octave: getOctave(newKey)
  });
}

// Add a new string at position
function addString(index) {
  const newStrings = [...strings];
  newStrings.splice(index + 1, 0, {
    key: 'C',
    octave: getOctave('C')
  });
  setStrings(newStrings);
}

// Remove a string
function removeString(index) {
  if (strings.length > 1) {
    const newStrings = strings.filter((_, i) => i !== index);
    setStrings(newStrings);
  }
}

// Toggle display mode
function toggleDisplayMode() {
  setDisplayAsIntervals(!displayAsIntervals());
}

// Get formatted note name (handle sharps/flats preference)
function getDisplayNote(note, def) {
  if (!note || note.length <= 1) return note;

  const preferFlat = def?.key?.charAt(1) === 'b';
  if (note.includes('/')) {
    const [sharp, flat] = note.split('/');
    return preferFlat ? flat : sharp;
  }
  return note.length > 2
    ? (preferFlat ? note.substr(3, 2) : note.substr(0, 2))
    : note;
}

// Get definition name
const definitionName = createMemo(() => {
  const def = definition();
  if (!def) return '';
  return def.isScale
    ? `${def.key} ${def.scale}`
    : `${def.key}${def.chord === 'major' ? '' : def.chord}`;
});

// Get related items (chords for scales, scales for chords)
const relatedItems = createMemo(() => {
  const def = definition();
  if (!def) return { items: [], isScale: false };

  const name = definitionName();
  if (def.isScale) {
    return { items: getChordsOfScale(name), isScale: true };
  } else {
    return { items: getScalesOfChord(name), isScale: false };
  }
});

export {
  instruments,
  definition,
  setDefinition,
  displayAsIntervals,
  setDisplayAsIntervals,
  strings,
  setStrings,
  initializeStrings,
  setActiveNotes,
  tuneUp,
  tuneDown,
  addString,
  removeString,
  toggleDisplayMode,
  getDisplayNote,
  definitionName,
  relatedItems
};
