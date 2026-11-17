const opt = (v, label) => `<li class="menu__item" role="option" data-value="${v}">${label}</li>`;

export default {
  title: 'Combobox',
  group: 'Inputs',
  order: 9,
  summary: 'A text field that filters a list of options as you type and stores the one picked. For long lists and server-backed options; it says so when nothing matches.',
  when: [
    'One value from a long list people know by name: regency or city, kecamatan, kelurahan, puskesmas, service office.',
    'Options come from a server as you type (React `Combobox` with `loadOptions`).',
    'People know what they want and typing three letters is faster than scrolling.',
  ],
  whenNot: [
    ['A short fixed list (under about 30 options)', 'select'],
    ['Searching to filter a page or list, without storing a choice', 'search-field'],
    ['Several values, including new ones people make up', 'tag-input'],
    ['Jumping to any page or command in the app', 'command-palette'],
    ['Two to five options', 'radio'],
  ],
  where: 'In a [form](form-layout) like a [text field](text-field), or in a filter bar on wide screens. The list opens below the field, as wide as the field, and scrolls inside (up to 320 px or half the viewport).',
  anatomy: [
    ['.select.combobox', 'Required. Positioned wrapper. `data-lds-combobox` for the plain HTML behavior.'],
    ['.control.combobox__control', 'Required. The 44 px field; `.is-open` while the list shows. A leading `.ic` is optional.'],
    ['input[role=combobox]', 'Required. The text input, named by a `<label for>` or `aria-label`. The JS sets `aria-expanded`, `aria-controls`, `aria-autocomplete="list"` and `autocomplete="off"`.'],
    ['.control__btn.combobox__arrow', 'Optional chevron (`aria-hidden`), rotates while open. In React a clear button replaces it once a value is chosen.'],
    ['ul.menu.select__menu[role=listbox]', 'Required. The options; `li.menu__item[role=option]` with `data-value`.'],
    ['.select__empty', 'Required. The no-match row, `role="presentation"`, `hidden` until nothing matches.'],
  ],
  examples: [
    {
      title: 'Regency or city',
      desc: 'Focus selects the text and opens the list; typing filters on any part of the name; Enter picks the highlighted row. Try "lampung" or "me".',
      html: `<div class="field" style="max-width: 360px; width: 100%;">
  <label class="field__label" for="cb-prov">Regency or city</label>
  <div class="select combobox" data-lds-combobox>
    <div class="control combobox__control"><span class="ic" aria-hidden="true">location_on</span><input id="cb-prov" role="combobox" placeholder="All regencies and cities"><span class="control__btn combobox__arrow" aria-hidden="true"><span class="ic">expand_more</span></span></div>
    <ul class="menu select__menu" role="listbox" aria-label="Regency or city">
      ${opt('bdl', 'Kota Bandar Lampung')}
      ${opt('metro', 'Kota Metro')}
      ${opt('lamsel', 'Kabupaten Lampung Selatan')}
      ${opt('lamteng', 'Kabupaten Lampung Tengah')}
      ${opt('lampura', 'Kabupaten Lampung Utara')}
      ${opt('pringsewu', 'Kabupaten Pringsewu')}
      ${opt('pesawaran', 'Kabupaten Pesawaran')}
      ${opt('tanggamus', 'Kabupaten Tanggamus')}
      <li class="select__empty" role="presentation" hidden>Nothing matches. Try other words.</li>
    </ul>
  </div>
</div>`,
      height: 380,
    },
    {
      title: 'Options from a server (React)',
      desc: 'With `loadOptions` the query is debounced (180 ms) and the previous request is aborted when the text changes; a spinner shows in the field while loading. `minChars` waits for enough letters.',
      html: `<div class="field" style="max-width: 360px; width: 100%;">
  <label class="field__label" for="cb-uni">Puskesmas</label>
  <div class="select combobox">
    <div class="control combobox__control is-open"><span class="ic" aria-hidden="true">local_hospital</span><input id="cb-uni" role="combobox" aria-expanded="true" aria-autocomplete="list" aria-controls="cb-uni-list" value="way"><span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>
    <ul class="menu select__menu is-open" role="listbox" id="cb-uni-list" aria-label="Puskesmas">
      <li class="menu__item" role="option" aria-selected="false"><span class="select__text">Puskesmas Way Halim<small>Way Halim, Bandar Lampung</small></span></li>
      <li class="menu__item is-hover" role="option" aria-selected="false"><span class="select__text">Puskesmas Way Kandis<small>Tanjung Senang, Bandar Lampung</small></span></li>
    </ul>
  </div>
</div>`,
      code: `<Combobox
  label="Puskesmas"
  icon="local_hospital"
  value={uni}
  onChange={setUni}
  minChars={3}
  loadOptions={(q, signal) =>
    fetch(\`/api/puskesmas?q=\${encodeURIComponent(q)}\`, { signal }).then((r) => r.json())
  }
/>`,
      height: 260,
    },
  ],
  states: [
    ['closed', 'Looks like a [text field](text-field) with a chevron.'],
    ['open (.is-open on the control, aria-expanded="true")', 'Accent edge and halo stay on; chevron points up; the list grows in.'],
    ['filtering', 'Rows that do not contain the text get `hidden`; the first visible row is highlighted.'],
    ['no match', '`.select__empty` shows "Nothing matches. Try other words."'],
    ['loading (React)', 'A [spinner](spinner) in the field replaces the chevron.'],
    ['chosen (React)', 'A clear `.control__btn` (close icon, labelled "Clear Regency or city") replaces the chevron.'],
  ],
  motion: [
    'The list uses the menu motion: in on `--spring-smooth` (560 ms) from `scale(0.96) translateY(-4px)` with opacity in `--d-fast`; out in `--d-exit` (180 ms) on `--ease-exit`.',
    'Filtering hides rows at once; do not animate rows in and out on every key, it makes the list feel slow.',
    'The chevron rotates on `--spring-smooth`. Highlight follows the pointer in 60 ms linear.',
    'Reduced motion: the menu fades in 120 ms linear without scale.',
  ],
  a11y: [
    'The input has `role="combobox"`, `aria-expanded`, `aria-controls` and `aria-autocomplete="list"`; `aria-activedescendant` points at the highlighted option while focus stays in the input.',
    'Keys: Down opens and moves, Up moves, Enter picks, Escape closes (React also restores the chosen label), Tab closes.',
    'The empty row is `role="presentation"`; consider an `aria-live="polite"` count if results change a lot.',
    'Filtering matches anywhere in the label (and the second line in React), case-insensitive.',
  ],
  do: [
    'Put the most likely options first when the field is empty.',
    'Set `minChars` (2 or 3) for server lists so the first request is useful.',
    'Show the second line (`sub`) when two options share a name.',
  ],
  dont: [
    'Accept free text that matches no option as the value; a combobox stores one of its options.',
    'Use a combobox for a short list just to look searchable.',
  ],
  js: '`data-lds-combobox` on `.select.combobox`: focus selects the text and opens; typing filters the options and toggles `.select__empty`; keys as above; a pick writes the label into the input and fires `lds:change` with `{ value, label }`. Server loading and the clear button exist only in the React binding.',
  react: `import { Combobox } from 'lampung-design-system/react';

// Local options, filtered in the browser
<Combobox label="Regency or city" icon="location_on" value={prov} onChange={setProv}
  options={[{ value: 'bdl', label: 'Kota Bandar Lampung' }, { value: 'metro', label: 'Kota Metro' }]} />

// From a server: debounced 180 ms, aborted when the query changes
<Combobox label="Puskesmas" icon="local_hospital" value={uni} onChange={setUni} minChars={3}
  loadOptions={(q, signal) => fetch(\`/api/puskesmas?q=\${q}\`, { signal }).then((r) => r.json())}
  emptyText="No puskesmas by that name. Check the spelling." />`,
  related: ['select', 'search-field', 'tag-input', 'command-palette'],
};
