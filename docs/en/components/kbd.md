# Keyboard key

Group: Actions. https://lampung.kartadinata.app/docs/en/components/kbd

A small key cap that shows a keyboard shortcut: `.kbd` for one key, `.kbd-row` for a combination. Shortcuts are hints next to an action, never the only way to reach it.

## Use it when
- Showing the shortcut for an action in a [tooltip](tooltip.md), a [dropdown menu](dropdown-menu.md) item or the [command palette](command-palette.md) footer.
- Help text or onboarding that teaches a shortcut ("Press ⌘ K to search").
- A legend under a list that is driven by keys (↑ ↓ to move, ↵ to open).

## Use something else when
- Showing code, a file name or a value in text: use [Inline code](inline-code.md).
- A count next to a label: use [Count](count.md).
- A status word (Draft, Due tomorrow): use [Badge](badge.md).
- A real button the person presses on screen: use [Button](button.md).

## Where it goes
After the label it belongs to: at the end of a menu item (`.menu__item .kbd-row` aligns right on its own), inside a tooltip after the text, inline in a sentence. Hide shortcut hints on touch-only devices; they mean nothing there.

## Anatomy
| Part | What it is |
|---|---|
| `.kbd` | Required. One key: 22 px tall, at least 22 px wide, 12 px medium text on `--bg-base` with a 1.5 px bottom edge. Use `<kbd>` as the element. |
| `.kbd-row` | Wraps several `.kbd` for a combination, 4 px apart. |

## Markup

**Keys and combinations.** Use the symbols people see on their keyboard; spell out keys that have no common symbol (esc, tab).
```html
<div class="docs-row" style="gap: 28px;">
  <span class="kbd-row"><kbd class="kbd">⌘</kbd><kbd class="kbd">K</kbd></span>
  <span class="kbd-row"><kbd class="kbd">⇧</kbd><kbd class="kbd">⌘</kbd><kbd class="kbd">P</kbd></span>
  <kbd class="kbd">esc</kbd>
  <span class="kbd-row"><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd><span class="docs-note" style="margin-left: 6px;">to move</span></span>
  <span class="kbd-row"><kbd class="kbd">↵</kbd><span class="docs-note" style="margin-left: 6px;">to open</span></span>
</div>
```

**In a tooltip and a sentence.** Inside a tooltip the key adapts to the dark surface by itself.
```html
<div class="docs-row" style="gap: 24px;">
  <span class="tip-host"><button class="icon-btn icon-btn--filled" aria-label="Search" aria-keyshortcuts="Meta+K"><span class="ic" aria-hidden="true">search</span></button><span class="tip" role="tooltip">Search<span class="kbd">⌘K</span></span></span>
  <p class="card__sub" style="margin: 0;">Press <kbd class="kbd">/</kbd> anywhere to jump to the search field.</p>
</div>
```

**In a menu.** A `kbd-row` inside a menu item pushes to the right edge.
```html
<div class="menu is-open" role="menu" aria-label="Edit" style="position: relative;">
  <button class="menu__item" role="menuitem" aria-keyshortcuts="Meta+C"><span class="ic" aria-hidden="true">content_copy</span>Copy link<span class="kbd-row"><kbd class="kbd">⌘</kbd><kbd class="kbd">C</kbd></span></button>
  <button class="menu__item" role="menuitem" aria-keyshortcuts="Meta+D"><span class="ic" aria-hidden="true">edit_square</span>Duplicate<span class="kbd-row"><kbd class="kbd">⌘</kbd><kbd class="kbd">D</kbd></span></button>
</div>
```

## Motion and microinteractions
- None. Keys are static labels.

## Accessibility
- Use the `<kbd>` element so the meaning survives without styles.
- Put the shortcut on the control itself with `aria-keyshortcuts` (for example `Meta+K`); the visible key cap is for sighted users.
- Screen readers read symbols like ⌘ inconsistently; where the shortcut is the content (help pages), write it out too ("Command K").
- Every shortcut also has a visible, clickable path.

## Do
- Show the platform key: ⌘ on Mac, Ctrl elsewhere.
- Keep one key per cap; use a `kbd-row` for combinations.

## Don't
- Style `.kbd` as a button or make it clickable.
- Show shortcuts on phone layouts.
- Make a shortcut the only way to reach an action.

## Related
[Tooltip](tooltip.md) · [Dropdown menu](dropdown-menu.md) · [Command palette](command-palette.md) · [Inline code](inline-code.md)
