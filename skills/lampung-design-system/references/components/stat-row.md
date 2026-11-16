# Stat row

Group: Data display (new). Docs page: `docs/components/stat-row.html`.

A row of key figures without cards: big tabular numbers with their labels underneath, divided by hairlines. Its columns follow the width of the content column, not the screen.

## Use it when
- Two to four figures that summarize a page or a section: credits taken, average grade, tasks due.
- The top of a report or a dashboard section, before the details.
- Results after an exam: score, rank, time used.

## Use something else when
- Figures that each need their own card, an icon or a change: use [KPI card](kpi-card.md).
- A figure with its trend over time: use [Sparkline stat](sparkline-stat.md).
- One score that needs a pass or fail judgment: use [Progress ring](progress-ring.md).
- Many label and value pairs about one thing: use [Key-value](key-value.md).
- Figures compared across many items: use [Table](table.md).

## Where it goes
At the top of a page section, full width of the content column, right under the [section](sections.md) heading. In a narrow column (a phone, a side panel) it becomes two columns automatically, and an odd last figure spans both. From 600 px of container width it shows up to `--n` figures in one row.

## Anatomy
| Part | What it is |
|---|---|
| `.stat-row-wrap` | Required. A size container; the stat row reads its width. |
| `dl.stat-row` | Required. The grid with a hairline on top. Set `style="--n: 3"` for the number of figures per row (max 4). |
| `.stat-row--four` | Add for four or more figures: smaller numbers and correct dividers. |
| `.stat-row__item` | Required. One figure: a `div` holding the `dt` and `dd`s. |
| `dt.stat-row__label` | Required. The label. First in the DOM, shown under the figure. |
| `dd.stat-row__value` | Required. The figure: 30 px narrow, 34 to 40 px wide, tabular. |
| `dd.stat-row__sub` | Optional context under the label ("Of 24 allowed"). |

## Markup

**Three figures.** Resize the window: under 600 px of width it turns into two columns, with the third spanning both.
```html
<div class="stat-row-wrap"><dl class="stat-row" style="--n: 3">
  <div class="stat-row__item"><dt class="stat-row__label">Credits taken</dt><dd class="stat-row__value">21</dd><dd class="stat-row__sub">Of 24 allowed</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Average grade</dt><dd class="stat-row__value">3.62</dd><dd class="stat-row__sub">Up 0.1 from last term</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Tasks due this week</dt><dd class="stat-row__value">4</dd></div>
</dl></div>
```

**Four figures.** `stat-row--four` with `--n: 4` keeps the figures smaller so they fit one row.
```html
<div class="stat-row-wrap"><dl class="stat-row stat-row--four" style="--n: 4">
  <div class="stat-row__item"><dt class="stat-row__label">Score</dt><dd class="stat-row__value">412</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Rank</dt><dd class="stat-row__value">38</dd><dd class="stat-row__sub">Of 1,204</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Correct</dt><dd class="stat-row__value">86%</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Time used</dt><dd class="stat-row__value">1:42</dd><dd class="stat-row__sub">Of 2:00</dd></div>
</dl></div>
```

**In a narrow column.** The same markup in a 340 px column: two per row.
```html
<div class="stat-row-wrap" style="max-width: 340px;"><dl class="stat-row" style="--n: 3">
  <div class="stat-row__item"><dt class="stat-row__label">Students</dt><dd class="stat-row__value">128</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Submitted</dt><dd class="stat-row__value">97</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Average score</dt><dd class="stat-row__value">74.5</dd></div>
</dl></div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `--n: 2 | 3 | 4` | Figures per row from 600 px of container width. |
| `stat-row--four` | Four or more figures: smaller numbers, dividers per row of four. |

## States
| State | How |
|---|---|
| `loading` | A [skeleton](skeleton.md) bar in each value; labels already shown. |
| `no data` | Write "None yet" or a dash-free "Not available" in the value; keep the label. |

## Motion and microinteractions
- None at rest. On first view the figures may fade up once with [reveal on scroll](reveal-on-scroll.md) (`data-lds-reveal` with `--i` per item) or count up with [number count](number-count.md); never both.
- A figure that changes while visible rolls with a [rolling number](rolling-number.md) on `--spring-smooth`.

## Accessibility
- It is a `<dl>`: each label is the term, the figure and the sub line are its values. The label comes first in the DOM, so screen readers read "Credits taken, 21, of 24 allowed" even though the figure is shown first.
- Units belong in the value or the sub line, not only in a color or icon.

## Do
- Keep it to two to four figures that matter most.
- Write context in the sub line ("Of 24 allowed", "Up 0.1").
- Set `--n` to the number of figures.

## Don't
- Wrap each figure in a card or add icons and colors.
- Use it for more than four figures; split into sections or use a [table](table.md).
- Show a trend arrow without words.

## Related
[KPI card](kpi-card.md) · [Sparkline stat](sparkline-stat.md) · [Key-value](key-value.md) · [Number count](number-count.md)
