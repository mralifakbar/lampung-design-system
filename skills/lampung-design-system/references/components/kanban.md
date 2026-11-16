# Kanban

Group: Data display. Docs page: `docs/components/kanban.html`.

Columns of cards that people move between stages by dragging or by keyboard. The picked card lifts and follows the pointer, the others make room on a spring, and it settles into its slot; the counts roll.

## Use it when
- Work that moves through a few stages and people rearrange it often: tasks of a launch, applications in review, support tickets, content in production.
- Seeing how much sits in each stage matters as much as the items themselves (work in progress limits).

## Use something else when
- Records compared by many attributes: use [Data table](data-table.md).
- The history of one record: use [Timeline](timeline.md).
- Steps a person goes through once: use [Steps](steps.md).
- A short list where order is all that matters: use [List](list.md).

## Where it goes
Full width of the content column, under the page header and a toolbar (search, filters, add). Columns are at least 280 px and scroll sideways together when they do not fit; on phones each column takes 82 % of the width and snaps, so the next one peeks in.

## Anatomy
| Part | What it is |
|---|---|
| `.kanban[data-lds-kanban]` | Required. The board, `aria-label`led; scrolls sideways. |
| `.kanban__col` | Required. One stage (`section`, `data-col` key, `aria-labelledby` its title). Optional `data-limit`: past it the count turns to warning. |
| `.kanban__head` | Title (`h2.kanban__title`), `.kanban__count` with a `.roll`, and `.kanban__head-end` for icon buttons (add, more). |
| `.kanban__list` | Required. `role="list"` holding the cards and a `.kanban__empty` placeholder, which shows only when the column is empty. |
| `.kanban__card` | Required. An `article` (`role="listitem"`, `tabindex="0"`, `data-id`) with `aria-describedby` pointing at a hidden sentence that explains the keys. |
| `.kanban__top, .kanban__card-title, .kanban__card-body, .kanban__foot` | Card parts: badges and a more button, the title (`h3`), two lines of detail, and a foot with due date, counts and an [avatar](avatar.md). |
| `.kanban__add` | Optional full-width button under a list: "Add card". |

## Markup

**Launch board.** Drag a card to another column (on touch, hold it first): the others make room, the count rolls. "In progress" warns past three cards. By keyboard: Tab to a card, Space to pick up, arrows to move, Space to drop, Escape to put it back.
```html
<div class="kanban" data-lds-kanban aria-label="November cohort launch">
    <section class="kanban__col" data-col="todo" aria-labelledby="kb-todo">
      <header class="kanban__head"><h2 class="kanban__title" id="kb-todo">To do</h2><span class="kanban__count"><span class="roll" data-lds-roll="3"></span></span>
        <span class="kanban__head-end"><button class="icon-btn" aria-label="Add a card to To do"><span class="ic" aria-hidden="true">add</span></button></span></header>
      <div class="kanban__list" role="list" aria-labelledby="kb-todo">
        <article class="kanban__card" role="listitem" tabindex="0" data-id="k1" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge badge--accent">Content</span></div>
          <h3 class="kanban__card-title">Write the welcome email</h3>
          <p class="kanban__card-body">Three short paragraphs and the link to week 1.</p>
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>18 Nov</span><span><span class="ic" aria-hidden="true">chat</span>4</span><span class="avatar avatar--gray" title="Dewi Lestari">DL</span></div>
        </article>
        <article class="kanban__card" role="listitem" tabindex="0" data-id="k2" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge">Operations</span></div>
          <h3 class="kanban__card-title">Book the venue for the kickoff</h3>
          
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>20 Nov</span><span><span class="ic" aria-hidden="true">chat</span>1</span><span class="avatar avatar--gray" title="Arif Santoso">AS</span></div>
        </article>
        <article class="kanban__card" role="listitem" tabindex="0" data-id="k3" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge badge--warning">Finance</span></div>
          <h3 class="kanban__card-title">Price the early bird seats</h3>
          <p class="kanban__card-body">Compare with last cohort and the waitlist size.</p>
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>21 Nov</span><span><span class="ic" aria-hidden="true">chat</span>7</span><span class="avatar avatar--gray" title="Sari Handayani">SH</span></div>
        </article>
        <div class="kanban__empty">Drop a card here</div>
      </div>
    </section>
    <section class="kanban__col" data-col="doing" aria-labelledby="kb-doing" data-limit="3">
      <header class="kanban__head"><h2 class="kanban__title" id="kb-doing">In progress</h2><span class="kanban__count"><span class="roll" data-lds-roll="2"></span></span>
        <span class="kanban__head-end"><button class="icon-btn" aria-label="Add a card to In progress"><span class="ic" aria-hidden="true">add</span></button></span></header>
      <div class="kanban__list" role="list" aria-labelledby="kb-doing">
        <article class="kanban__card" role="listitem" tabindex="0" data-id="k4" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge badge--accent">Content</span></div>
          <h3 class="kanban__card-title">Record lesson 1 videos</h3>
          
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>19 Nov</span><span><span class="ic" aria-hidden="true">chat</span>2</span><span class="avatar avatar--gray" title="Rina Wijaya">RW</span></div>
        </article>
        <article class="kanban__card" role="listitem" tabindex="0" data-id="k5" aria-describedby="kb-help">
          <div class="kanban__top"><span class="badge badge--success">Platform</span></div>
          <h3 class="kanban__card-title">Set up the payment page</h3>
          <p class="kanban__card-body">Virtual account and card, with receipts by email.</p>
          <div class="kanban__foot"><span><span class="ic" aria-hidden="true">calendar_month</span>22 Nov</span><span><span class="ic" aria-hidden="true">chat</span>5</span><span class="avatar avatar--gray" title="Galih Ramadhan">GR</span></div>
        </article>
        <div class="kanban__empty">Drop a card here</div>
      </div>
    </section>
    <section class="kanban__col" data-col="done" aria-labelledby="kb-done">
      <header class="kanban__head"><h2 class="kanban__title" id="kb-done">Done</h2><span class="kanban__count"><span class="roll" data-lds-roll="0"></span></span>
        <span class="kanban__head-end"><button class="icon-btn" aria-label="Add a card to Done"><span class="ic" aria-hidden="true">add</span></button></span></header>
      <div class="kanban__list" role="list" aria-labelledby="kb-done">
        
        <div class="kanban__empty">Drop a card here</div>
      </div>
    </section>
  </div>
  <p class="sr-only" id="kb-help">Press Space to pick up the card, arrow keys to move it, Space to drop it, Escape to cancel.</p>
```

