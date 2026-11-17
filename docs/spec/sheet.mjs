export default {
  title: 'Sheet',
  group: 'Overlays',
  order: 4,
  summary: 'A panel that rises from the bottom for a task that keeps its context: the page behind recedes but stays visible. Drag the grabber to dismiss with momentum. The phone answer to most dialogs.',
  when: [
    'On phones, a focused task related to the current screen: mark attendance, choose a time slot, set filters, share.',
    'A short list of options with more detail than a menu can hold.',
    'Anything people may want to flick away with a thumb.',
  ],
  whenNot: [
    ['The same task on wide screens, beside a list', 'drawer'],
    ['A page-level form that should be a centered dialog on desktop and a sheet on phones', 'modal', 'The native modal turns into a bottom sheet below 600 px by itself'],
    ['Confirming a destructive action', 'alert-dialog'],
    ['Three to seven commands on an object', 'dropdown-menu'],
    ['A message that something happened', 'toast'],
  ],
  where: 'Docked to the bottom of its positioned container (`.viewport`, or a `position: fixed; inset: 0` wrapper for a real page), full width, rounded top corners, above a scrim. The primary button is full width at the bottom (`btn--block`). Keep it under about 80 % of the height.',
  anatomy: [
    ['.scrim[data-lds-scrim="id"]', 'Required. Dims the page; click to close; fades as the sheet is dragged down.'],
    ['.sheet[role=dialog][aria-modal=true]', 'Required. The panel with `id`, `data-lds-layer` and `aria-labelledby`.'],
    ['.sheet__grabber', 'Required. The 36 by 5 px handle; drag it to move the sheet. `aria-hidden`.'],
    ['.sheet__head', 'Title row with the close button; add `data-lds-drag` to make it a drag handle too.'],
    ['.sheet__title', 'Required. 17 px title.'],
    ['[data-lds-push="id"]', 'On the `.viewport` that holds the sheet: its `.viewport__content` scales to 0.94 while the sheet is open. The recede is styled for `.viewport > .viewport__content` and for `.phone > .phone__content` ([device frame](device-frame)). List several sheet ids separated by spaces.'],
  ],
  examples: [
    {
      title: 'Mark attendance',
      desc: 'Open it, then drag the grabber or the title down and let go: a fast flick dismisses even from a short drag; a slow one springs back.',
      stage: 'block',
      html: `<div class="viewport docs-box" data-lds-push="sh-att">
  <div class="viewport__content">
    <button class="btn btn--secondary btn--md" data-lds-open="sh-att" aria-haspopup="dialog">Mark attendance</button>
    <p class="section__sub">Posyandu Melati · Monday 08:00</p>
  </div>
  <div class="scrim" data-lds-scrim="sh-att"></div>
  <div class="sheet" id="sh-att" role="dialog" aria-modal="true" aria-labelledby="sh-att-t" data-lds-layer>
    <div class="sheet__grabber" aria-hidden="true"></div>
    <div class="sheet__head" data-lds-drag>
      <h3 class="sheet__title" id="sh-att-t">Mark attendance</h3>
      <button class="icon-btn icon-btn--filled" aria-label="Close" data-lds-close><span class="ic" aria-hidden="true">close</span></button>
    </div>
    <div class="list list--fill">
      <button class="lrow"><span class="lrow__body"><span class="lrow__title">Present</span></span><span class="ic" style="color: var(--accent-text);" aria-hidden="true">check</span></button>
      <button class="lrow"><span class="lrow__body"><span class="lrow__title">Late, with reason</span></span></button>
      <button class="lrow"><span class="lrow__body"><span class="lrow__title">Absent with permission</span></span></button>
    </div>
    <button class="btn btn--primary btn--block" style="margin-top: 16px;" data-lds-close>Save attendance</button>
  </div>
</div>`,
      code: `<div class="viewport" data-lds-push="attendance">
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
</div>`,
    },
    {
      title: 'Share options',
      desc: 'Without the push: the page stays put, only the scrim dims it.',
      stage: 'block',
      html: `<div class="viewport docs-box">
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
</div>`,
    },
  ],
  states: [
    ['.is-open', 'Docked; the page behind is pushed back if a container has `data-lds-push`.'],
    ['.is-dragging', 'Follows the pointer 1:1 with no transition; the scrim fades with the distance.'],
    ['.is-thrown', 'Springing back after a release that did not dismiss.'],
  ],
  motion: [
    'Enter: rises from `translateY(105%)` on `--spring-smooth` over `--d-smooth` (560 ms). Exit: drops in 260 ms on `--ease-exit`, back the way it came.',
    'Push: the content behind scales to 0.94, moves down 8 px and dims to 96 % brightness on `--spring-smooth`.',
    'Drag: follows the finger 1:1, rubber-bands upward (`over·120·0.55 / (120 + 0.55·|over|)`). On release it projects the end point with the velocity (`v/1000 · 0.99 / (1 − 0.99)`); past half its height it dismisses, otherwise it springs back on `--spring-momentum` over 600 ms.',
    'Reduced motion: the slide drops to 120 ms linear and there is no throw spring.',
  ],
  a11y: [
    '`role="dialog"`, `aria-modal="true"`, `aria-labelledby` the title. Focus moves inside on open and is trapped; Escape closes; focus returns to the trigger.',
    'Dragging is never the only way out: keep a close button or a clear final action, and the scrim.',
    'The grabber is decorative (`aria-hidden`).',
  ],
  do: [
    'Keep one task per sheet with a full-width primary at the bottom.',
    'Make the title row a drag handle (`data-lds-drag`) so the whole top edge moves it.',
    'Use the [drawer](drawer) for the same content on wide screens.',
  ],
  dont: [
    'Stack sheets on sheets.',
    'Fill it to the full height; that is a page.',
    'Put drag handles on scrolling content.',
  ],
  js: '`data-lds-open`, `data-lds-close`, `data-lds-scrim`, `data-lds-layer` as for every layer (`openLayer` / `closeLayer`, `lds:open` / `lds:close`). On `.sheet[data-lds-layer]` the script adds dragging from `.sheet__grabber` and `[data-lds-drag]` with rubber-banding and momentum. `data-lds-push="id"` on any container adds `.is-pushed` while that layer is open.',
  related: ['drawer', 'modal', 'drag-and-momentum', 'dialog'],
};
