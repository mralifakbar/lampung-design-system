# Timeline

Group: Data display. Docs page: `docs/components/timeline.html`.

Events in time order on a vertical line, with filled dots for what is done. For the history or the plan of one thing, oldest first.

## Use it when
- The history of one record: a permit application from submitted to decided, a citizen report from received to handled.
- A plan with dated milestones where some are done: a road repair schedule, a regional scholarship process.

## Use something else when
- The steps of a flow the person is completing right now (a form wizard): use [Steps](steps.md).
- Instructions to follow in order: use [List](list.md). Use numbered rows (`.lrow--num`)
- A feed of many unrelated events: use [List](list.md).
- Picking a date: use [Calendar](calendar.md).
- What an assistant did, step by step: use [Tool call](tool-call.md).

## Where it goes
Inside a [card](card.md) or a side panel about the thing it tracks, under a title. Full width of its column on phones. Keep it under about eight items; older ones go behind [show more](show-more.md).

## Anatomy
| Part | What it is |
|---|---|
| `ol.tl` | Required. The column of events. |
| `li.tl__item` | Required. A 24 px dot column and the text; a 2 px line joins each dot to the next (not after the last). |
| `.tl__dot` | Required. A 24 px ringed circle; may hold a 15 px icon. |
| `.tl__dot--done` | Accent fill with a white icon (`check`): done. |
| `.tl__title` | Required. What happened or will happen. |
| `.tl__meta` | The date, and who or what, in subtle text. |

## Markup

**A permit application, from submitted to issued.** Done items filled, the current item with an icon, upcoming items empty.
```html
<div class="card" style="max-width: 400px;">
  <div class="card__title" style="margin-bottom: 16px;">Building approval (PBG)</div>
  <ol class="tl">
    <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">check</span></span><div><div class="tl__title">Documents received</div><div class="tl__meta"><span class="sr-only">Done. </span>12 Sep</div></div></li>
    <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">check</span></span><div><div class="tl__title">Site survey</div><div class="tl__meta"><span class="sr-only">Done. </span>20 Oct</div></div></li>
    <li class="tl__item" aria-current="step"><span class="tl__dot"><span class="ic" aria-hidden="true">schedule</span></span><div><div class="tl__title">Technical drawing revision</div><div class="tl__meta">18 Nov · in progress</div></div></li>
    <li class="tl__item"><span class="tl__dot"></span><div><div class="tl__title">Permit issued</div><div class="tl__meta">Date to be set</div></div></li>
  </ol>
</div>
```

**A scholarship application history.** Every item is done; icons say what kind of event it was.
```html
<ol class="tl" style="max-width: 400px;">
  <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">upload_file</span></span><div><div class="tl__title">Documents uploaded</div><div class="tl__meta">2 Nov, 09:14</div></div></li>
  <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">visibility</span></span><div><div class="tl__title">Checked by the regional scholarship committee</div><div class="tl__meta">5 Nov, 13:40</div></div></li>
  <li class="tl__item"><span class="tl__dot tl__dot--done"><span class="ic" aria-hidden="true">mail</span></span><div><div class="tl__title">Award letter sent</div><div class="tl__meta">9 Nov, 10:02</div></div></li>
</ol>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `tl__dot` | Upcoming or neutral: ringed, empty or with a subtle icon. |
| `tl__dot--done` | Done: accent fill, white icon. |

## States
| State | How |
|---|---|
| `done` | `.tl__dot--done` with `check` and "Done" for screen readers. |
| `current` | An icon in the plain dot (`schedule`) and `aria-current="step"` on the item, with "in progress" in the meta. |
| `upcoming` | Empty dot; the meta says when, or "Date to be set". |

## Motion and microinteractions
- None at rest. When an item becomes done while in view, change its dot directly and update the text; new items may enter with [list stagger](list-stagger.md) once.

## Accessibility
- Use `<ol>`: the order is part of the meaning.
- The dot is visual; say "Done" in visually hidden text and mark the current item with `aria-current="step"`.
- Dates in the meta are plain text or a [timestamp](timestamp.md) `<time>` element.

## Do
- Order oldest first, so the line reads like a story.
- Keep titles short and in the past tense for done items.

## Don't
- Use a timeline as a step indicator for a form; use [steps](steps.md).
- Put long descriptions under every item; link to details instead.

## Related
[Steps](steps.md) · [List](list.md) · [Timestamp](timestamp.md) · [Tool call](tool-call.md)
