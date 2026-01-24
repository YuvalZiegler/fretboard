import { Show, For } from 'solid-js';
import { parseQuery } from '../lib/noteDictionary';
import { definition, definitionName, relatedItems, setActiveNotes } from '../store';
import Definition from './Definition';

export default function Related() {
  function handleItemClick(name) {
    setActiveNotes(name);
  }

  return (
    <Show when={definition()}>
      <div id="related">
        <h1>
          {relatedItems().isScale
            ? `${definitionName()} scale includes these chords:`
            : `The ${definitionName()} chord appears in these scales:`}
        </h1>
        <div
          id="relatedWrapper"
          class={relatedItems().isScale ? 'chords' : 'scales'}
        >
          <For each={relatedItems().items}>
            {(item) => {
              const parsed = parseQuery(item);
              const itemName = parsed?.isScale
                ? `${parsed.key} ${parsed.scale}`
                : `${parsed.key}${parsed.chord === 'major' ? '' : parsed.chord}`;

              return (
                <Definition
                  definition={parsed}
                  name={itemName}
                  onClick={handleItemClick}
                />
              );
            }}
          </For>
        </div>
      </div>
    </Show>
  );
}
