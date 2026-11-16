# Icon button

Group: Actions. Docs page: `docs/components/icon-button.html`.

A button that shows only an icon: 44 px target, 22 px glyph, round. It always has an `aria-label` and a tooltip with the same words.

## Use it when
- A well-known action in a toolbar, a card corner, a nav bar or a row where a text label would crowd: close, more options, share, bookmark, filter.
- Several small actions sit together and each is recognizable by its icon alone (message actions: copy, retry, like).
- The close button of a dialog, sheet, alert or lightbox.

## Use something else when
- The action is not obvious from an icon, or it is the main action of the view: use [Button](button.md). Give it words. "Export" beats a lone download arrow nobody hovers.
- The one creation action on a phone screen that floats over content: use [Floating action](floating-action.md).
- The icon stays pressed to show a mode (bold, mute, pin): use [Toggle](toggle.md).
- It opens a list of related actions: use [Dropdown menu](dropdown-menu.md). The trigger is still an icon button (`more_horiz`); the menu is the dropdown.
- Copying a value with a visible confirmation: use [Copy button](copy-button.md).

## Where it goes
Top right of cards, dialogs and sheets (close, more); at both ends of the phone nav bar; at the end of list rows; in toolbars grouped 2 to 4 together. On phones keep at least the 44 px target; never shrink `icon-btn` below it.

## Anatomy
| Part | What it is |
|---|---|
| `.icon-btn` | Required. A `<button>` (or `<a href>` when it navigates). 44 by 44, round, transparent until hovered. |
| `aria-label` | Required. The action in words ("More options", "Close"). |
| `.ic` | Required. The glyph, 22 px (19 px in `--filled`). |
| `.tip-host + .tip` | Recommended. Wraps the button so the [tooltip](tooltip.md) shows the same words after 500 ms of hover or on keyboard focus. |

## Markup

**Plain and filled.** Plain for toolbars and nav bars. Filled (a 36 px recessed disc inside the same 44 px target) when the button sits on a busy surface or needs to be found at a glance.
```html
<div class="docs-row">
  <span class="tip-host"><button class="icon-btn" aria-label="Share"><span class="ic" aria-hidden="true">ios_share</span></button><span class="tip" role="tooltip">Share</span></span>
  <span class="tip-host"><button class="icon-btn" aria-label="Bookmark"><span class="ic" aria-hidden="true">bookmark</span></button><span class="tip" role="tooltip">Bookmark</span></span>
  <span class="tip-host"><button class="icon-btn" aria-label="More options"><span class="ic" aria-hidden="true">more_horiz</span></button><span class="tip" role="tooltip">More options</span></span>
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Filter"><span class="ic" aria-hidden="true">tune</span></button><span class="tip" role="tooltip">Filter</span></span>
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Close"><span class="ic" aria-hidden="true">close</span></button><span class="tip" role="tooltip">Close<span class="kbd">esc</span></span></span>
</div>
```

**In a card header.** A more-options button at the end of a card title row. It pulls into the card padding a little so the glyph lines up with the edge.
```html
<div class="card" style="width: 340px;">
  <div class="cluster" style="justify-content: space-between; flex-wrap: nowrap;">
    <div><div class="card__title">Lab report 3</div><div class="card__sub">Computer Networks · due tomorrow</div></div>
    <span class="tip-host" style="margin: -10px -10px 0 0;"><button class="icon-btn" aria-label="More options for Lab report 3"><span class="ic" aria-hidden="true">more_vert</span></button><span class="tip" role="tooltip">More options</span></span>
  </div>
</div>
```

**As a link.** When it goes somewhere, it is an `<a href>` with the same classes.
```html
<span class="tip-host"><a class="icon-btn" href="#settings" aria-label="Settings"><span class="ic" aria-hidden="true">settings</span></a><span class="tip" role="tooltip">Settings</span></span>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `icon-btn` | Transparent; `--bg-tint` on hover, `--bg-tint-strong` while pressed. |
| `icon-btn--filled` | 36 px disc on `--bg-recessed` with 4 px margin, so the target stays 44. |
| `icon-btn--accent` | Accent fill with the primary finish. Only for the [floating action](floating-action.md). |

## States
| State | How |
|---|---|
| `hover` | `--bg-tint` background, on devices that can hover. |
| `:active` | Sinks to `scale(0.9)` in 90 ms with `--bg-tint-strong`, back on `--spring-snappy`. |
| `focus` | System focus ring (`--focus`, 2 px, offset 2 px); the tooltip shows too. |
| `aria-pressed / aria-expanded` | When it toggles or opens something; for a lasting pressed look use [toggle](toggle.md). |
| `disabled` | Prefer hiding the action. If shown disabled, add `disabled`; there is no special style beyond the browser default, so pair it with a reason. |

## Motion and microinteractions
- Press: `transform: scale(0.9)` on `:active` with a 90 ms duration; release returns on `--spring-snappy` over `--d-snappy`. Feedback starts on pointer down.
- Background color changes over `--d-fast` on `--ease-standard`.
- Tooltip: waits 500 ms, then fades in over `--d-fast` and rises on `--spring-snappy`; leaves at once (100 ms on `--ease-exit`).
- When the glyph changes meaning (play to pause), use [icon swap](icon-swap.md) inside the button.

## Accessibility
- `<button type="button">` with `aria-label`; the icon span is `aria-hidden="true"`.
- The label names the action and, when there are many on a page, the object: "More options for Lab report 3".
- The tooltip is supplementary; it uses `role="tooltip"` and shows on `:focus-within`, so keyboard users see it too.
- Target is 44 by 44; do not set a smaller width or height.

## Do
- Use only icons whose meaning is common: close, more, share, search, settings.
- Repeat the `aria-label` words in the tooltip.
- Group related icon buttons with 0 to 4 px between them; the round hover shapes already separate them.

## Don't
- Use an icon button for the primary action of a form or page.
- Shrink it to 32 px to fit a dense row; use a `btn--sm` with text instead.
- Use `icon-btn--accent` anywhere other than a floating action.

## Related
[Button](button.md) · [Tooltip](tooltip.md) · [Floating action](floating-action.md) · [Toggle](toggle.md)
