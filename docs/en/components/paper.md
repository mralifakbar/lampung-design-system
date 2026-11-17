# Paper

Group: Content. https://lampung.kartadinata.app/docs/en/components/paper

A printable page shown as a sheet inside the app: an invoice, a receipt, a letter, a certificate. The text reflows with the width, so the preview stays readable on a phone, and it can be the only thing that prints.

## Use it when
- A live preview of a document people are editing in a form beside it: a levy bill, an RT cover letter, a certificate of residence.
- A record people print or save as PDF: a payment receipt, a document intake slip, an UMKM training certificate.

## Use something else when
- The details of a record inside the app, not a document: use [Key-value](key-value.md).
- Long rich text from an editor or a CMS: use [Prose](prose.md).
- A self-contained subject among others in a grid: use [Card](card.md).

## Where it goes
In its own column beside the form on wide screens (sticky under the app bar), under the form on phones. Up to 816 px wide; it keeps a letter page proportion as its minimum height.

## Anatomy
| Part | What it is |
|---|---|
| `article.paper` | Required. The sheet: base color, a hairline ring, padding that grows with the width. `aria-label` names the document. |
| `.paper__head` | Brand (`.paper__brand` with `.paper__mark`) at the start, `.paper__doc` (`.paper__title` and a badge) at the end. |
| `dl.paper__meta` | Number and dates; each `dt.paper__label` over its `dd`. |
| `.paper__parties > .paper__party` | From and to, each a `.paper__label` and lines of address. |
| `table.paper__table` | Line items; `.num` right-aligns figures. |
| `.paper__totals > .paper__sum` | Label and amount rows; `.paper__sum--total` for the amount due. |
| `.paper__foot` | Payment details and notes, pushed to the bottom of the page. |
| `.paper--print` | Modifier. When printing, only this paper prints, edge to edge, in the light theme. |

## Markup

**A levy bill.** A full waste levy bill for a small food stall. Narrow the window: the parties stack, the dates wrap, the figures stay right-aligned.
```html
<article class="paper" style="max-width: 640px;" aria-label="Levy bill SKRD-2026-118">
  <header class="paper__head">
    <div class="paper__brand"><span class="paper__mark" aria-hidden="true">C</span>Waste Services, Kota Contoh</div>
    <div class="paper__doc"><div class="paper__title">Levy bill</div><span class="badge badge--warning">Due 30 Nov 2026</span></div>
  </header>
  <dl class="paper__meta">
    <div><dt class="paper__label">Bill number</dt><dd>SKRD-2026-118</dd></div>
    <div><dt class="paper__label">Issued</dt><dd>16 Nov 2026</dd></div>
    <div><dt class="paper__label">Due</dt><dd>30 Nov 2026</dd></div>
  </dl>
  <div class="paper__parties">
    <div class="paper__party"><span class="paper__label">From</span><p>Waste Services, Kota Contoh</p><p>Jl. Ki Maja 7, Way Halim, Bandar Lampung 35132</p><p>retribusi@kotacontoh.example</p></div>
    <div class="paper__party"><span class="paper__label">Levy payer</span><p>Warung Makan Bu Sari</p><p>Jl. Teuku Umar 21, Kedaton, Bandar Lampung 35141</p><p>Levy ID 1871 •••• •••• 0042</p></div>
  </div>
  <table class="paper__table">
    <thead><tr><th scope="col">Description</th><th scope="col" class="num">Qty</th><th scope="col" class="num">Amount</th></tr></thead>
    <tbody><tr><td>Business waste levy, October 2026</td><td class="num">1</td><td class="num">Rp 75.000</td></tr><tr><td>Business waste levy, November 2026</td><td class="num">1</td><td class="num">Rp 75.000</td></tr><tr><td>Extra waste pickup, family event 2 Nov</td><td class="num">3</td><td class="num">Rp 150.000</td></tr></tbody>
  </table>
  <div class="paper__totals">
    <div class="paper__sum"><span>Subtotal</span><b>Rp 300.000</b></div>
    <div class="paper__sum"><span>Late fee 2%</span><b>Rp 6.000</b></div>
    <div class="paper__sum paper__sum--total"><span>Balance due</span><b>Rp 306.000</b></div>
  </div>
  <footer class="paper__foot"><p>Pay at any regional bank teller or e-wallet with payment code 1871 2611 0001 18.</p><p>Sample document, not an official bill. Questions about this bill: retribusi@kotacontoh.example.</p></footer>
</article>
```

**Print only the paper.** Add `paper--print` and call `window.print()` from a Print button. The app around it does not print, and the sheet prints dark on white even in the dark theme.
```html
<button class="btn btn--secondary btn--md" type="button" onclick="window.print()"><span class="ic" aria-hidden="true">print</span>Print bill</button>
<article class="paper paper--print" aria-label="Levy bill SKRD-2026-118">…</article>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.paper` | A sheet on screen. |
| `.paper--print` | The one sheet that prints; everything else on the page is left out of the print. |
| `.paper--receipt` | A till receipt: 400 px at most, as tall as its lines, 24 px padding, centered foot. Prints 80 mm wide. |

## States
| State | How |
|---|---|
| `editing` | The form writes into the paper on input; changed totals roll with [rolling number](rolling-number.md). |
| `empty field` | Show a muted placeholder in the paper ("Levy payer name") rather than leaving a gap. |
| `printing` | Light theme, no ring, no padding of its own; the page margins come from `@page`. |

## Motion and microinteractions
- None of its own. Values that change while someone types may roll (rolling number); new line items enter with the list stagger once.

## Accessibility
- Use an `article` named by `aria-label` (the document and its number).
- Real headings and a real table with `th scope="col"`, so the preview reads in order.
- In a live preview, do not announce every keystroke; the form fields are the source.

## Do
- Keep it in the light hierarchy of the system: one weight step for totals, labels muted.
- Give the amount due its own row with the currency.

## Don't
- Scale the whole page down to fit a phone; let it reflow.
- Put app controls inside the paper; they belong in the form.

## Behavior (plain HTML)
No hook needed. When a `.paper--print` is on the page, `init()` switches to the light theme for the print and back after.

## Related
[Key-value](key-value.md) · [Table](table.md) · [Form layout](form-layout.md) · [Card](card.md)
