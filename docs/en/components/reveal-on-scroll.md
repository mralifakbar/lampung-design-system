# Reveal on scroll

Group: Motion. https://lampung.kartadinata.app/docs/en/components/reveal-on-scroll

Figures, key numbers and illustrations fade up 4 px the first time they scroll into view, once, and never again. Body text, lists and tables are never revealed: people should be able to read and search everything at once.

## Use it when
- Key numbers on a results or landing page ([stat row](stat-row.md)) that come into view as people scroll.
- Illustrations, photos and charts further down a long page.
- A short row of cards or figures arriving together, with a 30 ms stagger through `--i`.

## Use something else when
- Paragraphs, lists, tables, forms: use [Prose](prose.md). They are just there. Revealing reading content makes people wait to read.
- Items that arrive because the person asked (search results): use [List stagger](list-stagger.md).
- Something opening because of a press: use [Enter and exit](enter-and-exit.md).
- Content above the fold on load: use [Motion principles](motion-principles.md). It is already visible: show it at once.
- Loading content that is not there yet: use [Skeleton](skeleton.md).

## Where it goes
On individual figure-like elements: `.stat-row__item`, `.thumb`, `.chart-card`, a `.spotlight`, cards in an `auto-grid`. Never on a section, a whole page or a container of text.

## Markup

**Key numbers on a results page.** Scroll inside the box. The three figures fade up together with a 30 ms step when they come into view; scroll back and they stay put. Press Replay to watch it again.
```html
<div class="stat-row-wrap"><dl class="stat-row">
  <div class="stat-row__item" data-lds-reveal style="--i: 0">…</div>
  <div class="stat-row__item" data-lds-reveal style="--i: 1">…</div>
  <div class="stat-row__item" data-lds-reveal style="--i: 2">…</div>
</dl></div>
<script type="module">
  import { init } from 'lampung-design-system/js';
  init(); // calls observeReveal() when the page has [data-lds-reveal]
</script>
```

**Pictures further down a guide.** Photos in a long service guide fade up as they arrive; the text around them is already there.
```html
<div class="docs-scroll" style="height: 300px;">
  <div class="prose">
    <h3>Getting a business permit at the public service mall</h3>
    <p>Take a queue number from the machine by the entrance. Bring your KTP, family card and a photo of the business.</p>
    <p>Counters open at 07:30 on working days. The waiting room is on the second floor; consultations can be booked a week ahead.</p>
    <p>Levy payments are taken from 08:00 to 14:00 at the counter next to building C.</p>
  </div>
  <div class="auto-grid" style="--min: 140px; margin-top: 24px;">
    <div class="thumb" data-lds-reveal style="--i: 0"></div>
    <div class="thumb" data-lds-reveal style="--i: 1"></div>
    <div class="thumb" data-lds-reveal style="--i: 2"></div>
  </div>
  <div style="height: 100px;"></div>
</div>
```

## Motion and microinteractions
- Hidden state (only once JS has added `.lds-reveal` to `<html>`): `opacity: 0; transform: translateY(4px)`. Shown (`[data-shown]`): opacity over 240 ms and transform over 280 ms, both on `--ease-standard`.
- Stagger: `transition-delay: min(var(--i), 3) × 30ms`. The fourth item and later share 90 ms, so a row is complete in under 400 ms.
- Trigger: an IntersectionObserver with a bottom margin of 6 % of the viewport, threshold 0.01. Each element is revealed once and then unobserved; scrolling back up never hides it.
- No flicker on load: anything already within 95 % of the viewport height is marked shown before the class is added, so the first screen never fades.
- Reduced motion, no JS, no IntersectionObserver, and print: nothing is hidden; everything simply shows.

## Accessibility
- Revealed elements are in the DOM and readable by assistive tech before they are shown; only their paint waits.
- Never reveal text people need to read or controls they need to use.
- The motion is 4 px and once; it cannot trigger motion sickness, and reduced motion removes it anyway.

## Do
- Reveal figures, numbers and pictures; leave reading content alone.
- Use `--i` for a short row, starting at 0.
- Call `observeReveal(root)` again (or `init()`) after rendering new content in a client-side app.

## Don't
- Put `data-lds-reveal` on sections, paragraphs, list rows or table rows.
- Use it above the fold to make a page "come alive".
- Hide content with your own `opacity: 0` waiting for scroll; without JS it would stay invisible.

## Behavior (plain HTML)
`init()` calls `observeReveal(document)` when the page contains `[data-lds-reveal]`. `observeReveal(root)` adds `.lds-reveal` to `<html>`, marks what is already visible, watches the rest (and new markup under `root`, through a MutationObserver), sets `data-shown` when each enters, and returns a stop function. It does nothing under reduced motion.

## React
```tsx
import { useReveal } from 'lampung-design-system/react';

function ResultsPage() {
  useReveal(); // pass a key that changes per route to re-scan
  return <dl className="stat-row">
    <div className="stat-row__item" data-lds-reveal style={{ '--i': 0 }}>…</div>
  </dl>;
}
```

## Related
[Stat row](stat-row.md) · [List stagger](list-stagger.md) · [Thumbnail](thumbnail.md) · [Motion principles](motion-principles.md)
