# Height expand

Group: Motion. Docs page: `docs/components/height-expand.html`.

Content that opens or closes in the flow animates its height through grid rows (`0fr` to `1fr`) on the smooth spring, so everything below slides instead of jumping. The content fades in just after the space opens and fades out before it closes.

## Use it when
- A section opens in place and pushes what is below: [accordion](accordion.md) answers, [tree](tree.md) folders, [show more](show-more.md), nested navigation in the [app shell](app-shell.md).
- Something is dismissed and the space should close smoothly: an [alert](alert.md) or [banner](banner.md) with a close button, a hint that retires ([hints](hints.md)), a row removed by [swipe actions](swipe-actions.md).
- A field or help text appears under a form control after a choice (an "Other" reason box).

## Use something else when
- Content that should float over the page and not push it: use [Popover](popover.md).
- A step the assistant took, opened rarely: use [Tool call](tool-call.md). Native details, no height animation.
- Replacing content in the same space: use [View swap](view-swap.md).
- A panel from the edge of the screen: use [Sheet](sheet.md).
- A new item arriving at the end of a list: use [Enter and exit](enter-and-exit.md).

## Where it goes
Any block in the normal flow. The animated element is a grid wrapper (`acc__panel`, `tree__kids`, `more__rest`, `shell__panel`, `collapse`) with exactly one child that has `overflow: hidden; min-height: 0`.

## Markup

**Questions that open one at a time.** Open a question: the panel grows on the smooth spring and the answer fades in 80 ms later, rising 4 px. With `data-lds-accordion="single"` the open one closes as the next opens; both springs run together.
```html
<div class="acc" data-lds-accordion="single" style="max-width: 520px;">
  <div class="acc__item"><button class="acc__btn" aria-expanded="true" aria-controls="he-1">Can I change my schedule?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel is-open" id="he-1" role="region"><div><p>Yes, until the end of the second week. After that, ask your academic advisor.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="he-2">Where is my transcript?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="he-2" role="region"><div><p>Under Academics, then Records. It updates two days after grades are published.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="he-3">What if I miss an exam?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="he-3" role="region"><div><p>Send the medical note within three days and the faculty schedules a make-up.</p></div></div></div>
</div>
```

**Dismissing an alert.** Close the alert: it fades while its space closes, and the content below glides up. Replay to bring it back.
```html
<div class="docs-col" style="max-width: 520px;">
  <div class="collapse"><div><div class="alert alert--info" role="status"><span class="ic" aria-hidden="true">info</span><div style="flex: 1;"><div class="alert__title">Registration opens Monday at 08:00</div><div class="alert__body">Seats are assigned in the order requests arrive.</div></div><button class="icon-btn alert__close" aria-label="Dismiss" data-lds-dismiss><span class="ic" aria-hidden="true">close</span></button></div></div></div>
  <div class="card"><p class="card__title">Your courses</p><p class="card__sub">4 courses, 14 credits this term</p></div>
</div>
```

**Show the rest of a list.** The first three deadlines show; the rest open under them on the same spring. The button names what it will do.
```html
<div class="more" data-lds-more data-more="Show 3 more" data-less="Show less" style="width: 100%; max-width: 420px;">
  <div class="list">
    <div class="lrow"><span class="lrow__body"><span class="lrow__title">Lab report</span><span class="lrow__sub">Friday, 23:59</span></span></div>
    <div class="lrow"><span class="lrow__body"><span class="lrow__title">Reading response</span><span class="lrow__sub">Saturday, 12:00</span></span></div>
    <div class="lrow"><span class="lrow__body"><span class="lrow__title">Quiz 4</span><span class="lrow__sub">Monday, 08:00</span></span></div>
    <div class="more__rest"><div>
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Group presentation</span><span class="lrow__sub">Wednesday, 10:00</span></span></div>
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Problem set 5</span><span class="lrow__sub">Thursday, 23:59</span></span></div>
      <div class="lrow"><span class="lrow__body"><span class="lrow__title">Midterm review</span><span class="lrow__sub">Next Friday</span></span></div>
    </div></div>
  </div>
  <button class="btn btn--plain btn--sm more__btn"></button>
</div>
```

