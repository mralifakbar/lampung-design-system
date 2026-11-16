export default {
  title: 'Button group',
  group: 'Actions',
  order: 4,
  summary: 'Two to four attached buttons in one outlined box, for separate actions on the same object (undo, redo, history). Each button does something; none of them stays selected.',
  when: [
    'A few actions that belong to one object and are used together: undo and redo, zoom out and zoom in, previous and next.',
    'A toolbar where joining the buttons shows they are one set and saves space.',
  ],
  whenNot: [
    ['One of the buttons stays selected to show the current view', 'segmented-control', 'A group fires actions; a segmented control holds a choice.'],
    ['Each button turns a mode on or off (bold, italic)', 'toggle', 'Use a toggle group: it shows the pressed state.'],
    ['A main action with a few variants of it', 'split-button'],
    ['Unrelated actions that only happen to sit together', 'layout-primitives', 'Space separate buttons with a `cluster`.'],
    ['More than four actions', 'dropdown-menu', 'Keep the two most used in the group and move the rest into a more menu.'],
  ],
  where: 'In toolbars and page or card headers, aligned with other medium (36 px) controls. On phones keep at most three, or move them into a more menu; the group does not wrap.',
  anatomy: [
    ['.btn-group', 'Required. Outlined box, 10 px radius, clips its children. Give it `role="group"` and an `aria-label`.'],
    ['.btn.btn--md', 'Required. Two to four buttons, 36 px tall, no variant class: the group sets their look. A hairline separates neighbors.'],
    ['.ic', 'Optional leading icon in each button.'],
  ],
  examples: [
    {
      title: 'Edit history',
      desc: 'Three actions on the same document.',
      html: `<div class="btn-group" role="group" aria-label="Edit history">
  <button class="btn btn--md"><span class="ic" aria-hidden="true">undo</span>Undo</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">redo</span>Redo</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">history</span>History</button>
</div>`,
    },
    {
      title: 'Previous and next',
      desc: 'Stepping through questions in a review screen, next to the question count.',
      html: `<div class="cluster" style="--gap: 12px;">
  <span class="card__sub" style="margin: 0;">Question 4 of 40</span>
  <div class="btn-group" role="group" aria-label="Question">
    <button class="btn btn--md"><span class="ic" aria-hidden="true">chevron_left</span>Previous</button>
    <button class="btn btn--md">Next<span class="ic" aria-hidden="true">chevron_right</span></button>
  </div>
</div>`,
    },
  ],
  states: [
    ['hover', '`--bg-tint` behind the hovered button only.'],
    [':active', 'No scale (it would break the joined edges); the button fills with `--bg-tint-strong`.'],
    ['disabled', '`disabled` on one button (redo with nothing to redo) dims it to 38 %.'],
  ],
  motion: [
    'Buttons in a group do not sink on press; `transform` is turned off so the outline stays straight. Feedback is the `--bg-tint-strong` fill, applied at once.',
    'Hover fills change over `--d-fast` on `--ease-standard`.',
  ],
  a11y: [
    '`role="group"` with an `aria-label` that names the set ("Edit history").',
    'Each child is a normal `<button>` reached with Tab; do not add arrow-key navigation (that is for toggle groups and segmented controls).',
    'Icon-only buttons in a group need an `aria-label` each.',
  ],
  do: [
    'Keep labels short and parallel ("Undo", "Redo").',
    'Use the medium size; the group is drawn for 36 px buttons.',
  ],
  dont: [
    'Use a group as tabs or as a view switcher.',
    'Put a primary or danger variant inside the group.',
    'Mix a group with a separate button of the same height right next to it; space them with a `cluster`.',
  ],
  related: ['segmented-control', 'toggle', 'split-button', 'button'],
};
