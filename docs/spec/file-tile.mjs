const BOX = '<span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span>';
const tile = (type, icon, name, meta, id, checked = false) => `<div class="file-tile file-tile--${type}" role="listitem">
    <label class="check file-tile__check"><input type="checkbox" data-lds-select aria-label="Select ${name}"${checked ? ' checked' : ''}>${BOX}</label>
    <a class="file-tile__open" href="#ft-${id}"><span class="file-tile__thumb"><span class="ic" aria-hidden="true">${icon}</span></span><span class="file-tile__name">${name}</span><span class="file-tile__meta">${meta}</span></a>
    <button class="icon-btn file-tile__more" aria-label="More actions for ${name}" aria-haspopup="menu" aria-expanded="false" data-lds-menu="ft-m-${id}"><span class="ic" aria-hidden="true">more_horiz</span></button>
    <div class="menu menu--right" id="ft-m-${id}" role="menu" aria-label="${name}" style="top: 44px; right: 4px;">
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Download</button>
      <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Rename</button>
      <div class="menu__sep"></div>
      <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Delete</button>
    </div>
  </div>`;

export default {
  title: 'File tile',
  group: 'Data display',
  order: 20,
  summary: 'Files and folders as tiles in a grid: a tinted thumbnail by type (or the picture itself), a two-line name, size and date, a checkbox that appears on hover, focus or while selecting, and a more menu. The tile opens the file; ticking selects it for a bulk action.',
  when: [
    'A file manager or a library where people recognize files by type or picture: course materials, shared drive, uploaded receipts.',
    'Picking several files for one action: download 4 files, move 12 photos, delete 2 drafts.',
  ],
  whenNot: [
    ['Files attached to a form while they upload', 'file-input', 'Use the file rows of the file input'],
    ['Files compared by size, owner and date', 'table', 'A table scans better than tiles when people sort'],
    ['A folder hierarchy people browse', 'tree'],
    ['Photos inside an article or a message', 'thumbnail'],
  ],
  where: 'In `.file-grid`, which fits as many tiles of at least `--min` (168 px) as the column allows: six to eight on a wide screen, two on a phone. Folders first with `.file-tile--folder` (a shorter thumbnail), then files. Pair with a [selection bar](selection-bar) for bulk actions.',
  anatomy: [
    ['.file-grid', 'Required. The grid (`role="list"`). Put `data-lds-selection="selbarId"` on it to wire selection; it gets `.is-selecting` while anything is ticked, which keeps every checkbox visible.'],
    ['.file-tile', 'Required. One file (`role="listitem"`). Type modifier sets the tone: `--folder`, `--doc`, `--sheet`, `--image`, `--video`, `--audio`, `--archive`.'],
    ['.file-tile__open', 'Required. The `<a>` (or button) that opens the file: thumbnail, name and meta.'],
    ['.file-tile__thumb', 'Required. 104 px tinted area with the type icon (fill style), or an `<img>` that covers it.'],
    ['.file-tile__name', 'Required. The file name, two lines at most, breaking anywhere so long names never overflow.'],
    ['.file-tile__meta', 'Size and date, one line, tabular figures.'],
    ['.check.file-tile__check', 'The checkbox top left (`input[data-lds-select]` with an `aria-label`).'],
    ['.icon-btn.file-tile__more', 'The more menu top right, with its `.menu`.'],
  ],
  examples: [
    {
      title: 'A shared folder',
      desc: 'Hover a tile for its checkbox and menu. Tick one: every checkbox stays visible and the selection bar rises with a rolling count. Shift-click ticks a run; Escape clears.',
      stage: 'block',
      html: `<div class="viewport docs-box" style="height: 470px; width: 100%;"><div class="viewport__content" style="overflow: auto; align-items: stretch;">
<div class="file-grid" role="list" aria-label="Q4 planning" data-lds-selection="ft-bar" style="width: 100%;">
  ${tile('folder', 'folder', 'Receipts', '48 files', 1)}
  ${tile('folder', 'folder', 'Contracts', '12 files', 2)}
  ${tile('sheet', 'description', 'Budget Q4 2026.xlsx', '214 KB · Edited 2 h ago', 3)}
  ${tile('doc', 'description', 'Launch plan for the November cohort.docx', '1.2 MB · 14 Nov', 4)}
  ${tile('image', 'image', 'Venue floor plan.png', '3.4 MB · 12 Nov', 5)}
  ${tile('video', 'movie', 'Onboarding walkthrough.mp4', '86 MB · 9 Nov', 6)}
  ${tile('archive', 'folder_zip', 'Brand assets.zip', '24 MB · 2 Nov', 7)}
</div>
<div class="selbar" id="ft-bar" role="toolbar" aria-label="Selected files"><span class="selbar__count" aria-live="polite"><span class="roll" data-lds-roll="0"></span> selected</span><button class="btn btn--md"><span class="ic" aria-hidden="true">download</span>Download</button><button class="btn btn--md btn--danger"><span class="ic" aria-hidden="true">delete</span>Delete</button><button class="icon-btn" data-lds-select-clear aria-label="Clear selection"><span class="ic" aria-hidden="true">close</span></button></div>
</div></div>`,
      code: `<div class="file-grid" role="list" aria-label="Q4 planning" data-lds-selection="files-bar">
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
</div>`,
    },
    {
      title: 'Compact grid',
      desc: '`file-grid--compact` for a side panel or a picker: 140 px tiles with shorter thumbnails.',
      stage: 'block',
      html: `<div class="file-grid file-grid--compact" role="list" aria-label="Recent" style="max-width: 640px;">
  ${tile('doc', 'description', 'Minutes 12 Nov.docx', '48 KB', 11)}
  ${tile('audio', 'audio_file', 'Interview with Dewi.m4a', '18 MB', 12)}
  ${tile('image', 'image', 'Receipt 0412.jpg', '820 KB', 13)}
  ${tile('sheet', 'description', 'Payroll November.xlsx', '96 KB', 14)}
</div>`,
    },
  ],
  variants: [
    ['.file-tile--folder', 'Folder: accent tone, 64 px thumbnail.'],
    ['.file-tile--doc | --sheet | --image | --video | --audio | --archive', 'File types, each on its own tone from the `--tile-*` and series palettes.'],
    ['.file-grid--compact', '140 px minimum, 72 px thumbnails.'],
  ],
  states: [
    ['hover, focus-within', 'Ring turns `--line-strong`; checkbox and more button fade in.'],
    ['selected', 'The checkbox is ticked: accent tint and a 1.5 px accent ring on the tile.'],
    ['.file-grid.is-selecting', 'Set by the selection hook while anything is ticked: all checkboxes show.'],
    ['touch screens', 'Checkbox and more button always show (no hover to reveal them).'],
    ['loading', '[Skeleton](skeleton) tiles: a 104 px block and two text bars per tile.'],
    ['empty', 'An [empty state](empty-state) in place of the grid, with the upload action.'],
  ],
  motion: [
    'Press on the tile sinks it to 0.985 in 90 ms and springs back on `--spring-snappy`.',
    'Checkbox and more button fade in over `--d-fast` and settle from 0.9 on `--spring-snappy`; the tick draws in as in [checkbox](checkbox).',
    'The selection bar rises on `--spring-smooth` and its count rolls ([rolling number](rolling-number)).',
  ],
  a11y: [
    'The grid is a `role="list"` with an `aria-label`; each tile a `listitem`.',
    'The open link and the checkbox are separate controls: the checkbox has its own `aria-label` ("Select Budget Q4 2026.xlsx"), the more button names the file too.',
    'Checkboxes stay in the tab order even while invisible, and show on focus.',
    'Type is in the name (extension) and in the icon, never in color alone.',
  ],
  do: [
    'Sort folders before files, and keep the extension in the name.',
    'Use the real picture as the thumbnail for images when you have one.',
  ],
  dont: [
    'Truncate names to one line; two lines that break anywhere keep them readable.',
    'Make the whole tile a checkbox; opening is the main action.',
  ],
  js: '`data-lds-selection="selbarId"` on the `.file-grid` wires the `input[data-lds-select]` checkboxes: `.is-selected` on each tile, `.is-selecting` on the grid, the selection bar opens with a rolling count, Shift-click ticks a run, Escape and `[data-lds-select-clear]` clear. Fires `lds:select` with `{ count, items }`. Call `selectionRefresh(grid)` after adding or removing tiles. The more buttons use the menu hook (`data-lds-menu`).',
  related: ['selection-bar', 'thumbnail', 'file-input', 'table'],
};
