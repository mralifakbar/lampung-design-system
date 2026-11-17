
const row = ({ from, time, subject, preview, unread, current, flag, attach, ini, gray }) => `  <button class="inbox__row${unread ? ' is-unread' : ''}" type="button"${current ? ' aria-current="true"' : ''}>
    <span class="avatar${gray ? ' avatar--gray' : ''}" style="--size: 40px;" aria-hidden="true">${ini}</span>
    <span class="inbox__body">
      <span class="inbox__line"><span class="inbox__from">${from}</span>${flag ? '<span class="ic inbox__flag" aria-label="Flagged">flag</span>' : ''}${attach ? '<span class="ic" aria-label="Has attachments">attach_file</span>' : ''}<time class="inbox__time">${time}</time></span>
      <span class="inbox__subject">${subject}</span>
      <span class="inbox__preview">${preview}</span>
    </span>
  </button>`;

export default {
  title: 'Inbox list',
  group: 'Data display',
  order: 22.5,
  summary: 'Rows of messages or conversations: who, when, a subject and a preview, with unread, current and flagged states. The row is the button that opens the message; the newest sit on top.',
  when: [
    'A mail inbox, a list of chat conversations or a support queue, where each row opens one message or thread.',
    'Notifications or announcements people process one by one, where unread matters.',
    'The left pane of a [resizable split](resizable-split) with the open message on the right.',
  ],
  whenNot: [
    ['Settings, links or records that are not messages', 'list', 'A plain list row with a title and a value.'],
    ['Records compared by the same columns', 'data-table'],
    ['The messages inside one conversation', 'chat-message'],
    ['A history of what happened to one record', 'timeline'],
  ],
  where: 'In its own scrolling pane, full width of that pane: beside the reading pane on wide screens, the whole screen on phones (rows push the message with a [navigation stack](nav-stack)). Put search and a filter above it, outside the scroller. Wrap each row in a [swipe](swipe-actions) for archive and delete on phones.',
  anatomy: [
    ['.inbox[data-lds-inbox]', 'Required. The column of rows. `inbox--avatars` starts the hairlines after a 40 px avatar.'],
    ['button.inbox__row', 'Required. One message: a real button (or a link) that opens it. 64 px minimum, 20 px left gutter for the unread dot.'],
    ['.avatar', 'Optional. Who sent it, 40 px.'],
    ['.inbox__body', 'Required. The text column.'],
    ['.inbox__line', 'A row inside the body: `.inbox__from` (ellipsis) and `.inbox__time` on the first; in a chat list, `.inbox__preview` and a [count](count) on the second.'],
    ['.inbox__subject', 'Optional. The subject, one line with ellipsis.'],
    ['.inbox__preview', 'Optional. The first words of the message, two lines (`--lines` changes it), one line inside an `.inbox__line`.'],
    ['.inbox__flag', 'A filled flag in the warning color, in the first line, with `aria-label`. Other signals (attachment) are muted icons.'],
    ['.inbox__meta', 'Optional row of [badges](badge) under the preview: labels.'],
  ],
  examples: [
    {
      title: 'An inbox',
      desc: 'Unread rows carry a dot and full weight; the open message sits on the accent tint. Focus a row and use the Up and Down arrows (or j and k) to move.',
      stage: 'block',
      html: `<div class="inbox inbox--avatars card" data-lds-inbox style="padding: 0; overflow: hidden; max-width: 460px;" aria-label="Inbox">
${row({ from: 'Nadia Putri', time: '09:12', subject: 'Q4 budget: two lines need your approval', preview: 'I moved the software costs into operating spend as we agreed. The official travel line is still 8% over, can you check before Friday?', unread: true, flag: true, ini: 'NP' })}
${row({ from: 'Galih Ramadhan', time: '08:40', subject: 'Retribution payment page is ready for review', preview: 'Virtual account and card both work in staging. Receipts go out by email within a minute.', current: true, attach: true, ini: 'GR', gray: true })}
${row({ from: 'Sari Handayani', time: 'Yesterday', subject: 'Tax bill reminder schedule', preview: 'Three days before and on the due date, as discussed. I left the copy in the doc.', ini: 'SH', gray: true })}
</div>`,
    },
    {
      title: 'Conversations',
      desc: 'A chat list: name and time on the first line, the last message and an unread [count](count) on the second. The current conversation is on the tint.',
      stage: 'block',
      html: `<div class="inbox inbox--avatars card" data-lds-inbox style="padding: 0; overflow: hidden; max-width: 380px;" aria-label="Conversations">
  <button class="inbox__row is-unread" type="button"><span class="avatar" style="--size: 40px;" aria-hidden="true">PB</span><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Kedaton flood post</span><time class="inbox__time">10:02</time></span><span class="inbox__line"><span class="inbox__preview">Bima: the rubber boat has reached RT 05</span><span class="count">3<span class="sr-only"> unread</span></span></span></span></button>
  <button class="inbox__row" type="button" aria-current="true"><span class="avatar avatar--gray" style="--size: 40px;" aria-hidden="true">DL</span><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Dewi Lestari</span><time class="inbox__time">09:47</time></span><span class="inbox__line"><span class="inbox__preview">Sounds good, see you at 14:00</span></span></span></button>
</div>`,
    },
    {
      title: 'With swipe actions',
      desc: 'On phones each row sits in a [swipe](swipe-actions): swipe left for archive and delete. Keep the same actions in the reading pane for people who do not swipe.',
      stage: 'block',
      html: `<div class="inbox card" data-lds-inbox style="padding: 0; overflow: hidden; max-width: 420px;" aria-label="Inbox">
  <div class="swipe" data-lds-swipe><div class="swipe__actions"><button class="swipe__act swipe__act--accent" type="button" data-swipe="archive"><span class="ic" aria-hidden="true">archive</span>Archive</button><button class="swipe__act swipe__act--danger" type="button" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Delete</button></div>
    <button class="inbox__row swipe__row is-unread" type="button"><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Arif Santoso</span><time class="inbox__time">07:55</time></span><span class="inbox__subject">Street light out on Jl. Teuku Umar</span><span class="inbox__preview">An officer is scheduled to check it tomorrow morning.</span></span></button></div>
  <div class="swipe" data-lds-swipe><div class="swipe__actions"><button class="swipe__act swipe__act--accent" type="button" data-swipe="archive"><span class="ic" aria-hidden="true">archive</span>Archive</button><button class="swipe__act swipe__act--danger" type="button" data-swipe="delete" data-swipe-commit><span class="ic" aria-hidden="true">delete</span>Delete</button></div>
    <button class="inbox__row swipe__row" type="button"><span class="inbox__body"><span class="inbox__line"><span class="inbox__from">Dewi Lestari</span><time class="inbox__time">Mon</time></span><span class="inbox__subject">Mobile Samsat schedule next week</span><span class="inbox__preview">Monday at the Way Halim district office, Wednesday at Pasar Kemiling.</span></span></button></div>
</div>`,
    },
  ],
  variants: [
    ['.inbox', 'Rows without avatars (mail you scan by subject).'],
    ['.inbox--avatars', 'Rows that start with a 40 px avatar; hairlines start after it.'],
  ],
  states: [
    ['unread', '`.is-unread` on the row: an 8 px accent dot in the gutter, sender and subject at 600, the time in the accent text color. Say it in words too (`sr-only` "Unread").'],
    ['current', '`aria-current="true"` on the row whose message is open: the accent tint; the hairlines next to it hide.'],
    ['flagged', 'A filled `flag` icon with `.inbox__flag` and `aria-label="Flagged"`; it pops in when set.'],
    ['hover / pressed', 'A quiet tint on hover (pointer devices only), a stronger tint while pressed.'],
    ['empty', 'An [empty state](empty-state) in the pane: why it is empty and the one action (Clear search, Compose).'],
    ['loading', '[Skeleton](skeleton) rows with the same height: avatar circle, two lines.'],
  ],
  motion: [
    'Background tints change over `--d-fast` (160 ms) on `--ease-standard`; nothing moves on hover.',
    'A flag pops in on `--spring-snappy` (`lds-pop`); removing it is instant.',
    'Archiving or deleting from a [swipe](swipe-actions) slides the row out and closes its height on `--spring-smooth`; `restore()` brings it back for Undo.',
    'Reduced motion: no pop; tints still change.',
  ],
  a11y: [
    'Each row is a real `button` (or `a`) whose text reads in order: sender, time, subject, preview. Add `sr-only` "Unread" to unread rows; icons carry `aria-label` or are hidden.',
    'Mark the open message with `aria-current="true"`, not only with the tint.',
    'Up and Down (and j / k) move focus between rows, Home and End to the ends; Tab leaves the list.',
    'Give the list an `aria-label` ("Inbox, 4 unread") and keep it current.',
  ],
  do: [
    'Put the newest message on top and say times as plain text ("09:12", "Yesterday").',
    'Keep previews to two lines and subjects to one.',
    'Offer the same actions in the reading pane that swipe offers on the row.',
  ],
  dont: [
    'Color the whole row for unread; the dot and the weight are enough.',
    'Put buttons inside a row; open the message and act there, or use swipe.',
    'Use it for records with columns; use a [data table](data-table).',
  ],
  js: '`data-lds-inbox` on `.inbox`: Up and Down (and j / k) move focus between visible rows, Home and End jump to the ends. Opening a message, unread and flags are yours: set `aria-current`, `.is-unread` and the flag icon from your state.',
  related: ['list', 'swipe-actions', 'resizable-split', 'chat-layout'],
};
