import { cfg } from './_chart-data.mjs';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const thisWeek = [12, 18, 26, 22, 31, 9, 4];
const lastWeek = [15, 21, 19, 24, 17, 6, 8];
const pct = (v) => `${Math.round((v / 32) * 100)}%`;
const col = (d, v, muted, extra = '') => `<div class="bars__col"><span class="bars__bar${muted ? ' bars__bar--muted' : ''}" style="height: ${pct(v)};"${extra}><span class="bars__tip">${v} submitted</span></span><span class="bars__x">${d}</span></div>`;
const highlight = days.map((d, i) => col(d, thisWeek[i], thisWeek[i] !== 31)).join('\n    ');
const switchable = days.map((d, i) => col(d, thisWeek[i], false, ` data-a="${pct(thisWeek[i])}" data-ta="${thisWeek[i]} submitted" data-b="${pct(lastWeek[i])}" data-tb="${lastWeek[i]} submitted"`)).join('\n    ');
const set = (k) => `onclick="this.closest('.chart-card').querySelectorAll('.bars__bar').forEach(b => { b.style.height = b.dataset.${k}; b.firstChild.textContent = b.dataset.t${k}; })"`;
const scores = [['A', 12], ['B', 18], ['C', 9], ['D', 3]];
const dist = scores.map(([g, v]) => `<div class="bars__col"><span class="bars__bar" style="height: ${Math.round((v / 20) * 100)}%; background: var(--series-3);"><span class="bars__tip">${v} students</span></span><span class="bars__x">${g}</span></div>`).join('\n    ');

const grouped = {
  label: 'Assignments per week by status, last 6 weeks. On time grew from 58 to 74; late stayed under 12.',
  x: ['W41', 'W42', 'W43', 'W44', 'W45', 'W46'], xFull: ['Week of 5 Oct', 'Week of 12 Oct', 'Week of 19 Oct', 'Week of 26 Oct', 'Week of 2 Nov', 'Week of 9 Nov'], xName: 'Week', kind: 'bar',
  series: [{ name: 'On time', values: [58, 61, 66, 63, 70, 74] }, { name: 'Late', values: [11, 9, 12, 8, 7, 6] }, { name: 'Missing', values: [6, 5, 4, 6, 3, 2], color: 'neutral' }],
  height: 200,
};
const stackedBars = { ...grouped, label: 'Assignments per week, stacked by status. Totals between 75 and 82; the missing share keeps shrinking.', stacked: true, total: true };
const cash = {
  label: 'Money in and out per month, 2026. Every month but August ended positive.',
  x: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], xFull: ['June', 'July', 'August', 'September', 'October', 'November'], xName: 'Month', kind: 'bar', stacked: true, total: true,
  format: { prefix: '$', compact: true },
  series: [{ name: 'Course sales', values: [18400, 21200, 15800, 24100, 26900, 28300], color: 3 }, { name: 'Costs', values: [-14200, -15100, -17300, -16800, -17900, -18600], color: 2 }],
  height: 220,
};

