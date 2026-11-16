export default {
  title: 'Motion principles',
  group: 'Motion',
  order: 1,
  summary: 'Calm by default: things arrive on a spring with no overshoot, leave faster on an accelerating curve, start from wherever they are when interrupted, and only bounce after a gesture that carried momentum. Every value comes from a token; the recipes in this group say which one.',
  when: [
    'Before adding any motion: read this page, then pick the recipe that matches the situation instead of writing a new animation.',
    'Choosing a duration or curve for a component the system does not have yet (then add it to the system, not the page).',
    'Reviewing a screen that "feels slow", "feels cheap" or "jumps": check it against the six rules below.',
  ],
  whenNot: [
    ['A press on a control', 'press-feedback'],
    ['Something opening, closing, arriving or leaving', 'enter-and-exit'],
    ['A marker moving between options (tabs, segmented, sidebar)', 'sliding-indicator'],
    ['Content opening or closing in the flow (accordion, dismiss)', 'height-expand'],
    ['A group of items arriving together', 'list-stagger'],
    ['Replacing one view with another in the same place', 'view-swap'],
    ['A thumbnail growing into a full view', 'shared-element'],
    ['A number changing', 'number-count'],
    ['Dragging, flicking, swiping', 'drag-and-momentum'],
    ['Figures appearing as the page scrolls', 'reveal-on-scroll'],
    ['What changes when people ask for less motion', 'reduced-motion'],
  ],
  where: 'Everywhere, through tokens in `css/tokens.css`. Motion lives in the component CSS; pages do not add their own transitions to system components.',
  examples: [
    {
      title: 'Enter slow, leave fast',
      desc: 'The menu grows from its trigger on the smooth spring (560 ms, no overshoot) and leaves in 180 ms on the exit curve. Opening is information; closing should get out of the way.',
      stage: 'block',
      height: 250,
      html: `<div style="position: relative; display: inline-block;">
  <button class="btn btn--gray btn--md" data-lds-menu="mp-menu" aria-haspopup="menu" aria-expanded="false">Sort assignments<span class="ic" aria-hidden="true">expand_more</span></button>
  <div class="menu" id="mp-menu" role="menu" style="top: calc(100% + 6px); left: 0;">
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">event</span>Due date</button>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">school</span>Course</button>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">schedule</span>Recently added</button>
  </div>
</div>`,
    },
    {
      title: 'Interruptible',
      desc: 'Click quickly between the options. The thumb never finishes a stale trip: each click redirects it from where it is, because it is a CSS transition, not a keyframe animation.',
      html: `<div class="seg seg--lg" role="group" aria-label="Range" data-lds-segmented style="width: 340px;">
  <span class="seg__thumb"></span>
  <button class="seg__btn" aria-pressed="true">Week</button>
  <button class="seg__btn" aria-pressed="false">Month</button>
  <button class="seg__btn" aria-pressed="false">Term</button>
  <button class="seg__btn" aria-pressed="false">Year</button>
</div>`,
    },
    {
      title: 'Same path back, bounce is earned',
      desc: 'The sheet rises from the bottom and drops back to the bottom; the drawer leaves to its side. Open the sheet and flick it: only a released drag springs with a little overshoot.',
      stage: 'flush',
      html: `<div class="viewport docs-box" data-lds-push="mp-sheet">
  <div class="viewport__content">
    <p class="card__title">Biology 101, Tuesday</p>
    <div class="docs-row">
      <button class="btn btn--secondary btn--md" data-lds-open="mp-sheet" aria-haspopup="dialog">Mark attendance</button>
      <button class="btn btn--secondary btn--md" data-lds-open="mp-drawer" aria-haspopup="dialog"><span class="ic" aria-hidden="true">tune</span>Filters</button>
    </div>
  </div>
  <div class="scrim" data-lds-scrim="mp-sheet"></div>
  <div class="sheet" id="mp-sheet" role="dialog" aria-modal="true" aria-labelledby="mp-sheet-t" data-lds-layer>
    <div class="sheet__grabber" aria-hidden="true"></div>
    <div class="sheet__head" data-lds-drag><h3 class="sheet__title" id="mp-sheet-t">Mark attendance</h3></div>
    <div class="list list--fill"><button class="lrow"><span class="lrow__body"><span class="lrow__title">Present</span></span></button><button class="lrow"><span class="lrow__body"><span class="lrow__title">Late, with reason</span></span></button><button class="lrow"><span class="lrow__body"><span class="lrow__title">Excused absence</span></span></button></div>
    <button class="btn btn--primary btn--block" style="margin-top: 16px;" data-lds-close>Save attendance</button>
  </div>
  <div class="scrim" data-lds-scrim="mp-drawer"></div>
  <aside class="drawer" id="mp-drawer" role="dialog" aria-modal="true" aria-labelledby="mp-drawer-t" data-lds-layer>
    <div class="sheet__head" style="margin: 0;"><h3 class="sheet__title" id="mp-drawer-t">Filters</h3><button class="icon-btn" aria-label="Close filters" data-lds-close style="margin: -10px -10px -10px 0;"><span class="ic" aria-hidden="true">close</span></button></div>
    <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">Needs grading</span></label>
    <button class="btn btn--primary btn--block" style="margin-top: auto;" data-lds-close>Show 12 results</button>
  </aside>
</div>`,
    },
  ],
  variants: [
    ['--d-instant (120ms)', 'Hover tints, small color changes. Press uses 90 ms in the components.'],
    ['--d-fast (160ms)', 'Opacity and color, overlay fade-ins.'],
    ['--d-exit (180ms)', 'Anything leaving: menus, dialogs, toasts. Pair with `--ease-exit`.'],
    ['--d-standard (240ms)', 'Text swaps, tab panels, scrims, fades.'],
    ['--d-snappy (360ms) + --spring-snappy', 'Damping 1.0, response 0.27 s. Presses releasing, toggles, thumbs, small indicators, icon swaps.'],
    ['--d-considered (480ms) + --ease-inout', 'Things already on screen changing value: progress bars, rings, chart data.'],
    ['--d-smooth (560ms) + --spring-smooth', 'Damping 1.0, response 0.42 s. Panels, sheets, dialogs, sliding indicators, height changes.'],
    ['--d-momentum (600ms) + --spring-momentum', 'Damping 0.8: a 1.5 % overshoot. Only after a released drag or flick.'],
    ['--ease-enter', 'cubic-bezier(0.16, 1, 0.3, 1). Fades in, text, small reveals.'],
    ['--ease-standard', 'cubic-bezier(0.22, 1, 0.36, 1). Color and state changes.'],
    ['--ease-inout', 'cubic-bezier(0.65, 0, 0.35, 1). Something already visible moving to a new value.'],
    ['--ease-exit', 'cubic-bezier(0.7, 0, 0.84, 0). Dismissals; accelerates away.'],
  ],
  motion: [
    '**Respond on press.** Feedback starts on pointer down, within 90 ms, and releases on `--spring-snappy`. See [press feedback](press-feedback).',
    '**Enter slow, leave fast.** Entrances 240 to 560 ms on a spring or `--ease-enter`; exits 160 to 260 ms on `--ease-exit` (180 ms for anything small, up to 260 ms for a sheet that travels its full height). Exits never bounce.',
    '**Same path back.** What rose from the bottom drops to the bottom; drawers leave to their side; menus grow from and return to the corner nearest the trigger (`transform-origin`, `menu--right`, `menu--up`).',
    '**Bounce is earned.** `--spring-momentum` only after a gesture that carried momentum (a flicked sheet, a released slide knob). Everything a tap opens uses damping 1.0.',
    '**Interruptible.** Anything a person can reverse uses CSS transitions, which start from the current value. Keyframes only for one-shot events (a shake, a ring, an entrance that never reverses). Never block input while something moves.',
    '**Reduced motion.** Under `prefers-reduced-motion: reduce` every transition becomes 120 ms linear, keyframes play once in 1 ms, dialogs and menus stop scaling, shimmer and sparks stop; spinners keep turning. See [reduced motion](reduced-motion).',
    'Only `transform`, `opacity`, `filter` and `grid-template-rows` (for height) animate. Never `top`, `left`, `width` or `height` of things in the flow, except the few components that measure (text morph, confirm in place, toolbar labels).',
  ],
  a11y: [
    'Motion is never the only signal: every state change also changes words, an icon or a role/ARIA attribute.',
    'Never block input during a transition; a second click redirects, it is not ignored.',
    'No endless decorative loops. Loops that report work (spinner, shimmer, thinking) stop when the work stops.',
  ],
  do: [
    'Pick a recipe from this group and its tokens before writing any `transition`.',
    'Use transitions for state, keyframes only for one-shot events.',
    'Leave on `--ease-exit` in 180 ms; enter on a spring.',
  ],
  dont: [
    'Invent durations or bezier curves on a page.',
    'Bounce anything a tap opened, or fade-up every element on scroll.',
    'Animate layout properties or use `transition: all`.',
    'Make people wait for an animation before they can act.',
  ],
  js: 'Tokens are CSS custom properties; read them in JS with `getComputedStyle(document.documentElement).getPropertyValue(\'--d-smooth\')`. Behaviors in `js/lds.js` already use them and already check `prefers-reduced-motion`.',
  related: ['press-feedback', 'enter-and-exit', 'sliding-indicator', 'reduced-motion'],
};
