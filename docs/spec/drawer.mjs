export default {
  title: 'Drawer',
  group: 'Overlays',
  order: 5,
  summary: 'A panel that slides in from the right edge on wide screens for filters, details or a secondary task, while the list it belongs to stays visible. It leaves to the side it came from.',
  when: [
    'On wide screens, filters for a list or table: status, service, date range.',
    'Details of a row people check without leaving the list: an application, a bill, an applicant.',
    'A secondary task that people do while looking at the page behind it.',
  ],
  whenNot: [
    ['The same task on phones', 'sheet', 'Bottom sheets sit under the thumb; switch at your phone breakpoint'],
    ['The app navigation on phones', 'app-shell', 'The shell has its own left drawer'],
    ['A short question that must be answered first', 'dialog'],
    ['A page-level form', 'modal'],
    ['Three to seven commands', 'dropdown-menu'],
  ],
  where: 'Inset 10 px from the top, right and bottom of its positioned container (`.viewport`, or a `position: fixed; inset: 0` wrapper for the page), 320 px wide, as a column with 16 px gaps. Actions at the bottom (`margin-top: auto`). Use a light scrim, or none, so the page stays readable.',
  anatomy: [
    ['.drawer[role=dialog]', 'Required. The panel (`<aside>`) with `id`, `data-lds-layer` and `aria-labelledby`. Add `aria-modal="true"` only if the page behind must not be used while it is open.'],
    ['.sheet__head + .sheet__title', 'The title row with a close [icon button](icon-button) (`data-lds-close`).'],
    ['content', 'Fields, checkboxes, a [key-value](key-value) list.'],
    ['actions', 'A row pushed to the bottom: a quiet reset and the primary.'],
    ['.scrim[data-lds-scrim="id"]', 'Optional; click to close. Lighten it with an inline background when the page should stay readable.'],
  ],
  examples: [
    {
      title: 'Filter applications',
      desc: 'It slides in from the right on a spring and leaves to the right, faster. Escape, the close button or the scrim close it; focus returns to Filters.',
      stage: 'block',
      html: `<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--secondary btn--md" data-lds-open="dr-filter" aria-haspopup="dialog"><span class="ic" aria-hidden="true">tune</span>Filters</button>
    <p class="section__sub">48 micro business permit applications</p>
  </div>
  <div class="scrim" data-lds-scrim="dr-filter" style="background: rgba(9, 9, 11, 0.12);"></div>
  <aside class="drawer" id="dr-filter" role="dialog" aria-labelledby="dr-filter-t" data-lds-layer>
    <div class="sheet__head" style="margin: 0;"><h3 class="sheet__title" id="dr-filter-t">Filters</h3><button class="icon-btn" aria-label="Close filters" data-lds-close style="margin: -10px -10px -10px 0;"><span class="ic" aria-hidden="true">close</span></button></div>
    <label class="check"><input type="checkbox"><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">Past the deadline</span></label>
    <label class="check"><input type="checkbox" checked><span class="check__box" aria-hidden="true"><svg viewBox="0 0 14 14"><path class="tick" d="M2.5 7.4 L5.7 10.4 L11.5 3.8"></path></svg></span><span class="check__text">Needs verification</span></label>
    <div style="margin-top: auto; display: flex; gap: 8px;"><button class="btn btn--gray btn--md" style="flex: 1;">Clear</button><button class="btn btn--primary btn--md" style="flex: 1;" data-lds-close>Show 12 results</button></div>
  </aside>
</div>`,
    },
    {
      title: 'Row details',
      desc: 'A read-only record beside the list, without a scrim: the page stays usable.',
      stage: 'block',
      html: `<div class="viewport docs-box">
  <div class="viewport__content">
    <button class="btn btn--gray btn--md" data-lds-open="dr-inv" aria-haspopup="dialog">Bill 2024-118</button>
  </div>
  <aside class="drawer" id="dr-inv" role="dialog" aria-labelledby="dr-inv-t" data-lds-layer>
    <div class="sheet__head" style="margin: 0;"><h3 class="sheet__title" id="dr-inv-t">Bill 2024-118</h3><button class="icon-btn" aria-label="Close bill" data-lds-close style="margin: -10px -10px -10px 0;"><span class="ic" aria-hidden="true">close</span></button></div>
    <p class="section__sub">Waste collection fee, second half of the year. Issued 2 September, paid 9 September by bank transfer.</p>
    <span class="badge badge--success">Paid</span>
    <div style="margin-top: auto;"><button class="btn btn--secondary btn--md btn--block"><span class="ic" aria-hidden="true">download</span>Download PDF</button></div>
  </aside>
</div>`,
    },
  ],
  states: [
    ['.is-open', 'Slid in; scrim (if any) shown.'],
    ['closed', 'Off to the right (`translateX(calc(100% + 20px))`), `aria-hidden` and `inert`.'],
  ],
  motion: [
    'Enter: from off the right edge to rest on `--spring-smooth` over `--d-smooth` (560 ms).',
    'Exit: back to the right in 240 ms on `--ease-exit`. Same path back, never a fade or a drop.',
    'Scrim: in over `--d-standard`, out over `--d-exit`. Reduced motion: the slide is 120 ms linear.',
  ],
  a11y: [
    '`role="dialog"` with `aria-labelledby`. Add `aria-modal="true"` when the page behind is blocked (with a scrim); then Tab is trapped.',
    'Focus moves to the first focusable element on open; Escape closes; focus returns to the trigger.',
    'The close button names what it closes ("Close filters").',
  ],
  do: [
    'Show the result count on the primary ("Show 12 results").',
    'Keep the list behind visible and in sync.',
    'Switch to a [sheet](sheet) on phones.',
  ],
  dont: [
    'Open a drawer from the left; the left edge belongs to navigation.',
    'Put a whole page in a drawer.',
    'Animate it with a fade or a scale.',
  ],
  js: 'The layer hooks: `data-lds-open`, `data-lds-close`, `data-lds-scrim`, `data-lds-layer`; `openLayer(id)` / `closeLayer(id)`; events `lds:open` / `lds:close`. Escape closes the top layer.',
  related: ['sheet', 'dialog', 'app-shell', 'key-value'],
};
