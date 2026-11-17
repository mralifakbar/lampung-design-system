# Skeleton

Group: Feedback. https://lampung.kartadinata.app/docs/en/components/skeleton

Grey shapes in the exact layout of the content that is loading, with a soft shine passing over them. When the data lands, nothing moves.

## Use it when
- A view loads data and you already know its layout: a list of applications, a profile header, a dashboard of cards.
- The loading state of the four [data states](data-states.md) (loading, empty, error, loaded) for any data view.

## Use something else when
- A short wait with no known layout, or inside a row or control: use [Spinner](spinner.md).
- A button is running its action: use [Button](button.md).
- Measurable work (upload, export): use [Progress bar](progress-bar.md).
- Long work of unknown length where elapsed time matters: use [Thinking](thinking.md).
- The data loaded and there is nothing: use [Empty state](empty-state.md).

## Where it goes
In place of the real content, in the same container, with the same sizes, gaps and radii: avatar circles where avatars go, two text lines where a title and subtitle go. On phones and wide screens alike; show as many placeholder rows as fit the first screen, not more.

## Anatomy
| Part | What it is |
|---|---|
| `.skel` | Required. One placeholder shape: `--bg-skeleton` with an 8 px radius. Size it inline (width, height, radius) to match the real element. |
| `.skel::after` | The shine: a light band that crosses every 1.6 s. Automatic. |
| `container` | The real container (a `.list`, a `.card`) with `aria-busy="true"` while loading. |

## Markup

**List rows.** A square icon and two lines, the same as the loaded row.
```html
<div class="list" style="max-width: 420px;" aria-busy="true" aria-label="Loading applications">
  <div class="lrow" aria-hidden="true"><div class="skel" style="width: 30px; height: 30px;"></div><div class="lrow__body"><div class="skel" style="height: 12px; width: 60%;"></div><div class="skel" style="height: 10px; width: 35%; margin-top: 8px;"></div></div></div>
  <div class="lrow" aria-hidden="true"><div class="skel" style="width: 30px; height: 30px;"></div><div class="lrow__body"><div class="skel" style="height: 12px; width: 48%;"></div><div class="skel" style="height: 10px; width: 30%; margin-top: 8px;"></div></div></div>
  <div class="lrow" aria-hidden="true"><div class="skel" style="width: 30px; height: 30px;"></div><div class="lrow__body"><div class="skel" style="height: 12px; width: 66%;"></div><div class="skel" style="height: 10px; width: 40%; margin-top: 8px;"></div></div></div>
</div>
```

**Profile header.** Circles for avatars, wider bars for headings.
```html
<div class="card" style="max-width: 360px;" aria-busy="true" aria-label="Loading profile">
  <div class="docs-row" aria-hidden="true"><div class="skel" style="width: 56px; height: 56px; border-radius: 50%;"></div><div style="flex: 1;"><div class="skel" style="height: 16px; width: 70%;"></div><div class="skel" style="height: 12px; width: 45%; margin-top: 10px;"></div></div></div>
  <div class="skel" style="height: 12px; width: 100%; margin-top: 20px;" aria-hidden="true"></div>
  <div class="skel" style="height: 12px; width: 82%; margin-top: 8px;" aria-hidden="true"></div>
</div>
```

**Loading, then loaded.** Press the button: the real row replaces the placeholder in the same box, so nothing shifts.
```html
<div class="list" aria-busy="true" aria-label="Loading applications">
  <div class="lrow" aria-hidden="true">
    <div class="skel" style="width: 30px; height: 30px;"></div>
    <div class="lrow__body">
      <div class="skel" style="height: 12px; width: 55%;"></div>
      <div class="skel" style="height: 10px; width: 30%; margin-top: 8px;"></div>
    </div>
  </div>
</div>
```

## States
| State | How |
|---|---|
| `loading` | `aria-busy="true"` on the container, `.skel` shapes inside it marked `aria-hidden`. |
| `loaded` | Replace the shapes with the content in the same container and remove `aria-busy`. |

## Motion and microinteractions
- The shine is a gradient band moving with `transform: translateX()` from -100 % to 100 % over 1.6 s on `--ease-inout`, infinite. Only `transform` animates.
- Swap to the real content directly, or with a `--d-fast` (160 ms) fade; never slide content in over the skeleton.
- Reduced motion: the animation runs once in 1 ms, so the shapes are static grey.
- Do not show a skeleton for loads under about 300 ms; render nothing, then the content.

## Accessibility
- The shapes say nothing: `aria-hidden="true"` on each placeholder row.
- Mark the region `aria-busy="true"` and give it a name ("Loading applications") so screen reader users know something is coming.
- When the content arrives, it is read in the normal flow; do not announce every row.

## Do
- Copy the real layout: the same sizes, gaps and radii.
- Show only what fits the first screen.
- Vary line widths a little, like real text.

## Don't
- Use a generic block that does not match the content; the jump on load defeats the purpose.
- Put a spinner on top of a skeleton.
- Keep a skeleton when loading failed; show the error state with a retry.

## Related
[Data states](data-states.md) · [Spinner](spinner.md) · [Empty state](empty-state.md) · [List](list.md)
