# Timer

Group: Feedback. Docs page: `docs/components/timer.html`.

A countdown pill in tabular mono figures that turns amber when time runs low and red at zero, then fires `lds:timeup`. For real deadlines the person is working against.

## Use it when
- A timed exam or tryout: time left for the whole test or for one section.
- A short hold the person must act within: a reserved seat, a payment window, a code that expires.
- Counting up against a target people work to: a kitchen ticket since it was fired, a support chat waiting for a reply, a call on hold (`data-lds-elapsed`).

## Use something else when
- Showing how long ongoing work has taken: use [Thinking](thinking.md).
- When something happened or is due, in words ("in 3 days", "5 minutes ago"): use [Timestamp](timestamp.md).
- A deadline to undo an action in a toast: use [Toast](toast.md). The toast has its own draining bar.
- Progress through a fixed number of questions: use [Progress bar](progress-bar.md).

## Where it goes
In a fixed place the person can glance at without searching: the top bar of an exam screen (right side), the header of a payment step, next to the code field. On phones keep it in the top bar; never inside scrolling content where it can leave the screen.

## Anatomy
| Part | What it is |
|---|---|
| `.timer` | Required. A 32 px pill on the quiet fill, 15 px semibold mono tabular figures. |
| `[data-lds-timer]` | Required for behavior. Seconds to count down from. |
| `[data-low]` | Seconds left at which it turns `.is-low` (default 60). |
| `.timer__t` | Optional inner element the JS writes the time into, so an `.ic` can sit beside it. Without it the JS writes the time into the whole pill. |
| `.is-low / .is-up` | Set by the JS: warning tint while low, danger tint at zero. |
| `[data-lds-elapsed]` | Count up instead: seconds already passed at render. With `data-target` (seconds) it turns `.is-low` from `data-low` (default 80 % of the target) and `.is-up` past the target. |

## Markup

**Counting up against a target.** Kitchen tickets since they were fired, with a 12 minute target. The first is fine, the second is close, the third is late. Words beside the pill say the same thing.
```html
<div class="docs-col" style="max-width: 360px;">
  <div class="docs-row"><span class="timer" data-lds-elapsed="185" data-target="720" aria-label="Table 4, time since fired"><span class="ic" aria-hidden="true">schedule</span><span class="timer__t"></span></span><span class="docs-note">Table 4 · on time</span></div>
  <div class="docs-row"><span class="timer" data-lds-elapsed="610" data-target="720" aria-label="Table 9, time since fired"><span class="ic" aria-hidden="true">schedule</span><span class="timer__t"></span></span><span class="docs-note">Table 9 · close to target</span></div>
  <div class="docs-row"><span class="timer" data-lds-elapsed="905" data-target="720" aria-label="Table 12, time since fired"><span class="ic" aria-hidden="true">schedule</span><span class="timer__t"></span></span><span class="docs-note">Table 12 · late</span></div>
</div>
```

**Exam time left.** 1 h 30 min shows as h:mm:ss; under an hour as m:ss.
```html
<div class="docs-row"><span class="timer" data-lds-timer="5400" data-low="300" aria-label="Time left"></span><span class="docs-note">Section 2 of 3</span></div>
```

**Running low, then up.** A 20 second timer that goes low at 10 and reaches zero. Press Replay to run it again.
```html
<span class="timer" data-lds-timer="20" data-low="10" aria-label="Seat held for"></span>
```

**States at rest.** What the three states look like.
```html
<div class="docs-row">
  <span class="timer" role="timer">42:10</span>
  <span class="timer is-low" role="timer">4:59</span>
  <span class="timer is-up" role="timer">0:00</span>
</div>
```

## States
| State | How |
|---|---|
| `running` | Quiet fill, strong text. |
| `.is-low` | At or under `data-low` seconds: warning tint and text. |
| `.is-up` | At zero: danger tint; `lds:timeup` fires once on the element (bubbles). |

## Motion and microinteractions
- The tint and text color change over `--d-standard` (240 ms). The digits change in place with tabular figures, so the width never shifts.
- No pulsing or shaking when time runs low; the color change and the announcement are enough under stress.
- Reduced motion: the color change becomes 120 ms linear; the count is unchanged.

## Accessibility
- The JS sets `role="timer"`, which is not announced on every change (it is an off live region). Give it a name with `aria-label` ("Time left").
- Announce thresholds yourself, once each: a visually hidden `role="status"` line that says "5 minutes left" when it goes low, and what happens at zero on `lds:timeup` ("Time is up. Your answers were submitted.").
- Never take an action at zero without telling the person what happened. For untimed accessibility needs, allow extended time where the rules permit.

## Do
- Tell people before the timer starts how long they have and what happens at zero.
- Set `data-low` to a useful warning: 5 minutes for an exam, 60 seconds for a hold.
- Listen for `lds:timeup` and save the person's work first.

## Don't
- Show a countdown for something that has no real deadline.
- Show seconds for deadlines days away; use a [timestamp](timestamp.md).
- Run two timers on one screen.

## Behavior (plain HTML)
`data-lds-timer="seconds"` starts a countdown from page load (from a fixed end time, so it never drifts), formats h:mm:ss or m:ss, toggles `.is-low` under `data-low` (default 60) and `.is-up` at zero, sets `role="timer"` and fires `lds:timeup` on the element. Updates every 250 ms. To resume a timer after a reload, render it with the seconds that are left. `data-lds-elapsed="seconds"` counts up from that many seconds instead; with `data-target` it toggles `.is-low` from `data-low` (default 80 % of the target) and `.is-up` past it, and fires `lds:overdue` once. A counting element taken out of the page (a bumped ticket) keeps its start time for five minutes, so putting it back with Undo resumes the count.

## Related
[Timestamp](timestamp.md) · [Thinking](thinking.md) · [Toast](toast.md) · [Progress bar](progress-bar.md)
