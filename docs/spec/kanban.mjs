const card = (id, title, body, tag, tone, due, who, comments) => `<article class="kanban__card" role="listitem" tabindex="0" data-id="${id}" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge${tone ? ` badge--${tone}` : ''}">${tag}</span></div>
          <h3 class="kanban__card-title">${title}</h3>
          ${body ? `<p class="kanban__card-body">${body}</p>` : ''}
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>${due}</span><span><span class="ic" aria-hidden="true">chat</span>${comments}</span><span class="avatar avatar--gray" title="${who[1]}">${who[0]}</span></div>
        </article>`;
const col = (key, title, n, cards, limit) => `<section class="kanban__col" data-col="${key}" aria-labelledby="kb-${key}"${limit ? ` data-limit="${limit}"` : ''}>
      <header class="kanban__head"><h2 class="kanban__title" id="kb-${key}">${title}</h2><span class="kanban__count"><span class="roll" data-lds-roll="${n}"></span></span>
        <span class="kanban__head-end"><button class="icon-btn" aria-label="Add a card to ${title}"><span class="ic" aria-hidden="true">add</span></button></span></header>
      <div class="kanban__list" role="list" aria-labelledby="kb-${key}">
        ${cards.join('\n        ')}
        <div class="kanban__empty">Drop a card here</div>
      </div>
    </section>`;
const board = `<div class="kanban" data-lds-kanban aria-label="November cohort launch">
    ${col('todo', 'To do', 3, [
      card('k1', 'Write the welcome email', 'Three short paragraphs and the link to week 1.', 'Content', 'accent', '18 Nov', ['DL', 'Dewi Lestari'], 4),
      card('k2', 'Book the venue for the kickoff', '', 'Operations', '', '20 Nov', ['AS', 'Arif Santoso'], 1),
      card('k3', 'Price the early bird seats', 'Compare with last cohort and the waitlist size.', 'Finance', 'warning', '21 Nov', ['SH', 'Sari Handayani'], 7),
    ])}
    ${col('doing', 'In progress', 2, [
      card('k4', 'Record lesson 1 videos', '', 'Content', 'accent', '19 Nov', ['RW', 'Rina Wijaya'], 2),
      card('k5', 'Set up the payment page', 'Virtual account and card, with receipts by email.', 'Platform', 'success', '22 Nov', ['GR', 'Galih Ramadhan'], 5),
    ], 3)}
    ${col('done', 'Done', 0, [])}
  </div>
  <p class="sr-only" id="kb-help">Press Space to pick up the card, arrow keys to move it, Space to drop it, Escape to cancel.</p>`;

export default {
  title: 'Kanban',
  group: 'Data display',
  order: 21,
  summary: 'Columns of cards that people move between stages by dragging or by keyboard. The picked card lifts and follows the pointer, the others make room on a spring, and it settles into its slot; the counts roll.',
  when: [
    'Work that moves through a few stages and people rearrange it often: tasks of a launch, applications in review, support tickets, content in production.',
    'Seeing how much sits in each stage matters as much as the items themselves (work in progress limits).',
  ],
  whenNot: [
    ['Records compared by many attributes', 'data-table'],
    ['The history of one record', 'timeline'],
    ['Steps a person goes through once', 'steps'],
    ['A short list where order is all that matters', 'list'],
  ],
  where: 'Full width of the content column, under the page header and a toolbar (search, filters, add). Columns are at least 280 px and scroll sideways together when they do not fit; on phones each column takes 82 % of the width and snaps, so the next one peeks in.',
  anatomy: [
    ['.kanban[data-lds-kanban]', 'Required. The board, `aria-label`led; scrolls sideways.'],
    ['.kanban__col', 'Required. One stage (`section`, `data-col` key, `aria-labelledby` its title). Optional `data-limit`: past it the count turns to warning.'],
    ['.kanban__head', 'Title (`h2.kanban__title`), `.kanban__count` with a `.roll`, and `.kanban__head-end` for icon buttons (add, more).'],
    ['.kanban__list', 'Required. `role="list"` holding the cards and a `.kanban__empty` placeholder, which shows only when the column is empty.'],
    ['.kanban__card', 'Required. An `article` (`role="listitem"`, `tabindex="0"`, `data-id`) with `aria-describedby` pointing at a hidden sentence that explains the keys.'],
    ['.kanban__top, .kanban__card-title, .kanban__card-body, .kanban__foot', 'Card parts: badges and a more button, the title (`h3`), two lines of detail, and a foot with due date, counts and an [avatar](avatar).'],
    ['.kanban__add', 'Optional full-width button under a list: "Add card".'],
  ],
  examples: [
    {
      title: 'Launch board',
      desc: 'Drag a card to another column (on touch, hold it first): the others make room, the count rolls. "In progress" warns past three cards. By keyboard: Tab to a card, Space to pick up, arrows to move, Space to drop, Escape to put it back.',
      stage: 'block',
      html: board,
    },
  ],
  states: [
    ['hover', 'The card ring turns `--line-strong`.'],
    ['pressed', '0.985, or 0.97 while a touch hold is counting.'],
    ['.is-dragging', 'Lifted: 1.03 scale, 1.5 degree tilt, large shadow, follows the pointer; a `.kanban__ghost` shows where it will land.'],
    ['.kanban__col.is-over', 'The column under the pointer takes the accent tint.'],
    ['.is-grabbed', 'Picked up by keyboard: 1.02 scale and an accent ring.'],
    ['.is-over-limit', 'More cards than `data-limit`: the count turns to warning.'],
    ['empty column', '`.kanban__empty` shows "Drop a card here".'],
  ],
  motion: [
    'Pick up: scale and tilt settle on `--spring-snappy`; from then the card follows the pointer 1:1 (CSS `translate`, no transition).',
    'Making room: every card that shifts is moved with FLIP, from where it was to its new place on `--spring-smooth`. It starts from where it is on screen, so quick moves never jump.',
    'Drop: the card flies from the pointer into its slot and untilts on `--spring-smooth`. Cancel (Escape) takes it back to where it came from on the same path.',
    'The board scrolls sideways when the pointer is within 56 px of its edges, and the page scrolls near the top and bottom of the window.',
    'Counts roll ([rolling number](rolling-number)). Reduced motion: no tilt or scale, cards change place at once.',
  ],
  a11y: [
    'Every card is focusable; Space picks it up, arrow keys move it (left and right change column), Space or Enter drops it, Escape puts it back, Tab drops it where it is.',
    'Each step is announced: "Picked up Write the welcome email, To do, position 1 of 3", "In progress, position 2 of 3", "Dropped…".',
    'Mouse drags start after 5 px, so a click still works; touch drags start after a 260 ms hold, so the board still scrolls.',
    'Buttons and links inside a card never start a drag.',
  ],
  do: [
    'Keep three to six columns and short card titles.',
    'Save the move on `lds:move` and put the card back (and say why) if the server refuses.',
  ],
  dont: [
    'Hide the only way to change a card\'s stage in the drag; keyboard moves and a status field in the card detail must exist too.',
    'Put long forms in cards; open the card in a [drawer](drawer) instead.',
  ],
  js: '`data-lds-kanban` wires pointer and keyboard moves, edge scrolling, counts and limits. It fires `lds:move` on the board with `{ card, id, from, to, index }` (column keys from `data-col`).',
  related: ['data-table', 'drag-and-momentum', 'rolling-number', 'list'],
};
