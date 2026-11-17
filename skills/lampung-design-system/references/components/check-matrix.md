# Check matrix

Group: Data display. Docs page: `docs/components/check-matrix.html`.

A grid of checkboxes: things in rows grouped by area, options in columns. The header and the first column stay in place while the box scrolls, and each area has one checkbox per column for all of it.

## Use it when
- Permissions by role: which roles can assign citizen reports, sign permits, export data.
- Notifications by channel: which events reach email, push and SMS.
- Any yes or no decision for each pair of two short lists (services per kecamatan office, documents per permit type).

## Use something else when
- A few independent options for one thing: use [Checkbox](checkbox.md).
- Settings that take effect at once, one per row: use [Switch](switch.md).
- Service options compared side by side, read only: use [Compare table](compare-table.md).
- Records with values, not choices: use [Data table](data-table.md).

## Where it goes
Full width of the content column, inside `.matrix-box`. Give the box a height (`--h`) when the rows run long so the header stays visible; on phones it scrolls sideways with the first column pinned. Save changes with a button next to it when the choices are costly; otherwise save each change and confirm with a [toast](toast.md).

## Anatomy
| Part | What it is |
|---|---|
| `.matrix-box` | Required. The scroll box: white, ring, large radius. `--h` sets a max height. Give it `tabindex="0"`, `role="region"` and an `aria-label` so keyboard users can scroll it. |
| `table.matrix[data-lds-matrix]` | Required. A real table with a `caption` (can be `sr-only`). `--min` sets the width under which it scrolls (560 px), `--first` the first column (220 px), `--col` each option column (112 px). |
| `thead th` | The options (roles, channels), sticky at the top on the quiet fill. `.matrix__sub` under a name for a count. |
| `tr.matrix__group[data-group]` | An area heading row: `th[scope=rowgroup]` and one `input[data-lds-matrix-all]` per column. |
| `tr[data-group] > th[scope=row]` | Required. The thing being decided, sticky on the left, with an optional `.matrix__sub` line. |
| `td > .check` | Required. One [checkbox](checkbox.md) per cell with an `aria-label` that names both ("Admin: Assign reports"). The whole cell is the target. |

## Markup

**Permissions by role.** Tick a cell, or tick an area for a whole column: the area box shows mixed when only some are on. Head of office is locked. Scroll the box: the header and the permission names stay.
```html
<div class="matrix-box" tabindex="0" role="region" aria-label="Permissions by role, scrolls" style="--h: 360px;">
  <table class="matrix" data-lds-matrix>
    <caption class="sr-only">Permissions by role</caption>
    <thead><tr><th scope="col">Permission</th><th scope="col">Head of office <span class="ic" aria-label="Locked">lock</span></th><th scope="col">Admin</th><th scope="col">Verifier</th><th scope="col">Counter staff</th></tr></thead>
    <tbody>
      <tr class="matrix__group" data-group="complaints"><th scope="rowgroup">Complaints</th><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Complaints permissions for Head of office"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Complaints permissions for Admin"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Complaints permissions for Verifier"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Complaints permissions for Counter staff"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="complaints"><th scope="row">Assign reports<span class="matrix__sub">Send a report to a kelurahan officer</span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Head of office: Assign reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Admin: Assign reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Verifier: Assign reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Counter staff: Assign reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="complaints"><th scope="row">Close reports<span class="matrix__sub">Mark a report as resolved</span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Head of office: Close reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Admin: Close reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Verifier: Close reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Counter staff: Close reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="complaints"><th scope="row">Delete reports<span class="matrix__sub"></span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Head of office: Delete reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Admin: Delete reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Verifier: Delete reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Counter staff: Delete reports"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr class="matrix__group" data-group="permits"><th scope="rowgroup">Permits</th><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Permits permissions for Head of office"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Permits permissions for Admin"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Permits permissions for Verifier"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Permits permissions for Counter staff"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="permits"><th scope="row">Verify documents<span class="matrix__sub"></span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Head of office: Verify documents"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Admin: Verify documents"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Verifier: Verify documents"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Counter staff: Verify documents"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="permits"><th scope="row">Sign permits<span class="matrix__sub">Signing issues the permit at once</span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Head of office: Sign permits"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Admin: Sign permits"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Verifier: Sign permits"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Counter staff: Sign permits"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr class="matrix__group" data-group="reports"><th scope="rowgroup">Reports</th><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Reports permissions for Head of office"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Reports permissions for Admin"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Reports permissions for Verifier"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" data-lds-matrix-all aria-label="All Reports permissions for Counter staff"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="reports"><th scope="row">View dashboards<span class="matrix__sub"></span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Head of office: View dashboards"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Admin: View dashboards"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Verifier: View dashboards"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Counter staff: View dashboards"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr data-group="reports"><th scope="row">Export data<span class="matrix__sub">CSV and PDF</span></th><td><label class="check"><input type="checkbox" checked disabled aria-label="Head of office: Export data"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Admin: Export data"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Verifier: Export data"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Counter staff: Export data"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
    </tbody>
  </table>
</div>
```

