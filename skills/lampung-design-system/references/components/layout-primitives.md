# Layout primitives

Group: Foundations. Docs page: `docs/components/layout-primitives.html`.

Seven small classes that lay out everything between components: `stack`, `cluster`, `auto-grid`, `split-2`, `center`, `measure` and `sr-only`. Reach for them before writing `display: flex` or `grid` by hand.

## Use it when
- You need to place components next to or under each other: a column of cards (`stack`), a row of buttons or badges that may wrap (`cluster`), a grid of tiles that reflows by width (`auto-grid`).
- A page has a narrow side column and a main column that should collapse to one column on tablets and phones (`split-2`).
- Text or a single block must sit in the middle of its area (`center`) or long text must keep a readable line length (`measure`).
- Something must be read by screen readers but not shown (`sr-only`): a table behind a chart, "opens in a new tab" after an external link.

## Use something else when
- Fields, field pairs and the buttons that end a form: use [Form layout](form-layout.md). `form`, `form__row` and `form__actions` already carry the right spacing and the phone behavior.
- A page made of titled sections with dividers between them: use [Sections](sections.md).
- The app frame: sidebar, top bar, scrolling main area: use [App shell](app-shell.md).
- A row of attached buttons acting on one object: use [Button group](button-group.md). `cluster` only spaces things; it does not join them.
- A horizontally scrolling row of cards: use [Carousel](carousel.md).
- Two panes the reader resizes by dragging: use [Resizable split](resizable-split.md).

## Where it goes
Anywhere inside a page, nested as deep as needed: a `stack` of sections, each holding a `cluster` of actions and an `auto-grid` of cards. They carry no color, padding or radius, so they never compete with the components inside them. `split-2` collapses to one column below 860 px; `auto-grid` drops columns on its own as the width shrinks.

## Anatomy
| Part | What it is |
|---|---|
| `.stack` | Vertical flow. `gap` defaults to 12 px; set `--gap` inline (`style="--gap: 20px"`) for groups (20 to 28) or sections (48). |
| `.cluster` | Horizontal row that wraps, items centered on the cross axis. `--gap` defaults to 8 px. |
| `.auto-grid` | As many equal columns as fit, each at least `--min` wide (default 240 px), never wider than the container. `--gap` defaults to 12 px. |
| `.split-2` | Two columns: a side column `--side` wide (default 320 px) and a main column that takes the rest. `--gap` defaults to 28 px. One column below 860 px. |
| `.center` | Grid that centers its child on both axes and centers text. |
| `.measure` | Caps width at `--size-measure` (680 px), about 70 characters of body text. |
| `.sr-only` | Visually hidden, still in the accessibility tree. |

## Markup

**Stack and cluster.** A stack for the column, a cluster for the row of actions that wraps on narrow screens. Spacing comes from `--gap`, never from margins on the children.
```html
<div class="stack" style="--gap: 16px; max-width: 520px;">
  <div class="stack" style="--gap: 4px;">
    <h3 class="section__title-sm">Micro business permit, stage 2</h3>
    <p class="card__sub">File check and site survey. 4 steps, 1 visit.</p>
  </div>
  <div class="cluster">
    <span class="badge badge--accent">In progress</span>
    <span class="badge">4 of 6 steps</span>
    <span class="badge badge--warning">Survey on Friday</span>
  </div>
  <div class="cluster" style="--gap: 10px;">
    <button class="btn btn--primary">Continue step 5</button>
    <button class="btn btn--secondary">Open officer notes</button>
  </div>
</div>
```

**Auto grid.** Cards at least 200 px wide: four across on a wide screen, two on a tablet, one on a phone, with no media query. Resize the window to see it reflow.
```html
<div class="auto-grid" style="--min: 200px;">
  <div class="card"><div class="card__title">Identity card (KTP)</div><div class="card__sub">Disdukcapil · 3 working days</div></div>
  <div class="card"><div class="card__title">Micro business permit</div><div class="card__sub">Licensing · 5 working days</div></div>
  <div class="card"><div class="card__title">Vehicle tax</div><div class="card__sub">Samsat · 1 working day</div></div>
  <div class="card"><div class="card__title">Puskesmas referral</div><div class="card__sub">Health · same day</div></div>
</div>
```

**Side and main.** A 240 px side column next to the main content; below 860 px the side column moves above the main one.
```html
<div class="split-2" style="--side: 240px;">
  <div class="card card--fill stack" style="--gap: 6px;">
    <div class="card__title">Application progress</div>
    <div class="card__sub">12 of 20 files checked</div>
    <div class="progress"><span class="progress__fill" style="transform: scaleX(0.6);"></span></div>
  </div>
  <div class="stack measure">
    <h3 class="section__title-sm">Step 13: Site inspection</h3>
    <p class="card__sub">An officer visits the business address to match the floor sketch with the conditions on site, then uploads the result.</p>
  </div>
</div>
```

**Center and hidden text.** `center` puts one block in the middle of its area. `sr-only` adds words only screen readers hear.
```html
<div class="center" style="min-height: 180px;">
  <div class="stack" style="--gap: 8px; align-items: center;">
    <span class="ic ic--lg" aria-hidden="true">checklist</span>
    <p class="card__title">Every file this week has been checked</p>
    <a class="link link--external" href="https://example.com" target="_blank" rel="noreferrer">See next week's schedule<span class="sr-only"> (opens in a new tab)</span></a>
  </div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `--gap` | Spacing on `stack`, `cluster`, `auto-grid`, `split-2`. Stay on the 4 px grid: 8 to 12 for related items, 20 to 28 for groups, 48 for sections. |
| `--min` | `auto-grid` only: the narrowest a column may get before the grid drops a column. 160 for small tiles, 240 for cards, 320 for wide cards. |
| `--side` | `split-2` only: the side column width. |

## Motion and microinteractions
- None. Layout primitives never animate. When the children change, use [list stagger](list-stagger.md) for arrivals or [height expand](height-expand.md) for growth inside them.
- Reflow on resize is instant by design; do not add `transition` on `grid-template-columns`.

## Accessibility
- They change only visual placement. Keep the DOM order the reading order: `split-2` puts the side column first in the source, so put the content that should be read first there, or swap the columns.
- Never use `order` or `flex-direction: row-reverse` to rearrange content inside them; keyboard focus follows the source, not the screen.
- `sr-only` content is announced and is part of the accessible name of its parent link or button. Do not put focusable elements inside it.
- Use headings and landmarks (`<main>`, `<nav>`, `<section aria-labelledby>`) for structure; a `stack` is just a `<div>`.

## Do
- Set spacing with `--gap` on the parent instead of margins on the children.
- Nest primitives: a `stack` of `cluster`s, an `auto-grid` inside a `split-2` main column.
- Put `min-width: 0` on custom children of your own grids; the primitives already do it for theirs.

## Don't
- Write a new `.my-row { display: flex; gap: 12px }` class when `cluster` does the job.
- Use `auto-grid` for a form; fields need [form layout](form-layout.md) so labels and errors line up.
- Add backgrounds, padding or radius to a primitive. Wrap the content in a [card](card.md) instead.

## Related
[Form layout](form-layout.md) · [Sections](sections.md) · [App shell](app-shell.md) · [Card](card.md)
