# Alert dialog

Group: Overlays. Docs page: `docs/components/alert-dialog.html`.

A dialog that confirms a destructive or irreversible action. The title names the object and the consequence; the safe button gets focus; the destructive button is the only place `btn--danger` belongs.

## Use it when
- Before something that cannot be undone: delete a course, remove a member, discard a graded exam.
- When an Undo toast is not possible because the action has effects outside the app (emails sent, payments made, data erased for everyone).

## Use something else when
- The action can be undone: use [Toast](toast.md). Do it at once and offer Undo in the toast; it is faster and respects people.
- A costly but not dangerous confirm (submit an exam, pay): use [Hold to confirm](hold-to-confirm.md).
- A small destructive action inside a row: use [Confirm in place](confirm-in-place.md). The control walks from rest to ask to done in place.
- A non-destructive question or short input: use [Dialog](dialog.md).
- A page-level confirm over the whole window: use [Modal](modal.md). Use `dialog.modal` with the same icon, title and danger button.

## Where it goes
Centered above a scrim in its positioned container, like a [dialog](dialog.md). It appears directly after the person presses the destructive control, never on page load.

## Anatomy
| Part | What it is |
|---|---|
| `.dialog[role=alertdialog][aria-modal=true]` | Required. The layer with `data-lds-layer`, `aria-labelledby` the title and `aria-describedby` the body. |
| `.dialog__icon` | The 44 px danger-tinted tile with a filled icon (`delete`, `warning`). |
| `.dialog__title` | Required. "Delete Database Systems?": the verb and the object. |
| `.dialog__body` | Required. What will be lost, for whom, and that it cannot be undone. |
| `.dialog__actions` | Required. The safe button first (`btn--secondary`, `data-lds-autofocus`), then `btn--danger` named with the verb. |
| `.scrim[data-lds-scrim]` | Required. Clicking it cancels. |

## Markup

**Delete a course.** Focus lands on "Keep course", so a stray Enter is safe. Escape, the scrim and "Keep course" all cancel.
```html
<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--danger-tinted btn--md" data-lds-open="ad-delete" aria-haspopup="dialog"><span class="ic" aria-hidden="true">delete</span>Delete course</button>
  </div>
  <div class="scrim" data-lds-scrim="ad-delete"></div>
  <div class="dialog" id="ad-delete" role="alertdialog" aria-modal="true" aria-labelledby="ad-delete-t" aria-describedby="ad-delete-b" data-lds-layer>
    <div class="dialog__icon"><span class="ic ic--fill" aria-hidden="true">delete</span></div>
    <h3 class="dialog__title" id="ad-delete-t">Delete Database Systems?</h3>
    <p class="dialog__body" id="ad-delete-b">Its assignments and submissions are removed for every student. This cannot be undone.</p>
    <div class="dialog__actions"><button class="btn btn--secondary btn--md" data-lds-close data-lds-autofocus>Keep course</button><button class="btn btn--danger btn--md" data-lds-close>Delete</button></div>
  </div>
</div>
```

**Remove a member.** A warning icon when the action is reversible by someone else but not by this person.
```html
<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--danger-tinted btn--md" data-lds-open="ad-remove" aria-haspopup="dialog">Remove from class</button>
  </div>
  <div class="scrim" data-lds-scrim="ad-remove"></div>
  <div class="dialog" id="ad-remove" role="alertdialog" aria-modal="true" aria-labelledby="ad-remove-t" aria-describedby="ad-remove-b" data-lds-layer>
    <div class="dialog__icon"><span class="ic ic--fill" aria-hidden="true">warning</span></div>
    <h3 class="dialog__title" id="ad-remove-t">Remove Rina Wijaya from the class?</h3>
    <p class="dialog__body" id="ad-remove-b">She loses access to materials and her grades are archived. Only an administrator can add her back.</p>
    <div class="dialog__actions"><button class="btn btn--secondary btn--md" data-lds-close data-lds-autofocus>Cancel</button><button class="btn btn--danger btn--md" data-lds-close>Remove</button></div>
  </div>
</div>
```

## States
| State | How |
|---|---|
| `.is-open` | Shown with its scrim; focus on the safe button. |
| `danger button loading` | If the delete takes time, put the danger button in `.is-loading` and keep the dialog open until it is done, then confirm with a [toast](toast.md). |

## Motion and microinteractions
- Same as [dialog](dialog.md): enter on `--spring-smooth` from `translateY(4px) scale(0.98)` with opacity over `--d-fast`; exit over `--d-exit` (180 ms) on `--ease-exit`.
- No shake, pulse or red flash: the words carry the weight. Reduced motion: opacity only.

## Accessibility
- `role="alertdialog"` so screen readers announce it at once, with `aria-labelledby` the title and `aria-describedby` the body.
- Focus goes to the safe button (`data-lds-autofocus`); Tab is trapped; Escape cancels; focus returns to the destructive trigger.
- The danger button repeats the verb from the title ("Delete", "Remove"), never "OK" or "Yes".

## Do
- Name the object in the title and the consequence in the body.
- Make the safe choice the default focus.
- Prefer doing the action with an Undo [toast](toast.md) whenever undo is possible.

## Don't
- Use an alert dialog for "Are you sure you want to save?".
- Put `btn--danger` anywhere else in the product.
- Ask people to type the name to confirm unless the loss is catastrophic and rare.

## Behavior (plain HTML)
Same hooks as [dialog](dialog.md): `data-lds-open`, `data-lds-close`, `data-lds-scrim`, `data-lds-layer`, `data-lds-autofocus`; `openLayer` / `closeLayer`; events `lds:open` / `lds:close`. Run the destructive action from the danger button's click handler.

## Related
[Dialog](dialog.md) · [Modal](modal.md) · [Toast](toast.md) · [Confirm in place](confirm-in-place.md)
