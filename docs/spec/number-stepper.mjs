export default {
  title: 'Number stepper',
  group: 'Inputs',
  order: 6,
  summary: 'Minus and plus buttons around a small whole number whose digits roll to the new value. For counts people change by one or two, inside a known range.',
  when: [
    'A small count with clear bounds: seats to reserve, tickets, people in a group, queue numbers.',
    'Most changes are one or two steps from a sensible default.',
  ],
  whenNot: [
    ['Any amount of money, or values that can be large', 'amount-field'],
    ['A position on a scale (volume, difficulty)', 'slider'],
    ['Choosing between a few fixed counts (1, 2, 3 sessions a week)', 'segmented-control', 'Or [chips](chips) for more than five'],
    ['Showing a number that changes by itself (live score, count)', 'rolling-number'],
  ],
  where: 'In a form next to its label, or at the end of a list row (a request line, an attendee row). It keeps its own width (about 140 px) and never stretches.',
  anatomy: [
    ['.stepper-field', 'Required. 44 px pill-shaped box, `role="group"` with `aria-labelledby` pointing at the label. Carries `data-lds-stepper` with `data-min`, `data-max`, `data-value`.'],
    ['button (first)', 'Required. Decrease, with an `aria-label` ("Fewer seats") and a `remove` icon. 44 by 44.'],
    ['.stepper-field__value > .roll', 'Required. The number, as rolling digits, in an `aria-live="polite"` span.'],
    ['button (last)', 'Required. Increase, with an `aria-label` ("More seats") and an `add` icon.'],
  ],
  examples: [
    {
      title: 'Seats to reserve',
      desc: 'Digits roll to the new value; the minus disables at the minimum and the plus at the maximum. Press quickly to watch the columns travel.',
      html: `<div class="field" style="max-width: 320px;">
  <span class="field__label" id="ns-seat">Seats to reserve</span>
  <div class="stepper-field" role="group" aria-labelledby="ns-seat" data-lds-stepper data-min="1" data-max="40" data-value="12">
    <button type="button" aria-label="Fewer seats"><span class="ic" aria-hidden="true">remove</span></button>
    <span class="stepper-field__value"><span class="roll" aria-live="polite"></span></span>
    <button type="button" aria-label="More seats"><span class="ic" aria-hidden="true">add</span></button>
  </div>
  <span class="field__help">1 to 40 seats per booking.</span>
</div>`,
    },
    {
      title: 'At the end of a list row',
      desc: 'A small count per line, such as attendees per session.',
      html: `<div class="list" style="max-width: 440px; width: 100%;">
  <div class="lrow"><span class="lrow__body"><span class="lrow__title" id="ns-r1">Saturday UMKM workshop, room A</span></span>
    <div class="stepper-field" role="group" aria-labelledby="ns-r1" data-lds-stepper data-min="0" data-max="6" data-value="2">
      <button type="button" aria-label="One person fewer"><span class="ic" aria-hidden="true">remove</span></button>
      <span class="stepper-field__value"><span class="roll" aria-live="polite"></span></span>
      <button type="button" aria-label="One person more"><span class="ic" aria-hidden="true">add</span></button>
    </div>
  </div>
</div>`,
    },
  ],
  states: [
    ['at min / max', 'The matching button gets `disabled` (faint, no pointer events), set by the JS.'],
    ['hover / active', 'Buttons tint on hover and sink to 0.88 on press, springing back on `--spring-snappy`.'],
  ],
  motion: [
    'Each digit is a column of 0 to 9 that slides to its value with `transform` on `--spring-smooth` (560 ms). A press during travel retargets from where it is, so fast tapping never queues.',
    'Buttons: `scale(0.88)` on `:active`, back on `--spring-snappy` (360 ms); background tint in `--d-fast`.',
    'Reduced motion: the digits move in 120 ms linear, which reads as a change of number without travel.',
  ],
  a11y: [
    'The wrapper is `role="group"` labelled by the visible label; each button has its own `aria-label` that names the unit.',
    'The value span is `aria-live="polite"` and `setRoll` sets its `aria-label` to the number, so each change is read once.',
    'Give both buttons `type="button"`: inside a `<form>` a bare `<button>` submits it.',
    'There is no hidden input: when the value is part of a form, mirror it into `<input type="hidden">` on `lds:change`.',
  ],
  do: [
    'Start at the most common value and keep the range tight.',
    'Name the unit in the button labels ("More seats").',
  ],
  dont: [
    'Use a stepper for values above about 50, or for money.',
    'Write your own minus/plus pair with a plain number; the rolling digits are the component.',
  ],
  js: '`data-lds-stepper` with `data-min` (default 0), `data-max` (default 99) and `data-value`: the first and last buttons step by one, the `.roll` updates through `setRoll`, buttons disable at the bounds, and `lds:change` fires with `{ value }`. `setRoll(el, n)` rolls any `.roll` to a number.',
  related: ['amount-field', 'rolling-number', 'slider', 'number-count'],
};
