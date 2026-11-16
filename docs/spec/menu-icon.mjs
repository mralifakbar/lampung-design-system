const TOGGLE = "const open = this.getAttribute('aria-expanded') !== 'true'; this.setAttribute('aria-expanded', String(open)); document.getElementById(this.getAttribute('aria-controls')).classList.toggle('is-closed', !open);";

export default {
  title: 'Menu icon',
  group: 'Microinteractions',
  order: 7,
  summary: 'Three bars that fold into a close icon when their button opens a menu, and unfold when it closes: the top and bottom bars meet and turn 45 degrees, the middle one shrinks away. The button stays in place, so the same spot opens and closes.',
  when: [
    'The button that opens and closes site navigation on small screens: the [top nav](top-nav) toggle, the [app shell](app-shell) drawer toggle.',
    'Any button that opens a panel of navigation and also closes it from the same spot.',
  ],
  whenNot: [
    ['A menu of actions on an item', 'dropdown-menu', 'Use `more_horiz` or `more_vert`; it does not turn into a close icon.'],
    ['Closing a dialog or sheet', 'icon-button', 'A plain `close` icon.'],
    ['Two icons for two states (play, pause)', 'icon-swap'],
    ['Opening a section in the page', 'height-expand'],
  ],
  where: 'The leading edge of a top bar on phones (app shell), or the trailing edge of a site header (top nav). Always inside an [icon button](icon-button) that carries `aria-expanded`.',
  anatomy: [
    ['.burger', 'Required. 18 × 14 px, three `<i>` bars of 2 px. Must be a direct child of the element with `aria-expanded`.'],
    ['[aria-expanded="true"] > .burger', 'The folded state: bars 1 and 3 meet at the middle and rotate ±45 degrees; bar 2 fades and shrinks.'],
  ],
  examples: [
    {
      title: 'Open and close the navigation',
      desc: 'Press the button: the bars fold into a close icon while the links open below. Press again to fold back.',
      stage: 'block',
      html: `<div style="max-width: 360px;">
  <div class="docs-row" style="justify-content: space-between;">
    <span class="card__title">Campus</span>
    <button class="icon-btn" aria-label="Menu" aria-expanded="false" aria-controls="mi-nav" onclick="${TOGGLE}"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
  </div>
  <div class="collapse is-closed" id="mi-nav"><div><nav class="list list--fill" aria-label="Main" style="margin-top: 8px;">
    <a class="lrow" href="#" aria-current="page"><span class="lrow__body"><span class="lrow__title">Home</span></span></a>
    <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Courses</span></span></a>
    <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Schedule</span></span></a>
  </nav></div></div>
</div>`,
    },
    {
      title: 'With a label',
      desc: 'Where there is room, a word next to the icon helps. The fold still lives on the button that has `aria-expanded`.',
      html: `<button class="btn btn--gray btn--md" aria-expanded="false" onclick="this.setAttribute('aria-expanded', String(this.getAttribute('aria-expanded') !== 'true'))"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>Menu</button>`,
    },
  ],
  motion: [
    'Bars 1 and 3: `top` moves to 6 px and `transform` rotates ±45 degrees on `--spring-snappy` (`--d-snappy`, 360 ms), at the same time, so they cross in one motion.',
    'Bar 2: fades over `--d-fast` and shrinks to `scaleX(0.2)` on `--spring-snappy`.',
    'It is driven only by `aria-expanded`, so closing by Escape, a scrim tap or a followed link folds it back too, as long as the code updates the attribute (the app shell and top nav do).',
    'Interruption: transitions, so a fast double press reverses mid-fold.',
    'Reduced motion: the bars change in 120 ms with no spring.',
  ],
  a11y: [
    'The button has `aria-expanded`, `aria-controls` and a stable `aria-label` ("Menu"); do not change the label to "Close" since the expanded state already says it.',
    'Escape closes the menu and returns focus to this button.',
    'The bars are `aria-hidden`.',
  ],
  do: [
    'Put `.burger` directly inside the button that has `aria-expanded`.',
    'Update `aria-expanded` on every way the menu closes.',
  ],
  dont: [
    'Use it for item actions or for closing dialogs.',
    'Swap two icons instead of folding the bars.',
    'Move the button when the menu opens.',
  ],
  js: 'CSS only, driven by `aria-expanded`. `data-lds-shell-toggle` (app shell) and `data-lds-topnav-toggle` (top nav) keep `aria-expanded` in sync for you.',
  related: ['top-nav', 'app-shell', 'icon-button', 'icon-swap'],
};
