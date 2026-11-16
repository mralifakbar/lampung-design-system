# Bar chart

Group: Charts. Docs page: `docs/components/bar-chart.html`.

Vertical bars that compare one value across a few categories or periods (weekdays, grades, courses). Bars start at zero, the answer is highlighted, the rest recede.

## Use it when
- Comparing a count or amount across 3 to 12 categories: submissions per weekday, students per grade, hours per course.
- Discrete periods where each bar is its own bucket (weeks, months) and the reader compares their sizes.

## Use something else when
- A continuous trend over many points: use [Line chart](line-chart.md).
- Parts of one whole that add up to 100 %: use [Percentage bar](percentage-bar.md).
- Activity per day over months: use [Heatmap](heatmap.md).
- One number and its trend: use [Sparkline stat](sparkline-stat.md).
- Progress of one item toward a goal: use [Progress bar](progress-bar.md).

## Where it goes
In a `.chart-card`, half width on a dashboard (`auto-grid` with `--min: 320px`) or full width in a report. The plot is 180 px tall. On phones keep at most seven bars; group the rest (weeks instead of days).

## Anatomy
| Part | What it is |
|---|---|
| `.bars` | Required. The plot: a flex row 180 px tall, bars aligned to the bottom, 8 px apart. `role="img"` with an `aria-label` that states the takeaway. |
| `.bars__col` | Required. One category: the bar and its label. |
| `.bars__bar` | Required. Height set inline as a percent of the plot. `--series-1` by default, max 36 px wide, top corners rounded. |
| `.bars__bar--muted` | Optional. Recedes bars that are not the answer. |
| `.bars__tip` | Optional. The value in a dark tip above the bar on hover. |
| `.bars__x` | Required. The category label under the bar, 12 px `--text-muted`. |

## Markup

**Highlight the answer.** The busiest day in the series color, the rest muted. Hover any bar for its value; the others dim. With `data-lds-grow` the bars rise from the baseline on first view.
```html
<div class="chart-card" style="max-width: 520px;">
  <div><div class="chart-card__q">Which days are busiest?</div><div class="chart-card__sub">Assignments submitted per weekday, this week</div></div>
  <div class="bars" role="img" data-lds-grow aria-label="Submissions per weekday. Friday is busiest with 31.">
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

**Changing the period.** Switch weeks: bars change height over 480 ms on the in-out curve, from wherever they are.
```html
<div class="chart-card" style="max-width: 520px;">
  <div class="cluster" style="justify-content: space-between; align-items: flex-start;">
    <div><div class="chart-card__q">Which days are busiest?</div><div class="chart-card__sub">Assignments submitted per weekday</div></div>
    <div class="seg" role="group" aria-label="Period" data-lds-segmented style="width: 200px;">
      <span class="seg__thumb"></span>
      <button class="seg__btn" aria-pressed="true" onclick="this.closest('.chart-card').querySelectorAll('.bars__bar').forEach(b => { b.style.height = b.dataset.a; b.firstChild.textContent = b.dataset.ta; })">This week</button>
      <button class="seg__btn" aria-pressed="false" onclick="this.closest('.chart-card').querySelectorAll('.bars__bar').forEach(b => { b.style.height = b.dataset.b; b.firstChild.textContent = b.dataset.tb; })">Last week</button>
    </div>
  </div>
  <div class="bars" role="img" aria-label="Submissions per weekday for the selected week">
    <div class="bars__col"><span class="bars__bar" style="height: 38%;" data-a="38%" data-ta="12 submitted" data-b="47%" data-tb="15 submitted"><span class="bars__tip">12 submitted</span></span><span class="bars__x">Mon</span></div>
    <div class="bars__col"><span class="bars__bar" style="height: 56%;" data-a="56%" data-ta="18 submitted" data-b="66%" data-tb="21 submitted"><span class="bars__tip">18 submitted</span></span><span class="bars__x">Tue</span></div>
    <div class="bars__col"><span class="bars__bar" style="height: 81%;" data-a="81%" data-ta="26 submitted" data-b="59%" data-tb="19 submitted"><span class="bars__tip">26 submitted</span></span><span class="bars__x">Wed</span></div>
    <div class="bars__col"><span class="bars__bar" style="height: 69%;" data-a="69%" data-ta="22 submitted" data-b="75%" data-tb="24 submitted"><span class="bars__tip">22 submitted</span></span><span class="bars__x">Thu</span></div>
    <div class="bars__col"><span class="bars__bar" style="height: 97%;" data-a="97%" data-ta="31 submitted" data-b="53%" data-tb="17 submitted"><span class="bars__tip">31 submitted</span></span><span class="bars__x">Fri</span></div>
    <div class="bars__col"><span class="bars__bar" style="height: 28%;" data-a="28%" data-ta="9 submitted" data-b="19%" data-tb="6 submitted"><span class="bars__tip">9 submitted</span></span><span class="bars__x">Sat</span></div>
    <div class="bars__col"><span class="bars__bar" style="height: 13%;" data-a="13%" data-ta="4 submitted" data-b="25%" data-tb="8 submitted"><span class="bars__tip">4 submitted</span></span><span class="bars__x">Sun</span></div>
  </div>
