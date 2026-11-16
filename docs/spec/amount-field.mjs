export default {
  title: 'Amount field',
  group: 'Inputs',
  order: 2,
  summary: 'A text field for money and other numbers with a unit: the currency or unit sits inside the control as text, the keyboard is numeric. Type the number, never the symbol.',
  when: [
    'People type an amount of money: a monthly fee, a payment, a scholarship amount, a price.',
    'A number has a unit that should stay visible while typing: %, kg, minutes, credits.',
    'The value can be any size, so buttons to count up would be too slow.',
  ],
  whenNot: [
    ['A small whole number changed by one or two (seats, tickets, people)', 'number-stepper'],
    ['A value on a known scale where the exact number matters less than the position (volume, difficulty)', 'slider'],
    ['A minimum and maximum (price range, credits per term)', 'range-slider'],
    ['Picking one of a few fixed amounts (Rp 50.000, Rp 100.000, Rp 200.000)', 'chips', 'Or [radio cards](radio-card) when each amount needs a line of detail'],
    ['Free text without a unit', 'text-field'],
  ],
  where: 'In a form like any [text field](text-field). Keep it as wide as the largest plausible value plus the unit, not full width on wide screens (about 240 px for rupiah amounts). In a `.form__row` it pairs well with a [select](select) for the period or currency.',
  anatomy: [
    ['.field / .field__label / .field__help', 'Required. The same field wrapper as a [text field](text-field). The helper states limits and rounding.'],
    ['.control', 'Required. The 44 px box.'],
    ['.control__suffix (first)', 'The currency or prefix ("Rp", "$"), before the input. Not part of the value.'],
    ['input[inputmode]', 'Required. `inputmode="numeric"` for whole amounts, `inputmode="decimal"` when cents or decimals are allowed. Keep `type="text"`.'],
    ['.control__suffix (last)', 'Optional unit or period after the input ("per month", "%", "kg").'],
  ],
  examples: [
    {
      title: 'Money with a currency and a period',
      desc: 'The number groups its thousands as you type; the prefix and the period stay outside the value.',
      html: `<div class="field" style="max-width: 320px;">
  <label class="field__label" for="af-fee">Monthly fee</label>
  <div class="control"><span class="control__suffix">Rp</span><input id="af-fee" inputmode="numeric" autocomplete="off" placeholder="0" value="350.000" aria-describedby="af-fee-help"
    oninput="const d = this.value.replace(/\\D/g, '').slice(0, 12); this.value = d ? Number(d).toLocaleString('id-ID') : '';"><span class="control__suffix">per month</span></div>
  <span class="field__help" id="af-fee-help">Rounded to the nearest thousand.</span>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="fee">Monthly fee</label>
  <div class="control">
    <span class="control__suffix">Rp</span>
    <input id="fee" inputmode="numeric" autocomplete="off" placeholder="0" aria-describedby="fee-help">
    <span class="control__suffix">per month</span>
  </div>
  <span class="field__help" id="fee-help">Rounded to the nearest thousand.</span>
</div>
<!-- Group digits on input in your own code, and parse the digits back before sending. -->`,
    },
    {
      title: 'Over the limit',
      desc: 'The error names the limit and the current balance, so the fix is obvious.',
      html: `<div class="field" style="max-width: 320px;">
  <label class="field__label" for="af-pay">Amount to withdraw</label>
  <div class="control is-invalid"><span class="control__suffix">Rp</span><input id="af-pay" inputmode="numeric" value="2.500.000" aria-invalid="true" aria-describedby="af-pay-help"></div>
  <span class="field__help field__help--error" id="af-pay-help"><span class="ic" aria-hidden="true">error</span>Your balance is Rp 1.840.000. Enter that amount or less.</span>
</div>`,
    },
    {
      title: 'Units other than money',
      desc: 'Percent and weight follow the same shape. Decimals use `inputmode="decimal"`.',
      html: `<div class="form__row" style="max-width: 520px;">
  <div class="field"><label class="field__label" for="af-disc">Discount</label><div class="control"><input id="af-disc" inputmode="decimal" value="12,5"><span class="control__suffix">%</span></div></div>
  <div class="field"><label class="field__label" for="af-time">Time per question</label><div class="control"><input id="af-time" inputmode="numeric" value="90"><span class="control__suffix">seconds</span></div></div>
</div>`,
    },
  ],
  states: [
    ['focus / hover / disabled / invalid', 'Exactly as the [text field](text-field): `.is-invalid` with `aria-invalid`, `.is-disabled` with `disabled`.'],
    ['empty', 'Show a `0` placeholder in the muted color; never prefill a real amount the person did not choose.'],
  ],
  motion: [
    'Same as the text field: border and halo transition in `--d-fast` (160 ms) on `--ease-standard`.',
    'Thousand separators appear as you type; keep the caret at the end and do not animate the digits inside an input. For an amount that changes outside the field (a total), use [rolling number](rolling-number).',
    'Reduced motion: transitions become 120 ms linear.',
  ],
  a11y: [
    'Keep `type="text"` with `inputmode`: `type="number"` drops grouping, changes the value on scroll and mouse wheel, and reads badly.',
    'The prefix and unit are visible text inside the label area; if they matter for meaning, include them in the label too ("Monthly fee in rupiah") or in `aria-describedby`.',
    'Say limits in the helper before the error ("Up to Rp 5.000.000"), linked with `aria-describedby`.',
    'Parse the digits on submit; screen readers read the grouped value naturally.',
  ],
  do: [
    'Group thousands in the locale of the page (`toLocaleString`), and parse digits back before sending.',
    'Put the period or unit after the number ("per month"), the currency before it.',
    'Right-size the field to the value; a fee field does not need the full page width.',
  ],
  dont: [
    'Use `type="number"` for money.',
    'Let people type the currency symbol into the value.',
    'Use a stepper for amounts that can be in the millions.',
  ],
  js: 'None in the system. Format on `input` in your own code (group digits, cap length) and parse the digits back on submit.',
  related: ['text-field', 'number-stepper', 'rolling-number', 'form-layout'],
};
