export default {
  title: 'Scroll fades',
  group: 'Microinteractions',
  order: 12,
  summary: 'A scrolling area fades an edge only while more content waits beyond it: the top edge appears once you leave the start, the bottom edge disappears when you reach the end. A fade always means "there is more this way".',
  when: [
    'A fixed-height area inside a page that scrolls on its own: service terms in a card, a long list in a panel, terms in a dialog.',
    'A horizontal row that scrolls sideways: filter chips, a tab row on phones.',
  ],
  whenNot: [
    ['The page itself scrolling', 'layout-primitives', 'Pages scroll normally; no fades.'],
    ['A row of cards with snap points and dots', 'carousel'],
    ['Text cut short on purpose with a button to read on', 'show-more'],
    ['A menu or list that fits', 'list'],
  ],
  where: 'On the scrolling element itself (`overflow: auto` with a fixed height or width). Fades are 24 px at most.',
  anatomy: [
    ['.fade-edges', 'Required. `data-lds-fade`. A vertical mask with `--fade-a` (top) and `--fade-b` (bottom).'],
    ['.fade-edges--x', 'Horizontal: the mask runs left to right.'],
  ],
  examples: [
    {
      title: 'Service terms in a card',
      desc: 'Scroll the terms. At the start only the bottom edge fades; in the middle both do; at the end only the top.',
      stage: 'fill',
      html: `<div class="card" style="max-width: 420px;">
  <p class="card__title">Business permit service terms</p>
  <div class="fade-edges" data-lds-fade style="max-height: 150px; overflow: auto; margin-top: 8px;">
    <p class="card__sub">Applications are processed from the first of each month. Incomplete files are returned and must be completed within five working days, after which the application lapses. The help desk moves to Thursday afternoons while the service building is renovated. A jointly owned business needs one shared folder of documents and a short note on each owner's role. Photos of the business site are taken in daylight and show the sign board. If you cannot attend the site check, send a notice within three days and you get a new slot the following week. From week 3 a letter of domicile must be attached. The final check covers every document, especially the environmental and zoning ones.</p>
  </div>
</div>`,
    },
    {
      title: 'A row of filter chips',
      desc: 'On narrow screens the chips scroll sideways; the right edge fades while more chips wait, the left once you have scrolled.',
      html: `<div class="fade-edges fade-edges--x" data-lds-fade style="overflow-x: auto; max-width: 340px; scrollbar-width: none;">
  <div class="chip-row" style="flex-wrap: nowrap; width: max-content; padding: 2px;">
    <button class="chip" aria-pressed="true"><span class="ic chip__check" aria-hidden="true">check</span>All services</button>
    <button class="chip" aria-pressed="false"><span class="ic chip__check" aria-hidden="true">check</span>Health</button>
    <button class="chip" aria-pressed="false"><span class="ic chip__check" aria-hidden="true">check</span>Permits</button>
    <button class="chip" aria-pressed="false"><span class="ic chip__check" aria-hidden="true">check</span>Civil registry</button>
    <button class="chip" aria-pressed="false"><span class="ic chip__check" aria-hidden="true">check</span>Local tax</button>
    <button class="chip" aria-pressed="false"><span class="ic chip__check" aria-hidden="true">check</span>Transport</button>
  </div>
</div>`,
    },
  ],
  motion: [
    'The fade size follows the scroll position directly: `--fade-a` is the distance from the start, `--fade-b` the distance to the end, each capped at 24 px. So it grows as you leave an edge and shrinks as you arrive, with no transition and no lag.',
    'Recomputed on scroll (passive listener) and on resize (ResizeObserver), so content that grows updates the fades.',
    'Reduced motion: nothing changes; it tracks your own scrolling, it is not an animation.',
  ],
  a11y: [
    'Purely visual (a CSS mask). Content under the fade is still there for screen readers and keyboard focus.',
    'Make the scroller reachable by keyboard: if it holds no focusable elements, give it `tabindex="0"` and a label.',
    'Do not hide the scrollbar on vertical areas; on horizontal chip rows, hiding it is acceptable when the fade shows there is more.',
  ],
  do: [
    'Use it on every fixed-size area that scrolls inside a page.',
    'Keep the area tall enough to show at least three lines or items.',
  ],
  dont: [
    'Add a permanent gradient overlay that shows even at the end.',
    'Use it on the page body.',
  ],
  js: '`[data-lds-fade]` on `init()`: keeps `--fade-a` and `--fade-b` in sync with the scroll position and size.',
  related: ['carousel', 'chips', 'show-more', 'layout-primitives'],
};
