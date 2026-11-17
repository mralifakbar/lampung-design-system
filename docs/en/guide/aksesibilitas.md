# Accessibility

https://lampung.kartadinata.app/docs/en/guide/aksesibilitas

Public services must work for every citizen, including people with disabilities and people on old phones or small screens. LDS carries part of the work; the rest belongs to the team that builds the service.

## What LDS guarantees

When you use the tokens and components as documented, the following is already handled:

- **WCAG 2.2 AA contrast.** Every text and background pair in the tokens is computed, not guessed, for both the light and the dark theme: normal text at least 4.5:1, large text and control edges at least 3:1. The ratio of each token is listed in the tokens reference. For example, white text on the accent green is 6.25:1 in the light theme.
- **44 px targets.** Buttons, fields and icon buttons have a hit area of at least 44 by 44 px, even when the drawing is smaller.
- **Focus ring.** Every interactive element shows a 2 px focus ring with a 2 px offset when used by keyboard (`:focus-visible`).
- **Keyboard.** Components are built from real `<button>`, `<a href>` and `<input>` elements. Layers such as dialogs, menus and sheets close with Escape and return focus to their trigger.
- **Reduced motion.** When the device asks for less motion (`prefers-reduced-motion`), transitions become a short cross-fade and decorative animations run only once.
- **Forced colors.** The focus ring is a real outline that stays visible in forced colors mode (Windows high contrast), and the decorative aksara band is hidden.
- **Semantic HTML.** The example markup uses the right elements and ARIA attributes. Status is never carried by color alone; there is always an icon and words.

These guarantees hold only when components are used as written Replacing colors with raw values, removing the outline or building a button from a `<div>` undoes them.

## What your team still has to do

A design system does not know the content of your service. This part has to be done in every project:

- **Alt text.** Every image that carries information gets an `alt` that states its content ("Map of flooded areas in Contoh district"). Decorative images get `alt=""`.
- **Labels.** Every field has a visible `<label>`. A placeholder is not a label. Icon buttons get an `aria-label`.
- **Captions and transcripts.** Videos get captions; audio recordings get a transcript.
- **Language attribute.** Set `lang="id"` on the `<html>` element, and `lang="en"` on parts in English, so screen readers pronounce them correctly.
- **Order and headings.** One `<h1>` per page, headings in order without skipping levels, and a Tab order that follows the visual order.
- **Time limits.** When a session or form times out, warn people before it happens and offer a way to extend it.
- **New color pairs.** Any color you add yourself must have its contrast computed in both themes.

## Checklist

| Check | How | Who |
| --- | --- | --- |
| Text and control contrast | Compute with the contrast script for every new pair, in light and dark | LDS for tokens, your team for added colors |
| Touch targets | Every target at least 44 by 44 px with space between them | LDS, your team for custom controls |
| Keyboard | Complete the whole flow with only Tab, Shift+Tab, Enter, Space and Escape | Your team |
| Visible focus | The focus ring shows on every control, in both themes | LDS |
| Alt text | Every informative image has a meaningful `alt` | Your team |
| Form labels | Every field has a visible label; errors are linked with `aria-describedby` | Your team |
| Captions and transcripts | Every video and audio file | Your team |
| Page language | `lang` is set and correct | Your team |
| Screen readers | Test the main flows with NVDA, TalkBack and VoiceOver | Your team |
| 200% zoom | No clipped text and no horizontal scrolling | Your team |
| 320 px width | The layout reflows without horizontal scrolling | Your team |
| Reduced motion | Turn on reduced motion on the device and repeat the flow | LDS, your team for its own animation |

## Checking contrast

Do not judge contrast by eye, least of all gray on gray. The repository ships a checker. Run it from the repository root with two hex colors, text first and background second:

```
python3 skills/antislop-human/contrast-check.py "#FFFFFF" "#0B6E4F"
ratio: 6.25:1
normal text (4.5:1): PASS
large text  (3.0:1): PASS
```

Repeat with the dark theme values from [tokens/tokens.json](../../../tokens/tokens.json). Normal text needs 4.5:1; large text (18 px and up, or 14 px bold) and control edges need 3:1. When a pair fails, use a text token that already passes, for example `--gold-text` instead of `--gold` for gold text.

## Testing with screen readers and zoom

Automated checks catch only part of the problems. Test the main flows of the service (for example, filing an application from the start until the receipt arrives) the way people actually use it:

- **NVDA** on Windows with Firefox or Chrome.
- **TalkBack** on Android with Chrome. Many citizens reach services from an Android phone, so do not skip this one.
- **VoiceOver** on iPhone with Safari, and on a Mac when you have one.
- **200% zoom** in a desktop browser: all text readable, nothing clipped, no horizontal scrolling.
- **320 px width** (or 400% zoom on a 1280 px screen): the layout stays one whole column.

Listen for whether each control announces its name, role and state, whether error messages are read out, and whether focus lands somewhere sensible after a dialog closes. When you can, invite people with disabilities to try your service; a checklist does not replace their experience.

## A note on regulation

Indonesian law, including Law Number 25 of 2009 on Public Services and Law Number 8 of 2016 on Persons with Disabilities, states that public services must be accessible to all citizens, including persons with disabilities. Implementing rules and regional policies can change.

This guide is not legal advice. Following LDS and WCAG 2.2 AA is a good starting point, but check the obligations that apply to your service with the legal team or the responsible unit in your institution.
