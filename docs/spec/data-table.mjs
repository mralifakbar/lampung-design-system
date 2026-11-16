const BOX = '<span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span>';
const people = [
  ['Rina Wijaya', 'rina@kelola.id', 'Admin', 'active', 'Platform', '2024-06-24', 'RW'],
  ['Arif Santoso', 'arif@kelola.id', 'Editor', 'active', 'Growth', '2023-03-15', 'AS'],
  ['Dewi Lestari', 'dewi@kelola.id', 'Viewer', 'invited', 'Finance', '2026-11-12', 'DL'],
  ['Bima Prasetyo', 'bima@kelola.id', 'Editor', 'suspended', 'Support', '2022-04-10', 'BP'],
  ['Sari Handayani', 'sari@kelola.id', 'Admin', 'active', 'Finance', '2021-09-02', 'SH'],
  ['Yusuf Hakim', 'yusuf@kelola.id', 'Viewer', 'active', 'Support', '2025-01-20', 'YH'],
  ['Nadia Putri', 'nadia@kelola.id', 'Editor', 'invited', 'Growth', '2026-11-14', 'NP'],
  ['Galih Ramadhan', 'galih@kelola.id', 'Viewer', 'active', 'Platform', '2024-12-01', 'GR'],
];
const label = { active: ['Active', 'success'], invited: ['Invited', 'accent'], suspended: ['Suspended', 'danger'] };
const date = (s) => new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const row = ([n, e, r, s, t, j, i]) => `      <tr data-status="${s}" data-role="${r.toLowerCase()}">
        <td class="dtable__select"><label class="check"><input type="checkbox" data-lds-select aria-label="Select ${n}">${BOX}</label></td>
        <td data-sort="${n}"><span class="dtable__user"><span class="avatar">${i}</span><span><b>${n}</b><small>${e}</small></span></span></td>
        <td>${r}</td>
        <td><span class="badge badge--${label[s][1]}">${label[s][0]}</span></td>
        <td>${t}</td>
        <td data-sort="${j}">${date(j)}</td>
      </tr>`;
const demo = `<div class="dtable" data-lds-table="demo-members" data-lds-selection="dt-bar" data-page-size="5" data-noun="members">
  <div class="dtable__bar">
    <div class="control search dtable__search"><span class="ic" aria-hidden="true">search</span><input type="search" data-lds-table-search placeholder="Search name or email" aria-label="Search members"></div>
    <div class="chip-row" data-lds-chips data-lds-table-filter="status" role="group" aria-label="Status">
      <button class="chip" value="active"><span class="ic chip__check" aria-hidden="true">check</span>Active</button>
      <button class="chip" value="invited"><span class="ic chip__check" aria-hidden="true">check</span>Invited</button>
      <button class="chip" value="suspended"><span class="ic chip__check" aria-hidden="true">check</span>Suspended</button>
    </div>
    <div class="dtable__tools">
      <div style="position: relative;">
        <button class="btn btn--secondary btn--md" data-lds-menu="dt-role" aria-haspopup="menu" aria-expanded="false"><span class="ic" aria-hidden="true">filter_list</span>Role<span class="dtable__filter-count" data-lds-table-filter-count="role" hidden>0</span></button>
        <div class="menu" id="dt-role" role="menu" aria-label="Role" style="top: calc(100% + 6px); left: 0;">
          <button class="menu__item" role="menuitemcheckbox" aria-checked="false" data-lds-keep-open data-lds-table-filter="role" data-value="admin">Admin<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemcheckbox" aria-checked="false" data-lds-keep-open data-lds-table-filter="role" data-value="editor">Editor<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemcheckbox" aria-checked="false" data-lds-keep-open data-lds-table-filter="role" data-value="viewer">Viewer<span class="ic menu__check" aria-hidden="true">check</span></button>
        </div>
      </div>
      <div style="position: relative;">
        <button class="btn btn--secondary btn--md" data-lds-menu="dt-cols" aria-haspopup="menu" aria-expanded="false"><span class="ic" aria-hidden="true">view_column</span>Columns</button>
        <div class="menu menu--right" id="dt-cols" role="menu" aria-label="Columns" style="top: calc(100% + 6px); right: 0;">
          <p class="menu__label">Show columns</p>
          <button class="menu__item" role="menuitemcheckbox" data-lds-keep-open data-lds-table-col="role">Role<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemcheckbox" data-lds-keep-open data-lds-table-col="status">Status<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemcheckbox" data-lds-keep-open data-lds-table-col="team">Team<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemcheckbox" data-lds-keep-open data-lds-table-col="joined">Joined<span class="ic menu__check" aria-hidden="true">check</span></button>
        </div>
      </div>
      <div class="toggle-group" role="group" aria-label="Row density">
        <button class="toggle" data-lds-table-density="regular" aria-pressed="true">Regular</button>
        <button class="toggle" data-lds-table-density="compact" aria-pressed="false">Compact</button>
      </div>
    </div>
  </div>
  <div class="table-box" tabindex="0" aria-label="Members, scrolls sideways">
    <table class="table">
      <thead><tr>
        <th class="dtable__select"><label class="check"><input type="checkbox" data-lds-select-all aria-label="Select all members on this page">${BOX}</label></th>
        <th data-col="name"><button>Name<span class="ic" aria-hidden="true">arrow_upward</span></button></th>
        <th data-col="role"><button>Role<span class="ic" aria-hidden="true">arrow_upward</span></button></th>
        <th data-col="status">Status</th>
        <th data-col="team"><button>Team<span class="ic" aria-hidden="true">arrow_upward</span></button></th>
        <th data-col="joined" aria-sort="descending"><button>Joined<span class="ic" aria-hidden="true">arrow_upward</span></button></th>
      </tr></thead>
      <tbody>
${people.map(row).join('\n')}
      <tr class="dtable__empty" hidden><td colspan="6"><div class="empty"><div class="empty__icon"><span class="ic" aria-hidden="true">filter_list</span></div><div class="empty__title">No members match</div><div class="empty__body">Try another name, or clear the search and filters.</div><button class="btn btn--secondary btn--md" data-lds-table-reset>Clear filters</button></div></td></tr>
      </tbody>
    </table>
  </div>
  <div class="dtable__foot">
    <span class="dtable__info" data-lds-table-info aria-live="polite"></span>
    <div class="dtable__pages">
      <div style="position: relative;">
        <button class="btn btn--plain btn--sm" data-lds-menu="dt-size" aria-haspopup="menu" aria-expanded="false"><span data-lds-table-size-label>5</span> per page<span class="ic" aria-hidden="true">expand_more</span></button>
        <div class="menu menu--up" id="dt-size" role="menu" aria-label="Rows per page" style="bottom: calc(100% + 6px); left: 0; min-width: 160px;">
          <button class="menu__item" role="menuitemradio" data-lds-table-size="5">5 per page<span class="ic menu__check" aria-hidden="true">check</span></button>
          <button class="menu__item" role="menuitemradio" data-lds-table-size="10">10 per page<span class="ic menu__check" aria-hidden="true">check</span></button>
        </div>
      </div>
      <nav aria-label="Pagination"><div class="pager" data-lds-table-pager></div></nav>
    </div>
  </div>
</div>
<div class="selbar" id="dt-bar" role="toolbar" aria-label="Selected members"><span class="selbar__count" aria-live="polite"><span class="roll" data-lds-roll="0"></span> selected</span><button class="btn btn--md"><span class="ic" aria-hidden="true">mail</span>Email</button><button class="btn btn--md btn--danger"><span class="ic" aria-hidden="true">delete</span>Remove</button><button class="icon-btn" data-lds-select-clear aria-label="Clear selection"><span class="ic" aria-hidden="true">close</span></button></div>`;

