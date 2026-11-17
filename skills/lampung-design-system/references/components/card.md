# Card

Group: Data display. Docs page: `docs/components/card.html`.

A surface that holds one subject: an event, a bill, a service. White with a hairline ring on the canvas, or the quiet fill on white. Never a shadow.

## Use it when
- A self-contained subject with several parts (title, meta, a figure, an action) that sits beside other subjects in a grid.
- A panel that groups one topic on a dashboard ("Local tax", "Next schedule").
- A whole surface that opens one thing (`.card--link`).

## Use something else when
- A list of similar items: use [List](list.md). Stacked cards for a list is the most common sign of a hand-made page.
- A grid of destinations on an overview page: use [Link card](link-card.md).
- A few key figures for a page: use [Stat row](stat-row.md).
- A big number with its label, and maybe a trend: use [KPI card](kpi-card.md).
- The one next step on a page: use [Spotlight](spotlight.md).
- Label and value details: use [Key-value](key-value.md). Put the `dl` inside the card when the card needs a title.

## Where it goes
In an [auto grid](layout-primitives.md) (`.auto-grid`) on overview pages, two or three across on wide screens and one per row on phones; or as a single panel in a column. Cards on the canvas are white; cards inside a white panel use `.card--fill`.

## Anatomy
| Part | What it is |
|---|---|
| `.card` | Required. White, large radius, hairline ring, 16 px padding. |
| `.card--fill` | Quiet fill, no ring. |
| `.card--link` | On an `<a>`: the whole card opens one thing and sinks to 98.5 % on press. |
| `.card__media` | Optional 132 px media area flush with the top edge. |
| `.card__title` | The subject, 16 px semibold. |
| `.card__sub` | Meta under the title, 13 px subtle. |

## Markup

**A panel with a figure and an action.** Title, meta, the figure that matters, and one action.
```html
<div class="card" style="max-width: 340px; width: 100%;">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;"><div><div class="card__title">Land and building tax</div><div class="card__sub">Tax year 2026</div></div><span class="badge badge--warning">Due in 5 days</span></div>
  <div style="font: 600 28px/34px var(--font); letter-spacing: -0.022em; color: var(--text-strong); margin: 18px 0 2px; font-variant-numeric: tabular-nums;">Rp 1.250.000</div>
  <div class="card__sub">Pay by bank transfer or virtual account.</div>
  <button class="btn btn--primary btn--md btn--block" style="margin-top: 16px;">Pay tax</button>
</div>
```

**Linked cards in a grid.** The whole card is one link; it sinks on press.
```html
<div class="auto-grid" style="--min: 220px;">
  <a class="card card--link" href="#seminar"><div class="card__media"><span class="ic" style="font-size: 28px;" aria-hidden="true">image</span></div><span class="badge badge--accent">Seminar</span><div class="card__title" style="margin-top: 10px;">Designing services for slow networks</div><div class="card__sub">Thursday, 13:00 · Hall B</div></a>
  <a class="card card--link" href="#workshop"><div class="card__media"><span class="ic" style="font-size: 28px;" aria-hidden="true">image</span></div><span class="badge badge--outline">Training</span><div class="card__title" style="margin-top: 10px;">Writing a UMKM business proposal</div><div class="card__sub">Friday, 10:00 · Room B2</div></a>
</div>
```

**Fill on white.** Inside a white panel, use the fill so you never get a ring inside a ring.
```html
<div class="card" style="max-width: 420px;">
  <div class="card__title">This week</div>
  <div class="card card--fill" style="margin-top: 12px;"><div class="card__title">Toddler posyandu</div><div class="card__sub">Opens Wednesday at 09:00 · 2 hours</div></div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `card` | White with a ring, on the canvas. |
| `card--fill` | Quiet fill, on white surfaces. |
| `card--link` | The whole card is one link. |

## States
| State | How |
|---|---|
| `hover (card--link)` | The ring turns `--line-strong`. |
| `:active (card--link)` | Sinks to `scale(0.985)` in 90 ms, back on `--spring-snappy`. |
| `loading` | [Skeleton](skeleton.md) shapes inside the same card. |
| `empty` | An [empty state](empty-state.md) inside the card. |

## Motion and microinteractions
- Linked cards: press sinks to 0.985 in 90 ms and springs back on `--spring-snappy`; the ring color changes over `--d-fast`.
- No hover lift, no shadow growth.
- Cards that arrive together may stagger once ([list stagger](list-stagger.md)).

## Accessibility
- A linked card is one `<a>`: its text is the link name, so keep it short (title, meta). Do not put buttons or other links inside it.
- A panel card with its own heading uses a real heading element when it starts a section of the page.
- Media placeholders and decorative icons are `aria-hidden`; real images need `alt`.

## Do
- Give each card one subject and at most one primary action.
- Use `.card--fill` inside white surfaces.
- Lay cards out with `.auto-grid`, not custom grids.

## Don't
- Add `box-shadow`, borders or a custom radius.
- Use cards for a list of rows.
- Nest a white card inside a white card.

## Related
[List](list.md) · [Link card](link-card.md) · [KPI card](kpi-card.md) · [Stat row](stat-row.md)
