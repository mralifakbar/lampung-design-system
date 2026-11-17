export default {
  title: 'Menubar',
  group: 'Navigation',
  order: 10,
  summary: 'A row of command menus (File, Edit, View) for a desktop-style editor. Each button opens a dropdown menu of commands with their shortcuts.',
  when: [
    'A document or content editor on wide screens with many commands people learn by shortcut: an announcement editor, a form library, a report builder.',
    'Commands group naturally into four to six menus.',
  ],
  whenNot: [
    ['A handful of actions on one object', 'dropdown-menu', 'One "more" button with a menu'],
    ['Site or app navigation between pages', 'top-nav'],
    ['Formatting buttons people press often (bold, italic, align)', 'button-group'],
    ['Searching every command by name', 'command-palette'],
  ],
  where: 'At the top of the editor surface, under the page title and above the document, left-aligned. Hide it on phones: put the few commands that matter in a [dropdown menu](dropdown-menu) or a [sheet](sheet).',
  anatomy: [
    ['.menubar[role=menubar]', 'Required. The bordered row with `aria-label`; positioned so menus can hang from it.'],
    ['.menubar__btn', 'Required. A 32 px menu button with `role="menuitem"`, `aria-haspopup="menu"`, `aria-expanded` and `data-lds-menu` naming its menu.'],
    ['.menu', 'Required. The [dropdown menu](dropdown-menu) for each button, placed in a `position: relative` wrapper.'],
    ['.menu__item kbd', 'The shortcut, right-aligned and muted.'],
  ],
  examples: [
    {
      title: 'Announcement editor',
      desc: 'Click File or Edit; arrow keys move inside the open menu, Escape closes it and returns focus to the button.',
      stage: 'block',
      height: 260,
      html: `<div class="menubar" role="menubar" aria-label="Announcement editor" style="width: max-content;">
  <div style="position: relative;">
    <button class="menubar__btn" role="menuitem" aria-haspopup="menu" aria-expanded="false" data-lds-menu="mb-file">File</button>
    <div class="menu" id="mb-file" role="menu" aria-label="File" style="top: calc(100% + 8px); left: 0;">
      <button class="menu__item" role="menuitem">New announcement<kbd>⌘N</kbd></button>
      <button class="menu__item" role="menuitem">Duplicate<kbd>⌘D</kbd></button>
      <div class="menu__sep"></div>
      <button class="menu__item" role="menuitem">Export as PDF<kbd>⇧⌘E</kbd></button>
    </div>
  </div>
  <div style="position: relative;">
    <button class="menubar__btn" role="menuitem" aria-haspopup="menu" aria-expanded="false" data-lds-menu="mb-edit">Edit</button>
    <div class="menu" id="mb-edit" role="menu" aria-label="Edit" style="top: calc(100% + 8px); left: 0;">
      <button class="menu__item" role="menuitem">Undo<kbd>⌘Z</kbd></button>
      <button class="menu__item" role="menuitem">Redo<kbd>⇧⌘Z</kbd></button>
      <button class="menu__item" role="menuitem">Find<kbd>⌘F</kbd></button>
    </div>
  </div>
  <div style="position: relative;">
    <button class="menubar__btn" role="menuitem" aria-haspopup="menu" aria-expanded="false" data-lds-menu="mb-view">View</button>
    <div class="menu" id="mb-view" role="menu" aria-label="View" style="top: calc(100% + 8px); left: 0;">
      <button class="menu__item is-selected" role="menuitemcheckbox" aria-checked="true">Show outline<span class="ic menu__check" aria-hidden="true">check</span></button>
      <button class="menu__item" role="menuitemcheckbox" aria-checked="false">Show officer notes</button>
    </div>
  </div>
</div>`,
    },
  ],
  states: [
    ['hover', 'Strong tint behind the button.'],
    ['aria-expanded="true"', 'The button keeps the tint while its menu is open.'],
    ['menu open', 'See [dropdown menu](dropdown-menu): grows from the top left of its button.'],
  ],
  motion: [
    'Button tint eases over `--d-instant` (120 ms).',
    'Menus enter with opacity over `--d-fast` and scale from 0.96 and -4 px on `--spring-smooth`; they leave over `--d-exit` (180 ms) on `--ease-exit`. Opening another menu closes the first at once.',
    'Reduced motion: menus fade only, no scale.',
  ],
  a11y: [
    '`role="menubar"` with `aria-label`; each button `role="menuitem"` with `aria-haspopup="menu"` and `aria-expanded`.',
    'Down arrow on a button opens its menu and focuses the first item; Up and Down move inside; Escape closes and returns focus to the button.',
    'Show shortcuts in `kbd` and make them work; a shortcut that is only displayed is a lie.',
    'Left and Right between menubar buttons are not wired by the script; add them in your code (move focus to the previous or next `.menubar__btn`, and open its menu if one was open).',
  ],
  do: [
    'Use the conventional order: File, Edit, View, then domain menus, Help last.',
    'Mirror every menubar command in the [command palette](command-palette).',
  ],
  dont: [
    'Use a menubar for navigation between pages.',
    'Show it on phones.',
    'Put a single command directly on the bar as a button; everything on the bar opens a menu.',
  ],
  js: 'Each `.menubar__btn` uses the menu hook: `data-lds-menu="menuId"` toggles `.is-open` on the menu and `aria-expanded` on the button, Down arrow opens it, Up/Down move between items, Escape or a click outside closes it. `closeMenus()` closes it from code.',
  related: ['dropdown-menu', 'command-palette', 'kbd', 'top-nav'],
};
