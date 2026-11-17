# Chart states

Group: Charts. https://lampung.kartadinata.app/docs/en/components/chart-states

Every chart is designed in loading, empty and error states inside the same `.chart-card`, at the same size as the loaded chart: a skeleton of its own shape, an empty message with the reason, and an error with a retry.

## Use it when
- Any chart whose data comes from a request: build these three states before the chart ships.
- A date range or filter can produce no data, and the reader needs to know that is real, not broken.

## Use something else when
- The states of a list, table or page that is not a chart: use [Data states](data-states.md).
- A whole page is loading: use [Nav progress](nav-progress.md).
- Background refresh of a chart already on screen: use [Spinner](spinner.md). Keep the chart and show a small spinner by the title; do not swap in a skeleton.
- A failure that affects the whole app: use [Banner](banner.md).

## Where it goes
In place of the plot, inside the same chart card, which keeps its `min-height` so a dashboard grid does not reflow. The title and subtitle stay in the empty and error states; in loading they are skeletons too.

## Anatomy
| Part | What it is |
|---|---|
| `.chart-card[role=status][aria-busy]` | Loading container, with an `aria-label` that names the chart. |
| `.skel` | Loading. Blocks in the chart's own shape: bars for a bar chart, a 14 px strip for a percentage bar, a circle for a donut, a grid of squares for a heatmap. |
| `.empty` | Empty. Title says what is missing for which period, body says when it fills in, one action that changes the range. |
| `.alert.alert--danger` | Error. What failed, then Try again. |

## Markup

**Loading, empty, error.** The same bar chart in its three non-data states, side by side at the size of the real chart.
```html
<div class="auto-grid" style="--min: 260px;">
<div class="chart-card" style="min-height: 240px;" role="status" aria-busy="true" aria-label="Loading citizen reports chart">
  <div class="stack" style="--gap: 8px;"><div class="skel" style="height: 14px; width: 55%;"></div><div class="skel" style="height: 12px; width: 35%;"></div></div>
  <div style="display: flex; align-items: flex-end; gap: 8px; height: 140px;">
    <div class="skel" style="flex: 1; height: 40%;"></div><div class="skel" style="flex: 1; height: 70%;"></div><div class="skel" style="flex: 1; height: 55%;"></div><div class="skel" style="flex: 1; height: 85%;"></div><div class="skel" style="flex: 1; height: 30%;"></div><div class="skel" style="flex: 1; height: 20%;"></div><div class="skel" style="flex: 1; height: 12%;"></div>
  </div>
</div>
<div class="chart-card" style="min-height: 240px;">
  <div><div class="chart-card__q">Which days are busiest?</div><div class="chart-card__sub">Citizen reports received per weekday, this week</div></div>
  <div class="empty" style="padding: 16px 8px;">
    <div class="empty__title">No reports this week</div>
    <div class="empty__body">The chart fills in as reports come in.</div>
    <button class="btn btn--secondary btn--sm">Show last week</button>
  </div>
</div>
<div class="chart-card" style="min-height: 240px;">
  <div><div class="chart-card__q">Which days are busiest?</div><div class="chart-card__sub">Citizen reports received per weekday, this week</div></div>
  <div class="alert alert--danger" role="alert">
    <span class="ic" aria-hidden="true">error</span>
    <div>
      <div class="alert__title">Chart data did not load</div>
      <div class="alert__body">The complaints service did not respond in time.</div>
      <div class="alert__actions"><button class="btn btn--secondary btn--sm"><span class="ic" aria-hidden="true">refresh</span>Try again</button></div>
    </div>
  </div>
</div>
</div>
```

**Loading shapes for other charts.** A line chart loads as its gridlines, a donut as a ring, a percentage bar as one strip.
```html
<div class="auto-grid" style="--min: 220px;">
  <div class="chart-card" role="status" aria-busy="true" aria-label="Loading puskesmas visits">
    <div class="skel" style="height: 14px; width: 60%;"></div>
    <div class="stack" style="--gap: 30px; padding-top: 12px;"><div class="skel" style="height: 2px;"></div><div class="skel" style="height: 2px;"></div><div class="skel" style="height: 2px;"></div><div class="skel" style="height: 2px;"></div></div>
  </div>
  <div class="chart-card" role="status" aria-busy="true" aria-label="Loading report categories">
    <div class="skel" style="height: 14px; width: 60%;"></div>
    <div class="cluster" style="--gap: 20px;"><div class="skel" style="width: 120px; height: 120px; border-radius: 50%;"></div><div class="stack" style="--gap: 10px; flex: 1;"><div class="skel" style="height: 12px;"></div><div class="skel" style="height: 12px; width: 70%;"></div><div class="skel" style="height: 12px; width: 50%;"></div></div></div>
  </div>
  <div class="chart-card" role="status" aria-busy="true" aria-label="Loading local tax split">
    <div class="skel" style="height: 14px; width: 60%;"></div>
    <div class="skel" style="height: 14px; border-radius: 4px;"></div>
    <div class="skel" style="height: 12px; width: 80%;"></div>
  </div>
</div>
```

## States
| State | How |
|---|---|
| `loading` | Skeleton in the chart's shape, after about 300 ms. `role="status"` + `aria-busy="true"`. |
| `empty` | Keep the title; `.empty` without an icon (the card is small) and one button that changes the range. |
| `error` | `.alert--danger` with `role="alert"` and Try again. Keep stale data visible with an `.alert--warning` above it if you have it. |
| `partial data` | Plot what exists and say what is missing in the subtitle ("No data for week 7"). |

## Motion and microinteractions
- Skeleton shimmer: 1.6 s on `--ease-inout`, repeating while loading; under reduced motion it plays once.
- When data arrives the plot replaces the skeleton with a fade over `--d-standard`; a line may then draw in once with `.draw`.
- Empty and error states appear without motion.

## Accessibility
- Loading: `role="status"`, `aria-busy="true"` and an `aria-label` naming the chart. Remove both when the chart renders.
- Error: `role="alert"` so it is announced once; after Try again, move focus to the card.
- Empty: plain text in the card; the chart title stays a real text node so the reader knows which chart is empty.

## Do
- Keep the card the same size in every state.
- Say the period in the empty message.
- Offer one action: change the range, or try again.

## Don't
- Show an empty plot with axes and no message.
- Draw a flat line at zero when data is missing.
- Use a lone spinner in the middle of a chart card.

## Related
[Data states](data-states.md) · [Skeleton](skeleton.md) · [Empty state](empty-state.md) · [Chart principles](chart-principles.md)
