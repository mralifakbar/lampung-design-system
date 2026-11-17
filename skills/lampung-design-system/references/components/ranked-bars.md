# Ranked bars

Group: Charts. Docs page: `docs/components/ranked-bars.html`.

Rows of a label, a horizontal bar and its value, sorted longest first: top sources, top pages, best scores. Long labels stay readable because they sit beside (or inside) the bar instead of under it, and every row shares one grid so bars and values line up.

## Use it when
- Ranking 3 to 10 named things by one value: traffic sources, pages, services, officers, districts.
- Category names are long or many ("Kelurahan websites", "/services/business-permit"), which vertical bars would have to rotate.
- A leaderboard: rank, who, and the score, with the bar as a quick sense of the gaps.

## Use something else when
- Categories that have an order of their own (weekdays, months): use [Bar chart](bar-chart.md).
- Progress of each item toward its own goal: use [Target bar](target-bar.md).
- Parts that add up to one whole: use [Percentage bar](percentage-bar.md).
- Many records compared on several attributes: use [Table](table.md).
- Steps of a flow where each keeps a share of the one before: use [Funnel](funnel.md).

## Where it goes
In a [chart card](chart-card.md), half width on a dashboard. Under 480 px the bar moves under its label and value, full width. Set `--label-w` on `.hbars` to change the label column (default 140 px).

## Anatomy
| Part | What it is |
|---|---|
| `.hbars` | Required. The grid: label column, bar column, value column. `role="list"` when the rows are a ranking. |
| `.hbar` | Required. One row; a subgrid of `.hbars`, so values line up across rows. `.is-top` marks the leader. |
| `.hbar__label` | Required. The name; may start with `.hbar__rank`, `.hbar__media` (an icon tile or `.avatar`) and carry a `.hbar__sub` line. |
| `.hbar__track > .hbar__fill` | Required. 10 px track; `--v` sets the fill as a percent of the largest value. |
| `.hbar__val` | Required. The value, tabular; may hold a [trend delta](trend-delta.md). |
| `.hbars--inside` | Variant. 36 px tint bars with the label inside, for long labels in narrow cards. |
| `.hbars--muted` | Variant. Every bar but `.is-top` recedes to the tint. |

## Markup

**Top sources with their change.** Icon, name, bar, visits and the change against last month. Point at a row to bring it forward. Bars grow in on first view.
```html
<section class="chart-card" style="max-width: 560px;" aria-labelledby="rb-src">
  <div><div class="chart-card__q" id="rb-src">Where do service portal visitors come from?</div><div class="chart-card__sub">Visits by source, November</div></div>
  <div class="hbars" role="list" data-lds-grow aria-label="Visits by source">
  <div role="listitem" class="hbar is-top"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">search</span></span><span>Search</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 100.0%;"></span></span><span class="hbar__val">4,210<span class="delta delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>12%<span class="sr-only"> up</span></span></span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">mail</span></span><span>Newsletter</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 56.5%;"></span></span><span class="hbar__val">2,380<span class="delta delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>4%<span class="sr-only"> up</span></span></span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">location_city</span></span><span>Kelurahan websites</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 40.6%;"></span></span><span class="hbar__val">1,710<span class="delta delta--bad delta--down"><span class="ic" aria-hidden="true">arrow_upward</span>6%<span class="sr-only"> down</span></span></span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">share</span></span><span>Social posts</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 22.8%;"></span></span><span class="hbar__val">960<span class="delta delta--good"><span class="ic" aria-hidden="true">arrow_upward</span>21%<span class="sr-only"> up</span></span></span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">link</span></span><span>Direct</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 15.2%;"></span></span><span class="hbar__val">640<span class="delta delta--bad delta--down"><span class="ic" aria-hidden="true">arrow_upward</span>2%<span class="sr-only"> down</span></span></span></div>
  </div>
</section>
```

