export default {
  title: 'One-time code',
  group: 'Inputs',
  order: 7,
  summary: 'Six cells for a verification code, backed by one real input, so paste, SMS autofill and password managers all work. A wrong code shakes the cells once and turns them red.',
  when: [
    'Verifying a phone number or email with a code sent by SMS or email.',
    'Two-step sign in, or confirming a sensitive change with a code.',
    'Joining something by a short numeric code read out loud (an event check-in code).',
  ],
  whenNot: [
    ['A password or PIN people choose themselves', 'password-field'],
    ['A long code with letters (a voucher, a registration number)', 'text-field', 'Use a normal field with `autocapitalize="characters"`'],
    ['A number with a meaning (amount, count)', 'amount-field'],
  ],
  where: 'Alone on its step: a verification screen, a [sheet](sheet) on phones, a [dialog](dialog) on wide screens. Put the label above, the helper (where the code was sent, resend timer) below. Centered on phones.',
  anatomy: [
    ['.otp-wrap', 'Required. Positioned wrapper with `data-lds-otp`. Holds the cells and the real input.'],
    ['.otp', 'Required. The row of cells, `aria-hidden="true"` (the input is what assistive tech uses).'],
    ['.otp__cell', 'Required. One per digit, 48 by 56. The JS fills them and marks `.is-filled` and `.is-active`.'],
    ['.otp__sep', 'Optional dash between groups (3 + 3).'],
    ['.otp__input', 'Required. The one real `<input>` stretched invisibly over the cells: `inputmode="numeric"`, `autocomplete="one-time-code"`, `maxlength` equal to the cell count.'],
  ],
  examples: [
    {
      title: 'Verify a phone number',
      desc: 'Type or paste a six-digit code. The caret blinks in the active cell; each digit pops in. Any code except 123456 is refused here, to show the error.',
      html: `<div class="field" style="align-items: flex-start;">
  <span class="field__label" id="otp-l">Verification code</span>
  <div class="otp-wrap" data-lds-otp>
    <div class="otp" aria-hidden="true"><span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__sep"></span><span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__cell"></span></div>
    <input class="otp__input" inputmode="numeric" autocomplete="one-time-code" maxlength="6" aria-labelledby="otp-l" aria-describedby="otp-h"
      oninput="const w = this.parentElement, h = document.getElementById('otp-h'); if (this.value.length === 6 && this.value !== '123456') { import('../../js/lds.js').then((m) => m.otpError(w)); h.className = 'field__help field__help--error'; h.textContent = 'That code is not right. Check the latest SMS, or send a new code.'; } else { h.className = 'field__help'; h.textContent = 'Sent by SMS to 0812 •••• 7890.'; }">
  </div>
  <span class="field__help" id="otp-h" aria-live="polite">Sent by SMS to 0812 •••• 7890.</span>
</div>`,
      code: `<span class="field__label" id="code-label">Verification code</span>
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
</script>`,
    },
  ],
  states: [
    ['.is-active (cell)', 'The next cell to fill; while the input has focus it gets the accent edge, halo and a blinking caret.'],
    ['.is-filled (cell)', 'Holds a digit; the digit pops in.'],
    ['.is-error (on .otp)', 'All cells get a danger edge. Set by `otpError(wrap)`; cleared on the next input.'],
    ['.is-shake (on .otp)', 'One 360 ms shake, added by `otpError` together with `.is-error`.'],
    ['checking', 'While the code is verified, put a [spinner](spinner) next to the cells and keep the input enabled.'],
  ],
  motion: [
    'Each new digit pops in with `lds-pop-in` (scale 0.6 to 1 with fade) on `--spring-snappy` (360 ms).',
    'The caret in the active cell blinks with `lds-caret`, 1 s steps; focus ring on the active cell transitions in `--d-fast`.',
    'A refused code shakes the row once with `lds-shake`: 360 ms, two short oscillations of 6 px then 3 px, then still. See [shake](shake). Pair with an error haptic on phones ([haptics](haptics)).',
    'Reduced motion: the pop and the shake become a 1 ms change (the red edge still says it), the caret stops blinking after one cycle.',
  ],
  a11y: [
    'One real input carries the value: it is labelled (`aria-labelledby`) and described by the helper; the cells are `aria-hidden`.',
    '`autocomplete="one-time-code"` lets iOS and Android offer the SMS code above the keyboard; `inputmode="numeric"` opens the number pad.',
    'Paste works anywhere in the field; non-digits are stripped and the value is capped at the cell count.',
    'Put the result in an `aria-live="polite"` helper ("That code is not right…"), not only in the red edge.',
  ],
  do: [
    'Submit automatically when the last digit arrives (`lds:complete`); no Verify button needed.',
    'Say where the code went and offer resend with a countdown ([timer](timer)).',
  ],
  dont: [
    'Build six separate inputs; paste and autofill break.',
    'Clear the code on error without letting people see what they typed.',
  ],
  js: '`data-lds-otp` on `.otp-wrap`: fills the cells from the input, keeps digits only, marks `.is-active`/`.is-filled`, clears the error on input, and fires `lds:complete` with `{ value }` when all cells are filled. `otpError(wrap)` marks the error and shakes.',
  related: ['password-field', 'shake', 'timer', 'sheet'],
};
