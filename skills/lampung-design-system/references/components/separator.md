# Separator

Group: Data display. Docs page: `docs/components/separator.html`.

A 1 px hairline between two blocks of content that would otherwise run together, plain or with a few words in it (a date divider, "or"). Most of the time spacing or the component's own dividers are enough.

## Use it when
- Two different groups inside one surface (a card, a panel, a menu-like area) that are not rows of a list.
- Between a block of content and its footer inside a card.
- Labeled: dividing a feed, a chat or an agenda by day ("Today", "Monday, 16 November"), or "or" between two ways to sign in.

## Use something else when
- Between rows of a list: use [List](list.md). Lists draw their own inset hairlines.
- Between key-value rows: use [Key-value](key-value.md).
- Between page sections: use [Sections](sections.md). Sections draw a hairline above each one after the first.
- Between items in a menu: use [Dropdown menu](dropdown-menu.md). Use `.menu__sep`.

## Where it goes
Inside a surface, edge to edge of its content, with at least 12 px of space above and below. Never on the page canvas between sections.

## Anatomy
| Part | What it is |
|---|---|
| `hr.sep` | Required. A 1 px block in `--hairline`, no margin of its own. |
| `.sep--v` | A vertical hairline between items in a row (a toolbar, an app bar), at least 20 px tall. |
| `.sep-label` | A labeled separator: a heading (`h3`) or a `<p>` whose text sits between two hairlines in the caption style. Optional `.count` or `.badge` inside. |

## Markup

**Inside a card.** The hairline splits the summary from its footer. Margin comes from the layout, not the separator.
```html
<div class="card" style="max-width: 360px; width: 100%;">
  <div class="card__title">Posyandu visits</div>
  <div class="card__sub">Your child has been weighed 5 months in a row.</div>
  <hr class="sep" style="margin: 16px 0 12px;">
  <div class="card__sub">Next session: today at 09:00</div>
</div>
```

**Date dividers in a feed.** A labeled separator starts each day. `sep-label--start` drops the left hairline so the date lines up with the rows; `sep-label--sticky` keeps it at the top of a scrolling list while that day is in view.
```html
<div class="stack" style="--gap: 4px; max-width: 460px;">
  <h3 class="sep-label sep-label--start">Today, 16 Nov</h3>
  <div class="lrow"><span class="lrow__body"><span class="lrow__title">Waste levy bill 1042 paid</span><span class="lrow__sub">09:12 · Usaha Kopi Way Kanan</span></span></div>
  <div class="lrow"><span class="lrow__body"><span class="lrow__title">Rina Wijaya joined the Permits unit</span><span class="lrow__sub">08:40 · Invited by Arif</span></span></div>
  <h3 class="sep-label sep-label--start">Yesterday, 15 Nov</h3>
  <div class="lrow"><span class="lrow__body"><span class="lrow__title">Export of 1,204 applicant records finished</span><span class="lrow__sub">17:05 · CSV, 2.1 MB</span></span></div>
</div>
```

**Between two ways to sign in.** Centered words between two hairlines.
```html
<div class="stack" style="--gap: 16px; max-width: 360px;">
  <button class="btn btn--secondary btn--block">Continue with agency email</button>
  <p class="sep-label">or</p>
  <button class="btn btn--plain btn--block">Use a one-time code</button>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.sep` | Horizontal hairline. |
| `.sep--v` | Vertical hairline in a row. |
| `.sep-label` | Words centered between two hairlines. |
| `.sep-label--start` | Words at the start, one hairline after them: date dividers that line up with rows. |
| `.sep-label--sticky` | Stays at the top of its scrolling container (`--sticky-top` offsets it under a sticky bar) on the canvas color. |

## Motion and microinteractions
- None.

## Accessibility
- Use `<hr>` when the break is a change of topic (it is announced as a separator); add `aria-hidden="true"` when it is only visual, so it is not announced.
- A labeled separator that names a group (a day) is a heading, so people can jump between days; "or" between two actions is a plain `<p>`.

## Do
- Try spacing first; add a hairline only when spacing is not enough.
- Space it with the layout (`stack` gaps or margins), never with padding on the separator.

## Don't
- Use thicker or colored lines.
- Stack a separator next to a list hairline or a section hairline.

## Related
[List](list.md) · [Sections](sections.md) · [Card](card.md) · [Layout primitives](layout-primitives.md)
