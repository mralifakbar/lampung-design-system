# Chart card

Group: Charts (new). Docs page: `docs/components/chart-card.html`.

The frame every dashboard chart sits in: the question as its title, what is measured under it, then optional actions (a range control, a menu), the headline figure with its change, the chart, and a footer with the source time or a link to the full report.

## Use it when
- Any chart on a dashboard or report page: the card gives it a question, a period and a place for the one number people came for.
- The reader should switch the period (7 days, 30 days, 3 months) or export the data without leaving the dashboard.
- Several charts sit in one grid and need the same header, spacing and footer so the page reads as one system.

## Use something else when
- One metric with its change and a tiny trend, in a row of four: use [KPI card](kpi-card.md).
- A few figures without any chart: use [Stat row](stat-row.md).
- A chart inside an article or a report body: use [Line chart](line-chart.md). Put the plot straight in the text column with a caption; a card inside prose looks like an ad.
- The chart is the whole page (a full report): use [Page header](page-header.md). The page header carries the title and the range control; the chart fills the column.

## Where it goes
In an `auto-grid` with `--min: 320px` on dashboards, or full width for a time series. Never inside another card. The header is a container: under 440 px the range control drops under the title and spans the card, the menu stays at the end of the title row.

## Anatomy
| Part | What it is |
|---|---|
| `section.chart-card` | Required. 20 px padding, 18 px radius, `--line` ring, 14 px between parts. `aria-labelledby` points at the question. |
| `.chart-card__head` | Optional. A wrapping row: titles at the start, actions at the end. A size container for the range control. |
| `.chart-card__titles` | Holds `.chart-card__q` (the question, required) and `.chart-card__sub` (what is measured, over which period). |
| `.chart-card__actions` | Optional. A `.seg.chart-card__range` for the period and an `.icon-btn` menu. At most one button besides the menu. |
| `.chart-card__figure` | Optional. `.chart-card__big` plus a [trend delta](trend-delta.md) and what it compares with. |
| `.chart / .bars / .donut-chart …` | Required. The chart itself. |
| `.chart-card__foot` | Optional. A hairline, then the data time on the start and one plain link to the full view on the end. |

## Markup

