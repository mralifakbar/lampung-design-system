export default {
  title: 'CTA band',
  group: 'Marketing',
  order: 7,
  summary: 'The last ask on a landing page: a short title, one line, and the same primary action as the hero, on the quiet fill. It may hold the one line people copy to start.',
  when: [
    'The end of a landing or program page, before the footer.',
    'The end of a long article or guide that leads to one action.',
  ],
  whenNot: [
    ['A next step for a signed-in person inside the app', 'spotlight'],
    ['A condition that affects every page', 'banner'],
    ['The first screen', 'hero'],
  ],
  where: 'In a `msec--tight` [marketing section](marketing-section) right above the [site footer](site-footer). Full content width, centered text.',
  anatomy: [
    ['.cta-band', 'Required. The fill box, 40 to 88 px of padding.'],
    ['h2.cta-band__title', 'Required. 28 to 46 px, one sentence.'],
    ['p.cta-band__body', 'One or two sentences.'],
    ['.codeblock', 'Optional: the install line, on the base color, 460 px wide at most.'],
    ['.cta-band__actions', 'The primary action and one secondary.'],
  ],
  examples: [
    {
      title: 'Closing ask with a copied code',
      desc: 'A city MSME registration program as the example. The copy button confirms in place.',
      stage: 'block',
      html: `<div class="cta-band" style="width: 100%;">
  <h2 class="cta-band__title">Register your business in 15 minutes.</h2>
  <p class="cta-band__body">Registration is free, and you can update your business data at any time.</p>
  <div class="codeblock"><div class="codeblock__bar"><span>Your kelurahan code</span><button class="btn btn--plain btn--sm" data-lds-copy="UMKM-KDT-2026"><span class="swap" style="width: 16px; height: 16px;" aria-hidden="true"><span class="ic swap__a" style="font-size: 16px;">content_copy</span><span class="ic swap__b" style="font-size: 16px;">check</span></span><span data-lds-copy-label="Copied">Copy</span></button></div><pre>UMKM-KDT-2026</pre></div>
  <div class="cta-band__actions"><a class="btn btn--primary btn--lg" href="#">Register your business</a><a class="btn btn--secondary btn--lg" href="#">See requirements</a></div>
</div>`,
    },
  ],
  motion: [
    'Static. May fade up once with [reveal on scroll](reveal-on-scroll).',
  ],
  a11y: [
    'A real heading, so the band is found in the heading list.',
    'Buttons and links are real; the copy button announces "Copied".',
  ],
  do: [
    'Repeat the hero\'s primary action, named the same way.',
    'Say what it costs to start in the body.',
  ],
  dont: [
    'Add a gradient, an image or a second primary button.',
    'Use generic labels such as "Get started" or "Learn more".',
  ],
  related: ['hero', 'spotlight', 'code-block', 'site-footer'],
};