## States
| State | How |
|---|---|
| `hover` | The card ring turns `--line-strong`. |
| `pressed` | 0.985, or 0.97 while a touch hold is counting. |
| `.is-dragging` | Lifted: 1.03 scale, 1.5 degree tilt, large shadow, follows the pointer; a `.kanban__ghost` shows where it will land. |
| `.kanban__col.is-over` | The column under the pointer takes the accent tint. |
| `.is-grabbed` | Picked up by keyboard: 1.02 scale and an accent ring. |
| `.is-over-limit` | More cards than `data-limit`: the count turns to warning. |
| `empty column` | `.kanban__empty` shows "Drop a card here". |

## Motion and microinteractions
- Pick up: scale and tilt settle on `--spring-snappy`; from then the card follows the pointer 1:1 (CSS `translate`, no transition).
- Making room: every card that shifts is moved with FLIP, from where it was to its new place on `--spring-smooth`. It starts from where it is on screen, so quick moves never jump.
- Drop: the card flies from the pointer into its slot and untilts on `--spring-smooth`. Cancel (Escape) takes it back to where it came from on the same path.
- The board scrolls sideways when the pointer is within 56 px of its edges, and the page scrolls near the top and bottom of the window.
- Counts roll ([rolling number](rolling-number.md)). Reduced motion: no tilt or scale, cards change place at once.

## Accessibility
- Every card is focusable; Space picks it up, arrow keys move it (left and right change column), Space or Enter drops it, Escape puts it back, Tab drops it where it is.
- Each step is announced: "Picked up Write the welcome email, To do, position 1 of 3", "In progress, position 2 of 3", "Dropped…".
- Mouse drags start after 5 px, so a click still works; touch drags start after a 260 ms hold, so the board still scrolls.
- Buttons and links inside a card never start a drag.

## Do
- Keep three to six columns and short card titles.
- Save the move on `lds:move` and put the card back (and say why) if the server refuses.

## Don't
- Hide the only way to change a card's stage in the drag; keyboard moves and a status field in the card detail must exist too.
- Put long forms in cards; open the card in a [drawer](drawer.md) instead.

## Behavior (plain HTML)
`data-lds-kanban` wires pointer and keyboard moves, edge scrolling, counts and limits. It fires `lds:move` on the board with `{ card, id, from, to, index }` (column keys from `data-col`).

## Related
[Data table](data-table.md) · [Drag and momentum](drag-and-momentum.md) · [Rolling number](rolling-number.md) · [List](list.md)
