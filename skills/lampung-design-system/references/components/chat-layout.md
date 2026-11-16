# Chat layout

Group: Chat (new). Docs page: `docs/components/chat-layout.html`.

The conversation column: messages stacked 20 px apart in `.chat`, the history scrolling above a composer that never scrolls away, and a Latest button that appears only when the reader has scrolled up. Newest at the bottom, always.

## Use it when
- A conversation with an assistant or a tutor: the person asks on the right, answers fill the reading column, newest at the bottom.
- A support or feedback thread where order and time matter and the person replies from the same screen.
- A history long enough to scroll, where people read back and need a way to return to the latest message.

## Use something else when
- A history of events with no reply box (grade changes, status updates): use [Timeline](timeline.md).
- Comments that each belong to a place in a document or submission: use [List](list.md). Put them next to what they discuss, not in one column.
- One generated answer placed inside a page with no back and forth: use [Prose](prose.md). Show [thinking](thinking.md) while it works and [streaming text](streaming-text.md) as it arrives.
- A feed of notifications: use [List](list.md).
- A quick explanation of one question, in place: use [Popover](popover.md).

## Where it goes
The main column of a page or a full-height panel beside the work it discusses (a [resizable split](resizable-split.md) on wide screens). The history is the scroller; the [composer](composer.md) sits under it, outside the scroller, full width of the column. On phones the column is the whole screen and the composer sits above the keyboard with the safe-area inset (`safe-bottom`). Keep the column at most 640 px wide on wide screens so answers stay readable.

## Anatomy
| Part | What it is |
|---|---|
| `.chat` | Required. The column of messages (flex, 20 px gap). Give it `role="log"` and a label. |
| `.msg` | Required. One message; see [chat message](chat-message.md) for `--me`, `--ai` and the parts inside. |
| `.msg--system` | A centered line in footnote type for what changed in the conversation: a day break, someone joining, a mode switching on. |
| `.chat__jump` | A small secondary button, last child of `.chat`, with `data-lds-jump="<scroller id>"`. Sticks 88 px above the scroller bottom and shows only while the reader is more than 160 px from the end. |
| `.composer` | The reply box under the scroller; see [composer](composer.md). |

## Markup

**A tutoring conversation.** Scroll the history up and the Latest button rises in; press it to glide back. Type a question and press Enter: your message joins the column.
```html
<div class="chat-scroll" id="chat-scroll"><!-- your scroller: overflow-y: auto, flex: 1 -->
  <div class="chat" role="log" aria-label="Conversation with your tutor">
    <p class="msg msg--system">Today, 09:12</p>
    <div class="msg msg--me"><div class="bubble">Why was my answer to question 4 marked wrong?</div><span class="msg__meta">09:12</span></div>
    <div class="msg msg--ai"><div class="bubble">Question 4 asks for the net force…</div>
      <div class="msg__actions">…</div>
    </div>
    <button class="btn btn--secondary btn--sm chat__jump" data-lds-jump="chat-scroll"><span class="ic" aria-hidden="true">arrow_downward</span>Latest</button>
  </div>
</div>
<form class="composer" data-lds-composer>
  <textarea rows="1" aria-label="Message your tutor" placeholder="Ask about this lesson"></textarea>
  <button class="composer__send" type="submit" aria-label="Send"><span class="ic" aria-hidden="true">arrow_upward</span></button>
</form>
<script type="module">
  import { init } from 'lampung-design-system/js';
  init();
  document.querySelector('.composer').addEventListener('lds:send', (e) => sendToTutor(e.detail.text));
</script>
```

