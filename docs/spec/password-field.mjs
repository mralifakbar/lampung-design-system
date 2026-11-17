export default {
  title: 'Password field',
  group: 'Inputs',
  order: 5,
  summary: 'A text field for secrets, with a reveal button that swaps its eye icon in place. When creating a password, a four-step strength meter and a helper say what would make it stronger.',
  when: [
    'Signing in (current password) or creating and changing one (new password with strength).',
    'Any secret people type and may want to check: a PIN, a one-time service counter code.',
  ],
  whenNot: [
    ['A one-time code sent by SMS or email', 'otp', 'Cells, numeric keyboard, paste and autofill of the whole code'],
    ['A plain value that is not secret', 'text-field'],
    ['Confirming a destructive action', 'alert-dialog', 'Do not ask for the password again unless the action really needs it'],
  ],
  where: 'In the sign-in or account [form](form-layout), under the email or username field. On phones keep it full width; the reveal button stays inside the control.',
  anatomy: [
    ['.field / .field__label / .field__help', 'Required. Same wrapper as a [text field](text-field). The helper holds the rule, then the strength word.'],
    ['.control', 'Required. Holds a leading `key` icon (optional), the input and the reveal button.'],
    ['input[type=password]', 'Required. `autocomplete="current-password"` to sign in, `"new-password"` to create one.'],
    ['.control__btn > .swap', 'Reveal button. `.swap__a` is `visibility`, `.swap__b` is `visibility_off`; `.is-swapped` crossfades them.'],
    ['.meter-seg', 'Optional strength meter for new passwords: four `<i>`, `.on` for each step reached; `.is-warn` (fair) or `.is-full` (weak, danger color) on the meter.'],
  ],
  examples: [
    {
      title: 'Sign in with reveal',
      desc: 'The eye swaps to the crossed eye with a blur crossfade; focus stays in the field.',
      html: `<div class="field" style="max-width: 380px;">
  <label class="field__label" for="pf-pw">Password</label>
  <div class="control"><span class="ic" aria-hidden="true">key</span><input id="pf-pw" type="password" autocomplete="current-password" value="wayhalim2026">
    <button type="button" class="control__btn" aria-label="Show password" aria-pressed="false" onclick="const i = this.previousElementSibling, on = i.type === 'password'; i.type = on ? 'text' : 'password'; this.setAttribute('aria-pressed', String(on)); this.setAttribute('aria-label', on ? 'Hide password' : 'Show password'); this.firstElementChild.classList.toggle('is-swapped', on);"><span class="swap" aria-hidden="true"><span class="ic swap__a">visibility</span><span class="ic swap__b">visibility_off</span></span></button></div>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="pw">Password</label>
  <div class="control">
    <span class="ic" aria-hidden="true">key</span>
    <input id="pw" type="password" autocomplete="current-password">
    <button type="button" class="control__btn" aria-label="Show password" aria-pressed="false">
      <span class="swap" aria-hidden="true"><span class="ic swap__a">visibility</span><span class="ic swap__b">visibility_off</span></span>
    </button>
  </div>
</div>
<!-- On click: toggle input.type, aria-pressed, the label (Show / Hide password) and .is-swapped on .swap -->`,
    },
    {
      title: 'New password with strength',
      desc: 'Four steps fill as the password gets stronger; weak shows in the danger color, fair in warning. Type to try it.',
      html: `<div class="field" style="max-width: 380px;">
  <label class="field__label" for="pf-new">New password</label>
  <div class="control"><input id="pf-new" type="password" autocomplete="new-password" placeholder="At least 8 characters" aria-describedby="pf-new-help"
    oninput="const v = this.value; let s = 0; if (v.length >= 8) { s = 1; if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++; if (/\\d/.test(v)) s++; if (/[^A-Za-z0-9]/.test(v)) s++; } const m = document.getElementById('pf-meter'); [...m.children].forEach((x, i) => x.classList.toggle('on', i < s)); m.classList.toggle('is-full', !!v && s <= 1); m.classList.toggle('is-warn', s === 2); document.getElementById('pf-new-help').textContent = !v ? 'Use 8 or more characters.' : ['Use 8 or more characters.', 'Weak. Mix upper and lower case.', 'Fair. Add a number.', 'Good. A symbol makes it strong.', 'Strong password.'][s];"></div>
  <div class="meter-seg" id="pf-meter" style="grid-template-columns: repeat(4, minmax(0, 1fr));" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
  <span class="field__help" id="pf-new-help" aria-live="polite">Use 8 or more characters.</span>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="new-pw">New password</label>
  <div class="control"><input id="new-pw" type="password" autocomplete="new-password" aria-describedby="new-pw-help"></div>
  <div class="meter-seg is-warn" style="grid-template-columns: repeat(4, minmax(0, 1fr));" aria-hidden="true">
    <i class="on"></i><i class="on"></i><i></i><i></i>
  </div>
  <span class="field__help" id="new-pw-help" aria-live="polite">Fair. Add a number.</span>
</div>`,
    },
    {
      title: 'Wrong password',
      desc: 'Say what failed and offer the way out in the same place.',
      html: `<div class="field" style="max-width: 380px;">
  <label class="field__label" for="pf-bad">Password</label>
  <div class="control is-invalid"><input id="pf-bad" type="password" value="wayhalim" aria-invalid="true" aria-describedby="pf-bad-help"></div>
  <span class="field__help field__help--error" id="pf-bad-help"><span class="ic" aria-hidden="true">error</span>That password does not match this account. Check Caps Lock or reset it.</span>
  <a class="link" href="#">Reset password</a>
</div>`,
    },
  ],
  states: [
    ['hidden / shown', '`type="password"` with `aria-pressed="false"` and label "Show password"; shown flips all three and adds `.is-swapped`.'],
    ['strength', '`.meter-seg` steps `.on`; `.is-full` (weak, danger) and `.is-warn` (fair, warning); good and strong use the accent.'],
    ['.is-invalid', 'Danger edge with the error in the helper, as the [text field](text-field).'],
  ],
  motion: [
    'Reveal: the two glyphs crossfade in `.swap`; the outgoing one scales to 0.5 with a 4 px blur in `--d-fast` (160 ms) while the new one settles on `--spring-snappy` (360 ms). See [icon swap](icon-swap).',
    'The button sinks to 0.88 on `:active` and springs back on `--spring-snappy`.',
    'Meter steps change color in `--d-standard` (240 ms) on `--ease-standard`; they do not grow or slide.',
    'Reduced motion: the swap becomes a 120 ms crossfade without scale travel.',
  ],
  a11y: [
    'The reveal button is a `<button type="button">` with `aria-pressed` and a label that says what it does now ("Show password", "Hide password"). Keep focus in the input after toggling if you can.',
    'Use the right `autocomplete` so password managers work: `current-password` or `new-password`. Never block paste.',
    'The meter is decorative (`aria-hidden`); the helper says the strength in words in an `aria-live="polite"` region.',
    'Say the rules before the error; on a failed sign-in, do not say which of email or password was wrong if that leaks accounts.',
  ],
  do: [
    'Offer reveal on every password field, especially on phones.',
    'Explain the next step to a stronger password, not a list of failed rules.',
  ],
  dont: [
    'Ask people to type a new password twice when reveal is available.',
    'Use color alone for strength; the helper says it in words.',
    'Disable paste or autofill.',
  ],
  js: 'None. Toggle `type`, `aria-pressed`, the label and `.is-swapped` on click; compute strength in your code and set `.on` on the meter steps.',
  related: ['text-field', 'otp', 'icon-swap', 'meter'],
};
