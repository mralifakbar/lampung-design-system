export default {
  title: 'Floating action',
  group: 'Actions',
  order: 3,
  summary: 'One round accent button that floats over the content of a phone screen for the action people come to that screen to do (new message, add expense). It is the only resting control that casts a shadow.',
  when: [
    'A phone screen whose main purpose is creating something in the list it shows: compose a message, log an expense, add a note.',
    'The list scrolls long enough that a button at its top or bottom would often be out of reach.',
  ],
  whenNot: [
    ['Wide screens and desktop layouts', 'button', 'Put a `btn--primary` in the page header instead; a floating disc in the corner of a 1400 px window is easy to miss.'],
    ['The screen has a primary action at the end of a form or flow', 'button', 'Use a full-width `btn--primary btn--block` in a sticky bar.'],
    ['Two or more equally important actions', 'button-group'],
    ['Actions that apply to selected items', 'selection-bar'],
    ['A small icon action in a toolbar or card', 'icon-button'],
  ],
  where: 'Bottom right of a phone screen, 16 to 20 px from the edges, above the tab bar (`bottom` = tab bar height + 16) and above the home indicator (`env(safe-area-inset-bottom)`). One per screen. It must not cover the last row: give the scrolling list bottom padding of at least the button height plus 32.',
  anatomy: [
    ['.icon-btn.icon-btn--accent', 'Required. Accent fill, white glyph, primary finish.'],
    ['aria-label', 'Required. The action ("New message").'],
    ['style', 'Size and placement are not in the system yet: set `width: 56px; height: 56px` and `position: absolute` (or `fixed`) with `right` and `bottom`, plus `box-shadow: var(--finish-primary), var(--shadow-md)`.'],
  ],
  examples: [
    {
      title: 'On a phone list',
      desc: 'Floats over the scrolling list, above the tab bar. Press it to feel the sink.',
      stage: 'phone',
      html: `<div class="docs-phone">
  <div class="docs-scroll" style="height: 100%; padding: 20px 16px 120px;">
    <h3 class="section__title-sm" style="margin-bottom: 12px;">Messages</h3>
    <div class="list list--fill">
      <div class="lrow"><span class="avatar" style="--size: 36px;">RK</span><span class="lrow__body"><span class="lrow__title" style="display: block;">Rina Kusuma</span><span class="lrow__sub" style="display: block;">Can the posyandu session move to 4?</span></span></div>
      <div class="lrow"><span class="avatar avatar--gray" style="--size: 36px;">PK</span><span class="lrow__body"><span class="lrow__title" style="display: block;">Puskesmas Kedaton</span><span class="lrow__sub" style="display: block;">The immunization room moved to the 2nd floor</span></span></div>
      <div class="lrow"><span class="avatar" style="--size: 36px;">AP</span><span class="lrow__body"><span class="lrow__title" style="display: block;">Adi Pratama</span><span class="lrow__sub" style="display: block;">Sent photos of the damaged road report</span></span></div>
    </div>
  </div>
  <button class="icon-btn icon-btn--accent" aria-label="New message" style="position: absolute; right: 20px; bottom: 28px; width: 56px; height: 56px; box-shadow: var(--finish-primary), var(--shadow-md);"><span class="ic" aria-hidden="true">edit</span></button>
</div>`,
      code: `<button class="icon-btn icon-btn--accent" aria-label="New message"
  style="position: fixed; right: 20px; bottom: calc(83px + 16px); width: 56px; height: 56px; box-shadow: var(--finish-primary), var(--shadow-md);">
  <span class="ic" aria-hidden="true">edit</span>
</button>`,
    },
  ],
  states: [
    ['hover', '`--accent-hover` on devices that can hover.'],
    [':active', 'Sinks to `scale(0.9)` in 90 ms, back on `--spring-snappy`.'],
    ['hidden while scrolling', 'Optional: hide on scroll down, show on scroll up. Not built in; if you add it, slide it 24 px down with an opacity fade on `--ease-exit` over `--d-exit`, and back on `--spring-smooth`.'],
  ],
  motion: [
    'Press: `scale(0.9)` with a 90 ms transition, release on `--spring-snappy` over `--d-snappy`, like every icon button.',
    'What it opens should grow from it: a [sheet](sheet) rising from the bottom on `--spring-smooth`, never a dialog popping in the middle.',
    'It does not pulse, bounce or rotate at rest. Under reduced motion only the press remains (as a 120 ms change).',
  ],
  a11y: [
    'A real `<button>` with `aria-label`; the glyph is `aria-hidden`.',
    'Place it in the DOM after the main content (or at the end of the screen region) so Tab reaches it after the list, matching where it sits.',
    'It must not hide content: keep bottom padding under the list so the last row can scroll above it.',
    'White on `--accent` holds 5.2:1 in both themes.',
  ],
  do: [
    'Use one per screen, for the most frequent creation action.',
    'Clear the tab bar and the home indicator.',
    'Open a sheet from it on phones.',
  ],
  dont: [
    'Use it on desktop layouts or inside cards.',
    'Add a speed-dial of several floating buttons.',
    'Give any other resting control a shadow to look like it.',
  ],
  related: ['icon-button', 'button', 'sheet', 'phone-bars'],
};
