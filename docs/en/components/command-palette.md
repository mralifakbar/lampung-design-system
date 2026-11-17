# Command palette

Group: Overlays. https://lampung.kartadinata.app/docs/en/components/command-palette

A search box over the page that finds and runs any command or destination by typing. A fast path for people who know what they want; never the only path.

## Use it when
- An app with many destinations and commands where frequent users want keyboard speed: jump to a service, start a new application, switch theme.
- A global search across kinds of things (pages, people, actions) with results as you type.

## Use something else when
- Filtering one list on the page: use [Search field](search-field.md).
- Picking one value for a form field from many: use [Combobox](combobox.md).
- A handful of commands on one object: use [Dropdown menu](dropdown-menu.md).
- The main navigation: use [App shell](app-shell.md). Every command in the palette must also exist in the visible interface.

## Where it goes
48 px from the top of its positioned container (or of the window, in a `position: fixed; inset: 0` wrapper), centered, 520 px wide (16 px from the edges when narrower), above a scrim. Opened by a search button in the top bar and by a keyboard shortcut you wire (usually Cmd or Ctrl+K).

## Anatomy
| Part | What it is |
|---|---|
| `.scrim[data-lds-scrim="id"]` | Required. Click to close. |
| `.cmdk[role=dialog][aria-modal=true]` | Required. The layer, with `id`, `data-lds-layer` and `aria-label`. |
| `.cmdk__search` | Required. The 54 px search row: a `search` icon and the `<input>` (`role="combobox"`, `data-lds-filter="listId"`, `data-lds-autofocus`, `aria-controls` the list). |
| `.cmdk__list[role=listbox]` | Required. The results, scrolling after 260 px. |
| `.cmdk__item[role=option]` | Required. A 42 px result with an icon, the label and an optional `kbd`; needs a unique `id` for `aria-activedescendant`. `.is-active` marks the highlighted one. |
| `.cmdk__empty[data-lds-empty]` | The message shown when nothing matches; `hidden` by default. |
| `.cmdk__foot` | Key hints: move, run, close, with `.kbd`. |

## Markup

**Jump and run.** Open it and type "new" or "sched". Up and Down move the highlight, Enter runs it, Escape closes; type "xyz" to see the empty state.
```html
<button class="btn btn--secondary" data-lds-open="palette" aria-haspopup="dialog">Search</button>

<div class="scrim" data-lds-scrim="palette"></div>
<div class="cmdk" id="palette" role="dialog" aria-modal="true" aria-label="Command palette" data-lds-layer>
  <div class="cmdk__search"><span class="ic" aria-hidden="true">search</span>
    <input placeholder="Type a command or search" aria-label="Command or search" role="combobox" aria-expanded="true" aria-controls="palette-list" data-lds-filter="palette-list" data-lds-autofocus></div>
  <div class="cmdk__list" id="palette-list" role="listbox" aria-label="Results">
    <button class="cmdk__item" role="option" id="cmd-new" data-lds-close><span class="ic" aria-hidden="true">add_circle</span>New application<kbd>⌘N</kbd></button>
    <div class="cmdk__empty" data-lds-empty hidden>Nothing matches. Try a service name or "new".</div>
  </div>
</div>

<script type="module">
  import { openLayer } from 'lampung-design-system/js';
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openLayer('palette'); }
  });
</script>
```

## States
| State | How |
|---|---|
| `.cmdk__item.is-active` | Accent tint and accent text: the result Enter will run. The first visible result is active after each keystroke. |
| `[hidden] (item)` | A result that does not match the query. |
| `.cmdk__empty visible` | No results: says what to try instead. |

## Motion and microinteractions
- Enter: opacity over `--d-fast` (160 ms) on `--ease-enter` and from `scale(0.97)` on `--spring-smooth`, growing from the top center.
- Exit: over `--d-exit` (180 ms) on `--ease-exit`; the scrim fades out with it.
- Results swap instantly as you type; no stagger, no fade. Speed is the point.
- Reduced motion: no scale, opacity only.

## Accessibility
- `role="dialog"`, `aria-modal="true"`, `aria-label`. Focus starts in the input (`data-lds-autofocus`) and is trapped; Escape closes and returns focus to the trigger.
- The input is `role="combobox"` with `aria-controls` the listbox; the script keeps `aria-activedescendant` on the active option and `aria-selected` on the options, so focus never leaves the input.
- Up and Down move the active result; Enter clicks it.
- Show the shortcut on the trigger so people discover it.

## Do
- Name results as verbs or destinations people would type.
- Mirror every palette command somewhere visible.
- Close the palette after running a result (`data-lds-close` on the items).

## Don't
- Make the palette the only way to reach a feature.
- Animate results in as they filter.
- Show an empty list with no message.

## Behavior (plain HTML)
The layer hooks open and close it (`data-lds-open`, `data-lds-close`, `data-lds-scrim`, `openLayer`, `closeLayer`). `input[data-lds-filter="listId"]` hides `[role=option]` children whose text does not contain the query, shows `[data-lds-empty]` when none remain, moves `.is-active` with Up and Down and clicks it on Enter. The global shortcut is yours to wire.

## Related
[Search field](search-field.md) · [Combobox](combobox.md) · [Dropdown menu](dropdown-menu.md) · [Keyboard key](kbd.md)
