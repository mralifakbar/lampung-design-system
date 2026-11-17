# Coachmark

Group: Feedback. Docs page: `docs/components/coachmark.html`.

An inverse card that points at one part of the interface with a short explanation, in a tour of at most three steps. Always skippable.

## Use it when
- A new feature lives somewhere the person would not look, and one sentence pointing at it saves a support question.
- A short first-run tour (one to three steps) through a dense screen, such as the permit application form editor or a tax ledger.

## Use something else when
- A one-time tip that does not need to point at a control: use [Hints](hints.md).
- Explaining a term or an icon on hover or focus: use [Tooltip](tooltip.md).
- Rich, interactive content opened by a click: use [Popover](popover.md).
- Announcing something about the whole app: use [Banner](banner.md).
- The interface needs a tour of more than three steps: use [Empty state](empty-state.md). Usually the screen needs a better first-run state, not a longer tour.

## Where it goes
Directly under the control it explains, with its arrow aimed at it (the arrow is on the top edge, placed with `--arrow`). The container must be positioned (`position: relative`). On phones keep it inside the screen width (280 px card) and below the target.

## Anatomy
| Part | What it is |
|---|---|
| `.coach` | Required. A 280 px inverse card, absolutely positioned inside a relative container; set `top`/`left` (or `transform`) to place it. |
| `.coach::before` | The arrow on the top edge. Move it with `--arrow` (left offset, default 24 px); it glides when the value changes. |
| `.coach__step` | "Step 1 of 3". |
| `.coach__title` | Required. What this is, in a few words. |
| `.coach__body` | One sentence: why it helps. |
| `.btn.btn--sm` | Skip (inverse tint) and Next or Done (`.btn--sm.is-primary`, accent). |
| `.is-lit` | On the target: a ring in the accent with a gap, so the person sees what is meant. |

## Markup

**A three-step tour.** The card glides to the next target and the arrow follows. Press Next.
```html
<div style="position: relative;">
  <button class="btn btn--secondary btn--md is-lit" id="search-btn">Search</button>
  <div class="coach" role="dialog" aria-labelledby="coach-t" aria-describedby="coach-b" style="top: 64px; left: 0; --arrow: 40px;">
    <div class="coach__step">Step 1 of 3</div>
    <div class="coach__title" id="coach-t">Search every report</div>
    <div class="coach__body" id="coach-b">Find a report by any word in it, not only the title.</div>
    <div class="cluster" style="margin-top: 14px; justify-content: flex-end;">
      <button class="btn btn--sm">Skip</button>
      <button class="btn btn--sm is-primary">Next</button>
    </div>
  </div>
</div>
```

**A single pointer.** One step needs no counter; the only action is "Got it".
```html
<div style="position: relative; min-height: 210px;">
  <button class="btn btn--gray btn--md is-lit"><span class="ic" aria-hidden="true">download</span>Export</button>
  <div class="coach" role="dialog" aria-labelledby="cm2-t" style="top: 60px; left: 0; --arrow: 36px;">
    <div class="coach__title" id="cm2-t">Export retribusi data to a spreadsheet</div>
    <div class="coach__body">Every column you see is included, in the same order.</div>
    <div class="docs-row" style="margin-top: 14px; justify-content: flex-end;"><button class="btn btn--sm is-primary" onclick="this.closest('.coach').hidden = true; this.closest('.coach').parentElement.querySelector('.is-lit').classList.remove('is-lit');">Got it</button></div>
  </div>
</div>
```

## States
| State | How |
|---|---|
| `open` | The card is placed under the target and the target has `.is-lit`. |
| `next step` | Move the card (`transform`) and the arrow (`--arrow`); change the text; move `.is-lit`. |
| `skipped or done` | Remove the card and `.is-lit`, and remember it so the tour never shows again. |

## Motion and microinteractions
- Between steps the card glides with `transform` on `--spring-smooth` (`--d-smooth`, 560 ms) and the arrow slides with `left` on the same spring, so the eye follows to the new target instead of losing it.
- New step text may rise in with `lds-rise` over `--d-standard` (240 ms) on `--ease-enter`.
- Opacity uses `--d-standard` on `--ease-enter`. Reduced motion: moves become 120 ms linear changes.

## Accessibility
- `role="dialog"` (non-modal) with `aria-labelledby` the title and `aria-describedby` the body. Move focus to the Next button when it opens, and back to the target when it closes.
- Escape must skip the tour; wire it in the app (there is no built-in behavior).
- The page stays usable behind it: no scrim, no focus trap.
- The lit ring is not the only cue; the text names the control ("Filter by kecamatan").

## Do
- Point at one control per step, three steps at most.
- Always offer Skip, and never show a finished tour again.
- Start the tour only after the screen has loaded and the person is idle.

## Don't
- Chain coachmarks across pages.
- Explain what the label already says ("This is the search button").
- Cover the control it points at.

## Behavior (plain HTML)
No built-in behavior: placing the card, moving `--arrow`, toggling `.is-lit`, Escape and remembering completion are up to the app.

## Related
[Hints](hints.md) · [Tooltip](tooltip.md) · [Popover](popover.md) · [Banner](banner.md)
