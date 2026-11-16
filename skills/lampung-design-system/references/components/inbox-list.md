# Inbox list

Group: Data display (new). Docs page: `docs/components/inbox-list.html`.

Rows of messages or conversations: who, when, a subject and a preview, with unread, current and flagged states. The row is the button that opens the message; the newest sit on top.

## Use it when
- A mail inbox, a list of chat conversations or a support queue, where each row opens one message or thread.
- Notifications or announcements people process one by one, where unread matters.
- The left pane of a [resizable split](resizable-split.md) with the open message on the right.

## Use something else when
- Settings, links or records that are not messages: use [List](list.md). A plain list row with a title and a value.
- Records compared by the same columns: use [Data table](data-table.md).
- The messages inside one conversation: use [Chat message](chat-message.md).
- A history of what happened to one record: use [Timeline](timeline.md).

## Where it goes
In its own scrolling pane, full width of that pane: beside the reading pane on wide screens, the whole screen on phones (rows push the message with a [navigation stack](nav-stack.md)). Put search and a filter above it, outside the scroller. Wrap each row in a [swipe](swipe-actions.md) for archive and delete on phones.

## Anatomy
| Part | What it is |
|---|---|
| `.inbox[data-lds-inbox]` | Required. The column of rows. `inbox--avatars` starts the hairlines after a 40 px avatar. |
| `button.inbox__row` | Required. One message: a real button (or a link) that opens it. 64 px minimum, 20 px left gutter for the unread dot. |
| `.avatar` | Optional. Who sent it, 40 px. |
| `.inbox__body` | Required. The text column. |
| `.inbox__line` | A row inside the body: `.inbox__from` (ellipsis) and `.inbox__time` on the first; in a chat list, `.inbox__preview` and a [count](count.md) on the second. |
| `.inbox__subject` | Optional. The subject, one line with ellipsis. |
| `.inbox__preview` | Optional. The first words of the message, two lines (`--lines` changes it), one line inside an `.inbox__line`. |
| `.inbox__flag` | A filled flag in the warning color, in the first line, with `aria-label`. Other signals (attachment) are muted icons. |
| `.inbox__meta` | Optional row of [badges](badge.md) under the preview: labels. |

## Markup

**An inbox.** Unread rows carry a dot and full weight; the open message sits on the accent tint. Focus a row and use the Up and Down arrows (or j and k) to move.
```html
<div class="inbox inbox--avatars card" data-lds-inbox style="padding: 0; overflow: hidden; max-width: 460px;" aria-label="Inbox">
  <button class="inbox__row is-unread" type="button">
    <span class="avatar" style="--size: 40px;" aria-hidden="true">NP</span>
    <span class="inbox__body">
      <span class="inbox__line"><span class="inbox__from">Nadia Putri</span><span class="ic inbox__flag" aria-label="Flagged">flag</span><time class="inbox__time">09:12</time></span>
      <span class="inbox__subject">Q4 budget: two lines need your sign-off</span>
      <span class="inbox__preview">I moved the design tools into opex as we agreed. The travel line is still 8% over, can you look before Friday?</span>
    </span>
  </button>
  <button class="inbox__row" type="button" aria-current="true">
    <span class="avatar avatar--gray" style="--size: 40px;" aria-hidden="true">GR</span>
    <span class="inbox__body">
      <span class="inbox__line"><span class="inbox__from">Galih Ramadhan</span><span class="ic" aria-label="Has attachments">attach_file</span><time class="inbox__time">08:40</time></span>
      <span class="inbox__subject">Payment page is ready for review</span>
      <span class="inbox__preview">Virtual account and card both work in staging. Receipts go out by email within a minute.</span>
    </span>
  </button>
  <button class="inbox__row" type="button">
    <span class="avatar avatar--gray" style="--size: 40px;" aria-hidden="true">SH</span>
    <span class="inbox__body">
      <span class="inbox__line"><span class="inbox__from">Sari Handayani</span><time class="inbox__time">Yesterday</time></span>
      <span class="inbox__subject">Invoice reminders schedule</span>
      <span class="inbox__preview">Three days before and on the due date, as discussed. I left the copy in the doc.</span>
    </span>
  </button>
</div>
```

