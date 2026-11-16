const flip = `onclick="this.setAttribute('aria-pressed', String(this.getAttribute('aria-pressed') !== 'true'))"`;
const pick = `onclick="this.parentNode.querySelectorAll('.toggle').forEach(b => { const on = b === this; b.setAttribute('aria-checked', String(on)); b.setAttribute('aria-pressed', String(on)); })"`;

export default {
  title: 'Toggle',
  group: 'Actions',
  order: 6,
  summary: 'A button that stays pressed to show a mode is on (bold, pin, mute). Alone it is a `.toggle`; several sit in a `.toggle-group`, either independent (bold, italic, underline) or one at a time (align left, center, right).',
  when: [
    'A formatting or view mode that is on or off and applies to what you are working on: bold, italic, show grid, pin a note.',
    'A compact toolbar of independent modes (a toggle group, several can be pressed).',
    'An icon-led choice of one among two to four in an editor toolbar (alignment), where a segmented control would be too wide.',
  ],
  whenNot: [
    ['A setting that persists and applies everywhere (notifications, dark mode)', 'switch', 'Switches live in settings lists with a label; toggles live in toolbars.'],
    ['Choosing which view of content to show (list or grid, week or month)', 'segmented-control', 'It has a sliding thumb and text labels; use it for views.'],
    ['Picking filters from a set of words', 'chips'],
    ['A one-off action that does not stay on', 'icon-button'],
    ['Liking or bookmarking with a celebratory response', 'like'],
  ],
  where: 'In toolbars above the thing it changes: an editor, a canvas, a media player, a list header. On phones keep toggle groups to four buttons or fewer; they do not wrap.',
  anatomy: [
    ['.toggle', 'Required. A `<button type="button">` with `aria-pressed`. 36 px tall alone, 30 px inside a group. Icon, text or both.'],
    ['aria-pressed="true|false"', 'Required. Drives the look: pressed is `--accent-tint` with `--accent-text`, and the icon switches to the fill style.'],
    ['.toggle-group', 'Wraps two or more toggles in one outlined box, 36 px tall. `role="group"` (independent) or `role="radiogroup"` (one at a time) with an `aria-label`.'],
    ['aria-label', 'Required on icon-only toggles ("Bold").'],
  ],
  examples: [
    {
      title: 'Alone',
      desc: 'Press to pin and unpin. The icon fills when on.',
      html: `<div class="docs-row">
  <button type="button" class="toggle" aria-pressed="true" ${flip}><span class="ic" aria-hidden="true">keep</span>Pinned</button>
  <button type="button" class="toggle" aria-pressed="false" aria-label="Show grid" ${flip}><span class="ic" aria-hidden="true">grid_view</span></button>
</div>`,
      code: `<button type="button" class="toggle" aria-pressed="true"><span class="ic" aria-hidden="true">keep</span>Pinned</button>
<button type="button" class="toggle" aria-pressed="false" aria-label="Show grid"><span class="ic" aria-hidden="true">grid_view</span></button>`,
    },
    {
      title: 'Independent group',
      desc: 'Text style: any combination can be on.',
      html: `<div class="toggle-group" role="group" aria-label="Text style">
  <button type="button" class="toggle" aria-pressed="true" aria-label="Bold" ${flip}><span class="ic" aria-hidden="true">format_bold</span></button>
  <button type="button" class="toggle" aria-pressed="false" aria-label="Italic" ${flip}><span class="ic" aria-hidden="true">format_italic</span></button>
  <button type="button" class="toggle" aria-pressed="false" aria-label="Underline" ${flip}><span class="ic" aria-hidden="true">format_underlined</span></button>
</div>`,
      code: `<div class="toggle-group" role="group" aria-label="Text style">
  <button type="button" class="toggle" aria-pressed="true" aria-label="Bold"><span class="ic" aria-hidden="true">format_bold</span></button>
  <button type="button" class="toggle" aria-pressed="false" aria-label="Italic"><span class="ic" aria-hidden="true">format_italic</span></button>
  <button type="button" class="toggle" aria-pressed="false" aria-label="Underline"><span class="ic" aria-hidden="true">format_underlined</span></button>
</div>`,
    },
    {
      title: 'One at a time',
      desc: 'Alignment: exactly one is on. Each button is a radio for assistive tech; `aria-pressed` mirrors `aria-checked` because the style reads `aria-pressed`.',
      html: `<div class="toggle-group" role="radiogroup" aria-label="Alignment">
  <button type="button" class="toggle" role="radio" aria-checked="true" aria-pressed="true" aria-label="Align left" ${pick}><span class="ic" aria-hidden="true">format_align_left</span></button>
  <button type="button" class="toggle" role="radio" aria-checked="false" aria-pressed="false" aria-label="Align center" ${pick}><span class="ic" aria-hidden="true">format_align_center</span></button>
  <button type="button" class="toggle" role="radio" aria-checked="false" aria-pressed="false" aria-label="Align right" ${pick}><span class="ic" aria-hidden="true">format_align_right</span></button>
</div>`,
      code: `<div class="toggle-group" role="radiogroup" aria-label="Alignment">
  <button type="button" class="toggle" role="radio" aria-checked="true" aria-pressed="true" aria-label="Align left"><span class="ic" aria-hidden="true">format_align_left</span></button>
  <button type="button" class="toggle" role="radio" aria-checked="false" aria-pressed="false" aria-label="Align center"><span class="ic" aria-hidden="true">format_align_center</span></button>
  <button type="button" class="toggle" role="radio" aria-checked="false" aria-pressed="false" aria-label="Align right"><span class="ic" aria-hidden="true">format_align_right</span></button>
</div>`,
    },
  ],
  variants: [
    ['.toggle', 'Alone: 36 px tall, 10 px radius.'],
    ['.toggle-group .toggle', 'In a group: 30 px tall inside 3 px of padding (36 px total, the height of a medium button), 8 px radius.'],
  ],
  states: [
    ['aria-pressed="true"', '`--accent-tint` fill, `--accent-text` color, fill-style icon.'],
    ['hover', '`--bg-tint` and `--text-strong` when not pressed.'],
    [':active', 'Sinks to `scale(0.94)` in 90 ms, back on `--spring-snappy`.'],
    ['disabled', '`disabled`; the browser default dimming applies, so explain why nearby.'],
  ],
  motion: [
    'Press: `scale(0.94)` with a 90 ms duration, release on `--spring-snappy` over `--d-snappy`.',
    'Pressed fill and color change over `--d-fast` on `--ease-standard`; the icon swaps to the fill font at once. There is no sliding indicator (that is the [segmented control](segmented-control)).',
    'Under reduced motion the scale is a 120 ms change.',
  ],
  a11y: [
    'A `<button type="button">` with `aria-pressed`. Its name stays the same when pressed ("Bold"), never "Bold on".',
    'Independent group: `role="group"` + `aria-label`; each toggle is reached with Tab.',
    'One-at-a-time group: `role="radiogroup"` + `aria-label`, buttons `role="radio"` with `aria-checked`. Arrow keys should move the choice; this is not built in, so wire it yourself or use a [segmented control](segmented-control), which has it.',
    'Icon-only toggles need an `aria-label` and should get a [tooltip](tooltip), ideally with the shortcut in a `.kbd`.',
  ],
  do: [
    'Use toggles for modes in toolbars; use switches for settings.',
    'Keep the label the same in both states; the pressed look carries the state.',
    'Offer keyboard shortcuts for formatting toggles and show them in the tooltip.',
  ],
  dont: [
    'Change the label to "On" or "Off".',
    'Use a toggle group as page tabs or as a view switcher.',
    'Mix toggles and plain action buttons inside one `toggle-group`.',
  ],
  js: 'None in `lds.js`: set `aria-pressed` (and `aria-checked` for radios) from your click handler or framework state.',
  related: ['switch', 'segmented-control', 'button-group', 'icon-button'],
};
