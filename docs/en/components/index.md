# Components

https://lampung.kartadinata.app/docs/en/components/

179 components and recipes. Each page says when to use it, when to use something else, the markup, its motion and its accessibility. Start here before building anything new: if a need is covered, use that component; if it is not, add a component to the system instead of styling one page. To see them working together, open the [examples](../../examples/index.md): a city services dashboard, a citizen app and a public portal.

## Foundations

Rules every component follows: layout, motion, states

- [Layout primitives](layout-primitives.md): Seven small classes that lay out everything between components: `stack`, `cluster`, `auto-grid`, `split-2`, `center`, `measure` and `sr-only`. Reach for them before writing `display: flex` or `grid` by hand.
- [Form layout](form-layout.md): The frame every form uses: `form` stacks fields 20 px apart, `form__row` puts short fields side by side when there is room, and `form__actions` ends the form with its buttons. Fields inside are always `.field`.
- [Data states](data-states.md): Every view that shows data is designed in four states: loading, empty, error and loaded. Each state reuses an existing component (`skel`, `empty`, `alert`) and keeps the same footprint, so the page does not jump between them.
- [Theming](theming.md): Light and dark come from one attribute: `data-theme="light|dark|system"` on `<html>` or any subtree. Components read only tokens, so they switch by themselves; you never write dark-mode CSS for a component.
- [Icon](icon.md): Icons are text: `<span class="ic" aria-hidden="true">search</span>`, drawn by a ligature font from the Solar set. Only names in `icons/icons.json` exist; any other name renders nothing, silently.

## Actions

Things people press to make something happen

- [Button](button.md): The control people press to make something happen: save, send, start, delete. One primary per view; the label names the outcome.
- [Icon button](icon-button.md): A button that shows only an icon: 44 px target, 22 px glyph, round. It always has an `aria-label` and a tooltip with the same words.
- [Floating action](floating-action.md): One round accent button that floats over the content of a phone screen for the action people come to that screen to do (new message, add expense). It is the only resting control that casts a shadow.
- [Button group](button-group.md): Two to four attached buttons in one outlined box, for separate actions on the same object (undo, redo, history). Each button does something; none of them stays selected.
- [Split button](split-button.md): A primary button joined to a chevron that opens a menu of variants of the same action (Publish, or schedule it, or publish to members only). The left part does the common thing in one press.
- [Toggle](toggle.md): A button that stays pressed to show a mode is on (bold, pin, mute). Alone it is a `.toggle`; several sit in a `.toggle-group`, either independent (bold, italic, underline) or one at a time (align left, center, right).
- [Link](link.md): Text that takes you somewhere: an `<a href>` with `.link`, medium weight in the accent text color, the underline fading in on hover. `.link--external` adds an arrow for other sites.
- [Copy button](copy-button.md): A button that copies a value to the clipboard and confirms in place: the copy icon blurs into a check and the label says "Copied" for 1.6 s. One attribute, `data-lds-copy`, holds the text.
- [Hold to confirm](hold-to-confirm.md): A button you press and hold for 1.2 s to confirm something costly but not dangerous enough for a dialog. A fill sweeps across while you hold and drains if you let go early.
- [Slide to confirm](slide-to-confirm.md): A track with a knob you drag to the end to confirm a costly step on a touch screen (submit an aid recipient list, send a payment). The knob follows your finger 1:1, resists past the ends, and commits past 85 % of the way.
- [Keyboard key](kbd.md): A small key cap that shows a keyboard shortcut: `.kbd` for one key, `.kbd-row` for a combination. Shortcuts are hints next to an action, never the only way to reach it.

## Inputs

Fields people type or choose into

