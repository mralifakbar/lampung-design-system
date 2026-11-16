# Carousel

Group: Data display. Docs page: `docs/components/carousel.html`.

A horizontal row of cards that snaps per card under the finger or trackpad, with dots that stretch toward the current page. For browsing optional items, never for content everyone must see.

## Use it when
- A row of optional, similar items to browse: featured courses, new practice sets, upcoming events.
- A phone section where a vertical list would push the main content too far down.

## Use something else when
- A handful of items that all matter: use [Link card](link-card.md). Show them in a grid.
- A list people scan or search: use [List](list.md).
- A picture someone wants to see large: use [Lightbox](lightbox.md).
- Steps of a process: use [Steps](steps.md).
- Peer views of the same content: use [Tabs](tabs.md).

## Where it goes
In a page section under its heading, full width of the content column. Three cards per view by default; one card should peek at the edge on phones so people see there is more. Dots go centred under the row.

## Anatomy
| Part | What it is |
|---|---|
| `.carousel` | Required. A scroll-snapping flex row with 14 px gaps and a hidden scrollbar. `role="region"`, an `aria-label` and `tabindex="0"`. |
| `.carousel > *` | Required. Each item snaps at its start; three fit per view. |
| `.dots` | Optional page dots, centred. |
| `.dots > button[aria-current] > i` | One 24 px button per page; the current dot stretches from 6 to 18 px. |

## Markup

**Featured practice sets.** Scroll or swipe the row; it snaps per card. The dots jump to a page and follow the scroll.
```html
<div class="carousel" role="region" aria-label="Featured practice sets" tabindex="0">
  <div class="card card--fill">…</div>
  <div class="card card--fill">…</div>
</div>
<div class="dots" role="group" aria-label="Pages">
  <button aria-label="Page 1" aria-current="true"><i></i></button>
  <button aria-label="Page 2" aria-current="false"><i></i></button>
</div>
<!-- Your script: on dot click, carousel.scrollTo({ left: page * carousel.clientWidth });
     on carousel scroll, set aria-current on the dot for Math.round(scrollLeft / clientWidth). -->
```

## States
| State | How |
|---|---|
| `current page` | `aria-current="true"` on its dot: the dot stretches to 18 px in the strong ink. |

## Motion and microinteractions
- Scrolling is native, with `scroll-snap-type: x mandatory` and smooth programmatic scrolling, so momentum and snapping feel like the platform.
- The current dot stretches its width on `--spring-smooth` (`--d-smooth`); colors change over `--d-standard`.
- No autoplay, ever.

## Accessibility
- The row is a focusable `role="region"` with an `aria-label`, so keyboard users can scroll it with the arrow keys.
- Every item stays in the DOM and in reading order; items scrolled out of view are still reachable with Tab.
- Dots are buttons with `aria-label="Page n"` and `aria-current`; they are optional, the row works without them.
- No autoplay, so there is nothing to pause.

## Do
- Show part of the next card so people know they can scroll.
- Keep items the same size and kind.
- Link to a full list ("See all practice sets") for people who prefer it.

## Don't
- Autoplay or loop.
- Hide important content in later slides.
- Add arrow buttons that cover the cards on phones.

## Behavior (plain HTML)
None built in: scrolling and snapping are CSS. Syncing the dots with the scroll position and scrolling on dot click take a few lines of your own script (see the code above).

## Related
[Link card](link-card.md) · [Card](card.md) · [Lightbox](lightbox.md) · [Scroll fades](scroll-fades.md)
