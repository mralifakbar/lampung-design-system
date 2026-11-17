# Chat message

Group: Chat. https://lampung.kartadinata.app/docs/en/components/chat-message

One turn in a conversation. Your words sit in an accent bubble on the right; the assistant answers as plain reading text in the column, with a quiet actions row under it. System lines are centered footnotes.

## Use it when
- Showing what the person sent (`msg--me`) and what the assistant answered (`msg--ai`) inside a [chat layout](chat-layout.md).
- An answer that needs follow-up actions on it: copy, try again, share.
- A line about the conversation itself (`msg--system`): a day break, a mode turned on, a file attached.

## Use something else when
- A comment on a document or a review note: use [List](list.md).
- A quotation from a source inside an answer: use [Quote](quote.md).
- A message that tells the person something about the app (saved, offline): use [Toast](toast.md).
- An event in a history with no conversation: use [Timeline](timeline.md).
- A step the assistant took (searched, read a file): use [Tool call](tool-call.md).

## Where it goes
Inside `.chat`. `msg--me` aligns right, up to 88 % of the column (520 px max); `msg--ai` takes the full reading width (640 px max); `msg--system` is centered. Meta sits directly under the bubble; actions sit under assistant answers only, aligned with the text.

## Anatomy
| Part | What it is |
|---|---|
| `.msg` | Required. The message wrapper: a column with 6 px between bubble, meta and actions. |
| `.msg--me / .msg--ai / .msg--system` | Required. Who is speaking. One per message. |
| `.bubble` | Required for me and ai. The words. Accent fill with a 6 px tail corner for `--me`; no fill and no padding for `--ai`, so answers read like the page. |
| `.msg__meta` | Optional caption line: time, "Edited", "Not sent". Use a [timestamp](timestamp.md) for times. |
| `.msg__actions` | Optional row of 36 px [icon buttons](icon-button.md) under an answer: copy (with an icon swap), try again, share. |

## Markup

**Your message and the answer.** The person speaks in the accent bubble; the answer is plain text in the column, which is easier to read at length and to copy. Press copy to see the icon swap.
```html
<div class="chat" role="log" aria-label="Conversation" style="max-width: 560px;">
  <div class="msg msg--me"><div class="bubble">What is the difference between a KTP-el and a KIA?</div><span class="msg__meta">09:41</span></div>
  <div class="msg msg--ai">
    <div class="bubble">The KTP-el is the electronic identity card for residents aged 17 and over, or younger if married. The KIA is the child identity card for residents under 17; Disdukcapil issues it from the family card and the birth certificate.</div>
    <div class="msg__actions"><button class="icon-btn" aria-label="Copy answer" data-lds-copy="KTP-el is for residents aged 17 and over; KIA is the child identity card for those under 17."><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b">check</span></span></button><button class="icon-btn" aria-label="Try again"><span class="ic" aria-hidden="true">refresh</span></button><button class="icon-btn" aria-label="Share answer"><span class="ic" aria-hidden="true">share</span></button></div>
  </div>
</div>
```

**An answer with sources and code.** Long answers use [prose](prose.md) inside the bubble for paragraph spacing; sources are [citations](citation.md); inline code wraps instead of overflowing.
```html
<div class="chat" style="max-width: 560px;">
  <div class="msg msg--me"><div class="bubble">How do I count the reports in the complaints table?</div></div>
  <div class="msg msg--ai">
    <div class="bubble prose">
      <p>Use <code class="code">SELECT COUNT(*) FROM complaints;</code> to count every report, including reports that are still open.<a class="cite" href="#">1</a></p>
      <p>To count only closed reports, name the column: <code class="code">COUNT(closed_at)</code> skips rows where the close date is empty.<a class="cite" href="#">2</a></p>
    </div>
    <div class="msg__actions"><button class="icon-btn" aria-label="Copy answer" data-lds-copy="SELECT COUNT(*) FROM complaints;"><span class="swap" aria-hidden="true"><span class="ic swap__a">content_copy</span><span class="ic swap__b">check</span></span></button><button class="icon-btn" aria-label="Try again"><span class="ic" aria-hidden="true">refresh</span></button></div>
  </div>
</div>
```

