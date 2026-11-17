const RESET = (key) => `import('../../js/lds.js').then((m) => { m.resetHints(['${key}']); const box = this.closest('.docs-col'); const h = box.querySelector('.hint'); h.hidden = false; box.querySelector('.collapse').classList.remove('is-closed'); });`;

export default {
  title: 'Hints',
  group: 'Microinteractions',
  order: 13,
  summary: 'A short tip that teaches a shortcut or a gesture, shown on the first few visits only and gone for good once closed. It gets quieter with use: by the time people know the trick, the hint has retired itself.',
  when: [
    'A gesture or shortcut that is not visible: swipe a row, press / to search, long press for more.',
    'A feature that people miss in testing, where a one-line tip is enough.',
  ],
  whenNot: [
    ['A guided tour pointing at parts of the screen', 'coachmark'],
    ['Something wrong or important now', 'alert'],
    ['Explaining a term next to a label', 'tooltip', 'Use an info tip.'],
    ['A message after an action', 'toast'],
    ['Help that should always be there', 'prose'],
  ],
  where: 'Directly above or beside what it teaches: over the list that can be swiped, next to the search field with a shortcut. One hint per screen at most. Wrap it in a `.collapse` so closing it closes its space.',
  anatomy: [
    ['.hint', 'Required. `data-lds-hint="<key>"`, `data-max="3"`, `role="note"`. Accent tint, icon, one sentence with the key words in bold.'],
    ['.hint__close', 'Required. `data-lds-hint-close`, `aria-label="Hide this hint"`. Retires the hint at once.'],
    ['.collapse', 'Recommended wrapper: closing collapses the space instead of making the page jump.'],
  ],
  examples: [
    {
      title: 'Teach a gesture',
      desc: 'Shown on the first three visits to this page. Close it and it is gone for good; Show again resets it (from a help menu in a real product).',
      stage: 'fill',
      html: `<div class="docs-col" style="max-width: 420px;">
  <div class="collapse"><div><div class="hint" data-lds-hint="docs-swipe-rows" data-max="3" role="note"><span class="ic" aria-hidden="true">touch_app</span><span><b>Swipe a row left</b> to pin, archive or delete it.</span><button class="hint__close" data-lds-hint-close aria-label="Hide this hint"><span class="ic ic--sm" aria-hidden="true">close</span></button></div></div></div>
  <div class="list">
    <div class="lrow"><span class="lrow__body"><span class="lrow__title">Reply to your damaged road report</span><span class="lrow__sub">Two notes from the field officer</span></span></div>
    <div class="lrow"><span class="lrow__body"><span class="lrow__title">Posyandu schedule changed</span><span class="lrow__sub">Moved to the RW 04 community hall</span></span></div>
  </div>
  <button class="btn btn--plain btn--sm" style="align-self: flex-start; margin-left: -10px;" onclick="${RESET('docs-swipe-rows')}"><span class="ic" aria-hidden="true">refresh</span>Show the hint again</button>
</div>`,
      code: `<div class="collapse"><div>
  <div class="hint" data-lds-hint="swipe-rows" data-max="3" role="note">
    <span class="ic" aria-hidden="true">touch_app</span>
    <span><b>Swipe a row left</b> to pin, archive or delete it.</span>
    <button class="hint__close" data-lds-hint-close aria-label="Hide this hint"><span class="ic ic--sm" aria-hidden="true">close</span></button>
  </div>
</div></div>
<!-- Help menu: import { resetHints } from 'lampung-design-system/js'; resetHints(); -->`,
    },
    {
      title: 'Teach a shortcut',
      desc: 'A keyboard shortcut next to the search it opens, for the first five visits.',
      html: `<div class="docs-col" style="max-width: 420px;">
  <div class="collapse"><div><div class="hint" data-lds-hint="docs-slash-search" data-max="5" role="note"><span class="ic" aria-hidden="true">search</span><span>Press <span class="kbd">/</span> to search services from any page.</span><button class="hint__close" data-lds-hint-close aria-label="Hide this hint"><span class="ic ic--sm" aria-hidden="true">close</span></button></div></div></div>
  <div class="control search"><span class="ic" aria-hidden="true">search</span><input aria-label="Search services" placeholder="Search services"></div>
  <button class="btn btn--plain btn--sm" style="align-self: flex-start; margin-left: -10px;" onclick="${RESET('docs-slash-search')}"><span class="ic" aria-hidden="true">refresh</span>Show the hint again</button>
</div>`,
    },
  ],
  states: [
    ['shown', 'Visits counted so far are below `data-max`; the count goes up by one per page load (`data-seen`).'],
    ['retired', 'After `data-max` visits, or as soon as it is closed: `hidden`, and the `.collapse` around it closes.'],
    ['reset', '`resetHints([keys])` clears the counts, so the hint shows again on the next load.'],
  ],
  motion: [
    'The hint itself does not animate in: it is part of the page when the page appears.',
    'Closing collapses the wrapping `.collapse`: rows to `0fr` on `--spring-smooth` (560 ms) while it fades over `--d-standard`, so the content below glides up.',
    'Reduced motion: the close takes 120 ms.',
  ],
  a11y: [
    '`role="note"`: read in place, not announced as an alert.',
    'The close button has an `aria-label`. After closing, move focus to what the hint was about if focus was on the close button.',
    'Say the gesture and its keyboard or button equivalent when there is one.',
  ],
  do: [
    'Give each hint a stable key and a small `data-max` (3 to 5).',
    'Let people bring hints back from a help menu with `resetHints()`.',
    'Keep it to one sentence with the action in bold.',
  ],
  dont: [
    'Show more than one hint on a screen.',
    'Use a hint for errors or announcements.',
    'Hide the only way to an action behind a hint.',
  ],
  js: '`[data-lds-hint]` on `init()` counts the visit in `localStorage` (`lds-hint:<key>`) and hides the hint once the count reaches `data-max`; `[data-lds-hint-close]` retires it at once and closes its `.collapse`. `resetHints(keys?)` clears all or the named counts. If storage is blocked the hint always shows.',
  related: ['coachmark', 'swipe-actions', 'height-expand', 'tooltip'],
};
