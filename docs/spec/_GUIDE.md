# Writing a component spec

One file per component: `docs/spec/<slug>.mjs`, `export default { … }`. `node scripts/build-docs.mjs` turns every spec into a docs page (`docs/components/<slug>.html`) and an agent reference (`skills/lampung-design-system/references/components/<slug>.md`). Read `button.mjs` first: it is the model for depth and tone.

## Fields

| Field | Required | What |
|---|---|---|
| `title` | yes | Sentence case name ("Alert dialog"). |
| `group` | yes | One of: Foundations, Actions, Inputs, Selection, Navigation, Overlays, Feedback, Data display, Content, Chat, Page patterns, Marketing, Motion, Microinteractions, Charts. |
| `order` | yes | Position inside the group (see the registry below). |
| `status` | no | `'new'` for components added in 1.1 (marked in the registry). |
| `summary` | yes | One or two sentences: what it is and its single most important rule. |
| `when` | yes | Array. Concrete situations to use it. The first item is shown in the catalog table, so make it the clearest. |
| `whenNot` | strongly | Array of `[situation, slug, optional extra sentence]`, pointing to the component to use instead. This is what stops agents from inventing components; give at least two. |
| `where` | strongly | Where it sits in a layout, on phones and wide screens. |
| `anatomy` | yes for components | `[[selector, description]]`. Mark required parts "Required.". |
| `examples` | yes | Array of `{ title, desc, html, code?, stage?, height?, replay? }`. 2 to 5 examples, each a real use. `html` is rendered live on the page with the real CSS and `init()`; `code` (optional) is what the reader copies when the live demo needs extra wiring. `stage`: `'fill'` (quiet fill background), `'block'` (normal flow instead of a flex row), `'flush'` (no padding), `'phone'`. `replay: true` adds a Replay button that re-renders the demo (use it for entrances and one-shot motion). |
| `variants` | if any | `[[class or attribute, when]]`. |
| `states` | if any | `[[state, how]]`: hover, active, focus, disabled, loading, error, empty, open, selected… |
| `motion` | yes | Array. What moves, on which tokens (`--spring-smooth`, `--d-fast`, `--ease-exit`…), why, how it is interrupted, what reduced motion does. Concrete numbers. |
| `a11y` | yes | Array. Element choice, roles, ARIA, keyboard, focus, announcements. |
| `do`, `dont` | yes | 2 to 4 each, short and specific. |
| `js` | if behavior | Plain HTML behavior: the `data-lds-*` hook, events, exported functions. |
| `react` | if a binding exists | Code using `lampung-design-system/react` (see `react/index.tsx`). Only bindings that exist there. |
| `related` | yes | 2 to 4 slugs. |

Inline text supports `` `code` ``, `**bold**` and `[label](slug)` links to other specs. Links must use slugs from the registry.

## Rules (the build enforces the first three)

- Icons: only names from `icons/icons.json`. The full list: accessible account_balance add add_circle air apartment archive arrow_back_ios_new arrow_downward arrow_forward arrow_upward article assignment attach_file attach_money audio_file badge bar_chart bed bolt bookmark bug_report calendar_month calendar_view_week call campaign cancel chat check check_circle checklist chevron_left chevron_right close cloud cloud_off cloud_upload code confirmation_number content_copy content_paste contrast create_new_folder credit_card currency_bitcoin dark_mode dashboard database delete delete_forever description desktop_windows device_thermostat directions_boat directions_bus directions_car directions_walk dns do_not_disturb_on download draft drafts drag_indicator ecg_heart eco edit edit_square emergency emoji_events error event event_available event_busy expand_less expand_more factory favorite filter_list fingerprint flag flight flood folder folder_open folder_zip format_align_center format_align_left format_align_right format_bold format_italic format_underlined forward grid_view group groups handshake help history home hotel id_card image inbox info insert_drive_file inventory_2 ios_share keep key label lan landscape language laptop layers left_panel_close left_panel_open light_mode lightbulb link list local_fire_department local_gas_station local_hospital local_library local_police local_shipping location_city location_on lock login logout mail map mark_email_unread medical_services medication memory menu_book monitor_heart monitoring more_horiz more_vert movie my_location near_me north_east notifications notifications_off outbox palette park partly_cloudy_day passport pause payments pedal_bike person person_add photo_camera pie_chart play_arrow power print public qr_code qr_code_scanner rainy receipt_long redo refresh remove replay reply request_quote restaurant rocket_launch route savings schedule schedule_send school search sell settings share shield shield_person shopping_bag shopping_cart signpost smartphone sms sort speed star stethoscope storefront sunny swap_vert sync sync_problem text_fields thumb_up timeline today touch_app traffic tram trending_down trending_up tune undo upload_file verified verified_user videocam view_agenda view_column view_kanban visibility visibility_off volume_mute volume_up volunteer_activism wallet warning water_drop widgets wifi wifi_off work
- Classes in example HTML must exist in `css/components.css`. For demo-only layout use `docs-row`, `docs-col`, `docs-box` (positioned 360 px box for absolutely positioned layers such as dialog, sheet, drawer, toaster, which position inside `.viewport`), `docs-scroll`, `docs-phone`, `docs-note`, or inline `style` for a width. Never invent component classes.
- No em dashes anywhere.
- Copy: English, sentence case, buttons named for outcomes, plausible example content (a learning platform, exam prep, a small business). No lorem ipsum, no brackets, no real company or product names.
- Write the markup the CSS actually supports. Check `css/components.css` (and `js/lds.js` for `data-lds-*` hooks) before writing an example; mine the existing markup in `docs/gallery.html`, `docs/boards/*.dc.html`, the existing specs, `skills/lampung-design-system/references/microinteractions.md` and `motion.md`.
- Overlays (dialog, sheet, drawer, cmdk, toast) position absolutely inside `.viewport`; demo them inside `<div class="viewport docs-box">` with a trigger that uses `data-lds-open`, exactly like the gallery. Page modals (`dialog.modal`) use `data-lds-modal`.
- Inline `onclick` is fine in a demo to show a state change; give the clean markup in `code`.
- Do not edit CSS, JS, React, the build script or other people's specs. If a component cannot be shown because something is missing in the system, write the spec for what exists and report the gap.
- Validate your files: `node scripts/build-docs.mjs --check <slug> <slug> …`. Warnings about links to specs that do not exist yet are fine while others are still writing; errors are not.