</div>
```

**Distribution.** Students per final grade. One series, one color, no highlight when no single bar is the answer.
```html
<div class="chart-card" style="max-width: 420px;">
  <div><div class="chart-card__q">How are grades distributed?</div><div class="chart-card__sub">Final grades, Database Systems, class A</div></div>
  <div class="bars" role="img" aria-label="Grades: A 12, B 18, C 9, D or lower 3 students">
    <div class="bars__col"><span class="bars__bar" style="height: 60%; background: var(--series-3);"><span class="bars__tip">12 students</span></span><span class="bars__x">A</span></div>
    <div class="bars__col"><span class="bars__bar" style="height: 90%; background: var(--series-3);"><span class="bars__tip">18 students</span></span><span class="bars__x">B</span></div>
    <div class="bars__col"><span class="bars__bar" style="height: 45%; background: var(--series-3);"><span class="bars__tip">9 students</span></span><span class="bars__x">C</span></div>
    <div class="bars__col"><span class="bars__bar" style="height: 15%; background: var(--series-3);"><span class="bars__tip">3 students</span></span><span class="bars__x">D</span></div>
  </div>
</div>
```

**Grouped and stacked, from data.** The same weeks two ways. Grouped compares statuses within a week; stacked shows the total and its parts. Both are drawn from data by `data-lds-chart`; switch a status off in the legend and the others close the gap.
```html
<div class="auto-grid" style="--min: 300px;">
  <section class="chart-card" aria-labelledby="bc-g"><div><div class="chart-card__q" id="bc-g">Are more assignments on time?</div><div class="chart-card__sub">Assignments per week by status</div></div><div class="chart" data-lds-chart='{"label":"Assignments per week by status, last 6 weeks. On time grew from 58 to 74; late stayed under 12.","x":["W41","W42","W43","W44","W45","W46"],"xFull":["Week of 5 Oct","Week of 12 Oct","Week of 19 Oct","Week of 26 Oct","Week of 2 Nov","Week of 9 Nov"],"xName":"Week","kind":"bar","series":[{"name":"On time","values":[58,61,66,63,70,74]},{"name":"Late","values":[11,9,12,8,7,6]},{"name":"Missing","values":[6,5,4,6,3,2],"color":"neutral"}],"height":200}'></div></section>
  <section class="chart-card" aria-labelledby="bc-s"><div><div class="chart-card__q" id="bc-s">How do the weeks add up?</div><div class="chart-card__sub">Assignments per week, stacked by status</div></div><div class="chart" data-lds-chart='{"label":"Assignments per week, stacked by status. Totals between 75 and 82; the missing share keeps shrinking.","x":["W41","W42","W43","W44","W45","W46"],"xFull":["Week of 5 Oct","Week of 12 Oct","Week of 19 Oct","Week of 26 Oct","Week of 2 Nov","Week of 9 Nov"],"xName":"Week","kind":"bar","series":[{"name":"On time","values":[58,61,66,63,70,74]},{"name":"Late","values":[11,9,12,8,7,6]},{"name":"Missing","values":[6,5,4,6,3,2],"color":"neutral"}],"height":200,"stacked":true,"total":true}'></div></section>
