# Event calendar

Group: Data display. Docs page: `docs/components/event-calendar.html`.

A calendar of events with three views: a month grid with event chips, a week of timed blocks with a now line, and an agenda list grouped by day. It renders from JSON and turns into dots plus the chosen day's list when it has less than 640 px.

## Use it when
- People plan around dates and times: a kelurahan activity calendar, puskesmas schedules, service bookings, reporting deadlines.
- Seeing what else happens that day or week matters: finding a free slot, spotting a crowded week.

## Use something else when
- Picking one date or a span in a form: use [Calendar](calendar.md). Or [date field](date-field.md) and [date range](date-range.md)
- A short list of upcoming items: use [List](list.md). Group rows by day with a labeled [separator](separator.md)
- The history of one record: use [Timeline](timeline.md).

## Where it goes
Full width of the content column, as the main object of a page (a filter or calendar list can sit beside it). It sizes by its own width, not the screen: under 640 px the month shows dots and the selected day's events, and only Month and Agenda are offered.

## Anatomy
| Part | What it is |
|---|---|
| `.evcal[data-lds-events]` | Required. The host. `data-date` (shown date), `data-view` (month, week, agenda), `data-week-start` (1 = Monday), `data-hours` ("7-20"), `data-locale`, and for fixed examples `data-today` and `data-now` ("10:20"). |
| `script[type="application/json"]` | The events: `id`, `title`, `start` ("2026-11-16" or "2026-11-16T14:00"), optional `end`, `allDay`, `tone` (1 to 4, the chart series colors) and `where`. |
| `.evcal__head` | Rendered: the title (live region), previous, Today, next in a [button group](button-group.md), and a [segmented control](segmented-control.md) for the view. |
| `.evcal__month > .evcal__cell` | Rendered month grid: a day button `.evcal__date`, up to three `.evcal__evt` chips, a "2 more" `.evcal__more`, and `.evcal__dots` for narrow widths. |
| `.evcal__week` | Rendered week: day headers, an all-day row, an hour gutter and `.evcal__day` columns with `.evcal__block`s side by side when they overlap, plus `.evcal__now`. |
| `.evcal__agenda` | Rendered agenda: `.sep-label` day headings that stick while their day scrolls, then `.evcal__row`s. |

## Markup

**Kelurahan activity calendar.** Switch between Month, Week and Agenda; step through months; Today returns. Arrow keys move between days in the month. Narrow the window under 640 px of calendar width: the month turns into dots and a list for the chosen day.
```html
<div class="evcal" data-lds-events data-date="2026-11-16" data-today="2026-11-16" data-now="10:20" data-view="month"><script type="application/json">[{"id":"e1","title":"Musrenbang kelurahan","start":"2026-11-02T09:30","end":"2026-11-02T10:30","tone":1,"where":"Kelurahan Way Halim hall"},{"id":"e2","title":"Posyandu Melati","start":"2026-11-04T08:00","end":"2026-11-04T11:00","tone":4,"where":"RT 03 community hall"},{"id":"e3","title":"Mobile Samsat","start":"2026-11-09","end":"2026-11-11","allDay":true,"tone":2,"where":"Metro city square"},{"id":"e4","title":"Service counter briefing","start":"2026-11-16T09:00","end":"2026-11-16T09:15","tone":3},{"id":"e5","title":"Flood response coordination with BPBD","start":"2026-11-16T14:00","end":"2026-11-16T14:45","tone":1,"where":"Video call"},{"id":"e6","title":"Social aid data check","start":"2026-11-16T16:00","end":"2026-11-16T16:30","tone":2},{"id":"e7","title":"Mobile e-KTP recording","start":"2026-11-17T10:00","end":"2026-11-17T11:30","tone":1,"where":"Kecamatan Kedaton office"},{"id":"e8","title":"Free health check for seniors","start":"2026-11-18T13:00","end":"2026-11-18T14:00","tone":4,"where":"Puskesmas Kedaton"},{"id":"e9","title":"Quarterly report due","start":"2026-11-24","allDay":true,"tone":2},{"id":"e10","title":"UMKM training opening","start":"2026-11-26T18:30","end":"2026-11-26T20:00","tone":3,"where":"Hall B"}]</script></div>
```

