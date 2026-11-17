const wire = (text) => `if (!this.dataset.wired) { this.dataset.wired = '1'; this.addEventListener('lds:confirm', () => { this.lastChild.textContent = '${text}'; this.disabled = true; }); }`;

export default {
  title: 'Hold to confirm',
  group: 'Actions',
  order: 9,
  summary: 'A button you press and hold for 1.2 s to confirm something costly but not dangerous enough for a dialog. A fill sweeps across while you hold and drains if you let go early.',
  when: [
    'A costly, deliberate action that should not happen by a stray tap but does not need a separate question: submit a social aid application, end a live public hearing, delete a local draft archive.',
    'Inside a flow where a confirm dialog would break concentration (the last screen of a long application form).',
  ],
  whenNot: [
    ['Destroying shared or unrecoverable data (delete a service, remove an officer)', 'alert-dialog', 'Name the consequence in words and ask.'],
    ['A confirm on a phone where a deliberate gesture fits better (send payment, approve aid disbursement)', 'slide-to-confirm'],
    ['An action that is easy to undo', 'button', 'Do it at once and offer Undo in a [toast](toast).'],
    ['A two-step "Are you sure?" inside the same control', 'confirm-in-place'],
  ],
  where: 'Where the primary action of the flow would be: the end of an application form, the footer of a sheet. Full width on phones (`btn--block`). Add a one-line hint under or inside it ("Hold to submit"), because the gesture is not obvious.',
  anatomy: [
    ['.btn.hold[data-lds-hold]', 'Required. A button with any filled variant (`btn--primary` or `btn--danger`). `.hold` clips the fill.'],
    ['.hold__fill', 'Required. First child, `aria-hidden`. A dark layer that scales from the left while held.'],
    ['label text', 'The last child. Say the gesture in it: "Hold to submit application".'],
  ],
  examples: [
    {
      title: 'Submit an application',
      desc: 'Press and hold for 1.2 s, or focus it and hold Space or Enter. Let go early and the fill drains.',
      replay: true,
      html: `<button class="btn btn--primary hold" data-lds-hold style="min-width: 240px;" onpointerenter="${wire('Application submitted')}" onfocus="${wire('Application submitted')}"><span class="hold__fill" aria-hidden="true"></span><span class="ic" aria-hidden="true">touch_app</span>Hold to submit application</button>`,
      code: `<button class="btn btn--primary hold" data-lds-hold id="submit-application">
  <span class="hold__fill" aria-hidden="true"></span>
  <span class="ic" aria-hidden="true">touch_app</span>Hold to submit application
</button>
<script type="module">
  document.getElementById('submit-application').addEventListener('lds:confirm', submitApplication);
</script>`,
    },
    {
      title: 'Destructive, local only',
      desc: 'Danger tone for something that removes data on this device and can be downloaded again.',
      replay: true,
      html: `<button class="btn btn--danger hold" data-lds-hold style="min-width: 240px;" onpointerenter="${wire('Offline copies deleted')}" onfocus="${wire('Offline copies deleted')}"><span class="hold__fill" aria-hidden="true"></span><span class="ic" aria-hidden="true">delete</span>Hold to delete offline copies</button>`,
      code: `<button class="btn btn--danger hold" data-lds-hold>
  <span class="hold__fill" aria-hidden="true"></span>
  <span class="ic" aria-hidden="true">delete</span>Hold to delete offline copies
</button>`,
    },
  ],
  states: [
    ['rest', 'No fill.'],
    ['.is-holding', 'Added on pointer down (or Space/Enter down); the fill sweeps across in 1.2 s.'],
    ['released early', '`.is-holding` removed; the fill drains in 240 ms. Nothing happens.'],
    ['confirmed', 'After 1.2 s held, `lds:confirm` fires on the button and `.is-holding` is removed. Update the label or disable the button yourself.'],
    ['disabled', '`disabled` stops the hold from starting.'],
  ],
  motion: [
    'Fill: `transform: scaleX(0 to 1)` from the left over 1200 ms, linear, so the progress is honest time. Release drains it in 240 ms on `--ease-exit`; because it is a transition it drains from wherever it got to.',
    'The button still sinks to 0.97 on press like every button.',
    'Under reduced motion the system shortens all transitions to 120 ms, so the fill completes long before the 1.2 s timer. The hold still takes 1.2 s; the label must say "Hold", since the fill no longer shows the time.',
  ],
  a11y: [
    'A real `<button>`. Keyboard: hold Space or Enter (repeats are ignored), release to cancel.',
    'The label states the gesture ("Hold to …"); do not rely on the fill.',
    'After `lds:confirm`, announce the result (change the label, use a [toast](toast), or move focus to the next screen).',
    'Offer a non-hold path where holding is hard (switch access users): a setting or a confirm dialog fallback.',
  ],
  do: [
    'Start the label with "Hold to".',
    'Use it for one action per screen.',
    'Confirm the result in words right after.',
  ],
  dont: [
    'Use it for everyday actions like Save.',
    'Replace a confirm dialog for shared, irreversible deletes.',
    'Change the 1.2 s duration per screen; people learn it once.',
  ],
  js: '`data-lds-hold` on the button. `init()` starts a 1.2 s timer on pointer down or Space/Enter down, cancels it on pointer up, leave or cancel and on key up, and dispatches `lds:confirm` (bubbles) when it completes.',
  related: ['slide-to-confirm', 'alert-dialog', 'confirm-in-place', 'button'],
};
