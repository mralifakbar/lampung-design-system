import { cfg } from './_chart-data.mjs';
// Weekly quiz scores, plotted in a 1000 x 260 viewBox: plot from x 44 to 900, y 12 (90) to 232 (50).
const you = [62, 68, 65, 71, 74, 70, 78, 81, 79, 84];
const cls = [64, 66, 67, 68, 70, 69, 72, 73, 74, 75];
const X = (i) => +(44 + i * (856 / 9)).toFixed(1);
const Y = (v) => +(232 - ((v - 50) / 40) * 220).toFixed(1);
const path = (d) => d.map((v, i) => `${i ? 'L' : 'M'}${X(i)} ${Y(v)}`).join(' ');
const area = `${path(you)} L${X(9)} 232 L${X(0)} 232 Z`;
const ticks = [50, 60, 70, 80, 90].map((t) => `<line class="axis-line" x1="44" x2="1000" y1="${Y(t)}" y2="${Y(t)}"></line><text class="axis-text" x="0" y="${Y(t) + 4}">${t}</text>`).join('\n      ');
const xt = you.map((_, i) => `<text class="axis-text" x="${X(i)}" y="256" text-anchor="middle">W${i + 1}</text>`).join('');
const pts = JSON.stringify(you.map((v, i) => [v, cls[i]]));

const move = `const r = this.getBoundingClientRect(), d = JSON.parse(this.dataset.pts), n = d.length - 1;
const i = Math.max(0, Math.min(n, Math.round(((event.clientX - r.left) / r.width * 1000 - 44) / (856 / n))));
const x = 44 + i * 856 / n, y = (v) => 232 - (v - 50) / 40 * 220, s = this.querySelector('svg');
s.querySelector('[data-cross]').setAttribute('x1', x); s.querySelector('[data-cross]').setAttribute('x2', x);
s.querySelector('[data-p1]').setAttribute('cx', x); s.querySelector('[data-p1]').setAttribute('cy', y(d[i][0]));
s.querySelector('[data-p2]').setAttribute('cx', x); s.querySelector('[data-p2]').setAttribute('cy', y(d[i][1]));
s.querySelectorAll('[data-hover]').forEach((e) => e.style.opacity = 1);
const t = this.querySelector('.ctip'); t.textContent = 'Week ' + (i + 1) + ': you ' + d[i][0] + ', class ' + d[i][1];
t.style.opacity = 1; t.style.left = Math.max(0, Math.min(r.width - t.offsetWidth, x / 1000 * r.width - t.offsetWidth / 2)) + 'px';`.replace(/\n/g, ' ');
const leave = `this.querySelector('.ctip').style.opacity = 0; this.querySelectorAll('[data-hover]').forEach((e) => e.style.opacity = 0);`;

const chart = (interactive) => `<div class="chart-card">
  <div class="cluster" style="justify-content: space-between; align-items: flex-start;">
    <div><div class="chart-card__q">Am I keeping up with the class?</div><div class="chart-card__sub">Quiz score per week, mine against the class average</div></div>
    <div class="legend"><span><i style="background: var(--series-1); height: 3px; border-radius: 2px;"></i>Your score</span><span><i style="background: var(--series-4); height: 3px; border-radius: 2px;"></i>Class average</span></div>
  </div>
  <div style="position: relative; padding-top: 44px;"${interactive ? ` data-pts='${pts}' onmousemove="${move}" onmouseleave="${leave}"` : ''}>
    <svg viewBox="0 0 1000 260" style="width: 100%; height: auto; display: block;" role="img" aria-label="Weekly quiz scores over 10 weeks. Yours rose from 62 to 84; the class average rose from 64 to 75.">
      ${ticks}
      ${xt}
      <path class="series-area" d="${area}"></path>
      <path class="series-line series-line--2" d="${path(cls)}"></path>
      <path class="series-line draw" pathLength="1200" d="${path(you)}"></path>
      <text x="1000" y="${Y(84) + 4}" text-anchor="end" style="font: 500 12px var(--font); fill: var(--text-strong);">You 84</text>
      <text x="1000" y="${Y(75) + 4}" text-anchor="end" style="font: 500 12px var(--font); fill: var(--text-subtle);">Class 75</text>${interactive ? `
      <line data-cross data-hover class="axis-line" x1="0" x2="0" y1="12" y2="232" style="opacity: 0; stroke: var(--line-strong);"></line>
      <circle data-p2 data-hover r="5" cx="0" cy="0" fill="var(--series-4)" stroke="var(--bg-base)" stroke-width="2" style="opacity: 0;"></circle>
      <circle data-p1 data-hover r="5" cx="0" cy="0" fill="var(--series-1)" stroke="var(--bg-base)" stroke-width="2" style="opacity: 0;"></circle>` : ''}
    </svg>${interactive ? `
    <div class="ctip" style="opacity: 0; left: 0;" aria-hidden="true"></div>` : ''}
  </div>
</div>`;

