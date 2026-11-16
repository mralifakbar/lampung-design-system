export default {
  title: 'CTA band',
  group: 'Marketing',
  order: 7,
  status: 'new',
  summary: 'The last ask on a landing page: a short title, one line, and the same primary action as the hero, on the quiet fill. It may hold the one line people copy to start.',
  when: [
    'The end of a landing or product page, before the footer.',
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
      title: 'Closing ask with an install line',
      desc: 'The copy button confirms in place.',
      stage: 'block',
      html: `<div class="cta-band" style="width: 100%;">
  <h2 class="cta-band__title">Mark your next class in half the time.</h2>
  <p class="cta-band__body">Bring one class over for free and keep it as long as you like.</p>
  <div class="codeblock"><div class="codeblock__bar"><span>Your class code</span><button class="btn btn--plain btn--sm" data-lds-copy="BIO-2026-A"><span class="swap" style="width: 16px; height: 16px;" aria-hidden="true"><span class="ic swap__a" style="font-size: 16px;">content_copy</span><span class="ic swap__b" style="font-size: 16px;">check</span></span><span data-lds-copy-label="Copied">Copy</span></button></div><pre>BIO-2026-A</pre></div>
  <div class="cta-band__actions"><a class="btn btn--primary btn--lg" href="#">Start with one class</a><a class="btn btn--secondary btn--lg" href="#">See pricing</a></div>
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