**Folders in a tree.** A folder opens its children on the spring while its chevron turns 90 degrees on the same spring, so both finish together.
```html
<div class="tree" role="tree" aria-label="Course files" style="max-width: 320px;">
  <button class="tree__row" aria-expanded="true" aria-controls="he-t1"><span class="ic tree__chev" aria-hidden="true">chevron_right</span><span class="ic" aria-hidden="true">folder</span>Week 1</button>
  <div class="tree__kids is-open" id="he-t1"><div><button class="tree__row"><span class="ic" aria-hidden="true">description</span>Syllabus.pdf</button><button class="tree__row"><span class="ic" aria-hidden="true">description</span>Lecture 1 slides</button></div></div>
  <button class="tree__row" aria-expanded="false" aria-controls="he-t2"><span class="ic tree__chev" aria-hidden="true">chevron_right</span><span class="ic" aria-hidden="true">folder</span>Week 2</button>
  <div class="tree__kids" id="he-t2"><div><button class="tree__row"><span class="ic" aria-hidden="true">description</span>Lecture 2 slides</button><button class="tree__row"><span class="ic" aria-hidden="true">description</span>Problem set 1</button></div></div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.acc__panel + .is-open` | Accordion. The content (`<p>` or `.acc__content`) fades in with an 80 ms delay and rises 4 px on `--spring-smooth`; it fades out first over `--d-fast` on close. |
| `.collapse + .is-closed` | Dismissals (alerts, banners, hints). Rows to `0fr` and opacity to 0 together; `data-lds-dismiss` closes the nearest one. |
| `.more__rest (in .more.is-open)` | Show more. Rows only, no fade. |
| `.tree__kids + .is-open` | Tree. Rows only; the chevron rotates 90 degrees on the same spring. |
| `.shell__panel + .is-open` | Nested navigation sections in the app shell. |
| `.swipe.is-gone` | A swiped-away row closing its space. |

## Motion and microinteractions
- Height: `grid-template-rows` from `0fr` to `1fr` (and back) over `--d-smooth` (560 ms) on `--spring-smooth`. The browser interpolates the real content height, so there are no `max-height` guesses and no measuring.
- Content: in accordions it fades in over `--d-standard` with an 80 ms delay (rising from 4 px above) so it appears into space that is already opening; on close it fades out over `--d-fast` on `--ease-exit` before the space is gone.
- Chevrons rotate on the same spring and duration as the height, so icon and panel finish together.
- Interruption: open and close are transitions on a class, so clicking again mid-way reverses from the current height.
- Reduced motion: the height still changes (it carries meaning) but in 120 ms linear; the content fade is 120 ms; the app shell sections switch at once.

## Accessibility
- The trigger is a `<button>` with `aria-expanded` and `aria-controls` pointing at the panel; the panel can be `role="region"` with a label when it holds a lot.
- Closed content is clipped but still in the DOM; make it `inert` (show more does) or hidden after closing if it contains focusable controls.
- Dismissing moves nothing in focus order unexpectedly: after a dismiss, focus the next sensible control.

## Do
- Use the grid wrapper with a single `overflow: hidden; min-height: 0` child.
- Turn chevrons on the same spring as the height.
- Close dismissed things with `.collapse` so the page closes the gap instead of jumping.

## Don't
- Animate `height` or `max-height` directly.
- Fade content in before its space has opened.
- Open more than one level at once with a stagger; let each panel open on its own.

## Behavior (plain HTML)
`init()` wires `.acc__btn[aria-controls]` and `.tree__row[aria-controls]` (toggle `aria-expanded` and `.is-open`; `data-lds-accordion="single"` on the group closes the others), `[data-lds-dismiss]` (adds `.is-closed` to the nearest `.collapse` and emits `lds:dismiss`), and `[data-lds-more]` (toggles `.is-open`, updates the button text from `data-more` / `data-less` and `aria-expanded`, makes the rest `inert` while closed).

## React
```tsx
import { AccordionItem } from 'lampung-design-system/react';

<div className="acc">
  <AccordionItem title="Can I change my schedule?">Yes, until the end of the second week.</AccordionItem>
  <AccordionItem title="Where is my transcript?">Under Academics, then Records.</AccordionItem>
</div>
```

## Related
[Accordion](accordion.md) · [Show more](show-more.md) · [Alert](alert.md) · [Tree](tree.md)
