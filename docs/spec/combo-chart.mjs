import { cfg, months } from './_chart-data.mjs';

const m = months(0, 12);
const sales = [31, 34, 29, 38, 41, 37, 44, 47, 43, 52, 56, 0];
const plan = [32, 33, 34, 36, 38, 40, 42, 44, 46, 49, 52, 55];
const revenue = {
  label: 'Regional tax collected per month against plan, 2026. Ahead of plan since July; November Rp 56 B against Rp 52 B planned. December still open.',
  x: m, xFull: m.map((x) => `${x} 2026`), xName: 'Month', format: { prefix: 'Rp ', suffix: ' B' },
  series: [{ name: 'Collected', values: sales, kind: 'bar' }, { name: 'Plan', values: plan, kind: 'line', dashed: true, color: 4 }],
  refs: [{ value: 50, label: 'Threshold Rp 50 B' }],
  height: 240,
};
const hours = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const study = {
  label: 'Waste collected per day this week against a daily target of 2 tonnes. Target met on Wednesday, Friday and Saturday.',
  x: hours, xName: 'Day', format: { decimals: 1, suffix: ' t' },
  series: [{ name: 'Waste collected', values: [1.5, 2, 2.5, 1, 3, 4, 0.5], kind: 'bar', color: 3 }, { name: 'Daily target', values: [2, 2, 2, 2, 2, 2, 2], kind: 'line', dashed: true, color: 'neutral' }],
  height: 200,
};

export default {
  title: 'Combo chart',
  group: 'Charts',
  order: 4.6,
  summary: 'Bars for what happened in each period and a line for what was expected (a plan, a forecast, last year), on one shared scale, with optional dashed reference lines for fixed thresholds. Drawn from data like the area chart.',
  when: [
    'Actual against plan per month or week: regional tax against plan, waste collected against a target, registrations against forecast.',
    'Discrete periods (bars) with a continuous expectation running through them (a line).',
    'A fixed threshold the reader checks every period: a safe level, a maximum, a minimum standard (a reference line).',
  ],
  whenNot: [
    ['Two measures in different units on two axes', 'line-chart', 'Two y axes invite false comparisons. Split them into two charts that share the x axis, or index both to 100.'],
    ['Only the actuals, no expectation', 'bar-chart'],
    ['One total against one goal', 'target-bar'],
    ['Volume over many days', 'area-chart'],
  ],
  where: 'In a [chart card](chart-card), full width for 12 months, half width for a week. Height 200 to 240 px.',
  anatomy: [
    ['.chart[data-lds-chart]', 'Required. Same engine as the [area chart](area-chart); series take `kind: "bar"` or `"line"`.'],
    ['.chart__bar', 'Bars per period, rounded on top, 26 px wide at most per series; several bar series group side by side.'],
    ['.chart__series.is-dashed', 'The expectation as a dashed line through the bar centers.'],
    ['.chart__ref', 'Fixed thresholds, dashed, labelled at the right end.'],
    ['.chart__band', 'On hover or focus the whole period is tinted and the tooltip lists both series.'],
  ],
  examples: [
    {
      title: 'Collected against plan',
      desc: 'Bars grow from the baseline on first view; the plan line fades in. Point at a month: the whole column is tinted and the tooltip gives both values. Switch the plan off in the legend.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" aria-labelledby="cb-q">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cb-q">Is tax collection ahead of plan?</div><div class="chart-card__sub">Regional tax collected per month, in billion rupiah, 2026</div></div></div>
  <div class="chart" data-lds-chart='${cfg(revenue)}'></div>
</section>`,
    },
    {
      title: 'A week against a daily target',
      desc: 'A flat target line in the neutral color: days above it are easy to count.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 520px;" aria-labelledby="cb-w">
  <div><div class="chart-card__q" id="cb-w">Was the waste collection target met?</div><div class="chart-card__sub">Waste collected per day in tonnes, this week</div></div>
  <div class="chart" data-lds-chart='${cfg(study)}'></div>
</section>`,
    },
  ],
  variants: [
    ['series[].kind: "bar"', 'One bar series per period; two or three bar series group side by side.'],
    ['series[].kind: "line", dashed: true', 'The expectation through the bar centers.'],
    ['refs', 'Fixed thresholds with their words.'],
    ['format: { prefix: "$", compact: true }', 'Ticks read $40k, tooltips $41,000. For rupiah use `prefix: "Rp "` and put the unit in `suffix`.'],
  ],
  states: [
    ['open period', 'Leave the current month at 0 or out, and say "December still open" in the label.'],
    ['hover / focus', 'Tinted column, tooltip with every series; arrow keys move month by month.'],
    ['loading, empty, error', 'See [chart states](chart-states).'],
  ],
  motion: [
    'First view: bars grow from the baseline over `--d-smooth` (560 ms) on the enter curve; dashed lines fade in.',
    'Data changes and toggles tween values and the scale over `--d-considered` on `--ease-inout`, from what is on screen.',
    'Reduced motion: drawn at once.',
  ],
  a11y: [
    'Same as the [area chart](area-chart): one focusable image with the takeaway as its name, arrow keys announce each period, a hidden table with every value.',
    'The expectation is dashed and named in the legend, so it differs by more than color.',
  ],
  do: [
    'Use one scale for both series; they must be in the same unit.',
    'Name the expectation for what it is: Plan, Forecast, Last year.',
  ],
  dont: [
    'Put a second y axis on the right.',
    'Draw the expectation as bars too; the reader then compares four bar heights instead of one bar with a line.',
  ],
  js: 'Same as the [area chart](area-chart): `data-lds-chart` or `drawChart(el, config)`.',
  related: ['area-chart', 'bar-chart', 'target-bar', 'chart-card'],
};
