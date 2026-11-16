# KPI card

Group: Data display (new). Docs page: `docs/components/kpi-card.html`.

One metric on a dashboard: what it is, its value, how it changed against a stated baseline, and optionally its recent shape as a sparkline or mini bars. The value is the point; the change always says what it is compared with.

## Use it when
- The first row of a dashboard: three to six metrics people check every visit (sales, sign-ups, refunds, reply time).
- A metric whose recent shape matters as much as its value: add a sparkline (continuous) or mini bars (per day or week).
- Several metrics of one subject joined into a strip (`.kpi-grid`) at the top of an analytics page.

## Use something else when
- Figures that summarize a page, with no change to report: use [Stat row](stat-row.md). A row of plain figures is quieter and needs no cards.
- A metric with a question and a longer trend the reader studies: use [Sparkline stat](sparkline-stat.md).
- The reader needs values at specific dates: use [Area chart](area-chart.md).
- Progress toward a goal: use [Target bar](target-bar.md).

## Where it goes
At the top of a dashboard in an `auto-grid` (`--min: 220px`), or as one `.kpi-grid` strip. On phones cards stack full width; a strip goes to two columns under 760 px of its container and one under 400 px. Never more than six in a row.

## Anatomy
| Part | What it is |
|---|---|
| `.kpi` | Required. `article` (or `a.kpi--link` when the whole card opens a report). Base background, `--line` ring, 16 px padding, 16 px radius. |
| `.kpi__head` | Required. `.kpi__label` (what is measured), optional `.kpi__icon` before it and one menu `.icon-btn` after it. |
| `.kpi__value` | Required. 28 px tabular figure; a unit in `small`. |
| `.kpi__meta` | Recommended. A [trend delta](trend-delta.md) and the baseline in words ("from $42,890 in October"). |
| `svg.kpi__spark` | Optional. A full-bleed sparkline along the bottom edge: `.series-area` and `.series-line` in a 240 × 52 viewBox, `preserveAspectRatio="none"`. `role="img"` with the trend in words. |
| `.kpi__bars` | Optional. Mini bars, one `i` per period with `--h` as a percent; `.is-on` marks the current one. |
| `.kpi-grid-wrap > .kpi-grid` | Joins cards into one ringed block with hairlines between them; `--n` sets the columns (2, 3, 4 or 6 so rows fill). |

## Markup

**A dashboard's first row.** Sparkline, mini bars, and two cards with an icon. The color of each change follows its meaning: fewer refunds is good, a slower reply is bad. The bottoms grow in on first view.
```html
<div class="auto-grid" style="--min: 220px;" data-lds-grow>
  <article class="kpi" aria-labelledby="kpi-rev">
    <div class="kpi__head"><span class="kpi__label" id="kpi-rev">Course sales</span><div style="position: relative; margin-left: auto;">
      <button class="icon-btn" aria-label="More actions for Course sales" aria-haspopup="menu" aria-expanded="false" data-lds-menu="kpi-rev-menu"><span class="ic" aria-hidden="true">more_horiz</span></button>
      <div class="menu menu--right" id="kpi-rev-menu" role="menu" aria-label="Course sales" style="top: calc(100% + 6px); right: 0;">
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">bar_chart</span>Open report</button>
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Download CSV</button>
      </div>
    </div></div>
    <div class="kpi__value">$48,210</div>
    <div class="kpi__meta"><span class="delta delta--pill delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>12.4%<span class="sr-only"> up</span></span><span>from $42,890 in October</span></div>
    <svg class="kpi__spark" viewBox="0 0 240 52" preserveAspectRatio="none" role="img" aria-label="Daily sales over 30 days, rising"><path class="series-area" d="M0.0 45.5 L8.3 30.0 L16.6 28.6 L24.8 32.9 L33.1 43.7 L41.4 46.0 L49.7 45.5 L57.9 39.0 L66.2 26.8 L74.5 23.5 L82.8 25.4 L91.0 30.5 L99.3 38.0 L107.6 39.4 L115.9 31.9 L124.1 22.5 L132.4 16.4 L140.7 28.6 L149.0 27.7 L157.2 33.3 L165.5 33.3 L173.8 25.8 L182.1 18.8 L190.3 16.9 L198.6 15.0 L206.9 26.3 L215.2 33.8 L223.4 22.1 L231.7 12.2 L240.0 8.0 L240 52 L0 52 Z"></path><path class="series-line" d="M0.0 45.5 L8.3 30.0 L16.6 28.6 L24.8 32.9 L33.1 43.7 L41.4 46.0 L49.7 45.5 L57.9 39.0 L66.2 26.8 L74.5 23.5 L82.8 25.4 L91.0 30.5 L99.3 38.0 L107.6 39.4 L115.9 31.9 L124.1 22.5 L132.4 16.4 L140.7 28.6 L149.0 27.7 L157.2 33.3 L165.5 33.3 L173.8 25.8 L182.1 18.8 L190.3 16.9 L198.6 15.0 L206.9 26.3 L215.2 33.8 L223.4 22.1 L231.7 12.2 L240.0 8.0"></path></svg>
  </article>
  <article class="kpi" aria-labelledby="kpi-sign">
    <div class="kpi__head"><span class="kpi__label" id="kpi-sign">New sign-ups</span></div>
    <div class="kpi__value">632</div>
    <div class="kpi__meta"><span class="delta delta--pill delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>8%<span class="sr-only"> up</span></span><span>this week</span></div>
    <div class="kpi__bars" role="img" aria-label="Sign-ups per day over 14 days; today is the highest"><i style="--h: 59%;"></i><i style="--h: 78%;"></i><i style="--h: 79%;"></i><i style="--h: 71%;"></i><i style="--h: 60%;"></i><i style="--h: 54%;"></i><i style="--h: 60%;"></i><i style="--h: 71%;"></i><i style="--h: 89%;"></i><i style="--h: 100%;"></i><i style="--h: 90%;"></i><i style="--h: 68%;"></i><i style="--h: 59%;"></i><i class="is-on" style="--h: 63%;"></i></div>
  </article>
  <article class="kpi" aria-labelledby="kpi-ref">
    <div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">receipt_long</span></span><span class="kpi__label" id="kpi-ref">Refund requests</span></div>
    <div class="kpi__value">14</div>
    <div class="kpi__meta"><span class="delta delta--pill delta--down delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>36%<span class="sr-only"> down</span></span><span>fewer than last month</span></div>
  </article>
  <article class="kpi" aria-labelledby="kpi-time">
    <div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">schedule</span></span><span class="kpi__label" id="kpi-time">Average reply time</span></div>
    <div class="kpi__value">3.2<small>hours</small></div>
    <div class="kpi__meta"><span class="delta delta--pill delta--bad"><span class="ic" aria-hidden="true">arrow_upward</span>0.6 h<span class="sr-only"> up</span></span><span>slower than last week</span></div>
  </article>
</div>
```

