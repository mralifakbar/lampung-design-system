# Popover

Group: Overlays. Docs page: `docs/components/popover.html`.

A small floating card anchored to a button, for content richer than a menu: a mini form, a short explanation with a link, a quick setting. It does not block the page.

## Use it when
- A few fields or controls tied to one button: set a reminder, adjust a column width, quick-edit a due date.
- A short explanation people open on purpose, with formatting or a link inside.

## Use something else when
- A list of commands: use [Dropdown menu](dropdown-menu.md).
- A label for an icon or a one-line hint on hover: use [Tooltip](tooltip.md).
- A preview of a person or link on hover: use [Hover card](hover-card.md).
- A task that needs focus and a decision before going on: use [Dialog](dialog.md).
- Picking a date: use [Date field](date-field.md). The date field already pairs a control with its calendar popover.

## Where it goes
8 px below its trigger, aligned to its left edge, 300 px wide. Trigger and popover share a `position: relative` wrapper; position the popover with inline `top`/`left`. On phones, use a [sheet](sheet.md) for anything with fields.

## Anatomy
| Part | What it is |
|---|---|
| `trigger` | Required. A button with `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls` the popover id. |
| `.popover` | Required. The floating card: 300 px, 16 px padding, elevated with a shadow; `role="dialog"` and `aria-label` (or `aria-labelledby`). |
| `.popover.is-open` | Required to show it. |

## Markup

**Set a reminder.** The popover toggles from its button, grows from the top and closes on Escape or a click outside.
```html
<div style="position: relative;">
  <button class="btn btn--secondary" aria-haspopup="dialog" aria-expanded="false" aria-controls="remind" data-lds-menu="remind">Remind me</button>
  <div class="popover" id="remind" role="dialog" aria-labelledby="remind-t" style="top: calc(100% + 8px); left: 0;">
    <h3 class="section__title-sm" id="remind-t">Remind me about vehicle tax</h3>
    …
  </div>
</div>
```

**Static, open.** A popover explaining how an application is scored, shown open.
```html
<div style="position: relative; align-self: flex-start;">
  <button class="btn btn--plain btn--sm" aria-haspopup="dialog" aria-expanded="true" aria-controls="po-score">How is this scored?</button>
  <div class="popover is-open" id="po-score" role="dialog" aria-label="How the score works" style="top: calc(100% + 8px); left: 0;">
    <p class="section__sub">Each complete document is worth 5 points, an incomplete one 0. Optional documents you leave out do not count against you.</p>
  </div>
</div>
```

## States
| State | How |
|---|---|
| `.is-open` | Visible and interactive; the trigger has `aria-expanded="true"`. |
| `closed` | Transparent, slightly scaled, `visibility: hidden` after the exit. |

## Motion and microinteractions
- Enter: opacity over `--d-fast` (160 ms) on `--ease-enter`; from `scale(0.96) translateY(-4px)` on `--spring-smooth`, growing from top center.
- Exit: over `--d-exit` (180 ms) on `--ease-exit`, then hidden. A transition, so a quick toggle reverses smoothly.
- Reduced motion: fade only.

## Accessibility
- Non-modal: focus is not trapped, the page stays usable. Give it `role="dialog"` and a name.
- Moving focus into it on open and back to the trigger on close is your job, unless you reuse the menu hook (which focuses its first button, closes on Escape and returns focus).
- Escape and a click outside close it.

## Do
- Keep it to one small task or explanation.
- Close it after the main action.

## Don't
- Put a long form or a table in a popover.
- Open it on hover; that is a [hover card](hover-card.md).
- Use a popover where a [dropdown menu](dropdown-menu.md) of commands would do.

## Behavior (plain HTML)
No dedicated hook: toggle `.is-open` and `aria-expanded` yourself, or reuse the menu hook (`data-lds-menu="popoverId"` on the trigger), which opens and closes it, focuses its first button, closes on Escape (focus back to the trigger) and on a click outside; call `closeMenus()` after the action inside the popover. Avoid controls that use Up and Down arrows inside it: those keys are handled as menu keys.

## Related
[Dropdown menu](dropdown-menu.md) · [Tooltip](tooltip.md) · [Hover card](hover-card.md) · [Date field](date-field.md)
