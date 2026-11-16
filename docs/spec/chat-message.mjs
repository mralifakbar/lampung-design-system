const COPY = (text, label = 'Copy answer') => `<button class="icon-btn" aria-label="${label}" data-lds-copy="${text}"><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b">check</span></span></button>`;

export default {
  title: 'Chat message',
  group: 'Chat',
  order: 2,
  status: 'new',
  summary: 'One turn in a conversation. Your words sit in an accent bubble on the right; the assistant answers as plain reading text in the column, with a quiet actions row under it. System lines are centered footnotes.',
  when: [
    'Showing what the person sent (`msg--me`) and what the assistant answered (`msg--ai`) inside a [chat layout](chat-layout).',
    'An answer that needs follow-up actions on it: copy, try again, share.',
    'A line about the conversation itself (`msg--system`): a day break, a mode turned on, a file attached.',
  ],
  whenNot: [
    ['A comment on a document or a review note', 'list'],
    ['A quotation from a source inside an answer', 'quote'],
    ['A message that tells the person something about the app (saved, offline)', 'toast'],
    ['An event in a history with no conversation', 'timeline'],
    ['A step the assistant took (searched, read a file)', 'tool-call'],
  ],
  where: 'Inside `.chat`. `msg--me` aligns right, up to 88 % of the column (520 px max); `msg--ai` takes the full reading width (640 px max); `msg--system` is centered. Meta sits directly under the bubble; actions sit under assistant answers only, aligned with the text.',
  anatomy: [
    ['.msg', 'Required. The message wrapper: a column with 6 px between bubble, meta and actions.'],
    ['.msg--me / .msg--ai / .msg--system', 'Required. Who is speaking. One per message.'],
    ['.bubble', 'Required for me and ai. The words. Accent fill with a 6 px tail corner for `--me`; no fill and no padding for `--ai`, so answers read like the page.'],
    ['.msg__meta', 'Optional caption line: time, "Edited", "Not sent". Use a [timestamp](timestamp) for times.'],
    ['.msg__actions', 'Optional row of 36 px [icon buttons](icon-button) under an answer: copy (with an icon swap), try again, share.'],
  ],
  examples: [
    {
      title: 'Your message and the answer',
      desc: 'The person speaks in the accent bubble; the answer is plain text in the column, which is easier to read at length and to copy. Press copy to see the icon swap.',
      stage: 'block',
      html: `<div class="chat" role="log" aria-label="Conversation" style="max-width: 560px;">
  <div class="msg msg--me"><div class="bubble">What is the difference between mitosis and meiosis?</div><span class="msg__meta">09:41</span></div>
  <div class="msg msg--ai">
    <div class="bubble">Mitosis makes two cells that are copies of the parent, for growth and repair. Meiosis makes four cells with half the chromosomes each, for reproduction, and shuffles genes on the way so each cell is different.</div>
    <div class="msg__actions">${COPY('Mitosis makes two identical cells; meiosis makes four cells with half the chromosomes.')}<button class="icon-btn" aria-label="Try again"><span class="ic" aria-hidden="true">refresh</span></button><button class="icon-btn" aria-label="Share answer"><span class="ic" aria-hidden="true">share</span></button></div>
  </div>
</div>`,
    },
    {
      title: 'An answer with sources and code',
      desc: 'Long answers use [prose](prose) inside the bubble for paragraph spacing; sources are [citations](citation); inline code wraps instead of overflowing.',
      stage: 'block',
      html: `<div class="chat" style="max-width: 560px;">
  <div class="msg msg--me"><div class="bubble">How do I count the rows in the grades table?</div></div>
  <div class="msg msg--ai">
    <div class="bubble prose">
      <p>Use <code class="code">SELECT COUNT(*) FROM grades;</code> to count every row, including rows with empty scores.<a class="cite" href="#">1</a></p>
      <p>To count only graded work, name the column: <code class="code">COUNT(score)</code> skips rows where the score is empty.<a class="cite" href="#">2</a></p>
    </div>
    <div class="msg__actions">${COPY('SELECT COUNT(*) FROM grades;')}<button class="icon-btn" aria-label="Try again"><span class="ic" aria-hidden="true">refresh</span></button></div>
  </div>
</div>`,
    },
    {
      title: 'Meta: time, edited, not sent',
      desc: 'Meta is one caption line. A message that failed says so in words under the bubble with a way to retry; nothing else turns red.',
      stage: 'block',
      html: `<div class="chat" style="max-width: 560px;">
  <div class="msg msg--me"><div class="bubble">Remind me what is due on Friday.</div><span class="msg__meta"><time class="timestamp" data-lds-time="2026-11-16T08:05:00+07:00"></time></span></div>
  <div class="msg msg--me"><div class="bubble">Also the lab report, please.</div><span class="msg__meta">Edited</span></div>
  <div class="msg msg--me"><div class="bubble">And the reading for week 6.</div><span class="field__help field__help--error"><span class="ic" aria-hidden="true">error</span>Not sent. You are offline.<button class="btn btn--plain btn--sm">Try again</button></span></div>
</div>`,
    },
    {
      title: 'System line',
      desc: 'Centered footnote text, no bubble. For what the conversation did, not for what someone said.',
      stage: 'block',
      html: `<div class="chat" style="max-width: 560px;">
  <p class="msg msg--system">You switched to exam mode. Hints stay hidden until you submit.</p>
</div>`,
    },
  ],
  variants: [
    ['msg--me', 'What the person sent. Right aligned, accent bubble, the bottom right corner tighter (6 px) as the tail.'],
    ['msg--ai', 'The assistant answer. Full width plain text; add `prose` on the bubble when the answer has paragraphs, lists or tables.'],
    ['msg--system', 'A centered footnote about the conversation itself.'],
  ],
  states: [
    ['arriving (.is-new)', 'Add `is-new` to a message that arrives while the chat is open: it rises 8 px and fades in once (`lds-msg-in`). History loaded at once has no `is-new` and simply appears.'],
    ['streaming', 'The bubble is a `.stream.is-streaming` with a caret; see [streaming text](streaming-text). Hide `.msg__actions` until it ends.'],
    ['edited', '"Edited" in `.msg__meta`.'],
    ['not sent', 'An error line under the bubble with Try again (shown here with `field__help--error`; there is no message-specific error class yet).'],
    ['copied', 'The copy icon swaps to a check for 1.6 s ([copy button](copy-button)).'],
  ],
  motion: [
    'Entrance: `lds-msg-in`, 8 px rise plus fade, `--d-smooth` (560 ms) on `--spring-smooth`. Plays once, only on messages with `is-new` (sent or received while the chat is open), so a long history never animates as a block.',
    'Actions: icon buttons sink to 0.9 on press in 90 ms; copy swaps its glyph with the [icon swap](icon-swap) recipe (old scales to 0.5 and blurs 4 px, new settles on `--spring-snappy`).',
    'No hover lift, no bubble scaling, no typing dots: the assistant shows work with [thinking](thinking) and text with [streaming text](streaming-text).',
    'Reduced motion: the entrance is effectively instant (1 ms) and the icon swap cross-fades in 120 ms.',
  ],
  a11y: [
    'Messages are plain elements inside the `role="log"` column; do not give each one its own live region.',
    'If speakers are not obvious from layout alone, add a visually hidden "You said" / "Tutor said" (`sr-only`) at the start of each message.',
    'Every action is an [icon button](icon-button) with an `aria-label` that names the object: "Copy answer", not "Copy".',
    'A failed message says so in text ("Not sent. You are offline.") with a Try again button next to it.',
  ],
  do: [
    'Let answers be text in the column; add `prose` for structure.',
    'Show actions under finished answers only.',
    'Name sources with [citations](citation) inside the answer.',
  ],
  dont: [
    'Put the assistant in a gray bubble or give it an avatar on every turn.',
    'Show a timestamp under every message; prefer day lines and meta on the latest.',
    'Color a failed message red without words.',
  ],
  js: 'None of its own. Copy actions use `data-lds-copy` ([copy button](copy-button)); times use `data-lds-time` ([timestamp](timestamp)); call `init()` on new messages so both are wired.',
  related: ['chat-layout', 'streaming-text', 'copy-button', 'citation'],
};