**Week view.** Timed events as blocks, overlapping ones side by side, all-day events on top, and a line for now.
```html
<div class="evcal" data-lds-events data-date="2026-11-16" data-today="2026-11-16" data-now="10:20" data-view="week" data-hours="8-19"><script type="application/json">[{"id":"e1","title":"Musrenbang kelurahan","start":"2026-11-02T09:30","end":"2026-11-02T10:30","tone":1,"where":"Kelurahan Way Halim hall"},{"id":"e2","title":"Posyandu Melati","start":"2026-11-04T08:00","end":"2026-11-04T11:00","tone":4,"where":"RT 03 community hall"},{"id":"e3","title":"Mobile Samsat","start":"2026-11-09","end":"2026-11-11","allDay":true,"tone":2,"where":"Metro city square"},{"id":"e4","title":"Service counter briefing","start":"2026-11-16T09:00","end":"2026-11-16T09:15","tone":3},{"id":"e5","title":"Flood response coordination with BPBD","start":"2026-11-16T14:00","end":"2026-11-16T14:45","tone":1,"where":"Video call"},{"id":"e6","title":"Social aid data check","start":"2026-11-16T16:00","end":"2026-11-16T16:30","tone":2},{"id":"e7","title":"Mobile e-KTP recording","start":"2026-11-17T10:00","end":"2026-11-17T11:30","tone":1,"where":"Kecamatan Kedaton office"},{"id":"e8","title":"Free health check for seniors","start":"2026-11-18T13:00","end":"2026-11-18T14:00","tone":4,"where":"Puskesmas Kedaton"},{"id":"e9","title":"Quarterly report due","start":"2026-11-24","allDay":true,"tone":2},{"id":"e10","title":"UMKM training opening","start":"2026-11-26T18:30","end":"2026-11-26T20:00","tone":3,"where":"Hall B"}]</script></div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `data-view="month"` | Default. Chips with start time; multi-day events repeat on each day with a squared start. |
| `data-view="week"` | Planning a week by the hour. Hidden under 640 px. |
| `data-view="agenda"` | Reading what comes next; the default on phones when week was asked for. |

## States
| State | How |
|---|---|
| `today` | The date sits in an accent circle (`aria-current="date"`); in week view the day header is accent text and the column has a faint tint. |
| `outside the month` | Cells on the quiet fill with muted dates. |
| `selected day (narrow)` | Accent tint on the cell; its events list under the grid. |
| `empty` | Agenda: "No events this month" with what to do; a narrow day: "Nothing planned for this day." |
| `loading` | Render after the data arrives; until then show a [skeleton](skeleton.md) block the height of the month inside `.evcal__body`. |

## Motion and microinteractions
- Moving to the next or previous month or week slides the body in from that side on `--spring-smooth` (`view-in--forward` and `--back`, 24 px), so direction is felt; changing view fades it in over `--d-standard`.
- Day buttons and event chips sink on press (0.9 and 0.97) and spring back on `--spring-snappy`.
- Reduced motion: views swap with a 120 ms fade.

## Accessibility
- The month is a `role="grid"` of rows and cells; each day is a real button labeled with the full date and its event count ("Monday 16 November, 3 events"), with one tab stop and arrow keys between days (moving past the edge pages the month).
- Event chips and blocks are buttons labeled with title, time and place.
- The title is a live region, so "December 2026" is announced after paging; previous and next say "Previous month" or "Previous week".
- Tones are never the only cue: each event says its title and time in words.

## Do
- Open event details in a [popover](popover.md) or [drawer](drawer.md) on `lds:event`, and offer "New event" on `lds:day`.
- Keep titles short; the place goes in `where`.

## Don't
- Use more than four tones; group by calendar instead and let people filter with `filter()`.
- Squeeze the week view onto a phone; the agenda reads better.

## Behavior (plain HTML)
`data-lds-events` renders the calendar (or call `eventCalendar(el, { events })`). It fires `lds:event` `{ event, el }`, `lds:day` `{ date, events, el }` and `lds:range` `{ start, end, view }` after every render. The handle from `eventCalendar(el)` has `set(events)`, `go(date)`, `view(name)`, `filter(fn)` and `today()`.

## Related
[Calendar](calendar.md) · [Date range](date-range.md) · [Separator](separator.md) · [Segmented control](segmented-control.md)