export default {
  title: 'Data table',
  group: 'Data display',
  order: 18,
  status: 'new',
  summary: 'A table people work in: search, filter chips and menus, sortable headers, a column menu, row density, row selection with a selection bar, and pagination with a page size, all on a plain `.table` and wired by one hook. Every control changes the rows at once and says what it did.',
  when: [
    'A list of records people search, narrow, sort and act on in bulk: members of a workspace, customers, orders, invoices.',
    'More than about 20 rows, so paging and a page size help, and enough columns that some people want fewer.',
  ],
  whenNot: [
    ['A short, fixed table people only read', 'table', 'Plain `.table`, maybe with `data-lds-sort`'],
    ['One or two facts per item, mostly on phones', 'list'],
    ['Thousands of rows from a server', 'table', 'Render the page the server returns into a `.table` and keep the same bar and footer markup; this hook works on the rows in the page'],
    ['Files people recognize by type or picture', 'file-tile'],
  ],
  where: 'Full width of the content column. The bar sits above the table (search first, filters next, tools at the end), the footer below it (the count on the left, page size and pager on the right). The selection bar floats at the bottom of the window while rows are ticked. On phones the search takes its own row, the tools wrap, the table scrolls sideways in its box and the pager keeps only previous, current and next.',
  anatomy: [
    ['.dtable[data-lds-table]', 'Required. The wrapper and its container query. The attribute value names the table so density, page size and hidden columns are remembered; `data-page-size` (default 10) and `data-noun` ("members") set the defaults and the words of the count.'],
    ['.dtable__bar', 'The toolbar: `.control.search.dtable__search` with `input[data-lds-table-search]`, filters, then `.dtable__tools`.'],
    ['[data-lds-table-filter="key"]', 'A filter on `data-key` of each row. On a `.chip-row[data-lds-chips]` the chip `value`s are the choices; on `menuitemcheckbox` items (with `data-lds-keep-open`) `data-value` is. Several values of one key match any; different keys must all match.'],
    ['.dtable__filter-count', 'Optional `[data-lds-table-filter-count="key"]` badge on a filter button: how many values are on.'],
    ['[data-lds-table-col="key"]', '`menuitemcheckbox` items that show or hide the column whose `th` has `data-col="key"`. The last visible column cannot be hidden.'],
    ['[data-lds-table-density]', '`.toggle` buttons with `regular` and `compact` (40 px rows) in a `.toggle-group`.'],
    ['th[data-col] > button', 'A sortable header: ascending, then descending, then unsorted. `aria-sort` on a `th` sets the first sort. A cell\'s `data-sort` overrides its text (dates, names with titles).'],
    ['.dtable__select', 'The checkbox column: `input[data-lds-select-all]` in the header (visible rows), `input[data-lds-select]` per row, each with an `aria-label`. Needs `data-lds-selection="selbarId"` on the wrapper.'],
    ['tr.dtable__empty', 'Required. One row spanning all columns with an [empty state](empty-state) and a `[data-lds-table-reset]` button; shown when nothing matches.'],
    ['tr.dtable__state[data-state]', 'Optional `loading` (skeleton cells) and `error` (alert with retry) rows, shown by `tableState()`.'],
    ['.dtable__foot', '`[data-lds-table-info]` count, `[data-lds-table-size]` menu items with a `[data-lds-table-size-label]`, and `.pager[data-lds-table-pager]` that the hook fills.'],
  ],
  examples: [
    {
      title: 'Members of a workspace',
      desc: 'Search "fin", tick a status chip, filter by role from the menu (it stays open while you tick), sort by any header, hide a column, switch to compact rows, tick rows (Shift-click for a run) and page through. Every change filters at once; the count and the pager follow.',
      stage: 'block',
      html: `<div class="viewport docs-box" style="height: 620px; width: 100%;"><div class="viewport__content" style="overflow: auto; align-items: stretch;">${demo}</div></div>`,
      code: demo,
    },
  ],
  variants: [
    ['.dtable', 'Regular 52 px rows.'],
    ['.dtable--compact', '40 px rows and smaller avatars, for people who scan many rows; set by the density toggle and remembered.'],
  ],
  states: [
    ['filtered', 'Rows that do not match are hidden; the count says "Showing 1 to 10 of 23 members"; filter buttons show how many values are on; every `[data-lds-table-reset]` outside the empty row appears.'],
    ['empty', '`tr.dtable__empty` with "No members match" and Clear filters. The header, bar and filters stay.'],
    ['loading', '`tableState(el, "loading")`: data rows hide, `tr.dtable__state[data-state="loading"]` rows with [skeleton](skeleton) cells show, `aria-busy="true"`.'],
    ['error', '`tableState(el, "error")`: the error row with an [alert](alert) and Try again.'],
    ['sorted', '`aria-sort` on the `th`, `.is-sorted` and `.is-desc` on its button, as in [table](table).'],
    ['selected', '`tr.is-selected` on the accent tint, the header checkbox ticked or mixed, the selection bar open.'],
  ],
  motion: [
    'Results arriving after a search, filter or page change blur in 25 ms apart (capped at the tenth row) on `--ease-enter` over `--d-standard`, the [list stagger](list-stagger) recipe. Sorting reorders at once, as the table spec asks.',
    'The sort arrow turns on `--spring-smooth`; filter counts pop in on `--spring-snappy`; menu checks scale in on `--spring-snappy`.',
    'The selection bar rises on `--spring-smooth` and its count rolls; the header checkbox draws its tick or dash.',
    'A refused action (hiding the last column) shakes the item.',
    'Reduced motion: rows fade in 120 ms with no blur or travel.',
  ],
  a11y: [
    'It is a real `<table>`: headers are `th`, sort buttons are real buttons and only the sorted `th` has a non-`none` `aria-sort`.',
    'The search has an `aria-label`; chips are toggle buttons with `aria-pressed`; menu filters and columns are `menuitemcheckbox` with `aria-checked`, page sizes `menuitemradio`.',
    'Sorting, paging and clearing a selection are announced through the shared live region; the count is `aria-live="polite"`.',
    'After a page change focus stays on the pager (on the current page if the button you pressed went away) and the table scrolls into view.',
    'Every row checkbox names its row ("Select Rina Wijaya"); the header one says "Select all members on this page". Escape inside the table clears the selection.',
    'The `.table-box` gets `tabindex="0"` and an `aria-label` so keyboard users can scroll it sideways.',
  ],
  do: [
    'Put the most used filter on chips and the rest in menus.',
    'Give rows `data-*` values in lowercase for filters, and `data-sort` for dates.',
    'Say what the count counts with `data-noun`.',
  ],
  dont: [
    'Add a Filter button that opens a dialog for two or three filters; chips and menus are faster.',
    'Animate re-sorting or let the table change height on every keystroke; the footer keeps its place.',
    'Hide the name column behind the column menu.',
  ],
  js: '`data-lds-table` wires everything named above and fires `lds:table` with `{ total, page, pages, shown }` after each change. `data-lds-selection="selbarId"` on the same element wires the checkboxes and the bar (`lds:select` with `{ count, items }`). After adding or removing rows call `tableRefresh(el)`; to show loading or error rows call `tableState(el, "loading" | "error" | "ready")`.',
  related: ['table', 'selection-bar', 'pagination', 'chips'],
};
