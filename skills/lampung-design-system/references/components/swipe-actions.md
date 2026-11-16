# Swipe actions

Group: Microinteractions. Docs page: `docs/components/swipe-actions.html`.

Swipe a list row left to reveal its actions; swipe far or flick to run the last one, and the row slides out and closes its space. The row follows the finger exactly, and the same actions open with the Left arrow key.

## Use it when
- Frequent actions on rows of a list on phones: archive or delete messages, pin a note, remove a task.
- A list where people process items one by one (an inbox, notifications, a to-do list).

## Use something else when
- The action needs a question first and cannot be undone: use [Alert dialog](alert-dialog.md).
- Actions on several items at once: use [Selection bar](selection-bar.md).
- Rows with many actions or rarely used ones: use [Context menu](context-menu.md). Or a [dropdown menu](dropdown-menu.md) on a more button.
- Wide screens with a mouse only: use [Confirm in place](confirm-in-place.md). Show the actions in the row instead; keep swipe as a shortcut.

## Where it goes
On rows of a `.list`, one `.swipe` per row. Two or three actions, the destructive one last (on the far right, where a long swipe ends).

## Anatomy
| Part | What it is |
|---|---|
| `.swipe` | Required. `data-lds-swipe`. The row wrapper; collapses its height when the row is removed (`.is-gone`). |
| `.swipe__actions` | Required. The buttons behind the row; inert until opened. |
| `.swipe__act` | Required. 76 px wide each: `--gray`, `--accent`, `--danger`. `data-swipe="name"`; `data-swipe-commit` on the last one lets a long swipe run it. |
| `.swipe__row` | Required. The visible row (a `.lrow`), `tabindex="0"`. |

## Markup

**Inbox rows.** Drag a row left. Past half the actions it stays open; past 60 % of the row, or with a fast flick, Delete runs and the row slides out. Only one row is open at a time. Keyboard: focus a row and press the Left arrow.
```html
<div class="list">
  <div class="swipe" data-lds-swipe>
    <div class="swipe__actions">
      <button class="swipe__act swipe__act--gray" data-swipe="pin"><span class="ic" aria-hidden="true">keep</span>Pin</button>
      <button class="swipe__act swipe__act--danger" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Delete</button>
    </div>
    <div class="swipe__row lrow" tabindex="0">…</div>
  </div>
</div>
<script type="module">
  import { toast } from 'lampung-design-system/js';
  document.addEventListener('lds:swipe', (e) => {
    if (e.detail.action !== 'delete') return;
    toast({ title: 'Message deleted', action: 'Undo', onAction: () => { e.detail.restore(); return { title: 'Restored' }; } });
  });
</script>
```

**One action.** A task list with only Delete. A short swipe shows it; a long one deletes.
```html
<div class="list" style="width: 100%; max-width: 420px;">
  <div class="swipe" data-lds-swipe><div class="swipe__actions"><button class="swipe__act swipe__act--danger" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Delete</button></div><div class="swipe__row lrow" tabindex="0"><span class="lrow__body"><span class="lrow__title">Read chapter 4</span><span class="lrow__sub">Biology 101</span></span><span class="lrow__value">Today</span></div></div>
  <div class="swipe" data-lds-swipe><div class="swipe__actions"><button class="swipe__act swipe__act--danger" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Delete</button></div><div class="swipe__row lrow" tabindex="0"><span class="lrow__body"><span class="lrow__title">Print the lab worksheet</span><span class="lrow__sub">Biology 101</span></span><span class="lrow__value">Tomorrow</span></div></div>
</div>
```

## States
| State | How |
|---|---|
| `closed` | Row at rest; actions inert. |
| `dragging` | Row follows the finger 1:1; actions widen with it; dragging right rubber-bands. |
| `open` | Row rests at minus the actions width; actions are in the tab order. |
| `full` | `.is-full` when dragged 40 px past the actions: the last action stretches to fill, showing a release will run it. |
| `gone` | `.is-gone`: the row slid out and its height closed. `restore()` brings it back. |

## Motion and microinteractions
- Decide: 8 px of movement chooses swipe (mostly horizontal) or scroll (mostly vertical); a scroll never moves the row.
- Follow: transitions off, the row moves 1:1; past the right edge it rubber-bands (`over × 40 × 0.55 / (40 + 0.55 × |over|)`).
- Release: projected end = position + velocity × 0.1 s. Open if past half the actions width, otherwise close; both on `--spring-smooth` (560 ms).
- Commit: past 60 % of the row width, or a flick faster than 900 px/s beyond the actions, the row slides fully out on `--ease-inout` in `--d-standard` (240 ms), then the `.swipe` closes its height on `--spring-smooth`. A medium haptic marks the commit.
- Interruption: touching another row closes the open one; tapping an open row closes it.
- Reduced motion: the drag still follows the finger; settling and the height close take 120 ms.

## Accessibility
- Rows are focusable (`tabindex="0"`). Left arrow opens the actions, Tab moves through them, Right arrow or Escape closes the row.
- Every action is a real button with a label; a destructive one should still offer Undo ([toast](toast.md) with an action).
- Teach the gesture with a [hint](hints.md) for the first visits, and offer the same actions somewhere visible (a row menu) for people who do not swipe.

## Do
- Put the destructive action last, with `data-swipe-commit`.
- Offer Undo after a delete through `restore()`.
- Keep it to two or three actions.

## Don't
- Make swipe the only way to an action.
- Put swipe rows inside a horizontal scroller or carousel.
- Run a destructive commit with no way back.

## Behavior (plain HTML)
`[data-lds-swipe]` on `init()`. `lds:swipe` (bubbles) carries `{ action, restore }`, where `action` is the button's `data-swipe`. Tapping a non-commit action emits it and closes the row; the commit action (and a long swipe or flick) removes the row first.

## Related
[List](list.md) · [Drag and momentum](drag-and-momentum.md) · [Hints](hints.md) · [Toast](toast.md)
