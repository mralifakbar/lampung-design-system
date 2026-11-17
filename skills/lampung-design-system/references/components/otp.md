# One-time code

Group: Inputs. Docs page: `docs/components/otp.html`.

Six cells for a verification code, backed by one real input, so paste, SMS autofill and password managers all work. A wrong code shakes the cells once and turns them red.

## Use it when
- Verifying a phone number or email with a code sent by SMS or email.
- Two-step sign in, or confirming a sensitive change with a code.
- Joining something by a short numeric code read out loud (an event check-in code).

## Use something else when
- A password or PIN people choose themselves: use [Password field](password-field.md).
- A long code with letters (a voucher, a registration number): use [Text field](text-field.md). Use a normal field with `autocapitalize="characters"`.
- A number with a meaning (amount, count): use [Amount field](amount-field.md).

## Where it goes
Alone on its step: a verification screen, a [sheet](sheet.md) on phones, a [dialog](dialog.md) on wide screens. Put the label above, the helper (where the code was sent, resend timer) below. Centered on phones.

## Anatomy
| Part | What it is |
|---|---|
| `.otp-wrap` | Required. Positioned wrapper with `data-lds-otp`. Holds the cells and the real input. |
| `.otp` | Required. The row of cells, `aria-hidden="true"` (the input is what assistive tech uses). |
| `.otp__cell` | Required. One per digit, 48 by 56. The JS fills them and marks `.is-filled` and `.is-active`. |
| `.otp__sep` | Optional dash between groups (3 + 3). |
| `.otp__input` | Required. The one real `<input>` stretched invisibly over the cells: `inputmode="numeric"`, `autocomplete="one-time-code"`, `maxlength` equal to the cell count. |

## Markup

**Verify a phone number.** Type or paste a six-digit code. The caret blinks in the active cell; each digit pops in. Any code except 123456 is refused here, to show the error.
```html
<span class="field__label" id="code-label">Verification code</span>
<div class="otp-wrap" data-lds-otp>
  <div class="otp" aria-hidden="true">
    <span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__cell"></span>
    <span class="otp__sep"></span>
    <span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__cell"></span>
  </div>
  <input class="otp__input" inputmode="numeric" autocomplete="one-time-code" maxlength="6" aria-labelledby="code-label" aria-describedby="code-help">
</div>
<span class="field__help" id="code-help" aria-live="polite">Sent by SMS to 0812 •••• 7890.</span>

<script type="module">
  import { otpError } from 'lampung-design-system/js';
  wrap.addEventListener('lds:complete', async (e) => {
    if (!(await verify(e.detail.value))) otpError(wrap);
  });
</script>
```

## States
| State | How |
|---|---|
| `.is-active (cell)` | The next cell to fill; while the input has focus it gets the accent edge, halo and a blinking caret. |
| `.is-filled (cell)` | Holds a digit; the digit pops in. |
| `.is-error (on .otp)` | All cells get a danger edge. Set by `otpError(wrap)`; cleared on the next input. |
| `.is-shake (on .otp)` | One 360 ms shake, added by `otpError` together with `.is-error`. |
| `checking` | While the code is verified, put a [spinner](spinner.md) next to the cells and keep the input enabled. |

## Motion and microinteractions
- Each new digit pops in with `lds-pop-in` (scale 0.6 to 1 with fade) on `--spring-snappy` (360 ms).
- The caret in the active cell blinks with `lds-caret`, 1 s steps; focus ring on the active cell transitions in `--d-fast`.
- A refused code shakes the row once with `lds-shake`: 360 ms, two short oscillations of 6 px then 3 px, then still. See [shake](shake.md). Pair with an error haptic on phones ([haptics](haptics.md)).
- Reduced motion: the pop and the shake become a 1 ms change (the red edge still says it), the caret stops blinking after one cycle.

## Accessibility
- One real input carries the value: it is labelled (`aria-labelledby`) and described by the helper; the cells are `aria-hidden`.
- `autocomplete="one-time-code"` lets iOS and Android offer the SMS code above the keyboard; `inputmode="numeric"` opens the number pad.
- Paste works anywhere in the field; non-digits are stripped and the value is capped at the cell count.
- Put the result in an `aria-live="polite"` helper ("That code is not right…"), not only in the red edge.

## Do
- Submit automatically when the last digit arrives (`lds:complete`); no Verify button needed.
- Say where the code went and offer resend with a countdown ([timer](timer.md)).

## Don't
- Build six separate inputs; paste and autofill break.
- Clear the code on error without letting people see what they typed.

## Behavior (plain HTML)
`data-lds-otp` on `.otp-wrap`: fills the cells from the input, keeps digits only, marks `.is-active`/`.is-filled`, clears the error on input, and fires `lds:complete` with `{ value }` when all cells are filled. `otpError(wrap)` marks the error and shakes.

## Related
[Password field](password-field.md) · [Shake](shake.md) · [Timer](timer.md) · [Sheet](sheet.md)
