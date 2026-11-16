# Alert

Group: Feedback. Docs page: `docs/components/alert.html`.

An inline message about this page, section or form, in one of four tones. The words carry the meaning; the tint and the icon only support them.

## Use it when
- Something on this page needs attention before the person acts: an overlapping schedule, a missing document, a declined payment.
- A form failed on submit and you need one summary above it (field errors still sit under each field).
- A result that stays relevant while the person is on the page: "Your request was sent. We reply within two working days."
- A short explanation of a rule that changes what the person can do here ("Registration closes Friday at 17:00").

## Use something else when
- The condition is about the whole app, not this page (offline, maintenance, a trial that ends): use [Banner](banner.md).
- Confirming something that just happened ("Saved", "Message sent"): use [Toast](toast.md). A toast leaves by itself; an alert stays until the condition is gone.
- Asking the person to confirm a destructive action: use [Alert dialog](alert-dialog.md).
- One field is wrong: use [Text field](text-field.md). Put the error under the field (`field__error`), not in an alert.
- A one-time tip about a gesture or a feature: use [Hints](hints.md).
- A region has no data yet: use [Empty state](empty-state.md).

## Where it goes
At the top of the region it is about: under the [page header](page-header.md), above the form it summarizes, or at the top of a card. It takes the full width of its column on every screen size. Never floating, never stacked more than two high; if there are three conditions, merge them into one alert with a list.

## Anatomy
| Part | What it is |
|---|---|
| `.alert` | Required. A flex row on the quiet fill with a 12 px gap and 14/16 px padding. |
| `.alert--info|success|warning|danger` | The tone. Sets the tint and the icon color. Without a tone the alert sits on the neutral fill. |
| `.alert > .ic` | Required. The tone icon, rendered filled automatically: `info`, `check_circle`, `warning`, `error`. |
| `.alert__title` | One line that says what happened or what is true. Bold, 14 px. |
| `.alert__body` | Optional second sentence: what it means or what to do. |
| `.alert__actions` | Optional row of small buttons (`btn--sm` or `btn--md`) under the text. |
| `.alert__close` | Optional close button: an `icon-btn` pulled to the right corner. Pair it with `.collapse` and `data-lds-dismiss`. |
| `.collapse` | Wrapper that lets the alert close (or appear) by collapsing its height on a spring. Holds one `div` around the alert. |

## Markup

**Tones.** Info for something good to know, success for a result that stays relevant, warning for a problem the person can still fix, danger for something that failed.
```html
<div class="docs-col" style="max-width: 560px;">
  <div class="alert alert--info"><span class="ic" aria-hidden="true">info</span><div><div class="alert__title">Registration opens Monday at 08:00</div><div class="alert__body">Seats are given in the order requests arrive.</div></div></div>
  <div class="alert alert--success"><span class="ic" aria-hidden="true">check_circle</span><div><div class="alert__title">Your leave request was sent</div><div class="alert__body">Your adviser usually replies within two working days.</div></div></div>
  <div class="alert alert--warning"><span class="ic" aria-hidden="true">warning</span><div><div class="alert__title">Two courses overlap on Thursday</div><div class="alert__body">Pick one before you submit your plan.</div></div></div>
  <div class="alert alert--danger" role="alert"><span class="ic" aria-hidden="true">error</span><div><div class="alert__title">Your card was declined</div><div class="alert__body">Use another card or pay by bank transfer.</div></div></div>
</div>
```

**With an action.** When there is one obvious fix, put it in the alert. Name the outcome.
```html
<div class="alert alert--warning" style="max-width: 560px;">
  <span class="ic" aria-hidden="true">warning</span>
  <div>
    <div class="alert__title">Your ID photo is missing</div>
    <div class="alert__body">Upload it before 20 November to keep your exam seat.</div>
    <div class="alert__actions"><button class="btn btn--secondary btn--sm">Upload photo</button><button class="btn btn--plain btn--sm">Remind me tomorrow</button></div>
  </div>
</div>
```

