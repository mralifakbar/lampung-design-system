const B = (icon, label, open) => `<button class="xbar__btn${open ? ' is-open' : ''}" aria-label="${label}"><span class="ic" aria-hidden="true">${icon}</span><span class="xbar__label"><span>${label}</span></span></button>`;

export default {
  title: 'Expanding toolbar',
  group: 'Microinteractions',
  order: 8,
  summary: 'A compact row of icon tools where the hovered or focused one opens its label and one highlight glides to it. The default tool shows its label at rest, so the bar is never a row of unexplained icons.',
  when: [
    'A small set of actions on one object that must stay compact: a note, a selected image, a document in a viewer.',
    'Icons alone would be ambiguous, but labels on every tool would not fit.',
  ],
  whenNot: [
    ['Formatting toggles that stay on (bold, italic)', 'toggle', 'A toggle group shows pressed state; the expanding toolbar does not.'],
    ['Actions on several selected items', 'selection-bar'],
    ['More than six actions', 'dropdown-menu'],
    ['App navigation', 'top-nav'],
    ['A page title bar with menus', 'menubar'],
  ],
  where: 'Floating over or attached to the object it acts on (the top right of a note, under a selected picture), or in a compact page toolbar. Up to six tools, split into groups with `.xbar__sep`.',
  anatomy: [
    ['.xbar', 'Required. `role="toolbar"`, `aria-label`, `data-lds-toolbar`. 4 px padding, 14 px radius, a small shadow.'],
    ['.xbar__hl', 'Required. The gliding highlight, first child, `aria-hidden`.'],
    ['.xbar__btn', 'Required. Icon plus `.xbar__label > span`. `.is-open` on the default one.'],
    ['.xbar__sep', 'Optional hairline between groups.'],
  ],
  examples: [
    {
      title: 'Note actions',
      desc: 'Hover or Tab across the tools: each label opens as the highlight travels straight to where the button will end up. Leave the bar and Edit opens again.',
      html: `<div class="xbar" data-lds-toolbar role="toolbar" aria-label="Note actions">
  <span class="xbar__hl" aria-hidden="true"></span>
  ${B('edit', 'Edit', true)}${B('content_copy', 'Duplicate')}${B('share', 'Share')}${B('delete', 'Delete')}
</div>`,
    },
    {
      title: 'Grouped tools for a picture',
      desc: 'A separator splits arranging tools from sharing. The highlight skips the separator.',
      stage: 'fill',
      html: `<div class="xbar" data-lds-toolbar role="toolbar" aria-label="Picture tools">
  <span class="xbar__hl" aria-hidden="true"></span>
  ${B('format_align_left', 'Align left', true)}${B('format_align_center', 'Center')}${B('format_align_right', 'Align right')}
  <span class="xbar__sep" aria-hidden="true"></span>
  ${B('download', 'Download')}${B('share', 'Share')}
</div>`,
    },
  ],
  states: [
    ['rest', 'The default tool (`is-open`) shows its label; the highlight is hidden.'],
    ['hover / focus', 'That tool opens; the highlight shows (`.xbar.is-hover`) and glides to it.'],
    ['leave', 'Pointer leaves or focus leaves the bar: the default tool opens again and the highlight fades.'],
    ['pressed', 'The tool sinks to 0.94 in 90 ms.'],
  ],
  motion: [
    'Labels open with `grid-template-columns: 0fr` to `1fr` on `--spring-smooth` (`--d-smooth`, 560 ms); the text fades in over `--d-fast` 60 ms later, and fades out at once when closing.',
    'Highlight: `transform` and `width` on `--spring-smooth`. JS computes where the target button will be after every label has finished opening and closing, so the highlight makes one straight trip instead of chasing a moving target.',
    'Interruption: moving quickly across tools retargets the springs from their current values; the bar never shudders.',
    'Reduced motion: labels and highlight change in 120 ms linear.',
  ],
  a11y: [
    '`role="toolbar"` with an `aria-label`. Each button has an `aria-label` (its label text is clipped while closed).',
    'Tab and Shift+Tab move through tools and open their labels on focus, so keyboard users see the same labels as mouse users.',
    'Touch devices have no hover: the default label shows, others open on focus after a tap. Keep the icons clear on their own.',
  ],
  do: [
    'Mark the most likely tool `is-open`.',
    'Keep labels one or two words.',
    'Group related tools with a separator.',
  ],
  dont: [
    'Use it for toggles that need a pressed state.',
    'Put more than six tools in one bar.',
    'Animate the labels yourself; let `data-lds-toolbar` measure.',
  ],
  js: '`[data-lds-toolbar]` on `init()`: opens the hovered or focused `.xbar__btn`, moves `.xbar__hl` to its final box, and restores the default (`is-open` at load, or the first) on leave.',
  related: ['toggle', 'icon-button', 'sliding-indicator', 'selection-bar'],
};