- [Text field](text-field.md): A single line of free text with its label above and a helper line below. The helper turns into the error message, so the layout never jumps.
- [Amount field](amount-field.md): A text field for money and other numbers with a unit: the currency or unit sits inside the control as text, the keyboard is numeric. Type the number, never the symbol.
- [Textarea](textarea.md): A field for a few sentences: the same `.control` box, taller, with an optional character counter. Say the limit before people reach it.
- [Search field](search-field.md): The filled, label-less field for finding things: services, residents, reports. On phones, focusing it slides in a Cancel button that clears and leaves search.
- [Password field](password-field.md): A text field for secrets, with a reveal button that swaps its eye icon in place. When creating a password, a four-step strength meter and a helper say what would make it stronger.
- [Number stepper](number-stepper.md): Minus and plus buttons around a small whole number whose digits roll to the new value. For counts people change by one or two, inside a known range.
- [One-time code](otp.md): Six cells for a verification code, backed by one real input, so paste, SMS autofill and password managers all work. A wrong code shakes the cells once and turns them red.
- [Select](select.md): A field-shaped button that opens a list of options below it and shows the one chosen. For one choice from a fixed list too long to show as radios; if people need to type to find it, use a combobox.
- [Combobox](combobox.md): A text field that filters a list of options as you type and stores the one picked. For long lists and server-backed options; it says so when nothing matches.
- [Tag input](tag-input.md): A field that turns typed text into removable tags: Enter or comma adds one, Backspace on an empty field removes the last. For several short free values.
- [File input](file-input.md): A drop zone with a real Choose button, and one row per chosen file that shows its size, upload progress, errors and a way to remove it. The button is the main path; dropping is a shortcut.
- [Date field](date-field.md): A text field for a date with a calendar button that opens a calendar in a popover. Typing the date always works; the calendar is the helper. Built from existing parts: `.control`, `.control__btn`, `.popover` and `.cal`.
- [Date range](date-range.md): A button that shows the current span and opens presets beside a two-month calendar (one month on phones). A preset applies at once; picking a start previews the span as you move, picking an end waits for Apply.

## Selection

Choosing between options and toggling settings

- [Checkbox](checkbox.md): A native checkbox with a drawn tick, for independent yes or no choices that are saved with a form. Several can be on at once; each label says what turning it on means.
- [Radio](radio.md): Native radio buttons for exactly one choice out of two to five options that should all be visible. The dot springs in; arrow keys move between options.
- [Radio card](radio-card.md): A selectable card for one choice among two to four options that each need a title, a line of detail and often a price. The whole card is the target; the chosen one gets an accent edge and tint.
- [Switch](switch.md): An on and off control for a setting that applies the moment it is flipped, with no Save button. The thumb stretches while held and travels on a spring.
- [Segmented control](segmented-control.md): Two to five equal segments with one thumb that slides to the chosen one. For switching the view or mode of what is on screen right now; the change applies at once.
- [Slider](slider.md): A native range input with the system skin: a 4 px track filled in the accent up to a 28 px thumb. For a value on a continuous scale where the position matters more than the exact number.
- [Range slider](range-slider.md): Two thumbs on one track for a minimum and a maximum, with the accent fill between them. The thumbs can never cross; each is a native range input.
- [Chips](chips.md): Pill-shaped toggle buttons in a wrapping row, for filters and quick picks that apply as they are tapped. A pressed chip turns accent and a check slides in.
- [Rating](rating.md): Five stars for rating something from one to five. Hovering previews the score, clicking sets it; it works as a radio group from the keyboard.

## Navigation

Moving between pages, sections and steps

- [Masthead](masthead.md): The thin strip above everything on a public-service site that tells people whether the site is official, and how to tell. Sites built with this system that are not run by a government use the unofficial variant.
- [App shell](app-shell.md): The frame of an app: a sticky sidebar beside the content on wide screens, a top bar with a drawer below 960 px. One per app, at the root; one highlight glides to the current page.
- [Top nav](top-nav.md): A translucent bar across the top of a site without a sidebar: brand, up to five links, actions. Below 760 px the links fold into a panel under the bar.
- [Tabs](tabs.md): Underlined tabs that switch between sibling sections of one page, each with its own panel. One ink line glides to the selected tab.
- [Breadcrumbs](breadcrumbs.md): The path from a section down to the current page, as links with chevrons between them. The last item is the current page and is not a link.
- [Page header](page-header.md): The top of a page: breadcrumbs, the title with one line of context, and the page actions on the same baseline. A composition of existing parts, not a component of its own.
- [Pagination](pagination.md): Numbered page buttons under a long list or table. Show the first page, the last page and the neighbors of the current one; gaps become an ellipsis.
- [Steps](steps.md): Numbered steps of a fixed sequence with a bar that fills as each one completes. Shows where people are in a flow and how much is left.
- [Sidebar](sidebar.md): A bordered panel of links with one sliding highlight, placed inside the content: the sections of a settings page, the folders of an inbox. Not the frame of the app.
- [Outline](outline.md): An "On this page" list of the headings of one long page, with an ink line that follows the section in view. The list on the right of this page is one.
- [Menubar](menubar.md): A row of command menus (File, Edit, View) for a desktop-style editor. Each button opens a dropdown menu of commands with their shortcuts.
- [Nav progress](nav-progress.md): A 3 px accent bar along the top edge of the window that runs while the next page loads. Add `.is-running` when navigation starts, remove it when the page is in.
- [Phone bars](phone-bars.md): The chrome of a phone screen: a nav bar at the top whose large title collapses into it on scroll, and a tab bar of three to five destinations at the bottom. Both are translucent so content scrolls visibly under them.
- [Navigation stack](nav-stack.md): Push a detail screen in from the right over the one you came from, and go back with the back button or by dragging the screen away from the left edge. The screen underneath slides at 30 % and dims, so people always know where back leads.