**Notifications by channel.** The same grid with channels as columns, no areas. Each change saves at once.
```html
<div class="matrix-box" tabindex="0" role="region" aria-label="Notifications by channel, scrolls" style="max-width: 520px;">
  <table class="matrix" data-lds-matrix style="--min: 420px; --first: 180px; --col: 88px;">
    <caption class="sr-only">Notifications by channel</caption>
    <thead><tr><th scope="col">Event</th><th scope="col">Email</th><th scope="col">Push</th></tr></thead>
    <tbody>
      <tr><th scope="row">New report</th><td><label class="check"><input type="checkbox" checked aria-label="Email: New report"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" checked aria-label="Push: New report"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr><th scope="row">Assigned to me</th><td><label class="check"><input type="checkbox" checked aria-label="Email: Assigned to me"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Push: Assigned to me"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
      <tr><th scope="row">Weekly summary</th><td><label class="check"><input type="checkbox" checked aria-label="Email: Weekly summary"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td><td><label class="check"><input type="checkbox" aria-label="Push: Weekly summary"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path><path class="dash" d="M3 7 L11 7"></path></svg></span></label></td></tr>
    </tbody>
  </table>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `--h on .matrix-box` | A max height: the box scrolls vertically and the header sticks. |
| `--min / --first / --col on .matrix` | Widths: below `--min` the box scrolls sideways with the first column pinned. |

## States
| State | How |
|---|---|
| `checked / unchecked` | The [checkbox](checkbox.md) tick draws in on change. |
| `mixed` | An area box shows the dash (`.check.is-mixed`, `indeterminate`) when only some cells in its column are on. |
| `locked` | `disabled` on a cell (a role nobody may change); say why in the header (a `lock` icon with a label) or a note. |
| `changed` | `.is-changed` on a cell (its `td`) not saved yet: an accent ring around the box. Clear it after saving. |
| `new column` | `.is-new` on the cells of a column just added: they glow on the accent tint once. |
| `hover` | The row tints on pointer devices so the eye can follow it across. |

## Motion and microinteractions
- Ticks draw in on `--ease-enter` (260 ms) and out on `--ease-exit` (160 ms), as the [checkbox](checkbox.md) does; an area tick runs every box in its column at once, no stagger.
- A new column glows on the accent tint and fades out over 1600 ms on `--ease-standard`, once.
- Row hover tints in 60 ms linear. The sticky header and column do not move.
- Reduced motion: no glow; ticks still change.

## Accessibility
- It is a real `table`: options are `th[scope=col]`, things are `th[scope=row]`, areas `th[scope=rowgroup]`, with a `caption`.
- Every checkbox has an `aria-label` that names the row and the column ("Admin: Assign reports"); area boxes say "All Complaints permissions for Admin".
- The box is focusable with a label so keyboard users can scroll it; Tab moves through the checkboxes in reading order and Space ticks.
- A locked column says so in words, not only by dimming.

## Do
- Group rows by area when there are more than eight.
- Pin the first column and the header; keep column names short.
- Show what is not saved yet and offer Discard next to Save.

## Don't
- Use switches in the cells; a grid of switches reads as noise.
- Put more than about eight columns; split the decision instead.
- Hide locked cells; show them ticked and dimmed so the rule is visible.

## Behavior (plain HTML)
`data-lds-matrix` on the table: area boxes tick or clear their column in that area and show mixed, checked or disabled from their cells; a `lds:change` event (bubbles) carries `{ input, changed }` after each change by a person. After changing cells from code, call `matrixRefresh(table)`.

## Related
[Checkbox](checkbox.md) · [Table](table.md) · [Compare table](compare-table.md) · [Switch](switch.md)
