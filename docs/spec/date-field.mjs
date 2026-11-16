// November 2026 starts on a Sunday; five weeks with 1 to 5 December muted.
const PICK = `const f = this.closest('[data-date-field]'); const i = f.querySelector('input'); i.value = this.getAttribute('data-date'); f.querySelectorAll('.cal__day').forEach((d) => { d.classList.toggle('is-selected', d === this); d.setAttribute('aria-pressed', String(d === this)); }); import('../../js/lds.js').then((m) => { m.closeMenus(); i.focus(); });`;
const cal = (id, selected) => {
  let days = '';
  for (let d = 1; d <= 35; d++) {
    const n = d <= 30 ? d : d - 30;
    const muted = d > 30;
    const label = `${n} ${muted ? 'December' : 'November'} 2026`;
    const value = `${String(n).padStart(2, '0')}/${muted ? '12' : '11'}/2026`;
    const cls = ['cal__day', muted && 'is-muted', !muted && n === 16 && 'is-today', !muted && n === selected && 'is-selected'].filter(Boolean).join(' ');
    days += `<button type="button" class="${cls}" aria-label="${label}"${!muted && n === 16 ? ' aria-current="date"' : ''} aria-pressed="${!muted && n === selected}" data-date="${value}" onclick="${PICK}">${n}</button>`;
  }
  return `<div class="popover" id="${id}" role="dialog" aria-label="Choose a date" style="width: auto; padding: 0; top: calc(100% + 6px); right: 0;">
      <div class="cal">
        <div class="cal__head"><button type="button" class="icon-btn" style="width: 36px; height: 36px;" aria-label="Previous month"><span class="ic" aria-hidden="true">chevron_left</span></button><span class="cal__month" aria-live="polite">November 2026</span><button type="button" class="icon-btn" style="width: 36px; height: 36px;" aria-label="Next month"><span class="ic" aria-hidden="true">chevron_right</span></button></div>
        <div class="cal__grid"><span class="cal__dow" aria-hidden="true">S</span><span class="cal__dow" aria-hidden="true">M</span><span class="cal__dow" aria-hidden="true">T</span><span class="cal__dow" aria-hidden="true">W</span><span class="cal__dow" aria-hidden="true">T</span><span class="cal__dow" aria-hidden="true">F</span><span class="cal__dow" aria-hidden="true">S</span>${days}</div>
      </div>
    </div>`;
};

