# Dialog

Group: Overlays. Docs page: `docs/components/dialog.html`.

A small centered layer that interrupts to ask for one short input or decision, then gets out of the way. Use rarely: most tasks belong on the page, in a sheet or in a drawer.

## Use it when
- One short input that must happen before going on: rename a service, set a pickup date, name a new folder.
- A short decision with two clear outcomes that is not destructive.
- Inside a contained region that is already positioned (`.viewport`), such as a canvas, a preview or a phone frame.

## Use something else when
- Confirming something destructive or irreversible (delete, remove, discard): use [Alert dialog](alert-dialog.md).
- A page-level form or report over the whole window, or a dialog that must sit above everything: use [Modal](modal.md). Native `<dialog>` in the top layer; turns into a bottom sheet on phones.
- A task on a phone that keeps the page in view (choose, filter, check in): use [Sheet](sheet.md).
- Filters or details beside a list on wide screens: use [Drawer](drawer.md).
- Telling people something happened: use [Toast](toast.md).
- A few extra fields or options anchored to a button: use [Popover](popover.md).

## Where it goes
Centered in its positioned container (`.viewport`, or a `position: fixed; inset: 0` wrapper for the page), 340 px wide, above a scrim. On phones prefer a [sheet](sheet.md); for the whole page prefer a [modal](modal.md).

## Anatomy
| Part | What it is |
|---|---|
| `.scrim[data-lds-scrim="id"]` | Required. The dim layer behind; a click on it closes the dialog. |
| `.dialog[role=dialog][aria-modal=true]` | Required. The layer, with an `id`, `data-lds-layer` and `aria-labelledby` its title. |
| `.dialog__close` | Optional close [icon button](icon-button.md) in the top right, with `data-lds-close`. |
| `.dialog__title` | Required. The question or task, as an `<h2>` or `<h3>`. |
| `.dialog__body` | One or two sentences of context. |
| `.dialog__actions` | Required. Two buttons sharing the width: secondary (dismiss) then primary. |
| `[data-lds-open="id"]` | Required. The trigger, with `aria-haspopup="dialog"`. |

## Markup

**Rename a service.** Open it: focus lands in the field, Tab stays inside, Escape or the scrim closes it and focus returns to the button.
```html
<button class="btn btn--secondary" data-lds-open="rename" aria-haspopup="dialog">Rename service</button>

<div class="scrim" data-lds-scrim="rename"></div>
<div class="dialog" id="rename" role="dialog" aria-modal="true" aria-labelledby="rename-t" data-lds-layer>
  <button class="icon-btn dialog__close" aria-label="Close" data-lds-close><span class="ic" aria-hidden="true">close</span></button>
  <h2 class="dialog__title" id="rename-t">Rename service</h2>
  <p class="dialog__body">Residents see the new name the next time they open the app.</p>
  <div class="control" style="margin-top: 16px;"><input aria-label="Service name" value="Micro business permit" data-lds-autofocus></div>
  <div class="dialog__actions">
    <button class="btn btn--secondary" data-lds-close>Cancel</button>
    <button class="btn btn--primary" data-lds-close>Save name</button>
  </div>
</div>
```

**A short choice.** No field, two outcomes. The first focusable element (the close button, if present) takes focus when nothing is marked with `data-lds-autofocus`.
```html
<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--secondary btn--md" data-lds-open="dlg-publish" aria-haspopup="dialog">Announce results</button>
  </div>
  <div class="scrim" data-lds-scrim="dlg-publish"></div>
  <div class="dialog" id="dlg-publish" role="dialog" aria-modal="true" aria-labelledby="dlg-publish-t" aria-describedby="dlg-publish-b" data-lds-layer>
    <h3 class="dialog__title" id="dlg-publish-t">Announce selection results now?</h3>
    <p class="dialog__body" id="dlg-publish-b">32 applicants get a notification with their result. You can still change results afterwards.</p>
    <div class="dialog__actions"><button class="btn btn--secondary btn--md" data-lds-close>Not yet</button><button class="btn btn--primary btn--md" data-lds-close data-lds-autofocus>Announce</button></div>
  </div>
</div>
```

## States
| State | How |
|---|---|
| `.is-open` | Visible and interactive; the scrim with the same id gets `.is-open` too. Set by `openLayer`. |
| `closed` | `aria-hidden="true"` and `inert`, invisible after the exit finishes. |

## Motion and microinteractions
- Enter: opacity over `--d-fast` (160 ms) on `--ease-enter`; transform from `translateY(4px) scale(0.98)` to none on `--spring-smooth` (560 ms). Add `.is-entering` first for a deeper start (`translateY(8px) scale(0.96)`).
- Exit: shorter and quieter, opacity and transform over `--d-exit` (180 ms) on `--ease-exit`, then `visibility: hidden`. Both are transitions, so closing mid-entrance reverses from where it is.
- Scrim: fades in over `--d-standard` (240 ms), out over `--d-exit`.
- Reduced motion: no transform at all, opacity only in 120 ms.

## Accessibility
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` the title (and `aria-describedby` the body when it carries the point).
- On open, focus moves to `[data-lds-autofocus]` (or `[autofocus]`), else to the first focusable element. Tab and Shift+Tab are trapped inside while `aria-modal="true"`.
- Escape closes the top layer only; the scrim and every `[data-lds-close]` close it too. Focus returns to the element that opened it.
- The trigger carries `aria-haspopup="dialog"`.

## Do
- Ask one thing; title it as the question or the task.
- Name the primary button for its outcome ("Save name", "Announce").
- Autofocus the field, or the primary for a non-destructive choice.

## Don't
- Open a dialog from a dialog; finish or close the first one.
- Put long forms, tables or scrolling content in it; use a [modal](modal.md), [sheet](sheet.md) or a page.
- Use it to confirm a delete; that is an [alert dialog](alert-dialog.md).

## Behavior (plain HTML)
`[data-lds-open="id"]` calls `openLayer(id, trigger)`; `[data-lds-close]` inside and `[data-lds-scrim="id"]` call `closeLayer`. Escape closes the top layer. Events `lds:open` and `lds:close` fire on the layer. Programmatic: `openLayer(id)`, `closeLayer(id or element)`.

## Related
[Alert dialog](alert-dialog.md) · [Modal](modal.md) · [Sheet](sheet.md) · [Drawer](drawer.md)
