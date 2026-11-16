import { cfg } from './_chart-data.mjs';
// Donut segments on a circle of r 64 in a 168 x 168 box, 2 units of gap between segments.
const C = 2 * Math.PI * 64;
const segs = (vals) => {
  const total = vals.reduce((a, b) => a + b, 0);
  let at = 0;
  return vals.map((v) => {
    const len = (v / total) * C;
    const s = { dash: `${Math.max(len - 2, 0).toFixed(2)} ${(C - Math.max(len - 2, 0)).toFixed(2)}`, off: (-at).toFixed(2) };
    at += len;
    return s;
  });
};
const grades = [['A', 12], ['B', 18], ['C', 9], ['D or lower', 3]];
const classB = [8, 16, 13, 5];
const a = segs(grades.map((g) => g[1]));
const b = segs(classB);
const circles = a.map((s, i) => `<circle cx="84" cy="84" r="64" style="stroke: var(--series-${i + 1}); stroke-dasharray: ${s.dash}; stroke-dashoffset: ${s.off};" data-a="${s.dash}|${s.off}" data-b="${b[i].dash}|${b[i].off}"></circle>`).join('\n      ');
const legend = grades.map(([g, v], i) => `<div class="cluster" style="flex-wrap: nowrap; --gap: 10px; font: var(--type-subhead); color: var(--text-default);"><span style="width: 10px; height: 10px; border-radius: 3px; flex: none; background: var(--series-${i + 1});"></span><span style="flex: 1;">${g}</span><b style="font-weight: 500; color: var(--text-strong); font-variant-numeric: tabular-nums;" data-a="${v}" data-b="${classB[i]}">${v}</b></div>`).join('\n      ');
const pick = (k) => `onclick="const c = this.closest('.chart-card'); c.querySelectorAll('circle').forEach(e => { const [d, o] = e.dataset.${k}.split('|'); e.style.strokeDasharray = d; e.style.strokeDashoffset = o; }); c.querySelectorAll('b[data-${k}]').forEach(e => e.textContent = e.dataset.${k}); c.querySelector('[data-total]').textContent = '42';"`;

const sources = { type: 'donut', label: 'Where 1,284 sign-ups came from this month: search 42%, newsletter 26%, partner schools 19%, other 13%.', unit: 'sign-ups', center: '1,284',
  segments: [{ name: 'Search', value: 540 }, { name: 'Newsletter', value: 334 }, { name: 'Partner schools', value: 244 }, { name: 'Other', value: 166, color: 'neutral' }],
  sets: { nov: { center: '1,284', label: 'November sign-ups by source.', segments: [{ name: 'Search', value: 540 }, { name: 'Newsletter', value: 334 }, { name: 'Partner schools', value: 244 }, { name: 'Other', value: 166, color: 'neutral' }] },
    oct: { center: '1,106', label: 'October sign-ups by source.', segments: [{ name: 'Search', value: 402 }, { name: 'Newsletter', value: 361 }, { name: 'Partner schools', value: 198 }, { name: 'Other', value: 145, color: 'neutral' }] } } };
const budget = { type: 'donut', label: 'Monthly budget of $3,200: rent 45%, food 22%, transport 12%, the rest 21%.', unit: 'this month', center: '$3,200', thin: true, size: 148, format: { prefix: '$' },
  segments: [{ name: 'Rent', value: 1440 }, { name: 'Food', value: 704 }, { name: 'Transport', value: 384 }, { name: 'Everything else', value: 672, color: 'neutral' }] };

