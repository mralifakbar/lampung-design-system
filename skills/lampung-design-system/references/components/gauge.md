# Gauge

Group: Charts. Docs page: `docs/components/gauge.html`.

A half ring with the value in its opening: one figure against its known range (seats booked, a score, a load), or a row of ticks shared out between a few states (in stock, low, sold out). Reads at a glance; the words under the number carry the detail.

## Use it when
- One value against a fixed range where "how full" is the question: capacity booked, quota used, a health score, a server's load.
- A small set of states that share one total and the main share matters most: stock in, low, out; tickets open, waiting, closed.
- A dashboard tile with room for a shape but not for a chart.

## Use something else when
- A score in a small square (a card corner, a list row): use [Progress ring](progress-ring.md).
- Storage or seats in a narrow row: use [Meter](meter.md).
- Progress toward a goal with a deadline: use [Target bar](target-bar.md).
- Parts of a whole where every part matters: use [Donut](donut.md).
- Change over time: use [Area chart](area-chart.md).

## Where it goes
In a [chart card](chart-card.md) or a [KPI card](kpi-card.md)-sized tile, centered, 160 to 240 px wide (`--size`). It scales down with its container; the number stays 28 px.

## Anatomy
| Part | What it is |
|---|---|
| `.gauge` | Required. `--size` sets the width; the svg keeps a 200 × 112 viewBox. |
| `svg[role=img]` | Required. `aria-label` states the value and the range in words. |
| `.gauge__track / .gauge__val` | One value: a 16 px track and the value arc (`--v` as a percent), in the accent or a tone. |
| `.gauge__tick` | Shared ticks: 32 short marks, each colored by the part it belongs to (`--c`). |
| `.gauge__label` | Required. `b` for the number, `span` for what it counts. |
| `.gauge__ends` | Optional. The two ends of the range under the ring. |

## Markup

**Capacity, switching days.** Switch the day: the arc moves over 480 ms from where it is, and turns to warning when the hall is nearly full. The arc sweeps in on first view.
```html
<section class="chart-card" style="max-width: 380px; align-items: center;" aria-labelledby="ga-q">
  <div class="chart-card__head" style="width: 100%;"><div class="chart-card__titles"><div class="chart-card__q" id="ga-q">How full is the exam hall?</div><div class="chart-card__sub">Seats booked for the mock exam</div></div>
    <div class="chart-card__actions"><div class="seg chart-card__range" role="group" aria-label="Day" data-lds-segmented data-lds-chart-for="ga-hall" style="width: 180px;"><span class="seg__thumb"></span><button type="button" class="seg__btn" aria-pressed="true" data-set="sat">Saturday</button><button type="button" class="seg__btn" aria-pressed="false" data-set="sun">Sunday</button></div></div>
  </div>
  <div id="ga-hall" data-lds-chart='{"type":"gauge","label":"Exam hall capacity booked: 78 of 120 seats.","value":78,"max":120,"center":"65%","unit":"78 of 120 seats","minLabel":"0","maxLabel":"120","sets":{"sat":{"value":78,"center":"65%","unit":"78 of 120 seats","label":"Saturday: 78 of 120 seats booked.","tone":null},"sun":{"value":112,"center":"93%","unit":"112 of 120 seats","label":"Sunday: 112 of 120 seats booked, nearly full.","tone":"warning"}}}' style="--size: 220px;"></div>
</section>
```

**Tones.** Plain for a neutral level, success for good, warning for close to a limit. The tone repeats what the words say.
```html
<div class="docs-row" style="gap: 32px;">
  <div data-lds-chart='{"type":"gauge","label":"Average quiz score 82 of 100.","value":82,"max":100,"tone":"success","unit":"average score"}' style="--size: 180px;"></div>
  <div data-lds-chart='{"type":"gauge","label":"Server load at 64 percent.","value":64,"max":100,"center":"64%","unit":"server load"}' style="--size: 180px;"></div>
  <div data-lds-chart='{"type":"gauge","label":"Storage 91 percent used.","value":91,"max":100,"center":"91%","tone":"warning","unit":"storage used"}' style="--size: 180px;"></div>
</div>
```

**Shared ticks.** Thirty-two ticks shared by three states; the legend gives the counts. The ticks light up from the left on first view.
```html
<section class="chart-card" style="max-width: 380px; align-items: center;" aria-labelledby="ga-stock">
  <div style="width: 100%;"><div class="chart-card__q" id="ga-stock">Is the shop well stocked?</div><div class="chart-card__sub">240 products, today</div></div>
  <div data-lds-chart='{"type":"gauge","label":"Stock of 240 products: 186 in stock, 38 running low, 16 sold out.","segments":[{"name":"In stock","value":186,"color":3},{"name":"Running low","value":38,"color":2},{"name":"Sold out","value":16,"color":"neutral"}],"center":"78%","unit":"in stock"}' style="--size: 220px;"></div>
  <div class="legend" style="justify-content: center;"><span><i style="background: var(--series-3);"></i>In stock 186</span><span><i style="background: var(--series-2);"></i>Running low 38</span><span><i style="background: var(--neutral);"></i>Sold out 16</span></div>
</section>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `value / max` | One arc. `tone: "success" | "warning" | "danger"` or `.gauge--success|warning|danger` on static markup. |
| `segments` | Ticks shared by up to four parts in series order; `ticks` changes the count (default 32). |
| `center / unit` | The number in the opening and what it counts; defaults to the formatted value. |
| `--size` | Width of the gauge (default 220 px). |

## States
| State | How |
|---|---|
| `data change` | `drawChart(el, { type: "gauge", value })` or a range control: the arc moves from where it is. |
| `loading` | A `.skel` half ring is enough: a 220 × 110 block with a 110 px top radius. |
| `over the max` | Cap the arc at the end, say the overshoot in the unit line ("12 over capacity"). |

## Motion and microinteractions
- First view: the arc sweeps from zero over `--d-considered` (480 ms) on `--ease-inout`; ticks take their color one after another, 12 ms apart.
- Value changes and tone changes run on the same transition, from the current position.
- Reduced motion: drawn at once.

## Accessibility
- The svg is `role="img"` with value and range in words; the number and unit are real text too.
- Tones repeat the meaning in words ("nearly full"); they are never the only signal.
- Shared ticks always come with a legend that has the counts.

## Do
- Use it for one figure with a meaningful maximum.
- Write the unit line as words people would say ("78 of 120 seats").

## Don't
- Add a needle, colored zones or tick numbers around the ring.
- Put several gauges in one card to compare them; use [ranked bars](ranked-bars.md).
- Use a gauge for values without a fixed maximum.

## Behavior (plain HTML)
`data-lds-chart='{ "type": "gauge", "value": 78, "max": 120, "label": "…" }'` or `drawChart(el, config)`. `data-lds-chart-for` on a range control switches `sets`.

## Related
[Progress ring](progress-ring.md) · [Meter](meter.md) · [Donut](donut.md) · [Chart card](chart-card.md)
