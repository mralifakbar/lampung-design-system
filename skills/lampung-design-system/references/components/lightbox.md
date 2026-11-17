# Lightbox

Group: Overlays. Docs page: `docs/components/lightbox.html`.

Shows one picture large over a dim page: it grows out of its thumbnail and shrinks back into it. A link around a thumbnail, so without the script it still opens the full image.

## Use it when
- A thumbnail of a photo, diagram or scanned page people need to see in full: a photo of a reported location, a notice board photo, a scanned form.
- A gallery of images where each one opens on its own.

## Use something else when
- Swiping through a set of slides in place: use [Carousel](carousel.md).
- A form, report or anything with controls: use [Modal](modal.md).
- Showing a small image with its caption in the flow: use [Thumbnail](thumbnail.md).
- A document or PDF people read: use [Link](link.md). Link to it and let the browser open it.

## Where it goes
Over the whole window (fixed, z-index 90), the picture centered with 24 px around it and at most the window height minus 96 px; a close button top right and the caption at the bottom, both clearing the notch. The trigger is a `.thumb` link anywhere in the content.

## Anatomy
| Part | What it is |
|---|---|
| `a.thumb[data-lds-lightbox]` | Required. The link to the full image (`href`), with an optional `data-caption`. `--ratio` sets the thumbnail shape (4 / 3 by default). |
| `a.thumb > img` | Required. The thumbnail with real `alt` text; it is reused for the large picture. |
| `.lightbox` | Created by the script: the dim full-window layer (`role="dialog"`, `aria-modal`). |
| `.lightbox__close` | Created by the script: a close [icon button](icon-button.md), label from `data-close` (default "Close"). |
| `.lightbox__caption` | Created from `data-caption`. |

## Markup

**Photos of service facilities.** Open a thumbnail: the picture grows out of it. Escape, the close button or a click outside shrinks it back and returns focus to the thumbnail.
```html
<a class="thumb" href="/photos/library-large.jpg" data-lds-lightbox data-caption="Regional library reading room, second floor">
  <img src="/photos/library-small.jpg" alt="Regional library reading room">
</a>
```

## States
| State | How |
|---|---|
| `.lightbox.is-open` | Scrim faded in, picture at full size. |
| `a.thumb:hover` | The thumbnail image scales to 1.03 on devices with hover. |

## Motion and microinteractions
- Open: the scrim fades in over `--d-standard` (240 ms) on `--ease-enter`; the picture grows from the thumbnail's exact rectangle to its full size (FLIP with the Web Animations API) over 420 ms on the enter curve `cubic-bezier(0.16, 1, 0.3, 1)`.
- Close: the same path back into the thumbnail in 220 ms on the exit curve `cubic-bezier(0.7, 0, 0.84, 0)`; the scrim fades over `--d-exit`. The layer is removed when the picture lands.
- Thumbnail hover: the image scales to 1.03 on `--spring-smooth`.
- Reduced motion: no grow or shrink; the picture appears and disappears with the fade.

## Accessibility
- The trigger is a real link to the full image, so it works without JavaScript and in a new tab.
- The thumbnail `alt` is reused for the large image; `data-caption` (or the `alt`) names the dialog.
- Opening moves focus to the close button and keeps Tab on it; Escape or a click outside the picture closes it and returns focus to the thumbnail.

## Do
- Give every thumbnail meaningful `alt` text and a caption for context.
- Link to a larger file than the thumbnail.

## Don't
- Wrap images that are already shown at full size.
- Put controls or forms in a lightbox.

## Behavior (plain HTML)
`data-lds-lightbox` on an `<a href>` around an `<img>`: on click it builds the `.lightbox` layer on `<body>`, plays the grow from the thumbnail, focuses the close button, and closes on Escape, the close button or a click outside the picture, shrinking back and returning focus. Optional `data-caption` and `data-close` (close button label).

## Related
[Thumbnail](thumbnail.md) · [Carousel](carousel.md) · [Modal](modal.md) · [Shared element](shared-element.md)
