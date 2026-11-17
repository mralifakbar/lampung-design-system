import { days, wave, cfg, sum, fmt } from './_chart-data.mjs';

const d30 = days(30);
const now = wave(30, { base: 820, trend: 0.25, week: 0.18, seed: 11, round: 10 });
const last = wave(30, { base: 760, trend: 0.05, week: 0.18, seed: 5, round: 10 });
const visits = {
  label: `City bus passengers per day. This month ${fmt(sum(now))}, ${Math.round((sum(now) / sum(last) - 1) * 100)}% more than last month.`,
  x: d30.short, xFull: d30.long, xName: 'Day',
  series: [{ name: 'This month', values: now }, { name: 'Last month', values: last, kind: 'line', dashed: true, color: 4 }],
};

const d14 = days(14);
const phone = wave(14, { base: 410, trend: 0.2, seed: 2, round: 5 }), desk = wave(14, { base: 260, week: 0.3, seed: 9, round: 5 }), tab = wave(14, { base: 70, seed: 4, round: 5 });
const devices = {
  label: 'Citizen complaints per day by channel, last 14 days. The phone app carries more than half of all complaints.',
  x: d14.short, xFull: d14.long, xName: 'Day', stacked: true, total: true,
  series: [{ name: 'Phone app', values: phone }, { name: 'Website', values: desk }, { name: 'Phone call', values: tab }],
};

const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const seats = {
  label: 'Vaccination slots left for Saturday, by hour of Monday. Down from 120 to 34.',
  x: hours, xName: 'Time', step: true, height: 200,
  series: [{ name: 'Slots left', values: [120, 118, 104, 96, 96, 81, 77, 60, 52, 41, 34] }],
  refs: [{ value: 40, label: 'Waitlist opens at 40' }],
  y: { max: 120, ticks: 4 },
};

const card = (id, q, sub, chart, extra = '') => `<section class="chart-card" aria-labelledby="${id}">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="${id}">${q}</div><div class="chart-card__sub">${sub}</div></div></div>${extra}
  ${chart}
</section>`;

