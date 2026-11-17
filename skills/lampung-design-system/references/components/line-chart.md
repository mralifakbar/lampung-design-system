# Line chart

Group: Charts. Docs page: `docs/components/line-chart.html`.

A line per series over time, on an SVG with receding gridlines and labels at the line ends. For trends across many points; at most four series, the second one dashed.

## Use it when
- Showing how a value changes over time and comparing up to four series: the score of this puskesmas against the city average, bus riders per month this year and last.
- Ten or more points where the shape of the trend matters more than any single value.

## Use something else when
- A tiny trend under one headline number: use [Sparkline stat](sparkline-stat.md).
- A few separate buckets to compare: use [Bar chart](bar-chart.md).
- Daily activity over weeks or months: use [Heatmap](heatmap.md).
- The share of a whole: use [Donut](donut.md).
- A timeline of events, not values: use [Timeline](timeline.md).

## Where it goes
Full width of a `.chart-card` in a report or the main column; the svg scales with the card. On phones show fewer periods (last 6 weeks) rather than squeezing labels, and keep the end labels.

## Anatomy
| Part | What it is |
|---|---|
| `svg[viewBox][role=img]` | Required. A fixed viewBox (1000 by 260 here) scaled to the card width; `aria-label` with the takeaway. |
| `.axis-line / .axis-text` | Gridlines (`--hairline`, 1 px) and tick labels (11 px `--text-muted`). Horizontal gridlines only. |
| `.series-line` | Required. Series 1, 2.25 px, round joins, `--series-1`. |
| `.series-line--2` | The comparison series: 1.75 px, dashed 4 4, `--series-4`. Dashes keep it distinct without color. |
| `.series-area` | Optional. An 8 % fill under series 1 only. |
| `.draw` | Optional. Draws the line in once; pair with `pathLength="1200"`. |
| `.ctip` | Optional. The crosshair tooltip, absolutely positioned in a `position: relative` wrapper; you move it. |

## Markup

**Two series with a crosshair.** Move the pointer over the plot: a crosshair snaps to the nearest week and the tip shows both values. The labels at the ends make the legend optional.
```html
<div class="chart-card">
  <div class="cluster" style="justify-content: space-between; align-items: flex-start;">
    <div><div class="chart-card__q">Is our service on par with other puskesmas?</div><div class="chart-card__sub">Patient satisfaction score per week, this puskesmas against the city average</div></div>
    <div class="legend"><span><i style="background: var(--series-1); height: 3px; border-radius: 2px;"></i>This puskesmas</span><span><i style="background: var(--series-4); height: 3px; border-radius: 2px;"></i>City average</span></div>
  </div>
  <div style="position: relative; padding-top: 44px;">
    <svg viewBox="0 0 1000 260" style="width: 100%; height: auto; display: block;" role="img" aria-label="Weekly patient satisfaction scores over 10 weeks. This puskesmas rose from 62 to 84; the city average rose from 64 to 75.">
      <line class="axis-line" x1="44" x2="1000" y1="232" y2="232"></line><text class="axis-text" x="0" y="236">50</text>
      <line class="axis-line" x1="44" x2="1000" y1="177" y2="177"></line><text class="axis-text" x="0" y="181">60</text>
      <line class="axis-line" x1="44" x2="1000" y1="122" y2="122"></line><text class="axis-text" x="0" y="126">70</text>
      <line class="axis-line" x1="44" x2="1000" y1="67" y2="67"></line><text class="axis-text" x="0" y="71">80</text>
      <line class="axis-line" x1="44" x2="1000" y1="12" y2="12"></line><text class="axis-text" x="0" y="16">90</text>
      <text class="axis-text" x="44" y="256" text-anchor="middle">W1</text><text class="axis-text" x="139.1" y="256" text-anchor="middle">W2</text><text class="axis-text" x="234.2" y="256" text-anchor="middle">W3</text><text class="axis-text" x="329.3" y="256" text-anchor="middle">W4</text><text class="axis-text" x="424.4" y="256" text-anchor="middle">W5</text><text class="axis-text" x="519.6" y="256" text-anchor="middle">W6</text><text class="axis-text" x="614.7" y="256" text-anchor="middle">W7</text><text class="axis-text" x="709.8" y="256" text-anchor="middle">W8</text><text class="axis-text" x="804.9" y="256" text-anchor="middle">W9</text><text class="axis-text" x="900" y="256" text-anchor="middle">W10</text>
      <path class="series-area" d="M44 166 L139.1 133 L234.2 149.5 L329.3 116.5 L424.4 100 L519.6 122 L614.7 78 L709.8 61.5 L804.9 72.5 L900 45 L900 232 L44 232 Z"></path>
      <path class="series-line series-line--2" d="M44 155 L139.1 144 L234.2 138.5 L329.3 133 L424.4 122 L519.6 127.5 L614.7 111 L709.8 105.5 L804.9 100 L900 94.5"></path>
      <path class="series-line draw" pathLength="1200" d="M44 166 L139.1 133 L234.2 149.5 L329.3 116.5 L424.4 100 L519.6 122 L614.7 78 L709.8 61.5 L804.9 72.5 L900 45"></path>
      <text x="1000" y="49" text-anchor="end" style="font: 500 12px var(--font); fill: var(--text-strong);">Us 84</text>
      <text x="1000" y="98.5" text-anchor="end" style="font: 500 12px var(--font); fill: var(--text-subtle);">City 75</text>
    </svg>
  </div>
</div>
```

