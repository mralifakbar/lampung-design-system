# Tree

Group: Data display. Docs page: `docs/components/tree.html`.

Nested rows that open and close: folders and files, units and lessons. Each parent is a button with `aria-expanded`; its children open on a spring.

## Use it when
- A hierarchy people browse: course files in folders, units with lessons, a syllabus with chapters and sections.
- A side panel for navigating a nested structure while the content shows on the right.

## Use something else when
- A flat list of items: use [List](list.md).
- Sections of one page that open in place: use [Accordion](accordion.md).
- The main navigation of the app, with groups: use [App shell](app-shell.md). The app shell has nested sections.
- Links to sections of the current page: use [Outline](outline.md).

## Where it goes
In a side column of 240 to 320 px beside the content (an [app shell](app-shell.md) sidebar or a [resizable split](resizable-split.md)), or full width on phones as a page of its own. Rows are 32 px, dense on purpose.

## Anatomy
| Part | What it is |
|---|---|
| `.tree` | Required. A column with 1 px between rows, 14 px text. |
| `button.tree__row[aria-expanded][aria-controls]` | A parent row: chevron (`.tree__chev`, `chevron_right`), an icon and the label. Turns the chevron 90 degrees when open. |
| `.tree__row (leaf)` | A leaf: a `<button>` or an `<a>` with an icon and the label. `.is-selected` for the current one. |
| `.tree__kids(.is-open) > div` | Required for parents. The children, indented 22 px, opening through grid rows. The `id` matches `aria-controls`. |

## Markup

**Course files.** Open and close the folders. The selected file is on the accent tint.
```html
<nav class="tree" aria-label="Course files" style="max-width: 300px;">
  <button class="tree__row" aria-expanded="true" aria-controls="tk1"><span class="ic tree__chev" aria-hidden="true">chevron_right</span><span class="ic" aria-hidden="true">folder_open</span>Week 1: introduction</button>
  <div class="tree__kids is-open" id="tk1"><div>
    <a class="tree__row is-selected" href="#syllabus" aria-current="page"><span class="ic" aria-hidden="true">description</span>Syllabus</a>
    <a class="tree__row" href="#slides"><span class="ic" aria-hidden="true">description</span>Lecture slides</a>
  </div></div>
  <button class="tree__row" aria-expanded="false" aria-controls="tk2"><span class="ic tree__chev" aria-hidden="true">chevron_right</span><span class="ic" aria-hidden="true">folder</span>Week 2: sampling</button>
  <div class="tree__kids" id="tk2"><div>
    <a class="tree__row" href="#reading"><span class="ic" aria-hidden="true">description</span>Reading list</a>
    <a class="tree__row" href="#quiz"><span class="ic" aria-hidden="true">assignment</span>Practice quiz</a>
  </div></div>
</nav>
```

## States
| State | How |
|---|---|
| `closed / open` | `aria-expanded` on the parent row and `.is-open` on its `.tree__kids`; the chevron turns 90 degrees. |
| `selected` | `.is-selected` (accent tint) plus `aria-current="page"` on a link. |
| `hover` | `--bg-tint` on the row. |

## Motion and microinteractions
- Children open through `grid-template-rows` 0fr to 1fr on `--spring-smooth` (`--d-smooth`, 560 ms); the chevron turns on the same spring. Both are transitions, so they reverse mid-way.
- Reduced motion: 120 ms linear changes.

## Accessibility
- Built as above it is a set of disclosure buttons and links inside a `<nav>`: Tab moves between rows, Enter or Space opens a folder. This is the supported pattern.
- Only use `role="tree"` and `role="treeitem"` if you also implement the tree keyboard model (arrow keys move and open, a single tab stop); `lds.js` does not.
- Closed children stay focusable; set `inert` on a closed `.tree__kids` when it holds links, so Tab skips them.
- Icons are `aria-hidden="true"`; the label is the name.

## Do
- Keep labels short; the depth already gives context.
- Open the branch that holds the current item.
- Limit depth to three levels.

## Don't
- Use a tree for a flat list.
- Add `role="tree"` without the arrow-key behavior.
- Put actions on every row; use a [context menu](context-menu.md).

## Behavior (plain HTML)
`init()` wires every `.tree__row[aria-controls]` like an accordion button: a click flips `aria-expanded` and toggles `.is-open` on the controlled `.tree__kids`. Selection is app logic.

## Related
[Accordion](accordion.md) · [App shell](app-shell.md) · [List](list.md) · [Resizable split](resizable-split.md)
