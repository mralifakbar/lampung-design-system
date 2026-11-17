const COPY = (text) => `<button class="icon-btn" aria-label="Copy answer" data-lds-copy="${text}"><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b">check</span></span></button>`;
const ACTIONS = (text) => `<div class="msg__actions">${COPY(text)}<button class="icon-btn" aria-label="Try again"><span class="ic" aria-hidden="true">refresh</span></button><button class="icon-btn" aria-label="Share answer"><span class="ic" aria-hidden="true">share</span></button></div>`;
const SEND = `<button class="composer__send" type="submit" aria-label="Send"><span class="ic" aria-hidden="true">arrow_upward</span></button>`;
const APPEND = (chat, scroll) => `event.preventDefault(); const t = this.querySelector('textarea').value.trim(); if (!t) return; const m = document.createElement('div'); m.className = 'msg msg--me is-new'; const b = document.createElement('div'); b.className = 'bubble'; b.textContent = t; m.append(b); const c = document.getElementById('${chat}'); c.insertBefore(m, c.querySelector('.chat__jump')); const s = document.getElementById('${scroll}'); s.scrollTo({ top: s.scrollHeight, behavior: 'smooth' });`;

export default {
  title: 'Chat layout',
  group: 'Chat',
  order: 1,
  summary: 'The conversation column: messages stacked 20 px apart in `.chat`, the history scrolling above a composer that never scrolls away, and a Latest button that appears only when the reader has scrolled up. Newest at the bottom, always.',
  when: [
    'A conversation with a city services assistant: the person asks on the right, answers fill the reading column, newest at the bottom.',
    'A support or feedback thread where order and time matter and the person replies from the same screen.',
    'A history long enough to scroll, where people read back and need a way to return to the latest message.',
  ],
  whenNot: [
    ['A history of events with no reply box (application status changes, officer notes)', 'timeline'],
    ['Comments that each belong to a place in a document or application file', 'list', 'Put them next to what they discuss, not in one column.'],
    ['One generated answer placed inside a page with no back and forth', 'prose', 'Show [thinking](thinking) while it works and [streaming text](streaming-text) as it arrives.'],
    ['A feed of notifications', 'list'],
    ['A quick explanation of one question, in place', 'popover'],
  ],
  where: 'The main column of a page or a full-height panel beside the work it discusses (a [resizable split](resizable-split) on wide screens). The history is the scroller; the [composer](composer) sits under it, outside the scroller, full width of the column. On phones the column is the whole screen and the composer sits above the keyboard with the safe-area inset (`safe-bottom`). Keep the column at most 640 px wide on wide screens so answers stay readable.',
  anatomy: [
    ['.chat', 'Required. The column of messages (flex, 20 px gap). Give it `role="log"` and a label.'],
    ['.msg', 'Required. One message; see [chat message](chat-message) for `--me`, `--ai` and the parts inside.'],
    ['.msg--system', 'A centered line in footnote type for what changed in the conversation: a day break, someone joining, a mode switching on.'],
    ['.chat__jump', 'A small secondary button, last child of `.chat`, with `data-lds-jump="<scroller id>"`. Sticks 88 px above the scroller bottom and shows only while the reader is more than 160 px from the end.'],
    ['.composer', 'The reply box under the scroller; see [composer](composer).'],
  ],
  examples: [
    {
      title: 'Asking the city services assistant',
      desc: 'Scroll the history up and the Latest button rises in; press it to glide back. Type a question and press Enter: your message joins the column.',
      stage: 'block',
      html: `<div class="docs-col" style="max-width: 560px;">
  <div class="docs-scroll" id="cl-scroll" style="height: 320px;">
    <div class="chat" id="cl-chat" role="log" aria-label="Conversation with the city services assistant">
      <p class="msg msg--system">Today, 09:12</p>
      <div class="msg msg--me"><div class="bubble">Why was my family card change for Kedaton sent back?</div><span class="msg__meta">09:12</span></div>
      <div class="msg msg--ai"><div class="bubble">The surat pengantar from your RT/RW was not attached. Disdukcapil needs it to confirm your new address in Kedaton. Upload the letter on the same application and it goes back in the queue with the same number.</div>${ACTIONS('Attach the surat pengantar RT/RW to the same application; it keeps its queue number.')}</div>
      <div class="msg msg--me"><div class="bubble">Do I need to bring the original letter too?</div><span class="msg__meta">09:14</span></div>
      <div class="msg msg--ai"><div class="bubble">Only at the counter. Online, a clear photo of the stamped letter is enough. Bring the original when you collect the new family card at the Kedaton district office.</div>${ACTIONS('Online, a photo of the stamped letter is enough; bring the original when you collect the card.')}</div>
      <div class="msg msg--me"><div class="bubble">When can I collect it?</div><span class="msg__meta">09:15</span></div>
      <div class="msg msg--ai"><div class="bubble">Family card changes in Bandar Lampung are usually ready 3 working days after the documents are complete. You will get a message when it is ready to collect.</div>${ACTIONS('Family card changes are usually ready 3 working days after the documents are complete.')}</div>
      <button class="btn btn--secondary btn--sm chat__jump" data-lds-jump="cl-scroll"><span class="ic" aria-hidden="true">arrow_downward</span>Latest</button>
    </div>
  </div>
  <form class="composer" data-lds-composer onsubmit="${APPEND('cl-chat', 'cl-scroll')}"><textarea rows="1" aria-label="Message the assistant" placeholder="Ask about this application"></textarea>${SEND}</form>
</div>`,
      code: `<div class="chat-scroll" id="chat-scroll"><!-- your scroller: overflow-y: auto, flex: 1 -->
  <div class="chat" role="log" aria-label="Conversation with the city services assistant">
    <p class="msg msg--system">Today, 09:12</p>
    <div class="msg msg--me"><div class="bubble">Why was my family card change for Kedaton sent back?</div><span class="msg__meta">09:12</span></div>
    <div class="msg msg--ai"><div class="bubble">The surat pengantar from your RT/RW was not attached…</div>
      <div class="msg__actions">…</div>
    </div>
    <button class="btn btn--secondary btn--sm chat__jump" data-lds-jump="chat-scroll"><span class="ic" aria-hidden="true">arrow_downward</span>Latest</button>
  </div>
</div>
<form class="composer" data-lds-composer>
  <textarea rows="1" aria-label="Message the assistant" placeholder="Ask about this application"></textarea>
  <button class="composer__send" type="submit" aria-label="Send"><span class="ic" aria-hidden="true">arrow_upward</span></button>
</form>
<script type="module">
  import { init } from 'lampung-design-system/js';
  init();
  document.querySelector('.composer').addEventListener('lds:send', (e) => sendToAssistant(e.detail.text));
</script>`,
    },
    {
      title: 'System lines mark what changed',
      desc: 'Day breaks, a mode switching on, a file joining the conversation: centered footnote lines, no bubble, no actions. They are part of the history, so they scroll with it.',
      stage: 'block',
      html: `<div class="chat" role="log" aria-label="Business permit help" style="max-width: 560px;">
  <p class="msg msg--system">Yesterday</p>
  <div class="msg msg--me"><div class="bubble">Check my UMKM business permit documents, one by one.</div></div>
  <div class="msg msg--ai"><div class="bubble">Ready. I will go through the five documents in order; answer yes when each one is ready to upload.</div></div>
  <p class="msg msg--system">Guided mode is on. The form stays locked until every document is checked.</p>
  <p class="msg msg--system">You attached surat-keterangan-domisili.pdf</p>
  <p class="msg msg--system">Today</p>
  <div class="msg msg--me"><div class="bubble">Submit my application.</div></div>
</div>`,
    },
    {
      title: 'Before the first message',
      desc: 'An empty conversation says what the assistant can do and offers two or three starting questions as chips. A chip fills the composer; the person still presses send.',
      stage: 'block',
      html: `<div class="docs-col" style="max-width: 560px;">
  <div class="empty">
    <div class="empty__icon"><span class="ic" aria-hidden="true">id_card</span></div>
    <p class="empty__title">Ask about Disdukcapil services</p>
    <p class="empty__body">Answers use the published service requirements and say which page they come from.</p>
  </div>
  <div class="chip-row" style="justify-content: center;">
    <button class="chip" onclick="const t = this.closest('.docs-col').querySelector('textarea'); t.value = this.textContent; t.dispatchEvent(new Event('input')); t.focus();">How to get an electronic KTP</button>
    <button class="chip" onclick="const t = this.closest('.docs-col').querySelector('textarea'); t.value = this.textContent; t.dispatchEvent(new Event('input')); t.focus();">Requirements for a moving letter</button>
    <button class="chip" onclick="const t = this.closest('.docs-col').querySelector('textarea'); t.value = this.textContent; t.dispatchEvent(new Event('input')); t.focus();">Samsat keliling schedule</button>
  </div>
  <form class="composer" data-lds-composer><textarea rows="1" aria-label="Message" placeholder="Ask a question"></textarea>${SEND}</form>
</div>`,
      code: `<div class="empty">
  <div class="empty__icon"><span class="ic" aria-hidden="true">id_card</span></div>
  <p class="empty__title">Ask about Disdukcapil services</p>
  <p class="empty__body">Answers use the published service requirements and say which page they come from.</p>
</div>
<div class="chip-row">
  <button class="chip">How to get an electronic KTP</button>
  <button class="chip">Requirements for a moving letter</button>
</div>
<form class="composer" data-lds-composer>…</form>
<!-- On a chip click: put its text in the textarea, dispatch 'input' (enables send), focus it. -->`,
    },
  ],
  states: [
    ['empty', 'No messages yet: an [empty state](empty-state) with two or three starter [chips](chips) above the composer.'],
    ['scrolled up', '`.chat__jump.is-visible` once the scroller is more than 160 px from its end; it hides again at the bottom.'],
    ['assistant working', 'The last message is a [thinking](thinking) row, then the reply streams in ([streaming text](streaming-text)).'],
    ['new message', 'A `.msg.is-new` rises 8 px and fades in once on insertion; history without `is-new` appears at once.'],
  ],
  motion: [
    'Every `.msg.is-new` enters once with `lds-msg-in` (give `is-new` only to messages that arrive while the chat is open): from 8 px below and transparent, over `--d-smooth` (560 ms) on `--spring-smooth`. Nothing in the column moves when a message arrives except the new message itself.',
    'The Latest button fades over `--d-fast` and rises 8 px on `--spring-smooth`; it is a transition, so scrolling back and forth reverses it from where it is.',
    'Jumping scrolls with `behavior: smooth`; under reduced motion it jumps at once.',
    'Messages rendered in bulk (opening an old conversation) also play their entrance at the same moment. Render history before inserting it, or accept one shared fade; never stagger a whole history.',
    'Reduced motion: the entrance becomes a 1 ms fade (effectively instant) and the jump button cross-fades in 120 ms.',
  ],
  a11y: [
    'Give `.chat` `role="log"` and an `aria-label`; new messages are then announced politely. While a reply streams, set `aria-busy="true"` on that message and remove it when done so the reply is read once, whole.',
    'System lines are plain text (`<p>`), not live regions of their own; the log announces them.',
    'The composer textarea needs a label (`aria-label` or a visible label); see [composer](composer).',
    'The Latest button is a real button with a visible label. While hidden it is transparent but still focusable: render it only when needed if keyboard users report it.',
  ],
  do: [
    'Keep the composer outside the scroller so it never scrolls away.',
    'Stop auto-scrolling when the reader has scrolled up; show Latest instead.',
    'Use a system line for anything the conversation did on its own (mode, file, day).',
  ],
  dont: [
    'Animate the whole history in, or stagger old messages.',
    'Put a timestamp on every message; group by day with system lines and show times on hover or in [message meta](chat-message).',
    'Build a chat out of cards or list rows.',
  ],
  js: 'Behavior comes from `init()`: `[data-lds-jump="<scroller id>"]` on the Latest button shows it while the scroller is more than 160 px from its end and scrolls to the end on click; `[data-lds-composer]` wires the [composer](composer) (Enter sends, `lds:send` carries `{ text }`). In React, render the same markup and call `init(ref.current)` in an effect after messages render.',
  related: ['chat-message', 'composer', 'streaming-text', 'tool-call'],
};
