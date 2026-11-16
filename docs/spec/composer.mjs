const SEND = `<button class="composer__send" type="submit" aria-label="Send"><span class="ic" aria-hidden="true">arrow_upward</span></button>`;
const REPLY = `event.preventDefault(); const t = this.querySelector('textarea').value.trim(); if (!t) return; const c = document.getElementById('cp-chat'); const m = document.createElement('div'); m.className = 'msg msg--me is-new'; const b = document.createElement('div'); b.className = 'bubble'; b.textContent = t; m.append(b); c.append(m); const a = document.createElement('div'); a.className = 'msg msg--ai is-new'; const ab = document.createElement('div'); ab.className = 'bubble'; a.append(ab); setTimeout(() => { c.append(a); import('../../js/lds.js').then((d) => d.streamText(ab, 'Good question. Start with the units: you are asked for meters per second, so divide the distance in meters by the time in seconds.')); }, 400);`;

export default {
  title: 'Composer',
  group: 'Chat',
  order: 3,
  status: 'new',
  summary: 'The reply box under a conversation: a rounded field that grows with the text, Enter to send, Shift+Enter for a new line, and one round send button that stays disabled until there is something to send.',
  when: [
    'The person writes the next message in a [chat layout](chat-layout): to a tutor, an assistant, a support thread.',
    'A single prompt box at the top of an empty assistant page, before any conversation exists.',
  ],
  whenNot: [
    ['A form field for a long answer that is saved, not sent (an essay, a description)', 'textarea', 'Enter must add a line there, not submit.'],
    ['Searching or filtering a list', 'search-field'],
    ['A one-line value such as a name or an email', 'text-field'],
    ['Jumping to a command or a page', 'command-palette'],
  ],
  where: 'Directly under the message scroller, the width of the conversation column, outside the scroller so it never scrolls away. On phones it is the last thing on screen, padded by the safe area (`safe-bottom`), and rides above the keyboard. Extra tools (attach, voice) go to the left of the textarea; send is always last, on the right.',
  anatomy: [
    ['form.composer', 'Required. A `<form>` with `data-lds-composer`. Pill shaped (24 px radius); the ring appears when the textarea has focus.'],
    ['textarea', 'Required. `rows="1"`, labelled. Grows from one line to 200 px, then scrolls (`field-sizing: content`, with a JS fallback).'],
    ['.composer__send', 'Required. A 40 px round accent `type="submit"` button with `aria-label="Send"` and the `arrow_upward` icon. Disabled while the text is empty.'],
    ['.icon-btn', 'Optional tools before the textarea: attach a file, add an image.'],
  ],
  examples: [
    {
      title: 'Send a question',
      desc: 'Type and press Enter (or the button). Your message joins the column and the answer streams in. Shift+Enter adds a line instead of sending.',
      stage: 'block',
      html: `<div class="docs-col" style="max-width: 520px;">
  <div class="chat" id="cp-chat" role="log" aria-label="Conversation">
    <div class="msg msg--ai"><div class="bubble">Ask me anything about this week's physics problems.</div></div>
  </div>
  <form class="composer" data-lds-composer onsubmit="${REPLY}"><textarea rows="1" aria-label="Message" placeholder="Ask about this lesson"></textarea>${SEND}</form>
</div>`,
      code: `<form class="composer" data-lds-composer>
  <textarea rows="1" aria-label="Message" placeholder="Ask about this lesson"></textarea>
  <button class="composer__send" type="submit" aria-label="Send"><span class="ic" aria-hidden="true">arrow_upward</span></button>
</form>
<script type="module">
  import { init } from 'lampung-design-system/js';
  init();
  document.querySelector('.composer').addEventListener('lds:send', (e) => {
    addMyMessage(e.detail.text); // the textarea is already cleared and focused
    askAssistant(e.detail.text);
  });
</script>`,
    },
    {
      title: 'With an attach button',
      desc: 'Tools sit before the textarea and keep the 44 px hit area. Send stays the only filled control.',
      stage: 'block',
      html: `<form class="composer" data-lds-composer style="max-width: 520px; width: 100%;">
  <button class="icon-btn" type="button" aria-label="Attach a file"><span class="ic" aria-hidden="true">attach_file</span></button>
  <textarea rows="1" aria-label="Message" placeholder="Describe the mistake you found"></textarea>${SEND}
</form>`,
    },
    {
      title: 'Grows with the text',
      desc: 'A long draft grows the box line by line up to 200 px, then scrolls inside. The button stays at the bottom, next to the last line.',
      stage: 'block',
      html: `<form class="composer" data-lds-composer style="max-width: 520px; width: 100%;">
  <textarea rows="1" aria-label="Message">I read chapter 4 twice but I still do not understand why the enzyme stops working above 40 degrees.
Is it the same reason fever is dangerous?
Could you give me an example with numbers?</textarea>${SEND}
</form>`,
    },
  ],
  states: [
    ['empty', 'Send is disabled (35 % opacity, no finish). Enter does nothing.'],
    ['focus', 'Accent ring: 1.5 px inset plus a 4 px soft ring, over `--d-fast`.'],
    ['typing', 'Send enables as soon as the text has a non-space character.'],
    ['sent', 'The form emits `lds:send` with `{ text }`, clears the textarea, shrinks back to one line and keeps focus for the next message.'],
    ['composing (IME)', 'Enter while composing characters (Japanese, Chinese input) confirms the characters and does not send.'],
  ],
  motion: [
    'Send sinks to 0.9 on press and springs back on `--spring-snappy` (360 ms); enabling and disabling cross-fades opacity over `--d-fast`.',
    'The focus ring transitions over `--d-fast` on `--ease-standard`.',
    'Growth is not animated: each new line appears at once, so the caret never chases a moving box.',
    'Reduced motion: the press and the ring become 120 ms linear changes.',
  ],
  a11y: [
    'Label the textarea (`aria-label="Message"` or a visible label). The placeholder is a hint, not the label.',
    'Send is a real `type="submit"` button with `aria-label="Send"`; disabled while empty, so assistive tech reports why nothing happens.',
    'Say the keys once near the box on first use ("Enter to send, Shift+Enter for a new line") with a [hint](hints), not in the placeholder.',
    'After sending, focus stays in the textarea.',
  ],
  do: [
    'Keep it outside the scroller, under the conversation.',
    'Listen for `lds:send`; do not add your own Enter handling.',
    'Put tools to the left and keep send last.',
  ],
  dont: [
    'Use it for a form answer that is saved, not sent: use a [textarea](textarea).',
    'Hide the send button and rely on Enter only.',
    'Animate the box height or clear the text before the message is safely queued.',
  ],
  js: '`init()` wires `form[data-lds-composer]`: Enter sends (not while composing), Shift+Enter adds a line, send is disabled while empty, the box grows to 200 px (native `field-sizing`, or a height fallback). On send it emits `lds:send` with `{ text }` (bubbles), then clears and refocuses the textarea.',
  related: ['chat-layout', 'chat-message', 'streaming-text', 'textarea'],
};