**Joined strip.** Four metrics of one page in one block. Resize the window: four columns, then two, then one.
```html
<div class="kpi-grid-wrap"><div class="kpi-grid" style="--n: 4;">
  <div class="kpi"><div class="kpi__label">Visitors</div><div class="kpi__value">18,240</div><div class="kpi__meta"><span class="delta delta--pill delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>6.1%<span class="sr-only"> up</span></span><span>from 17,190</span></div></div>
  <div class="kpi"><div class="kpi__label">Pages per visit</div><div class="kpi__value">3.4</div><div class="kpi__meta"><span class="delta delta--pill delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>0.2<span class="sr-only"> up</span></span><span>from 3.2</span></div></div>
  <div class="kpi"><div class="kpi__label">Bounce rate</div><div class="kpi__value">41%</div><div class="kpi__meta"><span class="delta delta--pill delta--down delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>3 pts<span class="sr-only"> down</span></span><span>from 44%</span></div></div>
  <div class="kpi"><div class="kpi__label">Time on page</div><div class="kpi__value">2m 48s</div><div class="kpi__meta"><span class="delta delta--pill delta--down delta--bad"><span class="ic" aria-hidden="true">arrow_upward</span>9s<span class="sr-only"> down</span></span><span>from 2m 57s</span></div></div>
</div></div>
```

**The whole card opens the report.** When a card leads to one place, make the card the link. It sinks slightly on press.
```html
<a class="kpi kpi--link" href="#kpi-link" id="kpi-link" style="width: 260px;">
  <div class="kpi__head"><span class="kpi__label">Open support tickets</span><span class="ic" aria-hidden="true" style="color: var(--text-faint);">chevron_right</span></div>
  <div class="kpi__value">27</div>
  <div class="kpi__meta"><span class="delta delta--pill delta--down delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>5<span class="sr-only"> down</span></span><span>since Monday</span></div>
</a>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.kpi__spark` | Continuous measure (sales, visitors): a filled line, no axes, no dots. |
| `.kpi__bars` | Counted per period (sign-ups per day): mini bars with the current one in the series color. |
| `.kpi__icon` | A quiet glyph tile that helps scanning a long row; not a colored tile. |
| `.kpi--link` | The card is one link to the metric's report. |
| `.kpi-grid` | Joined strip. `--n: 2 | 3 | 4 | 6`. |

## States
| State | How |
|---|---|
| `loading` | A `.skel` line for the label, a 28 px block for the value, one for the change; the card keeps its height. |
| `no baseline` | Leave out the delta and say why in the meta ("First month"). |
| `error` | The value stays empty and the meta says "Could not load" with a plain Try again button. |
| `value changed live` | Swap the figure with [rolling number](rolling-number.md); the delta rises in once. |

## Motion and microinteractions
- First view (`data-lds-grow` on the row or the card): the sparkline wipes in from the left over 1 s on `--ease-inout`; mini bars rise from the baseline on `--spring-smooth`, 25 ms apart.
- Link cards sink to 98.5 % in 90 ms on press and return on `--spring-snappy`.
- Reduced motion: everything is drawn at once.

## Accessibility
- Each card is an `article` labelled by its `.kpi__label` (`aria-labelledby`), so a screen reader lists the metrics by name.
- The delta carries the direction in words (`.sr-only` "up" / "down"); color only repeats it.
- Sparklines and mini bars are `role="img"` with the trend in words; they are never the only place a value lives.
- The menu button names its metric: "More actions for Course sales".

## Do
- Say what the change is compared with, in the meta.
- Color the change by whether it is good, not by its direction.
- Keep the same anatomy across one row: all with a sparkline or none.

## Don't
- Put a chart with axes in a KPI card; that is a [chart card](chart-card.md).
- Fill KPI cards with a color or put white text on a hue; the card stays on the base surface.
- Show a percentage change on a base under 20; give the absolute change.

## Behavior (plain HTML)
Optional: `data-lds-grow` on the card or its grid plays the first-view entrance. Everything else is CSS.

## Related
[Stat row](stat-row.md) · [Sparkline stat](sparkline-stat.md) · [Chart card](chart-card.md) · [Trend delta](trend-delta.md)
