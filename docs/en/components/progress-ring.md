# Progress ring

Group: Feedback. https://lampung.kartadinata.app/docs/en/components/progress-ring

A circular track with the value drawn as an arc and the number in the middle. For compact places and judged scores; say the judgment in words too.

## Use it when
- A score or completion that must fit a square: a service standard score in a card, document completeness on a profile, today's goal on a phone home screen.
- A judged score where the color tells met, borderline or not met (`ring--success|warning|danger`), always with words next to it.
- A task with progress inside a tile or a list row where a bar would be too wide.

## Use something else when
- There is room for a line, or the progress belongs to a long task: use [Progress bar](progress-bar.md).
- A level or capacity in segments (storage, strength): use [Meter](meter.md).
- Shares of a whole across several categories: use [Donut](donut.md).
- The number itself is the point, in a row of key figures: use [Stat row](stat-row.md).
- No measurable value, just waiting: use [Spinner](spinner.md).

## Where it goes
Beside the label it measures: at the start of a card, in a list row before the title, in a results header next to the verdict. 64 px by default; 40 to 48 px in rows; never larger than 120 px (beyond that a [stat row](stat-row.md) or a chart reads better).

## Anatomy
| Part | What it is |
|---|---|
| `.ring` | Required. 64 x 64 box. Set `width` and `height` inline for other sizes; the stroke scales with it. |
| `svg[viewBox="0 0 64 64"]` | Required. Rotated so the arc starts at 12 o'clock. |
| `circle.ring__track` | Required. `cx="32" cy="32" r="27"`: the full grey track. |
| `circle.ring__val` | Required. Same circle with `stroke-dasharray="169.6"` (the circumference, 2 x pi x 27) and `stroke-dashoffset="169.6 x (1 - value)"`. |
| `.ring__label` | Optional number centred over the ring, tabular figures. |
| `.ring--success|warning|danger` | Colors the arc for a judged score. Default is the accent. |

## Markup

**Score with a verdict.** Service standard scores from a kelurahan office review. The color supports the words; it never replaces them.
```html
<div class="docs-row" style="gap: 28px;">
  <div class="docs-row"><div class="ring ring--success" role="img" aria-label="Score 86 of 100, meets the standard"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="23.7"></circle></svg><span class="ring__label" aria-hidden="true">86</span></div><div><div class="card__title">Meets the standard</div><div class="card__sub">Threshold is 65</div></div></div>
  <div class="docs-row"><div class="ring ring--warning" role="img" aria-label="Score 62 of 100, just below the threshold"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="64.4"></circle></svg><span class="ring__label" aria-hidden="true">62</span></div><div><div class="card__title">Just below</div><div class="card__sub">3 points short</div></div></div>
  <div class="docs-row"><div class="ring ring--danger" role="img" aria-label="Score 38 of 100, does not meet the standard"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="105.2"></circle></svg><span class="ring__label" aria-hidden="true">38</span></div><div><div class="card__title">Not met</div><div class="card__sub">Reassessment on 2 December</div></div></div>
</div>
```

**Task progress that moves.** The arc eases to each new value. Press the button.
```html
<div class="ring" role="progressbar" aria-label="Reports followed up this week" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40">
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <circle class="ring__track" cx="32" cy="32" r="27"></circle>
    <circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="101.8"></circle>
  </svg>
  <span class="ring__label">40</span>
</div>
```

**Small, in a list row.** At 40 px set the size inline and shrink the label with it.
```html
<div class="list" style="max-width: 420px;">
  <div class="lrow"><div class="ring" style="width: 40px; height: 40px;" role="img" aria-label="75 percent done"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="42.4"></circle></svg><span class="ring__label" style="font-size: 12px;" aria-hidden="true">75</span></div><div class="lrow__body"><div class="lrow__title">Aid recipient data check</div><div class="lrow__sub">15 of 20 households</div></div></div>
  <div class="lrow"><div class="ring" style="width: 40px; height: 40px;" role="img" aria-label="30 percent done"><svg viewBox="0 0 64 64" aria-hidden="true"><circle class="ring__track" cx="32" cy="32" r="27"></circle><circle class="ring__val" cx="32" cy="32" r="27" stroke-dasharray="169.6" stroke-dashoffset="118.7"></circle></svg><span class="ring__label" style="font-size: 12px;" aria-hidden="true">30</span></div><div class="lrow__body"><div class="lrow__title">Road damage survey, Kedaton</div><div class="lrow__sub">6 of 20 sites</div></div></div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `ring` | Accent arc. Progress with no judgment. |
| `ring--success` | Passed, on track. |
| `ring--warning` | Borderline, needs attention. |
| `ring--danger` | Failed or far behind. |

## States
| State | How |
|---|---|
| `value` | `stroke-dashoffset` = 169.6 x (1 - value / max) on `.ring__val`. |
| `empty` | Offset 169.6: only the track shows. Write "Not started" next to it. |
| `complete` | Offset 0. Consider `ring--success` and a word ("Done"). |

## Motion and microinteractions
- The arc moves through `stroke-dashoffset` on `--ease-inout` over `--d-considered` (480 ms), a transition, so new values retarget from where it is.
- The React `Ring` also counts the number up once over 900 ms with an ease-out cubic; with reduced motion it shows the value at once.
- Under reduced motion the arc change becomes a 120 ms linear change.

## Accessibility
- A score is a picture of a number: `role="img"` with an `aria-label` that says the number and the verdict ("Score 86 of 100, meets the standard"), and `aria-hidden` on the visible label.
- Live task progress: `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and a name.
- The SVG is `aria-hidden="true"`. Never let the ring color be the only signal; write the verdict next to it.

## Do
- Write the verdict in words beside a colored ring.
- Keep the label to the number; put units and context outside.
- Use r = 27 and a dasharray of 169.6 so every ring in the product draws the same.

## Don't
- Use a ring for several categories; use a [donut](donut.md).
- Make it a hero graphic above 120 px.
- Put a three-digit number in a 40 px ring without shrinking the label.

## Behavior (plain HTML)
None in plain HTML: set `stroke-dashoffset` and the label from your code.

## React
```tsx
import { Ring } from 'lampung-design-system/react';

<Ring value={86} tone="success" ariaLabel="Score 86 of 100, meets the standard" />
<Ring value={12} max={20} size={44} label="12" ariaLabel="12 of 20 households checked" />
```

## Related
[Progress bar](progress-bar.md) · [Meter](meter.md) · [Donut](donut.md) · [Stat row](stat-row.md)