## Overlays

Layers that float above the page

- [Dialog](dialog.md): A small centered layer that interrupts to ask for one short input or decision, then gets out of the way. Use rarely: most tasks belong on the page, in a sheet or in a drawer.
- [Alert dialog](alert-dialog.md): A dialog that confirms a destructive or irreversible action. The title names the object and the consequence; the safe button gets focus; the destructive button is the only place `btn--danger` belongs.
- [Modal](modal.md): A page-level dialog over the whole window: a native `<dialog class="modal">` in the top layer, or `.overlay` rendered in place by a framework. Below 600 px the native modal becomes a bottom sheet. Close it with `closeModal()` so it plays its exit.
- [Sheet](sheet.md): A panel that rises from the bottom for a task that keeps its context: the page behind recedes but stays visible. Drag the grabber to dismiss with momentum. The phone answer to most dialogs.
- [Drawer](drawer.md): A panel that slides in from the right edge on wide screens for filters, details or a secondary task, while the list it belongs to stays visible. It leaves to the side it came from.
- [Dropdown menu](dropdown-menu.md): A list of commands that drops from a button: sort options, row actions, the "more" menu behind an icon button. Items do something; they are not a form field.
- [Context menu](context-menu.md): A command menu that opens at the pointer on right-click, a long press on touch, or Shift+F10. A shortcut for commands that are also reachable another way.
- [Popover](popover.md): A small floating card anchored to a button, for content richer than a menu: a mini form, a short explanation with a link, a quick setting. It does not block the page.
- [Tooltip](tooltip.md): A short dark label above a control on hover or focus, after a 500 ms wait. Names icon buttons and shortcuts; with `.infotip` and `.tip--wide` it explains a term in a sentence or two. CSS only.
- [Hover card](hover-card.md): A preview card under a link after a 600 ms hover or on focus: who a person is, what a service covers. It saves a click; it never holds the only copy of anything.
- [Toast](toast.md): A short dark message at the bottom that confirms something that just happened, then leaves by itself. When the action can be reversed, the Undo lives in the toast with an honest countdown.
- [Command palette](command-palette.md): A search box over the page that finds and runs any command or destination by typing. A fast path for people who know what they want; never the only path.
- [Lightbox](lightbox.md): Shows one picture large over a dim page: it grows out of its thumbnail and shrinks back into it. A link around a thumbnail, so without the script it still opens the full image.
- [Selection bar](selection-bar.md): A dark bar that floats up from the bottom while items in a list are selected, holding the count and the actions for all of them. It leaves when the selection is empty.

## Feedback

Status, progress, messages and empty states

