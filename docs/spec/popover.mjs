export default {
  title: 'Popover',
  group: 'Overlays',
  order: 8,
  summary: 'A small floating card anchored to a button, for content richer than a menu: a mini form, a short explanation with a link, a quick setting. It does not block the page.',
  when: [
    'A few fields or controls tied to one button: set a reminder, adjust a column width, quick-edit a due date.',
    'A short explanation people open on purpose, with formatting or a link inside.',
  ],
  whenNot: [
    ['A list of commands', 'dropdown-menu'],
    ['A label for an icon or a one-line hint on hover', 'tooltip'],
    ['A preview of a person or link on hover', 'hover-card'],
    ['A task that needs focus and a decision before going on', 'dialog'],
    ['Picking a date', 'date-field', 'The date field already pairs a control with its calendar popover'],
  ],
  where: '8 px below its trigger, aligned to its left edge, 300 px wide. Trigger and popover share a `position: relative` wrapper; position the popover with inline `top`/`left`. On phones, use a [sheet](sheet) for anything with fields.',
  anatomy: [
    ['trigger', 'Required. A button with `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls` the popover id.'],
    ['.popover', 'Required. The floating card: 300 px, 16 px padding, elevated with a shadow; `role="dialog"` and `aria-label` (or `aria-labelledby`).'],
    ['.popover.is-open', 'Required to show it.'],
  ],
  examples: [
    {
      title: 'Set a reminder',
      desc: 'The popover toggles from its button, grows from the top and closes on Escape or a click outside.',
      height: 280,
      html: `<div style="position: relative; align-self: flex-start;">
  <button class="btn btn--secondary btn--md" aria-haspopup="dialog" aria-expanded="false" aria-controls="po-remind" data-lds-menu="po-remind"><span class="ic" aria-hidden="true">notifications</span>Remind me</button>
  <div class="popover" id="po-remind" role="dialog" aria-labelledby="po-remind-t" style="top: calc(100% + 8px); left: 0;">
    <div class="stack" style="--gap: 12px;">
      <h3 class="section__title-sm" id="po-remind-t">Remind me about vehicle tax</h3>
      <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">One day before the due date</span></label>
      <label class="check"><input type="checkbox"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">One hour before the due date</span></label>
      <button class="btn btn--primary btn--md btn--block" onclick="setTimeout(() => document.body.click(), 0);">Set reminder</button>
    </div>
  </div>
</div>`,
      code: `<div style="position: relative;">
  <button class="btn btn--secondary" aria-haspopup="dialog" aria-expanded="false" aria-controls="remind" data-lds-menu="remind">Remind me</button>
  <div class="popover" id="remind" role="dialog" aria-labelledby="remind-t" style="top: calc(100% + 8px); left: 0;">
    <h3 class="section__title-sm" id="remind-t">Remind me about vehicle tax</h3>
    …
  </div>
</div>`,
    },
    {
      title: 'Static, open',
      desc: 'A popover explaining how an application is scored, shown open.',
      height: 200,
      html: `<div style="position: relative; align-self: flex-start;">
  <button class="btn btn--plain btn--sm" aria-haspopup="dialog" aria-expanded="true" aria-controls="po-score">How is this scored?</button>
  <div class="popover is-open" id="po-score" role="dialog" aria-label="How the score works" style="top: calc(100% + 8px); left: 0;">
    <p class="section__sub">Each complete document is worth 5 points, an incomplete one 0. Optional documents you leave out do not count against you.</p>
  </div>
</div>`,
    },
  ],
  states: [
    ['.is-open', 'Visible and interactive; the trigger has `aria-expanded="true"`.'],
    ['closed', 'Transparent, slightly scaled, `visibility: hidden` after the exit.'],
  ],
  motion: [
    'Enter: opacity over `--d-fast` (160 ms) on `--ease-enter`; from `scale(0.96) translateY(-4px)` on `--spring-smooth`, growing from top center.',
    'Exit: over `--d-exit` (180 ms) on `--ease-exit`, then hidden. A transition, so a quick toggle reverses smoothly.',
    'Reduced motion: fade only.',
  ],
  a11y: [
    'Non-modal: focus is not trapped, the page stays usable. Give it `role="dialog"` and a name.',
    'Moving focus into it on open and back to the trigger on close is your job, unless you reuse the menu hook (which focuses its first button, closes on Escape and returns focus).',
    'Escape and a click outside close it.',
  ],
  do: [
    'Keep it to one small task or explanation.',
    'Close it after the main action.',
  ],
  dont: [
    'Put a long form or a table in a popover.',
    'Open it on hover; that is a [hover card](hover-card).',
    'Use a popover where a [dropdown menu](dropdown-menu) of commands would do.',
  ],
  js: 'No dedicated hook: toggle `.is-open` and `aria-expanded` yourself, or reuse the menu hook (`data-lds-menu="popoverId"` on the trigger), which opens and closes it, focuses its first button, closes on Escape (focus back to the trigger) and on a click outside; call `closeMenus()` after the action inside the popover. Avoid controls that use Up and Down arrows inside it: those keys are handled as menu keys.',
  related: ['dropdown-menu', 'tooltip', 'hover-card', 'date-field'],
};