## Registry

Every slug that will exist, so you can link to them now. Owner letters split the work.

**Foundations** (A): layout-primitives (1, new) · form-layout (2, new) · data-states (3) · theming (4) · icon (5)
**Actions** (A): button (1, done) · icon-button (2) · floating-action (3) · button-group (4) · split-button (5) · toggle (6) · link (7) · copy-button (8) · hold-to-confirm (9) · slide-to-confirm (10) · kbd (11)
**Inputs** (B): text-field (1) · amount-field (2) · textarea (3) · search-field (4) · password-field (5) · number-stepper (6) · otp (7) · select (8) · combobox (9) · tag-input (10) · file-input (11, new: drop zone plus file rows) · date-field (12, new: control plus calendar popover) · date-range (13, new: presets plus two-month calendar)
**Selection** (B): checkbox (1) · radio (2) · radio-card (3) · switch (4) · segmented-control (5) · slider (6) · range-slider (7) · chips (8) · rating (9)
**Navigation** (C): app-shell (1, new: includes nested sections) · top-nav (2, new) · tabs (3) · breadcrumbs (4) · page-header (5) · pagination (6) · steps (7) · sidebar (8) · outline (9, new: scrollspy toc) · menubar (10) · nav-progress (11, new) · phone-bars (12) · nav-stack (13, new: push and pop with edge drag)
**Overlays** (C): dialog (1) · alert-dialog (2) · modal (3, new) · sheet (4) · drawer (5) · dropdown-menu (6) · context-menu (7) · popover (8) · tooltip (9, includes infotip) · hover-card (10) · toast (11) · command-palette (12) · lightbox (13, new) · selection-bar (14, new)
**Feedback** (D): alert (1) · banner (2) · progress-bar (3) · progress-ring (4) · meter (5) · spinner (6) · skeleton (7) · badge (8) · count (9) · status-dot (10) · empty-state (11) · coachmark (12) · thinking (13) · timer (14, new)
**Data display** (D): list (1, includes numbered and checked rows) · key-value (2, includes kv-list) · stat-row (3, new) · kpi-card (3.5, new) · card (4) · avatar (6) · table (7) · accordion (8) · tree (9) · calendar (10) · timeline (11) · show-more (12, new) · timestamp (13, new) · date-tile (13.5, new) · rolling-number (14) · code-block (15) · carousel (16) · separator (17, includes labeled) · data-table (18, new) · trend-delta (19, new) · file-tile (20, new) · kanban (21, new) · lanes (22.4, new) · floor-plan (22.6, new) · event-calendar (22, new) · route-schematic (23, new) · map (23.5, new) · product-tile (20.5, new) · inbox-list (22.5, new) · check-matrix (22.6, new)
**Content** (A): prose (1, new) · quote (2, new) · citation (3, new) · inline-code (4, new) · thumbnail (5, new) · paper (6, new)
**Chat** (E): chat-layout (1, new) · chat-message (2, new) · composer (3, new) · streaming-text (4, new) · tool-call (5, new)
**Page patterns** (B): sections (1, new) · spotlight (2, new) · link-card (3, new) · resizable-split (4, new) · phone-screen (5) · device-frame (6, new: phone body, status bar, full bleed)
**Marketing** (landing): hero (1, new) · marketing-section (2, new) · feature-row (3, new) · plans (4, new: plan cards plus billing period, js data-lds-billing) · compare-table (5, new) · testimonial (6, new) · cta-band (7, new) · site-footer (8, new)
**Motion** (E): motion-principles (1) · press-feedback (2) · enter-and-exit (3) · sliding-indicator (4) · height-expand (5) · list-stagger (6) · view-swap (7) · shared-element (8, new) · number-count (9) · drag-and-momentum (10) · reveal-on-scroll (11, new) · reduced-motion (12)
**Microinteractions** (E): text-morph (1) · confirm-in-place (2) · like (3) · shake (4) · icon-swap (5) · bell (6) · menu-icon (7) · expanding-toolbar (8) · swipe-actions (9) · inline-edit (10) · upload-progress (11) · scroll-fades (12) · hints (13) · haptics (14) · pull-to-refresh (15, new)
**Charts** (A): chart-principles (1) · chart-card (1.5, new) · sparkline-stat (2) · bar-chart (3) · ranked-bars (3.5, new) · line-chart (4) · area-chart (4.5, new: drawChart engine) · combo-chart (4.6, new) · donut (5) · gauge (5.5, new) · percentage-bar (6) · target-bar (6.5, new) · funnel (6.6, new) · heatmap (7) · uptime-bars (7.5, new) · chart-states (8)

Motion and microinteraction specs are recipes, not components: `anatomy` may be omitted; `examples` show the effect live (use `replay: true`) in two or more real situations each (for example list-stagger: search results arriving, a dashboard's cards on first load, notifications), and `when`/`whenNot` say which motion fits which situation.
