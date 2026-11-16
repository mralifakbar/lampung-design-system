# Show more

Group: Data display. Docs page: `docs/components/show-more.html`.

The first few items of a list, then a plain button that reveals the rest in place on the collapse spring, and folds it back.

## Use it when
- A list where the first few items answer most visits: the latest five announcements, the top topics, recent payments.
- A section on an overview page that would otherwise push everything else below the fold.

## Use something else when
- Separate sections people read selectively: use [Accordion](accordion.md).
- Long paged data (search results, a roster): use [Pagination](pagination.md).
- Long text that should be read in full: use [Prose](prose.md).
- Peer views of the same content: use [Tabs](tabs.md).

## Where it goes
Wherever a [list](list.md), a [timeline](timeline.md) or a cluster of [chips](chips.md) would grow too long: under its section heading, full width of the column. The button sits under the visible items, left aligned with them.

## Anatomy
| Part | What it is |
|---|---|
| `.more[data-lds-more]` | Required. The wrapper. `data-more` and `data-less` set the button text ("Show 4 more", "Show less"). |
| `first items` | Required. The items always shown, in their normal markup. |
| `.more__rest > div` | Required. The hidden items, collapsed through grid rows; `inert` while closed. |
| `button.btn.btn--plain.btn--sm.more__btn` | Required. The toggle; the JS writes its text and `aria-expanded`. |
| `.is-open` | On `.more` while the rest is shown. |

## Markup

**Topics.** Six topics shown, the rest behind the button.
```html
<div class="more" data-lds-more data-more="Show 5 more topics" data-less="Show fewer topics" style="max-width: 520px;">
  <div class="cluster"><button class="chip">Algebra</button><button class="chip">Geometry</button><button class="chip">Statistics</button><button class="chip">Reading</button><button class="chip">Vocabulary</button><button class="chip">Logic</button></div>
  <div class="more__rest"><div><div class="cluster" style="padding-top: 8px;"><button class="chip">Civics</button><button class="chip">History</button><button class="chip">Geography</button><button class="chip">Biology</button><button class="chip">Chemistry</button></div></div></div>
  <button class="btn btn--plain btn--sm more__btn"></button>
</div>
```

**Announcements.** The latest three rows, the older ones in place below. The hidden rows sit inside the same list box.
```html
<div class="more" data-lds-more data-more="Show 2 older" data-less="Show less" style="max-width: 460px;">
  <div class="list">
    <a class="lrow" href="#a1"><span class="lrow__body"><span class="lrow__title">Exam rooms for Saturday are posted</span><span class="lrow__sub">Today</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    <a class="lrow" href="#a2"><span class="lrow__body"><span class="lrow__title">Library opens until 22:00 this week</span><span class="lrow__sub">Yesterday</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    <a class="lrow" href="#a3"><span class="lrow__body"><span class="lrow__title">New practice tryout: numerical reasoning</span><span class="lrow__sub">Mon</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    <div class="more__rest"><div>
      <a class="lrow" href="#a4" style="box-shadow: inset 0 0.5px 0 var(--line-strong);"><span class="lrow__body"><span class="lrow__title">Seminar room changed to building C</span><span class="lrow__sub">Last week</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
      <a class="lrow" href="#a5"><span class="lrow__body"><span class="lrow__title">Scholarship applications are open</span><span class="lrow__sub">Last week</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    </div></div>
  </div>
  <button class="btn btn--plain btn--sm more__btn"></button>
</div>
```

## States
| State | How |
|---|---|
| `closed` | Rest collapsed and `inert`; button `aria-expanded="false"` with the `data-more` text. |
| `open` | `.more.is-open`; rest shown; button `aria-expanded="true"` with the `data-less` text. |

## Motion and microinteractions
- `.more__rest` animates `grid-template-rows` 0fr to 1fr on `--spring-smooth` (`--d-smooth`, 560 ms), a transition, so a second press mid-way reverses.
- The items keep their layout while they open; nothing fades or slides sideways. Reduced motion: 120 ms linear.

## Accessibility
- The button is a real `<button>` with `aria-expanded`; the JS keeps it in sync and sets `inert` on the closed rest so Tab and screen readers skip hidden items.
- Write the count in the button text ("Show 5 more topics"), so people know what they get.
- After opening, focus stays on the button; the new items follow it in reading order only if the button sits after them, so place the button below the rest, as in the markup above.

## Do
- Show enough items that most people never need the button (three to six).
- Say how many are hidden.

## Don't
- Hide fewer than three items; just show them.
- Use it for paged data that keeps growing; use [pagination](pagination.md).
- Put the hidden items in a second box below the first.

## Behavior (plain HTML)
`data-lds-more` on `.more` wires `.more__btn` to toggle `.is-open`, writes the button text from `data-more` / `data-less` (defaults "Show more" / "Show less"), sets `aria-expanded` and makes `.more__rest` `inert` while closed. The split between shown and hidden items is in your markup.

## Related
[List](list.md) · [Accordion](accordion.md) · [Pagination](pagination.md) · [Height expand](height-expand.md)
