export default {
  title: 'Rolling number',
  group: 'Data display',
  order: 14,
  summary: 'A number whose digits each slide to their new value on the smooth spring, like an odometer. For a count that changes while the person watches.',
  when: [
    'A count that changes in front of the person: likes, queue numbers taken, a stepper value, seats booked on a city bus.',
    'A live figure that ticks up or down while the page is open.',
  ],
  whenNot: [
    ['A figure counting up from zero once when it first appears', 'number-count'],
    ['A countdown to a deadline', 'timer'],
    ['A static figure', 'stat-row', 'Write it as text with tabular figures'],
    ['A number the person types or steps', 'number-stepper', 'The stepper already uses a rolling number for its value'],
  ],
  where: 'Inline in the text or control that owns the number: a like button, a stepper, a stat value, a queue badge. It inherits font, size and color from its parent.',
  anatomy: [
    ['.roll', 'Required. An inline box 1.2 em tall that clips the columns. Tabular figures.'],
    ['[data-lds-roll]', 'The starting value. `init()` builds the columns from it.'],
    ['.roll__col', 'One column per digit with the digits 0 to 9, moved with `transform`. Built by the JS; `aria-hidden`.'],
  ],
  examples: [
    {
      title: 'Queue numbers taken',
      desc: 'Queue tickets taken today at a district service counter. Each digit slides to its new place. Press the buttons.',
      html: `<div class="docs-row" style="gap: 20px;">
  <span style="font: 600 40px/1 var(--font); letter-spacing: -0.03em; color: var(--text-strong);"><span class="roll" id="rn" role="img" data-lds-roll="128"></span></span>
  <button class="btn btn--secondary btn--sm" onclick="const el = document.getElementById('rn'); import('../../js/lds.js').then((m) => m.setRoll(el, Number(el.getAttribute('aria-label')) + 1));"><span class="ic" aria-hidden="true">add</span>One more</button>
  <button class="btn btn--secondary btn--sm" onclick="const el = document.getElementById('rn'); import('../../js/lds.js').then((m) => m.setRoll(el, Number(el.getAttribute('aria-label')) + 47));">Add 47</button>
</div>`,
      code: `<span class="roll" role="img" data-lds-roll="128"></span>
<script type="module">
  import { setRoll } from 'lampung-design-system/js';
  setRoll(document.querySelector('.roll'), 129);
</script>`,
    },
    {
      title: 'Inside a control',
      desc: 'The like button rolls its count; the stepper rolls its value.',
      html: `<button class="like" aria-pressed="false" data-lds-like aria-label="Like"><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="24"></span></button>`,
    },
  ],
  states: [
    ['value', '`setRoll(el, value)` sets `aria-label`, adds or removes columns, and moves each to its digit.'],
  ],
  motion: [
    'Each column moves with `transform: translateY()` on `--spring-smooth` (`--d-smooth`, 560 ms), so 128 to 175 rolls the tens and ones together while the hundreds stay still.',
    'It is a transition: a new value mid-roll retargets from where the digits are.',
    'Columns added or removed (99 to 100) appear and disappear at once.',
    'Reduced motion: a 120 ms linear change.',
  ],
  a11y: [
    'The columns are `aria-hidden`; `setRoll` writes the value to `aria-label` on `.roll`. A plain `span` with a label is not read by every screen reader, so give `.roll` `role="img"` when it stands alone, or rely on the label of the control around it.',
    'Do not make it a live region. If a change matters, announce it once in a `role="status"` line ("129 seats taken").',
  ],
  do: [
    'Use it for counts that change in view, not for every number on the page.',
    'Let it inherit its size and weight from the text around it.',
  ],
  dont: [
    'Pass separators, signs or decimals: it rolls digits only. Format "1,280" or "-3" as text.',
    'Roll a number on first load; use [number count](number-count) once, or nothing.',
  ],
  js: '`data-lds-roll="128"` builds the columns on `init()`. `setRoll(el, value)` rolls to a new value (digits 0 to 9 only).',
  related: ['number-count', 'number-stepper', 'like', 'stat-row'],
};
