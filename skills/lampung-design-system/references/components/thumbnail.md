# Thumbnail

Group: Content. Docs page: `docs/components/thumbnail.html`.

A cropped preview of a picture at a fixed ratio (4:3 by default) on a recessed placeholder. As a link with `data-lds-lightbox`, it opens the full picture in a [lightbox](lightbox.md) that grows out of the thumbnail.

## Use it when
- Photos and screenshots inside content: attachments on a citizen report, photos of a service location, figures in a service guide.
- A grid of pictures people may want to see larger (`auto-grid` of `.thumb`).

## Use something else when
- A person or organization picture: use [Avatar](avatar.md).
- A picture at the top of a card that does not open: use [Card](card.md). Use `card__media` inside the card.
- A file that is not an image (PDF, spreadsheet): use [File input](file-input.md). Show it as a file row with its icon, name and size.
- A row of pictures that scrolls sideways: use [Carousel](carousel.md).
- The full-screen viewer itself: use [Lightbox](lightbox.md).

## Where it goes
In [prose](prose.md) at full reading width, in an `auto-grid` with `--min` around 160 px for galleries, or beside text in a list row at a fixed width. On phones a gallery drops to two columns at `--min: 140px`.

## Anatomy
| Part | What it is |
|---|---|
| `.thumb` | Required. `<a href="large.jpg">` when it opens, `<div>` when it does not. Clips its image to `--r-md` and holds `--ratio` (default `4 / 3`). |
| `img` | Required. `alt` describes the picture; `object-fit: cover` crops it to the ratio. |
| `data-lds-lightbox` | On the link: opens the `href` in a lightbox. `data-caption` sets the caption and the dialog name; `data-close` overrides the close label. |
| `--ratio` | Optional. `1` for squares, `16 / 9` for screenshots and video stills. |

## Markup

**Gallery.** Click a picture: it grows into a lightbox from where it sits and shrinks back on close (Escape, the close button or a click outside).
```html
<div class="auto-grid" style="--min: 160px;">
  <a class="thumb" href="office-large.jpg" data-lds-lightbox data-caption="Kelurahan Way Halim office, front"><img src="office-small.jpg" alt="Kelurahan Way Halim office, front"></a>
  <a class="thumb" href="counters-large.jpg" data-lds-lightbox data-caption="Service counters, Mal Pelayanan Publik"><img src="counters-small.jpg" alt="Service counters, Mal Pelayanan Publik"></a>
</div>
```

