# Tool call

Group: Chat. https://lampung.kartadinata.app/docs/en/components/tool-call

One step the assistant took on the way to its answer (searched the service guides, read a file, checked a schedule), shown as a quiet one-line `<details>` that opens to what it found. The answer stays the main thing.

## Use it when
- An assistant answer depends on something it looked up or ran, and people may want to check it: a search, a file it read, a calculation, a schedule lookup.
- A step is still running: the line shows a spinner and a shimmering label until it finishes.
- Several steps happened in order before the answer: stack them, one line each.

## Use something else when
- Waiting with no named step yet: use [Thinking](thinking.md).
- A source quoted in the answer: use [Citation](citation.md).
- A collapsible section of page content (FAQ, details): use [Accordion](accordion.md).
- A history of actions a person took: use [Timeline](timeline.md).
- Code the person should copy: use [Code block](code-block.md).

## Where it goes
Inside a `msg--ai` [chat message](chat-message.md), above the `.bubble` that holds the answer, in the order the steps ran. Full width of the answer column.

## Anatomy
| Part | What it is |
|---|---|
| `details.toolcall` | Required. Native `<details>`: quiet fill, 12 px radius. |
| `summary` | Required. One line, 40 px min: a leading icon (or a spinner while running), the step in words, then the `expand_more` chevron as the last icon. |
| `.ic:last-child` | Required. The chevron; it turns 180 degrees when open. It must be the last icon in the summary. |
| `.toolcall__body` | What the step found or did: a short sentence, a [list](list.md), or a [code block](code-block.md). |

## Markup

**What the assistant looked up.** Closed by default. Open one to check the sources the answer used.
```html
<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">search</span>Searched the service guides for "surat pindah"<span class="ic" aria-hidden="true">expand_more</span></summary><div class="toolcall__body">Found 3 pages: Disdukcapil requirements, the RT/RW cover letter form, questions about moving between cities.</div></details>
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">description</span>Read the surat pindah requirements<span class="ic" aria-hidden="true">expand_more</span></summary><div class="toolcall__body">Needed: KK, KTP-el, a cover letter from the RT/RW and the full destination address.</div></details>
  <div class="bubble">To move from Kedaton to Metro, bring your KK, KTP-el and a cover letter from your RT/RW. Disdukcapil Bandar Lampung usually issues the letter within 3 working days.</div>
</div>
```

**A step still running.** While it runs, a spinner replaces the icon and the label shimmers. When it finishes, the label changes to what it found and the icon to a check.
```html
<details class="toolcall">
  <summary>
    <span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
    <span class="shimmer">Booking a queue number</span>
    <span class="ic" aria-hidden="true">expand_more</span>
  </summary>
  <div class="toolcall__body">…</div>
</details>
<!-- Done: replace the spinner with <span class="ic" aria-hidden="true">check_circle</span>,
     drop the shimmer class and name the result: "Booked queue B-014". -->
```

**A step with code.** When the step ran code or a query, the body holds a code block so the person can copy and check it.
```html
<details class="toolcall" open style="max-width: 560px; width: 100%;"><summary><span class="ic" aria-hidden="true">code</span>Ran a query on citizen reports<span class="ic" aria-hidden="true">expand_more</span></summary><div class="toolcall__body"><div class="codeblock"><pre>SELECT COUNT(*) FROM reports WHERE kecamatan = 'Kedaton' AND status = 'open';</pre></div></div></details>
```

**A step that failed.** Say what failed and what the answer did instead. The answer below should not pretend the step worked.
```html
<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">cloud_off</span>Could not open site-plan.pdf<span class="ic" aria-hidden="true">expand_more</span></summary><div class="toolcall__body">The file is larger than 20 MB. The answer below uses your application form only.</div></details>
  <div class="bubble">From your application form, the building approval still needs a site plan before the officer can check it.</div>
</div>
```

## States
| State | How |
|---|---|
| `closed` | The default: one line, chevron down. |
| `open` | `[open]`: the body shows at once; the chevron turns 180 degrees. |
| `running` | A `.spinner` in place of the leading icon and a `.shimmer` label. |
| `done` | A result icon (`check_circle`, `search`, `description`), the label names what it found. |
| `failed` | A plain icon (`cloud_off`, `error`) and the reason in words; no red fill. |

## Motion and microinteractions
- Chevron: rotates 180 degrees on `--spring-smooth` (`--d-smooth`, 560 ms); reverses from where it is if toggled again.
- Body: appears and disappears at once. Native `<details>` does not animate its height here; if you need the height to move, use an [accordion](accordion.md) instead.
- Running: the spinner turns (800 ms per turn) and the label shimmers on a 1.8 s cycle; when the step ends, the shimmer settles to solid text over `--d-standard`.
- Reduced motion: the shimmer stops (solid text), the chevron turns in 120 ms; the spinner keeps turning because it reports work.

## Accessibility
- Native `<details>`/`<summary>`: keyboard (Enter, Space) and expanded state come for free. Keep it.
- The summary text must say the step on its own ("Searched the service guides for surat pindah"), not just an icon.
- Icons are `aria-hidden`; the spinner too. While a step runs, the message is `aria-busy="true"`.

## Do
- Name the step and its object: "Read Problem set 3".
- Keep steps closed by default; the answer is the main thing.
- Put steps in the order they ran, above the answer.

## Don't
- Show raw tool names or JSON in the summary.
- Use it for page content people need to read; use an [accordion](accordion.md).
- Leave a spinner running after the step ended or failed.

## Behavior (plain HTML)
None. It is native `<details>`. Update the summary yourself when a step finishes.

## Related
[Chat message](chat-message.md) · [Thinking](thinking.md) · [Streaming text](streaming-text.md) · [Accordion](accordion.md)