const trio = {
  label: 'Average score per week for three classes over 10 weeks. Class A rose from 61 to 82; B and C ended near 74.',
  x: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'], xFull: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'], xName: 'Week', kind: 'line',
  series: [{ name: 'Class A', values: [61, 64, 66, 70, 71, 74, 77, 78, 80, 82] }, { name: 'Class B', values: [66, 67, 69, 68, 70, 72, 71, 73, 74, 74] }, { name: 'Class C', values: [70, 69, 71, 72, 71, 73, 72, 74, 73, 75] }, { name: 'Pass mark', values: Array(10).fill(65), dashed: true, color: 'neutral' }],
  y: { min: 50, max: 90 }, height: 220,
};

export default {
  title: 'Line chart',
  group: 'Charts',
  order: 4,
  summary: 'A line per series over time, on an SVG with receding gridlines and labels at the line ends. For trends across many points; at most four series, the second one dashed.',
  when: [
    'Showing how a value changes over time and comparing up to four series: your score against the class average, enrolments per month this year and last.',
    'Ten or more points where the shape of the trend matters more than any single value.',
  ],
  whenNot: [
    ['A tiny trend under one headline number', 'sparkline-stat'],
    ['A few separate buckets to compare', 'bar-chart'],
    ['Daily activity over weeks or months', 'heatmap'],
    ['The share of a whole', 'donut'],
    ['A timeline of events, not values', 'timeline'],
  ],
  where: 'Full width of a `.chart-card` in a report or the main column; the svg scales with the card. On phones show fewer periods (last 6 weeks) rather than squeezing labels, and keep the end labels.',
  anatomy: [
    ['svg[viewBox][role=img]', 'Required. A fixed viewBox (1000 by 260 here) scaled to the card width; `aria-label` with the takeaway.'],
    ['.axis-line / .axis-text', 'Gridlines (`--hairline`, 1 px) and tick labels (11 px `--text-muted`). Horizontal gridlines only.'],
    ['.series-line', 'Required. Series 1, 2.25 px, round joins, `--series-1`.'],
    ['.series-line--2', 'The comparison series: 1.75 px, dashed 4 4, `--series-4`. Dashes keep it distinct without color.'],
    ['.series-area', 'Optional. An 8 % fill under series 1 only.'],
    ['.draw', 'Optional. Draws the line in once; pair with `pathLength="1200"`.'],
    ['.ctip', 'Optional. The crosshair tooltip, absolutely positioned in a `position: relative` wrapper; you move it.'],
  ],
  examples: [
    {
      title: 'Two series with a crosshair',
      desc: 'Move the pointer over the plot: a crosshair snaps to the nearest week and the tip shows both values. The labels at the ends make the legend optional.',
      stage: 'block',
      replay: true,
      html: chart(true),
      code: chart(false),
    },
    {
      title: 'Drawn from data',
      desc: 'Three classes and a dashed pass mark from one config: lines draw in once, the crosshair reads every class, arrow keys work on focus, the legend switches classes off, and a hidden table carries every value.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" aria-labelledby="lc-trio"><div><div class="chart-card__q" id="lc-trio">Which class is improving fastest?</div><div class="chart-card__sub">Average quiz score per week, out of 100</div></div><div class="chart" data-lds-chart='${cfg(trio)}'></div></section>`,
    },
  ],
  variants: [
    ['.series-line', 'Primary series.'],
    ['.series-line--2', 'Comparison or average, dashed.'],
    ['style="stroke: var(--series-2|3)"', 'Third and fourth series, solid, in fixed order.'],
  ],
  states: [
    ['hover', 'Crosshair line in `--line-strong`, dots on each series, `.ctip` with the week and values. Wire it yourself; see the example.'],
    ['loading, empty, error', 'See [chart states](chart-states).'],
  ],
  motion: [
    'First view: `.draw` animates the stroke dash offset from 1200 to 0 over 1.2 s on `--ease-inout`. Without `pathLength="1200"` a long path draws only partly or finishes early.',
    'The tooltip slides between weeks (`left` over `--d-standard` on `--ease-standard`) and fades over `--d-instant`.',
    'Data updates replace the path without redrawing. Reduced motion: the line appears drawn and the tip jumps.',
  ],
  a11y: [
    'The svg has `role="img"` and an `aria-label` that states the trend and the start and end values.',
    'The crosshair is pointer only; offer the values in a `.sr-only` table or a visible "Show as table" toggle.',
    'Series differ by more than color: the second is dashed, and each line is labelled at its end in text tokens.',
    'The tooltip is `aria-hidden`; it repeats information that must be available elsewhere.',
  ],
  do: [
    'Label line ends directly ("You 84").',
    'Keep the y range honest and say the unit in the subtitle.',
    'Use the dashed style for the average or the previous period.',
  ],
  dont: [
    'Plot more than four series; fold the rest into Other or split the chart.',
    'Smooth lines with curves that invent values between points.',
    'Draw vertical gridlines or a boxed frame.',
  ],
  js: 'Drawn from data: `data-lds-chart` with `kind: "line"` (or `drawChart(el, config)`) gives the draw-in, crosshair, keyboard reading, legend toggles and hidden table; see [area chart](area-chart). Hand-written svg: `data-lds-crosshair` on a `.plot` moves `.cross` and `.ctip` to the nearest `[data-x]` point.',
  related: ['chart-principles', 'sparkline-stat', 'bar-chart', 'chart-states'],
};
