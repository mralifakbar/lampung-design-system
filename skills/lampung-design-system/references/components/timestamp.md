# Timestamp

Group: Data display (new). Docs page: `docs/components/timestamp.html`.

A `<time>` that shows when something happened or is due in relative words ("5 minutes ago", "in 3 days"), in the page language, and keeps itself current. The exact date goes in its title.

## Use it when
- When something happened, where recency matters more than the exact time: a message, a comment, a change in a log.
- When something is due soon: "in 2 days", "tomorrow".

## Use something else when
- A countdown in seconds to a hard deadline: use [Timer](timer.md).
- The exact date matters (a due date in a record, a legal date): use [Key-value](key-value.md). Write the absolute date.
- A history of dated events: use [Timeline](timeline.md).
- How long running work has taken: use [Thinking](thinking.md).

## Where it goes
In meta lines: a list row value or second line, a message header, a card subtitle, a table cell. Subtle text, tabular figures.

## Anatomy
| Part | What it is |
|---|---|
| `time.timestamp` | Required. Subtle color, tabular figures. |
| `[data-lds-time]` | Required for behavior. An ISO date with its offset ("2026-11-16T09:30:00+07:00"). |
| `text content` | The fallback shown before the JS runs (an absolute date); the JS replaces it. |
| `[datetime] / [title]` | Set by the JS: the ISO value and the full localized date and time. |

## Markup

**In list rows.** Past and future dates in relative words. Hover a time to see the exact date.
```html
<div class="list" style="max-width: 460px;">
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Lab report feedback</div><div class="lrow__sub">Two comments on section 3</div></div><time class="timestamp lrow__value" data-lds-time="2026-11-16T08:05:00+07:00">16 Nov 2026, 08:05</time></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Seminar room changed</div><div class="lrow__sub">Now in building C, room 204</div></div><time class="timestamp lrow__value" data-lds-time="2026-11-13T15:20:00+07:00">13 Nov 2026, 15:20</time></div>
  <div class="lrow"><div class="lrow__body"><div class="lrow__title">Scholarship deadline</div><div class="lrow__sub">Upload your transcript</div></div><time class="timestamp lrow__value" data-lds-time="2026-12-01T17:00:00+07:00">1 Dec 2026, 17:00</time></div>
</div>
```

**In a sentence.** Inside text it inherits the size and keeps the subtle color.
```html
<p class="card__sub">Last synced <time class="timestamp" data-lds-time="2026-11-16T09:00:00+07:00">16 Nov 2026, 09:00</time> from your phone.</p>
```

## States
| State | How |
|---|---|
| `before JS` | Shows the fallback text you wrote. |
| `within 45 seconds` | "now" in the page language. |
| `later` | Seconds, minutes, hours, days, weeks, months, years, rounded to the nearest unit; refreshed every 15 seconds while under a minute, then every minute. |

## Motion and microinteractions
- None. The words change in place without animation; the tabular figures keep the width steady.

## Accessibility
- It is a real `<time>` element with a machine-readable `datetime`.
- The `title` with the full date is not reachable by keyboard or touch: where the exact date matters, write it out next to the relative time or in the details.
- The language comes from the closest `lang` attribute, so set `lang` on the page.

## Do
- Use relative time for recent things and absolute dates for anything older than a few weeks or legally binding.
- Give a meaningful fallback date in the markup.
- Include the time zone offset in `data-lds-time`.

## Don't
- Use it for deadlines measured in seconds; use a [timer](timer.md).
- Mix relative and absolute dates in one column.

## Behavior (plain HTML)
`data-lds-time="ISO date"` on a `<time>` formats it with `Intl.RelativeTimeFormat` in the page language (`numeric: "auto"`, so "yesterday" and "tomorrow"), sets `datetime` and a full-date `title`, and keeps it current while it is in the document. Call `init(el)` after rendering new timestamps.

## Related
[Timer](timer.md) · [Key-value](key-value.md) · [List](list.md) · [Chat message](chat-message.md)
