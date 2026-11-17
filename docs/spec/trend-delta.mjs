const d = (dir, good, val, note, pill = false) => `<span class="delta delta--${dir} delta--${good}${pill ? ' delta--pill' : ''}"><span class="ic" aria-hidden="true">arrow_upward</span>${val}<span class="sr-only"> ${dir === 'flat' ? 'no change' : dir} ${note}</span></span>`;

export default {
  title: 'Trend delta',
  group: 'Data display',
  order: 19,
  summary: 'The change next to a figure: an arrow for the direction, a color for what it means, the amount in tabular figures and a sentence for screen readers. Direction and meaning are separate, because a falling number can be good news.',
  when: [
    'A key figure on a dashboard compared with the previous period: levy income up 12.5 %, complaints down 3 %, registrations flat.',
    'A row in a table or list where the change matters as much as the value: UMKM sales this week, a posyandu\'s immunisation rate.',
    'A stat row or sparkline stat that needs one honest word about the trend.',
  ],
  whenNot: [
    ['The state of a record (Paid, Overdue)', 'badge'],
    ['The trend over many points matters', 'sparkline-stat', 'Add the delta under the number, not instead of the line'],
    ['A count of things that need the person', 'count'],
  ],
  where: 'Right after or under the figure it qualifies, on the same baseline, never on its own. In a stat row it goes in the sub line; in a table it gets its own right-aligned column.',
  anatomy: [
    ['.delta', 'Required. Inline row: arrow icon, signed amount, and the `.sr-only` sentence.'],
    ['.delta--up | --down | --flat', 'Required. Direction: the `arrow_upward` icon points up, turns 180 degrees down, or lies flat at 90 degrees.'],
    ['.delta--good | --bad | --neutral', 'Required. Meaning: success, danger or subtle text color. Pick it from what the number means, not from the arrow.'],
    ['.sr-only', 'Required. The words the arrow and color stand for: "up from last month".'],
    ['.delta__note', 'Optional visible comparison after the amount ("vs October"), muted.'],
  ],
  examples: [
    {
      title: 'Next to key figures',
      desc: 'Levy income rose (good), new applicants fell (bad), complaints fell (good, because fewer complaints is better), the completion rate stayed flat.',
      stage: 'block',
      html: `<div class="auto-grid" style="--min: 180px;">
  <div class="stack" style="--gap: 4px;"><span class="section__sub">Levy income</span><span class="chart-card__big">Rp 128.4 m</span>${d('up', 'good', '+12.5%', 'from last month')}</div>
  <div class="stack" style="--gap: 4px;"><span class="section__sub">New applicants</span><span class="chart-card__big">1,234</span>${d('down', 'bad', '−20%', 'from last month')}</div>
  <div class="stack" style="--gap: 4px;"><span class="section__sub">Complaints</span><span class="chart-card__big">18</span>${d('down', 'good', '−3', 'from last month')}</div>
  <div class="stack" style="--gap: 4px;"><span class="section__sub">Completed within SLA</span><span class="chart-card__big">94.6%</span>${d('flat', 'neutral', '0.0 pt', 'from last month')}</div>
</div>`,
    },
    {
      title: 'Pill, with a visible comparison',
      desc: '`delta--pill` puts the delta on its tint where it sits beside a large number; `.delta__note` names the comparison once.',
      html: `${d('up', 'good', '+8.2%', 'from October', true)} ${d('down', 'bad', '−4.1%', 'from October', true)} <span class="delta delta--up delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>+320<span class="delta__note">vs October</span><span class="sr-only"> up from October</span></span>`,
    },
    {
      title: 'Updating in place',
      desc: 'Press the button: `setDelta()` rewrites the amount, turns the arrow on a spring when the direction flips and recolors by meaning.',
      html: `<span class="delta delta--up delta--good" id="dl-demo" data-good="up" data-note="from last week"><span class="ic" aria-hidden="true">arrow_upward</span>+4.2%<span class="sr-only"> up from last week</span></span>
<button class="btn btn--secondary btn--sm" onclick="import('../../js/lds.js').then((m) => { const v = Math.round((Math.random() * 30 - 15) * 10) / 10; m.setDelta(document.getElementById('dl-demo'), v); })">New week</button>`,
      code: `<span class="delta delta--up delta--good" id="weekly" data-good="up" data-note="from last week">…</span>
<script type="module">
  import { setDelta } from 'lampung-design-system/js';
  setDelta(document.getElementById('weekly'), -3.1); // arrow turns down, color turns to danger
</script>`,
    },
  ],
  variants: [
    ['.delta', 'Inline text, for sub lines and table cells.'],
    ['.delta--pill', 'On its tint, 22 px tall, beside a large figure.'],
  ],
  states: [
    ['good', '`--success-text` (and `--success-tint` on a pill).'],
    ['bad', '`--danger-text` (and `--danger-tint`).'],
    ['neutral', '`--text-subtle`; for no change, or a change that is neither good nor bad.'],
    ['.is-changed', 'Set by `setDelta()`: the text rises in once.'],
  ],
  motion: [
    'When the direction flips, the arrow turns 180 degrees on `--spring-smooth` over `--d-smooth`; color follows at once.',
    '`setDelta()` lets the new amount rise in over `--d-standard` on `--ease-enter` (the system text swap).',
    'Reduced motion: no rise; the arrow still turns, which is a state, not decoration.',
  ],
  a11y: [
    'The arrow is `aria-hidden`; the `.sr-only` sentence says direction and comparison ("up from last month"), so color and arrow are never the only signal.',
    'Use the true minus sign (−) for negative amounts and a plus sign for positive ones.',
    'Success and danger text tokens hold 4.5:1 on the canvas, the fill and their tints in both themes.',
  ],
  do: [
    'Color by meaning: fewer complaints, faster response times and lower costs are good when they go down.',
    'Say once on the page what the comparison is (last month, last week); repeat it only in the `.sr-only` text.',
  ],
  dont: [
    'Show a delta without the figure it qualifies.',
    'Use the accent color for a trend, or red and green with no arrow and no words.',
    'Round so much that a change shows as 0.0 % with a colored arrow.',
  ],
  js: 'No hook needed for static markup. `setDelta(el, change, { goodWhen, unit, note, digits })` rewrites a `.delta`: direction class, meaning class (from `goodWhen`, default `data-good` or "up"), signed amount with `unit` (default `data-unit` or "%") and the `.sr-only` sentence (from `note`, default `data-note`).',
  related: ['stat-row', 'sparkline-stat', 'badge', 'table'],
};
