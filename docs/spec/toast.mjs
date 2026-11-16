const show = (opts) => `import('../../js/lds.js').then(({ toast }) => toast({ ${opts}, container: this.closest('.viewport') }));`;

export default {
  title: 'Toast',
  group: 'Overlays',
  order: 11,
  summary: 'A short dark message at the bottom that confirms something that just happened, then leaves by itself. When the action can be reversed, the Undo lives in the toast with an honest countdown.',
  when: [
    'Confirming an action that finished: "Draft saved", "Invite sent", "Thread archived".',
    'Offering Undo right after a reversible destructive action, instead of asking first.',
    'Reporting a background result the person started (export ready, upload finished).',
  ],
  whenNot: [
    ['A condition that persists until it is fixed (offline, payment overdue)', 'alert', 'Or a [banner](banner) for a system-wide condition'],
    ['An error in a form field', 'text-field', 'Put the message under the field'],
    ['A decision people must make', 'dialog'],
    ['An irreversible destructive action', 'alert-dialog'],
    ['Actions on several selected items', 'selection-bar'],
  ],
  where: 'Bottom center of the window (or of its `.viewport`), 340 px wide, 20 px from the bottom. Newest in front; up to three tuck behind it, smaller. Above a phone tab bar, lift the toaster so it clears the bar.',
  anatomy: [
    ['.toaster[role=status][aria-live=polite]', 'The stack. Created by `toast()` (fixed, on `<body>`) or placed in a `.viewport` for a contained demo.'],
    ['.toast', 'One message: inverse background, 56 px minimum, 16 px radius.'],
    ['.ic', 'Optional filled icon: `check_circle`, `inventory_2`, `delete`.'],
    ['text', 'The title (`.morph` so it can change in place) and optional `.toast__sub` line.'],
    ['.toast__action', 'At most one action, usually Undo.'],
    ['.toast__timer', 'The thin bar that drains while an action is still possible; pauses on hover and focus.'],
  ],
  examples: [
    {
      title: 'Saved, and archived with Undo',
      desc: 'Press both. The Undo toast shows how long Undo lasts and pauses while hovered; pressing Undo changes the toast in place instead of stacking another.',
      stage: 'block',
      html: `<div class="viewport docs-box" style="height: 300px; min-height: 0;">
  <div class="viewport__content">
    <div class="docs-row">
      <button class="btn btn--secondary btn--md" onclick="${show(`title: 'Draft saved', body: 'Only you can see it.', icon: 'check_circle'`)}">Save draft</button>
      <button class="btn btn--secondary btn--md" onclick="${show(`title: 'Thread archived', body: 'Moved out of your inbox.', icon: 'inventory_2', action: 'Undo', duration: 6000, onAction: () => ({ title: 'Thread restored', icon: 'undo' })`)}"><span class="ic" aria-hidden="true">inventory_2</span>Archive thread</button>
    </div>
  </div>
  <div class="toaster" role="status" aria-live="polite"></div>
</div>`,
      code: `import { toast } from 'lampung-design-system/js';

toast({ title: 'Draft saved', body: 'Only you can see it.', icon: 'check_circle' });

toast({
  title: 'Thread archived', body: 'Moved out of your inbox.', icon: 'inventory_2',
  action: 'Undo', duration: 6000,
  onAction: () => { restore(); return { title: 'Thread restored', icon: 'undo' }; },
});`,
    },
    {
      title: 'Static markup',
      desc: 'The markup `toast()` renders, shown resting in its toaster.',
      stage: 'block',
      html: `<div class="viewport docs-box" style="height: 140px; min-height: 0;">
  <div class="toaster" role="status" aria-live="polite">
    <div class="toast"><span class="ic ic--fill" aria-hidden="true">check_circle</span><div><span>Invite sent</span><div class="toast__sub">Rina gets an email in a minute.</div></div></div>
  </div>
</div>`,
    },
  ],
  states: [
    ['entering', '`lds-toast-in`: rises 24 px and scales from 0.96.'],
    ['stacked', 'Older toasts sit 10 px behind and 5 % smaller each; more than three fade out.'],
    [':hover on the stack', 'The stack fans out (66 px apart) and every timer pauses.'],
    ['.is-leaving', 'Drops 12 px and fades; removed after 200 ms.'],
  ],
  motion: [
    'Enter: `lds-toast-in` over `--d-smooth` (560 ms) on `--spring-smooth`. Restacking moves on the same spring, so older toasts slide back as a new one arrives.',
    'Exit: opacity and `translateY(12px) scale(0.96)` over `--d-exit` (180 ms) on `--ease-exit`.',
    'Timer: the `.toast__timer` bar drains linearly over the duration and pauses with the clock while the stack is hovered or focused.',
    'Undo: the title morphs in place to the result ("Thread restored") and the toast leaves 1.6 s later.',
    'Reduced motion: no rise; fades in 120 ms.',
  ],
  a11y: [
    'The toaster is `role="status"` with `aria-live="polite"`, so the title and body are read without moving focus.',
    'The clock pauses while the stack is hovered or holds focus, so people can reach Undo by keyboard.',
    'Keep the duration long enough to read and act: 4 s default, about 6 s with an action.',
    'Never put the only path to something in a toast; it leaves.',
  ],
  do: [
    'Say what happened in past tense: "Invite sent".',
    'Offer Undo instead of asking "Are you sure?" whenever the action is reversible.',
    'Pass `container` when the toast belongs to a contained region.',
  ],
  dont: [
    'Use a toast for errors that need fixing; show them where they happened.',
    'Show more than one action.',
    'Toast on every small change that is already visible (a switch flipping).',
  ],
  js: '`toast({ title, body, icon, action, onAction, duration = 4000, container })` creates the toast in `.toaster` (creating a fixed one on `<body>` if none exists, or using one inside `container`) and returns `dismiss()`; `dismiss.update({ title, icon })` changes it in place. `onAction` may return `{ title, icon }` to morph the toast into the result. Up to three show; hover fans the stack and pauses the timers.',
  react: `import { notify } from 'lampung-design-system/react';

notify({ title: 'Invite sent', icon: 'check_circle' }, 'success');
notify({ title: 'Thread archived', action: 'Undo', onAction: restore });`,
  related: ['alert', 'banner', 'alert-dialog', 'text-morph'],
};
