# Percentage bar

Group: Charts. Docs page: `docs/components/percentage-bar.html`.

One horizontal bar split into up to four colored parts that add up to 100 %, with a legend that names each part and its share. The compact way to show composition.

## Use it when
- Showing how one whole splits into parts: credits by course type, time spent by activity, answers right, wrong and skipped.
- Composition in a narrow space or inside a list row or table cell, where a donut would not fit.
- Comparing composition across a few rows (one bar per class) when the parts are the same.

## Use something else when
- Progress of one value toward done: use [Progress bar](progress-bar.md). A progress bar has one part and a track.
- How full a capacity or quota is: use [Meter](meter.md).
- The total matters as much as the split: use [Donut](donut.md).
- Comparing absolute sizes across categories: use [Bar chart](bar-chart.md).

## Where it goes
In a `.chart-card` under the title, inside list rows or table cells at full cell width, or under a stat. Full width on phones; the legend wraps under it.

## Anatomy
| Part | What it is |
|---|---|
| `.pbar` | Required. 14 px tall flex row, 4 px radius, 2 px gaps between parts, clipped. `role="img"` + `aria-label`. |
| `span` | Required. One per part; `flex-grow` is the share, `background` is `--series-n` in fixed order. |
| `.legend` | Required. Swatch, name and share for each part, in the same order. |

## Markup

**Composition of a whole.** Credits by course type. The legend carries the numbers.
```html
<div class="chart-card" style="max-width: 460px;">
  <div><div class="chart-card__q">Where do my credits go?</div><div class="chart-card__sub">Share of 120 credits by course type</div></div>
  <div class="pbar" role="img" aria-label="Core 50 percent, electives 25, labs 15, general 10"><span style="flex-grow: 50; background: var(--series-1);"></span><span style="flex-grow: 25; background: var(--series-2);"></span><span style="flex-grow: 15; background: var(--series-3);"></span><span style="flex-grow: 10; background: var(--series-4);"></span></div>
  <div class="legend"><span><i style="background: var(--series-1);"></i>Core <b style="font-weight: 500; color: var(--text-strong);">50%</b></span><span><i style="background: var(--series-2);"></i>Electives <b style="font-weight: 500; color: var(--text-strong);">25%</b></span><span><i style="background: var(--series-3);"></i>Labs <b style="font-weight: 500; color: var(--text-strong);">15%</b></span><span><i style="background: var(--series-4);"></i>General <b style="font-weight: 500; color: var(--text-strong);">10%</b></span></div>
</div>
```

**Compared across rows.** Answers in two tryouts. Same parts, same order, one bar per row; a change in the split reads at a glance.
```html
<div class="chart-card" style="max-width: 460px;">
  <div><div class="chart-card__q">Am I answering more correctly?</div><div class="chart-card__sub">Answers in the last two tryouts</div></div>
  <div class="stack" style="--gap: 6px;"><span class="card__sub" style="margin: 0;">Tryout 3</span><div class="pbar" role="img" aria-label="Tryout 3: 62 percent right, 28 wrong, 10 skipped"><span style="flex-grow: 62; background: var(--series-3);"></span><span style="flex-grow: 28; background: var(--series-2);"></span><span style="flex-grow: 10; background: var(--series-4);"></span></div></div>
  <div class="stack" style="--gap: 6px;"><span class="card__sub" style="margin: 0;">Tryout 4</span><div class="pbar" role="img" aria-label="Tryout 4: 74 percent right, 20 wrong, 6 skipped"><span style="flex-grow: 74; background: var(--series-3);"></span><span style="flex-grow: 20; background: var(--series-2);"></span><span style="flex-grow: 6; background: var(--series-4);"></span></div></div>
  <div class="legend"><span><i style="background: var(--series-3);"></i>Right</span><span><i style="background: var(--series-2);"></i>Wrong</span><span><i style="background: var(--series-4);"></i>Skipped</span></div>
</div>
```

## States
| State | How |
|---|---|
| `data change` | Change `flex-grow`; parts resize smoothly. |
| `a part is 0` | Remove its span (an empty part still adds a 2 px gap). |
| `loading` | A single `.skel` 14 px tall with the same radius; see [chart states](chart-states.md). |

## Motion and microinteractions
- Parts transition `flex-grow` over `--d-considered` (480 ms) on `--ease-inout`, so a new split slides into place.
- No fill-in animation on first load. Reduced motion: 120 ms.

## Accessibility
- `role="img"` on `.pbar` with every part and share in the `aria-label`.
- The legend is real text with the percentages; never rely on the colored parts alone.
- Keep the same color for the same meaning across rows (right is always series 3 here).

## Do
- Keep parts in a fixed order across every bar on the page.
- Show the percentages in the legend.

## Don't
- Split into more than four parts; fold the rest into Other in `--neutral`.
- Use it for one value against a target.
- Add labels inside the parts; small parts cannot hold them.

## Related
[Donut](donut.md) · [Progress bar](progress-bar.md) · [Meter](meter.md) · [Chart principles](chart-principles.md)