export default {
  title: 'Bar chart',
  group: 'Charts',
  order: 3,
  summary: 'Vertical bars that compare one value across a few categories or periods (weekdays, grades, courses). Bars start at zero, the answer is highlighted, the rest recede.',
  when: [
    'Comparing a count or amount across 3 to 12 categories: submissions per weekday, students per grade, hours per course.',
    'Discrete periods where each bar is its own bucket (weeks, months) and the reader compares their sizes.',
  ],
  whenNot: [
    ['A continuous trend over many points', 'line-chart'],
    ['Parts of one whole that add up to 100 %', 'percentage-bar'],
    ['Activity per day over months', 'heatmap'],
    ['One number and its trend', 'sparkline-stat'],
    ['Progress of one item toward a goal', 'progress-bar'],
  ],
  where: 'In a `.chart-card`, half width on a dashboard (`auto-grid` with `--min: 320px`) or full width in a report. The plot is 180 px tall. On phones keep at most seven bars; group the rest (weeks instead of days).',
  anatomy: [
    ['.bars', 'Required. The plot: a flex row 180 px tall, bars aligned to the bottom, 8 px apart. `role="img"` with an `aria-label` that states the takeaway.'],
    ['.bars__col', 'Required. One category: the bar and its label.'],
    ['.bars__bar', 'Required. Height set inline as a percent of the plot. `--series-1` by default, max 36 px wide, top corners rounded.'],
    ['.bars__bar--muted', 'Optional. Recedes bars that are not the answer.'],
    ['.bars__tip', 'Optional. The value in a dark tip above the bar on hover.'],
    ['.bars__x', 'Required. The category label under the bar, 12 px `--text-muted`.'],
  ],
  examples: [
    {
      title: 'Highlight the answer',
      desc: 'The busiest day in the series color, the rest muted. Hover any bar for its value; the others dim. With `data-lds-grow` the bars rise from the baseline on first view.',
      stage: 'block',
      replay: true,
      html: `<div class="chart-card" style="max-width: 520px;">
  <div><div class="chart-card__q">Which days are busiest?</div><div class="chart-card__sub">Assignments submitted per weekday, this week</div></div>
  <div class="bars" role="img" data-lds-grow aria-label="Submissions per weekday. Friday is busiest with 31.">
    ${highlight}
  </div>
</div>`,
    },
    {
      title: 'Changing the period',
      desc: 'Switch weeks: bars change height over 480 ms on the in-out curve, from wherever they are.',
      stage: 'block',
      html: `<div class="chart-card" style="max-width: 520px;">
  <div class="cluster" style="justify-content: space-between; align-items: flex-start;">
    <div><div class="chart-card__q">Which days are busiest?</div><div class="chart-card__sub">Assignments submitted per weekday</div></div>
    <div class="seg" role="group" aria-label="Period" data-lds-segmented style="width: 200px;">
      <span class="seg__thumb"></span>
      <button class="seg__btn" aria-pressed="true" ${set('a')}>This week</button>
      <button class="seg__btn" aria-pressed="false" ${set('b')}>Last week</button>
    </div>
  </div>
  <div class="bars" role="img" aria-label="Submissions per weekday for the selected week">
    ${switchable}
  </div>
</div>`,
    },
    {
      title: 'Distribution',
      desc: 'Students per final grade. One series, one color, no highlight when no single bar is the answer.',
      stage: 'block',
      html: `<div class="chart-card" style="max-width: 420px;">
  <div><div class="chart-card__q">How are grades distributed?</div><div class="chart-card__sub">Final grades, Database Systems, class A</div></div>
  <div class="bars" role="img" aria-label="Grades: A 12, B 18, C 9, D or lower 3 students">
    ${dist}
  </div>
</div>`,
    },
    {
      title: 'Grouped and stacked, from data',
      desc: 'The same weeks two ways. Grouped compares statuses within a week; stacked shows the total and its parts. Both are drawn from data by `data-lds-chart`; switch a status off in the legend and the others close the gap.',
      stage: 'block',
      replay: true,
      html: `<div class="auto-grid" style="--min: 300px;">
  <section class="chart-card" aria-labelledby="bc-g"><div><div class="chart-card__q" id="bc-g">Are more assignments on time?</div><div class="chart-card__sub">Assignments per week by status</div></div><div class="chart" data-lds-chart='${cfg(grouped)}'></div></section>
  <section class="chart-card" aria-labelledby="bc-s"><div><div class="chart-card__q" id="bc-s">How do the weeks add up?</div><div class="chart-card__sub">Assignments per week, stacked by status</div></div><div class="chart" data-lds-chart='${cfg(stackedBars)}'></div></section>
</div>`,
    },
    {
      title: 'In and out around zero',
      desc: 'Negative values stack below the zero line, so money in and money out share one scale. The tooltip adds them into the month\'s total.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 640px;" aria-labelledby="bc-c"><div><div class="chart-card__q" id="bc-c">Did each month end positive?</div><div class="chart-card__sub">Money in and out per month, 2026</div></div><div class="chart" data-lds-chart='${cfg(cash)}'></div></section>`,
    },
  ],
  variants: [
    ['.bars (HTML)', 'One series, static markup, a highlight and hover tips. Add `data-lds-grow` to grow the bars on first view.'],
    ['data-lds-chart, kind "bar"', 'Drawn from data: several series grouped side by side, a tooltip per period, legend toggles, keyboard reading, a hidden table.'],
    ['stacked: true', 'Bars stack into a total; negative values stack below zero (in and out, gains and losses).'],
    ['highlight: index', 'Single series drawn from data: the answer in the series color, the rest muted.'],
  ],
  states: [
    ['hover', 'Every bar dims to 45 % except the hovered one, whose `.bars__tip` rises in.'],
    ['data change', 'Set new heights; they transition. Update the `aria-label` too.'],
    ['loading, empty, error', 'See [chart states](chart-states).'],
  ],
  motion: [
    'Heights transition over `--d-considered` (480 ms) on `--ease-inout`, because these are values already on screen changing.',
    'Hover: opacity over `--d-fast`; the tip fades in over `--d-fast` and rises 3 px on `--spring-snappy`.',
    'First view: with `data-lds-grow` (HTML bars) or drawn from data, bars grow from the baseline on `--spring-smooth` (560 ms), 35 ms apart. Without it they appear at their height.',
    'Charts drawn from data tween values and the scale over 480 ms from what is on screen when data changes or a series is switched off.',
    'Under reduced motion height changes become 120 ms and nothing grows in.',
  ],
  a11y: [
    '`role="img"` on `.bars` with an `aria-label` that says the takeaway and the key numbers.',
    'Tips appear on hover only and the bars are not focusable, so put every value that matters in the label or a `.sr-only` table.',
    'Category labels are real text under each bar; keep them short (Mon, Tue, A, B).',
    'Muted bars are a visual aid; the highlighted answer must also be in the title or label.',
  ],
  do: [
    'Start at zero and keep the bar width consistent.',
    'Highlight the bar that answers the question.',
    'Sort categories by meaning (weekdays in order) or by value, never randomly.',
  ],
  dont: [
    'Use more than 12 bars or rotate labels.',
    'Give every bar a different color.',
    'Stack or group bars by hand in `.bars` markup; draw them from data with `data-lds-chart`.',
  ],
  js: 'HTML bars need no script (`data-lds-grow` adds the entrance). Grouped, stacked and diverging bars: `data-lds-chart` with `kind: "bar"`, or `drawChart(el, config)`; see [area chart](area-chart) for every option.',
  related: ['chart-principles', 'ranked-bars', 'combo-chart', 'chart-states'],
};
