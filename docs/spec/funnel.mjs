const funnel = (steps, label) => {
  const top = steps[0][1];
  return `<ol class="funnel" data-lds-grow aria-label="${label}">
${steps.map(([name, v], i) => {
    const conv = i ? Math.round((v / steps[i - 1][1]) * 100) : null;
    const drop = conv !== null && conv < 40;
    return `  <li class="funnel__row${drop ? ' is-drop' : ''}" style="--v: ${((v / top) * 100).toFixed(1)}%;">
    <div class="funnel__meta"><span class="funnel__label">${name}</span><span><span class="funnel__val">${v.toLocaleString('en-US')}</span>${conv !== null ? `<span class="funnel__conv">${conv}% of the step before</span>` : ''}</span></div>
    <div class="funnel__track" aria-hidden="true"><span class="funnel__bar"></span></div>
  </li>`;
  }).join('\n')}
</ol>`;
};

const signup = [['Visited the course page', 12480], ['Started the free lesson', 5240], ['Finished the free lesson', 3110], ['Created an account', 2290], ['Paid for the course', 610]];
const hiring = [['Applied', 214], ['Passed screening', 96], ['Interviewed', 31], ['Offered', 6]];

export default {
  title: 'Funnel',
  group: 'Charts',
  order: 6.6,
  status: 'new',
  summary: 'The steps of a flow, each with how many reached it and what share of the step before moved on. Centered bars narrow with the count, so the biggest drop is visible at a glance; the words carry the exact numbers.',
  when: [
    'A sequence where each step is a subset of the one before: visit, try, sign up, pay; apply, screen, interview, offer.',
    'Finding the step that loses the most people, to decide what to fix first.',
  ],
  whenNot: [
    ['Categories that are not nested steps', 'ranked-bars'],
    ['Change of one count over time', 'area-chart'],
    ['Parts of one whole', 'percentage-bar'],
    ['The status of one record moving through steps', 'steps'],
  ],
  where: 'In a [chart card](chart-card), half or full width. Three to six steps. Words sit above each bar, so it works at 320 px without change.',
  anatomy: [
    ['ol.funnel', 'Required. An ordered list with an `aria-label`; the order is the meaning.'],
    ['li.funnel__row', 'Required. One step. `--v` is its count as a percent of the first step.'],
    ['.funnel__meta', 'Required. `.funnel__label` (the step), `.funnel__val` (the count) and `.funnel__conv` (share of the step before).'],
    ['.funnel__track > .funnel__bar', 'Required. A 28 px fill track with the bar centered in it; decorative (`aria-hidden`).'],
    ['.is-drop', 'Optional on a row: the step that loses most (or under your threshold); its share turns to danger text.'],
  ],
  examples: [
    {
      title: 'From visit to payment',
      desc: 'Under 40 % moving on marks the step red in words. Bars grow from the center on first view, one after another.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 560px;" aria-labelledby="fn-q">
  <div><div class="chart-card__q" id="fn-q">Where do learners drop off?</div><div class="chart-card__sub">People at each step, 1 to 16 November</div></div>
  ${funnel(signup, 'Sign-up funnel, 1 to 16 November')}
  <div class="chart-card__foot"><span>Biggest loss: account to payment, 27% move on</span></div>
</section>`,
    },
    {
      title: 'A short funnel',
      desc: 'Four steps of a hiring round.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 420px;" aria-labelledby="fn-h">
  <div><div class="chart-card__q" id="fn-h">How many tutors make it through?</div><div class="chart-card__sub">Tutor applications, autumn round</div></div>
  ${funnel(hiring, 'Tutor hiring funnel, autumn round')}
</section>`,
    },
  ],
  variants: [
    ['.is-drop', 'Flags the step with the weakest share; say it in the footer too.'],
    ['--v', 'Bar width: count divided by the first step\'s count.'],
  ],
  states: [
    ['data change', 'Set new `--v` and words: bars move over 480 ms on `--ease-inout`.'],
    ['empty', 'Keep the step names; counts at 0 and one line: "No visits in this period".'],
    ['loading', 'A `.skel` line and a 28 px `.skel` strip per step.'],
  ],
  motion: [
    'First view (`data-lds-grow`): bars grow outward from the center on `--spring-smooth`, 35 ms apart top to bottom.',
    'Later changes: width over `--d-considered` on `--ease-inout`. Hover fades other bars over `--d-fast`.',
    'Reduced motion: drawn at once.',
  ],
  a11y: [
    'An `ol` with `aria-label`, so the steps are announced in order with their counts and shares as text.',
    'The bars are `aria-hidden`; they repeat the numbers.',
    'The weakest step is named in words in the footer, not only by color.',
  ],
  do: [
    'Name steps as what people did ("Created an account").',
    'Show the share of the step before, not of the first step; that is where the decision is.',
  ],
  dont: [
    'Draw trapezoids or 3D cones; centered bars are exact.',
    'Use a funnel for steps people can skip or repeat.',
  ],
  js: 'Optional: `data-lds-grow` on the list plays the first-view entrance.',
  related: ['ranked-bars', 'percentage-bar', 'chart-card', 'steps'],
};
