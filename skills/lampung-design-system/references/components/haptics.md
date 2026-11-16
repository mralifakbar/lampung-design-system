# Haptics

Group: Microinteractions. Docs page: `docs/components/haptics.html`.

A short vibration on phones that support it, always together with a visible change, never alone. Four kinds: light for a tap that changed something, medium for a gesture that committed, success when something finished, error when something was refused.

## Use it when
- Adding feel to a moment that already has visible feedback: a like, a switch landing, a swipe that commits, a long press that opens a menu.
- Confirming an outcome the person waited for: an upload finished, a confirm completed.

## Use something else when
- Telling the person something with no visual change: use [Toast](toast.md). Haptics are never the only signal.
- Refusing input: use [Shake](shake.md). It already buzzes the error pattern.
- Every button press: use [Press feedback](press-feedback.md). The visual sink is enough.
- Reducing motion: use [Reduced motion](reduced-motion.md).

## Where it goes
Called from code at the moment of the event, after a user gesture. The system components already call it; you only call it for new moments.

## Markup

**The four kinds.** On an Android phone with vibration, press each one. On desktops and on iPhone browsers nothing happens, which is why haptics only add to what the screen already shows.
```html
import { haptic } from 'lampung-design-system/js';
haptic('success'); // 'light' | 'medium' | 'success' | 'error'
```

**Built in where it belongs.** The like buzzes light when it fills; the confirm buzzes light when it asks and success when it is done; a refused shake buzzes error.
```html
<button class="like" aria-pressed="false" data-lds-like aria-label="Like"><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="8"></span></button>
<div class="confirm" data-lds-confirm>
  <span class="confirm__face confirm__face--rest"><button class="confirm__arm" data-act="arm"><span class="ic" aria-hidden="true">delete</span>Clear history</button></span>
  <span class="confirm__face confirm__face--ask"><span class="confirm__q">Clear history?</span><button class="btn btn--plain" data-act="cancel">Cancel</button><button class="btn btn--danger" data-act="confirm">Clear</button></span>
  <span class="confirm__face confirm__face--busy" role="status"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="shimmer">Clearing</span></span>
  <span class="confirm__face confirm__face--done" role="status"><span class="ic" aria-hidden="true">check_circle</span>History cleared<button class="confirm__undo" data-act="undo">Undo</button></span>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `light` | 8 ms. A tap that changed something: like on, confirm armed. |
| `medium` | 14 ms. A gesture that committed: swipe delete, long press opening a context menu. |
| `success` | 10, 40, 18 ms. Something finished: confirm done, upload complete, thinking done. |
| `error` | 12, 30, 12, 30, 12 ms. Refused: `shake()`, `likeRevert()`, a failed save. |

## Motion and microinteractions
- Timing: fire at the same moment as the visual change (pointer down for presses, the commit frame for gestures), never after an animation.
- One haptic per event. Do not stack a light tap under a success pattern.
- Reduced motion does not turn haptics off; `data-lds-haptics="off"` on `<html>` does (offer it as a setting).

## Accessibility
- Never the only signal: every haptic pairs with a visible and, where it matters, an announced change.
- Runs only after the person has interacted with the page (`navigator.userActivation`), so pages never buzz on load.
- Respect a "Vibration" or "Haptics" setting in the product with `data-lds-haptics="off"`.

## Do
- Use the four kinds as named; do not invent patterns.
- Let system components fire their own haptics.

## Don't
- Buzz on every press or on scroll.
- Use a haptic to tell the person something the screen does not show.
- Fire haptics from timers or background events.

## Behavior (plain HTML)
`haptic(kind)` uses `navigator.vibrate` when available, after user activation, unless `data-lds-haptics="off"` is on `<html>`. Called by like, confirm, swipe commit, context menu long press, shake, thinking done and upload complete.

## React
```tsx
import { notify } from 'lampung-design-system/react';

notify({ title: 'Upload finished', icon: 'check_circle' }, 'success'); // toast plus a success haptic
```

## Related
[Shake](shake.md) · [Like](like.md) · [Press feedback](press-feedback.md) · [Reduced motion](reduced-motion.md)
