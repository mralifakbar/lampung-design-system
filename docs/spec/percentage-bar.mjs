const parts = (list) => list.map(([v, n]) => `<span style="flex-grow: ${v}; background: var(--series-${n});"></span>`).join('');
const legend = (list) => list.map(([v, n, l]) => `<span><i style="background: var(--series-${n});"></i>${l} <b style="font-weight: 500; color: var(--text-strong);">${v}%</b></span>`).join('');
const credits = [[50, 1, 'Core'], [25, 2, 'Electives'], [15, 3, 'Labs'], [10, 4, 'General']];

export default {
  title: 'Percentage bar',
  group: 'Charts',
  order: 6,
  summary: 'One horizontal bar split into up to four colored parts that add up to 100 %, with a legend that names each part and its share. The compact way to show composition.',
  when: [
    'Showing how one whole splits into parts: credits by course type, time spent by activity, answers right, wrong and skipped.',
    'Composition in a narrow space or inside a list row or table cell, where a donut would not fit.',
    'Comparing composition across a few rows (one bar per class) when the parts are the same.',
  ],
  whenNot: [
    ['Progress of one value toward done', 'progress-bar', 'A progress bar has one part and a track.'],
    ['How full a capacity or quota is', 'meter'],
    ['The total matters as much as the split', 'donut'],
    ['Comparing absolute sizes across categories', 'bar-chart'],
  ],
  where: 'In a `.chart-card` under the title, inside list rows or table cells at full cell width, or under a stat. Full width on phones; the legend wraps under it.',
  anatomy: [
    ['.pbar', 'Required. 14 px tall flex row, 4 px radius, 2 px gaps between parts, clipped. `role="img"` + `aria-label`.'],
    ['span', 'Required. One per part; `flex-grow` is the share, `background` is `--series-n` in fixed order.'],
    ['.legend', 'Required. Swatch, name and share for each part, in the same order.'],
  ],
  examples: [
    {
      title: 'Composition of a whole',
      desc: 'Credits by course type. The legend carries the numbers.',
      stage: 'block',
      html: `<div class="chart-card" style="max-width: 460px;">
  <div><div class="chart-card__q">Where do my credits go?</div><div class="chart-card__sub">Share of 120 credits by course type</div></div>
  <div class="pbar" role="img" aria-label="Core 50 percent, electives 25, labs 15, general 10">${parts(credits)}</div>
  <div class="legend">${legend(credits)}</div>
</div>`,
    },
    {
      title: 'Compared across rows',
      desc: 'Answers in two tryouts. Same parts, same order, one bar per row; a change in the split reads at a glance.',
      stage: 'block',
      html: `<div class="chart-card" style="max-width: 460px;">
  <div><div class="chart-card__q">Am I answering more correctly?</div><div class="chart-card__sub">Answers in the last two tryouts</div></div>
  <div class="stack" style="--gap: 6px;"><span class="card__sub" style="margin: 0;">Tryout 3</span><div class="pbar" role="img" aria-label="Tryout 3: 62 percent right, 28 wrong, 10 skipped">${parts([[62, 3], [28, 2], [10, 4]])}</div></div>
  <div class="stack" style="--gap: 6px;"><span class="card__sub" style="margin: 0;">Tryout 4</span><div class="pbar" role="img" aria-label="Tryout 4: 74 percent right, 20 wrong, 6 skipped">${parts([[74, 3], [20, 2], [6, 4]])}</div></div>
  <div class="legend"><span><i style="background: var(--series-3);"></i>Right</span><span><i style="background: var(--series-2);"></i>Wrong</span><span><i style="background: var(--series-4);"></i>Skipped</span></div>
</div>`,
    },
  ],
  states: [
    ['data change', 'Change `flex-grow`; parts resize smoothly.'],
    ['a part is 0', 'Remove its span (an empty part still adds a 2 px gap).'],
    ['loading', 'A single `.skel` 14 px tall with the same radius; see [chart states](chart-states).'],
  ],
  motion: [
    'Parts transition `flex-grow` over `--d-considered` (480 ms) on `--ease-inout`, so a new split slides into place.',
    'No fill-in animation on first load. Reduced motion: 120 ms.',
  ],
  a11y: [
    '`role="img"` on `.pbar` with every part and share in the `aria-label`.',
    'The legend is real text with the percentages; never rely on the colored parts alone.',
    'Keep the same color for the same meaning across rows (right is always series 3 here).',
  ],
  do: [
    'Keep parts in a fixed order across every bar on the page.',
    'Show the percentages in the legend.',
  ],
  dont: [
    'Split into more than four parts; fold the rest into Other in `--neutral`.',
    'Use it for one value against a target.',
    'Add labels inside the parts; small parts cannot hold them.',
  ],
  related: ['donut', 'progress-bar', 'meter', 'chart-principles'],
};
