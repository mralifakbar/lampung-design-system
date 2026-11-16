# Date tile

Group: Data display. Docs page: `docs/components/date-tile.html`.

A small month-and-day block at the start of a row, for lists of things that happen on a date: classes, exams, payments due, events. People find the date before the title, so it leads.

## Use it when
- A list of upcoming events or deadlines where the day is how people scan: exams, webinars, invoices due.
- A card that announces one dated thing: the next class, a payment due.

## Use something else when
- Picking a date: use [Date field](date-field.md).
- A month at a glance with several events per day: use [Calendar](calendar.md).
- When something happened, in a log or a message: use [Timestamp](timestamp.md).
- The history of one record: use [Timeline](timeline.md).

## Where it goes
As the first element of a list row (`.lrow`), 12 px before the title; or at the top left of a small card. 44 by 48 px, never larger.

## Anatomy
| Part | What it is |
|---|---|
| `time.datetile` | Required. A `<time datetime="YYYY-MM-DD">`, so the date is machine readable and read as "Nov 18". |
| `.datetile__m` | Required. Short month on an accent tint band. |
| `.datetile__d` | Required. The day, 18 px tabular. |
| `.datetile--today` | Today: the tile turns accent. |
| `.datetile--past` | Done or past: the tile fades to 60 %. |

## Markup

**Upcoming in a list.** Today first and accented, then the coming week. Badges say the kind of event in words.
```html
<div class="list" style="max-width: 460px;">
  <a class="lrow" href="#dt-2026-11-16" id="dt-2026-11-16"><time class="datetile datetile--today" datetime="2026-11-16"><span class="datetile__m">Nov</span><span class="datetile__d">16</span></time><span class="lrow__body"><span class="lrow__title">Statistics: live review</span><span class="lrow__sub">Today, 19:00 to 20:30 · Online</span></span><span class="badge badge--accent">Live</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow" href="#dt-2026-11-18" id="dt-2026-11-18"><time class="datetile" datetime="2026-11-18"><span class="datetile__m">Nov</span><span class="datetile__d">18</span></time><span class="lrow__body"><span class="lrow__title">Database Systems quiz 4</span><span class="lrow__sub">Wed, opens 08:00 · 30 minutes</span></span><span class="badge">Quiz</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow" href="#dt-2026-11-21" id="dt-2026-11-21"><time class="datetile" datetime="2026-11-21"><span class="datetile__m">Nov</span><span class="datetile__d">21</span></time><span class="lrow__body"><span class="lrow__title">Mock exam, hall B</span><span class="lrow__sub">Sat, 09:00 · Seat 42</span></span><span class="badge badge--warning">Bring ID</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow" href="#dt-2026-12-02" id="dt-2026-12-02"><time class="datetile" datetime="2026-12-02"><span class="datetile__m">Dec</span><span class="datetile__d">2</span></time><span class="lrow__body"><span class="lrow__title">Second tuition payment due</span><span class="lrow__sub">Wed · $420</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
</div>
```

**Past and upcoming.** A past event fades; the next one keeps full strength.
```html
<div class="docs-row" style="gap: 12px;"><time class="datetile datetile--past" datetime="2026-11-09"><span class="datetile__m">Nov</span><span class="datetile__d">9</span></time><time class="datetile" datetime="2026-11-23"><span class="datetile__m">Nov</span><span class="datetile__d">23</span></time><time class="datetile datetile--today" datetime="2026-11-16"><span class="datetile__m">Nov</span><span class="datetile__d">16</span></time></div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.datetile` | Upcoming. |
| `.datetile--today` | Today; at most one per list. |
| `.datetile--past` | Past or done. |

## States
| State | How |
|---|---|
| `in a linked row` | The row is the link; the tile is not interactive on its own. |
| `loading` | A 44 × 48 `.skel` block with `--r-md` radius. |

## Motion and microinteractions
- None of its own. Rows follow the list stagger when results arrive.

## Accessibility
- Use `<time datetime>` so assistive tech and machines get the full date; the visible text reads naturally ("Nov 18").
- Say "Today" in the row subtitle too; the accent tile alone is not enough.
- The month band is accent text on its tint (AA in both themes).

## Do
- Sort by date, soonest first; put today's item at the top.
- Give the weekday and time in the subtitle.

## Don't
- Use the tile as a button or a date picker.
- Show the year in the tile; add it to the subtitle when the list crosses a year.

## Related
[List](list.md) · [Calendar](calendar.md) · [Timestamp](timestamp.md) · [Badge](badge.md)
