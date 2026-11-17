export default {
  title: 'Citation',
  group: 'Content',
  order: 3,
  summary: 'A small numbered pill after a claim that links to its source: `<a class="cite" href="#src-1">1</a>`. Used in articles and assistant answers so every fact can be checked.',
  when: [
    'An assistant answer or summary states facts drawn from documents: each claim gets a numbered citation to the document it came from.',
    'A service guide or report refers to sources listed at the end.',
  ],
  whenNot: [
    ['A link the reader should follow as part of the sentence', 'link'],
    ['Reproducing the words of a source', 'quote'],
    ['A count of items next to a label', 'count'],
    ['A status or category tag', 'badge'],
    ['A preview of a linked page on hover', 'hover-card'],
  ],
  where: 'Directly after the claim, before the period or after it consistently, with no space before it. The numbered sources follow at the end of the text or the message. On phones keep the sources list right below the answer so the jump is short.',
  anatomy: [
    ['a.cite', 'Required. 18 px tall pill on `--accent-tint`, 11 px semibold tabular number in `--accent-text`. `href` points to the source entry (or the source URL).'],
    ['aria-label', 'Required. "Source 1", so it is not read as a bare number.'],
    ['sources list', 'An ordered list at the end whose items carry the matching `id`s. In `.prose` a plain `<ol>` is styled already.'],
  ],
  examples: [
    {
      title: 'In an answer, with sources',
      desc: 'Each claim points to the document it came from. Hover a number to see it darken.',
      stage: 'block',
      html: `<div class="prose">
  <p>Samsat keliling serves Way Halim every Tuesday and Thursday, 08:00 to 12:00, at the Way Halim field <a class="cite" href="#cite-src-1" aria-label="Source 1">1</a>. Bring your KTP-el and the original STNK <a class="cite" href="#cite-src-2" aria-label="Source 2">2</a>, and the vehicle tax is paid on the spot by QRIS or cash <a class="cite" href="#cite-src-1" aria-label="Source 1">1</a>.</p>
  <h3>Sources</h3>
  <ol>
    <li id="cite-src-1"><a href="#jadwal">Samsat keliling schedule, Bandar Lampung, November 2026</a></li>
    <li id="cite-src-2"><a href="#syarat">Requirements for paying annual vehicle tax</a></li>
  </ol>
</div>`,
    },
  ],
  states: [
    ['hover', 'Background deepens to `--accent-tint-strong` over `--d-fast`.'],
    ['focus', 'System focus ring around the pill.'],
    ['target', 'The source item it points to; use `:target` in your project CSS or scroll it into view.'],
  ],
  motion: [
    'Only the hover color, over `--d-fast`. Jumping to the source uses the page\'s smooth scroll; under reduced motion it jumps.',
  ],
  a11y: [
    'An `<a href>` with `aria-label="Source N"`; the visible number alone is meaningless when read.',
    'The pill is 18 px tall, under the 44 px touch target. Keep citations spaced apart in text and always provide the full sources list as a second way to reach them.',
    'Number sources in order of first appearance and reuse the number for repeat citations.',
  ],
  do: [
    'Cite every factual claim in an assistant answer that comes from a document.',
    'List the sources with titles people recognize.',
  ],
  dont: [
    'Cite without a sources list.',
    'Use citations as footnotes for asides; write the aside in the text.',
    'Put several pills in a row without text between them; list `1, 2` in one sentence instead.',
  ],
  related: ['prose', 'link', 'quote', 'chat-message'],
};
