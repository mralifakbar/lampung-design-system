# Range slider

Group: Selection. https://lampung.kartadinata.app/docs/en/components/range-slider

Two thumbs on one track for a minimum and a maximum, with the accent fill between them. The thumbs can never cross; each is a native range input.

## Use it when
- Filtering by a span: fee from and to, age, score between, duration.
- Both ends matter and an approximate position is good enough while browsing.

## Use something else when
- A single value on a scale: use [Slider](slider.md).
- Exact bounds people type (a payment between two amounts): use [Amount field](amount-field.md). Two amount fields in a `.form__row`.
- A date span: use [Calendar](calendar.md). The calendar supports a range with `.is-range` days.
- A few fixed brackets (Under 50k, 50k to 100k, Over 100k): use [Chips](chips.md).

## Where it goes
In filter panels ([drawer](drawer.md) on wide screens, [sheet](sheet.md) on phones), full width of the panel, with the current span shown in the label row above it.

## Anatomy
| Part | What it is |
|---|---|
| `.range` | Required. 28 px tall positioned box with `data-lds-range`. |
| `.range__track` | Required. The 4 px gray track. |
| `.range__fill` | Required. The accent fill inside the track; the JS sets its left and right. |
| `input[type=range] (two)` | Required. Lower and upper thumbs with the same `min`, `max` and `step`, each with its own `aria-label`. Only the thumbs take pointer events. |

## Markup

**Participant age.** Age range for a youth job training. Drag either thumb, or Tab to it and use the arrow keys. The lower thumb stops one step below the upper one.
```html
<div class="field" style="max-width: 420px; width: 100%;">
  <span class="field__label">Participant age <span id="rs-credits">16 to 21</span></span>
  <div class="range" data-lds-range oninput="const [lo, hi] = this.querySelectorAll('input'); document.getElementById('rs-credits').textContent = lo.value + ' to ' + hi.value;">
    <div class="range__track"><div class="range__fill"></div></div>
    <input type="range" min="12" max="24" value="16" aria-label="Minimum age">
    <input type="range" min="12" max="24" value="21" aria-label="Maximum age">
  </div>
</div>
```

**Fee filter.** Filtering public halls by daily rental fee. Larger steps for money; the label shows formatted values.
```html
<div class="field" style="max-width: 420px; width: 100%;">
  <span class="field__label">Daily rental fee <span id="rs-price">Rp 50.000 to Rp 250.000</span></span>
  <div class="range" data-lds-range oninput="const [lo, hi] = this.querySelectorAll('input'), f = (v) => 'Rp ' + Number(v).toLocaleString('id-ID'); document.getElementById('rs-price').textContent = f(lo.value) + ' to ' + f(hi.value);">
    <div class="range__track"><div class="range__fill"></div></div>
    <input type="range" min="0" max="500000" step="25000" value="50000" aria-label="Minimum fee">
    <input type="range" min="0" max="500000" step="25000" value="250000" aria-label="Maximum fee">
  </div>
</div>
```

## States
| State | How |
|---|---|
| `dragging` | The held thumb scales to 1.1 (WebKit and Blink). |
| `focus-visible` | Focus ring around the focused thumb (WebKit and Blink). |
| `touching values` | When the lower would reach the upper, the JS pushes it back one step (and the other way round). |

## Motion and microinteractions
- Thumbs follow the pointer 1:1; the fill updates on every `input` event.
- Press: thumb scale 1.1 on `--spring-snappy` (360 ms).
- Apply a filter on `lds:change` with a short debounce, or on release, so results do not flash while dragging.
- Reduced motion: the press scale becomes 120 ms linear.

## Accessibility
- Two native range inputs: each is focusable, keyboard operable and announced with its own `aria-label` ("Minimum age", "Maximum age").
- Show the current span as text (in the label row) so it is visible and readable without dragging.
- As with the single [slider](slider.md), Firefox shows no focus ring on the thumbs; check keyboard focus there.

## Do
- Start at the full range or the most common span.
- Label the span in words people use ("16 to 21").

## Don't
- Use two separate sliders for a min and max.
- Hide the values; dragging to an unknown number is guesswork.

## Behavior (plain HTML)
`data-lds-range` on `.range`: positions `.range__fill` between the thumbs, keeps the lower below the upper by one step, and fires `lds:change` with `{ min, max }`. The value text is yours.

## Related
[Slider](slider.md) · [Chips](chips.md) · [Drawer](drawer.md) · [Amount field](amount-field.md)
