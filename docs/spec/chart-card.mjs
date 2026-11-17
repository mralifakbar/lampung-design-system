import { days, wave, cfg, sum, fmt } from './_chart-data.mjs';

// Business permit applications, filed online and at the service counter
const d90 = days(90), web = wave(180, { base: 38, trend: 0.5, seed: 3 }), stall = wave(180, { base: 25, trend: 0.15, week: 0.3, seed: 7 });
const slice = (n) => ({ x: d90.short.slice(-n), xFull: d90.long.slice(-n), series: [{ name: 'Website', values: web.slice(-n) }, { name: 'Counter', values: stall.slice(-n) }] });
const total = (n) => sum(web.slice(-n)) + sum(stall.slice(-n));
const before = (n) => sum(web.slice(-2 * n, -n)) + sum(stall.slice(-2 * n, -n));
const change = (n) => `${Math.round((total(n) / before(n) - 1) * 100)}%`;
const set = (n, words) => ({ ...slice(n), figure: fmt(total(n)), delta: change(n), note: `against the ${words} before`, label: `Permit applications per day by channel, last ${words}: ${fmt(total(n))} in total.` });
const orders = {
  xName: 'Day', stacked: true, total: true, height: 220,
  ...set(30, '30 days'),
  sets: { '7d': set(7, '7 days'), '30d': set(30, '30 days'), '90d': set(90, '3 months') },
};

const menu = (id, name) => `<div style="position: relative;">
        <button class="icon-btn" aria-label="More actions for ${name}" aria-haspopup="menu" aria-expanded="false" data-lds-menu="${id}"><span class="ic" aria-hidden="true">more_horiz</span></button>
        <div class="menu menu--right" id="${id}" role="menu" aria-label="${name}" style="top: calc(100% + 6px); right: 0;">
          <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Download CSV</button>
          <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">content_copy</span>Copy link to chart</button>
        </div>
      </div>`;

const full = `<section class="chart-card" aria-labelledby="cc-orders-q">
  <div class="chart-card__head">
    <div class="chart-card__titles"><div class="chart-card__q" id="cc-orders-q">How do residents apply for business permits?</div><div class="chart-card__sub">Applications per day, website and counter</div></div>
    <div class="chart-card__actions">
      <div class="seg chart-card__range" role="group" aria-label="Period" data-lds-segmented data-lds-chart-for="cc-orders">
        <span class="seg__thumb"></span>
        <button type="button" class="seg__btn" aria-pressed="false" data-set="7d">7 days</button>
        <button type="button" class="seg__btn" aria-pressed="true" data-set="30d">30 days</button>
        <button type="button" class="seg__btn" aria-pressed="false" data-set="90d">3 months</button>
      </div>
      ${menu('cc-orders-menu', 'Permit applications chart')}
    </div>
  </div>
  <div class="chart-card__figure"><div class="chart-card__big" data-chart-figure>${fmt(total(30))}</div><span class="delta delta--pill delta--good" data-chart-delta><span class="ic" aria-hidden="true">arrow_upward</span>${change(30)}</span><span class="chart-card__sub" data-chart-note>against the 30 days before</span></div>
  <div class="chart" id="cc-orders" data-lds-chart='${cfg(orders)}'></div>
  <div class="chart-card__foot"><span>Updated 16 Nov 2026, 09:40</span><a class="btn btn--plain btn--sm" href="#cc-orders-q">Open the applications report<span class="ic" aria-hidden="true">chevron_right</span></a></div>
</section>`;

