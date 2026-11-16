const EMAIL = "const f = this.closest('.docs-col'); const c = f.querySelector('.control'); const input = c.querySelector('input'); const help = f.querySelector('.field__help'); const ok = /@.+[.].+/.test(input.value); c.classList.toggle('is-invalid', !ok); input.setAttribute('aria-invalid', String(!ok)); help.hidden = ok; if (!ok) import('../../js/lds.js').then((m) => m.shake(c)); else this.textContent = 'Code sent';";
const OTP = "const f = this.closest('.docs-col'); f.querySelector('.field__help').hidden = false; import('../../js/lds.js').then((m) => m.otpError(f.querySelector('.otp-wrap')));";

export default {
  title: 'Shake',
  group: 'Microinteractions',
  order: 4,
  summary: 'A refusal: the control shakes twice, quickly and with shrinking swings (360 ms), and the reason appears in words next to it. The shake catches the eye at the exact place; the words say what to do.',
  when: [
    'The person pressed Continue or Submit and the input is refused: an email with no domain, a wrong code, a wrong password.',
    'An optimistic action is rolled back by the server ([like](like), [confirm in place](confirm-in-place), [inline edit](inline-edit) do this for you).',
    'A limit refuses input at the moment it is hit: a stepper already at its maximum, a full class.',
  ],
  whenNot: [
    ['Validation while typing', 'text-field', 'Show the message after the field is left or on submit, without shaking.'],
    ['An error from the system, not the person (server down)', 'alert'],
    ['A destructive confirmation', 'confirm-in-place'],
    ['Drawing attention to something new', 'bell'],
  ],
  where: 'On the smallest element that was refused: the field control (`.control`), the OTP row, the button that was pressed. Never on the whole form, card or page.',
  examples: [
    {
      title: 'An email without a domain',
      desc: 'Press Send code. The field shakes, turns red, and says what is missing. Fix the address and try again: no shake.',
      html: `<div class="docs-col" style="max-width: 360px;">
  <div class="field">
    <label class="field__label" for="sh-email">Campus email</label>
    <div class="control"><span class="ic" aria-hidden="true">mail</span><input id="sh-email" type="email" value="ana.putri@campus" aria-describedby="sh-email-help"></div>
    <span class="field__help field__help--error" id="sh-email-help" hidden><span class="ic" aria-hidden="true">error</span>Add the end of the address, like ana.putri@campus.ac.id.</span>
  </div>
  <button class="btn btn--primary btn--block" onclick="${EMAIL}">Send code</button>
</div>`,
      code: `import { shake } from 'lampung-design-system/js';
if (!valid) {
  control.classList.add('is-invalid');
  input.setAttribute('aria-invalid', 'true');
  help.hidden = false;          // the reason, in words
  shake(control);               // plus an error haptic on phones
}`,
    },
    {
      title: 'A wrong verification code',
      desc: 'Press Verify. All six cells turn red and the row shakes once; the message under it says what to do next.',
      html: `<div class="docs-col" style="max-width: 360px;">
  <div class="field">
    <span class="field__label" id="sh-otp">Verification code</span>
    <div class="otp-wrap" data-lds-otp>
      <div class="otp" aria-hidden="true"><span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__sep"></span><span class="otp__cell"></span><span class="otp__cell"></span><span class="otp__cell"></span></div>
      <input class="otp__input" inputmode="numeric" autocomplete="one-time-code" maxlength="6" aria-labelledby="sh-otp" value="482913">
    </div>
    <span class="field__help field__help--error" hidden><span class="ic" aria-hidden="true">error</span>That code does not match. Check the latest email or send a new code.</span>
  </div>
  <button class="btn btn--primary btn--block" onclick="${OTP}">Verify</button>
</div>`,
      code: `import { otpError } from 'lampung-design-system/js';
otpError(document.querySelector('.otp-wrap')); // red cells and one shake; typing clears both`,
    },
  ],
  motion: [
    '`lds-shake` over 360 ms on `--ease-standard`: −6 px, +5 px, −3 px, +2 px, rest. Two oscillations that shrink, like a head shaking no; it ends exactly where it started.',
    '`shake(el)` restarts the animation if it is called again mid-shake and removes `.is-shake` when it ends. It also calls `haptic(\'error\')`.',
    'The red state (`is-invalid`, `otp.is-error`) appears at once with the shake and stays until the input changes; the shake itself plays once.',
    'Reduced motion: no shake (1 ms). The red state and the words carry the refusal alone, which is why the words are required.',
  ],
  a11y: [
    'Always put the reason in text, linked with `aria-describedby`, and set `aria-invalid="true"` on the input.',
    'Move focus to the refused field if it is not already there.',
    'Never shake as the only sign of an error; it is invisible to screen readers and under reduced motion.',
  ],
  do: [
    'Shake the exact control that was refused.',
    'Say what to do: "Add the end of the address, like …".',
    'Use `shake()` so the haptic and restart behavior come with it.',
  ],
  dont: [
    'Shake whole forms, cards or dialogs.',
    'Shake while the person is still typing.',
    'Shake on success, or to get attention.',
  ],
  js: '`shake(el)` adds `.is-shake` (restarting it if needed), removes it when done, and buzzes an error haptic. `otpError(wrap)` marks an OTP row as wrong and shakes it. `likeRevert`, the confirm pill and inline edit call it on failure.',
  react: `import { reject } from 'lampung-design-system/react';

if (!valid) { setError('Add the end of the address, like ana.putri@campus.ac.id.'); reject(controlRef.current); }`,
  related: ['text-field', 'otp', 'haptics', 'confirm-in-place'],
};