- [Alert](alert.md): An inline message about this page, section or form, in one of four tones. The words carry the meaning; the tint and the icon only support them.
- [Banner](banner.md): One inverse line about the whole app: offline, maintenance, viewing as someone else. It says the condition and offers at most one action.
- [Progress bar](progress-bar.md): A 6 px track that fills as a task with a known size advances. Show the number next to it; use the indeterminate bar only when you truly cannot measure.
- [Progress ring](progress-ring.md): A circular track with the value drawn as an arc and the number in the middle. For compact places and judged scores; say the judgment in words too.
- [Meter](meter.md): A segmented gauge for a level within a known range: storage used, seats taken, password strength. It shows how full, not how far along.
- [Spinner](spinner.md): Eight fading spokes that say "working" for a short wait with no measurable progress. It sits where the result will appear and never blocks the whole page.
- [Skeleton](skeleton.md): Grey shapes in the exact layout of the content that is loading, with a soft shine passing over them. When the data lands, nothing moves.
- [Badge](badge.md): A small, non-interactive label for the state or type of a thing: Draft, Overdue, Approved. Human words, one or two at most per item.
- [Count](count.md): A small red pill with a number of things waiting for the person: unread messages, pending requests. It means "act on these", so use it only for that.
- [Status dot](status-dot.md): An 8 px colored dot followed by words, for the live state of a system, a service or a connection. The words say the state; the dot helps scanning.
- [Empty state](empty-state.md): What a region shows when it has nothing to show yet: an icon, why it is empty, and the one action that fills it.
- [Coachmark](coachmark.md): An inverse card that points at one part of the interface with a short explanation, in a tour of at most three steps. Always skippable.
- [Thinking](thinking.md): A dot-grid wave, a shimmering label and an honest elapsed timer, for work of unknown length. When it finishes, the label turns into the result.
- [Timer](timer.md): A countdown pill in tabular mono figures that turns amber when time runs low and red at zero, then fires `lds:timeup`. For real deadlines the person is working against.

## Data display

Lists, tables, figures and records

- [List](list.md): The inset grouped list: rows on one surface, separated by hairlines that start where the text starts. The default for any list of things, instead of a stack of cards.
- [Key-value](key-value.md): Label and value pairs that describe one thing: a payment, an exam registration, a profile. `.kv` rows in a `<dl>`, inside a card or in their own `.kv-list` box.
- [Stat row](stat-row.md): A row of key figures without cards: big tabular numbers with their labels underneath, divided by hairlines. Its columns follow the width of the content column, not the screen.
- [KPI card](kpi-card.md): One metric on a dashboard: what it is, its value, how it changed against a stated baseline, and optionally its recent shape as a sparkline or mini bars. The value is the point; the change always says what it is compared with.
- [Card](card.md): A surface that holds one subject: an event, a bill, a service. White with a hairline ring on the canvas, or the quiet fill on white. Never a shadow.
- [Avatar](avatar.md): A circle with a person's initials on a tint, sized with `--size`. Initials until a real photo exists; never generated faces.
- [Table](table.md): Rows of records compared by the same columns, in a `.table-box` that scrolls sideways when it must. A real `<table>` by default, `.table--wrap` for text, and the `.dt` grid when a template repeats rows.
- [Accordion](accordion.md): A stack of questions or sections, each opening its panel on a spring. For content people read selectively; never to hide what everyone needs.
- [Tree](tree.md): Nested rows that open and close: folders and files, chapters and articles. Each parent is a button with `aria-expanded`; its children open on a spring.
- [Calendar](calendar.md): A month grid of round day buttons with today in accent text and the selection in the accent fill; a range fills between its ends. The markup and states; picking logic is yours.
- [Timeline](timeline.md): Events in time order on a vertical line, with filled dots for what is done. For the history or the plan of one thing, oldest first.
- [Show more](show-more.md): The first few items of a list, then a plain button that reveals the rest in place on the collapse spring, and folds it back.
- [Timestamp](timestamp.md): A `<time>` that shows when something happened or is due in relative words ("5 minutes ago", "in 3 days"), in the page language, and keeps itself current. The exact date goes in its title.
- [Date tile](date-tile.md): A small month-and-day block at the start of a row, for lists of things that happen on a date: posyandu sessions, mobile Samsat visits, payments due, events. People find the date before the title, so it leads.
- [Rolling number](rolling-number.md): A number whose digits each slide to their new value on the smooth spring, like an odometer. For a count that changes while the person watches.
- [Code block](code-block.md): Preformatted code on the quiet fill with a bar for its name and a copy action. Three quiet token colors, horizontal scroll, no line wrapping.
- [Carousel](carousel.md): A horizontal row of cards that snaps per card under the finger or trackpad, with dots that stretch toward the current page. For browsing optional items, never for content everyone must see.
- [Separator](separator.md): A 1 px hairline between two blocks of content that would otherwise run together, plain or with a few words in it (a date divider, "or"). Most of the time spacing or the component's own dividers are enough.
- [Data table](data-table.md): A table people work in: search, filter chips and menus, sortable headers, a column menu, row density, row selection with a selection bar, and pagination with a page size, all on a plain `.table` and wired by one hook. Every control changes the rows at once and says what it did.
- [Trend delta](trend-delta.md): The change next to a figure: an arrow for the direction, a color for what it means, the amount in tabular figures and a sentence for screen readers. Direction and meaning are separate, because a falling number can be good news.
- [File tile](file-tile.md): Files and folders as tiles in a grid: a tinted thumbnail by type (or the picture itself), a two-line name, size and date, a checkbox that appears on hover, focus or while selecting, and a more menu. The tile opens the file; ticking selects it for a bulk action.
- [Product tile](product-tile.md): A product people tap to add to a sale or an order: picture, name, one meta line and the price, with a badge in the corner that counts how many are already in the sale. The whole tile is one button.
- [Kanban](kanban.md): Columns of cards that people move between stages by dragging or by keyboard. The picked card lifts and follows the pointer, the others make room on a spring, and it settles into its slot; the counts roll.
- [Event calendar](event-calendar.md): A calendar of events with three views: a month grid with event chips, a week of timed blocks with a now line, and an agenda list grouped by day. It renders from JSON and turns into dots plus the chosen day's list when it has less than 640 px.
- [Lanes](lanes.md): Who is busy when: one row per person, room or resource, time running across, and blocks placed by their start and length. The question it answers is "who is free, and when", so gaps matter as much as blocks.
- [Inbox list](inbox-list.md): Rows of messages or conversations: who, when, a subject and a preview, with unread, current and flagged states. The row is the button that opens the message; the newest sit on top.
- [Check matrix](check-matrix.md): A grid of checkboxes: things in rows grouped by area, options in columns. The header and the first column stay in place while the box scrolls, and each area has one checkbox per column for all of it.
- [Floor plan](floor-plan.md): Bookable things drawn where they are: tables in a dining room, rooms on a floor, desks in a regional library. Each one is a button colored by its state, and the state is always in words too, so people find a free one by place and by name.
- [Route schematic](route-schematic.md): The stops of one trip on a line: the part already travelled in the accent, the vehicle where it is now, and the place and time under each stop. A diagram, not a map, so it stays honest and readable at any width.
- [Map](map.md): A small slippy map over OpenStreetMap tiles: routes with the travelled part in the accent, the vehicle where it is, and pins for the places that matter. It draws only the tiles in view and always credits the map data in the corner.

