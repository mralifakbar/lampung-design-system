const IN = (i) => `style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: ${Math.min(i, 4) * 35}ms;"`;
const RESULT = (i, t, s) => `<a class="lrow" href="#" ${IN(i)}><span class="lrow__body"><span class="lrow__title">${t}</span><span class="lrow__sub">${s}</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>`;
const NOTE = (i, initials, t, s, cls = '') => `<div class="lrow" ${IN(i)}><span class="avatar${cls}" style="--size: 36px;">${initials}</span><span class="lrow__body"><span class="lrow__title">${t}</span><span class="lrow__sub">${s}</span></span></div>`;
const KPI = (i, label, value) => `<article class="kpi" ${IN(i)}><div class="kpi__head"><span class="kpi__label">${label}</span></div><div class="kpi__value">${value}</div></article>`;

export default {
  title: 'List stagger',
  group: 'Motion',
  order: 6,
  summary: 'When a group of items arrives at once, each one follows the one before by 35 ms, fading in from a 4 px blur and a 4 px rise. The whole cascade stays under 400 ms, so the list reads as one arrival with a direction, never as a slow parade.',
  when: [
    'Search results or filter results arriving after the person asked for them.',
    'New notifications or messages that came in together while the panel was closed.',
    'The cards of a dashboard on first load of the session.',
    'The items of a menu or sheet that opened with a list built on the fly (only if they were not already rendered).',
  ],
  whenNot: [
    ['One item joining an existing list', 'enter-and-exit'],
    ['Figures and illustrations appearing as the page scrolls', 'reveal-on-scroll', 'It has its own 30 ms stagger, capped at the fourth item.'],
    ['The same list re-rendering after a sort or a small change', 'motion-principles', 'Do not animate it; just update.'],
    ['Content still loading', 'skeleton'],
    ['A long chat history opening', 'chat-layout', 'Never stagger history.'],
  ],
  where: 'On the direct children of the list that arrived: `.lrow` rows, `.card`s and `.kpi` cards in an `auto-grid`, `.file-row`s. Never on the list container and never on nested parts.',
  examples: [
    {
      title: 'Search results arriving',
      desc: 'Results cascade top to bottom: the first one is readable at once, the last has arrived by 380 ms. Press Replay.',
      stage: 'fill',
      replay: true,
      html: `<div class="docs-col" style="max-width: 440px;">
  <div class="control search"><span class="ic" aria-hidden="true">search</span><input aria-label="Search lessons" value="osmosis"></div>
  <div class="list">
    ${RESULT(0, 'Osmosis and diffusion', 'Biology 101, lesson 6')}
    ${RESULT(1, 'Lab 3: potato osmosis', 'Biology 101, lab')}
    ${RESULT(2, 'Cell membranes', 'Biology 101, lesson 5')}
    ${RESULT(3, 'Quiz 2 review', 'Practice questions')}
    ${RESULT(4, 'Water potential', 'Plant biology, lesson 2')}
  </div>
</div>`,
      code: `<!-- The system has no stagger class yet: the keyframe and tokens are the contract. -->
<a class="lrow" href="…" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 0ms;">…</a>
<a class="lrow" href="…" style="animation: lds-blur-in var(--d-standard) var(--ease-enter) both; animation-delay: 35ms;">…</a>
<!-- delay = min(index, 4) × 35 ms: everything after the fifth item arrives with the fifth -->`,
    },
    {
      title: 'Notifications that came in together',
      desc: 'Opening the panel after a morning away: three new notifications arrive in order, newest first.',
      stage: 'fill',
      replay: true,
      html: `<div class="list" style="width: 100%; max-width: 440px;">
  ${NOTE(0, 'AP', 'Ana Putri commented on your lab report', '2 minutes ago')}
  ${NOTE(1, 'RS', 'Rizal Siregar shared Week 6 notes', '40 minutes ago', ' avatar--gray')}
  ${NOTE(2, 'BK', 'Grades for Quiz 3 are published', '1 hour ago', ' avatar--gray')}
</div>`,
    },
    {
      title: 'Dashboard cards on first load',
      desc: 'KPI cards arrive left to right in reading order. Do this on the first load of a session only; coming back to the page shows them at once.',
      replay: true,
      html: `<div class="auto-grid" style="--min: 150px; width: 100%;">
  ${KPI(0, 'Classes today', '3')}
  ${KPI(1, 'Due this week', '4')}
  ${KPI(2, 'Average grade', '3.62')}
  ${KPI(3, 'Absences', '1')}
</div>`,
    },
  ],
  motion: [
    'Each item: `lds-blur-in` (from `translateY(4px)`, `blur(4px)`, transparent) over `--d-standard` (240 ms) on `--ease-enter`, with `animation-fill-mode: both` so it is hidden until its turn.',
    'Delay: `min(index, 4) × 35 ms`. The fifth and later items share the 140 ms delay, so the cascade ends by 380 ms however long the list is.',
    'Order follows reading order: top to bottom in lists, left to right then down in grids. Newest first in feeds.',
    'Plays once on arrival. Keyframes are fine here because an arrival is not reversed; if the list is replaced again mid-cascade, render the new items and let their own cascade start, do not wait.',
    'Never stagger exits: items leave together in 180 ms on `--ease-exit`, or close their space with [height expand](height-expand).',
    'Reduced motion: the animation runs in 1 ms, so items simply appear together.',
  ],
  a11y: [
    'Content is in the DOM from the start; only its painting is delayed, so screen readers and find-in-page see it immediately.',
    'Announce the result count once ("5 results") in a polite live region; the motion announces nothing.',
    'Keep the total under 400 ms so keyboard users are never waiting to reach an item.',
  ],
  do: [
    'Stagger only things that arrived together because the person asked.',
    'Cap the delay at the fifth item.',
    'Use the same keyframe and tokens as the system (`lds-blur-in`, `--d-standard`, `--ease-enter`).',
  ],
  dont: [
    'Stagger every list on every render, or re-stagger after a sort.',
    'Use delays longer than 35 ms or a cascade longer than 400 ms.',
    'Stagger exits or nested children inside each item.',
  ],
  js: 'None: it is CSS on the items. There is no system class or attribute for it yet, so set the animation inline (or in a framework style prop) as shown. For figures that appear while scrolling, use `data-lds-reveal` with `--i` instead.',
  related: ['enter-and-exit', 'reveal-on-scroll', 'list', 'motion-principles'],
};
