const field = (id, label, type, value, help, extra = '') => `<div class="field">
      <label class="field__label" for="${id}">${label}${extra}</label>
      <div class="control"><input id="${id}" type="${type}" value="${value}"${help ? ` aria-describedby="${id}-help"` : ''}></div>${help ? `
      <span class="field__help" id="${id}-help">${help}</span>` : ''}
    </div>`;

export default {
  title: 'Form layout',
  group: 'Foundations',
  order: 2,
  summary: 'The frame every form uses: `form` stacks fields 20 px apart, `form__row` puts short fields side by side when there is room, and `form__actions` ends the form with its buttons. Fields inside are always `.field`.',
  when: [
    'Any form with more than one field: registration, profile, payment, a service settings page, the body of a dialog or sheet.',
    'Two or three short fields belong together on one line on wide screens (first and last name, city and postal code, start and end date) and must stack on phones.',
    'A form needs its buttons at the end, primary on the right on wide screens and full width on top on phones.',
  ],
  whenNot: [
    ['Placing anything that is not a form (cards, badges, toolbars)', 'layout-primitives'],
    ['The single field itself: label, control, helper and error', 'text-field'],
    ['One search box above a list', 'search-field', 'A search field is not a form; it filters as you type and has no submit row.'],
    ['A setting that applies the moment it changes', 'switch', 'Settings lists save per row; they do not get a form__actions row.'],
    ['Long values read back as label and value, not edited', 'key-value'],
  ],
  where: 'Inside the page content column (cap it with `measure` or a max width around 560 px for single-column forms), inside a [dialog](dialog), [modal](modal) or [sheet](sheet) body, or in the main column of `split-2`. On phones the form is full width with the 20 px page gutter.',
  anatomy: [
    ['form.form', 'Required. The `<form>` element. A flex column with 20 px between children.'],
    ['.field', 'Required for each input: `.field__label` + `.control` (or another input component) + optional `.field__help`. See [text field](text-field).'],
    ['.form__row', 'Optional. Grid of equal columns, each at least 200 px; drops to one column when there is no room. 16 px gap.'],
    ['fieldset', 'Optional. Groups related fields with a `<legend>`; the system resets its border and padding.'],
    ['.form__actions', 'Required when the form submits. Buttons aligned to the end with 10 px between; below 560 px they stack, full width, primary on top.'],
  ],
  examples: [
    {
      title: 'Profile form',
      desc: 'Pairs share a row on wide screens and stack on phones. The cancel button comes first in the source so the primary is last on the row and on top when the actions stack.',
      stage: 'block',
      html: `<form class="form" style="max-width: 560px;" onsubmit="event.preventDefault()">
  <div class="form__row">
    ${field('pf-first', 'First name', 'text', 'Rina', '')}
    ${field('pf-last', 'Last name', 'text', 'Kusuma', '')}
  </div>
  ${field('pf-email', 'Email', 'email', 'rina.kusuma@example.com', 'Application receipts and payment slips go here.')}
  ${field('pf-phone', 'Mobile number', 'tel', '', 'Only for service appointment reminders.', ' <span>Optional</span>')}
  <div class="form__actions">
    <button type="button" class="btn btn--secondary">Cancel</button>
    <button type="submit" class="btn btn--primary">Save profile</button>
  </div>
</form>`,
    },
    {
      title: 'Grouped with a fieldset',
      desc: 'A fieldset with a legend names a group of related choices; the form keeps the same rhythm around it.',
      stage: 'block',
      html: `<form class="form" style="max-width: 560px;" onsubmit="event.preventDefault()">
  ${field('ex-name', 'Activity name', 'text', 'Child immunization, Puskesmas Kedaton', '')}
  <div class="form__row">
    ${field('ex-date', 'Date', 'date', '2026-12-04', '')}
    ${field('ex-time', 'Start time', 'time', '09:00', '')}
  </div>
  <fieldset class="stack" style="--gap: 12px; border: 0;">
    <legend class="field__label" style="margin-bottom: 12px;">Remind residents</legend>
    <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">One week before</span></label>
    <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">The evening before</span></label>
  </fieldset>
  <div class="form__actions">
    <button type="button" class="btn btn--plain">Save as draft</button>
    <button type="submit" class="btn btn--primary">Schedule activity</button>
  </div>
</form>`,
    },
    {
      title: 'Error after submit',
      desc: 'The helper line becomes the error in place, so nothing below it moves. Focus moves to the first invalid field.',
      stage: 'block',
      html: `<form class="form" style="max-width: 400px;" onsubmit="event.preventDefault(); const c = this.querySelector('.control'); c.classList.add('is-invalid'); const i = c.querySelector('input'); i.setAttribute('aria-invalid', 'true'); const h = this.querySelector('.field__help'); h.classList.add('field__help--error'); h.innerHTML = '<span class=&quot;ic&quot; aria-hidden=&quot;true&quot;>error</span>Enter the 16 digit NIK shown on your KTP.'; i.focus();">
  <div class="field">
    <label class="field__label" for="sn">NIK</label>
    <div class="control"><input id="sn" inputmode="numeric" value="18710" aria-describedby="sn-help"></div>
    <span class="field__help" id="sn-help">It is printed at the top of your KTP.</span>
  </div>
  <div class="form__actions">
    <button type="submit" class="btn btn--primary">Link my account</button>
  </div>
</form>`,
      code: `<form class="form">
  <div class="field">
    <label class="field__label" for="sn">NIK</label>
    <div class="control is-invalid"><input id="sn" inputmode="numeric" aria-invalid="true" aria-describedby="sn-help"></div>
    <span class="field__help field__help--error" id="sn-help"><span class="ic" aria-hidden="true">error</span>Enter the 16 digit NIK shown on your KTP.</span>
  </div>
  <div class="form__actions">
    <button type="submit" class="btn btn--primary">Link my account</button>
  </div>
</form>`,
    },
  ],
  states: [
    ['error', 'Per field: `.control.is-invalid` + `aria-invalid="true"` + `.field__help--error` with an `error` icon. Validate after the first blur, then live.'],
    ['submitting', 'The primary button gets `.is-loading` and `aria-busy="true"` (`setLoading(btn, true)`); the fields stay editable.'],
    ['many errors', 'Put an [alert](alert) above the form that lists them with links to each field, then focus the alert.'],
  ],
  motion: [
    'The form itself never animates. Fields that appear on a choice (an "Other" text box) open with [height expand](height-expand) on `--spring-smooth` over `--d-smooth`.',
    'Errors change color in `--d-fast` on `--ease-standard`; the helper line keeps its height so nothing jumps. A refused submit may [shake](shake) the first invalid field once.',
    'Under reduced motion the expand becomes a 120 ms cross-fade.',
  ],
  a11y: [
    'Use a real `<form>` so Enter submits and the browser can autofill; the submit button is `type="submit"`, the others `type="button"`.',
    'Every input has a `<label for>`; helper and error text are linked with `aria-describedby`.',
    'Groups of checkboxes or radios go in a `<fieldset>` with a `<legend>`.',
    'Source order is visual order: cancel before submit in the markup. On phones `column-reverse` shows the primary on top while Tab still reaches Cancel first, which matches reading the buttons from the end of the form.',
    'On a failed submit move focus to the first invalid field or to the summary [alert](alert).',
  ],
  do: [
    'Cap single-column forms near 560 px; long inputs across a wide screen are hard to scan.',
    'Pair only short, related fields in a `form__row`; keep one idea per row.',
    'Name the primary for its outcome ("Save profile", "Schedule activity").',
  ],
  dont: [
    'Lay out fields with `auto-grid` or hand-written flex; error lines and labels stop lining up.',
    'Put three or more unrelated fields in one row to save space.',
    'Add a second primary to `form__actions`, or put the actions above the fields.',
  ],
  js: 'None needed for layout. `setLoading(button, true)` for the submitting state; `shake(el)` for a refused submit.',
  related: ['text-field', 'layout-primitives', 'button', 'alert'],
};
