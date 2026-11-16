# File tile

Group: Data display. Docs page: `docs/components/file-tile.html`.

Files and folders as tiles in a grid: a tinted thumbnail by type (or the picture itself), a two-line name, size and date, a checkbox that appears on hover, focus or while selecting, and a more menu. The tile opens the file; ticking selects it for a bulk action.

## Use it when
- A file manager or a library where people recognize files by type or picture: course materials, shared drive, uploaded receipts.
- Picking several files for one action: download 4 files, move 12 photos, delete 2 drafts.

## Use something else when
- Files attached to a form while they upload: use [File input](file-input.md). Use the file rows of the file input.
- Files compared by size, owner and date: use [Table](table.md). A table scans better than tiles when people sort.
- A folder hierarchy people browse: use [Tree](tree.md).
- Photos inside an article or a message: use [Thumbnail](thumbnail.md).

## Where it goes
In `.file-grid`, which fits as many tiles of at least `--min` (168 px) as the column allows: six to eight on a wide screen, two on a phone. Folders first with `.file-tile--folder` (a shorter thumbnail), then files. Pair with a [selection bar](selection-bar.md) for bulk actions.

## Anatomy
| Part | What it is |
|---|---|
| `.file-grid` | Required. The grid (`role="list"`). Put `data-lds-selection="selbarId"` on it to wire selection; it gets `.is-selecting` while anything is ticked, which keeps every checkbox visible. |
| `.file-tile` | Required. One file (`role="listitem"`). Type modifier sets the tone: `--folder`, `--doc`, `--sheet`, `--image`, `--video`, `--audio`, `--archive`. |
| `.file-tile__open` | Required. The `<a>` (or button) that opens the file: thumbnail, name and meta. |
| `.file-tile__thumb` | Required. 104 px tinted area with the type icon (fill style), or an `<img>` that covers it. |
| `.file-tile__name` | Required. The file name, two lines at most, breaking anywhere so long names never overflow. |
| `.file-tile__meta` | Size and date, one line, tabular figures. |
| `.check.file-tile__check` | The checkbox top left (`input[data-lds-select]` with an `aria-label`). |
| `.icon-btn.file-tile__more` | The more menu top right, with its `.menu`. |

## Markup

**A shared folder.** Hover a tile for its checkbox and menu. Tick one: every checkbox stays visible and the selection bar rises with a rolling count. Shift-click ticks a run; Escape clears.
```html
<div class="file-grid" role="list" aria-label="Q4 planning" data-lds-selection="files-bar">
  <div class="file-tile file-tile--sheet" role="listitem">
    <label class="check file-tile__check"><input type="checkbox" data-lds-select aria-label="Select Budget Q4 2026.xlsx"><span class="check__box" aria-hidden="true">…</span></label>
    <a class="file-tile__open" href="/files/budget-q4"><span class="file-tile__thumb"><span class="ic" aria-hidden="true">description</span></span><span class="file-tile__name">Budget Q4 2026.xlsx</span><span class="file-tile__meta">214 KB · Edited 2 h ago</span></a>
    <button class="icon-btn file-tile__more" aria-label="More actions for Budget Q4 2026.xlsx" aria-haspopup="menu" aria-expanded="false" data-lds-menu="m-budget"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="m-budget" role="menu" style="top: 44px; right: 4px;">…</div>
  </div>
</div>
<div class="selbar" id="files-bar" role="toolbar" aria-label="Selected files">
  <span class="selbar__count" aria-live="polite"><span class="roll" data-lds-roll="0"></span> selected</span>
  <button class="btn btn--md"><span class="ic" aria-hidden="true">download</span>Download</button>
  <button class="icon-btn" data-lds-select-clear aria-label="Clear selection"><span class="ic" aria-hidden="true">close</span></button>
</div>
```

