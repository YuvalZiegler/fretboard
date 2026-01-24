import { For } from 'solid-js';
import String from './String';
import { strings } from '../store';

export default function Fretboard() {
  return (
    <div id="fretboard">
      <For each={strings}>
        {(string, i) => <String string={string} index={i()} />}
      </For>
    </div>
  );
}
