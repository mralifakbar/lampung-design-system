const shut = `const o = this.closest('.overlay'); o.classList.add('is-closing'); setTimeout(() => { o.hidden = true; o.classList.remove('is-closing'); document.getElementById('md-ov-open').focus(); }, 180);`;

export default {
  title: 'Modal',
  group: 'Overlays',
  order: 3,
  status: 'new',
  summary: 'A page-level dialog over the whole window: a native `<dialog class="modal">` in the top layer, or `.overlay` rendered in place by a framework. Below 600 px the native modal becomes a bottom sheet. Close it with `closeModal()` so it plays its exit.',
  when: [
    'A form or confirm that belongs to the whole page rather than to a region: report a mistake, invite a student, edit profile details.',
    'The layer must sit above everything, including sticky headers and the app shell, without managing z-index.',
    'A React or other framework app that mounts and unmounts the layer itself (`.overlay`).',
  ],
  whenNot: [
    ['A short question inside a positioned region (a canvas, a preview, a phone frame)', 'dialog'],
    ['Confirming a destructive action', 'alert-dialog', 'Use the alert dialog anatomy (icon, title, danger button) inside the modal if it must be page-level'],
    ['A phone task that should be draggable and keep the page visible behind it', 'sheet'],
    ['Filters or details beside a list on wide screens', 'drawer'],
    ['Showing a picture larger', 'lightbox'],
    ['A long multi-step flow', 'steps', 'Give it its own page with steps'],
  ],
  where: 'Centered in the window, up to 520 px wide (`.overlay__panel` 440 px), with 16 px to the edges and its own scroll when tall. Below 600 px the native modal docks to the bottom as a sheet with rounded top corners and safe-area padding. Place the `<dialog>` anywhere in the page; the top layer lifts it out.',
  anatomy: [
    ['dialog.modal', 'Required for the native version. `id`, `aria-labelledby` the title. Opened with `showModal()`.'],
    ['.overlay', 'Required for the in-place version: a fixed full-window scrim that centers the panel; rendered only while open.'],
    ['.overlay__panel[role=dialog][aria-modal=true]', 'The panel inside `.overlay`; a column with 8 px gaps.'],
    ['.dialog__close', 'Close [icon button](icon-button), top right; `data-lds-modal-close` in the native version.'],
    ['.dialog__title / .dialog__body', 'Required title and the context line, the same parts as the [dialog](dialog).'],
    ['.dialog__actions', 'Required. Secondary then primary, sharing the width.'],
    ['[data-lds-modal="id"]', 'The trigger for a native modal.'],
  ],
  examples: [
    {
      title: 'Native page modal',
      desc: 'Opens above the whole page in the top layer. Escape, a click on the backdrop and Cancel all play the exit before it closes. Narrow the window below 600 px to see it as a bottom sheet.',
      html: `<button class="btn btn--secondary" data-lds-modal="md-report"><span class="ic" aria-hidden="true">error</span>Report a mistake</button>
<dialog class="modal" id="md-report" aria-labelledby="md-report-t">
  <button class="icon-btn dialog__close" data-lds-modal-close aria-label="Close"><span class="ic" aria-hidden="true">close</span></button>
  <h2 class="dialog__title" id="md-report-t">Report a mistake</h2>
  <p class="dialog__body">Tell us what is wrong in question 14 and what it should say.</p>
  <div class="field" style="margin-top: 16px;"><div class="control control--area"><textarea aria-label="What is wrong" placeholder="The answer key says B, the explanation says C."></textarea></div></div>
  <div class="dialog__actions"><button class="btn btn--secondary" data-lds-modal-close>Cancel</button><button class="btn btn--primary" data-lds-modal-close>Send report</button></div>
</dialog>`,
    },
    {
      title: 'In-place overlay',
      desc: 'The same layer rendered by a framework: mount `.overlay` to open, call `closeModal(el, unmount)` to play the exit and then unmount. Shown here inside this box.',
      height: 360,
      html: `<button class="btn btn--secondary" id="md-ov-open" onclick="const o = document.getElementById('md-ov'); o.hidden = false; o.querySelector('input').focus();"><span class="ic" aria-hidden="true">person_add</span>Invite a student</button>
<div class="overlay" id="md-ov" hidden>
  <div class="overlay__panel" role="dialog" aria-modal="true" aria-labelledby="md-ov-t">
    <button class="icon-btn dialog__close" aria-label="Close" onclick="${shut}"><span class="ic" aria-hidden="true">close</span></button>
    <h2 class="dialog__title" id="md-ov-t">Invite a student</h2>
    <p class="dialog__body">They get an email with a link to join Database Systems.</p>
    <div class="control"><input type="email" aria-label="Email address" placeholder="name@school.edu"></div>
    <div class="dialog__actions"><button class="btn btn--secondary" onclick="${shut}">Cancel</button><button class="btn btn--primary" onclick="${shut}">Send invite</button></div>
  </div>
</div>`,
      code: `{open && (
  <div className="overlay" ref={ref} onKeyDown={(e) => e.key === 'Escape' && closeModal(ref.current, () => setOpen(false))}>
    <div className="overlay__panel" role="dialog" aria-modal="true" aria-labelledby="invite-t">
      <h2 className="dialog__title" id="invite-t">Invite a student</h2>
      <p className="dialog__body">They get an email with a link to join Database Systems.</p>
      <div className="dialog__actions">
        <button className="btn btn--secondary" onClick={() => closeModal(ref.current, () => setOpen(false))}>Cancel</button>
        <button className="btn btn--primary" onClick={send}>Send invite</button>
      </div>
    </div>
  </div>
)}`,
    },
  ],
  variants: [
    ['dialog.modal', 'Native: top layer, `::backdrop`, focus handled by the browser, a bottom sheet below 600 px. The default.'],
    ['.overlay > .overlay__panel', 'In place: for frameworks that render the layer conditionally. Stays centered on phones. You handle Escape, focus and the backdrop click.'],
  ],
  states: [
    ['[open]', 'Native modal shown; enters on a spring and its backdrop fades in.'],
    ['.is-closing', 'Plays the exit (`lds-modal-out`, or `lds-sheet-down` on phones). Added by `closeModal()`, removed once closed.'],
  ],
  motion: [
    'Enter: `lds-modal-in` from `translateY(8px) scale(0.96)` and transparent, on `--spring-smooth` over `--d-smooth` (560 ms). The backdrop fades in over `--d-standard` (240 ms); `.overlay` fades in over `--d-fast`.',
    'Exit: `lds-modal-out` to `scale(0.97)` and transparent over `--d-exit` (180 ms) on `--ease-exit`, the backdrop fading with it. `closeModal()` waits for it, then calls `close()` or your `done`.',
    'Phones (600 px and under): the native modal rises with `lds-sheet-up` on `--spring-smooth` and drops with `lds-sheet-down` in 260 ms on `--ease-exit`.',
    'Reduced motion: no animations; `closeModal()` closes at once.',
  ],
  a11y: [
    'Native: `showModal()` makes the rest of the page inert, traps focus and moves it to the first focusable element (or `[autofocus]`); on close the browser returns focus to the trigger.',
    'Native: `aria-labelledby` the title. Escape is intercepted (`cancel`) so the exit animation plays before closing.',
    'Overlay: put `role="dialog"`, `aria-modal="true"` and `aria-labelledby` on `.overlay__panel`; move focus into it on mount, trap Tab, close on Escape, and return focus to the trigger after unmount. The system does not do these for `.overlay`.',
  ],
  do: [
    'Close with `closeModal()` (or `[data-lds-modal-close]`) so the exit plays; never call `dialog.close()` directly.',
    'Keep it to one task with one primary action.',
    'Let long content scroll inside the modal, not the page behind.',
  ],
  dont: [
    'Wrap `dialog.modal` in your own fixed wrapper or give it a z-index; the top layer does that.',
    'Open a modal on page load.',
    'Stack a modal on a modal.',
  ],
  js: '`[data-lds-modal="id"]` opens `dialog#id.modal` with `openModal(el)` (`showModal()`). Inside, `[data-lds-modal-close]`, Escape and a click on the backdrop call `closeModal(el)`, which adds `.is-closing`, waits for the exit (180 ms; 260 ms as a phone sheet) and closes. `closeModal(overlayEl, done)` does the same for `.overlay` and then calls `done` to unmount.',
  react: `import { closeModal } from 'lampung-design-system/react';

const ref = useRef<HTMLDivElement>(null);
{open && (
  <div className="overlay" ref={ref}>
    <div className="overlay__panel" role="dialog" aria-modal="true" aria-labelledby="t">…
      <button className="btn btn--secondary" onClick={() => closeModal(ref.current, () => setOpen(false))}>Cancel</button>
    </div>
  </div>
)}`,
  related: ['dialog', 'alert-dialog', 'sheet', 'lightbox'],
};
