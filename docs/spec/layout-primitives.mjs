export default {
  title: 'Layout primitives',
  group: 'Foundations',
  order: 1,
  summary: 'Seven small classes that lay out everything between components: `stack`, `cluster`, `auto-grid`, `split-2`, `center`, `measure` and `sr-only`. Reach for them before writing `display: flex` or `grid` by hand.',
  when: [
    'You need to place components next to or under each other: a column of cards (`stack`), a row of buttons or badges that may wrap (`cluster`), a grid of tiles that reflows by width (`auto-grid`).',
    'A page has a narrow side column and a main column that should collapse to one column on tablets and phones (`split-2`).',
    'Text or a single block must sit in the middle of its area (`center`) or long text must keep a readable line length (`measure`).',
    'Something must be read by screen readers but not shown (`sr-only`): a table behind a chart, "opens in a new tab" after an external link.',
  ],
  whenNot: [
    ['Fields, field pairs and the buttons that end a form', 'form-layout', '`form`, `form__row` and `form__actions` already carry the right spacing and the phone behavior.'],
    ['A page made of titled sections with dividers between them', 'sections'],
    ['The app frame: sidebar, top bar, scrolling main area', 'app-shell'],
    ['A row of attached buttons acting on one object', 'button-group', '`cluster` only spaces things; it does not join them.'],
    ['A horizontally scrolling row of cards', 'carousel'],
    ['Two panes the reader resizes by dragging', 'resizable-split'],
  ],
  where: 'Anywhere inside a page, nested as deep as needed: a `stack` of sections, each holding a `cluster` of actions and an `auto-grid` of cards. They carry no color, padding or radius, so they never compete with the components inside them. `split-2` collapses to one column below 860 px; `auto-grid` drops columns on its own as the width shrinks.',
  anatomy: [
    ['.stack', 'Vertical flow. `gap` defaults to 12 px; set `--gap` inline (`style="--gap: 20px"`) for groups (20 to 28) or sections (48).'],
    ['.cluster', 'Horizontal row that wraps, items centered on the cross axis. `--gap` defaults to 8 px.'],
    ['.auto-grid', 'As many equal columns as fit, each at least `--min` wide (default 240 px), never wider than the container. `--gap` defaults to 12 px.'],
    ['.split-2', 'Two columns: a side column `--side` wide (default 320 px) and a main column that takes the rest. `--gap` defaults to 28 px. One column below 860 px.'],
    ['.center', 'Grid that centers its child on both axes and centers text.'],
    ['.measure', 'Caps width at `--size-measure` (680 px), about 70 characters of body text.'],
    ['.sr-only', 'Visually hidden, still in the accessibility tree.'],
  ],
  examples: [
    {
      title: 'Stack and cluster',
      desc: 'A stack for the column, a cluster for the row of actions that wraps on narrow screens. Spacing comes from `--gap`, never from margins on the children.',
      stage: 'block',
      html: `<div class="stack" style="--gap: 16px; max-width: 520px;">
  <div class="stack" style="--gap: 4px;">
    <h3 class="section__title-sm">Linear Algebra, week 6</h3>
    <p class="card__sub">Eigenvalues and diagonalization. 4 lessons, 1 quiz.</p>
  </div>
  <div class="cluster">
    <span class="badge badge--accent">In progress</span>
    <span class="badge">4 of 6 lessons</span>
    <span class="badge badge--warning">Quiz due Friday</span>
  </div>
  <div class="cluster" style="--gap: 10px;">
    <button class="btn btn--primary">Continue lesson 5</button>
    <button class="btn btn--secondary">Open notes</button>
  </div>
</div>`,
    },
    {
      title: 'Auto grid',
      desc: 'Cards at least 200 px wide: four across on a wide screen, two on a tablet, one on a phone, with no media query. Resize the window to see it reflow.',
      stage: 'block',
      html: `<div class="auto-grid" style="--min: 200px;">
  <div class="card"><div class="card__title">Database Systems</div><div class="card__sub">CS 2104 · 3 credits</div></div>
  <div class="card"><div class="card__title">Computer Networks</div><div class="card__sub">CS 3102 · 3 credits</div></div>
  <div class="card"><div class="card__title">Operating Systems</div><div class="card__sub">CS 3001 · 4 credits</div></div>
  <div class="card"><div class="card__title">Linear Algebra</div><div class="card__sub">MA 2201 · 3 credits</div></div>
</div>`,
    },
    {
      title: 'Side and main',
      desc: 'A 240 px side column next to the main content; below 860 px the side column moves above the main one.',
      stage: 'block',
      html: `<div class="split-2" style="--side: 240px;">
  <div class="card card--fill stack" style="--gap: 6px;">
    <div class="card__title">Your progress</div>
    <div class="card__sub">12 of 20 lessons done</div>
    <div class="progress"><span class="progress__fill" style="transform: scaleX(0.6);"></span></div>
  </div>
  <div class="stack measure">
    <h3 class="section__title-sm">Lesson 13: Normal forms</h3>
    <p class="card__sub">Why splitting a table removes update anomalies, and how to tell when a schema is in third normal form.</p>
  </div>
</div>`,
    },
    {
      title: 'Center and hidden text',
      desc: '`center` puts one block in the middle of its area. `sr-only` adds words only screen readers hear.',
      stage: 'block',
      html: `<div class="center" style="min-height: 180px;">
  <div class="stack" style="--gap: 8px; align-items: center;">
    <span class="ic ic--lg" aria-hidden="true">school</span>
    <p class="card__title">You finished every lesson this week</p>
    <a class="link link--external" href="https://example.com" target="_blank" rel="noreferrer">See next week's plan<span class="sr-only"> (opens in a new tab)</span></a>
  </div>
</div>`,
    },
  ],
  variants: [
    ['--gap', 'Spacing on `stack`, `cluster`, `auto-grid`, `split-2`. Stay on the 4 px grid: 8 to 12 for related items, 20 to 28 for groups, 48 for sections.'],
    ['--min', '`auto-grid` only: the narrowest a column may get before the grid drops a column. 160 for small tiles, 240 for cards, 320 for wide cards.'],
    ['--side', '`split-2` only: the side column width.'],
  ],
  motion: [
    'None. Layout primitives never animate. When the children change, use [list stagger](list-stagger) for arrivals or [height expand](height-expand) for growth inside them.',
    'Reflow on resize is instant by design; do not add `transition` on `grid-template-columns`.',
  ],
  a11y: [
    'They change only visual placement. Keep the DOM order the reading order: `split-2` puts the side column first in the source, so put the content that should be read first there, or swap the columns.',
    'Never use `order` or `flex-direction: row-reverse` to rearrange content inside them; keyboard focus follows the source, not the screen.',
    '`sr-only` content is announced and is part of the accessible name of its parent link or button. Do not put focusable elements inside it.',
    'Use headings and landmarks (`<main>`, `<nav>`, `<section aria-labelledby>`) for structure; a `stack` is just a `<div>`.',
  ],
  do: [
    'Set spacing with `--gap` on the parent instead of margins on the children.',
    'Nest primitives: a `stack` of `cluster`s, an `auto-grid` inside a `split-2` main column.',
    'Put `min-width: 0` on custom children of your own grids; the primitives already do it for theirs.',
  ],
  dont: [
    'Write a new `.my-row { display: flex; gap: 12px }` class when `cluster` does the job.',
    'Use `auto-grid` for a form; fields need [form layout](form-layout) so labels and errors line up.',
    'Add backgrounds, padding or radius to a primitive. Wrap the content in a [card](card) instead.',
  ],
  related: ['form-layout', 'sections', 'app-shell', 'card'],
};
