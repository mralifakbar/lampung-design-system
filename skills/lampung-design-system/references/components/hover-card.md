# Hover card

Group: Overlays. Docs page: `docs/components/hover-card.html`.

A preview card under a link after a 600 ms hover or on focus: who a person is, what a service covers. It saves a click; it never holds the only copy of anything.

## Use it when
- A mention or link to a person, service or document where a quick look saves opening it: the name of an officer, a service code in a table.
- Dense lists where people scan many links and want context before choosing one.

## Use something else when
- A one-line name or shortcut for a control: use [Tooltip](tooltip.md).
- Content people need to click into or edit: use [Popover](popover.md). A popover opens on click and stays until dismissed.
- Commands on the item: use [Dropdown menu](dropdown-menu.md).
- Touch-first screens: use [Sheet](sheet.md). There is no hover on touch; open a sheet or the page on tap.

## Where it goes
10 px below the link, aligned to its left edge, 280 px wide. Leave room below it; it does not flip.

## Anatomy
| Part | What it is |
|---|---|
| `.tip-host` | Required. Wraps the link and the card; shows the card on hover and focus. |
| `a.link` | Required. The trigger: a real link to the full page. |
| `.hovercard` | Required. The card: 280 px, 16 px padding, elevated. Content is short: a title, one line, maybe an avatar. |

## Markup

**Officer mention.** Hover or tab to the name: the card waits 600 ms, then rises in.
```html
<p class="section__sub" style="align-self: flex-start;">Questions about permit documents go to
  <span class="tip-host"><a class="link" href="#hc" aria-describedby="hc-1">Ayu Lestari</a><span class="hovercard" role="tooltip" id="hc-1"><span class="card__title" style="display: block;">Ayu Lestari</span><span class="card__sub" style="display: block;">Verification officer, permit desk. Service hours Tuesday 13:00 to 15:00.</span></span></span>
  before Friday.</p>
```

**Service code in a table cell.** A short preview with an avatar-like mark.
```html
<span class="tip-host" style="align-self: flex-start;"><a class="link" href="#hc" aria-describedby="hc-2">IUM 2104</a><span class="hovercard" role="tooltip" id="hc-2"><span class="cluster" style="--gap: 12px; flex-wrap: nowrap;"><span class="avatar avatar--sq" aria-hidden="true">IU</span><span><span class="card__title" style="display: block;">Micro business permit</span><span class="card__sub" style="display: block;">Done in 3 working days · 48 applications</span></span></span></span></span>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.hovercard` | Opens under the trigger, aligned to its start edge. Width 280 px, never wider than the screen minus 32 px. |
| `.hovercard--end` | Aligned to the trigger's end edge. Use it when the trigger sits in the right half of its column, so the card opens toward the free space instead of past the edge. |

## States
| State | How |
|---|---|
| `:hover / :focus-within` | Shown after 600 ms; stays while the pointer is over the link or the card. |
| `leaving` | Hides after 150 ms, so the pointer can travel from the link to the card. |

## Motion and microinteractions
- In: waits 600 ms, then opacity over `--d-fast` on `--ease-enter` and from `translateY(-4px) scale(0.97)` on `--spring-smooth`, growing from the top left.
- Out: after a 150 ms grace, 120 ms on `--ease-exit`.
- Reduced motion: the delays stay, transitions drop to 120 ms linear.

## Accessibility
- The link works on its own and goes to the full page; the card is a preview.
- It shows on keyboard focus too. Link it with `aria-describedby` so the summary is read after the link name.
- Keep interactive elements out of it: it is `role="tooltip"` and keyboard users cannot move into it.

## Do
- Show two or three facts that help decide whether to open the link.
- Use it where people hover links in bulk.

## Don't
- Put buttons ("Follow", "Message") in a hover card.
- Use it for anything people must read.

## Related
[Tooltip](tooltip.md) · [Popover](popover.md) · [Avatar](avatar.md) · [Link](link.md)
