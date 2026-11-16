const pic = (a, b, label) => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect width='1200' height='800' fill='%23${a}'/%3E%3Ccircle cx='900' cy='220' r='120' fill='%23${b}'/%3E%3Cpath d='M0 640 L320 360 L560 560 L780 420 L1200 720 L1200 800 L0 800 Z' fill='%23${b}' opacity='0.75'/%3E%3Ctext x='60' y='110' font-family='sans-serif' font-size='56' fill='white'%3E${label}%3C/text%3E%3C/svg%3E`;
const enc = (s) => s.replace(/ /g, '%20');
const lib = enc(pic('1E3A8A', '60A5FA', 'Campus library'));
const lab = enc(pic('14532D', '4ADE80', 'Chemistry lab'));

export default {
  title: 'Lightbox',
  group: 'Overlays',
  order: 13,
  status: 'new',
  summary: 'Shows one picture large over a dim page: it grows out of its thumbnail and shrinks back into it. A link around a thumbnail, so without the script it still opens the full image.',
  when: [
    'A thumbnail of a photo, diagram or scanned page people need to see in full: a lab setup, a whiteboard photo, an answer sheet.',
    'A gallery of images where each one opens on its own.',
  ],
  whenNot: [
    ['Swiping through a set of slides in place', 'carousel'],
    ['A form, report or anything with controls', 'modal'],
    ['Showing a small image with its caption in the flow', 'thumbnail'],
    ['A document or PDF people read', 'link', 'Link to it and let the browser open it'],
  ],
  where: 'Over the whole window (fixed, z-index 90), the picture centered with 24 px around it and at most the window height minus 96 px; a close button top right and the caption at the bottom, both clearing the notch. The trigger is a `.thumb` link anywhere in the content.',
  anatomy: [
    ['a.thumb[data-lds-lightbox]', 'Required. The link to the full image (`href`), with an optional `data-caption`. `--ratio` sets the thumbnail shape (4 / 3 by default).'],
    ['a.thumb > img', 'Required. The thumbnail with real `alt` text; it is reused for the large picture.'],
    ['.lightbox', 'Created by the script: the dim full-window layer (`role="dialog"`, `aria-modal`).'],
    ['.lightbox__close', 'Created by the script: a close [icon button](icon-button), label from `data-close` (default "Close").'],
    ['.lightbox__caption', 'Created from `data-caption`.'],
  ],
  examples: [
    {
      title: 'Photos from a field trip',
      desc: 'Open a thumbnail: the picture grows out of it. Escape, the close button or a click outside shrinks it back and returns focus to the thumbnail.',
      html: `<div class="auto-grid" style="--min: 180px; width: 100%;">
  <a class="thumb" href="${lib}" data-lds-lightbox data-caption="The campus library reading room, second floor"><img src="${lib}" alt="Campus library reading room"></a>
  <a class="thumb" href="${lab}" data-lds-lightbox data-caption="Chemistry lab, bench 4, before the titration practical"><img src="${lab}" alt="Chemistry lab bench"></a>
</div>`,
      code: `<a class="thumb" href="/photos/library-large.jpg" data-lds-lightbox data-caption="The campus library reading room, second floor">
  <img src="/photos/library-small.jpg" alt="Campus library reading room">
</a>`,
    },
  ],
  states: [
    ['.lightbox.is-open', 'Scrim faded in, picture at full size.'],
    ['a.thumb:hover', 'The thumbnail image scales to 1.03 on devices with hover.'],
  ],
  motion: [
    'Open: the scrim fades in over `--d-standard` (240 ms) on `--ease-enter`; the picture grows from the thumbnail\'s exact rectangle to its full size (FLIP with the Web Animations API) over 420 ms on the enter curve `cubic-bezier(0.16, 1, 0.3, 1)`.',
    'Close: the same path back into the thumbnail in 220 ms on the exit curve `cubic-bezier(0.7, 0, 0.84, 0)`; the scrim fades over `--d-exit`. The layer is removed when the picture lands.',
    'Thumbnail hover: the image scales to 1.03 on `--spring-smooth`.',
    'Reduced motion: no grow or shrink; the picture appears and disappears with the fade.',
  ],
  a11y: [
    'The trigger is a real link to the full image, so it works without JavaScript and in a new tab.',
    'The thumbnail `alt` is reused for the large image; `data-caption` (or the `alt`) names the dialog.',
    'Opening moves focus to the close button and keeps Tab on it; Escape or a click outside the picture closes it and returns focus to the thumbnail.',
  ],
  do: [
    'Give every thumbnail meaningful `alt` text and a caption for context.',
    'Link to a larger file than the thumbnail.',
  ],
  dont: [
    'Wrap images that are already shown at full size.',
    'Put controls or forms in a lightbox.',
  ],
  js: '`data-lds-lightbox` on an `<a href>` around an `<img>`: on click it builds the `.lightbox` layer on `<body>`, plays the grow from the thumbnail, focuses the close button, and closes on Escape, the close button or a click outside the picture, shrinking back and returning focus. Optional `data-caption` and `data-close` (close button label).',
  related: ['thumbnail', 'carousel', 'modal', 'shared-element'],
};