const cats = { label: 'Puskesmas visits per weekday this week. Thursday is busiest with 31 visits.', x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], series: [{ name: 'Visits', values: [18, 24, 22, 31, 27, 12, 6], kind: 'bar' }], highlight: 3, height: 180 };
const scores = { label: 'Average service satisfaction score per week. This year rose from 64 to 81; last year stayed near 70.', x: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'], kind: 'line', series: [{ name: 'This year', values: [64, 67, 66, 71, 74, 73, 78, 81] }, { name: 'Last year', values: [68, 70, 69, 71, 70, 72, 71, 70], dashed: true, color: 4 }], y: { min: 50, max: 90 }, height: 180 };

export default {
  title: 'Chart card',
  group: 'Charts',
  order: 1.5,
  summary: 'The frame every dashboard chart sits in: the question as its title, what is measured under it, then optional actions (a range control, a menu), the headline figure with its change, the chart, and a footer with the source time or a link to the full report.',
  when: [
    'Any chart on a dashboard or report page: the card gives it a question, a period and a place for the one number people came for.',
    'The reader should switch the period (7 days, 30 days, 3 months) or export the data without leaving the dashboard.',
    'Several charts sit in one grid and need the same header, spacing and footer so the page reads as one system.',
  ],
  whenNot: [
    ['One metric with its change and a tiny trend, in a row of four', 'kpi-card'],
    ['A few figures without any chart', 'stat-row'],
    ['A chart inside an article or a report body', 'line-chart', 'Put the plot straight in the text column with a caption; a card inside prose looks like an ad.'],
    ['The chart is the whole page (a full report)', 'page-header', 'The page header carries the title and the range control; the chart fills the column.'],
  ],
  where: 'In an `auto-grid` with `--min: 320px` on dashboards, or full width for a time series. Never inside another card. The header is a container: under 440 px the range control drops under the title and spans the card, the menu stays at the end of the title row.',
  anatomy: [
    ['section.chart-card', 'Required. 20 px padding, 18 px radius, `--line` ring, 14 px between parts. `aria-labelledby` points at the question.'],
    ['.chart-card__head', 'Optional. A wrapping row: titles at the start, actions at the end. A size container for the range control.'],
    ['.chart-card__titles', 'Holds `.chart-card__q` (the question, required) and `.chart-card__sub` (what is measured, over which period).'],
    ['.chart-card__actions', 'Optional. A `.seg.chart-card__range` for the period and an `.icon-btn` menu. At most one button besides the menu.'],
    ['.chart-card__figure', 'Optional. `.chart-card__big` plus a [trend delta](trend-delta) and what it compares with.'],
    ['.chart / .bars / .donut-chart …', 'Required. The chart itself.'],
    ['.chart-card__foot', 'Optional. A hairline, then the data time on the start and one plain link to the full view on the end.'],
  ],
  examples: [
    {
      title: 'Period control, menu, figure and footer',
      desc: 'Switch the period: the stacked areas move from where they are to the new data, the scale eases to its new range. Point at the plot (or focus it and use the arrow keys) for the day, each channel and the total. Click a legend item to hide a channel. Narrow the window: the period control takes its own row.',
      stage: 'block',
      replay: true,
      html: full,
    },
    {
      title: 'A dashboard row',
      desc: 'Two cards share one grid. The bar chart highlights the answer; the line chart compares this year with last year, dashed.',
      stage: 'block',
      replay: true,
      html: `<div class="auto-grid" style="--min: 300px;">
  <section class="chart-card" aria-labelledby="cc-busy">
    <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cc-busy">Which day is the puskesmas busiest?</div><div class="chart-card__sub">Patient visits per weekday, this week</div></div></div>
    <div class="chart" data-lds-chart='${cfg(cats)}'></div>
  </section>
  <section class="chart-card" aria-labelledby="cc-score">
    <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="cc-score">Is resident satisfaction improving?</div><div class="chart-card__sub">Average survey score per week, out of 100</div></div></div>
    <div class="chart" data-lds-chart='${cfg(scores)}'></div>
    <div class="chart-card__foot"><span>Example data</span><a class="btn btn--plain btn--sm" href="#cc-score">See every survey<span class="ic" aria-hidden="true">chevron_right</span></a></div>
  </section>
</div>`,
    },
  ],
  variants: [
    ['.chart-card__range', 'A segmented control for two to four periods. Add `data-lds-chart-for="chartId"` and `data-set` on each button to switch a [data chart](area-chart) to `config.sets[key]`. More than four periods: a [date range](date-range) picker instead.'],
    ['.chart-card__actions .icon-btn', 'One menu for export, copy link, full screen. Never a row of icon buttons.'],
    ['.chart-card__figure', 'The headline number and its change. Leave it out when the chart has no single answer.'],
    ['.chart-card__foot', 'Data time and one link. Leave it out when there is nothing to say.'],
  ],
  states: [
    ['loading, empty, error', 'The card keeps its size and title; see [chart states](chart-states).'],
    ['refreshing', 'Keep the chart; a small [spinner](spinner) by the title while new data loads, then the marks move to it.'],
    ['period changed', 'The chart animates; update the figure with [rolling number](rolling-number) and the delta in place.'],
  ],
  motion: [
    'The period thumb slides on `--spring-smooth` (segmented control).',
    'The chart moves from what is on screen to the new data over `--d-considered` (480 ms) on `--ease-inout`; a switch mid-way starts from the current shape.',
    'The menu opens from its corner on the overlay recipe; the card itself never moves.',
    'Reduced motion: the data jumps, the thumb cross-fades.',
  ],
  a11y: [
    'Make the card a `section` labelled by its question, so the chart is a landmark people can jump to.',
    'The range control is a group of toggle buttons with `aria-pressed` and a group label ("Period").',
    'The menu button names its chart: "More actions for Permit applications chart".',
    'The headline figure and delta are real text; the delta says the direction in words for screen readers when the arrow is the only cue (add `.sr-only` "up" or "down").',
  ],
  do: [
    'Write the title as the question the chart answers; put the period and unit in the subtitle.',
    'Keep the same header order on every card: titles, range, menu.',
    'Say once on the page that the numbers are examples.',
  ],
  dont: [
    'Nest a chart card in another card, or put two charts in one card.',
    'Add a row of icon buttons; fold extra actions into the menu.',
    'Use a select for two or three periods; the segmented control shows them all.',
  ],
  js: '`data-lds-chart-for="chartId"` on a `.seg` (buttons with `data-set`) or a native `<select>` (options with `value`) calls `drawChart` on that chart with `config.sets[key]`; see [area chart](area-chart) for the chart config. A set may also carry `figure`, `delta` and `note`: they replace the text of `[data-chart-figure]`, `[data-chart-delta]` and `[data-chart-note]` in the same card, which rise in once. The chart, legend, crosshair and table come from `data-lds-chart`.',
  related: ['area-chart', 'kpi-card', 'chart-states', 'chart-principles'],
};
