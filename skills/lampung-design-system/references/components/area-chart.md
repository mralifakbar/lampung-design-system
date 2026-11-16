# Area chart

Group: Charts. Docs page: `docs/components/area-chart.html`.

A filled line over time, drawn from data: one series against a dashed comparison, up to four series stacked into a total, or steps for a value that changes in jumps. Legend items switch series on and off; the crosshair reads every series at once.

## Use it when
- Volume over time where the amount under the line matters: visits, orders, sessions, minutes studied.
- Parts of a total over time, stacked: sessions by device, orders by channel, enrolments by programme.
- A level that changes in steps and holds: seats left, stock on hand, price tier, members on a plan.

## Use something else when
- Comparing trends whose totals do not add up: use [Line chart](line-chart.md). Overlapping fills hide each other; lines do not.
- A few separate buckets (weekdays, grades): use [Bar chart](bar-chart.md).
- Parts of one whole at one moment: use [Donut](donut.md).
- A tiny trend under a headline number: use [KPI card](kpi-card.md).
- Daily activity over many months: use [Heatmap](heatmap.md).

## Where it goes
Inside a [chart card](chart-card.md), full width of the card. The svg is drawn at the card's real width, so ticks stay 11 px and the x labels thin out on phones instead of shrinking. Default plot height 220 px; 180 to 200 in half-width cards.

## Anatomy
| Part | What it is |
|---|---|
| `.chart[data-lds-chart]` | Required. The container; `drawChart` fills it with the legend, the plot and a hidden table. Give it an `id` when a range control drives it. |
| `.chart__legend.legend--toggle` | Generated when there are two or more series. `.legend__btn[aria-pressed]` per series; at least one stays on. |
| `.chart__plot` | Generated. Focusable `role="img"` with the label; holds the svg and the `.ctip` tooltip. |
| `.axis-line / .axis-text` | Horizontal gridlines on nice steps (1, 2, 2.5, 5 × 10ⁿ) and their labels; `.axis-line--zero` when the scale goes below zero. |
| `.chart__area / .chart__line` | One pair per series: a 12 % fill (24 % when stacked) under a 2 px line, in `--series-n`. No gradients. |
| `.chart__series.is-dashed` | The comparison: a dashed line without fill. |
| `.chart__ref` | A dashed reference line with its words at the end: a target, a limit. |
| `.cross / .chart__dot / .ctip` | The crosshair, a dot on every visible series, and the tooltip with the date, each series and an optional total. |
| `table.sr-only` | Generated. Every value, with the label as caption. |

## Markup

**This month against last month.** One filled series and a dashed comparison. The fill grows from the baseline on first view; the dashed line fades in. Point at the plot, or focus it and use the arrow keys.
```html
<section class="chart-card" aria-labelledby="ac-visits">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="ac-visits">Are more people finding the course pages?</div><div class="chart-card__sub">Visits per day, November against October</div></div></div>
  <div class="chart" data-lds-chart='{"label":"Course page visits per day. This month 27,830, 18% more than last month.","x":["18 Oct","19 Oct","20 Oct","21 Oct","22 Oct","23 Oct","24 Oct","25 Oct","26 Oct","27 Oct","28 Oct","29 Oct","30 Oct","31 Oct","1 Nov","2 Nov","3 Nov","4 Nov","5 Nov","6 Nov","7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Sun 18 Oct","Mon 19 Oct","Tue 20 Oct","Wed 21 Oct","Thu 22 Oct","Fri 23 Oct","Sat 24 Oct","Sun 25 Oct","Mon 26 Oct","Tue 27 Oct","Wed 28 Oct","Thu 29 Oct","Fri 30 Oct","Sat 31 Oct","Sun 1 Nov","Mon 2 Nov","Tue 3 Nov","Wed 4 Nov","Thu 5 Nov","Fri 6 Nov","Sat 7 Nov","Sun 8 Nov","Mon 9 Nov","Tue 10 Nov","Wed 11 Nov","Thu 12 Nov","Fri 13 Nov","Sat 14 Nov","Sun 15 Nov","Mon 16 Nov"],"xName":"Day","series":[{"name":"This month","values":[870,920,930,870,820,670,720,910,980,1050,1010,890,750,760,910,1050,1110,980,920,730,870,900,1090,1150,1070,930,850,900,1000,1220]},{"name":"Last month","values":[800,870,930,830,690,580,620,820,870,860,860,720,680,620,790,920,910,810,700,610,700,830,930,920,900,750,710,710,750,920],"kind":"line","dashed":true,"color":4}]}'></div>
</section>
```

**Stacked into a total.** Three devices stack into all sessions. Switch a device off in the legend: its band collapses and the scale eases to the new total. The tooltip lists the top band first, then the total.
```html
<section class="chart-card" aria-labelledby="ac-devices">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="ac-devices">Where do people study?</div><div class="chart-card__sub">Study sessions per day by device, last 14 days</div></div></div>
  <div class="chart" data-lds-chart='{"label":"Study sessions per day by device, last 14 days. Phones carry more than half of all sessions.","x":["3 Nov","4 Nov","5 Nov","6 Nov","7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Tue 3 Nov","Wed 4 Nov","Thu 5 Nov","Fri 6 Nov","Sat 7 Nov","Sun 8 Nov","Mon 9 Nov","Tue 10 Nov","Wed 11 Nov","Thu 12 Nov","Fri 13 Nov","Sat 14 Nov","Sun 15 Nov","Mon 16 Nov"],"xName":"Day","stacked":true,"total":true,"series":[{"name":"Phone","values":[405,435,450,465,390,385,410,460,505,510,510,475,430,485]},{"name":"Laptop","values":[250,330,345,285,230,170,205,250,315,335,305,240,175,215]},{"name":"Tablet","values":[65,80,80,75,65,60,60,65,75,80,75,70,65,60]}]}'></div>
</section>
```

