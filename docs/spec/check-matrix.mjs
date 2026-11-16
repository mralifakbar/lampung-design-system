const box = (label, { on = false, dis = false, all = false } = {}) => `<label class="check"><input type="checkbox"${all ? ' data-lds-matrix-all' : ''}${on ? ' checked' : ''}${dis ? ' disabled' : ''} aria-label="${label}"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label>`;
const roles = ['Owner', 'Admin', 'Editor', 'Viewer'];
const groupRow = (key, name) => `      <tr class="matrix__group" data-group="${key}"><th scope="rowgroup">${name}</th>${roles.map((r) => `<td>${box(`All ${name} permissions for ${r}`, { all: true })}</td>`).join('')}</tr>`;
const permRow = (key, name, sub, on) => `      <tr data-group="${key}"><th scope="row">${name}<span class="matrix__sub">${sub}</span></th>${roles.map((r, i) => `<td>${box(`${r}: ${name}`, { on: on[i], dis: i === 0 })}</td>`).join('')}</tr>`;

export default {
  title: 'Check matrix',
  group: 'Data display',
  order: 22.6,
  summary: 'A grid of checkboxes: things in rows grouped by area, options in columns. The header and the first column stay in place while the box scrolls, and each area has one checkbox per column for all of it.',
  when: [
    'Permissions by role: which roles can invite people, see billing, export reports.',
    'Notifications by channel: which events reach email, push and SMS.',
    'Any yes or no decision for each pair of two short lists (features per plan in an admin, courses per study program).',
  ],
  whenNot: [
    ['A few independent options for one thing', 'checkbox'],
    ['Settings that take effect at once, one per row', 'switch'],
    ['Plans compared on a pricing page, read only', 'compare-table'],
    ['Records with values, not choices', 'data-table'],
  ],
  where: 'Full width of the content column, inside `.matrix-box`. Give the box a height (`--h`) when the rows run long so the header stays visible; on phones it scrolls sideways with the first column pinned. Save changes with a button next to it when the choices are costly; otherwise save each change and confirm with a [toast](toast).',
  anatomy: [
    ['.matrix-box', 'Required. The scroll box: white, ring, large radius. `--h` sets a max height. Give it `tabindex="0"`, `role="region"` and an `aria-label` so keyboard users can scroll it.'],
    ['table.matrix[data-lds-matrix]', 'Required. A real table with a `caption` (can be `sr-only`). `--min` sets the width under which it scrolls (560 px), `--first` the first column (220 px), `--col` each option column (112 px).'],
    ['thead th', 'The options (roles, channels), sticky at the top on the quiet fill. `.matrix__sub` under a name for a count.'],
    ['tr.matrix__group[data-group]', 'An area heading row: `th[scope=rowgroup]` and one `input[data-lds-matrix-all]` per column.'],
    ['tr[data-group] > th[scope=row]', 'Required. The thing being decided, sticky on the left, with an optional `.matrix__sub` line.'],
    ['td > .check', 'Required. One [checkbox](checkbox) per cell with an `aria-label` that names both ("Admin: Invite people"). The whole cell is the target.'],
  ],
  examples: [
    {
      title: 'Permissions by role',
      desc: 'Tick a cell, or tick an area for a whole column: the area box shows mixed when only some are on. Owner is locked. Scroll the box: the header and the permission names stay.',
      stage: 'block',
      html: `<div class="matrix-box" tabindex="0" role="region" aria-label="Permissions by role, scrolls" style="--h: 360px;">
  <table class="matrix" data-lds-matrix>
    <caption class="sr-only">Permissions by role</caption>
    <thead><tr><th scope="col">Permission</th>${roles.map((r, i) => `<th scope="col">${r}${i === 0 ? ' <span class="ic" aria-label="Locked">lock</span>' : ''}</th>`).join('')}</tr></thead>
    <tbody>
${groupRow('people', 'People')}
${permRow('people', 'Invite people', 'Send invites by email', [1, 1, 0, 0])}
${permRow('people', 'Change roles', 'Promote or demote members', [1, 1, 0, 0])}
${permRow('people', 'Remove people', '', [1, 0, 0, 0])}
${groupRow('billing', 'Billing')}
${permRow('billing', 'See invoices', '', [1, 1, 1, 0])}
${permRow('billing', 'Change the plan', 'Upgrades bill at once', [1, 0, 0, 0])}
${groupRow('reports', 'Reports')}
${permRow('reports', 'View dashboards', '', [1, 1, 1, 1])}
${permRow('reports', 'Export data', 'CSV and PDF', [1, 1, 1, 0])}
    </tbody>
  </table>
</div>`,
    },
    {
      title: 'Notifications by channel',
      desc: 'The same grid with channels as columns, no areas. Each change saves at once.',
      stage: 'block',
      html: `<div class="matrix-box" tabindex="0" role="region" aria-label="Notifications by channel, scrolls" style="max-width: 520px;">
  <table class="matrix" data-lds-matrix style="--min: 420px; --first: 180px; --col: 88px;">
    <caption class="sr-only">Notifications by channel</caption>
    <thead><tr><th scope="col">Event</th><th scope="col">Email</th><th scope="col">Push</th></tr></thead>
    <tbody>
      <tr><th scope="row">Mentions</th><td>${box('Email: Mentions', { on: true })}</td><td>${box('Push: Mentions', { on: true })}</td></tr>
      <tr><th scope="row">Assigned to me</th><td>${box('Email: Assigned to me', { on: true })}</td><td>${box('Push: Assigned to me')}</td></tr>
      <tr><th scope="row">Weekly summary</th><td>${box('Email: Weekly summary', { on: true })}</td><td>${box('Push: Weekly summary')}</td></tr>
    </tbody>
  </table>
</div>`,
    },
  ],
  variants: [
    ['--h on .matrix-box', 'A max height: the box scrolls vertically and the header sticks.'],
    ['--min / --first / --col on .matrix', 'Widths: below `--min` the box scrolls sideways with the first column pinned.'],
  ],
  states: [
    ['checked / unchecked', 'The [checkbox](checkbox) tick draws in on change.'],
    ['mixed', 'An area box shows the dash (`.check.is-mixed`, `indeterminate`) when only some cells in its column are on.'],
    ['locked', '`disabled` on a cell (a role nobody may change); say why in the header (a `lock` icon with a label) or a note.'],
    ['changed', '`.is-changed` on a cell (its `td`) not saved yet: an accent ring around the box. Clear it after saving.'],
    ['new column', '`.is-new` on the cells of a column just added: they glow on the accent tint once.'],
    ['hover', 'The row tints on pointer devices so the eye can follow it across.'],
  ],
  motion: [
    'Ticks draw in on `--ease-enter` (260 ms) and out on `--ease-exit` (160 ms), as the [checkbox](checkbox) does; an area tick runs every box in its column at once, no stagger.',
    'A new column glows on the accent tint and fades out over 1600 ms on `--ease-standard`, once.',
    'Row hover tints in 60 ms linear. The sticky header and column do not move.',
    'Reduced motion: no glow; ticks still change.',
  ],
  a11y: [
    'It is a real `table`: options are `th[scope=col]`, things are `th[scope=row]`, areas `th[scope=rowgroup]`, with a `caption`.',
    'Every checkbox has an `aria-label` that names the row and the column ("Admin: Invite people"); area boxes say "All People permissions for Admin".',
    'The box is focusable with a label so keyboard users can scroll it; Tab moves through the checkboxes in reading order and Space ticks.',
    'A locked column says so in words, not only by dimming.',
  ],
  do: [
    'Group rows by area when there are more than eight.',
    'Pin the first column and the header; keep column names short.',
    'Show what is not saved yet and offer Discard next to Save.',
  ],
  dont: [
    'Use switches in the cells; a grid of switches reads as noise.',
    'Put more than about eight columns; split the decision instead.',
    'Hide locked cells; show them ticked and dimmed so the rule is visible.',
  ],
  js: '`data-lds-matrix` on the table: area boxes tick or clear their column in that area and show mixed, checked or disabled from their cells; a `lds:change` event (bubbles) carries `{ input, changed }` after each change by a person. After changing cells from code, call `matrixRefresh(table)`.',
  related: ['checkbox', 'table', 'compare-table', 'switch'],
};
