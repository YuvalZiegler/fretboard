import { createMemo } from 'solid-js';
import { definition, displayAsIntervals, getDisplayNote } from '../store';

export default function Note(props) {
  const isActive = createMemo(() => {
    const def = definition();
    if (!def) return false;
    return def.notes.some(n => {
      const noteBase = n.includes('/') ? n.split('/') : [n];
      return noteBase.some(nb => nb === props.note || nb === props.note?.split('/')[0] || nb === props.note?.split('/')[1]);
    });
  });

  const interval = createMemo(() => {
    const def = definition();
    if (!def || !isActive()) return null;

    const noteIndex = def.notes.findIndex(n => {
      const noteBase = n.includes('/') ? n.split('/') : [n];
      return noteBase.some(nb => nb === props.note || nb === props.note?.split('/')[0] || nb === props.note?.split('/')[1]);
    });
    return noteIndex >= 0 ? def.intervals[noteIndex] : null;
  });

  const displayText = createMemo(() => {
    if (displayAsIntervals() && isActive()) {
      return interval();
    }
    return getDisplayNote(props.note, definition());
  });

  const classes = createMemo(() => {
    const base = 'note';
    if (!isActive()) return `${base} inactive`;
    return `${base} ${interval() || ''} active`;
  });

  return (
    <div class={`fret pos-${props.position}`}>
      <div class={classes()}>{displayText()}</div>
    </div>
  );
}
