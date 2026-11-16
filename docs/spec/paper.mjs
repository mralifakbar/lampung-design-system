const items = [['Brand identity refresh', 1, '$3,800.00'], ['Landing page design and build', 1, '$2,600.00'], ['Content workshop, half day', 2, '$450.00']];
const inv = `<article class="paper" style="max-width: 640px;" aria-label="Invoice INV-2026-118">
  <header class="paper__head">
    <div class="paper__brand"><span class="paper__mark" aria-hidden="true">K</span>Kelola Studio</div>
    <div class="paper__doc"><div class="paper__title">Invoice</div><span class="badge badge--warning">Due 30 Nov 2026</span></div>
  </header>
  <dl class="paper__meta">
    <div><dt class="paper__label">Invoice number</dt><dd>INV-2026-118</dd></div>
    <div><dt class="paper__label">Issued</dt><dd>16 Nov 2026</dd></div>
    <div><dt class="paper__label">Due</dt><dd>30 Nov 2026</dd></div>
  </dl>
  <div class="paper__parties">
    <div class="paper__party"><span class="paper__label">From</span><p>Kelola Studio</p><p>Jl. Kemang Raya 12, Jakarta 12730</p><p>billing@kelola.studio</p></div>
    <div class="paper__party"><span class="paper__label">Bill to</span><p>Rumah Belajar Nusantara</p><p>Jl. Dago 88, Bandung 40135</p><p>finance@rumahbelajar.id</p></div>
  </div>
  <table class="paper__table">
    <thead><tr><th scope="col">Description</th><th scope="col" class="num">Qty</th><th scope="col" class="num">Amount</th></tr></thead>
    <tbody>${items.map(([d, q, a]) => `<tr><td>${d}</td><td class="num">${q}</td><td class="num">${a}</td></tr>`).join('')}</tbody>
  </table>
  <div class="paper__totals">
    <div class="paper__sum"><span>Subtotal</span><b>$7,300.00</b></div>
    <div class="paper__sum"><span>VAT 11%</span><b>$803.00</b></div>
    <div class="paper__sum paper__sum--total"><span>Balance due</span><b>$8,103.00</b></div>
  </div>
  <footer class="paper__foot"><p>Pay by bank transfer to Bank Mandiri 123 000 4567 890, Kelola Studio.</p><p>Thank you. Questions about this invoice: billing@kelola.studio.</p></footer>
</article>`;

export default {
  title: 'Paper',
  group: 'Content',
  order: 6,
  summary: 'A printable page shown as a sheet inside the app: an invoice, a receipt, a letter, a certificate. The text reflows with the width, so the preview stays readable on a phone, and it can be the only thing that prints.',
  when: [
    'A live preview of a document people are editing in a form beside it: an invoice, a quote, an offer letter.',
    'A record people print or save as PDF: a receipt, a payslip, a certificate of completion.',
  ],
  whenNot: [
    ['The details of a record inside the app, not a document', 'key-value'],
    ['Long rich text from an editor or a CMS', 'prose'],
    ['A self-contained subject among others in a grid', 'card'],
  ],
  where: 'In its own column beside the form on wide screens (sticky under the app bar), under the form on phones. Up to 816 px wide; it keeps a letter page proportion as its minimum height.',
  anatomy: [
    ['article.paper', 'Required. The sheet: base color, a hairline ring, padding that grows with the width. `aria-label` names the document.'],
    ['.paper__head', 'Brand (`.paper__brand` with `.paper__mark`) at the start, `.paper__doc` (`.paper__title` and a badge) at the end.'],
    ['dl.paper__meta', 'Number and dates; each `dt.paper__label` over its `dd`.'],
    ['.paper__parties > .paper__party', 'From and to, each a `.paper__label` and lines of address.'],
    ['table.paper__table', 'Line items; `.num` right-aligns figures.'],
    ['.paper__totals > .paper__sum', 'Label and amount rows; `.paper__sum--total` for the amount due.'],
    ['.paper__foot', 'Payment details and notes, pushed to the bottom of the page.'],
    ['.paper--print', 'Modifier. When printing, only this paper prints, edge to edge, in the light theme.'],
  ],
  examples: [
    {
      title: 'An invoice',
      desc: 'A full invoice. Narrow the window: the parties stack, the dates wrap, the figures stay right-aligned.',
      stage: 'fill',
      html: inv,
    },
    {
      title: 'Print only the paper',
      desc: 'Add `paper--print` and call `window.print()` from a Print button. The app around it does not print, and the sheet prints dark on white even in the dark theme.',
      stage: 'block',
      html: `<div class="docs-row"><button class="btn btn--secondary btn--md" type="button" onclick="window.print()"><span class="ic" aria-hidden="true">print</span>Print invoice</button></div>`,
      code: `<button class="btn btn--secondary btn--md" type="button" onclick="window.print()"><span class="ic" aria-hidden="true">print</span>Print invoice</button>
<article class="paper paper--print" aria-label="Invoice INV-2026-118">…</article>`,
    },
  ],
  variants: [
    ['.paper', 'A sheet on screen.'],
    ['.paper--print', 'The one sheet that prints; everything else on the page is left out of the print.'],
    ['.paper--receipt', 'A till receipt: 400 px at most, as tall as its lines, 24 px padding, centered foot. Prints 80 mm wide.'],
  ],
  states: [
    ['editing', 'The form writes into the paper on input; changed totals roll with [rolling number](rolling-number).'],
    ['empty field', 'Show a muted placeholder in the paper ("Client name") rather than leaving a gap.'],
    ['printing', 'Light theme, no ring, no padding of its own; the page margins come from `@page`.'],
  ],
  motion: [
    'None of its own. Values that change while someone types may roll (rolling number); new line items enter with the list stagger once.',
  ],
  a11y: [
    'Use an `article` named by `aria-label` (the document and its number).',
    'Real headings and a real table with `th scope="col"`, so the preview reads in order.',
    'In a live preview, do not announce every keystroke; the form fields are the source.',
  ],
  do: [
    'Keep it in the light hierarchy of the system: one weight step for totals, labels muted.',
    'Give the amount due its own row with the currency.',
  ],
  dont: [
    'Scale the whole page down to fit a phone; let it reflow.',
    'Put app controls inside the paper; they belong in the form.',
  ],
  js: 'No hook needed. When a `.paper--print` is on the page, `init()` switches to the light theme for the print and back after.',
  related: ['key-value', 'table', 'form-layout', 'card'],
};
