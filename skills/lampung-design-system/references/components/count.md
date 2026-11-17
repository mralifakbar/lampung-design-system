# Count

Group: Feedback. Docs page: `docs/components/count.html`.

A small red pill with a number of things waiting for the person: unread messages, pending requests. It means "act on these", so use it only for that.

## Use it when
- Unread or pending items that need the person: 3 new messages, 2 requests to approve.
- At the trailing end of a navigation row or a settings row that leads to those items.

## Use something else when
- A count inside a tab label: use [Tabs](tabs.md). Use `.tabs__count`, which is quiet grey.
- A count inside an app shell section heading: use [App shell](app-shell.md).
- A state or a type in words: use [Badge](badge.md).
- A system or connection state: use [Status dot](status-dot.md).
- A key figure on a page (credits, score): use [Stat row](stat-row.md).

## Where it goes
At the end of the row or control that leads to the items, before the chevron. In a navigation row, a sidebar item or a menu item. One count per destination; never on content itself.

## Anatomy
| Part | What it is |
|---|---|
| `.count` | Required. 18 px pill, danger fill, white 11 px semibold tabular figures, 18 px minimum width so one digit is a circle. |
| `.sr-only` | Recommended. Visually hidden words that say what the number counts. |

## Markup

**In navigation rows.** The count sits before the chevron. Cap it at 99+.
```html
<div class="list" style="max-width: 420px;">
  <a class="lrow lrow--icon" href="#messages"><span class="lrow__icon" style="background: var(--tile-blue);"><span class="ic" aria-hidden="true">chat</span></span><span class="lrow__body"><span class="lrow__title">Messages</span></span><span class="count">3<span class="sr-only"> unread</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#requests"><span class="lrow__icon" style="background: var(--tile-orange);"><span class="ic" aria-hidden="true">person_add</span></span><span class="lrow__body"><span class="lrow__title">Registration requests</span></span><span class="count">99+<span class="sr-only"> waiting</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#notifications"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Notifications</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
</div>
```

**Next to a label.** Inside a flex container (a button, a row) the pill keeps its shape.
```html
<div class="docs-row">
  <button class="btn btn--gray btn--md">Inbox<span class="count">12<span class="sr-only"> unread</span></span></button>
</div>
```

## States
| State | How |
|---|---|
| `zero` | Remove the count entirely; never show "0". |
| `over 99` | Write "99+". |

## Motion and microinteractions
- None at rest. When the number changes while visible, a [rolling number](rolling-number.md) can slide the digits on `--spring-smooth`; a count appearing from zero may pop in with `lds-pop-in` over `--d-snappy` once.
- Never pulse or bounce a count to get attention.

## Accessibility
- A bare number means nothing out of context: add visually hidden words inside it (`<span class="sr-only"> unread</span>`) or include them in the row's accessible name.
- When a count increases while the person is on the page, announce it politely only if it matters (a `role="status"` line "2 new messages"); do not make the count itself a live region.
- Red is not the only signal; the number and the words carry it.

## Do
- Use it only for things that wait for the person.
- Clear it as soon as the person has seen the items.
- Place it inside a flex parent (row, button) so it keeps its pill shape.

## Don't
- Use it for totals ("42 services"); write the total as text.
- Show a count on more than two or three destinations at once.
- Use it as a dot without a number.

## Related
[Badge](badge.md) · [Status dot](status-dot.md) · [Tabs](tabs.md) · [List](list.md)