**Compact grid.** `file-grid--compact` for a side panel or a picker: 140 px tiles with shorter thumbnails.
```html
<div class="file-grid file-grid--compact" role="list" aria-label="Recent" style="max-width: 640px;">
  <div class="file-tile file-tile--doc" role="listitem">
    <label class="check file-tile__check"><input type="checkbox" data-lds-select aria-label="Select Minutes 12 Nov.docx"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label>
    <a class="file-tile__open" href="#ft-11"><span class="file-tile__thumb"><span class="ic" aria-hidden="true">description</span></span><span class="file-tile__name">Minutes 12 Nov.docx</span><span class="file-tile__meta">48 KB</span></a>
    <button class="icon-btn file-tile__more" aria-label="More actions for Minutes 12 Nov.docx" aria-haspopup="menu" aria-expanded="false" data-lds-menu="ft-m-11"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="ft-m-11" role="menu" aria-label="Minutes 12 Nov.docx" style="top: 44px; right: 4px;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Download</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Rename</button>
      <div class="menu__sep"></div>
      <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Delete</button>
    </div>
  </div>
  <div class="file-tile file-tile--audio" role="listitem">
    <label class="check file-tile__check"><input type="checkbox" data-lds-select aria-label="Select Interview with Dewi.m4a"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label>
    <a class="file-tile__open" href="#ft-12"><span class="file-tile__thumb"><span class="ic" aria-hidden="true">audio_file</span></span><span class="file-tile__name">Interview with Dewi.m4a</span><span class="file-tile__meta">18 MB</span></a>
    <button class="icon-btn file-tile__more" aria-label="More actions for Interview with Dewi.m4a" aria-haspopup="menu" aria-expanded="false" data-lds-menu="ft-m-12"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="ft-m-12" role="menu" aria-label="Interview with Dewi.m4a" style="top: 44px; right: 4px;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Download</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Rename</button>
      <div class="menu__sep"></div>
      <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Delete</button>
    </div>
  </div>
  <div class="file-tile file-tile--image" role="listitem">
    <label class="check file-tile__check"><input type="checkbox" data-lds-select aria-label="Select Receipt 0412.jpg"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label>
    <a class="file-tile__open" href="#ft-13"><span class="file-tile__thumb"><span class="ic" aria-hidden="true">image</span></span><span class="file-tile__name">Receipt 0412.jpg</span><span class="file-tile__meta">820 KB</span></a>
    <button class="icon-btn file-tile__more" aria-label="More actions for Receipt 0412.jpg" aria-haspopup="menu" aria-expanded="false" data-lds-menu="ft-m-13"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="ft-m-13" role="menu" aria-label="Receipt 0412.jpg" style="top: 44px; right: 4px;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Download</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Rename</button>
      <div class="menu__sep"></div>
      <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Delete</button>
    </div>
  </div>
  <div class="file-tile file-tile--sheet" role="listitem">
    <label class="check file-tile__check"><input type="checkbox" data-lds-select aria-label="Select Payroll November.xlsx"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label>
    <a class="file-tile__open" href="#ft-14"><span class="file-tile__thumb"><span class="ic" aria-hidden="true">description</span></span><span class="file-tile__name">Payroll November.xlsx</span><span class="file-tile__meta">96 KB</span></a>
    <button class="icon-btn file-tile__more" aria-label="More actions for Payroll November.xlsx" aria-haspopup="menu" aria-expanded="false" data-lds-menu="ft-m-14"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="ft-m-14" role="menu" aria-label="Payroll November.xlsx" style="top: 44px; right: 4px;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Download</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Rename</button>
      <div class="menu__sep"></div>
      <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Delete</button>
    </div>
  </div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.file-tile--folder` | Folder: accent tone, 64 px thumbnail. |
| `.file-tile--doc | --sheet | --image | --video | --audio | --archive` | File types, each on its own tone from the `--tile-*` and series palettes. |
| `.file-grid--compact` | 140 px minimum, 72 px thumbnails. |

## States
| State | How |
|---|---|
| `hover, focus-within` | Ring turns `--line-strong`; checkbox and more button fade in. |
| `selected` | The checkbox is ticked: accent tint and a 1.5 px accent ring on the tile. |
| `.file-grid.is-selecting` | Set by the selection hook while anything is ticked: all checkboxes show. |
| `touch screens` | Checkbox and more button always show (no hover to reveal them). |
| `loading` | [Skeleton](skeleton.md) tiles: a 104 px block and two text bars per tile. |
| `empty` | An [empty state](empty-state.md) in place of the grid, with the upload action. |

## Motion and microinteractions
- Press on the tile sinks it to 0.985 in 90 ms and springs back on `--spring-snappy`.
- Checkbox and more button fade in over `--d-fast` and settle from 0.9 on `--spring-snappy`; the tick draws in as in [checkbox](checkbox.md).
- The selection bar rises on `--spring-smooth` and its count rolls ([rolling number](rolling-number.md)).

## Accessibility
- The grid is a `role="list"` with an `aria-label`; each tile a `listitem`.
- The open link and the checkbox are separate controls: the checkbox has its own `aria-label` ("Select Budget Q4 2026.xlsx"), the more button names the file too.
- Checkboxes stay in the tab order even while invisible, and show on focus.
- Type is in the name (extension) and in the icon, never in color alone.

## Do
- Sort folders before files, and keep the extension in the name.
- Use the real picture as the thumbnail for images when you have one.

## Don't
- Truncate names to one line; two lines that break anywhere keep them readable.
- Make the whole tile a checkbox; opening is the main action.

## Behavior (plain HTML)
`data-lds-selection="selbarId"` on the `.file-grid` wires the `input[data-lds-select]` checkboxes: `.is-selected` on each tile, `.is-selecting` on the grid, the selection bar opens with a rolling count, Shift-click ticks a run, Escape and `[data-lds-select-clear]` clear. Fires `lds:select` with `{ count, items }`. Call `selectionRefresh(grid)` after adding or removing tiles. The more buttons use the menu hook (`data-lds-menu`).

## Related
[Selection bar](selection-bar.md) · [Thumbnail](thumbnail.md) · [File input](file-input.md) · [Table](table.md)
