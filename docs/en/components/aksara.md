# Aksara Lampung

Group: Content (new). https://lampung.kartadinata.app/docs/en/components/aksara

Latin text drawn in had Lampung, the script of Lampung, as a quiet cultural accent next to names, headings and the brand. Always paired with a Latin reading; never the only way to read something.

## Use it when
- A place, service or brand name gets its aksara form next to the Latin one (`data-lds-aksara="Lampung"`).
- A page needs a quiet regional ornament: an `.aksara-band` under a hero, above a footer or along a card edge.
- Teaching or celebrating the script: a letter chart, a name card, an event poster.

## Use something else when
- Body text, labels, buttons or anything people must read to complete a task: use [Prose](prose.md). Write it in Indonesian; put aksara next to it only as an accent.
- A decorative divider with no cultural meaning: use [Separator](separator.md).
- An icon for a concept: use [Icon](icon.md).

## Where it goes
Beside or above the Latin name it spells (`.aksara-pair`), in page headers, the site footer, empty states and identity cards. The band sits on its own row under a hero or above a footer, full width, with space around it. One or two appearances per page; more turns ornament into noise.

## Anatomy
| Part | What it is |
|---|---|
| `[data-lds-aksara]` | Required. The Latin text to draw, in the attribute or as the element text. `init()` replaces the content with an inline SVG and sets `role="img"` with the Latin text as `aria-label`. |
| `.aksara` | Sizes the drawing to the text (1.2em tall) and inherits `currentColor`. |
| `.aksara-pair / .aksara-pair__latin` | Stacks the aksara over its Latin reading. |
| `.aksara-band` | Decorative strip that repeats the motto "sai bumi ruwa jurai" through a CSS mask; `aria-hidden`. Override the text with `data-lds-aksara-band`. |

## Markup

**A name with its aksara.** The aksara sits above the Latin name it spells, in gold text color. Screen readers hear the Latin name once.
```html
<div class="docs-row">
  <span class="aksara-pair"><span class="aksara aksara--lg aksara--gold" data-lds-aksara="Lampung"></span><span class="aksara-pair__latin">Lampung</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg aksara--gold" data-lds-aksara="Sakai"></span><span class="aksara-pair__latin">Sakai</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg aksara--gold" data-lds-aksara="tapis"></span><span class="aksara-pair__latin">tapis</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg aksara--gold" data-lds-aksara="siger"></span><span class="aksara-pair__latin">siger</span></span>
</div>
```

**Inline with a heading.** At text size it follows the heading color. Use it for a service or place name, once.
```html
<h2>Layanan Kota Contoh <span class="aksara aksara--accent" data-lds-aksara="Kota" aria-label="Kota"></span></h2>
```

**Decorative band.** The motto on the provincial emblem, repeated as a quiet strip. It carries no information, so it is hidden from assistive technology.
```html
<div class="docs-col" style="gap: 20px;">
  <div class="aksara-band" aria-hidden="true"></div>
  <div class="aksara-band aksara-band--sm aksara-band--muted" aria-hidden="true"></div>
</div>
```

**Letter chart.** The twenty base letters (induk huruf), each with its reading. Letters carry the vowel a; signs above, below and after change the vowel or close the syllable.
```html
<div class="docs-row" style="flex-wrap: wrap; gap: 16px 20px;">
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ka"></span><span class="aksara-pair__latin">ka</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ga"></span><span class="aksara-pair__latin">ga</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="nga"></span><span class="aksara-pair__latin">nga</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="pa"></span><span class="aksara-pair__latin">pa</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ba"></span><span class="aksara-pair__latin">ba</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ma"></span><span class="aksara-pair__latin">ma</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ta"></span><span class="aksara-pair__latin">ta</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="da"></span><span class="aksara-pair__latin">da</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="na"></span><span class="aksara-pair__latin">na</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ca"></span><span class="aksara-pair__latin">ca</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ja"></span><span class="aksara-pair__latin">ja</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="nya"></span><span class="aksara-pair__latin">nya</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ya"></span><span class="aksara-pair__latin">ya</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="a"></span><span class="aksara-pair__latin">a</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="la"></span><span class="aksara-pair__latin">la</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ra"></span><span class="aksara-pair__latin">ra</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="sa"></span><span class="aksara-pair__latin">sa</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="wa"></span><span class="aksara-pair__latin">wa</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="ha"></span><span class="aksara-pair__latin">ha</span></span>
  <span class="aksara-pair"><span class="aksara aksara--lg" data-lds-aksara="gha"></span><span class="aksara-pair__latin">gha</span></span>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `aksara--gold` | Gold text color (`--gold-text`), the default identity use; passes 4.5:1 on white and on the fill. |
| `aksara--accent / aksara--muted` | Accent text or muted text color, to sit with a heading or a caption. |
| `aksara--lg` | Twice the text height, for name cards and identity blocks. |
| `aksara-band--sm / aksara-band--lg` | 18 / 44 px strips. Default 28. |
| `aksara-band--muted` | A neutral strip for dense screens where gold would compete. |

## States
| State | How |
|---|---|
| `before init` | The element is empty (or shows its Latin text) until `init()` runs; give it the Latin text as content when the page must read well without JavaScript. |
| `forced colors` | The band is hidden in Windows high contrast mode; names keep their Latin text. |

## Motion and microinteractions
- None. Aksara is part of the identity, not an event; it never animates or loops.

## Accessibility
- `[data-lds-aksara]` becomes `role="img"` with the Latin text as its name, so it is announced once and not letter by letter. Set `aria-hidden="true"` instead when the Latin text is already right next to it (as in `.aksara-pair`), so it is not read twice.
- The band is always `aria-hidden` and carries no information.
- Never put meaning only in aksara: every label, instruction and value is written in Latin script.

## Do
- Pair every aksara with its Latin reading, visibly or in `aria-label`.
- Keep it to one or two places per page: a name, a heading, one band.
- Ask a speaker or teacher of had Lampung to check spellings before printing them on official material.

## Don't
- Set body text, form labels or buttons in aksara.
- Use the band as a divider between every section.
- Mix in a regional government emblem or logo: this system is unofficial.

## Behavior (plain HTML)
`init()` calls `renderAksara(root)`, which fills `[data-lds-aksara]` and `.aksara-band`. Use `toAksara(text)` for the syllable cells and `aksaraSvg(text)` for an SVG string (both exported from `lampung-design-system/js` and `lampung-design-system/aksara`). Static files: `aksara/lds-aksara.svg` (sprite, `<use href="lds-aksara.svg#ka"/>`) and `aksara/glyphs/*.svg`.

## Related
[Prose](prose.md) · [Icon](icon.md) · [Theming](theming.md) · [Site footer](site-footer.md)
