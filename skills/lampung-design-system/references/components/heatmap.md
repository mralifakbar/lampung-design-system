# Heatmap

Group: Charts. Docs page: `docs/components/heatmap.html`.

A grid of small squares, one per day or slot, shaded in five steps of one hue from empty to most. Shows patterns over many periods (busy weekdays, study streaks) rather than exact values.

## Use it when
- Activity per day over weeks or months: study hours, submissions, logins.
- Spotting a pattern in two dimensions (weekday by week, hour by weekday) where the exact value of each cell matters less.

## Use something else when
- Exact values per category: use [Bar chart](bar-chart.md).
- A trend of one value over time: use [Line chart](line-chart.md).
- Picking or showing dates: use [Calendar](calendar.md).
- How full one capacity is: use [Meter](meter.md).

## Where it goes
Full width of a `.chart-card` in a report or profile. The grid has 20 columns and squares scale with the width, so on phones each cell gets small: show the last 10 weeks there, or keep 20 inside a wrapper with `overflow-x: auto` and a minimum grid width of about 480 px.

## Anatomy
| Part | What it is |
|---|---|
| `.hm` | Required. A 20 column grid, 3 px gaps. Cells flow row by row, so 7 rows of 20 is weekdays by weeks. `role="img"` + `aria-label`. |
| `i` | Required. One cell, square, 3 px radius, empty color `--bg-skeleton`. |
| `.l1 / .l2 / .l3 / .l4` | Shade steps: `--series-1` at 22 %, 45 %, 70 % and 100 %. No class means empty. |
| `scale` | Recommended. "Less" to "More" with one cell of each step. |

## Markup

