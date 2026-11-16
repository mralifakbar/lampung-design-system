const TICK = '<span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span>';
const PRESS = "this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))";

export default {
  title: 'Press feedback',
  group: 'Motion',
  order: 2,
  summary: 'The control answers the moment a finger or mouse goes down: it sinks a little in 90 ms and springs back on release. Depth follows size, so small things sink more and wide things barely move. Every system control already does this; you only choose the right control.',
  when: [
    'Any tappable control: it is built in. Use the system class and the press comes with it.',
    'Checking a custom tappable surface you are adding to the system: give it the depth for its size from the table below.',
  ],
  whenNot: [
    ['The result of the press needs saying (Saved, Sent)', 'text-morph'],
    ['A refused press (wrong code, missing field)', 'shake'],
    ['A press that is dangerous and must be deliberate', 'hold-to-confirm'],
    ['A marker that moves to the pressed option', 'sliding-indicator'],
    ['A tactile tick on phones in addition to the visual', 'haptics'],
  ],
  where: 'On the pressed element itself, never on its container or the page. A button inside a card sinks; the card does not.',
  examples: [
    {
      title: 'Buttons',
      desc: 'Press and hold each one. Standard buttons sink to 0.97; full-width and large ones to 0.985 so the motion stays the same size in pixels; a menu trigger does not sink because the menu opening is its feedback; icon buttons sink to 0.9 with a tint.',
      html: `<div class="docs-row">
  <button class="btn btn--primary">Submit answers</button>
  <button class="btn btn--secondary">Preview</button>
  <button class="btn btn--gray btn--md" aria-haspopup="menu">Sort by<span class="ic" aria-hidden="true">expand_more</span></button>
  <button class="icon-btn" aria-label="Bookmark"><span class="ic" aria-hidden="true">bookmark</span></button>
  <button class="icon-btn icon-btn--filled" aria-label="Share"><span class="ic" aria-hidden="true">share</span></button>
</div>
<div class="docs-col" style="max-width: 360px; margin-top: 12px;"><button class="btn btn--primary btn--block">Start the tryout</button></div>`,
    },
    {
      title: 'List rows',
      desc: 'Rows do not scale; they fill with the pressed tint at once. Scaling a full-width row would shift its edges against the list.',
      stage: 'fill',
      html: `<div class="list" style="width: 100%; max-width: 420px;">
  <a class="lrow lrow--icon" href="#"><span class="lrow__icon"><span class="ic" aria-hidden="true">person</span></span><span class="lrow__body"><span class="lrow__title">Profile</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Notifications</span></span><span class="lrow__value">On</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#"><span class="lrow__icon" style="background: var(--neutral);"><span class="ic" aria-hidden="true">lock</span></span><span class="lrow__body"><span class="lrow__title">Privacy</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
</div>`,
    },
    {
      title: 'Cards',
      desc: 'Tappable cards and radio cards sink to 0.985: enough to feel, not enough to move the grid. Resting cards (not links) do not move at all.',
      stage: 'fill',
      html: `<div class="docs-col" style="max-width: 420px;">
  <a class="card card--link" href="#"><span class="card__title" style="display: block;">Cell biology</span><span class="card__sub" style="display: block;">12 lessons, 3 quizzes</span></a>
  <div role="radiogroup" aria-label="Plan" class="docs-col">
    <button class="rcard" role="radio" aria-checked="true" onclick="this.parentElement.querySelectorAll('.rcard').forEach((r) => r.setAttribute('aria-checked', String(r === this)))"><span class="radio__dot"></span><span><span class="rcard__title" style="display: block;">Monthly</span><span class="rcard__sub" style="display: block;">Cancel any time</span></span><span class="rcard__price">Rp 49.000</span></button>
    <button class="rcard" role="radio" aria-checked="false" onclick="this.parentElement.querySelectorAll('.rcard').forEach((r) => r.setAttribute('aria-checked', String(r === this)))"><span class="radio__dot"></span><span><span class="rcard__title" style="display: block;">Full term</span><span class="rcard__sub" style="display: block;">Four months, save 20 %</span></span><span class="rcard__price">Rp 156.000</span></button>
  </div>
</div>`,
    },
    {
      title: 'Chips, toggles and checkboxes',
      desc: 'Small targets sink deeper so the press is visible under a finger: chips 0.95, toggles 0.94, checkboxes and radios 0.88. The state change (fill, check, color) follows on release.',
      html: `<div class="chip-row">
  <button class="chip" aria-pressed="true" onclick="${PRESS}"><span class="ic chip__check" aria-hidden="true">check</span>Biology</button>
  <button class="chip" aria-pressed="false" onclick="${PRESS}"><span class="ic chip__check" aria-hidden="true">check</span>Chemistry</button>
  <button class="chip" aria-pressed="false" onclick="${PRESS}"><span class="ic chip__check" aria-hidden="true">check</span>Physics</button>
</div>
<div class="toggle-group" role="group" aria-label="Text style">
  <button class="toggle" aria-pressed="false" aria-label="Bold" onclick="${PRESS}"><span class="ic" aria-hidden="true">format_bold</span></button>
  <button class="toggle" aria-pressed="false" aria-label="Italic" onclick="${PRESS}"><span class="ic" aria-hidden="true">format_italic</span></button>
  <button class="toggle" aria-pressed="false" aria-label="Underline" onclick="${PRESS}"><span class="ic" aria-hidden="true">format_underlined</span></button>
</div>
<label class="check"><input type="checkbox">${TICK}<span class="check__text">Remind me a day before</span></label>`,
    },
  ],
  variants: [
    ['scale(0.97)', '`.btn` default. Press in 90 ms on `--ease-standard`.'],
    ['scale(0.985)', '`.btn--block`, `.btn--lg`, `.card--link`, `.rcard`, `.link-card`: wide targets.'],
    ['none', '`.btn[aria-haspopup]`, `.btn-group .btn`, split buttons: the menu or the group background is the feedback.'],
    ['scale(0.94 to 0.96)', '`.toggle`, `.like`, `.xbar__btn` (0.94); `.chip` (0.95); `.confirm__arm` (0.96).'],
    ['scale(0.9) + tint', '`.icon-btn`, `.composer__send`.'],
    ['scale(0.85 to 0.92)', '`.check__box`, `.radio__dot`, `.control__btn`, stepper buttons, `.cal__day` (0.88); `.tabbar__item .ic` (0.86); `.star` (0.85); `.pager__btn` (0.92).'],
    ['tint, no scale', '`button.lrow`, `a.lrow`, `.shell__link`, `.menu__item`, table rows: full-width rows.'],
    ['opacity 0.6', '`.seg__btn`: the thumb is the selection feedback.'],
  ],
  motion: [
    'Press: `transform: scale(…)` with `transition-duration: 90ms` on `--ease-standard`, triggered by `:active`, so it starts on pointer down.',
    'Release: back to `none` on `--spring-snappy` over `--d-snappy` (360 ms). The control is already usable during the spring.',
    'Interruption: a quick tap plays a shallow sink and the spring catches it mid-way; a press that slides off the control releases the same way. Nothing waits for the press to finish.',
    'Rows tint (`--bg-tint-strong`) instead of scaling; the tint has no transition in, so it shows at once.',
    'Reduced motion: the sink still happens but in 120 ms linear, with no spring; it is a 3 % size change, not travel, so it stays.',
  ],
  a11y: [
    'Keyboard presses (Space, Enter) trigger `:active` on buttons too, so keyboard users get the same feedback.',
    'Press feedback is not a state. The state that follows (pressed, checked, selected) still needs its ARIA attribute (`aria-pressed`, `aria-checked`).',
    'Keep the 44 px hit area even when the visual is smaller; the space around small controls is part of the target.',
  ],
  do: [
    'Use system controls; the press comes with them.',
    'Match depth to size when adding a new tappable thing to the system: smaller sinks more.',
    'Give rows a tint, not a scale.',
  ],
  dont: [
    'Add your own `:active` transforms to system components.',
    'Wait for `click` (release) to show any feedback.',
    'Scale a card that is not a link, or a whole list.',
    'Add a ripple or a glow on press.',
  ],
  js: 'None. Pure CSS on `:active`.',
  related: ['button', 'motion-principles', 'haptics', 'icon-button'],
};
