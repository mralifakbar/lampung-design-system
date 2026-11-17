export default {
  title: 'Steps',
  group: 'Navigation',
  order: 7,
  summary: 'Numbered steps of a fixed sequence with a bar that fills as each one completes. Shows where people are in a flow and how much is left.',
  when: [
    'A flow with three to five fixed steps done in order: a permit application (details, business, payment, review), registering a newborn, registering an UMKM.',
    'People benefit from knowing how many steps remain before they commit.',
  ],
  whenNot: [
    ['Sections people visit in any order', 'tabs'],
    ['Instructions or requirements to read, not a flow to move through', 'list', 'Use numbered rows (`.lrow--num`) in a list'],
    ['Events that already happened in time', 'timeline'],
    ['Progress of one task that runs by itself', 'progress-bar'],
    ['Items in a training module, some done', 'app-shell', 'Use numbered child links with done marks in the shell'],
  ],
  where: 'At the top of the flow, under the page title, full width of the form column. Back and next buttons sit at the bottom of the form, not next to the steps. On phones with long labels, keep the dots and labels short (one or two words) or show "Step 2 of 4" in text instead.',
  anatomy: [
    ['ol.steps', 'Required. The row, with `aria-label`.'],
    ['li.step', 'Required. One step; `.is-done` before the current, `.is-current` on the current with `aria-current="step"`.'],
    ['.step__head', 'Required. The dot and the bar to the next step.'],
    ['.step__dot', 'Required. 28 px circle with the number, or a `check` icon once done.'],
    ['.step__bar', 'The connector to the next step; fills with the accent when the step is done. Leave it out on the last step.'],
    ['.step__label', 'Required. The step name.'],
    ['.step__sub', 'Optional second line: what the step asks for.'],
  ],
  examples: [
    {
      title: 'Business permit application',
      desc: 'Step 2 of 4. Press Continue to complete a step: the bar fills, then the dot turns to a check.',
      stage: 'block',
      html: `<div class="stack" style="--gap: 24px;">
  <ol class="steps" aria-label="Application progress" id="st-demo">
    <li class="step is-done"><div class="step__head"><span class="step__dot"><span class="ic" aria-hidden="true">check</span></span><span class="step__bar"></span></div><span class="step__label">Personal details</span><span class="step__sub">Name and contact</span></li>
    <li class="step is-current" aria-current="step"><div class="step__head"><span class="step__dot">2</span><span class="step__bar"></span></div><span class="step__label">Business</span><span class="step__sub">Type and location</span></li>
    <li class="step"><div class="step__head"><span class="step__dot">3</span><span class="step__bar"></span></div><span class="step__label">Payment</span><span class="step__sub">Levy and fees</span></li>
    <li class="step"><div class="step__head"><span class="step__dot">4</span></div><span class="step__label">Review</span><span class="step__sub">Check and submit</span></li>
  </ol>
  <div class="cluster">
    <button class="btn btn--primary btn--md" onclick="const c = document.querySelector('#st-demo .is-current'); if (!c) return; c.classList.replace('is-current', 'is-done'); c.removeAttribute('aria-current'); c.querySelector('.step__dot').innerHTML = '&lt;span class=&quot;ic&quot; aria-hidden=&quot;true&quot;&gt;check&lt;/span&gt;'; const n = c.nextElementSibling; if (n) { n.classList.add('is-current'); n.setAttribute('aria-current', 'step'); }">Continue</button>
  </div>
</div>`,
      code: `<ol class="steps" aria-label="Application progress">
  <li class="step is-done">
    <div class="step__head"><span class="step__dot"><span class="ic" aria-hidden="true">check</span></span><span class="step__bar"></span></div>
    <span class="step__label">Personal details</span><span class="step__sub">Name and contact</span>
  </li>
  <li class="step is-current" aria-current="step">
    <div class="step__head"><span class="step__dot">2</span><span class="step__bar"></span></div>
    <span class="step__label">Business</span><span class="step__sub">Type and location</span>
  </li>
  <li class="step">
    <div class="step__head"><span class="step__dot">3</span></div>
    <span class="step__label">Payment</span><span class="step__sub">Levy and fees</span>
  </li>
</ol>`,
    },
    {
      title: 'Labels only',
      desc: 'Three short steps without a second line.',
      stage: 'block',
      html: `<ol class="steps" aria-label="Publishing an announcement">
  <li class="step is-done"><div class="step__head"><span class="step__dot"><span class="ic" aria-hidden="true">check</span></span><span class="step__bar"></span></div><span class="step__label">Content</span></li>
  <li class="step is-done"><div class="step__head"><span class="step__dot"><span class="ic" aria-hidden="true">check</span></span><span class="step__bar"></span></div><span class="step__label">Schedule</span></li>
  <li class="step is-current" aria-current="step"><div class="step__head"><span class="step__dot">3</span></div><span class="step__label">Publish</span></li>
</ol>`,
    },
  ],
  states: [
    ['(upcoming)', 'Outlined dot with the number, muted label.'],
    ['.is-current', '2 px accent ring and accent number; strong label; `aria-current="step"`.'],
    ['.is-done', 'Filled accent dot with a check, strong label, the bar to the next step filled.'],
  ],
  motion: [
    'Bar: fills left to right with `scaleX(0)` to `scaleX(1)` over `--d-considered` (480 ms) on `--ease-inout`, because it is something already on screen moving.',
    'Dot: background, color and ring ease over `--d-standard` (240 ms). Going back reverses both, since they are transitions.',
    'Reduced motion: both drop to 120 ms linear.',
  ],
  a11y: [
    'An `<ol>` with `aria-label`, so the count and order are announced.',
    'The current step has `aria-current="step"`. Done steps should say so in text for screen readers if the check is the only sign (add an `.sr-only` "done").',
    'Steps are not buttons by default; if people may jump back to a done step, make its label a link or button.',
    'Move focus to the heading of the new step when it appears.',
  ],
  do: [
    'Keep it to three to five steps with one or two word labels.',
    'Let people go back without losing what they entered.',
  ],
  dont: [
    'Use steps for a flow with branches or optional steps.',
    'Put the back and next buttons inside the steps row.',
    'Show steps for a single-screen form.',
  ],
  js: 'None. Move `.is-done`, `.is-current` and `aria-current="step"` from your code; swap the number for a `check` icon when a step is done.',
  react: `import { Steps } from 'lampung-design-system/react';

<Steps label="Application progress" current={1} items={['Personal details', 'Business', 'Payment', 'Review']} />`,
  related: ['progress-bar', 'tabs', 'list', 'form-layout'],
};
