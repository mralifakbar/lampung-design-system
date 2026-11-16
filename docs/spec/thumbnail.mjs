// Example pictures drawn as small SVGs so the docs need no image files.
const pic = (bg, shapes, w = 800, h = 600) => 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${bg}"/>${shapes}</svg>`);
const library = pic('#DCE7F7', `<rect x="0" y="420" width="800" height="180" fill="#B9CBE8"/><rect x="90" y="140" width="620" height="300" fill="#F4F6FA"/><rect x="90" y="110" width="620" height="40" fill="#2563EB"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="${130 + i * 115}" y="200" width="70" height="180" fill="#9DB4DC"/>`).join('')}<rect x="360" y="330" width="80" height="110" fill="#1C1C20"/>`);
const lab = pic('#E6F4F1', `<rect x="0" y="400" width="800" height="200" fill="#C3E3DC"/><rect x="120" y="300" width="560" height="30" fill="#0E9F8E"/><rect x="180" y="200" width="120" height="100" rx="8" fill="#1C1C20"/><rect x="340" y="190" width="140" height="110" rx="8" fill="#1C1C20"/><rect x="520" y="210" width="110" height="90" rx="8" fill="#1C1C20"/><rect x="192" y="212" width="96" height="70" fill="#4F86F7"/><rect x="352" y="202" width="116" height="86" fill="#4F86F7"/><rect x="532" y="222" width="86" height="66" fill="#4F86F7"/>`);
const hall = pic('#F7EEDF', `<rect x="0" y="380" width="800" height="220" fill="#EBD7B5"/>${[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5].map((c) => `<rect x="${110 + c * 100}" y="${250 + r * 60}" width="70" height="34" rx="6" fill="#C2410C" opacity="${0.55 + r * 0.12}"/>`).join('')).join('')}<rect x="250" y="110" width="300" height="100" fill="#FFFFFF"/>`);
const thumb = (src, caption, ratio) => `<a class="thumb" href="${src}" data-lds-lightbox data-caption="${caption}"${ratio ? ` style="--ratio: ${ratio};"` : ''}><img src="${src}" alt="${caption}"></a>`;

export default {
  title: 'Thumbnail',
  group: 'Content',
  order: 5,
  status: 'new',
  summary: 'A cropped preview of a picture at a fixed ratio (4:3 by default) on a recessed placeholder. As a link with `data-lds-lightbox`, it opens the full picture in a [lightbox](lightbox) that grows out of the thumbnail.',
  when: [
    'Photos and screenshots inside content: attachments on an assignment, photos of a venue, figures in a lesson.',
    'A grid of pictures people may want to see larger (`auto-grid` of `.thumb`).',
  ],
  whenNot: [
    ['A person or organization picture', 'avatar'],
    ['A picture at the top of a card that does not open', 'card', 'Use `card__media` inside the card.'],
    ['A file that is not an image (PDF, spreadsheet)', 'file-input', 'Show it as a file row with its icon, name and size.'],
    ['A row of pictures that scrolls sideways', 'carousel'],
    ['The full-screen viewer itself', 'lightbox'],
  ],
  where: 'In [prose](prose) at full reading width, in an `auto-grid` with `--min` around 160 px for galleries, or beside text in a list row at a fixed width. On phones a gallery drops to two columns at `--min: 140px`.',
  anatomy: [
    ['.thumb', 'Required. `<a href="large.jpg">` when it opens, `<div>` when it does not. Clips its image to `--r-md` and holds `--ratio` (default `4 / 3`).'],
    ['img', 'Required. `alt` describes the picture; `object-fit: cover` crops it to the ratio.'],
    ['data-lds-lightbox', 'On the link: opens the `href` in a lightbox. `data-caption` sets the caption and the dialog name; `data-close` overrides the close label.'],
    ['--ratio', 'Optional. `1` for squares, `16 / 9` for screenshots and video stills.'],
  ],
  examples: [
    {
      title: 'Gallery',
      desc: 'Click a picture: it grows into a lightbox from where it sits and shrinks back on close (Escape, the close button or a click outside).',
      stage: 'block',
      html: `<div class="auto-grid" style="--min: 160px;">
  ${thumb(library, 'Campus library, second floor')}
  ${thumb(lab, 'Networking lab, room C110')}
  ${thumb(hall, 'Exam hall B204')}
</div>`,
      code: `<div class="auto-grid" style="--min: 160px;">
  <a class="thumb" href="library-large.jpg" data-lds-lightbox data-caption="Campus library, second floor"><img src="library-small.jpg" alt="Campus library, second floor"></a>
  <a class="thumb" href="lab-large.jpg" data-lds-lightbox data-caption="Networking lab, room C110"><img src="lab-small.jpg" alt="Networking lab, room C110"></a>
</div>`,
    },
    {
      title: 'Ratios',
      desc: 'Square for profile-like grids, 16:9 for screenshots. The placeholder color shows while the image loads.',
      stage: 'block',
      html: `<div class="cluster" style="--gap: 12px; align-items: flex-start;">
  <div style="width: 140px;">${thumb(hall, 'Exam hall B204', '1')}</div>
  <div style="width: 260px;">${thumb(lab, 'Networking lab, room C110', '16 / 9')}</div>
  <div class="thumb" style="width: 180px;" role="img" aria-label="Photo still loading"></div>
</div>`,
    },
  ],
  states: [
    ['loading', 'The empty `.thumb` shows `--bg-recessed` at the final size, so nothing jumps when the image arrives. Add `loading="lazy"` on the image.'],
    ['hover', 'On devices that hover, the image scales to 1.03 inside its frame on `--spring-smooth`.'],
    ['open', 'The lightbox is a `role="dialog"` on top of the page; the thumbnail regains focus on close.'],
  ],
  motion: [
    'Hover: `transform: scale(1.03)` on the image over `--d-smooth` with `--spring-smooth`; the frame does not move.',
    'Open: the full image animates from the thumbnail\'s rectangle to its own (a FLIP transform) over 420 ms on the enter curve while the scrim fades in over `--d-standard`. Close runs it in reverse in 220 ms on `--ease-exit`.',
    'Reduced motion: no grow or shrink; the lightbox appears and disappears with the scrim fade only.',
  ],
  a11y: [
    'Every `img` has `alt` text that describes it; the lightbox reuses it.',
    'The link is the control: it is focusable and opens with Enter. Its name comes from the image `alt`.',
    'In the lightbox focus goes to the close button, Tab stays there, Escape closes, and focus returns to the thumbnail.',
    'Decorative pictures do not belong in a thumbnail; use `alt=""` and no link.',
  ],
  do: [
    'Serve a small file in `src` and the large one in `href`.',
    'Keep one ratio within a gallery.',
    'Write captions that say what and where.',
  ],
  dont: [
    'Add borders, shadows or rounded overrides to `.thumb`.',
    'Wrap a thumbnail in a [card](card) just to frame it.',
    'Open non-image files with `data-lds-lightbox`.',
  ],
  js: '`data-lds-lightbox` on an `<a class="thumb" href>` around an `<img>`. `init()` builds the lightbox on click (`role="dialog"`, `aria-modal`, close button, optional caption), animates it from the thumbnail and back, closes on Escape or an outside click, and returns focus.',
  related: ['lightbox', 'avatar', 'card', 'layout-primitives'],
};
