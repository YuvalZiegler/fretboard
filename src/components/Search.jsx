import { createSignal, createMemo, For, Show, onMount, onCleanup } from 'solid-js';
import { getAllDefinitions } from '../lib/noteDictionary';
import { setActiveNotes, definitionName } from '../store';

export default function Search() {
  const [query, setQuery] = createSignal('');
  const [showSuggestions, setShowSuggestions] = createSignal(false);
  const [selectedIndex, setSelectedIndex] = createSignal(-1);
  let inputRef;
  let containerRef;

  const allDefinitions = getAllDefinitions();

  const suggestions = createMemo(() => {
    const q = query().toLowerCase();
    if (!q) return [];
    return allDefinitions.filter(d => d.toLowerCase().startsWith(q)).slice(0, 50);
  });

  function handleInput(e) {
    setQuery(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);

    if (e.target.value) {
      setActiveNotes(e.target.value);
    }
  }

  function handleKeyDown(e) {
    const suggs = suggestions();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, suggs.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex() >= 0 && suggs[selectedIndex()]) {
          selectSuggestion(suggs[selectedIndex()]);
        }
        setShowSuggestions(false);
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  }

  function selectSuggestion(suggestion) {
    setQuery(suggestion);
    setActiveNotes(suggestion);
    setShowSuggestions(false);
    inputRef?.focus();
  }

  function handleClickOutside(e) {
    if (containerRef && !containerRef.contains(e.target)) {
      setShowSuggestions(false);
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    inputRef?.focus();
  });

  onCleanup(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  return (
    <div class="search icon-search" ref={containerRef}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a scale or chord name, do it!"
        value={query()}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
      />
      <Show when={showSuggestions() && suggestions().length > 0}>
        <div class="autocomplete-w1">
          <div class="autocomplete" style={{ display: 'block' }}>
            <For each={suggestions()}>
              {(suggestion, i) => (
                <div
                  class={i() === selectedIndex() ? 'selected' : ''}
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseEnter={() => setSelectedIndex(i())}
                >
                  {suggestion}
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
}
