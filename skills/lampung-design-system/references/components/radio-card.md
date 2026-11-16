# Radio card

Group: Selection. Docs page: `docs/components/radio-card.html`.

A selectable card for one choice among two to four options that each need a title, a line of detail and often a price. The whole card is the target; the chosen one gets an accent edge and tint.

## Use it when
- Choosing a plan, package or class type where each option has a description and a price: Free, Monthly, Semester.
- Choosing a path that deserves explanation: "Practice mode" versus "Exam mode".
- Two to four options, all of which fit on screen.

## Use something else when
- Short options with a word each: use [Radio](radio.md).
- More than about four options: use [Select](select.md). Or a [combobox](combobox.md) for long lists.
- Switching between views right away: use [Segmented control](segmented-control.md).
- Several can be chosen: use [Checkbox](checkbox.md). Or [chips](chips.md) for short labels.
- A card that navigates somewhere: use [Link card](link-card.md).
- A static card that shows content: use [Card](card.md).

## Where it goes
In a [form](form-layout.md) or a checkout step, stacked full width on phones; on wide screens in a column (best for comparing prices) or two to three side by side in an `.auto-grid`. Put the primary action under the group.

## Anatomy
| Part | What it is |
|---|---|
| `[role=radiogroup]` | Required. The wrapper with `aria-label` or `aria-labelledby` naming the question. |
| `button.rcard[role=radio]` | Required. One option, full width, 16 px padding, `aria-checked`. Only the chosen card has `tabindex="0"`. |
| `.radio__dot` | Required. The same dot as a [radio](radio.md); fills accent when the card is checked. |
| `.rcard__title` | Required. The option name, 15 px semibold. Make it `display: block` (or use a block element) so the sub line goes under it. |
| `.rcard__sub` | Optional. One line of detail. |
| `.rcard__price` | Optional. Right-aligned figure, tabular numbers. |

## Markup

**Choose a plan.** Click a card, or focus the group and use the arrow keys: focus and selection move together, as with native radios.
```html
<div class="stack" role="radiogroup" aria-label="Plan">
  <button type="button" class="rcard" role="radio" aria-checked="false" tabindex="-1">
    <span class="radio__dot" aria-hidden="true"></span>
    <span><span class="rcard__title" style="display: block;">Free</span><span class="rcard__sub" style="display: block;">Five tryouts a month, basic scores</span></span>
    <span class="rcard__price">Rp 0</span>
  </button>
  <button type="button" class="rcard" role="radio" aria-checked="true" tabindex="0">…</button>
</div>
<!-- Your code: a click sets aria-checked on that card only; arrow keys move focus and selection; only the checked card has tabindex 0. -->
```

**Side by side, without prices.** Two modes with an explanation each, in an auto grid that stacks on phones.
```html
<div class="auto-grid" role="radiogroup" aria-label="Mode" style="--min: 220px; max-width: 560px; width: 100%;" onclick="const c = event.target.closest('.rcard'); if (!c) return; this.querySelectorAll('.rcard').forEach((r) => { const on = r === c; r.setAttribute('aria-checked', String(on)); r.tabIndex = on ? 0 : -1; });" onkeydown="const cards = [...this.querySelectorAll('.rcard')], i = cards.indexOf(document.activeElement), d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key]; if (d === undefined || i < 0) return; event.preventDefault(); const n = cards[(i + d + cards.length) % cards.length]; n.focus(); n.click();">
  <button type="button" class="rcard" role="radio" aria-checked="true" tabindex="0"><span class="radio__dot" aria-hidden="true"></span><span><span class="rcard__title" style="display: block;">Practice mode</span><span class="rcard__sub" style="display: block;">See the answer after each question</span></span></button>
  <button type="button" class="rcard" role="radio" aria-checked="false" tabindex="-1"><span class="radio__dot" aria-hidden="true"></span><span><span class="rcard__title" style="display: block;">Exam mode</span><span class="rcard__sub" style="display: block;">Timed, answers shown at the end</span></span></button>
</div>
```

## States
| State | How |
|---|---|
| `aria-checked="true"` | 2 px accent edge, accent tint background, dot filled. |
| `aria-checked="false"` | Base background with a 1 px strong line. |
| `:active` | The card sinks to 0.985 in 90 ms. |
| `focus-visible` | The system focus ring around the card. |
| `disabled` | `disabled` on the button; say why in `.rcard__sub`. |

## Motion and microinteractions
- Selection: edge and tint change in `--d-fast` (160 ms) on `--ease-standard`; the dot springs in on `--spring-snappy` (360 ms).
- Press: `scale(0.985)` in 90 ms (wide targets barely sink), back on `--spring-snappy`.
- Reduced motion: transitions become 120 ms linear.

## Accessibility
- The group is `role="radiogroup"` with a name; each card is a `<button type="button" role="radio">` with `aria-checked`.
- Roving focus: only the checked card is in the tab order (`tabindex="0"`, others `-1`); arrow keys move focus and selection together and wrap. The system has no script for this, so add it (the demo shows the few lines needed).
- The title and sub are the accessible name; keep the price inside the card so it is read too.

## Do
- Preselect the option most people choose, if there is one.
- Keep titles short and the sub line to one sentence.

## Don't
- Put buttons or links inside a radio card.
- Use radio cards for more than four options, or for options that are one word.
- Mix radio cards and plain radios in one group.

## Behavior (plain HTML)
None in the system. Set `aria-checked` and `tabindex` on click and handle arrow keys in your code; the CSS styles the state from `aria-checked`.

## Related
[Radio](radio.md) · [Select](select.md) · [Segmented control](segmented-control.md) · [Card](card.md)
