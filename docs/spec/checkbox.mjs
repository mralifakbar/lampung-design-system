const BOX = '<span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span>';
const cb = (text, sub, checked, extra = '') => `<label class="check"><input type="checkbox"${checked ? ' checked' : ''}${extra}>${BOX}<span class="check__text">${text}${sub ? `<small>${sub}</small>` : ''}</span></label>`;

const ALL = `const kids = [...document.querySelectorAll('#ck-kids input')]; kids.forEach((k) => (k.checked = this.checked)); this.closest('.check').classList.remove('is-mixed'); this.indeterminate = false;`;
const KID = `const kids = [...document.querySelectorAll('#ck-kids input')], all = document.getElementById('ck-all'), n = kids.filter((k) => k.checked).length; all.checked = n === kids.length; all.indeterminate = n > 0 && n < kids.length; all.closest('.check').classList.toggle('is-mixed', all.indeterminate);`;

export default {
  title: 'Checkbox',
  group: 'Selection',
  order: 1,
  summary: 'A native checkbox with a drawn tick, for independent yes or no choices that are saved with a form. Several can be on at once; each label says what turning it on means.',
  when: [
    'Several independent options in a form, any number of which can be on: which notifications to receive, which documents to attach.',
    'One agreement before submitting: "I have read the service terms".',
    'Selecting rows in a list or table to act on them together (with a "select all" that can be mixed).',
  ],
  whenNot: [
    ['A setting that takes effect immediately, with no Save button', 'switch'],
    ['Exactly one of a few options', 'radio'],
    ['Filters that apply as they are tapped, shown as a row', 'chips'],
    ['Options that need a description, a price or an icon each', 'radio-card', 'For one choice; for several, checkboxes with a `small` second line'],
    ['Marking a task done in a checklist that is not a form', 'list', 'Checked rows (`.lrow--check`) show what is done'],
  ],
  where: 'In a [form](form-layout), stacked in a column 12 px apart, inside a `<fieldset>` with a `<legend>` when they belong to one question. In list and table rows, at the start of the row. Never in a horizontal row of more than two on phones.',
  anatomy: [
    ['label.check', 'Required. The whole row is the hit area; text wraps beside the box.'],
    ['input[type=checkbox]', 'Required. The native input, invisible over the box, so keyboard, forms and screen readers work as usual.'],
    ['.check__box', 'Required. The 22 px box with an SVG: `path.tick` for checked, `path.dash` for mixed. `aria-hidden`.'],
    ['.check__text', 'Required. The label text; a `small` inside adds a quiet second line.'],
    ['fieldset + legend', 'Groups related checkboxes under one question.'],
  ],
  examples: [
    {
      title: 'Notification choices',
      desc: 'The tick draws in after a short delay; unticking erases it faster. The second line explains the consequence.',
      html: `<fieldset class="stack" style="border: 0;">
  <legend class="field__label" style="margin-bottom: 12px;">Email me when</legend>
  ${cb('My application status changes', 'As soon as an officer updates it', true)}
  ${cb('A deadline is 24 hours away', '', true)}
  ${cb('Someone replies to my report', 'At most one email a day')}
</fieldset>`,
    },
    {
      title: 'Select all, with a mixed state',
      desc: 'When some but not all are on, the parent shows a dash and reports "mixed". Toggle the children to see it.',
      html: `<div class="stack">
  ${cb('All documents', '', false, ` id="ck-all" onchange="${ALL}"`).replace('class="check"', 'class="check is-mixed"')}
  <div class="stack" id="ck-kids" style="padding-left: 34px;">
    ${cb('KTP copy', '', true, ` onchange="${KID}"`)}
    ${cb('Family card', '', false, ` onchange="${KID}"`)}
    ${cb('RT cover letter', '', false, ` onchange="${KID}"`)}
  </div>
</div>
<img alt="" hidden src="data:," onerror="const a = document.getElementById('ck-all'); if (a) a.indeterminate = true;">`,
      code: `<label class="check is-mixed">
  <input type="checkbox" id="all-documents">
  <span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span>
  <span class="check__text">All documents</span>
</label>
<script>document.getElementById('all-documents').indeterminate = true;</script>`,
    },
    {
      title: 'Agreement and disabled',
      desc: 'A single checkbox before an important submit. A disabled option says why in its second line.',
      html: `<div class="stack">
  ${cb('I have read the service terms', 'The data I send must match the original documents')}
  ${cb('Fill in from my previous application', 'Available once one of your applications is complete', false, ' disabled')}
</div>`,
    },
  ],
  states: [
    ['checked', 'Accent fill with the primary finish; the tick draws in.'],
    ['.is-mixed (on .check) + input.indeterminate', 'Accent fill with a dash. Set `indeterminate = true` on the input in JS so it is announced as mixed.'],
    ['hover', 'The box edge darkens to `--text-subtle`.'],
    [':active', 'The box sinks to 0.88 in 90 ms.'],
    ['focus-visible', 'Focus ring on the box, from the input.'],
    ['disabled', 'The box at 40 % opacity; say why in the `small` line.'],
  ],
  motion: [
    'Tick: `stroke-dashoffset` 20 to 0 in 260 ms on `--ease-enter`, after a 40 ms delay so the fill lands first. Unticking erases it in 160 ms on `--ease-exit`; leaving is faster than arriving.',
    'Fill and edge: `background-color` and `box-shadow` in `--d-fast` (160 ms) on `--ease-standard`.',
    'Press: `scale(0.88)` in 90 ms, back on `--spring-snappy` (360 ms). Feedback starts on pointer down.',
    'Mixed: the dash draws in 200 ms on `--ease-enter`.',
    'Reduced motion: transitions become 120 ms linear; the tick still appears.',
  ],
  a11y: [
    'A real `<input type="checkbox">` inside the `<label>`: Space toggles, the label is the name, forms submit it.',
    'Group with `<fieldset>` and `<legend>` so the question is read with each option.',
    'Mixed state: set `input.indeterminate = true` (there is no HTML attribute); `.is-mixed` alone is only visual.',
    'Keep the label text on the label; the second line in `small` is read as part of it.',
  ],
  do: [
    'Phrase each label as the thing that will be true when it is on.',
    'Start unchecked unless the person chose before; never pre-tick consent.',
  ],
  dont: [
    'Use a checkbox for an instant setting; use a [switch](switch).',
    'Use a single checkbox as an on and off toggle between two named states ("Light or dark"); use a [segmented control](segmented-control).',
    'Draw a custom box or icon tick; use `.check__box` with its SVG.',
  ],
  related: ['radio', 'switch', 'chips', 'list'],
};
