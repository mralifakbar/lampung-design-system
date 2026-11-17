const max = (rows) => Math.max(...rows.map((r) => r.v));
const pct = (v, m) => `${((v / m) * 100).toFixed(1)}%`;

const sources = [
  { name: 'Search', icon: 'search', v: 4210, d: '+12%', good: true },
  { name: 'Newsletter', icon: 'mail', v: 2380, d: '+4%', good: true },
  { name: 'Kelurahan websites', icon: 'location_city', v: 1710, d: '−6%', good: false },
  { name: 'Social posts', icon: 'share', v: 960, d: '+21%', good: true },
  { name: 'Direct', icon: 'link', v: 640, d: '−2%', good: false },
];
const srcRows = sources.map((s, i) => `  <div class="hbar${i === 0 ? ' is-top' : ''}"><span class="hbar__label"><span class="hbar__media" aria-hidden="true"><span class="ic">${s.icon}</span></span><span>${s.name}</span></span><span class="hbar__track"><span class="hbar__fill" style="--v: ${pct(s.v, max(sources))};"></span></span><span class="hbar__val">${s.v.toLocaleString('en-US')}<span class="delta delta--${s.good ? 'good' : 'bad'}${s.good ? '' : ' delta--down'}"><span class="ic" aria-hidden="true">arrow_upward</span>${s.d.replace(/^[+−]/, '')}<span class="sr-only">${s.good ? ' up' : ' down'}</span></span></span></div>`).join('\n');

const people = [
  ['Nadia Putri', 'NP', 'Business permit counter', 96], ['Rizky Hartono', 'RH', 'KTP counter', 91], ['Mei Lin Tan', 'ML', 'Business permit counter', 88],
  ['Dimas Saputra', 'DS', 'Complaints desk', 84], ['Ayu Lestari', 'AL', 'KTP counter', 79],
];
const board = people.map(([n, ini, c, v], i) => `  <div class="hbar"><span class="hbar__label"><span class="hbar__rank">${i + 1}</span><span class="avatar avatar--gray hbar__media" aria-hidden="true">${ini}</span><span><span>${n}</span><span class="hbar__sub">${c}</span></span></span><span class="hbar__track"><span class="hbar__fill" style="--v: ${v}%;"></span></span><span class="hbar__val">${v}</span></div>`).join('\n');

const pages = { a: [['/services/e-ktp', 3120], ['/levy-rates', 2210], ['/services/business-permit', 1640], ['/news/posyandu-schedule', 980], ['/about', 410]], b: [['/services/e-ktp', 2480], ['/services/business-permit', 2050], ['/levy-rates', 1730], ['/news/service-holiday', 1210], ['/news/posyandu-schedule', 640]] };
const pm = Math.max(...pages.a.map((p) => p[1]), ...pages.b.map((p) => p[1]));
const insideRows = pages.a.map(([p, v], i) => `  <div class="hbar${i === 0 ? ' is-top' : ''}"><span class="hbar__track"><span class="hbar__fill" style="--v: ${pct(v, pm)};" data-a="${pct(v, pm)}" data-b="${pct(pages.b[i][1], pm)}"></span><span class="hbar__label" data-a="${p}" data-b="${pages.b[i][0]}">${p}</span></span><span class="hbar__val" data-a="${v.toLocaleString('en-US')}" data-b="${pages.b[i][1].toLocaleString('en-US')}">${v.toLocaleString('en-US')}</span></div>`).join('\n');
const pick = (k) => `onclick="this.closest('.chart-card').querySelectorAll('[data-${k}]').forEach((n) => n.classList.contains('hbar__fill') ? n.style.setProperty('--v', n.dataset.${k}) : (n.textContent = n.dataset.${k}))"`;

