const SPIN = '<span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';
const CONFIRM = ({ icon, arm, ask, cancel, yes, busy, done }) => `<div class="confirm" data-lds-confirm>
  <span class="confirm__face confirm__face--rest"><button class="confirm__arm" data-act="arm"><span class="ic" aria-hidden="true">${icon}</span>${arm}</button></span>
  <span class="confirm__face confirm__face--ask"><span class="confirm__q">${ask}</span><button class="btn btn--plain" data-act="cancel">${cancel}</button><button class="btn btn--danger" data-act="confirm">${yes}</button></span>
  <span class="confirm__face confirm__face--busy" role="status">${SPIN}<span class="shimmer">${busy}</span></span>
  <span class="confirm__face confirm__face--done" role="status"><span class="ic" aria-hidden="true">check_circle</span>${done}<button class="confirm__undo" data-act="undo">Undo</button></span>
</div>`;

export default {
  title: 'Confirm in place',
  group: 'Microinteractions',
  order: 2,
  summary: 'A destructive action that asks, works and reports inside one pill: rest, then "Delete 3 files?", then Deleting, then Deleted with Undo. The pill springs to fit each sentence, so nothing around it jumps and nobody has to deal with a dialog for a small, undoable action.',
  when: [
    'Deleting, removing or leaving one thing, or a small selection, that can be undone: files, a member, a group, a saved search.',
    'The action sits in a toolbar, a card header or a row, and a dialog would feel heavier than the action.',
  ],
  whenNot: [
    ['The action cannot be undone or affects many people (delete a service for every resident)', 'alert-dialog'],
    ['A costly but not dangerous commit (submit an application, pay)', 'hold-to-confirm', 'Or [slide to confirm](slide-to-confirm) on phones.'],
    ['Removing a row by gesture', 'swipe-actions'],
    ['The result happened somewhere else on the page', 'toast', 'Offer Undo there.'],
  ],
  where: 'Where the action already lives: the end of a file toolbar, a card header, the trailing edge of a list row. Give it room to grow: it can be about twice its resting width while asking.',
  anatomy: [
    ['.confirm', 'Required. The pill, `data-lds-confirm`. Height 44, width follows the current face. `data-face` says which face shows.'],
    ['.confirm__face--rest', 'Required. Holds `.confirm__arm` (`data-act="arm"`): icon plus the action, in danger text.'],
    ['.confirm__face--ask', 'Required. `.confirm__q` (the question with the object), a plain Cancel (`data-act="cancel"`) and a `btn--danger` (`data-act="confirm"`).'],
    ['.confirm__face--busy', 'Required. Spinner plus a shimmering verb ("Deleting"), `role="status"`.'],
    ['.confirm__face--done', 'Required. Check plus the result sentence and `.confirm__undo` (`data-act="undo"`), `role="status"`.'],
  ],
  examples: [
    {
      title: 'Delete files from a toolbar',
      desc: 'Press Delete 3 files, then Delete. The confirm button ignores clicks for 280 ms after arming, so a double click cannot confirm by accident. Undo stays for 5 seconds.',
      html: CONFIRM({ icon: 'delete', arm: 'Delete 3 files', ask: 'Delete 3 files?', cancel: 'Cancel', yes: 'Delete', busy: 'Deleting', done: 'Deleted 3 files' }),
    },
    {
      title: 'Leave a group from its card',
      desc: 'The same walk with words for this action. Escape backs out of the question.',
      stage: 'fill',
      html: `<div class="card" style="display: flex; align-items: center; gap: 12px; width: 100%; max-width: 560px; flex-wrap: wrap;">
  <span class="avatar avatar--sq">KS</span>
  <span style="flex: 1; min-width: 140px;"><span class="card__title" style="display: block;">Kader Posyandu Sukarame</span><span class="card__sub" style="display: block;">12 members, meets on Thursdays</span></span>
  ${CONFIRM({ icon: 'logout', arm: 'Leave group', ask: 'Leave Kader Posyandu Sukarame?', cancel: 'Stay', yes: 'Leave', busy: 'Leaving', done: 'You left the group' })}
</div>`,
    },
    {
      title: 'Remove a member in a row',
      desc: 'In a list the pill grows toward the row content; the name and email keep their place.',
      stage: 'fill',
      html: `<div class="list" style="width: 100%; max-width: 560px;">
  <div class="lrow" style="flex-wrap: wrap;"><span class="avatar" style="--size: 36px;">RS</span><span class="lrow__body"><span class="lrow__title">Rizal Siregar</span><span class="lrow__sub">rizal.siregar@contoh.id</span></span>${CONFIRM({ icon: 'person', arm: 'Remove', ask: 'Remove Rizal?', cancel: 'Cancel', yes: 'Remove', busy: 'Removing', done: 'Removed' })}</div>
</div>`,
    },
  ],
  states: [
    ['rest', '`data-face="rest"`: danger tint, the action with its icon.'],
    ['ask', '`data-face="ask"`: base surface with a ring; focus moves to Cancel. Escape or Cancel returns to rest.'],
    ['busy', '`data-face="busy"`: spinner and shimmer; shown at least 600 ms so it never flickers.'],
    ['done', '`data-face="done"`: success tint, the result and Undo (focused). Returns to rest after `data-reset` ms (default 5000).'],
    ['failed', 'If the promise rejects, it returns to rest and shakes; say why next to it.'],
  ],
  motion: [
    'Width: the pill measures the next face and transitions its width on `--spring-snappy` (`--d-snappy`, 360 ms); background color cross-fades over `--d-standard`.',
    'Faces: the old face leaves in 120 ms on `--ease-exit` (fade, 2 px blur, scale 0.98), held centered so text never slides sideways; the new face enters in 200 ms on `--ease-enter` after 60 ms, or after 150 ms when the pill is growing so words are never cut off.',
    'Done: the check pops on `--spring-momentum` (360 ms), a small earned bounce for a finished action.',
    'Failure: `shake()` (360 ms, two oscillations) plus an error haptic.',
    'Interruption: every step is a transition on the current width; arming and cancelling quickly reverses smoothly.',
    'Reduced motion: width changes in 120 ms, faces swap at once, no pop and no shake.',
  ],
  a11y: [
    'Every face holds real buttons. Arming moves focus to Cancel (the safe choice); done moves focus to Undo; cancel and reset return it to the arm button.',
    'The busy and done faces are `role="status"`, so "Deleting" and "Deleted 3 files" are announced.',
    'The question names the object ("Delete 3 files?"), so it makes sense out of context.',
  ],
  do: [
    'Name the object in the arm label, the question and the result.',
    'Call `e.detail.wait(promise)` so the busy face lasts as long as the real work.',
    'Make Undo really restore, and listen for `lds:undo`.',
  ],
  dont: [
    'Use it for irreversible actions; use an [alert dialog](alert-dialog).',
    'Put two confirms side by side in one row.',
    'Show a toast as well; the pill already says it.',
  ],
  js: '`init()` wires `[data-lds-confirm]`. On confirm it emits `lds:confirm` with `{ wait }`; pass your promise to `wait` to hold the busy face (a rejection returns to rest with a shake). Without `wait` it settles after 700 ms. `lds:undo` fires on Undo. `data-reset` sets how long the done face stays (ms). Light haptic on arm, success haptic on done.',
  related: ['alert-dialog', 'hold-to-confirm', 'shake', 'text-morph'],
};
