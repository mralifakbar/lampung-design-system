const EDIT = (value, label) => `<span class="inline-edit" data-lds-inline><button class="inline-edit__text" aria-label="${label}"><span class="inline-edit__value">${value}</span><span class="ic" aria-hidden="true">edit</span></button></span>`;

export default {
  title: 'Inline edit',
  group: 'Microinteractions',
  order: 10,
  summary: 'Click a name to rename it where it is: the text becomes a field with the same font and width, Enter or leaving saves, Escape puts it back. A save draws a small check; a refused save restores the old name, shakes, and says why.',
  when: [
    'Renaming one thing in place: an activity, a file, a note title, a group name.',
    'A single short value that people change rarely and want to change without opening a form.',
  ],
  whenNot: [
    ['Several fields edited together', 'form-layout'],
    ['A long text (a description, an answer)', 'textarea'],
    ['A value chosen from a list', 'select'],
    ['A setting that applies at once', 'switch'],
  ],
  where: 'On the title itself: a page heading, a card title, the title of a list row. The pencil appears on hover and focus at the end of the text.',
  anatomy: [
    ['.inline-edit', 'Required. `data-lds-inline`. Inherits the font of where it sits.'],
    ['.inline-edit__text', 'Required. The button showing the value; `aria-label` says what it renames ("Rename activity").'],
    ['.inline-edit__value', 'Required. The value text.'],
    ['.inline-edit__input', 'The field swapped in while editing (created by JS), same metrics, accent ring.'],
    ['.inline-edit__state', 'The check drawn after a save (created by JS).'],
  ],
  examples: [
    {
      title: 'Rename an activity',
      desc: 'Click the name, type, press Enter. The check draws in; the new name stays. Escape restores the old one.',
      html: `<div class="docs-col">
  <span class="card__sub">Activity</span>
  <span style="font: var(--type-title-2); letter-spacing: var(--tracking-title-2);">${EDIT('May toddler vaccination', 'Rename activity')}</span>
</div>`,
      code: `<h1><span class="inline-edit" data-lds-inline>
  <button class="inline-edit__text" aria-label="Rename activity"><span class="inline-edit__value">May toddler vaccination</span><span class="ic" aria-hidden="true">edit</span></button>
</span></h1>
<script type="module">
  document.querySelector('[data-lds-inline]').addEventListener('lds:save', (e) => {
    e.detail.wait(api.rename(e.detail.value)); // rejection restores e.detail.previous, shakes, announces
  });
</script>`,
    },
    {
      title: 'Rename a file in a list',
      desc: 'In a row the field takes the title\'s place and size; the size and date beside it do not move.',
      stage: 'fill',
      html: `<div class="list" style="width: 100%; max-width: 440px;">
  <div class="lrow"><span class="ic" aria-hidden="true">description</span><span class="lrow__body">${EDIT('RW meeting minutes', 'Rename RW meeting minutes')}</span><span class="lrow__value">340 KB</span></div>
  <div class="lrow"><span class="ic" aria-hidden="true">description</span><span class="lrow__body">${EDIT('Business location sketch', 'Rename Business location sketch')}</span><span class="lrow__value">1.1 MB</span></div>
</div>`,
    },
  ],
  states: [
    ['rest', 'Text button; pencil hidden.'],
    ['hover / focus', 'Tinted background and the pencil fades in over `--d-fast`.'],
    ['editing', 'An input with the same font, at least the text width (80 px minimum), all text selected.'],
    ['saved', '`.is-saved`: a check draws in 300 ms and goes after 1.8 s; "Saved" is announced.'],
    ['refused', 'The old value comes back, the wrapper shakes, and "Could not save. Restored the previous name." is announced.'],
  ],
  motion: [
    'Field in: `lds-blur-in` over `--d-fast` (160 ms) on `--ease-enter`, from 4 px below and blurred, at the same size as the text, so nothing around moves.',
    'Saved: the check stroke draws (`lds-draw`) in 300 ms on `--ease-enter`.',
    'Refused: `shake()` on the wrapper (360 ms) plus an error haptic.',
    'Reduced motion: the field appears at once, the check appears without drawing, no shake.',
  ],
  a11y: [
    'The value is a real button whose `aria-label` names the action and object ("Rename activity"). The input takes the same label.',
    'Enter saves, Escape cancels and returns focus to the button, Tab saves (blur).',
    'Results are announced in a polite status inside the component.',
  ],
  do: [
    'Use it for one short value.',
    'Pass the save promise to `e.detail.wait()` so failures roll back.',
    'Name the object in the `aria-label`.',
  ],
  dont: [
    'Chain several inline edits as a form.',
    'Save on every keystroke.',
    'Change the font size or width when the field appears.',
  ],
  js: '`[data-lds-inline]` on `init()`. Emits `lds:save` with `{ value, previous, wait }` only when the value changed and is not empty; `wait(promise)` shows the check on success, or restores, shakes and announces on rejection.',
  related: ['text-field', 'shake', 'text-morph', 'list'],
};