**Period control, menu, figure and footer.** Switch the period: the stacked areas move from where they are to the new data, the scale eases to its new range. Point at the plot (or focus it and use the arrow keys) for the day, each channel and the total. Click a legend item to hide a channel. Narrow the window: the period control takes its own row.
```html
<section class="chart-card" aria-labelledby="cc-orders-q">
  <div class="chart-card__head">
    <div class="chart-card__titles"><div class="chart-card__q" id="cc-orders-q">Where do orders come from?</div><div class="chart-card__sub">Orders per day, website and market stall</div></div>
    <div class="chart-card__actions">
      <div class="seg chart-card__range" role="group" aria-label="Period" data-lds-segmented data-lds-chart-for="cc-orders">
        <span class="seg__thumb"></span>
        <button type="button" class="seg__btn" aria-pressed="false" data-set="7d">7 days</button>
        <button type="button" class="seg__btn" aria-pressed="true" data-set="30d">30 days</button>
        <button type="button" class="seg__btn" aria-pressed="false" data-set="90d">3 months</button>
      </div>
      <div style="position: relative;">
        <button class="icon-btn" aria-label="More actions for Orders chart" aria-haspopup="menu" aria-expanded="false" data-lds-menu="cc-orders-menu"><span class="ic" aria-hidden="true">more_horiz</span></button>
        <div class="menu menu--right" id="cc-orders-menu" role="menu" aria-label="Orders chart" style="top: calc(100% + 6px); right: 0;">
          <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Download CSV</button>
          <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">content_copy</span>Copy link to chart</button>
        </div>
      </div>
    </div>
  </div>
  <div class="chart-card__figure"><div class="chart-card__big" data-chart-figure>2,545</div><span class="delta delta--pill delta--good" data-chart-delta><span class="ic" aria-hidden="true">arrow_upward</span>7%</span><span class="chart-card__sub" data-chart-note>against the 30 days before</span></div>
  <div class="chart" id="cc-orders" data-lds-chart='{"xName":"Day","stacked":true,"total":true,"height":220,"x":["18 Oct","19 Oct","20 Oct","21 Oct","22 Oct","23 Oct","24 Oct","25 Oct","26 Oct","27 Oct","28 Oct","29 Oct","30 Oct","31 Oct","1 Nov","2 Nov","3 Nov","4 Nov","5 Nov","6 Nov","7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Sun 18 Oct","Mon 19 Oct","Tue 20 Oct","Wed 21 Oct","Thu 22 Oct","Fri 23 Oct","Sat 24 Oct","Sun 25 Oct","Mon 26 Oct","Tue 27 Oct","Wed 28 Oct","Thu 29 Oct","Fri 30 Oct","Sat 31 Oct","Sun 1 Nov","Mon 2 Nov","Tue 3 Nov","Wed 4 Nov","Thu 5 Nov","Fri 6 Nov","Sat 7 Nov","Sun 8 Nov","Mon 9 Nov","Tue 10 Nov","Wed 11 Nov","Thu 12 Nov","Fri 13 Nov","Sat 14 Nov","Sun 15 Nov","Mon 16 Nov"],"series":[{"name":"Website","values":[56,52,44,52,54,57,60,62,48,49,51,52,62,63,61,51,50,51,57,64,64,58,56,51,52,60,66,59,60,58]},{"name":"Market stall","values":[30,23,19,20,29,35,36,32,26,20,21,27,37,37,32,26,21,22,31,37,37,32,26,21,24,29,38,38,34,25]}],"figure":"2,545","delta":"7%","note":"against the 30 days before","label":"Orders per day by channel, last 30 days: 2,545 in total.","sets":{"7d":{"x":["10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Tue 10 Nov","Wed 11 Nov","Thu 12 Nov","Fri 13 Nov","Sat 14 Nov","Sun 15 Nov","Mon 16 Nov"],"series":[{"name":"Website","values":[51,52,60,66,59,60,58]},{"name":"Market stall","values":[21,24,29,38,38,34,25]}],"figure":"615","delta":"1%","note":"against the 7 days before","label":"Orders per day by channel, last 7 days: 615 in total."},"30d":{"x":["18 Oct","19 Oct","20 Oct","21 Oct","22 Oct","23 Oct","24 Oct","25 Oct","26 Oct","27 Oct","28 Oct","29 Oct","30 Oct","31 Oct","1 Nov","2 Nov","3 Nov","4 Nov","5 Nov","6 Nov","7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Sun 18 Oct","Mon 19 Oct","Tue 20 Oct","Wed 21 Oct","Thu 22 Oct","Fri 23 Oct","Sat 24 Oct","Sun 25 Oct","Mon 26 Oct","Tue 27 Oct","Wed 28 Oct","Thu 29 Oct","Fri 30 Oct","Sat 31 Oct","Sun 1 Nov","Mon 2 Nov","Tue 3 Nov","Wed 4 Nov","Thu 5 Nov","Fri 6 Nov","Sat 7 Nov","Sun 8 Nov","Mon 9 Nov","Tue 10 Nov","Wed 11 Nov","Thu 12 Nov","Fri 13 Nov","Sat 14 Nov","Sun 15 Nov","Mon 16 Nov"],"series":[{"name":"Website","values":[56,52,44,52,54,57,60,62,48,49,51,52,62,63,61,51,50,51,57,64,64,58,56,51,52,60,66,59,60,58]},{"name":"Market stall","values":[30,23,19,20,29,35,36,32,26,20,21,27,37,37,32,26,21,22,31,37,37,32,26,21,24,29,38,38,34,25]}],"figure":"2,545","delta":"7%","note":"against the 30 days before","label":"Orders per day by channel, last 30 days: 2,545 in total."},"90d":{"x":["19 Aug","20 Aug","21 Aug","22 Aug","23 Aug","24 Aug","25 Aug","26 Aug","27 Aug","28 Aug","29 Aug","30 Aug","31 Aug","1 Sep","2 Sep","3 Sep","4 Sep","5 Sep","6 Sep","7 Sep","8 Sep","9 Sep","10 Sep","11 Sep","12 Sep","13 Sep","14 Sep","15 Sep","16 Sep","17 Sep","18 Sep","19 Sep","20 Sep","21 Sep","22 Sep","23 Sep","24 Sep","25 Sep","26 Sep","27 Sep","28 Sep","29 Sep","30 Sep","1 Oct","2 Oct","3 Oct","4 Oct","5 Oct","6 Oct","7 Oct","8 Oct","9 Oct","10 Oct","11 Oct","12 Oct","13 Oct","14 Oct","15 Oct","16 Oct","17 Oct","18 Oct","19 Oct","20 Oct","21 Oct","22 Oct","23 Oct","24 Oct","25 Oct","26 Oct","27 Oct","28 Oct","29 Oct","30 Oct","31 Oct","1 Nov","2 Nov","3 Nov","4 Nov","5 Nov","6 Nov","7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov","13 Nov","14 Nov","15 Nov","16 Nov"],"xFull":["Wed 19 Aug","Thu 20 Aug","Fri 21 Aug","Sat 22 Aug","Sun 23 Aug","Mon 24 Aug","Tue 25 Aug","Wed 26 Aug","Thu 27 Aug","Fri 28 Aug","Sat 29 Aug","Sun 30 Aug","Mon 31 Aug","Tue 1 Sep","Wed 2 Sep","Thu 3 Sep","Fri 4 Sep","Sat 5 Sep","Sun 6 Sep","Mon 7 Sep","Tue 8 Sep","Wed 9 Sep","Thu 10 Sep","Fri 11 Sep","Sat 12 Sep","Sun 13 Sep","Mon 14 Sep","Tue 15 Sep","Wed 16 Sep","Thu 17 Sep","Fri 18 Sep","Sat 19 Sep","Sun 20 Sep","Mon 21 Sep","Tue 22 Sep","Wed 23 Sep","Thu 24 Sep","Fri 25 Sep","Sat 26 Sep","Sun 27 Sep","Mon 28 Sep","Tue 29 Sep","Wed 30 Sep","Thu 1 Oct","Fri 2 Oct","Sat 3 Oct","Sun 4 Oct","Mon 5 Oct","Tue 6 Oct","Wed 7 Oct","Thu 8 Oct","Fri 9 Oct","Sat 10 Oct","Sun 11 Oct","Mon 12 Oct","Tue 13 Oct","Wed 14 Oct","Thu 15 Oct","Fri 16 Oct","Sat 17 Oct","Sun 18 Oct","Mon 19 Oct","Tue 20 Oct","Wed 21 Oct","Thu 22 Oct","Fri 23 Oct","Sat 24 Oct","Sun 25 Oct","Mon 26 Oct","Tue 27 Oct","Wed 28 Oct","Thu 29 Oct","Fri 30 Oct","Sat 31 Oct","Sun 1 Nov","Mon 2 Nov","Tue 3 Nov","Wed 4 Nov","Thu 5 Nov","Fri 6 Nov","Sat 7 Nov","Sun 8 Nov","Mon 9 Nov","Tue 10 Nov","Wed 11 Nov","Thu 12 Nov","Fri 13 Nov","Sat 14 Nov","Sun 15 Nov","Mon 16 Nov"],"series":[{"name":"Website","values":[40,48,50,55,49,44,40,42,51,56,57,49,44,45,48,51,51,53,53,47,46,45,48,57,57,55,49,45,46,54,57,60,50,48,44,45,48,55,55,52,46,43,44,50,57,57,52,51,43,44,50,54,59,54,50,43,49,56,62,59,56,52,44,52,54,57,60,62,48,49,51,52,62,63,61,51,50,51,57,64,64,58,56,51,52,60,66,59,60,58]},{"name":"Market stall","values":[20,27,33,33,32,23,21,21,27,32,36,32,23,17,19,28,34,36,32,23,21,20,25,32,33,31,25,21,20,27,32,35,31,22,19,20,27,35,34,30,22,20,20,27,33,36,31,22,21,21,29,34,38,33,25,19,21,26,36,35,30,23,19,20,29,35,36,32,26,20,21,27,37,37,32,26,21,22,31,37,37,32,26,21,24,29,38,38,34,25]}],"figure":"7,195","delta":"16%","note":"against the 3 months before","label":"Orders per day by channel, last 3 months: 7,195 in total."}}}'></div>
  <div class="chart-card__foot"><span>Updated 16 Nov 2026, 09:40</span><a class="btn btn--plain btn--sm" href="#cc-orders-q">Open the orders report<span class="ic" aria-hidden="true">chevron_right</span></a></div>
</section>
```

