export default {
  title: 'Slider',
  group: 'Selection',
  order: 6,
  summary: 'A native range input with the system skin: a 4 px track filled in the accent up to a 28 px thumb. For a value on a continuous scale where the position matters more than the exact number.',
  when: [
    'Setting a level on a scale: volume, text size, playback speed, difficulty.',
    'Feedback while dragging matters more than typing an exact value (the result previews live).',
    'A bounded number where the exact value is shown next to it (`.slider-value`).',
  ],
  whenNot: [
    ['A minimum and a maximum together', 'range-slider'],
    ['An exact number people type (an amount, a score)', 'amount-field'],
    ['A small count changed by one (seats)', 'number-stepper'],
    ['A few named levels (Easy, Medium, Hard)', 'segmented-control'],
    ['Showing progress or a score, not setting one', 'progress-bar', 'Or a [meter](meter) for a level against a limit'],
    ['Rating something out of five', 'rating'],
  ],
  where: 'In settings and filter panels, full width of its column with the end icons or the value beside it (`.slider-row`). On phones give it the full width; the thumb is a 28 px target in a 28 px tall input with room above and below.',
  anatomy: [
    ['.slider-row', 'Optional row: an icon or label at each end and the slider between, 14 px apart.'],
    ['input.slider[type=range]', 'Required. Native range with `min`, `max`, `step`, `value` and a name (`aria-label` or a `<label>`). The JS keeps `--pct` in sync for the fill.'],
    ['.slider-value', 'Optional. The current value at the end, tabular numbers, right-aligned. Use an `<output>`.'],
  ],
  examples: [
    {
      title: 'Volume with end icons',
      desc: 'Drag, click the track, or use the arrow keys, Page Up, Page Down, Home and End.',
      html: `<div class="slider-row" style="max-width: 420px; width: 100%;"><span class="ic" aria-hidden="true">volume_mute</span><input class="slider" type="range" min="0" max="100" value="64" aria-label="Volume"><span class="ic" aria-hidden="true">volume_up</span></div>`,
    },
    {
      title: 'With the value shown',
      desc: 'An exact readout when the number matters. The value updates as you drag.',
      html: `<div class="field" style="max-width: 420px; width: 100%;">
  <label class="field__label" for="sl-speed">Speed of the queue announcement voice</label>
  <div class="slider-row"><input class="slider" id="sl-speed" type="range" min="0.5" max="2" step="0.25" value="1" oninput="document.getElementById('sl-speed-out').textContent = this.value + 'x'"><output class="slider-value" id="sl-speed-out" for="sl-speed">1x</output></div>
</div>`,
    },
  ],
  states: [
    ['dragging (:active)', 'The thumb grows to 1.1 (WebKit and Blink).'],
    ['focus-visible', 'A 2 px focus ring around the thumb with a 3 px gap (WebKit and Blink).'],
    ['disabled', 'Native `disabled`; dim the row and say why nearby.'],
  ],
  motion: [
    'The thumb follows the pointer 1:1; the fill is a gradient stop at `--pct`, updated on every `input` event, so it never lags.',
    'Press: the thumb scales to 1.1 on `--spring-snappy` (360 ms) and back on release.',
    'Values that preview live (volume, text size) should apply on `input`; expensive ones (a search filter) on `change`.',
    'Reduced motion: the press scale becomes a 120 ms linear change.',
  ],
  a11y: [
    'A native `<input type="range">`: arrow keys step, Page Up and Page Down jump, Home and End go to the ends; screen readers announce the value.',
    'Name it with a `<label for>` or `aria-label`. When the number alone is unclear, set `aria-valuetext` ("1.25 times speed").',
    'End icons are decorative (`aria-hidden`); the `<output for>` shows the value visibly.',
    'Firefox does not show a focus ring on this slider: the system removes the outline and styles the focus ring only on the WebKit thumb. Check keyboard focus there.',
  ],
  do: [
    'Show the value when people need the exact number.',
    'Choose a `step` that matches what people can tell apart.',
  ],
  dont: [
    'Use a slider for values people must hit exactly; give them a field.',
    'Restyle the track or thumb; the skin is part of the system.',
  ],
  js: 'Automatic for every `input.slider`: keeps the `--pct` fill in sync on `input` (Firefox uses its own `::-moz-range-progress`). Update `.slider-value` yourself.',
  related: ['range-slider', 'number-stepper', 'segmented-control', 'meter'],
};
