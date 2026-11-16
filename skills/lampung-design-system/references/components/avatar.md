# Avatar

Group: Data display. Docs page: `docs/components/avatar.html`.

A circle with a person's initials on a tint, sized with `--size`. Initials until a real photo exists; never generated faces.

## Use it when
- Showing who: an author in a comment, a member in a list, the signed-in person in the top bar.
- A group of people working on something (`.avatar-stack`).
- Whether a person is online (`.avatar__presence`).

## Use something else when
- An icon for a thing (a course, a file type): use [List](list.md). Use `.lrow__icon` in a list row.
- The state of a system or connection: use [Status dot](status-dot.md).
- A large picture someone can open: use [Thumbnail](thumbnail.md).
- A count of waiting items: use [Count](count.md).

## Where it goes
At the start of a row or a message, in the top bar for the signed-in person (32 px), in table cells (28 px). 40 px by default; 24 px in dense meta lines; 56 to 72 px on a profile header.

## Anatomy
| Part | What it is |
|---|---|
| `.avatar` | Required. A circle `--size` wide (40 px default) with initials at 38 % of the size, accent tint. |
| `.avatar--gray` | Neutral tint, to tell people apart in a stack or for people who are not members. |
| `.avatar--sq` | A rounded square (28 % radius) for organizations and groups. |
| `.avatar__presence` | A green dot on the bottom right, ringed in the canvas color. |
| `.avatar-stack` | Overlapping avatars (8 px), each ringed in the fill color; they fan out on hover. Set `--i` per avatar. |

## Markup

**Sizes and variants.** Set `--size`. Gray for non-members, square for groups, presence for online.
```html
<div class="docs-row" style="align-items: flex-end; gap: 14px;">
  <span class="avatar" style="--size: 24px;" aria-hidden="true">AR</span>
  <span class="avatar" style="--size: 32px;" aria-hidden="true">AR</span>
  <span class="avatar" role="img" aria-label="Ayu Rahma, online">AR<span class="avatar__presence"></span></span>
  <span class="avatar avatar--gray" style="--size: 56px;" aria-hidden="true">NS</span>
  <span class="avatar avatar--sq" style="--size: 56px;" role="img" aria-label="Debate club">DC</span>
</div>
```

**Stack.** Overlapping members with a "+2". Hover to fan them out.
```html
<div class="docs-row">
  <div class="avatar-stack" role="img" aria-label="5 members: Ayu, Nadia, Dimas and 2 more"><span class="avatar" style="--i: 0;">AR</span><span class="avatar avatar--gray" style="--i: 1;">NS</span><span class="avatar" style="--i: 2;">DP</span><span class="avatar avatar--gray" style="--i: 3;">+2</span></div>
  <span class="card__sub" style="margin: 0;">5 members are editing</span>
</div>
```

**In a list row.** The name next to the avatar is the accessible name, so the avatar is hidden.
```html
<div class="list" style="max-width: 420px;">
  <div class="lrow"><span class="avatar" aria-hidden="true">AR</span><div class="lrow__body"><div class="lrow__title">Ayu Rahma</div><div class="lrow__sub">Class representative</div></div></div>
  <div class="lrow"><span class="avatar avatar--gray" aria-hidden="true">BW</span><div class="lrow__body"><div class="lrow__title">Budi Wicaksono</div><div class="lrow__sub">Guest lecturer</div></div></div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `avatar` | Accent tint with initials. |
| `avatar--gray` | Neutral tint. |
| `avatar--sq` | Rounded square for groups and organizations. |
| `--size` | Any size; the initials scale with it. |
| `avatar-stack` | Overlapping group, `--i` per item for the fan-out. |

## States
| State | How |
|---|---|
| `online` | `.avatar__presence` inside the avatar. |
| `hover (stack)` | Each avatar shifts `--i` x 4 px right on `--spring-snappy`. |

## Motion and microinteractions
- Stack fan-out on hover: `transform: translateX()` on `--spring-snappy` (`--d-snappy`, 360 ms). Nothing else moves.

## Accessibility
- When the name is next to it, the avatar is `aria-hidden="true"`.
- Alone (a stack, a top bar), give it `role="img"` and an `aria-label` with the name, and the presence in words ("online").
- The presence dot is never the only way to know someone is online where it matters; say it in text too.

## Do
- Use two initials from the name the person goes by.
- Cap a stack at three or four and add "+n".

## Don't
- Use generated or stock faces.
- Use an avatar for things that are not people or groups.
- Color avatars by role with custom colors.

## Related
[List](list.md) · [Chat message](chat-message.md) · [Status dot](status-dot.md) · [Top nav](top-nav.md)
