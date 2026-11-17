# Sheet

Group: Overlays. Docs page: `docs/components/sheet.html`.

A panel that rises from the bottom for a task that keeps its context: the page behind recedes but stays visible. Drag the grabber to dismiss with momentum. The phone answer to most dialogs.

## Use it when
- On phones, a focused task related to the current screen: mark attendance, choose a time slot, set filters, share.
- A short list of options with more detail than a menu can hold.
- Anything people may want to flick away with a thumb.

## Use something else when
- The same task on wide screens, beside a list: use [Drawer](drawer.md).
- A page-level form that should be a centered dialog on desktop and a sheet on phones: use [Modal](modal.md). The native modal turns into a bottom sheet below 600 px by itself.
- Confirming a destructive action: use [Alert dialog](alert-dialog.md).
- Three to seven commands on an object: use [Dropdown menu](dropdown-menu.md).
- A message that something happened: use [Toast](toast.md).

## Where it goes
Docked to the bottom of its positioned container (`.viewport`, or a `position: fixed; inset: 0` wrapper for a real page), full width, rounded top corners, above a scrim. The primary button is full width at the bottom (`btn--block`). Keep it under about 80 % of the height.

## Anatomy
| Part | What it is |
|---|---|
| `.scrim[data-lds-scrim="id"]` | Required. Dims the page; click to close; fades as the sheet is dragged down. |
| `.sheet[role=dialog][aria-modal=true]` | Required. The panel with `id`, `data-lds-layer` and `aria-labelledby`. |
| `.sheet__grabber` | Required. The 36 by 5 px handle; drag it to move the sheet. `aria-hidden`. |
| `.sheet__head` | Title row with the close button; add `data-lds-drag` to make it a drag handle too. |
| `.sheet__title` | Required. 17 px title. |
| `[data-lds-push="id"]` | On the `.viewport` that holds the sheet: its `.viewport__content` scales to 0.94 while the sheet is open. The recede is styled for `.viewport > .viewport__content` and for `.phone > .phone__content` ([device frame](device-frame.md)). List several sheet ids separated by spaces. |

## Markup

**Mark attendance.** Open it, then drag the grabber or the title down and let go: a fast flick dismisses even from a short drag; a slow one springs back.
```html
<div class="viewport" data-lds-push="attendance">
<div class="viewport__content">…screen content…</div>
<div class="scrim" data-lds-scrim="attendance"></div>
<div class="sheet" id="attendance" role="dialog" aria-modal="true" aria-labelledby="attendance-t" data-lds-layer>
  <div class="sheet__grabber" aria-hidden="true"></div>
  <div class="sheet__head" data-lds-drag>
    <h2 class="sheet__title" id="attendance-t">Mark attendance</h2>
    <button class="icon-btn icon-btn--filled" aria-label="Close" data-lds-close><span class="ic" aria-hidden="true">close</span></button>
  </div>
  …
  <button class="btn btn--primary btn--block" data-lds-close>Save attendance</button>
</div>
</div>
```

**Share options.** Without the push: the page stays put, only the scrim dims it.
```html
<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--secondary btn--md" data-lds-open="sh-share" aria-haspopup="dialog"><span class="ic" aria-hidden="true">ios_share</span>Share receipt</button>
  </div>
  <div class="scrim" data-lds-scrim="sh-share"></div>
  <div class="sheet" id="sh-share" role="dialog" aria-modal="true" aria-labelledby="sh-share-t" data-lds-layer>
    <div class="sheet__grabber" aria-hidden="true"></div>
    <div class="sheet__head"><h3 class="sheet__title" id="sh-share-t">Share your registration receipt</h3></div>
    <div class="list list--fill">
      <button class="lrow" data-lds-close><span class="ic" aria-hidden="true">link</span><span class="lrow__body"><span class="lrow__title">Copy link</span></span></button>
      <button class="lrow" data-lds-close><span class="ic" aria-hidden="true">download</span><span class="lrow__body"><span class="lrow__title">Save as image</span></span></button>
      <button class="lrow" data-lds-close><span class="ic" aria-hidden="true">mail</span><span class="lrow__body"><span class="lrow__title">Send by email</span></span></button>
    </div>
  </div>
</div>
```

## States
| State | How |
|---|---|
| `.is-open` | Docked; the page behind is pushed back if a container has `data-lds-push`. |
| `.is-dragging` | Follows the pointer 1:1 with no transition; the scrim fades with the distance. |
| `.is-thrown` | Springing back after a release that did not dismiss. |

## Motion and microinteractions
- Enter: rises from `translateY(105%)` on `--spring-smooth` over `--d-smooth` (560 ms). Exit: drops in 260 ms on `--ease-exit`, back the way it came.
- Push: the content behind scales to 0.94, moves down 8 px and dims to 96 % brightness on `--spring-smooth`.
- Drag: follows the finger 1:1, rubber-bands upward (`over·120·0.55 / (120 + 0.55·|over|)`). On release it projects the end point with the velocity (`v/1000 · 0.99 / (1 − 0.99)`); past half its height it dismisses, otherwise it springs back on `--spring-momentum` over 600 ms.
- Reduced motion: the slide drops to 120 ms linear and there is no throw spring.

## Accessibility
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` the title. Focus moves inside on open and is trapped; Escape closes; focus returns to the trigger.
- Dragging is never the only way out: keep a close button or a clear final action, and the scrim.
- The grabber is decorative (`aria-hidden`).

## Do
- Keep one task per sheet with a full-width primary at the bottom.
- Make the title row a drag handle (`data-lds-drag`) so the whole top edge moves it.
- Use the [drawer](drawer.md) for the same content on wide screens.

## Don't
- Stack sheets on sheets.
- Fill it to the full height; that is a page.
- Put drag handles on scrolling content.

## Behavior (plain HTML)
`data-lds-open`, `data-lds-close`, `data-lds-scrim`, `data-lds-layer` as for every layer (`openLayer` / `closeLayer`, `lds:open` / `lds:close`). On `.sheet[data-lds-layer]` the script adds dragging from `.sheet__grabber` and `[data-lds-drag]` with rubber-banding and momentum. `data-lds-push="id"` on any container adds `.is-pushed` while that layer is open.

## Related
[Drawer](drawer.md) · [Modal](modal.md) · [Drag and momentum](drag-and-momentum.md) · [Dialog](dialog.md)
