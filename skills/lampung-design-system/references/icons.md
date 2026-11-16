# Icons

Solar (solar-icons.dev), shipped as two ligature fonts built from the `@iconify-json/solar` set:

- `LDS Icons` (`fonts/lds-icons.woff2`): the line style, built from Solar `-outline` (filled outlines of the linear set, so the stroke weight holds at any size).
- `LDS Icons Fill` (`fonts/lds-icons-fill.woff2`): Solar `-bold`, for selected and filled states.

## Use

```html
<span class="ic" aria-hidden="true">search</span>          <!-- line, 20px -->
<span class="ic ic--fill" aria-hidden="true">star</span>    <!-- bold -->
<span class="ic ic--sm">…</span>  <span class="ic ic--lg">…</span>   <!-- 16px / 24px -->
```
Icons are decorative (`aria-hidden="true"`) next to a text label. An icon-only button carries `aria-label` and gets a tooltip. Active states switch to the fill font automatically on tab bar items, sidebar items, pressed toggles, alert icons, list icon chips and tiles.

Flutter: register both fonts in `pubspec.yaml` (families `LDS Icons` and `LDS Icons Fill`) and render `Text('search', style: TextStyle(fontFamily: LdsType.icons, fontSize: 20))`; ligatures are on by default.

## Available names

`icons/icons.json` is the list (ligature name → Solar base name). An unknown name renders nothing, silently, so check the list:

add, add_circle, arrow_back_ios_new, arrow_downward, arrow_forward, arrow_upward, assignment, attach_file, bar_chart, bookmark, calendar_month, call, cancel, chat, check, check_circle, chevron_left, chevron_right, close, cloud_off, cloud_upload, code, content_copy, content_paste, contrast, dark_mode, delete, delete_forever, description, do_not_disturb_on, download, draft, edit, edit_square, error, event, event_available, event_busy, expand_less, expand_more, favorite, filter_list, folder, folder_open, format_align_center, format_align_left, format_align_right, format_bold, format_italic, format_underlined, grid_view, group, history, home, image, info, insert_drive_file, inventory_2, ios_share, keep, key, lan, light_mode, link, list, location_on, lock, logout, mail, menu_book, more_horiz, more_vert, near_me, north_east, notifications, pause, person, person_add, pie_chart, play_arrow, public, qr_code_scanner, receipt_long, redo, refresh, remove, replay, schedule, schedule_send, school, search, settings, share, sms, sort, star, swap_vert, sync, sync_problem, text_fields, timeline, today, touch_app, trending_down, trending_up, tune, undo, upload_file, visibility, visibility_off, volume_mute, volume_up, wallet, warning, wifi, wifi_off

Added for admin dashboards: dashboard, view_kanban, dns, shopping_bag, shopping_cart, local_shipping, monitor_heart, currency_bitcoin, stethoscope, credit_card, id_card, restaurant, hotel, fingerprint, shield_person, checklist, drag_indicator, view_column, left_panel_close, left_panel_open, desktop_windows, help, bolt, rocket_launch, bug_report, speed, emoji_events, database, cloud, memory, inbox, archive, flag, label, sell, payments, savings, account_balance, folder_zip, movie, audio_file, create_new_folder, login, verified, attach_money, view_agenda, calendar_view_week, reply, forward, smartphone, laptop, outbox, mark_email_unread, drafts, flight, directions_boat, print, device_thermostat, water_drop, air, ecg_heart, notifications_off, route, bed

## Adding an icon

1. Find the Solar base name on solar-icons.dev (for example `wallet-money`); it must exist in both `-outline` and `-bold`.
2. Add `"my_name": "wallet-money"` to `icons/icons.json`.
3. `npm run build:icons` (creates a cached Python venv and downloads the Solar set the first time).
4. Commit the two regenerated `.woff2` files.

Pick icons for meaning, not decoration. No sparkles, magic wands or robots for "AI"; if no icon fits, use none.
