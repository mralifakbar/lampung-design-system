# Microinteractions

The small, contained moments: a like, a rename, a delete, a toggle. The model is four parts (trigger, rules, feedback, loops and modes) from `skills/microinteractions`; this file is how the system implements them. Motion values come from `motion.md`.

## Rules the system holds to

1. **Answer within 100 ms.** Every press changes something on screen on pointer down. The server answer can come later.
2. **Feedback lives on the control.** The button, row or field shows the result. A toast is for an Undo or for a result that happened somewhere else.
3. **Scale feedback to the event.**

   | Event | Feedback |
   |---|---|
   | Hover, focus | Tint or ring, no movement |
   | Tap, toggle | The control moves, 100 to 340 ms, on a spring |
   | Endorse (like, star) | Optimistic fill plus a small burst; rollback shakes |
   | Save, send | Words change in place (`morphText`) |
   | Destroy | Confirm in place, then a sentence with Undo |
   | Refuse | Shake (360 ms, two oscillations) plus the reason in words |

4. **Honest waiting.** Unknown length: shimmer plus a real elapsed timer. Known length: a number. No bar that stalls at 90%.
5. **Gestures have a way in.** Every swipe or long press has a button or key that does the same, and a hint teaches it for the first few visits only.
6. **Haptics are extra.** `haptic()` only runs after the person has interacted, never as the only signal. `data-lds-haptics="off"` on `<html>` turns it off.
7. **Reduced motion** keeps every state change and drops the travel: shimmer stops, sparks are hidden, springs become 120 ms fades.

## Components

All behaviors start from `init()`; the functions below are exported from `js/lds.js`.

### Text morph
```html
Status: <span class="morph" data-lds-morph>Submitted</span>
```
`morphText(el, 'In review')`. Letters are keyed by character and occurrence. Kept letters slide to their new place on the smooth spring, new ones rise in (280 ms, 32 ms apart, up to 8), leaving ones blur out in 180 ms. The width springs between the two words. Screen readers get the whole new string from a hidden copy.

### Confirm in place
```html
<div class="confirm" data-lds-confirm>
  <span class="confirm__face confirm__face--rest"><button class="confirm__arm" data-act="arm"><span class="ic" aria-hidden="true">delete</span>Delete 3 files</button></span>
  <span class="confirm__face confirm__face--ask"><span class="confirm__q">Delete 3 files?</span><button class="btn btn--plain" data-act="cancel">Cancel</button><button class="btn btn--danger" data-act="confirm">Delete</button></span>
  <span class="confirm__face confirm__face--busy" role="status"><span class="spinner" aria-hidden="true"><i></i>×8</span><span class="shimmer">Deleting</span></span>
  <span class="confirm__face confirm__face--done" role="status"><span class="ic" aria-hidden="true">check_circle</span>Deleted 3 files<button class="confirm__undo" data-act="undo">Undo</button></span>
</div>
```
Listen for `lds:confirm` and call `e.detail.wait(promise)`. A rejection returns to rest with a shake. The confirm button ignores clicks for 280 ms after arming. The working face shows for at least 600 ms. Undo stays for `data-reset` ms (default 5000) and receives focus. Escape backs out of the question. `lds:undo` fires on Undo. Use it in place of a dialog for one-object destructive actions.

### Like
```html
<button class="like" aria-pressed="false" data-lds-like aria-label="Like"><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="128"></span></button>
```
Optimistic: the heart fills, pops and throws seven sparks; the count rolls. If the server refuses, call `likeRevert(btn)`.

### Switch landing, bell, menu icon
- Every `.switch` stretches its thumb once as it lands (340 ms), whether it was changed by tap, key or label.
- A `.bell` icon inside a switch rings once when it turns on.
- `.burger` (three `<i>`) folds into a close icon when its button has `aria-expanded="true"`.

### Expanding toolbar
```html
<div class="xbar" data-lds-toolbar role="toolbar" aria-label="Note actions">
  <span class="xbar__hl" aria-hidden="true"></span>
  <button class="xbar__btn is-open"><span class="ic" aria-hidden="true">edit</span><span class="xbar__label"><span>Edit</span></span></button>
  …
</div>
```
The hovered or focused button shows its label (grid `0fr → 1fr` on the smooth spring). The highlight travels once, straight to where the button will end up. On leave, the default (`is-open`) one returns.

### Swipe actions
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
```
- **Swipe or scroll:** 8 px of slop decides which one it is.
- **Open or close:** the row follows the finger 1:1. On release, the position is projected with velocity × 0.1; the row opens past half the actions' width.
- **Run the last action:** a swipe past 60% of the row, or a flick faster than 900 px/s, runs the last action when it has `data-swipe-commit`. The row slides out and its height collapses.
- **Keyboard:** Left arrow opens the actions, Tab moves through them, and Right arrow or Escape closes the row.
- **Events:** `lds:swipe` carries `{ action, restore }`. Pair a delete with `toast({ action: 'Undo', onAction: () => { restore(); return { title: 'Restored' }; } })`.

### Inline edit
```html
<span class="inline-edit" data-lds-inline><button class="inline-edit__text" aria-label="Rename project"><span class="inline-edit__value">Thesis draft</span><span class="ic" aria-hidden="true">edit</span></button></span>
```
A click swaps in a field with the same font and width. Enter or blur saves, and Escape restores the old value. Listen for `lds:save` and call `e.detail.wait(promise)`. On success a check draws in; on rejection the old value comes back, the field shakes, and the reason is announced.

### Thinking
```html
<div class="thinking" data-lds-thinking role="status"><span class="dotgrid" aria-hidden="true"></span><span class="shimmer">Checking your schedule</span><span class="thinking__time"></span></div>
```
A 3×3 dot grid waves diagonally, stepping every 80 ms. The label shimmers on a 1.8 s cycle, and the elapsed time is shown to 0.1 s. `thinkingDone(el, 'Found 3 free slots')` stops it and morphs the label into the result. Use `.shimmer` on its own for any working label.

### Upload progress
`uploadProgress(dropEl, percent)` traces progress around the `.drop` edge and shows a percent pill (`role="progressbar"`). The trace turns green at 100%. Reset it with `uploadReset(dropEl)`.

### Toast with Undo
When a toast has an `action`, it shows a draining bar for the real time left. The clock pauses while the stack is hovered or focused. If `onAction` returns `{ title, icon }`, the toast says the result in place (the title morphs) and leaves after 1.6 s.

### Scroll edges
`<div class="fade-edges" data-lds-fade>` (add `fade-edges--x` for horizontal) fades an edge only while more content waits beyond it.

### Hints that retire
```html
<div class="hint" data-lds-hint="swipe-rows" data-max="3" role="note">…<button class="hint__close" data-lds-hint-close aria-label="Hide this hint">…</button></div>
```
- **Showing:** the hint appears on the first `data-max` visits, counted per hint in `localStorage`.
- **Closing:** closing it retires the hint at once.
- **Bringing it back:** `resetHints(['swipe-rows'])` brings it back (from a help menu, say).

### Also
- `shake(el)` for refused input.
- `haptic('light' | 'medium' | 'success' | 'error')`.
- Context menus open on a 500 ms touch press (10 px slop) and on Shift+F10 or the menu key.
- Wide buttons (`btn--lg`, `btn--block`) sink to 0.985 instead of 0.97. Buttons with `aria-haspopup` do not sink, because the menu is their feedback.

## Audit

Score a microinteraction against the eight questions in `skills/microinteractions` (trigger visible, state shown, rules simple, response within 100 ms, feedback sized to the event, quieter with use, modes visible, learnable without help). It ships at 8 of 8.
