# Hold to confirm

Group: Actions. https://lampung.kartadinata.app/docs/en/components/hold-to-confirm

A button you press and hold for 1.2 s to confirm something costly but not dangerous enough for a dialog. A fill sweeps across while you hold and drains if you let go early.

## Use it when
- A costly, deliberate action that should not happen by a stray tap but does not need a separate question: submit a social aid application, end a live public hearing, delete a local draft archive.
- Inside a flow where a confirm dialog would break concentration (the last screen of a long application form).

## Use something else when
- Destroying shared or unrecoverable data (delete a service, remove an officer): use [Alert dialog](alert-dialog.md). Name the consequence in words and ask.
- A confirm on a phone where a deliberate gesture fits better (send payment, approve aid disbursement): use [Slide to confirm](slide-to-confirm.md).
- An action that is easy to undo: use [Button](button.md). Do it at once and offer Undo in a [toast](toast.md).
- A two-step "Are you sure?" inside the same control: use [Confirm in place](confirm-in-place.md).

## Where it goes
Where the primary action of the flow would be: the end of an application form, the footer of a sheet. Full width on phones (`btn--block`). Add a one-line hint under or inside it ("Hold to submit"), because the gesture is not obvious.

## Anatomy
| Part | What it is |
|---|---|
| `.btn.hold[data-lds-hold]` | Required. A button with any filled variant (`btn--primary` or `btn--danger`). `.hold` clips the fill. |
| `.hold__fill` | Required. First child, `aria-hidden`. A dark layer that scales from the left while held. |
| `label text` | The last child. Say the gesture in it: "Hold to submit application". |

## Markup

**Submit an application.** Press and hold for 1.2 s, or focus it and hold Space or Enter. Let go early and the fill drains.
```html
<button class="btn btn--primary hold" data-lds-hold id="submit-application">
  <span class="hold__fill" aria-hidden="true"></span>
  <span class="ic" aria-hidden="true">touch_app</span>Hold to submit application
</button>
<script type="module">
  document.getElementById('submit-application').addEventListener('lds:confirm', submitApplication);
</script>
```

**Destructive, local only.** Danger tone for something that removes data on this device and can be downloaded again.
```html
<button class="btn btn--danger hold" data-lds-hold>
  <span class="hold__fill" aria-hidden="true"></span>
  <span class="ic" aria-hidden="true">delete</span>Hold to delete offline copies
</button>
```

## States
| State | How |
|---|---|
| `rest` | No fill. |
| `.is-holding` | Added on pointer down (or Space/Enter down); the fill sweeps across in 1.2 s. |
| `released early` | `.is-holding` removed; the fill drains in 240 ms. Nothing happens. |
| `confirmed` | After 1.2 s held, `lds:confirm` fires on the button and `.is-holding` is removed. Update the label or disable the button yourself. |
| `disabled` | `disabled` stops the hold from starting. |

## Motion and microinteractions
- Fill: `transform: scaleX(0 to 1)` from the left over 1200 ms, linear, so the progress is honest time. Release drains it in 240 ms on `--ease-exit`; because it is a transition it drains from wherever it got to.
- The button still sinks to 0.97 on press like every button.
- Under reduced motion the system shortens all transitions to 120 ms, so the fill completes long before the 1.2 s timer. The hold still takes 1.2 s; the label must say "Hold", since the fill no longer shows the time.

## Accessibility
- A real `<button>`. Keyboard: hold Space or Enter (repeats are ignored), release to cancel.
- The label states the gesture ("Hold to …"); do not rely on the fill.
- After `lds:confirm`, announce the result (change the label, use a [toast](toast.md), or move focus to the next screen).
- Offer a non-hold path where holding is hard (switch access users): a setting or a confirm dialog fallback.

## Do
- Start the label with "Hold to".
- Use it for one action per screen.
- Confirm the result in words right after.

## Don't
- Use it for everyday actions like Save.
- Replace a confirm dialog for shared, irreversible deletes.
- Change the 1.2 s duration per screen; people learn it once.

## Behavior (plain HTML)
`data-lds-hold` on the button. `init()` starts a 1.2 s timer on pointer down or Space/Enter down, cancels it on pointer up, leave or cancel and on key up, and dispatches `lds:confirm` (bubbles) when it completes.

## Related
[Slide to confirm](slide-to-confirm.md) · [Alert dialog](alert-dialog.md) · [Confirm in place](confirm-in-place.md) · [Button](button.md)
