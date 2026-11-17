export default {
  title: 'Compare table',
  group: 'Marketing',
  order: 5,
  summary: 'Plans as columns and features as rows, grouped by topic, with a check, a dash icon or a short value in each cell. It scrolls sideways in its own box while the feature names stay put.',
  when: [
    'Under the plan cards on a fees page, for people who want every difference before they choose.',
    'Comparing two to four kinds of a service by the same list of features.',
  ],
  whenNot: [
    ['Choosing a plan', 'plans'],
    ['Records compared by attributes (applications, permits)', 'table'],
    ['Label and value pairs of one item', 'key-value'],
  ],
  where: 'Under [plans](plans), often behind a "Compare every feature" button that opens it in place with the collapse recipe. Full content width; from 620 px it fits, below that it scrolls inside `.compare-box` with the feature column sticky on the left.',
  anatomy: [
    ['.compare-box', 'Required. The scroll box (positioned, so screen-reader-only text stays inside it).'],
    ['table.compare', 'Required. A real table with a `caption`.'],
    ['thead th', 'The plan names; `.compare__price` under each name.'],
    ['tr.compare__group > th[scope="rowgroup"]', 'A group heading row spanning all columns.'],
    ['tbody th[scope="row"]', 'The feature name.'],
    ['td', 'A `check` icon, a `remove` icon with `.compare__no`, or a short value ("All 143", "3 to 50"). Icons carry `.sr-only` text.'],
    ['.is-featured', 'On every cell of the recommended plan\'s column: the quiet fill, rounded at the ends.'],
  ],
  examples: [
    {
      title: 'Two groups, three plans',
      desc: 'City library membership as the example. Narrow the window: the plans scroll under the feature names.',
      stage: 'block',
      html: `<div class="compare-box" data-lds-fade style="width: 100%;">
  <table class="compare">
    <caption>Compare membership types</caption>
    <thead><tr><th scope="col">Feature</th><th scope="col">General<span class="compare__price">Free</span></th><th scope="col" class="is-featured">Student<span class="compare__price">Rp 10.000 a year</span></th><th scope="col">Family<span class="compare__price">Rp 25.000 a year</span></th></tr></thead>
    <tbody>
      <tr class="compare__group"><th scope="rowgroup" colspan="4">Borrowing</th></tr>
      <tr><th scope="row">Books on loan at once</th><td>2</td><td class="is-featured">5</td><td>10</td></tr>
      <tr><th scope="row">Group reading room</th><td><span class="ic compare__no" aria-hidden="true">remove</span><span class="sr-only">Not included</span></td><td class="is-featured"><span class="ic" aria-hidden="true">check</span><span class="sr-only">Included</span></td><td><span class="ic" aria-hidden="true">check</span><span class="sr-only">Included</span></td></tr>
      <tr class="compare__group"><th scope="rowgroup" colspan="4">Help</th></tr>
      <tr><th scope="row">Librarian help by email</th><td><span class="ic compare__no" aria-hidden="true">remove</span><span class="sr-only">Not included</span></td><td class="is-featured">2 business days</td><td>1 business day</td></tr>
    </tbody>
  </table>
</div>`,
    },
  ],
  states: [
    ['narrow', 'Below 760 px the feature column is sticky on the canvas color; [scroll fades](scroll-fades) (`data-lds-fade`) show there is more to the right.'],
    ['period change', 'Inside a `[data-lds-billing]` element the header prices can morph with the period like the plan cards.'],
  ],
  motion: [
    'Static. Opened in place with the collapse recipe (`grid-template-rows` 0fr to 1fr on `--spring-smooth`), never a page jump.',
  ],
  a11y: [
    'A real `<table>` with a caption, `scope="col"` on plan headers, `scope="row"` on feature names and `scope="rowgroup"` on group rows.',
    'Check and dash icons are `aria-hidden` with "Included" or "Not included" in `.sr-only` text.',
    'The scroll box is reachable by keyboard through the cells it contains; it never makes the page scroll sideways.',
  ],
  do: [
    'Write limits as words or numbers ("3 to 50") instead of a check when they differ.',
    'Group rows by what people ask about: borrowing, rooms, opening hours, help.',
  ],
  dont: [
    'Use color alone for included and not included.',
    'Repeat every line of the plan cards; the table is for the full list.',
  ],
  related: ['plans', 'table', 'scroll-fades', 'height-expand'],
};
