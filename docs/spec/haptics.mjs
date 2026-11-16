const H = (kind, label) => `<button class="btn btn--secondary btn--md" onclick="import('../../js/lds.js').then((m) => m.haptic('${kind}'))">${label}</button>`;

export default {
  title: 'Haptics',
  group: 'Microinteractions',
  order: 14,
  summary: 'A short vibration on phones that support it, always together with a visible change, never alone. Four kinds: light for a tap that changed something, medium for a gesture that committed, success when something finished, error when something was refused.',
  when: [
    'Adding feel to a moment that already has visible feedback: a like, a switch landing, a swipe that commits, a long press that opens a menu.',
    'Confirming an outcome the person waited for: an upload finished, a confirm completed.',
  ],
  whenNot: [
    ['Telling the person something with no visual change', 'toast', 'Haptics are never the only signal.'],
    ['Refusing input', 'shake', 'It already buzzes the error pattern.'],
    ['Every button press', 'press-feedback', 'The visual sink is enough.'],
    ['Reducing motion', 'reduced-motion'],
  ],
  where: 'Called from code at the moment of the event, after a user gesture. The system components already call it; you only call it for new moments.',
  examples: [
    {
      title: 'The four kinds',
      desc: 'On an Android phone with vibration, press each one. On desktops and on iPhone browsers nothing happens, which is why haptics only add to what the screen already shows.',
      html: `<div class="docs-row">
  ${H('light', 'Light')}${H('medium', 'Medium')}${H('success', 'Success')}${H('error', 'Error')}
</div>
<p class="docs-note" style="width: 100%;">Light 8 ms, medium 14 ms, success 10 + 40 + 18 ms, error five pulses of 12 and 30 ms.</p>`,
      code: `import { haptic } from 'lampung-design-system/js';
haptic('success'); // 'light' | 'medium' | 'success' | 'error'`,
    },
    {
      title: 'Built in where it belongs',
      desc: 'The like buzzes light when it fills; the confirm buzzes light when it asks and success when it is done; a refused shake buzzes error.',
      html: `<button class="like" aria-pressed="false" data-lds-like aria-label="Like"><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="8"></span></button>
<div class="confirm" data-lds-confirm>
  <span class="confirm__face confirm__face--rest"><button class="confirm__arm" data-act="arm"><span class="ic" aria-hidden="true">delete</span>Clear history</button></span>
  <span class="confirm__face confirm__face--ask"><span class="confirm__q">Clear history?</span><button class="btn btn--plain" data-act="cancel">Cancel</button><button class="btn btn--danger" data-act="confirm">Clear</button></span>
  <span class="confirm__face confirm__face--busy" role="status"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="shimmer">Clearing</span></span>
  <span class="confirm__face confirm__face--done" role="status"><span class="ic" aria-hidden="true">check_circle</span>History cleared<button class="confirm__undo" data-act="undo">Undo</button></span>
</div>`,
    },
  ],
  variants: [
    ['light', '8 ms. A tap that changed something: like on, confirm armed.'],
    ['medium', '14 ms. A gesture that committed: swipe delete, long press opening a context menu.'],
    ['success', '10, 40, 18 ms. Something finished: confirm done, upload complete, thinking done.'],
    ['error', '12, 30, 12, 30, 12 ms. Refused: `shake()`, `likeRevert()`, a failed save.'],
  ],
  motion: [
    'Timing: fire at the same moment as the visual change (pointer down for presses, the commit frame for gestures), never after an animation.',
    'One haptic per event. Do not stack a light tap under a success pattern.',
    'Reduced motion does not turn haptics off; `data-lds-haptics="off"` on `<html>` does (offer it as a setting).',
  ],
  a11y: [
    'Never the only signal: every haptic pairs with a visible and, where it matters, an announced change.',
    'Runs only after the person has interacted with the page (`navigator.userActivation`), so pages never buzz on load.',
    'Respect a "Vibration" or "Haptics" setting in the product with `data-lds-haptics="off"`.',
  ],
  do: [
    'Use the four kinds as named; do not invent patterns.',
    'Let system components fire their own haptics.',
  ],
  dont: [
    'Buzz on every press or on scroll.',
    'Use a haptic to tell the person something the screen does not show.',
    'Fire haptics from timers or background events.',
  ],
  js: '`haptic(kind)` uses `navigator.vibrate` when available, after user activation, unless `data-lds-haptics="off"` is on `<html>`. Called by like, confirm, swipe commit, context menu long press, shake, thinking done and upload complete.',
  react: `import { notify } from 'lampung-design-system/react';

notify({ title: 'Upload finished', icon: 'check_circle' }, 'success'); // toast plus a success haptic`,
  related: ['shake', 'like', 'press-feedback', 'reduced-motion'],
};
