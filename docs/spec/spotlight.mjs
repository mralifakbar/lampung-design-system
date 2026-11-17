export default {
  title: 'Spotlight',
  group: 'Page patterns',
  order: 2,
  summary: 'The one thing on the page worth doing next, on the accent tint: an eyebrow, a title, a sentence and one or two actions. At most one per page.',
  when: [
    'There is a clear next step for this person: register before a deadline, finish an unfinished application, complete the profile.',
    'A dashboard needs a single focal call to action above the regular sections.',
    'A small form that is the point of the page (join a group with a code) can live inside it; fields switch to the base color automatically.',
  ],
  whenNot: [
    ['Telling people about a problem or a change (a warning, an outage)', 'alert', 'Or a [banner](banner) across the page'],
    ['Several destinations of equal weight', 'link-card'],
    ['There is nothing yet and the page explains how to start', 'empty-state'],
    ['Key numbers', 'stat-row'],
    ['Pointing at one control for a first-time tip', 'coachmark'],
    ['A notification that leaves by itself', 'toast'],
  ],
  where: 'Near the top of the main column, inside the first [section](sections) or right under the [page header](page-header), full width of the column. On phones it keeps its place at the top with 20 px padding.',
  anatomy: [
    ['.spotlight', 'Required. Accent tint, 28 px padding (20 px on phones), extra large radius.'],
    ['.spotlight__eyebrow', 'Optional. Small accent label with an icon ("Next step", "Due Friday").'],
    ['.spotlight__title', 'Required. An `h2` or `h3`, Title 2, at most 34 characters per line.'],
    ['.spotlight__body', 'Optional. One or two sentences on why it matters.'],
    ['.spotlight__actions', 'Required. One primary [button](button) and at most one secondary, 14 px above.'],
  ],
  examples: [
    {
      title: 'Next step on a dashboard',
      desc: 'Say what, by when, and why it matters; the primary button names the outcome.',
      html: `<div class="spotlight" style="width: 100%;">
  <span class="spotlight__eyebrow"><span class="ic" aria-hidden="true">event</span>Next step</span>
  <h3 class="spotlight__title">Renew your business registration before 30 November</h3>
  <p class="spotlight__body">UMKM mentoring places go to the earliest registrations.</p>
  <div class="spotlight__actions"><button type="button" class="btn btn--primary">Register now</button><button type="button" class="btn btn--secondary">See the schedule</button></div>
</div>`,
    },
    {
      title: 'With a small form',
      desc: 'A field inside the spotlight keeps the base color, never fill on fill.',
      html: `<div class="spotlight" style="width: 100%;">
  <span class="spotlight__eyebrow"><span class="ic" aria-hidden="true">group</span>Join a group</span>
  <h3 class="spotlight__title">Got a code from your mentor?</h3>
  <div class="spotlight__actions" style="align-items: flex-end;">
    <div class="field" style="flex: 1; min-width: 200px;"><label class="sr-only" for="sp-code">Group code</label><div class="control"><input id="sp-code" placeholder="e.g. UMKM-2026-A" autocapitalize="characters"></div></div>
    <button type="button" class="btn btn--primary">Join group</button>
  </div>
</div>`,
    },
  ],
  motion: [
    'Static by default. If it appears because of something the person did (a step just unlocked), let it enter once with [enter and exit](enter-and-exit): fade and 8 px rise on `--spring-smooth`.',
    'When the step is done, collapse it with `.collapse` (`grid-template-rows` on `--spring-smooth`, 560 ms) rather than letting the page jump. See [height expand](height-expand).',
    'Reduced motion: appear and disappear without travel.',
  ],
  a11y: [
    'Use a real heading for the title (`h2` or `h3` in the page outline) so it is found by heading navigation.',
    'Buttons name outcomes ("Register now"); a lone field still has a label (visually hidden with `.sr-only` is fine when the title says it).',
    'Text on the accent tint uses `--text-strong` and `--text-subtle`; keep custom colors out.',
  ],
  do: [
    'Show one spotlight, and only while the step is relevant.',
    'Include the deadline or the reason in the title.',
  ],
  dont: [
    'Stack two spotlights, or use it for promotions that are not the next step for this person.',
    'Add a shadow, image or gradient to make it louder.',
    'Use it for errors; that is an [alert](alert).',
  ],
  related: ['sections', 'alert', 'empty-state', 'link-card'],
};
