const STAT = (i, label, value, sub) => `<div class="stat-row__item" data-lds-reveal style="--i: ${i}"><dt class="stat-row__label">${label}</dt><dd class="stat-row__value">${value}</dd>${sub ? `<span class="stat-row__sub">${sub}</span>` : ''}</div>`;

export default {
  title: 'Reveal on scroll',
  group: 'Motion',
  order: 11,
  status: 'new',
  summary: 'Figures, key numbers and illustrations fade up 4 px the first time they scroll into view, once, and never again. Body text, lists and tables are never revealed: people should be able to read and search everything at once.',
  when: [
    'Key numbers on a results or landing page ([stat row](stat-row)) that come into view as people scroll.',
    'Illustrations, photos and charts further down a long page.',
    'A short row of cards or figures arriving together, with a 30 ms stagger through `--i`.',
  ],
  whenNot: [
    ['Paragraphs, lists, tables, forms', 'prose', 'They are just there. Revealing reading content makes people wait to read.'],
    ['Items that arrive because the person asked (search results)', 'list-stagger'],
    ['Something opening because of a press', 'enter-and-exit'],
    ['Content above the fold on load', 'motion-principles', 'It is already visible: show it at once.'],
    ['Loading content that is not there yet', 'skeleton'],
  ],
  where: 'On individual figure-like elements: `.stat-row__item`, `.thumb`, `.chart-card`, a `.spotlight`, cards in an `auto-grid`. Never on a section, a whole page or a container of text.',
  examples: [
    {
      title: 'Key numbers on a results page',
      desc: 'Scroll inside the box. The three figures fade up together with a 30 ms step when they come into view; scroll back and they stay put. Press Replay to watch it again.',
      stage: 'block',
      replay: true,
      html: `<div class="docs-scroll fade-edges" data-lds-fade style="height: 300px;">
  <div class="prose" style="padding-bottom: 24px;">
    <h3>Tryout 3 results</h3>
    <p>You answered 84 of 100 questions in 1 hour 52 minutes. Scroll down to see how that compares with your last tryout and with everyone who took it this week.</p>
    <p>The verbal section improved the most. Numeric reasoning is close to the passing line, so the next practice set focuses there.</p>
    <p>Scores are final once the review period ends on Friday.</p>
  </div>
  <div class="stat-row-wrap"><dl class="stat-row">
    ${STAT(0, 'Your score', '421', 'Up 36 from tryout 2')}
    ${STAT(1, 'Passing line', '311', '')}
    ${STAT(2, 'Percentile', '82', 'Among 4,120 people')}
  </dl></div>
  <div style="height: 120px;"></div>
</div>`,
      code: `<div class="stat-row-wrap"><dl class="stat-row">
  <div class="stat-row__item" data-lds-reveal style="--i: 0">…</div>
  <div class="stat-row__item" data-lds-reveal style="--i: 1">…</div>
  <div class="stat-row__item" data-lds-reveal style="--i: 2">…</div>
</dl></div>
<script type="module">
  import { init } from 'lampung-design-system/js';
  init(); // calls observeReveal() when the page has [data-lds-reveal]
</script>`,
    },
    {
      title: 'Pictures further down a guide',
      desc: 'Photos in a long campus guide fade up as they arrive; the text around them is already there.',
      stage: 'block',
      replay: true,
      html: `<div class="docs-scroll" style="height: 300px;">
  <div class="prose">
    <h3>Your first week on campus</h3>
    <p>Pick up your student card at the service desk in the main hall. Bring your ID card and the acceptance letter.</p>
    <p>The library opens at 07:30 on weekdays. The quiet floor is the third one; group rooms can be booked a week ahead.</p>
    <p>Lunch is served from 11:00 to 14:00 in the canteen next to building C.</p>
  </div>
  <div class="auto-grid" style="--min: 140px; margin-top: 24px;">
    <div class="thumb" data-lds-reveal style="--i: 0"></div>
    <div class="thumb" data-lds-reveal style="--i: 1"></div>
    <div class="thumb" data-lds-reveal style="--i: 2"></div>
  </div>
  <div style="height: 100px;"></div>
</div>`,
    },
  ],
  motion: [
    'Hidden state (only once JS has added `.lds-reveal` to `<html>`): `opacity: 0; transform: translateY(4px)`. Shown (`[data-shown]`): opacity over 240 ms and transform over 280 ms, both on `--ease-standard`.',
    'Stagger: `transition-delay: min(var(--i), 3) × 30ms`. The fourth item and later share 90 ms, so a row is complete in under 400 ms.',
    'Trigger: an IntersectionObserver with a bottom margin of 6 % of the viewport, threshold 0.01. Each element is revealed once and then unobserved; scrolling back up never hides it.',
    'No flicker on load: anything already within 95 % of the viewport height is marked shown before the class is added, so the first screen never fades.',
    'Reduced motion, no JS, no IntersectionObserver, and print: nothing is hidden; everything simply shows.',
  ],
  a11y: [
    'Revealed elements are in the DOM and readable by assistive tech before they are shown; only their paint waits.',
    'Never reveal text people need to read or controls they need to use.',
    'The motion is 4 px and once; it cannot trigger motion sickness, and reduced motion removes it anyway.',
  ],
  do: [
    'Reveal figures, numbers and pictures; leave reading content alone.',
    'Use `--i` for a short row, starting at 0.',
    'Call `observeReveal(root)` again (or `init()`) after rendering new content in a client-side app.',
  ],
  dont: [
    'Put `data-lds-reveal` on sections, paragraphs, list rows or table rows.',
    'Use it above the fold to make a page "come alive".',
    'Hide content with your own `opacity: 0` waiting for scroll; without JS it would stay invisible.',
  ],
  js: '`init()` calls `observeReveal(document)` when the page contains `[data-lds-reveal]`. `observeReveal(root)` adds `.lds-reveal` to `<html>`, marks what is already visible, watches the rest (and new markup under `root`, through a MutationObserver), sets `data-shown` when each enters, and returns a stop function. It does nothing under reduced motion.',
  react: `import { useReveal } from 'lampung-design-system/react';

function ResultsPage() {
  useReveal(); // pass a key that changes per route to re-scan
  return <dl className="stat-row">
    <div className="stat-row__item" data-lds-reveal style={{ '--i': 0 }}>…</div>
  </dl>;
}`,
  related: ['stat-row', 'list-stagger', 'thumbnail', 'motion-principles'],
};
