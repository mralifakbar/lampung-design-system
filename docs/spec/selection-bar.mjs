const sync = `const n = this.querySelectorAll('input:checked').length; const bar = document.getElementById('sb-bar'); bar.classList.toggle('is-open', n > 0); bar.inert = n === 0; document.getElementById('sb-count').textContent = n + ' selected';`;
const clear = `const list = document.getElementById('sb-list'); list.querySelectorAll('input:checked').forEach((i) => { i.checked = false; }); list.dispatchEvent(new Event('change')); list.querySelector('input').focus();`;
const row = (title, sub) => `    <label class="lrow" style="cursor: pointer;"><span class="check"><input type="checkbox" aria-label="Select ${title}"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span></span><span class="lrow__body"><span class="lrow__title" style="display: block;">${title}</span><span class="lrow__sub" style="display: block;">${sub}</span></span></label>`;

export default {
  title: 'Selection bar',
  group: 'Overlays',
  order: 14,
  summary: 'A dark bar that floats up from the bottom while items in a list are selected, holding the count and the actions for all of them. It leaves when the selection is empty.',
  when: [
    'Bulk actions on a list or table people select from: archive 12 messages, verify 5 applications, export 30 applicant records.',
    'Selection mode on phones, where a toolbar at the top would be out of reach.',
  ],
  whenNot: [
    ['Actions on a single item', 'dropdown-menu', 'Use the item\'s "more" menu'],
    ['Confirming that a bulk action happened', 'toast'],
    ['Persistent page actions that do not depend on a selection', 'page-header'],
    ['Saving a form', 'form-layout', 'The form ends with its own actions'],
  ],
  where: 'Fixed at the bottom center of the window, 20 px from the bottom (more on phones with a home indicator), above the content and below dialogs. One per page. On a phone with a tab bar, lift it above the bar.',
  anatomy: [
    ['.selbar[role=toolbar]', 'Required. The floating bar: inverse colors, 52 px tall, 16 px radius. `aria-label` it.'],
    ['.selbar__count', 'Required. "3 selected", tabular figures. Put it in a live region so changes are announced.'],
    ['.btn', 'The bulk actions, restyled for the inverse bar (38 px, quiet fill). `btn--danger` for a destructive one.'],
    ['.icon-btn', 'Clear selection, last, with `aria-label`.'],
    ['.selbar__label', 'Optional. Wrap a button\'s words in it (and give the button an `aria-label`) so under 520 px the bar keeps only the icons and fits the phone.'],
    ['.roll', 'Optional, inside the count: the number rolls as the selection changes (the selection hook sets it).'],
  ],
  examples: [
    {
      title: 'Bulk verification',
      desc: 'Select an application or two: the bar rises from the bottom of this box. Clear the selection and it leaves. In a page it is fixed to the bottom of the window.',
      height: 340,
      stage: 'block',
      html: `<div class="list" id="sb-list" style="max-width: 460px;" onchange="${sync}">
${row('Rina Wijaya', 'Micro business permit · sent Monday')}
${row('Bayu Pratama', 'Micro business permit · sent Tuesday')}
${row('Sari Nugroho', 'Micro business permit · past the deadline')}
</div>
<div class="selbar" id="sb-bar" role="toolbar" aria-label="Selected applications" inert>
  <span class="selbar__count" id="sb-count" aria-live="polite">0 selected</span>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">edit</span>Verify</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">download</span>Export</button>
  <button class="icon-btn" aria-label="Clear selection" onclick="${clear}"><span class="ic" aria-hidden="true">close</span></button>
</div>`,
      code: `<div class="selbar" role="toolbar" aria-label="Selected applications">
  <span class="selbar__count" aria-live="polite">3 selected</span>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">edit</span>Verify</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">download</span>Export</button>
  <button class="icon-btn" aria-label="Clear selection"><span class="ic" aria-hidden="true">close</span></button>
</div>
<!-- add .is-open while one or more items are selected -->`,
    },
    {
      title: 'With a destructive action',
      desc: 'Shown open. The danger button is the one place `btn--danger` appears outside a confirm, because it opens an [alert dialog](alert-dialog) or deletes with an Undo toast.',
      height: 160,
      stage: 'block',
      html: `<div class="selbar is-open" role="toolbar" aria-label="Selected messages">
  <span class="selbar__count">12 selected</span>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">inventory_2</span>Archive</button>
  <button class="btn btn--md btn--danger"><span class="ic" aria-hidden="true">delete</span>Delete</button>
  <button class="icon-btn" aria-label="Clear selection"><span class="ic" aria-hidden="true">close</span></button>
</div>`,
    },
  ],
  states: [
    ['.is-open', 'Visible and interactive while at least one item is selected.'],
    ['closed', 'Transparent, 16 px lower and 2 % smaller, `visibility: hidden` after the exit.'],
  ],
  motion: [
    'Enter: opacity over `--d-fast` (160 ms) on `--ease-enter`; rises from `translateY(16px) scale(0.98)` on `--spring-smooth` over `--d-smooth`.',
    'Exit: over `--d-exit` (180 ms) on `--ease-exit`, then hidden. Selecting again mid-exit reverses it, since it is a transition.',
    'The count changes in place; pair it with [rolling number](rolling-number) for large counts if you like. Reduced motion: no rise, 120 ms fade.',
  ],
  a11y: [
    '`role="toolbar"` with an `aria-label` naming what is selected.',
    'The count sits in an `aria-live="polite"` region so "3 selected" is announced as it changes.',
    'Make it `inert` (or remove it) while closed so hidden buttons are not tabbable. Clearing the selection should return focus to the list.',
    'Every item checkbox has its own label ("Select Rina Wijaya").',
  ],
  do: [
    'Keep two or three actions plus clear.',
    'Confirm the result with a [toast](toast) and Undo where possible.',
  ],
  dont: [
    'Show the bar when nothing is selected.',
    'Put single-item actions or navigation in it.',
    'Stack it with a second floating bar.',
  ],
  js: '`data-lds-selection="barId"` on the list, table or grid that holds `input[data-lds-select]` checkboxes (and an optional `input[data-lds-select-all]`) opens and closes the bar, rolls a `.roll` inside `.selbar__count`, keeps the bar `inert` while closed, ticks a run on Shift-click and clears on Escape or `[data-lds-select-clear]`; see [data table](data-table) and [file tile](file-tile). Without the hook, toggle `.is-open` from your selection state and update the count. The bar uses `position: fixed`, so inside a transformed container it pins to that container instead (as in this demo).',
  related: ['checkbox', 'list', 'table', 'toast'],
};
