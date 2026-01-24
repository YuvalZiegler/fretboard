import { onMount } from 'solid-js';
import { useParams } from '@solidjs/router';
import Search from './components/Search';
import Definition from './components/Definition';
import Fretboard from './components/Fretboard';
import Related from './components/Related';
import { initializeStrings, setActiveNotes, instruments } from './store';

export default function App() {
  const params = useParams();

  onMount(() => {
    // Get instrument or custom tuning from URL params
    const instrumentName = params.instrument?.toLowerCase() || 'guitar';
    let tuning;

    if (params.tuning) {
      // Custom tuning from URL (e.g., /tuning/E,A,D,G)
      tuning = params.tuning.split(',');
    } else {
      // Preset instrument
      tuning = instruments[instrumentName] || instruments.guitar;
    }

    initializeStrings(tuning);

    // Set initial query if provided
    if (params.query) {
      setActiveNotes(decodeURIComponent(params.query));
    }
  });

  return (
    <>
      <header></header>
      <div id="content">
        <div id="ui">
          <Search />
          <div id="chord-definition">
            <Definition />
          </div>
        </div>
        <div id="chord-navigator">
          <Fretboard />
        </div>
        <Related />
      </div>
    </>
  );
}
