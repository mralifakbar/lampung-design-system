# Stat row

Group: Data display. Docs page: `docs/components/stat-row.html`.

A row of key figures without cards: big tabular numbers with their labels underneath, divided by hairlines. Its columns follow the width of the content column, not the screen.

## Use it when
- Two to four figures that summarize a page or a section: applications received, average processing time, items due.
- The top of a report or a dashboard section, before the details.
- Results after a service period: reports received, waiting, response time.

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
| `dd.stat-row__sub` | Optional context under the label ("Of a 24-a-day quota"). |

## Markup

**Three figures.** Resize the window: under 600 px of width it turns into two columns, with the third spanning both.
```html
<div class="stat-row-wrap"><dl class="stat-row" style="--n: 3">
  <div class="stat-row__item"><dt class="stat-row__label">Applications processed</dt><dd class="stat-row__value">21</dd><dd class="stat-row__sub">Of a 24-a-day quota</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Average processing time</dt><dd class="stat-row__value">3.6 days</dd><dd class="stat-row__sub">0.4 days faster than last month</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Due this week</dt><dd class="stat-row__value">4</dd></div>
</dl></div>
```

**Four figures.** `stat-row--four` with `--n: 4` keeps the figures smaller so they fit one row.
```html
<div class="stat-row-wrap"><dl class="stat-row stat-row--four" style="--n: 4">
  <div class="stat-row__item"><dt class="stat-row__label">Reports received</dt><dd class="stat-row__value">412</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Waiting</dt><dd class="stat-row__value">38</dd><dd class="stat-row__sub">Of 412</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Closed on time</dt><dd class="stat-row__value">86%</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Response time</dt><dd class="stat-row__value">1:42</dd><dd class="stat-row__sub">Target 2:00 hours</dd></div>
</dl></div>
```

**In a narrow column.** The same markup in a 340 px column: two per row.
```html
<div class="stat-row-wrap" style="max-width: 340px;"><dl class="stat-row" style="--n: 3">
  <div class="stat-row__item"><dt class="stat-row__label">Registered recipients</dt><dd class="stat-row__value">128</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Aid collected</dt><dd class="stat-row__value">97</dd></div>
  <div class="stat-row__item"><dt class="stat-row__label">Satisfaction score</dt><dd class="stat-row__value">74.5</dd></div>
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
- It is a `<dl>`: each label is the term, the figure and the sub line are its values. The label comes first in the DOM, so screen readers read "Applications processed, 21, of a 24-a-day quota" even though the figure is shown first.
- Units belong in the value or the sub line, not only in a color or icon.

## Do
- Keep it to two to four figures that matter most.
- Write context in the sub line ("Of a 24-a-day quota", "0.4 days faster").
- Set `--n` to the number of figures.

## Don't
- Wrap each figure in a card or add icons and colors.
- Use it for more than four figures; split into sections or use a [table](table.md).
- Show a trend arrow without words.

## Related
[KPI card](kpi-card.md) · [Sparkline stat](sparkline-stat.md) · [Key-value](key-value.md) · [Number count](number-count.md)
