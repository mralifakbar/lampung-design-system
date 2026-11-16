# Combo chart

Group: Charts. Docs page: `docs/components/combo-chart.html`.

Bars for what happened in each period and a line for what was expected (a plan, a forecast, last year), on one shared scale, with optional dashed reference lines for fixed thresholds. Drawn from data like the area chart.

## Use it when
- Actual against plan per month or week: sales against plan, hours against a goal, sign-ups against forecast.
- Discrete periods (bars) with a continuous expectation running through them (a line).
- A fixed threshold the reader checks every period: break-even, a limit, a pass mark (a reference line).

## Use something else when
- Two measures in different units on two axes: use [Line chart](line-chart.md). Two y axes invite false comparisons. Split them into two charts that share the x axis, or index both to 100.
- Only the actuals, no expectation: use [Bar chart](bar-chart.md).
- One total against one goal: use [Target bar](target-bar.md).
- Volume over many days: use [Area chart](area-chart.md).

## Where it goes
In a [chart card](chart-card.md), full width for 12 months, half width for a week. Height 200 to 240 px.

## Anatomy
| Part | What it is |
|---|---|
| `.chart[data-lds-chart]` | Required. Same engine as the [area chart](area-chart.md); series take `kind: "bar"` or `"line"`. |
| `.chart__bar` | Bars per period, rounded on top, 26 px wide at most per series; several bar series group side by side. |
| `.chart__series.is-dashed` | The expectation as a dashed line through the bar centers. |
| `.chart__ref` | Fixed thresholds, dashed, labelled at the right end. |
| `.chart__band` | On hover or focus the whole period is tinted and the tooltip lists both series. |

## Markup

**Sales against plan.** Bars grow from the baseline on first view; the plan line fades in. Point at a month: the whole column is tinted and the tooltip gives both values. Switch the plan off in the legend.
```html
<section class="chart-card" aria-labelledby="cb-q">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cb-q">Are sales ahead of plan?</div><div class="chart-card__sub">Course sales per month, 2026</div></div></div>
  <div class="chart" data-lds-chart='{"label":"Monthly course sales against plan, 2026. Ahead of plan since July; November $56,000 against $52,000 planned. December still open.","x":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"xFull":["Jan 2026","Feb 2026","Mar 2026","Apr 2026","May 2026","Jun 2026","Jul 2026","Aug 2026","Sep 2026","Oct 2026","Nov 2026","Dec 2026"],"xName":"Month","format":{"prefix":"$","compact":true},"series":[{"name":"Sales","values":[31000,34000,29000,38000,41000,37000,44000,47000,43000,52000,56000,0],"kind":"bar"},{"name":"Plan","values":[32000,33000,34000,36000,38000,40000,42000,44000,46000,49000,52000,55000],"kind":"line","dashed":true,"color":4}],"refs":[{"value":50000,"label":"Break-even $50k"}],"height":240}'></div>
</section>
```

**A week against a daily goal.** A flat goal line in the neutral color: days above it are easy to count.
```html
<section class="chart-card" style="max-width: 520px;" aria-labelledby="cb-w">
  <div><div class="chart-card__q" id="cb-w">Did I keep my daily goal?</div><div class="chart-card__sub">Hours studied per day, this week</div></div>
  <div class="chart" data-lds-chart='{"label":"Hours studied per day this week with the average score of that day&#39;s quizzes. More hours, higher scores, except Saturday.","x":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"xName":"Day","format":{"decimals":1},"series":[{"name":"Hours studied","values":[1.5,2,2.5,1,3,4,0.5],"kind":"bar","color":3},{"name":"Goal per day","values":[2,2,2,2,2,2,2],"kind":"line","dashed":true,"color":"neutral"}],"height":200}'></div>
</section>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `series[].kind: "bar"` | One bar series per period; two or three bar series group side by side. |
| `series[].kind: "line", dashed: true` | The expectation through the bar centers. |
| `refs` | Fixed thresholds with their words. |
| `format: { prefix: "$", compact: true }` | Ticks read $40k, tooltips $41,000. |

## States
| State | How |
|---|---|
| `open period` | Leave the current month at 0 or out, and say "December still open" in the label. |
| `hover / focus` | Tinted column, tooltip with every series; arrow keys move month by month. |
| `loading, empty, error` | See [chart states](chart-states.md). |

## Motion and microinteractions
- First view: bars grow from the baseline over `--d-smooth` (560 ms) on the enter curve; dashed lines fade in.
- Data changes and toggles tween values and the scale over `--d-considered` on `--ease-inout`, from what is on screen.
- Reduced motion: drawn at once.

## Accessibility
- Same as the [area chart](area-chart.md): one focusable image with the takeaway as its name, arrow keys announce each period, a hidden table with every value.
- The expectation is dashed and named in the legend, so it differs by more than color.

## Do
- Use one scale for both series; they must be in the same unit.
- Name the expectation for what it is: Plan, Forecast, Last year.

## Don't
- Put a second y axis on the right.
- Draw the expectation as bars too; the reader then compares four bar heights instead of one bar with a line.

## Behavior (plain HTML)
Same as the [area chart](area-chart.md): `data-lds-chart` or `drawChart(el, config)`.

## Related
[Area chart](area-chart.md) · [Bar chart](bar-chart.md) · [Target bar](target-bar.md) · [Chart card](chart-card.md)
