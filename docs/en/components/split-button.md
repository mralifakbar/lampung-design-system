# Split button

Group: Actions. https://lampung.kartadinata.app/docs/en/components/split-button

A primary button joined to a chevron that opens a menu of variants of the same action (Publish, or schedule it, or publish to members only). The left part does the common thing in one press.

## Use it when
- One action is used most of the time and has two to five less common variants: Publish / Schedule for later / Save as draft; Export PDF / Export CSV.
- Space is tight and the variants should not each get their own button.

## Use something else when
- The menu holds unrelated actions on an object (rename, move, delete): use [Dropdown menu](dropdown-menu.md). Use an icon button with `more_horiz` as its trigger.
- Only one action exists: use [Button](button.md).
- Picking an option that the button then shows (a selected value): use [Select](select.md).
- Separate actions of equal weight: use [Button group](button-group.md).

## Where it goes
Where the primary would be: the end of a page header, the toolbar of an editor, the footer of a form. The menu opens below and aligns to the right edge of the chevron (`menu--right`). On phones prefer a full-width primary plus the variants in a [sheet](sheet.md).

## Anatomy
| Part | What it is |
|---|---|
| `.split` | Required. The wrapper; `position: relative` so the menu anchors to it. Gets `.is-open` while the menu is open (set by `init()`). |
| `.btn.btn--primary (first)` | Required. The common action, labelled with its outcome. |
| `.btn.btn--primary (second)` | Required. The chevron: `aria-haspopup="menu"`, `aria-expanded`, `aria-label` ("More publish options"), `data-lds-menu="menu-id"`, and an `expand_more` icon. |
| `.menu.menu--right` | Required. The menu with `role="menu"` and `.menu__item` buttons (`role="menuitem"`). Position it under the wrapper with `top: calc(100% + 6px); right: 0`. |

## Markup

**Publish with variants.** Press the chevron or focus it and press Arrow down. The chevron turns while the menu is open.
```html
<div class="split">
  <button class="btn btn--primary btn--md">Publish</button>
  <button class="btn btn--primary btn--md" aria-haspopup="menu" aria-expanded="false" aria-label="More publish options" data-lds-menu="split-publish"><span class="ic" aria-hidden="true">expand_more</span></button>
  <div class="menu menu--right" id="split-publish" role="menu" style="top: calc(100% + 6px); right: 0;">
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">schedule_send</span>Schedule for later</button>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">group</span>Publish to members only</button>
    <div class="menu__sep" role="separator"></div>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">draft</span>Save as draft</button>
  </div>
</div>
```

**Default size.** The same pattern at 44 px, next to its secondary. Only the primary (and danger) variants are drawn for a split; the chevron edge uses their tone.
```html
<div class="docs-row">
  <button class="btn btn--secondary">Cancel</button>
  <div class="split">
    <button class="btn btn--primary">Export PDF</button>
    <button class="btn btn--primary" aria-haspopup="menu" aria-expanded="false" aria-label="Other export formats" data-lds-menu="split-export"><span class="ic" aria-hidden="true">expand_more</span></button>
    <div class="menu menu--right" id="split-export" role="menu" style="top: calc(100% + 6px); right: 0;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">description</span>Export CSV</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">receipt_long</span>Print payment receipt</button>
    </div>
  </div>
</div>
```

## States
| State | How |
|---|---|
| `open` | `.split.is-open` and `aria-expanded="true"` on the chevron; `.menu.is-open`. All set by `init()`. |
| `loading` | Put `.is-loading` on the left button only (with `btn__label` and `btn__spin`); keep the chevron usable or disable it. |
| `disabled` | `disabled` on both buttons together. |

## Motion and microinteractions
- The chevron rotates 180 degrees on `--spring-smooth` over `--d-smooth` while open.
- The menu grows from its top right corner: opacity over `--d-fast` on `--ease-enter`, `scale(0.96) translateY(-4px)` to rest on `--spring-smooth`. It leaves in `--d-exit` on `--ease-exit`.
- The two halves do not sink on press (`transform: none`) so the seam stays aligned; the press shows as the pressed fill.
- Under reduced motion the menu stops scaling and fades in 120 ms.

## Accessibility
- Two real buttons. The chevron has `aria-haspopup="menu"`, `aria-expanded` and an `aria-label` naming what it opens.
- Keyboard: Enter or Space on the chevron toggles the menu, Arrow down opens it and focuses the first item; Arrow up and down move; Escape closes and returns focus to the chevron. A click outside closes it.
- Menu items are `role="menuitem"` buttons; separators are `role="separator"`.

## Do
- Label the left part with the most common outcome.
- Keep the menu to two to five variants of that same action.
- Give the chevron an `aria-label` that says what is inside.

## Don't
- Use secondary, tinted or gray variants; the split seam is drawn for filled tones only.
- Put destructive or unrelated actions in the menu.
- Make the left part open the menu too.

## Behavior (plain HTML)
`data-lds-menu="menu-id"` on the chevron. `init()` opens and closes the menu, sets `aria-expanded`, toggles `.is-open` on `.split`, and handles arrows and Escape. `closeMenus()` closes any open menu.

## Related
[Button](button.md) · [Dropdown menu](dropdown-menu.md) · [Button group](button-group.md) · [Sheet](sheet.md)
