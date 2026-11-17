# Reduced motion

Group: Motion. Docs page: `docs/components/reduced-motion.html`.

When people ask their device for less motion, the system keeps every state change and drops the travel: transitions become 120 ms linear changes, keyframe animations play once in 1 ms, dialogs and menus stop scaling, shimmer and sparks stop, flights and scroll reveals are skipped. Spinners keep turning because they report work.

## Use it when
- Always: it is built into the CSS and JS. Check it whenever you add motion to the system.
- Testing a screen: turn on Reduce motion (macOS: Accessibility, Display; iOS: Accessibility, Motion; Windows: Animation effects off; Android: Remove animations) or emulate it in the browser dev tools.

## Use something else when
- Deciding which motion to use in the first place: use [Motion principles](motion-principles.md).
- People who want no haptics: use [Haptics](haptics.md). Set `data-lds-haptics="off"` on `<html>`.
- Dark or high-contrast appearance: use [Theming](theming.md).

## Where it goes
Global: one `@media (prefers-reduced-motion: reduce)` block in `css/components.css` covers everything under `.lds`, plus a few component blocks; `js/lds.js` checks the same media query before flights, throws, morphs and smooth scrolling.

## Markup

**What keeps moving.** Turn on Reduce motion in your system settings and come back. The spinner still turns and the bar still fills, because they report work in progress. The shimmer stops and becomes plain text.
```html
<div class="docs-row">
  <span class="docs-row" style="gap: 8px;"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="shimmer">Checking your documents</span></span>
  <div style="width: 200px;"><div class="progress progress--indeterminate" role="progressbar" aria-label="Preparing your tax receipt"><div class="progress__fill"></div></div></div>
</div>
```

**What changes.** Open the dialog and switch the toggle in both modes. With reduced motion the dialog fades without scaling, the switch thumb moves in 120 ms with no spring, and the like burst shows the filled heart without sparks.
```html
<div class="viewport docs-box" style="height: 300px;">
  <div class="viewport__content">
    <div class="docs-row">
      <button class="btn btn--secondary btn--md" data-lds-open="rm-dialog" aria-haspopup="dialog">Cancel the visit</button>
      <label class="switch"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span>Reminders</label>
      <button class="like" aria-pressed="false" data-lds-like aria-label="Like"><span class="like__heart"><span class="ic" aria-hidden="true">favorite</span></span><span class="roll" data-lds-roll="12"></span></button>
    </div>
  </div>
  <div class="scrim" data-lds-scrim="rm-dialog"></div>
  <div class="dialog" id="rm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="rm-dialog-t" data-lds-layer>
    <h3 class="dialog__title" id="rm-dialog-t">Cancel your puskesmas visit?</h3>
    <p class="dialog__body">Your queue number is released; you can book again for another day.</p>
    <div class="dialog__actions"><button class="btn btn--secondary btn--md" data-lds-close data-lds-autofocus>Keep the visit</button><button class="btn btn--danger btn--md" data-lds-close>Cancel visit</button></div>
  </div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `Transitions` | Every `transition-duration` under `.lds` becomes 120 ms with `linear` timing: state still changes visibly, without springs or travel time. |
| `Keyframe animations` | `animation-duration: 1ms`, one iteration: entrances (messages, file rows, tab panels, stagger) appear at once; shakes, rings and stretches are skipped. |
| `Overlays` | `.dialog`, `.menu`, `.popover`, `.cmdk` keep `transform: none`: they fade only. Page modals (`.modal`, `.overlay`) have no animation and `closeModal()` closes at once. |
| `Loops` | Shimmer stops (solid text), the dot grid stops at 60 % opacity, like sparks are hidden, the live status dot stops pulsing. Spinners keep turning at full speed. |
| `JS motion` | Text morph swaps the word at once; the lightbox skips its flight; a thrown sheet does not bounce; streamed words arrive without delay; reveal-on-scroll and smooth scrolling are off; navigation progress shows a plain fade. |
| `Still moving` | Direct manipulation (dragging a sheet, a knob, a row) still follows the finger: the person is moving it. |

## Motion and microinteractions
- Rule: keep the change, drop the travel. Every state that animates by default still changes under reduced motion, just at once or in 120 ms.
- Loops that report work keep running (spinner, indeterminate bar, thinking timer); decorative loops stop.
- New system motion must add its own reduced-motion handling if the global rule is not enough, for example when it moves something across the screen with a transition (120 ms of travel is still travel).
- Do not offer a separate in-app motion switch unless the product needs it; the system setting is the switch.

## Accessibility
- Reduced motion is an accessibility setting: vestibular disorders, migraine, attention. Respect it everywhere, not only in large animations.
- Never hide information behind motion: if something is only understood by watching it move, it fails under reduced motion.
- Reduced transparency is a separate setting: bars and the app shell top bar become solid surfaces.

## Do
- Test every new screen with Reduce motion on.
- Keep spinners and progress moving.
- Check `matchMedia('(prefers-reduced-motion: reduce)')` before running JS motion.

## Don't
- Remove state changes along with the motion.
- Leave a long slide running at 120 ms; switch it to a fade.
- Override the global rule with `!important` transitions in a component.

## Behavior (plain HTML)
Behaviors in `js/lds.js` check `prefers-reduced-motion` themselves: `morphText`, `observeReveal`, the lightbox, `closeModal`, the sheet throw, `streamText` and `[data-lds-jump]`. React bindings do the same.

## Related
[Motion principles](motion-principles.md) · [Haptics](haptics.md) · [Theming](theming.md) · [Enter and exit](enter-and-exit.md)