export default {
  title: 'Area chart',
  group: 'Charts',
  order: 4.5,
  summary: 'A filled line over time, drawn from data: one series against a dashed comparison, up to four series stacked into a total, or steps for a value that changes in jumps. Legend items switch series on and off; the crosshair reads every series at once.',
  when: [
    'Volume over time where the amount under the line matters: visits, passengers, complaints, applications.',
    'Parts of a total over time, stacked: complaints by channel, applications by type, passengers by corridor.',
    'A level that changes in steps and holds: slots left, medicine stock, tariff tier, registered participants.',
  ],
  whenNot: [
    ['Comparing trends whose totals do not add up', 'line-chart', 'Overlapping fills hide each other; lines do not.'],
    ['A few separate buckets (weekdays, districts)', 'bar-chart'],
    ['Parts of one whole at one moment', 'donut'],
    ['A tiny trend under a headline number', 'kpi-card'],
    ['Daily activity over many months', 'heatmap'],
  ],
  where: 'Inside a [chart card](chart-card), full width of the card. The svg is drawn at the card\'s real width, so ticks stay 11 px and the x labels thin out on phones instead of shrinking. Default plot height 220 px; 180 to 200 in half-width cards.',
  anatomy: [
    ['.chart[data-lds-chart]', 'Required. The container; `drawChart` fills it with the legend, the plot and a hidden table. Give it an `id` when a range control drives it.'],
    ['.chart__legend.legend--toggle', 'Generated when there are two or more series. `.legend__btn[aria-pressed]` per series; at least one stays on.'],
    ['.chart__plot', 'Generated. Focusable `role="img"` with the label; holds the svg and the `.ctip` tooltip.'],
    ['.axis-line / .axis-text', 'Horizontal gridlines on nice steps (1, 2, 2.5, 5 × 10ⁿ) and their labels; `.axis-line--zero` when the scale goes below zero.'],
    ['.chart__area / .chart__line', 'One pair per series: a 12 % fill (24 % when stacked) under a 2 px line, in `--series-n`. No gradients.'],
    ['.chart__series.is-dashed', 'The comparison: a dashed line without fill.'],
    ['.chart__ref', 'A dashed reference line with its words at the end: a target, a limit.'],
    ['.cross / .chart__dot / .ctip', 'The crosshair, a dot on every visible series, and the tooltip with the date, each series and an optional total.'],
    ['table.sr-only', 'Generated. Every value, with the label as caption.'],
  ],
  examples: [
    {
      title: 'This month against last month',
      desc: 'One filled series and a dashed comparison. The fill grows from the baseline on first view; the dashed line fades in. Point at the plot, or focus it and use the arrow keys.',
      stage: 'block',
      replay: true,
      html: card('ac-visits', 'Are more people riding the city bus?', 'Passengers per day, November against October', `<div class="chart" data-lds-chart='${cfg(visits)}'></div>`),
    },
    {
      title: 'Stacked into a total',
      desc: 'Three channels stack into all complaints. Switch a channel off in the legend: its band collapses and the scale eases to the new total. The tooltip lists the top band first, then the total.',
      stage: 'block',
      replay: true,
      html: card('ac-devices', 'How do residents send complaints?', 'Complaints per day by channel, last 14 days', `<div class="chart" data-lds-chart='${cfg(devices)}'></div>`),
    },
    {
      title: 'Steps and a reference line',
      desc: 'Slots change in jumps and hold between bookings, so the edge steps instead of sloping. The dashed line marks when the waitlist opens.',
      stage: 'block',
      replay: true,
      html: `<div style="max-width: 560px;">${card('ac-seats', 'How fast are vaccination slots filling?', 'Slots left on Monday, by hour', `<div class="chart" data-lds-chart='${cfg(seats)}'></div>`)}</div>`,
    },
  ],
  variants: [
    ['stacked: true', 'Series stack in order, series 1 at the bottom. Negative values stack below zero.'],
    ['step: true', 'Horizontal then vertical edges: the value holds until it changes.'],
    ['series[].kind: "line", dashed: true', 'A comparison or previous period without fill.'],
    ['series[].color', '1 to 4 for `--series-n` (default: position), `"neutral"` for Other.'],
    ['refs: [{ value, label }]', 'Dashed reference lines; the scale always includes them.'],
    ['format: { prefix, suffix, decimals, compact }', 'How values read in ticks, tooltip and table ("$", "%", 12.4k).'],
    ['xFull', 'Longer x labels for the tooltip and table ("Thu 12 Nov") while ticks stay short.'],
    ['y: { min, max, ticks, hide }', 'Fix the scale (a percentage to 100) or hide the tick labels in tight cards.'],
  ],
  states: [
    ['hover / focus', 'Crosshair, dots and tooltip on the nearest point; arrow keys, Home and End move it and announce the values.'],
    ['series off', 'Legend button `aria-pressed="false"`, hollow swatch, muted label; the series collapses (stacked) or fades (overlaid).'],
    ['data change', '`drawChart(el, next)` or a range control: marks and scale move from what is on screen.'],
    ['loading, empty, error', 'See [chart states](chart-states): a skeleton of gridlines, then the chart.'],
  ],
  motion: [
    'First view: fills and bars grow from the baseline over `--d-smooth` (560 ms) on the enter curve; plain lines draw in once over 1.2 s on `--ease-inout`; dashed lines fade.',
    'Data changes, legend toggles and period switches tween every value and the scale over `--d-considered` (480 ms) on `--ease-inout`, starting from the values on screen, so a second click mid-way redirects without a jump. A different number of points first stretches the current shape over the new points.',
    'Gridlines slide with the scale; the tooltip moves on `--ease-standard` and fades over `--d-instant`.',
    'Reduced motion: no grow, no draw, no tween; values switch at once.',
  ],
  a11y: [
    'The plot is one focusable image named by `label`, which should state the takeaway, not the chart type. Arrow keys read each point aloud through the shared live region.',
    'A visually hidden table with every value is generated under the plot.',
    'Legend items are toggle buttons with `aria-pressed`; turning off the last one is refused with a shake.',
    'Series differ by position and line style as well as color: stacked bands keep their order, comparisons are dashed.',
  ],
  do: [
    'Stack only things that add up to a meaningful total.',
    'Keep the y axis at zero for areas; the fill implies an amount.',
    'Put the period in the card subtitle and the long date in `xFull`.',
  ],
  dont: [
    'Overlap more than two filled areas; stack them or use lines.',
    'Smooth the edge into curves that invent values between points.',
    'Use more than four series; fold the rest into Other (`color: "neutral"`).',
  ],
  js: '`<div class="chart" data-lds-chart=\'{ "label": "…", "x": [...], "series": [{ "name": "…", "values": [...] }] }\'>` (or a `<script type="application/json">` child) is drawn by `init()`. From code: `import { drawChart } from \'lampung-design-system\'; const chart = drawChart(el, config); chart.update({ series })` animates to new data; `chart.toggle(1)` switches a series. The chart redraws at its new width when its container resizes.',
  react: `import { Chart, Segmented } from 'lampung-design-system/react';

const [period, setPeriod] = useState<'7d' | '30d'>('30d');
<section className="chart-card" aria-labelledby="orders-q">
  <div className="chart-card__head">
    <div className="chart-card__titles"><div className="chart-card__q" id="orders-q">How do residents send complaints?</div></div>
    <div className="chart-card__actions"><Segmented className="chart-card__range" label="Period" value={period} onChange={setPeriod} options={[{ value: '7d', label: '7 days' }, { value: '30d', label: '30 days' }]} /></div>
  </div>
  <Chart config={{ label: 'Complaints per day by channel', stacked: true, x: data[period].x, series: data[period].series }} />
</section>`,
  related: ['chart-card', 'line-chart', 'bar-chart', 'chart-principles'],
};
