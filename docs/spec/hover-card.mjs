export default {
  title: 'Hover card',
  group: 'Overlays',
  order: 10,
  summary: 'A preview card under a link after a 600 ms hover or on focus: who a person is, what a course covers. It saves a click; it never holds the only copy of anything.',
  when: [
    'A mention or link to a person, course or document where a quick look saves opening it: @lecturer, a course code in a table.',
    'Dense lists where people scan many links and want context before choosing one.',
  ],
  whenNot: [
    ['A one-line name or shortcut for a control', 'tooltip'],
    ['Content people need to click into or edit', 'popover', 'A popover opens on click and stays until dismissed'],
    ['Commands on the item', 'dropdown-menu'],
    ['Touch-first screens', 'sheet', 'There is no hover on touch; open a sheet or the page on tap'],
  ],
  where: '10 px below the link, aligned to its left edge, 280 px wide. Leave room below it; it does not flip.',
  anatomy: [
    ['.tip-host', 'Required. Wraps the link and the card; shows the card on hover and focus.'],
    ['a.link', 'Required. The trigger: a real link to the full page.'],
    ['.hovercard', 'Required. The card: 280 px, 16 px padding, elevated. Content is short: a title, one line, maybe an avatar.'],
  ],
  examples: [
    {
      title: 'Lecturer mention',
      desc: 'Hover or tab to the name: the card waits 600 ms, then rises in.',
      height: 200,
      html: `<p class="section__sub" style="align-self: flex-start;">Questions about the lab go to
  <span class="tip-host"><a class="link" href="#hc" aria-describedby="hc-1">Dr. Ayu Lestari</a><span class="hovercard" role="tooltip" id="hc-1"><span class="card__title" style="display: block;">Dr. Ayu Lestari</span><span class="card__sub" style="display: block;">Lecturer, Faculty of Computer Science. Office hours Tuesday 13:00 to 15:00.</span></span></span>
  before Friday.</p>`,
    },
    {
      title: 'Course code in a table cell',
      desc: 'A short preview with an avatar-like mark.',
      height: 200,
      html: `<span class="tip-host" style="align-self: flex-start;"><a class="link" href="#hc" aria-describedby="hc-2">CS 2104</a><span class="hovercard" role="tooltip" id="hc-2"><span class="cluster" style="--gap: 12px; flex-wrap: nowrap;"><span class="avatar avatar--sq" aria-hidden="true">DB</span><span><span class="card__title" style="display: block;">Database Systems</span><span class="card__sub" style="display: block;">3 credits · 48 students</span></span></span></span></span>`,
    },
  ],
  variants: [
    ['.hovercard', 'Opens under the trigger, aligned to its start edge. Width 280 px, never wider than the screen minus 32 px.'],
    ['.hovercard--end', 'Aligned to the trigger\'s end edge. Use it when the trigger sits in the right half of its column, so the card opens toward the free space instead of past the edge.'],
  ],
  states: [
    [':hover / :focus-within', 'Shown after 600 ms; stays while the pointer is over the link or the card.'],
    ['leaving', 'Hides after 150 ms, so the pointer can travel from the link to the card.'],
  ],
  motion: [
    'In: waits 600 ms, then opacity over `--d-fast` on `--ease-enter` and from `translateY(-4px) scale(0.97)` on `--spring-smooth`, growing from the top left.',
    'Out: after a 150 ms grace, 120 ms on `--ease-exit`.',
    'Reduced motion: the delays stay, transitions drop to 120 ms linear.',
  ],
  a11y: [
    'The link works on its own and goes to the full page; the card is a preview.',
    'It shows on keyboard focus too. Link it with `aria-describedby` so the summary is read after the link name.',
    'Keep interactive elements out of it: it is `role="tooltip"` and keyboard users cannot move into it.',
  ],
  do: [
    'Show two or three facts that help decide whether to open the link.',
    'Use it where people hover links in bulk.',
  ],
  dont: [
    'Put buttons ("Follow", "Message") in a hover card.',
    'Use it for anything people must read.',
  ],
  related: ['tooltip', 'popover', 'avatar', 'link'],
};
