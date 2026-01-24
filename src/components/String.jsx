import { For } from 'solid-js';
import Note from './Note';
import { tuneUp, tuneDown, addString, removeString } from '../store';

export default function String(props) {
  return (
    <div class="string">
      <div class="stringUI">
        <a href="#" onClick={(e) => { e.preventDefault(); addString(props.index); }} title="Add string">
          <span class="icon-plus-sign"></span>
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); removeString(props.index); }} title="Delete string">
          <span class="icon-remove-sign"></span>
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); tuneUp(props.index); }} title="Tune Up">
          <span class="icon-circle-arrow-left"></span>
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); tuneDown(props.index); }} title="Tune Down">
          <span class="icon-circle-arrow-right"></span>
        </a>
      </div>
      <For each={props.string.octave}>
        {(note, i) => <Note note={note} position={i()} />}
      </For>
    </div>
  );
}
