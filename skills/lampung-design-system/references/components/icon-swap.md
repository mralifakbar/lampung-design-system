# Icon swap

Group: Microinteractions. Docs page: `docs/components/icon-swap.html`.

One glyph turns into another in place: the old one shrinks to half and blurs away while the new one settles on a snappy spring. For icons that say a new state (copied, playing, saved), not for decoration.

## Use it when
- A copy button confirms it worked: `content_copy` becomes `check` for 1.6 s ([copy button](copy-button.md) does this).
- A toggle whose icon names the state: play and pause, bookmark and saved, show and hide password.
- An icon button whose action changes after use: expand and collapse when the label is not shown.

## Use something else when
- Words change (Save, Saved): use [Text morph](text-morph.md).
- Endorsing with a count and a celebration: use [Like](like.md).
- Menu icon to close icon: use [Menu icon](menu-icon.md). The three bars fold instead of swapping.
- A chevron that turns with an opening panel: use [Height expand](height-expand.md). Rotate it on the same spring as the panel.
- A selected state that just fills the icon (tab bar, sidebar): use [Sliding indicator](sliding-indicator.md).

## Where it goes
Inside a button: an [icon button](icon-button.md), a small plain button next to a label, a code block bar. The swap box is 20 px; both glyphs sit in the same grid cell.

## Anatomy
| Part | What it is |
|---|---|
| `.swap` | Required. `aria-hidden` inline grid, 20 × 20. |
| `.swap__a` | Required. The resting glyph. |
| `.swap__b` | Required. The other glyph (add `ic--fill` for a filled state). |
| `.is-swapped` | On `.swap`: shows `swap__b`. |

## Markup

**Copy, then copied.** Press copy: the icon becomes a check and the label says Copied, then both come back after 1.6 s.
```html
<div class="codeblock" style="width: 100%; max-width: 420px;"><div class="codeblock__bar"><span>Install</span><button class="btn btn--plain btn--sm" data-lds-copy="npm install lampung-design-system"><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b">check</span></span><span data-lds-copy-label="Copied">Copy</span></button></div><pre>npm install lampung-design-system</pre></div>
<button class="icon-btn" aria-label="Copy the invitation link" data-lds-copy="https://example.id/musrenbang/way-halim"><span class="swap" aria-hidden="true"><span class="ic swap__a">link</span><span class="ic swap__b">check</span></span></button>
```

**Play and pause.** A public briefing recording. The icon is the state, so it swaps; the label follows for screen readers.
```html
<button class="icon-btn icon-btn--accent" aria-pressed="false" aria-label="Play recording" onclick="this.querySelector('.swap').classList.toggle('is-swapped'); const p = this.getAttribute('aria-pressed') !== 'true'; this.setAttribute('aria-pressed', String(p)); this.setAttribute('aria-label', p ? 'Pause recording' : 'Play recording');"><span class="swap" aria-hidden="true"><span class="ic swap__a">play_arrow</span><span class="ic swap__b">pause</span></span></button>
<span class="card__sub">Regional tax briefing, 48 min</span>
```

**Save for later.** Bookmarking a service: the outline swaps to the filled icon. Quiet on purpose; there is no count and no burst.
```html
<button class="icon-btn" aria-pressed="false" aria-label="Save service" onclick="this.querySelector('.swap').classList.toggle('is-swapped'); const p = this.getAttribute('aria-pressed') !== 'true'; this.setAttribute('aria-pressed', String(p)); this.setAttribute('aria-label', p ? 'Saved service' : 'Save service');"><span class="swap" aria-hidden="true"><span class="ic swap__a">bookmark</span><span class="ic ic--fill swap__b">bookmark</span></span></button>
<button class="icon-btn" aria-pressed="false" aria-label="Show password" onclick="this.querySelector('.swap').classList.toggle('is-swapped'); const p = this.getAttribute('aria-pressed') !== 'true'; this.setAttribute('aria-pressed', String(p)); this.setAttribute('aria-label', p ? 'Hide password' : 'Show password');"><span class="swap" aria-hidden="true"><span class="ic swap__a">visibility</span><span class="ic swap__b">visibility_off</span></span></button>
```

## Motion and microinteractions
- Leaving glyph: to `scale(0.5)` with `blur(4px)` and opacity 0; opacity and blur over `--d-fast` (160 ms) on `--ease-standard`, scale on `--spring-snappy`.
- Arriving glyph: from the same state to `none` on `--spring-snappy` (`--d-snappy`, 360 ms) while it fades in over `--d-fast`. Both run at once, so the swap reads as one object changing.
- Interruption: toggling `.is-swapped` again mid-swap reverses both glyphs from where they are.
- Reduced motion: a 120 ms cross-fade with no scale.

## Accessibility
- The swap is `aria-hidden`. The button carries the meaning: `aria-pressed` for toggles, and an `aria-label` that names the action now available ("Pause recording").
- Copy announces nothing by itself; when it matters, keep a visible label that changes (`data-lds-copy-label`) or add a polite status.

## Do
- Swap between two glyphs that mean two states of the same thing.
- Change `aria-label` or `aria-pressed` with the glyph.
- Use `ic--fill` on `swap__b` for a filled "on" state.

## Don't
- Rotate or flip icons to swap them.
- Swap icons on hover.
- Use the swap for menu to close; use [menu icon](menu-icon.md).

## Behavior (plain HTML)
CSS only: toggle `.is-swapped` on `.swap`. `[data-lds-copy]` does it for copy buttons (and restores after 1.6 s, with `data-lds-copy-label` for the visible label).

## Related
[Copy button](copy-button.md) · [Icon button](icon-button.md) · [Toggle](toggle.md) · [Text morph](text-morph.md)
