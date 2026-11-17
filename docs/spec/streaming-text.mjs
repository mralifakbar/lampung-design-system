const THINK = `<div class="thinking" data-lds-thinking role="status"><span class="dotgrid" aria-hidden="true"></span><span class="shimmer">Reading the service guide</span><span class="thinking__time"></span></div>`;
const ANSWER = 'For a first electronic ID card (KTP-el), bring your Kartu Keluarga and a letter from your RT/RW to the Disdukcapil desk. Recording takes about 15 minutes, and the card is usually ready within 14 working days.';

export default {
  title: 'Streaming text',
  group: 'Chat',
  order: 4,
  summary: 'An answer that arrives word by word, each word fading in from a 3 px blur, with a round caret at the end while more is coming. It shows real progress; never fake it for text you already have.',
  when: [
    'An assistant reply that is generated while the person waits: show words as they arrive from the server.',
    'Right after [thinking](thinking) ends: the thinking row settles, then the answer streams in under it.',
  ],
  whenNot: [
    ['Waiting before the first word exists', 'thinking'],
    ['Text you already have in full (a saved answer, a help article)', 'prose', 'Show it at once; typing it out only slows people down.'],
    ['A short status that changes (Saving, Saved)', 'text-morph'],
    ['Loading the layout of a page', 'skeleton'],
  ],
  where: 'Inside the `.bubble` of a `msg--ai` [chat message](chat-message), or in any reading block that is being generated (a summary at the top of a report). The actions row of the message stays hidden until streaming ends.',
  anatomy: [
    ['.stream', 'The element receiving words (added by `streamText`).'],
    ['.stream.is-streaming', 'While words are still coming: draws an 8 px round caret after the last word, blinking each second.'],
    ['.stream__w', 'One arrived word. Fades from 3 px blur and transparent over 360 ms.'],
  ],
  examples: [
    {
      title: 'An answer arriving',
      desc: 'Press Ask again. Words appear at the pace they arrive; the caret marks that more is coming and disappears when the answer is complete. The actions row appears only at the end.',
      stage: 'block',
      html: `<div class="chat" style="max-width: 560px;">
  <div class="msg msg--me"><div class="bubble">How do I get a KTP-el, in two sentences?</div></div>
  <div class="msg msg--ai"><div class="bubble" id="st-a">${ANSWER}</div><div class="msg__actions"><button class="icon-btn" aria-label="Copy answer" data-lds-copy="${ANSWER}"><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b">check</span></span></button></div></div>
  <button class="btn btn--secondary btn--sm" style="align-self: flex-start;" onclick="const b = document.getElementById('st-a'); const acts = b.nextElementSibling; acts.hidden = true; b.setAttribute('aria-busy', 'true'); import('../../js/lds.js').then((m) => m.streamText(b, '${ANSWER}')).then(() => { acts.hidden = false; b.removeAttribute('aria-busy'); });"><span class="ic" aria-hidden="true">refresh</span>Ask again</button>
</div>`,
      code: `import { streamText } from 'lampung-design-system/js';

bubble.setAttribute('aria-busy', 'true');
actions.hidden = true;
await streamText(bubble, fullText, { wordMs: 40 }); // or append words yourself as they arrive
bubble.removeAttribute('aria-busy');
actions.hidden = false;`,
    },
    {
      title: 'After thinking',
      desc: 'Thinking runs with a real timer while the assistant reads. When the first words are ready it settles into what it did, and the answer streams in under it.',
      stage: 'block',
      replay: true,
      html: `<div class="msg msg--ai" style="max-width: 560px;">
  ${THINK}
  <div class="bubble" id="st-b"></div>
  <button class="btn btn--secondary btn--sm" style="align-self: flex-start;" onclick="this.hidden = true; const msg = this.closest('.msg'); import('../../js/lds.js').then((m) => { m.thinkingDone(msg.querySelector('.thinking'), 'Read 3 pages of the service guide'); return m.streamText(document.getElementById('st-b'), 'The guide says a moving letter (surat pindah) needs your KK, your KTP-el and a letter from the kelurahan. Page 12 lists the Disdukcapil desks in Bandar Lampung that issue it on the same day.'); });">Finish thinking</button>
</div>`,
      code: `<div class="msg msg--ai">
  <div class="thinking" data-lds-thinking role="status"><span class="dotgrid" aria-hidden="true"></span><span class="shimmer">Reading the service guide</span><span class="thinking__time"></span></div>
  <div class="bubble"></div>
</div>
<script type="module">
  import { thinkingDone, streamText } from 'lampung-design-system/js';
  // when the first token arrives:
  thinkingDone(msg.querySelector('.thinking'), 'Read 3 pages of the service guide');
  await streamText(msg.querySelector('.bubble'), text);
</script>`,
    },
    {
      title: 'A summary generated in a page',
      desc: 'Streaming is not only for chat. A report summary can arrive the same way at the top of the page while the rest of the page is already usable.',
      stage: 'block',
      replay: true,
      html: `<div class="card" style="max-width: 560px;">
  <p class="card__title">This week in citizen reports</p>
  <p class="card__sub stream is-streaming" id="st-c" style="margin-top: 8px;"></p>
  <button class="btn btn--plain btn--sm" style="margin-top: 8px; margin-left: -10px;" onclick="this.hidden = true; import('../../js/lds.js').then((m) => m.streamText(document.getElementById('st-c'), 'Most reports this week were about street lights in Way Halim and Kedaton. 18 of 30 reports of uncollected rubbish came from Rajabasa, so the Monday pickup route is worth checking.'));">Generate summary</button>
</div>`,
    },
  ],
  states: [
    ['streaming', '`.stream.is-streaming`: words arriving, caret shown, `aria-busy="true"` on the container.'],
    ['done', 'Caret removed, `aria-busy` removed, actions revealed.'],
    ['stopped', 'If the person stops generation, call it done where it is and add a [message meta](chat-message) line "Stopped".'],
  ],
  motion: [
    'Each word: `lds-word-in`, from `opacity: 0` and `blur(3px)` to sharp over 360 ms on `--ease-enter`. No movement, so lines never jump while reading.',
    'Pace: `streamText` adds one word every `wordMs` (40 ms by default). When you stream from a server, append words as they come; do not add an artificial delay on top.',
    'Caret: an 8 px dot after the last word, blinking with `lds-caret` (1 s, stepped). It disappears the moment the text is complete.',
    'Interruption: calling `streamText` again on the same element clears it and starts over; words already faded stay sharp.',
    'Reduced motion: words appear at once (no delay between them, 1 ms fade) and the caret shows without blinking.',
  ],
  a11y: [
    'Set `aria-busy="true"` on the message while it streams and remove it at the end, so a screen reader in the `role="log"` reads the whole answer once instead of word by word.',
    'Do not move focus to the answer while it streams; the person may be typing the next question.',
    'The caret is decoration (a pseudo-element); nothing to hide.',
  ],
  do: [
    'Stream only text that is really being generated.',
    'Pair with [thinking](thinking) for the wait before the first word.',
    'Reveal copy and retry actions only after the end.',
  ],
  dont: [
    'Type out text you already have to make it feel smart.',
    'Animate words upward or scale them; reading lines must stay still.',
    'Auto-scroll the conversation while the reader has scrolled up; show Latest instead ([chat layout](chat-layout)).',
  ],
  js: '`streamText(el, text, { wordMs = 40 })` from `js/lds.js` adds `stream is-streaming` to `el`, clears it, appends each word as a `.stream__w` span, and resolves its promise when done (removing `is-streaming`). With live tokens, add `stream is-streaming` yourself, append `<span class="stream__w">word</span>` per word, and remove `is-streaming` at the end.',
  react: `import { Thinking } from 'lampung-design-system/react';

{phase === 'thinking' && <Thinking label="Reading the service guide" startedAt={startedAt} />}
<div className={\`bubble stream\${phase === 'streaming' ? ' is-streaming' : ''}\`} aria-busy={phase === 'streaming'}>
  {words.map((w, i) => <span key={i} className="stream__w">{w} </span>)}
</div>`,
  related: ['thinking', 'chat-message', 'chat-layout', 'text-morph'],
};
