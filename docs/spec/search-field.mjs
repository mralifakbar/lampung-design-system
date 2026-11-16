export default {
  title: 'Search field',
  group: 'Inputs',
  order: 4,
  summary: 'The filled, label-less field for finding things: courses, students, questions. On phones, focusing it slides in a Cancel button that clears and leaves search.',
  when: [
    'People narrow a list or page by typing: search courses, filter a student table, find a question in a bank.',
    'A phone screen has a search bar under the large title (with Cancel, `data-lds-search`).',
    'A toolbar above a table or grid needs a compact search box.',
  ],
  whenNot: [
    ['Searching commands and pages across the whole app from anywhere (Ctrl K)', 'command-palette'],
    ['Picking one value from a long list for a form field', 'combobox', 'A combobox stores the choice; a search field only filters what is shown'],
    ['A labelled form value (a name, an email)', 'text-field'],
    ['Narrowing by a few fixed categories', 'chips', 'Filter chips next to the search field are fine'],
  ],
  where: 'At the top of what it filters: under the large title on a [phone screen](phone-screen), in the toolbar above a [table](table) or list on wide screens, at the top of a [sidebar](sidebar) for long navigation. Give it the width of the content it filters, about 520 px at most on wide screens.',
  anatomy: [
    ['.search-wrap', 'Optional row that holds the field and the Cancel button; add `data-lds-search` for the phone behavior.'],
    ['.control.search', 'Required. 38 px tall, 11 px radius, recessed fill, no border until focus.'],
    ['.ic (search)', 'Required leading magnifier.'],
    ['input', 'Required. Named with `aria-label` (no visible label).'],
    ['.control__btn', 'Optional clear button with a filled `cancel` icon, shown only while there is text.'],
    ['.search__cancel', 'Phone Cancel button. Hidden (0 width) until the wrap gets `.is-active`.'],
  ],
  examples: [
    {
      title: 'Phone search with Cancel',
      desc: 'Focus slides Cancel in and the field gives it room. Cancel clears the text, fires `input`, and leaves search.',
      html: `<div class="search-wrap" data-lds-search style="max-width: 420px; width: 100%;">
  <div class="control search" style="flex: 1;"><span class="ic" aria-hidden="true">search</span><input placeholder="Search courses" aria-label="Search courses" enterkeyhint="search"></div>
  <button type="button" class="search__cancel">Cancel</button>
</div>`,
    },
    {
      title: 'Filtering a list, with clear and no results',
      desc: 'Results update as you type. When nothing matches, say so and suggest what to try. Type "net" or "zzz".',
      html: `<div class="docs-col" style="max-width: 420px;">
  <div class="control search"><span class="ic" aria-hidden="true">search</span><input placeholder="Search courses" aria-label="Search courses" aria-controls="sf-list"
    oninput="const q = this.value.trim().toLowerCase(); let n = 0; document.querySelectorAll('#sf-list .lrow').forEach((r) => { const hit = r.textContent.toLowerCase().includes(q); r.hidden = !hit; n += hit; }); document.getElementById('sf-empty').hidden = n > 0; this.nextElementSibling.hidden = !this.value;"><button type="button" class="control__btn" aria-label="Clear search" hidden onclick="const i = this.previousElementSibling; i.value = ''; i.dispatchEvent(new Event('input')); i.focus();"><span class="ic ic--fill" aria-hidden="true">cancel</span></button></div>
  <div class="list" id="sf-list">
    <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Database Systems</span></span><span class="lrow__value">CS 2104</span></a>
    <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Computer Networks</span></span><span class="lrow__value">CS 3102</span></a>
    <a class="lrow" href="#"><span class="lrow__body"><span class="lrow__title">Linear Algebra</span></span><span class="lrow__value">MA 1203</span></a>
  </div>
  <div class="empty" id="sf-empty" role="status" hidden><div class="empty__title">No courses match</div><div class="empty__body">Check the spelling, or search by course code.</div></div>
</div>`,
    },
  ],
  variants: [
    ['.control.search', 'Standalone, for desktop toolbars and sidebars.'],
    ['.search-wrap[data-lds-search] + .search__cancel', 'Phone pattern with Cancel.'],
  ],
  states: [
    ['rest', 'Recessed fill, no border, no hover border.'],
    ['focus', 'Accent edge and 4 px halo (from `.control`); the magnifier turns accent.'],
    ['.is-active (wrap)', 'Set by `data-lds-search` on focus: Cancel slides in.'],
    ['has text', 'Show the clear `.control__btn`; hide it when empty.'],
    ['no results', 'An [empty state](empty-state) under the field that names the query and what to try.'],
  ],
  motion: [
    'Cancel enters by `max-width` 0 to 80 px and `margin-left` 0 to 12 px on `--spring-smooth` (560 ms), with opacity in `--d-fast`. The field shrinks along with it, so nothing jumps. Leaving reverses the same transitions.',
    'Focus ring: `--d-fast` (160 ms) on `--ease-standard`.',
    'Results that change while typing should not stagger in on every key; swap them at once, or use a short [list stagger](list-stagger) only for the first load.',
    'Reduced motion: transitions become 120 ms linear; Cancel still appears.',
  ],
  a11y: [
    'No visible label, so the input needs `aria-label` ("Search courses"). Wrap a page-level search in `<form role="search">` when Enter submits.',
    'Use `enterkeyhint="search"` so the phone keyboard shows a Search key. Prefer `type="text"`: `type="search"` adds a second native clear button that the system does not hide.',
    'Announce the result count or the no-results message in a `role="status"` region so screen reader users know the list changed.',
    'Cancel and clear are real buttons (`type="button"`); clear has an `aria-label`.',
  ],
  do: [
    'Name what is searched in the placeholder ("Search courses").',
    'Filter as people type for local lists; debounce about 180 ms for server searches.',
    'Keep the query when people come back to the list.',
  ],
  dont: [
    'Give the search field a border and label like a form field.',
    'Use it to choose a form value; that is a [combobox](combobox).',
    'Show "No results" without saying what to try.',
  ],
  js: '`data-lds-search` on `.search-wrap`: focus adds `.is-active`; Cancel clears the input, dispatches `input`, removes `.is-active` and blurs. Filtering and the clear button are yours.',
  related: ['command-palette', 'combobox', 'empty-state', 'list'],
};
