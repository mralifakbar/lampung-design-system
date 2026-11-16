# Banner

Group: Feedback. Docs page: `docs/components/banner.html`.

One inverse line about the whole app: offline, maintenance, viewing as someone else. It says the condition and offers at most one action.

## Use it when
- A condition that affects every page until it changes: the connection dropped, the service is in read-only maintenance, the trial ends in three days.
- The person is in a mode that changes what they see: previewing as a student, editing a draft term.

## Use something else when
- The message is about this page or this form only: use [Alert](alert.md).
- Confirming an action that just happened: use [Toast](toast.md).
- A page is loading after a link was followed: use [Nav progress](nav-progress.md).
- Promoting the one next step on a dashboard: use [Spotlight](spotlight.md).
- A tip about a feature: use [Hints](hints.md).

## Where it goes
At the top of the content area, under the [top nav](top-nav.md) or the app shell top bar, full width of the content column. On phones it sits under the navigation bar, or just above the tab bar when it is about something the person is doing right now (offline while writing). Only one banner at a time.

## Anatomy
| Part | What it is |
|---|---|
| `.banner` | Required. An inverse row (dark in light mode, light in dark mode), 14 px radius, medium 14 px text. |
| `.ic` | Optional leading icon that names the condition (`cloud_off`, `wifi_off`, `schedule`, `visibility`). |
| `span` | Required. The message: one sentence. |
| `.btn.btn--sm` | Optional single action. Inside a banner it takes an inverse tint and is pushed to the right end automatically. |

## Markup

**Offline.** Say what still works and offer the retry.
```html
<div class="banner" role="status" style="max-width: 640px;"><span class="ic" aria-hidden="true">cloud_off</span><span>You are offline. Changes sync when you reconnect.</span><button class="btn btn--sm">Try again</button></div>
```

**Mode the person is in.** A preview or impersonation mode needs a way out on every page.
```html
<div class="banner" style="max-width: 640px;"><span class="ic" aria-hidden="true">visibility</span><span>You are viewing this course as a student.</span><button class="btn btn--sm">Exit preview</button></div>
```

**Scheduled maintenance, dismissible.** Wrap it in `.collapse` with a `data-lds-dismiss` button when the person may hide it. The close button inherits the inverse text color.
```html
<div class="collapse" style="max-width: 640px;"><div><div class="banner"><span class="ic" aria-hidden="true">schedule</span><span>Grades are read-only on Saturday from 22:00 to 23:00.</span><button class="icon-btn" style="margin: -8px -6px -8px auto; color: inherit;" aria-label="Dismiss" data-lds-dismiss><span class="ic" style="font-size: 18px;" aria-hidden="true">close</span></button></div></div></div>
```

## States
| State | How |
|---|---|
| `appearing` | Render inside `.collapse.is-closed` and remove the class, so the page content moves down on the spring instead of jumping. |
| `dismissed` | `data-lds-dismiss` on the close button collapses the wrapping `.collapse` and fires `lds:dismiss`. |

## Motion and microinteractions
- In and out through the `.collapse` wrapper: `grid-template-rows` on `--spring-smooth` (`--d-smooth`, 560 ms) plus opacity over `--d-standard`. Content below follows the height.
- No slide-in from the top edge and no pulsing; the banner is calm because it may stay for a long time.
- Reduced motion: a 120 ms linear change.

## Accessibility
- When the banner appears because something changed (connection lost), give it `role="status"` so it is announced politely. A banner present on load needs no role.
- Never `role="alert"`: the condition is important but not an interruption.
- The action is a real `<button>` named for the outcome ("Try again", "Exit preview"). The close button needs `aria-label="Dismiss"`.
- The inverse surface keeps full text contrast in both themes; do not lower its opacity.

## Do
- Keep it to one sentence that names the condition and what still works.
- Remove it the moment the condition ends (back online: remove it and show a [toast](toast.md) "Back online").
- Offer the one action that resolves or exits the condition.

## Don't
- Use it for marketing or news; use a [spotlight](spotlight.md) on the page that matters.
- Show two banners; pick the more important condition.
- Use it for errors on this page; that is an [alert](alert.md).

## Behavior (plain HTML)
Optional. `data-lds-dismiss` on a close button collapses the closest `.collapse` and fires `lds:dismiss`. Showing and hiding the banner when the condition changes is up to the app.

## Related
[Alert](alert.md) · [Toast](toast.md) · [Nav progress](nav-progress.md) · [App shell](app-shell.md)
