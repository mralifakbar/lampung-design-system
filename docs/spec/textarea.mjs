export default {
  title: 'Textarea',
  group: 'Inputs',
  order: 3,
  summary: 'A field for a few sentences: the same `.control` box, taller, with an optional character counter. Say the limit before people reach it.',
  when: [
    'People write more than one line: a note to the officer, a reason for an application, a report of a mistake in a person\'s data.',
    'A field has a character limit and people need to see how much room is left (`.counter`).',
  ],
  whenNot: [
    ['One short line (a name, a title, an email)', 'text-field'],
    ['Writing a chat message that sends on Enter', 'composer'],
    ['Long formatted content (an article, a service guide)', 'prose', 'Use a real editor; the textarea is plain text only'],
    ['Editing a short value in place inside a list or table', 'inline-edit'],
    ['Several short items like topics or emails', 'tag-input'],
  ],
  where: 'In a [form](form-layout), usually last before the actions, full width of the form column. In a [dialog](dialog) or [modal](modal) for "report a mistake" style flows.',
  anatomy: [
    ['.field / .field__label / .field__help', 'Required. Same wrapper as a [text field](text-field).'],
    ['.control.control--area', 'Required. The box grows to its content height, padded 12 by 14.'],
    ['textarea', 'Required. At least 88 px tall (about 3 lines), 22 px line height, not resizable by drag. Set `rows` for a taller start.'],
    ['.counter', 'Optional. Tabular "120 / 280" inside the label span, right-aligned by the label.'],
  ],
  examples: [
    {
      title: 'With a counter',
      desc: 'The counter lives in the label row, so it never moves the helper. With `maxlength` the browser stops input at the limit, so the counter never needs an over-limit state.',
      html: `<div class="field" style="max-width: 520px;">
  <label class="field__label" for="ta-note">Note to the officer <span class="counter" id="ta-note-count">0 / 280</span></label>
  <div class="control control--area"><textarea id="ta-note" maxlength="280" placeholder="What would you like to tell us?" aria-describedby="ta-note-help ta-note-count"
    oninput="document.getElementById('ta-note-count').textContent = this.value.length + ' / 280'"></textarea></div>
  <span class="field__help" id="ta-note-help">The officer reads this before processing your application.</span>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="note">Note to the officer <span class="counter" id="note-count">0 / 280</span></label>
  <div class="control control--area">
    <textarea id="note" maxlength="280" aria-describedby="note-help note-count"></textarea>
  </div>
  <span class="field__help" id="note-help">The officer reads this before processing your application.</span>
</div>
<!-- Update #note-count on input in your own code. -->`,
    },
    {
      title: 'Required reason with an error',
      desc: 'A report needs a reason; the helper explains what kind of detail helps.',
      html: `<div class="field" style="max-width: 520px;">
  <label class="field__label" for="ta-why">What is wrong with this data?</label>
  <div class="control control--area is-invalid"><textarea id="ta-why" rows="4" aria-invalid="true" aria-describedby="ta-why-help"></textarea></div>
  <span class="field__help field__help--error" id="ta-why-help"><span class="ic" aria-hidden="true">error</span>Describe the mistake, for example which part is wrong and what it should say.</span>
</div>`,
    },
  ],
  states: [
    ['focus / hover', 'As the [text field](text-field): accent edge and halo on `:focus-within`.'],
    ['.is-invalid + aria-invalid', 'Danger edge and halo; message in `.field__help--error`.'],
    ['.is-disabled + disabled', 'Fill background and muted text.'],
  ],
  motion: [
    'Border and halo transition in `--d-fast` (160 ms) on `--ease-standard`, like every `.control`.',
    'The counter changes number in place; it does not animate.',
    'Reduced motion: transitions become 120 ms linear.',
  ],
  a11y: [
    'A `<label for>` names it; the helper and the counter are both in `aria-describedby` so the limit is announced.',
    'Prefer `maxlength` (the browser stops input) and say the limit up front; if you allow going over and block on submit, mark `aria-invalid` and say how many characters to remove.',
    'Enter makes a new line. Never submit a textarea on Enter; that is the [composer](composer) pattern.',
    'Text renders at 16 px on touch screens, so iOS does not zoom on focus.',
  ],
  do: [
    'Start it at the height of the expected answer (`rows="4"` for a paragraph).',
    'Show the counter only when there is a limit worth knowing.',
  ],
  dont: [
    'Allow the native drag handle or set a fixed tiny height; the box is sized by rows.',
    'Use a textarea for a single value people expect to fit on one line.',
  ],
  js: 'None. Update the `.counter` text on `input` in your own code.',
  related: ['text-field', 'composer', 'form-layout', 'inline-edit'],
};
