# Drag and momentum

Group: Motion. Docs page: `docs/components/drag-and-momentum.html`.

What a finger moves follows it exactly, resists softly past its limits, and on release goes where the throw was heading: the release velocity is projected forward to decide the outcome, then a spring with a hint of overshoot settles it. A flick does what a long drag would.

## Use it when
- Dragging a [sheet](sheet.md) down to dismiss it, or flicking it.
- A knob dragged along a track to commit ([slide to confirm](slide-to-confirm.md)).
- A list row swiped sideways to reveal or run actions ([swipe actions](swipe-actions.md)).
- A divider dragged to resize two panes ([resizable split](resizable-split.md)): direct, 1:1, no throw.

## Use something else when
- A simple tap or press: use [Press feedback](press-feedback.md).
- Choosing a value on a track: use [Slider](slider.md).
- Scrolling a row of cards: use [Carousel](carousel.md).
- Opening a panel with a button: use [Enter and exit](enter-and-exit.md).
- Reordering items in a list: use [List](list.md). The system has no drag-to-reorder yet; offer Move up and Move down actions.

## Where it goes
On the handle that can be dragged: the sheet grabber and header (`[data-lds-drag]`), the slide knob, the swipe row, the resize handle. Every gesture also has a button or key that does the same.

## Markup

**A sheet you can throw.** Open the sheet, then drag the grabber: it follows 1:1 and the backdrop lightens. Pull up and it resists. Let go past half its height, or flick down quickly, and it dismisses; otherwise it springs back with a small overshoot.
```html
<div class="viewport docs-box" data-lds-push="dm-sheet">
  <div class="viewport__content">
    <p class="card__title">Exam room</p>
    <button class="btn btn--secondary btn--md" data-lds-open="dm-sheet" aria-haspopup="dialog">Choose a seat</button>
  </div>
  <div class="scrim" data-lds-scrim="dm-sheet"></div>
  <div class="sheet" id="dm-sheet" role="dialog" aria-modal="true" aria-labelledby="dm-sheet-t" data-lds-layer>
    <div class="sheet__grabber" aria-hidden="true"></div>
    <div class="sheet__head" data-lds-drag><h3 class="sheet__title" id="dm-sheet-t">Choose a seat</h3><button class="icon-btn icon-btn--filled" aria-label="Close" data-lds-close><span class="ic" aria-hidden="true">close</span></button></div>
    <div class="list list--fill"><button class="lrow"><span class="lrow__body"><span class="lrow__title">Row A, by the window</span></span></button><button class="lrow"><span class="lrow__body"><span class="lrow__title">Row C, near the door</span></span></button><button class="lrow"><span class="lrow__body"><span class="lrow__title">Any free seat</span></span></button></div>
  </div>
</div>
```

**Slide to confirm.** Drag the knob. Past 85 % of the track (counting the throw), it commits and the label says so; short of it, it springs home on the momentum spring. Enter on the knob does the same.
```html
<div class="slide" data-lds-slide>
  <span class="slide__fill" aria-hidden="true"></span>
  <span class="slide__label">Slide to submit grades</span>
  <button class="slide__knob" aria-label="Slide to submit grades"><span class="ic" aria-hidden="true">arrow_forward</span></button>
</div>
```

**Swipe a row.** Drag the row left: it follows the finger and reveals actions; let go past halfway and it opens, flick far and it deletes. Dragging right rubber-bands. The Left arrow key opens it too.
```html
<div class="list" style="width: 100%; max-width: 420px;">
  <div class="swipe" data-lds-swipe>
    <div class="swipe__actions"><button class="swipe__act swipe__act--gray" data-swipe="pin"><span class="ic" aria-hidden="true">keep</span>Pin</button><button class="swipe__act swipe__act--danger" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Delete</button></div>
    <div class="swipe__row lrow" tabindex="0"><span class="lrow__body"><span class="lrow__title">Lab report feedback</span><span class="lrow__sub">Two comments on section 3</span></span><span class="lrow__value">09:41</span></div>
  </div>
</div>
```

**Resize two panes.** Direct manipulation with no throw: the divider stays under the pointer and stops where you let go. Arrow keys move it 2 %, Shift 10 %.
```html
<div class="resize card" data-lds-resize data-min="25" data-max="75" style="height: 160px; padding: 0;">
  <div style="padding: 16px;"><p class="card__title">Question 4</p><p class="card__sub">A 7 kg box is pushed with 20 N against 6 N of friction. Find its acceleration.</p></div>
  <div class="resize__handle" aria-label="Resize the question and answer panes"></div>
  <div style="padding: 16px;"><p class="card__title">Your answer</p><p class="card__sub">Net force 14 N, so 2 m/s².</p></div>
</div>
```

## Motion and microinteractions
- Follow: while dragging, transitions are off (`.is-dragging`, `transition: none`) and the element moves 1:1 with the pointer, including the first pixels. Swipe rows wait for 8 px of travel to decide between swipe and scroll; context menus allow 10 px of slop before a long press is cancelled.
- Resist: past a limit, offset = `over × dim × 0.55 / (dim + 0.55 × |over|)` (dim 120 px for sheets, 52 px for the slide knob, 40 px for swipe rows). It slows smoothly and never stops dead.
- Throw: velocity is measured over the last five pointer samples. Sheets and the slide knob project the end point as `position + (v / 1000) × 0.99 / (1 − 0.99)` (about a tenth of a second of travel); swipe rows use `position + v × 0.1`.
- Decide: a sheet dismisses past 50 % of its height; the slide knob commits past 85 % of its travel; a swipe row opens past half its actions and runs its last action past 60 % of the row or on a flick faster than 900 px/s.
- Settle: going back or landing after a throw uses `--spring-momentum` over `--d-momentum` (600 ms, damping 0.8, about 1.5 % overshoot). Dismissing uses the exit curve; opening a swipe row uses `--spring-smooth`.
- Reduced motion: the drag still follows the finger (it is direct manipulation), but release settles in 120 ms linear with no overshoot, and the sheet does not throw.

## Accessibility
- Every drag has a non-drag equivalent: sheets close with a button and Escape, the slide knob accepts Enter, swipe rows open with the Left arrow and close with Right or Escape, resize handles move with arrow keys, Home and End.
- Drag handles that are controls carry their role: the resize handle is a `separator` with `aria-valuenow`; the knob is a labelled button.
- Do not make a gesture the only way to discover an action; teach it with a [hint](hints.md) for the first few visits.

## Do
- Follow the pointer from the first pixel, with transitions off.
- Decide on release with the projected position, not the raw one.
- Land with the momentum spring only after a throw.

## Don't
- Snap to the end on a fixed threshold without counting velocity.
- Let something stop dead at a limit; rubber-band it.
- Ship a gesture with no button or key that does the same.

## Behavior (plain HTML)
Built into the components: `.sheet[data-lds-layer]` (drag on `.sheet__grabber` and `[data-lds-drag]`), `[data-lds-slide]` (emits `lds:confirm`), `[data-lds-swipe]` (emits `lds:swipe` with `{ action, restore }`), `[data-lds-resize]` (emits `lds:resize` with `{ size }`). There is no public drag helper; new draggable components reuse the same formulas in `js/lds.js`.

## Related
[Sheet](sheet.md) · [Slide to confirm](slide-to-confirm.md) · [Swipe actions](swipe-actions.md) · [Resizable split](resizable-split.md)
