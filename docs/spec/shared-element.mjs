const pic = (sky, main, accent, ground) => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'><rect width='800' height='600' fill='${sky}'/><circle cx='640' cy='130' r='56' fill='${accent}'/><rect x='170' y='210' width='460' height='270' rx='8' fill='${main}'/><path d='M150 220 L400 110 L650 220 Z' fill='${main}'/><g fill='${sky}' opacity='0.85'><rect x='220' y='270' width='60' height='80'/><rect x='320' y='270' width='60' height='80'/><rect x='420' y='270' width='60' height='80'/><rect x='520' y='270' width='60' height='80'/><rect x='360' y='380' width='80' height='100'/></g><rect y='480' width='800' height='120' fill='${ground}'/></svg>`);
const LIB = pic('#DBEAFE', '#0A6246', '#F59E0B', '#16A34A');
const LAB = pic('#DCFCE7', '#15803D', '#FDE68A', '#166534');
const HALL = pic('#FFEDD5', '#C2410C', '#FEF3C7', '#78350F');
const THUMB = (src, cap, alt) => `<a class="thumb" href="${src}" data-lds-lightbox data-caption="${cap}"><img src="${src}" alt="${alt}"></a>`;

export default {
  title: 'Shared element',
  group: 'Motion',
  order: 8,
  status: 'new',
  summary: 'The picture you tap grows out of its own thumbnail into the full view and shrinks back into the same spot when closed (a FLIP transition). Because the object never disappears, people keep their place: the large view is visibly the same thing, not a new page.',
  when: [
    'Opening a photo, diagram or scan from a grid or an article into a [lightbox](lightbox).',
    'Any thumbnail whose large version is the same picture: campus photos, lab results, a scanned answer sheet.',
  ],
  whenNot: [
    ['Opening details that are not the same picture (a course card to its page)', 'nav-progress', 'There is no generic shared-element transition for arbitrary elements yet; navigate normally.'],
    ['A form or a question over the page', 'dialog'],
    ['Browsing a row of pictures in place', 'carousel'],
    ['Content opening below its trigger', 'height-expand'],
    ['Showing a small picture in a list or a card', 'thumbnail'],
  ],
  where: 'On a `.thumb` link (`<a class="thumb" href="large.jpg" data-lds-lightbox>`) around an `<img>`, anywhere: an `auto-grid` of photos, a figure inside [prose](prose), a card. The lightbox is appended to `<body>` as a fixed layer.',
  examples: [
    {
      title: 'A grid of campus photos',
      desc: 'Open a photo: it grows from its exact place in the grid to the center while the backdrop fades in. Close it (Escape, the close button or the backdrop) and it shrinks back into the same tile.',
      html: `<div class="auto-grid" style="--min: 150px; width: 100%;">
  ${THUMB(LIB, 'Central library, east entrance', 'The central library with its tall windows')}
  ${THUMB(LAB, 'Biology lab, building C', 'The biology lab building among trees')}
  ${THUMB(HALL, 'Main hall, graduation day', 'The main hall in warm evening light')}
</div>`,
      code: `<div class="auto-grid" style="--min: 150px;">
  <a class="thumb" href="library-large.jpg" data-lds-lightbox data-caption="Central library, east entrance">
    <img src="library-small.jpg" alt="The central library with its tall windows">
  </a>
  …
</div>`,
    },
    {
      title: 'A figure in a lesson',
      desc: 'Inside an article the figure stays small enough to keep reading; tapping it grows it without losing the place in the text.',
      stage: 'block',
      html: `<div class="prose">
  <p>Plant cells keep their shape because the cell wall pushes back when water flows in. The photo below shows the lab building where you will run the experiment in week 6.</p>
  <div style="max-width: 280px;">${THUMB(LAB, 'Biology lab, building C, room 2.14', 'The biology lab building among trees')}</div>
  <p>Bring a lab coat and your printed worksheet. The room opens 15 minutes before the session.</p>
</div>`,
    },
  ],
  motion: [
    'FLIP: the large image is placed at its final position, then animated from the thumbnail rectangle (`translate` plus `scale` from the measured boxes) to `none`. Open: 420 ms on the enter curve (`cubic-bezier(0.16, 1, 0.3, 1)`, the `--ease-enter` values). Close: the same path reversed in 220 ms, back into the thumbnail.',
    'Backdrop: `.lightbox` fades in over `--d-standard` on `--ease-enter` and out over `--d-exit` on `--ease-exit`.',
    'Only `transform` animates (origin at the top left corner), so the flight stays smooth with large images.',
    'Interruption: closing during the opening flight starts the return from the current frame; nothing has to finish first.',
    'Reduced motion: no flight. The lightbox fades in and out (120 ms) and the image appears in place.',
  ],
  a11y: [
    'The thumbnail is a real link to the large image, so it works without JS and opens in a new tab on middle click. Give the `<img>` a real `alt`.',
    'The lightbox is `role="dialog"` with `aria-modal="true"`, labelled by `data-caption` (or the alt). Focus goes to the close button; Tab stays on it; Escape closes; focus returns to the thumbnail.',
    'Put the caption in `data-caption`; it is shown under the picture and used as the dialog label.',
  ],
  do: [
    'Use `data-lds-lightbox` on a `.thumb` link with an `<img>` inside.',
    'Keep the thumbnail at the same aspect ratio as the large image when you can; the flight then has no distortion.',
    'Write a caption that says what and where.',
  ],
  dont: [
    'Fade a lightbox in from the center when it was opened from a thumbnail.',
    'Animate `width`, `height` or `top` to fake the growth.',
    'Use it for a picture the person has to compare with text side by side; open it in place instead.',
  ],
  js: '`init()` wires `a[data-lds-lightbox]` (with an `<img>` inside): on click it builds the `.lightbox` dialog with `.lightbox__close` and `.lightbox__caption` from `data-caption` (close label from `data-close`), runs the FLIP flight, and on close runs it backwards and returns focus. The FLIP is specific to the lightbox; there is no general shared-element helper.',
  related: ['lightbox', 'thumbnail', 'enter-and-exit', 'view-swap'],
};
