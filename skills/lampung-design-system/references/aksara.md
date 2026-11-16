# Aksara Lampung

Had Lampung is the script of Lampung. LDS draws it as a quiet cultural accent: names, headings, identity blocks and one decorative band. It is never the only way to read anything.

## Glyphs

`aksara/glyphs.json` holds original monoline drawings made for this system (MIT, like the rest of the repository) on a 100 x 100 grid with a forward slant, stroke 8, round caps:

- 20 base letters (induk huruf): ka ga nga pa ba ma ta da na ca ja nya ya a la ra sa wa ha gha. Each carries the vowel a.
- Signs (anak huruf). Above: ulan `i`, bicek `e` (schwa), `é`, datas `an`, rejenjung `ar`, tekelubang `ang`. Below: bitan `u`, `o`, tekelungau `au`. After: tekelingai `ai`, keleniah `ah`, nengen (kills the vowel).

`npm run build:aksara` writes `js/aksara-glyphs.js`, `aksara/glyphs/*.svg`, the sprite `aksara/lds-aksara.svg`, and Dart constants for Flutter.

## Use

```html
<span class="aksara aksara--gold" data-lds-aksara="Lampung"></span>           <!-- role img, aria-label Lampung -->
<span class="aksara-pair">
  <span class="aksara aksara--lg aksara--gold" data-lds-aksara="Sakai" aria-hidden="true"></span>
  <span class="aksara-pair__latin">Sakai</span>
</span>
<div class="aksara-band" aria-hidden="true"></div>                             <!-- "sai bumi ruwa jurai" -->
```

`init()` renders them. In code: `import { toAksara, aksaraSvg } from 'lampung-design-system/aksara'`. Flutter: `LdsAksara('Lampung')`, `LdsAksaraBand()`.

## Transliteration

`toAksara` covers what names and short phrases need: onsets (longest first: ny, ng, gh, then single consonants; f/v map to pa, z to ja, q to ka, x to sa), vowel signs, the diphthongs ai and au at the end of a syllable, the codas n, ng, r (signs above) and h (sign after), and nengen for any other closing consonant. It is not a complete orthography engine: check anything printed or official with a speaker or teacher of had Lampung.

## Rules

- Pair it with Latin, visibly or in `aria-label`. If the Latin text is visible right next to it, set `aria-hidden="true"` on the aksara.
- One or two appearances per page. The band is ornament: once under a hero or above a footer.
- Colors: `--gold-text` (identity), `--accent-text` or `--text-muted`. The band uses `--gold` at low opacity; it is decorative and hidden in forced colors.
- Never combine it with the provincial coat of arms or any agency logo.
