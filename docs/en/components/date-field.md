# Date field

Group: Inputs. https://lampung.kartadinata.app/docs/en/components/date-field

A text field for a date with a calendar button that opens a calendar in a popover. Typing the date always works; the calendar is the helper. Built from existing parts: `.control`, `.control__btn`, `.popover` and `.cal`.

## Use it when
- People enter one date in a form: a date of birth, a service visit date, a deadline, a payment date.
- The date is near today and seeing the month helps (booking a visit, choosing a due date).

## Use something else when
- Showing a month of events, or picking a range on the page itself: use [Calendar](calendar.md). The `.cal` component inline, not in a popover.
- A date far in the past people know by heart (date of birth): use [Text field](text-field.md). Typing DD/MM/YYYY is faster than paging back 20 years; keep the calendar button optional.
- Picking a relative period (this week, this month): use [Segmented control](segmented-control.md). Or [chips](chips.md) for presets like "Last 7 days".
- A time of day only: use [Select](select.md). A list of half-hour slots.

## Where it goes
In a [form](form-layout.md) like any field, about 220 px wide on wide screens (a date never needs the full width). The popover opens below the field, aligned to its right edge. On phones, prefer the native picker (`type="date"` in a `.control`) or open the calendar in a [sheet](sheet.md).

## Anatomy
| Part | What it is |
|---|---|
| `.field / .field__label / .field__help` | Required. Same wrapper as a [text field](text-field.md). The helper shows the format ("DD/MM/YYYY"). |
| `positioned wrapper` | Required. An element with `position: relative` around the control and the popover, so the popover opens under the field. |
| `.control > input` | Required. Text input, `inputmode="numeric"`, `placeholder="DD/MM/YYYY"`, `autocomplete="bday"` for birth dates. |
| `.control__btn` | Required. The calendar button (`calendar_month`), `aria-label="Choose a date"`, `aria-haspopup="dialog"`, and `data-lds-menu` pointing at the popover. |
| `.popover[role=dialog]` | Required. The floating layer, set to `width: auto; padding: 0` and placed under the field. |
| `.cal` | Required. Month header with previous and next [icon buttons](icon-button.md), weekday row and `.cal__day` buttons (`.is-today`, `.is-selected`, `.is-muted`). |

## Markup

**Visit date.** Type a date, or open the calendar with the button. Picking a day fills the field, closes the calendar and returns focus to the input. Escape or a click outside closes it.
```html
<div class="field">
  <label class="field__label" for="exam-date">Visit date</label>
  <div style="position: relative;">
    <div class="control">
      <input id="exam-date" inputmode="numeric" placeholder="DD/MM/YYYY" aria-describedby="exam-date-help">
      <button type="button" class="control__btn" aria-label="Choose a date" aria-haspopup="dialog" aria-expanded="false" data-lds-menu="exam-cal">
        <span class="ic" aria-hidden="true">calendar_month</span>
      </button>
    </div>
    <div class="popover" id="exam-cal" role="dialog" aria-label="Choose a date" style="width: auto; padding: 0; top: calc(100% + 6px); right: 0;">
      <div class="cal">
        <div class="cal__head">
          <button type="button" class="icon-btn" aria-label="Previous month"><span class="ic" aria-hidden="true">chevron_left</span></button>
          <span class="cal__month" aria-live="polite">November 2026</span>
          <button type="button" class="icon-btn" aria-label="Next month"><span class="ic" aria-hidden="true">chevron_right</span></button>
        </div>
        <div class="cal__grid">
          <span class="cal__dow" aria-hidden="true">S</span> … <span class="cal__dow" aria-hidden="true">S</span>
          <button type="button" class="cal__day" aria-label="1 November 2026" aria-pressed="false">1</button>
          …
          <button type="button" class="cal__day is-today" aria-label="16 November 2026" aria-current="date" aria-pressed="false">16</button>
          <button type="button" class="cal__day is-selected" aria-label="24 November 2026" aria-pressed="true">24</button>
          …
        </div>
      </div>
    </div>
  </div>
  <span class="field__help" id="exam-date-help">DD/MM/YYYY. Service counters open Monday to Saturday.</span>
</div>
<!-- Your code: render the month, page it with the arrows, and on a day click
     write the date into the input, move .is-selected, then closeMenus() and focus the input. -->
```

