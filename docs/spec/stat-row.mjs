export default {
  title: 'Stat row',
  group: 'Data display',
  order: 3,
  summary: 'A row of key figures without cards: big tabular numbers with their labels underneath, divided by hairlines. Its columns follow the width of the content column, not the screen.',
  when: [
    'Two to four figures that summarize a page or a section: credits taken, average grade, tasks due.',
    'The top of a report or a dashboard section, before the details.',
    'Results after an exam: score, rank, time used.',
  ],
  whenNot: [
    ['Figures that each need their own card, an icon or a change', 'kpi-card'],
    ['A figure with its trend over time', 'sparkline-stat'],
    ['One score that needs a pass or fail judgment', 'progress-ring'],
    ['Many label and value pairs about one thing', 'key-value'],
    ['Figures compared across many items', 'table'],
  ],
  where: 'At the top of a page section, full width of the content column, right under the [section](sections) heading. In a narrow column (a phone, a side panel) it becomes two columns automatically, and an odd last figure spans both. From 600 px of container width it shows up to `--n` figures in one row.',
  anatomy: [
    ['.stat-row-wrap', 'Required. A size container; the stat row reads its width.'],
    ['dl.stat-row', 'Required. The grid with a hairline on top. Set `style="--n: 3"` for the number of figures per row (max 4).'],
    ['.stat-row--four', 'Add for four or more figures: smaller numbers and correct dividers.'],
    ['.stat-row__item', 'Required. One figure: a `div` holding the `dt` and `dd`s.'],
    ['dt.stat-row__label', 'Required. The label. First in the DOM, shown under the figure.'],
    ['dd.stat-row__value', 'Required. The figure: 30 px narrow, 34 to 40 px wide, tabular.'],
    ['dd.stat-row__sub', 'Optional context under the label ("Of 24 allowed").'],
  ],
  examples: [
    {
      title: 'Three figures',
      desc: 'Resize the window: under 600 px of width it turns into two columns, with the third spanning both.',
      stage: 'block',
      html: `<div class="stat-row-wrap"><dl class="stat-row" style="--n: 3">
  <div class="stat-row__item"><dt class="stat-row__label">Credits taken</dt><dd class="stat-row__value">21</dd><dd class="stat-row__sub">Of 24 allowed</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Average grade</dt><dd class="stat-row__value">3.62</dd><dd class="stat-row__sub">Up 0.1 from last term</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Tasks due this week</dt><dd class="stat-row__value">4</dd></div>
</dl></div>`,
    },
    {
      title: 'Four figures',
      desc: '`stat-row--four` with `--n: 4` keeps the figures smaller so they fit one row.',
      stage: 'block',
      html: `<div class="stat-row-wrap"><dl class="stat-row stat-row--four" style="--n: 4">
  <div class="stat-row__item"><dt class="stat-row__label">Score</dt><dd class="stat-row__value">412</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Rank</dt><dd class="stat-row__value">38</dd><dd class="stat-row__sub">Of 1,204</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Correct</dt><dd class="stat-row__value">86%</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Time used</dt><dd class="stat-row__value">1:42</dd><dd class="stat-row__sub">Of 2:00</dd></div>
</dl></div>`,
    },
    {
      title: 'In a narrow column',
      desc: 'The same markup in a 340 px column: two per row.',
      stage: 'block',
      html: `<div class="stat-row-wrap" style="max-width: 340px;"><dl class="stat-row" style="--n: 3">
  <div class="stat-row__item"><dt class="stat-row__label">Students</dt><dd class="stat-row__value">128</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Submitted</dt><dd class="stat-row__value">97</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Average score</dt><dd class="stat-row__value">74.5</dd></div>
</dl></div>`,
    },
  ],
  variants: [
    ['--n: 2 | 3 | 4', 'Figures per row from 600 px of container width.'],
    ['stat-row--four', 'Four or more figures: smaller numbers, dividers per row of four.'],
  ],
  states: [
    ['loading', 'A [skeleton](skeleton) bar in each value; labels already shown.'],
    ['no data', 'Write "None yet" or a dash-free "Not available" in the value; keep the label.'],
  ],
  motion: [
    'None at rest. On first view the figures may fade up once with [reveal on scroll](reveal-on-scroll) (`data-lds-reveal` with `--i` per item) or count up with [number count](number-count); never both.',
    'A figure that changes while visible rolls with a [rolling number](rolling-number) on `--spring-smooth`.',
  ],
  a11y: [
    'It is a `<dl>`: each label is the term, the figure and the sub line are its values. The label comes first in the DOM, so screen readers read "Credits taken, 21, of 24 allowed" even though the figure is shown first.',
    'Units belong in the value or the sub line, not only in a color or icon.',
  ],
  do: [
    'Keep it to two to four figures that matter most.',
    'Write context in the sub line ("Of 24 allowed", "Up 0.1").',
    'Set `--n` to the number of figures.',
  ],
  dont: [
    'Wrap each figure in a card or add icons and colors.',
    'Use it for more than four figures; split into sections or use a [table](table).',
    'Show a trend arrow without words.',
  ],
  related: ['kpi-card', 'sparkline-stat', 'key-value', 'number-count'],
};