**Ratios.** Square for profile-like grids, 16:9 for screenshots. The placeholder color shows while the image loads.
```html
<div class="cluster" style="--gap: 12px; align-items: flex-start;">
  <div style="width: 140px;"><a class="thumb" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23F7EEDF%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22220%22%20fill%3D%22%23EBD7B5%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22250%22%20y%3D%22110%22%20width%3D%22300%22%20height%3D%22100%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E" data-lds-lightbox data-caption="Disdukcapil waiting room" style="--ratio: 1;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23F7EEDF%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22380%22%20width%3D%22800%22%20height%3D%22220%22%20fill%3D%22%23EBD7B5%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22250%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.55%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22310%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.67%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22370%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.79%22%2F%3E%3Crect%20x%3D%22110%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22210%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22310%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22410%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22510%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22610%22%20y%3D%22430%22%20width%3D%2270%22%20height%3D%2234%22%20rx%3D%226%22%20fill%3D%22%23C2410C%22%20opacity%3D%220.91%22%2F%3E%3Crect%20x%3D%22250%22%20y%3D%22110%22%20width%3D%22300%22%20height%3D%22100%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E" alt="Disdukcapil waiting room"></a></div>
  <div style="width: 260px;"><a class="thumb" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23E6F4F1%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22400%22%20width%3D%22800%22%20height%3D%22200%22%20fill%3D%22%23C3E3DC%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%22300%22%20width%3D%22560%22%20height%3D%2230%22%20fill%3D%22%230E9F8E%22%2F%3E%3Crect%20x%3D%22180%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22100%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22340%22%20y%3D%22190%22%20width%3D%22140%22%20height%3D%22110%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22520%22%20y%3D%22210%22%20width%3D%22110%22%20height%3D%2290%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22192%22%20y%3D%22212%22%20width%3D%2296%22%20height%3D%2270%22%20fill%3D%22%232BB585%22%2F%3E%3Crect%20x%3D%22352%22%20y%3D%22202%22%20width%3D%22116%22%20height%3D%2286%22%20fill%3D%22%232BB585%22%2F%3E%3Crect%20x%3D%22532%22%20y%3D%22222%22%20width%3D%2286%22%20height%3D%2266%22%20fill%3D%22%232BB585%22%2F%3E%3C%2Fsvg%3E" data-lds-lightbox data-caption="Service counters, Mal Pelayanan Publik" style="--ratio: 16 / 9;"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23E6F4F1%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%22400%22%20width%3D%22800%22%20height%3D%22200%22%20fill%3D%22%23C3E3DC%22%2F%3E%3Crect%20x%3D%22120%22%20y%3D%22300%22%20width%3D%22560%22%20height%3D%2230%22%20fill%3D%22%230E9F8E%22%2F%3E%3Crect%20x%3D%22180%22%20y%3D%22200%22%20width%3D%22120%22%20height%3D%22100%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22340%22%20y%3D%22190%22%20width%3D%22140%22%20height%3D%22110%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22520%22%20y%3D%22210%22%20width%3D%22110%22%20height%3D%2290%22%20rx%3D%228%22%20fill%3D%22%231C1C20%22%2F%3E%3Crect%20x%3D%22192%22%20y%3D%22212%22%20width%3D%2296%22%20height%3D%2270%22%20fill%3D%22%232BB585%22%2F%3E%3Crect%20x%3D%22352%22%20y%3D%22202%22%20width%3D%22116%22%20height%3D%2286%22%20fill%3D%22%232BB585%22%2F%3E%3Crect%20x%3D%22532%22%20y%3D%22222%22%20width%3D%2286%22%20height%3D%2266%22%20fill%3D%22%232BB585%22%2F%3E%3C%2Fsvg%3E" alt="Service counters, Mal Pelayanan Publik"></a></div>
  <div class="thumb" style="width: 180px;" role="img" aria-label="Photo still loading"></div>
</div>
```

## States
| State | How |
|---|---|
| `loading` | The empty `.thumb` shows `--bg-recessed` at the final size, so nothing jumps when the image arrives. Add `loading="lazy"` on the image. |
| `hover` | On devices that hover, the image scales to 1.03 inside its frame on `--spring-smooth`. |
| `open` | The lightbox is a `role="dialog"` on top of the page; the thumbnail regains focus on close. |

## Motion and microinteractions
- Hover: `transform: scale(1.03)` on the image over `--d-smooth` with `--spring-smooth`; the frame does not move.
- Open: the full image animates from the thumbnail's rectangle to its own (a FLIP transform) over 420 ms on the enter curve while the scrim fades in over `--d-standard`. Close runs it in reverse in 220 ms on `--ease-exit`.
- Reduced motion: no grow or shrink; the lightbox appears and disappears with the scrim fade only.

## Accessibility
- Every `img` has `alt` text that describes it; the lightbox reuses it.
- The link is the control: it is focusable and opens with Enter. Its name comes from the image `alt`.
- In the lightbox focus goes to the close button, Tab stays there, Escape closes, and focus returns to the thumbnail.
- Decorative pictures do not belong in a thumbnail; use `alt=""` and no link.

## Do
- Serve a small file in `src` and the large one in `href`.
- Keep one ratio within a gallery.
- Write captions that say what and where.

## Don't
- Add borders, shadows or rounded overrides to `.thumb`.
- Wrap a thumbnail in a [card](card.md) just to frame it.
- Open non-image files with `data-lds-lightbox`.

## Behavior (plain HTML)
`data-lds-lightbox` on an `<a class="thumb" href>` around an `<img>`. `init()` builds the lightbox on click (`role="dialog"`, `aria-modal`, close button, optional caption), animates it from the thumbnail and back, closes on Escape or an outside click, and returns focus.

## Related
[Lightbox](lightbox.md) · [Avatar](avatar.md) · [Card](card.md) · [Layout primitives](layout-primitives.md)
