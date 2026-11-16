# Text morph

Group: Microinteractions. Docs page: `docs/components/text-morph.html`.

A word changes in place and only the letters that differ move: kept letters slide to their new spot, new ones rise in, leaving ones blur out, and the width springs between the two words. Use it for the result of an action said in words, right where the action happened.

## Use it when
- A button says what it is doing and what happened: Save draft, Saving, Saved.
- A status changes in front of the person: Submitted, In review, Approved.
- A short count in words changes: 3 seats left, 2 seats left, Class full.
- A toast that changes its own text after Undo (Deleted, Restored); `toast()` already does this.

## Use something else when
- A number that rolls (counts, totals): use [Number count](number-count.md).
- Waiting with no result yet: use [Thinking](thinking.md).
- An icon that changes (copy to check, play to pause): use [Icon swap](icon-swap.md).
- A whole panel or view changing: use [View swap](view-swap.md).
- A refused action: use [Shake](shake.md).
- A long sentence or paragraph: use [Streaming text](streaming-text.md). Morph is for one to three words.

## Where it goes
Inline, inside the control or the line whose meaning changed: a button label, a status line, a badge, a toast title. The surrounding layout must allow the width to change (not a fixed-width cell).

## Anatomy
| Part | What it is |
|---|---|
| `.morph` | Required. An inline-block `<span>` with `data-lds-morph` (or primed by `morphText`). Its width transitions between words. |
| `.morph__l` | One letter (added by JS, `aria-hidden`). |
| `.morph__sr` | A visually hidden copy of the whole word for screen readers (added by JS). |

## Markup

**A status that moves on.** Press Next status. Shared letters ("in", "e") slide instead of being replaced; the width springs to the new word.
```html
Status: <span class="morph" data-lds-morph>Submitted</span>
<script type="module">
  import { morphText } from 'lampung-design-system/js';
  morphText(document.querySelector('.morph'), 'In review');
</script>
```

**Save, saving, saved.** The button tells the whole story in its own label, so no toast is needed. It goes back to Save draft once the moment has passed.
```html
<button class="btn btn--secondary"><span class="ic" aria-hidden="true">draft</span><span class="morph" data-lds-morph>Save draft</span></button>
// on click: morphText(label, 'Saving'); await save(); morphText(label, 'Saved');
```

**A count in words.** Reserve seats until the class is full. Only the digit changes until the sentence itself changes.
```html
<span class="badge badge--warning"><span class="morph" data-lds-morph id="tm-seats" aria-live="polite">3 seats left</span></span>
<button class="btn btn--primary btn--md" onclick="const el = document.getElementById('tm-seats'); const n = Number(el.dataset.n || 3) - 1; if (n < 0) return; el.dataset.n = n; import('../../js/lds.js').then((m) => m.morphText(el, n === 0 ? 'Class full' : n === 1 ? '1 seat left' : n + ' seats left')); if (n === 0) this.disabled = true;">Reserve a seat</button>
```

## Motion and microinteractions
- Letters are keyed by character and occurrence, so "Saving" to "Saved" keeps S, a, v and moves them; "in" to "ed" leaves and enters.
- Kept letters slide to their new x on `--spring-smooth` (560 ms). New letters rise from 0.14 em below with a 4 px blur and scale 0.8 in 280 ms on `--ease-enter`, 32 ms apart, up to 8 steps. Leaving letters blur out upward in `--d-exit` (180 ms) on `--ease-exit` and are removed after 220 ms.
- Width: the span keeps its old width, then transitions to the new one on `--spring-smooth`, so the text after it moves once and smoothly.
- Interruption: calling `morphText` mid-morph starts from what is on screen; leaving letters from the previous morph are dropped.
- Reduced motion: the word is replaced at once, no letters move.

## Accessibility
- Letters are `aria-hidden`; the whole new word is in a visually hidden `.morph__sr` copy, so screen readers never read single letters.
- Morph does not announce by itself. When the change should be heard (saved, approved), put `aria-live="polite"` on the morph or its container, or use the button's `aria-busy` and a status line.
- Keep the button accessible name meaningful in every state ("Saved" is fine; "..." is not).

## Do
- Morph one to three words, in the control where the action happened.
- Say the result ("Saved"), then return to the action label after a moment.
- Use the same words people read in the rest of the product.

## Don't
- Morph long sentences or whole paragraphs.
- Add a toast that repeats what the label already said.
- Put a morph in a fixed-width box that clips the longer word.

## Behavior (plain HTML)
`[data-lds-morph]` is primed on `init()`. `morphText(el, text)` morphs to `text` (and primes the element if needed). `thinkingDone()` and `toast().update()` use it too.

## Related
[Button](button.md) · [Number count](number-count.md) · [Icon swap](icon-swap.md) · [Toast](toast.md)
