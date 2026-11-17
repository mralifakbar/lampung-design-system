// Sparkline paths for a 220 x 64 box.
const spark = (data, lo, hi) => {
  const x = (i) => +(4 + i * (212 / (data.length - 1))).toFixed(1);
  const y = (v) => +(60 - ((v - lo) / (hi - lo)) * 52).toFixed(1);
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ');
  const last = data.length - 1;
  return { line, area: `${line} L${x(last)} 64 L${x(0)} 64 Z`, ex: x(last), ey: y(data[last]) };
};
const att = spark([88, 87, 89, 88, 90, 89, 91, 90, 92, 91, 93, 92], 85, 94);
const hrs = spark([14, 12, 11, 12, 10, 9, 10, 8, 9, 7, 8, 7], 5, 15);

const card = ({ q, sub, big, badge, s, label }) => `<div class="chart-card">
  <div><div class="chart-card__q">${q}</div><div class="chart-card__sub">${sub}</div></div>
  <div class="cluster" style="justify-content: space-between; align-items: flex-end; --gap: 20px;">
    <div><div class="chart-card__big">${big}</div>${badge}</div>
    <svg viewBox="0 0 220 64" style="width: 220px; max-width: 100%; height: 64px;" role="img" aria-label="${label}">
      <path class="series-area" d="${s.area}"></path>
      <path class="series-line draw" pathLength="1200" d="${s.line}"></path>
      <circle cx="${s.ex}" cy="${s.ey}" r="4" fill="var(--series-1)" stroke="var(--bg-base)" stroke-width="2"></circle>
    </svg>
  </div>
</div>`;

export default {
  title: 'Sparkline stat',
  group: 'Charts',
  order: 2,
  summary: 'One headline number with a word on its direction and a tiny line of its recent history, in a chart card. The number is the point; the sparkline only shows the shape of the trend.',
  when: [
    'A dashboard tile for one metric people check often, where the trend matters as much as the value: reports closed on time, average waiting time, satisfaction score.',
    'A row of two to four such tiles at the top of a report.',
  ],
  whenNot: [
    ['Several key figures with no history to show', 'stat-row', 'It needs no cards; a row of plain figures is quieter.'],
    ['The reader needs to read values at specific times', 'line-chart'],
    ['Progress toward a target', 'progress-ring'],
    ['A number that ticks up live', 'rolling-number'],
    ['Comparing the metric across categories', 'bar-chart'],
  ],
  where: 'At the top of a dashboard or report, in an `auto-grid` with `--min: 300px`. On phones tiles stack full width; the sparkline keeps its 64 px height and shrinks in width.',
  anatomy: [
    ['.chart-card', 'Required. The tile.'],
    ['.chart-card__q / __sub', 'Required. The question and the period ("Attendance rate, last 12 weeks").'],
    ['.chart-card__big', 'Required. The current value, 32 px tabular.'],
    ['.badge', 'Recommended. The change in words with `trending_up` or `trending_down`, colored by whether it is good, not by direction.'],
    ['svg[role=img]', 'Required. 220 by 64 viewBox with `.series-area`, `.series-line` (`.draw` to draw in once) and an end dot.'],
  ],
  examples: [
    {
      title: 'Rising and good',
      desc: 'The line draws in once; the end dot marks the value shown.',
      replay: true,
      stage: 'block',
      html: `<div class="auto-grid" style="--min: 300px;">
${card({ q: 'How fast are citizen reports closed?', sub: 'Reports closed on time, last 12 weeks', big: '92%', badge: '<div class="badge badge--success" style="margin-top: 8px;"><span class="ic" aria-hidden="true">trending_up</span>4 points above the start of the year</div>', s: att, label: 'Reports closed on time rising from 88 to 92 percent over 12 weeks' })}
${card({ q: 'How long is the queue at the desk?', sub: 'Average waiting time per week, last 12 weeks', big: '7 min', badge: '<div class="badge badge--warning" style="margin-top: 8px;"><span class="ic" aria-hidden="true">trending_down</span>Half of week 1</div>', s: hrs, label: 'Waiting time falling from 14 to 7 minutes over 12 weeks' })}
</div>`,
    },
  ],
  states: [
    ['loading', 'Skeleton blocks for the number and the line; see [chart states](chart-states).'],
    ['no history', 'With fewer than three points, drop the sparkline and show the number alone.'],
    ['bad trend', '`badge--warning` or `badge--danger` with the direction icon; falling can be good (fewer late submissions), so color by meaning.'],
  ],
  motion: [
    'First view: the line draws in with `.draw` (stroke dash offset to 0 over 1.2 s on `--ease-inout`). Give the path `pathLength="1200"` so the dash matches its length exactly.',
    'Value updates do not redraw; swap the number with [number count](number-count) or [rolling number](rolling-number).',
    'Reduced motion: the line appears drawn.',
  ],
  a11y: [
    'The svg is `role="img"` with an `aria-label` that states start, end and period. The number and badge are real text.',
    'The badge says the direction in words; the icon is decorative.',
    'Do not make the tile a link unless it opens the full chart; then the whole card is the link with the question as its name.',
  ],
  do: [
    'Lead with the number; keep the line small and unlabelled.',
    'Say what the change is relative to ("above the start of the year").',
  ],
  dont: [
    'Add axes, ticks or tooltips to a sparkline.',
    'Color the badge green just because the line goes up.',
    'Show more than four tiles in a row.',
  ],
  related: ['stat-row', 'line-chart', 'chart-principles', 'badge'],
};
