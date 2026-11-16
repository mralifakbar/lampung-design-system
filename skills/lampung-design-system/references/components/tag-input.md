# Tag input

Group: Inputs. Docs page: `docs/components/tag-input.html`.

A field that turns typed text into removable tags: Enter or comma adds one, Backspace on an empty field removes the last. For several short free values.

## Use it when
- People enter several short values that are not from a fixed list: topics of interest, keywords for a question, emails to invite.
- The values are made up by the person, so a list of options cannot cover them.

## Use something else when
- Several choices from a short fixed set (days, subjects): use [Chips](chips.md). All options visible, toggle with one tap.
- Several choices from a long fixed list: use [Checkbox](checkbox.md). In a scrolling list or [sheet](sheet.md); the system has no multi-select combobox.
- One value from a long list: use [Combobox](combobox.md).
- One line of text: use [Text field](text-field.md).
- Showing tags or statuses that people do not edit: use [Badge](badge.md).

## Where it goes
In a [form](form-layout.md), full width of its column, with a helper that states the limit. The control grows taller as tags wrap onto new lines.

## Anatomy
| Part | What it is |
|---|---|
| `.control.tags` | Required. The field box, wraps its content and grows from 44 px. |
| `.tag` | One value, 28 px, recessed fill, with its text and a remove button. |
| `.tag > button` | Required per tag. 22 px remove button with a `close` icon and `aria-label="Remove …"`. |
| `input` | Required. At least 120 px, takes the rest of the line. Named by the label. |

## Markup

**Topics.** Type a topic and press Enter or comma. Backspace in the empty field removes the last tag.
```html
<div class="field">
  <label class="field__label" for="topics">Topics to practise</label>
  <div class="control tags">
    <span class="tag">Number series<button type="button" aria-label="Remove Number series"><span class="ic" aria-hidden="true">close</span></button></span>
    <span class="tag">Pancasila<button type="button" aria-label="Remove Pancasila"><span class="ic" aria-hidden="true">close</span></button></span>
    <input id="topics" placeholder="Add a topic" aria-describedby="topics-help">
  </div>
  <span class="field__help" id="topics-help">Up to 8 topics. Press Enter after each one.</span>
</div>
<!-- Your code: Enter or comma adds a .tag before the input; Backspace on an empty input removes the last; each tag's button removes it. -->
```

**Invite by email, with a rejected value.** Validate each value as it becomes a tag; keep the bad text in the input and explain.
```html
<div class="field" style="max-width: 520px; width: 100%;">
  <label class="field__label" for="ti-mail">Invite classmates</label>
  <div class="control tags is-invalid"><span class="tag">rani@campus.ac.id<button type="button" aria-label="Remove rani@campus.ac.id" onclick="this.parentElement.remove()"><span class="ic" aria-hidden="true">close</span></button></span><span class="tag">dimas@campus.ac.id<button type="button" aria-label="Remove dimas@campus.ac.id" onclick="this.parentElement.remove()"><span class="ic" aria-hidden="true">close</span></button></span><input id="ti-mail" type="email" value="budi@campus" aria-invalid="true" aria-describedby="ti-mail-help"></div>
  <span class="field__help field__help--error" id="ti-mail-help"><span class="ic" aria-hidden="true">error</span>budi@campus is missing a domain, like budi@campus.ac.id.</span>
</div>
```

## States
| State | How |
|---|---|
| `focus` | Accent edge and halo on the whole box (`:focus-within`), as any `.control`. |
| `.is-invalid` | Danger edge when the typed value is rejected; the text stays in the input. |
| `at the limit` | Disable the input and say so in the helper ("8 of 8 topics"). |
| `tag hover` | The remove button tints on hover. |

## Motion and microinteractions
- A new tag pops in with `lds-pop-in` (scale 0.6 to 1 with fade) on `--spring-snappy` (360 ms); the input slides along as the line reflows.
- Removing is immediate, with no exit animation, so Backspace can clear several tags quickly.
- Reduced motion: the pop becomes a 1 ms appearance.

## Accessibility
- The input is labelled by the field label; the helper says how to add (Enter) and the limit.
- Each remove button is a `<button type="button">` named "Remove Number series". After removing, move focus back to the input.
- Announce adds and removes in an `aria-live="polite"` region if the list is long ("Pancasila added, 3 topics").
- Enter must not submit the form while the input has text; prevent it only in that case.

## Do
- Accept Enter, comma and paste of a comma-separated list.
- Trim spaces and ignore duplicates, saying so in the helper.

## Don't
- Use tags for a fixed set of options; that is [chips](chips.md).
- Put pressed or colored states on tags; they are values, not filters.

## Behavior (plain HTML)
None in the system. Add a `.tag` before the input on Enter or comma, remove the last on Backspace in an empty input, and wire each remove button, in your own code.

## Related
[Chips](chips.md) · [Combobox](combobox.md) · [Text field](text-field.md) · [Badge](badge.md)
