# Rating

Group: Selection. Docs page: `docs/components/rating.html`.

Five stars for rating something from one to five. Hovering previews the score, clicking sets it; it works as a radio group from the keyboard.

## Use it when
- People rate a service, an officer, an explanation or a visit from one to five.
- Showing an average rating read-only next to a title (static stars without buttons).

## Use something else when
- A quick yes or no on usefulness ("Was this explanation helpful?"): use [Button group](button-group.md). Two buttons, or a [like](like.md) for a single positive.
- A score on a wider scale (0 to 10, a percentage): use [Slider](slider.md).
- Showing a score as progress or a level: use [Meter](meter.md).
- Choosing one of a few named levels (Easy, Medium, Hard): use [Segmented control](segmented-control.md).

## Where it goes
At the end of the thing rated: after a finished service or visit, in a review form, in a feedback [sheet](sheet.md) on phones. Read-only ratings sit next to the title or in a key-value row.

## Anatomy
| Part | What it is |
|---|---|
| `.stars` | Required. Inline row of five, 2 px apart. `role="radiogroup"` with an `aria-label` for input; `role="img"` with an `aria-label` ("4 of 5 stars") for display. |
| `button.star[role=radio]` | Required for input. 40 px target with a filled `star` icon, `aria-checked` and a name ("4 stars"). |
| `.on` | On each star up to the chosen score: warning color. |
| `.preview` | On stars up to the hovered one while hovering: lighter warning color. |

## Markup

**Rate a service.** Hover to preview, click to set. From the keyboard, Tab to the stars and use the arrow keys.
```html
<span class="field__label" id="service-rating">How was the KTP service today?</span>
<div class="stars" role="radiogroup" aria-labelledby="service-rating">
  <button type="button" class="star on" role="radio" aria-checked="false" tabindex="-1" aria-label="1 star"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star on" role="radio" aria-checked="false" tabindex="-1" aria-label="2 stars"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star on" role="radio" aria-checked="true" tabindex="0" aria-label="3 stars"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star" role="radio" aria-checked="false" tabindex="-1" aria-label="4 stars"><span class="ic" aria-hidden="true">star</span></button>
  <button type="button" class="star" role="radio" aria-checked="false" tabindex="-1" aria-label="5 stars"><span class="ic" aria-hidden="true">star</span></button>
</div>
<!-- Your code: click sets .on up to the star and aria-checked on it; hover adds .preview; arrow keys move. -->
```

**Read-only average.** Display only: spans, not buttons, and one name for the whole row.
```html
<div class="docs-row" style="gap: 8px;">
  <span class="stars" role="img" aria-label="4 of 5 stars"><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star on"><span class="ic" aria-hidden="true">star</span></span><span class="star"><span class="ic" aria-hidden="true">star</span></span></span>
  <span class="field__help">4.2 from 318 citizens</span>
</div>
```

## States
| State | How |
|---|---|
| `.on` | Chosen stars, in `--warning`. |
| `.preview` | Hover preview, `--warning` at 55 %. |
| `:active` | The pressed star sinks to 0.85 and springs back. |
| `focus-visible` | The system focus ring on the focused star. |

## Motion and microinteractions
- Color changes in `--d-fast` (160 ms) on `--ease-standard`, so sweeping across the stars feels continuous.
- Press: `scale(0.85)`, back on `--spring-snappy` (360 ms).
- Reduced motion: transitions become 120 ms linear.

## Accessibility
- For input it is a radio group: `role="radiogroup"` with a label, each star `role="radio"` with `aria-checked` and a name ("3 stars").
- Roving focus: only the checked star (or the first when none) has `tabindex="0"`; arrow keys move and select. The system has no script for this; the demo shows the lines needed.
- For display, one `role="img"` with an `aria-label` ("4 of 5 stars") and plain spans; never five separate announcements.
- Pair the stars with the number as text when the average matters (4.2).

## Do
- Ask one clear question above the stars.
- Let people change their rating; thank them in place, not with a dialog.

## Don't
- Use half stars for input.
- Use stars for a yes or no question.

## Behavior (plain HTML)
None in the system. Set `.on` and `aria-checked` on click, `.preview` on hover, and handle arrow keys in your code.

## Related
[Like](like.md) · [Slider](slider.md) · [Radio](radio.md) · [Meter](meter.md)
