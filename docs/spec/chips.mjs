const TOGGLE = `this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))`;
const chip = (label, on, onclick = TOGGLE) => `<button type="button" class="chip" aria-pressed="${on}" onclick="${onclick}"><span class="ic chip__check" aria-hidden="true">check</span>${label}</button>`;
const ONE = `this.parentElement.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', String(c === this)))`;

export default {
  title: 'Chips',
  group: 'Selection',
  order: 8,
  summary: 'Pill-shaped toggle buttons in a wrapping row, for filters and quick picks that apply as they are tapped. A pressed chip turns accent and a check slides in.',
  when: [
    'Filtering a list by several values at once: days of the week, subjects, status.',
    'Quick picks from a short set where all options should be visible: preset amounts, time slots, suggested replies.',
    'A compact multi-choice on phones where checkboxes would take too much height.',
  ],
  whenNot: [
    ['Values people type and make up (topics, emails)', 'tag-input'],
    ['Two to five views of the same content, exactly one at a time', 'segmented-control'],
    ['A choice saved in a form that needs explanations', 'checkbox', 'Or [radio](radio) for one'],
    ['A status or category label that is not clickable', 'badge'],
    ['A long list of options', 'select', 'Or a [combobox](combobox)'],
    ['A single on and off setting', 'switch'],
  ],
  where: 'Directly above the content they filter, under a [search field](search-field) or the page header. In a `.chip-row` that wraps; on phones a single row may scroll sideways inside its container instead of wrapping to three lines.',
  anatomy: [
    ['.chip-row', 'Required. The wrapping row, 8 px gaps. `role="group"` with an `aria-label` naming what is filtered.'],
    ['button.chip', 'Required. 34 px pill, `aria-pressed`. Use a `<button type="button">`.'],
    ['.chip__check', 'Required for toggles. A `check` icon, zero width until pressed, then slides in before the label.'],
  ],
  examples: [
    {
      title: 'Filter by day',
      desc: 'Several can be on. The check slides in and the padding adjusts so the label does not jump.',
      html: `<div class="chip-row" role="group" aria-label="Days">
  ${chip('Mon', true)}${chip('Tue', false)}${chip('Wed', true)}${chip('Thu', false)}${chip('Fri', false)}${chip('Sat', false)}
</div>`,
    },
    {
      title: 'One quick pick',
      desc: 'Preset top-up amounts: picking one releases the others. Pair with an [amount field](amount-field) for a custom value.',
      html: `<div class="chip-row" role="group" aria-label="Top-up amount">
  ${chip('Rp 50.000', false, ONE)}${chip('Rp 100.000', true, ONE)}${chip('Rp 200.000', false, ONE)}${chip('Rp 500.000', false, ONE)}
</div>`,
    },
  ],
  states: [
    ['aria-pressed="false"', 'Base background with a strong 1 px line; hover fills.'],
    ['aria-pressed="true"', 'Accent tint, accent text, no line; the check slides in and left padding shrinks from 14 to 10 px.'],
    [':active', 'Sinks to 0.95 in 90 ms.'],
    ['focus-visible', 'The system focus ring.'],
    ['disabled', 'An option that exists but cannot be chosen now (a booked time slot): faint and struck through, not pressable. Say why near the row ("Struck-through times are booked").'],
  ],
  motion: [
    'Pressing: the check grows from 0 to 17 px wide and the left padding shrinks on `--spring-smooth` (560 ms), so the label shifts a little and settles; opacity in `--d-fast`. Releasing reverses the same transitions.',
    'Color and line change in `--d-fast` (160 ms) on `--ease-standard`.',
    'Press: `scale(0.95)` in 90 ms, back on `--spring-snappy` (360 ms).',
    'When chips filter a list, swap the results at once; do not stagger them in on every tap.',
    'Reduced motion: transitions become 120 ms linear.',
  ],
  a11y: [
    'Each chip is a `<button type="button" aria-pressed>`, announced as a toggle button, pressed or not pressed.',
    'Name the group (`role="group"`, `aria-label="Days"`) so people know what is filtered.',
    'Chips are 34 px tall: keep the 8 px gaps so neighbors are not mis-tapped, and never put them closer.',
    'Announce the result count in an `aria-live="polite"` region when filters change the list.',
  ],
  do: [
    'Keep labels to one or two words.',
    'Offer "Clear filters" as a plain [button](button) when many chips can be on.',
  ],
  dont: [
    'Use chips as tabs or navigation.',
    'Remove the check; color alone does not say pressed.',
    'Make a new pill style for tags or statuses; use [badge](badge) or a [tag input](tag-input).',
  ],
  js: 'None in the system. Toggle `aria-pressed` on click (or release the others for a single pick); the CSS does the rest.',
  related: ['tag-input', 'segmented-control', 'checkbox', 'badge'],
};
