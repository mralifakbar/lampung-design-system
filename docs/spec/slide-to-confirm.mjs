const wire = (text) => `const s = this.closest('.slide'); if (!s.dataset.wired) { s.dataset.wired = '1'; s.addEventListener('lds:confirm', () => { s.querySelector('.slide__label').textContent = '${text}'; }); }`;
const slide = (label, done) => `<div class="slide" data-lds-slide>
  <span class="slide__fill" aria-hidden="true"></span>
  <span class="slide__label" aria-live="polite">${label}</span>
  <button class="slide__knob" aria-label="${label}. Press Enter to confirm." onpointerenter="${wire(done)}" onfocus="${wire(done)}"><span class="ic" aria-hidden="true">arrow_forward</span></button>
</div>`;

export default {
  title: 'Slide to confirm',
  group: 'Actions',
  order: 10,
  summary: 'A track with a knob you drag to the end to confirm a costly step on a touch screen (submit an aid recipient list, send a payment). The knob follows your finger 1:1, resists past the ends, and commits past 85 % of the way.',
  when: [
    'A costly, deliberate confirm on a phone or tablet where a stray tap must not trigger it: submit the final aid recipient list, pay a levy, send a permit for signing.',
    'The last step of a flow, at the bottom of the screen within thumb reach.',
  ],
  whenNot: [
    ['Desktop with a mouse as the main input', 'hold-to-confirm', 'Dragging a knob with a mouse is slow; holding a button is not.'],
    ['Destroying shared or unrecoverable data', 'alert-dialog'],
    ['An action that can be undone', 'button', 'Do it at once and offer Undo in a [toast](toast).'],
    ['Picking a value along a range', 'slider'],
  ],
  where: 'At the bottom of a phone screen or [sheet](sheet), full width of the content column (it caps at 340 px and shrinks to fit). One per screen, with the summary of what is being confirmed directly above it.',
  anatomy: [
    ['.slide[data-lds-slide]', 'Required. The 56 px track, pill shaped, on `--bg-recessed`.'],
    ['.slide__fill', 'Required. The accent-tinted trail that grows behind the knob.'],
    ['.slide__label', 'Required. The instruction ("Slide to submit recipients"); fades as the knob passes it. Change its text to the result after confirm.'],
    ['.slide__knob', 'Required. A `<button>` 48 px, accent, with an `arrow_forward` icon that becomes `check` when done. Needs an `aria-label`.'],
  ],
  examples: [
    {
      title: 'Submit aid recipients',
      desc: 'Drag the knob to the end. Let go before 85 % and it springs home; a quick flick counts its speed. With the keyboard, focus the knob and press Enter.',
      replay: true,
      html: slide('Slide to submit recipients', 'Recipients submitted'),
      code: `<div class="slide" data-lds-slide id="submit-aid">
  <span class="slide__fill" aria-hidden="true"></span>
  <span class="slide__label" aria-live="polite">Slide to submit recipients</span>
  <button class="slide__knob" aria-label="Slide to submit recipients. Press Enter to confirm."><span class="ic" aria-hidden="true">arrow_forward</span></button>
</div>
<script type="module">
  const s = document.getElementById('submit-aid');
  s.addEventListener('lds:confirm', () => { s.querySelector('.slide__label').textContent = 'Recipients submitted'; sendRecipients(); });
</script>`,
    },
    {
      title: 'Under a summary on a phone',
      desc: 'What is being confirmed sits right above the track.',
      replay: true,
      stage: 'block',
      html: `<div class="stack" style="--gap: 16px; max-width: 360px;">
  <dl class="kv-list" style="margin: 0;">
    <div class="kv"><dt>Permit levy</dt><dd>Rp 150.000</dd></div>
    <div class="kv"><dt>Paid from</dt><dd>Digital wallet</dd></div>
  </dl>
  ${slide('Slide to pay Rp 150.000', 'Payment sent')}
</div>`,
    },
  ],
  states: [
    ['rest', 'Knob at the start, label visible.'],
    ['.is-dragging', 'While the pointer holds the knob; cursor is `grabbing`.'],
    ['released short', 'Knob returns on `--spring-momentum` over `--d-momentum`.'],
    ['.is-done', 'Track turns `--success-tint`, label `--success-text` and semibold, knob green with a `check`. `lds:confirm` fires. There is no built-in reset.'],
  ],
  motion: [
    'Drag: the knob follows the pointer 1:1 (no transition) and the fill grows with it; the label fades out over the first 60 % of travel.',
    'Past either end it rubber-bands (`over * 52 * 0.55 / (52 + 0.55 * |over|)`), so it resists instead of stopping dead.',
    'Release: the end point is projected from the last 5 pointer samples; past 85 % of travel it commits and slides to the end on `--spring-smooth` over `--d-smooth`, otherwise it returns on `--spring-momentum` (the one place a slight overshoot is earned, after a gesture).',
    'Done: track and knob colors cross-fade over `--d-standard`; the label padding moves on `--spring-smooth`.',
    'Under reduced motion transitions shorten to 120 ms; the drag itself still follows the finger.',
  ],
  a11y: [
    'The knob is a `<button>`: Tab reaches it and Enter confirms at once. Say so in its `aria-label`.',
    'Put `aria-live="polite"` on `.slide__label` so the result ("Recipients submitted") is announced when you change it.',
    'The drag is not the only path: Enter works, and for switch or voice users provide another route (a confirm button in settings).',
    'Contrast: the label is `--text-subtle` on `--bg-recessed`; the done label is `--success-text` on `--success-tint`.',
  ],
  do: [
    'Say what will happen in the label ("Slide to pay Rp 150.000").',
    'Change the label to the result after `lds:confirm`.',
    'Keep it within thumb reach at the bottom of the screen.',
  ],
  dont: [
    'Use it on desktop-first screens.',
    'Put two on one screen.',
    'Use it for reversible, everyday actions.',
  ],
  js: '`data-lds-slide` on the track. `init()` handles pointer drag with rubber-banding and velocity projection, commits past 85 %, sets `.is-done`, swaps the knob icon to `check`, and dispatches `lds:confirm` on the track. Enter on the knob commits.',
  related: ['hold-to-confirm', 'alert-dialog', 'drag-and-momentum', 'sheet'],
};
