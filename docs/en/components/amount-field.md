# Amount field

Group: Inputs. https://lampung.kartadinata.app/docs/en/components/amount-field

A text field for money and other numbers with a unit: the currency or unit sits inside the control as text, the keyboard is numeric. Type the number, never the symbol.

## Use it when
- People type an amount of money: a monthly fee, a payment, an aid amount, a price.
- A number has a unit that should stay visible while typing: %, kg, minutes, days.
- The value can be any size, so buttons to count up would be too slow.

## Use something else when
- A small whole number changed by one or two (seats, tickets, people): use [Number stepper](number-stepper.md).
- A value on a known scale where the exact number matters less than the position (volume, difficulty): use [Slider](slider.md).
- A minimum and maximum (price range, age range): use [Range slider](range-slider.md).
- Picking one of a few fixed amounts (Rp 50.000, Rp 100.000, Rp 200.000): use [Chips](chips.md). Or [radio cards](radio-card.md) when each amount needs a line of detail.
- Free text without a unit: use [Text field](text-field.md).

## Where it goes
In a form like any [text field](text-field.md). Keep it as wide as the largest plausible value plus the unit, not full width on wide screens (about 240 px for rupiah amounts). In a `.form__row` it pairs well with a [select](select.md) for the period or currency.

## Anatomy
| Part | What it is |
|---|---|
| `.field / .field__label / .field__help` | Required. The same field wrapper as a [text field](text-field.md). The helper states limits and rounding. |
| `.control` | Required. The 44 px box. |
| `.control__suffix (first)` | The currency or prefix ("Rp", "$"), before the input. Not part of the value. |
| `input[inputmode]` | Required. `inputmode="numeric"` for whole amounts, `inputmode="decimal"` when cents or decimals are allowed. Keep `type="text"`. |
| `.control__suffix (last)` | Optional unit or period after the input ("per month", "%", "kg"). |

## Markup

**Money with a currency and a period.** The number groups its thousands as you type; the prefix and the period stay outside the value.
```html
<div class="field">
  <label class="field__label" for="fee">Monthly fee</label>
  <div class="control">
    <span class="control__suffix">Rp</span>
    <input id="fee" inputmode="numeric" autocomplete="off" placeholder="0" aria-describedby="fee-help">
    <span class="control__suffix">per month</span>
  </div>
  <span class="field__help" id="fee-help">Rounded to the nearest thousand.</span>
</div>
<!-- Group digits on input in your own code, and parse the digits back before sending. -->
```

**Over the limit.** The error names the limit and the current balance, so the fix is obvious.
```html
<div class="field" style="max-width: 320px;">
  <label class="field__label" for="af-pay">Amount to disburse</label>
  <div class="control is-invalid"><span class="control__suffix">Rp</span><input id="af-pay" inputmode="numeric" value="2.500.000" aria-invalid="true" aria-describedby="af-pay-help"></div>
  <span class="field__help field__help--error" id="af-pay-help"><span class="ic" aria-hidden="true">error</span>Your balance is Rp 1.840.000. Enter that amount or less.</span>
</div>
```

**Units other than money.** Percent and weight follow the same shape. Decimals use `inputmode="decimal"`.
```html
<div class="form__row" style="max-width: 520px;">
  <div class="field"><label class="field__label" for="af-disc">Fee relief</label><div class="control"><input id="af-disc" inputmode="decimal" value="12,5"><span class="control__suffix">%</span></div></div>
  <div class="field"><label class="field__label" for="af-time">Service time per resident</label><div class="control"><input id="af-time" inputmode="numeric" value="90"><span class="control__suffix">seconds</span></div></div>
</div>
```

## States
| State | How |
|---|---|
| `focus / hover / disabled / invalid` | Exactly as the [text field](text-field.md): `.is-invalid` with `aria-invalid`, `.is-disabled` with `disabled`. |
| `empty` | Show a `0` placeholder in the muted color; never prefill a real amount the person did not choose. |

## Motion and microinteractions
- Same as the text field: border and halo transition in `--d-fast` (160 ms) on `--ease-standard`.
- Thousand separators appear as you type; keep the caret at the end and do not animate the digits inside an input. For an amount that changes outside the field (a total), use [rolling number](rolling-number.md).
- Reduced motion: transitions become 120 ms linear.

## Accessibility
- Keep `type="text"` with `inputmode`: `type="number"` drops grouping, changes the value on scroll and mouse wheel, and reads badly.
- The prefix and unit are visible text inside the label area; if they matter for meaning, include them in the label too ("Monthly fee in rupiah") or in `aria-describedby`.
- Say limits in the helper before the error ("Up to Rp 5.000.000"), linked with `aria-describedby`.
- Parse the digits on submit; screen readers read the grouped value naturally.

## Do
- Group thousands in the locale of the page (`toLocaleString`), and parse digits back before sending.
- Put the period or unit after the number ("per month"), the currency before it.
- Right-size the field to the value; a fee field does not need the full page width.

## Don't
- Use `type="number"` for money.
- Let people type the currency symbol into the value.
- Use a stepper for amounts that can be in the millions.

## Behavior (plain HTML)
None in the system. Format on `input` in your own code (group digits, cap length) and parse the digits back on submit.

## Related
[Text field](text-field.md) · [Number stepper](number-stepper.md) · [Rolling number](rolling-number.md) · [Form layout](form-layout.md)
