# Calendar

Group: Data display. https://lampung.kartadinata.app/docs/en/components/calendar

A month grid of round day buttons with today in accent text and the selection in the accent fill; a range fills between its ends. The markup and states; picking logic is yours.

## Use it when
- Choosing a day or a range where seeing the week matters: booking a consultation slot, picking days for a Samsat keliling visit, setting leave dates.
- Showing which days in a month are marked (deadlines, sessions) in a side panel.

## Use something else when
- A date field in a form (birth date, a known date): use [Date field](date-field.md). The date field opens this calendar in a popover and accepts typing.
- A list of upcoming events: use [List](list.md).
- Events in order with progress: use [Timeline](timeline.md).
- Activity per day over months: use [Heatmap](heatmap.md).

## Where it goes
In a side column or a popover, 300 px wide. Inside a [date field](date-field.md) popover, a [sheet](sheet.md) on phones, or beside a list of slots for the selected day on wide screens.

## Anatomy
| Part | What it is |
|---|---|
| `.cal` | Required. 300 px white box with a ring and 18 px radius. `role="group"` with an `aria-label`. |
| `.cal__head` | Month navigation: previous and next [icon buttons](icon-button.md) and the `.cal__month` title. |
| `.cal__month` | Required. "November 2026". |
| `.cal__grid` | Required. Seven columns. |
| `.cal__dow` | Weekday initials row (`aria-hidden`; each day button carries its full label). |
| `button.cal__day` | Required. A 38 px round day button with `aria-label` like "Friday 20 November 2026". |
| `.is-today / .is-selected / .is-range / .is-muted` | Today in accent text; the selected day (or range ends) filled; days between the ends on the tint; days outside the month faint. |

## Markup

**One day.** Today (16) in accent text, the chosen day filled.
```html
<div class="cal" role="group" aria-labelledby="cal1-m">
  <div class="cal__head"><button class="icon-btn" style="width: 36px; height: 36px;" aria-label="Previous month"><span class="ic" aria-hidden="true">chevron_left</span></button><span class="cal__month" id="cal1-m" aria-live="polite">November 2026</span><button class="icon-btn" style="width: 36px; height: 36px;" aria-label="Next month"><span class="ic" aria-hidden="true">chevron_right</span></button></div>
  <div class="cal__grid"><span class="cal__dow" aria-hidden="true">S</span><span class="cal__dow" aria-hidden="true">M</span><span class="cal__dow" aria-hidden="true">T</span><span class="cal__dow" aria-hidden="true">W</span><span class="cal__dow" aria-hidden="true">T</span><span class="cal__dow" aria-hidden="true">F</span><span class="cal__dow" aria-hidden="true">S</span><button class="cal__day" aria-label="Sunday 1 November 2026">1</button><button class="cal__day" aria-label="Monday 2 November 2026">2</button><button class="cal__day" aria-label="Tuesday 3 November 2026">3</button><button class="cal__day" aria-label="Wednesday 4 November 2026">4</button><button class="cal__day" aria-label="Thursday 5 November 2026">5</button><button class="cal__day" aria-label="Friday 6 November 2026">6</button><button class="cal__day" aria-label="Saturday 7 November 2026">7</button><button class="cal__day" aria-label="Sunday 8 November 2026">8</button><button class="cal__day" aria-label="Monday 9 November 2026">9</button><button class="cal__day" aria-label="Tuesday 10 November 2026">10</button><button class="cal__day" aria-label="Wednesday 11 November 2026">11</button><button class="cal__day" aria-label="Thursday 12 November 2026">12</button><button class="cal__day" aria-label="Friday 13 November 2026">13</button><button class="cal__day" aria-label="Saturday 14 November 2026">14</button><button class="cal__day" aria-label="Sunday 15 November 2026">15</button><button class="cal__day is-today" aria-label="Monday 16 November 2026" aria-current="date">16</button><button class="cal__day" aria-label="Tuesday 17 November 2026">17</button><button class="cal__day" aria-label="Wednesday 18 November 2026">18</button><button class="cal__day" aria-label="Thursday 19 November 2026">19</button><button class="cal__day is-selected" aria-label="Friday 20 November 2026" aria-pressed="true">20</button><button class="cal__day" aria-label="Saturday 21 November 2026">21</button><button class="cal__day" aria-label="Sunday 22 November 2026">22</button><button class="cal__day" aria-label="Monday 23 November 2026">23</button><button class="cal__day" aria-label="Tuesday 24 November 2026">24</button><button class="cal__day" aria-label="Wednesday 25 November 2026">25</button><button class="cal__day" aria-label="Thursday 26 November 2026">26</button><button class="cal__day" aria-label="Friday 27 November 2026">27</button><button class="cal__day" aria-label="Saturday 28 November 2026">28</button><button class="cal__day" aria-label="Sunday 29 November 2026">29</button><button class="cal__day" aria-label="Monday 30 November 2026">30</button><button class="cal__day is-muted" aria-label="Tuesday 1 December 2026">1</button><button class="cal__day is-muted" aria-label="Wednesday 2 December 2026">2</button><button class="cal__day is-muted" aria-label="Thursday 3 December 2026">3</button><button class="cal__day is-muted" aria-label="Friday 4 December 2026">4</button><button class="cal__day is-muted" aria-label="Saturday 5 December 2026">5</button></div>
</div>
```

