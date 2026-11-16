# Chart principles

Group: Charts. Docs page: `docs/components/chart-principles.html`.

The rules every chart in the system follows: one question per chart, written as its title; thin marks on receding grids; four series colors in a fixed order; direct labels over legends; and a text alternative for every chart.

## Use it when
- Before building any chart: pick the chart type from the question, then follow these rules for title, color, labels and states.
- Reviewing a dashboard or report page for consistency.

## Use something else when
- One headline number with its trend: use [Sparkline stat](sparkline-stat.md).
- A few key figures without a chart: use [Stat row](stat-row.md).
- Progress of one task toward done: use [Progress bar](progress-bar.md).
- A capacity or quota that fills up: use [Meter](meter.md).
- Comparing values across categories: use [Bar chart](bar-chart.md).
- Change over time: use [Line chart](line-chart.md).

## Where it goes
Charts live in a `.chart-card`, alone or in an `auto-grid` (`--min: 320px`) on a dashboard. A chart card is never nested in another card. On phones every chart is full width and keeps its title and text alternative; dense charts (heatmaps, long time series) show fewer periods rather than shrinking marks.

## Anatomy
| Part | What it is |
|---|---|
| `.chart-card` | Required. 20 px padding, 18 px radius, `--line` ring, 14 px between parts. |
| `.chart-card__q` | Required. The question the chart answers, as a sentence: "Which days are busiest?" |
| `.chart-card__sub` | Recommended. What is measured and over which period: "Assignments submitted per weekday". |
| `.chart-card__big` | Optional. The one number the reader came for, 32 px tabular. |
| `.legend` | Only when direct labels do not fit. `span` items with an `i` swatch colored inline. |
| `text alternative` | Required. `role="img"` + `aria-label` with the takeaway, plus a `.sr-only` table when the values matter. |

## Markup

**One question, one highlight.** The title asks the question, the highlighted bar answers it, the other bars recede. Hover a bar for its value.
```html
<div class="chart-card" style="max-width: 520px;">
  <div><div class="chart-card__q">Which days are busiest?</div><div class="chart-card__sub">Assignments submitted per weekday, this week</div></div>
  <div class="bars" role="img" aria-label="Submissions per weekday. Friday is busiest with 31, Sunday quietest with 4.">
      <div class="bars__col"><span class="bars__bar bars__bar--muted" style="height: 38%;"><span class="bars__tip">12 submitted</span></span><span class="bars__x">Mon</span></div>
      <div class="bars__col"><span class="bars__bar bars__bar--muted" style="height: 56%;"><span class="bars__tip">18 submitted</span></span><span class="bars__x">Tue</span></div>
      <div class="bars__col"><span class="bars__bar bars__bar--muted" style="height: 81%;"><span class="bars__tip">26 submitted</span></span><span class="bars__x">Wed</span></div>
      <div class="bars__col"><span class="bars__bar bars__bar--muted" style="height: 69%;"><span class="bars__tip">22 submitted</span></span><span class="bars__x">Thu</span></div>
      <div class="bars__col"><span class="bars__bar" style="height: 97%;"><span class="bars__tip">31 submitted</span></span><span class="bars__x">Fri</span></div>
      <div class="bars__col"><span class="bars__bar bars__bar--muted" style="height: 28%;"><span class="bars__tip">9 submitted</span></span><span class="bars__x">Sat</span></div>
      <div class="bars__col"><span class="bars__bar bars__bar--muted" style="height: 13%;"><span class="bars__tip">4 submitted</span></span><span class="bars__x">Sun</span></div>
  </div>
</div>
```

**Series colors in fixed order.** Always `--series-1` to `--series-4`, in this order, never cycled. A fifth series folds into Other in `--neutral`. Series 2 is under 3:1 on white, so it is always labelled.
```html
<div class="legend">
  <span><i style="background: var(--series-1);"></i>Series 1</span>
  <span><i style="background: var(--series-2);"></i>Series 2</span>
  <span><i style="background: var(--series-3);"></i>Series 3</span>
  <span><i style="background: var(--series-4);"></i>Series 4</span>
  <span><i style="background: var(--neutral);"></i>Other</span>
</div>
```

**A text alternative.** The chart is one image with a summary; the exact values sit in a visually hidden table for screen readers.
```html
<div class="chart-card" style="max-width: 420px;">
  <div><div class="chart-card__q">Where do my credits go?</div><div class="chart-card__sub">Share of 120 credits by course type</div></div>
  <div class="pbar" role="img" aria-label="Core courses take half of all credits.">
    <span style="flex-grow: 50; background: var(--series-1);"></span><span style="flex-grow: 25; background: var(--series-2);"></span><span style="flex-grow: 15; background: var(--series-3);"></span><span style="flex-grow: 10; background: var(--series-4);"></span>
  </div>
  <div class="legend"><span><i style="background: var(--series-1);"></i>Core 50%</span><span><i style="background: var(--series-2);"></i>Electives 25%</span><span><i style="background: var(--series-3);"></i>Labs 15%</span><span><i style="background: var(--series-4);"></i>General 10%</span></div>
  <table class="sr-only">
    <caption>Share of credits by course type</caption>
    <thead><tr><th>Type</th><th>Share</th></tr></thead>
    <tbody><tr><td>Core</td><td>50%</td></tr><tr><td>Electives</td><td>25%</td></tr><tr><td>Labs</td><td>15%</td></tr><tr><td>General</td><td>10%</td></tr></tbody>
  </table>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `--series-1..4` | Categorical colors, fixed order, tuned per theme and checked for color-blind separation. Color follows the entity, so filtering never repaints the survivors. |
| `--neutral` | The Other series, and anything not in focus. |
| `.bars__bar--muted` | Recede the bars that are not the answer (`--accent-tint-strong`). |
| `--series-1 light to dark` | Magnitude in one hue, as in the [heatmap](heatmap.md): never a rainbow. |

## States
| State | How |
|---|---|
| `loading, empty, error` | Every chart has all three; see [chart states](chart-states.md). |
| `hover` | Hovering a mark dims the others to 45 % and shows its value; never the only way to read it. |

## Motion and microinteractions
- Data changes animate what is already on screen: bar heights and donut segments over `--d-considered` (480 ms) on `--ease-inout`; percentage segments the same.
- Lines draw in once on first view with `.draw` (1.2 s on `--ease-inout`); later updates do not redraw.
- Hover feedback: opacity over `--d-fast`, tooltips on `--spring-snappy`.
- Under reduced motion values jump to their end state; hover fades remain as 120 ms changes.

## Accessibility
- Every chart is `role="img"` with an `aria-label` that states the takeaway, not "Bar chart".
- When the reader needs the values, add a `.sr-only` table (with a `<caption>`) or a visible table toggle.
- Never encode meaning in color alone: label series directly, and use position or a pattern (a dashed line) for the second series.
- Text beside marks stays in text tokens (`--text-strong`, `--text-subtle`), not series colors. Numbers use tabular figures.
- Hover-only values must also be available in the label or the table; keyboard users cannot hover.

## Do
- Write the title as the question the chart answers.
- Label lines and bars directly; use a legend only when labels would collide.
- Start bar axes at zero; say the period in the subtitle.
- State once per page that example numbers are examples.

## Don't
- Use pie charts with more than four slices, 3D effects, gradients or shadows on marks.
- Assign series colors by rank or cycle them when a filter changes.
- Put a chart in a card inside another card.
- Show a chart with no loading, empty and error state.

## Related
[Bar chart](bar-chart.md) · [Line chart](line-chart.md) · [Chart states](chart-states.md) · [Stat row](stat-row.md)