**Drawn from data.** Three puskesmas and a dashed minimum standard from one config: lines draw in once, the crosshair reads every puskesmas, arrow keys work on focus, the legend switches puskesmas off, and a hidden table carries every value.
```html
<section class="chart-card" aria-labelledby="lc-trio"><div><div class="chart-card__q" id="lc-trio">Which puskesmas is improving fastest?</div><div class="chart-card__sub">Average patient satisfaction score per week, out of 100</div></div><div class="chart" data-lds-chart='{"label":"Average satisfaction score per week at three puskesmas over 10 weeks. Puskesmas A rose from 61 to 82; B and C ended near 74.","x":["W1","W2","W3","W4","W5","W6","W7","W8","W9","W10"],"xFull":["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7","Week 8","Week 9","Week 10"],"xName":"Week","kind":"line","series":[{"name":"Puskesmas A","values":[61,64,66,70,71,74,77,78,80,82]},{"name":"Puskesmas B","values":[66,67,69,68,70,72,71,73,74,74]},{"name":"Puskesmas C","values":[70,69,71,72,71,73,72,74,73,75]},{"name":"Minimum standard","values":[65,65,65,65,65,65,65,65,65,65],"dashed":true,"color":"neutral"}],"y":{"min":50,"max":90},"height":220}'></div></section>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.series-line` | Primary series. |
| `.series-line--2` | Comparison or average, dashed. |
| `style="stroke: var(--series-2|3)"` | Third and fourth series, solid, in fixed order. |

## States
| State | How |
|---|---|
| `hover` | Crosshair line in `--line-strong`, dots on each series, `.ctip` with the week and values. Wire it yourself; see the example. |
| `loading, empty, error` | See [chart states](chart-states.md). |

## Motion and microinteractions
- First view: `.draw` animates the stroke dash offset from 1200 to 0 over 1.2 s on `--ease-inout`. Without `pathLength="1200"` a long path draws only partly or finishes early.
- The tooltip slides between weeks (`left` over `--d-standard` on `--ease-standard`) and fades over `--d-instant`.
- Data updates replace the path without redrawing. Reduced motion: the line appears drawn and the tip jumps.

## Accessibility
- The svg has `role="img"` and an `aria-label` that states the trend and the start and end values.
- The crosshair is pointer only; offer the values in a `.sr-only` table or a visible "Show as table" toggle.
- Series differ by more than color: the second is dashed, and each line is labelled at its end in text tokens.
- The tooltip is `aria-hidden`; it repeats information that must be available elsewhere.

## Do
- Label line ends directly ("You 84").
- Keep the y range honest and say the unit in the subtitle.
- Use the dashed style for the average or the previous period.

## Don't
- Plot more than four series; fold the rest into Other or split the chart.
- Smooth lines with curves that invent values between points.
- Draw vertical gridlines or a boxed frame.

## Behavior (plain HTML)
Drawn from data: `data-lds-chart` with `kind: "line"` (or `drawChart(el, config)`) gives the draw-in, crosshair, keyboard reading, legend toggles and hidden table; see [area chart](area-chart.md). Hand-written svg: `data-lds-crosshair` on a `.plot` moves `.cross` and `.ctip` to the nearest `[data-x]` point.

## Related
[Chart principles](chart-principles.md) · [Sparkline stat](sparkline-stat.md) · [Bar chart](bar-chart.md) · [Chart states](chart-states.md)
