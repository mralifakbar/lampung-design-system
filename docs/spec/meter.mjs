export default {
  title: 'Meter',
  group: 'Feedback',
  order: 5,
  summary: 'A segmented gauge for a level within a known range: storage used, seats taken, password strength. It shows how full, not how far along.',
  when: [
    'A quantity against a limit: storage used, seats taken in a class, questions flagged out of an allowance.',
    'A strength or quality level in a few steps, such as password strength (four segments).',
    'A level that turns into a warning near the limit (`.is-warn`) and a problem at it (`.is-full`).',
  ],
  whenNot: [
    ['A task that advances to completion', 'progress-bar'],
    ['A single score in a compact square', 'progress-ring'],
    ['Shares of a whole across categories', 'percentage-bar'],
    ['The person rates something', 'rating'],
    ['A grid of activity over days', 'heatmap'],
  ],
  where: 'Under a label that names the quantity, with the value in words (`.progress-meta` works as the header). In settings rows, under a password field, in a plan or storage card. Full width of its container; 160 to 320 px reads best.',
  anatomy: [
    ['.meter-seg', 'Required. A grid of ten equal segments with 3 px gaps. Override `grid-template-columns` inline for another count (four for password strength).'],
    ['i', 'Required. One per segment, 8 px tall.'],
    ['i.on', 'A filled segment (accent).'],
    ['.is-warn / .is-full', 'On `.meter-seg`: filled segments turn warning, then danger.'],
    ['.progress-meta', 'Recommended header: the label and the value in words.'],
  ],
  examples: [
    {
      title: 'Storage near the limit',
      desc: 'Seven of ten filled is normal; at nine the meter warns and the help text says what to do.',
      stage: 'block',
      html: `<div class="docs-col" style="max-width: 320px;">
  <div>
    <div class="progress-meta"><span id="m1">Storage</span><b>6.2 of 10 GB</b></div>
    <div class="meter-seg" role="meter" aria-labelledby="m1" aria-valuemin="0" aria-valuemax="10" aria-valuenow="6.2" aria-valuetext="6.2 of 10 GB used"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></div>
  </div>
  <div>
    <div class="progress-meta"><span id="m2">Storage</span><b>9.1 of 10 GB</b></div>
    <div class="meter-seg is-warn" role="meter" aria-labelledby="m2" aria-valuemin="0" aria-valuemax="10" aria-valuenow="9.1" aria-valuetext="9.1 of 10 GB used, almost full"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i></i></div>
    <span class="field__help">Almost full. Remove old recordings to keep uploading.</span>
  </div>
</div>`,
    },
    {
      title: 'Seats taken',
      desc: 'Full turns the segments to danger; the word "Full" goes next to it.',
      stage: 'block',
      html: `<div style="max-width: 320px; width: 100%;">
  <div class="progress-meta"><span id="m3">Seats taken</span><b>40 of 40, full</b></div>
  <div class="meter-seg is-full" role="meter" aria-labelledby="m3" aria-valuemin="0" aria-valuemax="40" aria-valuenow="40" aria-valuetext="40 of 40 seats, full"><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i><i class="on"></i></div>
</div>`,
    },
    {
      title: 'Password strength in four steps',
      desc: 'Set four columns inline. Pair the segments with a word: weak, fair, good, strong. Type to try.',
      stage: 'block',
      html: `<div class="field" style="max-width: 320px; width: 100%;">
  <label class="field__label" for="pw-demo">New password</label>
  <div class="control"><input id="pw-demo" type="password" autocomplete="new-password" aria-describedby="pw-word" oninput="const n = Math.min(4, Math.floor(this.value.length / 3)); const m = document.getElementById('pw-m'); [...m.children].forEach((x, i) => x.classList.toggle('on', i < n)); m.classList.toggle('is-warn', n > 0 && n < 3); document.getElementById('pw-word').textContent = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][n];"></div>
  <div class="meter-seg" id="pw-m" style="grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 8px;" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
  <span class="field__help" id="pw-word">Too short</span>
</div>`,
      code: `<div class="meter-seg is-warn" style="grid-template-columns: repeat(4, minmax(0, 1fr));" aria-hidden="true">
  <i class="on"></i><i class="on"></i><i></i><i></i>
</div>
<span class="field__help" id="pw-word">Fair</span>`,
    },
  ],
  variants: [
    ['meter-seg', 'Ten segments, accent fill.'],
    ['meter-seg.is-warn', 'Near the limit: filled segments turn to the warning color.'],
    ['meter-seg.is-full', 'At or over the limit: danger color.'],
    ['grid-template-columns (inline)', 'Another segment count, such as four for strength.'],
  ],
  states: [
    ['level', 'Add `.on` to the first n segments (round to the nearest segment).'],
    ['warning', '`.is-warn` from about 80 % or a weak strength.'],
    ['full', '`.is-full` at the limit, with the word "Full".'],
  ],
  motion: [
    'Each segment fades its color over `--d-standard` (240 ms) on `--ease-standard`. No sweeping and no bounce: the meter is a reading, not an event.',
    'Several segments changing at once change together; do not stagger them.',
    'Reduced motion: the color change becomes 120 ms linear.',
  ],
  a11y: [
    'Give the meter `role="meter"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` and a name (`aria-labelledby` the label).',
    'When the words beside it already say everything (password strength), mark the segments `aria-hidden="true"` and connect the word to the input with `aria-describedby`.',
    'Warning and full must also be said in words; color alone fails for many people.',
  ],
  do: [
    'Write the value next to it ("6.2 of 10 GB").',
    'Say what to do when it warns.',
    'Keep ten segments for capacity and four or five for strength.',
  ],
  dont: [
    'Use a meter for a task in progress.',
    'Fill segments with a gradient or different colors per segment.',
    'Show more than twelve segments; switch to a [progress bar](progress-bar) look or a number.',
  ],
  js: 'None. Toggle `.on` on the segments and `.is-warn` / `.is-full` on the meter from your code.',
  related: ['progress-bar', 'progress-ring', 'percentage-bar', 'password-field'],
};