export default {
  title: 'Ranked bars',
  group: 'Charts',
  order: 3.5,
  summary: 'Rows of a label, a horizontal bar and its value, sorted longest first: top sources, top pages, best scores. Long labels stay readable because they sit beside (or inside) the bar instead of under it, and every row shares one grid so bars and values line up.',
  when: [
    'Ranking 3 to 10 named things by one value: traffic sources, pages, services, officers, districts.',
    'Category names are long or many ("Kelurahan websites", "/services/business-permit"), which vertical bars would have to rotate.',
    'A leaderboard: rank, who, and the score, with the bar as a quick sense of the gaps.',
  ],
  whenNot: [
    ['Categories that have an order of their own (weekdays, months)', 'bar-chart'],
    ['Progress of each item toward its own goal', 'target-bar'],
    ['Parts that add up to one whole', 'percentage-bar'],
    ['Many records compared on several attributes', 'table'],
    ['Steps of a flow where each keeps a share of the one before', 'funnel'],
  ],
  where: 'In a [chart card](chart-card), half width on a dashboard. Under 480 px the bar moves under its label and value, full width. Set `--label-w` on `.hbars` to change the label column (default 140 px).',
  anatomy: [
    ['.hbars', 'Required. The grid: label column, bar column, value column. `role="list"` when the rows are a ranking.'],
    ['.hbar', 'Required. One row; a subgrid of `.hbars`, so values line up across rows. `.is-top` marks the leader.'],
    ['.hbar__label', 'Required. The name; may start with `.hbar__rank`, `.hbar__media` (an icon tile or `.avatar`) and carry a `.hbar__sub` line.'],
    ['.hbar__track > .hbar__fill', 'Required. 10 px track; `--v` sets the fill as a percent of the largest value.'],
    ['.hbar__val', 'Required. The value, tabular; may hold a [trend delta](trend-delta).'],
    ['.hbars--inside', 'Variant. 36 px tint bars with the label inside, for long labels in narrow cards.'],
    ['.hbars--muted', 'Variant. Every bar but `.is-top` recedes to the tint.'],
  ],
  examples: [
    {
      title: 'Top sources with their change',
      desc: 'Icon, name, bar, visits and the change against last month. Point at a row to bring it forward. Bars grow in on first view.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 560px;" aria-labelledby="rb-src">
  <div><div class="chart-card__q" id="rb-src">Where do service portal visitors come from?</div><div class="chart-card__sub">Visits by source, November</div></div>
  <div class="hbars" role="list" data-lds-grow aria-label="Visits by source">
${srcRows.replace(/<div class="hbar/g, '<div role="listitem" class="hbar')}
  </div>
</section>`,
    },
    {
      title: 'Leaderboard',
      desc: 'Rank, avatar and service unit under the name; one quiet color so the gaps carry the story.',
      stage: 'block',
      replay: true,
      html: `<section class="chart-card" style="max-width: 560px;" aria-labelledby="rb-lead">
  <div><div class="chart-card__q" id="rb-lead">Which officers do citizens rate best?</div><div class="chart-card__sub">Citizen satisfaction out of 100, top five, this quarter</div></div>
  <div class="hbars" role="list" data-lds-grow style="--label-w: 220px;" aria-label="Top five satisfaction scores">
${board.replace(/<div class="hbar/g, '<div role="listitem" class="hbar')}
  </div>
</section>`,
    },
    {
      title: 'Labels inside, switching the period',
      desc: 'Long paths fit inside tint bars. Switch the period: bars move to their new lengths over 480 ms.',
      stage: 'block',
      html: `<section class="chart-card" style="max-width: 480px;" aria-labelledby="rb-pages">
  <div class="chart-card__head"><div class="chart-card__titles"><div class="chart-card__q" id="rb-pages">Which pages get read?</div><div class="chart-card__sub">Views per page</div></div>
    <div class="chart-card__actions"><div class="seg chart-card__range" role="group" aria-label="Period" data-lds-segmented style="width: 200px;"><span class="seg__thumb"></span><button type="button" class="seg__btn" aria-pressed="true" ${pick('a')}>November</button><button type="button" class="seg__btn" aria-pressed="false" ${pick('b')}>October</button></div></div>
  </div>
  <div class="hbars hbars--inside" role="list" aria-label="Views per page">
${insideRows.replace(/<div class="hbar/g, '<div role="listitem" class="hbar')}
  </div>
</section>`,
      code: `<div class="hbars hbars--inside" role="list" aria-label="Views per page">
  <div role="listitem" class="hbar is-top"><span class="hbar__track"><span class="hbar__fill" style="--v: 100%;"></span><span class="hbar__label">/services/e-ktp</span></span><span class="hbar__val">3,120</span></div>
  …
</div>`,
    },
  ],
  variants: [
    ['.hbar__media', 'An icon tile (sources, products) or an `.avatar` (people) before the name.'],
    ['.hbar__rank', 'Position number for leaderboards.'],
    ['.hbar__sub', 'A second line under the name: service unit, category, visits.'],
    ['.hbars--inside', 'Label inside a 36 px tint bar; the leader gets a 3 px accent edge.'],
    ['.hbars--muted', 'Only the leader in the series color.'],
    ['--label-w', 'Width of the label column on `.hbars`.'],
  ],
  states: [
    ['hover', 'The row under the pointer stays, the others fade to 55 %.'],
    ['data change', 'Set new `--v` values: fills move over 480 ms on `--ease-inout`. Re-sort only after the move, or not at all while someone reads.'],
    ['loading', 'Five `.skel` rows: a label block and a 10 px strip.'],
    ['empty', 'Keep the title; one line saying no visits came in for the period.'],
  ],
  motion: [
    'First view (`data-lds-grow`): fills grow from zero on `--spring-smooth` (560 ms), 35 ms apart from the top row.',
    'Value changes: width over `--d-considered` on `--ease-inout`, from the current width.',
    'Hover fade over `--d-fast`. Reduced motion: values switch in 120 ms, no stagger.',
  ],
  a11y: [
    'Use `role="list"` on `.hbars` and `role="listitem"` on rows when the order is the point; the label and value are real text, so the list reads "Search, 4,210, 12% up".',
    'The bar is decoration on top of the value; no extra label is needed.',
    'A delta carries "up" or "down" in `.sr-only` text.',
  ],
  do: [
    'Sort longest first; say the period in the subtitle.',
    'Scale every bar to the largest value in the set, or to a fixed maximum such as 100 for scores.',
  ],
  dont: [
    'Give every bar its own color.',
    'Cut the bar axis above zero.',
    'Show more than ten rows; add a link to the full table instead.',
  ],
  js: 'Optional: `data-lds-grow` on `.hbars` (or its card) plays the first-view entrance. Values change by setting `--v` on each fill.',
  related: ['bar-chart', 'target-bar', 'funnel', 'chart-card'],
};
