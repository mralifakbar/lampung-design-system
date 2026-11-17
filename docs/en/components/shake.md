# Shake

Group: Microinteractions. https://lampung.kartadinata.app/docs/en/components/shake

A refusal: the control shakes twice, quickly and with shrinking swings (360 ms), and the reason appears in words next to it. The shake catches the eye at the exact place; the words say what to do.

## Use it when
- The person pressed Continue or Submit and the input is refused: an email with no domain, a wrong code, a wrong password.
- An optimistic action is rolled back by the server ([like](like.md), [confirm in place](confirm-in-place.md), [inline edit](inline-edit.md) do this for you).
- A limit refuses input at the moment it is hit: a stepper already at its maximum, a full queue quota.

## Use something else when
- Validation while typing: use [Text field](text-field.md). Show the message after the field is left or on submit, without shaking.
- An error from the system, not the person (server down): use [Alert](alert.md).
- A destructive confirmation: use [Confirm in place](confirm-in-place.md).
- Drawing attention to something new: use [Bell](bell.md).

## Where it goes
On the smallest element that was refused: the field control (`.control`), the OTP row, the button that was pressed. Never on the whole form, card or page.

## Markup

**An email without a domain.** Press Send code. The field shakes, turns red, and says what is missing. Fix the address and try again: no shake.
```html
import { shake } from 'lampung-design-system/js';
if (!valid) {
  control.classList.add('is-invalid');
  input.setAttribute('aria-invalid', 'true');
  help.hidden = false;          // the reason, in words
  shake(control);               // plus an error haptic on phones
}
```

**A wrong verification code.** Press Verify. All six cells turn red and the row shakes once; the message under it says what to do next.
```html
import { otpError } from 'lampung-design-system/js';
otpError(document.querySelector('.otp-wrap')); // red cells and one shake; typing clears both
```

## Motion and microinteractions
- `lds-shake` over 360 ms on `--ease-standard`: −6 px, +5 px, −3 px, +2 px, rest. Two oscillations that shrink, like a head shaking no; it ends exactly where it started.
- `shake(el)` restarts the animation if it is called again mid-shake and removes `.is-shake` when it ends. It also calls `haptic('error')`.
- The red state (`is-invalid`, `otp.is-error`) appears at once with the shake and stays until the input changes; the shake itself plays once.
- Reduced motion: no shake (1 ms). The red state and the words carry the refusal alone, which is why the words are required.

## Accessibility
- Always put the reason in text, linked with `aria-describedby`, and set `aria-invalid="true"` on the input.
- Move focus to the refused field if it is not already there.
- Never shake as the only sign of an error; it is invisible to screen readers and under reduced motion.

## Do
- Shake the exact control that was refused.
- Say what to do: "Add the end of the address, like …".
- Use `shake()` so the haptic and restart behavior come with it.

## Don't
- Shake whole forms, cards or dialogs.
- Shake while the person is still typing.
- Shake on success, or to get attention.

## Behavior (plain HTML)
`shake(el)` adds `.is-shake` (restarting it if needed), removes it when done, and buzzes an error haptic. `otpError(wrap)` marks an OTP row as wrong and shakes it. `likeRevert`, the confirm pill and inline edit call it on failure.

## React
```tsx
import { reject } from 'lampung-design-system/react';

if (!valid) { setError('Add the end of the address, like ana.putri@contoh.go.id.'); reject(controlRef.current); }
```

## Related
[Text field](text-field.md) · [One-time code](otp.md) · [Haptics](haptics.md) · [Confirm in place](confirm-in-place.md)