## Content

Long text, quotes, code and media

- [Prose](prose.md): A wrapper for long-form text you do not control line by line: articles, help pages, service guides, rendered Markdown. `.prose` styles plain headings, paragraphs, lists, links, tables and inline code inside it and caps the line length at 680 px.
- [Quote](quote.md): Words someone else said or wrote, set off by a 3 px accent bar on the left, 17/28 in `--text-strong`, with the source in a footer below. Only for real quotations.
- [Citation](citation.md): A small numbered pill after a claim that links to its source: `<a class="cite" href="#src-1">1</a>`. Used in articles and assistant answers so every fact can be checked.
- [Inline code](inline-code.md): A short piece of code, a file name, a key or a value inside a sentence: `<code class="code">report_id</code>`, monospace at 0.88 em on `--bg-recessed`.
- [Thumbnail](thumbnail.md): A cropped preview of a picture at a fixed ratio (4:3 by default) on a recessed placeholder. As a link with `data-lds-lightbox`, it opens the full picture in a [lightbox](lightbox.md) that grows out of the thumbnail.
- [Paper](paper.md): A printable page shown as a sheet inside the app: an invoice, a receipt, a letter, a certificate. The text reflows with the width, so the preview stays readable on a phone, and it can be the only thing that prints.
- [Aksara Lampung](aksara.md): Latin text drawn in had Lampung, the script of Lampung, as a quiet cultural accent next to names, headings and the brand. Always paired with a Latin reading; never the only way to read something.

## Chat

Conversations with people or an assistant

