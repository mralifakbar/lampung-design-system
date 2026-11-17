import { days } from './_chart-data.mjs';

const d = days(90);
const incidents = { 12: ['warn', 'Slow photo uploads for 40 minutes'], 37: ['down', 'Sign-in unavailable for 18 minutes'], 38: ['warn', 'Slow sign-in for 25 minutes'], 71: ['warn', 'Notification emails delayed 1 hour'], 84: ['down', 'Report submissions failed for 9 minutes'] };
const bars = (offset = 0) => d.long.map((day, i) => {
  const hit = incidents[(i + offset) % 90];
  const cls = hit ? (hit[0] === 'down' ? 'is-down' : 'is-warn') : 'is-ok';
  return `<i class="${cls}" data-label="${day}: ${hit ? hit[1] : 'no incidents'}"></i>`;
}).join('');
const service = (name, pct, offset, status) => `<div class="uptime-box">
    <div class="cluster" style="justify-content: space-between; --gap: 8px;"><span class="status status--${status[0]}"><i></i>${name}</span><span style="font: var(--type-footnote); color: var(--text-subtle); font-variant-numeric: tabular-nums;">${pct} uptime</span></div>
    <div class="uptime" data-lds-uptime tabindex="0" role="img" aria-label="${name}, last 90 days: ${pct} uptime. Arrow keys read each day.">${bars(offset)}</div>
    <div class="uptime__axis" aria-hidden="true"><span><span class="uptime__long">90 days ago</span><span class="uptime__short">30 days ago</span></span><span>Today</span></div>
    <div class="uptime__now">${status[1]}</div>
  </div>`;

export default {
  title: 'Uptime bars',
  group: 'Charts',
  order: 7.5,
  summary: 'One thin bar per day (or hour) in a row, colored by how that period went: no issues, degraded, or down. The pattern of incidents over 90 days reads at a glance; pointing at a bar, or using the arrow keys, says what happened that day.',
  when: [
    'The history of a running service on a status or infrastructure page: 90 days of a website, an API, sign-in, payments.',
    'Any daily pass, partial, fail record where streaks and clusters matter: nightly backups, scheduled imports, daily check-ins.',
  ],
  whenNot: [
    ['The state of a service right now', 'status-dot'],
    ['A quantity per day over months (hours, submissions)', 'heatmap'],
    ['Events of one record in order', 'timeline'],
    ['A value over time', 'area-chart'],
  ],
  where: 'One row per service in a card or a status page section, full width. The wrapper `.uptime-box` is a container: under 480 px it shows the last 30 days and the axis says so.',
  anatomy: [
    ['.uptime-box', 'Required. Container for the row, its axis and the readout.'],
    ['.uptime[data-lds-uptime]', 'Required. The bars: `role="img"`, an `aria-label` with the overall figure, `tabindex="0"` for the arrow keys.'],
    ['i', 'Required. One bar per period, oldest first. `.is-ok`, `.is-warn`, `.is-down`, or no class for no data. `data-label` says the day and what happened.'],
    ['.uptime__axis', 'Recommended. Start and end of the period; `.uptime__long` and `.uptime__short` swap with the width.'],
    ['.uptime__now', 'Recommended. The readout line: the current state at rest, the pointed day on hover or arrows.'],
  ],
  examples: [
    {
      title: 'Services over 90 days',
      desc: 'Point at a bar or focus a row and use the arrow keys: the line under it says the day and the incident. Narrow the window: the last 30 days remain.',
      stage: 'block',
      html: `<section class="chart-card" style="max-width: 720px;" aria-labelledby="up-q">
  <div><div class="chart-card__q" id="up-q">Has the citizen complaint service been reliable?</div><div class="chart-card__sub">Daily status of each service, last 90 days</div></div>
  <div class="stack" style="--gap: 24px;">
  ${service('Website', '99.97%', 0, ['ok', 'Working normally'])}
  ${service('Sign-in', '99.91%', 20, ['ok', 'Working normally'])}
  ${service('Report submissions', '99.86%', 47, ['warn', 'Slower than usual since 09:10'])}
  </div>
</section>`,
    },
  ],
  variants: [
    ['i.is-ok / .is-warn / .is-down', 'No issues, degraded, down: success, warning and danger colors. Leave the class off for days without data.'],
    ['hours instead of days', 'Same markup with 24 or 48 bars; the axis says "24 hours ago" and "Now".'],
  ],
  states: [
    ['pointed day', 'That bar grows 12 % taller, the others fade to 45 %, the readout shows its `data-label`.'],
    ['no data yet', 'Bars without a class in the track color, and the readout says when tracking started.'],
    ['loading', 'One `.skel` strip 32 px tall.'],
  ],
  motion: [
    'The pointed bar scales up on `--spring-snappy`; fading the others takes `--d-fast`. Moving along the row slides the emphasis, nothing jumps.',
    'Reduced motion: emphasis changes in 120 ms, no scaling.',
  ],
  a11y: [
    'The row is one `role="img"` with the overall figure; with focus, Left and Right move day by day, Home and End jump, and each day is announced through the shared live region.',
    'Every bar has words in `data-label`; color never stands alone, and the service status above repeats the current state with a [status dot](status-dot).',
    'Bars are at least 2 px wide with 2 px gaps; the narrow view drops old days rather than squeezing them.',
  ],
  do: [
    'Show the overall figure ("99.91% uptime") next to the service name.',
    'Say what happened, how long, in each `data-label`.',
  ],
  dont: [
    'Make each bar its own button or link; use one focus stop per row.',
    'Show only green: if nothing went wrong, say "No incidents in 90 days" in the readout.',
  ],
  js: '`data-lds-uptime` on `.uptime`: pointer and arrow keys write the bar\'s `data-label` into the `.uptime__now` of the same `.uptime-box` and mark the bar `.is-on`; leaving restores the resting text.',
  related: ['status-dot', 'heatmap', 'timeline', 'chart-card'],
};
