export default {
  title: 'Dropdown menu',
  group: 'Overlays',
  order: 6,
  summary: 'A list of commands that drops from a button: sort options, row actions, the "more" menu behind an icon button. Items do something; they are not a form field.',
  when: [
    'Three to seven commands on one object that do not deserve their own buttons: Duplicate, Move, Export, Delete.',
    'The "more" pattern: a `more_horiz` [icon button](icon-button) at the end of a row, card or header, opening the rare actions.',
    'Choosing how a list is sorted or shown, with a check on the current choice.',
  ],
  whenNot: [
    ['Picking a value for a form field', 'select', 'A select is a field with a label and a value; a menu runs commands'],
    ['Searching or typing to find an option', 'combobox'],
    ['Rich content anchored to a button (a mini form, a calendar, a description)', 'popover'],
    ['Commands opened by right-click or long press on an area', 'context-menu'],
    ['A secondary action attached to the primary button (Publish, Schedule for later)', 'split-button'],
    ['Two to five views of the same content, always visible', 'segmented-control'],
  ],
  where: 'Hanging 6 px below its trigger, aligned to the trigger\'s left edge, or to its right edge (`.menu--right`) when the trigger sits at the right of a row. Use `.menu--up` when there is no room below. The trigger and the menu share a `position: relative` wrapper.',
  anatomy: [
    ['[data-lds-menu="id"]', 'Required. The trigger button: `aria-haspopup="menu"`, `aria-expanded="false"`.'],
    ['.menu[role=menu]', 'Required. The floating list with an `id`, 220 px minimum, elevated with the only shadow. Position it with inline `top`/`left` or `right`.'],
    ['.menu__item[role=menuitem]', 'Required. A 36 px row: optional `.ic`, the label, an optional `kbd` shortcut.'],
    ['.menu__item--danger', 'A destructive command, last, after a separator.'],
    ['.menu__item.is-selected + .menu__check', 'The current choice in a `menuitemradio` group (`aria-checked="true"`), with a `check` icon at the end.'],
    ['.menu__label', 'A caption above a group of items.'],
    ['.menu__sep', 'A hairline between groups.'],
  ],
  examples: [
    {
      title: 'The "more" menu',
      desc: 'Rare actions behind a `more_horiz` icon button at the end of a row; the menu aligns to the right edge and grows from that corner.',
      height: 300,
      html: `<div class="list" style="width: 100%; max-width: 420px; overflow: visible;">
  <div class="lrow">
    <span class="lrow__body"><span class="lrow__title" style="display: block;">Lab report 3</span><span class="lrow__sub" style="display: block;">Computer Networks · due tomorrow</span></span>
    <div style="position: relative;">
      <button class="icon-btn" aria-label="More actions for Lab report 3" aria-haspopup="menu" aria-expanded="false" data-lds-menu="dm-more"><span class="ic" aria-hidden="true">more_horiz</span></button>
      <div class="menu menu--right" id="dm-more" role="menu" aria-label="Lab report 3" style="top: calc(100% + 6px); right: 0;">
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">edit</span>Edit brief</button>
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">content_copy</span>Duplicate<kbd>⌘D</kbd></button>
        <button class="menu__item" role="menuitem"><span class="ic" aria-hidden="true">download</span>Export submissions</button>
        <div class="menu__sep"></div>
        <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Delete assignment</button>
      </div>
    </div>
  </div>
</div>`,
    },
    {
      title: 'Sort a list',
      desc: 'A labelled button opens radio items; the current one is checked. Arrow keys move, Enter picks, Escape closes and returns focus.',
      height: 280,
      html: `<div style="position: relative; align-self: flex-start;">
  <button class="btn btn--gray btn--md" data-lds-menu="dm-sort" aria-haspopup="menu" aria-expanded="false"><span class="ic" aria-hidden="true">sort</span>Sort by due date<span class="ic" aria-hidden="true">expand_more</span></button>
  <div class="menu" id="dm-sort" role="menu" aria-label="Sort by" style="top: calc(100% + 6px); left: 0;">
    <p class="menu__label">Sort by</p>
    <button class="menu__item is-selected" role="menuitemradio" aria-checked="true">Due date<span class="ic menu__check" aria-hidden="true">check</span></button>
    <button class="menu__item" role="menuitemradio" aria-checked="false">Course</button>
    <button class="menu__item" role="menuitemradio" aria-checked="false">Recently added</button>
    <div class="menu__sep"></div>
    <button class="menu__item menu__item--danger" role="menuitem"><span class="ic" aria-hidden="true">delete</span>Clear completed</button>
  </div>
</div>`,
    },
  ],
  variants: [
    ['.menu--right', 'Grows from the top right; for triggers at the right edge (with `right: 0`).'],
    ['.menu--up', 'Grows from the bottom left; place it with `bottom: calc(100% + 6px)` when there is no room below.'],
  ],
  states: [
    ['.is-open', 'Visible, focus on the first item. The trigger has `aria-expanded="true"`.'],
    ['hover / .is-hover', 'Strong tint on the row; instant (60 ms).'],
    ['focus-visible', 'Accent tint and accent text on the focused item.'],
    ['.is-selected', 'Weight 500 and a `.menu__check`.'],
  ],
  motion: [
    'Enter: opacity over `--d-fast` (160 ms) on `--ease-enter`; transform from `scale(0.96) translateY(-4px)` on `--spring-smooth`, growing from the corner nearest the trigger (`transform-origin`).',
    'Exit: opacity and transform over `--d-exit` (180 ms) on `--ease-exit`, then hidden. Opening another menu closes this one at once.',
    'Item hover is a 60 ms linear background change, so moving down the list never lags.',
    'Reduced motion: fade only, no scale.',
  ],
  a11y: [
    'Trigger: `aria-haspopup="menu"` and `aria-expanded`; an icon-only trigger needs an `aria-label` naming the object ("More actions for Lab report 3").',
    '`role="menu"` with `menuitem`, `menuitemradio` or `menuitemcheckbox` children (with `aria-checked`).',
    'Down arrow on the trigger opens the menu; focus goes to the first item; Up and Down move (wrapping); Escape closes and returns focus to the trigger; a click outside closes it.',
    'Choosing an item closes the menu. Shortcuts shown in `kbd` must work.',
  ],
  do: [
    'Order by frequency; put destructive items last, after a separator, in `menu__item--danger`.',
    'Start each item with a verb ("Export submissions").',
    'Use the "more" icon button only for actions that are rare; keep frequent ones visible.',
  ],
  dont: [
    'Nest submenus.',
    'Use a menu as a form field; that is a [select](select).',
    'Put more than about seven items in one menu without groups.',
  ],
  js: '`data-lds-menu="menuId"` on the trigger toggles `.is-open` on `#menuId` and `aria-expanded` on the trigger, focuses the first item, handles Down arrow on the trigger, Up/Down/Escape inside, and closes on a choice or a click outside. Inside a `.split`, the split gets `.is-open` too. `closeMenus()` closes the open menu from code.',
  related: ['context-menu', 'select', 'split-button', 'icon-button'],
};
