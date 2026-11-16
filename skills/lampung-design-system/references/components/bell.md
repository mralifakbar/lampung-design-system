# Bell

Group: Microinteractions. Docs page: `docs/components/bell.html`.

The bell icon rings once, a short swing from its top that settles in 640 ms, when notifications are turned on or a new one arrives. Once, never on a loop: it acknowledges, it does not nag.

## Use it when
- A switch turns notifications or reminders on: the bell inside the switch label rings as the thumb lands.
- A notification arrives while the person is looking at the screen: the bell in the top bar rings once and the count appears.

## Use something else when
- A notification the person must read now: use [Banner](banner.md).
- A message that confirms an action: use [Toast](toast.md).
- An unread count on its own: use [Count](count.md).
- A refused action: use [Shake](shake.md).
- Something new in the product to explain: use [Coachmark](coachmark.md).

## Where it goes
On a notifications icon only: inside a `.switch` label, or in an [icon button](icon-button.md) in the top bar or app shell.

## Anatomy
| Part | What it is |
|---|---|
| `.bell` | Required. On the `notifications` icon (`<span class="bell ic">`). Swings from 50 % 10 % (the top of the bell). |
| `.is-ringing` | Plays the ring once. Remove and re-add it to ring again. |

## Markup

**Turning notifications on.** Switch it on: the thumb lands and stretches, and the bell rings once. Switching off is silent.
```html
<label class="switch"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="bell ic" aria-hidden="true">notifications</span>Notify me when grades are posted</label>
```

**A new notification arrives.** Simulate one: the bell rings once and the count goes up. A second arrival rings again from the start.
```html
<button class="icon-btn" aria-label="Notifications, 2 unread">
  <span class="bell ic" aria-hidden="true">notifications</span>
  <span class="count">2</span>
</button>
// on arrival: bell.classList.remove('is-ringing'); void bell.offsetWidth; bell.classList.add('is-ringing');
```

## Motion and microinteractions
- `lds-ring` over 640 ms on `--ease-standard`: rotate 15, −12, 8, −4, 2, 0 degrees, pivoting at the top of the bell. The swing shrinks to rest like a real bell.
- Plays once per event. In a switch it rings only when turned on, after the thumb starts moving (the switch also plays its 340 ms landing stretch).
- Interruption: a new event restarts the ring from 0 (remove the class, force a reflow, add it).
- Reduced motion: no ring; the switch state and the count change carry the meaning.

## Accessibility
- The bell is `aria-hidden`; the switch label or the button label says what it is ("Notifications, 2 unread").
- Update the button label when the count changes; do not rely on the ring to announce anything.

## Do
- Ring once per event.
- Keep it on the notifications icon only.
- Pair it with a count or a switch state.

## Don't
- Loop the ring or ring on page load.
- Ring for every notification in a burst; ring once for the group.
- Use the ring on other icons.

## Behavior (plain HTML)
Inside a `.switch`, `init()` rings any `.bell` in the label when the switch turns on. Elsewhere, toggle `.is-ringing` yourself.

## React
```tsx
import { Switch } from 'lampung-design-system/react';

<Switch checked={notify} onChange={setNotify}>Notify me when grades are posted</Switch>
// Switch does not ring a bell itself: render <span className={`bell ic${ring ? ' is-ringing' : ''}`}>notifications</span> beside it and set ring when it turns on.
```

## Related
[Switch](switch.md) · [Count](count.md) · [Icon button](icon-button.md) · [Haptics](haptics.md)
