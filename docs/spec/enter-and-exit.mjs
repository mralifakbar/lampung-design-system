const FILE = (name, meta) => `<div class="file-row"><span class="file-row__icon"><span class="ic" aria-hidden="true">description</span></span><span class="file-row__body"><span class="file-row__name">${name}</span><span class="file-row__meta">${meta}</span></span><button class="icon-btn" aria-label="Remove ${name}"><span class="ic" aria-hidden="true">close</span></button></div>`;

export default {
  title: 'Enter and exit',
  group: 'Motion',
  order: 3,
  summary: 'How things appear and disappear: overlays rise a few pixels and scale up from 0.96 on the smooth spring while they fade in fast; they leave in 180 ms on the exit curve, quieter than they came, along the same path. Things joining a list fade in from a small blur.',
  when: [
    'An overlay opens or closes: [dropdown menu](dropdown-menu), [popover](popover), [dialog](dialog), [modal](modal), [sheet](sheet), [drawer](drawer), [command palette](command-palette), [toast](toast).',
    'One new item joins something already on screen: a file row after an upload starts, a tag after Enter, a new chat message.',
    'An item leaves for good: a toast times out, a dismissed alert, a deleted row.',
  ],
  whenNot: [
    ['Content opening in the flow and pushing what is below', 'height-expand'],
    ['Many items arriving together (results, a feed)', 'list-stagger'],
    ['One view replacing another in the same place', 'view-swap'],
    ['A picture growing out of its thumbnail', 'shared-element'],
    ['Content appearing as the page scrolls', 'reveal-on-scroll'],
    ['A word or label changing in place', 'text-morph'],
  ],
  where: 'On the layer itself. Floating layers grow from the edge nearest their trigger (`transform-origin`); panels slide from the edge they live on; centered dialogs rise from just below center.',
  examples: [
    {
      title: 'A menu grows from its trigger',
      desc: 'Left menu grows from its top left corner; the right one, opened from the right edge, grows from its top right (`menu--right`). Both shrink back to where they came from in 180 ms.',
      stage: 'block',
      height: 240,
      html: `<div class="docs-row" style="justify-content: space-between; width: 100%;">
  <div style="position: relative;">
    <button class="btn btn--gray btn--md" data-lds-menu="ee-sort" aria-haspopup="menu" aria-expanded="false">Sort by<span class="ic" aria-hidden="true">expand_more</span></button>
    <div class="menu" id="ee-sort" role="menu" style="top: calc(100% + 6px); left: 0;">
      <button class="menu__item" role="menuitem">Report date</button>
      <button class="menu__item" role="menuitem">Kecamatan</button>
      <button class="menu__item" role="menuitem">Recently added</button>
    </div>
  </div>
  <div style="position: relative;">
    <button class="icon-btn" data-lds-menu="ee-more" aria-haspopup="menu" aria-expanded="false" aria-label="More actions"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="ee-more" role="menu" style="top: calc(100% + 6px); right: 0;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Rename</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">content_copy</span>Duplicate</button>
      <div class="menu__sep"></div>
      <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Delete</button>
    </div>
  </div>
</div>`,
    },
    {
      title: 'Dialog and drawer',
      desc: 'The dialog fades in fast (160 ms) while it settles from slightly small and low on the smooth spring; the scrim takes 240 ms. Closing reverses in 180 ms on the exit curve. The drawer slides in from the right and leaves to the right.',
      stage: 'flush',
      html: `<div class="viewport docs-box">
  <div class="viewport__content">
    <p class="card__title">Micro business permit service</p>
    <div class="docs-row">
      <button class="btn btn--secondary btn--md" data-lds-open="ee-dialog" aria-haspopup="dialog">Rename service</button>
      <button class="btn btn--secondary btn--md" data-lds-open="ee-drawer" aria-haspopup="dialog"><span class="ic" aria-hidden="true">tune</span>Filters</button>
    </div>
  </div>
  <div class="scrim" data-lds-scrim="ee-dialog"></div>
  <div class="dialog" id="ee-dialog" role="dialog" aria-modal="true" aria-labelledby="ee-dialog-t" data-lds-layer>
    <h3 class="dialog__title" id="ee-dialog-t">Rename service</h3>
    <p class="dialog__body">Residents see the new name the next time they open the app.</p>
    <div class="control" style="margin-top: 16px;"><input aria-label="Service name" value="Micro business permit service" data-lds-autofocus></div>
    <div class="dialog__actions"><button class="btn btn--secondary btn--md" data-lds-close>Cancel</button><button class="btn btn--primary btn--md" data-lds-close>Save name</button></div>
  </div>
  <div class="scrim" data-lds-scrim="ee-drawer"></div>
  <aside class="drawer" id="ee-drawer" role="dialog" aria-modal="true" aria-labelledby="ee-drawer-t" data-lds-layer>
    <div class="sheet__head" style="margin: 0;"><h3 class="sheet__title" id="ee-drawer-t">Filters</h3><button class="icon-btn" aria-label="Close filters" data-lds-close style="margin: -10px -10px -10px 0;"><span class="ic" aria-hidden="true">close</span></button></div>
    <button class="btn btn--primary btn--block" style="margin-top: auto;" data-lds-close>Show 8 services</button>
  </aside>
</div>`,
    },
    {
      title: 'A toast arrives and leaves',
      desc: 'A toast rises 24 px from below on the smooth spring; after four seconds it fades out in 180 ms. Send several: older ones tuck behind and shrink 5 % each.',
      stage: 'flush',
      html: `<div class="viewport docs-box" style="height: 300px;">
  <div class="viewport__content">
    <p class="card__title">Citizen report</p>
    <button class="btn btn--secondary btn--md" onclick="import('../../js/lds.js').then((m) => m.toast({ title: 'Draft saved', icon: 'check_circle', container: this.closest('.viewport') }))">Save draft</button>
  </div>
  <div class="toaster" role="status" aria-live="polite"></div>
</div>`,
      code: `import { toast } from 'lampung-design-system/js';
toast({ title: 'Draft saved', icon: 'check_circle' });`,
    },
    {
      title: 'One item joins a list',
      desc: 'A new file row fades in from a 4 px blur and rises 4 px (240 ms, enter curve). The rows already there do not move except to make room.',
      stage: 'block',
      replay: true,
      html: `<div class="docs-col" style="max-width: 420px;">
  <div>${FILE('damaged-road-photo.jpg', '1.2 MB')}</div>
  <button class="btn btn--secondary btn--sm" style="align-self: flex-start;" onclick="const list = this.previousElementSibling; const row = list.firstElementChild.cloneNode(true); row.querySelector('.file-row__name').textContent = 'attachment-' + (list.children.length + 1) + '.pdf'; row.querySelector('.file-row__meta').textContent = '340 KB'; list.append(row);"><span class="ic" aria-hidden="true">add</span>Add a file</button>
</div>`,
    },
    {
      title: 'Page modal',
      desc: 'A native `dialog.modal` rises from 8 px below and 0.96 on the smooth spring, its backdrop fades over 240 ms; it leaves to 0.97 in 180 ms. Below 600 px it becomes a bottom sheet that rises and drops.',
      html: `<button class="btn btn--secondary" data-lds-modal="ee-modal">Report a mistake</button>
<dialog class="modal" id="ee-modal" aria-labelledby="ee-modal-t">
  <button class="icon-btn dialog__close" data-lds-modal-close aria-label="Close"><span class="ic" aria-hidden="true">close</span></button>
  <h2 class="dialog__title" id="ee-modal-t">Report a mistake</h2>
  <p class="dialog__body">Tell us which detail on your local tax bill is wrong and what it should say.</p>
  <div class="dialog__actions"><button class="btn btn--secondary" data-lds-modal-close>Cancel</button><button class="btn btn--primary" data-lds-modal-close>Send report</button></div>
</dialog>`,
    },
  ],
  variants: [
    ['Menu, popover', 'In: opacity `--d-fast` on `--ease-enter`, transform from `scale(0.96) translateY(-4px)` on `--spring-smooth` (560 ms), from `transform-origin`. Out: both over `--d-exit` on `--ease-exit`, then `visibility: hidden` after 180 ms.'],
    ['Dialog, command palette', 'In: opacity `--d-fast`, transform from `translateY(4px) scale(0.98)` (palette `scale(0.97)`) on `--spring-smooth`. Out: back to that state over `--d-exit` on `--ease-exit`.'],
    ['Page modal (.modal, .overlay)', 'In: `lds-modal-in` from `translateY(8px) scale(0.96)` on `--spring-smooth`; backdrop `lds-fade-in` 240 ms. Out: add `.is-closing`, `lds-modal-out` to `scale(0.97)` in 180 ms; `closeModal()` waits, then closes. Phones: `lds-sheet-up` / `lds-sheet-down` (260 ms).'],
    ['Sheet', 'In: from `translateY(105%)` on `--spring-smooth`. Out: 260 ms on `--ease-exit` (it travels its full height). Flung: `--spring-momentum` (600 ms).'],
    ['Drawer', 'In: from off-screen right on `--spring-smooth`. Out: 240 ms on `--ease-exit`.'],
    ['Scrim', 'In: 240 ms `--ease-enter`. Out: 180 ms `--ease-exit`.'],
    ['Toast', 'In: `lds-toast-in` from `translateY(24px) scale(0.96)` on `--spring-smooth`. Out: `.is-leaving`, 180 ms on `--ease-exit`, removed after 200 ms.'],
    ['Item joining (file row, tab panel)', '`lds-blur-in`: from 4 px below, 4 px blur, transparent; `--d-standard` on `--ease-enter`. Tags and OTP digits use `lds-pop-in` (from 0.6) on `--spring-snappy`.'],
    ['Tooltip, hover card', 'Wait 500 ms (hover card 600 ms) before entering on `--spring-snappy` / `--spring-smooth`; leave in 100 to 120 ms. No delay on the way out.'],
  ],
  motion: [
    'Opacity is always faster than transform on the way in (160 ms against 560 ms): the layer is readable almost at once and keeps settling while people already read it.',
    'Exits are shorter than entrances (180 ms against 560 ms) and accelerate (`--ease-exit`). Nothing bounces on the way out.',
    'Overlays use transitions on `.is-open`, so closing mid-entrance reverses from the current position; `visibility` switches after the exit so a half-closed layer never catches clicks.',
    'Same path back: menus shrink to their origin corner, sheets drop, drawers slide to their side, toasts drop 12 px.',
    'Reduced motion: dialogs, menus, popovers and the palette stop scaling (opacity only); page modals skip their animation and close at once; every remaining transition runs 120 ms linear.',
  ],
  a11y: [
    'Focus moves into an overlay when it opens and back to the trigger when it closes (`openLayer` / `closeLayer`, `openModal` / `closeModal` do this).',
    'Closed overlays are `visibility: hidden` and `inert`, so they are out of the tab order even during the exit.',
    'Toasts are announced by their `role="status"` container; items joining a list are announced by the list owner if they matter (a live region or a toast), not by the motion.',
  ],
  do: [
    'Open overlays with the system hooks (`data-lds-open`, `data-lds-menu`, `data-lds-modal`) so enter, exit and focus come together.',
    'Close page modals with `closeModal(el)` so the exit plays before the dialog closes.',
    'Pick `menu--right` or `menu--up` so the menu grows from the side of its trigger.',
  ],
  dont: [
    'Remove an element in the same frame you start its exit; wait `--d-exit`.',
    'Slide an overlay in from a side it does not live on.',
    'Fade every new element in a page in; most content should just be there.',
  ],
  js: '`openLayer(id)` / `closeLayer(id)` for `[data-lds-layer]` overlays; `openModal(el)` / `closeModal(el, done)` for `dialog.modal` and `.overlay` (adds `.is-closing`, waits `--d-exit`, then closes); `toast({ … })`; menus through `data-lds-menu`. All respect reduced motion.',
  react: `import { closeModal } from 'lampung-design-system/react';

// Render .overlay > .overlay__panel while open; on close, play the exit first:
closeModal(overlayRef.current, () => setOpen(false));`,
  related: ['motion-principles', 'dialog', 'modal', 'toast'],
};
