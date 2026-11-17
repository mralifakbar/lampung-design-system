export default {
  title: 'Table',
  group: 'Data display',
  order: 7,
  summary: 'Rows of records compared by the same columns, in a `.table-box` that scrolls sideways when it must. A real `<table>` by default, `.table--wrap` for text, and the `.dt` grid when a template repeats rows.',
  when: [
    'Comparing many records by the same attributes: services by code, processing time and quota; payments by date, amount and status.',
    'Data people sort, scan down a column or select rows from (levy records, attendee lists, tax bills).',
    'A two-column text table of rules or definitions (`.table--wrap`).',
  ],
  whenNot: [
    ['Items with one or two facts each, especially on phones', 'list'],
    ['The details of one record', 'key-value'],
    ['A few summary figures', 'stat-row'],
    ['The shape of the numbers matters more than the values', 'bar-chart'],
    ['A hierarchy of folders or sections', 'tree'],
  ],
  where: 'In the content column, full width of it, inside `.table-box` (ring, radius, horizontal scroll). On phones keep the first column meaningful and let the box scroll, or show the same data as a [list](list) when people need only one or two columns. Put filters and actions above it, [pagination](pagination) under it.',
  anatomy: [
    ['.table-box', 'Required. The surface: white, ring, large radius, `overflow: auto` so wide tables scroll inside it.'],
    ['table.table', 'Required. Full width, 14 px text; `th` is a 40 px header on the quiet fill, `td` rows are 52 px with a hairline above.'],
    ['th > button (.is-sorted, .is-desc)', 'A sortable header: an arrow icon that turns when sorted descending.'],
    ['.num', 'On `th` and `td`: right-aligned tabular figures. Every numeric column.'],
    ['td.strong', 'The cell that names the row (strong, medium weight).'],
    ['tr.is-selected', 'A selected row on the accent tint.'],
    ['.table--wrap', 'Text tables: cells wrap and grow, top-aligned; the first column takes 32 %.'],
    ['.dt[role=table] > .dt__row[role=row] > .dt__cell', 'The grid table: rows of cells, for templates that repeat rows freely. `.dt__head` for the header row, `.dt__sort` for sortable headers. Set `grid-template-columns` on `.dt__row` per table; it is at least 720 px wide.'],
  ],
  examples: [
    {
      title: 'Records with sorting and selection',
      desc: 'Numbers right-aligned, the naming column strong, a selected row on the accent tint. Sorted by processing time, descending.',
      stage: 'block',
      html: `<div class="table-box">
  <table class="table">
    <thead><tr><th>Service</th><th>Code</th><th class="num" aria-sort="descending"><button class="is-sorted is-desc">Processing days<span class="ic" aria-hidden="true">arrow_upward</span></button></th><th class="num">Quota left</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td class="strong">Micro business permit</td><td>IUM 2104</td><td class="num">4</td><td class="num">12</td><td><span class="badge badge--success">Open</span></td></tr>
      <tr class="is-selected"><td class="strong">Building approval</td><td>PBG 3102</td><td class="num">3</td><td class="num">0</td><td><span class="badge badge--danger">Full</span></td></tr>
      <tr><td class="strong">Domicile letter</td><td>SKD 1201</td><td class="num">2</td><td class="num">31</td><td><span class="badge badge--success">Open</span></td></tr>
    </tbody>
  </table>
</div>`,
    },
    {
      title: 'Text table',
      desc: '`.table--wrap` lets cells wrap and grow, for rules and definitions.',
      stage: 'block',
      html: `<div class="table-box">
  <table class="table table--wrap">
    <thead><tr><th>Rule</th><th>What it means</th></tr></thead>
    <tbody>
      <tr><td class="strong">Late payment</td><td>Tax paid after the due date carries a 2 % fine per month, for up to 24 months.</td></tr>
      <tr><td class="strong">Relief</td><td>Apply before the due date. Relief because of a disaster needs a letter from the kelurahan within three days.</td></tr>
    </tbody>
  </table>
</div>`,
    },
    {
      title: 'Grid table',
      desc: 'The `.dt` grid: rows of cells with ARIA table roles. Set the columns on each row. It scrolls inside the box under 720 px.',
      stage: 'block',
      html: `<div class="table-box">
  <div class="dt" role="table" aria-label="Payments">
    <div class="dt__row dt__head" role="row" style="grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) 140px 120px;"><span class="dt__cell" role="columnheader">Item</span><span class="dt__cell" role="columnheader" aria-sort="ascending"><button class="dt__sort is-sorted">Date<span class="ic" aria-hidden="true">arrow_upward</span></button></span><span class="dt__cell num" role="columnheader">Amount</span><span class="dt__cell" role="columnheader">Status</span></div>
    <div class="dt__row" role="row" style="grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) 140px 120px;"><span class="dt__cell strong" role="cell">Land and building tax</span><span class="dt__cell" role="cell">2 Sep 2026</span><span class="dt__cell num" role="cell">Rp 1.250.000</span><span class="dt__cell" role="cell"><span class="badge badge--success">Paid</span></span></div>
    <div class="dt__row" role="row" style="grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) 140px 120px;"><span class="dt__cell strong" role="cell">Vehicle tax</span><span class="dt__cell" role="cell">28 Nov 2026</span><span class="dt__cell num" role="cell">Rp 1.000.000</span><span class="dt__cell" role="cell"><span class="badge badge--warning">Due</span></span></div>
  </div>
</div>`,
    },
  ],
  variants: [
    ['table', 'One-line cells, 52 px rows. Records and numbers.'],
    ['table--wrap', 'Wrapping, top-aligned cells for text.'],
    ['dt', 'Grid table with ARIA roles, when a template engine repeats row components; cells ellipsize instead of wrapping.'],
  ],
  states: [
    ['hover', 'Body rows tint `--bg-tint` (60 ms).'],
    ['sorted', '`.is-sorted` on the header button (arrow at full opacity), `.is-desc` turns it; set `aria-sort` on the `th` (or the `columnheader` cell).'],
    ['selected', '`tr.is-selected` / `.dt__row.is-selected`, with a checked [checkbox](checkbox) in the first column and a [selection bar](selection-bar) for bulk actions.'],
    ['loading', '[Skeleton](skeleton) bars in each cell, keeping the header.'],
    ['empty', 'One row spanning all columns with an [empty state](empty-state), keeping the header and filters.'],
  ],
  motion: [
    'Row hover: background over 60 ms linear, near instant so scanning never lags.',
    'The sort arrow turns 180 degrees on `--spring-smooth` (`--d-smooth`); its opacity changes over `--d-fast`.',
    'Re-sorting does not animate rows; the new order appears at once.',
  ],
  a11y: [
    'Prefer a real `<table>` with `<th>`; with `.dt`, give every element its role (`table`, `row`, `columnheader`, `cell`) and the table an `aria-label`.',
    'Sortable headers are `<button>`s inside the header; put `aria-sort="ascending|descending"` on the header cell of the sorted column only.',
    'The scrolling `.table-box` should be reachable by keyboard when it overflows: add `tabindex="0"` and an `aria-label`, or make sure a focusable element inside it scrolls it.',
    'States in cells use words ([badge](badge)), not color alone.',
  ],
  do: [
    'Right-align every numeric column with `.num`, header included.',
    'Make the first column the one that names the row.',
    'Keep the header and filters visible in the loading and empty states.',
  ],
  dont: [
    'Use a table for layout or for a single record.',
    'Squeeze a wide table onto a phone; let it scroll or switch to a list.',
    'Add zebra stripes, vertical rules or a custom header color.',
  ],
  js: 'None. Sorting, selection and paging are app logic: re-render the rows and update `.is-sorted`, `.is-desc` and `aria-sort`.',
  related: ['list', 'key-value', 'pagination', 'selection-bar'],
};
