export default {
  title: 'Text field',
  group: 'Inputs',
  order: 1,
  summary: 'A single line of free text with its label above and a helper line below. The helper turns into the error message, so the layout never jumps.',
  when: [
    'People type a short free value: a name, an email, a NIK, a kelurahan name.',
    'A form needs a field that validates (after the first blur, then live) and says what to fix in words.',
    'A value needs a leading icon, a unit, or one trailing action such as clear (`.control__btn`).',
  ],
  whenNot: [
    ['More than one line of text (a note, a reason, a description)', 'textarea'],
    ['Money or another number with a unit', 'amount-field', 'Same `.control`, with the currency as a prefix and a numeric keyboard'],
    ['Finding things in a list or page', 'search-field', 'Filled shape, no label, Cancel on phones'],
    ['A password or PIN', 'password-field'],
    ['A one-time code from SMS or email', 'otp'],
    ['The answer is one of a known list', 'select', 'Or a [combobox](combobox) when the list is long and people type to find'],
    ['A date', 'date-field'],
    ['Several short values (topics, emails to invite)', 'tag-input'],
  ],
  where: 'Inside a [form](form-layout): fields stack 20 px apart in `.form`, short pairs (first and last name, city and postcode) share a `.form__row`, and the buttons end the form in `.form__actions`. Full width of its column on phones; on wide screens cap the form at about 560 px instead of stretching a field across the page.',
  anatomy: [
    ['.field', 'Required. Column wrapper, 8 px between label, control and helper.'],
    ['.field__label', 'Required. A `<label for>` above the control. A `<span>` inside it is the quiet right-hand note ("Optional", a counter).'],
    ['.control', 'Required. The 44 px box with the border, focus ring and states. Holds the `<input>`, which fills the rest of the row.'],
    ['.control > .ic', 'Optional leading icon, 19 px, muted; turns accent while the field has focus.'],
    ['.control__suffix', 'Optional unit or prefix text (Rp, kg, %, m²).'],
    ['.control__btn', 'Optional trailing 30 px icon button (clear, reveal, open calendar). Needs an `aria-label`.'],
    ['.field__help', 'Helper text under the control. Add `--error` (with an `error` icon) or `--ok` (with `check_circle`) to turn it into feedback in the same place.'],
  ],
  examples: [
    {
      title: 'Label, control, helper',
      desc: 'The label is always visible; the placeholder is only an example, never the label. The helper says the format before anyone gets it wrong.',
      html: `<div class="form" style="max-width: 420px;">
  <div class="field">
    <label class="field__label" for="tf-name">Full name</label>
    <div class="control"><input id="tf-name" autocomplete="name" placeholder="Siti Rahmawati" aria-describedby="tf-name-help"></div>
    <span class="field__help" id="tf-name-help">As written on your ID card.</span>
  </div>
  <div class="field">
    <label class="field__label" for="tf-school">Kelurahan <span>Optional</span></label>
    <div class="control"><span class="ic" aria-hidden="true">location_on</span><input id="tf-school" autocomplete="address-level4" placeholder="Kelurahan Way Halim Permai"></div>
  </div>
</div>`,
    },
    {
      title: 'Error and success in the helper slot',
      desc: 'The helper line becomes the message, so nothing below moves. Errors say what happened and how to fix it. Type a valid address and leave the field to see it turn green.',
      html: `<div class="form" style="max-width: 420px;">
  <div class="field">
    <label class="field__label" for="tf-email">Email</label>
    <div class="control is-invalid"><span class="ic" aria-hidden="true">mail</span><input id="tf-email" type="email" autocomplete="email" value="siti@example" aria-invalid="true" aria-describedby="tf-email-help"
      onblur="const ok = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]{2,}$/.test(this.value); const c = this.parentElement, h = document.getElementById('tf-email-help'); c.classList.toggle('is-invalid', !ok); this.setAttribute('aria-invalid', String(!ok)); h.className = 'field__help ' + (ok ? 'field__help--ok' : 'field__help--error'); h.firstElementChild.textContent = ok ? 'check_circle' : 'error'; h.lastChild.textContent = ok ? 'We will send the application receipt here.' : 'This address is missing a domain, like siti@example.id.';"></div>
    <span class="field__help field__help--error" id="tf-email-help"><span class="ic" aria-hidden="true">error</span><span>This address is missing a domain, like siti@example.id.</span></span>
  </div>
</div>`,
      code: `<div class="field">
  <label class="field__label" for="email">Email</label>
  <div class="control is-invalid">
    <span class="ic" aria-hidden="true">mail</span>
    <input id="email" type="email" autocomplete="email" aria-invalid="true" aria-describedby="email-help">
  </div>
  <span class="field__help field__help--error" id="email-help"><span class="ic" aria-hidden="true">error</span>This address is missing a domain, like siti@example.id.</span>
</div>

<!-- Valid -->
<span class="field__help field__help--ok" id="email-help"><span class="ic" aria-hidden="true">check_circle</span>We will send the application receipt here.</span>`,
    },
    {
      title: 'Trailing action and disabled',
      desc: 'A clear button appears once there is text. A disabled field says who can change it, in the helper.',
      html: `<div class="form" style="max-width: 420px;">
  <div class="field">
    <label class="field__label" for="tf-course">Business name</label>
    <div class="control"><input id="tf-course" value="Keripik Pisang Bu Rina" oninput="this.nextElementSibling.hidden = !this.value"><button type="button" class="control__btn" aria-label="Clear business name" onclick="const i = this.previousElementSibling; i.value = ''; this.hidden = true; i.focus();"><span class="ic" aria-hidden="true">close</span></button></div>
  </div>
  <div class="field">
    <label class="field__label" for="tf-sid">NIK</label>
    <div class="control is-disabled"><span class="ic" aria-hidden="true">lock</span><input id="tf-sid" value="1871 •••• •••• 0003" disabled aria-describedby="tf-sid-help"></div>
    <span class="field__help" id="tf-sid-help">Taken from the civil registry. Ask for a change at the kelurahan office.</span>
  </div>
</div>`,
    },
    {
      title: 'In a form',
      desc: 'Pairs sit side by side when there is room and stack on phones; the actions end the form and go full width below 560 px.',
      html: `<form class="form" style="max-width: 560px;" onsubmit="event.preventDefault()">
  <div class="form__row">
    <div class="field"><label class="field__label" for="tf-first">First name</label><div class="control"><input id="tf-first" autocomplete="given-name"></div></div>
    <div class="field"><label class="field__label" for="tf-last">Last name</label><div class="control"><input id="tf-last" autocomplete="family-name"></div></div>
  </div>
  <div class="field"><label class="field__label" for="tf-phone">Phone</label><div class="control"><span class="ic" aria-hidden="true">call</span><input id="tf-phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="08xx xxxx xxxx"></div></div>
  <div class="form__actions"><button type="button" class="btn btn--secondary">Cancel</button><button type="submit" class="btn btn--primary">Save profile</button></div>
</form>`,
    },
  ],
  variants: [
    ['.control > .ic', 'Leading icon for a field whose kind is not obvious from the label (mail, phone, location).'],
    ['.control__suffix', 'Unit or prefix text; see [amount field](amount-field).'],
    ['.control__btn', 'One trailing action: clear, reveal ([password field](password-field)), open a calendar ([date field](date-field)).'],
    ['.field__help--error / --ok', 'The helper line as feedback, with an `error` or `check_circle` icon.'],
  ],
  states: [
    ['hover', 'The border darkens to `--text-subtle` (devices with hover).'],
    ['focus', 'Automatic via `:focus-within`: 1.5 px accent edge plus a 4 px `--accent-ring` halo; the leading icon turns accent.'],
    ['.is-invalid + aria-invalid="true"', 'Danger edge and halo. Pair with `.field__help--error` and keep `aria-describedby` pointing at it.'],
    ['.is-disabled + disabled', 'Fill background, quiet border, muted text. Put `disabled` on the input and the class on `.control`.'],
    ['autofill', 'Handled by the system: the browser paint is clipped to the text and the field keeps its own background. On a field placed on another color set `--autofill-bg` on it.'],
    ['on a filled surface', 'Inside `.card--fill`, `.list--fill`, `.kv-list` or `.spotlight` the control switches to the base color by itself (never fill on fill).'],
  ],
  motion: [
    'Focus ring and border: `box-shadow` and `background-color` transition in `--d-fast` (160 ms) on `--ease-standard`; the leading icon color follows in the same time. Leaving focus reverses the same transition, so tabbing fast through a form never flickers.',
    'Errors appear in place: swap the helper text, do not slide a new line in. If a submit is refused, [shake](shake) the field once (two short oscillations, 360 ms) instead of animating the message.',
    'Validate after the first blur, then live on each input: the message changes as soon as the value is fixed, so the person sees the green state while still typing.',
    'Reduced motion: every transition becomes 120 ms linear; nothing in a field travels, so behavior is otherwise the same.',
  ],
  a11y: [
    'Every input has a `<label for>`. Never rely on the placeholder; it disappears on typing and is low contrast by design.',
    'Point `aria-describedby` at the helper so the format hint and later the error are read with the field. Set `aria-invalid="true"` together with `.is-invalid`.',
    'Use the right `type`, `inputmode` and `autocomplete` (`email`, `tel`, `name`, `given-name`, `organization`) so phones show the right keyboard and browsers can fill it.',
    'On touch screens the input renders at 16 px or larger (the system does this under `pointer: coarse`), so iOS never zooms the page on focus. Do not set a smaller font on `.control input`.',
    'A `.control__btn` is a real `<button type="button">` with an `aria-label` naming its effect ("Clear business name").',
  ],
  do: [
    'Write the label as a noun ("Email"), the helper as the format or why you ask ("We send receipts here").',
    'Mark the rare optional field with "Optional" in the label span instead of starring every required one.',
    'Keep one column on phones; pair only short related fields with `.form__row`.',
  ],
  dont: [
    'Put the label inside the field as a placeholder, or float it.',
    'Show an error while someone is still typing their first attempt.',
    'Write a new box style for a field (rounded pill, underline only, shadow). Use `.control`.',
    'Disable a field without saying why in the helper.',
  ],
  related: ['form-layout', 'textarea', 'amount-field', 'password-field'],
};
