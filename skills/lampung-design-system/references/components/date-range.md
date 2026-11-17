# Date range

Group: Inputs. Docs page: `docs/components/date-range.html`.

A button that shows the current span and opens presets beside a two-month calendar (one month on phones). A preset applies at once; picking a start previews the span as you move, picking an end waits for Apply.

## Use it when
- The period of a dashboard, a report or an export: last 30 days, this month, a custom span.
- Filtering records by when they happened: applications between two dates, registrations this quarter.

## Use something else when
- One date in a form: use [Date field](date-field.md).
- Picking days where seeing the week matters and the calendar is the page: use [Calendar](calendar.md).
- Two to five fixed periods only (7 days, 30 days, 90 days): use [Segmented control](segmented-control.md). Faster than opening a picker.

## Where it goes
In the page header actions or a toolbar, usually at the end of the row; its popover opens under it and keeps itself on screen. Below 720 px the presets become a scrolling row of pills above one month.

## Anatomy
| Part | What it is |
|---|---|
| `.daterange[data-lds-daterange]` | Required. `data-start`, `data-end` (ISO dates); `data-today` for fixed examples; `data-locale`. |
| `.btn.daterange__trigger` | Required. The trigger with `data-lds-menu` pointing at the popover: a `calendar_month` icon, `.daterange__label` and `expand_more`. |
| `.popover.daterange__pop` | Required. Empty `role="dialog"` popover; the hook fills it with `.daterange__presets`, `.daterange__months` (two [calendars](calendar.md)) and `.daterange__foot` (span summary, Cancel, Apply). |

## Markup

**Report period.** Open it: pick a preset to apply at once, or pick a first day, move over the calendar to see the span, pick the last day and Apply. Days after today are not available.
```html
<div class="daterange" data-lds-daterange data-start="2026-10-18" data-end="2026-11-16" data-today="2026-11-16">
  <button class="btn btn--secondary btn--md daterange__trigger" aria-haspopup="dialog" aria-expanded="false" data-lds-menu="dr-1"><span class="ic" aria-hidden="true">calendar_month</span><span class="daterange__label">18 Oct to 16 Nov 2026</span><span class="ic" aria-hidden="true">expand_more</span></button>
  <div class="popover daterange__pop" id="dr-1" role="dialog" aria-label="Choose dates"></div>
</div>
```

## States
| State | How |
|---|---|
| `picking` | After the first day: the hovered or focused end previews the span on a quiet tint, the summary says "Pick the last day" and Apply waits. |
| `range` | Both ends filled, the days between on the accent tint (`.is-range`). |
| `preset on` | The preset that matches the span is pressed. |
| `future days` | Muted and disabled. |

## Motion and microinteractions
- The popover opens like every popover: from the corner of its trigger on `--spring-smooth`, out on `--ease-exit`.
- Days ease their tint over `--d-fast` and sink to 0.88 on press, back on `--spring-snappy`.

## Accessibility
- The trigger says the span in words and has `aria-haspopup="dialog"` and `aria-expanded`.
- Each day is a button labeled with the full date; arrow keys move by day and week across both months (and page when needed), Enter or Space picks.
- Escape and a click outside close without changing the span; Apply and presets return focus to the trigger and the new span is announced.

## Do
- Start with a sensible default (last 30 days) and show it on the trigger.
- Fire your request on `lds:change`, not on every pick.

## Don't
- Make people pick both ends for a common span; offer it as a preset.
- Allow future days for data that cannot exist yet.

## Behavior (plain HTML)
`data-lds-daterange` wires it (or call `dateRange(el)`), using the menu hook for open and close. It fires `lds:change` with `{ start, end }` (ISO dates). The handle has `start`, `end` and `set(start, end)`.

## Related
[Date field](date-field.md) · [Calendar](calendar.md) · [Popover](popover.md) · [Segmented control](segmented-control.md)