- [Chat layout](chat-layout.md): The conversation column: messages stacked 20 px apart in `.chat`, the history scrolling above a composer that never scrolls away, and a Latest button that appears only when the reader has scrolled up. Newest at the bottom, always.
- [Chat message](chat-message.md): One turn in a conversation. Your words sit in an accent bubble on the right; the assistant answers as plain reading text in the column, with a quiet actions row under it. System lines are centered footnotes.
- [Composer](composer.md): The reply box under a conversation: a rounded field that grows with the text, Enter to send, Shift+Enter for a new line, and one round send button that stays disabled until there is something to send.
- [Streaming text](streaming-text.md): An answer that arrives word by word, each word fading in from a 3 px blur, with a round caret at the end while more is coming. It shows real progress; never fake it for text you already have.
- [Tool call](tool-call.md): One step the assistant took on the way to its answer (searched the service guides, read a file, checked a schedule), shown as a quiet one-line `<details>` that opens to what it found. The answer stays the main thing.

## Page patterns

How components combine into a page

- [Sections](sections.md): A page as a column of titled sections: 48 px apart, a hairline above every section after the first, a larger heading on wide screens. Structure comes from space and headings, not from a card around each part.
- [Spotlight](spotlight.md): The one thing on the page worth doing next, on the accent tint: an eyebrow, a title, a sentence and one or two actions. At most one per page.
- [Link card](link-card.md): A grid of destinations on the quiet fill: each card is one link with an eyebrow, a title, a line of detail and a foot whose chevron leans toward where it goes.
- [Resizable split](resizable-split.md): Two panes with a handle between them that people drag, or move with the arrow keys, to share the space. For tools where both panes are worked in at once.
- [Phone screen](phone-screen.md): The standard phone layout: a large title that collapses into a translucent nav bar as content scrolls under it, grouped lists in the middle, and a translucent tab bar at the bottom. The bars are the only blurred surfaces.
- [Device frame](device-frame.md): A phone body around a `.phone` screen: rounded bezel, side buttons, the camera island and a status bar, scaled to fit the page. On a real phone the same screen drops the body and fills the display with `.device--bleed`.

## Marketing

Product, pricing and landing pages in front of an app

- [Hero](hero.md): The top of a product or landing page: one headline, one line under it, at most two actions, and the product itself beside or below. The product is shown working, not as a picture of a screen.
- [Marketing section](marketing-section.md): One part of a landing or product page: a head with an eyebrow, a large title and a lede, over any content. Every marketing section shares the same width and gutter, so edges line up down the page.
- [Feature row](feature-row.md): One feature told beside its proof: a short title, a paragraph and a few points on one side, a live stage with the feature working on the other. Rows alternate sides with `feature--reverse`.
- [Plans](plans.md): Pricing plans as cards, with a billing period control above them. Prices roll when the period or the seat count changes; the saving is said in words next to the control.
- [Compare table](compare-table.md): Plans as columns and features as rows, grouped by topic, with a check, a dash icon or a short value in each cell. It scrolls sideways in its own box while the feature names stay put.
- [Testimonial](testimonial.md): What one real person said about the service, with their name and role. Quiet on purpose: the words carry it. Only publish real quotes; while designing, label placeholders as example content where readers see it.
- [CTA band](cta-band.md): The last ask on a landing page: a short title, one line, and the same primary action as the hero, on the quiet fill. It may hold the one line people copy to start.
- [Site footer](site-footer.md): The bottom of a marketing or content site: the product name and one line about it, link groups that exist, and a bottom row for the small print and the appearance control.

## Motion

Recipes for things that move

