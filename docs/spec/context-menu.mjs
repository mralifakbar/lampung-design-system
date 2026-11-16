export default {
  title: 'Context menu',
  group: 'Overlays',
  order: 7,
  summary: 'A command menu that opens at the pointer on right-click, a long press on touch, or Shift+F10. A shortcut for commands that are also reachable another way.',
  when: [
    'An area full of objects people act on often (files, lessons in an editor, cells) where right-click is expected.',
    'Power users want the commands of the thing under the pointer without moving to a toolbar.',
  ],
  whenNot: [
    ['The only way to reach the commands', 'dropdown-menu', 'Always offer a visible "more" button as well; right-click is invisible'],
    ['Rich content about the thing under the pointer', 'hover-card'],
    ['A short explanation of a control', 'tooltip'],
    ['Actions on many selected items at once', 'selection-bar'],
  ],
  where: 'At the pointer (or 16 px into the area for the keyboard), clamped to stay inside the area. The menu is a child of the area, which must be `position: relative`.',
  anatomy: [
    ['[data-lds-contextmenu="id"]', 'Required. The area that listens; `position: relative`, `tabindex="0"` so the keyboard can open it.'],
    ['.menu[role=menu]', 'Required. The same [dropdown menu](dropdown-menu) markup, placed inside the area.'],
    ['.menu__item[role=menuitem]', 'Required. Commands with icons and `kbd` shortcuts; destructive last.'],
  ],
  examples: [
    {
      title: 'Files in a course',
      desc: 'Right-click in the box (or press and hold on touch, or focus it and press Shift+F10).',
      stage: 'block',
      html: `<div class="card card--fill" data-lds-contextmenu="cm-file" tabindex="0" aria-label="Lecture 5 slides, press Shift+F10 for actions" style="position: relative; height: 220px; display: grid; place-items: center; text-align: center; user-select: none;">
  <span class="section__sub"><span class="ic" aria-hidden="true">description</span> Lecture 5 slides.pdf<br>Right-click for actions</span>
  <div class="menu" id="cm-file" role="menu" aria-label="Lecture 5 slides" style="min-width: 200px;">
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">visibility</span>Open</button>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">content_copy</span>Copy link<kbd>⌘C</kbd></button>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Rename</button>
    <div class="menu__sep"></div>
    <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Move to trash</button>
  </div>
</div>`,
      code: `<div class="card card--fill" data-lds-contextmenu="file-menu" tabindex="0" style="position: relative;">
  …
  <div class="menu" id="file-menu" role="menu" aria-label="Lecture 5 slides">
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">visibility</span>Open</button>
    <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Rename</button>
    <div class="menu__sep"></div>
    <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Move to trash</button>
  </div>
</div>`,
    },
  ],
  states: [
    ['.is-open', 'Shown at the pointer with `left`/`top` set inline.'],
    ['long press', 'On touch, a 500 ms press with less than 10 px of movement opens it with a medium haptic.'],
  ],
  motion: [
    'Same as the [dropdown menu](dropdown-menu): in over `--d-fast` with a scale from 0.96 on `--spring-smooth`, out over `--d-exit` on `--ease-exit`. It grows from its top left corner, where the pointer is.',
    'Reduced motion: fade only.',
  ],
  a11y: [
    'The area needs `tabindex="0"` and a name that mentions the shortcut; Shift+F10 or the Menu key opens the menu and focuses the first item.',
    'Inside: Up and Down move, Escape closes, choosing an item closes.',
    'Every command must also be reachable without a right-click: a [dropdown menu](dropdown-menu) on the item, a toolbar or a keyboard shortcut.',
  ],
  do: [
    'Mirror the item\'s visible "more" menu exactly.',
    'Keep the browser\'s own menu on text fields and links.',
  ],
  dont: [
    'Hide commands that exist nowhere else in a context menu.',
    'Take over right-click on the whole page.',
  ],
  js: '`data-lds-contextmenu="menuId"` on the area: `contextmenu` opens the menu at the pointer (clamped inside the area), a 500 ms touch press opens it with a haptic, Shift+F10 or the Menu key opens it near the top left and focuses the first item. Keys and closing work as for [dropdown menus](dropdown-menu); `closeMenus()` closes it.',
  related: ['dropdown-menu', 'selection-bar', 'haptics'],
};
