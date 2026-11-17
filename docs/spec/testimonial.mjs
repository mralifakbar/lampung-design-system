export default {
  title: 'Testimonial',
  group: 'Marketing',
  order: 6,
  summary: 'What one real person said about the service, with their name and role. Quiet on purpose: the words carry it. Only publish real quotes; while designing, label placeholders as example content where readers see it.',
  when: [
    'A landing or service page with quotes from real residents or users who agreed to be named.',
    'A case study that leads with what the user said.',
  ],
  whenNot: [
    ['Quoting a rule, a document or a source in an article', 'quote'],
    ['A message in a conversation', 'chat-message'],
    ['Numbers that prove a point', 'stat-row'],
  ],
  where: 'In a [marketing section](marketing-section) between the features and the fees. One `testimonial--lg` across the full width, or beside two shorter ones; a single column on phones.',
  anatomy: [
    ['figure.testimonial', 'Required. The card on the quiet fill.'],
    ['.testimonial--lg', 'Larger quote, up to 36 em a line.'],
    ['blockquote.testimonial__quote', 'Required. The words, quoted exactly.'],
    ['figcaption.testimonial__by', 'Required. An [avatar](avatar) (photo or initials) and the person.'],
    ['.testimonial__name, .testimonial__role', 'Name, then role and place.'],
  ],
  examples: [
    {
      title: 'One lead quote and one short one',
      desc: 'Example content: the people and words are invented to show the layout.',
      stage: 'block',
      html: `<div class="docs-col" style="width: 100%;">
  <span class="badge">Example content</span>
  <figure class="testimonial testimonial--lg">
    <blockquote class="testimonial__quote">Getting a business permit used to take three trips to the office. Now my papers were complete in one evening, from home.</blockquote>
    <figcaption class="testimonial__by"><span class="avatar" aria-hidden="true">DA</span><span class="testimonial__who"><span class="testimonial__name">Dewi Anggraini</span><span class="testimonial__role">Food stall owner in Kedaton, example</span></span></figcaption>
  </figure>
  <figure class="testimonial">
    <blockquote class="testimonial__quote">Our residents can see for themselves how far the street light report has got.</blockquote>
    <figcaption class="testimonial__by"><span class="avatar avatar--gray" aria-hidden="true">AH</span><span class="testimonial__who"><span class="testimonial__name">Arif Hakim</span><span class="testimonial__role">RT head in Way Halim, example</span></span></figcaption>
  </figure>
</div>`,
    },
  ],
  variants: [
    ['testimonial--lg', 'The lead quote: 20 to 26 px.'],
  ],
  motion: [
    'Static. May fade up once with [reveal on scroll](reveal-on-scroll), 35 ms apart.',
  ],
  a11y: [
    'A `figure` with the quote in `blockquote` and the person in `figcaption`, so the attribution is tied to the words.',
    'Initials avatars are `aria-hidden`; the name is text.',
  ],
  do: [
    'Quote real people with their permission and their real role.',
    'Keep quotes to what the service changed for them.',
    'Mark example content visibly while a page is a draft.',
  ],
  dont: [
    'Invent quotes, names, star ratings or company logos for a live page.',
    'Add quote marks as decoration or a carousel that turns on its own.',
  ],
  related: ['quote', 'avatar', 'marketing-section', 'stat-row'],
};