**Study activity.** Rows are weekdays, columns are weeks. Hover a cell to see it grow and its title.
```html
<div class="chart-card">
  <div><div class="chart-card__q">When do I study?</div><div class="chart-card__sub">Hours logged per day, last 20 weeks</div></div>
  <div class="hm" role="img" aria-label="Study activity over 20 weeks. Wednesdays are busiest, weekends quiet, and the last 6 weeks are busier than before.">
    <i class="l1" title="Week 1, Mon: 1 hour"></i><i class="l2" title="Week 2, Mon: 2 hours"></i><i class="l3" title="Week 3, Mon: 3 hours"></i><i class="l1" title="Week 4, Mon: 1 hour"></i><i class="l3" title="Week 5, Mon: 3 hours"></i><i class="l1" title="Week 6, Mon: 1 hour"></i><i class="l2" title="Week 7, Mon: 2 hours"></i><i class="l3" title="Week 8, Mon: 3 hours"></i><i class="l1" title="Week 9, Mon: 1 hour"></i><i class="l3" title="Week 10, Mon: 3 hours"></i><i class="l1" title="Week 11, Mon: 1 hour"></i><i class="l2" title="Week 12, Mon: 2 hours"></i><i class="l3" title="Week 13, Mon: 3 hours"></i><i class="l1" title="Week 14, Mon: 1 hour"></i><i class="l3" title="Week 15, Mon: 3 hours"></i><i class="l2" title="Week 16, Mon: 2 hours"></i><i class="l3" title="Week 17, Mon: 3 hours"></i><i class="l4" title="Week 18, Mon: 4 or more hours"></i><i class="l2" title="Week 19, Mon: 2 hours"></i><i class="l3" title="Week 20, Mon: 3 hours"></i>
    <i class="l3" title="Week 1, Tue: 3 hours"></i><i class="l2" title="Week 2, Tue: 2 hours"></i><i class="l3" title="Week 3, Tue: 3 hours"></i><i class="l4" title="Week 4, Tue: 4 or more hours"></i><i class="l2" title="Week 5, Tue: 2 hours"></i><i class="l3" title="Week 6, Tue: 3 hours"></i><i class="l2" title="Week 7, Tue: 2 hours"></i><i class="l3" title="Week 8, Tue: 3 hours"></i><i class="l4" title="Week 9, Tue: 4 or more hours"></i><i class="l2" title="Week 10, Tue: 2 hours"></i><i class="l3" title="Week 11, Tue: 3 hours"></i><i class="l2" title="Week 12, Tue: 2 hours"></i><i class="l3" title="Week 13, Tue: 3 hours"></i><i class="l4" title="Week 14, Tue: 4 or more hours"></i><i class="l3" title="Week 15, Tue: 3 hours"></i><i class="l4" title="Week 16, Tue: 4 or more hours"></i><i class="l2" title="Week 17, Tue: 2 hours"></i><i class="l3" title="Week 18, Tue: 3 hours"></i><i class="l4" title="Week 19, Tue: 4 or more hours"></i><i class="l3" title="Week 20, Tue: 3 hours"></i>
    <i class="l3" title="Week 1, Wed: 3 hours"></i><i class="l4" title="Week 2, Wed: 4 or more hours"></i><i class="l2" title="Week 3, Wed: 2 hours"></i><i class="l3" title="Week 4, Wed: 3 hours"></i><i class="l4" title="Week 5, Wed: 4 or more hours"></i><i class="l3" title="Week 6, Wed: 3 hours"></i><i class="l4" title="Week 7, Wed: 4 or more hours"></i><i class="l2" title="Week 8, Wed: 2 hours"></i><i class="l3" title="Week 9, Wed: 3 hours"></i><i class="l4" title="Week 10, Wed: 4 or more hours"></i><i class="l3" title="Week 11, Wed: 3 hours"></i><i class="l4" title="Week 12, Wed: 4 or more hours"></i><i class="l2" title="Week 13, Wed: 2 hours"></i><i class="l3" title="Week 14, Wed: 3 hours"></i><i class="l4" title="Week 15, Wed: 4 or more hours"></i><i class="l3" title="Week 16, Wed: 3 hours"></i><i class="l4" title="Week 17, Wed: 4 or more hours"></i><i class="l3" title="Week 18, Wed: 3 hours"></i><i class="l4" title="Week 19, Wed: 4 or more hours"></i><i class="l4" title="Week 20, Wed: 4 or more hours"></i>
    <i class="l4" title="Week 1, Thu: 4 or more hours"></i><i class="l2" title="Week 2, Thu: 2 hours"></i><i class="l3" title="Week 3, Thu: 3 hours"></i><i class="l2" title="Week 4, Thu: 2 hours"></i><i class="l3" title="Week 5, Thu: 3 hours"></i><i class="l4" title="Week 6, Thu: 4 or more hours"></i><i class="l2" title="Week 7, Thu: 2 hours"></i><i class="l3" title="Week 8, Thu: 3 hours"></i><i class="l2" title="Week 9, Thu: 2 hours"></i><i class="l3" title="Week 10, Thu: 3 hours"></i><i class="l4" title="Week 11, Thu: 4 or more hours"></i><i class="l2" title="Week 12, Thu: 2 hours"></i><i class="l3" title="Week 13, Thu: 3 hours"></i><i class="l2" title="Week 14, Thu: 2 hours"></i><i class="l3" title="Week 15, Thu: 3 hours"></i><i class="l4" title="Week 16, Thu: 4 or more hours"></i><i class="l3" title="Week 17, Thu: 3 hours"></i><i class="l4" title="Week 18, Thu: 4 or more hours"></i><i class="l2" title="Week 19, Thu: 2 hours"></i><i class="l3" title="Week 20, Thu: 3 hours"></i>
    <i class="l2" title="Week 1, Fri: 2 hours"></i><i class="l3" title="Week 2, Fri: 3 hours"></i><i class="l1" title="Week 3, Fri: 1 hour"></i><i class="l3" title="Week 4, Fri: 3 hours"></i><i class="l1" title="Week 5, Fri: 1 hour"></i><i class="l2" title="Week 6, Fri: 2 hours"></i><i class="l3" title="Week 7, Fri: 3 hours"></i><i class="l1" title="Week 8, Fri: 1 hour"></i><i class="l3" title="Week 9, Fri: 3 hours"></i><i class="l1" title="Week 10, Fri: 1 hour"></i><i class="l2" title="Week 11, Fri: 2 hours"></i><i class="l3" title="Week 12, Fri: 3 hours"></i><i class="l1" title="Week 13, Fri: 1 hour"></i><i class="l3" title="Week 14, Fri: 3 hours"></i><i class="l2" title="Week 15, Fri: 2 hours"></i><i class="l3" title="Week 16, Fri: 3 hours"></i><i class="l4" title="Week 17, Fri: 4 or more hours"></i><i class="l2" title="Week 18, Fri: 2 hours"></i><i class="l3" title="Week 19, Fri: 3 hours"></i><i class="l2" title="Week 20, Fri: 2 hours"></i>
    <i title="Week 1, Sat: no study"></i><i class="l1" title="Week 2, Sat: 1 hour"></i><i class="l2" title="Week 3, Sat: 2 hours"></i><i title="Week 4, Sat: no study"></i><i class="l1" title="Week 5, Sat: 1 hour"></i><i title="Week 6, Sat: no study"></i><i class="l1" title="Week 7, Sat: 1 hour"></i><i class="l2" title="Week 8, Sat: 2 hours"></i><i title="Week 9, Sat: no study"></i><i class="l1" title="Week 10, Sat: 1 hour"></i><i title="Week 11, Sat: no study"></i><i class="l1" title="Week 12, Sat: 1 hour"></i><i class="l2" title="Week 13, Sat: 2 hours"></i><i title="Week 14, Sat: no study"></i><i class="l2" title="Week 15, Sat: 2 hours"></i><i title="Week 16, Sat: no study"></i><i class="l2" title="Week 17, Sat: 2 hours"></i><i class="l3" title="Week 18, Sat: 3 hours"></i><i class="l1" title="Week 19, Sat: 1 hour"></i><i class="l2" title="Week 20, Sat: 2 hours"></i>
    <i class="l1" title="Week 1, Sun: 1 hour"></i><i title="Week 2, Sun: no study"></i><i title="Week 3, Sun: no study"></i><i class="l2" title="Week 4, Sun: 2 hours"></i><i title="Week 5, Sun: no study"></i><i class="l1" title="Week 6, Sun: 1 hour"></i><i title="Week 7, Sun: no study"></i><i title="Week 8, Sun: no study"></i><i class="l2" title="Week 9, Sun: 2 hours"></i><i title="Week 10, Sun: no study"></i><i class="l1" title="Week 11, Sun: 1 hour"></i><i title="Week 12, Sun: no study"></i><i title="Week 13, Sun: no study"></i><i class="l2" title="Week 14, Sun: 2 hours"></i><i title="Week 15, Sun: no study"></i><i class="l2" title="Week 16, Sun: 2 hours"></i><i title="Week 17, Sun: no study"></i><i class="l1" title="Week 18, Sun: 1 hour"></i><i class="l2" title="Week 19, Sun: 2 hours"></i><i title="Week 20, Sun: no study"></i>
  </div>
  <div class="cluster" style="--gap: 6px; justify-content: flex-end; font: var(--type-footnote); color: var(--text-subtle);" aria-hidden="true">Less <span class="hm" style="display: flex; gap: 3px;"><i style="width: 12px;"></i><i class="l1" style="width: 12px;"></i><i class="l2" style="width: 12px;"></i><i class="l3" style="width: 12px;"></i><i class="l4" style="width: 12px;"></i></span> More</div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `l1 to l4` | Four filled steps plus empty: five in all. Map your values to steps with fixed thresholds (1, 2, 3, 4+ hours), not by percentile, so the scale means the same every week. |

## States
| State | How |
|---|---|
| `hover` | A cell scales to 1.25 on `--spring-snappy`; its `title` shows the value. |
| `empty period` | All cells empty is a valid state; say so in the subtitle ("No study logged yet") rather than hiding the grid. |
| `loading, error` | See [chart states](chart-states.md). |

## Motion and microinteractions
- Hover: `transform: scale(1.25)` on `--spring-snappy` over `--d-snappy`, back the same way.
- No entrance animation. Reduced motion: the hover scale becomes a 120 ms change.

## Accessibility
- `role="img"` on `.hm` with an `aria-label` that states the pattern; individual cells are not read.
- Cell titles are for mouse users only; give the numbers in a `.sr-only` table or a summary when they matter.
- One hue, light to dark, so it reads in grayscale and for color-blind readers; the scale legend is `aria-hidden` because the label carries the meaning.

## Do
- Use fixed thresholds for the steps and show the scale.
- Describe the pattern in the title, subtitle or label.

## Don't
- Use several hues or a rainbow scale.
- Make cells clickable without making them buttons with names.
- Change the column count with your own CSS on top of `.hm`; ask for a column variable in the system instead.

## Related
[Chart principles](chart-principles.md) · [Calendar](calendar.md) · [Bar chart](bar-chart.md) · [Chart states](chart-states.md)
