# Button

Group: Actions. https://lampung.kartadinata.app/docs/en/components/button

The control people press to make something happen: save, send, start, delete. One primary per view; the label names the outcome.

## Use it when
- An action happens on this page or in this form: submit, save, start a task, open a dialog.
- You need a loading state that keeps the width while the action runs (`.is-loading` with `btn__label` and `btn__spin`).

## Use something else when
- Going to another page with no side effect: use [Link](link.md). A link is announced as navigation and opens in a new tab on middle click.
- The control only shows an icon: use [Icon button](icon-button.md).
- Turning a setting on or off that applies at once: use [Switch](switch.md).
- Picking one view of the same content: use [Segmented control](segmented-control.md).
- A costly but not dangerous confirm (submit an application, send payment): use [Hold to confirm](hold-to-confirm.md).

## Where it goes
At the end of the thing it acts on: under a form (`form__actions`), at the bottom of a dialog (`dialog__actions`), in a card footer, or in a sticky bar on phones. The primary sits on the right on wide screens and on top (full width) on phones.

## Anatomy
| Part | What it is |
|---|---|
| `.btn` | Required. The `<button>` (or `<a>` styled as one when it navigates). 44 px tall by default. |
| `.btn--primary|secondary|…` | Required. One variant class; it sets color and finish. |
| `.ic` | Optional leading icon, 19 px, before the label. |
| `.btn__label` | Wraps the text when the button can load, so the text can blur out without changing width. |
| `.btn__spin` | The spinner shown while `.is-loading` is on. Holds a `.spinner` with eight `<i>`. |

## Markup

**Variants.** Primary once per view; secondary for the alternative; tinted for a quiet positive; plain for inline and tertiary actions; danger only inside a confirm.
```html
<div class="docs-row">
  <button class="btn btn--primary">Save changes</button>
  <button class="btn btn--secondary">Preview</button>
  <button class="btn btn--tinted">Add a note</button>
  <button class="btn btn--gray">Duplicate</button>
  <button class="btn btn--plain">Skip for now</button>
  <button class="btn btn--danger-tinted">Remove member</button>
</div>
```

**Sizes and icons.** 52 for the one big call to action on a landing page, 44 by default, 36 in toolbars and dense rows, 28 inside rows and chips. Small sizes keep a 44 px hit area through the space around them.
```html
<div class="docs-row">
  <button class="btn btn--primary btn--lg"><span class="ic" aria-hidden="true">play_arrow</span>Start application</button>
  <button class="btn btn--secondary"><span class="ic" aria-hidden="true">add</span>Add service</button>
  <button class="btn btn--secondary btn--md"><span class="ic" aria-hidden="true">download</span>Export</button>
  <button class="btn btn--plain btn--sm">Edit</button>
</div>
```

**Loading without a jump.** The label blurs out, the spinner scales in, the width stays. Press it.
```html
<button class="btn btn--primary is-loading" aria-busy="true">
  <span class="btn__label">Submit application</span>
  <span class="btn__spin" aria-hidden="true"><span class="spinner"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></span>
</button>
```

**Disabled.** Prefer an enabled button that explains what is missing when pressed. Disable only when the reason is visible next to it.
```html
<div class="docs-col" style="max-width: 360px;">
  <button class="btn btn--primary" disabled>Send report</button>
  <span class="field__help">Choose the kind of problem to send the report.</span>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `btn--primary` | The main action of the view. Exactly one. |
| `btn--secondary` | The alternative next to the primary (Cancel, Preview, Back). |
| `btn--tinted` | A quiet positive action that should not compete with the primary. |
| `btn--gray` | Neutral utility actions in toolbars. |
| `btn--plain` | Inline and tertiary actions; text only, accent color. |
| `btn--danger` | The confirm button inside a destructive [alert dialog](alert-dialog.md) only. |
| `btn--danger-tinted` | A destructive action that still asks for confirmation afterwards. |
| `btn--lg / btn--md / btn--sm` | 52 / 36 / 28 px. Default is 44. |
| `btn--block` | Full width; the default for the primary in phone layouts and sheets. |

## States
| State | How |
|---|---|
| `hover` | Automatic; only on devices that can hover. |
| `:active` | Sinks to 97 % in 90 ms and springs back on release. |
| `.is-loading + aria-busy` | Label out, spinner in, width kept; clicks ignored. `setLoading(btn, true)` in plain HTML. |
| `disabled / aria-disabled` | 38 % opacity, no finish, not clickable. |
| `.is-done` | The label rises in once after a success (pair with a toast or a text morph). |

## Motion and microinteractions
- Press: `transform: scale(0.97)` on `:active` in 90 ms, back on `--spring-snappy`. Feedback starts on pointer down, not on release.
- Loading: the label leaves with a 4 px blur in `--d-fast`; the spinner scales from 0.6 on `--spring-snappy`. Both are transitions, so turning loading off mid-way reverses smoothly.
- Below 560 px a long label wraps onto two lines instead of pushing the layout sideways (`--sm` stays on one line).
- For "Saved" after "Save", change the text with [text morph](text-morph.md) instead of swapping the button.

## Accessibility
- Use `<button type="button">` for actions and `<button type="submit">` in forms; use `<a href>` only to navigate.
- Icon-only buttons are [icon buttons](icon-button.md) with an `aria-label`.
- While loading set `aria-busy="true"`; announce the result with a [toast](toast.md) or inline text.
- The focus ring comes from the system (`:focus-visible`); never remove it.

## Do
- Name the outcome: "Save changes", "Send report", "Start application".
- Keep one primary per view; demote the rest to secondary, tinted or plain.
- Make the primary full width in phone layouts (`btn--block`).

## Don't
- Write "Submit", "OK", "Click here" or "Continue" when a specific verb exists.
- Restyle a button with a custom class (rounded pill, gradient, shadow). Pick a variant.
- Use `btn--danger` outside a confirm, or two primaries side by side.

## Behavior (plain HTML)
Optional. `setLoading(button, true|false)` toggles the loading state and `aria-busy`.

## React
```tsx
import { ButtonContent } from 'lampung-design-system/react';

<button className={`btn btn--primary${saving ? ' is-loading' : ''}`} aria-busy={saving} onClick={save}>
  <ButtonContent loading={saving}>Save changes</ButtonContent>
</button>
```

## Related
[Icon button](icon-button.md) · [Link](link.md) · [Hold to confirm](hold-to-confirm.md) · [Text morph](text-morph.md)
