import { wave, fmt } from './_chart-data.mjs';

// Sparkline path in a 240 x 52 box (stretched to the card width; the stroke does not scale)
const spark = (vals, label) => {
  const lo = Math.min(...vals), hi = Math.max(...vals), n = vals.length;
  const pts = vals.map((v, i) => [(i * 240) / (n - 1), 46 - ((v - lo) / (hi - lo || 1)) * 38]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return `<svg class="kpi__spark" viewBox="0 0 240 52" preserveAspectRatio="none" role="img" aria-label="${label}"><path class="series-area" d="${line} L240 52 L0 52 Z"></path><path class="series-line" d="${line}"></path></svg>`;
};
const minibars = (vals, label) => {
  const hi = Math.max(...vals);
  return `<div class="kpi__bars" role="img" aria-label="${label}">${vals.map((v, i) => `<i${i === vals.length - 1 ? ' class="is-on"' : ''} style="--h: ${Math.round((v / hi) * 100)}%;"></i>`).join('')}</div>`;
};
const up = (t, tone = 'good') => `<span class="delta delta--pill delta--${tone}"><span class="ic" aria-hidden="true">arrow_upward</span>${t}<span class="sr-only"> up</span></span>`;
const down = (t, tone = 'good') => `<span class="delta delta--pill delta--down delta--${tone}"><span class="ic" aria-hidden="true">arrow_upward</span>${t}<span class="sr-only"> down</span></span>`;
const more = (id, name) => `<div style="position: relative; margin-left: auto;">
      <button class="icon-btn" aria-label="More actions for ${name}" aria-haspopup="menu" aria-expanded="false" data-lds-menu="${id}"><span class="ic" aria-hidden="true">more_horiz</span></button>
      <div class="menu menu--right" id="${id}" role="menu" aria-label="${name}" style="top: calc(100% + 6px); right: 0;">
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">bar_chart</span>Open report</button>
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Download CSV</button>
      </div>
    </div>`;

const rev = wave(30, { base: 1600, trend: 0.3, seed: 4, round: 10 });
const signups = wave(14, { base: 38, trend: 0.4, week: 0.25, seed: 8 });
const refunds = wave(12, { base: 9, trend: -0.45, seed: 6 });

const row = `<div class="auto-grid" style="--min: 220px;" data-lds-grow>
  <article class="kpi" aria-labelledby="kpi-rev">
    <div class="kpi__head"><span class="kpi__label" id="kpi-rev">Course sales</span>${more('kpi-rev-menu', 'Course sales')}</div>
    <div class="kpi__value">$48,210</div>
    <div class="kpi__meta">${up('12.4%')}<span>from $42,890 in October</span></div>
    ${spark(rev, 'Daily sales over 30 days, rising')}
  </article>
  <article class="kpi" aria-labelledby="kpi-sign">
    <div class="kpi__head"><span class="kpi__label" id="kpi-sign">New sign-ups</span></div>
    <div class="kpi__value">${fmt(632)}</div>
    <div class="kpi__meta">${up('8%')}<span>this week</span></div>
    ${minibars(signups, 'Sign-ups per day over 14 days; today is the highest')}
  </article>
  <article class="kpi" aria-labelledby="kpi-ref">
    <div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">receipt_long</span></span><span class="kpi__label" id="kpi-ref">Refund requests</span></div>
    <div class="kpi__value">14</div>
    <div class="kpi__meta">${down('36%')}<span>fewer than last month</span></div>
  </article>
  <article class="kpi" aria-labelledby="kpi-time">
    <div class="kpi__head"><span class="kpi__icon" aria-hidden="true"><span class="ic">schedule</span></span><span class="kpi__label" id="kpi-time">Average reply time</span></div>
    <div class="kpi__value">3.2<small>hours</small></div>
    <div class="kpi__meta">${up('0.6 h', 'bad')}<span>slower than last week</span></div>
  </article>
</div>`;

const strip = (n, items) => `<div class="kpi-grid-wrap"><div class="kpi-grid" style="--n: ${n};">
${items.map(([label, value, delta, note]) => `  <div class="kpi"><div class="kpi__label">${label}</div><div class="kpi__value">${value}</div><div class="kpi__meta">${delta}<span>${note}</span></div></div>`).join('\n')}
</div></div>`;

export default {
  title: 'KPI card',
  group: 'Data display',
  order: 3.5,
  summary: 'One metric on a dashboard: what it is, its value, how it changed against a stated baseline, and optionally its recent shape as a sparkline or mini bars. The value is the point; the change always says what it is compared with.',
  when: [
    'The first row of a dashboard: three to six metrics people check every visit (sales, sign-ups, refunds, reply time).',
    'A metric whose recent shape matters as much as its value: add a sparkline (continuous) or mini bars (per day or week).',
    'Several metrics of one subject joined into a strip (`.kpi-grid`) at the top of an analytics page.',
  ],
  whenNot: [
    ['Figures that summarize a page, with no change to report', 'stat-row', 'A row of plain figures is quieter and needs no cards.'],
    ['A metric with a question and a longer trend the reader studies', 'sparkline-stat'],
    ['The reader needs values at specific dates', 'area-chart'],
    ['Progress toward a goal', 'target-bar'],
  ],
  where: 'At the top of a dashboard in an `auto-grid` (`--min: 220px`), or as one `.kpi-grid` strip. On phones cards stack full width; a strip goes to two columns under 760 px of its container and one under 400 px. Never more than six in a row.',
  anatomy: [
    ['.kpi', 'Required. `article` (or `a.kpi--link` when the whole card opens a report). Base background, `--line` ring, 16 px padding, 16 px radius.'],
    ['.kpi__head', 'Required. `.kpi__label` (what is measured), optional `.kpi__icon` before it and one menu `.icon-btn` after it.'],
    ['.kpi__value', 'Required. 28 px tabular figure; a unit in `small`.'],
    ['.kpi__meta', 'Recommended. A [trend delta](trend-delta) and the baseline in words ("from $42,890 in October").'],
    ['svg.kpi__spark', 'Optional. A full-bleed sparkline along the bottom edge: `.series-area` and `.series-line` in a 240 × 52 viewBox, `preserveAspectRatio="none"`. `role="img"` with the trend in words.'],
    ['.kpi__bars', 'Optional. Mini bars, one `i` per period with `--h` as a percent; `.is-on` marks the current one.'],
    ['.kpi-grid-wrap > .kpi-grid', 'Joins cards into one ringed block with hairlines between them; `--n` sets the columns (2, 3, 4 or 6 so rows fill).'],
  ],
  examples: [
    {
      title: 'A dashboard\'s first row',
      desc: 'Sparkline, mini bars, and two cards with an icon. The color of each change follows its meaning: fewer refunds is good, a slower reply is bad. The bottoms grow in on first view.',
      stage: 'block',
      replay: true,
      html: row,
    },
    {
      title: 'Joined strip',
      desc: 'Four metrics of one page in one block. Resize the window: four columns, then two, then one.',
      stage: 'block',
      html: strip(4, [
        ['Visitors', '18,240', up('6.1%'), 'from 17,190'],
        ['Pages per visit', '3.4', up('0.2'), 'from 3.2'],
        ['Bounce rate', '41%', down('3 pts'), 'from 44%'],
        ['Time on page', '2m 48s', down('9s', 'bad'), 'from 2m 57s'],
      ]),
    },
    {
      title: 'The whole card opens the report',
      desc: 'When a card leads to one place, make the card the link. It sinks slightly on press.',
      html: `<a class="kpi kpi--link" href="#kpi-link" id="kpi-link" style="width: 260px;">
  <div class="kpi__head"><span class="kpi__label">Open support tickets</span><span class="ic" aria-hidden="true" style="color: var(--text-faint);">chevron_right</span></div>
  <div class="kpi__value">27</div>
  <div class="kpi__meta">${down('5')}<span>since Monday</span></div>
</a>`,
    },
  ],
  variants: [
    ['.kpi__spark', 'Continuous measure (sales, visitors): a filled line, no axes, no dots.'],
    ['.kpi__bars', 'Counted per period (sign-ups per day): mini bars with the current one in the series color.'],
    ['.kpi__icon', 'A quiet glyph tile that helps scanning a long row; not a colored tile.'],
    ['.kpi--link', 'The card is one link to the metric\'s report.'],
    ['.kpi-grid', 'Joined strip. `--n: 2 | 3 | 4 | 6`.'],
  ],
  states: [
    ['loading', 'A `.skel` line for the label, a 28 px block for the value, one for the change; the card keeps its height.'],
    ['no baseline', 'Leave out the delta and say why in the meta ("First month").'],
    ['error', 'The value stays empty and the meta says "Could not load" with a plain Try again button.'],
    ['value changed live', 'Swap the figure with [rolling number](rolling-number); the delta rises in once.'],
  ],
  motion: [
    'First view (`data-lds-grow` on the row or the card): the sparkline wipes in from the left over 1 s on `--ease-inout`; mini bars rise from the baseline on `--spring-smooth`, 25 ms apart.',
    'Link cards sink to 98.5 % in 90 ms on press and return on `--spring-snappy`.',
    'Reduced motion: everything is drawn at once.',
  ],
  a11y: [
    'Each card is an `article` labelled by its `.kpi__label` (`aria-labelledby`), so a screen reader lists the metrics by name.',
    'The delta carries the direction in words (`.sr-only` "up" / "down"); color only repeats it.',
    'Sparklines and mini bars are `role="img"` with the trend in words; they are never the only place a value lives.',
    'The menu button names its metric: "More actions for Course sales".',
  ],
  do: [
    'Say what the change is compared with, in the meta.',
    'Color the change by whether it is good, not by its direction.',
    'Keep the same anatomy across one row: all with a sparkline or none.',
  ],
  dont: [
    'Put a chart with axes in a KPI card; that is a [chart card](chart-card).',
    'Fill KPI cards with a color or put white text on a hue; the card stays on the base surface.',
    'Show a percentage change on a base under 20; give the absolute change.',
  ],
  js: 'Optional: `data-lds-grow` on the card or its grid plays the first-view entrance. Everything else is CSS.',
  related: ['stat-row', 'sparkline-stat', 'chart-card', 'trend-delta'],
};
