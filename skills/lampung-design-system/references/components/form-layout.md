# Form layout

Group: Foundations. Docs page: `docs/components/form-layout.html`.

The frame every form uses: `form` stacks fields 20 px apart, `form__row` puts short fields side by side when there is room, and `form__actions` ends the form with its buttons. Fields inside are always `.field`.

## Use it when
- Any form with more than one field: sign up, profile, checkout, a course settings page, the body of a dialog or sheet.
- Two or three short fields belong together on one line on wide screens (first and last name, city and postal code, start and end date) and must stack on phones.
- A form needs its buttons at the end, primary on the right on wide screens and full width on top on phones.

## Use something else when
- Placing anything that is not a form (cards, badges, toolbars): use [Layout primitives](layout-primitives.md).
- The single field itself: label, control, helper and error: use [Text field](text-field.md).
- One search box above a list: use [Search field](search-field.md). A search field is not a form; it filters as you type and has no submit row.
- A setting that applies the moment it changes: use [Switch](switch.md). Settings lists save per row; they do not get a form__actions row.
- Long values read back as label and value, not edited: use [Key-value](key-value.md).

## Where it goes
Inside the page content column (cap it with `measure` or a max width around 560 px for single-column forms), inside a [dialog](dialog.md), [modal](modal.md) or [sheet](sheet.md) body, or in the main column of `split-2`. On phones the form is full width with the 20 px page gutter.

## Anatomy
| Part | What it is |
|---|---|
| `form.form` | Required. The `<form>` element. A flex column with 20 px between children. |
| `.field` | Required for each input: `.field__label` + `.control` (or another input component) + optional `.field__help`. See [text field](text-field.md). |
| `.form__row` | Optional. Grid of equal columns, each at least 200 px; drops to one column when there is no room. 16 px gap. |
| `fieldset` | Optional. Groups related fields with a `<legend>`; the system resets its border and padding. |
| `.form__actions` | Required when the form submits. Buttons aligned to the end with 10 px between; below 560 px they stack, full width, primary on top. |

## Markup

**Profile form.** Pairs share a row on wide screens and stack on phones. The cancel button comes first in the source so the primary is last on the row and on top when the actions stack.
```html
<form class="form" style="max-width: 560px;" onsubmit="event.preventDefault()">
  <div class="form__row">
    <div class="field">
      <label class="field__label" for="pf-first">First name</label>
      <div class="control"><input id="pf-first" type="text" value="Rina"></div>
    </div>
    <div class="field">
      <label class="field__label" for="pf-last">Last name</label>
      <div class="control"><input id="pf-last" type="text" value="Kusuma"></div>
    </div>
  </div>
  <div class="field">
      <label class="field__label" for="pf-email">Email</label>
      <div class="control"><input id="pf-email" type="email" value="rina.kusuma@example.com" aria-describedby="pf-email-help"></div>
      <span class="field__help" id="pf-email-help">Grades and receipts go here.</span>
    </div>
  <div class="field">
      <label class="field__label" for="pf-phone">Phone <span>Optional</span></label>
      <div class="control"><input id="pf-phone" type="tel" value="" aria-describedby="pf-phone-help"></div>
      <span class="field__help" id="pf-phone-help">Only for exam day reminders.</span>
    </div>
  <div class="form__actions">
    <button type="button" class="btn btn--secondary">Cancel</button>
    <button type="submit" class="btn btn--primary">Save profile</button>
  </div>
</form>
```

**Grouped with a fieldset.** A fieldset with a legend names a group of related choices; the form keeps the same rhythm around it.
```html
<form class="form" style="max-width: 560px;" onsubmit="event.preventDefault()">
  <div class="field">
      <label class="field__label" for="ex-name">Exam name</label>
      <div class="control"><input id="ex-name" type="text" value="Midterm, Database Systems"></div>
    </div>
  <div class="form__row">
    <div class="field">
      <label class="field__label" for="ex-date">Date</label>
      <div class="control"><input id="ex-date" type="date" value="2026-12-04"></div>
    </div>
    <div class="field">
      <label class="field__label" for="ex-time">Start time</label>
      <div class="control"><input id="ex-time" type="time" value="09:00"></div>
    </div>
  </div>
  <fieldset class="stack" style="--gap: 12px; border: 0;">
    <legend class="field__label" style="margin-bottom: 12px;">Notify students</legend>
    <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">One week before</span></label>
    <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">The evening before</span></label>
  </fieldset>
  <div class="form__actions">
    <button type="button" class="btn btn--plain">Save as draft</button>
    <button type="submit" class="btn btn--primary">Schedule exam</button>
  </div>
</form>
```

**Error after submit.** The helper line becomes the error in place, so nothing below it moves. Focus moves to the first invalid field.
```html
<form class="form">
  <div class="field">
    <label class="field__label" for="sn">Student number</label>
    <div class="control is-invalid"><input id="sn" inputmode="numeric" aria-invalid="true" aria-describedby="sn-help"></div>
    <span class="field__help field__help--error" id="sn-help"><span class="ic" aria-hidden="true">error</span>Enter the 10 digit student number on your card.</span>
  </div>
  <div class="form__actions">
    <button type="submit" class="btn btn--primary">Link my account</button>
  </div>
</form>
```

## States
| State | How |
|---|---|
| `error` | Per field: `.control.is-invalid` + `aria-invalid="true"` + `.field__help--error` with an `error` icon. Validate after the first blur, then live. |
| `submitting` | The primary button gets `.is-loading` and `aria-busy="true"` (`setLoading(btn, true)`); the fields stay editable. |
| `many errors` | Put an [alert](alert.md) above the form that lists them with links to each field, then focus the alert. |

## Motion and microinteractions
- The form itself never animates. Fields that appear on a choice (an "Other" text box) open with [height expand](height-expand.md) on `--spring-smooth` over `--d-smooth`.
- Errors change color in `--d-fast` on `--ease-standard`; the helper line keeps its height so nothing jumps. A refused submit may [shake](shake.md) the first invalid field once.
- Under reduced motion the expand becomes a 120 ms cross-fade.

## Accessibility
- Use a real `<form>` so Enter submits and the browser can autofill; the submit button is `type="submit"`, the others `type="button"`.
- Every input has a `<label for>`; helper and error text are linked with `aria-describedby`.
- Groups of checkboxes or radios go in a `<fieldset>` with a `<legend>`.
- Source order is visual order: cancel before submit in the markup. On phones `column-reverse` shows the primary on top while Tab still reaches Cancel first, which matches reading the buttons from the end of the form.
- On a failed submit move focus to the first invalid field or to the summary [alert](alert.md).

## Do
- Cap single-column forms near 560 px; long inputs across a wide screen are hard to scan.
- Pair only short, related fields in a `form__row`; keep one idea per row.
- Name the primary for its outcome ("Save profile", "Schedule exam").

## Don't
- Lay out fields with `auto-grid` or hand-written flex; error lines and labels stop lining up.
- Put three or more unrelated fields in one row to save space.
- Add a second primary to `form__actions`, or put the actions above the fields.

## Behavior (plain HTML)
None needed for layout. `setLoading(button, true)` for the submitting state; `shake(el)` for a refused submit.

## Related
[Text field](text-field.md) · [Layout primitives](layout-primitives.md) · [Button](button.md) · [Alert](alert.md)
