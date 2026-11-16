# Resizable split

Group: Page patterns. Docs page: `docs/components/resizable-split.html`.

Two panes with a handle between them that people drag, or move with the arrow keys, to share the space. For tools where both panes are worked in at once.

## Use it when
- Two panes used side by side and the right balance depends on the person: a question list and its editor, a reading passage and its questions, a student list and their submission.
- A stacked pair on wide screens where the lower pane is a console or preview (`resize--y`).

## Use something else when
- A fixed side column next to content (filters, details): use [Layout primitives](layout-primitives.md). Use `.split-2`, which also stacks on phones.
- App navigation beside the page: use [App shell](app-shell.md).
- A panel that opens over the page for a task: use [Drawer](drawer.md). Or a [sheet](sheet.md) on phones.
- Two views people switch between, not use together: use [Tabs](tabs.md).

## Where it goes
In full-height tool pages on wide screens, inside a parent with a fixed height (the split fills it). Below about 760 px there is no room for two panes: show one at a time with [tabs](tabs.md) or a [segmented control](segmented-control.md), or stack them without the handle.

## Anatomy
| Part | What it is |
|---|---|
| `.resize` | Required. Flex container with `data-lds-resize`; `--size` (default 50 %) is the first pane share. `data-min` and `data-max` (default 20 and 80) bound it in percent. |
| `first child` | Required. The first pane, `flex-basis: var(--size)`, scrolls inside. |
| `.resize__handle` | Required. 12 px handle with a 4 by 36 px grip. Give it an `aria-label` and `aria-controls` (the first pane id); the JS adds `role="separator"`, `tabindex`, orientation and values. |
| `last child` | Required. The second pane, takes the rest, scrolls inside. |
| `.resize--y` | Vertical variant: panes stacked, a row-resize handle between. |

## Markup

**Passage and questions.** Drag the handle, or focus it and use Left and Right (Shift for bigger steps), Home and End.
```html
<div class="resize card" data-lds-resize data-min="25" data-max="75" style="--size: 55%; height: 280px; width: 100%; padding: 0;">
  <div id="rz-passage" style="padding: 16px;"><h3 class="section__title-sm">Reading passage</h3><p class="section__sub" style="margin-top: 8px;">Coral reefs cover less than one percent of the ocean floor, yet they support about a quarter of all marine species. Rising water temperatures cause corals to expel the algae that feed them, a process known as bleaching.</p></div>
  <div class="resize__handle" aria-label="Resize passage" aria-controls="rz-passage"></div>
  <div style="padding: 16px;"><h3 class="section__title-sm">Question 4 of 10</h3><p class="section__sub" style="margin-top: 8px;">What does the passage say causes bleaching?</p></div>
</div>
```

**Editor over a preview.** `resize--y` stacks the panes; Up and Down move the handle.
```html
<div class="resize resize--y card" data-lds-resize style="--size: 60%; height: 300px; width: 100%; padding: 0;">
  <div id="rz-editor" style="padding: 16px;"><h3 class="section__title-sm">Question text</h3><p class="section__sub" style="margin-top: 8px;">Which number continues the series 2, 6, 12, 20, …?</p></div>
  <div class="resize__handle" aria-label="Resize editor" aria-controls="rz-editor"></div>
  <div style="padding: 16px;"><h3 class="section__title-sm">Preview</h3></div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.resize` | Side by side, `col-resize` cursor. |
| `.resize--y` | Stacked, `row-resize` cursor. |

## States
| State | How |
|---|---|
| `hover / focus-visible / .is-dragging` | The grip turns accent and grows from 36 to 56 px long. |
| `at min or max` | The handle stops; `aria-valuenow` equals `aria-valuemin` or `aria-valuemax`. |

## Motion and microinteractions
- The panes follow the pointer 1:1 (no transition on size), so dragging never lags.
- The grip changes color in `--d-fast` (160 ms) and length on `--spring-snappy` (360 ms) when hovered, focused or held.
- Reduced motion: the grip changes in 120 ms linear.

## Accessibility
- The handle becomes `role="separator"` with `tabindex="0"`, `aria-orientation`, `aria-valuemin`, `aria-valuemax` and `aria-valuenow` (percent of the first pane).
- Keys: Left and Up shrink, Right and Down grow, by 2 % (10 % with Shift); Home and End go to the bounds.
- The JS does not name the handle: add `aria-label` ("Resize passage") and `aria-controls` with the first pane id.
- Both panes scroll on their own; make sure each has a heading so screen reader users know where they are.

## Do
- Start at the split most people want and keep the bounds so neither pane becomes useless.
- Remember the size per person: save `size` from `lds:resize`.

## Don't
- Use a split on phones.
- Put a split inside a page that scrolls as a whole; give it a fixed height.

## Behavior (plain HTML)
`data-lds-resize` on `.resize`: pointer drag and keys set `--size`, clamp it to `data-min`/`data-max`, keep the ARIA values current, and fire `lds:resize` with `{ size }` when a drag ends (key presses do not fire it).

## Related
[Layout primitives](layout-primitives.md) · [App shell](app-shell.md) · [Drawer](drawer.md) · [Tabs](tabs.md)