**A dashboard row.** Two cards share one grid. The bar chart highlights the answer; the line chart compares this term with the last one, dashed.
```html
<div class="auto-grid" style="--min: 300px;">
  <section class="chart-card" aria-labelledby="cc-busy">
    <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cc-busy">Which day is busiest?</div><div class="chart-card__sub">Lessons booked per weekday, this week</div></div></div>
    <div class="chart" data-lds-chart='{"label":"Lessons booked per weekday this week. Thursday is busiest with 31.","x":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],"series":[{"name":"Lessons","values":[18,24,22,31,27,12,6],"kind":"bar"}],"highlight":3,"height":180}'></div>
  </section>
  <section class="chart-card" aria-labelledby="cc-score">
    <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cc-score">Are quiz scores improving?</div><div class="chart-card__sub">Average score per week, out of 100</div></div></div>
    <div class="chart" data-lds-chart='{"label":"Average quiz score per week. This term rose from 64 to 81; last term stayed near 70.","x":["W1","W2","W3","W4","W5","W6","W7","W8"],"kind":"line","series":[{"name":"This term","values":[64,67,66,71,74,73,78,81]},{"name":"Last term","values":[68,70,69,71,70,72,71,70],"dashed":true,"color":4}],"y":{"min":50,"max":90},"height":180}'></div>
    <div class="chart-card__foot"><span>Example data</span><a class="btn btn--plain btn--sm" href="#cc-score">See every quiz<span class="ic" aria-hidden="true">chevron_right</span></a></div>
  </section>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.chart-card__range` | A segmented control for two to four periods. Add `data-lds-chart-for="chartId"` and `data-set` on each button to switch a [data chart](area-chart.md) to `config.sets[key]`. More than four periods: a [date range](date-range.md) picker instead. |
