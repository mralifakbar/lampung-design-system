# Button group

Group: Actions. https://lampung.kartadinata.app/docs/en/components/button-group

Two to four attached buttons in one outlined box, for separate actions on the same object (undo, redo, history). Each button does something; none of them stays selected.

## Use it when
- A few actions that belong to one object and are used together: undo and redo, zoom out and zoom in, previous and next.
- A toolbar where joining the buttons shows they are one set and saves space.

## Use something else when
- One of the buttons stays selected to show the current view: use [Segmented control](segmented-control.md). A group fires actions; a segmented control holds a choice.
- Each button turns a mode on or off (bold, italic): use [Toggle](toggle.md). Use a toggle group: it shows the pressed state.
- A main action with a few variants of it: use [Split button](split-button.md).
- Unrelated actions that only happen to sit together: use [Layout primitives](layout-primitives.md). Space separate buttons with a `cluster`.
- More than four actions: use [Dropdown menu](dropdown-menu.md). Keep the two most used in the group and move the rest into a more menu.

## Where it goes
In toolbars and page or card headers, aligned with other medium (36 px) controls. On phones keep at most three, or move them into a more menu; the group does not wrap.

## Anatomy
| Part | What it is |
|---|---|
| `.btn-group` | Required. Outlined box, 10 px radius, clips its children. Give it `role="group"` and an `aria-label`. |
| `.btn.btn--md` | Required. Two to four buttons, 36 px tall, no variant class: the group sets their look. A hairline separates neighbors. |
| `.ic` | Optional leading icon in each button. |

## Markup

**Edit history.** Three actions on the same document.
```html
<div class="btn-group" role="group" aria-label="Edit history">
  <button class="btn btn--md"><span class="ic" aria-hidden="true">undo</span>Undo</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">redo</span>Redo</button>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">history</span>History</button>
</div>
```

**Previous and next.** Stepping through files on an application review screen, next to the file count.
```html
<div class="cluster" style="--gap: 12px;">
  <span class="card__sub" style="margin: 0;">File 4 of 40</span>
  <div class="btn-group" role="group" aria-label="File">
    <button class="btn btn--md"><span class="ic" aria-hidden="true">chevron_left</span>Previous</button>
    <button class="btn btn--md">Next<span class="ic" aria-hidden="true">chevron_right</span></button>
  </div>
</div>
```

## States
| State | How |
|---|---|
| `hover` | `--bg-tint` behind the hovered button only. |
| `:active` | No scale (it would break the joined edges); the button fills with `--bg-tint-strong`. |
| `disabled` | `disabled` on one button (redo with nothing to redo) dims it to 38 %. |

## Motion and microinteractions
- Buttons in a group do not sink on press; `transform` is turned off so the outline stays straight. Feedback is the `--bg-tint-strong` fill, applied at once.
- Hover fills change over `--d-fast` on `--ease-standard`.

## Accessibility
- `role="group"` with an `aria-label` that names the set ("Edit history").
- Each child is a normal `<button>` reached with Tab; do not add arrow-key navigation (that is for toggle groups and segmented controls).
- Icon-only buttons in a group need an `aria-label` each.

## Do
- Keep labels short and parallel ("Undo", "Redo").
- Use the medium size; the group is drawn for 36 px buttons.

## Don't
- Use a group as tabs or as a view switcher.
- Put a primary or danger variant inside the group.
- Mix a group with a separate button of the same height right next to it; space them with a `cluster`.

## Related
[Segmented control](segmented-control.md) · [Toggle](toggle.md) · [Split button](split-button.md) · [Button](button.md)
