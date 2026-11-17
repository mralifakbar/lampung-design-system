const ROW = (t, s) => `<div class="lrow"><span class="lrow__body"><span class="lrow__title">${t}</span><span class="lrow__sub">${s}</span></span></div>`;

export default {
  title: 'Height expand',
  group: 'Motion',
  order: 5,
  summary: 'Content that opens or closes in the flow animates its height through grid rows (`0fr` to `1fr`) on the smooth spring, so everything below slides instead of jumping. The content fades in just after the space opens and fades out before it closes.',
  when: [
    'A section opens in place and pushes what is below: [accordion](accordion) answers, [tree](tree) folders, [show more](show-more), nested navigation in the [app shell](app-shell).',
    'Something is dismissed and the space should close smoothly: an [alert](alert) or [banner](banner) with a close button, a hint that retires ([hints](hints)), a row removed by [swipe actions](swipe-actions).',
    'A field or help text appears under a form control after a choice (an "Other" reason box).',
  ],
  whenNot: [
    ['Content that should float over the page and not push it', 'popover'],
    ['A step the assistant took, opened rarely', 'tool-call', 'Native details, no height animation.'],
    ['Replacing content in the same space', 'view-swap'],
    ['A panel from the edge of the screen', 'sheet'],
    ['A new item arriving at the end of a list', 'enter-and-exit'],
  ],
  where: 'Any block in the normal flow. The animated element is a grid wrapper (`acc__panel`, `tree__kids`, `more__rest`, `shell__panel`, `collapse`) with exactly one child that has `overflow: hidden; min-height: 0`.',
  examples: [
    {
      title: 'Questions that open one at a time',
      desc: 'Open a question: the panel grows on the smooth spring and the answer fades in 80 ms later, rising 4 px. With `data-lds-accordion="single"` the open one closes as the next opens; both springs run together.',
      stage: 'block',
      html: `<div class="acc" data-lds-accordion="single" style="max-width: 520px;">
  <div class="acc__item"><button class="acc__btn" aria-expanded="true" aria-controls="he-1">Can I change my visit schedule?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel is-open" id="he-1" role="region"><div><p>Yes, up to one day before the appointment. After that, call the puskesmas registration desk.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="he-2">Where can I see my checkup results?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="he-2" role="region"><div><p>Under History, then Checkup results. Results appear two days after the visit.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="he-3">What if I don't show up?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="he-3" role="region"><div><p>Your queue number is cancelled. Register again to get a new appointment.</p></div></div></div>
</div>`,
    },
    {
      title: 'Dismissing an alert',
      desc: 'Close the alert: it fades while its space closes, and the content below glides up. Replay to bring it back.',
      stage: 'block',
      replay: true,
      html: `<div class="docs-col" style="max-width: 520px;">
  <div class="collapse"><div><div class="alert alert--info" role="status"><span class="ic" aria-hidden="true">info</span><div style="flex: 1;"><div class="alert__title">Business permit registration opens Monday at 08:00</div><div class="alert__body">Applications are processed in the order they arrive.</div></div><button class="icon-btn alert__close" aria-label="Dismiss" data-lds-dismiss><span class="ic" aria-hidden="true">close</span></button></div></div></div>
  <div class="card"><p class="card__title">Your applications</p><p class="card__sub">2 applications, 1 waiting for verification</p></div>
</div>`,
    },
    {
      title: 'Show the rest of a list',
      desc: 'The first three deadlines show; the rest open under them on the same spring. The button names what it will do.',
      stage: 'fill',
      html: `<div class="more" data-lds-more data-more="Show 3 more" data-less="Show less" style="width: 100%; max-width: 420px;">
  <div class="list">
    ${ROW('Vehicle tax', 'Friday, 23:59')}
    ${ROW('Waste collection fee', 'Saturday, 12:00')}
    ${ROW('Business permit renewal', 'Monday, 08:00')}
    <div class="more__rest"><div>
      ${ROW('Land and building tax', 'Wednesday, 10:00')}
      ${ROW('Market stall fee', 'Thursday, 23:59')}
      ${ROW('Annual business report', 'Next Friday')}
    </div></div>
  </div>
  <button class="btn btn--plain btn--sm more__btn"></button>
</div>`,
    },
    {
      title: 'Folders in a tree',
      desc: 'A folder opens its children on the spring while its chevron turns 90 degrees on the same spring, so both finish together.',
      stage: 'block',
      html: `<div class="tree" role="tree" aria-label="Application files" style="max-width: 320px;">
  <button class="tree__row" aria-expanded="true" aria-controls="he-t1"><span class="ic tree__chev" aria-hidden="true">chevron_right</span><span class="ic" aria-hidden="true">folder</span>Applicant details</button>
  <div class="tree__kids is-open" id="he-t1"><div><button class="tree__row"><span class="ic" aria-hidden="true">description</span>KTP.pdf</button><button class="tree__row"><span class="ic" aria-hidden="true">description</span>Family card</button></div></div>
  <button class="tree__row" aria-expanded="false" aria-controls="he-t2"><span class="ic tree__chev" aria-hidden="true">chevron_right</span><span class="ic" aria-hidden="true">folder</span>Business details</button>
  <div class="tree__kids" id="he-t2"><div><button class="tree__row"><span class="ic" aria-hidden="true">description</span>Photo of business premises</button><button class="tree__row"><span class="ic" aria-hidden="true">description</span>Proof of domicile letter</button></div></div>
</div>`,
    },
  ],
  variants: [
    ['.acc__panel + .is-open', 'Accordion. The content (`<p>` or `.acc__content`) fades in with an 80 ms delay and rises 4 px on `--spring-smooth`; it fades out first over `--d-fast` on close.'],
    ['.collapse + .is-closed', 'Dismissals (alerts, banners, hints). Rows to `0fr` and opacity to 0 together; `data-lds-dismiss` closes the nearest one.'],
    ['.more__rest (in .more.is-open)', 'Show more. Rows only, no fade.'],
    ['.tree__kids + .is-open', 'Tree. Rows only; the chevron rotates 90 degrees on the same spring.'],
    ['.shell__panel + .is-open', 'Nested navigation sections in the app shell.'],
    ['.swipe.is-gone', 'A swiped-away row closing its space.'],
  ],
  motion: [
    'Height: `grid-template-rows` from `0fr` to `1fr` (and back) over `--d-smooth` (560 ms) on `--spring-smooth`. The browser interpolates the real content height, so there are no `max-height` guesses and no measuring.',
    'Content: in accordions it fades in over `--d-standard` with an 80 ms delay (rising from 4 px above) so it appears into space that is already opening; on close it fades out over `--d-fast` on `--ease-exit` before the space is gone.',
    'Chevrons rotate on the same spring and duration as the height, so icon and panel finish together.',
    'Interruption: open and close are transitions on a class, so clicking again mid-way reverses from the current height.',
    'Reduced motion: the height still changes (it carries meaning) but in 120 ms linear; the content fade is 120 ms; the app shell sections switch at once.',
  ],
  a11y: [
    'The trigger is a `<button>` with `aria-expanded` and `aria-controls` pointing at the panel; the panel can be `role="region"` with a label when it holds a lot.',
    'Closed content is clipped but still in the DOM; make it `inert` (show more does) or hidden after closing if it contains focusable controls.',
    'Dismissing moves nothing in focus order unexpectedly: after a dismiss, focus the next sensible control.',
  ],
  do: [
    'Use the grid wrapper with a single `overflow: hidden; min-height: 0` child.',
    'Turn chevrons on the same spring as the height.',
    'Close dismissed things with `.collapse` so the page closes the gap instead of jumping.',
  ],
  dont: [
    'Animate `height` or `max-height` directly.',
    'Fade content in before its space has opened.',
    'Open more than one level at once with a stagger; let each panel open on its own.',
  ],
  js: '`init()` wires `.acc__btn[aria-controls]` and `.tree__row[aria-controls]` (toggle `aria-expanded` and `.is-open`; `data-lds-accordion="single"` on the group closes the others), `[data-lds-dismiss]` (adds `.is-closed` to the nearest `.collapse` and emits `lds:dismiss`), and `[data-lds-more]` (toggles `.is-open`, updates the button text from `data-more` / `data-less` and `aria-expanded`, makes the rest `inert` while closed).',
  react: `import { AccordionItem } from 'lampung-design-system/react';

<div className="acc">
  <AccordionItem title="Can I change my visit schedule?">Yes, up to one day before the appointment.</AccordionItem>
  <AccordionItem title="Where can I see my checkup results?">Under History, then Checkup results.</AccordionItem>
</div>`,
  related: ['accordion', 'show-more', 'alert', 'tree'],
};
