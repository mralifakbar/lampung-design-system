# Feature row

Group: Marketing. Docs page: `docs/components/feature-row.html`.

One feature told beside its proof: a short title, a paragraph and a few points on one side, a live stage with the feature working on the other. Rows alternate sides with `feature--reverse`.

## Use it when
- Explaining one feature of a product on a landing page, next to the feature running.
- Two to four features in a row of sections, where each needs its own demo.

## Use something else when
- Many small features of equal weight: use [Layout primitives](layout-primitives.md). Use an `auto-grid` of short text blocks; not every feature needs a stage.
- Destinations people can open: use [Link card](link-card.md).
- The first screen of the page: use [Hero](hero.md).

## Where it goes
Inside a [marketing section](marketing-section.md). From 900 px the copy takes 5 of 12 columns and the stage 7 (reversed with `feature--reverse`); below that the copy comes first and the stage follows. Consecutive rows are 56 to 112 px apart.

## Anatomy
| Part | What it is |
|---|---|
| `.feature` | Required. The two-column grid. |
| `.feature--reverse` | Stage first on wide screens. |
| `.feature__copy` | Required. Eyebrow, title, body and points. |
| `h2/h3.feature__title` | Required. 24 to 32 px. |
| `p.feature__body` | The paragraph, max 52 characters a line. |
| `ul.feature__points` | Two or three facts, each `li` holding an icon and the text in a `span`. |
| `.feature__stage` | Required. The proof: live components on the quiet fill. Surfaces placed directly inside it (lists, key-value, code blocks, tool calls) switch to the base color, never fill on fill. Also usable on its own as a demo stage, for example in a hero. |
| `.feature__stage--flush` | No padding, for a stage that holds one full-bleed component. |
| `.feature__caption` | A footnote that says what can be tried or that the content is an example. |

## Markup

**Copy beside a live stage.** The stage holds a real segmented control and a code block; switch the platform.
```html
<div class="feature" style="width: 100%;">
  <div class="feature__copy">
    <span class="msec__eyebrow"><span class="ic ic--sm" aria-hidden="true">code</span>Exports</span>
    <h3 class="feature__title">Social aid recipients, in the format the agency asks for.</h3>
    <p class="feature__body">Export a distribution round as a spreadsheet, a PDF report or a file for the regional welfare data system.</p>
    <ul class="feature__points">
      <li><span class="ic" aria-hidden="true">check_circle</span><span>Columns match the official template.</span></li>
      <li><span class="ic" aria-hidden="true">check_circle</span><span>Exports run in the background.</span></li>
    </ul>
  </div>
  <div class="feature__stage">
    <div class="seg" role="group" aria-label="Format" data-lds-segmented style="width: 240px;"><span class="seg__thumb"></span><button class="seg__btn" aria-pressed="true">CSV</button><button class="seg__btn" aria-pressed="false">PDF</button></div>
    <div class="codeblock"><div class="codeblock__bar"><span>aid-recipients-round-1.csv</span></div><pre>nik,name,kelurahan,status
1871 •••• •••• 0042,Siti Rahmawati,Way Halim,verified
1871 •••• •••• 0317,Budi Santoso,Kedaton,pending</pre></div>
    <span class="feature__caption">Example data.</span>
  </div>
</div>
```

**Reversed.** Stage first on wide screens; the copy still comes first for screen readers and on phones.
```html
<div class="feature feature--reverse" style="width: 100%;">
  <div class="feature__copy">
    <h3 class="feature__title">Reminders that stop once the tax is paid.</h3>
    <p class="feature__body">Taxpayers get one reminder a day before the due date, and none once they pay.</p>
  </div>
  <div class="feature__stage">
    <label class="switch"><input type="checkbox" role="switch" checked><span class="switch__track" aria-hidden="true"><span class="switch__thumb"></span></span><span class="bell ic" aria-hidden="true">notifications</span>Daily reminder</label>
  </div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `feature--reverse` | Stage on the left from 900 px. |
| `feature__stage--flush` | Stage without padding. |

## Motion and microinteractions
- The copy may fade up once with [reveal on scroll](reveal-on-scroll.md). The stage only moves when someone uses what is in it.
- A view inside the stage that swaps (a code sample per platform) uses [view swap](view-swap.md): the new content rises 4 px from a 4 px blur over 240 ms on `--ease-enter`.

## Accessibility
- The copy comes first in the DOM in both directions; `feature--reverse` only changes the visual order on wide screens.
- Every control in the stage keeps its label. Say in `feature__caption` when content is an example.

## Do
- Put one working feature in each stage.
- Wrap point text in a `span` so inline code wraps with it.

## Don't
- Use a screenshot when the component can run.
- Make every feature a row; a list carries the smaller ones.

## Related
[Marketing section](marketing-section.md) · [Hero](hero.md) · [Code block](code-block.md) · [View swap](view-swap.md)