**A range.** Both ends filled, the days between on the accent tint.
```html
<div class="cal" role="group" aria-labelledby="cal2-m">
  <div class="cal__head"><button class="icon-btn" style="width: 36px; height: 36px;" aria-label="Previous month"><span class="ic" aria-hidden="true">chevron_left</span></button><span class="cal__month" id="cal2-m">November 2026</span><button class="icon-btn" style="width: 36px; height: 36px;" aria-label="Next month"><span class="ic" aria-hidden="true">chevron_right</span></button></div>
  <div class="cal__grid"><span class="cal__dow" aria-hidden="true">S</span><span class="cal__dow" aria-hidden="true">M</span><span class="cal__dow" aria-hidden="true">T</span><span class="cal__dow" aria-hidden="true">W</span><span class="cal__dow" aria-hidden="true">T</span><span class="cal__dow" aria-hidden="true">F</span><span class="cal__dow" aria-hidden="true">S</span><button class="cal__day" aria-label="Sunday 1 November 2026">1</button><button class="cal__day" aria-label="Monday 2 November 2026">2</button><button class="cal__day" aria-label="Tuesday 3 November 2026">3</button><button class="cal__day" aria-label="Wednesday 4 November 2026">4</button><button class="cal__day" aria-label="Thursday 5 November 2026">5</button><button class="cal__day" aria-label="Friday 6 November 2026">6</button><button class="cal__day" aria-label="Saturday 7 November 2026">7</button><button class="cal__day" aria-label="Sunday 8 November 2026">8</button><button class="cal__day" aria-label="Monday 9 November 2026">9</button><button class="cal__day" aria-label="Tuesday 10 November 2026">10</button><button class="cal__day" aria-label="Wednesday 11 November 2026">11</button><button class="cal__day" aria-label="Thursday 12 November 2026">12</button><button class="cal__day" aria-label="Friday 13 November 2026">13</button><button class="cal__day" aria-label="Saturday 14 November 2026">14</button><button class="cal__day" aria-label="Sunday 15 November 2026">15</button><button class="cal__day is-today" aria-label="Monday 16 November 2026" aria-current="date">16</button><button class="cal__day" aria-label="Tuesday 17 November 2026">17</button><button class="cal__day is-selected" aria-label="Wednesday 18 November 2026" aria-pressed="true">18</button><button class="cal__day is-range" aria-label="Thursday 19 November 2026">19</button><button class="cal__day is-range" aria-label="Friday 20 November 2026">20</button><button class="cal__day is-range" aria-label="Saturday 21 November 2026">21</button><button class="cal__day is-selected" aria-label="Sunday 22 November 2026" aria-pressed="true">22</button><button class="cal__day" aria-label="Monday 23 November 2026">23</button><button class="cal__day" aria-label="Tuesday 24 November 2026">24</button><button class="cal__day" aria-label="Wednesday 25 November 2026">25</button><button class="cal__day" aria-label="Thursday 26 November 2026">26</button><button class="cal__day" aria-label="Friday 27 November 2026">27</button><button class="cal__day" aria-label="Saturday 28 November 2026">28</button><button class="cal__day" aria-label="Sunday 29 November 2026">29</button><button class="cal__day" aria-label="Monday 30 November 2026">30</button><button class="cal__day is-muted" aria-label="Tuesday 1 December 2026">1</button><button class="cal__day is-muted" aria-label="Wednesday 2 December 2026">2</button><button class="cal__day is-muted" aria-label="Thursday 3 December 2026">3</button><button class="cal__day is-muted" aria-label="Friday 4 December 2026">4</button><button class="cal__day is-muted" aria-label="Saturday 5 December 2026">5</button></div>
</div>
```

## States
| State | How |
|---|---|
| `hover` | Day tints `--bg-tint-strong`. |
| `:active` | Day sinks to `scale(0.88)` and springs back. |
| `today` | `.is-today` plus `aria-current="date"`. |
| `selected` | `.is-selected` plus `aria-pressed="true"`. |
| `in range` | `.is-range`: square tint across the cell width. |
| `outside the month / unavailable` | `.is-muted`; for days that cannot be picked also set `disabled` and say why near the calendar. |

## Motion and microinteractions
- Day color changes over `--d-fast` (160 ms) on `--ease-standard`; press sinks to 0.88 and returns on `--spring-snappy`.
- Changing months swaps the grid at once; if you animate it, use a short [view swap](view-swap.md), never a long slide.

## Accessibility
- Each day is a `<button>` with a full `aria-label` (weekday, day, month, year); weekday initials are `aria-hidden`.
- Mark today with `aria-current="date"` and the selection with `aria-pressed="true"` (or `aria-selected` in a `role="grid"` you build fully).
- Keyboard: buttons are reachable with Tab. A full date-picker grid (arrow keys move by day, Page Up and Page Down by month, one tab stop) is app logic you add; `lds.js` does not ship it.
- Announce the month when it changes (`aria-live="polite"` on `.cal__month`).

## Do
- Start the week on the day your audience expects.
- Show the chosen date or range in words next to the calendar ("18 to 22 November").
- Disable days that cannot be chosen and say why.

## Don't
- Use a calendar for a birth date; use a [date field](date-field.md) that accepts typing.
- Color days by meaning without a legend in words.

## Behavior (plain HTML)
None. Selecting days, ranges and moving between months are app logic: update the classes and ARIA states listed above.

## Related
[Date field](date-field.md) · [Timeline](timeline.md) · [Popover](popover.md) · [Heatmap](heatmap.md)
