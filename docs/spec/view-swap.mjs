const STEP = (n, label, cls) => `<li class="step${cls ? ' ' + cls : ''}"><span class="step__head"><span class="step__dot">${n}</span>${n < 3 ? '<span class="step__bar" aria-hidden="true"></span>' : ''}</span><span class="step__label">${label}</span></li>`;
const GO = (d) => `const f = this.closest('[data-flow]'); const panes = f.querySelectorAll('[data-pane]'); let i = [...panes].findIndex((p) => !p.hidden); i = Math.max(0, Math.min(panes.length - 1, i + (${d}))); panes.forEach((p, j) => { p.hidden = j !== i; }); f.querySelectorAll('.step').forEach((s, j) => { s.classList.toggle('is-done', j < i); s.classList.toggle('is-current', j === i); s.querySelector('.step__dot').innerHTML = j < i ? '<span class=&quot;ic&quot; aria-hidden=&quot;true&quot;>check</span>' : String(j + 1); }); f.querySelector('[data-back]').disabled = i === 0; f.querySelector('[data-next]').textContent = i === panes.length - 1 ? 'Send application' : 'Continue'; panes[i].querySelector('h3').focus();`;
const IN = 'style="animation: lds-blur-in var(--d-standard) var(--ease-enter);"';
const IN_GAP = 'style="animation: lds-blur-in var(--d-standard) var(--ease-enter); margin-top: 16px;"';

