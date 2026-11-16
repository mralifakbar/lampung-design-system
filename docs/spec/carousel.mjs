export default {
  title: 'Carousel',
  group: 'Data display',
  order: 16,
  summary: 'A horizontal row of cards that snaps per card under the finger or trackpad, with dots that stretch toward the current page. For browsing optional items, never for content everyone must see.',
  when: [
    'A row of optional, similar items to browse: featured courses, new practice sets, upcoming events.',
    'A phone section where a vertical list would push the main content too far down.',
  ],
  whenNot: [
    ['A handful of items that all matter', 'link-card', 'Show them in a grid'],
    ['A list people scan or search', 'list'],
    ['A picture someone wants to see large', 'lightbox'],
    ['Steps of a process', 'steps'],
    ['Peer views of the same content', 'tabs'],
  ],
  where: 'In a page section under its heading, full width of the content column. Three cards per view by default; one card should peek at the edge on phones so people see there is more. Dots go centred under the row.',
  anatomy: [
    ['.carousel', 'Required. A scroll-snapping flex row with 14 px gaps and a hidden scrollbar. `role="region"`, an `aria-label` and `tabindex="0"`.'],
    ['.carousel > *', 'Required. Each item snaps at its start; three fit per view.'],
    ['.dots', 'Optional page dots, centred.'],
    ['.dots > button[aria-current] > i', 'One 24 px button per page; the current dot stretches from 6 to 18 px.'],
  ],
  examples: [
    {
      title: 'Featured practice sets',
      desc: 'Scroll or swipe the row; it snaps per card. The dots jump to a page and follow the scroll.',
      stage: 'block',
      html: `<div class="docs-col">
  <div class="carousel" role="region" aria-label="Featured practice sets" tabindex="0" onscroll="const p = Math.round(this.scrollLeft / Math.max(1, this.scrollWidth - this.clientWidth)); this.nextElementSibling.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-current', String(i === p)));">
    <div class="card card--fill"><div class="card__title">Verbal reasoning</div><div class="card__sub">35 questions · 40 min</div></div>
    <div class="card card--fill"><div class="card__title">Numerical reasoning</div><div class="card__sub">30 questions · 30 min</div></div>
    <div class="card card--fill"><div class="card__title">General knowledge</div><div class="card__sub">40 questions · 35 min</div></div>
    <div class="card card--fill"><div class="card__title">Reading speed</div><div class="card__sub">10 passages · 20 min</div></div>
    <div class="card card--fill"><div class="card__title">Logic puzzles</div><div class="card__sub">20 questions · 25 min</div></div>
    <div class="card card--fill"><div class="card__title">Civics basics</div><div class="card__sub">30 questions · 20 min</div></div>
  </div>
  <div class="dots" role="group" aria-label="Pages">
    <button aria-label="Page 1" aria-current="true" onclick="const c = this.parentElement.previousElementSibling; c.scrollTo({ left: 0 });"><i></i></button>
    <button aria-label="Page 2" aria-current="false" onclick="const c = this.parentElement.previousElementSibling; c.scrollTo({ left: c.scrollWidth });"><i></i></button>
  </div>
</div>`,
      code: `<div class="carousel" role="region" aria-label="Featured practice sets" tabindex="0">
  <div class="card card--fill">…</div>
  <div class="card card--fill">…</div>
</div>
<div class="dots" role="group" aria-label="Pages">
  <button aria-label="Page 1" aria-current="true"><i></i></button>
  <button aria-label="Page 2" aria-current="false"><i></i></button>
</div>
<!-- Your script: on dot click, carousel.scrollTo({ left: page * carousel.clientWidth });
     on carousel scroll, set aria-current on the dot for Math.round(scrollLeft / clientWidth). -->`,
    },
  ],
  states: [
    ['current page', '`aria-current="true"` on its dot: the dot stretches to 18 px in the strong ink.'],
  ],
  motion: [
    'Scrolling is native, with `scroll-snap-type: x mandatory` and smooth programmatic scrolling, so momentum and snapping feel like the platform.',
    'The current dot stretches its width on `--spring-smooth` (`--d-smooth`); colors change over `--d-standard`.',
    'No autoplay, ever.',
  ],
  a11y: [
    'The row is a focusable `role="region"` with an `aria-label`, so keyboard users can scroll it with the arrow keys.',
    'Every item stays in the DOM and in reading order; items scrolled out of view are still reachable with Tab.',
    'Dots are buttons with `aria-label="Page n"` and `aria-current`; they are optional, the row works without them.',
    'No autoplay, so there is nothing to pause.',
  ],
  do: [
    'Show part of the next card so people know they can scroll.',
    'Keep items the same size and kind.',
    'Link to a full list ("See all practice sets") for people who prefer it.',
  ],
  dont: [
    'Autoplay or loop.',
    'Hide important content in later slides.',
    'Add arrow buttons that cover the cards on phones.',
  ],
  js: 'None built in: scrolling and snapping are CSS. Syncing the dots with the scroll position and scrolling on dot click take a few lines of your own script (see the code above).',
  related: ['link-card', 'card', 'lightbox', 'scroll-fades'],
};
