import { cfg } from './_chart-data.mjs';

const capacity = { type: 'gauge', label: 'Vaccination quota filled: 78 of 120 places.', value: 78, max: 120, center: '65%', unit: '78 of 120 places', minLabel: '0', maxLabel: '120',
  sets: { sat: { value: 78, center: '65%', unit: '78 of 120 places', label: 'Saturday: 78 of 120 places booked.', tone: null }, sun: { value: 112, center: '93%', unit: '112 of 120 places', label: 'Sunday: 112 of 120 places booked, nearly full.', tone: 'warning' } } };
const g = (o) => `<div data-lds-chart='${cfg({ type: 'gauge', ...o })}' style="--size: 180px;"></div>`;
const stock = { type: 'gauge', label: 'Stock of 240 medicines: 186 available, 38 running low, 16 out of stock.', segments: [{ name: 'Available', value: 186, color: 3 }, { name: 'Running low', value: 38, color: 2 }, { name: 'Out of stock', value: 16, color: 'neutral' }], center: '78%', unit: 'available' };

export default {
  title: 'Gauge',
  group: 'Charts',
  order: 5.5,
  summary: 'A half ring with the value in its opening: one figure against its known range (quota booked, a score, a load), or a row of ticks shared out between a few states (available, low, out of stock). Reads at a glance; the words under the number carry the detail.',
  when: [
    'One value against a fixed range where "how full" is the question: capacity booked, quota used, a health score, a server\'s load.',
    'A small set of states that share one total and the main share matters most: medicine stock available, low, out; reports open, waiting, closed.',
    'A dashboard tile with room for a shape but not for a chart.',
  ],
  whenNot: [
    ['A score in a small square (a card corner, a list row)', 'progress-ring'],
    ['Storage or quota in a narrow row', 'meter'],
    ['Progress toward a goal with a deadline', 'target-bar'],
    ['Parts of a whole where every part matters', 'donut'],
    ['Change over time', 'area-chart'],
  ],
  where: 'In a [chart card](chart-card) or a [KPI card](kpi-card)-sized tile, centered, 160 to 240 px wide (`--size`). It scales down with its container; the number stays 28 px.',
  anatomy: [
    ['.gauge', 'Required. `--size` sets the width; the svg keeps a 200 × 112 viewBox.'],
    ['svg[role=img]', 'Required. `aria-label` states the value and the range in words.'],
    ['.gauge__track / .gauge__val', 'One value: a 16 px track and the value arc (`--v` as a percent), in the accent or a tone.'],
    ['.gauge__tick', 'Shared ticks: 32 short marks, each colored by the part it belongs to (`--c`).'],
    ['.gauge__label', 'Required. `b` for the number, `span` for what it counts.'],
    ['.gauge__ends', 'Optional. The two ends of the range under the ring.'],
  ],
  examples: [
    {
      title: 'Capacity, switching days',
      desc: 'Switch the day: the arc moves over 480 ms from where it is, and turns to warning when the quota is nearly full. The arc sweeps in on first view.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 380px; align-items: center;" aria-labelledby="ga-q">
  <div class="chart-card__head" style="width: 100%;"><div class="chart-card__titles"><div class="chart-card__q" id="ga-q">How full is the vaccination quota?</div><div class="chart-card__sub">Places booked at the kelurahan hall</div></div>
    <div class="chart-card__actions"><div class="seg chart-card__range" role="group" aria-label="Day" data-lds-segmented data-lds-chart-for="ga-hall" style="width: 180px;"><span class="seg__thumb"></span><button type="button" class="seg__btn" aria-pressed="true" data-set="sat">Saturday</button><button type="button" class="seg__btn" aria-pressed="false" data-set="sun">Sunday</button></div></div>
  </div>
  <div id="ga-hall" data-lds-chart='${cfg(capacity)}' style="--size: 220px;"></div>
</section>`,
    },
    {
      title: 'Tones',
      desc: 'Plain for a neutral level, success for good, warning for close to a limit. The tone repeats what the words say.',
      replay: true,
      html: `<div class="docs-row" style="gap: 32px;">
  ${g({ label: 'Average satisfaction score 82 of 100.', value: 82, max: 100, tone: 'success', unit: 'satisfaction score' })}
  ${g({ label: 'Server load at 64 percent.', value: 64, max: 100, center: '64%', unit: 'server load' })}
  ${g({ label: 'Storage 91 percent used.', value: 91, max: 100, center: '91%', tone: 'warning', unit: 'storage used' })}
</div>`,
    },
    {
      title: 'Shared ticks',
      desc: 'Thirty-two ticks shared by three states; the legend gives the counts. The ticks light up from the left on first view.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 380px; align-items: center;" aria-labelledby="ga-stock">
  <div style="width: 100%;"><div class="chart-card__q" id="ga-stock">Does the puskesmas have enough medicine?</div><div class="chart-card__sub">240 medicines, today</div></div>
  <div data-lds-chart='${cfg(stock)}' style="--size: 220px;"></div>
  <div class="legend" style="justify-content: center;"><span><i style="background: var(--series-3);"></i>Available 186</span><span><i style="background: var(--series-2);"></i>Running low 38</span><span><i style="background: var(--neutral);"></i>Out of stock 16</span></div>
</section>`,
    },
  ],
  variants: [
    ['value / max', 'One arc. `tone: "success" | "warning" | "danger"` or `.gauge--success|warning|danger` on static markup.'],
    ['segments', 'Ticks shared by up to four parts in series order; `ticks` changes the count (default 32).'],
    ['center / unit', 'The number in the opening and what it counts; defaults to the formatted value.'],
    ['--size', 'Width of the gauge (default 220 px).'],
  ],
  states: [
    ['data change', '`drawChart(el, { type: "gauge", value })` or a range control: the arc moves from where it is.'],
    ['loading', 'A `.skel` half ring is enough: a 220 × 110 block with a 110 px top radius.'],
    ['over the max', 'Cap the arc at the end, say the overshoot in the unit line ("12 over capacity").'],
  ],
  motion: [
    'First view: the arc sweeps from zero over `--d-considered` (480 ms) on `--ease-inout`; ticks take their color one after another, 12 ms apart.',
    'Value changes and tone changes run on the same transition, from the current position.',
    'Reduced motion: drawn at once.',
  ],
  a11y: [
    'The svg is `role="img"` with value and range in words; the number and unit are real text too.',
    'Tones repeat the meaning in words ("nearly full"); they are never the only signal.',
    'Shared ticks always come with a legend that has the counts.',
  ],
  do: [
    'Use it for one figure with a meaningful maximum.',
    'Write the unit line as words people would say ("78 of 120 places").',
  ],
  dont: [
    'Add a needle, colored zones or tick numbers around the ring.',
    'Put several gauges in one card to compare them; use [ranked bars](ranked-bars).',
    'Use a gauge for values without a fixed maximum.',
  ],
  js: '`data-lds-chart=\'{ "type": "gauge", "value": 78, "max": 120, "label": "…" }\'` or `drawChart(el, config)`. `data-lds-chart-for` on a range control switches `sets`.',
  related: ['progress-ring', 'meter', 'donut', 'chart-card'],
};
