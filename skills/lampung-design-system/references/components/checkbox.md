# Checkbox

Group: Selection. Docs page: `docs/components/checkbox.html`.

A native checkbox with a drawn tick, for independent yes or no choices that are saved with a form. Several can be on at once; each label says what turning it on means.

## Use it when
- Several independent options in a form, any number of which can be on: which notifications to receive, which documents to attach.
- One agreement before submitting: "I have read the service terms".
- Selecting rows in a list or table to act on them together (with a "select all" that can be mixed).

## Use something else when
- A setting that takes effect immediately, with no Save button: use [Switch](switch.md).
- Exactly one of a few options: use [Radio](radio.md).
- Filters that apply as they are tapped, shown as a row: use [Chips](chips.md).
- Options that need a description, a price or an icon each: use [Radio card](radio-card.md). For one choice; for several, checkboxes with a `small` second line.
- Marking a task done in a checklist that is not a form: use [List](list.md). Checked rows (`.lrow--check`) show what is done.

## Where it goes
In a [form](form-layout.md), stacked in a column 12 px apart, inside a `<fieldset>` with a `<legend>` when they belong to one question. In list and table rows, at the start of the row. Never in a horizontal row of more than two on phones.

## Anatomy
| Part | What it is |
|---|---|
| `label.check` | Required. The whole row is the hit area; text wraps beside the box. |
| `input[type=checkbox]` | Required. The native input, invisible over the box, so keyboard, forms and screen readers work as usual. |
| `.check__box` | Required. The 22 px box with an SVG: `path.tick` for checked, `path.dash` for mixed. `aria-hidden`. |
| `.check__text` | Required. The label text; a `small` inside adds a quiet second line. |
| `fieldset + legend` | Groups related checkboxes under one question. |

## Markup

**Notification choices.** The tick draws in after a short delay; unticking erases it faster. The second line explains the consequence.
```html
<fieldset class="stack" style="border: 0;">
  <legend class="field__label" style="margin-bottom: 12px;">Email me when</legend>
  <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span><span class="check__text">My application status changes<small>As soon as an officer updates it</small></span></label>
  <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span><span class="check__text">A deadline is 24 hours away</span></label>
  <label class="check"><input type="checkbox"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span><span class="check__text">Someone replies to my report<small>At most one email a day</small></span></label>
</fieldset>
```

**Select all, with a mixed state.** When some but not all are on, the parent shows a dash and reports "mixed". Toggle the children to see it.
```html
<label class="check is-mixed">
  <input type="checkbox" id="all-documents">
  <span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span>
  <span class="check__text">All documents</span>
</label>
<script>document.getElementById('all-documents').indeterminate = true;</script>
```

**Agreement and disabled.** A single checkbox before an important submit. A disabled option says why in its second line.
```html
<div class="stack">
  <label class="check"><input type="checkbox"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span><span class="check__text">I have read the service terms<small>The data I send must match the original documents</small></span></label>
  <label class="check"><input type="checkbox" disabled><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span><span class="check__text">Fill in from my previous application<small>Available once one of your applications is complete</small></span></label>
</div>
```

## States
| State | How |
|---|---|
| `checked` | Accent fill with the primary finish; the tick draws in. |
| `.is-mixed (on .check) + input.indeterminate` | Accent fill with a dash. Set `indeterminate = true` on the input in JS so it is announced as mixed. |
| `hover` | The box edge darkens to `--text-subtle`. |
| `:active` | The box sinks to 0.88 in 90 ms. |
| `focus-visible` | Focus ring on the box, from the input. |
| `disabled` | The box at 40 % opacity; say why in the `small` line. |

## Motion and microinteractions
- Tick: `stroke-dashoffset` 20 to 0 in 260 ms on `--ease-enter`, after a 40 ms delay so the fill lands first. Unticking erases it in 160 ms on `--ease-exit`; leaving is faster than arriving.
- Fill and edge: `background-color` and `box-shadow` in `--d-fast` (160 ms) on `--ease-standard`.
- Press: `scale(0.88)` in 90 ms, back on `--spring-snappy` (360 ms). Feedback starts on pointer down.
- Mixed: the dash draws in 200 ms on `--ease-enter`.
- Reduced motion: transitions become 120 ms linear; the tick still appears.

## Accessibility
- A real `<input type="checkbox">` inside the `<label>`: Space toggles, the label is the name, forms submit it.
- Group with `<fieldset>` and `<legend>` so the question is read with each option.
- Mixed state: set `input.indeterminate = true` (there is no HTML attribute); `.is-mixed` alone is only visual.
- Keep the label text on the label; the second line in `small` is read as part of it.

## Do
- Phrase each label as the thing that will be true when it is on.
- Start unchecked unless the person chose before; never pre-tick consent.

## Don't
- Use a checkbox for an instant setting; use a [switch](switch.md).
- Use a single checkbox as an on and off toggle between two named states ("Light or dark"); use a [segmented control](segmented-control.md).
- Draw a custom box or icon tick; use `.check__box` with its SVG.

## Related
[Radio](radio.md) · [Switch](switch.md) · [Chips](chips.md) · [List](list.md)