</div>
```

**In and out around zero.** Negative values stack below the zero line, so money in and money out share one scale. The tooltip adds them into the month's total.
```html
<section class="chart-card" style="max-width: 640px;" aria-labelledby="bc-c"><div><div class="chart-card__q" id="bc-c">Did each month end positive?</div><div class="chart-card__sub">Money in and out per month, 2026</div></div><div class="chart" data-lds-chart='{"label":"Money in and out per month, 2026. Every month but August ended positive.","x":["Jun","Jul","Aug","Sep","Oct","Nov"],"xFull":["June","July","August","September","October","November"],"xName":"Month","kind":"bar","stacked":true,"total":true,"format":{"prefix":"$","compact":true},"series":[{"name":"Course sales","values":[18400,21200,15800,24100,26900,28300],"color":3},{"name":"Costs","values":[-14200,-15100,-17300,-16800,-17900,-18600],"color":2}],"height":220}'></div></section>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.bars (HTML)` | One series, static markup, a highlight and hover tips. Add `data-lds-grow` to grow the bars on first view. |
| `data-lds-chart, kind "bar"` | Drawn from data: several series grouped side by side, a tooltip per period, legend toggles, keyboard reading, a hidden table. |
| `stacked: true` | Bars stack into a total; negative values stack below zero (in and out, gains and losses). |
| `highlight: index` | Single series drawn from data: the answer in the series color, the rest muted. |

## States
| State | How |
|---|---|
| `hover` | Every bar dims to 45 % except the hovered one, whose `.bars__tip` rises in. |
| `data change` | Set new heights; they transition. Update the `aria-label` too. |
| `loading, empty, error` | See [chart states](chart-states.md). |

## Motion and microinteractions
- Heights transition over `--d-considered` (480 ms) on `--ease-inout`, because these are values already on screen changing.
- Hover: opacity over `--d-fast`; the tip fades in over `--d-fast` and rises 3 px on `--spring-snappy`.
- First view: with `data-lds-grow` (HTML bars) or drawn from data, bars grow from the baseline on `--spring-smooth` (560 ms), 35 ms apart. Without it they appear at their height.
- Charts drawn from data tween values and the scale over 480 ms from what is on screen when data changes or a series is switched off.
- Under reduced motion height changes become 120 ms and nothing grows in.

## Accessibility
- `role="img"` on `.bars` with an `aria-label` that says the takeaway and the key numbers.
- Tips appear on hover only and the bars are not focusable, so put every value that matters in the label or a `.sr-only` table.
- Category labels are real text under each bar; keep them short (Mon, Tue, A, B).
- Muted bars are a visual aid; the highlighted answer must also be in the title or label.

## Do
- Start at zero and keep the bar width consistent.
- Highlight the bar that answers the question.
- Sort categories by meaning (weekdays in order) or by value, never randomly.

## Don't
- Use more than 12 bars or rotate labels.
- Give every bar a different color.
- Stack or group bars by hand in `.bars` markup; draw them from data with `data-lds-chart`.

## Behavior (plain HTML)
HTML bars need no script (`data-lds-grow` adds the entrance). Grouped, stacked and diverging bars: `data-lds-chart` with `kind: "bar"`, or `drawChart(el, config)`; see [area chart](area-chart.md) for every option.

## Related
[Chart principles](chart-principles.md) · [Ranked bars](ranked-bars.md) · [Combo chart](combo-chart.md) · [Chart states](chart-states.md)