- [Motion principles](motion-principles.md): Calm by default: things arrive on a spring with no overshoot, leave faster on an accelerating curve, start from wherever they are when interrupted, and only bounce after a gesture that carried momentum. Every value comes from a token; the recipes in this group say which one.
- [Press feedback](press-feedback.md): The control answers the moment a finger or mouse goes down: it sinks a little in 90 ms and springs back on release. Depth follows size, so small things sink more and wide things barely move. Every system control already does this; you only choose the right control.
- [Enter and exit](enter-and-exit.md): How things appear and disappear: overlays rise a few pixels and scale up from 0.96 on the smooth spring while they fade in fast; they leave in 180 ms on the exit curve, quieter than they came, along the same path. Things joining a list fade in from a small blur.
- [Sliding indicator](sliding-indicator.md): One marker travels to the chosen option: the segmented thumb, the tab ink, the sidebar highlight, the outline ink, the toolbar highlight. Labels never light up on their own; the single moving element is what tells the eye where the choice went.
- [Height expand](height-expand.md): Content that opens or closes in the flow animates its height through grid rows (`0fr` to `1fr`) on the smooth spring, so everything below slides instead of jumping. The content fades in just after the space opens and fades out before it closes.
- [List stagger](list-stagger.md): When a group of items arrives at once, each one follows the one before by 35 ms, fading in from a 4 px blur and a 4 px rise. The whole cascade stays under 400 ms, so the list reads as one arrival with a direction, never as a slow parade.
- [View swap](view-swap.md): One view replaces another in the same place: a tab panel, the next step of a form, a different range on a chart. The old view goes at once and the new one fades in from a 4 px blur and a 4 px rise in 240 ms. Quick enough to never feel like a page load; soft enough that the eye sees the change.
- [Shared element](shared-element.md): The picture you tap grows out of its own thumbnail into the full view and shrinks back into the same spot when closed (a FLIP transition). Because the object never disappears, people keep their place: the large view is visibly the same thing, not a new page.
- [Number count](number-count.md): When a number changes in front of someone, each digit column rolls to its new value on the smooth spring, and bars and rings glide to their new length on the in-out curve. The change is visible, the new value is readable at once, and the width never jumps.
- [Drag and momentum](drag-and-momentum.md): What a finger moves follows it exactly, resists softly past its limits, and on release goes where the throw was heading: the release velocity is projected forward to decide the outcome, then a spring with a hint of overshoot settles it. A flick does what a long drag would.
- [Reveal on scroll](reveal-on-scroll.md): Figures, key numbers and illustrations fade up 4 px the first time they scroll into view, once, and never again. Body text, lists and tables are never revealed: people should be able to read and search everything at once.
- [Reduced motion](reduced-motion.md): When people ask their device for less motion, the system keeps every state change and drops the travel: transitions become 120 ms linear changes, keyframe animations play once in 1 ms, dialogs and menus stop scaling, shimmer and sparks stop, flights and scroll reveals are skipped. Spinners keep turning because they report work.

## Microinteractions

Small responses that make controls feel alive

- [Text morph](text-morph.md): A word changes in place and only the letters that differ move: kept letters slide to their new spot, new ones rise in, leaving ones blur out, and the width springs between the two words. Use it for the result of an action said in words, right where the action happened.
- [Confirm in place](confirm-in-place.md): A destructive action that asks, works and reports inside one pill: rest, then "Delete 3 files?", then Deleting, then Deleted with Undo. The pill springs to fit each sentence, so nothing around it jumps and nobody has to deal with a dialog for a small, undoable action.
- [Like](like.md): Endorsing something is optimistic: the heart fills, pops and throws seven sparks the moment it is pressed, and the count rolls up, before the server answers. If the server refuses, it rolls back with a shake and says why.
- [Shake](shake.md): A refusal: the control shakes twice, quickly and with shrinking swings (360 ms), and the reason appears in words next to it. The shake catches the eye at the exact place; the words say what to do.
- [Icon swap](icon-swap.md): One glyph turns into another in place: the old one shrinks to half and blurs away while the new one settles on a snappy spring. For icons that say a new state (copied, playing, saved), not for decoration.
- [Bell](bell.md): The bell icon rings once, a short swing from its top that settles in 640 ms, when notifications are turned on or a new one arrives. Once, never on a loop: it acknowledges, it does not nag.
- [Menu icon](menu-icon.md): Three bars that fold into a close icon when their button opens a menu, and unfold when it closes: the top and bottom bars meet and turn 45 degrees, the middle one shrinks away. The button stays in place, so the same spot opens and closes.
- [Expanding toolbar](expanding-toolbar.md): A compact row of icon tools where the hovered or focused one opens its label and one highlight glides to it. The default tool shows its label at rest, so the bar is never a row of unexplained icons.
- [Swipe actions](swipe-actions.md): Swipe a list row left to reveal its actions; swipe far or flick to run the last one, and the row slides out and closes its space. The row follows the finger exactly, and the same actions open with the Left arrow key.
- [Inline edit](inline-edit.md): Click a name to rename it where it is: the text becomes a field with the same font and width, Enter or leaving saves, Escape puts it back. A save draws a small check; a refused save restores the old name, shakes, and says why.
- [Upload progress](upload-progress.md): An upload traces its progress around the edge of the drop zone it was dropped on, with a percent pill in the corner. The line turns green at 100 %. The number is real; it never crawls toward 90 % and waits.
- [Scroll fades](scroll-fades.md): A scrolling area fades an edge only while more content waits beyond it: the top edge appears once you leave the start, the bottom edge disappears when you reach the end. A fade always means "there is more this way".
- [Hints](hints.md): A short tip that teaches a shortcut or a gesture, shown on the first few visits only and gone for good once closed. It gets quieter with use: by the time people know the trick, the hint has retired itself.
- [Haptics](haptics.md): A short vibration on phones that support it, always together with a visible change, never alone. Four kinds: light for a tap that changed something, medium for a gesture that committed, success when something finished, error when something was refused.
- [Pull to refresh](pull-to-refresh.md): Drag a phone list down from the top: the content follows with resistance, a spinner turns as it comes in, and past 56 px a release refreshes. The spinner holds until the work is done, at least 700 ms so it never flickers.

