# Rolling number

Group: Data display. Docs page: `docs/components/rolling-number.html`.

A number whose digits each slide to their new value on the smooth spring, like an odometer. For a count that changes while the person watches.

## Use it when
- A count that changes in front of the person: likes, seats taken, a stepper value, items in a cart.
- A live figure that ticks up or down while the page is open.

## Use something else when
- A figure counting up from zero once when it first appears: use [Number count](number-count.md).
- A countdown to a deadline: use [Timer](timer.md).
- A static figure: use [Stat row](stat-row.md). Write it as text with tabular figures.
- A number the person types or steps: use [Number stepper](number-stepper.md). The stepper already uses a rolling number for its value.

## Where it goes
Inline in the text or control that owns the number: a like button, a stepper, a stat value, a cart badge. It inherits font, size and color from its parent.

## Anatomy
| Part | What it is |
|---|---|
| `.roll` | Required. An inline box 1.2 em tall that clips the columns. Tabular figures. |
| `[data-lds-roll]` | The starting value. `init()` builds the columns from it. |
| `.roll__col` | One column per digit with the digits 0 to 9, moved with `transform`. Built by the JS; `aria-hidden`. |

## Markup

**Seats taken.** Each digit slides to its new place. Press the buttons.
```html
<span class="roll" role="img" data-lds-roll="128"></span>
<script type="module">
  import { setRoll } from 'lampung-design-system/js';
  setRoll(document.querySelector('.roll'), 129);
</script>
```

**Inside a control.** The like button rolls its count; the stepper rolls its value.
```html
<button class="like" aria-pressed="false" data-lds-like aria-label="Like"><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="24"></span></button>
```

## States
| State | How |
|---|---|
| `value` | `setRoll(el, value)` sets `aria-label`, adds or removes columns, and moves each to its digit. |

## Motion and microinteractions
- Each column moves with `transform: translateY()` on `--spring-smooth` (`--d-smooth`, 560 ms), so 128 to 175 rolls the tens and ones together while the hundreds stay still.
- It is a transition: a new value mid-roll retargets from where the digits are.
- Columns added or removed (99 to 100) appear and disappear at once.
- Reduced motion: a 120 ms linear change.

## Accessibility
- The columns are `aria-hidden`; `setRoll` writes the value to `aria-label` on `.roll`. A plain `span` with a label is not read by every screen reader, so give `.roll` `role="img"` when it stands alone, or rely on the label of the control around it.
- Do not make it a live region. If a change matters, announce it once in a `role="status"` line ("129 seats taken").

## Do
- Use it for counts that change in view, not for every number on the page.
- Let it inherit its size and weight from the text around it.

## Don't
- Pass separators, signs or decimals: it rolls digits only. Format "1,280" or "-3" as text.
- Roll a number on first load; use [number count](number-count.md) once, or nothing.

## Behavior (plain HTML)
`data-lds-roll="128"` builds the columns on `init()`. `setRoll(el, value)` rolls to a new value (digits 0 to 9 only).

## Related
[Number count](number-count.md) · [Number stepper](number-stepper.md) · [Like](like.md) · [Stat row](stat-row.md)
