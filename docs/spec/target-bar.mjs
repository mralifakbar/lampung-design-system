const bar = ({ label, val, of, v, t, f, tone = '', mark = 'Goal', foot = '', end = false }) => `<div class="target${tone ? ` target--${tone}` : ''}" style="--v: ${v}%; --t: ${t}%;${f ? ` --f: ${f}%;` : ''}">
    <div class="target__meta"><span class="target__label">${label}</span><span class="target__val"><b>${val}</b> of ${of}</span></div>
    <div class="target__track" role="img" aria-label="${label}: ${val} of ${of}, goal marked at ${t} percent${f ? `, forecast ${f} percent` : ''}">${f ? '<span class="target__forecast"></span>' : ''}<span class="target__fill"></span><span class="target__mark${end ? ' is-end' : ''}"><span class="target__mark-label">${mark}</span></span></div>${foot ? `
    <div class="target__foot">${foot}</div>` : ''}
  </div>`;

export default {
  title: 'Target bar',
  group: 'Charts',
  order: 6.5,
  summary: 'A horizontal bar for progress toward a goal: the fill is where you are, a marker shows where you should be (the goal, or today\'s pace), and an optional tint ahead of the fill shows the forecast. Words above say the value against the goal.',
  when: [
    'A figure measured against a target: revenue against the quarter goal, enrolments against capacity planned, hours studied against the weekly plan.',
    'Comparing actual and expected pace: the marker sits where you should be by today, so falling behind is visible before the deadline.',
    'A short list of goals side by side (one per course, per team, per month).',
  ],
  whenNot: [
    ['A task running toward done (upload, import)', 'progress-bar'],
    ['A quantity against a hard limit (storage, seats)', 'meter'],
    ['A score in a square space', 'progress-ring'],
    ['Comparing many categories with each other', 'ranked-bars'],
    ['Parts of one whole', 'percentage-bar'],
  ],
  where: 'In a [chart card](chart-card) or a [KPI card](kpi-card) under the figure; several in a `.target-list`, 20 px apart. Full width of its container; the words wrap above the bar on phones.',
  anatomy: [
    ['.target', 'Required. Sets `--v` (fill, percent of the track), `--t` (marker) and optional `--f` (forecast).'],
    ['.target__meta', 'Required. `.target__label` and `.target__val` ("**$84,300** of $100,000").'],
    ['.target__track', 'Required. 12 px track, `role="img"` with the values in words.'],
    ['.target__fill', 'Required. The actual value, in the accent; `.target--success` once the goal is met, `.target--warning` when behind pace.'],
    ['.target__forecast', 'Optional. The projected end value as a tint behind the fill.'],
    ['.target__mark', 'Required. A 2 px marker crossing the track, with `.target__mark-label` above it. `.is-end` aligns the label to the right when the marker is near the end.'],
    ['.target__foot', 'Optional. Days left, pace in words.'],
  ],
  examples: [
    {
      title: 'Quarter goal with a forecast',
      desc: 'The fill is the revenue so far, the tint is where the trend ends the quarter, the marker is the goal. Fills grow in on first view.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 520px;" data-lds-grow aria-labelledby="tb-q">
  <div><div class="chart-card__q" id="tb-q">Will we reach the Q4 goal?</div><div class="chart-card__sub">Course sales since 1 October</div></div>
  ${bar({ label: 'Sales', val: '$84,300', of: '$100,000', v: 84.3, t: 100, f: 97, mark: 'Goal', end: true, foot: '<span>Forecast $97,000 by 31 Dec</span><span>45 days left</span>' })}
</section>`,
    },
    {
      title: 'Marker at today\'s pace',
      desc: 'Each goal\'s marker sits where the team should be today. Behind pace turns the fill to warning, and the words say so.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 520px;" aria-labelledby="tb-pace">
  <div><div class="chart-card__q" id="tb-pace">Which study plans are on track?</div><div class="chart-card__sub">Hours studied this week against each plan</div></div>
  <div class="target-list" data-lds-grow>
  ${bar({ label: 'Database Systems', val: '7 h', of: '8 h', v: 87.5, t: 62, mark: 'Today', tone: 'success', foot: '<span>Ahead of plan</span>' })}
  ${bar({ label: 'Statistics', val: '2 h', of: '6 h', v: 33, t: 62, mark: 'Today', tone: 'warning', foot: '<span>1.7 h behind plan</span>' })}
  ${bar({ label: 'Academic writing', val: '3 h', of: '5 h', v: 60, t: 62, mark: 'Today', foot: '<span>On plan</span>' })}
  </div>
</section>`,
    },
  ],
  variants: [
    ['--v, --t, --f', 'Fill, marker and forecast positions as percentages of the track.'],
    ['.target--success', 'Goal met or ahead of pace.'],
    ['.target--warning', 'Behind pace; say by how much in the foot.'],
    ['.target__mark.is-end', 'Marker label aligned to its right edge (goal at 90 % or more).'],
  ],
  states: [
    ['over the goal', 'Cap `--v` at 100 %, switch to `.target--success` and say the overshoot in words ("$4,200 over").'],
    ['no forecast yet', 'Leave out `.target__forecast` and say why in the foot ("Forecast after week 2").'],
    ['loading', 'A `.skel` line for the words and a 12 px `.skel` strip for the track.'],
  ],
  motion: [
    'Fill, forecast and marker move on `--d-considered` (480 ms) on `--ease-inout` when values change, from where they are.',
    'First view (`data-lds-grow`): fills grow from zero on the same transition; the marker stays put.',
    'Reduced motion: values switch in 120 ms.',
  ],
  a11y: [
    'The track is `role="img"` with value, goal and forecast in words; the meta line repeats the value as text.',
    'Ahead or behind is said in the foot, never only by the fill color.',
    'The marker label is real text, 12 px, with tabular figures.',
  ],
  do: [
    'Say the goal in the meta ("of $100,000") and what the marker means ("Goal", "Today").',
    'Use the pace marker for goals with a deadline.',
  ],
  dont: [
    'Use a target bar for something without a goal; that is a [ranked bar](ranked-bars) or a [meter](meter).',
    'Stack more than one fill and one forecast in a track.',
    'Color a fill red for being behind; warning is enough, words carry the rest.',
  ],
  js: 'Optional: `data-lds-grow` on the bar or its list plays the first-view entrance.',
  related: ['progress-bar', 'meter', 'kpi-card', 'ranked-bars'],
};
