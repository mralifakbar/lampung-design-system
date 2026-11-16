# Badge

Group: Feedback. Docs page: `docs/components/badge.html`.

A small, non-interactive label for the state or type of a thing: Draft, Overdue, Approved. Human words, one or two at most per item.

## Use it when
- Showing the state of a record in a row, a card or a table cell: Draft, In review, Approved, Overdue.
- Marking a type or category that helps scanning: Seminar, Free, New.
- A short time-bound flag: "Due tomorrow", "Ends today".

## Use something else when
- A number of unread or pending items: use [Count](count.md).
- The live health of a system or a connection, with a dot: use [Status dot](status-dot.md).
- The person can press it to filter or choose: use [Chips](chips.md).
- Removable tags the person typed: use [Tag input](tag-input.md).
- A person is online: use [Avatar](avatar.md). Use `.avatar__presence`.
- A sentence of explanation: use [Alert](alert.md).

## Where it goes
Next to the title it describes (after it in a row, above it in a card), or in its own table column. On phones it stays on one line; if a row has no room, move the badge under the title.

## Anatomy
| Part | What it is |
|---|---|
| `.badge` | Required. 22 px tall, 6 px radius, 12 px medium text, neutral tint. |
| `.badge--accent|success|warning|danger` | Tone tint and text. |
| `.badge--solid` | Accent fill with white text: the one badge that must stand out (rare). |
| `.badge--outline` | Transparent with a hairline: a quiet type or category. |
| `.ic` | Optional 14 px leading icon. |

## Markup

**Tones for states.** Neutral for draft, accent for in progress, success, warning, danger. The words carry the meaning.
```html
<div class="docs-row">
  <span class="badge">Draft</span>
  <span class="badge badge--accent">In review</span>
  <span class="badge badge--success"><span class="ic" aria-hidden="true">check</span>Approved</span>
  <span class="badge badge--warning">Due tomorrow</span>
  <span class="badge badge--danger">Overdue</span>
  <span class="badge badge--outline">Seminar</span>
  <span class="badge badge--solid">New</span>
</div>
```

**In a list row.** The badge sits at the end of the row, after the text.
```html
<div class="list" style="max-width: 460px;">
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Essay on climate policy</div><div class="lrow__sub">Submitted 12 Nov</div></div><span class="badge badge--accent">In review</span></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Lab report 4</div><div class="lrow__sub">Due 10 Nov</div></div><span class="badge badge--danger">Overdue</span></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Reading notes, week 8</div><div class="lrow__sub">Graded 8 Nov</div></div><span class="badge badge--success">Graded</span></div>
</div>
```

**On a card.** Above the title for a type, beside it for a state.
```html
<div class="card" style="max-width: 320px;">
  <span class="badge badge--outline">Workshop</span>
  <div class="card__title" style="margin-top: 10px;">Writing a strong cover letter</div>
  <div class="card__sub">Thursday, 13:00 · Room B2</div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `badge` | Neutral: draft, archived, not started. |
| `badge--accent` | In progress, in review, current. |
| `badge--success` | Done, approved, paid, open (seats). |
| `badge--warning` | Needs attention soon: due tomorrow, expiring. |
| `badge--danger` | Failed, overdue, full, declined. |
| `badge--outline` | A quiet category or type. |
| `badge--solid` | The single badge that must stand out ("New" on one item). |

## Motion and microinteractions
- None at rest. When a state changes in place, change the words with [text morph](text-morph.md) and let the tint cross-fade; do not pop or pulse the badge.

## Accessibility
- A badge is text, read in place; make sure the row reads well ("Lab report 4, Overdue").
- Never make it clickable. If it must open something, it is a [chip](chips.md) or a button.
- The tone must also be in the words; "Overdue" in red, not a red badge saying "4".

## Do
- Use the same word for the same state everywhere in the product.
- Keep it to one or two words in sentence case.
- Limit an item to one state badge (plus at most one type badge).

## Don't
- Put numbers in a badge; use a [count](count.md).
- Use badges as buttons or filters.
- Invent new colors; map each state to one of the tones.

## Related
[Count](count.md) · [Status dot](status-dot.md) · [Chips](chips.md) · [List](list.md)
