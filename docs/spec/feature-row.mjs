export default {
  title: 'Feature row',
  group: 'Marketing',
  order: 3,
  status: 'new',
  summary: 'One feature told beside its proof: a short title, a paragraph and a few points on one side, a live stage with the feature working on the other. Rows alternate sides with `feature--reverse`.',
  when: [
    'Explaining one feature of a product on a landing page, next to the feature running.',
    'Two to four features in a row of sections, where each needs its own demo.',
  ],
  whenNot: [
    ['Many small features of equal weight', 'layout-primitives', 'Use an `auto-grid` of short text blocks; not every feature needs a stage.'],
    ['Destinations people can open', 'link-card'],
    ['The first screen of the page', 'hero'],
  ],
  where: 'Inside a [marketing section](marketing-section). From 900 px the copy takes 5 of 12 columns and the stage 7 (reversed with `feature--reverse`); below that the copy comes first and the stage follows. Consecutive rows are 56 to 112 px apart.',
  anatomy: [
    ['.feature', 'Required. The two-column grid.'],
    ['.feature--reverse', 'Stage first on wide screens.'],
    ['.feature__copy', 'Required. Eyebrow, title, body and points.'],
    ['h2/h3.feature__title', 'Required. 24 to 32 px.'],
    ['p.feature__body', 'The paragraph, max 52 characters a line.'],
    ['ul.feature__points', 'Two or three facts, each `li` holding an icon and the text in a `span`.'],
    ['.feature__stage', 'Required. The proof: live components on the quiet fill. Surfaces placed directly inside it (lists, key-value, code blocks, tool calls) switch to the base color, never fill on fill. Also usable on its own as a demo stage, for example in a hero.'],
    ['.feature__stage--flush', 'No padding, for a stage that holds one full-bleed component.'],
    ['.feature__caption', 'A footnote that says what can be tried or that the content is an example.'],
  ],
  examples: [
    {
      title: 'Copy beside a live stage',
      desc: 'The stage holds a real segmented control and a code block; switch the platform.',
      stage: 'block',
      html: `<div class="feature" style="width: 100%;">
  <div class="feature__copy">
    <span class="msec__eyebrow"><span class="ic ic--sm" aria-hidden="true">code</span>Exports</span>
    <h3 class="feature__title">Your grades, in the format the office asks for.</h3>
    <p class="feature__body">Export a term as a spreadsheet, a PDF report or a file for the national records system.</p>
    <ul class="feature__points">
      <li><span class="ic" aria-hidden="true">check_circle</span><span>Columns match the official template.</span></li>
      <li><span class="ic" aria-hidden="true">check_circle</span><span>Exports run in the background.</span></li>
    </ul>
  </div>
  <div class="feature__stage">
    <div class="seg" role="group" aria-label="Format" data-lds-segmented style="width: 240px;"><span class="seg__thumb"></span><button class="seg__btn" aria-pressed="true">CSV</button><button class="seg__btn" aria-pressed="false">PDF</button></div>
    <div class="codeblock"><div class="codeblock__bar"><span>grades-term-1.csv</span></div><pre>student_id,name,grade
2026001,Siti Rahmawati,A
2026002,Budi Santoso,B+</pre></div>
    <span class="feature__caption">Example data.</span>
  </div>
</div>`,
    },
    {
      title: 'Reversed',
      desc: 'Stage first on wide screens; the copy still comes first for screen readers and on phones.',
      stage: 'block',
      html: `<div class="feature feature--reverse" style="width: 100%;">
  <div class="feature__copy">
    <h3 class="feature__title">Reminders that stop when the work is in.</h3>
    <p class="feature__body">Students get one reminder a day before the deadline, and none once they submit.</p>
  </div>
  <div class="feature__stage">
    <label class="switch"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="bell ic" aria-hidden="true">notifications</span>Daily reminder</label>
  </div>
</div>`,
    },
  ],
  variants: [
    ['feature--reverse', 'Stage on the left from 900 px.'],
    ['feature__stage--flush', 'Stage without padding.'],
  ],
  motion: [
    'The copy may fade up once with [reveal on scroll](reveal-on-scroll). The stage only moves when someone uses what is in it.',
    'A view inside the stage that swaps (a code sample per platform) uses [view swap](view-swap): the new content rises 4 px from a 4 px blur over 240 ms on `--ease-enter`.',
  ],
  a11y: [
    'The copy comes first in the DOM in both directions; `feature--reverse` only changes the visual order on wide screens.',
    'Every control in the stage keeps its label. Say in `feature__caption` when content is an example.',
  ],
  do: [
    'Put one working feature in each stage.',
    'Wrap point text in a `span` so inline code wraps with it.',
  ],
  dont: [
    'Use a screenshot when the component can run.',
    'Make every feature a row; a list carries the smaller ones.',
  ],
  related: ['marketing-section', 'hero', 'code-block', 'view-swap'],
};
