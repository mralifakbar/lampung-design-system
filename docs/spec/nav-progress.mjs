export default {
  title: 'Nav progress',
  group: 'Navigation',
  order: 11,
  summary: 'A 3 px accent bar along the top edge of the window that runs while the next page loads. Add `.is-running` when navigation starts, remove it when the page is in.',
  when: [
    'Client-side navigation (a single-page app or a framework router) where the next page can take more than about 300 ms to arrive.',
    'A full page swap where the old page stays visible until the new one is ready.',
  ],
  whenNot: [
    ['Progress of a task with a known percentage (upload, import)', 'progress-bar'],
    ['A region of the page loading its content', 'skeleton', 'Show the shape of what is coming in place'],
    ['A button waiting for its action', 'button', 'Use the loading state of the button'],
    ['Waiting on an assistant reply', 'thinking'],
  ],
  where: 'One per app, fixed to the top of the viewport (`position: fixed`, z-index 90), above the top bar or app shell. Render it once at the root and toggle its class from the router.',
  anatomy: [
    ['.navprogress', 'Required. An empty element (`<div>`), `aria-hidden="true"`; scaled to 0 and transparent while idle.'],
    ['.navprogress.is-running', 'Shown and easing toward 85 % of the width while navigation is in flight.'],
  ],
  examples: [
    {
      title: 'Opening the next step of a permit application',
      desc: 'The bar runs along the top edge of this box while the "page" loads, then leaves. In an app it sits at the top of the window.',
      height: 180,
      html: `<div class="navprogress" aria-hidden="true" id="np-bar"></div>
<div class="docs-col">
  <button class="btn btn--primary btn--md" style="align-self: flex-start;" onclick="const b = document.getElementById('np-bar'); const s = document.getElementById('np-status'); b.classList.add('is-running'); s.textContent = 'Loading step 4'; this.disabled = true; setTimeout(() => { b.classList.remove('is-running'); s.textContent = 'Step 4 is open'; this.disabled = false; }, 1800);">Open step 4: site documents</button>
  <p class="section__sub" id="np-status" role="status">Step 3 is open</p>
</div>`,
      code: `<div class="navprogress" aria-hidden="true"></div>

<script type="module">
  const bar = document.querySelector('.navprogress');
  router.on('start', () => bar.classList.add('is-running'));
  router.on('done', () => bar.classList.remove('is-running'));
</script>`,
    },
  ],
  states: [
    ['(idle)', '`scaleX(0)`, transparent.'],
    ['.is-running', 'Opaque within 80 ms, then grows to `scaleX(0.85)` over 2.4 s on a curve that starts fast and slows, so a slow load never seems to finish.'],
    ['(removed)', 'Fades out over 240 ms after a 120 ms delay on `--ease-exit` while the scale returns to 0 in 200 ms.'],
  ],
  motion: [
    'Grows from the left (`transform-origin: 0 50%`) with `transform: scaleX()` only, so it never triggers layout.',
    'Running: `scaleX(0.85)` over 2.4 s on `cubic-bezier(0.1, 0.7, 0.2, 1)`; opacity in 80 ms linear.',
    'Finish: removing `.is-running` returns the scale to 0 in 200 ms on `--ease-standard` and fades it out over 240 ms (120 ms delay) on `--ease-exit`. There is no separate "complete to 100 %" step in the CSS.',
    'Start it only if the navigation is still running after about 150 ms, so fast pages never flash it.',
    'Reduced motion: the bar is full width and only fades in and out (120 ms linear).',
  ],
  a11y: [
    'Decorative: `aria-hidden="true"`. Announce the new page by moving focus to its `<h1>` or `<main>`, or update the document title.',
    'Never the only sign of loading for something people wait on inside the page; use a [skeleton](skeleton) or a loading button there.',
  ],
  do: [
    'Render exactly one at the app root.',
    'Delay the start by about 150 ms.',
  ],
  dont: [
    'Show a full-screen spinner between pages.',
    'Set the width from fake percentages in JavaScript.',
    'Use it for uploads or other tasks with real progress.',
  ],
  js: 'None; it is CSS driven. Toggle `.is-running` from your router.',
  related: ['progress-bar', 'skeleton', 'app-shell', 'top-nav'],
};
