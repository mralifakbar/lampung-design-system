# Link card

Group: Page patterns. https://lampung.kartadinata.app/docs/en/components/link-card

A grid of destinations on the quiet fill: each card is one link with an eyebrow, a title, a line of detail and a foot whose chevron leans toward where it goes.

## Use it when
- A hub page that sends people to a few places of equal weight: my applications, citizen reports, payment history, settings.
- Each destination deserves a sentence or a status ("3 files to complete", "Updated today").
- Two to about nine destinations; the grid fills columns of at least 300 px.

## Use something else when
- Many destinations, or ones that only need a name: use [List](list.md). Linked rows (`a.lrow`) with a chevron.
- The one next step for this person: use [Spotlight](spotlight.md).
- A box that shows content and has several actions inside: use [Card](card.md).
- App navigation that is always there: use [Sidebar](sidebar.md). Or a [top nav](top-nav.md) or the phone [tab bar](phone-bars.md)
- Choosing an option in a form: use [Radio card](radio-card.md).
- Key figures: use [Stat row](stat-row.md).

## Where it goes
Inside a [section](sections.md) on hub and dashboard pages, full width of the column. The grid uses `auto-fill` with 300 px minimum columns: one column on phones, two or three on wide screens.

## Anatomy
| Part | What it is |
|---|---|
| `.link-grid` | Required. The grid, 12 px gaps. |
| `a.link-card` | Required. The whole card is one `<a href>` (or a `<button>` for an in-page action). Quiet fill, large radius, 18 by 20 padding. |
| `.link-card__eyebrow` | Optional. Caption with a small icon: the kind of destination. |
| `.link-card__title` | Required. The destination name, headline size. |
| `.link-card__body` | Optional. One line of detail. |
| `.link-card__foot` | Optional. Status at the bottom (pushed down so feet line up) with a `.lrow__chev` chevron at the end. |

## Markup

**Where to go.** Hover (with a mouse) tints the card and moves the chevron 3 px toward the destination; pressing sinks it slightly.
```html
<div class="link-grid" style="width: 100%;">
  <a class="link-card" href="#"><span class="link-card__eyebrow"><span class="ic ic--sm" aria-hidden="true">assignment</span>Licensing</span><span class="link-card__title">Micro business permit</span><span class="link-card__body">Stage 2: document check by an officer</span><span class="link-card__foot">3 files to complete<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
  <a class="link-card" href="#"><span class="link-card__eyebrow"><span class="ic ic--sm" aria-hidden="true">receipt_long</span>Payments</span><span class="link-card__title">Regional tax</span><span class="link-card__body">Every bill and receipt so far</span><span class="link-card__foot">Updated today<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
  <a class="link-card" href="#"><span class="link-card__eyebrow"><span class="ic ic--sm" aria-hidden="true">campaign</span>Complaints</span><span class="link-card__title">Citizen reports</span><span class="link-card__body">Over 2,000 reports with their follow-up</span><span class="link-card__foot">18 followed<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
</div>
```

**Short cards.** Title and foot only, for a settings hub.
```html
<div class="link-grid" style="width: 100%;">
  <a class="link-card" href="#"><span class="link-card__title">Profile</span><span class="link-card__foot">Name, photo, address<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
  <a class="link-card" href="#"><span class="link-card__title">Notifications</span><span class="link-card__foot">Email and push<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
  <a class="link-card" href="#"><span class="link-card__title">Bills</span><span class="link-card__foot">Due 31 December<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
</div>
```

## States
| State | How |
|---|---|
| `hover (fine pointer)` | Background deepens to `--bg-tint-strong`; the chevron moves 3 px right and turns accent. |
| `:active` | The card sinks to 0.985 in `--d-instant` (120 ms). |
| `focus-visible` | The system focus ring around the card. |

## Motion and microinteractions
- Hover: background in `--d-fast` (160 ms) on `--ease-standard`; the chevron `translateX(3px)` on `--spring-snappy` (360 ms). Only on devices with hover and a fine pointer, so touch never sticks in the hover state.
- Press: `scale(0.985)` (wide targets barely sink), back on `--spring-snappy`. See [press feedback](press-feedback.md).
- Cards in a grid that loads may enter with [list stagger](list-stagger.md) once; never on every visit to the page.
- Reduced motion: transitions become 120 ms linear; no travel.

## Accessibility
- One link per card: the whole card is the `<a>`, so its name is the text inside. Do not nest other links or buttons in it.
- Keep the title first in the reading order after the eyebrow, and short, so the link name starts with the destination.
- The chevron is decorative (`aria-hidden`).

## Do
- Write the foot as a fact about the destination ("3 tasks open").
- Keep cards in a grid of the same kind; mix kinds in separate sections.

## Don't
- Add images, shadows or borders to make one card stand out; use a [spotlight](spotlight.md) for the one that matters.
- Put buttons inside a link card.
- Make a link card that is not a link (a `div` gets no hover or press).

## Related
[List](list.md) · [Spotlight](spotlight.md) · [Card](card.md) · [Sections](sections.md)