export default {
  title: 'Date field',
  group: 'Inputs',
  order: 12,
  summary: 'A text field for a date with a calendar button that opens a calendar in a popover. Typing the date always works; the calendar is the helper. Built from existing parts: `.control`, `.control__btn`, `.popover` and `.cal`.',
  when: [
    'People enter one date in a form: a date of birth, an exam date, a deadline, a payment date.',
    'The date is near today and seeing the month helps (scheduling a tryout, choosing a due date).',
  ],
  whenNot: [
    ['Showing a month of events, or picking a range on the page itself', 'calendar', 'The `.cal` component inline, not in a popover'],
    ['A date far in the past people know by heart (date of birth)', 'text-field', 'Typing DD/MM/YYYY is faster than paging back 20 years; keep the calendar button optional'],
    ['Picking a relative period (this week, this month)', 'segmented-control', 'Or [chips](chips) for presets like "Last 7 days"'],
    ['A time of day only', 'select', 'A list of half-hour slots'],
  ],
  where: 'In a [form](form-layout) like any field, about 220 px wide on wide screens (a date never needs the full width). The popover opens below the field, aligned to its right edge. On phones, prefer the native picker (`type="date"` in a `.control`) or open the calendar in a [sheet](sheet).',
  anatomy: [
    ['.field / .field__label / .field__help', 'Required. Same wrapper as a [text field](text-field). The helper shows the format ("DD/MM/YYYY").'],
    ['positioned wrapper', 'Required. An element with `position: relative` around the control and the popover, so the popover opens under the field.'],
    ['.control > input', 'Required. Text input, `inputmode="numeric"`, `placeholder="DD/MM/YYYY"`, `autocomplete="bday"` for birth dates.'],
    ['.control__btn', 'Required. The calendar button (`calendar_month`), `aria-label="Choose a date"`, `aria-haspopup="dialog"`, and `data-lds-menu` pointing at the popover.'],
    ['.popover[role=dialog]', 'Required. The floating layer, set to `width: auto; padding: 0` and placed under the field.'],
    ['.cal', 'Required. Month header with previous and next [icon buttons](icon-button), weekday row and `.cal__day` buttons (`.is-today`, `.is-selected`, `.is-muted`).'],
  ],
  examples: [
    {
      title: 'Exam date',
      desc: 'Type a date, or open the calendar with the button. Picking a day fills the field, closes the calendar and returns focus to the input. Escape or a click outside closes it.',
      html: `<div class="field" style="max-width: 300px; width: 100%;" data-date-field>
  <label class="field__label" for="df-exam">Exam date</label>
  <div style="position: relative;">
    <div class="control"><input id="df-exam" inputmode="numeric" placeholder="DD/MM/YYYY" value="24/11/2026" aria-describedby="df-exam-help"><button type="button" class="control__btn" aria-label="Choose a date" aria-haspopup="dialog" aria-expanded="false" data-lds-menu="df-pop"><span class="ic" aria-hidden="true">calendar_month</span></button></div>
    ${cal('df-pop', 24)}
  </div>
  <span class="field__help" id="df-exam-help">DD/MM/YYYY. Exams run Monday to Saturday.</span>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="exam-date">Exam date</label>
  <div style="position: relative;">
    <div class="control">
      <input id="exam-date" inputmode="numeric" placeholder="DD/MM/YYYY" aria-describedby="exam-date-help">
      <button type="button" class="control__btn" aria-label="Choose a date" aria-haspopup="dialog" aria-expanded="false" data-lds-menu="exam-cal">
        <span class="ic" aria-hidden="true">calendar_month</span>
      </button>
    </div>
    <div class="popover" id="exam-cal" role="dialog" aria-label="Choose a date" style="width: auto; padding: 0; top: calc(100% + 6px); right: 0;">
      <div class="cal">
        <div class="cal__head">
          <button type="button" class="icon-btn" aria-label="Previous month"><span class="ic" aria-hidden="true">chevron_left</span></button>
          <span class="cal__month" aria-live="polite">November 2026</span>
          <button type="button" class="icon-btn" aria-label="Next month"><span class="ic" aria-hidden="true">chevron_right</span></button>
        </div>
        <div class="cal__grid">
          <span class="cal__dow" aria-hidden="true">S</span> … <span class="cal__dow" aria-hidden="true">S</span>
          <button type="button" class="cal__day" aria-label="1 November 2026" aria-pressed="false">1</button>
          …
          <button type="button" class="cal__day is-today" aria-label="16 November 2026" aria-current="date" aria-pressed="false">16</button>
          <button type="button" class="cal__day is-selected" aria-label="24 November 2026" aria-pressed="true">24</button>
          …
        </div>
      </div>
    </div>
  </div>
  <span class="field__help" id="exam-date-help">DD/MM/YYYY. Exams run Monday to Saturday.</span>
</div>
<!-- Your code: render the month, page it with the arrows, and on a day click
     write the date into the input, move .is-selected, then closeMenus() and focus the input. -->`,
      height: 470,
    },
    {
      title: 'Typed date that is not allowed',
      desc: 'Validate the typed text on blur like any field; the message says the rule.',
      html: `<div class="field" style="max-width: 300px; width: 100%;">
  <label class="field__label" for="df-due">Due date</label>
  <div class="control is-invalid"><input id="df-due" inputmode="numeric" value="31/11/2026" aria-invalid="true" aria-describedby="df-due-help"><button type="button" class="control__btn" aria-label="Choose a date" aria-haspopup="dialog"><span class="ic" aria-hidden="true">calendar_month</span></button></div>
  <span class="field__help field__help--error" id="df-due-help"><span class="ic" aria-hidden="true">error</span>November has 30 days. Check the day.</span>
</div>`,
    },
    {
      title: 'Native picker on phones',
      desc: 'Inside a `.control` the native date input gets the system field look and the phone shows its own wheel or calendar.',
      html: `<div class="field" style="max-width: 300px; width: 100%;">
  <label class="field__label" for="df-native">Date of payment</label>
  <div class="control"><span class="ic" aria-hidden="true">event</span><input id="df-native" type="date" value="2026-11-28"></div>
</div>`,
    },
  ],
  states: [
    ['open', '`aria-expanded="true"` on the calendar button and `.is-open` on the popover, set by `data-lds-menu`.'],
    ['.cal__day.is-today', 'Accent text, semibold; add `aria-current="date"`.'],
    ['.cal__day.is-selected', 'Accent fill with white text; `aria-pressed="true"`.'],
    ['.cal__day.is-muted', 'Days of the next or previous month, faint. Disable days that cannot be chosen (`disabled`).'],
    ['.is-invalid', 'On the `.control` with `aria-invalid`, as any field.'],
  ],
  motion: [
    'The popover grows from the button area: opacity in `--d-fast` (160 ms) on `--ease-enter`, `scale(0.96) translateY(-4px)` to rest on `--spring-smooth` (560 ms); it leaves in `--d-exit` (180 ms) on `--ease-exit`.',
    'Days tint on hover in `--d-fast` and sink to 0.88 on press, springing back on `--spring-snappy`.',
    'Changing month swaps the grid at once; do not slide months, it slows paging through a year.',
    'Reduced motion: the popover fades in 120 ms linear without scale.',
  ],
  a11y: [
    'The text input is the real field and works without the calendar: label, format in the helper, validation on blur.',
    'The calendar button is a `<button type="button">` with `aria-label="Choose a date"`, `aria-haspopup="dialog"` and `aria-expanded`.',
    'Each day is a button named with the full date ("24 November 2026"); weekday letters are `aria-hidden`. The month name is `aria-live="polite"` so paging is announced.',
    '`data-lds-menu` focuses the first button in the popover on open and closes it on Escape or an outside click. Arrow keys between days are not built in: add them (Left, Right by a day; Up, Down by a week) when keyboard use matters.',
  ],
  do: [
    'Accept typed dates in the format shown, and show that format in the helper.',
    'Open the calendar on the month of the current value, or today.',
    'Disable days that are not allowed and say the rule in the helper.',
  ],
  dont: [
    'Make the input read-only so people must use the calendar.',
    'Build a new date-picker component; compose these parts.',
    'Use the popover calendar for date of birth without allowing typing.',
  ],
  js: 'No date-field behavior in the system. `data-lds-menu="popover-id"` on the calendar button opens and closes the popover (outside click, Escape) and focuses its first button; `closeMenus()` closes it after a pick. Rendering months, paging and writing the value are yours.',
  related: ['calendar', 'popover', 'text-field', 'sheet'],
};
