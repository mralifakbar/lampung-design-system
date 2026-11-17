export default {
  title: 'List',
  group: 'Data display',
  order: 1,
  summary: 'The inset grouped list: rows on one surface, separated by hairlines that start where the text starts. The default for any list of things, instead of a stack of cards.',
  when: [
    'Any collection of similar items the person scans or opens: services, messages, settings, payments, files.',
    'Navigation rows that lead somewhere (`a.lrow` with a chevron) or act (`button.lrow`).',
    'Settings, each row a label with its value, a switch or a chevron.',
    'Numbered steps to follow (`.lrow--num`) or a checked list of requirements or what is included (`.lrow--check`).',
  ],
  whenNot: [
    ['Items are compared across several attributes (columns)', 'table'],
    ['Label and value pairs describing one thing', 'key-value'],
    ['Each item is a rich subject with media and its own actions', 'card'],
    ['A grid of destinations on a landing or overview page', 'link-card'],
    ['Nested folders or a hierarchy', 'tree'],
    ['Events in time order with a connecting line', 'timeline'],
    ['The person picks one option from the rows', 'radio-card'],
    ['The steps of a flow the person is in right now', 'steps'],
    ['A long list where only the first few matter', 'show-more'],
  ],
  where: 'In the content column, full width of it, on phones edge to edge inside the page padding. A `.list__header` above names the group and a `.list__footer` below explains it. On the canvas use the default white list; on a quiet-fill panel use `.list--fill`.',
  anatomy: [
    ['.list', 'Required. The surface: white with a hairline ring and the large radius, clipping its rows. Use `div`, or `ul`/`ol` with `li.lrow` rows.'],
    ['.list--fill', 'The quiet fill instead of white, without the ring.'],
    ['.lrow', 'Required. A row: 48 px minimum, 16 px side padding, 12 px gap. Rows must be direct siblings so the hairline (`.lrow + .lrow`) draws.'],
    ['a.lrow / button.lrow', 'A row that navigates or acts. Highlights on press; linked rows tint on hover and lean their chevron 2 px forward.'],
    ['.lrow--icon + .lrow__icon > .ic', 'A 30 px colored square with a white filled glyph; the hairline then starts after the icon (58 px).'],
    ['.lrow__body > .lrow__title + .lrow__sub', 'Required. Title (15 px) and an optional second line (13 px, subtle).'],
    ['.lrow__value', 'A trailing value (15 px, subtle): a setting, a time, an amount.'],
    ['.lrow__chev', 'The trailing `chevron_right` on rows that navigate.'],
    ['.lrow--num > .lrow__num', 'Numbered row: a 24 px accent-tint circle with the number; the title wraps.'],
    ['.lrow--check > .ic.lrow__check', 'Checked row: a filled `check_circle` in the success color; the title wraps.'],
    ['.list__header / .list__footer', 'Text above and below the list, 13 px subtle, indented to the row text.'],
  ],
  examples: [
    {
      title: 'Navigation rows',
      desc: 'Icons in colored squares, a value or a count, and a chevron. The hairline starts at the text.',
      stage: 'block',
      html: `<div style="max-width: 440px;">
  <p class="list__header">Account</p>
  <div class="list">
    <a class="lrow lrow--icon" href="#profile"><span class="lrow__icon"><span class="ic" aria-hidden="true">person</span></span><span class="lrow__body"><span class="lrow__title">Profile</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    <a class="lrow lrow--icon" href="#notifications"><span class="lrow__icon" style="background: var(--tile-red);"><span class="ic" aria-hidden="true">notifications</span></span><span class="lrow__body"><span class="lrow__title">Notifications</span></span><span class="count">3<span class="sr-only"> new</span></span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
    <a class="lrow lrow--icon" href="#language"><span class="lrow__icon" style="background: var(--tile-green);"><span class="ic" aria-hidden="true">public</span></span><span class="lrow__body"><span class="lrow__title">Language</span></span><span class="lrow__value">English</span><span class="ic lrow__chev" aria-hidden="true">chevron_right</span></a>
  </div>
  <p class="list__footer">Changes apply on every device you sign in to.</p>
</div>`,
    },
    {
      title: 'Two-line rows with values',
      desc: 'A title and a second line on the left, the value on the right.',
      stage: 'block',
      html: `<ul class="list" style="max-width: 440px;">
  <li class="lrow"><div class="lrow__body"><div class="lrow__title">Land and building tax 2026</div><div class="lrow__sub">Paid 2 Sep by bank transfer</div></div><span class="lrow__value">Rp 1.250.000</span></li>
  <li class="lrow"><div class="lrow__body"><div class="lrow__title">Waste collection levy</div><div class="lrow__sub">Paid 2 Sep</div></div><span class="lrow__value">Rp 35.000</span></li>
  <li class="lrow"><div class="lrow__body"><div class="lrow__title">Motor vehicle tax</div><div class="lrow__sub">Due 28 Nov</div></div><span class="badge badge--warning">Not paid</span></li>
</ul>`,
    },
    {
      title: 'Numbered steps',
      desc: 'An order to follow. Use `<ol>` so the order is in the markup too.',
      stage: 'block',
      html: `<ol class="list list--fill" style="max-width: 440px;">
  <li class="lrow lrow--num"><span class="lrow__num" aria-hidden="true">1</span><span class="lrow__body"><span class="lrow__title">Download the registration form and fill in every page.</span></span></li>
  <li class="lrow lrow--num"><span class="lrow__num" aria-hidden="true">2</span><span class="lrow__body"><span class="lrow__title">Ask the lurah to sign page 3.</span></span></li>
  <li class="lrow lrow--num"><span class="lrow__num" aria-hidden="true">3</span><span class="lrow__body"><span class="lrow__title">Upload the signed form before 28 November.</span><span class="lrow__sub">PDF, up to 5 MB</span></span></li>
</ol>`,
    },
    {
      title: 'Checked rows',
      desc: 'Requirements met, or what a service includes.',
      stage: 'block',
      html: `<div style="max-width: 440px;">
  <p class="list__header">Included in MSME assistance</p>
  <ul class="list">
    <li class="lrow lrow--check"><span class="ic lrow__check" aria-hidden="true">check_circle</span><span class="lrow__body"><span class="lrow__title">Help registering a business ID number (NIB)</span></span></li>
    <li class="lrow lrow--check"><span class="ic lrow__check" aria-hidden="true">check_circle</span><span class="lrow__body"><span class="lrow__title">Simple bookkeeping training</span></span></li>
    <li class="lrow lrow--check"><span class="ic lrow__check" aria-hidden="true">check_circle</span><span class="lrow__body"><span class="lrow__title">A monthly consultation with an assistant officer</span></span></li>
  </ul>
</div>`,
    },
    {
      title: 'Settings with switches',
      desc: 'A switch with its label fills the row; the label is the switch text.',
      stage: 'block',
      html: `<div class="list" style="max-width: 440px;">
  <div class="lrow"><label class="switch" style="flex: 1;"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__text">Email me when my application status changes</span></label></div>
  <div class="lrow"><label class="switch" style="flex: 1;"><input type="checkbox" role="switch"><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="switch__text">Weekly summary of citizen reports</span></label></div>
</div>`,
    },
  ],
  variants: [
    ['list', 'White with a ring: on the canvas.'],
    ['list--fill', 'Quiet fill, no ring: inside white cards or on the canvas for a softer group.'],
    ['lrow--icon', 'Row with a colored icon square; hairline starts at 58 px.'],
    ['lrow--num', 'Numbered step; top-aligned, wrapping title.'],
    ['lrow--check', 'Checked item; top-aligned, wrapping title.'],
  ],
  states: [
    ['hover (a, button rows)', 'Tint `--bg-tint-strong`; the chevron of a linked row moves 2 px right. Only on devices that can hover.'],
    [':active', 'Rows that act highlight with `--bg-tint-strong` while pressed.'],
    ['selected', 'Show a trailing `check` icon in the accent (single choice in a sheet), or use [radio cards](radio-card) for a form choice.'],
    ['current (master-detail)', 'The row whose detail is open beside or under the list: `aria-current="true"` on the `a` or `button` row gives it the accent tint and an accent title. One at a time.'],
    ['empty', 'Replace the list with an [empty state](empty-state) in the same place.'],
    ['loading', 'Rows of [skeleton](skeleton) shapes inside the same `.list`.'],
  ],
  motion: [
    'Linked rows: background over `--d-fast` (160 ms) on `--ease-standard`; the chevron leans 2 px on `--spring-snappy`.',
    'Rows that arrive (new results) can use [list stagger](list-stagger); rows that leave collapse with [height expand](height-expand). Swipe to reveal actions is [swipe actions](swipe-actions).',
    'No hover lift, no shadows.',
  ],
  a11y: [
    'Use `ul`/`ol` with `li.lrow` for static rows, so the count is announced. For rows that are links or buttons, a `div.list` of `a.lrow` / `button.lrow` is fine; add `role="list"` and wrap in `role="listitem"` only if the count matters.',
    'Icons and the chevron are `aria-hidden="true"`; the title is the accessible name of a linked row, so keep it specific.',
    'Numbers in `.lrow__num` are `aria-hidden` when the list is an `<ol>` (the order is already announced).',
    'A row has one action. Secondary actions go in [swipe actions](swipe-actions) or a [dropdown menu](dropdown-menu), not as extra buttons inside a linked row.',
  ],
  do: [
    'Use a list wherever you were about to stack cards.',
    'Keep rows to one action and one or two lines.',
    'Name the group with `.list__header` and explain it with `.list__footer`.',
  ],
  dont: [
    'Wrap rows in `li` inside a list of links and lose the hairlines; rows must be siblings.',
    'Put a button inside a linked row.',
    'Add shadows, borders between rows or a custom radius.',
  ],
  related: ['table', 'key-value', 'card', 'show-more'],
};
