# Sparkline stat

Group: Charts. Docs page: `docs/components/sparkline-stat.html`.

One headline number with a word on its direction and a tiny line of its recent history, in a chart card. The number is the point; the sparkline only shows the shape of the trend.

## Use it when
- A dashboard tile for one metric people check often, where the trend matters as much as the value: reports closed on time, average waiting time, satisfaction score.
- A row of two to four such tiles at the top of a report.

## Use something else when
- Several key figures with no history to show: use [Stat row](stat-row.md). It needs no cards; a row of plain figures is quieter.
- The reader needs to read values at specific times: use [Line chart](line-chart.md).
- Progress toward a target: use [Progress ring](progress-ring.md).
- A number that ticks up live: use [Rolling number](rolling-number.md).
- Comparing the metric across categories: use [Bar chart](bar-chart.md).

## Where it goes
At the top of a dashboard or report, in an `auto-grid` with `--min: 300px`. On phones tiles stack full width; the sparkline keeps its 64 px height and shrinks in width.

## Anatomy
| Part | What it is |
|---|---|
| `.chart-card` | Required. The tile. |
| `.chart-card__q / __sub` | Required. The question and the period ("Attendance rate, last 12 weeks"). |
| `.chart-card__big` | Required. The current value, 32 px tabular. |
| `.badge` | Recommended. The change in words with `trending_up` or `trending_down`, colored by whether it is good, not by direction. |
| `svg[role=img]` | Required. 220 by 64 viewBox with `.series-area`, `.series-line` (`.draw` to draw in once) and an end dot. |

## Markup

**Rising and good.** The line draws in once; the end dot marks the value shown.
```html
<div class="auto-grid" style="--min: 300px;">
<div class="chart-card">
  <div><div class="chart-card__q">How fast are citizen reports closed?</div><div class="chart-card__sub">Reports closed on time, last 12 weeks</div></div>
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 20px;">
    <div><div class="chart-card__big">92%</div><div class="badge badge--success" style="margin-top: 8px;"><span class="ic" aria-hidden="true">trending_up</span>4 points above the start of the year</div></div>
    <svg viewBox="0 0 220 64" style="width: 220px; max-width: 100%; height: 64px;" role="img" aria-label="Reports closed on time rising from 88 to 92 percent over 12 weeks">
      <path class="series-area" d="M4 42.7 L23.3 48.4 L42.5 36.9 L61.8 42.7 L81.1 31.1 L100.4 36.9 L119.6 25.3 L138.9 31.1 L158.2 19.6 L177.5 25.3 L196.7 13.8 L216 19.6 L216 64 L4 64 Z"></path>
      <path class="series-line draw" pathLength="1200" d="M4 42.7 L23.3 48.4 L42.5 36.9 L61.8 42.7 L81.1 31.1 L100.4 36.9 L119.6 25.3 L138.9 31.1 L158.2 19.6 L177.5 25.3 L196.7 13.8 L216 19.6"></path>
      <circle cx="216" cy="19.6" r="4" fill="var(--series-1)" stroke="var(--bg-base)" stroke-width="2"></circle>
    </svg>
  </div>
</div>
<div class="chart-card">
  <div><div class="chart-card__q">How long is the queue at the desk?</div><div class="chart-card__sub">Average waiting time per week, last 12 weeks</div></div>
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 20px;">
    <div><div class="chart-card__big">7 min</div><div class="badge badge--warning" style="margin-top: 8px;"><span class="ic" aria-hidden="true">trending_down</span>Half of week 1</div></div>
    <svg viewBox="0 0 220 64" style="width: 220px; max-width: 100%; height: 64px;" role="img" aria-label="Waiting time falling from 14 to 7 minutes over 12 weeks">
      <path class="series-area" d="M4 13.2 L23.3 23.6 L42.5 28.8 L61.8 23.6 L81.1 34 L100.4 39.2 L119.6 34 L138.9 44.4 L158.2 39.2 L177.5 49.6 L196.7 44.4 L216 49.6 L216 64 L4 64 Z"></path>
      <path class="series-line draw" pathLength="1200" d="M4 13.2 L23.3 23.6 L42.5 28.8 L61.8 23.6 L81.1 34 L100.4 39.2 L119.6 34 L138.9 44.4 L158.2 39.2 L177.5 49.6 L196.7 44.4 L216 49.6"></path>
      <circle cx="216" cy="49.6" r="4" fill="var(--series-1)" stroke="var(--bg-base)" stroke-width="2"></circle>
    </svg>
  </div>
</div>
</div>
```

## States
| State | How |
|---|---|
| `loading` | Skeleton blocks for the number and the line; see [chart states](chart-states.md). |
| `no history` | With fewer than three points, drop the sparkline and show the number alone. |
| `bad trend` | `badge--warning` or `badge--danger` with the direction icon; falling can be good (fewer late submissions), so color by meaning. |

## Motion and microinteractions
- First view: the line draws in with `.draw` (stroke dash offset to 0 over 1.2 s on `--ease-inout`). Give the path `pathLength="1200"` so the dash matches its length exactly.
- Value updates do not redraw; swap the number with [number count](number-count.md) or [rolling number](rolling-number.md).
- Reduced motion: the line appears drawn.

## Accessibility
- The svg is `role="img"` with an `aria-label` that states start, end and period. The number and badge are real text.
- The badge says the direction in words; the icon is decorative.
- Do not make the tile a link unless it opens the full chart; then the whole card is the link with the question as its name.

## Do
- Lead with the number; keep the line small and unlabelled.
- Say what the change is relative to ("above the start of the year").

## Don't
- Add axes, ticks or tooltips to a sparkline.
- Color the badge green just because the line goes up.
- Show more than four tiles in a row.

## Related
[Stat row](stat-row.md) · [Line chart](line-chart.md) · [Chart principles](chart-principles.md) · [Badge](badge.md)
