export default {
  title: 'Accordion',
  group: 'Data display',
  order: 8,
  summary: 'A stack of questions or sections, each opening its panel on a spring. For content people read selectively; never to hide what everyone needs.',
  when: [
    'Frequently asked questions, where each person needs one or two answers.',
    'Optional detail under each item of a page: what each service covers, the requirements of each permit type.',
    'Long settings or reference pages where sections can be read one at a time (`data-lds-accordion="single"` keeps one open).',
  ],
  whenNot: [
    ['Switching between peer views of the same content', 'tabs'],
    ['The first few items of a list with the rest behind a button', 'show-more'],
    ['A nested hierarchy of folders or pages', 'tree'],
    ['One step an assistant took, with its detail', 'tool-call'],
    ['Navigation within a long page', 'outline'],
    ['Content everyone needs to read; show it', 'prose'],
  ],
  where: 'In the content column, full width of it, often under a [section](sections) heading. White with a ring on the canvas, `.acc--fill` on white panels. On phones the same; the full row is the tap target.',
  anatomy: [
    ['.acc', 'Required. The group: white, ring, large radius. `data-lds-accordion="single"` closes the others when one opens.'],
    ['.acc--fill', 'Quiet fill, no ring.'],
    ['.acc__item', 'Required. One question or section; hairline between items.'],
    ['button.acc__btn', 'Required. 56 px row with the title and an `expand_more` icon that turns when open. `aria-expanded` and `aria-controls`.'],
    ['.acc__title > text + .acc__sub', 'Optional two-line title with a subtle second line.'],
    ['.acc__panel(.is-open)', 'Required. The panel; it opens by animating grid rows. Holds one `div`.'],
    ['.acc__panel > div > p', 'Plain answer text.'],
    ['.acc__panel > div > .acc__content', 'Richer content: lists get bullets and spacing, tables and actions stack with 10 px gaps.'],
  ],
  examples: [
    {
      title: 'Questions, one open at a time',
      desc: 'With `data-lds-accordion="single"` opening one closes the other.',
      stage: 'block',
      html: `<div class="acc" data-lds-accordion="single" style="max-width: 560px;">
  <div class="acc__item"><button class="acc__btn" id="faq1-b" aria-expanded="true" aria-controls="faq1">Can I change my queue slot after booking?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel is-open" id="faq1" role="region" aria-labelledby="faq1-b"><div><p>Yes, up to one day before the visit. On the day itself, ask the Disdukcapil counter in Way Halim.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" id="faq2-b" aria-expanded="false" aria-controls="faq2">Where do I find my new family card (KK)?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="faq2" role="region" aria-labelledby="faq2-b"><div><p>Under Documents, then Population records. You can download it as a PDF with a QR code.</p></div></div></div>
  <div class="acc__item"><button class="acc__btn" id="faq3-b" aria-expanded="false" aria-controls="faq3">What happens if I miss my e-KTP recording?<span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="faq3" role="region" aria-labelledby="faq3-b"><div><p>Book a new slot. Recording also opens every Saturday at the Kedaton district office.</p></div></div></div>
</div>`,
    },
    {
      title: 'Two-line titles and rich content',
      desc: '`.acc__title` with `.acc__sub`, and `.acc__content` for a list and an action. Several can be open.',
      stage: 'block',
      html: `<div class="acc acc--fill" style="max-width: 560px;">
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="sec1"><span class="acc__title">Step 1: documents to bring<span class="acc__sub">4 documents · checked at the counter</span></span><span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="sec1" role="region"><div><div class="acc__content"><p>Bring the originals; copies are made at the counter.</p><ul><li>Cover letter from your RT/RW.</li><li>Family card (KK) and old ID card.</li></ul><button class="btn btn--secondary btn--sm" style="align-self: flex-start;">See the full checklist</button></div></div></div></div>
  <div class="acc__item"><button class="acc__btn" aria-expanded="false" aria-controls="sec2"><span class="acc__title">Step 2: pay the fee<span class="acc__sub">Free · no counter payment</span></span><span class="ic" aria-hidden="true">expand_more</span></button><div class="acc__panel" id="sec2" role="region"><div><div class="acc__content"><p>Population documents are free of charge. Report any request for payment through the complaint channel.</p></div></div></div></div>
</div>`,
    },
  ],
  variants: [
    ['acc', 'White with a ring.'],
    ['acc--fill', 'Quiet fill, for white panels.'],
    ['data-lds-accordion="single"', 'One item open at a time.'],
  ],
  states: [
    ['closed', '`aria-expanded="false"` on the button, `.acc__panel` without `is-open`.'],
    ['open', '`aria-expanded="true"` and `.acc__panel.is-open`; the icon turns 180 degrees.'],
    ['hover', 'The button tints `--bg-tint`.'],
  ],
  motion: [
    'Height: `.acc__panel` animates `grid-template-rows` 0fr to 1fr on `--spring-smooth` (`--d-smooth`, 560 ms), never a `max-height` guess, so any content height opens at the same pace.',
    'Content: opacity and a 4 px rise. In: opacity over `--d-standard` on `--ease-enter` 80 ms late, rise on `--spring-smooth` 40 ms late, so the space opens before the text arrives. Out: both over `--d-fast` on `--ease-exit`.',
    'The chevron turns 180 degrees on `--spring-smooth`. All are transitions, so a second click mid-way reverses smoothly.',
    'Reduced motion: 120 ms linear changes.',
  ],
  a11y: [
    'The header is a real `<button>` with `aria-expanded` and `aria-controls` pointing at the panel `id`. Wrap it in a heading (`h3`) when the accordion is the page outline.',
    'Panels carry `role="region"` and `aria-labelledby` the button when there are six or fewer; leave the role off for long lists.',
    'A closed panel is only collapsed visually; links and buttons inside it stay focusable. Set `inert` on closed panels that contain controls (React `AccordionItem` users can add it the same way).',
    'Enter and Space toggle (native button). Do not trap arrow keys.',
  ],
  do: [
    'Write each title as the question or the section name a person scans for.',
    'Use `single` mode only when items are alternatives; let FAQs open several.',
    'Open the item that answers the most common question by default when it helps.',
  ],
  dont: [
    'Hide required information or the primary action in a closed panel.',
    'Nest accordions.',
    'Animate height with `max-height` or JS measuring.',
  ],
  js: '`init()` wires every `.acc__btn[aria-controls]`: a click flips `aria-expanded` and toggles `.is-open` on the panel. `data-lds-accordion="single"` on the group closes the others.',
  react: `import { AccordionItem } from 'lampung-design-system/react';

<div className="acc">
  <AccordionItem title="Step 1: documents to bring" sub="4 documents · checked at the counter" defaultOpen>
    <p>Bring the originals; copies are made at the counter.</p>
  </AccordionItem>
</div>`,
  related: ['tabs', 'show-more', 'tree', 'height-expand'],
};