## Charts

Showing numbers as pictures

- [Chart principles](chart-principles.md): The rules every chart in the system follows: one question per chart, written as its title; thin marks on receding grids; four series colors in a fixed order; direct labels over legends; and a text alternative for every chart.
- [Chart card](chart-card.md): The frame every dashboard chart sits in: the question as its title, what is measured under it, then optional actions (a range control, a menu), the headline figure with its change, the chart, and a footer with the source time or a link to the full report.
- [Sparkline stat](sparkline-stat.md): One headline number with a word on its direction and a tiny line of its recent history, in a chart card. The number is the point; the sparkline only shows the shape of the trend.
- [Bar chart](bar-chart.md): Vertical bars that compare one value across a few categories or periods (weekdays, districts, service types). Bars start at zero, the answer is highlighted, the rest recede.
- [Ranked bars](ranked-bars.md): Rows of a label, a horizontal bar and its value, sorted longest first: top sources, top pages, best scores. Long labels stay readable because they sit beside (or inside) the bar instead of under it, and every row shares one grid so bars and values line up.
- [Line chart](line-chart.md): A line per series over time, on an SVG with receding gridlines and labels at the line ends. For trends across many points; at most four series, the second one dashed.
- [Area chart](area-chart.md): A filled line over time, drawn from data: one series against a dashed comparison, up to four series stacked into a total, or steps for a value that changes in jumps. Legend items switch series on and off; the crosshair reads every series at once.
- [Combo chart](combo-chart.md): Bars for what happened in each period and a line for what was expected (a plan, a forecast, last year), on one shared scale, with optional dashed reference lines for fixed thresholds. Drawn from data like the area chart.
- [Donut](donut.md): A ring split into up to four segments that show parts of one whole, with the total in the middle and a labelled list beside it. The list carries the numbers; the ring shows proportion at a glance.
- [Gauge](gauge.md): A half ring with the value in its opening: one figure against its known range (quota booked, a score, a load), or a row of ticks shared out between a few states (available, low, out of stock). Reads at a glance; the words under the number carry the detail.
- [Percentage bar](percentage-bar.md): One horizontal bar split into up to four colored parts that add up to 100 %, with a legend that names each part and its share. The compact way to show composition.
- [Target bar](target-bar.md): A horizontal bar for progress toward a goal: the fill is where you are, a marker shows where you should be (the goal, or today's pace), and an optional tint ahead of the fill shows the forecast. Words above say the value against the goal.
- [Funnel](funnel.md): The steps of a flow, each with how many reached it and what share of the step before moved on. Centered bars narrow with the count, so the biggest drop is visible at a glance; the words carry the exact numbers.
- [Heatmap](heatmap.md): A grid of small squares, one per day or slot, shaded in five steps of one hue from empty to most. Shows patterns over many periods (busy weekdays, weekly habits) rather than exact values.
- [Uptime bars](uptime-bars.md): One thin bar per day (or hour) in a row, colored by how that period went: no issues, degraded, or down. The pattern of incidents over 90 days reads at a glance; pointing at a bar, or using the arrow keys, says what happened that day.
- [Chart states](chart-states.md): Every chart is designed in loading, empty and error states inside the same `.chart-card`, at the same size as the loaded chart: a skeleton of its own shape, an empty message with the reason, and an error with a retry.