**Conversations.** A chat list: name and time on the first line, the last message and an unread [count](count.md) on the second. The current conversation is on the tint.
```html
<div class="inbox inbox--avatars card" data-lds-inbox style="padding: 0; overflow: hidden; max-width: 380px;" aria-label="Conversations">
  <button class="inbox__row is-unread" type="button"><span class="avatar" style="--size: 40px;" aria-hidden="true">LT</span><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Launch team</span><time class="inbox__time">10:02</time></span><span class="inbox__line"><span class="inbox__preview">Bima: the release notes are in the doc</span><span class="count">3<span class="sr-only"> unread</span></span></span></span></button>
  <button class="inbox__row" type="button" aria-current="true"><span class="avatar avatar--gray" style="--size: 40px;" aria-hidden="true">DL</span><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Dewi Lestari</span><time class="inbox__time">09:47</time></span><span class="inbox__line"><span class="inbox__preview">Sounds good, see you at 14:00</span></span></span></button>
</div>
```

**With swipe actions.** On phones each row sits in a [swipe](swipe-actions.md): swipe left for archive and delete. Keep the same actions in the reading pane for people who do not swipe.
```html
<div class="inbox card" data-lds-inbox style="padding: 0; overflow: hidden; max-width: 420px;" aria-label="Inbox">
  <div class="swipe" data-lds-swipe><div class="swipe__actions"><button class="swipe__act swipe__act--accent" type="button" data-swipe="archive"><span class="ic" aria-hidden="true">archive</span>Archive</button><button class="swipe__act swipe__act--danger" type="button" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Delete</button></div>
    <button class="inbox__row swipe__row is-unread" type="button"><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Arif Santoso</span><time class="inbox__time">07:55</time></span><span class="inbox__subject">Bulk invites are live</span><span class="inbox__preview">Paste up to 50 emails, pick a role, send.</span></span></button></div>
  <div class="swipe" data-lds-swipe><div class="swipe__actions"><button class="swipe__act swipe__act--accent" type="button" data-swipe="archive"><span class="ic" aria-hidden="true">archive</span>Archive</button><button class="swipe__act swipe__act--danger" type="button" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Delete</button></div>
    <button class="inbox__row swipe__row" type="button"><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Dewi Lestari</span><time class="inbox__time">Mon</time></span><span class="inbox__subject">Dark mode for charts</span><span class="inbox__preview">Series colors pass in both themes now.</span></span></button></div>
</div>
```

## Variants and sizes
| Class or attribute | When |
|---|---|
| `.inbox` | Rows without avatars (mail you scan by subject). |
| `.inbox--avatars` | Rows that start with a 40 px avatar; hairlines start after it. |

## States
| State | How |
|---|---|
| `unread` | `.is-unread` on the row: an 8 px accent dot in the gutter, sender and subject at 600, the time in the accent text color. Say it in words too (`sr-only` "Unread"). |
| `current` | `aria-current="true"` on the row whose message is open: the accent tint; the hairlines next to it hide. |
| `flagged` | A filled `flag` icon with `.inbox__flag` and `aria-label="Flagged"`; it pops in when set. |
| `hover / pressed` | A quiet tint on hover (pointer devices only), a stronger tint while pressed. |
| `empty` | An [empty state](empty-state.md) in the pane: why it is empty and the one action (Clear search, Compose). |
| `loading` | [Skeleton](skeleton.md) rows with the same height: avatar circle, two lines. |

## Motion and microinteractions
- Background tints change over `--d-fast` (160 ms) on `--ease-standard`; nothing moves on hover.
- A flag pops in on `--spring-snappy` (`lds-pop`); removing it is instant.
- Archiving or deleting from a [swipe](swipe-actions.md) slides the row out and closes its height on `--spring-smooth`; `restore()` brings it back for Undo.
- Reduced motion: no pop; tints still change.

## Accessibility
- Each row is a real `button` (or `a`) whose text reads in order: sender, time, subject, preview. Add `sr-only` "Unread" to unread rows; icons carry `aria-label` or are hidden.
- Mark the open message with `aria-current="true"`, not only with the tint.
- Up and Down (and j / k) move focus between rows, Home and End to the ends; Tab leaves the list.
- Give the list an `aria-label` ("Inbox, 4 unread") and keep it current.

## Do
- Put the newest message on top and say times as plain text ("09:12", "Yesterday").
- Keep previews to two lines and subjects to one.
- Offer the same actions in the reading pane that swipe offers on the row.

## Don't
- Color the whole row for unread; the dot and the weight are enough.
- Put buttons inside a row; open the message and act there, or use swipe.
- Use it for records with columns; use a [data table](data-table.md).

## Behavior (plain HTML)
`data-lds-inbox` on `.inbox`: Up and Down (and j / k) move focus between visible rows, Home and End jump to the ends. Opening a message, unread and flags are yours: set `aria-current`, `.is-unread` and the flag icon from your state.

## Related
[List](list.md) · [Swipe actions](swipe-actions.md) · [Resizable split](resizable-split.md) · [Chat layout](chat-layout.md)