**Typed date that is not allowed.** Validate the typed text on blur like any field; the message says the rule.
```html
<div class="field" style="max-width: 300px; width: 100%;">
  <label class="field__label" for="df-due">Due date</label>
  <div class="control is-invalid"><input id="df-due" inputmode="numeric" value="31/11/2026" aria-invalid="true" aria-describedby="df-due-help"><button type="button" class="control__btn" aria-label="Choose a date" aria-haspopup="dialog"><span class="ic" aria-hidden="true">calendar_month</span></button></div>
  <span class="field__help field__help--error" id="df-due-help"><span class="ic" aria-hidden="true">error</span>November has 30 days. Check the day.</span>
</div>
```

**Native picker on phones.** Inside a `.control` the native date input gets the system field look and the phone shows its own wheel or calendar.
```html
<div class="field" style="max-width: 300px; width: 100%;">
  <label class="field__label" for="df-native">Date of payment</label>
  <div class="control"><span class="ic" aria-hidden="true">event</span><input id="df-native" type="date" value="2026-11-28"></div>
</div>
```

## States
| State | How |
|---|---|
| `open` | `aria-expanded="true"` on the calendar button and `.is-open` on the popover, set by `data-lds-menu`. |
| `.cal__day.is-today` | Accent text, semibold; add `aria-current="date"`. |
| `.cal__day.is-selected` | Accent fill with white text; `aria-pressed="true"`. |
| `.cal__day.is-muted` | Days of the next or previous month, faint. Disable days that cannot be chosen (`disabled`). |
| `.is-invalid` | On the `.control` with `aria-invalid`, as any field. |

## Motion and microinteractions
- The popover grows from the button area: opacity in `--d-fast` (160 ms) on `--ease-enter`, `scale(0.96) translateY(-4px)` to rest on `--spring-smooth` (560 ms); it leaves in `--d-exit` (180 ms) on `--ease-exit`.
- Days tint on hover in `--d-fast` and sink to 0.88 on press, springing back on `--spring-snappy`.
- Changing month swaps the grid at once; do not slide months, it slows paging through a year.
- Reduced motion: the popover fades in 120 ms linear without scale.

## Accessibility
- The text input is the real field and works without the calendar: label, format in the helper, validation on blur.
- The calendar button is a `<button type="button">` with `aria-label="Choose a date"`, `aria-haspopup="dialog"` and `aria-expanded`.
- Each day is a button named with the full date ("24 November 2026"); weekday letters are `aria-hidden`. The month name is `aria-live="polite"` so paging is announced.
- `data-lds-menu` focuses the first button in the popover on open and closes it on Escape or an outside click. Arrow keys between days are not built in: add them (Left, Right by a day; Up, Down by a week) when keyboard use matters.

## Do
- Accept typed dates in the format shown, and show that format in the helper.
- Open the calendar on the month of the current value, or today.
- Disable days that are not allowed and say the rule in the helper.

## Don't
- Make the input read-only so people must use the calendar.
- Build a new date-picker component; compose these parts.
- Use the popover calendar for date of birth without allowing typing.

## Behavior (plain HTML)
No date-field behavior in the system. `data-lds-menu="popover-id"` on the calendar button opens and closes the popover (outside click, Escape) and focuses its first button; `closeMenus()` closes it after a pick. Rendering months, paging and writing the value are yours.

## Related
[Calendar](calendar.md) · [Popover](popover.md) · [Text field](text-field.md) · [Sheet](sheet.md)
