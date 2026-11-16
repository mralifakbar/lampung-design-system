export default {
  title: 'Prose',
  group: 'Content',
  order: 1,
  summary: 'A wrapper for long-form text you do not control line by line: articles, help pages, lesson notes, rendered Markdown. `.prose` styles plain headings, paragraphs, lists, links, tables and inline code inside it and caps the line length at 680 px.',
  when: [
    'Rendering Markdown or rich text from a CMS, an editor or an assistant answer, where the HTML has no classes.',
    'A help article, a lesson page, terms and policies: text that is read top to bottom.',
  ],
  whenNot: [
    ['Interface copy: card descriptions, helper text, empty states', 'card', 'Components set their own type; do not wrap UI in `.prose`.'],
    ['A page made of sections with titles and components in them', 'sections'],
    ['Code longer than one line', 'code-block'],
    ['Label and value pairs (fees, dates, details)', 'key-value'],
    ['A message in a chat', 'chat-message', 'Assistant messages may contain `.prose`, but the bubble comes from the chat component.'],
  ],
  where: 'In the main column of a page, alone or as the main column of `split-2` next to an [outline](outline). It sets its own `max-width` (`--size-measure`, 680 px); do not stretch it. On phones it fills the width inside the 20 px gutter and the body steps down to 15.5/26.',
  anatomy: [
    ['.prose', 'Required. The wrapper. Body 16/27, `--text-default`, 16 px between blocks.'],
    ['h2, h3', '`--type-title-2` / `--type-title-3` in `--text-strong`, 40 / 28 px above, 10 px to what follows.'],
    ['ul, ol (no class)', 'Disc and decimal markers in `--text-subtle`, 22 px indent, 8 px between items.'],
    ['a (no class)', 'Accent text, underlined at rest at 35 % strength, full strength on hover.'],
    ['strong, table, .code', 'Semibold strong text; tables with hairline rows; [inline code](inline-code). Add `.quote`, `.cite`, `.thumb` for quotes, citations and images.'],
  ],
  examples: [
    {
      title: 'A lesson page',
      desc: 'Plain HTML with no classes, except the inline code, a quote and a citation, which are their own components.',
      stage: 'block',
      html: `<article class="prose">
  <h2>Third normal form</h2>
  <p>A table is in <strong>third normal form</strong> when every column depends on the key, the whole key, and nothing but the key. In practice that means splitting out any column that really describes another column.</p>
  <h3>How to check a table</h3>
  <ol>
    <li>Find the primary key, for example <code class="code">student_id</code>.</li>
    <li>For each other column, ask whether it describes the key or something else.</li>
    <li>Move columns that describe something else into their own table.</li>
  </ol>
  <blockquote class="quote"><p>Normalize until it hurts, then denormalize until it works.</p><footer>A saying among database teachers</footer></blockquote>
  <p>Most course systems stop at third normal form; going further rarely pays off for read-heavy data <a class="cite" href="#src-1" aria-label="Source 1">1</a>. See the <a href="#lesson-14">next lesson</a> for indexes.</p>
  <table>
    <thead><tr><th>Form</th><th>Removes</th></tr></thead>
    <tbody>
      <tr><td>First</td><td>Repeating groups</td></tr>
      <tr><td>Second</td><td>Partial dependencies</td></tr>
      <tr><td>Third</td><td>Transitive dependencies</td></tr>
    </tbody>
  </table>
</article>`,
    },
    {
      title: 'Assistant answer',
      desc: 'Rendered Markdown from an answer: short paragraphs and a bulleted list.',
      stage: 'block',
      html: `<div class="prose">
  <p>You have three things due this week:</p>
  <ul>
    <li><strong>Lab report 3</strong>, Computer Networks, due tomorrow at 23:59.</li>
    <li><strong>Problem set 7</strong>, Linear Algebra, due Thursday.</li>
    <li>Reading chapter 9 for Operating Systems before Friday's class.</li>
  </ul>
  <p>Start with the lab report; it is worth 15 % of the course grade.</p>
</div>`,
    },
  ],
  motion: [
    'None. Long text never animates in, except text that is still streaming, which uses [streaming text](streaming-text).',
    'Link underlines change color over `--d-fast`.',
  ],
  a11y: [
    'Use real structure: `<article>` or `<main>`, one `<h1>` on the page (outside `.prose` in the page header), then `h2` and `h3` in order without skipping levels.',
    'Links say where they go; see [link](link).',
    'Tables keep `<thead>` and `<th>`; add a `<caption>` when the table has no heading right above it.',
    'Body text is 16 px at 27 px line height and about 70 characters a line, which keeps it readable when zoomed to 200 %.',
  ],
  do: [
    'Wrap rendered Markdown and CMS content in `.prose`.',
    'Keep paragraphs short and use headings every few paragraphs.',
    'Use `.quote` for quotes and `.code` for code inside prose.',
  ],
  dont: [
    'Put buttons, cards or forms inside `.prose`; place them in `sections` next to it.',
    'Override `max-width` to fill a wide screen.',
    'Add classes to every paragraph; the wrapper styles them.',
  ],
  related: ['quote', 'citation', 'inline-code', 'sections'],
};
