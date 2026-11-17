# Shared element

Group: Motion. https://lampung.kartadinata.app/docs/en/components/shared-element

The picture you tap grows out of its own thumbnail into the full view and shrinks back into the same spot when closed (a FLIP transition). Because the object never disappears, people keep their place: the large view is visibly the same thing, not a new page.

## Use it when
- Opening a photo, diagram or scan from a grid or an article into a [lightbox](lightbox.md).
- Any thumbnail whose large version is the same picture: photos of service buildings, test results, a scanned application form.

## Use something else when
- Opening details that are not the same picture (a service card to its page): use [Nav progress](nav-progress.md). There is no generic shared-element transition for arbitrary elements yet; navigate normally.
- A form or a question over the page: use [Dialog](dialog.md).
- Browsing a row of pictures in place: use [Carousel](carousel.md).
- Content opening below its trigger: use [Height expand](height-expand.md).
- Showing a small picture in a list or a card: use [Thumbnail](thumbnail.md).

## Where it goes
On a `.thumb` link (`<a class="thumb" href="large.jpg" data-lds-lightbox>`) around an `<img>`, anywhere: an `auto-grid` of photos, a figure inside [prose](prose.md), a card. The lightbox is appended to `<body>` as a fixed layer.

## Markup

**A grid of service building photos.** Open a photo: it grows from its exact place in the grid to the center while the backdrop fades in. Close it (Escape, the close button or the backdrop) and it shrinks back into the same tile.
```html
<div class="auto-grid" style="--min: 150px;">
  <a class="thumb" href="library-large.jpg" data-lds-lightbox data-caption="Public service mall, east entrance">
    <img src="library-small.jpg" alt="The public service mall with its tall windows">
  </a>
  …
</div>
```

**A figure in a guide.** Inside an article the figure stays small enough to keep reading; tapping it grows it without losing the place in the text.
```html
<div class="prose">
  <p>Antenatal check-ups are held in the outpatient building every Monday and Thursday. The photo below shows the building where you register.</p>
  <div style="max-width: 280px;"><a class="thumb" href="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20800%20600'%3E%3Crect%20width%3D'800'%20height%3D'600'%20fill%3D'%23DCFCE7'%2F%3E%3Ccircle%20cx%3D'640'%20cy%3D'130'%20r%3D'56'%20fill%3D'%23FDE68A'%2F%3E%3Crect%20x%3D'170'%20y%3D'210'%20width%3D'460'%20height%3D'270'%20rx%3D'8'%20fill%3D'%2315803D'%2F%3E%3Cpath%20d%3D'M150%20220%20L400%20110%20L650%20220%20Z'%20fill%3D'%2315803D'%2F%3E%3Cg%20fill%3D'%23DCFCE7'%20opacity%3D'0.85'%3E%3Crect%20x%3D'220'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'320'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'420'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'520'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'360'%20y%3D'380'%20width%3D'80'%20height%3D'100'%2F%3E%3C%2Fg%3E%3Crect%20y%3D'480'%20width%3D'800'%20height%3D'120'%20fill%3D'%23166534'%2F%3E%3C%2Fsvg%3E" data-lds-lightbox data-caption="Puskesmas, outpatient building, room 2"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20800%20600'%3E%3Crect%20width%3D'800'%20height%3D'600'%20fill%3D'%23DCFCE7'%2F%3E%3Ccircle%20cx%3D'640'%20cy%3D'130'%20r%3D'56'%20fill%3D'%23FDE68A'%2F%3E%3Crect%20x%3D'170'%20y%3D'210'%20width%3D'460'%20height%3D'270'%20rx%3D'8'%20fill%3D'%2315803D'%2F%3E%3Cpath%20d%3D'M150%20220%20L400%20110%20L650%20220%20Z'%20fill%3D'%2315803D'%2F%3E%3Cg%20fill%3D'%23DCFCE7'%20opacity%3D'0.85'%3E%3Crect%20x%3D'220'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'320'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'420'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'520'%20y%3D'270'%20width%3D'60'%20height%3D'80'%2F%3E%3Crect%20x%3D'360'%20y%3D'380'%20width%3D'80'%20height%3D'100'%2F%3E%3C%2Fg%3E%3Crect%20y%3D'480'%20width%3D'800'%20height%3D'120'%20fill%3D'%23166534'%2F%3E%3C%2Fsvg%3E" alt="The puskesmas outpatient building among trees"></a></div>
  <p>Bring your KIA book and your KTP. The registration desk opens 15 minutes before the service starts.</p>
</div>
```

## Motion and microinteractions
- FLIP: the large image is placed at its final position, then animated from the thumbnail rectangle (`translate` plus `scale` from the measured boxes) to `none`. Open: 420 ms on the enter curve (`cubic-bezier(0.16, 1, 0.3, 1)`, the `--ease-enter` values). Close: the same path reversed in 220 ms, back into the thumbnail.
- Backdrop: `.lightbox` fades in over `--d-standard` on `--ease-enter` and out over `--d-exit` on `--ease-exit`.
- Only `transform` animates (origin at the top left corner), so the flight stays smooth with large images.
- Interruption: closing during the opening flight starts the return from the current frame; nothing has to finish first.
- Reduced motion: no flight. The lightbox fades in and out (120 ms) and the image appears in place.

## Accessibility
- The thumbnail is a real link to the large image, so it works without JS and opens in a new tab on middle click. Give the `<img>` a real `alt`.
- The lightbox is `role="dialog"` with `aria-modal="true"`, labelled by `data-caption` (or the alt). Focus goes to the close button; Tab stays on it; Escape closes; focus returns to the thumbnail.
- Put the caption in `data-caption`; it is shown under the picture and used as the dialog label.

## Do
- Use `data-lds-lightbox` on a `.thumb` link with an `<img>` inside.
- Keep the thumbnail at the same aspect ratio as the large image when you can; the flight then has no distortion.
- Write a caption that says what and where.

## Don't
- Fade a lightbox in from the center when it was opened from a thumbnail.
- Animate `width`, `height` or `top` to fake the growth.
- Use it for a picture the person has to compare with text side by side; open it in place instead.

## Behavior (plain HTML)
`init()` wires `a[data-lds-lightbox]` (with an `<img>` inside): on click it builds the `.lightbox` dialog with `.lightbox__close` and `.lightbox__caption` from `data-caption` (close label from `data-close`), runs the FLIP flight, and on close runs it backwards and returns focus. The FLIP is specific to the lightbox; there is no general shared-element helper.

## Related
[Lightbox](lightbox.md) · [Thumbnail](thumbnail.md) · [Enter and exit](enter-and-exit.md) · [View swap](view-swap.md)
