const lc = (icon, eyebrow, title, body, foot) => `<a class="link-card" href="#"><span class="link-card__eyebrow"><span class="ic ic--sm" aria-hidden="true">${icon}</span>${eyebrow}</span><span class="link-card__title">${title}</span><span class="link-card__body">${body}</span><span class="link-card__foot">${foot}<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>`;

export default {
  title: 'Link card',
  group: 'Page patterns',
  order: 3,
  summary: 'A grid of destinations on the quiet fill: each card is one link with an eyebrow, a title, a line of detail and a foot whose chevron leans toward where it goes.',
  when: [
    'A hub page that sends people to a few places of equal weight: my applications, citizen reports, payment history, settings.',
    'Each destination deserves a sentence or a status ("3 files to complete", "Updated today").',
    'Two to about nine destinations; the grid fills columns of at least 300 px.',
  ],
  whenNot: [
    ['Many destinations, or ones that only need a name', 'list', 'Linked rows (`a.lrow`) with a chevron'],
    ['The one next step for this person', 'spotlight'],
    ['A box that shows content and has several actions inside', 'card'],
    ['App navigation that is always there', 'sidebar', 'Or a [top nav](top-nav) or the phone [tab bar](phone-bars)'],
    ['Choosing an option in a form', 'radio-card'],
    ['Key figures', 'stat-row'],
  ],
  where: 'Inside a [section](sections) on hub and dashboard pages, full width of the column. The grid uses `auto-fill` with 300 px minimum columns: one column on phones, two or three on wide screens.',
  anatomy: [
    ['.link-grid', 'Required. The grid, 12 px gaps.'],
    ['a.link-card', 'Required. The whole card is one `<a href>` (or a `<button>` for an in-page action). Quiet fill, large radius, 18 by 20 padding.'],
    ['.link-card__eyebrow', 'Optional. Caption with a small icon: the kind of destination.'],
    ['.link-card__title', 'Required. The destination name, headline size.'],
    ['.link-card__body', 'Optional. One line of detail.'],
    ['.link-card__foot', 'Optional. Status at the bottom (pushed down so feet line up) with a `.lrow__chev` chevron at the end.'],
  ],
  examples: [
    {
      title: 'Where to go',
      desc: 'Hover (with a mouse) tints the card and moves the chevron 3 px toward the destination; pressing sinks it slightly.',
      html: `<div class="link-grid" style="width: 100%;">
  ${lc('assignment', 'Licensing', 'Micro business permit', 'Stage 2: document check by an officer', '3 files to complete')}
  ${lc('receipt_long', 'Payments', 'Regional tax', 'Every bill and receipt so far', 'Updated today')}
  ${lc('campaign', 'Complaints', 'Citizen reports', 'Over 2,000 reports with their follow-up', '18 followed')}
</div>`,
    },
    {
      title: 'Short cards',
      desc: 'Title and foot only, for a settings hub.',
      html: `<div class="link-grid" style="width: 100%;">
  <a class="link-card" href="#"><span class="link-card__title">Profile</span><span class="link-card__foot">Name, photo, address<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
  <a class="link-card" href="#"><span class="link-card__title">Notifications</span><span class="link-card__foot">Email and push<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
  <a class="link-card" href="#"><span class="link-card__title">Bills</span><span class="link-card__foot">Due 31 December<span class="ic lrow__chev" aria-hidden="true">chevron_right</span></span></a>
</div>`,
    },
  ],
  states: [
    ['hover (fine pointer)', 'Background deepens to `--bg-tint-strong`; the chevron moves 3 px right and turns accent.'],
    [':active', 'The card sinks to 0.985 in `--d-instant` (120 ms).'],
    ['focus-visible', 'The system focus ring around the card.'],
  ],
  motion: [
    'Hover: background in `--d-fast` (160 ms) on `--ease-standard`; the chevron `translateX(3px)` on `--spring-snappy` (360 ms). Only on devices with hover and a fine pointer, so touch never sticks in the hover state.',
    'Press: `scale(0.985)` (wide targets barely sink), back on `--spring-snappy`. See [press feedback](press-feedback).',
    'Cards in a grid that loads may enter with [list stagger](list-stagger) once; never on every visit to the page.',
    'Reduced motion: transitions become 120 ms linear; no travel.',
  ],
  a11y: [
    'One link per card: the whole card is the `<a>`, so its name is the text inside. Do not nest other links or buttons in it.',
    'Keep the title first in the reading order after the eyebrow, and short, so the link name starts with the destination.',
    'The chevron is decorative (`aria-hidden`).',
  ],
  do: [
    'Write the foot as a fact about the destination ("3 tasks open").',
    'Keep cards in a grid of the same kind; mix kinds in separate sections.',
  ],
  dont: [
    'Add images, shadows or borders to make one card stand out; use a [spotlight](spotlight) for the one that matters.',
    'Put buttons inside a link card.',
    'Make a link card that is not a link (a `div` gets no hover or press).',
  ],
  related: ['list', 'spotlight', 'card', 'sections'],
};
