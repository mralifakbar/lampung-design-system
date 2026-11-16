const SPIN = '<span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';
const CHEV = '<span class="ic" aria-hidden="true">expand_more</span>';

export default {
  title: 'Tool call',
  group: 'Chat',
  order: 5,
  summary: 'One step the assistant took on the way to its answer (searched the notes, read a file, checked the calendar), shown as a quiet one-line `<details>` that opens to what it found. The answer stays the main thing.',
  when: [
    'An assistant answer depends on something it looked up or ran, and people may want to check it: a search, a file it read, a calculation, a calendar lookup.',
    'A step is still running: the line shows a spinner and a shimmering label until it finishes.',
    'Several steps happened in order before the answer: stack them, one line each.',
  ],
  whenNot: [
    ['Waiting with no named step yet', 'thinking'],
    ['A source quoted in the answer', 'citation'],
    ['A collapsible section of page content (FAQ, details)', 'accordion'],
    ['A history of actions a person took', 'timeline'],
    ['Code the person should copy', 'code-block'],
  ],
  where: 'Inside a `msg--ai` [chat message](chat-message), above the `.bubble` that holds the answer, in the order the steps ran. Full width of the answer column.',
  anatomy: [
    ['details.toolcall', 'Required. Native `<details>`: quiet fill, 12 px radius.'],
    ['summary', 'Required. One line, 40 px min: a leading icon (or a spinner while running), the step in words, then the `expand_more` chevron as the last icon.'],
    ['.ic:last-child', 'Required. The chevron; it turns 180 degrees when open. It must be the last icon in the summary.'],
    ['.toolcall__body', 'What the step found or did: a short sentence, a [list](list), or a [code block](code-block).'],
  ],
  examples: [
    {
      title: 'What the assistant looked up',
      desc: 'Closed by default. Open one to check the sources the answer used.',
      stage: 'block',
      html: `<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">search</span>Searched your notes for "net force"${CHEV}</summary><div class="toolcall__body">Found 3 pages: Week 4 lecture, page 2; Problem set 3, question 4; Lab 2 handout.</div></details>
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">description</span>Read Problem set 3${CHEV}</summary><div class="toolcall__body">Question 4: a 7 kg box pushed with 20 N against 6 N of friction.</div></details>
  <div class="bubble">The net force is 14 N, so the box accelerates at 2 m/s². Your answer used 20 N, the push alone.</div>
</div>`,
    },
    {
      title: 'A step still running',
      desc: 'While it runs, a spinner replaces the icon and the label shimmers. When it finishes, the label changes to what it found and the icon to a check.',
      stage: 'block',
      replay: true,
      html: `<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">check_circle</span>Checked your calendar${CHEV}</summary><div class="toolcall__body">Free on Tuesday 13:00 to 15:00 and Thursday after 16:00.</div></details>
  <details class="toolcall" id="tc-run"><summary>${SPIN}<span class="shimmer">Booking the study room</span>${CHEV}</summary><div class="toolcall__body">Room 2.14, Tuesday 13:00 to 14:30.</div></details>
  <button class="btn btn--plain btn--sm" style="align-self: flex-start; margin-left: -10px;" onclick="this.hidden = true; const s = document.querySelector('#tc-run summary'); s.firstElementChild.outerHTML = '<span class=&quot;ic&quot; aria-hidden=&quot;true&quot;>check_circle</span>'; const l = s.querySelector('.shimmer'); l.classList.remove('shimmer'); l.textContent = 'Booked room 2.14';">Finish the step</button>
</div>`,
      code: `<details class="toolcall">
  <summary>
    <span class="spinner" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
    <span class="shimmer">Booking the study room</span>
    <span class="ic" aria-hidden="true">expand_more</span>
  </summary>
  <div class="toolcall__body">…</div>
</details>
<!-- Done: replace the spinner with <span class="ic" aria-hidden="true">check_circle</span>,
     drop the shimmer class and name the result: "Booked room 2.14". -->`,
    },
    {
      title: 'A step with code',
      desc: 'When the step ran code or a query, the body holds a code block so the person can copy and check it.',
      stage: 'block',
      html: `<details class="toolcall" open style="max-width: 560px; width: 100%;"><summary><span class="ic" aria-hidden="true">code</span>Ran a query on your grades${CHEV}</summary><div class="toolcall__body"><div class="codeblock"><pre>SELECT AVG(score) FROM grades WHERE course = 'BIO101';</pre></div></div></details>`,
    },
    {
      title: 'A step that failed',
      desc: 'Say what failed and what the answer did instead. The answer below should not pretend the step worked.',
      stage: 'block',
      html: `<div class="msg msg--ai" style="max-width: 560px;">
  <details class="toolcall"><summary><span class="ic" aria-hidden="true">cloud_off</span>Could not open lab-report.pdf${CHEV}</summary><div class="toolcall__body">The file is larger than 20 MB. The answer below uses your notes only.</div></details>
  <div class="bubble">From your notes, the control group should keep the same light and water as the test group.</div>
</div>`,
    },
  ],
  states: [
    ['closed', 'The default: one line, chevron down.'],
    ['open', '`[open]`: the body shows at once; the chevron turns 180 degrees.'],
    ['running', 'A `.spinner` in place of the leading icon and a `.shimmer` label.'],
    ['done', 'A result icon (`check_circle`, `search`, `description`), the label names what it found.'],
    ['failed', 'A plain icon (`cloud_off`, `error`) and the reason in words; no red fill.'],
  ],
  motion: [
    'Chevron: rotates 180 degrees on `--spring-smooth` (`--d-smooth`, 560 ms); reverses from where it is if toggled again.',
    'Body: appears and disappears at once. Native `<details>` does not animate its height here; if you need the height to move, use an [accordion](accordion) instead.',
    'Running: the spinner turns (800 ms per turn) and the label shimmers on a 1.8 s cycle; when the step ends, the shimmer settles to solid text over `--d-standard`.',
    'Reduced motion: the shimmer stops (solid text), the chevron turns in 120 ms; the spinner keeps turning because it reports work.',
  ],
  a11y: [
    'Native `<details>`/`<summary>`: keyboard (Enter, Space) and expanded state come for free. Keep it.',
    'The summary text must say the step on its own ("Searched your notes for net force"), not just an icon.',
    'Icons are `aria-hidden`; the spinner too. While a step runs, the message is `aria-busy="true"`.',
  ],
  do: [
    'Name the step and its object: "Read Problem set 3".',
    'Keep steps closed by default; the answer is the main thing.',
    'Put steps in the order they ran, above the answer.',
  ],
  dont: [
    'Show raw tool names or JSON in the summary.',
    'Use it for page content people need to read; use an [accordion](accordion).',
    'Leave a spinner running after the step ended or failed.',
  ],
  js: 'None. It is native `<details>`. Update the summary yourself when a step finishes.',
  related: ['chat-message', 'thinking', 'streaming-text', 'accordion'],
};