**Dismissible.** Wrapped in `.collapse`, the close button with `data-lds-dismiss` folds the alert away on the smooth spring and the content below moves up with it. Press the close button.
```html
<div style="max-width: 560px;">
  <div class="collapse"><div><div class="alert alert--info">
    <span class="ic" aria-hidden="true">info</span>
    <div style="flex: 1;"><div class="alert__title">New: practice tests now save your progress</div><div class="alert__body">Close a test and continue later from the same question.</div></div>
    <button class="icon-btn alert__close" aria-label="Dismiss" data-lds-dismiss><span class="ic" style="font-size: 18px;" aria-hidden="true">close</span></button>
  </div></div></div>
  <p class="docs-note" style="margin-top: 12px;">Content under the alert moves up as it closes.</p>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `alert--info` | Neutral news and rules. Accent tint. |
| `alert--success` | A result that stays relevant on this page. Use a toast for a passing confirmation. |
| `alert--warning` | A problem the person can still fix, or a consequence they should know about. |
| `alert--danger` | Something failed or was refused. Say what failed and what to do next. |
| `(no tone)` | A neutral note on the quiet fill; rare. |

## States
| State | How |
|---|---|
| `dismissed` | `.collapse.is-closed` on the wrapper (added by `data-lds-dismiss`): height to zero and opacity out, then `lds:dismiss` bubbles from the button. |
| `appearing` | Render the wrapper as `.collapse.is-closed`, then remove `is-closed` on the next frame so it opens on the spring instead of jumping in. |

## Motion and microinteractions
- Dismiss and appear: the `.collapse` wrapper animates `grid-template-rows` 1fr to 0fr on `--spring-smooth` over `--d-smooth` (560 ms) while opacity runs on `--ease-standard` over `--d-standard` (240 ms). The content below follows the height, so nothing jumps.
- It is a transition, so re-opening mid-collapse reverses from where it is.
- The alert itself has no entrance flourish: no slide, no shake. A danger alert that arrives after submit may use [shake](shake.md) on the submit button, not on the alert.
- Reduced motion: the collapse becomes a 120 ms linear change.

## Accessibility
- Use `role="alert"` only for a danger alert that appears after an action (it interrupts the screen reader). Use `role="status"` for info or success that appears later. An alert present on page load needs no role.
- The icon is decoration (`aria-hidden="true"`); the title must state the tone in words ("Your card was declined", not "Error").
- The close button is an [icon button](icon-button.md) with `aria-label="Dismiss"`. After it closes, move focus to the next logical element; a collapsed alert stays in the DOM, so remove it or set `hidden` on `lds:dismiss` once the 560 ms collapse ends, or its button stays reachable by Tab.
- Never rely on the tint alone; text contrast stays at body level on every tint.

## Do
- Write the title as the fact ("Two courses overlap on Thursday") and the body as the next step.
- Put the one fix inside the alert as a button.
- Remove the alert as soon as the condition is fixed.

## Don't
- Stack several alerts; merge them or fix the cause.
- Use an alert to confirm a save; that is a [toast](toast.md).
- Use `role="alert"` on content that was there when the page loaded.
- Restyle an alert as a colored card or add a shadow.

## Behavior (plain HTML)
Optional. A close button with `data-lds-dismiss` inside a `.collapse` adds `is-closed` to the closest `.collapse` and fires `lds:dismiss` (bubbles). Nothing else needs JS.

## React
```tsx
import { Alert } from 'lampung-design-system/react';

<Alert tone="warning" title="Two courses overlap on Thursday"
  actions={<button className="btn btn--secondary btn--sm">Resolve conflict</button>}>
  Pick one before you submit your plan.
</Alert>
// tone="danger" renders role="alert"; the icon follows the tone.
```

## Related
[Banner](banner.md) · [Toast](toast.md) · [Empty state](empty-state.md) · [Data states](data-states.md)