| `.chart-card__actions .icon-btn` | One menu for export, copy link, full screen. Never a row of icon buttons. |
| `.chart-card__figure` | The headline number and its change. Leave it out when the chart has no single answer. |
| `.chart-card__foot` | Data time and one link. Leave it out when there is nothing to say. |

## States
| State | How |
|---|---|
| `loading, empty, error` | The card keeps its size and title; see [chart states](chart-states.md). |
| `refreshing` | Keep the chart; a small [spinner](spinner.md) by the title while new data loads, then the marks move to it. |
| `period changed` | The chart animates; update the figure with [rolling number](rolling-number.md) and the delta in place. |

## Motion and microinteractions
- The period thumb slides on `--spring-smooth` (segmented control).
- The chart moves from what is on screen to the new data over `--d-considered` (480 ms) on `--ease-inout`; a switch mid-way starts from the current shape.
- The menu opens from its corner on the overlay recipe; the card itself never moves.
- Reduced motion: the data jumps, the thumb cross-fades.

## Accessibility
- Make the card a `section` labelled by its question, so the chart is a landmark people can jump to.
- The range control is a group of toggle buttons with `aria-pressed` and a group label ("Period").
- The menu button names its chart: "More actions for Orders chart".
- The headline figure and delta are real text; the delta says the direction in words for screen readers when the arrow is the only cue (add `.sr-only` "up" or "down").

## Do
- Write the title as the question the chart answers; put the period and unit in the subtitle.
- Keep the same header order on every card: titles, range, menu.
- Say once on the page that the numbers are examples.

## Don't
- Nest a chart card in another card, or put two charts in one card.
- Add a row of icon buttons; fold extra actions into the menu.
- Use a select for two or three periods; the segmented control shows them all.

## Behavior (plain HTML)
`data-lds-chart-for="chartId"` on a `.seg` (buttons with `data-set`) or a native `<select>` (options with `value`) calls `drawChart` on that chart with `config.sets[key]`; see [area chart](area-chart.md) for the chart config. A set may also carry `figure`, `delta` and `note`: they replace the text of `[data-chart-figure]`, `[data-chart-delta]` and `[data-chart-note]` in the same card, which rise in once. The chart, legend, crosshair and table come from `data-lds-chart`.

## Related
[Area chart](area-chart.md) · [KPI card](kpi-card.md) · [Chart states](chart-states.md) · [Chart principles](chart-principles.md)
