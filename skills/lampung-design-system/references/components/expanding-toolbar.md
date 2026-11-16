# Expanding toolbar

Group: Microinteractions. Docs page: `docs/components/expanding-toolbar.html`.

A compact row of icon tools where the hovered or focused one opens its label and one highlight glides to it. The default tool shows its label at rest, so the bar is never a row of unexplained icons.

## Use it when
- A small set of actions on one object that must stay compact: a note, a selected image, a document in a viewer.
- Icons alone would be ambiguous, but labels on every tool would not fit.

## Use something else when
- Formatting toggles that stay on (bold, italic): use [Toggle](toggle.md). A toggle group shows pressed state; the expanding toolbar does not.
- Actions on several selected items: use [Selection bar](selection-bar.md).
- More than six actions: use [Dropdown menu](dropdown-menu.md).
- App navigation: use [Top nav](top-nav.md).
- A page title bar with menus: use [Menubar](menubar.md).

## Where it goes
Floating over or attached to the object it acts on (the top right of a note, under a selected picture), or in a compact page toolbar. Up to six tools, split into groups with `.xbar__sep`.

## Anatomy
| Part | What it is |
|---|---|
| `.xbar` | Required. `role="toolbar"`, `aria-label`, `data-lds-toolbar`. 4 px padding, 14 px radius, a small shadow. |
| `.xbar__hl` | Required. The gliding highlight, first child, `aria-hidden`. |
| `.xbar__btn` | Required. Icon plus `.xbar__label > span`. `.is-open` on the default one. |
| `.xbar__sep` | Optional hairline between groups. |

## Markup

**Note actions.** Hover or Tab across the tools: each label opens as the highlight travels straight to where the button will end up. Leave the bar and Edit opens again.
```html
<div class="xbar" data-lds-toolbar role="toolbar" aria-label="Note actions">
  <span class="xbar__hl" aria-hidden="true"></span>
  <button class="xbar__btn is-open" aria-label="Edit"><span class="ic" aria-hidden="true">edit</span><span class="xbar__label"><span>Edit</span></span></button><button class="xbar__btn" aria-label="Duplicate"><span class="ic" aria-hidden="true">content_copy</span><span class="xbar__label"><span>Duplicate</span></span></button><button class="xbar__btn" aria-label="Share"><span class="ic" aria-hidden="true">share</span><span class="xbar__label"><span>Share</span></span></button><button class="xbar__btn" aria-label="Delete"><span class="ic" aria-hidden="true">delete</span><span class="xbar__label"><span>Delete</span></span></button>
</div>
```

**Grouped tools for a picture.** A separator splits arranging tools from sharing. The highlight skips the separator.
```html
<div class="xbar" data-lds-toolbar role="toolbar" aria-label="Picture tools">
  <span class="xbar__hl" aria-hidden="true"></span>
  <button class="xbar__btn is-open" aria-label="Align left"><span class="ic" aria-hidden="true">format_align_left</span><span class="xbar__label"><span>Align left</span></span></button><button class="xbar__btn" aria-label="Center"><span class="ic" aria-hidden="true">format_align_center</span><span class="xbar__label"><span>Center</span></span></button><button class="xbar__btn" aria-label="Align right"><span class="ic" aria-hidden="true">format_align_right</span><span class="xbar__label"><span>Align right</span></span></button>
  <span class="xbar__sep" aria-hidden="true"></span>
  <button class="xbar__btn" aria-label="Download"><span class="ic" aria-hidden="true">download</span><span class="xbar__label"><span>Download</span></span></button><button class="xbar__btn" aria-label="Share"><span class="ic" aria-hidden="true">share</span><span class="xbar__label"><span>Share</span></span></button>
</div>
```

## States
| State | How |
|---|---|
| `rest` | The default tool (`is-open`) shows its label; the highlight is hidden. |
| `hover / focus` | That tool opens; the highlight shows (`.xbar.is-hover`) and glides to it. |
| `leave` | Pointer leaves or focus leaves the bar: the default tool opens again and the highlight fades. |
| `pressed` | The tool sinks to 0.94 in 90 ms. |

## Motion and microinteractions
- Labels open with `grid-template-columns: 0fr` to `1fr` on `--spring-smooth` (`--d-smooth`, 560 ms); the text fades in over `--d-fast` 60 ms later, and fades out at once when closing.
- Highlight: `transform` and `width` on `--spring-smooth`. JS computes where the target button will be after every label has finished opening and closing, so the highlight makes one straight trip instead of chasing a moving target.
- Interruption: moving quickly across tools retargets the springs from their current values; the bar never shudders.
- Reduced motion: labels and highlight change in 120 ms linear.

## Accessibility
- `role="toolbar"` with an `aria-label`. Each button has an `aria-label` (its label text is clipped while closed).
- Tab and Shift+Tab move through tools and open their labels on focus, so keyboard users see the same labels as mouse users.
- Touch devices have no hover: the default label shows, others open on focus after a tap. Keep the icons clear on their own.

## Do
- Mark the most likely tool `is-open`.
- Keep labels one or two words.
- Group related tools with a separator.

## Don't
- Use it for toggles that need a pressed state.
- Put more than six tools in one bar.
- Animate the labels yourself; let `data-lds-toolbar` measure.

## Behavior (plain HTML)
`[data-lds-toolbar]` on `init()`: opens the hovered or focused `.xbar__btn`, moves `.xbar__hl` to its final box, and restores the default (`is-open` at load, or the first) on leave.

## Related
[Toggle](toggle.md) · [Icon button](icon-button.md) · [Sliding indicator](sliding-indicator.md) · [Selection bar](selection-bar.md)