**Leaderboard.** Rank, avatar and service unit under the name; one quiet color so the gaps carry the story.
```html
<section class="chart-card" style="max-width: 560px;" aria-labelledby="rb-lead">
  <div><div class="chart-card__q" id="rb-lead">Which officers do citizens rate best?</div><div class="chart-card__sub">Citizen satisfaction out of 100, top five, this quarter</div></div>
  <div class="hbars" role="list" data-lds-grow style="--label-w: 220px;" aria-label="Top five satisfaction scores">
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__rank">1</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">NP</span><span><span>Nadia Putri</span><span class="hbar__sub">Business permit counter</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 96%;"></span></span><span class="hbar__val">96</span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__rank">2</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">RH</span><span><span>Rizky Hartono</span><span class="hbar__sub">KTP counter</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 91%;"></span></span><span class="hbar__val">91</span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__rank">3</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">ML</span><span><span>Mei Lin Tan</span><span class="hbar__sub">Business permit counter</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 88%;"></span></span><span class="hbar__val">88</span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__rank">4</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">DS</span><span><span>Dimas Saputra</span><span class="hbar__sub">Complaints desk</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 84%;"></span></span><span class="hbar__val">84</span></div>
  <div role="listitem" class="hbar"><span class="hbar__label"><span class="hbar__rank">5</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">AL</span><span><span>Ayu Lestari</span><span class="hbar__sub">KTP counter</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: 79%;"></span></span><span class="hbar__val">79</span></div>
  </div>
</section>
```

**Labels inside, switching the period.** Long paths fit inside tint bars. Switch the period: bars move to their new lengths over 480 ms.
```html
<div class="hbars hbars--inside" role="list" aria-label="Views per page">
  <div role="listitem" class="hbar is-top"><span class="hbar__track"><span class="hbar__fill" style="--v: 100%;"></span><span class="hbar__label">/services/e-ktp</span></span><span class="hbar__val">3,120</span></div>
  …
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.hbar__media` | An icon tile (sources, products) or an `.avatar` (people) before the name. |
| `.hbar__rank` | Position number for leaderboards. |
| `.hbar__sub` | A second line under the name: service unit, category, visits. |
| `.hbars--inside` | Label inside a 36 px tint bar; the leader gets a 3 px accent edge. |
| `.hbars--muted` | Only the leader in the series color. |
| `--label-w` | Width of the label column on `.hbars`. |

## States
| State | How |
|---|---|
| `hover` | The row under the pointer stays, the others fade to 55 %. |
| `data change` | Set new `--v` values: fills move over 480 ms on `--ease-inout`. Re-sort only after the move, or not at all while someone reads. |
| `loading` | Five `.skel` rows: a label block and a 10 px strip. |
| `empty` | Keep the title; one line saying no visits came in for the period. |

## Motion and microinteractions
- First view (`data-lds-grow`): fills grow from zero on `--spring-smooth` (560 ms), 35 ms apart from the top row.
- Value changes: width over `--d-considered` on `--ease-inout`, from the current width.
- Hover fade over `--d-fast`. Reduced motion: values switch in 120 ms, no stagger.

## Accessibility
- Use `role="list"` on `.hbars` and `role="listitem"` on rows when the order is the point; the label and value are real text, so the list reads "Search, 4,210, 12% up".
- The bar is decoration on top of the value; no extra label is needed.
- A delta carries "up" or "down" in `.sr-only` text.

## Do
- Sort longest first; say the period in the subtitle.
- Scale every bar to the largest value in the set, or to a fixed maximum such as 100 for scores.

## Don't
- Give every bar its own color.
- Cut the bar axis above zero.
- Show more than ten rows; add a link to the full table instead.

## Behavior (plain HTML)
Optional: `data-lds-grow` on `.hbars` (or its card) plays the first-view entrance. Values change by setting `--v` on each fill.

## Related
[Bar chart](bar-chart.md) · [Target bar](target-bar.md) · [Funnel](funnel.md) · [Chart card](chart-card.md)
