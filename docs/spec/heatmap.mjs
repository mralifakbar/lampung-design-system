// 7 rows (Mon to Sun) by 20 columns (weeks). Mid-week is busiest; the pattern is deterministic.
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const base = [2, 2.6, 3.2, 2.8, 2, 0.9, 0.4];
const hours = ['no study', '1 hour', '2 hours', '3 hours', '4 or more hours'];
const cells = days.map((d, r) => Array.from({ length: 20 }, (_, w) => {
  const l = Math.max(0, Math.min(4, Math.round(base[r] + (((w * 7 + r * 3) % 5) - 2) * 0.55 + (w > 13 ? 0.6 : 0))));
  return `<i${l ? ` class="l${l}"` : ''} title="Week ${w + 1}, ${d}: ${hours[l]}"></i>`;
}).join('')).join('\n    ');
const scale = `<div class="cluster" style="--gap: 6px; justify-content: flex-end; font: var(--type-footnote); color: var(--text-subtle);" aria-hidden="true">Less <span class="hm" style="display: flex; gap: 3px;"><i style="width: 12px;"></i><i class="l1" style="width: 12px;"></i><i class="l2" style="width: 12px;"></i><i class="l3" style="width: 12px;"></i><i class="l4" style="width: 12px;"></i></span> More</div>`;

export default {
  title: 'Heatmap',
  group: 'Charts',
  order: 7,
  summary: 'A grid of small squares, one per day or slot, shaded in five steps of one hue from empty to most. Shows patterns over many periods (busy weekdays, study streaks) rather than exact values.',
  when: [
    'Activity per day over weeks or months: study hours, submissions, logins.',
    'Spotting a pattern in two dimensions (weekday by week, hour by weekday) where the exact value of each cell matters less.',
  ],
  whenNot: [
    ['Exact values per category', 'bar-chart'],
    ['A trend of one value over time', 'line-chart'],
    ['Picking or showing dates', 'calendar'],
    ['How full one capacity is', 'meter'],
  ],
  where: 'Full width of a `.chart-card` in a report or profile. The grid has 20 columns and squares scale with the width, so on phones each cell gets small: show the last 10 weeks there, or keep 20 inside a wrapper with `overflow-x: auto` and a minimum grid width of about 480 px.',
  anatomy: [
    ['.hm', 'Required. A 20 column grid, 3 px gaps. Cells flow row by row, so 7 rows of 20 is weekdays by weeks. `role="img"` + `aria-label`.'],
    ['i', 'Required. One cell, square, 3 px radius, empty color `--bg-skeleton`.'],
    ['.l1 / .l2 / .l3 / .l4', 'Shade steps: `--series-1` at 22 %, 45 %, 70 % and 100 %. No class means empty.'],
    ['scale', 'Recommended. "Less" to "More" with one cell of each step.'],
  ],
  examples: [
    {
      title: 'Study activity',
      desc: 'Rows are weekdays, columns are weeks. Hover a cell to see it grow and its title.',
      stage: 'block',
      html: `<div class="chart-card">
  <div><div class="chart-card__q">When do I study?</div><div class="chart-card__sub">Hours logged per day, last 20 weeks</div></div>
  <div class="hm" role="img" aria-label="Study activity over 20 weeks. Wednesdays are busiest, weekends quiet, and the last 6 weeks are busier than before.">
    ${cells}
  </div>
  ${scale}
</div>`,
    },
  ],
  variants: [
    ['l1 to l4', 'Four filled steps plus empty: five in all. Map your values to steps with fixed thresholds (1, 2, 3, 4+ hours), not by percentile, so the scale means the same every week.'],
  ],
  states: [
    ['hover', 'A cell scales to 1.25 on `--spring-snappy`; its `title` shows the value.'],
    ['empty period', 'All cells empty is a valid state; say so in the subtitle ("No study logged yet") rather than hiding the grid.'],
    ['loading, error', 'See [chart states](chart-states).'],
  ],
  motion: [
    'Hover: `transform: scale(1.25)` on `--spring-snappy` over `--d-snappy`, back the same way.',
    'No entrance animation. Reduced motion: the hover scale becomes a 120 ms change.',
  ],
  a11y: [
    '`role="img"` on `.hm` with an `aria-label` that states the pattern; individual cells are not read.',
    'Cell titles are for mouse users only; give the numbers in a `.sr-only` table or a summary when they matter.',
    'One hue, light to dark, so it reads in grayscale and for color-blind readers; the scale legend is `aria-hidden` because the label carries the meaning.',
  ],
  do: [
    'Use fixed thresholds for the steps and show the scale.',
    'Describe the pattern in the title, subtitle or label.',
  ],
  dont: [
    'Use several hues or a rainbow scale.',
    'Make cells clickable without making them buttons with names.',
    'Change the column count with your own CSS on top of `.hm`; ask for a column variable in the system instead.',
  ],
  related: ['chart-principles', 'calendar', 'bar-chart', 'chart-states'],
};
