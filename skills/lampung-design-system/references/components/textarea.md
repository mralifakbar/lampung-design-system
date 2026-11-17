# Textarea

Group: Inputs. Docs page: `docs/components/textarea.html`.

A field for a few sentences: the same `.control` box, taller, with an optional character counter. Say the limit before people reach it.

## Use it when
- People write more than one line: a note to the officer, a reason for an application, a report of a mistake in a person's data.
- A field has a character limit and people need to see how much room is left (`.counter`).

## Use something else when
- One short line (a name, a title, an email): use [Text field](text-field.md).
- Writing a chat message that sends on Enter: use [Composer](composer.md).
- Long formatted content (an article, a service guide): use [Prose](prose.md). Use a real editor; the textarea is plain text only.
- Editing a short value in place inside a list or table: use [Inline edit](inline-edit.md).
- Several short items like topics or emails: use [Tag input](tag-input.md).

## Where it goes
In a [form](form-layout.md), usually last before the actions, full width of the form column. In a [dialog](dialog.md) or [modal](modal.md) for "report a mistake" style flows.

## Anatomy
| Part | What it is |
|---|---|
| `.field / .field__label / .field__help` | Required. Same wrapper as a [text field](text-field.md). |
| `.control.control--area` | Required. The box grows to its content height, padded 12 by 14. |
| `textarea` | Required. At least 88 px tall (about 3 lines), 22 px line height, not resizable by drag. Set `rows` for a taller start. |
| `.counter` | Optional. Tabular "120 / 280" inside the label span, right-aligned by the label. |

## Markup

**With a counter.** The counter lives in the label row, so it never moves the helper. With `maxlength` the browser stops input at the limit, so the counter never needs an over-limit state.
```html
<div class="field">
  <label class="field__label" for="note">Note to the officer <span class="counter" id="note-count">0 / 280</span></label>
  <div class="control control--area">
    <textarea id="note" maxlength="280" aria-describedby="note-help note-count"></textarea>
  </div>
  <span class="field__help" id="note-help">The officer reads this before processing your application.</span>
</div>
<!-- Update #note-count on input in your own code. -->
```

**Required reason with an error.** A report needs a reason; the helper explains what kind of detail helps.
```html
<div class="field" style="max-width: 520px;">
  <label class="field__label" for="ta-why">What is wrong with this data?</label>
  <div class="control control--area is-invalid"><textarea id="ta-why" rows="4" aria-invalid="true" aria-describedby="ta-why-help"></textarea></div>
  <span class="field__help field__help--error" id="ta-why-help"><span class="ic" aria-hidden="true">error</span>Describe the mistake, for example which part is wrong and what it should say.</span>
</div>
```

## States
| State | How |
|---|---|
| `focus / hover` | As the [text field](text-field.md): accent edge and halo on `:focus-within`. |
| `.is-invalid + aria-invalid` | Danger edge and halo; message in `.field__help--error`. |
| `.is-disabled + disabled` | Fill background and muted text. |

## Motion and microinteractions
- Border and halo transition in `--d-fast` (160 ms) on `--ease-standard`, like every `.control`.
- The counter changes number in place; it does not animate.
- Reduced motion: transitions become 120 ms linear.

## Accessibility
- A `<label for>` names it; the helper and the counter are both in `aria-describedby` so the limit is announced.
- Prefer `maxlength` (the browser stops input) and say the limit up front; if you allow going over and block on submit, mark `aria-invalid` and say how many characters to remove.
- Enter makes a new line. Never submit a textarea on Enter; that is the [composer](composer.md) pattern.
- Text renders at 16 px on touch screens, so iOS does not zoom on focus.

## Do
- Start it at the height of the expected answer (`rows="4"` for a paragraph).
- Show the counter only when there is a limit worth knowing.

## Don't
- Allow the native drag handle or set a fixed tiny height; the box is sized by rows.
- Use a textarea for a single value people expect to fit on one line.

## Behavior (plain HTML)
None. Update the `.counter` text on `input` in your own code.

## Related
[Text field](text-field.md) · [Composer](composer.md) · [Form layout](form-layout.md) · [Inline edit](inline-edit.md)