**System lines mark what changed.** Day breaks, a mode switching on, a file joining the conversation: centered footnote lines, no bubble, no actions. They are part of the history, so they scroll with it.
```html
<div class="chat" role="log" aria-label="Exam practice" style="max-width: 560px;">
  <p class="msg msg--system">Yesterday</p>
  <div class="msg msg--me"><div class="bubble">Quiz me on chapter 3, ten questions.</div></div>
  <div class="msg msg--ai"><div class="bubble">Ready when you are. Each question has four choices; answer with the letter.</div></div>
  <p class="msg msg--system">Exam mode is on. Hints stay hidden until you submit.</p>
  <p class="msg msg--system">You attached lab-report-draft.pdf</p>
  <p class="msg msg--system">Today</p>
  <div class="msg msg--me"><div class="bubble">Submit my answers.</div></div>
</div>
```

**Before the first message.** An empty conversation says what the assistant can do and offers two or three starting questions as chips. A chip fills the composer; the person still presses send.
```html
<div class="empty">
  <div class="empty__icon"><span class="ic" aria-hidden="true">school</span></div>
  <p class="empty__title">Ask about Biology 101</p>
  <p class="empty__body">Answers use your course notes and say which page they come from.</p>
</div>
<div class="chip-row">
  <button class="chip">Explain osmosis simply</button>
  <button class="chip">Quiz me on cell parts</button>
</div>
<form class="composer" data-lds-composer>…</form>
<!-- On a chip click: put its text in the textarea, dispatch 'input' (enables send), focus it. -->
```

## States
| State | How |
|---|---|
| `empty` | No messages yet: an [empty state](empty-state.md) with two or three starter [chips](chips.md) above the composer. |
| `scrolled up` | `.chat__jump.is-visible` once the scroller is more than 160 px from its end; it hides again at the bottom. |
| `assistant working` | The last message is a [thinking](thinking.md) row, then the reply streams in ([streaming text](streaming-text.md)). |
| `new message` | A `.msg.is-new` rises 8 px and fades in once on insertion; history without `is-new` appears at once. |

## Motion and microinteractions
- Every `.msg.is-new` enters once with `lds-msg-in` (give `is-new` only to messages that arrive while the chat is open): from 8 px below and transparent, over `--d-smooth` (560 ms) on `--spring-smooth`. Nothing in the column moves when a message arrives except the new message itself.
- The Latest button fades over `--d-fast` and rises 8 px on `--spring-smooth`; it is a transition, so scrolling back and forth reverses it from where it is.
- Jumping scrolls with `behavior: smooth`; under reduced motion it jumps at once.
- Messages rendered in bulk (opening an old conversation) also play their entrance at the same moment. Render history before inserting it, or accept one shared fade; never stagger a whole history.
- Reduced motion: the entrance becomes a 1 ms fade (effectively instant) and the jump button cross-fades in 120 ms.

## Accessibility
- Give `.chat` `role="log"` and an `aria-label`; new messages are then announced politely. While a reply streams, set `aria-busy="true"` on that message and remove it when done so the reply is read once, whole.
- System lines are plain text (`<p>`), not live regions of their own; the log announces them.
- The composer textarea needs a label (`aria-label` or a visible label); see [composer](composer.md).
- The Latest button is a real button with a visible label. While hidden it is transparent but still focusable: render it only when needed if keyboard users report it.

## Do
- Keep the composer outside the scroller so it never scrolls away.
- Stop auto-scrolling when the reader has scrolled up; show Latest instead.
- Use a system line for anything the conversation did on its own (mode, file, day).

## Don't
- Animate the whole history in, or stagger old messages.
- Put a timestamp on every message; group by day with system lines and show times on hover or in [message meta](chat-message.md).
- Build a chat out of cards or list rows.

## Behavior (plain HTML)
Behavior comes from `init()`: `[data-lds-jump="<scroller id>"]` on the Latest button shows it while the scroller is more than 160 px from its end and scrolls to the end on click; `[data-lds-composer]` wires the [composer](composer.md) (Enter sends, `lds:send` carries `{ text }`). In React, render the same markup and call `init(ref.current)` in an effect after messages render.

## Related
[Chat message](chat-message.md) · [Composer](composer.md) · [Streaming text](streaming-text.md) · [Tool call](tool-call.md)