export default {
  title: 'Donut',
  group: 'Charts',
  order: 5,
  summary: 'A ring split into up to four segments that show parts of one whole, with the total in the middle and a labelled list beside it. The list carries the numbers; the ring shows proportion at a glance.',
  when: [
    'Two to four parts of one whole where the reader cares about the rough split: students per grade, time per activity.',
    'A dashboard tile where the total matters as much as the split (the total sits in the hole).',
  ],
  whenNot: [
    ['Parts of a whole in a narrow row or with many categories', 'percentage-bar'],
    ['Comparing sizes precisely or more than four parts', 'bar-chart', 'Bars are easier to compare than angles.'],
    ['Progress of one value toward a goal', 'progress-ring'],
    ['Change over time', 'line-chart'],
  ],
  where: 'In a `.chart-card`, ring on the left (168 px) and the list on the right; on phones the list wraps under the ring. Half width on dashboards.',
  anatomy: [
    ['.donut-chart', 'The component: ring and legend side by side, wrapping under 400 px. Drawn by `data-lds-chart` with `type: "donut"`, or written by hand with the parts below.'],
    ['.donut > svg > circle.donut__seg', 'One circle per part (r 64 in a 168 viewBox, rotated so the first part starts at the top); `stroke-dasharray` sets its length, `stroke-dashoffset` its start, `--series-n` its color.'],
    ['.donut__label', 'The total (`b`) and what it counts (`span`), centered in the hole.'],
    ['ul.donut-legend', 'One `li` per part: swatch `i`, name, value `b`, share `em`. Same order as the ring.'],
    ['.donut-chart--thin', 'A 10 px ring for small cards.'],
    ['svg.donut', 'Required. 168 by 168 viewBox, rotated -90 degrees so the first segment starts at the top. `role="img"` + `aria-label`.'],
    ['circle', 'Required. One per segment, r 64, `fill: none`, 14 px stroke (set by `.donut circle`). Length via `stroke-dasharray`, position via `stroke-dashoffset`, color via `--series-n`.'],
    ['center label', 'The total and its unit, absolutely centered over the svg (inline styles; no class yet).'],
    ['list', 'Required. Swatch, label and value per segment, in the same order as the ring.'],
  ],
  examples: [
    {
      title: 'Drawn from data, with a legend list',
      desc: 'The ring, the total and a legend with each value and share come from one config. Point at a segment or a legend row: both come forward. Switch months: segments move to their new sizes from where they are. Segments sweep in on first view.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 520px;" aria-labelledby="dn-q">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="dn-q">Where do sign-ups come from?</div><div class="chart-card__sub">New accounts by source</div></div>
    <div class="chart-card__actions"><div class="seg chart-card__range" role="group" aria-label="Month" data-lds-segmented data-lds-chart-for="dn-src" style="width: 200px;"><span class="seg__thumb"></span><button type="button" class="seg__btn" aria-pressed="true" data-set="nov">November</button><button type="button" class="seg__btn" aria-pressed="false" data-set="oct">October</button></div></div>
  </div>
  <div id="dn-src" data-lds-chart='${cfg(sources)}'></div>
</section>`,
    },
    {
      title: 'Thin ring in a small card',
      desc: '`thin: true` draws a 10 px ring; `size` makes it smaller. Under about 400 px the legend wraps under the ring.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 440px;" aria-labelledby="dn-b"><div><div class="chart-card__q" id="dn-b">Where does the budget go?</div><div class="chart-card__sub">Planned spending, November</div></div><div data-lds-chart='${cfg(budget)}'></div></section>`,
    },
    {
      title: 'Grades by class',
      desc: 'Switch classes: segments move to their new sizes over 480 ms on the in-out curve.',
      stage: 'block',
      html: `<div class="chart-card" style="max-width: 520px;">
  <div class="cluster" style="justify-content: space-between; align-items: flex-start;">
    <div><div class="chart-card__q">How are grades distributed?</div><div class="chart-card__sub">Final grades, Database Systems</div></div>
    <div class="seg" role="group" aria-label="Class" data-lds-segmented style="width: 180px;">
      <span class="seg__thumb"></span>
      <button class="seg__btn" aria-pressed="true" ${pick('a')}>Class A</button>
      <button class="seg__btn" aria-pressed="false" ${pick('b')}>Class B</button>
    </div>
  </div>
  <div class="cluster" style="--gap: 28px;">
    <div style="position: relative; width: 168px; height: 168px; flex: none;">
      <svg class="donut" viewBox="0 0 168 168" style="width: 168px; height: 168px; transform: rotate(-90deg);" role="img" aria-label="Grades: A 12, B 18, C 9, D or lower 3 of 42 students">
      ${circles}
      </svg>
      <div class="center" style="position: absolute; inset: 0;"><div><div style="font: var(--type-title-2); color: var(--text-strong); font-variant-numeric: tabular-nums;" data-total>42</div><div style="font: var(--type-footnote); color: var(--text-subtle);">students</div></div></div>
    </div>
    <div class="stack" style="--gap: 10px; flex: 1; min-width: 160px;">
      ${legend}
    </div>
  </div>
</div>`,
    },
  ],
  states: [
    ['data change', 'Set new `stroke-dasharray` and `stroke-dashoffset`; both transition. Update the list, the total and the `aria-label`.'],
    ['one segment is 100 %', 'Show the ring whole in that color and say so in the list.'],
    ['loading, empty, error', 'See [chart states](chart-states); a loading donut is a `.skel` circle (`border-radius: 50%`).'],
  ],
  motion: [
    'Segment length and position transition over `--d-considered` (480 ms) on `--ease-inout`; opacity over `--d-fast` for hover dimming you add.',
    'First view (drawn from data, or `data-lds-grow`): every segment sweeps from zero to its length over 480 ms on `--ease-inout`.',
    'Pointing at a segment or a legend row fades the other segments to 35 % and the other rows to 55 % over `--d-fast`.',
    'Reduced motion: no sweep; changes take 120 ms.',
  ],
  a11y: [
    '`role="img"` on the svg with every part and the total in the `aria-label`.',
    'The list beside the ring is real text with the numbers; it is the accessible version and the precise one.',
    'Segments are separated by a 2 unit gap and by order, not only by color.',
  ],
  do: [
    'Order segments by meaning (A to D) or by size, starting at the top.',
    'Put the total in the hole and the numbers in the list.',
  ],
  dont: [
    'Use more than four segments; fold the smallest into Other.',
    'Label segments on the ring itself.',
    'Use a full pie or 3D.',
  ],
  js: '`data-lds-chart=\'{ "type": "donut", "segments": [{ "name": "Search", "value": 540 }], "center": "1,284", "unit": "sign-ups", "label": "…" }\'` or `drawChart(el, config)`; calling it again with the same number of parts moves the segments. `data-lds-chart-for` on a range control switches `sets`. Hand-written `.donut-chart` markup gets the linked hover from `init()`.',
  related: ['percentage-bar', 'gauge', 'bar-chart', 'chart-principles'],
};
