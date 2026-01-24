import { Show, For } from 'solid-js';
import { definition, displayAsIntervals, definitionName, getDisplayNote, setActiveNotes } from '../store';

export default function Definition(props) {
  const def = () => props.definition || definition();
  const name = () => props.name || definitionName();
  const isClickable = () => props.onClick !== undefined;

  function handleClick() {
    if (props.onClick) {
      props.onClick(name());
    }
  }

  return (
    <Show when={def()}>
      <div class="definition">
        <div class="name">
          <h1>
            <a
              class="tag"
              href="#"
              onClick={(e) => { e.preventDefault(); handleClick(); }}
              title="show on fretboard"
            >
              {name()}
            </a>
          </h1>
        </div>
        <div class="legend">
          <ul class="note-list">
            <For each={def().notes}>
              {(note, i) => (
                <li class={`note ${def().intervals[i()]}`}>
                  {displayAsIntervals() ? def().intervals[i()] : getDisplayNote(note, def())}
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </Show>
  );
}
