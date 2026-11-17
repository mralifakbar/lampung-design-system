# For designers

https://lampung.kartadinata.app/docs/en/guide/desainer

Where the LDS design sources live, which fonts to install, the seven decisions behind the look, and how to hand a design to developers without it getting lost in translation.

## Design sources

Every visual value in LDS comes from one file. When a value in your design differs from this file, the file is right.

- [tokens/tokens.json](../../../tokens/tokens.json): Light and dark colors, shadows, type, space, radius, sizes and motion.

- [Color](../../en/index.md#/color): Surfaces, text, accent, siger gold and status colors, with their contrast ratios.

- [Typography](../../en/index.md#/typography): The type scale with the size, weight and tracking of each style.

- [Icon list](../components/icon.md): The icon names available. Only names in icons/icons.json render.

- [Aksara Lampung](../components/aksara.md): SVG glyphs in aksara/glyphs and the sprite aksara/lds-aksara.svg.

The aksara Lampung glyphs are original drawings made for this system, one SVG file per letter and sign in the `aksara/glyphs/` folder, drawn on a 100 by 100 grid with a stroke of 8 and round caps. To use them all at once, take the sprite [aksara/lds-aksara.svg](../../../aksara/lds-aksara.svg). The list of icon names is in [icons/icons.json](../../../icons/icons.json).

## Fonts to install

Install these two families on your computer. Both are licensed under the SIL Open Font License (OFL) and are free on Google Fonts.

| Font | Weights used | For |
| --- | --- | --- |
| Geist | 400, 500, 600 (700 only for the large phone title) | All interface text |
| Geist Mono | 400, 500 | Code, ticket numbers, technical values |

Size, weight and tracking change together. Large text tightens (minus 0.03 em at 56 px), small text opens up (plus 0.01 em at 12 px). Copy the values from the typography board instead of estimating them.

## The seven identity decisions

- **White canvas.** The page is plain white. Groups of content (cards, lists) sit on a quiet green-gray fill, with no shadow. Never put a fill on a fill.
- **One accent.** Lampung green (`--accent`) is only for the main action, the current selection and links. If a screen has three green things, two of them are wrong.
- **Gold is identity, not action.** Siger gold is for ornament, the aksara band, identity badges and highlights. Never for a button, a link or a selection.
- **Shadows only on what floats.** Menus, popovers, dialogs, sheets, toasts and the floating action button. Resting content casts no shadow.
- **Blur only where content scrolls under it.** The navigation bar and the tab bar. Not on cards, never stacked.
- **Type moves as a set.** Geist in three weights; size, weight and tracking change together.
- **Motion is calm and can be interrupted.** Things enter on a spring that does not bounce, leave faster, and every transition can be stopped halfway. Bounce appears only after a flick.

## The green and gold story

Lampung green (#0B6E4F) is inspired by the green of the provincial emblem. Siger gold (#C9952B) is inspired by the gold of the siger crown and the gold thread of tapis cloth. Both are inspiration, not official insignia. LDS is an unofficial community project; never use the regional coat of arms, a regional government logo or the name of a real agency as if this system were theirs.

The roles are strict: green invites action, gold marks identity. When gold must be read as text, use `--gold-text`, which is darker in the light theme, because plain gold on white does not have enough contrast.

## Handing off to developers

- **Use component names from the docs.** Write "Primary button", "Sheet", "Text field" as named on the [Components](../components/index.md) pages, not names of your own. Developers then know which markup to use.
- **Use token names, not hex.** Write `--text-subtle` or `--r-lg`, not #56615C or 16 px. A token name is right in the dark theme automatically; a hex value is not.
- **Draw all four states.** For every data view: loading, empty, error and loaded. Write the copy for each state too.
- **Show the dark theme and a 375 px screen** for the important screens, or at least mark what needs checking.
- **When the component you need does not exist yet,** do not design a one-off look for one page. Propose a new component for the system (see [Contributing](kontribusi.md)).

## Figma file

There is no official Figma file for LDS yet. The source of truth is the tokens and this documentation. If you build a Figma library that stays faithful to the tokens and components, your contribution is very welcome; open an issue on GitHub so it can be discussed before it is shared.
