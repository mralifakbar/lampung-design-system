export default {
  title: 'Testimonial',
  group: 'Marketing',
  order: 6,
  summary: 'What one real person said about the product, with their name and role. Quiet on purpose: the words carry it. Only publish real quotes; while designing, label placeholders as example content where readers see it.',
  when: [
    'A landing or pricing page with quotes from real customers who agreed to be named.',
    'A case study that leads with what the customer said.',
  ],
  whenNot: [
    ['Quoting a rule, a document or a source in an article', 'quote'],
    ['A message in a conversation', 'chat-message'],
    ['Numbers that prove a point', 'stat-row'],
  ],
  where: 'In a [marketing section](marketing-section) between the features and the pricing. One `testimonial--lg` across the full width, or beside two shorter ones; a single column on phones.',
  anatomy: [
    ['figure.testimonial', 'Required. The card on the quiet fill.'],
    ['.testimonial--lg', 'Larger quote, up to 36 em a line.'],
    ['blockquote.testimonial__quote', 'Required. The words, quoted exactly.'],
    ['figcaption.testimonial__by', 'Required. An [avatar](avatar) (photo or initials) and the person.'],
    ['.testimonial__name, .testimonial__role', 'Name, then role and company.'],
  ],
  examples: [
    {
      title: 'One lead quote and one short one',
      desc: 'Example content: the people and words are invented to show the layout.',
      stage: 'block',
      html: `<div class="docs-col" style="width: 100%;">
  <span class="badge">Example content</span>
  <figure class="testimonial testimonial--lg">
    <blockquote class="testimonial__quote">Marking used to take my whole Sunday. With saved comments I finish a class of forty before dinner.</blockquote>
    <figcaption class="testimonial__by"><span class="avatar" aria-hidden="true">DS</span><span class="testimonial__who"><span class="testimonial__name">Dewi Sartika</span><span class="testimonial__role">Biology teacher, example school</span></span></figcaption>
  </figure>
  <figure class="testimonial">
    <blockquote class="testimonial__quote">The export matched the office template on the first try.</blockquote>
    <figcaption class="testimonial__by"><span class="avatar avatar--gray" aria-hidden="true">AH</span><span class="testimonial__who"><span class="testimonial__name">Arif Hakim</span><span class="testimonial__role">Vice principal, example school</span></span></figcaption>
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
    'Keep quotes to what the product changed for them.',
    'Mark example content visibly while a page is a draft.',
  ],
  dont: [
    'Invent quotes, names, star ratings or company logos for a live page.',
    'Add quote marks as decoration or a carousel that turns on its own.',
  ],
  related: ['quote', 'avatar', 'marketing-section', 'stat-row'],
};
