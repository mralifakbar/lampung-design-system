export default {
  title: 'Site footer',
  group: 'Marketing',
  order: 8,
  status: 'new',
  summary: 'The bottom of a marketing or content site: the product name and one line about it, link groups that exist, and a bottom row for the small print and the appearance control.',
  when: [
    'Every page of a marketing, landing or documentation site that uses a [top nav](top-nav).',
  ],
  whenNot: [
    ['Inside an app with a sidebar', 'app-shell', 'Settings and legal links live in the sidebar footer or the account menu.'],
    ['A closing ask', 'cta-band'],
  ],
  where: 'The last element in `<body>`, after `<main>`. Same width and gutter as the [marketing sections](marketing-section). The brand takes 2 of 5 columns from 760 px; the link groups wrap at 104 px each, so three fit on a phone.',
  anatomy: [
    ['footer.site-footer', 'Required. Hairline on top.'],
    ['.site-footer__top', 'Brand and the link groups.'],
    ['.site-footer__brand', '`.site-footer__name` and `p.site-footer__about`.'],
    ['nav.site-footer__nav', 'A `nav` with `aria-label="Footer"`.'],
    ['.site-footer__group', 'A small `h2` and a `ul` of links. Only groups the site really has.'],
    ['.site-footer__bottom', 'The small print (copyright, example notice, legal) and the appearance control.'],
  ],
  examples: [
    {
      title: 'Three groups and the appearance control',
      desc: 'Links are 32 px tall with a pointer and 44 px on touch screens.',
      stage: 'block',
      html: `<footer class="site-footer" style="width: 100%;">
  <div class="site-footer__top">
    <div class="site-footer__brand"><span class="site-footer__name">Gradebook</span><p class="site-footer__about">Marking, comments and reports for teachers.</p></div>
    <nav class="site-footer__nav" aria-label="Footer">
      <div class="site-footer__group"><h2>Product</h2><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li></ul></div>
      <div class="site-footer__group"><h2>Help</h2><ul><li><a href="#">Guides</a></li><li><a href="#">Contact</a></li></ul></div>
      <div class="site-footer__group"><h2>Legal</h2><ul><li><a href="#">Terms</a></li><li><a href="#">Privacy</a></li></ul></div>
    </nav>
  </div>
  <div class="site-footer__bottom">
    <p>© 2026 Gradebook. Example content.</p>
    <div class="seg" role="group" aria-label="Appearance" data-lds-segmented style="width: 200px;"><span class="seg__thumb"></span><button class="seg__btn" aria-pressed="true" data-lds-theme="light"><span class="ic ic--sm" aria-hidden="true">light_mode</span>&nbsp;Light</button><button class="seg__btn" aria-pressed="false" data-lds-theme="dark"><span class="ic ic--sm" aria-hidden="true">dark_mode</span>&nbsp;Dark</button></div>
  </div>
</footer>`,
    },
  ],
  states: [
    ['hover', 'Link text turns strong, only where hover exists.'],
  ],
  motion: [
    'Color only, over `--d-fast`.',
  ],
  a11y: [
    'A `footer` landmark with a labelled `nav`; group headings are `h2` so they appear in the outline.',
    'Links are 44 px tall on touch screens.',
  ],
  do: [
    'List only pages that exist.',
    'Put an example notice in the small print on demo pages.',
  ],
  dont: [
    'Fill four columns because templates have four.',
    'Repeat the whole top nav and every section anchor.',
  ],
  related: ['top-nav', 'cta-band', 'marketing-section', 'theming'],
};