export default {
  title: 'View swap',
  group: 'Motion',
  order: 7,
  summary: 'One view replaces another in the same place: a tab panel, the next step of a form, a different range on a chart. The old view goes at once and the new one fades in from a 4 px blur and a 4 px rise in 240 ms. Quick enough to never feel like a page load; soft enough that the eye sees the change.',
  when: [
    'A step-by-step form moves forward or back: the step content swaps under a fixed [steps](steps) header and fixed buttons.',
    'A [tab](tabs) or [segmented control](segmented-control) changes the content below it.',
    'A card or panel switches what it shows (this week, this month) while its frame stays.',
  ],
  whenNot: [
    ['Opening a layer over the current view', 'enter-and-exit'],
    ['Content opening below and pushing the page', 'height-expand'],
    ['A thumbnail growing into the full picture', 'shared-element'],
    ['Only a word or a number changes', 'text-morph', 'For numbers, use [number count](number-count).'],
    ['Navigating to another page', 'nav-progress'],
  ],
  where: 'On the region that changes, below the control that changed it. The control, the header and the action buttons stay still; only the content swaps.',
  examples: [
    {
      title: 'A step-by-step form, forward and back',
      desc: 'Continue and Back swap the step content; the steps header fills its bar on the in-out curve and the focus moves to the new heading. Nothing slides sideways, so going back feels the same as going forward.',
      stage: 'block',
      html: `<div data-flow style="max-width: 520px;">
  <ol class="steps" aria-label="Application">${STEP(1, 'Program', 'is-current')}${STEP(2, 'Documents', '')}${STEP(3, 'Review', '')}</ol>
  <div class="card" style="margin-top: 20px; min-height: 132px;">
    <div data-pane ${IN}><h3 class="card__title" tabindex="-1">Choose a program</h3><p class="card__sub">Undergraduate, Computer Science, starting in February.</p></div>
    <div data-pane hidden ${IN}><h3 class="card__title" tabindex="-1">Upload your documents</h3><p class="card__sub">Your diploma, last transcript and a photo of your ID card.</p></div>
    <div data-pane hidden ${IN}><h3 class="card__title" tabindex="-1">Review and send</h3><p class="card__sub">Check the program and the three documents, then send the application.</p></div>
  </div>
  <div class="form__actions" style="margin-top: 16px;"><button class="btn btn--secondary" data-back disabled onclick="${GO(-1)}">Back</button><button class="btn btn--primary" data-next onclick="${GO(1)}">Continue</button></div>
</div>`,
      code: `<ol class="steps" aria-label="Application">…</ol>
<section class="step-view" aria-labelledby="step-title" style="animation: lds-blur-in var(--d-standard) var(--ease-enter);">
  <h3 id="step-title" tabindex="-1">Upload your documents</h3>
  …
</section>
<!-- Render the new step (or unhide it): the animation plays each time the element is shown.
     Then move focus to its heading. -->`,
    },
    {
      title: 'Tab panels',
      desc: 'The ink slides; the panel below swaps with the blur-in. `.tab-panel` has the swap built in.',
      stage: 'block',
      html: `<div style="max-width: 460px;">
  <div class="tabs" role="tablist" aria-label="Lab report" data-lds-tabs>
    <span class="tabs__ink"></span>
    <button class="tabs__btn" role="tab" aria-selected="true" aria-controls="vs-1">Instructions</button>
    <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="vs-2">Rubric</button>
    <button class="tabs__btn" role="tab" aria-selected="false" aria-controls="vs-3">Submissions <span class="tabs__count">28</span></button>
  </div>
  <div class="tab-panel" role="tabpanel" id="vs-1">Measure the mass of each potato slice before and after two hours in salt water.</div>
  <div class="tab-panel" role="tabpanel" id="vs-2" hidden>Method 30 %, results 40 %, discussion 30 %. Late work loses 5 % a day.</div>
  <div class="tab-panel" role="tabpanel" id="vs-3" hidden>28 of 32 students have submitted. 4 are still drafting.</div>
</div>`,
    },
    {
      title: 'A card that changes its range',
      desc: 'The segmented control switches the period; the figure and its label swap below while the card frame stays put.',
      stage: 'fill',
      html: `<div class="card" style="width: 100%; max-width: 360px;">
  <div class="seg" role="group" aria-label="Period" data-lds-segmented onclick="const b = event.target.closest('.seg__btn'); if (!b) return; const i = [...this.querySelectorAll('.seg__btn')].indexOf(b); this.parentElement.querySelectorAll('[data-pane]').forEach((p, j) => { p.hidden = j !== i; });">
    <span class="seg__thumb"></span>
    <button class="seg__btn" aria-pressed="true">Week</button>
    <button class="seg__btn" aria-pressed="false">Month</button>
    <button class="seg__btn" aria-pressed="false">Term</button>
  </div>
  <div data-pane ${IN_GAP}><p class="chart-card__big">6 h 40 m</p><p class="card__sub">Study time this week</p></div>
  <div data-pane hidden ${IN_GAP}><p class="chart-card__big">27 h</p><p class="card__sub">Study time this month</p></div>
  <div data-pane hidden ${IN_GAP}><p class="chart-card__big">94 h</p><p class="card__sub">Study time this term</p></div>
</div>`,
    },
  ],
  motion: [
    'Swap: the old view is hidden at once; the new one plays `lds-blur-in` (4 px rise, 4 px blur, opacity 0 to 1) over `--d-standard` (240 ms) on `--ease-enter`. `.tab-panel` has it built in.',
    'Direction: none. Forward and back look the same. The [steps](steps) header carries the direction: its bar fills over `--d-considered` (480 ms) on `--ease-inout` and the dot turns into a check.',
    'Keep the frame still: the container, the header and the buttons never animate; if the new view is taller, the frame just grows.',
    'Interruption: a second press during the 240 ms swaps again immediately; the newest view starts its own fade. Nobody waits for the previous one.',
    'Reduced motion: the fade runs in 1 ms, so views switch instantly; the steps bar fills in 120 ms.',
  ],
  a11y: [
    'Move focus to the heading of the new step (`tabindex="-1"`) so screen readers announce where they are.',
    'Hidden views are `hidden`, not just transparent, so they leave the tab order and the accessibility tree.',
    'Tabs keep `aria-selected` and `aria-controls`; steps keep `aria-current="step"` on the current one.',
  ],
  do: [
    'Keep controls and frame still and swap only the content.',
    'Show direction in the steps header, not with sideways slides.',
    'Focus the new heading after a step change.',
  ],
  dont: [
    'Slide whole views left and right, or cross-fade both views at once on top of each other.',
    'Animate the height of the frame on every swap.',
    'Make Continue wait for the animation.',
  ],
  js: 'Tabs: `data-lds-tabs` hides and shows the panels for you. Steps and other swaps: toggle `hidden` (or render the new view); the animation plays each time the element is shown. There is no directional swap class in the system.',
  react: `import { Steps } from 'lampung-design-system/react';

<Steps label="Application" items={['Program', 'Documents', 'Review']} current={step} />
<section key={step} style={{ animation: 'lds-blur-in var(--d-standard) var(--ease-enter)' }}>{views[step]}</section>`,
  related: ['tabs', 'steps', 'sliding-indicator', 'enter-and-exit'],
};