**Meta: time, edited, not sent.** Meta is one caption line. A message that failed says so in words under the bubble with a way to retry; nothing else turns red.
```html
<div class="chat" style="max-width: 560px;">
  <div class="msg msg--me"><div class="bubble">Remind me which documents I need for Samsat on Friday.</div><span class="msg__meta"><time class="timestamp" data-lds-time="2026-11-16T08:05:00+07:00"></time></span></div>
  <div class="msg msg--me"><div class="bubble">Also the BPKB copy, please.</div><span class="msg__meta">Edited</span></div>
  <div class="msg msg--me"><div class="bubble">And the Samsat keliling times in Way Halim.</div><span class="field__help field__help--error"><span class="ic" aria-hidden="true">error</span>Not sent. You are offline.<button class="btn btn--plain btn--sm">Try again</button></span></div>
</div>
```

**System line.** Centered footnote text, no bubble. For what the conversation did, not for what someone said.
```html
<div class="chat" style="max-width: 560px;">
  <p class="msg msg--system">You switched to guided mode. The form stays locked until every document is checked.</p>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `msg--me` | What the person sent. Right aligned, accent bubble, the bottom right corner tighter (6 px) as the tail. |
| `msg--ai` | The assistant answer. Full width plain text; add `prose` on the bubble when the answer has paragraphs, lists or tables. |
| `msg--system` | A centered footnote about the conversation itself. |

## States
| State | How |
|---|---|
| `arriving (.is-new)` | Add `is-new` to a message that arrives while the chat is open: it rises 8 px and fades in once (`lds-msg-in`). History loaded at once has no `is-new` and simply appears. |
| `streaming` | The bubble is a `.stream.is-streaming` with a caret; see [streaming text](streaming-text.md). Hide `.msg__actions` until it ends. |
| `edited` | "Edited" in `.msg__meta`. |
| `not sent` | An error line under the bubble with Try again (shown here with `field__help--error`; there is no message-specific error class yet). |
| `copied` | The copy icon swaps to a check for 1.6 s ([copy button](copy-button.md)). |

## Motion and microinteractions
- Entrance: `lds-msg-in`, 8 px rise plus fade, `--d-smooth` (560 ms) on `--spring-smooth`. Plays once, only on messages with `is-new` (sent or received while the chat is open), so a long history never animates as a block.
- Actions: icon buttons sink to 0.9 on press in 90 ms; copy swaps its glyph with the [icon swap](icon-swap.md) recipe (old scales to 0.5 and blurs 4 px, new settles on `--spring-snappy`).
- No hover lift, no bubble scaling, no typing dots: the assistant shows work with [thinking](thinking.md) and text with [streaming text](streaming-text.md).
- Reduced motion: the entrance is effectively instant (1 ms) and the icon swap cross-fades in 120 ms.

## Accessibility
- Messages are plain elements inside the `role="log"` column; do not give each one its own live region.
- If speakers are not obvious from layout alone, add a visually hidden "You said" / "Assistant said" (`sr-only`) at the start of each message.
- Every action is an [icon button](icon-button.md) with an `aria-label` that names the object: "Copy answer", not "Copy".
- A failed message says so in text ("Not sent. You are offline.") with a Try again button next to it.

## Do
- Let answers be text in the column; add `prose` for structure.
- Show actions under finished answers only.
- Name sources with [citations](citation.md) inside the answer.

## Don't
- Put the assistant in a gray bubble or give it an avatar on every turn.
- Show a timestamp under every message; prefer day lines and meta on the latest.
- Color a failed message red without words.

## Behavior (plain HTML)
None of its own. Copy actions use `data-lds-copy` ([copy button](copy-button.md)); times use `data-lds-time` ([timestamp](timestamp.md)); call `init()` on new messages so both are wired.

## Related
[Chat layout](chat-layout.md) · [Streaming text](streaming-text.md) · [Copy button](copy-button.md) · [Citation](citation.md)
