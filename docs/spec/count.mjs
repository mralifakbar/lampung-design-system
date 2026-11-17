export default {
  title: 'Count',
  group: 'Feedback',
  order: 9,
  summary: 'A small red pill with a number of things waiting for the person: unread messages, pending requests. It means "act on these", so use it only for that.',
  when: [
    'Unread or pending items that need the person: 3 new messages, 2 requests to approve.',
    'At the trailing end of a navigation row or a settings row that leads to those items.',
  ],
  whenNot: [
    ['A count inside a tab label', 'tabs', 'Use `.tabs__count`, which is quiet grey'],
    ['A count inside an app shell section heading', 'app-shell'],
    ['A state or a type in words', 'badge'],
    ['A system or connection state', 'status-dot'],
    ['A key figure on a page (credits, score)', 'stat-row'],
  ],
  where: 'At the end of the row or control that leads to the items, before the chevron. In a navigation row, a sidebar item or a menu item. One count per destination; never on content itself.',
  anatomy: [
    ['.count', 'Required. 18 px pill, danger fill, white 11 px semibold tabular figures, 18 px minimum width so one digit is a circle.'],
    ['.sr-only', 'Recommended. Visually hidden words that say what the number counts.'],
  ],
  examples: [
    {
      title: 'In navigation rows',
      desc: 'The count sits before the chevron. Cap it at 99+.',
      stage: 'block',
      html: `<div class="list" style="max-width: 420px;">
  <a class="lrow lrow--icon" href="#messages"><span class="lrow__icon" style="background: var(--tile-blue);"><span class="ic" aria-hidden="true">chat</span></span><span class="lrow__body"><span class="lrow__title">Messages</span></span><span class="count">3<span class="sr-only"> unread</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#requests"><span class="lrow__icon" style="background: var(--tile-orange);"><span class="ic" aria-hidden="true">person_add</span></span><span class="lrow__body"><span class="lrow__title">Registration requests</span></span><span class="count">99+<span class="sr-only"> waiting</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  <a class="lrow lrow--icon" href="#notifications"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Notifications</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
</div>`,
    },
    {
      title: 'Next to a label',
      desc: 'Inside a flex container (a button, a row) the pill keeps its shape.',
      html: `<div class="docs-row">
  <button class="btn btn--gray btn--md">Inbox<span class="count">12<span class="sr-only"> unread</span></span></button>
</div>`,
    },
  ],
  states: [
    ['zero', 'Remove the count entirely; never show "0".'],
    ['over 99', 'Write "99+".'],
  ],
  motion: [
    'None at rest. When the number changes while visible, a [rolling number](rolling-number) can slide the digits on `--spring-smooth`; a count appearing from zero may pop in with `lds-pop-in` over `--d-snappy` once.',
    'Never pulse or bounce a count to get attention.',
  ],
  a11y: [
    'A bare number means nothing out of context: add visually hidden words inside it (`<span class="sr-only"> unread</span>`) or include them in the row\'s accessible name.',
    'When a count increases while the person is on the page, announce it politely only if it matters (a `role="status"` line "2 new messages"); do not make the count itself a live region.',
    'Red is not the only signal; the number and the words carry it.',
  ],
  do: [
    'Use it only for things that wait for the person.',
    'Clear it as soon as the person has seen the items.',
    'Place it inside a flex parent (row, button) so it keeps its pill shape.',
  ],
  dont: [
    'Use it for totals ("42 services"); write the total as text.',
    'Show a count on more than two or three destinations at once.',
    'Use it as a dot without a number.',
  ],
  related: ['badge', 'status-dot', 'tabs', 'list'],
};