**Steps and a reference line.** Seats change in jumps and hold between bookings, so the edge steps instead of sloping. The dashed line marks when the waitlist opens.
```html
<div style="max-width: 560px;"><section class="chart-card" aria-labelledby="ac-seats">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="ac-seats">How fast is the mock exam filling?</div><div class="chart-card__sub">Seats left on Monday, by hour</div></div></div>
  <div class="chart" data-lds-chart='{"label":"Seats left in the Saturday mock exam, by hour of Monday. Down from 120 to 34.","x":["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"],"xName":"Time","step":true,"height":200,"series":[{"name":"Seats left","values":[120,118,104,96,96,81,77,60,52,41,34]}],"refs":[{"value":40,"label":"Waitlist opens at 40"}],"y":{"max":120,"ticks":4}}'></div>
</section></div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `stacked: true` | Series stack in order, series 1 at the bottom. Negative values stack below zero. |
| `step: true` | Horizontal then vertical edges: the value holds until it changes. |
| `series[].kind: "line", dashed: true` | A comparison or previous period without fill. |
| `series[].color` | 1 to 4 for `--series-n` (default: position), `"neutral"` for Other. |
| `refs: [{ value, label }]` | Dashed reference lines; the scale always includes them. |
| `format: { prefix, suffix, decimals, compact }` | How values read in ticks, tooltip and table ("$", "%", 12.4k). |
| `xFull` | Longer x labels for the tooltip and table ("Thu 12 Nov") while ticks stay short. |
| `y: { min, max, ticks, hide }` | Fix the scale (a percentage to 100) or hide the tick labels in tight cards. |

## States
| State | How |
|---|---|
| `hover / focus` | Crosshair, dots and tooltip on the nearest point; arrow keys, Home and End move it and announce the values. |
| `series off` | Legend button `aria-pressed="false"`, hollow swatch, muted label; the series collapses (stacked) or fades (overlaid). |
| `data change` | `drawChart(el, next)` or a range control: marks and scale move from what is on screen. |
| `loading, empty, error` | See [chart states](chart-states.md): a skeleton of gridlines, then the chart. |

## Motion and microinteractions
- First view: fills and bars grow from the baseline over `--d-smooth` (560 ms) on the enter curve; plain lines draw in once over 1.2 s on `--ease-inout`; dashed lines fade.
- Data changes, legend toggles and period switches tween every value and the scale over `--d-considered` (480 ms) on `--ease-inout`, starting from the values on screen, so a second click mid-way redirects without a jump. A different number of points first stretches the current shape over the new points.
- Gridlines slide with the scale; the tooltip moves on `--ease-standard` and fades over `--d-instant`.
- Reduced motion: no grow, no draw, no tween; values switch at once.

## Accessibility
- The plot is one focusable image named by `label`, which should state the takeaway, not the chart type. Arrow keys read each point aloud through the shared live region.
- A visually hidden table with every value is generated under the plot.
- Legend items are toggle buttons with `aria-pressed`; turning off the last one is refused with a shake.
- Series differ by position and line style as well as color: stacked bands keep their order, comparisons are dashed.

## Do
- Stack only things that add up to a meaningful total.
- Keep the y axis at zero for areas; the fill implies an amount.
- Put the period in the card subtitle and the long date in `xFull`.

## Don't
- Overlap more than two filled areas; stack them or use lines.
- Smooth the edge into curves that invent values between points.
- Use more than four series; fold the rest into Other (`color: "neutral"`).

## Behavior (plain HTML)
`<div class="chart" data-lds-chart='{ "label": "…", "x": [...], "series": [{ "name": "…", "values": [...] }] }'>` (or a `<script type="application/json">` child) is drawn by `init()`. From code: `import { drawChart } from 'lampung-design-system'; const chart = drawChart(el, config); chart.update({ series })` animates to new data; `chart.toggle(1)` switches a series. The chart redraws at its new width when its container resizes.

## React
```tsx
import { Chart, Segmented } from 'lampung-design-system/react';

const [period, setPeriod] = useState<'7d' | '30d'>('30d');
<section className="chart-card" aria-labelledby="orders-q">
  <div className="chart-card__head">
    <div className="chart-card__titles"><div className="chart-card__q" id="orders-q">Where do orders come from?</div></div>
    <div className="chart-card__actions"><Segmented className="chart-card__range" label="Period" value={period} onChange={setPeriod} options={[{ value: '7d', label: '7 days' }, { value: '30d', label: '30 days' }]} /></div>
  </div>
  <Chart config={{ label: 'Orders per day by channel', stacked: true, x: data[period].x, series: data[period].series }} />
</section>
```

## Related
[Chart card](chart-card.md) · [Line chart](line-chart.md) · [Bar chart](bar-chart.md) · [Chart principles](chart-principles.md)
